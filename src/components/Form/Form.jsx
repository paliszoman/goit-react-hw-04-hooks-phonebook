import css from './Form.module.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const Form = props => {
  let [name, setName] = useState('');
  let [number, setNumber] = useState('');
  let [id, setId] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const nameForm = form.name.value;
    const numberForm = form.number.value;
    const idForm = nanoid(6);
    setName((name = nameForm));
    setNumber((number = numberForm));
    setId((id = idForm));
    props.onSubmit({ id, name, number });
    e.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={formSubmit}>
      <label className={css.label}>Name</label>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.label}>Number</label>
      <input
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.butt} type="submit">
        Add Contact
      </button>
    </form>
  );
};

Form.propTypes = {
  formSubmit: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.string),
};
