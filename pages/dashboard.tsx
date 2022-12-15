import { useState, useEffect } from 'react';
import RegionDropdown from '../components/RegionDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import TableByRegion from '../components/TableByRegion';

const Dashboard = ({ rawCountriesData }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [countriesByRegionData, setCountriesByRegionData] = useState<string[]>(
    []
  );

  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [countriesByLanguageData, setCountriesByLanguageData] = useState<
    string[]
  >([]);
  const [regionAndLanguageSelection, setRegionAndLanguageSelection] = useState<
    string[]
  >([]);

  const [tableDataSender, setTableDataSender] = useState<string[]>([]);

  useEffect(() => {
    fiterByRegionDropdown();
    filterByLanguageDropdown();
    renderTable();
  }, [selectedRegion, selectedLanguage]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
    filterByLanguageDropdown();
    filterCountriesBySelectedRegion(event.target.value);
    console.log(selectedLanguage, "before")
    setSelectedLanguage("");
    setLanguages([])
    console.log(selectedLanguage, "after")
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    filterCountriesBySelectedLanguage(event.target.value);
  };

  //Renders table based on selected region or and language
  const renderTable = () => {
    if (selectedRegion.length > 0 && selectedLanguage.length === 0) {
      //console.log(selectedRegion, selectedLanguage)
      setTableDataSender(countriesByRegionData);
    } else if (selectedLanguage.length > 0 && selectedLanguage.length > 0) {
      console.log(selectedRegion, selectedLanguage)
      setTableDataSender(regionAndLanguageSelection);
    }
  };

  //Populates the region select
  const fiterByRegionDropdown = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map(item => item.region)),
    ];
    setRegions(uniqueRegions);
  };

  //Filter data per region to populate the table
  const filterCountriesBySelectedRegion = (selectedRegion: string): void => {
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
 const filterCountriesBySelectedLanguage = (
    selectedLanguage: string
  ): void => {
    const temp = countriesByLanguageData.filter(
      item => item.languages[0].name === selectedLanguage
    );
    setRegionAndLanguageSelection(temp);
  }; 

  return (
    <div>
      <h1>Wiki Country</h1>
      <RegionDropdown
        regions={regions}
        handleRegionChange={handleRegionChange}
      />

      <LanguageDropdown
        languages={languages}
        handleLanguageChange={handleLanguageChange}
      />

      <TableByRegion tableDataSender={tableDataSender} />
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
