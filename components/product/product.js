import React, { useState } from "react";
import styles from "./product.module.css";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Product() {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className={styles.header}>
        <h2
          className={
            onHover ? `${styles["hovered"]} ${styles.title}` : styles.title
          }
        >
          cappello
        </h2>
        <div
          className={
            onHover ? `${styles["hovered"]} ${styles.title}` : styles.title
          }
        >
          <FavoriteBorderIcon className={styles.favorite}/>
        </div>
      </div>
      <Image
        className={styles.img}
        src="/cappello.png"
        alt="Picture of the author"
        height={350}
        width={350}
        layout="fill"
      />
    </div>
  );
}

export default Product;
