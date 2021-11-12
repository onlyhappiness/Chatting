import React from 'react'
import { 
  BrowserRouter as Routes,
  Switch, 
  Route 
} from 'react-router-dom'

import './App.css'
import MainPage from './components/view/MainPage/MainPage'
import LoginPage from './components/view/LoginPage/LoginPage'
import RegistetPage from './components/view/RegisterPage/RegistetPage'
import Chatting from './components/view/Chatting/Chatting'
import Calendar from './components/view/Calendar/Calendar'

function App() {
  return (
    <Routes>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/register" component={ RegistetPage } />
          <Route exact path="/chat" component={ Chatting } />
          <Route exact path="/calendar" component={ Calendar } />

        </Switch>
      </div>
    </Routes>
  )
}

export default App
