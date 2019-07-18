import React from 'react'
import './App.css'
import ChatBox from './components/ChatBox'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './routes/User'

function App() {
  return (
    <Router>
      <Route path='/chat' component={ChatBox} />
      <Route path='/users' component={User} />
    </Router>
  );
}

export default App;
