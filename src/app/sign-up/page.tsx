'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, LockKeyhole, Mail, Phone, Store, UserRound } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { createLocalAccount } from '@/lib/localAuth';

type AccountType = 'client' | 'vendor';

const inputClassName = 'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10';

export default function SignUpPage() {
  const { t } = useStore();
  const [accountType, setAccountType] = useState<AccountType>('client');
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationOrCategory, setLocationOrCategory] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await createLocalAccount({
        role: accountType,
        fullName,
        email,
        password,
        phone,
        ...(accountType === 'vendor'
          ? { storeName, productCategory: locationOrCategory }
          : { neighborhood: locationOrCategory }),
      });

      setSuccess(t.account.accountCreated);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.account.accountCreationError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-orange-50/70 to-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-brand-orange">
          <ArrowLeft className="h-4 w-4" />
          {t.account.backHome}
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-orange-900/5">
          <div className="p-6 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">BissauStore .GW</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">{t.account.signUpTitle}</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">{t.account.signUpSubtitle}</p>

            <form onSubmit={handleSubmit}>
              <fieldset className="mt-7 grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">{t.account.signUpTitle}</legend>
                {([
                  { type: 'client' as const, title: t.account.client, description: t.account.clientDescription, Icon: UserRound },
                  { type: 'vendor' as const, title: t.account.vendor, description: t.account.vendorDescription, Icon: Store },
                ]).map(({ type, title, description, Icon }) => {
                  const selected = accountType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setAccountType(type)}
                      className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        selected ? 'border-brand-orange bg-orange-50 ring-2 ring-brand-orange/15' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="block pr-5">
                        <span className="block text-sm font-bold text-gray-900">{title}</span>
                        <span className="mt-1 block text-xs leading-5 text-gray-500">{description}</span>
                      </span>
                      {selected && <Check className="absolute right-3 top-3 h-4 w-4 text-brand-orange" />}
                    </button>
                  );
                })}
              </fieldset>

              <div className="mt-7 grid gap-x-4 gap-y-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.fullName}</span>
                  <input type="text" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required placeholder={accountType === 'vendor' ? 'Ex.: Amadu Sané' : 'Ex.: Maria Gomes'} className={inputClassName} />
                </label>

                {accountType === 'vendor' && (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.storeName}</span>
                    <span className="relative block">
                      <Store className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input type="text" autoComplete="organization" value={storeName} onChange={(event) => setStoreName(event.target.value)} required placeholder="Ex.: Loja de Bissau" className={`${inputClassName} pl-10`} />
                    </span>
                  </label>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.email}</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="nome@exemplo.com" className={`${inputClassName} pl-10`} />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.phone}</span>
                  <span className="relative block">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required placeholder="+245 9xx xx xx" className={`${inputClassName} pl-10`} />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">{accountType === 'vendor' ? t.account.category : t.account.neighborhood}</span>
                  <input type="text" value={locationOrCategory} onChange={(event) => setLocationOrCategory(event.target.value)} required placeholder={accountType === 'vendor' ? 'Ex.: Moda, alimentação' : 'Ex.: Bairro de Ajuda'} className={inputClassName} />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">{t.account.password}</span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className={`${inputClassName} pl-10`} />
                  </span>
                </label>
              </div>

              <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-900">{t.account.localOnlyNotice}</p>
              {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              {success && <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{success}</p>}

              <button type="submit" disabled={isSubmitting} className="mt-5 w-full rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300">
                {isSubmitting ? t.account.creatingAccount : t.account.signUpAction}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              {t.account.haveAccount}{' '}
              <Link href="/sign-in" className="font-bold text-brand-orange hover:underline">{t.nav.signIn}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
