import {
  FormSubmissionContainer,
  FormWrapper,
  IconThankYou,
  Subtitle,
  Title,
  IconContainer,
} from '../styles/Components';
import iconThankYou from '../assets/images/icon-thank-you.svg';

export default function FormSubmissionSuccess() {
  return (
    <FormWrapper>
      <FormSubmissionContainer>
        <IconContainer>
          <IconThankYou src={iconThankYou} alt="iconThankYou" />
        </IconContainer>
        <Title>Thank you!</Title>
        <Subtitle>
          Thanks for confirming your subscription! We hope you have fun using our platform. If you
          ever need support, please feel free to email us at support@loremgaming.com.
        </Subtitle>
      </FormSubmissionContainer>
    </FormWrapper>
  );
}
