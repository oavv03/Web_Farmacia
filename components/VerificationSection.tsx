
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface VerificationSectionProps {
  cart: CartItem[];
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'card' | 'local' | null;

const EMAILJS_PUBLIC_KEY = "kiFyaTq9fgifka-e7";
const EMAILJS_SERVICE_ID = "service_eozf46x";
const EMAILJS_TEMPLATE_ID = "template_0x7enqs";

const VerificationSection: React.FC<VerificationSectionProps> = ({ cart, onSuccess, onCancel }) => {
  const [step, setStep] = useState<'email' | 'code' | 'payment' | 'card' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    // @ts-ignore
    if (window.emailjs) {
      // @ts-ignore
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const generateOrderId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'FS-';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError(null);
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);

    try {
      // @ts-ignore
      if (window.emailjs) {
        // @ts-ignore
        const response = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: email,
          code: newCode,
          message: `Su código de validación para FarmaSalud es: ${newCode}`
        });
        if (response.status === 200) setStep('code');
        else throw new Error("Error de servidor");
      }
    } catch (err) {
      setError("No se pudo enviar el código. Reintente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === generatedCode) {
      setError(null);
      setStep('payment');
    } else {
      setError("Código incorrecto.");
    }
  };

  const sendConfirmationReceipt = async (method: PaymentMethod, currentOrderId: string) => {
    setIsLoading(true);
    const itemsSummary = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const bodyMessage = method === 'card' 
      ? `Pago confirmado por ${total.toFixed(2)}€. Su pedido ${currentOrderId} está en camino.`
      : `Reserva confirmada. Presente el código ${currentOrderId} en caja. Productos: ${itemsSummary}. Total a pagar: ${total.toFixed(2)}€`;

    try {
      // @ts-ignore
      if (window.emailjs) {
        // @ts-ignore
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: email,
          code: currentOrderId, // Reutilizamos el campo code para el ID de pedido en el template
          message: bodyMessage
        });
      }
    } catch (err) {
      console.error("Error enviando recibo:", err);
    } finally {
      setIsLoading(false);
      setStep('success');
    }
  };

  const handleSelectPayment = async (method: PaymentMethod) => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setPaymentMethod(method);
    
    if (method === 'card') {
      setStep('card');
    } else {
      // Proceso de reserva local
      await sendConfirmationReceipt('local', newOrderId);
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de pasarela de pago
    setTimeout(async () => {
      await sendConfirmationReceipt('card', orderId);
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-fade-in">
        {/* Recibo Estilo Farmacia */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
          <div className="bg-emerald-500 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest">
              {paymentMethod === 'card' ? 'Pago Confirmado' : 'Reserva Lista'}
            </h2>
            <p className="text-emerald-100 text-sm mt-1">FarmaSalud - Tu bienestar es nuestra prioridad</p>
          </div>

          <div className="p-8 md:p-12 space-y-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Referencia de Pedido</p>
                <p className="text-3xl font-mono font-black text-slate-900">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fecha</p>
                <p className="font-bold text-slate-700">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumen de Productos</p>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{item.name}</span>
                    <span className="text-xs text-slate-400">Cant: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-600">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="font-black text-slate-900 uppercase text-xs">Total {paymentMethod === 'local' ? 'a Pagar' : 'Pagado'}</span>
                <span className="text-3xl font-black text-emerald-600 font-mono">{total.toFixed(2)}€</span>
              </div>
            </div>

            {paymentMethod === 'local' && (
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex gap-4">
                <div className="shrink-0 text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-900 font-bold text-sm">Información de Recogida</p>
                  <p className="text-amber-700 text-xs leading-relaxed mt-1">Presente este ticket o su código <span className="font-bold">{orderId}</span> en caja para retirar sus medicamentos. La reserva expira en 48h.</p>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center py-4 border-t border-dashed border-slate-200">
              <div className="bg-slate-100 p-4 rounded-xl mb-4">
                {/* Placeholder para un código de barras visual */}
                <div className="w-48 h-12 flex gap-1 items-center">
                   {[2,1,3,1,4,2,1,3,2,4,1,2,3].map((w, i) => (
                     <div key={i} className="bg-slate-800 h-full" style={{ width: `${w}px` }}></div>
                   ))}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-bold tracking-[0.5em] uppercase">Gracias por confiar en FarmaSalud</p>
            </div>
          </div>

          <div className="p-8 pt-0">
            <button onClick={onSuccess} className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-sm">
              Volver a la Farmacia
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex flex-col items-center justify-center text-white">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl font-bold animate-pulse">Procesando tu pedido...</p>
          <p className="text-slate-400 text-sm mt-2">Estamos guardando tu reserva de forma segura</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Tu Pedido</h3>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.quantity}x {item.name}</span>
                <span className="font-bold">{ (item.price * item.quantity).toFixed(2) }€</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-lg">Total</span>
            <span className="text-3xl font-black text-emerald-600 font-mono">{total.toFixed(2)}€</span>
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900 text-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          
          {step === 'email' && (
            <div className="animate-fade-in relative z-10">
              <h2 className="text-4xl font-bold mb-3">Identificación</h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">Necesitamos validar su correo para enviar el comprobante de reserva.</p>
              <form onSubmit={handleSendEmail} className="space-y-6">
                <input 
                  type="email" required placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-white text-lg outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl shadow-xl shadow-emerald-500/20 text-lg transition-all">
                   Enviar Código
                </button>
              </form>
            </div>
          )}

          {step === 'code' && (
            <div className="animate-fade-in relative z-10">
              <h2 className="text-4xl font-bold mb-3">Verifique su Email</h2>
              <p className="text-slate-400 mb-10 text-lg">Le hemos enviado una clave de 6 dígitos a <span className="text-emerald-400">{email}</span></p>
              <form onSubmit={handleVerifyCode} className="space-y-8">
                <input 
                  type="text" maxLength={6} required placeholder="000000"
                  className="w-full bg-white/5 border border-white/20 rounded-3xl py-8 text-white text-center text-6xl tracking-[0.3em] outline-none focus:border-emerald-500 font-mono font-black"
                  value={inputCode} onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                />
                {error && <p className="text-red-400 text-center font-bold">{error}</p>}
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl shadow-xl text-lg transition-all">
                  Validar Código
                </button>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div className="animate-fade-in relative z-10">
              <h2 className="text-4xl font-bold mb-3">Finalizar Compra</h2>
              <p className="text-slate-400 mb-10 text-lg">Elija cómo desea obtener sus productos.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => handleSelectPayment('card')}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-emerald-500 transition-all group text-left border-b-4 border-b-transparent hover:border-b-emerald-600"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Pago Online</h4>
                  <p className="text-slate-500 group-hover:text-emerald-100 text-sm">Pague con tarjeta y reciba un ticket digital inmediato.</p>
                </button>

                <button 
                  onClick={() => handleSelectPayment('local')}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-blue-500 transition-all group text-left border-b-4 border-b-transparent hover:border-b-blue-600"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Recogida en Local</h4>
                  <p className="text-slate-500 group-hover:text-blue-100 text-sm">Reserve sus artículos y pague al recoger en la farmacia.</p>
                </button>
              </div>
            </div>
          )}

          {step === 'card' && (
            <div className="animate-fade-in relative z-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <button onClick={() => setStep('payment')} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                Datos de Pago
              </h2>
              <form onSubmit={handleCardSubmit} className="space-y-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-3xl mb-8 border border-white/5 shadow-2xl font-mono">
                   <div className="flex justify-between items-start mb-12 uppercase text-[10px] tracking-widest text-emerald-400 font-black">
                      <span>Tarjeta de Salud</span>
                      <div className="w-10 h-7 bg-amber-400/30 rounded border border-amber-400/40"></div>
                   </div>
                   <p className="text-2xl tracking-[0.2em] text-white/90 mb-8">
                     {cardData.number || "**** **** **** ****"}
                   </p>
                   <div className="flex justify-between text-[11px] uppercase tracking-wider">
                     <div className="flex flex-col">
                       <span className="text-white/30 mb-1 text-[8px]">Titular</span>
                       <span className="font-bold">{cardData.name || "NOMBRE APELLIDO"}</span>
                     </div>
                     <div className="flex flex-col text-right">
                       <span className="text-white/30 mb-1 text-[8px]">Vence</span>
                       <span className="font-bold">{cardData.expiry || "MM/YY"}</span>
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" required placeholder="Nº de Tarjeta"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-emerald-500"
                    onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\d{4}(?=.)/g, '$& ')})}
                    maxLength={19}
                  />
                  <input 
                    type="text" required placeholder="Titular"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-emerald-500"
                    onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                  />
                  <input 
                    type="text" required placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-emerald-500"
                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                    maxLength={5}
                  />
                  <input 
                    type="password" required placeholder="CVV"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-emerald-500"
                    maxLength={3}
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl shadow-xl text-lg transition-all mt-4">
                  Confirmar Pago Online
                </button>
              </form>
            </div>
          )}

          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSection;
