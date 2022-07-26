import { PATH } from '../../App';
import React, { useEffect, useState }  from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../register/RegisterStyles';
import logo from '../../assets/logo.svg';
import { loginUser } from '../../utils/api-routes';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate(PATH.CHAT);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async values => {
    const { data } = await loginUser(values);
    if (data.status) {
      localStorage.setItem('chat-app-user', JSON.stringify(data.user));
      navigate(PATH.CHAT);
    } else {
      setLoginError(data.msg);
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h1>Chatty-Box</h1>
        </div>
        <div className='field'>
          <input
            placeholder='Username'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'Username should be greater than 3 characters',
              },
            })}
          />
          {errors.username && <p role='alert'>{errors.username.message}</p>}
        </div>
        <div className='field'>
          <input
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 9,
                message: 'Password should be greater than 8 characters',
              },
            })}
          />
          {errors.password && <p role='alert'>{errors.password.message}</p>}
        </div>
        <button type='submit'>Login</button>
        <span>
          Don&apos;t have an account? <Link to={PATH.REGISTER}>Register</Link>
          {loginError && <p role='alert'>{loginError}</p>}
        </span>
      </form>
    </FormContainer>
  );
};
