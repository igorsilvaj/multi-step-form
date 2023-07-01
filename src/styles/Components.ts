import styled, { css } from 'styled-components';
import color from './Colors';
import bgSidebarMobile from '../assets/images/bg-sidebar-mobile.svg';
import bgSidebarDesktop from '../assets/images/bg-sidebar-desktop.svg';

const highlight = css`
  color: ${color.marineBlue};
  font-weight: 700;
`;

const fade = css`
  font-size: 0.9em;
`;

export const Main = styled.main`
  background-color: ${color.magnolia};
  height: 100vh;
  width: 100%;
  min-width: 375px;

  @media screen and (width > 1000px) {
    align-items: center;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
  }
`;

export const FormContainer = styled.section`
  background-color: transparent;
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  margin-top: 90px;
  min-width: 375px;

  @media screen and (width > 1280px) {
    background-color: ${color.white};
    border-radius: 10px;
    flex-flow: row wrap;
    height: 640px;
    justify-content: flex-start;
    margin-top: 0;
    padding: 20px;
    width: 965px;
  }
`;

export const SideBar = styled.nav`
  background-image: url(${bgSidebarMobile});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  height: 158px;
  gap: 0 10px;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 375px;

  @media screen and (width > 1280px) {
    background-image: url(${bgSidebarDesktop});
    border-radius: 10px;
    height: 100%;
    min-width: 150px;
    max-width: 270px;
    padding: 40px 35px;
    position: static;
  }
`;

export const SideBarWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  height: 90px;

  @media screen and (width > 1280px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 30px 0;
    height: auto;
    width: 250px;
  }
`;

export const SideBarItem = styled.label`
  background-color: transparent;
  cursor: pointer;
  *:not(:first-child) {
    display: none;
  }
  @media screen and (width > 1280px) {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 0 15px;
    height: 40px;
    *:not(:first-child) {
      display: block;
    }
  }
`;

export const SideBarButton = styled.button<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ?? false ? color.lightBlue : 'transparent')};
  border: ${(props) => (props.isActive ?? false ? 'none' : `1px solid ${color.white}`)};
  border-radius: 50%;
  color: ${(props) => (props.isActive ?? false ? color.marineBlue : color.white)};
  font-weight: 700;
  height: 33px;
  width: 33px;
`;

export const SideBarText = styled.div`
  p:nth-child(1) {
    color: ${color.lightGray};
    font-size: 0.8em;
  }
  p:nth-child(2) {
    color: ${color.white};
    font-weight: 500;
    margin-top: 5px;
  }
`;

export const Form = styled.form`
  background-color: transparent;
  display: flex;
  position: absolute;
  top: 90px;
  justify-content: center;

  @media screen and (width > 1280px) {
    align-items: center;
    flex-flow: column wrap;
    flex-grow: 1;
    height: 100%;
    position: static;
  }
`;

export const FormWrapper = styled.section`
  background-color: ${color.white};
  border-radius: 10px;
  box-shadow: 1px 5px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column wrap;
  gap: 15px;
  justify-content: flex-start;
  min-height: 200px;
  padding: 30px 25px 25px;
  min-width: 345px;
  max-width: 90%;

  @media screen and (width > 1280px) {
    min-width: 500px;
    max-width: 500px;
    box-shadow: none;
    flex-grow: 1;
  }
`;

export const ButtonContainer = styled.section`
  background-color: ${color.white};
  bottom: 0;
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
  left: 0;
  padding: 15px;
  position: fixed;
  width: 100%;

  @media screen and (width > 1280px) {
    position: static;
    padding: 15px 100px;
    width: 100%;
  }
`;

export const NextStepButton = styled.button`
  background-color: ${color.marineBlue};
  border-radius: 5px;
  color: ${color.white};
  font-weight: 400;
  padding: 12px 15px;

  @media screen and (width > 1280px) {
    padding: 16px 22px;
  }
`;

export const GoBackButton = styled.button`
  background-color: transparent;
  color: ${color.coolGray};
  padding-left: 5px;
  &:focus {
    color: ${color.marineBlue};
    font-weight: 500;
  }
`;

export const ConfirmButton = styled.button`
  background-color: ${color.purplishBlue};
  border-radius: 5px;
  color: ${color.white};
  font-weight: 400;
  padding: 12px 21px;

  @media screen and (width > 1280px) {
    padding: 16px 32px;
  }
`;

export const Title = styled.h1`
  color: ${color.marineBlue};
  font-weight: bold;
  font-size: 1.5em;

  @media screen and (width > 1280px) {
    font-size: 2em;
  }
`;

export const Subtitle = styled.h2`
  color: ${color.coolGray};
  font-size: 1em;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 10px;

  @media screen and (width > 1280px) {
    margin-bottom: 20px;
  }
`;

export const Text = styled.p<{ className?: string; fontSize?: string }>`
  color: ${color.coolGray};
  font-size: 1em;
  font-weight: 400;

  ${(props) => (props.className?.includes('highlight') ?? false) && highlight}
  ${(props) => (props.className?.includes('fade') ?? false) && fade}
    
  ${(props) =>
    props.fontSize != null &&
    css`
      font-size: ${props.fontSize};
    `}
`;

export const FormInputContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const Label = styled.label`
  color: ${color.marineBlue};
  font-weight: 500;
  font-size: 0.8em;
`;

export const TextBox = styled.input<{ hasErrors?: boolean }>`
  border: 1px solid ${(props) => (props.hasErrors ?? false ? color.strawberryRed : color.lightGray)};
  border-radius: 5px;
  color: ${color.marineBlue};
  font-weight: 500;
  padding: 10px;
  margin-top: 3px;
  width: 100%;

  ::placeholder {
    color: ${color.coolGray};
    font-weight: 500;
  }

  &:focus {
    border: 2px solid ${color.purplishBlue};
  }

  @media screen and (width > 1280px) {
    font-size: 1.2em;
    padding: 12px;
    margin-bottom: 15px;
  }
`;

export const FormValidationError = styled.span`
  align-self: flex-end;
  color: ${color.strawberryRed};
  font-size: 0.9em;
  font-weight: 700;
`;

export const PlansContainer = styled.div`
  @media screen and (width > 1280px) {
    display: flex;
    flex-flow: row wrap;
    gap: 0 22px;
  }
`;

export const Plan = styled.label<{ isActive?: boolean; className?: string }>`
  border: 1px solid ${(props) => (props.isActive ?? false ? color.purplishBlue : color.lightGray)};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  margin-bottom: 15px;
  min-height: 85px;
  padding: 10px;
  position: relative;

  @media screen and (width > 1280px) {
    height: 180px;
    padding: 15px;
    width: 135px;

    *:nth-child(2) {
      width: 100%;
    }
  }
`;

export const Option = styled.input`
  height: 0;
  visibility: hidden;
  width: 0;
`;

export const OptionInfo = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 7px;
`;

export const ToggleContainer = styled.div`
  align-items: center;
  background-color: ${color.alabaster};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  @media screen and (width > 1280px) {
    margin-top: 10px;
  }
`;

export const ToggleInput = styled.input`
  height: 0;
  visibility: hidden;
  width: 0;
`;

export const ToggleLabel = styled.label`
  background-color: ${color.marineBlue};
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  height: 25px;
  position: relative;
  transition: background-color 0.2s;
  margin-right: 10px;
  width: 45px;
`;

export const ToggleButton = styled.span`
  content: '';
  background: ${color.white};
  border-radius: 50%;
  height: 16px;
  left: 4px;
  position: absolute;
  top: 4px;
  transition: 0.2s;
  width: 16px;
  ${ToggleInput}:checked + ${ToggleLabel} & {
    left: calc(100% - 4px);
    transform: translateX(-100%);
  }

  ${ToggleLabel}:active & {
    width: 25px;
  }
`;

export const ToggleText = styled.p<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ?? false ? color.marineBlue : color.coolGray)};
  font-weight: 500;
`;

export const AddonContainer = styled.label<{ isActive?: boolean; className?: string }>`
  align-items: center;
  border: 1px solid ${(props) => (props.isActive ?? false ? color.purplishBlue : color.lightGray)};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  min-height: 65px;
  padding: 0 15px;

  p:nth-child(1) {
    /* color: ${color.marineBlue}; */
    font-weight: 700;
    font-size: 0.9em;
  }
  p:nth-child(2) {
    color: ${color.coolGray};
    font-size: 0.8em;
  }
  p:nth-child(4) {
    color: ${color.purplishBlue};
    font-size: 0.8em;
  }

  @media screen and (width > 1280px) {
    min-height: 85px;
    padding: 0 25px;
    p:nth-child(1) {
      font-size: 1em;
    }
    p:nth-child(2) {
      font-size: 0.9em;
    }
    p:nth-child(4) {
      font-size: 0.9em;
    }
  }
`;

export const AddonCheckBox = styled.div<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ?? false ? color.purplishBlue : 'transparent')};
  border: 1px solid ${(props) => (props.isActive ?? false ? 'transparent' : color.lightGray)};
  border-radius: 3px;
  height: 20px;
  width: 20px;

  &::after {
    content: '';
    position: relative;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 8px;
    border: solid ${color.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: ${(props) => (props.isActive ?? false ? 'block' : 'none')};
  }
`;

export const AddonInfo = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 5px;
  max-width: 210px;
  min-width: 180px;
  flex-grow: 1;
  padding: 0 10px;
  @media screen and (width > 1280px) {
    max-width: 330px;
  }
`;

export const CheckoutContainer = styled.div`
  background-color: ${color.alabaster};
  border-radius: 5px;
  display: flex;
  flex-flow: row wrap;
  padding: 20px 20px 0;

  @media screen and (width > 1280px) {
    gap: 10px 0;
  }
`;

export const ChangePlanButton = styled.button`
  background-color: transparent;
  color: ${color.coolGray};
  text-decoration: underline;
  font-weight: 500;
  margin-top: 5px;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid ${color.lightGray};
  margin: 5px 0 15px;
  width: 100%;
`;

export const CheckoutInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  .align {
    transform: translateY(10px);
  }

  .addonCheckout {
    color: ${color.marineBlue};
    margin-bottom: 20px;
  }
`;

export const CheckoutTotal = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 10px 20px 0;

  p:nth-child(2) {
    color: ${color.purplishBlue};
    font-size: 1em;
    font-weight: 700;
  }

  @media screen and (width > 1280px) {
    p:nth-child(2) {
      font-size: 1.3em;
    }
  }
`;

export const FormSubmissionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  height: 100%;
  justify-content: center;
  padding: 40px 0;

  *:nth-child(3) {
    text-align: center;
    line-height: 25px;
    max-width: 300px;
  }

  @media screen and (width > 1280px) {
    *:nth-child(3) {
      max-width: 600px;
    }
  }
`;

export const IconThankYou = styled.img`
  width: 55px;

  @media screen and (width > 1280px) {
    width: 80px;
  }
`;
