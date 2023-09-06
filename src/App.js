import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Otp from './Components/Otp';
// import Otp from './Components/';
import { Routes, Route } from 'react-router-dom';
import GameSession from './Components/GameSession';
import Home from './Components/Home';
import SessionList from './Components/SessionList';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' Component={() => <Login />} />
        <Route path='/signup' Component={() => <Signup />} />
        <Route path='/otp' Component={() => <Otp />} />
        <Route path='/session' Component={() => <GameSession />} />
        <Route path='/home' Component={() => <Home />} />
        <Route path='/history' Component={() => <SessionList />} />
      </Routes>
    </div>
  );
}

export default App;
