import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";


function Home() {

  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  

  


  useEffect(() => {
   
    
    if(localStorage.getItem("token")){
      const token = "Bearer " + localStorage.getItem("token");
      axios.get('http://localhost:80/php-api/api/user/user-info.php', {
      headers: {
        'Authorization': token
      }
    } ).then(res =>{
      console.log(res.data);
      if(res.data.success){
        setUser(res.data.user.name);
        setIsLogged(true);
      }else{
        router.push({pathname: "../Validation/Validation"})
      }
    }).catch(err=> console.log(err));
    }else{
      router.push({pathname: "../Validation/Validation"})
    }
    
    

 }, [router]);

  
  return (
    <div>
      {!isLogged ? <h1>Loading...</h1> : <h1>Welcome cazzo {user}</h1> }
      
    </div>
  );
}

export default Home;
