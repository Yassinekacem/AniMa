"use client";

import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Dog, Cat, MapPin, Syringe, Activity, Heart, Users, Calendar } from "lucide-react";

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

  // Palette de couleurs cohérente avec AniMa
  const COLORS = {
    pink: "#FF4D94",
    pinkLight: "#FFB6D9",
    purple: "#9333EA",
    purpleLight: "#D8B4FE",
    blue: "#3B82F6",
    blueLight: "#93C5FD",
    teal: "#14B8A6",
    tealLight: "#5EEAD4",
    amber: "#F59E0B",
    amberLight: "#FCD34D",
    gray: "#6B7280",
    grayLight: "#D1D5DB"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-8"></div>
            
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Aucune donnée disponible
          </h2>
          <p className="text-gray-600">
            Impossible de charger les statistiques
          </p>
        </div>
      </div>
    );
  }

  // Transform data for charts
  const speciesData = stats.species.map((s: any) => ({
    name: s.key === "chien" ? "Chiens" : "Chats",
    value: s.doc_count,
    icon: s.key === "chien" ? "🐕" : "🐈"
  }));

  const sexeData = stats.sexe.map((s: any) => ({
    name: s.key === "M" ? "Mâle" : "Femelle",
    value: s.doc_count,
    color: s.key === "M" ? COLORS.blue : COLORS.pink
  }));

  const cityData = stats.cities
    .slice(0, 8)
    .map((c: any) => ({
      name: c.key,
      value: c.doc_count,
    }));

  const raceChienData = stats.races_chien
    .slice(0, 6)
    .map((r: any) => ({
      name: r.key,
      value: r.doc_count,
    }));

  const raceChatData = stats.races_chat
    .slice(0, 6)
    .map((r: any) => ({
      name: r.key,
      value: r.doc_count,
    }));

  const vaccinatedData = stats.vaccinated.map((v: any) => ({
    name: v.key === true ? "Vaccinés" : "Non vaccinés",
    value: v.doc_count,
    color: v.key === true ? COLORS.teal : COLORS.gray
  }));

  const trainedData = stats.trained.map((v: any) => ({
    name: v.key === true ? "Dressés" : "Non dressés",
    value: v.doc_count,
    color: v.key === true ? COLORS.purple : COLORS.gray
  }));

  // Calculate totals
  const totalAnimals = stats.species.reduce((acc: number, s: any) => acc + s.doc_count, 0);
  const totalCities = stats.cities.length;
  const totalDogBreeds = stats.races_chien.length;
  const totalCatBreeds = stats.races_chat.length;
  const vaccinatedPercent = stats.vaccinated.find((v: any) => v.key === true)?.doc_count / totalAnimals * 100 || 0;
  const trainedPercent = stats.trained.find((v: any) => v.key === true)?.doc_count / totalAnimals * 100 || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord AniMa
          </h1>
          <p className="text-gray-600">
            Statistiques et analyses des animaux disponibles
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Animals Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Animaux totaux</p>
                <p className="text-3xl font-bold text-gray-900">{totalAnimals}</p>
              </div>
              <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Heart className="w-4 h-4 mr-1" />
              <span>Dernière mise à jour : Aujourd'hui</span>
            </div>
          </div>

          {/* Cities Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Villes</p>
                <p className="text-3xl font-bold text-gray-900">{totalCities}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Principale : <span className="font-semibold">{stats.cities[0]?.key || "N/A"}</span>
              </p>
            </div>
          </div>

          {/* Vaccination Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Taux de vaccination</p>
                <p className="text-3xl font-bold text-gray-900">{vaccinatedPercent.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                <Syringe className="w-6 h-6 text-teal-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${vaccinatedPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Training Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Taux de dressage</p>
                <p className="text-3xl font-bold text-gray-900">{trainedPercent.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${trainedPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Species Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Dog className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Répartition par espèce</h2>
                  <p className="text-sm text-gray-600">Chiens vs Chats</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm">Chiens</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Chats</span>
                </div>
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
                    paddingAngle={5}
                  >
                    {speciesData.map((_ : any, i : any) => (
                      <Cell key={`cell-${i}`} fill={CHART_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} animaux`, "Quantité"]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {speciesData.map((item: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {((item.value / totalAnimals) * 100).toFixed(1)}% du total
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Répartition par sexe</h2>
                  <p className="text-sm text-gray-600">Mâles vs Femelles</p>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={sexeData} 
                    dataKey="value" 
                    nameKey="name"
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {sexeData.map((entry: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} animaux`, "Quantité"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {sexeData.map((item: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cities Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Animaux par ville</h2>
                  <p className="text-sm text-gray-600">Top 8 villes</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {cityData.length} villes au total
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} animaux`, "Quantité"]}
                    labelStyle={{ fontWeight: 'bold', color: '#4b5563' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={COLORS.pink}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breeds Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                  <Dog className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Top races</h2>
                  <p className="text-sm text-gray-600">Chiens et chats</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {totalDogBreeds + totalCatBreeds} races différentes
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...raceChienData, ...raceChatData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} animaux`, "Quantité"]}
                    labelStyle={{ fontWeight: 'bold', color: '#4b5563' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={COLORS.purple}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Health Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vaccination Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Statut de vaccination</h2>
                  <p className="text-sm text-gray-600">Santé des animaux</p>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={vaccinatedData} 
                    dataKey="value" 
                    nameKey="name"
                    cx="50%" 
                    cy="50%" 
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    label={(entry) => `${entry.name}: ${((entry.value / totalAnimals) * 100).toFixed(0)}%`}
                  >
                    {vaccinatedData.map((entry: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} animaux (${((Number(value) / totalAnimals) * 100).toFixed(1)}%)`, "Quantité"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Training Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Statut de dressage</h2>
                  <p className="text-sm text-gray-600">Comportement des animaux</p>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={trainedData} 
                    dataKey="value" 
                    nameKey="name"
                    cx="50%" 
                    cy="50%" 
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    label={(entry) => `${entry.name}: ${((entry.value / totalAnimals) * 100).toFixed(0)}%`}
                  >
                    {trainedData.map((entry: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} animaux (${((Number(value) / totalAnimals) * 100).toFixed(1)}%)`, "Quantité"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}