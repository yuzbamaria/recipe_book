import express from 'express';
import { getRecipes, getRecipeById } from '../controllers/recipeControllers';

const router = express.Router();

router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);

export default router;