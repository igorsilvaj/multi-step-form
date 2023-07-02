import { useContext } from 'react';
import {
  SideBar,
  SideBarItem,
  SideBarButton,
  SideBarWrapper,
  SideBarText,
} from '../styles/Components';
import { MultiStepFormContext } from '../contexts/MultiStepFormContext';

export default function FormNavigation() {
  const { goTo, currStep } = useContext(MultiStepFormContext) ?? {};
  const contextError = 'Context was not loaded properly';
  return (
    <SideBar>
      <SideBarWrapper>
        <SideBarItem
          onClick={() => {
            goTo != null ? goTo(0) : console.error(contextError);
          }}
          htmlFor="form1"
        >
          <SideBarButton id="form1" isActive={currStep === 0}>
            1
          </SideBarButton>
          <SideBarText>
            <p>STEP 1</p>
            <p>YOUR INFO</p>
          </SideBarText>
        </SideBarItem>
        <SideBarItem
          onClick={() => {
            goTo != null ? goTo(1) : console.error(contextError);
          }}
          htmlFor="form2"
        >
          <SideBarButton id="form2" isActive={currStep === 1}>
            2
          </SideBarButton>
          <SideBarText>
            <p>STEP 2</p>
            <p>SELECT PLAN</p>
          </SideBarText>
        </SideBarItem>
        <SideBarItem
          onClick={() => {
            goTo != null ? goTo(2) : console.error(contextError);
          }}
          htmlFor="form3"
        >
          <SideBarButton id="form3" isActive={currStep === 2}>
            3
          </SideBarButton>
          <SideBarText>
            <p>STEP 3</p>
            <p>ADD-ONS</p>
          </SideBarText>
        </SideBarItem>
        <SideBarItem
          onClick={() => {
            goTo != null ? goTo(3) : console.error(contextError);
          }}
          htmlFor="form4"
        >
          <SideBarButton id="form4" isActive={currStep === 3}>
            4
          </SideBarButton>
          <SideBarText>
            <p>STEP 4</p>
            <p>SUMMARY</p>
          </SideBarText>
        </SideBarItem>
      </SideBarWrapper>
    </SideBar>
  );
}
