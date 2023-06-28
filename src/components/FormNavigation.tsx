import { useContext } from 'react';
import { MultiStepFormContext } from './MultiStepForm';

export default function FormNavigation() {
  const { goTo } = useContext(MultiStepFormContext) ?? {};
  const contextError = 'Context was not loaded properly';
  return (
    <div>
      <div>
        <button
          onClick={() => {
            goTo != null ? goTo(0) : console.error(contextError);
          }}
        >
          <img src="" alt="" />
          <p>STEP 1</p>
          <p>YOUR INFO</p>
        </button>
        <button
          onClick={() => {
            goTo != null ? goTo(1) : console.error(contextError);
          }}
        >
          <img src="" alt="" />
          <p>STEP 2</p>
          <p>SELECT PLAN</p>
        </button>
        <button
          onClick={() => {
            goTo != null ? goTo(2) : console.error(contextError);
          }}
        >
          <img src="" alt="" />
          <p>STEP 3</p>
          <p>ADD-ONS</p>
        </button>
        <button
          onClick={() => {
            goTo != null ? goTo(3) : console.error(contextError);
          }}
        >
          <img src="" alt="" />
          <p>STEP 4</p>
          <p>SUMMARY</p>
        </button>
      </div>
    </div>
  );
}
