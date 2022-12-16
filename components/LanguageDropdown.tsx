import Dropdown from "./Dropdown";

type LanguageDropdownProps = {
  languages: string[];
  handleLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const LanguageDropdown = ({
  languages,
  handleLanguageChange,
}: LanguageDropdownProps) => {
  return (
    <>
      <Dropdown
        title="language"
        label="languages"
        option={languages}
        value="languages"
        handleChange={handleLanguageChange}
      />
    </>
  );
};

export default LanguageDropdown;
