import React, {useState, useContext, useEffect} from 'react';
import styles from './Registration.module.css'
import {NavLink, Link, useHistory} from 'react-router-dom'
import CartData from './../../context';


export default function LogIn() {
  const data = useContext(CartData)
  const [loginStateWrong, setLoginStateWrong] = useState(false)
  const [passwordStateWrong, setPasswordStateWrong] = useState(false)
  const {push} = useHistory()

  const submitContent = (event) => {
    event.preventDefault()
    const usersData = JSON.parse(localStorage.getItem('usersData'))
    console.log(usersData);
    if (data.users.length !== 0 && usersData.find(item => (item.email === event.target[0].value))){
      const accountData = usersData.find(item => (item.email === event.target[0].value) && (item.password === event.target[1].value))
      if (accountData) {
        localStorage.setItem('accountData', JSON.stringify(accountData))
        data.setLoginState(true)
        event.target[0].value = event.target[1].value = ''
      } else {
        setLoginStateWrong(false)
        setPasswordStateWrong(true)
      }
    } else {
      setLoginStateWrong(true)
    }
  }
  
  useEffect(() => {
    localStorage.setItem('loginState', JSON.stringify(data.loginState))
    if (data.loginState) push('/')
  }, [submitContent])
  
  return (
    <form className={styles.registrationBlock} onSubmit={(event) => submitContent(event)}>
      <h2 className={styles.title}>LOG IN</h2>
      <p>Not a member yet? <NavLink to='/sign-up' className={styles.registrationRoute}> CREATE ACCOUNT</NavLink></p>
      <input type="text" placeholder="Email address*" className={styles.inputRegistration} required />
      {loginStateWrong ?
        <p className={styles.wrongText}>You entered a wrong email</p> :
        <p></p>
      }
      <input type="password" placeholder="Password*" className={styles.inputRegistration} required />
      {passwordStateWrong ?
        <p className={styles.wrongText}>You entered a wrong password</p> :
        <p></p>
      }
      <button type="submit" className={styles.sendRegistrationInfo}>Log In</button>
    </form>
  );
}
	
