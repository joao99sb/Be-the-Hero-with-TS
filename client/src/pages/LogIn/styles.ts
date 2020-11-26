import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    h1 {
      margin-bottom: 30px;
      color: #e7dfdd;
    }
  }
  a {
    color: #4717f6;
    display: block;
    transition: color 200ms;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
    &:hover {
      color: ${shade(0.2, '#4717f6')};
    }
  }
`;
