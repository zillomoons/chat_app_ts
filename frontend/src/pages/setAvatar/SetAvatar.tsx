import { Container } from './SetAvatarStyles';
import React, { useEffect, useState } from 'react';
import { getAvatars, setAvatar } from '../../utils/api-routes';
import { Buffer } from 'buffer';
import loader from '../../assets/loader.svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../App';

export const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] =
    useState<undefined | number>(undefined);
  const [error, setError] = useState('');
  const data: any[] = [];
  const getRandomAvatars = async () => {
    for (let i = 0; i < 4; i++) {
      const image = await getAvatars();
      const buf = Buffer.from(image.data);
      data.push(buf.toString('base64'));
    }
    setAvatars(data);
    setIsLoading(false);
  };
  const userData = localStorage.getItem('chat-app-user');
  useEffect(() => {
    userData || navigate(PATH.LOGIN);
  }, []);
  useEffect(() => {
    getRandomAvatars();
  }, []);
  const setProfileImage = async () => {
    if (selectedAvatar === undefined) {
      setError('Please select an avatar');
    } else {
      let user;
      if (userData) user = JSON.parse(userData);
      const { data } = await setAvatar({
        userId: user._id,
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate(PATH.CHAT);
      } else {
        setError('Error setting an avatar. Please try again.');
      }
    }
  };
  if (isLoading) {
    return <Container><img src={loader} alt='loader' /></Container>;
  }
  return (
    <Container>
      <div className="title-container">
        <h1>Pick an avatar as your profile image</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div key={index}
            className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
          >
            <img
              src={`data:image/svg+xml;base64,${avatar}`}
              alt='avatar'
              onClick={() => setSelectedAvatar(index)}
            />
          </div>
        )
        ) }
      </div>
      <button
        className='submit-btn'
        onClick={setProfileImage}
      >Set as Profile Image</button>
      {error && <p role='alert'>{ error }</p>}
    </Container>
  );
};
