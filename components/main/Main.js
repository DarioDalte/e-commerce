import React from "react";
import Image from "next/image";
import styles from "./main.module.css";
import Card from "../../UI/card/Card";
import Link from "next/link";

function Main() {
  return (
    <main className={styles["main-container"]}>
      <div className={styles["background"]}>
        <Link href="/home">
          <a className={styles["btn"]}>Inizia a comprare</a>
        </Link>
      </div>
      <h1 className={styles["title"]}>Best Sellers</h1>
      <div className={styles["img-container"]}>
        <Card url="category_1.webp" alt="Zaino" classes={styles.card} />
        <Card url="category_2.webp" alt="Vestito" classes={styles.card} />
        <Card url="category_3.webp" alt="Scarpa" classes={styles.card} />
        <Card url="category_4.webp" alt="Cappello" classes={styles.card} />
      </div>
    </main>
  );
}

export default Main;
