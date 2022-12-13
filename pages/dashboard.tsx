import { useState, useEffect } from 'react';
import TableByRegion from '../components/TableByRegion';

const Dashboard = ({ rawCountriesData }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  // console.log(rawCountriesData, 'rawCountriesData');

  //console.log(rawCountriesData[145].languages[0].name, "languages.name")
  

  useEffect(() => {
    fiterByRegion();

  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
    fiterByLanguagePerRegion()
    //console.log(selectedLanguage, " selectedlenguages")
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const fiterByRegion = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map(item => item.region)),
    ];
    setRegions(uniqueRegions);

  };

  const fiterByLanguagePerRegion = () => {
    const filteredData = rawCountriesData.filter(
      item => item.region === selectedRegion
    );
    console.log(filteredData, "filteredData")
    const uniqueLanguages = [
      ...new Set(filteredData.map(item => item.languages[0].name)),
    ];
    setLanguages(uniqueLanguages);
  };
  
  //console.log(languages)

  return (
    <div>
      <h1>Wiki Country</h1>
      {/*Sacar select y select array (map) a componentes independientes c/u */}
      <label htmlFor="region-select">Choose a region:</label>
      <select name="regions" className="region-select" defaultValue="" onChange={handleRegionChange}>
        <option value="regions">--Regions--</option>
        {regions?.map((region) => (
          <option key={region} value={region} >
            {region}
          </option>
        ))}
      </select>

      {/*Sacar select y select array (map) a componentes independientes c/u */}
      <label htmlFor="languages-select">Choose a language:</label>
      <select name="languages" className="language-select" defaultValue="" onChange={handleLanguageChange}>
        <option value="languages" >--Languages--</option>
        {languages?.map((language) => (
          <option key={language} value={language} >
            {language}
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
