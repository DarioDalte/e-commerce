import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

function Header(props) {
  let sticky = "";
  let inView = "";
  if (props.class) {
    sticky = props.class[0];
    inView = props.class[1];
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandle = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    props.logout();
  };

  let profile = "";
  if (props.isLogged === true) {
    profile = (
      <>
        <span onClick={handleClick} className={styles["dashboard"]}>
          Ciao {props.user}
        </span>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logoutHandle}>Logout</MenuItem>
        </Menu>
      </>
    );
  } else if (props.isLogged === false) {
    profile = (
      <Link href="./login">
        <a href="./login">Log-in</a>
      </Link>
    );
  }

  return (
    <header
      className={`${styles.header} ${styles[`${sticky}`]} ${
        styles[`${inView}`]
      } ${props.className}`}
    >
      <div className={styles["header__logo-container"]}>
        <Link href="/">
          <a>
            <Image src={props.logo} alt="Logo" width={50} height={39} />
          </a>
        </Link>
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
        {profile}
      </div>
    </header>
  );
}

export default Header;
