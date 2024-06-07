import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <VideoList />
      </header>
    </div>
  );
}

export default App;
