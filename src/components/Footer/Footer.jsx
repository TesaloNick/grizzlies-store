import React from 'react';
import styles from './Footer.module.css'
import twitter from './../../assets/img/Footer/twitter.svg'
import facebook from './../../assets/img/Footer/facebook.svg'
import instagram from './../../assets/img/Footer/instagram.svg'
import youtube from './../../assets/img/Footer/youtube.svg'


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
    {name: 'twitter', link:'https://twitter.com/NBAUK', img: twitter},
    {name: 'facebook', link:'https://www.facebook.com/nbauk', img: facebook},
    {name: 'instagram', link:'https://www.instagram.com/nbaeurope', img: instagram},
    {name: 'youtube', link:'https://www.youtube.com/c/nbaeurope', img: youtube}
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
        <div className={styles.socialLinksBlock}>
          {social.map(item => (
            <a href={item.link}>
              <img src={item.img} alt={item.name} className={styles.socialImg} />
            </a>
          ))}
        </div>
      </div>
      

    </footer>
  );
}