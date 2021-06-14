import React from 'react';
import styles from './Registration.module.css'
import {NavLink} from 'react-router-dom'


export default function LogIn() {
  
  return (
    <div className={styles.registrationBlock}>
      <h2 className={styles.title}>REGISTER</h2>
      <p>Already a member? <NavLink to='/log-in' className={styles.registrationRoute}>LOG IN</NavLink> </p>
      <input type="text" placeholder="Email address*" className={styles.inputRegistration} required />
      <input type="text" placeholder="First Name*" className={styles.inputRegistration} required />
      <input type="text" placeholder="Last Name*" className={styles.inputRegistration} required />
      <input type="text" placeholder="Password*" className={styles.inputRegistration} required />
      <input type="text" placeholder="Confirm Password*" className={styles.inputRegistration} required />
      <button className={styles.sendRegistrationInfo}>Create An Account</button>

    </div>
  );
}