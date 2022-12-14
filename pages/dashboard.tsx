import { useState, useEffect } from 'react';
import TableByRegion from '../components/TableByRegion';

const Dashboard = ({ rawCountriesData }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [countriesByRegionData, setCountriesByRegionData] = useState<string[]>([]);

  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [countriesByLanguageData, setCountriesByLanguageData] = useState<string[]>([]);
  const [regionAndLanguageSelection, setRegionAndLanguageSelection] = useState<string[]>([]);

  useEffect(() => {
    fiterByRegionDropdown();
    filterByLanguageDropdown();
  }, [selectedRegion, selectedLanguage]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
    filterByLanguageDropdown();
    filterCountriesBySelectedRegion(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    filterCountriesBySelectedLanguage(event.target.value);
    
  }; 

//Populates the region select
  const fiterByRegionDropdown = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map(item => item.region))
    ];
    setRegions(uniqueRegions);
  };

//Filter data per region to populate the table
 const filterCountriesBySelectedRegion = (selectedRegion) => {
    const countriesBySelectedRegion = rawCountriesData.filter(
      item => item.region === selectedRegion
    );
    setCountriesByRegionData(countriesBySelectedRegion);
  };


//Populates the language select
const filterByLanguageDropdown = () => {
    const uniqueLanguages = [
      ...new Set(countriesByRegionData.map(item => item.languages[0].name)),
    ];
    setLanguages(uniqueLanguages);
    setCountriesByLanguageData(countriesByRegionData);
  };
   

  //Filer data by language acording to the selected language to populate the table
 const filterCountriesBySelectedLanguage = (selectedLanguage) => {
    const temp = countriesByLanguageData.filter(
      item => item.languages[0].name === selectedLanguage
    );
    setRegionAndLanguageSelection(temp);
  } 

  
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

      <TableByRegion countriesByRegionData={countriesByRegionData} regionAndLanguageSelection={regionAndLanguageSelection}/>
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
