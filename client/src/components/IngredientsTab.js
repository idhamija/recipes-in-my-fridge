import axios from "axios";
import { useUserContext } from "../context/UserContext";
import IngredientsForm from "./IngredientsForm";

const IngredientsTab = () => {
  const { userIngredients, setUserIngredients } = useUserContext();

  const handleClick = (_id) => {
    axios
      .delete("/user/ingredient/" + _id)
      .then(() => {
        setUserIngredients((prev) => {
          const ingredients = prev.filter(
            (ingredient) => ingredient._id !== _id
          );
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
    <div className="container my-4">
      <IngredientsForm />

      <hr className="my-4" />

      <div className="container row ms-2">
        {userIngredients.map(({ _id, name }) => (
          <div key={_id} className="col-sm-6 col-md-4 col-xl-3">
            <ul className="list-group list-group-horizontal my-2">
              <li className="list-group-item capitalize">{name}</li>
              <li
                className="list-group-item side-btn"
                onClick={() => handleClick(_id)}
              >
                X
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsTab;
