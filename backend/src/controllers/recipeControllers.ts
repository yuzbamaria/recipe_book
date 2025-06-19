import { Request, Response } from 'express';
import axios from 'axios';

const BASE_URL =
  process.env.MEAL_API_BASE || 'https://www.themealdb.com/api/json/v1/1';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const apiUrl = `${BASE_URL}/search.php?s=`;
    const response = await axios.get(apiUrl);

    res.json(response.data.meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};
