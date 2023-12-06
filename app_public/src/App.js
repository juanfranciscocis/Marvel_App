import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Header} from "./components/Header";
import {Login} from "./components/Login";
import {LoginPagina} from "./pages/LoginPagina";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={ <LoginPagina/> } />

      </Routes>
    </div>
  );
}

export default App;
