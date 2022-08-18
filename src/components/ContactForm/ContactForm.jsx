import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
export default class ContactForm extends Component {
  state = {
    name: '',
    id: '',
    number: '',
  };

  reset = () => {
    this.setState({ name: '', id: '', number: '' });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      id: nanoid(),
    });
    // console.log(this.state);
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler} className={css.form}>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>
            <span>Number</span>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
          </label>
          <button type="submit">Add User</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  contactsArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};
