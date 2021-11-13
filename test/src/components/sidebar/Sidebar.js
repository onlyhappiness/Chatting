import React from 'react'
import { Link } from 'react-router-dom'

import './sidebar.scss'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <i class="fas fa-home sidebarIcon"></i>
            <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
            <i class="fas fa-comments sidebarIcon"></i>
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <i class="far fa-calendar sidebarIcon"></i>
            <span className="sidebarListItemText">Calendar</span>
          </li>
          <li className="sidebarListItem">
            <i class="fas fa-door-open sidebarIcon"></i>
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
