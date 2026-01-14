
import React from 'react';
import { AppSection, Product } from '../types';
import { PRODUCTS } from '../constants';

interface HomeSectionProps {
  onNavigate: (section: AppSection) => void;
  onAddToCart: (product: Product) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onAddToCart }) => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section con imagen de alta calidad */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-70"
            alt="Interior de Farmacia Profesional"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Bienestar a tu <span className="text-emerald-400">Alcance</span>
            </h2>
            <p className="text-slate-100 text-xl md:text-2xl mb-10 leading-relaxed font-light">
              FarmaSalud: La farmacia líder en cuidado personal y atención farmacéutica de confianza. Envíos en 24h a toda la península.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => onNavigate(AppSection.CATALOG)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/40 flex items-center gap-3 text-lg"
              >
                Comprar Ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Nuestros Servicios</span>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Comprometidos con tu Salud</h2>
            <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transform group-hover:-translate-y-2 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Calidad Certificada</h3>
              <p className="text-slate-500 leading-relaxed text-lg">Trabajamos exclusivamente con laboratorios de primer nivel para garantizar la eficacia de cada producto.</p>
            </div>
            
            <div className="group text-center">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transform group-hover:-translate-y-2 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Expertos a tu Lado</h3>
              <p className="text-slate-500 leading-relaxed text-lg">Nuestro equipo de farmacéuticos está disponible para resolver tus dudas de forma personalizada.</p>
            </div>
            
            <div className="group text-center">
              <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transform group-hover:-translate-y-2 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 8h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Entrega Inmediata</h3>
              <p className="text-slate-500 leading-relaxed text-lg">Entendemos la urgencia de tu salud. Por eso, optimizamos nuestros procesos para que recibas tu pedido hoy mismo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Lo Más Buscado</h2>
              <p className="text-slate-500 text-xl">Nuestra selección esencial para el cuidado diario de tu familia.</p>
            </div>
            <button 
              onClick={() => onNavigate(AppSection.CATALOG)}
              className="text-emerald-600 font-extrabold flex items-center gap-3 hover:gap-5 transition-all bg-white px-8 py-4 rounded-3xl shadow-lg hover:shadow-xl border border-slate-100 text-lg group"
            >
              Ver Catálogo Completo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured.map(product => (
              <div key={product.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-slate-100 flex flex-col">
                <div className="relative h-80 overflow-hidden bg-slate-200">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/95 backdrop-blur-xl text-xs uppercase tracking-[0.2em] font-black px-6 py-3 rounded-full text-emerald-600 shadow-xl">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{product.name}</h3>
                  <p className="text-slate-500 text-lg mb-8 line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-4xl font-black text-slate-900">{product.price.toFixed(2)}€</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="bg-slate-900 text-white p-5 rounded-3xl hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/30 active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
