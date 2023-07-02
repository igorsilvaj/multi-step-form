import useUserInfoContext from '../hooks/useUserInfoContext';
import { addons, discount } from '../helpers/billingInfo.json';
import {
  FormWrapper,
  AddonContainer,
  Title,
  Subtitle,
  AddonCheckBox,
  Option,
  AddonInfo,
} from '../styles/Components';

export default function AddonsForm() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const multiplier = userInfo.isYearly ? 12 - discount : 1;
  const abbr = userInfo.isYearly ? 'yr' : 'mo';

  return (
    <FormWrapper>
      <Title>Pick Add-ons</Title>
      <Subtitle>Add-ons help enhance your gaming experience.</Subtitle>
      <AddonContainer htmlFor="onlineService" isActive={userInfo.addons.onlineService}>
        <Option
          id="onlineService"
          className="addon"
          type="checkbox"
          checked={userInfo.addons.onlineService}
          onChange={() => {
            setUserInfo({
              ...userInfo,
              addons: {
                ...userInfo.addons,
                onlineService: !userInfo.addons.onlineService,
              },
            });
          }}
        />
        <AddonCheckBox title="checkbox" isActive={userInfo.addons.onlineService} />
        <AddonInfo>
          <p>Online service</p>
          <p>Access to multiplayer games</p>
        </AddonInfo>
        <p>
          +${addons.onlineService * multiplier}/{abbr}
        </p>
      </AddonContainer>
      <AddonContainer htmlFor="largerStorage" isActive={userInfo.addons.largerStorage}>
        <Option
          className="addon"
          id="largerStorage"
          type="checkbox"
          checked={userInfo.addons.largerStorage}
          onChange={() => {
            setUserInfo({
              ...userInfo,
              addons: {
                ...userInfo.addons,
                largerStorage: !userInfo.addons.largerStorage,
              },
            });
          }}
        />
        <AddonCheckBox title="checkbox" isActive={userInfo.addons.largerStorage} />
        <AddonInfo>
          <p>Larger storage</p>
          <p>Extra 1TB of cloud save</p>
        </AddonInfo>
        <p>
          +${addons.largerStorage * multiplier}/{abbr}
        </p>
      </AddonContainer>
      <AddonContainer htmlFor="customProfile" isActive={userInfo.addons.customProfile}>
        <Option
          id="customProfile"
          className="addon"
          type="checkbox"
          checked={userInfo.addons.customProfile}
          onChange={() => {
            setUserInfo({
              ...userInfo,
              addons: {
                ...userInfo.addons,
                customProfile: !userInfo.addons.customProfile,
              },
            });
          }}
        />
        <AddonCheckBox title="checkbox" isActive={userInfo.addons.customProfile} />
        <AddonInfo>
          <p>Customizable Profile</p>
          <p>Custom theme on your profile</p>
        </AddonInfo>
        <p>
          +${addons.customProfile * multiplier}/{abbr}
        </p>
      </AddonContainer>
    </FormWrapper>
  );
}
