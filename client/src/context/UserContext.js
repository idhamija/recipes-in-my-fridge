import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [userIngredients, setUserIngredients] = useState([]);
  const [userDiets, setUserDiets] = useState([]);
  const [userIntolerances, setUserIntolerances] = useState([]);
  const [userIgnorePantry, setUserIgnorePantry] = useState();

  useEffect(() => {
    const fetchUserData = (param, callback) => {
      axios
        .get("/user/" + param)
        .then(function (response) {
          callback(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    if (user) {
      fetchUserData("ingredients", setUserIngredients);
      fetchUserData("preferences/diets", setUserDiets);
      fetchUserData("preferences/intolerances", setUserIntolerances);
      fetchUserData("preferences/ignorePantry", setUserIgnorePantry);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userIgnorePantry,
        userIngredients,
        userDiets,
        userIntolerances,
        setUserIgnorePantry,
        setUserIngredients,
        setUserDiets,
        setUserIntolerances,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
