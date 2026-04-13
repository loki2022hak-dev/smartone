"use client";
import React from 'react';
import { ShoppingCart, Smartphone, Zap, ShieldCheck } from 'lucide-react';

const products = [
  { id: 1, name: "iPhone 15 Pro Max", price: "52 999 ₴", oldPrice: "59 999 ₴", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800" },
  { id: 2, name: "Samsung S24 Ultra", price: "48 499 ₴", oldPrice: "54 999 ₴", img: "https://images.unsplash.com/photo-1707150170503-455b51296839?q=80&w=800" },
  { id: 3, name: "Google Pixel 8 Pro", price: "36 999 ₴", oldPrice: "42 000 ₴", img: "https://images.unsplash.com/photo-1696429210351-8798e1543781?q=80&w=800" },
  { id: 4, name: "Xiaomi 14 Ultra", price: "44 999 ₴", oldPrice: "49 999 ₴", img: "https://images.unsplash.com/photo-1710578685023-018653639df2?q=80&w=800" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500">
      {/* HEADER */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-black italic tracking-tighter text-blue-500">SMARTONE</div>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-white transition">Каталог</a>
            <a href="#" className="hover:text-white transition">Акції</a>
            <a href="#" className="hover:text-white transition">Контакти</a>
          </div>
          <button className="bg-blue-600 p-3 rounded-full hover:scale-110 transition active:scale-95">
            <ShoppingCart size={20} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
          Elite Device Store
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium mb-10">
          Тільки оригінальна техніка з офіційною гарантією. Преміальний сервіс для тих, хто не звик до компромісів.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(p => (
          <div key={p.id} className="group bg-white/5 border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-all duration-500">
            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square">
              <img src={p.img} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute top-4 left-4 bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">SALE</div>
            </div>
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-2xl font-black text-blue-500">{p.price}</span>
              <span className="text-sm text-gray-500 line-through mb-1">{p.oldPrice}</span>
            </div>
            <button className="w-full bg-white text-black font-black py-4 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors uppercase italic tracking-tighter">
              Купити зараз
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
