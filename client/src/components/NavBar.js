import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  const { setUser } = useAuthContext();
  const {
    setUserIgnorePantry,
    setUserIngredients,
    setUserDiets,
    setUserIntolerances,
  } = useUserContext();

  const handleLogout = () => {
    axios
      .get("/user/auth/signout")
      .then(() => {
        setUserIgnorePantry(true);
        setUserIngredients([]);
        setUserDiets([]);
        setUserIntolerances([]);
        setUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand mx-2" to="/">
          Recipes In My Fridge!
        </Link>

        <Link
          to="/"
          className="btn btn-outline-light mx-2"
          onClick={handleLogout}
        >
          logout
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
