import { Container } from './WelcomeStyles';
import React from 'react';
import Robot from '../../assets/robot.svg';

type PropsTypes = any;

export const Welcome = ({ currentUser }: PropsTypes) => {
  const handle = () => { };
  return (
    <Container>
      <img src={Robot} alt='robot' />
      <h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
};
