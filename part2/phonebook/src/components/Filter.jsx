const Filter = ({ search, handleSearchChange }) => {
  return <div>Filter shown with <input placeholder="Search" value={search} onChange={handleSearchChange} /></div>
}

export default Filter