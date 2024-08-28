import React from 'react';

const Footer = ({ text }) => {
  return (
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#f8f8f8',
      color: '#333',
      textAlign: 'center',
      padding: '10px 0',
      borderTop: '1px solid #e7e7e7',
	  fontSize: '12px'
    }}>
      {text}
    </footer>
  );
};

export default Footer;