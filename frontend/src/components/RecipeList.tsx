'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { countryOptions } from '@/constants/countries';
import { categoriesOptions } from '@/constants/categories';
import { useSearchParams, useRouter } from 'next/navigation';

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
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const ingredientFromURL = searchParams.get('ingredient') || '';
    const countryFromURL = searchParams.get('country') || '';
    const categoryFromURL = searchParams.get('category') || '';

    setIngredientSearchTerm(ingredientFromURL);
    setSearchTerm(ingredientFromURL);
    setSelectedCountry(countryFromURL);
    setCountrySearchTerm(countryFromURL);
    setSelectedCategory(categoryFromURL);
    setCategorySearchTerm(categoryFromURL);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();

    if (searchTerm) params.append('ingredient', searchTerm);
    if (selectedCountry) params.append('country', selectedCountry);
    if (selectedCategory) params.append('category', selectedCategory);

    const queryString = params.toString();
    const url = queryString
      ? `${process.env.NEXT_PUBLIC_API_BASE}/recipes?${queryString}`
      : `${process.env.NEXT_PUBLIC_API_BASE}/recipes`;

    axios
      .get(`${url}`)
      .then((response) => {
        const meals = response.data || [];
        setRecipesList(meals);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      })
      .finally(() => setLoading(false));
  }, [searchTerm, countrySearchTerm, categorySearchTerm]);

  if (loading)
    return <p className="w-full text-center pt-10">Loading recipes...</p>;

  return (
    <main>
      <h1 className="text-4xl font-bold py-10 text-center text-gray-800">
        Recipe list
      </h1>
      <div className="flex px-10 justify-center">
        <div className="flex items-center gap-8">
          {/* Search bar for ingredient */}
          <div className="flex gap-5 justify-center pb-8">
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

          {/* Country Select + Search Button */}
          <div className="flex gap-5 justify-center pb-8">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-[200px] border border-gray-400 rounded px-4 py-2"
            >
              <option value="">Select a country</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCountrySearchTerm(selectedCountry)}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50"
            >
              Search Country
            </button>
          </div>

          {/* Category Select + Search Button */}
          <div className="flex gap-5 justify-center pb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-[200px] border border-gray-400 rounded px-4 py-2"
            >
              <option value="">Select a category</option>
              {categoriesOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCategorySearchTerm(selectedCategory)}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50"
            >
              Search Category
            </button>
          </div>
          <div className="pb-8">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
              onClick={() => {
                setIngredientSearchTerm('');
                setSearchTerm('');
                setSelectedCountry('');
                setCountrySearchTerm('');
                setSelectedCategory('');
                setCategorySearchTerm('');
                router.replace('/recipes');
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center items-center gap-12 px-10">
        {recipesList.length === 0 && (
          <p className="text-gray-600">No recipes found for this ingredient.</p>
        )}
        {recipesList.map((recipe) => (
          <li
            key={recipe.idMeal}
            className="flex flex-col gap-6 items-center py-10 px-10 w-[300px] bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <Link
              href={`/recipes/${recipe.idMeal}`}
              target="_blank"
              className="inline-block px-4 py-2 mt-auto bg-orange-400 text-white font-bold rounded hover:bg-orange-700 transition-colors duration-200 text-center"
            >
              Get details
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
