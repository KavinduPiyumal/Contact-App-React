import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const [toggleForm, settoggleForm] = useState(false);
  return (
    <div className="ui container">
      <Header />
      <div className="addbutton" onClick={()=>{settoggleForm(!toggleForm)}}>
        <i className="plus circle icon"></i>
        <h2> Add Contact</h2>
      </div>
      {
       toggleForm && 
      <AddContact addContactHandler={addContactHandler} />
}
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;