import { renderHook } from '@testing-library/react';
import useUserInfoContext from '../../src/hooks/useUserInfoContext';
import React, { ReactElement } from 'react';
import UserInfoProvider from '../../src/contexts/UserInfoContext';
import { vi } from 'vitest';

const provider = ({ children }: { children: ReactElement }) => {
  return <UserInfoProvider>{children}</UserInfoProvider>;
};

describe('useUserInfoContext hook Tests', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('Should return the correct context', () => {
    const { result } = renderHook(() => useUserInfoContext(), {
      wrapper: provider,
    });
    expect(result.current.userInfo.plan).toBe('Arcade');
  });

  it('Should throw an error', () => {
    expect(() => renderHook(() => useUserInfoContext())).toThrow();
  });
});
