import css from './Filter.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Filter = props => {
  let [searchFromFilter, setSearch] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const contact = form.name.value;
    setSearch((searchFromFilter = contact));
    props.onChange(searchFromFilter);
  };

  return (
    <form className={css.form} onChange={formSubmit}>
      <label className={css.label}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </form>
  );
};

Filter.propTypes = {
  formSubmit: PropTypes.func,
  searchFromFilter: PropTypes.string,
};
