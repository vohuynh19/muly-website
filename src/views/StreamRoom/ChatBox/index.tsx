import { FC, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { uuid } from '@core/utils/functions/uuid';
import axiosInstance, { BASE_URL } from '@core/apis/axios';
import AppContext from '@core/contexts/AppContext';

import TextInput from './TextInput';
import { Content, Head, ItemWrapper, MessageContent, Username, Wrapper } from './styled';
import { useQuery } from 'react-query';
import { ENDPOINTS } from '@core/apis/endpoints';

type MessageType = {
  message: string;
  messageId: string;
  avatar: string;
  email: string;
};

type Props = {
  roomId: string;
};

const ChatBox: FC<Props> = ({ roomId }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const socketRef = useRef<Socket>();
  const { user } = useContext(AppContext);
  const { data } = useQuery(`/chat/${roomId}`, () =>
    axiosInstance.post(ENDPOINTS.CHAT.GET, {
      filter: {
        roomId,
      },
      sort: {},
      page: 1,
      limit: 1000000,
    }),
  );

  useEffect(() => {
    socketRef.current = io(`${BASE_URL}:9001/`, {
      port: '9001',
      transports: ['websocket'],
    });
    socketRef.current.emit('join chat', {
      roomId,
    });
    socketRef.current.on('join chat success', () => {
      socketRef.current!.on('create message', (incommingMessage) => updateMessages(incommingMessage));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    setMessages(data?.data.docs);
  }, [data?.data]);

  const sendMessage = (message: string) => {
    socketRef.current!.emit('send chat', {
      message,
      userId: user._id,
      roomId: roomId,
    });
  };

  const updateMessages = ({ message, messageId, avatar, email }: MessageType) => {
    setMessages((prev) => {
      if (!prev.some((mes) => mes.messageId === messageId)) {
        return prev.concat([{ message, messageId, avatar, email }]);
      }
      return prev;
    });
  };

  return (
    <Wrapper>
      <Head>Chat room</Head>
      <Content>
        {messages?.reverse().map((message) => (
          <Message key={uuid()} {...message} />
        ))}
      </Content>
      <TextInput onSendMessage={sendMessage} />
    </Wrapper>
  );
};

const Message: FC<MessageType> = ({ message, email }) => {
  return (
    <ItemWrapper>
      <PermIdentityIcon />
      <Username>{email}:</Username>
      <MessageContent>{message}</MessageContent>
    </ItemWrapper>
  );
};

export default ChatBox;
