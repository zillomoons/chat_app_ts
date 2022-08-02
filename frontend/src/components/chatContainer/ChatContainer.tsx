import React, { useEffect, useRef, useState } from 'react';
import Logout from '../logout';
import { Container } from './ChatContainerStyles';
import ChatInput from '../../components/chatInput';
import Messages from '../../components/messages';
import { getAllMessages, sendMessage } from '../../utils/api-routes';

type PropsTypes = any;
type MessageType = {
  fromSelf: boolean
  message: string
}

export const ChatContainer = ({
  currentChat, currentUser, socket
}: PropsTypes) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [arrivedMsg, setArrivedMsg] = useState<MessageType | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fetchMessages = async () => {
    const { data } = await getAllMessages({
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(data);
  };
  useEffect(() => {
    currentChat && fetchMessages();
  }, [currentChat]);
  const handleSendMsg = async (msg: string) => {
    await sendMessage({
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    });
    const msgs = [...messages, { fromSelf: true, message: msg }];
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg: string) => {
        console.log({ msg });
        setArrivedMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivedMsg && setMessages(prev => [...prev, arrivedMsg]);
  }, [arrivedMsg]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
          </div>
          <div className='username'>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <div key={index} ref={scrollRef}>
            <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
              <div className='content'>
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};
