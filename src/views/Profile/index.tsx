import { Button, Input, message, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useContext, useState } from 'react';
import { StyledForm, Wrapper } from './styled';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import AppContext from '@core/contexts/AppContext';
import { useMutation } from 'react-query';
import axiosInstance from '@core/apis/axios';
import { ENDPOINTS } from '@core/apis/endpoints';
import { useRef } from 'react';
import { useEffect } from 'react';

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

const Profile = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { user, setUser } = useContext(AppContext);
  const { mutate, isLoading } = useMutation<any, any, any, any>((params) => {
    return axiosInstance.post(ENDPOINTS.AUTH.UPDATE_USER, params);
  });
  const imgRef = useRef('');

  useEffect(() => {
    if (user.avatar) {
      setImageUrl(`data:image/jpeg;base64, ${user.avatar}`);
    }
  }, [user]);

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
    <div style={{ color: 'grey' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const saveHandler = () => {
    mutate(
      { avatar: imgRef.current },
      {
        onSuccess: ({ data }) => {
          setUser(data);
          message.success('Upload avatar success');
        },
        onError: (err) => {
          message.error(err);
        },
      },
    );
  };

  return (
    <Wrapper>
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={(file) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = function () {
              imgRef.current = btoa(this.result as string);
            };

            return '';
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </div>

      <StyledForm form={form} layout="vertical" autoComplete="off">
        <Item label={'Id'}>
          <Input disabled size="large" value={user._id} />
        </Item>
        <Item label={'Email'}>
          <Input disabled size="large" value={user.email} />
        </Item>

        <Button
          loading={isLoading}
          htmlType="submit"
          size={'large'}
          type="primary"
          onClick={saveHandler}
          style={{ width: '100%', marginTop: 32 }}
        >
          Save Information
        </Button>
      </StyledForm>
    </Wrapper>
  );
};

export default Profile;
