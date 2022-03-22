import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const IngredientsForm = () => {
  const { userIgnorePantry, setUserIngredients, setUserIgnorePantry } =
    useUserContext();

  const [disableSwitch, setDisableSwitch] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchItem) {
        axios
          .get(`/spoon/search/ingredients?query=${searchItem}`)
          .then(function (response) {
            setSearchSuggestions(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchItem]);

  const changeSearchItem = (e) => {
    setSearchSuggestions([]);
    setSearchItem(e.target.value);
  };

  const handleChange = (e) => {
    setDisableSwitch(true);

    axios
      .post("/user/preferences/ignorePantry?ignore=" + e.target.checked)
      .then(() => {
        setUserIgnorePantry(!e.target.checked);
      })
      .catch(function (error) {
        console.log(error);
      });

    setDisableSwitch(false);
  };

  const addIngredient = (ingredient) => {
    setSearchSuggestions([]);
    setSearchItem("");

    axios
      .post("/user/ingredient", ingredient)
      .then((response) => {
        setUserIngredients((prev) => {
          const ingredients = [...prev, response.data.data];
          ingredients.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          return ingredients;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="mb-4">
      <div className="container">
        <input
          className="form-control"
          type="search"
          value={searchItem}
          onChange={changeSearchItem}
          placeholder="search for ingredients you have!"
        />

        <ul className="list-group search-suggestions pointer">
          {searchSuggestions &&
            searchSuggestions.map((ingredient, index) => (
              <li
                key={index}
                className="list-group-item capitalize primary-hover"
                onClick={() => addIngredient(ingredient)}
              >
                {ingredient.name}
                <span className="align-right">{ingredient.aisle}</span>
              </li>
            ))}
        </ul>
      </div>

      <span className="pointer">
        <input
          className="form-check-input pointer mx-3 mt-2"
          type="checkbox"
          id="ignore-pantry-checkbox"
          checked={userIgnorePantry ? true : false}
          onChange={handleChange}
          disabled={disableSwitch}
        />
        <label
          className="form-check-label pointer mt-1"
          htmlFor="ignore-pantry-checkbox"
        >
          Ignore typical pantry items (such as water, salt, oil, etc.)
        </label>
      </span>
    </form>
  );
};

export default IngredientsForm;
