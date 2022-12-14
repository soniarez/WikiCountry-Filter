import { useState, useEffect } from 'react';
import TableByRegion from '../components/TableByRegion';

const Dashboard = ({ rawCountriesData }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [countriesByLanguagePerRegion, setCountriesByLanguagePerRegion] = useState<string[]>([]);
  const [regionAndLanguage, setRegionAndLanguage] = useState<string[]>([]);

  useEffect(() => {
    fiterByRegion();
  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
    fiterByLanguagePerRegion(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    filterCountriesBySelectedLanguage(event.target.value);
  };

  const fiterByRegion = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map(item => item.region))
    ];
    setRegions(uniqueRegions);
  };

  const fiterByLanguagePerRegion = (selectedRegion) => {
    const countriesBySelectedRegion = rawCountriesData.filter(
      item => item.region === selectedRegion
    );

    const uniqueLanguages = [
      ...new Set(countriesBySelectedRegion.map(item => item.languages[0].name)),
    ];
    setLanguages(uniqueLanguages);
    setCountriesByLanguagePerRegion(countriesBySelectedRegion);
  };
  
  const filterCountriesBySelectedLanguage = (selectedLanguage) => {
    const temp = countriesByLanguagePerRegion.filter(
      item => item.languages[0].name === selectedLanguage
    );
    setRegionAndLanguage(temp);
  }

 console.log(regionAndLanguage, "regionAndLanguage")

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
