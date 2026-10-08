import { appStore } from '../data/store.js';

export function renderPropertyModal(container, propertyId) {
  if (!propertyId) {
    container.innerHTML = '';
    return;
  }

  const prop = appStore.properties.find(p => p.id === propertyId);
  if (!prop) {
    container.innerHTML = '';
    return;
  }

  const currency = appStore.currency;
  const formattedPrice = currency === 'ETB'
    ? `${(prop.priceETB / 1000000).toFixed(1)}M ETB`
    : `$${prop.priceUSD.toLocaleString()} USD`;

  const secondaryPrice = currency === 'ETB'
    ? `≈ $${prop.priceUSD.toLocaleString()} USD`
    : `≈ ${(prop.priceETB / 1000000).toFixed(1)}M ETB`;

  container.innerHTML = `
    <div class="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div class="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] shadow-2xl border border-gray-200 text-[#141414] z-[100000]">
        
        <!-- Close Button -->
        <button 
          id="close-prop-modal" 
          class="absolute top-4 right-4 sm:top-6 sm:right-6 z-[100001] w-10 h-10 rounded-full btn-glass-light flex items-center justify-center text-[#141414]"
        >
          ✕
        </button>

        <!-- Scrollable Content -->
        <div class="overflow-y-auto no-scrollbar w-full max-h-[92vh] rounded-3xl">
          <!-- Top Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-t-3xl border-b border-gray-100">
          <div class="md:col-span-2 h-72 sm:h-96 rounded-2xl overflow-hidden relative bg-gray-100">
            <img src="${prop.images[0]}" alt="${prop.title}" class="w-full h-full object-cover"/>
            <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-semibold">
              The Comboni Grand Tower Facade
            </span>
          </div>
          <div class="flex flex-col gap-2 h-72 sm:h-96">
            <div class="h-1/2 rounded-2xl overflow-hidden relative bg-gray-100">
              <img src="${prop.interiorRoughImage}" alt="70% Interior" class="w-full h-full object-cover"/>
              <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white text-[#141414] text-[10px] font-bold shadow-xs border border-gray-200/60">
                70% Structural Shell
              </span>
            </div>
            <div class="h-1/2 rounded-2xl overflow-hidden relative bg-gray-100">
              <img src="${prop.floorPlanImage}" alt="Floor Plan" class="w-full h-full object-cover"/>
              <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold">
                Architectural Floor Plan
              </span>
            </div>
          </div>
        </div>

        <!-- Details Container -->
        <div class="p-6 sm:p-8 space-y-8">
          
          <!-- Title & Price Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-[#141414] text-white text-xs font-bold">
                  ${prop.unitNumber} • ${prop.floor}
                </span>
                <span class="text-xs text-gray-500 font-medium">${prop.orientation}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#141414] mt-2">${prop.title}</h2>
              <p class="text-gray-500 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${prop.fullAddress}
              </p>
            </div>

            <div class="text-left md:text-right">
              <span class="text-3xl sm:text-4xl font-black text-[#141414] tracking-tight block">${formattedPrice}</span>
              <span class="text-xs text-gray-500 font-medium">${secondaryPrice} • Carta Deed Guaranteed</span>
            </div>
          </div>

          <!-- Specs Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/70 text-center">
            <div>
              <span class="text-gray-400 text-[11px] uppercase font-semibold">Bedrooms</span>
              <p class="text-xl font-bold text-[#141414] mt-0.5">${prop.bedrooms} Beds</p>
            </div>
            <div>
              <span class="text-gray-400 text-[11px] uppercase font-semibold">Bathrooms</span>
              <p class="text-xl font-bold text-[#141414] mt-0.5">${prop.bathrooms} Baths</p>
            </div>
            <div>
              <span class="text-gray-400 text-[11px] uppercase font-semibold">Total Area</span>
              <p class="text-xl font-bold text-[#141414] mt-0.5">${prop.areaSqM} m²</p>
            </div>
            <div>
              <span class="text-gray-400 text-[11px] uppercase font-semibold">Floor Level</span>
              <p class="text-xl font-bold text-[#141414] mt-0.5">${prop.floor}</p>
            </div>
          </div>

          <!-- 70% Finished Transparency Breakdown -->
          <div class="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold text-[#141414] text-base">
                  70% Completed Structural Milestone
                </h3>
                <p class="text-xs text-gray-500 mt-0.5">
                  Core structure, double elevators, facade walls, and utilities ready. Buyer selects interior finishes.
                </p>
              </div>
              <span class="text-2xl font-black text-[#141414]">70%</span>
            </div>

            <!-- Clean progress bar -->
            <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
              <div class="bg-[#141414] h-full rounded-full" style="width: 70%"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div class="space-y-2">
                <span class="font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  What Is Already Completed:
                </span>
                <ul class="text-gray-600 space-y-1 pl-4 list-disc">
                  ${prop.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
              </div>

              <div class="space-y-2">
                <span class="font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  For Your Custom Finishing:
                </span>
                <ul class="text-gray-600 space-y-1 pl-4 list-disc">
                  ${prop.finishingRemaining.map(f => `<li>${f}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- Payment Schedule -->
          <div class="p-6 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 class="font-bold text-[#141414] text-base">Diaspora Financing & Milestone Schedule</h3>
                <p class="text-xs text-gray-500">Commercial Bank of Ethiopia (CBE) & Awash Bank foreign exchange schemes</p>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                Direct Title Handover
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-[11px] text-gray-400 font-medium">25% Down Payment</span>
                <p class="text-lg font-black text-[#141414] mt-1">
                  ${((prop.priceETB * 0.25) / 1000000).toFixed(1)}M ETB
                </p>
                <span class="text-[10px] text-gray-500">≈ $${Math.round(prop.priceUSD * 0.25).toLocaleString()} USD</span>
              </div>

              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-[11px] text-gray-400 font-medium">45% Milestone Installments</span>
                <p class="text-lg font-black text-[#141414] mt-1">
                  ${((prop.priceETB * 0.45) / 1000000).toFixed(1)}M ETB
                </p>
                <span class="text-[10px] text-gray-500">Paid across fit-out phases</span>
              </div>

              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-[11px] text-gray-400 font-medium">30% Final Handover</span>
                <p class="text-lg font-black text-emerald-700 mt-1">
                  ${((prop.priceETB * 0.30) / 1000000).toFixed(1)}M ETB
                </p>
                <span class="text-[10px] text-gray-500">Official title transfer</span>
              </div>
            </div>
          </div>

          <!-- Contact & Offer Buttons -->
          <div class="space-y-3 pt-2">
            <!-- Primary Offer Button (Trusting Green) -->
            <button 
              id="modal-make-offer-btn"
              class="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-98 transition"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              <span>Submit an Official Offer on ${prop.unitNumber}</span>
              <span>→</span>
            </button>

            <div class="flex flex-col sm:flex-row items-center gap-3">
              <a 
                href="https://wa.me/251911234567?text=${encodeURIComponent(`Hello Robel, I am an expat buyer inquiring about ${prop.unitNumber} in The Comboni Grand Tower (${((prop.priceETB)/1000000).toFixed(1)}M ETB / $${prop.priceUSD.toLocaleString()} USD). Please send unit prospectus.`)}"
                target="_blank"
                class="w-full sm:w-1/2 py-3.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs transition"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                WhatsApp Robel Atikilt
              </a>

              <button 
                id="schedule-tower-visit"
                class="btn-adagn-secondary w-full sm:w-1/2 py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                Schedule Virtual Walkthrough
              </button>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  `;

  // Make offer trigger
  const makeOfferBtn = container.querySelector('#modal-make-offer-btn');
  if (makeOfferBtn) {
    makeOfferBtn.addEventListener('click', () => {
      appStore.setActiveProperty(null); // close detail modal
      appStore.openOfferModal(prop.id); // open offer modal
    });
  }

  // Close
  container.querySelector('#close-prop-modal').addEventListener('click', () => {
    appStore.setActiveProperty(null);
  });

  container.querySelector('#schedule-tower-visit').addEventListener('click', () => {
    alert(`Thank you! A virtual walkthrough for ${prop.unitNumber} at The Comboni Grand Tower has been scheduled. Project Director Robel Atikilt will reach out on WhatsApp.`);
  });
}
