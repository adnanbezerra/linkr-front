import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../../assets/styles/GlobalStyle.js';
import UserContext from '../contexts/UserContext.js';
import LoginScreen from '../pages/LoginScreen/LoginScreen.jsx';
import RegisterScreen from '../pages/RegisterScreen/RegisterScreen.jsx';
import TimeLine from '../pages/timeline/TimelineScreen.jsx';

function App() {

  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginScreen />} />
          <Route path={'/sign-up'} element={<RegisterScreen />} />
          <Route path={'/timeline'} element={<TimeLine />} />
          <Route path={'/hashtag/:hashtag'}/>

        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
