'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
}

export default function RecipeList() {
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = searchTerm ? `?ingredient=${encodeURIComponent(searchTerm)}` : '';

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/recipes${params}`)
      .then((response) => {
        const meals = response.data || [];
        setRecipesList(meals);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <main>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Recipe list
      </h1>
      {/* Search bar for ingredient */}
      <div className="flex gap-5 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by ingredient..."
          value={ingredientSearchTerm}
          onChange={(e) => setIngredientSearchTerm(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={() => setSearchTerm(ingredientSearchTerm)}
          className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors duration-200"
        >
          Search
        </button>
      </div>

      <ul className="flex flex-col items-center gap-12">
        {recipesList.length === 0 && (
          <p className="text-gray-600">No recipes found for this ingredient.</p>
        )}
        {recipesList.map((recipe) => (
          <li
            key={recipe.idMeal}
            className="flex flex-col gap-6 items-center py-10 px-10 w-[300px] md:w-[500px] bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <p className="text-gray-700 text-base mb-4">
              {recipe.strInstructions}
            </p>
            {recipe.strYoutube ? (
            <Link
                href={recipe.strYoutube}
                target="_blank"
                className="inline-block px-4 py-2 mt-auto bg-orange-400 text-white font-bold rounded hover:bg-orange-700 transition-colors duration-200 text-center"
            >
                Youtube link
            </Link>
            ) : (
            <p className="text-gray-500 italic mt-auto">No video available</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
