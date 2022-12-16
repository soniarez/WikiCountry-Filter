
type DropdownProps = {
    title: string;
    label: string;
    option: string[];
    value: string;
    defaultValue?: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({title, label, option, value, defaultValue,  handleChange} : DropdownProps) => {
  return (
    <div>
      <label htmlFor={`${label}-select`}>Choose a {title} :</label>
      <select
        className="dropdown"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        <option value={value} >--{label}--</option>
        {option?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
