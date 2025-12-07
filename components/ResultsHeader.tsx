// components/ResultsHeader.tsx
import { FilterType } from "../types/types";

interface ResultsHeaderProps {
  total: number;
  searchTerm?: string;
  city?: string;
  searchPerformed: boolean;
  filters: FilterType;
  onClearFilter: (filterKey: keyof FilterType) => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  total,
  searchTerm,
  city,
  searchPerformed,
  filters,
  onClearFilter
}) => {
  const activeFilters = [
    { key: 'espece', label: filters.espece === "chat" ? "🐱 Cats" : "🐶 Dogs", value: filters.espece },
    { key: 'city', label: `📍 ${filters.city}`, value: filters.city },
    { key: 'vacciné', label: "✓ Vaccinated", value: filters.vacciné },
    { key: 'dressé', label: "🎓 Trained", value: filters.dressé },
  ].filter(filter => filter.value && filter.value !== '');

  return (
    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {searchPerformed ? "Search Results" : "Available Pets"}
          </h2>
          <p className="text-sm text-gray-600">
            Found {total} pet{total !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {city && ` in ${city}`}
          </p>
        </div>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(({ key, label }) => (
              <span key={key} className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                {label}
                <button 
                  onClick={() => onClearFilter(key as keyof FilterType)}
                  className="ml-1 hover:text-pink-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Relevance Indicator */}
      {searchPerformed && (
        <div className="mt-3 flex items-center gap-2 text-sm text-pink-600">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <span>Results sorted by relevance</span>
        </div>
      )}
    </div>
  );
};