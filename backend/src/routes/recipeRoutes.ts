import express from 'express';
import { getRecipes } from '../controllers/recipeControllers';

const router = express.Router();

router.get('/recipes', getRecipes);

export default router;