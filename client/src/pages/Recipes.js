import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useUserContext } from "../context/UserContext";

const Recipes = () => {
  const { userIngredients, userDiets, userIntolerances, userIgnorePantry } =
    useUserContext();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataToStr = (data) => {
      return data.reduce(
        (prev, curr, index) =>
          prev + curr.name + (index !== data.length - 1 ? "," : ""),
        ""
      );
    };

    const intolerances = dataToStr(userIntolerances);
    const diet = dataToStr(userDiets);
    const ingredients = dataToStr(userIngredients);

    if (ingredients) {
      axios
        .get("/spoon/search/recipes", {
          params: {
            ingredients,
            intolerances,
            diet,
            ignorePantry: userIgnorePantry,
          },
        })
        .then((response) => {
          setRecipes(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("recipes use effect error");
    }
  }, [userIngredients, userDiets, userIntolerances, userIgnorePantry]);

  if (isLoading) {
    return (
      <div className="spinner-border spinner-rec text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {recipes.length === 0 ? (
          <>
            <h2 className="text-center mt-5 mb-4">
              No recipes found for the chosen ingredients, intolerances and diet
              provided. Try again with different ingredients, intolerances
              and/or diet.
            </h2>
            <Link to="/">
              <button className="btn btn-primary btn-home">
                Change Preferences
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-center mt-5 mb-4">
              Recipes based on ingredients, intolerances and diet provided.
            </h1>
            <div className="row mt-3">
              {recipes.map((recipe) => (
                <div className="col-md-6 col-lg-4 col-xxl-3" key={recipe.recId}>
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Link to="/">
        <button className="btn btn-primary btn-nav capitalize">
          Change Preferences
        </button>
      </Link>
    </>
  );
};

export default Recipes;
