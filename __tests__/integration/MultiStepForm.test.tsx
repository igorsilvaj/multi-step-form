import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiStepForm from '../../src/components/MultiStepForm';
import React from 'react';
import UserInfoProvider from '../../src/contexts/UserInfoContext';

describe('Integration between the main component and the forms it loads', () => {
  beforeEach(() => {
    render(
      <UserInfoProvider>
        <MultiStepForm />
      </UserInfoProvider>
    );
  });

  it('Should render the first form', async () => {
    const firstFormTitle = screen.getByText('Personal info');
    const btnGoBack = screen.queryByText('Go Back');

    expect(firstFormTitle).toBeInTheDocument();
    expect(btnGoBack).toBeNull();
  });

  it('Should hide the actual form and render the next', async () => {
    const btnNextStep = screen.getByRole('button', { name: /Next Step/i });

    await userEvent.click(btnNextStep);

    const firstFormTitle = screen.queryByText('Personal info');
    const secondFormTitle = screen.getByText('Select your plan');
    expect(firstFormTitle).toBeNull();
    expect(secondFormTitle).toBeInTheDocument();
  });

  it('Should hide the actual form and render the previous', async () => {
    const btnNextStep = screen.getByRole('button', { name: /Next Step/i });
    await userEvent.click(btnNextStep);
    screen.getByText('Select your plan');
    const btnGoBack = screen.getByRole('button', { name: /Go Back/i });

    await userEvent.click(btnGoBack);
    const firstFormTitle = screen.getByText('Personal info');
    expect(firstFormTitle).toBeInTheDocument();
  });

  it('Should be possible to go to the last form', async () => {
    const btnNextStep = screen.getByRole('button', { name: /Next Step/i });

    await userEvent.click(btnNextStep);
    await userEvent.click(btnNextStep);
    await userEvent.click(btnNextStep);
    const btnFinish = screen.getByRole('button', { name: /Confirm/i });

    expect(btnFinish).toBeVisible();
  });

  it('Should hide the last form and show a confirmation', async () => {
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'Stephen King');
    await userEvent.type(inputs[1], 'stephenking@lorem.com');
    await userEvent.type(inputs[2], '+1 234 567 890');
    const btnNextStep = screen.getByRole('button', { name: /Next Step/i });
    await userEvent.click(btnNextStep);
    await userEvent.click(btnNextStep);
    await userEvent.click(btnNextStep);
    const btnFinish = screen.getByRole('button', { name: /Confirm/i });

    expect(btnFinish).toBeVisible();
    await userEvent.click(btnFinish);
    const confirmation = screen.getByText(/Thanks for confirming your subscription!/);
    expect(confirmation).toBeVisible();
  });

  it('Should display the correct form when using the navigation component', async () => {
    const btnNavigation = screen.getByLabelText(/step 4summary/i);

    await userEvent.click(btnNavigation);

    const formTitle = screen.getByText('Finishing up');
    expect(formTitle).toBeVisible();
  });
});
