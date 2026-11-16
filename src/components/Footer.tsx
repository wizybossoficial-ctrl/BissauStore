'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-gray-300 border-t border-stone-800 mt-20">
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-brand-red"></div>
        <div className="w-1/3 bg-brand-yellow"></div>
        <div className="w-1/3 bg-brand-green"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-green flex items-center justify-center text-white font-black text-lg">
                B
              </div>
              <span className="font-bold text-xl text-white">Bissau<span className="text-brand-orange">Store</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Um catálogo de produtos e lojas da Guiné-Bissau. Explore as ofertas e contacte diretamente os vendedores para saber mais.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Explorar</h4>
            <Link href="/products" className="block text-xs text-gray-400 hover:text-white transition">Catálogo de Produtos</Link>
            <Link href="/admin" className="block text-xs text-gray-400 hover:text-white transition">Painel do Vendedor</Link>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h4>
            <a
              href="https://wa.me/245955000000?text=Olá%20BissauStore,%20gostaria%20de%20saber%20mais%20sobre%20um%20produto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-white transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              WhatsApp: +245 955 00 00
            </a>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <Mail className="w-3.5 h-3.5" />
              apoio@bissaustore.gw
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} BissauStore. Todos os direitos reservados. Guiné-Bissau.</p>
          <span className="text-emerald-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Catálogo independente
          </span>
        </div>
      </div>
    </footer>
  );
}
