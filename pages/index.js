import Header from "../components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [classList, setclassList] = useState([]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 200 && window.scrollY <= 250) {
        if (!classList.includes("sticky")) {
          setclassList(["sticky"]);
        }
      } else if (window.scrollY > 250) {
        if (!classList.includes("inView")) {
          setclassList(["sticky", "inView"]);
        }
      }else{
        if (classList.length != 0) {
          setclassList([]);
        }
      }
    };
  }, [classList]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header class={classList} />
     
    </>
  );
}
