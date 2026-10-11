'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LockKeyhole, Mail, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { signInLocally } from '@/lib/localAuth';

export default function SignInPage() {
  const { t } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signInLocally(email, password);
      router.push('/');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.account.signInError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-orange-50/70 to-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-brand-orange">
          <ArrowLeft className="h-4 w-4" />
          {t.account.backHome}
        </Link>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-orange-900/5 sm:p-9">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-brand-orange">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">{t.account.signInTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">{t.account.signInSubtitle}</p>

          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-900">{t.account.localOnlyNotice}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.email}</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="nome@exemplo.com" className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10" />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.password}</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10" />
              </span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300">
              {isSubmitting ? t.account.signingIn : t.account.signInAction}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t.account.noAccount}{' '}
            <Link href="/sign-up" className="font-bold text-brand-orange hover:underline">{t.nav.createAccount}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
