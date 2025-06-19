import { RequestHandler } from 'express';
import axios from 'axios';

const BASE_URL =
  process.env.MEAL_API_BASE || 'https://www.themealdb.com/api/json/v1/1';

export const getRecipes: RequestHandler = async (req, res) => {
  try {
    const { ingredient, country, category } = req.query;
    
    let apiUrl = '';

    if (ingredient) {
      apiUrl = `${BASE_URL}/filter.php?i=${ingredient}`;
    } else if (country) {
      apiUrl = `${BASE_URL}/filter.php?a=${country}`;
    } else if (category) {
      apiUrl = `${BASE_URL}/filter.php?c=${category}`;
    } else {
      apiUrl = `${BASE_URL}/search.php?s=`;
    }
 
    const response = await axios.get(apiUrl);

    res.json(response.data.meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }

};

export const getRecipeById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    console.log(response)
    const recipe = response.data.meals?.[0];

    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return; 
    }

    res.json(recipe);
    return; 

  } catch(error) {
    console.error('Failed to fetch recipe details:', error);
    res.status(500).json({ message: 'Server error fetching recipe info' });
    return; 
  }

};
