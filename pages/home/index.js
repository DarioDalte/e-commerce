import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../UI/loading/Loading";
import Header from "../../components/header/Header";
import logo_black from "../../public/logo_black.png";
import styles from "./home.module.css";
import Head from "next/head";

function Index() {
  // const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [logo, setLogo] = useState(logo_black);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = "Bearer " + localStorage.getItem("token");
      axios
        .get("https://php-e-commerce-api.herokuapp.com/api/user/user-info.php", {
          headers: {
            Authorization: token,
          },
        })
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
        <>
          <Header
            logo={logo}
            user={user}
            className={styles["header"]}
            logout={logoutHandler}
          />
          
        </>
      )}
    </>
  );
}

export default Index;
