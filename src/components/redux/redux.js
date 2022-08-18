import {
  configureStore,
  createAction,
  createReducer,
  nanoid,
} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// INITIAL STATE
const initialState = {
  contacts: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
};

// ACTIONS
export const addContact = createAction(
  'phonebook/addContact',
  function prepare(name, number) {
    return {
      payload: {
        id: nanoid(),
        name,
        number,
      },
    };
  }
);
export const removeContact = createAction('phonebook/removeContact');

export const getFilterValue = createAction('phonebook/getFilterValue');

// REDUCER
const phonebook = createReducer(initialState, {
  [addContact]: (state, action) => {
    let newContact = state.contacts.items.find(
      item => item.name === action.payload.name
    );
    if (newContact) {
      alert(`${action.payload.name} is already in contacts.`);
      return;
    } else {
      state.contacts.items.unshift(action.payload);
    }
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

// PERSIST
const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, phonebook);

//STORE
export const store = configureStore({
  reducer: {
    phonebook: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
