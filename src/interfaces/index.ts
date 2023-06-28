import { type ReactElement } from 'react';

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  plan: string;
  isYearly: boolean;
  addons: {
    onlineService: boolean;
    largerStorage: boolean;
    customProfile: boolean;
  };
  error: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
}

export interface MultiStepForm {
  step: ReactElement;
  steps: ReactElement[];
  currStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
}
