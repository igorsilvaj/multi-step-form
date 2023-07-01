import useUserInfoContext from '../hooks/useUserInfoContext';
import validations from '../helpers/validations';
import {
  FormWrapper,
  Title,
  Label,
  TextBox,
  FormValidationError,
  FormInputContainer,
  Subtitle,
} from '../styles/Components';

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
    <FormWrapper>
      <Title>Personal info</Title>
      <Subtitle>Please provide your name, email address, and phone number.</Subtitle>
      <FormInputContainer>
        <Label htmlFor="name">Name</Label>
        {userInfo.error.name !== null && (
          <FormValidationError>{userInfo.error.name}</FormValidationError>
        )}
        <TextBox
          id="name"
          type="text"
          placeholder="e.g. Stephen King"
          hasErrors={userInfo.error.name !== null}
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, name: e.target.value });
          }}
          onBlur={() => {
            validateName();
          }}
        />
      </FormInputContainer>
      <FormInputContainer>
        <Label htmlFor="email">Email Address</Label>
        {userInfo.error.email !== null && (
          <FormValidationError>{userInfo.error.email}</FormValidationError>
        )}
        <TextBox
          id="email"
          type="text"
          placeholder="e.g. stephenking@lorem.com"
          hasErrors={userInfo.error.email !== null}
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
          onBlur={() => {
            validateEmail();
          }}
        />
      </FormInputContainer>
      <FormInputContainer>
        <Label htmlFor="phone">Phone Number</Label>
        {userInfo.error.phone !== null && (
          <FormValidationError>{userInfo.error.phone}</FormValidationError>
        )}
        <TextBox
          id="phone"
          type="text"
          placeholder="e.g. +1 234 567 890"
          hasErrors={userInfo.error.phone !== null}
          value={userInfo.phone}
          onChange={(e) => {
            setUserInfo({ ...userInfo, phone: e.target.value });
          }}
          onBlur={() => {
            validatePhone();
          }}
        />
      </FormInputContainer>
    </FormWrapper>
  );
}
