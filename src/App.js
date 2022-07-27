import { useEffect, useState } from 'react';
import { routes, airlines } from './data';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    setFilteredRoutes(routes);
  }, []);

  const handleSelection = event => {
    let value = event.target.value;

    if (value !== 'all') {
      setFilteredRoutes(
        routes.filter(route => route.airline === Number(value))
      );
      return;
    }

    setFilteredRoutes(routes);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>Welcome to the app!</p>
      </section>
      <section>
        <Select options={airlines} onSelect={handleSelection} />
        <Table className="routes-table" perPage={25} routes={filteredRoutes} />
      </section>
    </div>
  );
};

export default App;
