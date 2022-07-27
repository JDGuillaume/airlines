import { useEffect, useState } from 'react';
import { airlines, airports } from '../data';

const getAirlineById = id => {
  return airlines.find(airline => airline.id === id).name;
};

const getAirportByCode = code => {
  return airports.find(airport => airport.code === code).name;
};

const Table = ({ className, perPage, routes }) => {
  const [routeSelection, setRouteSelection] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(perPage - 1);
  const numberOfRoutes = routes.length;

  useEffect(() => {
    const routesPart = routes.slice(startIndex, endIndex + 1);
    setRouteSelection(routesPart);
  }, [routes, startIndex, endIndex, perPage]);

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(perPage - 1);
  }, [routes, perPage]);

  const prevButtonStatus = startIndex === 0 ? true : false;
  const nextButtonStatus =
    startIndex + perPage >= numberOfRoutes ? true : false;

  const handlePrev = () => {
    setStartIndex(startIndex - perPage);
    setEndIndex(endIndex - perPage);
  };

  const handleNext = () => {
    setStartIndex(startIndex + perPage);
    setEndIndex(endIndex + perPage);
  };

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            <th scope="col">Airline</th>
            <th scope="col">Source Airport</th>
            <th scope="col">Destination Airport</th>
          </tr>
        </thead>
        <tbody>
          {routeSelection.map((route, index) => {
            return (
              <tr key={index}>
                <td>{getAirlineById(route.airline)}</td>
                <td>{getAirportByCode(route.src)}</td>
                <td>{getAirportByCode(route.dest)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Showing{' '}
        {numberOfRoutes === 0
          ? 0
          : startIndex === 0
          ? startIndex + 1
          : startIndex}
        -{endIndex <= numberOfRoutes ? endIndex + 1 : numberOfRoutes} of{' '}
        {numberOfRoutes} routes.
      </p>
      <button
        id="prev-page"
        disabled={prevButtonStatus}
        onClick={() => handlePrev()}
      >
        Prev Page
      </button>
      <button
        id="next-page"
        disabled={nextButtonStatus}
        onClick={() => handleNext()}
      >
        Next Page
      </button>
    </>
  );
};

export default Table;
