import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path="/" element={<VideoList />} />
            <Route path="/video/:id" element={<VideoDetail />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
