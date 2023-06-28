import { type UserInfo } from '@interfaces/index';

const validateName = (name: string): string | null => {
  if (name.length === 0) {
    return 'This field is required';
  }
  if (name.length < 10) {
    return 'Minimum lenght is 10';
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  const pattern: RegExp = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;

  if (email.length === 0) {
    return 'This field is required';
  }

  if (!pattern.test(email)) {
    return 'This field must be a valid email';
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  const pattern = /^\+\d{1,3}\s\d{1,3}\s\d{1,3}\s\d{1,3}$/;

  if (phone.length === 0) {
    return 'This field is required';
  }

  if (!pattern.test(phone)) {
    return 'This field must be a valid phone';
  }
  return null;
};

interface ValidateAllReturn {
  name: string | null;
  email: string | null;
  phone: string | null;
}

const validateAll = (userInfo: UserInfo): ValidateAllReturn => {
  const { name, email, phone } = userInfo;
  return {
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
  };
};

export default { validateName, validateEmail, validatePhone, validateAll };
