import Dropdown from "./Dropdown";

type RegionDropdownProps = {
  regions: string[];
  onRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RegionDropdown = ({
  regions,
  onRegionChange,
}: RegionDropdownProps) => {
  return (
    <>
      <Dropdown
        title="region"
        label="regions"
        option={regions}
        value="regions"
        onChange={onRegionChange}
      />
    </>
  );
};

export default RegionDropdown;

