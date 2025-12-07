// components/ErrorState.tsx
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <div className="text-red-500 text-xl font-semibold mb-2">{error}</div>
    <button 
      onClick={onRetry}
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
    >
      Try Again
    </button>
  </div>
);