import React from 'react';
import Link from 'next/link';
import styles from './code.module.css'; // Import the CSS module

const Header = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLogo}>Investment AI</div>
      <div className={styles.navbarLinks}>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <Link href="/signUp">
        <button className={styles.signUpButton}>Sign Up</button>
        </Link>
        <Link href="/logIn">
          <button className={styles.loginButton}>Login</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;