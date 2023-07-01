import { createContext, type ReactElement, type FormEvent, useState } from 'react';
import useMultiStepForm from '../hooks/useMultiStepForm';
import YourInfoForm from './YourInfoForm';
import SelectPlanForm from './SelectPlanForm';
import AddonsForm from './AddonsForm';
import SummaryForm from './SummaryForm';
import FormSubmissionSuccess from './FormSubmissionSuccess';
import useUserInfoContext from '../hooks/useUserInfoContext';
import validations from '../helpers/validations';
import FormNavigation from './FormNavigation';
import {
  ButtonContainer,
  ConfirmButton,
  Form,
  FormContainer,
  GoBackButton,
  NextStepButton,
} from '../styles/Components';

const formsToLoad = [
  <YourInfoForm key="YourInfoForm" />,
  <SelectPlanForm key="SelectPlan" />,
  <AddonsForm key="AddonsForm" />,
  <SummaryForm key="SummaryForm" />,
];

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

export default function MultiStepForm() {
  const formControl = useMultiStepForm(formsToLoad);
  const { userInfo, setUserInfo } = useUserInfoContext();
  const [submited, setSubmited] = useState(false);
  const { step, isFirstStep, isLastStep, back, next } = formControl;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const finishForm = () => {
    const validate = validations.validateAll(userInfo);
    if (!Object.values(validate).every((e) => e === null)) {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, ...validate } });
      formControl.goTo(0);
    } else {
      setSubmited(true);
    }
  };

  return (
    <FormContainer>
      <MultiStepFormContext.Provider value={formControl}>
        <FormNavigation />
        <Form onSubmit={onSubmit}>
          {submited ? (
            <FormSubmissionSuccess />
          ) : (
            <>
              {step}
              <ButtonContainer>
                {isLastStep && <ConfirmButton onClick={finishForm}>Confirm</ConfirmButton>}
                {!isLastStep && <NextStepButton onClick={next}>Next Step</NextStepButton>}
                {!isFirstStep && <GoBackButton onClick={back}>Go Back</GoBackButton>}
              </ButtonContainer>
            </>
          )}
        </Form>
      </MultiStepFormContext.Provider>
    </FormContainer>
  );
}
