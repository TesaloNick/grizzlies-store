import React from 'react';
import styles from './Account.module.css'

export default function Account() {
  const accountData = JSON.parse(localStorage.getItem('accountData'))
  return (
    <div className={styles.account}>
      <h1>Welcome {accountData.firstName} {accountData.lastName}!</h1>
    </div>
  );
}