import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            App Prototype
          </Link>
        </div>
      </div>
    </header>
  );
}
