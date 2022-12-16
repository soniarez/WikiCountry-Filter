
type DropdownProps = {
    title: string;
    label: string;
    option: string[];
    value: string;
    defaultValue?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};


const Dropdown = ({title, label, option, value, defaultValue, onChange} : DropdownProps) => {
  return (
    <div>
      <label htmlFor={`${label}-select`}>Choose a {title} :</label>
      <select
        className="dropdown"
        defaultValue=""
        onChange={onChange}

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
