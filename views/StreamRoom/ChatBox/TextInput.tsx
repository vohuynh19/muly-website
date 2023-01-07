import { Input, Space } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styled from 'styled-components';

const SInput = styled(Input)`
  background-color: transparent;
  input {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    ::placeholder {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.text};
  }

  .ant-space-item {
    display: flex;
    align-items: center;
  }
`;

const TextInput = () => {
  return (
    <SInput
      size="large"
      suffix={
        <Space size={16}>
          <EmojiEmotionsIcon />
          <SendIcon />
        </Space>
      }
      placeholder={'Chat here...'}
    />
  );
};

export default TextInput;
