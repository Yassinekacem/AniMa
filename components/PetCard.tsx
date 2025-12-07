// components/PetCard.tsx
"use client";

import React from "react";
import { AnimalType } from "../types/types";
import { highlightText } from "@/utils";

interface PetCardProps {
  item: AnimalType;
  index: number;
  searchTerm?: string;
}

export const PetCard: React.FC<PetCardProps> = ({ item, index, searchTerm }) => {
  const isDog = item.espece === "chien";
  const isMale = item.sexe === "M";

  return (
    <div className='w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col h-full group'>
      {/* Image Section */}
      <div className='relative h-48 w-full overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100'>
        <img 
          src={item.image_url} 
          alt={item.race} 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x300/FFB6C1/ffffff?text=${isDog ? "🐕" : "🐈"}`;
          }}
        />
        
        {/* Species Badge */}
        <div className='absolute top-3 left-3'>
          <div className={`px-3 py-1 rounded-full text-sm font-bold text-white shadow-md ${isDog ? "bg-blue-500" : "bg-pink-500"}`}>
            {isDog ? "🐶" : "🐱"}
          </div>
        </div>
        
        {/* Relevance Score */}
        {item._score && item._score > 1 && searchTerm && (
          <div className='absolute top-3 right-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold'>
            ⭐ {(item._score).toFixed(1)}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className='p-5 flex flex-col flex-grow'>
        {/* Header */}
        <div className='flex justify-between items-start mb-3'>
          <div>
            <h3 
              className='text-xl font-bold text-gray-800'
              dangerouslySetInnerHTML={{ __html: highlightText(item.race, searchTerm || '') }}
            />
            <div className='flex items-center gap-2 mt-1'>
              <div className={`w-2 h-2 rounded-full ${isMale ? "bg-blue-500" : "bg-pink-500"}`}></div>
              <span className='text-sm font-medium text-gray-600'>
                {isMale ? "Male" : "Female"}
              </span>
            </div>
          </div>
          
          {/* City */}
          <div className='flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1'>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span 
              className='text-sm font-semibold text-gray-700'
              dangerouslySetInnerHTML={{ __html: highlightText(item.city, searchTerm || '') }}
            />
          </div>
        </div>
        
        {/* Description */}
        <div className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow'>
          <div dangerouslySetInnerHTML={{ __html: highlightText(item.description, searchTerm || '') }} />
        </div>
        
        {/* Badges */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {item.vacciné && (
            <div className='flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm'>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Vaccinated</span>
            </div>
          )}
          
          {item.dressé && (
            <div className='flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm'>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span>Trained</span>
            </div>
          )}
          
          <div className='flex items-center gap-1 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm'>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <span>{item.date_ajout}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <a href={`/detail/${item.id || index}`} className='block w-full mt-auto'>
          <button className='w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2'>
            <span>View Details</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};