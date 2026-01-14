
import React from 'react';
import { AppSection } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, cartCount, onOpenCart }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate(AppSection.HOME)}
        >
          <div className="bg-emerald-500 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.641.32a2 2 0 01-1.724 0l-.641-.32a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.924 1.385a2 2 0 00.324 2.535l.848.848a2 2 0 002.535.324l1.385-.924a2 2 0 011.022-.547l2.387-.477a6 6 0 013.86.517l.641.32a2 2 0 001.724 0l.641-.32a6 6 0 013.86-.517l2.387.477a2 2 0 011.022.547l.924 1.385a2 2 0 01-.324 2.535l-.848.848a2 2 0 01-2.535.324l-1.385-.924" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">FarmaSalud</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button 
            onClick={() => onNavigate(AppSection.HOME)}
            className={`transition-colors hover:text-emerald-500 ${activeSection === AppSection.HOME ? 'text-emerald-600' : ''}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavigate(AppSection.CATALOG)}
            className={`transition-colors hover:text-emerald-500 ${activeSection === AppSection.CATALOG ? 'text-emerald-600' : ''}`}
          >
            Catálogo
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-600 hover:text-emerald-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
