import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState } from './InitialState';
import { addContact, removeContact, getFilterValue } from './actions';

// PERSIST
const persistConfig = {
  key: 'contacts',
  storage,
};
export const phonebook = createReducer(initialState, {
  [addContact]: (state, action) => {
    state.contacts.items.unshift(action.payload);
  },
  [removeContact]: (state, action) => {
    state.contacts.items = state.contacts.items.filter(
      item => item.id !== action.payload
    );
  },
  [getFilterValue]: (state, action) => {
    state.contacts.filter = action.payload;
  },
});

export const persistedReducer = persistReducer(persistConfig, phonebook);
