import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import UserInfoProvider from '../../src/contexts/UserInfoContext';
import MultiStepForm from '../../src/components/MultiStepForm';
import FormNavigation from '../../src/components/FormNavigation';
import { vi } from 'vitest';

describe('FormNavigation Tests', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('Should render correctly', () => {
    render(
      <UserInfoProvider>
        <MultiStepForm />
      </UserInfoProvider>
    );
    screen.getByRole('button', { name: /step 1 your info/i });
    screen.getByRole('button', { name: /step 2 select plan/i });
    screen.getByRole('button', { name: /step 3 add-ons/i });
    screen.getByRole('button', { name: /step 4 summary/i });
  });

  it('Should throw an error if context is not available', async () => {
    render(<FormNavigation />);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const btnNavigation = screen.getByRole('button', {
      name: /step 1 your info/i,
    });

    await userEvent.click(btnNavigation);

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Context was not loaded properly')
    );
  });
});
