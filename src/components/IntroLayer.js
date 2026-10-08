import { appStore } from '../data/store.js';

export function renderIntroLayer(container) {
  if (!appStore.showIntro) {
    container.innerHTML = '';
    return;
  }

  // If already mounted, do NOT recreate or interrupt any running animation!
  if (container.querySelector('#intro-overlay')) {
    return;
  }

  const brandName = "COMBONI";
  const subBrand = "REAL ESTATE";

  container.innerHTML = `
    <div 
      id="intro-overlay" 
      class="fixed top-0 left-0 w-screen h-screen z-[500] flex flex-col justify-between bg-white text-[#141414] overflow-hidden select-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style="background: radial-gradient(circle at 50% 40%, rgba(255,255,255,1) 0%, rgba(248,249,250,0.98) 100%);"
    >
      <!-- Discreet Top Contact Strip -->
      <header id="intro-header" class="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 opacity-0 transition-opacity duration-1000 ease-out delay-500">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-[#141414] flex items-center justify-center text-white font-black text-sm">C</div>
          <span class="font-extrabold text-sm tracking-tight text-[#141414]">The Comboni Grand Tower</span>
        </div>

        <!-- Subtle Top Links (Customer Facing Only) -->
        <div class="flex items-center gap-6 text-xs text-gray-500 font-medium">
          <a href="tel:+251911234567" class="hidden sm:flex items-center gap-1.5 hover:text-black transition">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +251 911 234 567
          </a>
          <a 
            href="https://wa.me/251911234567?text=Hello%20Robel,%20I%20am%20interested%20in%20The%20Comboni%20Grand%20Tower" 
            target="_blank" 
            class="hidden sm:flex items-center gap-1.5 hover:text-emerald-700 transition"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            WhatsApp Sales Desk
          </a>
        </div>
      </header>

      <!-- Center: Adagn-Style Animated Staggered Brand Assembly -->
      <main class="flex-grow flex flex-col items-center justify-center text-center px-6 -mt-10">
        
        <!-- Animated Main Title -->
        <div class="flex flex-col items-center">
          
          <!-- Row 1: COMBONI -->
          <div class="flex items-baseline justify-center overflow-hidden py-1">
            ${brandName.split('').map((char, i) => `
              <span 
                class="brand-char inline-block text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-[#141414] opacity-0 transform translate-y-12 filter blur-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style="transition-delay: ${150 + i * 80}ms; letter-spacing: 0.05em;"
              >
                ${char}
              </span>
            `).join('')}
          </div>

          <!-- Row 2: REAL ESTATE -->
          <div class="flex items-baseline justify-center overflow-hidden py-1 mt-1">
            ${subBrand.split('').map((char, i) => `
              <span 
                class="brand-subchar inline-block text-lg sm:text-3xl md:text-5xl font-extrabold tracking-[0.25em] text-gray-400 opacity-0 transform translate-y-8 filter blur-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style="transition-delay: ${650 + i * 50}ms;"
              >
                ${char === ' ' ? '&nbsp;' : char}
              </span>
            `).join('')}
          </div>

        </div>

        <!-- Tagline -->
        <p 
          id="intro-tagline" 
          class="mt-6 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gray-400 max-w-lg opacity-0 transform translate-y-4 transition-all duration-700 ease-out delay-1000"
        >
          1 Flagship Tower • 18 Luxury Residences • Bole Atlas, Addis Ababa
        </p>

        <!-- Unavoidable Clear Browse Button (Primary CTA) -->
        <div 
          id="intro-cta-wrapper" 
          class="mt-10 opacity-0 transform translate-y-6 transition-all duration-700 ease-out delay-[1200ms]"
        >
          <button 
            id="intro-browse-btn" 
            class="btn-glass-dark group px-10 py-5 text-base flex items-center gap-3"
          >
            <span>Browse 18 Tower Residences</span>
            <span class="text-lg transition-transform group-hover:translate-x-1.5">→</span>
          </button>
        </div>

      </main>

      <!-- Bottom Minimalist Strip: "Robel's Agent Desk" located in footer -->
      <footer id="intro-footer" class="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 z-10 opacity-0 transition-opacity duration-1000 ease-out delay-[1500ms]">
        <span class="text-center sm:text-left">Bole Atlas, Cameroon St, Addis Ababa</span>
        
        <!-- Robel's Agent Desk button moved to footer as requested -->
        <button 
          id="intro-jump-agent-btn" 
          class="text-xs text-gray-400 hover:text-black transition flex items-center gap-1.5 font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black"
        >
          <span>Robel's Agent Desk</span>
          <span>→</span>
        </button>
      </footer>
    </div>
  `;

  const overlay = container.querySelector('#intro-overlay');

  // Trigger entering letter animations after mount
  setTimeout(() => {
    container.querySelectorAll('.brand-char').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-12', 'blur-sm');
    });
    container.querySelectorAll('.brand-subchar').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-8', 'blur-sm');
    });
    const tagline = container.querySelector('#intro-tagline');
    if (tagline) tagline.classList.remove('opacity-0', 'translate-y-4');
    const cta = container.querySelector('#intro-cta-wrapper');
    if (cta) cta.classList.remove('opacity-0', 'translate-y-6');
    
    const header = container.querySelector('#intro-header');
    if (header) header.classList.remove('opacity-0');
    
    const footer = container.querySelector('#intro-footer');
    if (footer) footer.classList.remove('opacity-0');
  }, 50);

  let isSliding = false;

  // Smooth Outro animation on click -> browse marketplace
  container.querySelector('#intro-browse-btn').addEventListener('click', () => {
    if (isSliding) return;
    isSliding = true;

    // Ensure underlying view is marketplace
    appStore.setView('marketplace');

    // Slide up seamlessly
    requestAnimationFrame(() => {
      overlay.style.transform = 'translateY(-100%)';
    });

    // Cleanly dismiss after animation completes
    setTimeout(() => {
      appStore.dismissIntro();
    }, 720);
  });

  // Go to agent view page directly from footer
  container.querySelector('#intro-jump-agent-btn').addEventListener('click', () => {
    if (isSliding) return;
    isSliding = true;

    // Pre-mount Agent View underneath the overlay invisibly BEFORE sliding!
    appStore.setView('agent-portal');

    // Slide up seamlessly revealing the Agent View
    requestAnimationFrame(() => {
      overlay.style.transform = 'translateY(-100%)';
    });

    // Cleanly dismiss after animation completes
    setTimeout(() => {
      appStore.dismissIntro();
    }, 720);
  });
}
