import React, {useContext, useState} from 'react';
import styles from './Registration.module.css'
import {NavLink} from 'react-router-dom'
import CartData from './../../context';

export default function SignUp() {
  const data = useContext(CartData)
  const [passwordStateWrong, setPasswordStateWrong] = useState(false)
  const [signingState, setSigningState] = useState(false)
  const [emailStateWrong, setEmailStateWrong] = useState(false)

  const submitContent = (event) => {
    event.preventDefault()
    let usersData = []
    console.log((data.users.length))
    if (event.target[1].value === event.target[2].value) {
        if (data.users.length !== 0 && data.users.find(item => item.email === event.target[0].value)) {
          setEmailStateWrong(true)
          setPasswordStateWrong(false)
        } else{
          usersData = [...data.users, {
            email: event.target[0].value, 
            password: event.target[1].value,
            firstName: event.target[3].value,
            lastName: event.target[4].value,
          }]
          event.target[0].value = event.target[1].value = event.target[2].value = event.target[3].value = event.target[4].value = ''
          localStorage.setItem('usersData', JSON.stringify(usersData))
          data.setUsers(usersData)
          setPasswordStateWrong(false)
          setEmailStateWrong(false)
          setSigningState(true)
        }

    } else {
      setEmailStateWrong(false)
      setPasswordStateWrong(true)
      setSigningState(false)
    }
  }

  return (
    <form className={styles.registrationBlock}  onSubmit={(event) => submitContent(event)}>
      <h2 className={styles.title}>REGISTER</h2>
      <p>Already a member? <NavLink to='/log-in' className={styles.registrationRoute}> LOG IN</NavLink></p>
      <input type="text" placeholder="Email address*" className={styles.inputRegistration} required />
      {emailStateWrong ?
        <p className={styles.wrongText}>Account with the email already exists</p> :
        <p></p>
      }
      <input type="password" placeholder="Password*" className={styles.inputRegistration} required />
      {passwordStateWrong ?
        <p className={styles.wrongText}>You entered a wrong second password</p> :
        <p></p>
      }
      <input type="password" placeholder="Confirm Password*" className={styles.inputRegistration} required />
      <input type="text" placeholder="First Name*" className={styles.inputRegistration} required />
      <input type="text" placeholder="Last Name*" className={styles.inputRegistration} required />
      {signingState ?
        <p className={styles.rightText}>You can log into your account. <NavLink to='/log-in' className={styles.registrationRoute}> LOG IN</NavLink></p> :
        <p></p>
      }
      <button className={styles.sendRegistrationInfo}>Create An Account</button>
    </form>
  );
}