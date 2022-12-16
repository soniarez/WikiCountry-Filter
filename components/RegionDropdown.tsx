import Dropdown from "./Dropdown";

type RegionDropdownProps = {
  regions: string[];
  handleRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RegionDropdown = ({
  regions,
  handleRegionChange,
}: RegionDropdownProps) => {
  return (
    <>
      <Dropdown
        title="region"
        label="regions"
        option={regions}
        value="regions"
        defaultValue="Asia"
        handleChange={handleRegionChange}
      />
    </>
  );
};

export default RegionDropdown;

/* 
const RegionDropdown = ({regions, handleRegionChange }) => {
  return (
    <div>
      
      <label htmlFor="region-select">Choose a region:</label>
      <select name="regions" className="region-select" defaultValue="" onChange={handleRegionChange}>
        <option value="regions">--Regions--</option>
        {regions?.map((region) => (
          <option key={region} value={region} >
            {region}
          </option>
        ))}
      </select>
    </div>
  )
}
 */
