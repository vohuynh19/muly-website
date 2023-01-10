import { Input } from 'antd';
import Link from 'next/link';

import { PAGE_ROUTES } from '@src/utils/constants/routes';
import { Container, StyledButton, StyledForm, Wrapper } from './styled';

const { Item, useForm } = StyledForm;

const Register = () => {
  const [form] = useForm();

  const signInHandler = () => {};

  return (
    <Wrapper>
      <Container>
        <StyledForm form={form} layout="vertical" autoComplete="off" onFinish={signInHandler}>
          <Item label={'Username or Email'}>
            <Input placeholder="Enter password" size="large" />
          </Item>
          <Item label={'Password'}>
            <Input placeholder="Enter password" size="large" />
          </Item>
          <Item label={'Confirm Password'}>
            <Input placeholder="Enter password" size="large" />
          </Item>

          <div className="register">
            If you already have account, <Link href={PAGE_ROUTES.LOGIN}>Login here</Link>
          </div>

          <StyledButton htmlType="submit" size={'large'} type="primary">
            Register
          </StyledButton>
        </StyledForm>
      </Container>
    </Wrapper>
  );
};

export default Register;
