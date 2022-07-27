const Filter = ({ options, onSelect, type, keyValue }) => {
  return (
    <select defaultValue="all" onChange={onSelect}>
      <option value="all" key="all">
        All {type}
      </option>
      {options.map(option => (
        <option value={option[keyValue]} key={option[keyValue]}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
