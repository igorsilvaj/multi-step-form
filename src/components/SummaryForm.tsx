import { type ReactElement, useContext } from 'react';
import useUserInfoContext from '../hooks/useUserInfoContext';
import { MultiStepFormContext } from './MultiStepForm';
import { plans, addons, discount } from '../helpers/billingInfo.json';
import {
  ChangePlanButton,
  CheckoutContainer,
  CheckoutInfo,
  CheckoutTotal,
  FormWrapper,
  Line,
  Subtitle,
  Text,
  Title,
} from '../styles/Components';

export default function SummaryForm() {
  const { userInfo } = useUserInfoContext();
  const { steps, goTo } = useContext(MultiStepFormContext) ?? {};

  const getFinalValue = () => {
    const multiplier = userInfo.isYearly ? 12 - discount : 1;

    const plan = plans[userInfo.plan.toLowerCase() as keyof typeof plans];
    const mergedAddons = Object.entries(userInfo.addons).reduce(
      (acc: Record<string, number>, [key, value]) => {
        if (value) {
          acc[key] = addons[key as keyof typeof addons] * multiplier;
        }
        return acc;
      },
      {}
    );
    const totalPlan = plan * multiplier;
    const totalAddon = Object.values(mergedAddons).reduce((acc, act) => acc + act, 0);

    return {
      plan: totalPlan,
      onlineService: mergedAddons.onlineService,
      largerStorage: mergedAddons.largerStorage,
      customProfile: mergedAddons.customProfile,
      total: totalPlan + totalAddon,
    };
  };

  const finalValue = getFinalValue();
  const abbr = userInfo.isYearly ? 'yr' : 'mo';

  const selectPlanIndex =
    steps != null ? steps.findIndex((obj: ReactElement) => obj.key === 'SelectPlan') : 0;

  return (
    <FormWrapper>
      {steps !== undefined && goTo !== undefined ? (
        <>
          <Title>Finishing up</Title>
          <Subtitle>Double-check everything looks OK before confirming.</Subtitle>
          <CheckoutContainer>
            <CheckoutInfo>
              <div>
                <Text className="highlight">
                  {userInfo.plan} ({userInfo.isYearly ? 'Yearly' : 'Monthly'})
                </Text>
                <ChangePlanButton
                  onClick={() => {
                    goTo != null
                      ? goTo(selectPlanIndex)
                      : console.error('Context was not loaded properly');
                  }}
                >
                  Change
                </ChangePlanButton>
              </div>
              <Text className="highlight align">
                ${finalValue.plan}/{abbr}
              </Text>
              <Line />
            </CheckoutInfo>
            <CheckoutInfo>
              {userInfo.addons.onlineService && (
                <>
                  <Text className="fade">Online service</Text>
                  <Text className="fade addonCheckout">
                    +${finalValue.onlineService}/{abbr}
                  </Text>
                </>
              )}
            </CheckoutInfo>
            <CheckoutInfo>
              {userInfo.addons.largerStorage && (
                <>
                  <Text className="fade">Larger storage</Text>
                  <Text className="fade addonCheckout">
                    +${finalValue.largerStorage}/{abbr}
                  </Text>
                </>
              )}
            </CheckoutInfo>
            <CheckoutInfo>
              {userInfo.addons.customProfile && (
                <>
                  <Text className="fade">customizable Profile</Text>
                  <Text className="fade addonCheckout">
                    +${finalValue.customProfile}/{abbr}
                  </Text>
                </>
              )}
            </CheckoutInfo>
          </CheckoutContainer>
          <CheckoutTotal>
            <Text>Total (per {userInfo.isYearly ? 'year' : 'month'})</Text>
            <p>
              ${finalValue.total}/{abbr}
            </p>
          </CheckoutTotal>
        </>
      ) : (
        'Context was not loaded properly'
      )}
    </FormWrapper>
  );
}
