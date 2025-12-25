"use client";

import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Dog, Cat, MapPin, Syringe, Activity, Users } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de chargement des statistiques:", error);
        setLoading(false);
      });
  }, []);

  const COLORS = {
    pink: "#FF4D94",
    purple: "#9333EA",
    blue: "#3B82F6",
    teal: "#14B8A6",
    amber: "#F59E0B"
  };

  const CHART_COLORS = [
    COLORS.pink,
    COLORS.purple,
    COLORS.blue,
    COLORS.teal,
    COLORS.amber
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Aucune donnée disponible
          </h2>
        </div>
      </div>
    );
  }

  // Transform data for charts
  const speciesData = stats.species.map((s: any) => ({
    name: s.key === "chien" ? "Chiens" : "Chats",
    value: s.doc_count
  }));

  const sexeData = stats.sexe.map((s: any) => ({
    name: s.key === "M" ? "Mâle" : "Femelle",
    value: s.doc_count,
    color: s.key === "M" ? COLORS.blue : COLORS.pink
  }));

  const cityData = stats.cities.slice(0, 6).map((c: any) => ({
    name: c.key,
    value: c.doc_count,
  }));

  const vaccinatedData = stats.vaccinated.map((v: any) => ({
    name: v.key === true ? "Vaccinés" : "Non vaccinés",
    value: v.doc_count,
    color: v.key === true ? COLORS.teal : COLORS.amber
  }));

  // Calculate totals
  const totalAnimals = stats.species.reduce((acc: number, s: any) => acc + s.doc_count, 0);
  const totalCities = stats.cities.length;
  const vaccinatedPercent = stats.vaccinated.find((v: any) => v.key === true)?.doc_count / totalAnimals * 100 || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Tableau de bord AniMa
          </h1>
          <p className="text-gray-600">
            {totalAnimals} animaux enregistrés
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Animals Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Animaux totaux</p>
                <p className="text-2xl font-bold text-gray-900">{totalAnimals}</p>
              </div>
            </div>
          </div>

          {/* Cities Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Villes</p>
                <p className="text-2xl font-bold text-gray-900">{totalCities}</p>
              </div>
            </div>
          </div>

          {/* Vaccination Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mr-4">
                <Syringe className="w-6 h-6 text-teal-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Vaccinés</p>
                <p className="text-2xl font-bold text-gray-900">{vaccinatedPercent.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Species Distribution */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Dog className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Espèces</h2>
                <p className="text-sm text-gray-600">Chiens vs Chats</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={speciesData} 
                    dataKey="value" 
                    nameKey="name"
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    label={(entry) => `${entry.name}: ${((entry.value / totalAnimals) * 100).toFixed(0)}%`}
                  >
                    {speciesData.map((_: any, i: any) => (
                      <Cell key={`cell-${i}`} fill={CHART_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} animaux`, "Quantité"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sexe</h2>
                <p className="text-sm text-gray-600">Mâles vs Femelles</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sexeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} animaux`, "Quantité"]} />
                  <Bar dataKey="value" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cities Distribution */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Villes</h2>
                <p className="text-sm text-gray-600">Top 6 villes</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} animaux`, "Quantité"]} />
                  <Bar dataKey="value" fill={COLORS.pink} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vaccination Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                <Syringe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Vaccination</h2>
                <p className="text-sm text-gray-600">Statut des animaux</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={vaccinatedData} 
                    dataKey="value" 
                    nameKey="name"
                    cx="50%" 
                    cy="50%" 
                    outerRadius={70}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {vaccinatedData.map((entry: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} animaux`, "Quantité"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}