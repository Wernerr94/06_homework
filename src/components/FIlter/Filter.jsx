import React from 'react';
import './Filter.css';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
    <label>
      <h3>Find number by name</h3>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
