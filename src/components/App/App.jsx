import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HashTagPage from '../pages/HashTagsPostsScreen/HashTagsPostsScreen.jsx';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import LoginScreen from '../pages/LoginScreen/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen/RegisterScreen';
import TimeLine from '../pages/timeline/TimelineScreen';
import UserContext from '../contexts/UserContext.js';
import UpdateContext from '../contexts/UpdateContext.js';
import UserPage from '../pages/UserProfileScreen/UserProfileScreen.jsx';

function App() {

  const [user, setUser] = useState();
  const [updatePage, setUpdatePage] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UpdateContext.Provider value={{ updatePage, setUpdatePage }}>
        <GlobalStyle />

        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<LoginScreen />} />
            <Route path={'/sign-up'} element={<RegisterScreen />} />
            <Route path={'/timeline'} element={<TimeLine />} />
            <Route path={'/hashtag/:hashtag'} element={<HashTagPage />} />
            <Route path={'/user/:id'} element={<UserPage />} />
          </Routes>
        </BrowserRouter >
      </UpdateContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
