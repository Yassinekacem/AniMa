"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

// ---------- TYPES ----------
type AnimalType = {
  id?: number;
  espece: string;
  race: string;
  sexe: string;
  city: string;
  description: string;
  date_ajout: string;
  likes: number;
  image_url: string;
  vacciné: boolean;
  dressé: boolean;
  age?: string;
  _score?: number;
};

type FilterType = {
  espece: string;
  race: string;
  city: string;
  sexe: string;
  vacciné: boolean | null;
  dressé: boolean | null;
  age: string;
  search: string;
};

type ApiResponse = {
  animals: AnimalType[];
  total: number;
  suggestions: string[];
  aggregations: {
    cities: string[];
    breeds: string[];
    species: string[];
    vaccinated_count: number;
    trained_count: number;
  };
  search_performed: boolean;
};

// ---------- UTILITY FUNCTIONS ----------
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Fonction pour normaliser le texte (insensible à la casse)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .trim();
};

// ---------- FILTER COMPONENT ----------
interface FilterProps {
  filters: FilterType;
  aggregations: ApiResponse["aggregations"];
  onFilterChange: (filters: FilterType) => void;
  onSearchChange: (search: string) => void;
  searchSuggestions: string[];
  isSearching: boolean;
}

const Filter = ({ 
  filters, 
  aggregations, 
  onFilterChange, 
  onSearchChange,
  searchSuggestions,
  isSearching 
}: FilterProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleEspeceClick = (espece: string) => {
    onFilterChange({
      ...filters,
      espece: filters.espece === espece ? "" : espece,
      race: "" // Reset race quand on change d'espèce
    });
  };

  const handleChange = (field: keyof FilterType, value: string | boolean | null) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearch(suggestion);
    onSearchChange(suggestion);
  };

  // Filtrer les races disponibles selon l'espèce sélectionnée
  const availableBreeds = aggregations.breeds.filter(breed => {
    if (!filters.espece) return true;
    // Ici vous pourriez avoir une logique pour associer races et espèces
    return true;
  });

  return (
    <div className='h-[1000px] shadow-lg rounded-2xl w-[350px] mr-4 bg-white p-6 sticky top-6 overflow-y-auto'>
      {/* Titre */}
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>Find Your Pet</h2>
        <p className="text-sm text-gray-500 mt-1">Use filters or search below</p>
        <hr className='border-gray-200 w-full mt-2' />
      </div>

      {/* Barre de recherche avancée */}
      <div className='mb-6'>
        <div className="relative">
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search by description"
            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {isSearching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
            ) : (
              "🔍"
            )}
          </div>
        </div>
        
        {/* Suggestions de recherche */}
        {searchSuggestions.length > 0 && localSearch && (
          <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Suggestions:</p>
            <div className="flex flex-wrap gap-1">
              {searchSuggestions.slice(0, 3).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-pink-100 text-pink-700 hover:bg-pink-200 px-2 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Try: "playful cat", "labrador", "vaccinated", "Sfax", "trained dog"
        </p>
      </div>

      {/* Filtres par espèce */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Pet Type</h3>
        <div className="flex items-center justify-center gap-6">
          <div 
            onClick={() => handleEspeceClick("chat")}
            className={`cursor-pointer transition-all duration-200 ${filters.espece === "chat" ? "scale-105" : ""}`}
          >
            <img 
              src="/cat filter.png" 
              alt='cat' 
              width={80} 
              height={80} 
              className={`rounded-full border-4 ${filters.espece === "chat" ? "border-pink-400 bg-pink-50" : "border-pink-200"} hover:border-pink-400 transition-all duration-200 hover:scale-105`}
            />
            <p className={`text-center mt-2 text-sm ${filters.espece === "chat" ? "font-bold text-pink-600" : "text-gray-600"}`}>
              Cats
            </p>
          </div>
          <div 
            onClick={() => handleEspeceClick("chien")}
            className={`cursor-pointer transition-all duration-200 ${filters.espece === "chien" ? "scale-105" : ""}`}
          >
            <img 
              src="/dog filter.png" 
              alt='dog' 
              width={80} 
              height={80} 
              className={`rounded-full border-4 ${filters.espece === "chien" ? "border-pink-400 bg-pink-50" : "border-pink-200"} hover:border-pink-400 transition-all duration-200 hover:scale-105`}
            />
            <p className={`text-center mt-2 text-sm ${filters.espece === "chien" ? "font-bold text-pink-600" : "text-gray-600"}`}>
              Dogs
            </p>
          </div>
        </div>
      </div>

      {/* Filtres dynamiques */}
      <div className='space-y-4'>
        {/* Ville avec suggestions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📍 City
          </label>
          <div className="relative">
            <select 
              value={filters.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all appearance-none"
            >
              <option value="">All cities</option>
              {aggregations.cities.map(city => (
                <option key={city} value={city} className="text-black">
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              ▼
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {filters.city ? `Showing pets from ${filters.city}` : `${aggregations.cities.length} cities available`}
          </p>
        </div>

        {/* Race avec suggestions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🐾 Breed
          </label>
          <div className="relative">
            <select 
              value={filters.race}
              onChange={(e) => handleChange("race", e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all appearance-none"
              disabled={availableBreeds.length === 0}
            >
              <option value="">All breeds</option>
              {availableBreeds.map(breed => (
                <option key={breed} value={breed} className="text-black">
                  {breed}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              ▼
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {filters.race ? `Filtering: ${filters.race}` : `${aggregations.breeds.length} breeds available`}
          </p>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ⚧ Gender
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleChange("sexe", filters.sexe === "M" ? "" : "M")}
              className={`flex-1 p-2 rounded-lg border-2 transition-all ${filters.sexe === "M" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}
            >
              ♂ Male
            </button>
            <button
              onClick={() => handleChange("sexe", filters.sexe === "F" ? "" : "F")}
              className={`flex-1 p-2 rounded-lg border-2 transition-all ${filters.sexe === "F" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200 hover:border-gray-300"}`}
            >
              ♀ Female
            </button>
          </div>
        </div>

        {/* Âge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🎂 Age
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["puppy", "young", "adult", "senior"].map(ageGroup => (
              <button
                key={ageGroup}
                onClick={() => handleChange("age", filters.age === ageGroup ? "" : ageGroup)}
                className={`p-2 text-sm rounded-lg border-2 transition-all capitalize ${filters.age === ageGroup ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200 hover:border-gray-300"}`}
              >
                {ageGroup}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres booléens */}
        <div className='w-full my-3 p-4 bg-pink-50 rounded-lg'>
          <span className='font-medium text-sm text-gray-700 block mb-3'>Health & Training:</span>
          <div className='space-y-3'>
            <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer'>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${filters.vacciné ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {filters.vacciné && "✓"}
                </div>
                <span className='font-medium'>Vaccinated</span>
              </div>
              <span className="text-xs text-gray-500">
                ({aggregations.vaccinated_count})
              </span>
            </label>
            <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer'>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${filters.dressé ? "bg-purple-500 border-purple-500" : "border-gray-300"}`}>
                  {filters.dressé && "✓"}
                </div>
                <span className='font-medium'>Trained</span>
              </div>
              <span className="text-xs text-gray-500">
                ({aggregations.trained_count})
              </span>
            </label>
          </div>
        </div>

        {/* Statistiques */}
        <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
          <p>💡 Tips:</p>
          <ul className="list-disc pl-4 mt-1 space-y-1">
            <li>Search works in any language</li>
            <li>Filters are case-insensitive</li>
            <li>Typos are automatically corrected</li>
            <li>Use quotes for exact phrases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ---------- PET CARD COMPONENT ----------
const PetCard = ({ item, index, searchTerm }: { 
  item: AnimalType; 
  index: number;
  searchTerm?: string;
}) => {
  // Mise en évidence du texte recherché
  const highlightText = (text: string, search: string) => {
    if (!search || !text) return text;
    
    const normalizedSearch = normalizeText(search);
    const normalizedText = normalizeText(text);
    
    if (normalizedText.includes(normalizedSearch)) {
      const regex = new RegExp(`(${search})`, 'gi');
      return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    }
    
    return text;
  };

  return (
    <div className='w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full group'>
      {/* Section de l'image */}
      <div className='relative h-48 w-full overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 flex-shrink-0'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <img 
            src={item.image_url} 
            alt={item.race} 
            className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
            style={{ objectPosition: 'center' }}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x300/FFB6C1/ffffff?text=${item.espece === "chien" ? "🐕" : "🐈"}`;
            }}
          />
        </div>
        
        {/* Badge d'espèce */}
        <div className='absolute top-3 left-3'>
          <div className={`px-3 py-1 rounded-full text-sm font-bold text-white shadow-md ${
            item.espece === "chien" ? "bg-blue-500" : "bg-pink-500"
          }`}>
            {item.espece === "chien" ? "🐶 Dog" : "🐱 Cat"}
          </div>
        </div>
        
        {/* Score de pertinence */}
        {item._score && item._score > 1 && searchTerm && (
          <div className='absolute top-3 right-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold shadow-sm'>
            ⭐ {(item._score).toFixed(1)}
          </div>
        )}
      </div>
      
      {/* Contenu de la carte */}
      <div className='p-5 flex flex-col flex-grow'>
        {/* En-tête avec nom et sexe */}
        <div className='flex justify-between items-start mb-3'>
          <div>
            <h3 
              className='text-xl font-bold text-gray-800'
              dangerouslySetInnerHTML={{ 
                __html: highlightText(item.race, searchTerm || '') 
              }}
            />
            <div className='flex items-center gap-2 mt-1'>
              <div className={`w-2 h-2 rounded-full ${
                item.sexe === "M" ? "bg-blue-500" : "bg-pink-500"
              }`}></div>
              <span className='text-sm font-medium text-gray-600'>
                {item.sexe === "M" ? "Male" : "Female"}
              </span>
            </div>
          </div>
          
          {/* Ville avec mise en évidence */}
          <div className='flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1'>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span 
              className='text-sm font-semibold text-gray-700'
              dangerouslySetInnerHTML={{ 
                __html: highlightText(item.city, searchTerm || '') 
              }}
            />
          </div>
        </div>
        
        {/* Description avec mise en évidence */}
        <div className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow'>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: highlightText(item.description, searchTerm || '') 
            }}
          />
        </div>
        
        {/* Badges d'infos */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {item.vacciné && (
            <div className='flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm'>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className='font-medium'>Vaccinated</span>
            </div>
          )}
          
          {item.dressé && (
            <div className='flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm'>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span className='font-medium'>Trained</span>
            </div>
          )}
          
          <div className='flex items-center gap-1 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm'>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <span className='font-medium'>{item.date_ajout}</span>
          </div>
        </div>
        
        {/* Bouton d'action */}
        <a href={`/detail/${item.id || index}`} className='block w-full mt-auto'>
          <button className='w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group'>
            <span>View Details</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};

// ---------- MAIN PAGE ----------
const AnimalsPage = () => {
  const [data, setData] = useState<ApiResponse>({
    animals: [],
    total: 0,
    suggestions: [],
    aggregations: {
      cities: [],
      breeds: [],
      species: [],
      vaccinated_count: 0,
      trained_count: 0
    },
    search_performed: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterType>({
    espece: "",
    race: "",
    city: "",
    sexe: "",
    vacciné: null,
    dressé: null,
    age: "",
    search: ""
  });
  const [isSearching, setIsSearching] = useState(false);

  // Fonction debounced pour la recherche
  const debouncedSearchRef = useRef(
    debounce((searchValue: string) => {
      setFilters(prev => ({ ...prev, search: searchValue }));
      setIsSearching(false);
    }, 300) // Réduit à 300ms pour une réponse plus rapide
  );

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      // Construire les paramètres de requête
      const params = new URLSearchParams();
      
      if (filters.espece) params.append("espece", filters.espece);
      if (filters.race) params.append("race", filters.race);
      if (filters.city) params.append("city", filters.city);
      if (filters.sexe) params.append("sexe", filters.sexe);
      if (filters.age) params.append("age", filters.age);
      if (filters.vacciné !== null) params.append("vacciné", filters.vacciné.toString());
      if (filters.dressé !== null) params.append("dressé", filters.dressé.toString());
      if (filters.search) params.append("search", filters.search);

      const url = `http://localhost:3000/api/animaux${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await axios.get<ApiResponse>(url);
      setData(response.data);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching animals:", error);
      setError(error.response?.data?.error || "Failed to load animals. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (search: string) => {
    setIsSearching(true);
    debouncedSearchRef.current(search);
  };

  // Nettoyer le timeout à la destruction
  useEffect(() => {
    const currentDebounce = debouncedSearchRef.current;
    return () => {
      // Fonction de nettoyage si nécessaire
    };
  }, []);

  return (
    <div className='flex flex-col pt-6 px-6 bg-gradient-to-br from-gray-50 to-pink-50 min-h-screen'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Find Your Perfect Pet Companion</h1>
        <p className='text-gray-600 mt-2'>
          Search through our database of adorable pets waiting for their forever homes
        </p>
      </div>

      <div className='flex gap-6'>
        {/* Barre latérale avec filtres */}
        <div className='flex-[1] sticky top-6 self-start'>
          <Filter 
            filters={filters} 
            aggregations={data.aggregations}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            searchSuggestions={data.suggestions}
            isSearching={isSearching}
          />
        </div>

        {/* Contenu principal */}
        <div className='flex-[3] overflow-y-auto'>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[420px] flex flex-col">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4 flex-shrink-0"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 flex-grow"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="text-red-500 text-xl font-semibold mb-2">{error}</div>
              <button 
                onClick={() => fetchAnimals()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : data.animals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="text-gray-500 text-xl font-semibold mb-2">
                {filters.search ? `No results for "${filters.search}"` : "No pets found"}
              </div>
              <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
              {filters.search && data.suggestions.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Did you mean:</p>
                  <div className="flex gap-2">
                    {data.suggestions.slice(0, 3).map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchChange(suggestion)}
                        className="bg-white border border-pink-300 text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* En-tête des résultats */}
              <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {data.search_performed ? "Search Results" : "Available Pets"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Found {data.total} pet{data.total !== 1 ? 's' : ''}
                      {filters.search && ` for "${filters.search}"`}
                      {filters.city && ` in ${filters.city}`}
                    </p>
                  </div>
                  
                  {/* Indicateurs de filtres actifs */}
                  <div className="flex flex-wrap gap-2">
                    {filters.espece && (
                      <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                        {filters.espece === "chat" ? "🐱 Cats" : "🐶 Dogs"}
                        <button 
                          onClick={() => handleFilterChange({...filters, espece: ""})}
                          className="ml-1 hover:text-pink-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.city && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        📍 {filters.city}
                        <button 
                          onClick={() => handleFilterChange({...filters, city: ""})}
                          className="ml-1 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.vacciné && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        ✓ Vaccinated
                        <button 
                          onClick={() => handleFilterChange({...filters, vacciné: null})}
                          className="ml-1 hover:text-green-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.dressé && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        🎓 Trained
                        <button 
                          onClick={() => handleFilterChange({...filters, dressé: null})}
                          className="ml-1 hover:text-purple-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Indicateur de pertinence */}
                {data.search_performed && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-pink-600">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span>Results sorted by relevance</span>
                    <span className="text-gray-400 ml-2">
                      (Higher stars indicate better matches)
                    </span>
                  </div>
                )}
              </div>

              {/* Grille d'animaux */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                {data.animals.map((animal, index) => (
                  <div key={animal.id ? `animal-${animal.id}` : `animal-${index}`} className='h-full'>
                    <PetCard 
                      item={animal} 
                      index={index} 
                      searchTerm={filters.search}
                    />
                  </div>
                ))}
              </div>

              {/* Pied de page */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm">
                  {data.total > data.animals.length ? 
                    `Showing ${data.animals.length} of ${data.total} pets` :
                    "All pets are displayed above"
                  }
                </p>
                <p className="text-center text-gray-400 text-xs mt-2">
                  💡 Tip: Use specific keywords for better results (e.g., "playful cat Sfax")
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;