import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./context/AuthContext";
import { useUserContext } from "./context/UserContext";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Recipes from "./pages/Recipes";
// import Recipe from "./pages/Recipe";

const App = () => {
  const { user } = useAuthContext();
  const { userIngredients } = useUserContext();

  return (
    <Router>
      {!user ? (
        <Route path="/" component={Home} />
      ) : (
        <>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Preferences} />
            <Route exact path="/recipes">
              {userIngredients.length === 0 ? <Redirect to="/" /> : <Recipes />}
            </Route>
            {/* <Route path="/recipe/:_id" component={Recipe} /> */}

            <Route component={Error404} />
          </Switch>
        </>
      )}
    </Router>
  );
};

export default App;
