// components/EmptyState.tsx
interface EmptyStateProps {
  searchTerm?: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchTerm, 
  suggestions, 
  onSuggestionClick 
}) => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <div className="text-gray-500 text-xl font-semibold mb-2">
      {searchTerm ? `No results for "${searchTerm}"` : "No pets found"}
    </div>
    <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
    
    {searchTerm && suggestions.length > 0 && (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600 mb-2">Did you mean:</p>
        <div className="flex gap-2">
          {suggestions.slice(0, 3).map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick(suggestion)}
              className="bg-white border border-pink-300 text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-lg text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);