import {
  FormSubmissionContainer,
  FormWrapper,
  IconThankYou,
  Subtitle,
  Title,
} from '../styles/Components';
import iconThankYou from '../assets/images/icon-thank-you.svg';

export default function FormSubmissionSuccess() {
  return (
    <FormWrapper>
      <FormSubmissionContainer>
        <IconThankYou src={iconThankYou} alt="iconThankYou" />
        <Title>Thank you!</Title>
        <Subtitle>
          Thanks for confirming your subscription! We hope you have fun using our platform. If you
          ever need support, please feel free to email us at support@loremgaming.com.
        </Subtitle>
      </FormSubmissionContainer>
    </FormWrapper>
  );
}
