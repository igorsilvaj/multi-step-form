import useUserInfoContext from '../hooks/useUserInfoContext';
import iconArcade from '../assets/images/icon-arcade.svg';
import iconAdvanced from '../assets/images/icon-advanced.svg';
import iconPro from '../assets/images/icon-pro.svg';
import { plans, discount } from '../helpers/billingInfo.json';

export default function SelectPlanForm() {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const multiplier = userInfo.isYearly ? 12 - discount : 1;

  return (
    <section>
      <p>Select your plan</p>
      <p>You have the option of monthly or yearly billing.</p>
      <div>
        <img src={iconArcade} alt="arcade_icon" />
        <p>Arcade</p>
        <p>${plans.arcade * multiplier}/mo</p>
        {userInfo.isYearly && <p>{discount} mounths free</p>}
        <input
          type="radio"
          value="Arcade"
          checked={userInfo.plan === 'Arcade'}
          onChange={(e) => {
            setUserInfo({ ...userInfo, plan: e.target.value });
          }}
        />
      </div>
      <div>
        <img src={iconAdvanced} alt="advanced_icon" />
        <p>Advanced</p>
        <p>${plans.advanced * multiplier}/mo</p>
        {userInfo.isYearly && <p>{discount} mounths free</p>}
        <input
          type="radio"
          value="Advanced"
          checked={userInfo.plan === 'Advanced'}
          onChange={(e) => {
            setUserInfo({ ...userInfo, plan: e.target.value });
          }}
        />
      </div>
      <div>
        <img src={iconPro} alt="pro_icon" />
        <p>Pro</p>
        <p>${plans.pro * multiplier}/mo</p>
        {userInfo.isYearly && <p>{discount} mounths free</p>}
        <input
          type="radio"
          value="Pro"
          checked={userInfo.plan === 'Pro'}
          onChange={(e) => {
            setUserInfo({ ...userInfo, plan: e.target.value });
          }}
        />
      </div>
      <div>
        <p>Monthly</p>
        <input
          type="checkbox"
          checked={userInfo.isYearly}
          onChange={() => {
            setUserInfo({ ...userInfo, isYearly: !userInfo.isYearly });
          }}
        />
        <p>Yearly</p>
      </div>
    </section>
  );
}
