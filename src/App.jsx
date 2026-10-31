import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Evidence from "./pages/Evidence";
import Dossier from "./pages/Dossier";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // Store the finding selected from Results page
  const [selectedFinding, setSelectedFinding] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      case "upload":
        return <Upload />;

      case "results":
        return (
          <Results
            setActivePage={setActivePage}
            setSelectedFinding={setSelectedFinding}
          />
        );

      case "evidence":
        return <Evidence selectedFinding={selectedFinding} />;

      case "dossier":
        return <Dossier />;

      case "dashboard":
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="app-layout">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;