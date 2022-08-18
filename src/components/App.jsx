import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './FIlter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
