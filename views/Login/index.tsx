import { Input } from 'antd';
import { TextHighlight } from '@components/Text';
import { Container, SocialButton, StyledButton, StyledForm } from './styled';

const { Item, useForm } = StyledForm;

const Login = () => {
  const [form] = useForm();

  const signInHandler = () => {};

  return (
    <Container>
      <StyledForm form={form} layout="vertical" autoComplete="off" onFinish={signInHandler}>
        <Item name={'Username or Email address'}>
          <Input />
        </Item>
        <Item name={'Password'}>
          <Input />
        </Item>

        <StyledButton htmlType="submit" size={'large'} type="primary">
          Login
        </StyledButton>

        <SocialButton>
          <TextHighlight highlightWords={['Facebook']} text={'Continue with Facebook'} />
        </SocialButton>

        <SocialButton>
          <TextHighlight highlightWords={['Google']} text={'Continue with Google'} />
        </SocialButton>

        <SocialButton>
          <TextHighlight highlightWords={['Twitter']} text={'Continue with Twitter'} />
        </SocialButton>
      </StyledForm>
    </Container>
  );
};

export default Login;
