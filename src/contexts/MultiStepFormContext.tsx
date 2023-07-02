import { type ReactElement, createContext } from 'react';

interface ContextValue {
  step: ReactElement<any, string | React.JSXElementConstructor<any>>;
  steps: Array<ReactElement<any, string | React.JSXElementConstructor<any>>>;
  currStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  back: () => void;
  next: () => void;
  goTo: (index: number) => void;
}

export const MultiStepFormContext = createContext<ContextValue | null>(null);
