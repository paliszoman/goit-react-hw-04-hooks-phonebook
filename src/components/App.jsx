import React, { useState, useEffect } from 'react';

import { Form } from './Form/Form.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';

export const App = () => {
  /* let contactsArray = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];*/
  let [contacts, setContacts] = useState([]);
  let [filterMe, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length <= 0) {
      // eslint-disable-next-line
      setContacts((contacts = JSON.parse(localStorage.getItem('phonebook'))));
    }
  }, []);

  useEffect(() => {
    if (contacts !== localStorage.getItem('phonebook')) {
      localStorage.setItem('phonebook', JSON.stringify(contacts));
    }
  }, [contacts]);

  //function for searching contacts by single letter
  const searchForContacts = searchFromFilter => {
    const filter = searchFromFilter.toLowerCase();
    let filterArray = [];
    contacts.map(contact => {
      const hasName = contact.name.toLowerCase().includes(filter);
      if (hasName) {
        filterArray.push(contact);
      }
      return setFilter((filterMe = filterArray));
    });
  };

  //function to add contact
  const addContact = contactFormForm => {
    const filter = contactFormForm.name.toLowerCase();
    let contactsArray = contacts.find(
      contact => contact.name.toLocaleLowerCase() === filter
    );
    // alert if contact is already added
    return contactsArray === undefined
      ? setContacts(contacts => [...contacts, contactFormForm])
      : alert('We have contact like this!');
  };

  //function that delete object with name from state
  const deleteContacts = deleteContact => {
    let contactsArray = [...contacts];
    let searchedContact = contacts.findIndex(
      contact => contact.name === deleteContact
    );
    contactsArray.splice(searchedContact, 1);
    return setContacts((contacts = contactsArray));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={contactFormForm => addContact(contactFormForm)}></Form>
      <h2>Contacts</h2>
      <Filter
        onChange={searchFromFilter => searchForContacts(searchFromFilter)}
      ></Filter>
      <ContactList
        contacts={filterMe === '' ? contacts : filterMe}
        deleteMe={deleteContacts}
      />
    </>
  );
};
