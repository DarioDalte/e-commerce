import Header from "../components/header/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import logo_white from "../public/logo_white.png";
import logo_black from "../public/logo_black.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../UI/loading/Loading";

export default function Home() {
  const [classList, setclassList] = useState([]);
  const [logo, setLogo] = useState(logo_white);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);

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
              setIsLoading(false);
            } else {
              dispatch({ type: "NOT_LOGGED" });
              setIsLoading(false);
            }
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
      <Loading open={isLoading} />
      <Header
        logo={logo}
        class={classList}
        user={userName}
        logout={logoutHandler}
        isLogged={isLogged}
      />
      <Main />
      <Footer />
    </>
  );
}
