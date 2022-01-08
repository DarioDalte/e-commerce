import React, { useState } from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

function Card(props) {
  const [showButton, setShowButton] = useState(false);
  const howerHandler = () => {
    setShowButton((showButton) => !showButton);
  };

  return (
    <Link href="/home">
      <a
        onMouseEnter={howerHandler}
        onMouseLeave={howerHandler}
        className={`${styles["card"]} ${props.classes}`}
      >
        <Image
          className={styles["img"]}
          alt={props.alt}
          src={`/${props.url}`}
          layout="fill"
          objectFit="cover"
        />
        {showButton && <span className={styles["btn"]}>Inizia a comprare</span>}
      </a>
    </Link>
  );
}

export default Card;
