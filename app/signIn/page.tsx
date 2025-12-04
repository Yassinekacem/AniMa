"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
         
          
          <div className="p-6 md:p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/Logo1.png" 
                alt="AniMa Logo" 
                width={160} 
                height={70} 
                className="w-40"
                priority
              />
            </div>

            {/* Titre */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Content de vous revoir !
              </h1>
              <p className="text-gray-600 text-sm">
                Connectez-vous à votre compte
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-[#549aeb] transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg 
                             focus:border-[#549aeb] focus:ring-1 focus:ring-[#549aeb]
                             focus:outline-none transition-all bg-white"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-[#549aeb] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg 
                             focus:border-[#549aeb] focus:ring-1 focus:ring-[#549aeb]
                             focus:outline-none transition-all bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 
                             text-gray-400 hover:text-[#549aeb] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 border border-gray-300 rounded 
                                  peer-checked:border-[#549aeb] peer-checked:bg-[#549aeb]
                                  transition-colors flex items-center justify-center">
                      <svg 
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-600">Se souvenir de moi</span>
                </label>
                <Link
                  href="#"
                  className="text-[#dc559c] hover:text-[#c94a8a] 
                           transition-colors hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#549aeb] to-[#4788d9] 
                         text-white font-semibold py-3 rounded-lg 
                         transition-all shadow hover:shadow-md 
                         hover:from-[#4788d9] hover:to-[#3a76c7]"
              >
                Se connecter
              </button>
            </form>

            {/* Séparateur */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-gray-500 text-xs font-medium">
                    ou continuer avec
                  </span>
                </div>
              </div>
            </div>

            {/* Connexion sociale */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-300 
                         rounded-lg py-2.5 hover:border-[#549aeb]/30 hover:bg-[#549aeb]/5 
                         transition-all bg-white text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700">
                  Google
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-300 
                         rounded-lg py-2.5 hover:border-[#dc559c]/30 hover:bg-[#dc559c]/5 
                         transition-all bg-white text-sm"
              >
                <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-medium text-gray-700">
                  Facebook
                </span>
              </button>
            </div>

            {/* Lien d'inscription */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                Vous n'avez pas de compte ?{' '}
                <Link
                  href="/sign-up"
                  className="font-semibold text-[#dc559c] hover:text-[#c94a8a] 
                           transition-colors hover:underline"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Note de bas de page */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            En vous connectant, vous acceptez nos{' '}
            <Link href="#" className="text-[#549aeb] hover:underline">
              Conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link href="#" className="text-[#549aeb] hover:underline">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;