import React from 'react';
import './App.css';
import ChatBox from './components/ChatBox'
import SignInForm from './components/SignInForm'

function App() {
  return (
    <React.Fragment>
      <ChatBox />
      <SignInForm />
    </React.Fragment>
  );
}

export default App;
