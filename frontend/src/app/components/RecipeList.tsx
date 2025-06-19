"use client"

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

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_BASE}/recipes`)
            .then((response) => {
                setRecipesList(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading recipes...</p>;

    return (
        <main>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Recipe list</h1>
            <ul className="flex flex-col items-center gap-12">
                {recipesList.map((recipe) => (
                    <li 
                        key={recipe.idMeal}
                        className="flex flex-col gap-6 items-center py-10 px-10 w-[300px] md:w-[500px] bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
                        <img 
                            src={recipe.strMealThumb} 
                            alt={recipe.strMeal}
                            className="w-full h-48 object-cover" />
                        <p className="text-gray-700 text-base mb-4">{recipe.strInstructions}</p>
                        <Link 
                            href={recipe.strYoutube}
                            target="_blank"
                            className="inline-block px-4 py-2 mt-auto bg-orange-400 text-white font-bold rounded hover:bg-orange-700 transition-colors duration-200 text-center"
                            >
                            Youtube link
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
};