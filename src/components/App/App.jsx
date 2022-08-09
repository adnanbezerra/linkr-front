import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../assets/styles/GlobalStyle';
import TimeLine from '../pages/timeline/TimelineScreen';
import UserContext from './contexts/UserContext';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import RegisterScreen from './pages/RegisterScreen/RegisterScreen';

function App() {
  return (
    <UserContext.Provider>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginScreen />} />
          <Route path={'/sign-up'} element={<RegisterScreen />} />
          <Route path={'/timeline'} element={<TimeLine />} />
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
