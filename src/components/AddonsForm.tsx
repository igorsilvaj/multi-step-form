import useUserInfoContext from '../hooks/useUserInfoContext';
import { addons, discount } from '../helpers/billingInfo.json';

export default function AddonsForm() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const multiplier = userInfo.isYearly ? 12 - discount : 1;

  return (
    <section>
      <p>Pick Add-ons</p>
      <p>Add-ons help enhance your gaming experience.</p>
      <div>
        <input
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
        <p>Online service</p>
        <p>Access to multiplayer games</p>
        <p>+${addons.onlineService * multiplier}/mo</p>
      </div>
      <div>
        <input
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
        <p>Larger storage</p>
        <p>Extra 1TB of cloud save</p>
        <p>+${addons.largerStorage * multiplier}/mo</p>
      </div>
      <div>
        <input
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
        <p>Customizable Profile</p>
        <p>Custom theme on your profile</p>
        <p>+${addons.customProfile * multiplier}/mo</p>
      </div>
    </section>
  );
}
