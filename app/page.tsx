"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  PawPrint, 
  Dog, 
  Cat, 
  BarChart3, 
  Activity, 
  FileText,
  Upload,
  Heart,
  Users,
  Search,
  Home as HomeIcon,
  Shield,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Globe,
  Smartphone
} from "lucide-react";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { 
      id: "all", 
      name: "Liste des Animaux", 
      icon: PawPrint, 
      description: "Parcourez tous nos animaux disponibles pour adoption",
      color: "bg-gradient-to-br from-[#549aeb] to-[#3a7bd5]",
      link: "/animals",
      stats: "500+ animaux"
    },
    { 
      id: "dogs", 
      name: "Dashboard Animaux", 
      icon: BarChart3, 
      description: "Analytics et statistiques détaillées sur nos animaux",
      color: "bg-gradient-to-br from-[#dc559c] to-[#c44586]",
      link: "/dashboard/animals",
      stats: "Stats en temps réel"
    },
    { 
      id: "cats", 
      name: "Monitoring Logs", 
      icon: Activity, 
      description: "Surveillance et visualisation des logs système",
      color: "bg-gradient-to-br from-[#6C63FF] to-[#544bd9]",
      link: "/dashboard/logs",
      stats: "Sécurité 24/7"
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Sécurisé et Fiable",
      description: "Protection des données et infrastructure robuste"
    },
    {
      icon: Globe,
      title: "Accessible Partout",
      description: "Disponible sur tous vos appareils"
    },
    {
      icon: Smartphone,
      title: "Interface Moderne",
      description: "Design intuitif et facile à utiliser"
    },
    {
      icon: CheckCircle,
      title: "Support Complet",
      description: "Assistance technique disponible"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Design moderne */}
      <div className="relative overflow-hidden">
        {/* Background gradient avec pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#549aeb]/10 via-white to-[#dc559c]/10" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#549aeb] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#dc559c] blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#549aeb]/10 to-[#dc559c]/10 
                          text-[#549aeb] px-4 py-2 rounded-full mb-6 border border-[#549aeb]/20">
              <PawPrint className="w-4 h-4" />
<span className="text-sm font-medium">1ère plateforme d’animalerie en Tunisie</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez votre{" "}
              <span className="bg-gradient-to-r from-[#549aeb] to-[#dc559c] bg-clip-text text-transparent">
                compagnon idéal
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              AniMa connecte les animaux abandonnés avec des familles aimantes.
              Rejoignez notre communauté et changez une vie aujourd'hui.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="group relative flex items-center gap-3 bg-gradient-to-r from-[#549aeb] to-[#4788d9] 
                                text-white font-semibold py-4 px-8 rounded-xl 
                                hover:shadow-2xl hover:shadow-[#549aeb]/30 hover:scale-[1.02]
                                transition-all duration-300 transform">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <Upload className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Commencer maintenant</span>
                  <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link href="/animals">
                <button className="group flex items-center gap-2 bg-white text-gray-700 
                                border-2 border-gray-200 font-semibold py-4 px-8 rounded-xl 
                                hover:border-[#549aeb] hover:text-[#549aeb]
                                transition-all duration-300">
                  <Dog className="w-5 h-5" />
                  <span>Voir les animaux</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section - Design moderne */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-[#549aeb]">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer et adopter des animaux
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.link}>
                <div className="group relative bg-white rounded-2xl p-8 shadow-lg 
                              hover:shadow-2xl hover:shadow-[#549aeb]/20 transition-all duration-300
                              border border-gray-100 hover:border-[#549aeb]/30">
                  
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-5 
                                transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Icon container */}
                  <div className={`${category.color} w-14 h-14 rounded-xl flex items-center 
                                justify-center text-white mb-6 relative`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#549aeb] 
                               transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <span className="font-medium">{category.stats}</span>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center text-[#549aeb] font-medium">
                    <span>Accéder au service</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md 
                                          transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#549aeb]/10 to-[#dc559c]/10 
                                flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#549aeb]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#549aeb] to-[#dc559c] rounded-3xl 
                        p-12 text-center overflow-hidden">
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Prêt à faire la différence ?
              </h3>
              
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de personnes qui ont trouvé leur compagnon idéal.
                Commencez votre parcours d'adoption dès maintenant.
              </p>
              
              <Link href="/upload">
                <button className="inline-flex items-center gap-3 bg-white text-[#549aeb] 
                                 font-semibold py-4 px-10 rounded-xl 
                                 hover:bg-gray-100 hover:scale-[1.02] 
                                 transition-all duration-300 shadow-2xl">
                  <Upload className="w-5 h-5" />
                  <span>Commencer avec l'Upload</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;