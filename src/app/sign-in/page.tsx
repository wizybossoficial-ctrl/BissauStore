import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
      <h1 className="text-2xl font-black text-gray-900">Sign in</h1>
      <p className="text-sm text-gray-500">Sign-in is coming soon.</p>
      <Link href="/" className="text-sm font-bold text-brand-orange hover:underline">
        Back to home
      </Link>
    </div>
  );
}
