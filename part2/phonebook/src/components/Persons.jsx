import Person from '../components/Person'

const Persons = ({ personsToShow, deletePerson }) => {

  return (
    <>
      {personsToShow.map((person) => <Person key={person.id} person={person} deletePerson={() => deletePerson(person)} />)}
    </>
  )
}

export default Persons