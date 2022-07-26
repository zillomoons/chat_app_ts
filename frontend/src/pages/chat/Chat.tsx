import React, { useState } from 'react';
import { getAllUsers } from '../../utils/api-routes';
import { Container } from './ChatStyles';

export const Chat = () => {
  const userData = localStorage.getItem('chat-app-user');
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    if (userData) {
      const { data } = await getAllUsers(JSON.parse(userData)._id);
      setContacts(data);
    }
  };
  let avatar = '';
  if (userData) {
    avatar = JSON.parse(userData).avatarImage;
  }
  return (
    <Container>
      <div className="container"></div>
      {/* <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' /> */}
    </Container>
  );
};
