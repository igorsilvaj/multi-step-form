import useUserInfoContext from '../hooks/useUserInfoContext';
import validations from '../helpers/validations';

export default function YourInfoForm() {
  const { userInfo, setUserInfo } = useUserInfoContext();

  const validateName = () => {
    const error = validations.validateName(userInfo.name);
    if (error !== null) {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, name: error } });
    } else {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, name: null } });
    }
  };

  const validateEmail = () => {
    const error = validations.validateEmail(userInfo.email);
    if (error !== null) {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, email: error } });
    } else {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, email: null } });
    }
  };

  const validatePhone = () => {
    const error = validations.validatePhone(userInfo.phone);
    if (error !== null) {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, phone: error } });
    } else {
      setUserInfo({ ...userInfo, error: { ...userInfo.error, phone: null } });
    }
  };

  return (
    <section>
      <>
        <p>Personal info</p>
        <p>Please provide your name, email, address, and phone number.</p>
        {userInfo.error.name !== null && <p>{userInfo.error.name}</p>}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Stephen King"
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, name: e.target.value });
          }}
          onBlur={() => {
            validateName();
          }}
        />
        {userInfo.error.email !== null && <p>{userInfo.error.email}</p>}
        <label htmlFor="email">Name</label>
        <input
          id="email"
          type="text"
          placeholder="e.g. stephenking@lorem.com"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
          onBlur={() => {
            validateEmail();
          }}
        />
        {userInfo.error.phone !== null && <p>{userInfo.error.phone}</p>}
        <label htmlFor="phone">Name</label>
        <input
          id="phone"
          type="text"
          placeholder="e.g. +1 234 567 890"
          value={userInfo.phone}
          onChange={(e) => {
            setUserInfo({ ...userInfo, phone: e.target.value });
          }}
          onBlur={() => {
            validatePhone();
          }}
        />
      </>
    </section>
  );
}
