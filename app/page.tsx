"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  PawPrint, 
  Dog, 
  BarChart3, 
  Activity, 
  Upload,
  Heart,
  Users,
  Shield,
  Globe,
  Smartphone,
  CheckCircle,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  Package,
  ChevronRight,
  Search,
  Home as HomeIcon
} from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { 
      id: "all", 
      name: "Liste des Animaux", 
      icon: PawPrint, 
      description: "Parcourez tous nos animaux disponibles pour adoption",
      color: "bg-gradient-to-br from-[#549aeb] to-[#3a7bd5]",
      link: "/animaux",
    },
    { 
      id: "dogs", 
      name: "Dashboard Animaux", 
      icon: BarChart3, 
      description: "Analytics et statistiques détaillées sur nos animaux",
      color: "bg-gradient-to-br from-[#dc559c] to-[#c44586]",
      link: "/dashboard",
    },
    { 
      id: "cats", 
      name: "Monitoring Logs", 
      icon: Activity, 
      description: "Surveillance et visualisation des logs système",
      color: "bg-gradient-to-br from-[#6C63FF] to-[#544bd9]",
      link: "/dashboard_kibana",
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
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#549aeb]/10 via-white to-[#dc559c]/10" />
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
              <span className="text-sm font-medium">1ère plateforme d'animalerie en Tunisie</span>
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
              
              <Link href="/animaux">
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
      {/* Modules Section - Version simplifiée */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Pack AniMa</span>
            </div>
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
  Découvrez notre <span className="bg-gradient-to-r from-[#549aeb] to-[#dc559c] bg-clip-text text-transparent">écosystème complet</span>
</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
  Deux modules puissants et complémentaires conçus pour offrir une expérience 
  animalière complète. De la recherche du compagnon idéal à l'accès aux meilleurs 
  produits, notre écosystème répond à tous vos besoins.
</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Module AniMatch - Simplifié */}
            <Link href="/animatch" className="group">
              <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden 
                            shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
       
                
                <div className="p-8 flex flex-col flex-grow">
                  {/* Logo centré en haut - TRÈS GRAND */}
                  <div className="flex justify-center mb-6">
                    <div className="w-59 h-29 relative">
                      <Image
                        src="/animatch.png"
                        alt="AniMatch Logo"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 400px) 150vw, 456px"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Titre et badge */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#8B4789]/10 text-[#8B4789] 
                                  px-3 py-1 rounded-full mb-3">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-semibold">AniMatch</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Module de Matching
                    </h3>
                    
                    <p className="text-gray-600">
                      Trouvez l'harmonie parfaite entre animaux et familles
                    </p>
                  </div>
                  
                  {/* Mots-clés simplifiés */}
                  <div className="flex justify-center gap-2 mb-8">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#8B4789]/10 
                                   text-[#8B4789] text-sm rounded-lg">
                      <Users className="w-3 h-3" />
                      Connexion
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#8B4789]/10 
                                   text-[#8B4789] text-sm rounded-lg">
                      <Heart className="w-3 h-3" />
                      Affinité
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#549aeb]/10 
                                   text-[#549aeb] text-sm rounded-lg">
                      <ShieldCheck className="w-3 h-3" />
                      Harmonie
                    </span>
                  </div>
                  
                  {/* Description courte */}
                  <div className="mb-8 text-center flex-grow">
                    <p className="text-gray-700">
                      Système intelligent de mise en relation pour des adoptions réussies
                    </p>
                  </div>
                  
                  {/* Bouton centré */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-center">
                    <button className="group inline-flex items-center gap-2 bg-[#8B4789] text-white 
                                     px-6 py-3 rounded-lg hover:bg-[#7a3a78] transition-colors">
                      <span className="font-semibold">Découvrir AniMatch</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>

                      {/* Module AniMarket - Simplifié */}
            <Link href="/animarket" className="group">
              <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden 
                            shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
             
                
                <div className="p-8 flex flex-col flex-grow">
                  {/* Logo centré en haut - TRÈS GRAND */}
                  <div className="flex justify-center mb-6">
                    <div className="w-53 h-39 relative">
                      <Image
                        src="/animarket.png"
                        alt="AniMarket Logo"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 800px) 780vw, 756px"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Titre et badge */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#7CB342]/10 text-[#7CB342] 
                                  px-3 py-1 rounded-full mb-3">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm font-semibold">AniMarket</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Marketplace
                    </h3>
                    
                    <p className="text-gray-600">
                      Boutique complète pour vos produits animaliers
                    </p>
                  </div>
                  
                  {/* Mots-clés simplifiés */}
                  <div className="flex justify-center gap-2 mb-8">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7CB342]/10 
                                   text-[#7CB342] text-sm rounded-lg">
                      <ShoppingCart className="w-3 h-3" />
                      Commerce
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7CB342]/10 
                                   text-[#7CB342] text-sm rounded-lg">
                      <Users className="w-3 h-3" />
                      Échange
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#549aeb]/10 
                                   text-[#549aeb] text-sm rounded-lg">
                      <Package className="w-3 h-3" />
                      Accessibilité
                    </span>
                  </div>
                  
                  {/* Description courte */}
                  <div className="mb-8 text-center flex-grow">
                    <p className="text-gray-700">
                      Marketplace sécurisée pour acheter, vendre et échanger des produits
                    </p>
                  </div>
                  
                  {/* Bouton centré */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-center">
                    <button className="group inline-flex items-center gap-2 bg-[#7CB342] text-white 
                                     px-6 py-3 rounded-lg hover:bg-[#6ba032] transition-colors">
                      <span className="font-semibold">Découvrir AniMarket</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
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