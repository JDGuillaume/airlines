const Filter = ({ allOptions, onSelect, type, keyValue, validOptions }) => {
  console.log('Valid Options', validOptions);
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
