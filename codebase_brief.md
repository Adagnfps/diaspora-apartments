# Diaspora Apartments - Codebase Brief

This brief provides a comprehensive overview of the `diaspora-apartments` project, an SPA designed for a luxury real estate development in Addis Ababa. It is intended to rapidly onboard any developer or AI assistant, providing a complete mental model of the stack, architecture, and UI flow.

## 1. Tech Stack & Architecture
- **Framework:** Vanilla JavaScript (ES6 Modules) - No React, Vue, or Angular.
- **Build Tool:** Vite (`vite.config.js`).
- **Styling:** Tailwind CSS (`tailwind.config.js`) + Custom CSS (`src/styles/main.css`).
- **Animations:** Pure CSS Transitions (e.g., cubic-bezier timing functions). *(Note: GSAP is listed in `package.json` but is exclusively used in orphaned, dead code — see below).*
- **Mapping:** Leaflet (via CDN imports in `index.html`) using `CartoDB Voyager` tile layers.
- **Architecture Pattern:** Custom Observer Pattern for state management, triggering manual DOM updates based on state changes. It operates as a Single Page Application (SPA) where different views and modals are conditionally rendered and attached to specific DOM mount points.

## 2. File Structure

```text
diaspora-apartments/
├── index.html                   <-- Root HTML, loads Leaflet scripts, defines DOM mounts.
├── tailwind.config.js           <-- Tailwind configuration & brand design tokens.
├── package.json                 <-- Dependencies (vite, tailwindcss, postcss, gsap).
├── public/                      <-- Static assets.
├── src/
│   ├── main.js                  <-- App entry point. Handles routing, hash changes, and primary render loop.
│   ├── components/              <-- UI Components (View logic).
│   │   ├── IntroLayer.js        <-- Initial animated splash screen (uses CSS transitions).
│   │   ├── MarketplaceView.js   <-- Customer-facing split-screen view.
│   │   ├── MarketplaceMap.js    <-- Leaflet map integration & markers.
│   │   ├── AgentPortal.js       <-- Internal CRM / Kanban view for agents.
│   │   ├── PropertyModal.js     <-- Detail view for a specific unit.
│   │   ├── NewListingModal.js   <-- Form for agents to post listings.
│   │   ├── MakeOfferModal.js    <-- Form for clients to submit an offer.
│   │   ├── ListingCard.js       <-- Reusable property card component.
│   │   ├── IntroReveal.js       <-- [DEAD CODE] Unused GSAP/CSS intro alternate.
│   │   └── ScrollytellingPlan.js<-- [DEAD CODE] Unused GSAP interactive floor plan.
│   ├── data/                    <-- State & Data.
│   │   ├── store.js             <-- Centralized state management (Observer pattern).
│   │   ├── properties.js        <-- Initial property seed data.
│   │   └── deals.js             <-- Initial CRM pipeline data.
│   └── styles/
│       └── main.css             <-- Tailwind imports and custom component styles.
```

## 3. State Management (`store.js`)
State is managed via a custom `Store` class implemented in `src/data/store.js`.
- **Observer Pattern:** Components subscribe using `appStore.subscribe(callback)`. When `appStore.notify()` is called, the `renderApp()` loop in `main.js` checks for updates and re-renders necessary DOM sections.
- **Persistence:** Relies entirely on `localStorage` using versioned keys (e.g., `comboni_tower_properties_v3`, `comboni_deals_v3`) to ensure state persists across reloads.
- **Key States:**
  - `showIntro` (boolean): Determines if the `IntroLayer` splash screen is shown.
  - `activeView` (string): Usually `'marketplace'` or `'agent-portal'`.
  - `filters` (object): Tracks `search`, `floor`, `maxPriceETB`, `bedrooms`.
  - `currency` (string): `'ETB'` or `'USD'`.
  - UI toggles: `isNewListingModalOpen`, `isOfferModalOpen`, `activePropertyId`, `hoveredPropertyId`.
- **Methods:** `setView`, `setCurrency`, `toggleFavorite`, `setFilter`, `submitOffer`, `addProperty`, `moveDeal`, `dismissIntro`.

## 4. Design Tokens & Styling
Tailwind configuration (`tailwind.config.js`) defines specific brand colors:
- `brand.gold`: `#D4AF37`
- `brand.green`: `#0F5132`
- `brand.dark`: `#121826`
- `brand.light`: `#F8FAFC`
- `brand.accent`: `#B8860B`

Custom CSS (`src/styles/main.css`) includes:
- Adagn-inspired minimalist styling (`.adagn-card`, `.adagn-header`, `.btn-adagn-secondary`).
- Custom Leaflet Map styling (`.custom-map-price-badge`, `.map-price-pin`).

## 5. Custom SVG Replacements
Instead of relying on heavy icon libraries (like FontAwesome or Heroicons dependencies), the application relies extensively on inline raw SVG elements hardcoded directly into the template literals (e.g., `MarketplaceView.js`, `AgentPortal.js`). This is used for menu icons, filter icons, search glasses, country flags, map pins, and pipeline stage icons, maintaining a zero-dependency approach for iconography and ensuring rapid initial load times.

## 6. Exact UI Flow & DOM Mounting

The application uses specific DOM mounts defined in `index.html`:
- `#app`: Renders the main active view (`MarketplaceView` or `AgentPortal`).
- `#intro-layer-container`: Renders the `IntroLayer`.
- `#property-modal-container`, `#new-listing-modal-container`, `#make-offer-modal-container`: Dedicated containers for modals to ensure high z-index and independent rendering.

**The Flow:**
1. **App Initialization:** `src/main.js` kicks off. URL hash is checked. If `#agent` is present, it bypasses the intro. Otherwise, it renders `IntroLayer` over everything.
2. **IntroLayer:** An animated splash screen welcoming the user to "The Comboni Grand Tower". The user clicks "Browse 18 Tower Residences". The intro layer translates up (`-100%`) using smooth CSS transitions (NOT GSAP) and sets `appStore.showIntro = false`.
3. **MarketplaceView:** The main customer interface. 
   - Split-screen design. Left: Leaflet map (`MarketplaceMap.js`) zoomed in on Bole Atlas. Right: A scrollable grid of `ListingCard` components.
   - Includes a rich header with custom filter dropdowns (Status, Price, Beds, Floors) and a currency toggle.
   - Clicking a `ListingCard` triggers `appStore.setActiveProperty(id)`, re-rendering and opening the `PropertyModal` detail view. From the modal, a user can trigger `MakeOfferModal`.
4. **MakeOfferModal:** Submitting an offer calls `appStore.submitOffer()`, which creates a new Deal object, places it in the `deals` pipeline, saves to localStorage, and automatically updates CRM metrics (`offersSent`).
5. **Agent Portal (CRM):** Reached via specific footer links or the `#agent` URL hash. 
   - Replaces the `MarketplaceView`.
   - Renders a Left CRM Sidebar and a main Kanban pipeline board.
   - Shows Analytics (Pipeline Value, Deal Activity, Conversion Speed) drawn from `appStore.metrics`.
   - Kanban board maps `deals` based on their `stage` (`new`, `viewing`, `negotiation`, `legal`). Agents can drag or use dropdowns (`.pipeline-stage-select`) to change the stage, invoking `appStore.moveDeal()`.
   - Agents can click "Post New Listing", opening the `NewListingModal`, which pushes new properties to `appStore.properties`.
