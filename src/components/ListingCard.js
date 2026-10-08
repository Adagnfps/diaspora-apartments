import { appStore } from '../data/store.js';

export function createListingCard(prop) {
  const isFavorite = appStore.favorites.has(prop.id);
  const currency = appStore.currency;
  
  const formattedPrice = currency === 'ETB'
    ? `${(prop.priceETB / 1000000).toFixed(1)}M ETB`
    : `$${prop.priceUSD.toLocaleString()}`;

  const secondaryPrice = currency === 'ETB'
    ? `≈ $${prop.priceUSD.toLocaleString()} USD`
    : `≈ ${(prop.priceETB / 1000000).toFixed(1)}M ETB`;

  const card = document.createElement('div');
  card.id = `listing-card-${prop.id}`;
  card.className = `adagn-card rounded-2xl overflow-hidden flex flex-col cursor-pointer group`;

  let currentImageIdx = 0;
  const images = prop.images && prop.images.length > 0 ? prop.images : [prop.buildingImage];

  card.innerHTML = `
    <!-- Top Image Container with Slider matching screenshot -->
    <div class="relative w-full h-48 bg-gray-100 overflow-hidden select-none">
      <img 
        id="card-img-${prop.id}" 
        src="${images[0]}" 
        alt="${prop.title}" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Unit Badge -->
      <div class="absolute top-3 left-3 z-10">
        <span class="px-2.5 py-1 rounded-md bg-[#141414]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
          ${prop.unitNumber} • ${prop.floor}
        </span>
      </div>

      <!-- Slider Arrows -->
      ${images.length > 1 ? `
        <button 
          class="card-prev-img absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"
        >
          &#8249;
        </button>
        <button 
          class="card-next-img absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"
        >
          &#8250;
        </button>
      ` : ''}

      <!-- Slider Dots -->
      <div class="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10">
        ${images.map((_, idx) => `
          <div class="card-dot w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-white scale-110' : 'bg-white/60'} transition"></div>
        `).join('')}
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-4 flex flex-col justify-between flex-grow space-y-3">
      
      <!-- Price and Specs -->
      <div>
        <div class="flex items-baseline justify-between gap-2">
          <span class="text-xl font-black text-[#141414] tracking-tight">
            ${formattedPrice}
          </span>
          <div class="text-right shrink-0">
            <span class="text-xs font-bold text-gray-800">
              ${prop.bedrooms} Bds ${prop.bathrooms} Ba ${prop.areaSqM} m²
            </span>
            <span class="text-[10px] text-gray-400 block font-medium">70% SHELL READY</span>
          </div>
        </div>

        <!-- Address -->
        <p class="text-xs text-gray-500 mt-1 truncate">
          ${prop.fullAddress}
        </p>
      </div>

      <!-- Action Row: Make an Offer (Trusting Green) + Inspect Unit (Facebook Blue) -->
      <div class="flex items-center gap-2 pt-1">
        <!-- Trusting Green Make an Offer Button -->
        <button 
          class="card-make-offer-btn btn-glass-emerald w-1/2 py-2.5 px-3 text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          Make an Offer
        </button>

        <!-- Facebook Blue Inspect Unit Button -->
        <button 
          class="card-view-btn btn-glass-blue w-1/2 py-2.5 px-3 text-[11px] flex items-center justify-center gap-1 shadow-sm"
        >
          <span>Inspect Unit</span> →
        </button>
      </div>

      <!-- Bottom Status Strip with Floor plan & Favorite -->
      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span class="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
            Apartment For Sale
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button 
            title="Floor Plan Blueprint"
            class="card-floorplan-btn text-gray-400 hover:text-black transition p-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
            </svg>
          </button>
          
          <button 
            title="Favorite"
            class="card-fav-btn text-gray-400 hover:text-red-500 transition p-1 ${isFavorite ? 'text-red-500' : ''}"
          >
            <svg class="w-4 h-4 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-current fill-none'}" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  `;

  // Slider controls
  const imgEl = card.querySelector(`#card-img-${prop.id}`);
  const dots = card.querySelectorAll('.card-dot');

  const updateSlider = (idx) => {
    currentImageIdx = (idx + images.length) % images.length;
    imgEl.src = images[currentImageIdx];
    dots.forEach((dot, i) => {
      dot.className = i === currentImageIdx 
        ? 'card-dot w-1.5 h-1.5 rounded-full bg-white scale-110 transition' 
        : 'card-dot w-1.5 h-1.5 rounded-full bg-white/60 transition';
    });
  };

  const prevBtn = card.querySelector('.card-prev-img');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlider(currentImageIdx - 1);
    });
  }

  const nextBtn = card.querySelector('.card-next-img');
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlider(currentImageIdx + 1);
    });
  }

  card.querySelector('.card-fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    appStore.toggleFavorite(prop.id);
  });

  card.querySelector('.card-floorplan-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    appStore.setActiveProperty(prop.id);
  });

  // Make Offer button (Trusting Green)
  card.querySelector('.card-make-offer-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    appStore.openOfferModal(prop.id);
  });

  // View details (Facebook Blue)
  card.querySelector('.card-view-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    appStore.setActiveProperty(prop.id);
  });

  card.addEventListener('click', () => {
    appStore.setActiveProperty(prop.id);
  });

  card.addEventListener('mouseenter', () => {
    appStore.setHoveredProperty(prop.id);
  });

  card.addEventListener('mouseleave', () => {
    appStore.setHoveredProperty(null);
  });

  return card;
}
