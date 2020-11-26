import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:0;

  }
  body{
    background:#0e0b16;
    color: #fff;
    -webkit-font-smoothing:antialiased;

  }
  body,button,input{
    font-family:'Roboto Slab', serif;

  }
  h1,h2,h3,h4,strong{
    font-weight:500;
  }
  button{
    cursor:pointer;
  }

`;
