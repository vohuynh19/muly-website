import { Input, message, Modal } from 'antd';
import { useRouter } from 'next/router';
import { forwardRef, ForwardRefRenderFunction, useContext, useImperativeHandle, useState } from 'react';
import { useMutation } from 'react-query';

import axiosInstance from '@core/apis/axios';
import { ENDPOINTS } from '@core/apis/endpoints';
import { PAGE_ROUTES } from '@core/utils/constants/routes';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { StyledForm, StyledModal } from './styled';
import AppContext from '@core/contexts/AppContext';
type Props = {};
export type ModelHandler = {
  toggle: () => void;
};

const BecomeModal: ForwardRefRenderFunction<ModelHandler, Props> = ({}, ref) => {
  const { setUser } = useContext(AppContext);
  const mutate = useMutation<any, any, any, any>((params) => {
    return axiosInstance.post(ENDPOINTS.AUTH.UPDATE_USER, params);
  });

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle: () => setOpen(!open),
  }));

  const submitHandler = () => {
    mutate.mutate(
      { roleId: 'STREAMER' },
      {
        onSuccess: ({ data }) => {
          setUser(data);
          setOpen(false);
          message.success('Become streamer Success');
        },
        onError: (error) => {
          message.error(error);
        },
      },
    );
  };

  return (
    <StyledModal open={open} onCancel={() => setOpen(false)} onOk={submitHandler} okButtonProps={{ loading: mutate.isLoading }}>
      <NewReleasesIcon className="release" />

      <p>Are you sure to become a streammer</p>
    </StyledModal>
  );
};

export default forwardRef(BecomeModal);
