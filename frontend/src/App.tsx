import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/register';
import Chat from './pages/chat';
import Login from './pages/login';
import { SetAvatar } from './pages/setAvatar/SetAvatar';

const contactsData = [
  { id: 'somebs1', name: 'someName1', icon: 'someIcon1' },
  { id: 'somebs2', name: 'someName2', icon: 'someIcon2' },
  { id: 'somebs3', name: 'someName3', icon: 'someIcon3' },
];
const messagesData = [
  { id: 'someId1', myMsg: true, msgText: 'Hello, how are you?' },
  { id: 'someId2', myMsg: false, msgText: 'Hi, everything is okay' },
  { id: 'someId3', myMsg: true, msgText: 'Are you free for dinner tonight?' },
];

export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/',
  SET_AVATAR: '/setAvatar',
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.CHAT} element={<Chat />} />
        <Route path={PATH.SET_AVATAR} element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
