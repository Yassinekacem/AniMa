// components/Filter.tsx
"use client";

import React, { useState } from "react";
import { FilterType, AggregationsType} from "../types/types";

interface FilterProps {
  filters: FilterType;
  aggregations: AggregationsType;
  onFilterChange: (filters: FilterType) => void;
  onSearchChange: (search: string) => void;
  searchSuggestions: string[];
  isSearching: boolean;
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  aggregations,
  onFilterChange,
  onSearchChange,
  searchSuggestions,
  isSearching
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleEspeceClick = (espece: string) => {
    onFilterChange({
      ...filters,
      espece: filters.espece === espece ? "" : espece,
      race: ""
    });
  };

  const handleChange = (field: keyof FilterType, value: string | boolean | null) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearch(suggestion);
    onSearchChange(suggestion);
  };

  const renderSelect = (
    label: string,
    value: string,
    options: string[],
    field: keyof FilterType,
    placeholder: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className='h-[1000px] shadow-lg rounded-2xl w-[350px] mr-4 bg-white p-6 sticky top-6 overflow-y-auto'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>Find Your Pet</h2>
        <p className="text-sm text-gray-500 mt-1">Use filters or search below</p>
        <hr className='border-gray-200 w-full mt-2' />
      </div>

      {/* Search Bar */}
      <div className='mb-6'>
        <div className="relative">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="🔍 Search pets..."
            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {isSearching ? "⏳" : "🔍"}
          </div>
        </div>
        
        {searchSuggestions.length > 0 && localSearch && (
          <div className="mt-2 bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-500 mb-1">Suggestions:</p>
            <div className="flex flex-wrap gap-1">
              {searchSuggestions.slice(0, 3).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-pink-100 text-pink-700 hover:bg-pink-200 px-2 py-1 rounded-full"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pet Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Pet Type</h3>
        <div className="flex justify-center gap-6">
          {/* Chat (cat) */}
          <div onClick={() => handleEspeceClick("chat")} className="cursor-pointer">
            <img 
              src="/cat filter.png" 
              alt="cat" 
              width={80} 
              height={80} 
              className={`rounded-full border-4 ${filters.espece === "chat" ? "border-pink-400" : "border-pink-200"} hover:border-pink-400 transition-all`}
            />
            <p className={`text-center mt-2 text-sm ${filters.espece === "chat" ? "font-bold text-pink-600" : "text-gray-600"}`}>
              Cats
            </p>
          </div>
          
          {/* Chien (dog) */}
          <div onClick={() => handleEspeceClick("chien")} className="cursor-pointer">
            <img 
              src="/dog filter.png" 
              alt="dog" 
              width={80} 
              height={80} 
              className={`rounded-full border-4 ${filters.espece === "chien" ? "border-pink-400" : "border-pink-200"} hover:border-pink-400 transition-all`}
            />
            <p className={`text-center mt-2 text-sm ${filters.espece === "chien" ? "font-bold text-pink-600" : "text-gray-600"}`}>
              Dogs
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='space-y-4'>
        {renderSelect("📍 City", filters.city, aggregations.cities, "city", "All cities")}
        {renderSelect("🐾 Breed", filters.race, aggregations.breeds, "race", "All breeds")}

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">⚧ Gender</label>
          <div className="flex gap-2">
            {["M", "F"].map((gender) => (
              <button
                key={gender}
                onClick={() => handleChange("sexe", filters.sexe === gender ? "" : gender)}
                className={`flex-1 p-2 rounded-lg border-2 ${filters.sexe === gender ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200"}`}
              >
                {gender === "M" ? "♂ Male" : "♀ Female"}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">🎂 Age</label>
          <div className="grid grid-cols-2 gap-2">
            {["puppy", "young", "adult", "senior"].map((age) => (
              <button
                key={age}
                onClick={() => handleChange("age", filters.age === age ? "" : age)}
                className={`p-2 text-sm rounded-lg border-2 capitalize ${filters.age === age ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200"}`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Health Filters */}
        <div className='p-4 bg-pink-50 rounded-lg'>
          <span className='font-medium text-sm text-gray-700 block mb-3'>Health & Training:</span>
          
          {/* Vaccinated */}
          <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/50 cursor-pointer'>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.vacciné === true}
                onChange={(e) => handleChange("vacciné", e.target.checked ? true : null)}
                className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
              />
              <span className='font-medium'>Vaccinated</span>
            </div>
            <span className="text-xs text-gray-500">
              ({aggregations.vaccinated_count})
            </span>
          </label>
          
          {/* Trained */}
          <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/50 cursor-pointer'>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.dressé === true}
                onChange={(e) => handleChange("dressé", e.target.checked ? true : null)}
                className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
              />
              <span className='font-medium'>Trained</span>
            </div>
            <span className="text-xs text-gray-500">
              ({aggregations.trained_count})
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};