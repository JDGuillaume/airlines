import './App.css';
import Table from './components/Table';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>Welcome to the app!</p>
      </section>
      <section>
        <Table className="routes-table" perPage={49} />
      </section>
    </div>
  );
};

export default App;
