import Header from "../components/header/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import logo_white from "../public/logo_white.png";
import logo_black from "../public/logo_black.png";
import axios from "axios";


export default function Home() {
  const [classList, setclassList] = useState([]);
  const [logo, setLogo] = useState(logo_white);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 100 && window.scrollY <= 150) {
        if (!classList.includes("sticky")) {
          setclassList(["sticky"]);
        }
      } else if (window.scrollY > 150) {
        if (!classList.includes("inView")) {
          setclassList(["sticky", "inView"]);
          setLogo(logo_black);
        }
      } else {
        if (classList.length != 0) {
          setclassList([]);
          setLogo(logo_white);
        }
      }
    };
  }, [classList]);


  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = "Bearer " + localStorage.getItem("token");
      axios
        .get("https://php-e-commerce-api.herokuapp.com/user/user-info.php", {
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

  const logoutHandler = () =>{
    setUser("");
  }


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header logo={logo} class={classList} user={user} logout={logoutHandler} />
      <Main/>
      <Footer/>
   
    </>
  );
}
