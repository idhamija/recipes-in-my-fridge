import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import CheckboxItem from "./CheckboxItem";

const IntolerancesTab = () => {
  const [intolerances, setIntolerances] = useState([]);
  const { userIntolerances, setUserIntolerances } = useUserContext();

  useEffect(() => {
    axios
      .get("/general/intolerances")
      .then(function (response) {
        setIntolerances(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const isChecked = (intolerance) => {
    if (userIntolerances.some(({ _id }) => _id === intolerance._id))
      return true;
    return false;
  };

  const handleChange = (e, intolerance) => {
    if (!e.target.checked) {
      axios
        .delete("/user/preferences/intolerance/" + intolerance._id)
        .then(() => {
          const idx = userIntolerances.findIndex(
            (item) => item._id === intolerance._id
          );

          setUserIntolerances((prev) => {
            return [...prev.filter((_, index) => index !== idx)];
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("/user/preferences/intolerance/" + intolerance._id)
        .then(() => {
          setUserIntolerances((prev) => [...prev, intolerance]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="ms-5 mb-4">
      <h6 className="mx-5">
        <sup>* </sup>choose as many as you wish
      </h6>
      <ul className="no-bullets my-2">
        {intolerances.map((intolerance) => (
          <CheckboxItem
            key={intolerance._id}
            item={intolerance}
            isChecked={isChecked}
            handleChange={handleChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default IntolerancesTab;
