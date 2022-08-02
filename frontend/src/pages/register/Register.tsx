import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../App';
import { FormContainer } from './RegisterStyles';
import logo from '../../assets/logo.svg';
import { registerUser } from '../../utils/api-routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { restoreState, saveState } from '../../utils/localStorage';

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  useEffect(() => {
    restoreState('chat-app-user', '') && navigate(PATH.CHAT);
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async values => {
    const { data } = await registerUser(values);
    if (data.status) {
      saveState('chat-app-user', data.user);
      navigate(PATH.CHAT);
    } else {
      setRegisterError(data.msg);
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
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p role='alert'>{errors.email.message}</p>}
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
        <div className='field'>
          <input
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: 'Please confirm password',
              validate: {
                matchPreviousPassword: (value: string) => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                },
              },
            })}
          />
          {errors.confirmPassword && (
            <p role='alert'>{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type='submit'>Create user</button>
        <span>
          Already have an account? <Link to={PATH.LOGIN}>Login</Link>
          {registerError && <p role='alert'>{registerError}</p>}
        </span>
      </form>
    </FormContainer>
  );
};

/* export const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert('Password and Confirm Password should be same');
      return false;
    } else if (username.length < 3) {
      alert('Username should be greater than 3 characters');
      return false;
    } else if (password.length < 8) {
      alert('Password should be greater than 8 characters');
      return false;
    } else if (email === '') {
      alert('Email is required');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log('in validation');
      const { data } = await registerUser(values);
      if (data.status) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate(PATH.CHAT);
      } else {
        alert(data.msg);
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <FormContainer>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h1>Chatty-Box</h1>
        </div>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={e => handleChange(e)}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={e => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={e => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          onChange={e => handleChange(e)}
        />
        <button type='submit'>Create user</button>
        <span>
          Already have an account? <Link to={PATH.LOGIN}>Login</Link>
        </span>
      </form>
    </FormContainer>
  );
}; */
