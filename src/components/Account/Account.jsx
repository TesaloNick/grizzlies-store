import React, { useContext } from 'react';
import styles from './Account.module.css'
import CartData from './../../context';
import { Link } from 'react-router-dom'

export default function Account() {
  const data = useContext(CartData)

  const accountData = JSON.parse(localStorage.getItem('accountData'))

  const exitFromAccount = () => {
    data.setLoginState(false)
  }

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.account}>
        <h1>Welcome {accountData.firstName} {accountData.lastName}!</h1>
        <Link to='/' onClick={() => exitFromAccount()}>Exit from account</Link>
      </div>
    </div>
  );
}