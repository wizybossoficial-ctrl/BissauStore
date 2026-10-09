'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
  const { language } = useStore();

  return (
    <footer className="bg-stone-900 text-gray-300 border-t border-stone-800 mt-20">
      {/* Guinea-Bissau Flag Colored Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-brand-red"></div>
        <div className="w-1/3 bg-brand-yellow"></div>
        <div className="w-1/3 bg-brand-green"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-green flex items-center justify-center text-white font-black text-lg">
                B
              </div>
              <span className="font-bold text-xl text-white">Bissau<span className="text-brand-orange">Store</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              O primeiro mercado e-commerce dedicado à Guiné-Bissau. Produtos de qualidade com entregas rápidas na porta da sua casa ou empresa em Bissau.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/245955000000?text=Olá%20BissauStore,%20gostaria%20de%20tirar%20uma%20dúvida"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atendimento WhatsApp (+245)</span>
              </a>
            </div>
          </div>

          {/* Payment Methods in Bissau */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Pagamentos Aceites</h4>
            <p className="text-xs text-gray-400">Pague com facilidade utilizando:</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-800/80 border border-stone-700">
                <div className="w-4 h-4 rounded-full bg-brand-orange"></div>
                <span className="text-xs font-medium text-white">Orange Money Guiné-Bissau</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-800/80 border border-stone-700">
                <div className="w-4 h-4 rounded-full bg-brand-yellow"></div>
                <span className="text-xs font-medium text-white">MTN Mobile Money (MoMo)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-800/80 border border-stone-700">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-white">Cartões GIM-UEMOA / Visa</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-800/80 border border-stone-700">
                <Truck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-white">Pagamento na Entrega (Bissau)</span>
              </div>
            </div>
          </div>

          {/* Bairros Served */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Entregas em Bissau</h4>
            <p className="text-xs text-gray-400">Cobrimos todos os setores:</p>
            <ul className="text-xs text-gray-400 space-y-1.5 grid grid-cols-2 gap-x-2">
              <li>• Bandim Mercado</li>
              <li>• Santa Luzia</li>
              <li>• Bissau Velho</li>
              <li>• Cupilon</li>
              <li>• Bairro Militar</li>
              <li>• Cuntum Madina</li>
              <li>• Aeroporto / Brá</li>
              <li>• Safim & Prabis</li>
            </ul>
          </div>

          {/* Contact and Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto & Suporte</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                <span>Avenida dos Combatentes da Liberdade da Pátria, Bissau</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                <span>+245 955 00 00 00 / 966 00 00 00</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span>apoio@bissaustore.gw</span>
              </p>
            </div>
            <div className="pt-2 text-[11px] text-gray-500">
              Moeda padrão: <strong className="text-gray-300">Franco CFA (XOF)</strong>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} BissauStore. Todos os direitos reservados. Guiné-Bissau.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-gray-400 transition">Painel Administrativo</Link>
            <span>•</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Servidor Seguro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
