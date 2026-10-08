import { appStore } from '../data/store.js';

export function renderMakeOfferModal(container) {
  if (!appStore.isOfferModalOpen || !appStore.activeOfferUnit) {
    container.innerHTML = '';
    return;
  }

  const prop = appStore.activeOfferUnit;
  const currency = appStore.currency;

  const askingDisplay = currency === 'ETB'
    ? `${(prop.priceETB).toLocaleString()} ETB`
    : `$${prop.priceUSD.toLocaleString()} USD`;

  container.innerHTML = `
    <div class="fixed inset-0 z-[99999] overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div class="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 text-[#141414] z-[100000] space-y-6">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider">
              Official Purchase Inquiry
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-[#141414] mt-1">Make an Offer</h2>
            <p class="text-xs text-gray-500">${prop.title} • ${prop.floor}</p>
          </div>
          <button id="close-offer-modal" class="w-9 h-9 rounded-full btn-glass-light flex items-center justify-center text-sm font-bold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Residence Preview Card -->
        <div class="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center gap-3.5">
          <img src="${prop.images[0]}" alt="${prop.title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div class="min-w-0 flex-grow">
            <h4 class="font-bold text-xs text-[#141414] truncate">${prop.title}</h4>
            <span class="text-xs text-gray-500 block">${prop.bedrooms} Beds • ${prop.bathrooms} Baths • ${prop.areaSqM} m²</span>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-[11px] text-gray-400 font-medium">Asking Price:</span>
              <span class="text-xs font-black text-[#141414]">${askingDisplay}</span>
            </div>
          </div>
        </div>

        <!-- Offer Form -->
        <form id="make-offer-form" class="space-y-4">
          
          <div>
            <label class="text-xs font-bold text-gray-700 block mb-1">Your Proposed Offer Amount (in ETB)</label>
            <input 
              type="number" 
              id="offer-amount" 
              required 
              value="${prop.priceETB}" 
              step="500000"
              class="w-full text-xs font-bold bg-white border border-gray-300 rounded-xl p-3 text-[#141414] focus:ring-2 focus:ring-[#141414]"
            />
            <span class="text-[10px] text-gray-500 mt-1 block">Asking price is ${(prop.priceETB / 1000000).toFixed(1)}M ETB. Offers are reviewed by Robel Atikilt within 2 hours.</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Your Full Name</label>
              <input 
                type="text" 
                id="offer-buyer-name" 
                required 
                placeholder="e.g. Dawit Haile" 
                class="w-full text-xs font-medium bg-white border border-gray-300 rounded-xl p-3 text-[#141414] focus:ring-2 focus:ring-[#141414]"
              />
            </div>

            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Phone / WhatsApp Number</label>
              <input 
                type="tel" 
                id="offer-phone" 
                required 
                placeholder="e.g. +1 (571) 234-5678" 
                class="w-full text-xs font-medium bg-white border border-gray-300 rounded-xl p-3 text-[#141414] focus:ring-2 focus:ring-[#141414]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Buyer Location</label>
              <select id="offer-location" class="select-glass w-full">
                <option value="US Diaspora">United States (Diaspora)</option>
                <option value="UK / Europe Diaspora">UK & Europe (Diaspora)</option>
                <option value="Canada Diaspora">Canada (Diaspora)</option>
                <option value="UAE / Gulf Diaspora">UAE & Middle East</option>
                <option value="Addis Ababa Expat">Expatriate in Addis Ababa</option>
                <option value="Local Resident">Ethiopian Resident</option>
              </select>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Financing / Payment Method</label>
              <select id="offer-payment" class="select-glass w-full">
                <option value="CBE Diaspora FX Escrow">CBE Diaspora FX Escrow</option>
                <option value="Awash Foreign Currency Wire">Awash Bank FX Wire</option>
                <option value="Milestone Installments (25/45/30)">Milestone Installments (25/45/30)</option>
                <option value="100% Cash Settlement">100% Cash Settlement</option>
              </select>
            </div>
          </div>

          <!-- Buttons -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button 
              type="button" 
              id="cancel-offer-btn"
              class="btn-glass-light px-5 py-3 text-xs"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-glass-emerald px-7 py-3 text-xs flex items-center gap-2"
            >
              <span>Submit Official Offer</span>
              <span>→</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `;

  // Close handlers
  container.querySelector('#close-offer-modal').addEventListener('click', () => {
    appStore.closeOfferModal();
  });
  container.querySelector('#cancel-offer-btn').addEventListener('click', () => {
    appStore.closeOfferModal();
  });

  // Submit Handler
  container.querySelector('#make-offer-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const offerAmountETB = Number(container.querySelector('#offer-amount').value);
    const buyerName = container.querySelector('#offer-buyer-name').value.trim();
    const phone = container.querySelector('#offer-phone').value.trim();
    const location = container.querySelector('#offer-location').value;
    const paymentMethod = container.querySelector('#offer-payment').value;

    const createdDeal = appStore.submitOffer({
      offerAmountETB,
      buyerName,
      phone,
      location,
      paymentMethod
    });

    alert(`Offer Submitted!\n\nYour proposed offer of ${(offerAmountETB / 1000000).toFixed(1)}M ETB for ${prop.title} has been officially received by Lead Advisor Robel Atikilt.\n\nOur development office will review your terms and reach out on WhatsApp / Phone within 2 hours.`);
  });
}
