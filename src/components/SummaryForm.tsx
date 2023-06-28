import { type ReactElement, useContext } from 'react';
import useUserInfoContext from '../hooks/useUserInfoContext';
import { MultiStepFormContext } from './MultiStepForm';
import { plans, addons, discount } from '../helpers/billingInfo.json';

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
    <section>
      {steps !== undefined && goTo !== undefined ? (
        <>
          <p>Finishing up</p>
          <p>Double-check everything looks OK before confirming.</p>
          <div>
            <div>
              <p>{userInfo.plan}</p>
              <p>({userInfo.isYearly ? 'Yearly' : 'Mounthly'})</p>
              <button
                onClick={() => {
                  goTo != null
                    ? goTo(selectPlanIndex)
                    : console.error('Context was not loaded properly');
                }}
              >
                Change
              </button>
              <span>
                ${finalValue.plan}/{abbr}
              </span>
            </div>
            <div>
              {userInfo.addons.onlineService && (
                <p>
                  Online service +$
                  <span>{finalValue.onlineService}</span>/<span>{abbr}</span>
                </p>
              )}
            </div>
            <div>
              {userInfo.addons.largerStorage &&
                `Larger storage +$${finalValue.largerStorage}/${abbr}`}
            </div>
            <div>
              {userInfo.addons.customProfile &&
                `customizable Profile +$${finalValue.customProfile}/${abbr}`}
            </div>
            <div>
              Total (per year)
              <span>${finalValue.total}</span>/<span>{abbr}</span>
            </div>
          </div>
        </>
      ) : (
        'Context was not loaded properly'
      )}
    </section>
  );
}
