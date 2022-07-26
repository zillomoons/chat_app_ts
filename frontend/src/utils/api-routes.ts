import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/auth/'
});

type ValuesTypes = {
  username: string
  email: string
  password: string
};
export const registerUser = (values: ValuesTypes) =>
  instance.post('register', { ...values });

export const loginUser = (values: { username: string, password: string }) =>
  instance.post('login', { ...values });

export const setAvatar = (values: { userId: string, image: string }) =>
  instance.post(`setAvatar/${values.userId}`, { image: values.image });

export const getAllUsers = (id: string) => instance.get(`allusers/${id}`);

export const getAvatars = () => {
  const api = 'https://api.multiavatar.com/45678945';
  return axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
};
