'use client';

import React, { useState, useEffect } from 'react';
import { PaymentMethod } from '@/lib/types';
import { formatXOF } from '@/lib/formatters';
import { Phone, ShieldCheck, CheckCircle2, AlertCircle, Loader2, X, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (reference: string) => void;
  paymentMethod: PaymentMethod;
  amount: number;
  phoneNumber: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  paymentMethod,
  amount,
  phoneNumber,
}: PaymentModalProps) {
  const [step, setStep] = useState<'prompt' | 'processing' | 'success'>('prompt');
  const [countdown, setCountdown] = useState(15);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('prompt');
      setCountdown(15);
      setPin('');
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (step === 'processing' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (step === 'processing' && countdown === 0) {
      setStep('success');
      const ref = paymentMethod === 'orange_money' 
        ? `OM-245-${Math.floor(100000 + Math.random() * 900000)}`
        : `MOMO-GW-${Math.floor(10000 + Math.random() * 90000)}`;
      setTimeout(() => {
        onSuccess(ref);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [step, countdown, paymentMethod, onSuccess]);

  if (!isOpen) return null;

  const isOrange = paymentMethod === 'orange_money';
  const isMoMo = paymentMethod === 'momo';
  const isCard = paymentMethod === 'card';

  const handleSimulateApproval = () => {
    setStep('processing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className={`p-6 text-white text-center ${
          isOrange ? 'bg-brand-orange' : isMoMo ? 'bg-amber-500' : 'bg-slate-900'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg">
            {isOrange && 'Orange Money Guiné-Bissau'}
            {isMoMo && 'MTN Mobile Money (MoMo)'}
            {isCard && 'GIM-UEMOA / Cartão Bancário'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Pagamento Seguro de <strong className="text-white font-bold">{formatXOF(amount)}</strong>
          </p>
        </div>

        {/* Step 1: Prompt */}
        {step === 'prompt' && (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900 space-y-1.5">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Confirmação USSD no seu telemóvel</span>
              </p>
              <p className="text-gray-600">
                Uma notificação foi enviada para o seu número da Guiné-Bissau: <strong className="text-gray-900">{phoneNumber || '+245 955 XX XX XX'}</strong>.
              </p>
            </div>

            {/* USSD simulation box */}
            <div className="p-4 rounded-2xl bg-gray-900 text-white space-y-3 font-mono text-xs shadow-inner">
              <div className="text-emerald-400 font-bold flex justify-between">
                <span>{isOrange ? '#144# Orange Money' : '*144# MTN MoMo'}</span>
                <span>GW-XOF</span>
              </div>
              <p className="text-gray-300">
                Deseja autorizar o débito de {formatXOF(amount)} a favor de BissauStore?
              </p>
              <div className="pt-2 border-t border-gray-800">
                <label className="block text-gray-400 text-[11px] mb-1">Digite o seu PIN secreto (Simulado):</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleSimulateApproval}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition flex items-center justify-center gap-2 ${
                  isOrange
                    ? 'bg-brand-orange hover:bg-orange-600'
                    : isMoMo
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-slate-900 hover:bg-black'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Confirmar & Autorizar Pagamento</span>
              </button>
              <button
                onClick={onClose}
                className="text-xs text-gray-500 hover:text-gray-700 py-1"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 'processing' && (
          <div className="p-10 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-brand-orange animate-spin" />
              <span className="absolute font-mono font-bold text-xs text-gray-700">{countdown}s</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">A aguardar confirmação da rede...</h4>
              <p className="text-xs text-gray-500 mt-1">
                A validar a transação com a operadora em Bissau. Por favor, aguarde.
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-brand-orange h-full transition-all duration-1000"
                style={{ width: `${((15 - countdown) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Pagamento Aprovado!</h4>
              <p className="text-xs text-gray-500 mt-1">
                O seu pagamento foi debitado com sucesso e o pedido está a ser processado.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
