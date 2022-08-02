import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import { PATH } from '../../App';
import { Button } from './LogoutStyles';

export const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate(PATH.LOGIN);
  };
  return (
    <Button onClick={handleClick}><BiPowerOff /></Button>
  );
};
