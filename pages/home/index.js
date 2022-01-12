import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../UI/loading/Loading";
import Header from "../../components/header/Header";
import logo_white from "../../public/logo_white.png";
import styles from "./home.module.css";
import Head from "next/head";
import Product from "../../components/product/product";
import { useSelector, useDispatch } from "react-redux";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [logo, setLogo] = useState(logo_white);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);

  useEffect(() => {
    if (isLogged === null) {
      if (localStorage.getItem("token")) {
        const token = "Bearer " + localStorage.getItem("token");
        axios
          .get(
            "https://php-e-commerce-api.herokuapp.com/api/user/user-info.php",
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              dispatch({
                type: "LOGGED",
                email: res.data.user.email,
                name: res.data.user.name,
              });
            } else {
              dispatch({ type: "NOT_LOGGED" });
            }
            setIsLoading(false);
          })
          .catch((err) => {
            dispatch({ type: "NOT_LOGGED" });
            setIsLoading(false);
          });
      } else {
        dispatch({ type: "NOT_LOGGED" });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const logoutHandler = () => {
    dispatch({ type: "NOT_LOGGED" });
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {isLoading ? (
        <Loading open={true} />
      ) : (
        <div className={styles["layout"]}>
          <Header
            logo={logo}
            user={userName}
            className={styles["header"]}
            logout={logoutHandler}
            isLogged={isLogged}
          />
          <main className={styles["main"]}>
            <div className={styles["category"]}>
              <h2>Tutte le categorie</h2>
              <ul>
                <li>Nike</li>
                <li>Nike</li>
                <li>Nike</li>
              </ul>
            </div>
            <div className={styles["products-container"]}>
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Index;
