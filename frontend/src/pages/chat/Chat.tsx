import React, { useEffect, useState, useRef } from 'react';
import { getAllUsers, host } from '../../utils/api-routes';
import { Container } from './ChatStyles';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../App';
import Contacts from '../../components/contacts';
import Welcome from '../../components/welcome';
import ChatContainer from '../../components/chatContainer';
import { io, Socket } from 'socket.io-client';

export type UserType = {
  avatarImage: string
  email: string
  isAvatarImageSet: boolean
  username: string
  _id: string
}

export const Chat = () => {
  const socket = useRef<Socket>();
  const navigate = useNavigate();
  const userData = localStorage.getItem('chat-app-user');
  let user: UserType | null = null;
  if (userData) user = JSON.parse(userData);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const getContacts = async () => {
    if (user) {
      const { data } = await getAllUsers(user._id);
      user.isAvatarImageSet ? setContacts(data) : navigate(PATH.SET_AVATAR);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate(PATH.LOGIN);
    } else {
      getContacts();
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit('add-user', user._id);
    }
  }, [user]);
  const handleChatChange = (chat: any) => setCurrentChat(chat);
  return (
    <Container>
      <div className='container'>
        <Contacts
          contacts={contacts}
          currentUser={user}
          changeChat={handleChatChange}
        />
        {isLoaded && (
          currentChat ?
            <ChatContainer
              socket={socket}
              currentChat={currentChat}
              currentUser={user} /> :
            <Welcome currentUser={user} />
        )
        }
      </div>
    </Container>
  );
};
