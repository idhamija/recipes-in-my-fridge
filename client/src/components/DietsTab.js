import axios from "axios";
import { useEffect, useState } from "react";
import diet_infographic from "../assets/diet_infographic.png";
import { useUserContext } from "../context/UserContext";
import CheckboxItem from "./CheckboxItem";

const DietsTab = () => {
  const [diets, setDiets] = useState([]);
  const { userDiets, setUserDiets } = useUserContext();

  useEffect(() => {
    axios
      .get("/general/diets")
      .then(function (response) {
        setDiets(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const isChecked = (diet) => {
    if (userDiets[0] && userDiets[0]._id === diet._id) return true;
    return false;
  };

  const handleChange = (e, diet) => {
    if (!e.target.checked) {
      axios
        .delete("/user/preferences/diet/" + diet._id)
        .then(() => {
          setUserDiets([]);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (userDiets.length === 1) {
      axios
        .delete("/user/preferences/diet/" + userDiets[0]._id)
        .then(() => {
          axios
            .post("/user/preferences/diet/" + diet._id)
            .then(() => {
              setUserDiets([diet]);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("/user/preferences/diet/" + diet._id)
        .then(() => {
          setUserDiets([diet]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="ms-5">
      <h6 className="mx-5">
        <sup>* </sup>choose at max one
      </h6>
      <ul className="no-bullets mt-2">
        {diets.map((diet) => (
          <CheckboxItem
            key={diet._id}
            item={diet}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        ))}
      </ul>

      <figure className="mx-5 mt-5 mb-4">
        <img src={diet_infographic} alt="diet comparison chart" width="55%" />
        <figcaption className="mx-5">diet chart</figcaption>
      </figure>
    </div>
  );
};

export default DietsTab;
