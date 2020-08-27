import React from 'react'
import './App.css'
import ChatBox from './components/ChatBox'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import User from './routes/User'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/console'>
          <Route path='/console/chat' component={ChatBox} />
          <Route path='/console/users' component={User} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
