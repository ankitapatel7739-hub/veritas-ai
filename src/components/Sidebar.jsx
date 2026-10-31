function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="menu">
        <p className="menu-title">MENU</p>

        <button
          className={`menu-item ${activePage === "home" ? "active" : ""}`}
          onClick={() => setActivePage("home")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={`menu-item ${activePage === "upload" ? "active" : ""}`}
          onClick={() => setActivePage("upload")}
        >
          <span>⬆</span>
          Upload Documents
        </button>

        <button
          className={`menu-item ${activePage === "results" ? "active" : ""}`}
          onClick={() => setActivePage("results")}
        >
          <span>◫</span>
          Investigation Results
        </button>

        <button
          className={`menu-item ${activePage === "evidence" ? "active" : ""}`}
          onClick={() => setActivePage("evidence")}
        >
          <span>◉</span>
          Evidence Review
        </button>

        <button
          className={`menu-item ${activePage === "dossier" ? "active" : ""}`}
          onClick={() => setActivePage("dossier")}
        >
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