import '@testing-library/jest-dom';
import { Matcher, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext, useEffect } from 'react';
import UserInfoProvider, { UserInfoContext } from '../../src/contexts/UserInfoContext';
import { MultiStepFormContext } from '../../src/components/MultiStepForm';
import SummaryForm from '../../src/components/SummaryForm';
import useMultiStepForm from '../../src/hooks/useMultiStepForm';
import SelectPlanForm from '../../src/components/SelectPlanForm';
import { userInfoMonthly, userInfoYearly } from '../mocks/userInfoContext';
import { vi } from 'vitest';

const formsToLoad = [<SummaryForm key="SummaryForm" />, <SelectPlanForm key="SelectPlan" />];

function TestComponent({ context }) {
  const formControl = useMultiStepForm(formsToLoad);
  const { step } = formControl;
  const { setUserInfo } = useContext(UserInfoContext) ?? {};

  useEffect(() => {
    if (setUserInfo !== undefined) {
      setUserInfo(context);
    }
  }, []);

  return <MultiStepFormContext.Provider value={formControl}>{step}</MultiStepFormContext.Provider>;
}

describe('SummaryForm Tests - Correct context', () => {
  it('Should render correctly', () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoMonthly} />
      </UserInfoProvider>
    );
    const title = screen.getByText('Finishing up');
    const btnChange = screen.getByRole('button', { name: /change/i });
    const txtTotal = screen.getByText(/Total/);
    expect(title).toBeVisible();
    expect(btnChange).toBeVisible();
    expect(txtTotal).toBeVisible();
  });

  it('Should get the correct information from context', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoMonthly} />
      </UserInfoProvider>
    );

    const elements = [];
    elements.push(screen.getByText(/pro \(monthly\)/i));
    elements.push(screen.getByText(/Online service/));
    elements.push(screen.getByText(/Larger storage/));
    elements.push(screen.getByText(/customizable Profile/));
    elements.push(screen.getByText(/total \(per month\)/i));

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });

  it('Should get the correct information from context', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoYearly} />
      </UserInfoProvider>
    );

    const plan = screen.getByText(/arcade \(yearly\)/i);
    expect(plan).toBeVisible();

    const txtTotal = screen.getByText(/total \(per year\)/i);
    expect(txtTotal).toBeInTheDocument();
  });

  it('Should hide the actual form and render the expected', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoMonthly} />
      </UserInfoProvider>
    );
    const btnChange = screen.getByRole('button', { name: /change/i });
    await userEvent.click(btnChange);
    expect(btnChange).not.toBeVisible();
    const title = screen.getByText('Select your plan');
    expect(title).toBeVisible();
  });
});

describe('SummaryForm Tests - Incorrect context', () => {
  it('Should display "Context was not loaded properly" if the MultiStepFormContext fail to load', () => {
    render(
      <UserInfoProvider>
        <SummaryForm key="SummaryForm" />
      </UserInfoProvider>
    );

    const error = screen.getByText('Context was not loaded properly');
    expect(error).toBeInTheDocument();
  });
});
