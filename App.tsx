import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/common/Login';
import Register from './components/common/Register';
import AniBoardRouter from './components/aniBoard/AniBoardRouter';
import DocuBoardRouter from './components/docuBoard/DocuBoardRouter';
import GameRouter from './components/gameBoard/GameRouter';
import HealthRouter from './components/healthBoard/HealthRouter';
import BookBoardRouter from './components/bookBoard/BookBoardRouter';
import BoardRouter from './components/board/BoardRouter';
import LoginRouter from './components/common/LoginRouter';
import ChatRoomRouter from './components/chatRoom/ChatRoomRouter';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MemberUpdate from './components/common/MemberUpdate';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login/*' element={<LoginRouter/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/update' element={<MemberUpdate/>}/>
              <Route path='/ani/*' element={<AniBoardRouter/>}/>
              <Route path='/docu/*' element={<DocuBoardRouter/>}/>
              <Route path='/game/*' element={<GameRouter/>}/>
              <Route path='/health/*' element={<HealthRouter/>}/>
              <Route path='/book/*' element={<BookBoardRouter/>}/>
              <Route path='/board/*' element={<BoardRouter/>}/>
              {
               // <Route path='/chat/*' element={<ChatRoomRouter/>}/>
              }
          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
