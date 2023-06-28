import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import UserInfoProvider from '../../src/contexts/UserInfoContext';
import YourInfoForm from '../../src/components/YourInfoForm';

describe('YourInfoForm Tests', () => {
  beforeEach(() => {
    render(
      <UserInfoProvider>
        <YourInfoForm />
      </UserInfoProvider>
    );
  });

  it('Should render correctly', () => {
    const title = screen.getByText('Personal info');
    const inputs = screen.getAllByRole('textbox');
    expect(title).toBeVisible();
    expect(inputs.length).toBe(3);
  });

  it('Should display error messages correctly', async () => {
    const title = screen.getByText('Personal info');
    const inputs = screen.getAllByRole('textbox');

    await userEvent.click(inputs[0]);
    await userEvent.click(title);
    const errorRequired = screen.getByText('This field is required');
    expect(errorRequired).toBeVisible();

    await userEvent.type(inputs[0], 'Stephen K');
    await userEvent.click(title);
    const errorLength = screen.getByText('Minimum lenght is 10');
    expect(errorLength).toBeVisible();

    await userEvent.type(inputs[0], 'Stephen King');
    await userEvent.click(title);
    expect(errorLength).not.toBeVisible();

    await userEvent.click(inputs[1]);
    await userEvent.click(title);
    const errorRequiredEmail = screen.getByText('This field is required');
    expect(errorRequiredEmail).toBeVisible();

    await userEvent.type(inputs[1], 'stephenking@lorem.com');
    await userEvent.click(title);
    expect(errorRequiredEmail).not.toBeVisible();

    await userEvent.click(inputs[2]);
    await userEvent.click(title);
    const errorRequiredPhone = screen.getByText('This field is required');
    expect(errorRequiredPhone).toBeVisible();

    await userEvent.type(inputs[2], '+1 234 567 890');
    await userEvent.click(title);
    expect(errorRequiredPhone).not.toBeVisible();
  });
});
