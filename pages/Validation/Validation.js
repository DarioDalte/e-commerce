import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./validation.module.css";
import Login from '../../components/login/Login';
import Registration from '../../components/registration/Registration';
import axios from "axios";

function Validation() {
  const [isLogging, setIsLogging] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = "Bearer " + localStorage.getItem("token");
      axios
        .get("http://localhost:80/php-api/api/user/user-info.php", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            router.push({ pathname: "../Home/Home" });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

  const changeType = () =>{
    setIsLogging((isLogging) => !isLogging);
    
  }

  return (
    <>
      <Head>
        {isLogging ? <title>Login</title> : <title>Registration</title>}
      </Head>

      <div className={styles["container"]}>
        {isLogging ? <Login onClick={changeType}/> : <Registration onClick={changeType}/>}
      </div>
    </>
  );
}

export default Validation;
