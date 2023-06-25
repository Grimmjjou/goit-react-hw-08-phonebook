import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactSlice';
import filterReducer from './contacts/filterSlice';
import userReducer from './contacts/userSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
    phonebook: contactsReducer,
  },
});
