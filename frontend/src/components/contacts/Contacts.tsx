import React, { useEffect, useState } from 'react';
import { Container } from './ContactsStyles';
import logo from '../../assets/logo.svg';

type PropsType = any;

export const Contacts = ({ contacts, currentUser, changeChat }: PropsType) => {
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserImage, setCurrentUserImage] = useState('');
  const [
    currentSelected,
    setCurrentSelected
  ] = useState<undefined | number>(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, []);
  const changeCurrentChat = (index: number, contact: number) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className='logo'>
            <img src={logo} alt='logo' />
            <h3>Chatty-box</h3>
          </div>
          <div className='contacts'>
            {contacts.map((contact: any, index: number) => (
              <div
                key={index}
                className={`contact 
                ${index === currentSelected ? 'selected' : ''}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className='avatar'>
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  />
                </div>
                <div className='username'>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
