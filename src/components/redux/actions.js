import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction(
  'phonebook/addContact',
  function prepare(name, number, id) {
    return {
      payload: {
        id,
        name,
        number,
      },
    };
  }
);
export const removeContact = createAction('phonebook/removeContact');

export const getFilterValue = createAction('phonebook/getFilterValue');
