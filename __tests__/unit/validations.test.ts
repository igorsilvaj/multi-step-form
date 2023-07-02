import validations from '../../src/helpers/validations';
import { userInfoMonthly } from '../mocks/userInfoContext';

describe('validations helper - Tests', () => {
  it('Should return This field is required', () => {
    const validateName = validations.validateName('');
    const validatePhone = validations.validateEmail('');
    const validateEmail = validations.validatePhone('');
    expect(validateName).toBe('This field is required');
    expect(validateEmail).toBe('This field is required');
    expect(validatePhone).toBe('This field is required');
  });

  it('Should return null', () => {
    const validateName = validations.validateName('Stephen King');
    const validateEmail = validations.validateEmail('stephenking@lorem.com');
    const validatePhone = validations.validatePhone('+1 234 567 890');
    expect(validateName).toBeNull();
    expect(validateEmail).toBeNull();
    expect(validatePhone).toBeNull();
  });

  it('Sould return correct messages', () => {
    const validateName = validations.validateName('Ste');
    const validateEmail = validations.validateEmail('stephenkinglorem.com');
    const validatePhone = validations.validatePhone('123456789');
    expect(validateName).toBe('Minimum lenght is 10');
    expect(validateEmail).toBe('This field must be a valid email');
    expect(validatePhone).toBe('This field must be a valid phone');
  });

  it('Sould return correct object', () => {
    const teste = validations.validateAll(userInfoMonthly);
    expect(teste).toEqual({ name: null, email: null, phone: null });
  });
});
