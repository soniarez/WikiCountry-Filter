
const LanguageDropdown = ({languages, handleLanguageChange}) => {
  return (
    <div>
      {/*Sacar map a componente separado?*/}
      <label htmlFor="languages-select">Choose a language:</label>
      <select name="languages" className="language-select" defaultValue="" onChange={handleLanguageChange}>
        <option value="languages" >--Languages--</option>
        {languages?.map((language) => (
          <option key={language} value={language} >
            {language}
          </option>
        ))} 
      </select>
    </div>
  )
}

export default LanguageDropdown
