import { appStore } from '../data/store.js';
import { initMarketplaceMap, updateMapMarkers } from './MarketplaceMap.js';
import { createListingCard } from './ListingCard.js';

export function renderMarketplace(container) {
  const currency = appStore.currency;
  const filteredProperties = appStore.getFilteredProperties();

  // If already mounted, update cards without tearing down map
  const existingGrid = container.querySelector('#marketplace-listings-grid');
  if (existingGrid && container.querySelector('#marketplace-map-container')) {
    renderGridCards(existingGrid, filteredProperties);
    updateMapMarkers();
    return;
  }

  container.innerHTML = `
    <div class="h-screen w-screen flex flex-col overflow-hidden bg-white text-slate-900 font-sans select-none">
      
      <!-- Top Navigation & Filter Bar (Matching Screenshot) -->
      <header class="bg-white/90 backdrop-blur-md border-b border-slate-200 px-5 py-3 shrink-0 z-30 shadow-xs">
        <div class="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          
          <!-- Left: Title from Screenshot -->
          <div class="flex items-center gap-2.5 shrink-0 pr-3 border-r border-slate-200">
            <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-lg">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Addis Ababa, Bole Atlas
                </span>
                <span class="text-xs text-slate-500 font-medium hidden sm:inline">Residences For Sale</span>
              </div>
              <p class="text-[10px] text-slate-500 font-semibold hidden sm:block">
                The Comboni Grand Tower • 18 Luxury Residences
              </p>
            </div>
          </div>

          <!-- Middle Filter Toolbar -->
          <div class="flex items-center gap-2 shrink-0">
            
            <button class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 hover:scale-[1.02] active:scale-95">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter
            </button>
            <button class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 hover:scale-[1.02] active:scale-95">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              Sort
            </button>

            <!-- Status Dropdown -->
            <select id="filter-status" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold text-slate-800">
              <option value="all">For Sale ▾</option>
              <option value="70">70% Shell Ready</option>
              <option value="carta">Carta Guaranteed</option>
            </select>

            <!-- Price Dropdown -->
            <select id="filter-price" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold text-slate-800">
              <option value="65000000">Price: Any ▾</option>
              <option value="45000000">Under 45M ETB</option>
              <option value="50000000">Under 50M ETB</option>
              <option value="55000000">Under 55M ETB</option>
              <option value="65000000">Above 55M ETB</option>
            </select>

            <!-- Beds Dropdown -->
            <select id="filter-beds" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold text-slate-800">
              <option value="all">Beds & Baths ▾</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms (Penthouse)</option>
            </select>

            <!-- Floor Dropdown -->
            <select id="filter-floor" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold text-slate-800">
              <option value="all">Tower Floor ▾</option>
              <option value="2">Floor 2 (Garden Terrace)</option>
              <option value="3">Floor 3</option>
              <option value="4">Floor 4</option>
              <option value="5">Floor 5</option>
              <option value="6">Floor 6</option>
              <option value="7">Floor 7</option>
              <option value="8">Floor 8 (Ambassador)</option>
              <option value="9">Floor 9 (Sky Villas)</option>
              <option value="10">Floor 10 (Penthouses)</option>
            </select>

            <!-- Save Search -->
            <button id="save-search-btn" class="px-4 py-1.5 rounded-xl bg-slate-950 hover:bg-black text-white font-bold text-xs transition shrink-0 hover:scale-[1.02] active:scale-95 shadow-xs">
              Save Search
            </button>
          </div>

          <!-- Right Action Bar -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Search input -->
            <div class="relative">
              <input 
                id="search-unit-input"
                type="text" 
                placeholder="Search Unit, Floor, Specs..." 
                value="${appStore.filters.search}"
                class="w-40 sm:w-56 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50/80 focus:bg-white focus:ring-1 focus:ring-slate-900"
              />
              <svg class="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>

            <!-- Currency Toggle -->
            <div class="inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button id="top-curr-etb" class="px-2.5 py-1 rounded-lg transition ${currency === 'ETB' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'}">
                ETB (Br)
              </button>
              <button id="top-curr-usd" class="px-2.5 py-1 rounded-lg transition ${currency === 'USD' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'}">
                USD ($)
              </button>
            </div>
          </div>

        </div>
      </header>

      <!-- Main Split Screen -->
      <div class="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        
        <!-- Left Half (50%): Full Height Interactive Map -->
        <div class="w-full md:w-1/2 h-[40vh] md:h-full relative shrink-0 border-b md:border-b-0 md:border-r border-slate-200">
          <div id="marketplace-map-container" class="w-full h-full"></div>

          <!-- Bottom Map Landmark Badge -->
          <div class="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-200 text-xs flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse"></span>
              <span class="font-black text-slate-900 hidden sm:inline">The Comboni Grand Tower</span>
              <span class="font-black text-slate-900 sm:hidden">Comboni Tower</span>
            </div>
            <span class="text-slate-400 hidden sm:inline">|</span>
            <span class="text-[11px] text-slate-600 font-semibold hidden sm:inline">Cameroon St, Bole Atlas</span>
          </div>
        </div>

        <!-- Right Half (50%): Scrollable Customer Listings Grid -->
        <div id="marketplace-right-pane" class="w-full md:w-1/2 flex-1 md:h-full overflow-y-auto p-4 sm:p-5 bg-[#fafafa] flex flex-col space-y-4">
          
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-xs text-slate-900 uppercase tracking-wider">The 18 Tower Units</span>
              <span class="text-xs text-slate-600 font-bold bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                ${filteredProperties.length} Available
              </span>
            </div>
            <span class="text-xs text-slate-500 font-medium">Click card to inspect or submit offer</span>
          </div>

          <!-- 2-Column Grid of 18 Units -->
          <div id="marketplace-listings-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
            <!-- Rendered via renderGridCards -->
          </div>

          <!-- Discreet Footer -->
          <div class="pt-8 pb-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2 border-t border-slate-100 mt-auto">
            <span>© 2026 The Comboni Grand Tower</span>
            <span>•</span>
            <span>Bole Atlas, Addis Ababa</span>
            <span>•</span>
            <button id="marketplace-to-agent-link" class="hover:text-slate-700 transition underline underline-offset-2">
              Robel's Desk
            </button>
          </div>

          ${filteredProperties.length === 0 ? `
            <div class="py-20 text-center text-slate-500 space-y-3">
              <p class="text-3xl text-slate-300">
                <svg class="w-10 h-10 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </p>
              <p class="font-bold text-sm">No residences match your current filters</p>
              <button id="reset-marketplace-filters" class="px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs">
                Reset Filters
              </button>
            </div>
          ` : ''}

        </div>

      </div>

    </div>
  `;

  // Mount cards
  const grid = container.querySelector('#marketplace-listings-grid');
  renderGridCards(grid, filteredProperties);

  // Initialize Map
  setTimeout(() => {
    initMarketplaceMap('marketplace-map-container');
  }, 60);

  // Filter Listeners
  const priceSelect = container.querySelector('#filter-price');
  priceSelect.value = appStore.filters.maxPriceETB;
  priceSelect.addEventListener('change', (e) => {
    appStore.setFilter('maxPriceETB', Number(e.target.value));
  });

  const bedsSelect = container.querySelector('#filter-beds');
  bedsSelect.value = appStore.filters.bedrooms;
  bedsSelect.addEventListener('change', (e) => {
    appStore.setFilter('bedrooms', e.target.value);
  });

  const floorSelect = container.querySelector('#filter-floor');
  floorSelect.value = appStore.filters.floor;
  floorSelect.addEventListener('change', (e) => {
    appStore.setFilter('floor', e.target.value);
  });

  const searchInput = container.querySelector('#search-unit-input');
  searchInput.addEventListener('input', (e) => {
    appStore.setFilter('search', e.target.value);
  });

  // Currency Handlers
  container.querySelector('#top-curr-etb').addEventListener('click', () => {
    appStore.setCurrency('ETB');
  });
  container.querySelector('#top-curr-usd').addEventListener('click', () => {
    appStore.setCurrency('USD');
  });

  const saveSearchBtn = document.getElementById('save-search-btn');
  if (saveSearchBtn) {
    saveSearchBtn.addEventListener('click', () => {
      alert("Search saved! You will receive notifications when new units or price adjustments occur in The Comboni Grand Tower.");
    });
  }

  // Footer agent link
  const agentLink = container.querySelector('#marketplace-to-agent-link');
  if (agentLink) {
    agentLink.addEventListener('click', () => {
      appStore.setView('agent-portal');
    });
  }

  const resetBtn = container.querySelector('#reset-marketplace-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      appStore.resetFilters();
    });
  }
}

function renderGridCards(gridContainer, properties) {
  if (!gridContainer) return;
  gridContainer.innerHTML = '';
  properties.forEach(prop => {
    gridContainer.appendChild(createListingCard(prop));
  });
}
