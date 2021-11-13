import React from 'react'
import { 
  BrowserRouter,
  Switch, 
  Route 
} from 'react-router-dom'

import './App.css'
import Home from './Page/Home/Home'
import LoginPage from './Page/LoginPage/LoginPage'
import RegisterPage from './Page/RegisterPage/RegistetPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegisterPage } />
      </Switch>
    </div>
  )
}

export default App
