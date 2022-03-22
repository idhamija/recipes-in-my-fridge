const express = require("express");
const axios = require("axios");

const router = express.Router();

const apiUrl = "https://api.spoonacular.com";

router.get("/search/ingredients", (req, res) => {
  axios
    .get(apiUrl + "/food/ingredients/autocomplete", {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query: req.query.query,
        number: 10,
        metaInformation: true,
      },
    })
    .then(function (response) {
      const { data } = response;
      const ingredients = data.map(({ id, name, aisle }) => {
        return { ingId: id, name, aisle };
      });
      res.status(200).json({ success: true, data: ingredients });
    })
    .catch(function (error) {
      res.status(400).json({ success: false, error });
    });
});

router.get("/search/recipes", (req, res) => {
  const { ingredients, intolerances, diet, ignorePantry } = req.query;

  let url =
    apiUrl +
    "/recipes/complexSearch" +
    "?apiKey=" +
    process.env.SPOONACULAR_API_KEY +
    "&number=12" +
    "&includeIngredients=" +
    ingredients +
    "&ignorePantry=" +
    (ignorePantry ? "true" : "false") +
    "&addRecipeInformation=true&sort=min-missing-ingredients&sortDirection=asc&minCalories=1&limitLicense=true" +
    (diet ? "&diet=" + diet : "") +
    (intolerances ? "&intolerances=" + intolerances : "");

  axios
    .get(url)
    .then(function (response) {
      const { results } = response.data;
      const recipes = results.map(
        ({
          id,
          title,
          image,
          nutrition,
          readyInMinutes,
          summary,
          missedIngredientCount,
          sourceUrl,
        }) => {
          return {
            recId: id,
            title,
            image,
            calories: Math.ceil(nutrition.nutrients[0].amount),
            time: readyInMinutes,
            summary: summary.substr(0, 147) + "...",
            missingCount: missedIngredientCount,
            sourceUrl,
          };
        }
      );
      res.status(200).json({ success: true, data: recipes });
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json({ success: false, error });
    });
});

module.exports = router;
