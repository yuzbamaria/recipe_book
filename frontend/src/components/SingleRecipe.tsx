'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
  strArea: string;
  strCategory: string;
  [key: `strIngredient${number}`]: string;
}

export default function SingleRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedRecipes, setRelatedRecipes] = useState<RecipeDetails[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        return res.data;
      })
      .then((data) => {
        if (data?.strCategory) {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_BASE}/recipes?category=${data.strCategory}`,
            )
            .then((res) => setRelatedRecipes(res.data))
            .catch((err) =>
              console.error('Error fetching related recipes:', err),
            );
        }
      })
      .catch((error) => console.error('Error fetching recipe:', error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="w-full text-center pt-10">Loading recipe details...</p>
    );
  if (!recipe)
    return <p className="w-full text-center pt-10">No recipe found.</p>;

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([_, value]) => value);

  return (
    <main className="flex p-10">
      {/* Left Content */}

      <div className="flex flex-col p-5">
        <div className="flex gap-10 pb-6">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-100 h-100 object-cover rounded shadow"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center mb-2">
              {recipe.strMeal}
            </h1>
            <Link
              href={`/recipes?country=${recipe.strArea}`}
              className="text-black hover:underline text-lg"
            >
              {recipe.strArea}
            </Link>
          </div>
        </div>

        <div className="pb-6">
          <h2 className="text-2xl font-semibold pb-2">Instructions</h2>
          <div className="whitespace-pre-line text-gray-700">
            {recipe.strInstructions.replace(/STEP/g, '\nSTEP')}
          </div>
        </div>

        <div className="pb-6">
          <h2 className="text-2xl font-semibold pb-2">Ingredients</h2>
          <ul className="list-disc text-orange-600 list-inside">
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <Link
                  href={`/recipes?ingredient=${encodeURIComponent(ingredient)}`}
                  className="text-orange-600 hover:underline"
                >
                  {ingredient}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-[200px] px-4 py-2 bg-orange-400 text-white font-bold rounded hover:bg-orange-700"
          >
            Watch on YouTube
          </a>
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="flex flex-col p-5 w-[40%]">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold pb-4">
            More from {recipe.strCategory} category
          </h2>
          <ul className="flex flex-col gap-3">
            {relatedRecipes.map((item) => (
              <li key={item.idMeal}>
                <Link
                  href={`/recipes?category=${recipe.strCategory}`}
                  className="text-black hover:underline"
                >
                  {item.strMeal}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
