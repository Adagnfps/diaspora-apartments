import { appStore } from './data/store.js';

import { renderIntroLayer } from './components/IntroLayer.js';
import { renderMarketplace } from './components/MarketplaceView.js';
import { renderAgentPortal } from './components/AgentPortal.js';
import { renderPropertyModal } from './components/PropertyModal.js';
import { renderNewListingModal } from './components/NewListingModal.js';
import { renderMakeOfferModal } from './components/MakeOfferModal.js';
import { highlightMarker } from './components/MarketplaceMap.js';

// Prevent browser from remembering previous scroll position on reload!
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Check if URL directly requests agent view
if (window.location.hash === '#agent' || window.location.search.includes('agent')) {
  appStore.showIntro = false;
  appStore.activeView = 'agent-portal';
} else {
  window.scrollTo(0, 0);
}

const appEl = document.getElementById('app');
const introLayerEl = document.getElementById('intro-layer-container');
const propModalEl = document.getElementById('property-modal-container');
const newListingModalEl = document.getElementById('new-listing-modal-container');
const makeOfferModalEl = document.getElementById('make-offer-modal-container');

let previousView = null;
let previousCurrency = null;
let previousFilterSnapshot = '';
let previousDealsCount = -1;

function renderApp() {
  const currentView = appStore.activeView;
  const currentCurrency = appStore.currency;
  const currentFilterSnapshot = JSON.stringify(appStore.filters) + '_' + appStore.properties.length;
  const currentDealsCount = appStore.deals.length + '_' + appStore.metrics.offersSent;

  // Sync hash
  if (currentView === 'agent-portal' && window.location.hash !== '#agent') {
    history.replaceState(null, null, '#agent');
  } else if (currentView === 'marketplace' && window.location.hash === '#agent') {
    history.replaceState(null, null, window.location.pathname);
  }

  const needsUpdate = 
    previousView !== currentView || 
    previousCurrency !== currentCurrency || 
    previousFilterSnapshot !== currentFilterSnapshot || 
    previousDealsCount !== currentDealsCount;

  if (needsUpdate) {
    if (previousView !== currentView) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      appEl.className = 'w-full min-h-screen page-fade-in';
    }

    previousView = currentView;
    previousCurrency = currentCurrency;
    previousFilterSnapshot = currentFilterSnapshot;
    previousDealsCount = currentDealsCount;

    if (currentView === 'marketplace') {
      renderMarketplace(appEl);
    } else if (currentView === 'agent-portal') {
      renderAgentPortal(appEl);
    }
  }


  // Animated Intro Layer (Adagn Style)
  renderIntroLayer(introLayerEl);

  // Modals (Completely decoupled from map)
  renderPropertyModal(propModalEl, appStore.activePropertyId);
  renderNewListingModal(newListingModalEl);
  renderMakeOfferModal(makeOfferModalEl);

  // Marker Hover Highlighting
  if (appStore.hoveredPropertyId) {
    highlightMarker(appStore.hoveredPropertyId, true);
  }
}

// Initial Boot
renderApp();

// Subscribe to state changes
appStore.subscribe(() => {
  renderApp();
});

// Browser Back / Forward & Hash Listener
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#agent') {
    appStore.showIntro = false;
    appStore.setView('agent-portal');
  } else {
    appStore.setView('marketplace');
  }
});
