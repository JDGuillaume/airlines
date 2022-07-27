const Filter = ({ allOptions, onSelect, type, keyValue, validOptions }) => {
  allOptions.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <select defaultValue="all" onChange={onSelect}>
      <option value="all" key="all">
        All {type}
      </option>
      {allOptions.map(option => (
        <option
          value={option[keyValue]}
          key={option[keyValue]}
          disabled={!validOptions.includes(option[keyValue])}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
