import React from 'react';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'components/redux/redux';

export default function ContactList() {
  const contacts = useSelector(state => state.phonebook.contacts.items);
  const filter = useSelector(state => state.phonebook.contacts.filter);
  const dispatch = useDispatch();

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const contactsArr = filterContacts();
  return (
    <ul className={css.contactsList}>
      {contactsArr.length > 0 &&
        contactsArr.map(contact => {
          return (
            <li key={contact.id} className={css.contact}>
              {contact.name}: {contact.number}
              <button
                className={css.deleteButton}
                onClick={() => dispatch(removeContact(contact.id))}
              >
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  );
}
