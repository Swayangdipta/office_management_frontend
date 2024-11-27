import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Routing from './Routing'

const App = () => {
  return (
    <AuthProvider>
        <Routing />
    </AuthProvider>
  )
}

export default App