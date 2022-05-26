import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';

import NoteState from './context/noteState';



function App() {
  return (
    <>
    <NoteState>
      <Router>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
