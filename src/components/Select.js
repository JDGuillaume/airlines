const Filter = ({ options, onSelect }) => {
  return (
    <>
      <label>Filter by Airline</label>
      <select onChange={onSelect}>
        <option value="all" key="all">
          All Airlines
        </option>
        {options.map(option => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
