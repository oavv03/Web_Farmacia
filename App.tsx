
import React, { useState, useMemo } from 'react';
import { AppSection, Product, CartItem } from './types';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import CatalogSection from './components/CatalogSection';
import VerificationSection from './components/VerificationSection';
import CartModal from './components/CartModal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveSection(AppSection.VERIFICATION);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow pt-20 pb-12">
        {activeSection === AppSection.HOME && <HomeSection onNavigate={setActiveSection} onAddToCart={addToCart} />}
        {activeSection === AppSection.CATALOG && <CatalogSection onAddToCart={addToCart} />}
        {activeSection === AppSection.VERIFICATION && (
          <VerificationSection 
            cart={cart} 
            onSuccess={() => {
              clearCart();
              setActiveSection(AppSection.HOME);
            }} 
            onCancel={() => setActiveSection(AppSection.CATALOG)}
          />
        )}
      </main>

      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">FarmaSalud</h3>
            <p className="text-slate-400">Tu bienestar es nuestra prioridad. Atención personalizada y productos de calidad.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Secciones</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveSection(AppSection.HOME)}>Inicio</button></li>
              <li><button onClick={() => setActiveSection(AppSection.CATALOG)}>Productos</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-slate-400 text-sm">Calle Salud 123, Madrid, España</p>
            <p className="text-slate-400 text-sm">Tel: +34 900 000 000</p>
            <p className="text-emerald-400 text-sm mt-2">Abierto 24/7</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2024 FarmaSalud. Todos los derechos reservados.
        </div>
      </footer>

      {isCartOpen && (
        <CartModal 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart} 
          onUpdate={updateQuantity}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default App;
