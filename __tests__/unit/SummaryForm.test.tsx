import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext, useEffect } from 'react';
import UserInfoProvider, { UserInfoContext } from '../../src/contexts/UserInfoContext';
import { MultiStepFormContext } from '../../src/components/MultiStepForm';
import SummaryForm from '../../src/components/SummaryForm';
import useMultiStepForm from '../../src/hooks/useMultiStepForm';
import SelectPlanForm from '../../src/components/SelectPlanForm';
import { userInfoMounthly, userInfoYearly } from '../mocks/userInfoContext';

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
        <TestComponent context={userInfoMounthly} />
      </UserInfoProvider>
    );
    const title = screen.getByText('Finishing up');
    const btnChange = screen.getByRole('button', { name: /change/i });
    const txtTotal = screen.getByText(/Total/);
    expect(title).toBeVisible();
    expect(btnChange).toBeVisible();
    expect(txtTotal).toBeVisible();
  });

  it('Should render correct information from context', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoMounthly} />
      </UserInfoProvider>
    );
    const txtOnlineService = screen.getByText(/Online service/);
    expect(txtOnlineService.innerHTML).toContain('+$');
    expect(txtOnlineService.innerHTML).toContain('1');
    expect(txtOnlineService.innerHTML).toContain('mo');

    const txtLargerStorage = screen.getByText(/Larger storage/);
    expect(txtLargerStorage.innerHTML).toContain('+$');
    expect(txtLargerStorage.innerHTML).toContain('2');
    expect(txtLargerStorage.innerHTML).toContain('mo');

    const txtCustomizableProfile = screen.getByText(/customizable Profile/);
    expect(txtCustomizableProfile.innerHTML).toContain('+$');
    expect(txtCustomizableProfile.innerHTML).toContain('2');
    expect(txtCustomizableProfile.innerHTML).toContain('mo');

    const txtMounthly = screen.getByText(/Mounthly/i);
    expect(txtMounthly).toBeVisible();

    const txtTotal = screen.getByText(/total \(per year\)\//i);
    expect(txtTotal.innerHTML).toContain('$');
    expect(txtTotal.innerHTML).toContain('20');
    expect(txtTotal.innerHTML).toContain('mo');
  });

  it('Should render correct information from context', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoYearly} />
      </UserInfoProvider>
    );

    const txtMounthly = screen.getByText(/Yearly/i);
    expect(txtMounthly).toBeVisible();

    const txtTotal = screen.getByText(/total \(per year\)\//i);
    expect(txtTotal.innerHTML).toContain('$');
    expect(txtTotal.innerHTML).toContain('90');
    expect(txtTotal.innerHTML).toContain('yr');
  });

  it('Should hide the actual form and render the expected', async () => {
    render(
      <UserInfoProvider>
        <TestComponent context={userInfoMounthly} />
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
