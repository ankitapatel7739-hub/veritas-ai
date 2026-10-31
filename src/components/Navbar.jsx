function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">◈</span>
        <span>VERITAS AI</span>
      </div>

      <div className="nav-right">
        <div className="status">
          <span className="status-dot"></span>
          System Online
        </div>

        <div className="profile">
          <div className="avatar">A</div>
          <span>Investigator</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;