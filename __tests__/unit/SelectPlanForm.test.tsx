import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import UserInfoProvider, { UserInfoContext } from '../../src/contexts/UserInfoContext';
import SelectPlanForm from '../../src/components/SelectPlanForm';

function TestComponent() {
  const { userInfo } = useContext(UserInfoContext) ?? {};

  return (
    <div>
      <span title="testPaymentFreq">{`test: ${userInfo.isYearly}`}</span>
      <span title="testSelectedPlan">{`test: ${userInfo.plan}`}</span>
    </div>
  );
}

describe('SelectPlanForm Tests', () => {
  it('Should render correctly', () => {
    render(
      <UserInfoProvider>
        <SelectPlanForm />
      </UserInfoProvider>
    );

    const title = screen.getByText('Select your plan');
    const plan1 = screen.getByText(/arcade/i);
    const plan2 = screen.getByText(/advanced/i);
    const plan3 = screen.getByText(/pro/i);
    const radioBtn = screen.queryAllByTitle('radio');
    expect(title).toBeVisible();
    expect(plan1).toBeVisible();
    expect(plan2).toBeVisible();
    expect(plan3).toBeVisible();
    expect(radioBtn.length).toBe(3);
  });

  it('Should update the context correctly', async () => {
    const { getByTitle } = render(
      <>
        <UserInfoProvider>
          <SelectPlanForm />
          <TestComponent />
        </UserInfoProvider>
      </>
    );
    const paymentFreq = screen.getByTitle('checkbox');
    const proPlan = screen.getByText(/pro/i);
    const testPaymentFreq = getByTitle('testPaymentFreq');
    const testSelectedPlan = getByTitle('testSelectedPlan');

    expect(testSelectedPlan.innerHTML).toBe('test: Arcade');
    expect(testPaymentFreq.innerHTML).toBe('test: false');

    await userEvent.click(proPlan);
    await userEvent.click(paymentFreq);
    expect(testSelectedPlan.innerHTML).toBe('test: Pro');
    expect(testPaymentFreq.innerHTML).toBe('test: true');

    const extraText = await screen.findAllByText('2 months free');
    expect(extraText.length).toBe(3);
  });
});
