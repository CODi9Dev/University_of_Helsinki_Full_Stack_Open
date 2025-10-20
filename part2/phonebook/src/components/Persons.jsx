const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => <div key={person.name}>{person.name} {person.phone}</div>)}
    </>
  )
}

export default Persons