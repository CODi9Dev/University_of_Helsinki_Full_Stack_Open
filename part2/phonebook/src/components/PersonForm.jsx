const PersonForm = ({ newName, newPhone, handlePersonChange, handlePhoneChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input placeholder="Name" value={newName} onChange={handlePersonChange} />
        <br />
        number: <input placeholder="Phone" value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm