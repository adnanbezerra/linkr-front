import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostsWithHashTag from '../pages/HashTag\'sPostsScreen/HashTag\'sPostsScreen.jsx';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import LoginScreen from '../pages/LoginScreen/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen/RegisterScreen';
import TimeLine from '../pages/timeline/TimelineScreen';
import UserContext from '../contexts/UserContext.js';

function App() {

  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginScreen />} />
          <Route path={'/sign-up'} element={<RegisterScreen />} />
          <Route path={'/timeline'} element={<TimeLine />} />
          <Route path={'/hashtag/:hashtag'} element={<PostsWithHashTag />} />

        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
