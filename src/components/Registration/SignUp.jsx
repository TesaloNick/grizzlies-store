import React, { useContext, useState } from 'react';
import styles from './Registration.module.css'
import { Link } from 'react-router-dom'
import CartData from './../../context';

export default function SignUp() {
  const data = useContext(CartData)
  const [states, setStates] = useState({
    passwordStateWrong: false,
    signingState: false,
    emailStateWrong: false,
  })
  const { passwordStateWrong, signingState, emailStateWrong } = states

  const submitContent = (event) => {
    event.preventDefault()

    if (event.target[1].value === event.target[2].value) {
      if (data.users.length !== 0 && data.users.find(item => item.email === event.target[0].value)) {
        setStates({
          ...states,
          passwordStateWrong: false,
          emailStateWrong: true,
        })
      } else {
        const usersData = [...data.users, {
          email: event.target[0].value,
          password: event.target[1].value,
          firstName: event.target[3].value,
          lastName: event.target[4].value,
        }]
        event.target[0].value = event.target[1].value = event.target[2].value = event.target[3].value = event.target[4].value = ''
        localStorage.setItem('usersData', JSON.stringify(usersData))
        data.setUsers(usersData)
        setStates({
          signingState: true,
          passwordStateWrong: false,
          emailStateWrong: false,
        })
      }
    } else {
      setStates({
        signingState: false,
        passwordStateWrong: true,
        emailStateWrong: false,
      })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.form}>
        <form className={styles.registrationBlock} onSubmit={(event) => submitContent(event)}>
          <h2 className={styles.title}>REGISTER</h2>
          <p>Already a member? <Link to='/log-in' className={styles.registrationRoute}> LOG IN</Link></p>
          <input type="email" placeholder="Email address*" className={styles.inputRegistration} required />
          {emailStateWrong && <p className={styles.wrongText}>Account with the email already exists</p>}
          <input type="password" placeholder="Password*" className={styles.inputRegistration} required />
          {passwordStateWrong && <p className={styles.wrongText}>You entered a wrong second password</p>}
          <input type="password" placeholder="Confirm Password*" className={styles.inputRegistration} required />
          <input type="text" placeholder="First Name*" className={styles.inputRegistration} required />
          <input type="text" placeholder="Last Name*" className={styles.inputRegistration} required />
          {signingState && <p className={styles.rightText}>You can log in to your account. <Link to='/log-in' className={styles.registrationRoute}> LOG IN</Link></p>}
          <button className={styles.sendRegistrationInfo}>Create An Account</button>
        </form>
      </div>
    </div>
  );
}