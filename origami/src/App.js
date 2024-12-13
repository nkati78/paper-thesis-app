import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
        <img src={process.env.PUBLIC_URL+'/rocket.png'} alt="My Image" />
      </div>
        <p>
          Origami Trading Platform
        </p>
      </header>
    </div>
  );
}

export default App;
