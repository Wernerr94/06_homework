import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './FIlter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    console.log(contacts);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addUserToContacts = ({ id, name, number }) => {
    const newUser = {
      id,
      name,
      number,
    };

    let obj = this.state.contacts.find(
      contact => contact.name === newUser.name
    );
    if (obj) {
      alert(`${newUser.name} is already in contcts.`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [newUser, ...prevState.contacts],
      }));
    }
  };

  changeFilterValue = e => {
    this.setState({ filter: e.target.value });
  };
  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          contactsArr={this.state.contacts}
          onSubmit={this.addUserToContacts}
        />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilterValue} />
        <ContactList
          contactsArr={filteredContacts}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
