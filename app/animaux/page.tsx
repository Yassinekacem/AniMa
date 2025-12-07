// app/animaux/page.tsx
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { debounce, buildApiUrl } from "@/utils";
import { FilterType, ApiResponse } from "../../types/types";
import { Filter } from "@/components/Filter";
import { PetCard } from "@/components/PetCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ResultsHeader } from "@/components/ResultsHeader";

const INITIAL_FILTERS: FilterType = {
  espece: "",
  race: "",
  city: "",
  sexe: "",
  vacciné: null,
  dressé: null,
  age: "",
  search: ""
};

const INITIAL_DATA: ApiResponse = {
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
};

export default function AnimalsPage() {
  const [data, setData] = useState<ApiResponse>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterType>(INITIAL_FILTERS);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  const debouncedSearchRef = useRef(
    debounce((searchValue: string) => {
      setFilters(prev => ({ ...prev, search: searchValue }));
      setIsSearching(false);
    }, 300)
  );

  // Fetch animals
  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const url = buildApiUrl(filters);
      const response = await axios.get<ApiResponse>(url);
      setData(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to load pets");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  // Handlers
  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (search: string) => {
    setIsSearching(true);
    debouncedSearchRef.current(search);
  };

  const handleClearFilter = (filterKey: keyof FilterType) => {
    setFilters(prev => ({ ...prev, [filterKey]: INITIAL_FILTERS[filterKey] }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearchChange(suggestion);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className='flex flex-col pt-6 px-6 bg-gradient-to-br from-gray-50 to-pink-50 min-h-screen'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Find Your Perfect Pet</h1>
        <p className='text-gray-600 mt-2'>Discover lovely pets waiting for their forever homes</p>
      </div>

      <div className='flex gap-6'>
        {/* Sidebar Filter */}
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

        {/* Main Content */}
        <div className='flex-[3] overflow-y-auto'>
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState error={error} onRetry={fetchAnimals} />
          ) : data.animals.length === 0 ? (
            <EmptyState 
              searchTerm={filters.search}
              suggestions={data.suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <>
              <ResultsHeader
                total={data.total}
                searchTerm={filters.search}
                city={filters.city}
                searchPerformed={data.search_performed}
                filters={filters}
                onClearFilter={handleClearFilter}
              />

              {/* Pets Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                {data.animals.map((animal, index) => (
                  <div key={animal.id || index} className='h-full'>
                    <PetCard 
                      item={animal} 
                      index={index} 
                      searchTerm={filters.search}
                    />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                {data.total > data.animals.length ? 
                  `Showing ${data.animals.length} of ${data.total} pets` :
                  "All pets are displayed above"
                }
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}