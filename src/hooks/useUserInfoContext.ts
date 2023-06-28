import { useContext } from 'react';
import { UserInfoContext } from '../contexts/UserInfoContext';

export default function useUserInfoContext() {
  const userInfoContext = useContext(UserInfoContext);
  if (userInfoContext === null) {
    throw new Error('useUserInfoContext must be inside a UserInfoProvider');
  }
  return userInfoContext;
}
