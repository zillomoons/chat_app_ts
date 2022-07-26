import React, { useState } from 'react';
import { restoreState } from '../../utils/localStorage';
import { getAllUsers } from '../../utils/api-routes';
import { Container } from './ChatStyles';

export const Chat = () => {
  const userData = restoreState('chat-app-user', { _id: '' });
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    const { data } = await getAllUsers(userData._id);
    setContacts(data);
  };
  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
};
