import React from 'react';
import styles from './Registration.module.css'
import {NavLink} from 'react-router-dom'


export default function LogIn() {
  
  return (
    <form className={styles.registrationBlock}>
      <h2 className={styles.title}>LOG IN</h2>
      <p>Not a member yet? <NavLink to='/sign-up' className={styles.registrationRoute}>CREATE ACCOUNT</NavLink> </p>
      <input type="text" placeholder="Email address*" className={styles.inputRegistration} required />
      <input type="text" placeholder="Password*" className={styles.inputRegistration} required />
      <button className={styles.sendRegistrationInfo}>Log In</button>
    </form>
  );
}