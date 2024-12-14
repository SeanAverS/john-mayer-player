import logo from "./images/john-mayer-logo.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import "./styles/logo.css";
import "./styles/global.css";
import "./styles/globalVideoStyling.css";
import "./styles/videoListStyling.css";
import "./styles/videoDetailStyling.css";

function App() {
  return (
    <Router basename="/john-mayer-player">
      <div className="App">
        <header className="global">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
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
