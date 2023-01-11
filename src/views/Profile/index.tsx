import { Button, Input, message, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { StyledForm, Wrapper } from './styled';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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

  const saveHandler = () => {};

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
              const base64Image = btoa(this.result as string);
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
        <Item label={'Username'}>
          <Input disabled placeholder="Enter password" size="large" value={'vohuynh19'} />
        </Item>
        <Item label={'Email'}>
          <Input disabled placeholder="Enter password" size="large" value={'vhuynh19@gmail.com'} />
        </Item>
        <Item label={'Phone'}>
          <Input disabled placeholder="Enter password" size="large" value={'+84 12312312'} />
        </Item>

        <Button htmlType="submit" size={'large'} type="primary" onClick={saveHandler} style={{ width: '100%', marginTop: 32 }}>
          Save Information
        </Button>
      </StyledForm>
    </Wrapper>
  );
};

export default Profile;
