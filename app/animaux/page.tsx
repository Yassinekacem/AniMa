"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// ---------- TYPES ----------
type AnimalType = {
  id: number;
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

// ---------- FILTER COMPONENT (Design Statique) ----------
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
    <div className='h-[1100px] shadow-xl shadow-slate-400 w-[350px] mr-4 bg-white p-4'>
      <div className='flex items-center justify-between mb-2'>
        <button className='text-pink-400 bg-white hover:bg-white border border-pink-400 rounded px-3 py-1'>Filters</button>
        <button className='text-gray-400 bg-white hover:bg-white border border-gray-400 rounded px-3 py-1'>Reset Filters</button>
      </div>

      <hr className='border-gray-400 w-full mb-4' />

      <div className='my-4 flex items-center justify-center gap-6'>
        <Image src="/cat filter.png" alt='cat' width={90} height={90} className='rounded-full' />
        <Image src="/dog filter.png" alt='dog' width={90} height={90} className='rounded-full' />
      </div>

      <div className='flex flex-col gap-4'>
        <select className='w-[90%] mx-auto p-2 border rounded text-black bg-white'>
          <option value="" className="text-gray-500">City</option>
          {cityOptions.map(city => <option key={city} value={city} className="text-black">{city}</option>)}
        </select>

        <select className='w-[90%] mx-auto p-2 border rounded text-black bg-white'>
          <option value="" className="text-gray-500">Breed</option>
          {DogsBreedsOptions.map(breed => <option key={breed} value={breed} className="text-black">{breed}</option>)}
          {CatsBreedsOptions.map(breed => <option key={breed} value={breed} className="text-black">{breed}</option>)}
        </select>

        <select className='w-[90%] mx-auto p-2 border rounded text-black bg-white'>
          <option value="" className="text-gray-500">Gender</option>
          <option value="M" className="text-black">Male</option>
          <option value="F" className="text-black">Female</option>
        </select>

        <select className='w-[90%] mx-auto p-2 border rounded text-black bg-white'>
          <option value="" className="text-gray-500">Age Category</option>
          <option value="puppy" className="text-black">Puppy</option>
          <option value="young" className="text-black">Young</option>
          <option value="adult" className="text-black">Adult</option>
          <option value="senior" className="text-black">Senior</option>
        </select>

        <div className='w-[85%] mx-auto my-3'>
          <span className='font-light text-md text-black'>Select the items you want to display in your Filter:</span>
          <div className='flex flex-col items-start mt-2 gap-3'>
            <label className='flex items-center gap-2 text-black'>
              <input type="checkbox" className="text-pink-400" />
              Vaccinated
            </label>
            <label className='flex items-center gap-2 text-black'>
              <input type="checkbox" className="text-pink-400" />
              Trained
            </label>
            <label className='flex items-center gap-2 text-black'>
              <input type="checkbox" className="text-pink-400" />
              Friendly
            </label>
          </div>
        </div>

        <button className='text-pink-400 w-[50%] mx-auto bg-white border border-pink-400 rounded px-3 py-1'>
          Apply Your Filter
        </button>
      </div>
    </div>
  );
};

// ---------- PET CARD COMPONENT ----------
const PetCard = ({ item }: { item: AnimalType }) => (
  <div className='w-[290px] flex flex-col items-center justify-center gap-3'>
    <div className='flex flex-col relative'>
      <Image src={item.image_url} alt={item.race} width={90} height={90} className='rounded-full' />
      <div className='w-[100px] h-[50px] bg-pink-400 absolute bottom-0 rounded-b-full' />
    </div>
    <div className='bg-slate-100 rounded-xl pt-[50px] pb-2 w-full flex flex-col items-center gap-2 relative -top-[40px]'>
      <span className='text-pink-400 font-semibold'>{item.race}</span>
      <span className='font-bold text-black'>{item.sexe === "M" ? "Male" : "Female"}</span>
      <span className="text-black">{item.city}</span>
      <p className='text-xs text-gray-700 text-center px-2'>{item.description}</p>
      <Link href={`/detail/${item.id}`}>
        <button className='text-pink-400 bg-white hover:bg-white border border-pink-400 w-[90%] py-1 rounded'>
          More Info
        </button>
      </Link>
    </div>
  </div>
);

// ---------- MAIN PAGE ----------
const AnimalsPage = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/animaux");
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className='flex flex-row mt-6 px-6 bg-white min-h-screen'>
      <div className='flex-[1]'>
        <Filter />
      </div>

      <div className='flex-[3] flex flex-col gap-6'>
        <div className='flex gap-4 flex-wrap'>
          {loading ? (
            <p className="text-black">Loading...</p>
          ) : (
            animals.map(animal => <PetCard key={animal.id} item={animal} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;