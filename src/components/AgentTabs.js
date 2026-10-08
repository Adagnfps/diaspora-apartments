import { appStore } from '../data/store.js';

export function renderPropertiesTab() {
  const properties = appStore.properties;
  
  return `
    <div class="space-y-6 flex-grow animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Properties</h1>
        </div>
        <div class="flex items-center gap-3">
          <button id="add-property-btn" class="btn-glass-dark px-4 py-2 text-xs font-bold flex items-center gap-1.5 open-post-quick">
            <span>+</span> <span>New Listing</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <th class="p-4 rounded-tl-2xl">Property</th>
              <th class="p-4">Type</th>
              <th class="p-4">Price</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${properties.map(p => `
              <tr class="hover:bg-slate-50/50 transition">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <img src="${p.images[0]}" class="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <p class="text-xs font-bold text-slate-900">${p.title}</p>
                      <p class="text-[10px] text-slate-500">${p.unitNumber} • ${p.floor}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-xs font-medium text-slate-700">${p.type}</td>
                <td class="p-4 text-xs font-bold text-slate-900">${(p.priceETB / 1000000).toFixed(1)}M ETB</td>
                <td class="p-4">
                  <span class="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Active
                  </span>
                </td>
                <td class="p-4 text-right">
                  <button class="text-slate-400 hover:text-slate-900 font-bold px-2 py-1">···</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderLeadsTab() {
  const leads = [
    { name: 'Yohannes Tadesse', location: 'Washington D.C.', source: 'Diaspora Event', date: '2 hrs ago', status: 'Hot', interest: '3-Bed High Floor' },
    { name: 'Sarah Mekonnen', location: 'London, UK', source: 'Website', date: '5 hrs ago', status: 'Warm', interest: '2-Bed Investment' },
    { name: 'Amanuel Kebede', location: 'Dubai, UAE', source: 'Referral', date: '1 day ago', status: 'Cold', interest: 'Undecided' },
    { name: 'Eleni Assefa', location: 'Addis Ababa', source: 'Direct Call', date: '2 days ago', status: 'Warm', interest: 'Penthouse' },
  ];

  return `
    <div class="space-y-6 flex-grow animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Leads Inbox</h1>
        </div>
      </div>

      <div class="grid gap-4">
        ${leads.map(lead => `
          <div class="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between hover:shadow-md transition">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm border border-blue-100">
                ${lead.name.charAt(0)}
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">${lead.name}</p>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span class="flex items-center gap-1">📍 ${lead.location}</span>
                  <span>•</span>
                  <span>${lead.source}</span>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <span class="px-2.5 py-1 rounded text-[10px] font-bold ${
                lead.status === 'Hot' ? 'bg-red-50 text-red-600 border border-red-100' :
                lead.status === 'Warm' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                'bg-slate-50 text-slate-600 border border-slate-200'
              }">${lead.status} Lead</span>
              <p class="text-[10px] text-slate-400 mt-1.5">Int: ${lead.interest}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderTasksTab() {
  const tasks = appStore.tasks;

  return `
    <div class="space-y-6 flex-grow animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Tasks</h1>
        </div>
        <button class="btn-glass-dark px-4 py-2 text-xs font-bold">
          + Add Task
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
        ${tasks.map(t => `
          <div class="p-4 flex items-center justify-between hover:bg-slate-50 transition group cursor-pointer">
            <div class="flex items-center gap-4">
              <input type="checkbox" data-task-id="${t.id}" class="task-checkbox w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer" ${t.completed ? 'checked' : ''} />
              <div>
                <p class="text-sm font-bold ${t.completed ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-black'}">${t.task}</p>
                <div class="flex items-center gap-3 text-[10px] text-slate-500 mt-1">
                  <span class="flex items-center gap-1 font-semibold text-slate-600">
                    ⏱ ${t.due}
                  </span>
                  <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">${t.type}</span>
                </div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[9px] font-bold ${
              t.priority === 'High' ? 'bg-red-50 text-red-600' :
              t.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
              'bg-slate-100 text-slate-500'
            }">${t.priority}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderContactsTab() {
  const contacts = [
    { name: 'Dr. Dawit Tadesse', role: 'Investor', phone: '+1 (555) 019-2831', email: 'dawit.t@example.com' },
    { name: 'Meron Assefa', role: 'Buyer', phone: '+44 7700 900077', email: 'meron.a@example.com' },
    { name: 'Samuel Bekele', role: 'Partner Agent', phone: '+251 911 234567', email: 'samuel.b@agency.et' },
  ];

  return `
    <div class="space-y-6 flex-grow animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Contacts</h1>
        <div class="relative">
          <input type="text" placeholder="Search contacts..." class="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs bg-white w-64 focus:ring-1 focus:ring-slate-900 outline-none" />
          <span class="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${contacts.map(c => `
          <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition text-center space-y-3">
            <div class="w-14 h-14 mx-auto rounded-full bg-slate-100 border-2 border-white shadow-xs flex items-center justify-center text-lg font-black text-slate-400">
              ${c.name.charAt(0)}
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900">${c.name}</p>
              <p class="text-[11px] text-slate-500 font-medium">${c.role}</p>
            </div>
            <div class="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 flex flex-col items-center">
              <p class="flex items-center gap-1.5"><span>📞</span> ${c.phone}</p>
              <p class="flex items-center gap-1.5"><span>✉️</span> ${c.email}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderMessagesTab() {
  const messages = appStore.messages;
  
  return `
    <div class="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Messages</h1>
      
      <div class="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex overflow-hidden min-h-[400px]">
        <!-- Sidebar -->
        <div class="w-1/3 border-r border-slate-100 flex flex-col">
          <div class="p-3 border-b border-slate-100">
            <input type="text" placeholder="Search chats..." class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-900" />
          </div>
          <div class="flex-1 overflow-y-auto">
            <div class="p-3 border-b border-slate-50 bg-slate-50 cursor-pointer">
              <div class="flex justify-between items-start">
                <p class="text-xs font-bold text-slate-900">Yohannes T.</p>
                <span class="text-[9px] text-slate-400">10:42 AM</span>
              </div>
              <p class="text-[10px] text-slate-500 mt-1 truncate">Is the 5th floor unit still available?</p>
            </div>
            <div class="p-3 border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer transition">
              <div class="flex justify-between items-start">
                <p class="text-xs font-bold text-slate-900">Legal Team</p>
                <span class="text-[9px] text-slate-400">Yesterday</span>
              </div>
              <p class="text-[10px] text-slate-500 mt-1 truncate">Contracts are ready for review.</p>
            </div>
          </div>
        </div>
        
        <!-- Chat Area -->
        <div class="flex-1 flex flex-col bg-slate-50/50">
          <div class="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
            <div>
              <p class="text-sm font-bold text-slate-900">Yohannes T.</p>
              <p class="text-[10px] text-slate-400">Online</p>
            </div>
            <button class="text-slate-400 hover:text-slate-900">···</button>
          </div>
          
          <div class="flex-1 p-4 overflow-y-auto space-y-4" id="messages-container">
            ${messages.map(m => m.isMine ? `
              <div class="flex flex-col items-end">
                <div class="bg-slate-900 text-white px-3 py-2 rounded-2xl rounded-tr-sm shadow-xs text-xs max-w-[80%]">
                  ${m.text}
                </div>
                <span class="text-[9px] text-slate-400 mt-1 mr-1">${m.time}</span>
              </div>
            ` : `
              <div class="flex flex-col items-start">
                <div class="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-sm shadow-xs text-xs text-slate-700 max-w-[80%]">
                  ${m.text}
                </div>
                <span class="text-[9px] text-slate-400 mt-1 ml-1">${m.time}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <button class="p-1.5 text-slate-400 hover:text-slate-600">📎</button>
            <input type="text" id="new-message-input" placeholder="Type a message..." class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900" />
            <button id="send-message-btn" class="btn-glass-dark px-4 py-1.5 text-xs font-bold">Send</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderAnalyticsTab() {
  return `
    <div class="space-y-6 flex-grow animate-fade-in">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Sales Analytics</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Chart 1 Placeholder -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 class="text-xs font-bold text-slate-700 mb-4">Revenue over Time (M ETB)</h3>
          <div class="h-48 flex items-end justify-between gap-2 border-b border-slate-100 pb-2">
            <div class="w-1/6 bg-slate-100 rounded-t-sm h-[30%] hover:bg-slate-200 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100">30M</span></div>
            <div class="w-1/6 bg-slate-100 rounded-t-sm h-[45%] hover:bg-slate-200 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100">45M</span></div>
            <div class="w-1/6 bg-slate-200 rounded-t-sm h-[60%] hover:bg-slate-300 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100">60M</span></div>
            <div class="w-1/6 bg-slate-800 rounded-t-sm h-[85%] hover:bg-slate-900 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 text-slate-900">85M</span></div>
            <div class="w-1/6 bg-slate-200 rounded-t-sm h-[50%] hover:bg-slate-300 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100">50M</span></div>
            <div class="w-1/6 bg-slate-100 rounded-t-sm h-[70%] hover:bg-slate-200 transition relative group"><span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100">70M</span></div>
          </div>
          <div class="flex justify-between mt-2 text-[9px] text-slate-400 font-bold">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        <!-- Chart 2 Placeholder -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <h3 class="text-xs font-bold text-slate-700 mb-4">Lead Sources</h3>
          <div class="flex items-center gap-6 h-48">
            <div class="w-32 h-32 rounded-full border-[16px] border-slate-100 border-r-slate-800 border-b-slate-800 mx-auto transform rotate-45"></div>
            <div class="flex-1 space-y-3">
              <div class="flex justify-between text-[11px]">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-800"></span> Website</span>
                <span class="font-bold text-slate-900">55%</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Referrals</span>
                <span class="font-bold text-slate-900">30%</span>
              </div>
              <div class="flex justify-between text-[11px]">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-100"></span> Direct</span>
                <span class="font-bold text-slate-900">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
