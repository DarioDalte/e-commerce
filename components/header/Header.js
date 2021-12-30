import React from "react";
import styles from "./header.module.css";
import Link from 'next/link'

function Header(props) {
  const sticky = props.class[0];
  const inView = props.class[1];
  return (
    <header
      className={`${styles.header} ${styles[`${sticky}`]} ${
        styles[`${inView}`]
      }`}
    >
      <div className={styles["header__logo-container"]}>
        <h1>Logo</h1>
      </div>
      <div className={styles["header__list-container"]}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <a href="#">Home</a>
          </li>
          <li className={styles.item}>
            <a href="#">Home</a>
          </li>
          <li className={styles.item}>
            <a href="#">Home</a>
          </li>
        </ul>
      </div>
      <div className={styles["header__btn-container"]}>
        <Link href="./Validation/Validation">
          <a href="./Validation/Validation">Log-in</a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
