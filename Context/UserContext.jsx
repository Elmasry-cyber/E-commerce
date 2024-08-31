import { createContext, useEffect, useState } from "react";
import values from "./../node_modules/lodash-es/values";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <userContext.Provider value={{ userLogin, setUserLogin }}>
        {props.children}
      </userContext.Provider>
    </>
  );
}
