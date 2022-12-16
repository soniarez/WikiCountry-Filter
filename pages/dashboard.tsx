import { useState, useEffect } from "react";
import { Country } from "../types/rawCountriesDataType";
import RegionDropdown from "../components/RegionDropdown";
import LanguageDropdown from "../components/LanguageDropdown";
import CountriesTable from "../components/CountriesTable";

type dashboardProps = {
  rawCountriesData: Country;
};

const Dashboard = ({ rawCountriesData }: dashboardProps) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("Asia");
  const [countriesByRegionData, setCountriesByRegionData] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [countriesByLanguageData, setCountriesByLanguageData] = useState<Country[]>([]);
  const [tableData, setTableData] = useState<Country[]>([]);

  useEffect(() => {
    populateRegionsDropdown();
    populateLanguagesDropdown();
    handleTableDataRender();
  }, [selectedRegion, selectedLanguage]);

  console.log(selectedRegion)

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(event.target.value);
    populateLanguagesDropdown();
    filterCountriesBySelectedRegion(event.target.value);
    setSelectedLanguage("");
    setLanguages([]); 
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    filterCountriesBySelectedLanguage(event.target.value);
  };

  const populateRegionsDropdown = () => {
    const uniqueRegions = [
      ...new Set(rawCountriesData.map((item) => item.region)),
    ];
    setRegions(uniqueRegions);
  };

  const filterCountriesBySelectedRegion = (selectedRegion: string): void => {
    const countriesBySelectedRegion = rawCountriesData.filter(
      (item) => item.region === selectedRegion
    );
    setCountriesByRegionData(countriesBySelectedRegion);
  };

  const populateLanguagesDropdown = () => {
    const uniqueLanguages = [
      ...new Set(countriesByRegionData.map((item) => item.languages[0].name)),
    ];
    setLanguages(uniqueLanguages);
  };

  const filterCountriesBySelectedLanguage = (
    selectedLanguage: string
  ): void => {
    const countriesBySelectedLanguage = countriesByRegionData.filter(
      (item) => item.languages[0].name === selectedLanguage
    );
    setCountriesByLanguageData(countriesBySelectedLanguage);
  };

  const handleTableDataRender = () => {
    if (selectedRegion.length > 0 && selectedLanguage.length === 0) {
      setTableData(countriesByRegionData);
    } else if (selectedLanguage.length > 0 && selectedLanguage.length > 0) {
      //console.log(selectedRegion, selectedLanguage);
      setTableData(countriesByLanguageData);
    }
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

      <CountriesTable tableData={tableData} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const rawCountriesData = await res.json();

  return {
    props: {
      rawCountriesData,
    },
  };
};

export default Dashboard;
