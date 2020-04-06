import React from 'react';

const Checkbox = ({ checked, id, onChange, type = 'checkbox' }) => (
  <input type={type} id={id} checked={checked} onChange={onChange} />
);

export default Checkbox;