import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Kidd Communications</p>
        <p>Bachelor's in Computer Science | CompTIA Security + CE Certified</p>
      </div>
    </footer>
  );
}

export default Footer;
