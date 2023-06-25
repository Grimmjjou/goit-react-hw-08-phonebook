import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WithAuthRedirect from 'hoc/WithAuthRedirect';
import { Message } from 'components/Message/Message';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import {
  deleteContactRequest,
  getContactsRequest,
} from 'redux/contacts/contactSlice';

import css from './ContactsPage.module.css';
import { UserMenu } from 'components/UserMenu/UserMenu';

function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);
  const isLoading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);
  const userData = useSelector(state => state.user.userData);
  const filter = useSelector(state => state.filter.filter);

  useEffect(() => {
    if (userData === null) return;
    dispatch(getContactsRequest());
  }, [userData, dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  const handleDeleteContact = contactId => {
    dispatch(deleteContactRequest(contactId));
  };
  return (
    <>
      <ul>
        {isLoading && <Loader />}
        {error && <p>error={error}</p>}
        <UserMenu />
        <ContactForm />
        <Filter />

        {Array.isArray(filteredContacts) && filteredContacts.length === 0 && (
          <Message text="Contact list is empy." />
        )}
        {Array.isArray(filteredContacts) &&
          filteredContacts.map(({ id, name, number }) => {
            return (
              <li className={css.item} key={id}>
                <h3>{name}</h3>
                <p>{number}</p>
                <button
                  className={css.button}
                  disabled={isLoading}
                  type="submit"
                  onClick={() => {
                    handleDeleteContact(id);
                  }}
                >
                  Delete Contact
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

const ProtectedComponent = WithAuthRedirect(ContactsPage, '/loginPage');

export default ProtectedComponent;
