import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFDFB]/95 backdrop-blur-sm border-b border-black/5">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-black">Aegis AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-black hover:text-black/70 transition-colors font-medium">
              Features
            </a>
            <a href="#agents" className="text-black hover:text-black/70 transition-colors font-medium">
              AI Agents
            </a>
            <a href="#about" className="text-black hover:text-black/70 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-black hover:text-black/70 transition-colors font-medium">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={isLoggedIn ? onLogoutClick : onLoginClick}
              className={`hidden md:block px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                isLoggedIn
                  ? 'bg-[#2F5233] text-white hover:bg-[#1F3823] shadow-lg shadow-[#2F5233]/20'
                  : 'border-2 border-black/10 text-black hover:border-black hover:bg-black hover:text-white'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4 border-t border-black/5 pt-4 space-y-4">
            <a href="#features" className="block text-black hover:text-black/70 transition-colors font-medium">
              Features
            </a>
            <a href="#agents" className="block text-black hover:text-black/70 transition-colors font-medium">
              AI Agents
            </a>
            <a href="#about" className="block text-black hover:text-black/70 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="block text-black hover:text-black/70 transition-colors font-medium">
              Contact
            </a>
            <button
              onClick={isLoggedIn ? onLogoutClick : onLoginClick}
              className={`w-full px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                isLoggedIn
                  ? 'bg-[#2F5233] text-white hover:bg-[#1F3823]'
                  : 'border-2 border-black/10 text-black hover:border-black'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
