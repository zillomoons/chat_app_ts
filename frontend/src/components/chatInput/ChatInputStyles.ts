import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 8% 92%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0 1rem;
      gap: 1rem;
    }
  .button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
      position: relative;
      svg{
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react{
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar{
          background-color: #080420;
          width: 5px;
          &-thumb{
            background-color: #9a86f3;
          }
        }
        .emoji-categories{
          button{
            filter: contrast(0);
          }
        }
        .emoji-search{
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before{
          background-color: #080420;
        }
      }
    }
  }
  .input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input{
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection{
        background-color: #9186f3;
      }
      &:focus{
        outline: none;
      }
    }
    .submit{
      padding: 0.3rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg{
          font-size: 1rem;
        }
      }
      svg{
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
