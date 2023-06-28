import { type MultiStepForm } from '@interfaces/index';
import { useState, type ReactElement } from 'react';

export default function useMultiStepForm(steps: ReactElement[]): MultiStepForm {
  const [currStep, setCurrStep] = useState(0);

  const step = steps[currStep];

  const isFirstStep = currStep === 0;

  const isLastStep = currStep === steps.length - 1;

  const next = (): void => {
    setCurrStep((prevStep) => {
      const nextStep = prevStep + 1;
      return nextStep >= steps.length ? prevStep : nextStep;
    });
  };

  const back = (): void => {
    setCurrStep((prevStep) => {
      const previousStep = prevStep - 1;
      return previousStep < 0 ? prevStep : previousStep;
    });
  };

  const goTo = (index: number): void => {
    setCurrStep(index);
  };

  return {
    step,
    steps,
    currStep,
    isFirstStep,
    isLastStep,
    goTo,
    next,
    back,
  };
}
