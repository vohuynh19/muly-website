import { Input, message } from 'antd';
import Link from 'next/link';

import { PAGE_ROUTES } from '@src/utils/constants/routes';
import { Container, StyledButton, StyledForm, Wrapper } from './styled';
import { useMutation } from 'react-query';
import axiosInstance from '@src/apis/axios';
import { ENDPOINTS } from '@src/apis/endpoints';
import { useRouter } from 'next/router';

const { Item, useForm } = StyledForm;

const Register = () => {
  const [form] = useForm();
  const mutate = useMutation<any, any, any, any>((params) => {
    return axiosInstance.post(ENDPOINTS.AUTH.LOGIN, params);
  });
  const router = useRouter();

  const signInHandler = () => {
    console.log(form.getFieldsValue());
    mutate.mutate(form.getFieldsValue(), {
      onSuccess: () => {
        message.success('Register Success');
        router.push(PAGE_ROUTES.LOGIN);
      },
      onError: (error) => {
        message.error(error);
      },
    });
  };

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
