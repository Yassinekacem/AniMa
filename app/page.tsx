import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* HERO */}
      <section className="relative w-full h-[75vh] flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-purple-300 rounded-b-3xl overflow-hidden">

        {/* Blobs décoratifs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-white/20 rounded-full blur-2xl"></div>

        <div className="relative text-center px-6 max-w-2xl">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
            AniMa – Your Animals Companion
          </h1>

          <p className="mt-4 text-xl font-medium text-white/90 drop-shadow">
            Découvrez, adoptez et analysez le monde des animaux avec simplicité.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/cats"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition"
            >
              Explorer les chats
            </a>

            <a
              href="/dogs"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 hover:scale-105 transition"
            >
              Explorer les chiens
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <h2 className="text-4xl font-bold text-center mb-14">Nos Solutions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">

          {/* Dashboard Logs */}
          <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition bg-white border border-gray-100">
            <div className="w-full h-56 bg-blue-100 flex items-center justify-center">
              <span className="text-7xl">📊</span>
            </div>
            <div className="px-8 py-6">
              <h3 className="font-bold text-2xl mb-3">Analyse & Logs</h3>
              <p className="text-gray-600 leading-relaxed">
                Surveillez l’activité du site, consultez les erreurs et visualisez les journaux en temps réel.
              </p>
            </div>
          </div>

          {/* Dashboard Animaux */}
          <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition bg-white border border-gray-100">
            <div className="w-full h-56 bg-green-100 flex items-center justify-center">
              <span className="text-7xl">🐾</span>
            </div>
            <div className="px-8 py-6">
              <h3 className="font-bold text-2xl mb-3">Statistiques Animales</h3>
              <p className="text-gray-600 leading-relaxed">
                Analysez les types, comportements, tendances et données d’adoption des animaux.
              </p>
            </div>
          </div>

          {/* Liste des animaux */}
          <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition bg-white border border-gray-100">
            <div className="w-full h-56 bg-pink-100 flex items-center justify-center">
              <span className="text-7xl">🐶</span>
            </div>
            <div className="px-8 py-6">
              <h3 className="font-bold text-2xl mb-3">Nos Animaux</h3>
              <p className="text-gray-600 leading-relaxed">
                Recherchez, filtrez et découvrez les profils détaillés de tous les animaux disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">À propos de nous</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            AniMa est une plateforme moderne destinée aux passionnés d’animaux.
            Notre objectif est de simplifier l’adoption et de promouvoir la protection animale
            grâce à des outils innovants et accessibles.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        © {new Date().getFullYear()} AniMa — Tous droits réservés.
      </footer>

    </div>
  );
}
