import Nav from './Components/Nav'
import Hero from './Components/Hero'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function App() { 


  return (
    <div className="app">
      <Nav />
      <Outlet />
    </div>
  )
}
export default App
