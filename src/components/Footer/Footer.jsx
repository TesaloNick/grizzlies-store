import React from 'react';
import styles from './Footer.module.css'


export default function Footer() {
  const footerLinks = [
    {
      title: 'Customer Service',
      links: ['Help', 'Track Order', 'Size Chart']
    },
    {
      title: 'Worry Free Shopping',
      links: ['Safe Shopping', 'Delivery & Shipping', '90-Day Returns']
    },
    {
      title: 'Information',
      links: ['My Account', 'About Us']
    },
  ]
  const social = [
    {img:'2', link: '3'},
    {img:'', link: ''},
    {img:'', link: ''},
    {img:'', link: ''}
  ]

  return (
    <footer className={styles.footer}>
      {footerLinks.map(item => (
        <div className={styles.footerLinksBlock}>
          <h3 className={styles.footerTitleLink}>{item.title}</h3>
          <ul className={styles.footerListLinks}>
            {item.links.map(link => (
              <li className={styles.footerLink}> {link} </li>
            ))}
          </ul>
        </div>
      ))}
      <div className={styles.footerLinksBlock}>
        <h3 className={styles.footerTitleLink}>Follow Us</h3>
        {social.map(item => (
          <div>
            <a href={item.link}>
              <img src={item.img} alt="" />
            </a>
          </div>
        ))}
        
      </div>
      

    </footer>
  );
}