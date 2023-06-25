import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { userAuthRequest } from 'redux/contacts/userSlice';
import Loader from './Loader/Loader';

import css from '../components/App.module.css';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('pages/ContacsPage/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const isUserAuthorization = userData !== null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch(userAuthRequest());
  }, [dispatch]);

  return (
    <>
      <div>
        <header className={css.header}>
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? css.active : css.navLink
              }
            >
              Home
            </NavLink>
            {isUserAuthorization ? (
              <>
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive ? css.active : css.navLink
                  }
                >
                  Contacts
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/registerPage"
                  className={({ isActive }) =>
                    isActive ? css.active : css.navLink
                  }
                >
                  Registration
                </NavLink>
                <NavLink
                  to="/loginPage"
                  className={({ isActive }) =>
                    isActive ? css.active : css.navLink
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </nav>
        </header>
        <div>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/registerPage" element={<RegisterPage />} />
              <Route path="/loginPage" element={<LoginPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};
