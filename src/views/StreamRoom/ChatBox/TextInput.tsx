import { Form, Input, Space } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useQuery } from 'react-query';

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

type Props = {
  onSendMessage: (message: string) => void;
};

const TextInput: FC<Props> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  return (
    <Form
      onFinish={() => {
        onSendMessage(message);
        setMessage('');
      }}
    >
      <SInput
        size="large"
        suffix={
          <Space size={16}>
            <EmojiEmotionsIcon />
            <SendIcon onClick={() => onSendMessage(message)} />
          </Space>
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={'Chat here...'}
      />

      <button style={{ display: 'none' }} type="submit" />
    </Form>
  );
};

export default TextInput;
