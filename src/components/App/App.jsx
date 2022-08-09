import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import UserContext from '../contexts/UserContext';
import TimeLine from '../pages/timeline/TimelineScreen'

function App() {
  return (
    <UserContext.Provider>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<></>} />
          <Route path={'/timeline'} element={<TimeLine />} />
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
