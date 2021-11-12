import React from 'react'
import { Link } from 'react-router-dom'

import './tab.scss'

function Tab() {
  return (
    <div className="tab">
      <button class="tablinks"><Link to="/">Home</Link></button>
      <button class="tablinks"><Link to="/chat">Chat</Link></button>
      <button class="tablinks"><Link to="/calendar">Calendar</Link></button>
      <button class="tablinks"><Link to="/">Logout</Link></button>
    </div>
  )
}

export default Tab
