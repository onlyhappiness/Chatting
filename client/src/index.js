import './style/header.css';
import './style/main.css';
import './style/sidebar.css';
import './style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/container';
import Sidebar from './components/sidebar';

const App = () => {
  return(
    <div>
      <Sidebar />
      <Container />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('.root'));