function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu">
        <p className="menu-title">MENU</p>

        <button className="menu-item active">
          <span>⌂</span>
          Dashboard
        </button>

        <button className="menu-item">
          <span>⬆</span>
          Upload Documents
        </button>

        <button className="menu-item">
          <span>◫</span>
          Investigation Results
        </button>

        <button className="menu-item">
          <span>◉</span>
          Evidence Review
        </button>

        <button className="menu-item">
          <span>▣</span>
          Investigation Dossier
        </button>
      </div>

      <div className="sidebar-bottom">
        <p>VERITAS AI</p>
        <span>Document Intelligence System</span>
      </div>
    </aside>
  );
}

export default Sidebar;