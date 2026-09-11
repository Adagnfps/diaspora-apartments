import { appStore } from '../data/store.js';

const ADDIS_NEIGHBORHOODS = [
  { name: 'Bole Atlas', lat: 9.0015, lng: 38.7845, full: 'Cameroon St, Bole Atlas, Addis Ababa' },
  { name: 'Kazanchis (UN Diplomatic Quarter)', lat: 9.0192, lng: 38.7667, full: 'Menelik II Ave, Kazanchis, Addis Ababa' },
  { name: 'Old Airport (ICS Area)', lat: 8.9880, lng: 38.7350, full: 'Toryoch St, Old Airport, Addis Ababa' },
  { name: 'Sarbet (African Union)', lat: 8.9950, lng: 38.7420, full: 'Sarbet Ring Rd, Kirkos, Addis Ababa' },
  { name: 'CMC (Near St. Michael)', lat: 9.0250, lng: 38.8250, full: 'CMC Main Blvd, Yeka Subcity, Addis Ababa' },
  { name: 'Summit Condominiums', lat: 9.0290, lng: 38.8510, full: 'Summit Ave, Bole Subcity, Addis Ababa' },
  { name: 'Bisrate Gabriel', lat: 8.9850, lng: 38.7200, full: 'South Africa St, Nifas Silk, Addis Ababa' },
  { name: 'Ayat Zone 3', lat: 9.0350, lng: 38.8750, full: 'Ayat Main Rd, Bole Subcity, Addis Ababa' }
];

export function renderNewListingModal(container) {
  if (!appStore.isNewListingModalOpen) {
    container.innerHTML = '';
    return;
  }

  // Initial form state
  let locationMode = 'gps'; // 'gps' | 'remote'
  let currentCoords = { lat: 9.0015, lng: 38.7845 };
  let detectedAddress = 'Bole Atlas, Addis Ababa (On-Site)';

  let uploadedBuildingImg = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';
  let uploadedInteriorImg = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80';
  let uploadedFloorPlanImg = 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80';

  container.innerHTML = `
    <div class="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div class="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 z-[100000]">
        
        <!-- Header -->
        <div class="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <div>
            <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
              Comboni Real Estate Manager Portal
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-1">Post New Apartment Listing</h2>
            <p class="text-xs text-slate-500">Capture 70% finished building photos, upload floor plans, and tag site coordinates</p>
          </div>
          <button id="close-listing-modal" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form id="new-listing-form" class="p-6 sm:p-8 space-y-8">
          
          <!-- STEP 1: Smart Location (GPS On-Site vs Remote Map) -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label class="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  1. Property Location & Geotagging
                </label>
                <p class="text-xs text-slate-500">Choose how the property location is determined</p>
              </div>

              <!-- Location Mode Selector -->
              <div class="inline-flex p-1 rounded-xl bg-slate-200 text-xs font-bold">
                <button 
                  type="button" 
                  id="loc-mode-gps" 
                  class="px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-900 transition flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                  On-Site GPS
                </button>
                <button 
                  type="button" 
                  id="loc-mode-remote" 
                  class="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Pick on Map
                </button>
              </div>
            </div>

            <!-- GPS Box -->
            <div id="gps-box" class="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span class="text-xs font-bold text-slate-800">Live Device Geolocation</span>
                </div>
                <button 
                  type="button" 
                  id="detect-gps-btn" 
                  class="px-3 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-5.26l-3.27 3.27"></path></svg>
                  Refresh Coordinates
                </button>
              </div>
              <div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg font-mono flex items-center justify-between">
                <span id="gps-status-text">Lat: 9.0015, Lng: 38.7845 (Bole Atlas, Addis Ababa)</span>
                <span class="text-emerald-600 font-bold flex items-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> High Accuracy</span>
              </div>
            </div>

            <!-- Remote Map Picker Box (Hidden by default) -->
            <div id="remote-box" class="hidden p-4 rounded-xl bg-white border border-slate-200 space-y-3">
              <label class="text-xs font-bold text-slate-700">Select Addis Ababa Subcity / Landmark:</label>
              <select id="remote-neighborhood-select" class="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800">
                ${ADDIS_NEIGHBORHOODS.map((n, i) => `
                  <option value="${i}">${n.name} (${n.full})</option>
                `).join('')}
              </select>
              <p class="text-[11px] text-slate-400">
                Selecting a neighborhood will automatically place the price marker at that exact coordinate on the public map.
              </p>
            </div>
          </div>

          <!-- STEP 2: Required Photos & Floor Plan Uploads -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div>
              <label class="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                2. Site Photos & Architectural Floor Plan
              </label>
              <p class="text-xs text-slate-500">Provide high-resolution photos of the building, 70% finished interior, and floor layout</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <!-- Photo 1: Building Exterior -->
              <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span class="text-[11px] font-bold text-slate-700 block">1. Building Exterior</span>
                <div class="h-32 rounded-lg overflow-hidden bg-slate-100 relative group">
                  <img id="preview-building" src="${uploadedBuildingImg}" class="w-full h-full object-cover"/>
                  <label class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1.5">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-5.26l-3.27 3.27"></path></svg>
                    Change Photo
                    <input type="file" accept="image/*" class="hidden img-upload-input" data-target="building"/>
                  </label>
                </div>
                <span class="text-[10px] text-slate-400 block text-center">Exterior facade & compound</span>
              </div>

              <!-- Photo 2: 70% Interior Rough-in -->
              <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span class="text-[11px] font-bold text-slate-700 block">2. 70% Finished Interior</span>
                <div class="h-32 rounded-lg overflow-hidden bg-slate-100 relative group">
                  <img id="preview-interior" src="${uploadedInteriorImg}" class="w-full h-full object-cover"/>
                  <label class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1.5">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-5.26l-3.27 3.27"></path></svg>
                    Change Photo
                    <input type="file" accept="image/*" class="hidden img-upload-input" data-target="interior"/>
                  </label>
                </div>
                <span class="text-[10px] text-slate-400 block text-center">Structure, walls & conduits</span>
              </div>

              <!-- Photo 3: Floor Plan -->
              <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span class="text-[11px] font-bold text-slate-700 block">3. Floor Plan Layout</span>
                <div class="h-32 rounded-lg overflow-hidden bg-slate-100 relative group">
                  <img id="preview-floorplan" src="${uploadedFloorPlanImg}" class="w-full h-full object-cover"/>
                  <label class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1.5">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    Upload Plan
                    <input type="file" accept="image/*" class="hidden img-upload-input" data-target="floorplan"/>
                  </label>
                </div>
                <span class="text-[10px] text-slate-400 block text-center">2D architectural blueprint</span>
              </div>

            </div>
          </div>

          <!-- STEP 3: Apartment Specifications & Pricing -->
          <div class="space-y-4">
              <span class="font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                3. Apartment Details & Diaspora Terms
              </label>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-slate-700">Tower Unit Title</label>
                <input 
                  type="text" 
                  id="prop-title" 
                  required 
                  value="Comboni Tower — Unit 302 (Executive Suite)" 
                  class="mt-1 w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700">Subcity / Location</label>
                <input 
                  type="text" 
                  id="prop-neighborhood" 
                  required 
                  value="Bole Atlas (Cameroon St)" 
                  class="mt-1 w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700">Price in Ethiopian Birr (ETB)</label>
                <input 
                  type="number" 
                  id="prop-price" 
                  required 
                  value="45000000" 
                  step="500000"
                  class="mt-1 w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
                <span class="text-[10px] text-slate-400 mt-1 block">45,000,000 ETB ≈ $321,000 USD</span>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700">Total Net Area (m²)</label>
                <input 
                  type="number" 
                  id="prop-area" 
                  required 
                  value="185" 
                  class="mt-1 w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700">Bedrooms & Bathrooms</label>
                <div class="grid grid-cols-2 gap-2 mt-1">
                  <select id="prop-bedrooms" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <option value="2">2 Bedrooms</option>
                    <option value="3" selected>3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms (Penthouse)</option>
                  </select>
                  <select id="prop-bathrooms" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <option value="2">2 Baths</option>
                    <option value="2.5" selected>2.5 Baths</option>
                    <option value="3">3 Baths</option>
                    <option value="4">4 Baths</option>
                    <option value="5">5 Baths</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700">Floor Level & Title Deed</label>
                <input 
                  type="text" 
                  id="prop-floor" 
                  required 
                  value="3rd Floor • Carta Deed Ready" 
                  class="mt-1 w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button Strip -->
          <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button 
              type="button" 
              id="cancel-new-listing" 
              class="btn-animate w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-animate w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition shadow-sm flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Publish Unit to The Tower
            </button>
          </div>

        </form>

      </div>
    </div>
  `;

  // Mode switching
  const gpsBtn = container.querySelector('#loc-mode-gps');
  const remoteBtn = container.querySelector('#loc-mode-remote');
  const gpsBox = container.querySelector('#gps-box');
  const remoteBox = container.querySelector('#remote-box');
  const remoteSelect = container.querySelector('#remote-neighborhood-select');
  const gpsStatusText = container.querySelector('#gps-status-text');

  gpsBtn.addEventListener('click', () => {
    locationMode = 'gps';
    gpsBtn.className = 'px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-900 transition flex items-center gap-1';
    remoteBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1';
    gpsBox.classList.remove('hidden');
    remoteBox.classList.add('hidden');
  });

  remoteBtn.addEventListener('click', () => {
    locationMode = 'remote';
    remoteBtn.className = 'px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-900 transition flex items-center gap-1';
    gpsBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1';
    remoteBox.classList.remove('hidden');
    gpsBox.classList.add('hidden');
  });

  // GPS Detection trigger
  const detectGps = () => {
    if ('geolocation' in navigator) {
      gpsStatusText.textContent = 'Acquiring high-precision GPS satellites...';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          detectedAddress = `Addis Ababa (GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`;
          gpsStatusText.textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)} (Accuracy: ${Math.round(pos.coords.accuracy)}m)`;
        },
        (err) => {
          console.warn('GPS error, using default Bole coordinates', err);
          currentCoords = { lat: 9.0015, lng: 38.7845 };
          gpsStatusText.textContent = `Lat: 9.0015, Lng: 38.7845 (Bole Atlas On-Site Default)`;
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      gpsStatusText.textContent = 'GPS not supported by device, using Addis coordinates.';
    }
  };

  container.querySelector('#detect-gps-btn').addEventListener('click', detectGps);

  // File input simulation / upload handling
  container.querySelectorAll('.img-upload-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const target = e.target.getAttribute('data-target');
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          const res = re.target.result;
          if (target === 'building') {
            uploadedBuildingImg = res;
            container.querySelector('#preview-building').src = res;
          } else if (target === 'interior') {
            uploadedInteriorImg = res;
            container.querySelector('#preview-interior').src = res;
          } else if (target === 'floorplan') {
            uploadedFloorPlanImg = res;
            container.querySelector('#preview-floorplan').src = res;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // Close handlers
  const closeModal = () => appStore.toggleNewListingModal(false);
  container.querySelector('#close-new-listing').addEventListener('click', closeModal);
  container.querySelector('#cancel-new-listing').addEventListener('click', closeModal);

  // Form submit
  container.querySelector('#new-listing-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let finalCoords = currentCoords;
    let finalAddress = detectedAddress;
    let subcityName = container.querySelector('#prop-neighborhood').value.trim();

    if (locationMode === 'remote') {
      const selectedIndex = remoteSelect.value;
      const chosen = ADDIS_NEIGHBORHOODS[selectedIndex];
      finalCoords = { lat: chosen.lat, lng: chosen.lng };
      finalAddress = chosen.full;
      subcityName = chosen.name;
    }

    const title = container.querySelector('#prop-title').value.trim();
    const priceUSD = Number(container.querySelector('#prop-price').value);
    const areaSqM = Number(container.querySelector('#prop-area').value);
    const bedrooms = Number(container.querySelector('#prop-bedrooms').value);
    const bathrooms = Number(container.querySelector('#prop-bathrooms').value);
    const floor = container.querySelector('#prop-floor').value.trim();

    const created = appStore.addProperty({
      title,
      subcity: subcityName,
      neighborhood: subcityName,
      fullAddress: finalAddress,
      priceUSD,
      bedrooms,
      bathrooms,
      areaSqM,
      floor,
      coordinates: finalCoords,
      buildingImage: uploadedBuildingImg,
      interiorRoughImage: uploadedInteriorImg,
      floorPlanImage: uploadedFloorPlanImg,
      images: [uploadedBuildingImg, uploadedInteriorImg, uploadedFloorPlanImg]
    });

    closeModal();

    alert(`Successfully Published!\n\n"${created.title}" is now LIVE on the public Addis Ababa map and marketplace.`);
  });
}
