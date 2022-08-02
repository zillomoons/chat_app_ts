import axios from 'axios';

export const host = 'http://localhost:5000';
const instance = axios.create({
  baseURL: `${host}/api/`
});

type ValuesTypes = {
  username: string
  email: string
  password: string
};
export const registerUser = (values: ValuesTypes) =>
  instance.post('auth/register', { ...values });

export const loginUser = (values: { username: string, password: string }) =>
  instance.post('auth/login', { ...values });

export const setAvatar = (values: { userId: string, image: string }) =>
  instance.post(`auth/setAvatar/${values.userId}`, { image: values.image });

export const getAllUsers = (id: string) => instance.get(`auth/allusers/${id}`);

export const getAvatars = () => {
  const api = 'https://api.multiavatar.com/45678945';
  return axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
};

export const sendMessage = (msg: {
  from: string, to: string, message: string
}) => instance.post('messages/addmsg', { ...msg });

export const getAllMessages = (users: { from: string, to: string }) =>
  instance.post('messages/getmsg', { ...users });
