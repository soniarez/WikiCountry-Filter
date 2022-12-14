
const RegionDropdown = ({regions, handleRegionChange }) => {
  return (
    <div>
      
      {/*Sacar map a componente separado?*/}
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

export default RegionDropdown
