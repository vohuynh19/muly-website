import { Input } from 'antd';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import { PAGE_ROUTES } from '@src/utils/constants/routes';

import { TextHighlight } from '@components/Text';
import { Container, SocialButton, StyledButton, StyledForm, Wrapper } from './styled';

const { Item, useForm } = StyledForm;

const Login = () => {
  const [form] = useForm();

  const signInHandler = () => {};

  return (
    <Wrapper>
      <Container>
        <StyledForm form={form} layout="vertical" autoComplete="off" onFinish={signInHandler}>
          <Item label={'Username or Email address'}>
            <Input placeholder="Enter username or email" size="large" />
          </Item>
          <Item label={'Password'}>
            <Input placeholder="Enter password" size="large" />
          </Item>
          <div className="register">
            If you do not have any account, <Link href={PAGE_ROUTES.REGISTER}>Register here</Link>
          </div>

          <StyledButton htmlType="submit" size={'large'} type="primary">
            Login
          </StyledButton>
          <SocialButton size={'large'}>
            <FacebookIcon /> <TextHighlight highlightWords={['Facebook']} text={'Continue with Facebook'} />
          </SocialButton>

          <SocialButton size={'large'}>
            <GoogleIcon /> <TextHighlight highlightWords={['Google']} text={'Continue with Google'} />
          </SocialButton>

          <SocialButton size={'large'}>
            <TwitterIcon /> <TextHighlight highlightWords={['Twitter']} text={'Continue with Twitter'} />
          </SocialButton>
        </StyledForm>
      </Container>
    </Wrapper>
  );
};

export default Login;
