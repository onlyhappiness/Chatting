
import React from 'react';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo_content">
        <div className="logo">
        </div>
      </div>

      <ul className="nav_list">
        <li className="side_items">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." className="search" />
          <span className="tooltip">Search</span>
        </li>

        <li className="side_items" >
          {/* <a href=""> */}
            <i className="fas fa-home"></i>
            <span className="links_name">Home</span>
          {/* </a> */}
          <span className="tooltip">Home</span>
        </li>

        <li className="side_items" >
          {/* <a href="#"> */}
            <i className="fas fa-user"></i>
            <span className="links_name">User</span>
          {/* </a> */}
          <span className="tooltip">User</span>
        </li>

        <li className="side_items" >
          {/* <a href="#"> */}
            <i className="fas fa-comments"></i>
            <span className="links_name">Chat</span>
          {/* </a> */}
          <span className="tooltip">Chat</span>
        </li>

        <li className="side_items" >
          {/* <a href="#"> */}
            <i className="far fa-calendar"></i>
            <span className="links_name">
              Calendar</span>
          {/* </a> */}
          <span className="tooltip">Calendar</span>
        </li>

        <li className="side_items" >
          {/* <a href="#"> */}
            <i className="fas fa-clipboard-list"></i>
            <span className="links_name">
              Lists</span>
          {/* </a> */}
          <span className="tooltip">List</span>
        </li>

        <li className="side_items" >
          {/* <a href="#"> */}
            <i className="fas fa-ellipsis-h"></i>
            <span className="links_name">
              Additional</span>
          {/* </a> */}
          <span className="tooltip">Additional</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;