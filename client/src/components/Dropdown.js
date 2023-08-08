import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ options, onSelect, showOptions }) => {


  const handleSelect = (option) => {
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={styles[`dropdown`]}>
      {showOptions && (
        <ul className={styles[`options`]}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;