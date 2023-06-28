import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import UserInfoProvider, { UserInfoContext } from '../../src/contexts/UserInfoContext';
import AddonsForm from '../../src/components/AddonsForm';

function TestComponent() {
  const { userInfo } = useContext(UserInfoContext) ?? {};

  return (
    <div>
      <span title="tester">{`test: ${userInfo.addons.onlineService}`}</span>
    </div>
  );
}

describe('AddonsForm Tests', () => {
  it('Should render correctly', () => {
    render(
      <UserInfoProvider>
        <AddonsForm />
      </UserInfoProvider>
    );

    const title = screen.getByText('Pick Add-ons');
    const plan1 = screen.getByText(/Online service/i);
    const plan2 = screen.getByText(/Larger storage/i);
    const plan3 = screen.getByText(/Customizable Profile/i);
    const checkbox = screen.getAllByRole('checkbox');
    expect(title).toBeVisible();
    expect(plan1).toBeVisible();
    expect(plan2).toBeVisible();
    expect(plan3).toBeVisible();
    expect(checkbox.length).toBe(3);
  });

  it('Should change the context correctly', async () => {
    const { getByTitle } = render(
      <>
        <UserInfoProvider>
          <AddonsForm />
          <TestComponent />
        </UserInfoProvider>
      </>
    );
    const onlineService = await screen.findAllByRole('checkbox');
    const updatedContext = getByTitle('tester');

    expect(updatedContext.innerHTML).toBe('test: false');
    await userEvent.click(onlineService[0]);
    expect(updatedContext.innerHTML).toBe('test: true');
  });
});
