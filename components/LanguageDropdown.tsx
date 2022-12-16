import Dropdown from "./Dropdown";

type LanguageDropdownProps = {
  languages: string[];
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const LanguageDropdown = ({
  languages,
  onLanguageChange,
}: LanguageDropdownProps) => {
  return (
    <>
      <Dropdown
        title="language"
        label="languages"
        option={languages}
        value="languages"
        onChange={onLanguageChange}
      />
    </>
  );
};

export default LanguageDropdown;
