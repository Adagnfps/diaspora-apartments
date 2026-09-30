import { appStore } from '../data/store.js';

export function renderAgentPortal(container) {
  const deals = appStore.deals;
  const metrics = appStore.metrics;
  const currency = appStore.currency;

  const getStageDeals = (stage) => deals.filter(d => d.stage === stage);

  const stages = [
    { key: 'new', label: 'New', count: getStageDeals('new').length, dotColor: 'bg-[#9333ea]', borderTop: 'border-t-2 border-purple-500' },
    { key: 'viewing', label: 'Viewing Scheduled', count: getStageDeals('viewing').length, dotColor: 'bg-[#f59e0b]', borderTop: 'border-t-2 border-amber-500' },
    { key: 'negotiation', label: 'Negotiation', count: getStageDeals('negotiation').length, dotColor: 'bg-[#3b82f6]', borderTop: 'border-t-2 border-blue-500' },
    { key: 'legal', label: 'Legal & Documentation', count: getStageDeals('legal').length, dotColor: 'bg-[#10b981]', borderTop: 'border-t-2 border-emerald-500' }
  ];

  container.innerHTML = `
    <div class="min-h-screen bg-[#f8f9fa] text-slate-800 flex font-sans select-none relative">
      
      <!-- Overlay for mobile sidebar -->
      <div id="sidebar-overlay" class="fixed inset-0 bg-slate-900/50 z-40 hidden lg:hidden opacity-0 transition-opacity duration-300"></div>

      <!-- Left CRM Sidebar (Matching Screenshot Exactly) -->
      <aside id="agent-sidebar" class="w-64 bg-white border-r border-slate-200/90 flex-col justify-between py-5 px-4 shrink-0 shadow-xs fixed lg:static inset-y-0 left-0 z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 flex">
        <div class="space-y-6">
          
          <!-- Top Brand & Agent Selector matching screenshot -->
          <div class="flex items-center gap-2.5 px-1 py-1">
            <!-- Black square logo icon [B] -->
            <div class="w-7 h-7 rounded-lg bg-black text-white font-black flex items-center justify-center text-sm">
              B
            </div>

            <!-- Agent Selector Pill with Default Avatar -->
            <div class="flex items-center justify-between flex-grow px-2 py-1.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 transition cursor-pointer">
              <div class="flex items-center gap-2 min-w-0">
                <img 
                  src="./images/default-avatar.png" 
                  alt="Robel Atikilt" 
                  class="w-5 h-5 rounded-full object-cover border border-slate-200"
                />
                <span class="text-xs font-bold text-slate-900 truncate">Robel Atikilt</span>
              </div>
              <span class="text-slate-400 text-[10px] ml-1">↕</span>
            </div>
          </div>

          <!-- Section: CRM -->
          <div class="space-y-1">
            <p class="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2 mb-2">CRM</p>
            
            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Properties
              </span>
              <span class="text-[10px] text-slate-500 font-semibold">${appStore.properties.length}</span>
            </a>

            <!-- Deals (Active highlighted tab in screenshot) -->
            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-950">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                Deals
              </span>
              <span class="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">${deals.length}</span>
            </a>

            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Leads
              </span>
            </a>

            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Tasks
              </span>
              <span class="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full">99+</span>
            </a>

            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Contacts
              </span>
            </a>

            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Messages
              </span>
              <span class="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full">8</span>
            </a>
          </div>

          <!-- Section: ANALYTICS -->
          <div class="space-y-1">
            <p class="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2 mb-2">ANALYTICS</p>
            
            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                Sales Analytics
              </span>
              <span class="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">BETA</span>
            </a>

            <a href="#" class="flex items-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Agent Performance
              </span>
            </a>

            <a href="#" class="flex items-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Conversion Funnel
              </span>
            </a>
          </div>

          <!-- Section: SYSTEM SETTINGS -->
          <div class="space-y-1">
            <p class="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2 mb-2">SYSTEM SETTINGS</p>
            
            <a href="#" class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                Link Integration
              </span>
              <span class="text-[9px] text-slate-400 font-bold flex items-center gap-0.5"><svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>+2</span>
            </a>

            <a href="#" class="flex items-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </span>
            </a>

            <a href="#" class="flex items-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              <span class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Help Center
              </span>
            </a>
          </div>

        </div>

        <!-- Return to Public Marketplace Button -->
        <div class="pt-4 border-t border-slate-200">
          <button id="agent-return-market-btn" class="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white hover:bg-black text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
            <span>←</span>
            <span>Public Marketplace</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area matching Screenshot -->
      <main class="flex-grow overflow-x-hidden flex flex-col min-h-screen">
        
        <!-- Top Search Bar matching Screenshot -->
        <header class="bg-white border-b border-slate-200/90 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30 shadow-2xs">
          
          <!-- Search input -->
          <div class="flex-1 min-w-[100px] max-w-md relative">
            <input 
              type="text" 
              placeholder="Search by client, phone or property ID" 
              class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-900"
            />
            <svg class="absolute left-3 top-2 text-slate-400 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>

          <!-- Right Controls -->
          <div class="flex items-center gap-3">
            
            <!-- Country Selector matching screenshot -->
            <div class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span>Ethiopia</span>
              <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <!-- Bell Notification -->
            <button class="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center text-xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>

            <!-- Menu icon -->
            <button id="mobile-menu-btn" class="lg:hidden w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center text-xs">
              ···
            </button>

            <!-- Post New Listing Button -->
            <button 
              id="open-new-listing-btn" 
              class="px-3 sm:px-4 py-2 rounded-xl bg-[#141414] hover:bg-black text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>+</span>
              <span class="hidden sm:inline">Post New Listing</span>
            </button>
          </div>
        </header>

        <!-- Main Body -->
        <div class="p-6 sm:p-8 space-y-6 flex-grow">
          
          <!-- Deals Pipeline Title Row matching Screenshot -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-black text-slate-900 tracking-tight">Deals pipeline</h1>
            </div>

            <!-- Right: Team avatars cluster + Invite Member button -->
            <div class="flex items-center gap-3">
              <div class="flex items-center -space-x-2">
                <img src="./images/default-avatar.png" alt="Robel" class="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Helen" class="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Dawit" class="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
                <div class="w-7 h-7 rounded-full border-2 border-white bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-xs">
                  +2
                </div>
              </div>

              <button class="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 shadow-2xs">
                <span>+</span> Invite Member
              </button>
            </div>
          </div>

          <!-- 3 High Level Metric Summary Cards (Exact Match to Screenshot) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <!-- Card 1: Pipeline Value -->
            <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div class="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span>Pipeline Value</span>
                <span class="cursor-pointer text-slate-400">ⓘ</span>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Total Asset Volume</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.totalAssetVolumeETB}</p>
                  <span class="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↑</span> 14% vs last month
                  </span>
                </div>
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Commission</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.commissionETB}</p>
                  <span class="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↑</span> 5% vs last month
                  </span>
                </div>
              </div>
            </div>

            <!-- Card 2: Deal Activity -->
            <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div class="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span>Deal Activity</span>
                <span class="cursor-pointer text-slate-400">ⓘ</span>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Viewings Booked</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.viewingsBooked}</p>
                  <span class="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↑</span> 12% vs last month
                  </span>
                </div>
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Offers Sent</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.offersSent}</p>
                  <span class="text-[11px] text-amber-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↓</span> 20% vs last month
                  </span>
                </div>
              </div>
            </div>

            <!-- Card 3: Conversion & Speed -->
            <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div class="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span>Conversion & Speed</span>
                <span class="cursor-pointer text-slate-400">ⓘ</span>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Avg. Days to Close</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.avgDaysToClose}</p>
                  <span class="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↑</span> 5% vs last month
                  </span>
                </div>
                <div>
                  <span class="text-[11px] text-slate-400 font-medium">Win Rate</span>
                  <p class="text-xl font-black text-slate-900 mt-1">${metrics.winRate}</p>
                  <span class="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                    <span>↑</span> 2% vs last month
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- Action Toolbar matching Screenshot -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <!-- Left: + New Deals & View Switcher -->
            <div class="flex items-center gap-3">
              <button id="post-listing-secondary" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-2xs">
                <span>+</span> <span class="hidden sm:inline">New Deals</span>
              </button>

              <!-- View switchers (Kanban, Grid, List) -->
              <div class="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <button class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 text-xs font-bold shadow-xs">⊞</button>
                <button class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-800 text-xs">⊟</button>
                <button class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-800 text-xs">≡</button>
              </div>
            </div>

            <!-- Right: Sort and Filter buttons -->
            <div class="flex items-center gap-2">
              <button class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-2xs">
                <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                Sort
              </button>
              <button class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-2xs">
                <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filter
              </button>
            </div>

          </div>

          <!-- Kanban Pipeline Columns matching Screenshot -->
          <div class="flex flex-nowrap md:grid md:grid-cols-2 xl:grid-cols-4 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x md:snap-none gap-5 items-start">
            ${stages.map(stage => {
              const stageDeals = getStageDeals(stage.key);
              return `
                <div class="bg-[#f0f2f5]/80 rounded-2xl p-4 border border-slate-200/80 flex flex-col space-y-3 w-[85vw] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none">
                  
                  <!-- Column Header matching Screenshot -->
                  <div class="flex items-center justify-between px-1">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full ${stage.dotColor}"></span>
                      <span class="font-bold text-xs text-slate-900">${stage.label}</span>
                      <span class="text-xs text-slate-500 font-semibold">${stage.count}</span>
                    </div>

                    <div class="flex items-center gap-2 text-slate-400">
                      <button class="hover:text-black font-bold open-post-quick">+</button>
                      <button class="hover:text-black font-bold">···</button>
                    </div>
                  </div>

                  <!-- Deal Cards Stack -->
                  <div class="space-y-3 min-h-[140px]">
                    ${stageDeals.length === 0 ? `
                      <div class="p-6 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-400">
                        No deals in this stage
                      </div>
                    ` : stageDeals.map(deal => `
                      <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3 group">
                        
                        <!-- Card Header: Code + Priority + Drag dots -->
                        <div class="flex items-center justify-between text-[11px]">
                          <span class="font-mono text-slate-400 font-bold text-[10px]">#${deal.id}</span>
                          
                          <div class="flex items-center gap-1.5">
                            <span class="px-2 py-0.5 rounded text-[9px] font-bold ${
                              deal.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-200' :
                              deal.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-slate-100 text-slate-600'
                            }">
                              ${deal.priority}
                            </span>
                            <span class="text-slate-300 text-xs">⋮⋮</span>
                          </div>
                        </div>

                        <!-- Side-by-Side Images matching Screenshot: Floor Plan + Exterior -->
                        <div class="grid grid-cols-2 gap-2 h-24 rounded-xl overflow-hidden bg-slate-100">
                          <img src="${deal.floorPlan}" alt="Floor plan" class="w-full h-full object-cover"/>
                          <img src="${deal.thumbnail}" alt="Exterior" class="w-full h-full object-cover"/>
                        </div>

                        <!-- Title and Specs -->
                        <div>
                          <p class="text-xs font-bold text-slate-900 leading-snug">${deal.propertyTitle}</p>
                          <p class="text-[11px] text-slate-500 mt-0.5">${deal.specs}</p>
                          
                          <!-- Bold Price matching Screenshot -->
                          <p class="text-base font-black text-slate-950 mt-1 tracking-tight">
                            ${((deal.offerETB || deal.priceETB) / 1000000).toFixed(1)}M ETB
                          </p>
                        </div>

                        <!-- Details Rows matching Screenshot: Reservation, Client, Source -->
                        <div class="space-y-1.5 text-[10px] text-slate-600 pt-2 border-t border-slate-100">
                          <div class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 text-slate-400">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              Reservation
                            </span>
                            <span class="font-medium text-slate-800">${deal.reservationDate || 'Recent'}</span>
                          </div>
                          <div class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 text-slate-400">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                              Client
                            </span>
                            <span class="font-bold text-slate-900 truncate max-w-[130px]">${deal.client}</span>
                          </div>
                          <div class="flex items-center justify-between">
                            <span class="flex items-center gap-1.5 text-slate-400">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                              Source
                            </span>
                            <span class="font-medium text-slate-800">${deal.source || 'combonirealestate.et'}</span>
                          </div>
                        </div>

                        <!-- Card Footer matching Screenshot: Avatar chips + Comments & Files -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          
                          <!-- Team Initials Pills matching screenshot [B][K] -->
                          <div class="flex items-center gap-1">
                            <span class="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[9px]">R</span>
                            <span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[9px]">A</span>
                          </div>

                          <div class="flex items-center gap-3">
                            <span class="flex items-center gap-1">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                              ${deal.commentsCount || 3} Comments
                            </span>
                            <span class="flex items-center gap-1">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                              ${deal.filesCount || 1} Files
                            </span>
                          </div>
                        </div>

                        <!-- Stage Mover Dropdown -->
                        <div class="pt-1.5 flex items-center justify-between border-t border-slate-50">
                          <span class="text-[9px] font-bold text-slate-400 uppercase">Stage:</span>
                          <select 
                            data-deal-id="${deal.id}" 
                            class="pipeline-stage-select text-[10px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 focus:ring-1 focus:ring-slate-900"
                          >
                            <option value="new" ${deal.stage === 'new' ? 'selected' : ''}>New</option>
                            <option value="viewing" ${deal.stage === 'viewing' ? 'selected' : ''}>Viewing Scheduled</option>
                            <option value="negotiation" ${deal.stage === 'negotiation' ? 'selected' : ''}>Negotiation</option>
                            <option value="legal" ${deal.stage === 'legal' ? 'selected' : ''}>Legal & Documentation</option>
                          </select>
                        </div>

                      </div>
                    `).join('')}
                  </div>

                </div>
              `;
            }).join('')}
          </div>

        </div>

      </main>

    </div>
  `;

  // Return to public marketplace
  container.querySelector('#agent-return-market-btn').addEventListener('click', () => {
    appStore.setView('marketplace');
  });

  // Post new listing triggers
  const openNewListing = () => appStore.toggleNewListingModal(true);
  container.querySelector('#open-new-listing-btn').addEventListener('click', openNewListing);
  container.querySelector('#post-listing-secondary').addEventListener('click', openNewListing);

  container.querySelectorAll('.open-post-quick').forEach(btn => {
    btn.addEventListener('click', openNewListing);
  });

  // Deal stage update listener
  container.querySelectorAll('.pipeline-stage-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const dealId = e.target.getAttribute('data-deal-id');
      const newStage = e.target.value;
      appStore.moveDeal(dealId, newStage);
    });
  });

  // Mobile sidebar toggle
  const sidebar = container.querySelector('#agent-sidebar');
  const overlay = container.querySelector('#sidebar-overlay');
  const menuBtn = container.querySelector('#mobile-menu-btn');

  const openSidebar = () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    // slight delay for opacity transition
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
  };

  const closeSidebar = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
  };

  if (menuBtn) menuBtn.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}
