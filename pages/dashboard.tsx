import { useState, useEffect } from 'react';
import TableByRegion from '../components/TableByRegion';

const Dashboard = ({ rawCountriesData }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('Asia');

  //console.log(rawCountriesData, 'rawCountriesData');

  useEffect(() => {
    fiterByRegion();
  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
  };

  const fiterByRegion = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map(item => item.region)),
    ];
    setRegions(uniqueRegions);
  };

  return (
    <div>
      <h1>Wiki Country</h1>
      {/*Sacar select y select array (map) a componentes independientes c/u */}
      <label htmlFor="region-select">Choose a region:</label>
      <select name="regions" className="region-select" defaultValue="Asia" onChange={handleRegionChange}>
        <option value="regions" disabled>--Regions--</option>
        {regions?.map((region) => (
          <option key={region} value={region} >
            {region}
          </option>
        ))}
      </select>

      <TableByRegion rawCountriesData={rawCountriesData} selectedRegion={selectedRegion} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const rawCountriesData = await res.json();

  return {
    props: {
      rawCountriesData,
    },
  };
};

export default Dashboard;
