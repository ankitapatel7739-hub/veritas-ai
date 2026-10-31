import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;