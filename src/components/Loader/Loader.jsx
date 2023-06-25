import React from 'react';
import { Bars } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

function Loader() {
  return (
    <div className={css.wrapper}>
      <Bars className={css.loader} />
    </div>
  );
}

export default Loader;
