import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #a239ca;
  border-radius: 8px;
  height: 56px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: #e7dfdd;
  margin-top: 17px;
  font-weight: 500;
  font-size: 20px;

  transition: 200ms;

  &:hover {
    background: ${shade(0.2, '#a239ca')};
  }
`;
