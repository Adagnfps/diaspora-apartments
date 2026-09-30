import { appStore } from '../data/store.js';

let mapInstance = null;
let markerMap = new Map();

const ADDIS_LANDMARKS = [
  { name: 'The Comboni Grand Tower', type: 'tower', coords: [9.0015, 38.7845], desc: 'Flagship 10-Storey Building (18 Residences)' },
  { name: 'Atlas Hotel', type: 'hotel', coords: [9.0030, 38.7830], desc: '200m from site' },
  { name: 'Edna Mall & Cinema', type: 'mall', coords: [8.9985, 38.7865], desc: '350m from site' },
  { name: 'Bole Medhanealem', type: 'church', coords: [8.9960, 38.7880], desc: '500m from site' },
  { name: 'Bole Int. Airport', type: 'airport', coords: [8.9778, 38.7993], desc: '7 mins drive' }
];

export function initMarketplaceMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (mapInstance && mapInstance.getContainer() === container) {
    setTimeout(() => {
      mapInstance.invalidateSize();
      updateMapMarkers();
    }, 100);
    return;
  }

  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch (e) {
      console.warn('Map cleanup error:', e);
    }
    mapInstance = null;
    markerMap.clear();
  }

  mapInstance = L.map(containerId, {
    center: [9.0015, 38.7845],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false
  });

  mapInstance.on('click', () => {
    mapInstance.scrollWheelZoom.enable();
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(mapInstance);

  updateMapMarkers();

  if (!container.dataset.roObserved && window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (mapInstance) mapInstance.invalidateSize();
    });
    ro.observe(container);
    container.dataset.roObserved = 'true';
  }

  setTimeout(() => {
    if (mapInstance) {
      mapInstance.invalidateSize();
    }
  }, 200);
}

export function updateMapMarkers() {
  if (!mapInstance) return;

  markerMap.forEach(marker => marker.remove());
  markerMap.clear();

  const currency = appStore.currency;
  const priceDisplay = currency === 'ETB' ? '40M - 60M ETB' : '$285k - $430k';
  // Minimalist Black Pill for Flagship Tower
  const towerIcon = L.divIcon({
    className: 'custom-map-price-badge',
    html: `
      <div class="map-price-pin active shadow-md flex items-center gap-1.5" style="background: #141414; color: #ffffff; padding: 7px 15px; font-size: 11px; font-weight: 700; border: 2px solid #ffffff;">
        <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>
        <span>The Comboni Grand Tower (Bole Atlas)</span>
        <div class="pin-pointer" style="background: #141414;"></div>
      </div>
    `,
    iconSize: [260, 38],
    iconAnchor: [130, 38]
  });

  const towerMarker = L.marker([9.0015, 38.7845], { icon: towerIcon })
    .addTo(mapInstance);

  towerMarker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 6px; color: #141414;">
      <b style="font-size: 13px;">The Comboni Grand Tower</b><br/>
      <span style="font-size: 11px; color: #666;">Cameroon St, Bole Atlas, Addis Ababa</span><br/>
      <div style="margin-top: 6px; font-size: 12px; font-weight: 600;">18 Boutique Residences (70% Finished)</div>
      <div style="font-size: 12px; font-weight: 800; color: #141414;">Carta Title Handover Guaranteed</div>
    </div>
  `);

  markerMap.set('tower', towerMarker);

  // Minimalist White Pills for Landmarks
  ADDIS_LANDMARKS.slice(1).forEach((landmark, i) => {
    const landmarkIcon = L.divIcon({
      className: 'custom-map-price-badge',
      html: `
        <div class="map-price-pin flex items-center gap-1" style="background: #ffffff; color: #141414; font-size: 10px; font-weight: 600; padding: 4px 10px; border: 1px solid #e5e7eb; box-shadow: 0 2px 6px rgba(0,0,0,0.06);">
          <svg class="w-3 h-3 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${landmark.name}</span>
          <div class="pin-pointer" style="background: #ffffff;"></div>
        </div>
      `,
      iconSize: [140, 26],
      iconAnchor: [70, 26]
    });

    const mark = L.marker(landmark.coords, { icon: landmarkIcon }).addTo(mapInstance);
    mark.bindPopup(`<b>${landmark.name}</b><br/><span style="font-size:11px; color: #666;">${landmark.desc}</span>`);
    markerMap.set(`landmark-${i}`, mark);
  });
}

export function highlightMarker(id, highlight) {
  const pin = document.querySelector('.map-price-pin.active');
  if (pin && highlight) {
    pin.style.transform = 'scale(1.08) translateY(-2px)';
  } else if (pin) {
    pin.style.transform = '';
  }
}
