import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader{
    max-inline-size: 100%;
  }
  .title-container{
    h1{
      color: white;
    }
  }
  .avatars{
    display: flex;
    gap: 2rem;
    .avatar{
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img{
        height: 6rem;
      }
    }
    .selected{
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn{
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #4e0eff;
    }
  }
  [role='alert']{
    color: red;
    font-size: 20px;
    padding: 5px 0 0 5px;
  }
`;
