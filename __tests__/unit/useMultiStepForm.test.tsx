import { act, renderHook } from '@testing-library/react';
import useMultiStepForm from '../../src/hooks/useMultiStepForm';
import React from 'react';

describe('useMultiStepForm hook Tests', () => {
  it('Should start at the right step', () => {
    const component1 = <div key="step1">step1</div>;
    const component2 = <div key="step2">step2</div>;
    const steps = [component1, component2];
    const { result } = renderHook(() => useMultiStepForm(steps));
    expect(result.current.currStep).toBe(0);
    expect(result.current.step).toBe(steps[0]);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  it('Should proceed to the next step', () => {
    const steps = [<div key="step1">Passo 1</div>, <div key="step2">Passo 2</div>];
    const { result } = renderHook(() => useMultiStepForm(steps));
    act(() => {
      result.current.next();
    });
    expect(result.current.currStep).toBe(1);
    expect(result.current.step).toBe(steps[1]);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });

  it('Should go back to the previous step', () => {
    const steps = [<div key="step1">Passo 1</div>, <div key="step2">Passo 2</div>];
    const { result } = renderHook(() => useMultiStepForm(steps));
    act(() => {
      result.current.next();
      result.current.back();
    });
    expect(result.current.currStep).toBe(0);
    expect(result.current.step).toBe(steps[0]);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  it('Should go to a specific step', () => {
    const steps = [<div key="step1">Passo 1</div>, <div key="step2">Passo 2</div>];
    const { result } = renderHook(() => useMultiStepForm(steps));
    act(() => {
      result.current.goTo(1);
    });
    expect(result.current.currStep).toBe(1);
    expect(result.current.step).toBe(steps[1]);
    expect(result.current.isFirstStep).toBe(false);
    expect(result.current.isLastStep).toBe(true);
  });
});
