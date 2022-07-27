import { useEffect, useState } from 'react';
import { routes, airlines, airports } from './data';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filteredAirline, setFilteredAirline] = useState('');
  const [filteredAirports, setFilteredAirports] = useState('');

  useEffect(() => {
    setFilteredRoutes(routes);
    setFilteredAirports('all');
    setFilteredAirline('all');
  }, []);

  const handleAirlineSelection = event => {
    let value = Number(event.target.value);
    if (Number.isNaN(value)) value = 'all';
    setFilteredAirline(value);

    if (value === 'all' && filteredAirports === 'all') {
      setFilteredRoutes(routes);
    } else if (filteredAirports === 'all') {
      let updatedRoutes = routes.filter(route => {
        return route.airline === value;
      });

      setFilteredRoutes(updatedRoutes);
    } else if (value === 'all') {
      let updatedRoutes = routes.filter(
        route =>
          route.src === filteredAirports || route.dest === filteredAirports
      );
      setFilteredRoutes(updatedRoutes);
    } else {
      let updatedRoutes = filteredRoutes.filter(route => {
        return route.airline === value;
      });

      setFilteredRoutes(updatedRoutes);
    }
  };

  const handleAirportSelection = event => {
    let value = String(event.target.value);
    setFilteredAirports(value);

    if (filteredAirline === 'all' && value === 'all') {
      setFilteredRoutes(routes);
    } else if (filteredAirline === 'all') {
      let updatedRoutes = routes.filter(route => {
        return route.src === value || route.dest === value;
      });

      setFilteredRoutes(updatedRoutes);
    } else if (value === 'all') {
      let updatedRoutes = routes.filter(route => {
        return route.airline === filteredAirline;
      });
      setFilteredRoutes(updatedRoutes);
    } else {
      let updatedRoutes = filteredRoutes.filter(route => {
        return route.src === value || route.dest === value;
      });

      setFilteredRoutes(updatedRoutes);
    }
  };

  const handleReset = () => {
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
        <form>
          Show routes on
          <Select
            options={airlines}
            type="Airlines"
            onSelect={handleAirlineSelection}
            keyValue="id"
          />{' '}
          fly in or out of{' '}
          <Select
            options={airports}
            type="Airports"
            onSelect={handleAirportSelection}
            keyValue="code"
          />
          <button type="reset" onClick={handleReset}>
            Show All Routes
          </button>
        </form>
        <Table className="routes-table" perPage={25} routes={filteredRoutes} />
      </section>
    </div>
  );
};

export default App;
