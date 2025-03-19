import React from 'react'
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AudioRecorder from './pages/audio'

const App=()=> {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/audio"} element={<AudioRecorder />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
