"use client";

import React, { useEffect, useState } from "react";
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
};

// ---------- FILTER COMPONENT ----------
const cityOptions = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Beja", "Jendouba", "Kef", "Siliana", "Kairouan", "Sousse", "Mahdia",
  "Monastir", "Sfax", "Gabes", "Mednine", "Tozeur", "Gafsa", "Kasserine",
  "Sidi Bouzid", "Tataouine", "Gbelli"
];

const DogsBreedsOptions = ["Labrador", "Rottweiler", "Berger Allemand", "Berger noir", "Malinois", "Husky", "Caniche", "Chihuahuah", "Dobermann", "Pitbull", "Bichon", "Others"];
const CatsBreedsOptions = ["Siamois", "Persan", "Maine Coon", "Bengal", "Sphynx", "Others"];

const Filter = () => {
  return (
    <div className='h-[1100px] shadow-lg rounded-2xl w-[350px] mr-4 bg-white p-6'>
      <div className='flex items-center justify-between mb-2'>
        <button className='text-pink-500 font-semibold bg-white hover:bg-pink-50 border-2 border-pink-500 rounded-lg px-4 py-2 transition-all duration-200'>
          Filters
        </button>
        <button className='text-gray-500 font-medium bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200'>
          Reset Filters
        </button>
      </div>

      <hr className='border-gray-200 w-full mb-4' />

      <div className='my-4 flex items-center justify-center gap-6'>
        <img 
          src="/cat filter.png" 
          alt='cat' 
          width={90} 
          height={90} 
          className='rounded-full border-4 border-pink-200 hover:border-pink-400 cursor-pointer transition-all duration-200 hover:scale-105' 
        />
        <img 
          src="/dog filter.png" 
          alt='dog' 
          width={90} 
          height={90} 
          className='rounded-full border-4 border-pink-200 hover:border-pink-400 cursor-pointer transition-all duration-200 hover:scale-105' 
        />
      </div>

      <div className='flex flex-col gap-4'>
        <select className='w-[90%] mx-auto p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all'>
          <option value="" className="text-gray-500">📍 City</option>
          {cityOptions.map(city => <option key={city} value={city} className="text-black">{city}</option>)}
        </select>

        <select className='w-[90%] mx-auto p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all'>
          <option value="" className="text-gray-500">🐾 Breed</option>
          {DogsBreedsOptions.map(breed => <option key={breed} value={breed} className="text-black">{breed}</option>)}
          {CatsBreedsOptions.map(breed => <option key={breed} value={breed} className="text-black">{breed}</option>)}
        </select>

        <select className='w-[90%] mx-auto p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all'>
          <option value="" className="text-gray-500">⚧ Gender</option>
          <option value="M" className="text-black">Male</option>
          <option value="F" className="text-black">Female</option>
        </select>

        <select className='w-[90%] mx-auto p-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all'>
          <option value="" className="text-gray-500">🎂 Age Category</option>
          <option value="puppy" className="text-black">Puppy</option>
          <option value="young" className="text-black">Young</option>
          <option value="adult" className="text-black">Adult</option>
          <option value="senior" className="text-black">Senior</option>
        </select>

        <div className='w-[85%] mx-auto my-3 p-4 bg-pink-50 rounded-lg'>
          <span className='font-medium text-sm text-gray-700 block mb-3'>Select the items you want to display in your Filter:</span>
          <div className='flex flex-col items-start mt-2 gap-3'>
            <label className='flex items-center gap-3 text-gray-700 cursor-pointer hover:text-pink-500 transition-colors'>
              <input type="checkbox" className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400" />
              <span className='font-medium'>Vaccinated</span>
            </label>
            <label className='flex items-center gap-3 text-gray-700 cursor-pointer hover:text-pink-500 transition-colors'>
              <input type="checkbox" className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400" />
              <span className='font-medium'>Trained</span>
            </label>
            <label className='flex items-center gap-3 text-gray-700 cursor-pointer hover:text-pink-500 transition-colors'>
              <input type="checkbox" className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400" />
              <span className='font-medium'>Friendly</span>
            </label>
          </div>
        </div>

        <button className='text-white font-semibold w-[50%] mx-auto bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 rounded-lg px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
          Apply Your Filter
        </button>
      </div>
    </div>
  );
};

// ---------- PET CARD COMPONENT ----------
const PetCard = ({ item, index }: { item: AnimalType; index: number }) => (
  <div className='w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full'>
    {/* Section de l'image */}
    <div className='relative h-48 w-full overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 flex-shrink-0'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <img 
          src={item.image_url} 
          alt={item.race} 
          className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-500'
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
    </div>
    
    {/* Contenu de la carte */}
    <div className='p-5 flex flex-col flex-grow'>
      {/* En-tête avec nom et sexe */}
      <div className='flex justify-between items-start mb-3'>
        <div>
          <h3 className='text-xl font-bold text-gray-800'>{item.race}</h3>
          <div className='flex items-center gap-2 mt-1'>
            <div className={`w-2 h-2 rounded-full ${
              item.sexe === "M" ? "bg-blue-500" : "bg-pink-500"
            }`}></div>
            <span className='text-sm font-medium text-gray-600'>
              {item.sexe === "M" ? "Male" : "Female"}
            </span>
          </div>
        </div>
        
        {/* Ville */}
        <div className='flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1'>
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className='text-sm font-semibold text-gray-700'>{item.city}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow'>
        {item.description}
      </p>
      
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
      
      {/* Bouton d'action - Toujours en bas */}
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

// ---------- MAIN PAGE ----------
const AnimalsPage = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/animaux");
        setAnimals(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching animals:", error);
        setError("Failed to load animals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className='flex flex-col pt-6 px-6 bg-gradient-to-br from-gray-50 to-pink-50 min-h-screen'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Find Your Perfect Pet</h1>
        <p className='text-gray-600 mt-2'>Discover lovely pets waiting for a new home</p>
      </div>

      <div className='flex gap-6'>
        <div className='flex-[1]'>
          <Filter />
        </div>

        <div className='flex-[3]'>
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
                onClick={() => window.location.reload()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : animals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="text-gray-500 text-xl font-semibold mb-2">No animals found</div>
              <p className="text-gray-400">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
              {animals.map((animal, index) => (
                <div key={animal.id ? `animal-${animal.id}` : `animal-${index}`} className='h-full'>
                  <PetCard item={animal} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;