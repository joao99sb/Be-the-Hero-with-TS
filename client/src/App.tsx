import React from 'react';
import GlobalsStyles from './styles/global';
import FirstPage from './pages/firstPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    {/* <FirstPage /> */}
    <LogIn />
    <GlobalsStyles />
  </>
);
export default App;
