import { appStore } from '../data/store.js';

export function renderIntro(container) {
  container.innerHTML = `
    <div class="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-white select-none">
      <!-- Background Image with Overlay & Subtle Ambient Animation -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85" 
          alt="Comboni Real Estate Addis Ababa" 
          class="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms] opacity-35 filter brightness-75"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
      </div>

      <!-- Top Header Navigation inside Intro -->
      <header class="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-2xl shadow-xl shadow-amber-500/20 border border-amber-300/40">
            C
          </div>
          <div>
            <span class="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
              COMBONI <span class="text-amber-400 font-light">REAL ESTATE</span>
            </span>
            <p class="text-[10px] tracking-[0.25em] uppercase text-amber-300/80 font-semibold">
              Addis Ababa • Expat & Diaspora Portfolios
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button 
            id="intro-manager-btn" 
            class="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition flex items-center gap-2 backdrop-blur hover:border-amber-500/50"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Manager & Agent Portal
          </button>
        </div>
      </header>

      <!-- Central Hero Reveal Content -->
      <main class="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center space-y-8">
        <!-- Floating Pill Badge -->
        <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-lg shadow-amber-500/10 backdrop-blur">
          <span class="text-sm">🇪🇹</span>
          <span>Proof of Concept Prototype • 70% Completed Residences</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          Invest Confidently in <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            Addis Ababa Real Estate
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-slate-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
          Skip years of construction delays. Comboni Real Estate provides structurally finished, 
          title-deed guaranteed apartments in prime subcities with full customization freedom for diaspora and expatriate buyers.
        </p>

        <!-- 4 Key Value Pillars -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4">
          <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-left hover:border-amber-500/40 transition group">
            <span class="text-2xl mb-1 block group-hover:scale-110 transition duration-300">🏗️</span>
            <h4 class="text-white font-bold text-sm">70% Finished</h4>
            <p class="text-xs text-slate-400 mt-1">Structure, elevators & core plumbing complete.</p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-left hover:border-amber-500/40 transition group">
            <span class="text-2xl mb-1 block group-hover:scale-110 transition duration-300">📜</span>
            <h4 class="text-white font-bold text-sm">Guaranteed Carta</h4>
            <p class="text-xs text-slate-400 mt-1">Direct official title deed transfer upon handover.</p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-left hover:border-amber-500/40 transition group">
            <span class="text-2xl mb-1 block group-hover:scale-110 transition duration-300">💳</span>
            <h4 class="text-white font-bold text-sm">Diaspora FX</h4>
            <p class="text-xs text-slate-400 mt-1">USD, EUR, GBP accounts with CBE & private banks.</p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur text-left hover:border-amber-500/40 transition group">
            <span class="text-2xl mb-1 block group-hover:scale-110 transition duration-300">🎨</span>
            <h4 class="text-white font-bold text-sm">Custom Finish</h4>
            <p class="text-xs text-slate-400 mt-1">Pick your kitchen, tiles, and bathroom luxury styling.</p>
          </div>
        </div>

        <!-- Big CTA Reveal Button -->
        <div class="pt-6 flex flex-col sm:flex-row items-center gap-4">
          <button 
            id="intro-explore-btn" 
            class="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base transition duration-300 shadow-2xl shadow-amber-500/30 flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <span>Explore Live Marketplace & Map</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>

          <button 
            id="intro-learn-more-btn"
            class="px-6 py-4 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm transition"
          >
            How 70% Semi-Finished Works
          </button>
        </div>
      </main>

      <!-- Bottom Status Strip -->
      <footer class="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-800/50">
        <div class="flex items-center gap-4">
          <span>📍 Addis Ababa: Bole • Kazanchis • Old Airport • Sarbet • CMC</span>
        </div>
        <div class="mt-2 sm:mt-0 flex items-center gap-6">
          <span>Proof of Concept Prototype by Developer</span>
          <span>© 2026 Comboni Real Estate</span>
        </div>
      </footer>
    </div>
  `;

  // Event Listeners
  container.querySelector('#intro-explore-btn').addEventListener('click', () => {
    // Add smooth fade out transition
    container.firstElementChild.classList.add('transition-opacity', 'duration-500', 'opacity-0');
    setTimeout(() => {
      appStore.setView('marketplace');
    }, 450);
  });

  container.querySelector('#intro-manager-btn').addEventListener('click', () => {
    appStore.setView('agent-portal');
  });

  container.querySelector('#intro-learn-more-btn').addEventListener('click', () => {
    appStore.setView('marketplace');
    setTimeout(() => {
      alert("70% Semi-Finished Concept:\nThe building structure, exterior cladding, roofing, plumbing risers, and electrical conduits are 100% complete and certified. You purchase with a clean legal deed and have full autonomy to customize your internal tiles, bathroom fixtures, kitchen cabinetry, and paint finish without the risk of project abandonment!");
    }, 400);
  });
}
