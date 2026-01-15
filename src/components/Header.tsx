import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <Image src="/logo.png" alt="The Study" width={80} height={80} />
            <div className="flex flex-col">
              <span className="text-2xl text-red-600 font-bold">The Study</span>
              <span className="text-sm text-gray-500">L'école Internationale</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
