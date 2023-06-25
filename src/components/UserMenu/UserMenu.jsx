import { useDispatch, useSelector } from 'react-redux';
import { logOutRequest } from 'redux/contacts/userSlice';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user.userData.email);
  return (
    <div className={css.UserMenu}>
      <p className={css.userName}>Welcome back, {userEmail}!</p>
      <button
        className={css.btn}
        type="button"
        onClick={() => dispatch(logOutRequest())}
      >
        Log out
      </button>
    </div>
  );
};
