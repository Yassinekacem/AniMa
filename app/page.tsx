import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
   

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-gradient-to-r from-blue-200 to-pink-200">
        <div className="text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Bienvenue sur AniMa
          </h1>
          <p className="mt-4 text-xl text-white drop-shadow-md">
            Découvrez nos amis à quatre pattes et trouvez votre compagnon idéal !
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/dogs"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Voir les chiens
            </a>
            <a
              href="/cats"
              className="bg-pink-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-500 transition"
            >
              Voir les chats
            </a>
          </div>
        </div>
        <Image
          src="/animals-hero.png" // remplace par une image réelle dans /public
          alt="Animaux mignons"
          fill
          className="object-cover opacity-30"
        />
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Nos catégories</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 px-4">
          <div className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition">
            <Image
              src="/dog.jpg"
              alt="Dog"
              width={400}
              height={250}
              className="w-full h-60 object-cover"
            />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Chiens</h3>
              <p className="text-gray-700 text-base">
                Découvrez notre sélection de chiens à adopter.
              </p>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition">
            <Image
              src="/cat.jpg"
              alt="Cat"
              width={400}
              height={250}
              className="w-full h-60 object-cover"
            />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Chats</h3>
              <p className="text-gray-700 text-base">
                Explorez nos chats adorables à adopter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">À propos de nous</h2>
          <p className="text-gray-700 text-lg">
            AniMa est une plateforme dédiée aux amoureux des animaux. Notre mission est de
            faciliter l’adoption et de sensibiliser à la protection animale.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          &copy; {new Date().getFullYear()} AniMa. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
