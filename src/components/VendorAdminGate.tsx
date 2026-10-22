'use client';

import { type ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCurrentLocalAccount } from '@/lib/localAuth';
import { VendorEmailContext } from '@/lib/vendor';

export default function VendorAdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [vendorEmail, setVendorEmail] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    let account = null;
    try {
      account = getCurrentLocalAccount();
    } catch {
      account = null;
    }
    setIsSignedIn(account !== null);
    setVendorEmail(account?.role === 'vendor' ? account.email : null);
    setIsChecking(false);
    if (!account) {
      router.replace('/sign-in');
    }
  }, [router]);

  if (isChecking || !isSignedIn) {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  if (!vendorEmail) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-black text-gray-900">Acesso restrito</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          O painel de gestão está disponível apenas para contas de vendedor iniciadas nesta demonstração.
        </p>
        <Link href="/sign-in" className="mt-6 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600">
          Entrar como vendedor
        </Link>
      </div>
    );
  }

  return <VendorEmailContext.Provider value={vendorEmail}>{children}</VendorEmailContext.Provider>;
}
