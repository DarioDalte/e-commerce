import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../UI/loading/Loading";
import Header from "../../components/header/Header";
import logo_white from "../../public/logo_white.png";
import styles from "./home.module.css";
import Head from "next/head";
import Product from "../../components/product/product";

function Index() {
  // const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [logo, setLogo] = useState(logo_white);

  useEffect(() => {
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
          console.log(res.data);
          if (res.data.success) {
            setUser(res.data.user.name);
            setIsLogged(true);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(false);
    }
  }, []);

  const logoutHandler = () => {
    setUser("");
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
            user={user}
            className={styles["header"]}
            logout={logoutHandler}
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
