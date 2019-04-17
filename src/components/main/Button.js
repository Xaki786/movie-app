import React from 'react';
import './Button.css' ;

export default ({ onClick, children }) => (
  <div className="search-button">
        <button onClick={onClick}>{children}</button>
  </div>
); 