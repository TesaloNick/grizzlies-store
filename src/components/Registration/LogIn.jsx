import React, { useState, useContext } from 'react';
import styles from './Registration.module.css'
import { Link, useHistory } from 'react-router-dom'
import CartData from './../../context';


export default function LogIn() {
  const data = useContext(CartData)
  const [states, setStates] = useState({
    loginStateWrong: false,
    passwordStateWrong: false,
  })
  const { loginStateWrong, passwordStateWrong } = states
  const { push } = useHistory()

  const submitContent = (event) => {
    event.preventDefault()
    const usersData = JSON.parse(localStorage.getItem('usersData'))

    if (data.users.length !== 0 && usersData.find(item => (item.email === event.target[0].value))) {
      const accountData = usersData.find(item => (item.email === event.target[0].value) && (item.password === event.target[1].value))
      if (accountData) {
        localStorage.setItem('accountData', JSON.stringify(accountData))
        localStorage.setItem('loginState', JSON.stringify(true))
        data.setLoginState(true)
        push('/')
        event.target[0].value = event.target[1].value = ''
      } else {
        setStates({
          loginStateWrong: false,
          passwordStateWrong: true,
        })
      }
    } else {
      setStates({
        ...states,
        loginStateWrong: true,
      })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.form}>
        <form className={styles.registrationBlock} onSubmit={(event) => submitContent(event)}>
          <h2 className={styles.title}>LOG IN</h2>
          <p>Not a member yet? <Link to='/sign-up' className={styles.registrationRoute}> CREATE ACCOUNT</Link></p>
          <input type="text" placeholder="Email address*" className={styles.inputRegistration} required />
          {loginStateWrong && <p className={styles.wrongText}>You entered a wrong email</p>}
          <input type="password" placeholder="Password*" className={styles.inputRegistration} required />
          {passwordStateWrong && <p className={styles.wrongText}>You entered a wrong password</p>}
          <button type="submit" className={styles.sendRegistrationInfo}>Log In</button>
        </form>
      </div>
    </div>
  );
}

