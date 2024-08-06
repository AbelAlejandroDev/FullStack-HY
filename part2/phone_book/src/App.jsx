import { useState, useEffect } from "react";
import {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/persons";

const Message = ({ text, success }) => {
  return <p className={`message ${success ? "success" : "error"}`}>{text}</p>;
};

const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter shown with: <input onChange={onChange} value={value} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  onChangeName,
  onChangeNumber,
  valueName,
  valueNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onChangeName} value={valueName} />
      </div>
      <div>
        number: <input onChange={onChangeNumber} value={valueNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ search, persons, filteredPersons, onDelete }) => {
  return (
    <>
      {search.length === 0
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => onDelete(person.id, person.name)}>
                delete
              </button>
            </p>
          ))
        : filteredPersons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => onDelete(person.id, person.name)}>
                delete
              </button>
            </p>
          ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = ({ target }) => {
    setNewName(target.value);
  };

  const handleChangeNumber = ({ target }) => {
    setNewNumber(target.value);
  };

  const handleChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const nameExist = persons.find((person) => person.name === newPerson.name);

    if (nameExist) {
      handleUpdate(nameExist.id, newPerson);
      setMessage({ text: `Changed ${newPerson.name}`, success: true });
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    createPerson(newPerson)
      .then((response) => {
        console.log(response.data);
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNumber("");
        setMessage({ text: `Added ${newPerson.name}`, success: true });
        setTimeout(() => setMessage(""), 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage({ text: error.response.data.error, success: false });
        setTimeout(() => setMessage(""), 1500);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({ text: `Deleted ${name}`, success: true });
          setTimeout(() => setMessage(""), 1500);
        })
        .catch((error) => {
          console.error(error);
          setMessage({ text: error.response.data.error, success: false });
          setTimeout(() => setMessage(""), 1500);
        });
    }
  };

  const handleUpdate = (id, newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one`
      )
    ) {
      updatePerson(id, newPerson)
        .then((response) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data))
          );
          setNewName("");
          setNewNumber("");
          setMessage({ text: `Updated ${newPerson.name}`, success: true });
          setTimeout(() => setMessage(""), 1500);
        })
        .catch((error) => {
          console.error(error);
          setMessage({ text: error.response.data.error, success: false });
          setTimeout(() => setMessage(""), 1500);
        });
    }
  };

  useEffect(() => {
    try {
      getAll().then((response) => setPersons(response.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message text={message.text} success={message.success} />}
      <Filter onChange={handleChangeSearch} value={search} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons
        search={search}
        persons={persons}
        filteredPersons={filteredPersons}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
