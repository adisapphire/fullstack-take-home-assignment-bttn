import React, { useState } from 'react'
import styles from "./User.module.css";
import Dropdown from "./Dropdown"

import { FaUser } from 'react-icons/fa'
function User({ username, setIsAuth }) {
  const [showOptions, setShowOptions] = useState(false);
  const options = ['Logout'];

  function handleOptionSelect(value) {
    if (value === "Logout") {
      setIsAuth(false);
      localStorage.setItem("access_token", null);
      localStorage.setItem("refresh_token", null);
      localStorage.setItem("username", null);
    }
  }
  return (
    <>
      <FaUser className={styles[`user-icon__icon`]} onClick={() => setShowOptions(!showOptions)} />
      {username}
      <Dropdown options={options} onSelect={handleOptionSelect} showOptions={showOptions} />
    </>
  )
}

export default User;


