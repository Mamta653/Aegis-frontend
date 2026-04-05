import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FDFDFB] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E9EFEC] rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-sm font-medium text-black">Autonomous Healthcare Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight mb-6">
            Healthcare's Future
            <br />
            <span className="text-black/70">Powered by Agentic AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-black/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience intelligent, autonomous healthcare agents that don't just respond—they anticipate, learn, and act.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div
              className={`relative group transition-all duration-300 ${
                searchFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative bg-white/40 backdrop-blur-xl border border-black/10 rounded-2xl p-2 shadow-2xl">
                <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-5 shadow-lg">
                  <Search className="w-6 h-6 text-black/40 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Consult an AI Agent for symptoms, diagnosis, care plans..."
                    className="flex-1 bg-transparent border-none outline-none text-black placeholder:text-black/40 text-lg"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <button className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors flex-shrink-0">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm text-black/50 mt-4">
              Powered by advanced agentic AI that learns and adapts to your healthcare needs
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all hover:shadow-2xl hover:scale-105">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-black/10 text-black rounded-xl font-semibold hover:border-black transition-all hover:shadow-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F5233]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
    </section>
  );
}
