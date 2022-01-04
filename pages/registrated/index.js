import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

function Index() {
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();
  
    useEffect(() => { 
      if(localStorage.getItem("token")){
        const token = "Bearer " + localStorage.getItem("token");
        axios.get('https://php-e-commerce-api.herokuapp.com/api/user/user-info.php', {
        headers: {
          'Authorization': token
        }
      } ).then(res =>{
        console.log(res.data);
        if(res.data.success){
          setUser(res.data.user.name);
          setIsLogged(true);
        }else{
          router.push({pathname: "../validation"})
        }
      }).catch(err=> console.log(err));
      }else{
        router.push({pathname: "../validation"})
      }
   }, [router]);
    
    return (
        <div>
            {!isLogged ? <h1>Loading...</h1> : <h1>Benvenuto {user}</h1> }
        </div>
    )
}

export default Index;


