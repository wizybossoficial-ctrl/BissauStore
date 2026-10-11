export type LocalAccountRole = 'client' | 'vendor';

export interface LocalAccount {
  email: string;
  fullName: string;
  passwordHash: string;
  phone: string;
  role: LocalAccountRole;
  neighborhood?: string;
  productCategory?: string;
  storeName?: string;
}

type NewLocalAccount = Omit<LocalAccount, 'passwordHash'> & { password: string };

const accountsStorageKey = 'bissau_store_local_accounts';
const sessionStorageKey = 'bissau_store_local_session';

function getStoredAccounts(): LocalAccount[] {
  const value = localStorage.getItem(accountsStorageKey);
  if (!value) {
    return [];
  }

  const accounts: unknown = JSON.parse(value);
  if (!Array.isArray(accounts)) {
    throw new Error('Os dados locais das contas são inválidos.');
  }

  return accounts as LocalAccount[];
}

async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function createLocalAccount({ password, email, ...account }: NewLocalAccount): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getStoredAccounts();

  if (accounts.some((existingAccount) => existingAccount.email === normalizedEmail)) {
    throw new Error('Já existe uma conta com este e-mail neste navegador.');
  }

  const newAccount: LocalAccount = {
    ...account,
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
  };

  localStorage.setItem(accountsStorageKey, JSON.stringify([...accounts, newAccount]));
  localStorage.setItem(sessionStorageKey, newAccount.email);
}

export async function signInLocally(email: string, password: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  const account = getStoredAccounts().find(
    (storedAccount) => storedAccount.email === normalizedEmail && storedAccount.passwordHash === passwordHash
  );

  if (!account) {
    throw new Error('E-mail ou palavra-passe incorretos.');
  }

  localStorage.setItem(sessionStorageKey, account.email);
}

export function getCurrentLocalAccount(): LocalAccount | null {
  const email = localStorage.getItem(sessionStorageKey);
  if (!email) {
    return null;
  }

  const account = getStoredAccounts().find((storedAccount) => storedAccount.email === email);
  if (!account) {
    localStorage.removeItem(sessionStorageKey);
    return null;
  }

  return account;
}
