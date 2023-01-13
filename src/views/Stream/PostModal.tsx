import { Input, Modal, Upload, message } from 'antd';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { StyledForm } from './styled';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '@core/apis/axios';
import { ENDPOINTS } from '@core/apis/endpoints';
import { useRouter } from 'next/router';
import { PAGE_ROUTES } from '@core/utils/constants/routes';

type Props = {};
export type ModelHandler = {
  toggle: () => void;
};

const { Item, useForm } = StyledForm;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const PostModal: ForwardRefRenderFunction<ModelHandler, Props> = ({}, ref) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>();
  const base64 = useRef('');
  const clientQuery = useQueryClient();
  const { mutate, isLoading } = useMutation<any, any, any, any>((params) => {
    return axiosInstance.post(ENDPOINTS.STREAM_ROOM.CREATE, params);
  });

  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    toggle: () => setOpen(!open),
  }));

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const submitHandler = () => {
    const data = form.getFieldsValue();
    mutate(
      {
        title: data.title,
        thumnail: base64.current,
        des: data.des,
      },
      {
        onSuccess: ({ data }) => {
          setOpen(false);
          message.success('Stream Success');
          router.push(PAGE_ROUTES.HOME);
          clientQuery.invalidateQueries('stream-room/all');
        },
        onError: (error) => {
          message.error(error);
        },
      },
    );
  };

  return (
    <Modal open={open} onCancel={() => setOpen(false)} onOk={submitHandler} okButtonProps={{ loading: isLoading }}>
      <StyledForm form={form} layout="vertical">
        <Item name={'title'} label={'Title'}>
          <Input placeholder="Enter title" size="large" />
        </Item>
        <Item name={'des'} label={'Description'}>
          <Input placeholder="Enter Description" size="large" />
        </Item>

        <Item label={'Preview Image'}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={(file) => {
              const reader = new FileReader();
              reader.readAsBinaryString(file);
              reader.onloadend = function () {
                const base64Image = btoa(this.result as string);
                base64.current = base64Image;
              };

              return '';
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Item>
      </StyledForm>
    </Modal>
  );
};

export default forwardRef(PostModal);
