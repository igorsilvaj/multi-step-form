import useUserInfoContext from '../hooks/useUserInfoContext';
import iconArcade from '../assets/images/icon-arcade.svg';
import iconAdvanced from '../assets/images/icon-advanced.svg';
import iconPro from '../assets/images/icon-pro.svg';
import { plans, discount } from '../helpers/billingInfo.json';
import {
  FormWrapper,
  Label,
  Option,
  Plan,
  OptionInfo,
  PlansContainer,
  Subtitle,
  Text,
  Title,
  ToggleButton,
  ToggleContainer,
  ToggleInput,
  ToggleLabel,
  ToggleText,
} from '../styles/Components';

export default function SelectPlanForm() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const multiplier = userInfo.isYearly ? 12 - discount : 1;
  const abbr = userInfo.isYearly ? 'yr' : 'mo';

  return (
    <FormWrapper>
      <Title>Select your plan</Title>
      <Subtitle>You have the option of monthly or yearly billing.</Subtitle>
      <PlansContainer>
        <Plan htmlFor="arcade" isActive={userInfo.plan === 'Arcade'}>
          <img src={iconArcade} alt="arcade_icon" />
          <Option
            type="radio"
            value="Arcade"
            id="arcade"
            checked={userInfo.plan === 'Arcade'}
            onChange={(e) => {
              setUserInfo({ ...userInfo, plan: e.target.value });
            }}
          />
          <OptionInfo>
            <Text className="highlight">Arcade</Text>
            <Text className="fade">
              ${plans.arcade * multiplier}/{abbr}
            </Text>
            {userInfo.isYearly && <Label>{discount} months free</Label>}
          </OptionInfo>
        </Plan>
        <Plan htmlFor="advanced" isActive={userInfo.plan === 'Advanced'}>
          <img src={iconAdvanced} alt="advanced_icon" />
          <Option
            type="radio"
            value="Advanced"
            id="advanced"
            checked={userInfo.plan === 'Advanced'}
            onChange={(e) => {
              setUserInfo({ ...userInfo, plan: e.target.value });
            }}
          />
          <OptionInfo>
            <Text className="highlight">Advanced</Text>
            <Text className="fade">
              ${plans.advanced * multiplier}/{abbr}
            </Text>
            {userInfo.isYearly && <Label>{discount} months free</Label>}
          </OptionInfo>
        </Plan>
        <Plan htmlFor="pro" isActive={userInfo.plan === 'Pro'}>
          <img src={iconPro} alt="pro_icon" />
          <Option
            type="radio"
            value="Pro"
            id="pro"
            checked={userInfo.plan === 'Pro'}
            onChange={(e) => {
              setUserInfo({ ...userInfo, plan: e.target.value });
            }}
          />
          <OptionInfo>
            <Text className="highlight">Pro</Text>
            <Text className="fade">
              ${plans.pro * multiplier}/{abbr}
            </Text>
            {userInfo.isYearly && <Label>{discount} months free</Label>}
          </OptionInfo>
        </Plan>
      </PlansContainer>

      <ToggleContainer>
        <ToggleText isActive={!userInfo.isYearly}>Monthly</ToggleText>
        <ToggleInput
          className="switch-checkbox"
          id="switchInput"
          type="checkbox"
          checked={userInfo.isYearly}
          onChange={() => {
            setUserInfo({ ...userInfo, isYearly: !userInfo.isYearly });
          }}
        />
        <ToggleLabel className="switch-label" htmlFor="switchInput">
          <ToggleButton className="switch-button" />
        </ToggleLabel>
        <ToggleText isActive={userInfo.isYearly}>Yearly</ToggleText>
      </ToggleContainer>
    </FormWrapper>
  );
}
