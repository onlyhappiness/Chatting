import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <i className="fas fa-bars bars"></i>

        <div className="content">
        </div>

        <ul className="menu">
          <li>
            <i className="far fa-bell"></i>
          </li>
          <li>
            <i className="fas fa-grip-horizontal"></i>
          </li>
          <li>
            <i className="fas fa-cog"></i>
          </li>
        </ul>
    </div>
  );
};

export default Header;