import React from 'react';
import styles from './Footer.module.css'
import twitter from './../../assets/img/Footer/social/twitter.svg'
import facebook from './../../assets/img/Footer/social/facebook.svg'
import instagram from './../../assets/img/Footer/social/instagram.svg'
import youtube from './../../assets/img/Footer/social/youtube.svg'
import maestro from './../../assets/img/Footer/payment/maestro.svg'
import jcb from './../../assets/img/Footer/payment/jcb.svg'
import amex from './../../assets/img/Footer/payment/amex.svg'
import paypal from './../../assets/img/Footer/payment/paypal.svg'
import visa from './../../assets/img/Footer/payment/visa.svg'
import mastercard from './../../assets/img/Footer/payment/mastercard.svg'


export default function Footer() {
  const footerGreyLinks = [
    {
      title: 'Customer Service',
      links: [
        {name: 'Help', link:'https://global.nbastore.com/customer-help-desk'},
        {name: 'Track Order', link:'https://global.nbastore.com/nba-tracking-information/ch-1485'},
        {name: 'Size Chart', link:'https://global.nbastore.com/sizing-guidelines/ch-1365'},
      ]
    },
    {
      title: 'Worry Free Shopping',
      links: [
        {name: 'Safe Shopping', link:'https://global.nbastore.com/your-security/ch-1371'},
        {name: 'Delivery & Shipping', link:'https://global.nbastore.com/delivery-and-shipping/ch-1364'},
        {name: '90-Day Returns', link:'https://global.nbastore.com/nba-return-information/ch-1484'},
      ]
    },
    {
      title: 'Information',
      links: [
        {name: 'My Account', link:'https://global.nbastore.com/nba-your-account/ch-1486'},
        {name: 'About Us', link:'https://global.nbastore.com/nba-about-us/ch-1481'},
      ]
    },
  ]
  const social = [
    {name: 'twitter', link:'https://twitter.com/NBAUK', img: twitter},
    {name: 'facebook', link:'https://www.facebook.com/nbauk', img: facebook},
    {name: 'instagram', link:'https://www.instagram.com/nbaeurope', img: instagram},
    {name: 'youtube', link:'https://www.youtube.com/c/nbaeurope', img: youtube}
  ]
  const footerWhiteLinks = [
    {name: 'Privacy Policy', link:'https://global.nbastore.com/nba-privacy-policy/ch-1487'},
    {name: 'Terms of Use', link:'https://global.nbastore.com/nba-terms-and-conditions/ch-1488'},
    {name: 'CA Supply Chains Act/UK Modern Slavery Act', link:'https://www.fanaticsinc.com/ca-transparency-uk-modern-slavery-act'},
    {name: 'Site Map', link:'https://global.nbastore.com/sitemap/x-1957'},
    {name: 'Cookie Policy', link:'https://global.nbastore.com/cookie-policy/ch-1376'},
  ]
  const payment = [maestro, jcb, amex, paypal, visa, mastercard]

  return (
    <footer>
      <div className={styles.footerGrey}>
        {footerGreyLinks.map(item => (
          <div className={styles.footerLinksBlock}>
            <h3 className={styles.footerTitleLink}>{item.title}</h3>
            <ul className={styles.footerListLinksGrey}>
              {item.links.map(link => (
                <li><a href={link.link} className={styles.footerLink}>{link.name}</a></li>
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
      </div>
      <div className={styles.footerWhite}>
        <ul className={styles.footerListLinksWhite}>
          {footerWhiteLinks.map(item => (
            <li><a href={item.link} className={styles.footerLink}>{item.name}</a></li>
          ))}
        </ul>
        <p>© 2021, Fanatics, Inc. and/or its affiliated entities. All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of Fanatics.</p>
        <div className={styles.paymentBlock} >
          {payment.map(item => (
            <img src={item} className={styles.paymentImg} />
          ))}
        </div>
      </div>
      

    </footer>
  );
}