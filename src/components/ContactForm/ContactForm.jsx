import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactRequest } from 'redux/contacts/contactSlice';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);

  const isLoading = useSelector(state => state.phonebook.isLoading);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const formData = { name, number };

  const handleSubmit = event => {
    event.preventDefault();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === formData.name.toLowerCase()
      )
    ) {
      return alert(`${formData.name} already in your contacts list`);
    }
    dispatch(addContactRequest(formData));
    setName('');
    setNumber('');
  };

  return (
    <>
      <h2 className={css.titleNew}> New Contact</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <span className={css.title}>Name</span>
          <input
            className={css.input}
            onChange={event => setName(event.target.value)}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          <span className={css.title}>Number</span>
          <input
            className={css.input}
            onChange={event => setNumber(event.target.value)}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.button} type="submit" disabled={isLoading}>
          Add contact
        </button>
      </form>
    </>
  );
};
