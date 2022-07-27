import { routes, airlines, aiports, airports } from '../data';

const getAirlineById = id => {
  return airlines.find(airline => airline.id === id).name;
};

const getAirportByCode = code => {
  return airports.find(airport => airport.code === code).name;
};

const Table = ({ className, columns, rows, format }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th scope="col">Airline</th>
          <th scope="col">Source Airport</th>
          <th scope="col">Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {routes.map(route => {
          return (
            <tr>
              <td>{getAirlineById(route.airline)}</td>
              <td>{getAirportByCode(route.src)}</td>
              <td>{getAirportByCode(route.dest)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
