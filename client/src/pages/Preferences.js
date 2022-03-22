import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DietsTab from "../components/DietsTab";
import IngredientsTab from "../components/IngredientsTab";
import IntolerancesTab from "../components/IntolerancesTab";
import { useUserContext } from "../context/UserContext";

const Preferences = () => {
  const { userIngredients } = useUserContext();
  const [activeTab, setActiveTab] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let t;
    if (showAlert) {
      t = setTimeout(() => setShowAlert(false), 3000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [showAlert]);

  const handleClick = () => {
    if (userIngredients.length) {
      history.push("/recipes");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="my-4">
      <div className="container form-control">
        <ul className="nav nav-tabs nav-justified mb-5">
          <li
            className={`nav-item nav-link pointer ${
              activeTab === 0 && "active"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Ingredients
          </li>
          <li
            className={`nav-item nav-link pointer ${
              activeTab === 1 && "active"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Dietary Preferences
          </li>
          <li
            className={`nav-item nav-link pointer ${
              activeTab === 2 && "active"
            }`}
            onClick={() => setActiveTab(2)}
          >
            Allergies / Intolerances
          </li>
        </ul>

        {activeTab === 0 && <IngredientsTab />}
        {activeTab === 1 && <DietsTab />}
        {activeTab === 2 && <IntolerancesTab />}

        <button
          className="btn btn-primary btn-nav capitalize"
          onClick={handleClick}
        >
          Search Recipes
        </button>

        <div
          className={`alert alert-danger alert-ing text-center ${
            !showAlert && "invisible"
          }`}
          role="alert"
        >
          Add atleast one ingredient to search recipes.
        </div>
      </div>
    </div>
  );
};

export default Preferences;
