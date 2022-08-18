import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export default class ContactList extends Component {
  render() {
    const { contactsArr, onDelete } = this.props;

    return (
      <ul className={css.contactsList}>
        {contactsArr.length > 0 &&
          contactsArr.map(c => {
            return (
              <li key={c.id} className={css.contact}>
                {c.name}: {c.number}
                <button onClick={() => onDelete(c.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contactsArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
