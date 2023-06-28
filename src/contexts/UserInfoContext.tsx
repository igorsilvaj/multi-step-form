import { type UserInfo } from '@interfaces/index';
import { type ReactElement, createContext, useMemo, useState } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
}

interface ContextValue {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const INITIAL_STATE: UserInfo = {
  name: '',
  email: '',
  phone: '',
  plan: 'Arcade',
  isYearly: false,
  addons: {
    onlineService: false,
    largerStorage: false,
    customProfile: false,
  },
  error: {
    name: null,
    email: null,
    phone: null,
  },
};

export const UserInfoContext = createContext<ContextValue | null>(null);

export default function UserInfoProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  const contextValue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

  return <UserInfoContext.Provider value={contextValue}>{children}</UserInfoContext.Provider>;
}
