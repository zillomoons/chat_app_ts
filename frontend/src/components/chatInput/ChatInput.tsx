import React, { useState, MouseEvent, FormEvent } from 'react';
import { Container } from './ChatInputStyles';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

type PropsTypes = any;

export const ChatInput = ({ handleSendMsg }: PropsTypes) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const handleEmojiClick = (
    event: MouseEvent<Element>,
    data: IEmojiData
  ) => {
    let message = msg;
    message += data.emoji;
    setMsg(message);
  };
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  return (
    <Container>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmileFill onClick={toggleEmojiPicker} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className='input-container' onSubmit={e => sendChat(e)}>
        <input type='text'
          value={msg}
          onChange={e => setMsg(e.currentTarget.value)}
          placeholder='Write your message here' />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};
