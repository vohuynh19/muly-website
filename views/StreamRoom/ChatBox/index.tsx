import { FC, useState } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { Content, Head, ItemWrapper, MessageContent, Username, Wrapper } from './styled';
import TextInput from './TextInput';

type MessageType = {
  senderName: string;
  message: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      senderName: 'user1',
      message: 'Hello thay locHello thay locHello thay locHello thay locHello thay locHello thay locHello thay loc',
    },
    {
      senderName: 'user1',
      message: 'Hello thay locHello thay locHello thay locHello thay locHello thay locHello thay locHello thay loc',
    },
  ]);

  return (
    <Wrapper>
      <Head>Chat room</Head>

      <Content>
        {messages.map((message) => (
          <Message {...message} />
        ))}
      </Content>

      <TextInput />
    </Wrapper>
  );
};

const Message: FC<MessageType> = ({ message, senderName }) => {
  return (
    <ItemWrapper>
      <PermIdentityIcon />
      <Username>{senderName}:</Username>
      <MessageContent>{message}</MessageContent>
    </ItemWrapper>
  );
};

export default ChatBox;
