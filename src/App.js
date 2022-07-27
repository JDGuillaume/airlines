import { useEffect, useState } from 'react';
import { routes, airlines, airports } from './data';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filteredAirline, setFilteredAirline] = useState('');
  const [filteredAirportCode, setFilteredAirportCode] = useState('');

  useEffect(() => {
    setFilteredRoutes(routes);
    setFilteredAirportCode('all');
    setFilteredAirline('all');
  }, []);

  const handleAirlineSelection = event => {
    let value = Number(event.target.value);
    if (Number.isNaN(value)) value = 'all';
    setFilteredAirline(value);

    if (value === 'all' && filteredAirportCode === 'all') {
      setFilteredRoutes(routes);
    } else if (filteredAirportCode === 'all') {
      let updatedRoutes = routes.filter(route => {
        return route.airline === value;
      });

      setFilteredRoutes(updatedRoutes);
    } else if (value === 'all') {
      let updatedRoutes = routes.filter(
        route =>
          route.src === filteredAirportCode ||
          route.dest === filteredAirportCode
      );
      setFilteredRoutes(updatedRoutes);
    } else {
      let updatedRoutes = routes.filter(route => {
        return route.airline === value;
      });

      updatedRoutes = updatedRoutes.filter(route => {
        return (
          route.src === filteredAirportCode ||
          route.dest === filteredAirportCode
        );
      });

      setFilteredRoutes(updatedRoutes);
    }
  };

  const handleAirportSelection = event => {
    let value = String(event.target.value);
    setFilteredAirportCode(value);

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
      let updatedRoutes = routes.filter(route => {
        return route.src === value || route.dest === value;
      });

      updatedRoutes = updatedRoutes.filter(route => {
        return route.airline === filteredAirline;
      });

      setFilteredRoutes(updatedRoutes);
    }
  };

  let filterAirportsToAirline = code => {
    if (code === 'all') {
      return routes.map(route => route.airline);
    } else {
      let data = routes;
      data = data.filter(route => route.src === code || route.dest === code);
      return data.map(route => route.airline);
    }
  };

  let filterAirlineToAirports = id => {
    if (id === 'all') {
      return airports.map(airport => airport.code);
    } else {
      let data = routes;
      data = data.filter(route => route.airline === id);

      const sources = data.map(route => route.src);
      const destinations = data.map(route => route.dest);

      let testAirports = airports.filter(
        airport =>
          sources.includes(airport.code) || destinations.includes(airport.code)
      );

      return testAirports.map(airport => airport.code);
    }
  };

  const handleReset = () => {
    setFilteredRoutes(routes);
  };

  let test = filterAirlineToAirports(filteredAirline);
  let validAirlines = filterAirportsToAirline(filteredAirportCode);

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
            validOptions={validAirlines}
            allOptions={airlines}
            type="Airlines"
            onSelect={handleAirlineSelection}
            keyValue="id"
          />{' '}
          fly in or out of{' '}
          <Select
            allOptions={airports}
            validOptions={test}
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
