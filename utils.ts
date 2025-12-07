// utils.ts

import { FilterType } from "./types/types";

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Normalize text for case-insensitive search
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

// Highlight search terms in text
export const highlightText = (text: string, search: string): string => {
  if (!search || !text) return text;
  
  const normalizedSearch = normalizeText(search);
  const normalizedText = normalizeText(text);
  
  if (normalizedText.includes(normalizedSearch)) {
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  }
  
  return text;
};

// Build API URL with filters
export const buildApiUrl = (filters: FilterType): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== false) {
      params.append(key, value.toString());
    }
  });
  
  return `http://localhost:3000/api/animaux${params.toString() ? `?${params.toString()}` : ''}`;
};