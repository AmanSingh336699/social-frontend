import React from 'react'
import Home from './Pages/Home'
import Messages from './Pages/Messages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatRoom from './Pages/ChatRoom'
import Profile from './Pages/Profile'
import CommentPage from './Pages/CommentPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Search from './Pages/Search'
import Header from './components/Header/Header'

function App() {
  return (
    <Router>
      <Routes>
        {/* <ProtectedRoute> */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        {/* </ProtectedRoute> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/messages" element={
          <ProtectedRoute><Messages /></ProtectedRoute>
        } />
        <Route path="/chat/:chatId" element={
          <ChatRoom />
        } />
        <Route path="/profile/:userId" element={<Profile />
   
        } />
        <Route path="/comments/:postId" element={
          <CommentPage />
        } />
      </Routes>
    </Router>
  )
}

export default App