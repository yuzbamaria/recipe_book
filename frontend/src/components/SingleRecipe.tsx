'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
}

export default function SingleRecipe() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((error) => console.error('Error fetching recipe:', error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-auto rounded mb-6"
      />
      <p className="whitespace-pre-wrap mb-6">{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-700"
        >
          Watch on YouTube
        </a>
      )}
    </main>
  );
}