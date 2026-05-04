import { useState } from 'react';

// Material Symbol helper — uses Google Material Symbols Outlined (loaded via CSS in index.html)
const M = ({ icon, className = '', size = 22, filled = false }) => (
  <span
    className={`material-symbols-outlined select-none leading-none ${className}`}
    style={{
      fontSize: size,
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
    }}
  >
    {icon}
  </span>
);

export default function App() {
  const [leftTab, setLeftTab] = useState('components');
  const [rightTab, setRightTab] = useState('element');
  const [phoneMode, setPhoneMode] = useState('chat');
  const [hasContent, setHasContent] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [elementImage, setElementImage] = useState(null);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    cards: true, quick: false, timelines: false, tables: false,
    content: false, dataDisplay: false, actions: false, layout: false,
  });

  // ---------- OUTER DASHBOARD SIDEBAR ----------
  const navItems = [
    { icon: 'campaign', label: 'Campaigns' },
    { icon: 'description', label: 'Templates', active: true },
    { icon: 'sell', label: 'Categories' },
    { icon: 'cell_tower', label: 'Channels' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'auto_awesome', label: 'Playground' },
  ];
  const analyticsSub = ['Overview', 'Campaigns', 'Templates'];

  const Sidebar = () => (
    <aside
      className={`${sidebarCollapsed ? 'w-16' : 'w-[220px]'} shrink-0 border-r border-neutral-200 bg-white flex flex-col h-full transition-all duration-200 overflow-hidden`}
    >
      {/* Logo */}
      <div className={`px-4 pt-4 pb-2 flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="w-8 h-8 rounded-md bg-neutral-900 flex items-center justify-center text-white text-[11px] font-bold shrink-0">CC</div>
        {!sidebarCollapsed && <span className="font-semibold text-[15px] tracking-tight text-neutral-900">Campaigns</span>}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="mx-3 mb-1 mt-1 flex items-center justify-center h-7 rounded-md hover:bg-neutral-100 text-neutral-500"
      >
        <M icon={sidebarCollapsed ? 'chevron_right' : 'chevron_left'} size={20} />
      </button>

      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            title={sidebarCollapsed ? item.label : undefined}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-[14px] transition-colors ${
              item.active
                ? 'bg-violet-50 text-violet-700 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            } ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <M icon={item.icon} size={20} className={item.active ? 'text-violet-600' : 'text-neutral-500'} />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}

        {/* Analytics expandable */}
        <div className="pt-1">
          <button className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-[14px] text-neutral-600 hover:bg-neutral-50 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <M icon="bar_chart" size={20} className="text-neutral-500" />
            {!sidebarCollapsed && (
              <>
                <span>Analytics</span>
                <M icon="expand_more" size={18} className="ml-auto text-neutral-500" />
              </>
            )}
          </button>
          {!sidebarCollapsed && (
            <div className="ml-9 mt-0.5 space-y-0.5">
              {analyticsSub.map((s) => (
                <button key={s} className="w-full text-left px-2.5 py-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* User footer */}
      <div className="border-t border-neutral-200 px-2 py-2.5">
        <button className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-neutral-50 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">NB</div>
          {!sidebarCollapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[13px] font-medium text-neutral-900 truncate">No Broker</div>
                <div className="text-[11px] text-neutral-500 truncate">240998KMSF2025</div>
              </div>
              <M icon="unfold_more" size={16} className="text-neutral-500" />
            </>
          )}
        </button>
        {!sidebarCollapsed && (
          <div className="mt-1.5 px-2 text-[10px] text-neutral-500 font-mono">Tenant: 254344a01b20f593</div>
        )}
      </div>
    </aside>
  );

  // ---------- TOP HEADER ----------
  const TopHeader = () => (
    <div className="h-14 border-b border-neutral-200 bg-white flex items-center px-5 shrink-0">
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-base font-semibold tracking-tight text-neutral-900">Create Template</h1>
        <span className="text-[12px] text-neutral-500 font-mono">qwfqwfwq · cc-template-qwfqwfwq</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors">
          <M icon="arrow_back" size={18} /> Cancel
        </button>
        <button className="flex items-center gap-1.5 px-3.5 h-9 rounded-lg border border-neutral-200 text-[13px] text-neutral-600 hover:bg-neutral-50 font-medium transition-colors">
          <span className="text-violet-600 font-mono text-[12px]">{'{...}'}</span> Variables
        </button>
        <button className="px-4 h-9 rounded-lg bg-violet-600 text-white text-[13px] font-medium hover:bg-violet-700 transition-colors">
          Create Template
        </button>
      </div>
    </div>
  );

  // ---------- BUILDER SUB-HEADER ----------
  const BuilderHeader = () => (
    <div className="h-12 border-b border-neutral-200 bg-white flex items-center px-4 gap-2.5 shrink-0">
      <button className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors">
        <M icon="arrow_back" size={20} className="text-neutral-600" />
      </button>
      <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center text-white text-[8px] font-bold">CC</div>
      <span className="text-[13px] font-semibold text-neutral-900">cometchat</span>
      <span className="text-neutral-300 text-[13px]">|</span>
      <span className="text-[13px] text-neutral-600">Untitled Card</span>
      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" title="unsaved" />
      <div className="ml-2 flex items-center gap-0.5">
        <button className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"><M icon="undo" size={18} className="text-neutral-500" /></button>
        <button className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"><M icon="redo" size={18} className="text-neutral-500" /></button>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button className="flex items-center gap-1 px-3 h-8 rounded-md bg-amber-50 text-amber-700 text-[12.5px] font-medium border border-amber-200/60">
          <M icon="warning" size={16} /> 2 issues
        </button>
        <button className="px-3 h-8 rounded-md border border-neutral-200 text-[12.5px] text-neutral-600 hover:bg-neutral-50 font-medium flex items-center gap-1 transition-colors">
          Import <M icon="expand_more" size={16} />
        </button>
        <button className="px-3 h-8 rounded-md border border-neutral-200 text-[12.5px] text-neutral-600 hover:bg-neutral-50 font-medium transition-colors">
          Clear
        </button>
        <button className="px-3 h-8 rounded-md border border-neutral-200 text-[12.5px] text-neutral-600 hover:bg-neutral-50 font-medium flex items-center gap-1 transition-colors">
          Export <M icon="expand_more" size={16} />
        </button>
        <button className="px-3 h-8 rounded-md border border-neutral-200 text-[12.5px] text-neutral-600 hover:bg-neutral-50 font-medium transition-colors">
          Save
        </button>
        <button className="px-4 h-8 rounded-md bg-neutral-900 text-white text-[12.5px] font-medium hover:bg-neutral-800 transition-colors">
          Send
        </button>
      </div>
    </div>
  );

  // ---------- LEFT PANEL ----------
  const componentGroups = [
    {
      key: 'cards', label: 'Cards', icon: 'dashboard', items: [
        { icon: 'shopping_bag', title: 'Product Card', sub: 'Image, title, price & buy buttons' },
        { icon: 'check_circle', title: 'Order Confirmation', sub: 'Status, order details & tracking button' },
        { icon: 'campaign', title: 'Announcement', sub: 'Simple message with a CTA link' },
        { icon: 'event', title: 'Event Card', sub: 'Image, date, location & RSVP' },
        { icon: 'view_carousel', title: 'Carousel', sub: 'Scrollable cards with image & button' },
      ],
    },
    {
      key: 'quick', label: 'Quick Actions', icon: 'bolt', items: [
        { icon: 'quickreply', title: 'Quick Reply Buttons', sub: 'Prompt with tappable reply options' },
        { icon: 'star', title: 'Feedback', sub: 'Quick feedback buttons' },
      ],
    },
    {
      key: 'timelines', label: 'Timelines', icon: 'timeline', items: [
        { icon: 'local_shipping', title: 'Order Tracking', sub: 'Progress bar, status details & actions' },
      ],
    },
    {
      key: 'tables', label: 'Tables', icon: 'table_chart', items: [
        { icon: 'table_chart', title: 'Data Table', sub: 'Striped table with headers' },
      ],
    },
  ];

  const elementGroups = [
    {
      key: 'layout', label: 'Layout', icon: 'grid_view', items: [
        { icon: 'check_box_outline_blank', title: 'Container' },
        { icon: 'table_rows', title: 'Row' },
        { icon: 'view_column', title: 'Column' },
        { icon: 'tab', title: 'Tabs' },
      ],
    },
    {
      key: 'content', label: 'Content', icon: 'article', items: [
        { icon: 'text_fields', title: 'Text' },
        { icon: 'image', title: 'Image' },
        { icon: 'star', title: 'Icon' },
        { icon: 'account_circle', title: 'Avatar' },
        { icon: 'badge', title: 'Badge' },
        { icon: 'horizontal_rule', title: 'Divider' },
        { icon: 'space_bar', title: 'Spacer' },
        { icon: 'label', title: 'Chip' },
        { icon: 'markdown', title: 'Markdown' },
        { icon: 'code', title: 'Code Block' },
      ],
    },
    {
      key: 'dataDisplay', label: 'Data Display', icon: 'monitoring', items: [
        { icon: 'table_chart', title: 'Table' },
        { icon: 'percent', title: 'Progress Bar' },
      ],
    },
    {
      key: 'actions', label: 'Actions', icon: 'touch_app', items: [
        { icon: 'smart_button', title: 'Button' },
        { icon: 'radio_button_unchecked', title: 'Icon Button' },
        { icon: 'link', title: 'Link' },
      ],
    },
  ];

  const toggleGroup = (key) => setOpenGroups((g) => ({ ...g, [key]: !g[key] }));

  const LeftPanel = () => {
    const [search, setSearch] = useState('');
    const allGroups = leftTab === 'components' ? componentGroups : elementGroups;

    // Filter groups and items by search query
    const groups = search.trim()
      ? allGroups
          .map((group) => ({
            ...group,
            items: group.items.filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                (item.sub && item.sub.toLowerCase().includes(search.toLowerCase()))
            ),
          }))
          .filter((group) => group.items.length > 0)
      : allGroups;

    return (
      <div className="w-[320px] shrink-0 border-r border-neutral-200 bg-white flex flex-col h-full min-w-0">
        {/* Tab switcher */}
        <div className="p-3 pb-2">
          <div className="grid grid-cols-2 gap-0.5 p-0.5 bg-neutral-100 rounded-lg">
            {[
              { id: 'components', icon: 'widgets', label: 'Components' },
              { id: 'elements', icon: 'category', label: 'Elements' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setLeftTab(tab.id); setSearch(''); }}
                className={`flex items-center justify-center gap-1.5 h-9 rounded-md text-[13px] font-medium transition-all ${
                  leftTab === tab.id ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                <M icon={tab.icon} size={18} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="relative">
            <M icon="search" size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${leftTab}…`}
              className="w-full h-9 pl-9 pr-8 rounded-lg border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
              >
                <M icon="close" size={13} className="text-neutral-600" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <M icon="search_off" size={32} className="text-neutral-300 mb-2" />
              <div className="text-[13px] font-medium text-neutral-500">No results found</div>
              <div className="text-[12px] text-neutral-400 mt-0.5">Try a different search term</div>
            </div>
          ) : (
          groups.map((group) => {
            const isSearching = search.trim().length > 0;
            const isOpen = isSearching || openGroups[group.key];
            return (
              <div key={group.key} className="mb-1">
                {/* Accordion header */}
                <button
                  onClick={() => toggleGroup(group.key)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                    isOpen
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <M icon={group.icon} size={18} className={isOpen ? 'text-violet-600' : 'text-neutral-500'} />
                  <span>{group.label}</span>
                  <span className={`ml-auto text-[11px] font-medium tabular-nums ${isOpen ? 'text-violet-500' : 'text-neutral-600'}`}>{group.items.length}</span>
                  <M
                    icon="expand_more"
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? 'text-violet-500' : 'text-neutral-500'} ${isOpen ? '' : '-rotate-90'}`}
                  />
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div className="mt-0.5 space-y-0.5 pb-1">
                    {group.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setHasContent(true)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-all border border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                      >
                        <div className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center bg-neutral-100">
                          <M icon={item.icon} size={18} className="text-neutral-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-medium truncate text-neutral-800">{item.title}</div>
                          {item.sub && <div className="text-[12.5px] text-neutral-500 truncate leading-snug mt-0.5">{item.sub}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
          )}
        </div>

        {/* Footer drop zone */}
        <div className="border-t border-dashed border-neutral-200 p-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[12.5px] text-neutral-500 py-2.5 rounded-lg border border-dashed border-neutral-200 hover:border-neutral-300 hover:text-neutral-600 cursor-pointer transition-colors">
            <M icon="add" size={18} /> Add element
          </div>
        </div>
      </div>
    );
  };

  // ---------- CANVAS (responsive) ----------
  const ChatPhonePreview = () => (
    <div className="relative w-[340px] h-[680px] bg-neutral-50 rounded-[24px] border border-neutral-200 shadow-sm overflow-hidden flex flex-col shrink-0">
      {/* drag pill */}
      <div className="pt-2.5 pb-1.5 flex justify-center">
        <div className="w-9 h-1 rounded-full bg-neutral-300" />
      </div>
      {/* header */}
      <div className="px-3 py-2 flex items-center gap-2.5 bg-white border-b border-neutral-100">
        <button className="p-0.5"><M icon="arrow_back" size={18} className="text-neutral-600" /></button>
        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-[12px] font-semibold">A</div>
        <span className="text-[13px] font-semibold text-neutral-900">Ada Stanton</span>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 bg-neutral-50">
        <div className="flex justify-center mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-[10.5px] text-neutral-500">May 4, 2026</span>
        </div>

        {!hasContent ? (
          /* Empty state — click to add product */
          <button
            onClick={() => setHasContent(true)}
            className="w-full rounded-xl border-2 border-dashed border-neutral-300 bg-white/60 py-10 flex flex-col items-center gap-3 hover:border-violet-400 hover:bg-violet-50/30 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-neutral-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
              <M icon="add" size={24} className="text-neutral-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <div className="text-center">
              <div className="text-[13px] font-medium text-neutral-700 group-hover:text-violet-700 transition-colors">Add an element</div>
              <div className="text-[12px] text-neutral-500 mt-0.5">Drag from the left panel or click here</div>
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200/70 overflow-hidden shadow-sm">
            {/* product image area */}
            <div className="aspect-square bg-gradient-to-br from-violet-100 via-violet-50 to-indigo-100 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-violet-300/30 flex items-center justify-center">
                  <M icon="campaign" size={36} className="text-violet-600" />
                </div>
              </div>
              <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-violet-200/60 flex items-center justify-center">
                <M icon="chat" size={16} className="text-violet-700" />
              </div>
              <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-violet-200/60 flex items-center justify-center">
                <M icon="circle" size={16} className="text-violet-700" />
              </div>
            </div>

            <div className="p-3.5">
              <div className="text-[13px] font-semibold text-neutral-900">Product Title</div>
              <div className="text-[14px] font-bold text-violet-600 mt-0.5">$0.00</div>
              <div className="text-[11.5px] text-neutral-500 mt-1">Product description goes here.</div>
              <div className="flex gap-2 mt-2.5">
                <button className="px-3.5 h-8 rounded-md bg-violet-600 text-white text-[11.5px] font-semibold">Buy Now</button>
                <button className="px-3.5 h-8 rounded-md border border-violet-300 text-violet-700 text-[11.5px] font-semibold">Details</button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <M icon="check_circle" size={18} className="text-emerald-500" />
                <span className="text-[12.5px] font-semibold text-emerald-600">Order Confirmed</span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1 text-[11.5px] text-neutral-600">
                <div className="flex gap-2"><span>Order ID:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.id}}'}</code></div>
                <div className="flex gap-2"><span>Total:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.total}}'}</code></div>
                <div className="flex gap-2"><span>Delivery:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.deliveryDate}}'}</code></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="px-3 py-2.5 bg-white border-t border-neutral-100 flex items-center gap-2">
        <div className="flex-1 h-9 rounded-full bg-neutral-100 px-3.5 flex items-center text-[11.5px] text-neutral-400">
          Enter your message here
        </div>
        <button className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
          <M icon="send" size={16} className="text-white" />
        </button>
      </div>
    </div>
  );

  const IOSPhonePreview = () => (
    <div
      className="relative w-[320px] h-[700px] rounded-[36px] overflow-hidden shadow-lg shrink-0"
      style={{ background: 'linear-gradient(160deg, #a5b8ff 0%, #b89ff5 35%, #9a7fea 65%, #7fc4d4 100%)' }}
    >
      {/* status bar */}
      <div className="absolute top-3.5 right-4 flex items-center gap-1.5 text-white">
        <M icon="signal_cellular_alt" size={14} />
        <M icon="wifi" size={14} />
        <M icon="battery_full" size={16} />
      </div>

      <div className="pt-16 text-center text-white">
        <div className="text-[13px] font-medium opacity-90">Monday, May 4</div>
        <div className="text-[72px] font-thin tracking-tight leading-none mt-0.5">13:53</div>
      </div>

      {/* notification */}
      <div className="absolute bottom-28 left-3 right-3">
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3.5 border border-white/40 shadow-lg">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-violet-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-bold text-neutral-900">App</span>
                <span className="text-[11px] text-neutral-500">now</span>
              </div>
              <div className="text-[12.5px] text-neutral-700 mt-0.5 leading-snug">
                Enter title and body in the Notification tab
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dock */}
      <div className="absolute bottom-9 left-0 right-0 flex justify-around px-12">
        <button className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
          <M icon="lightbulb" size={18} className="text-white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
          <M icon="photo_camera" size={18} className="text-white" />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/80" />
    </div>
  );

  const Canvas = () => (
    <div
      className="flex-1 relative overflow-hidden bg-neutral-100 min-w-0"
      style={{ backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)', backgroundSize: '14px 14px' }}
    >
      {/* breadcrumb */}
      {phoneMode === 'chat' && (
        <div className="absolute top-3 left-3 flex items-center gap-1 text-[12px] z-10">
          <span className="text-neutral-600">body</span>
          <M icon="chevron_right" size={16} className="text-neutral-500" />
          <code className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 text-[11.5px] font-mono">row[0]</code>
        </div>
      )}

      {/* phone — centered and responsive */}
      <div className="w-full h-full flex items-center justify-center p-6">
        {phoneMode === 'ios' ? <IOSPhonePreview /> : <ChatPhonePreview />}
      </div>

      {/* mode switcher */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 bg-white rounded-xl border border-neutral-200 shadow-sm p-1.5">
        {[
          { id: 'chat', icon: 'chat', label: 'Chat' },
          { id: 'ios', icon: 'phone_iphone', label: 'iOS' },
          { id: 'android', icon: 'phone_android', label: 'Android' },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setPhoneMode(mode.id)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              phoneMode === mode.id ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title={mode.label}
          >
            <M icon={mode.icon} size={20} />
          </button>
        ))}
      </div>

      {/* zoom toolbar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white rounded-full border border-neutral-200 shadow-sm px-2 py-1">
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="remove" size={18} />
        </button>
        <span className="text-[12px] font-medium text-neutral-700 px-1.5 tabular-nums min-w-[36px] text-center">84%</span>
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="add" size={18} />
        </button>
        <div className="w-px h-4 bg-neutral-200 mx-1" />
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="fit_screen" size={18} />
        </button>
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="visibility" size={18} />
        </button>
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="data_object" size={18} />
        </button>
        <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors">
          <M icon="help_outline" size={18} />
        </button>
      </div>
    </div>
  );

  // ---------- RIGHT PANEL ----------
  const Field = ({ label, children }) => (
    <div className="space-y-1.5">
      <label className="text-[12.5px] text-neutral-700 font-medium">{label}</label>
      {children}
    </div>
  );

  const Input = ({ value = '', placeholder = '', mono = false, suffix }) => (
    <div className="relative">
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className={`w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors ${mono ? 'font-mono text-[12px]' : ''} ${suffix ? 'pr-9' : ''}`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-500">{suffix}</span>}
    </div>
  );

  const Select = ({ value }) => (
    <div className="relative">
      <select defaultValue={value} className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium appearance-none focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors">
        <option>{value}</option>
      </select>
      <M icon="expand_more" size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
    </div>
  );

  const Section = ({ label, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-neutral-100 pb-3">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-1.5 py-2.5 text-[11px] font-bold tracking-[0.08em] text-neutral-600 uppercase hover:text-neutral-800 transition-colors"
        >
          <M icon={open ? 'expand_more' : 'chevron_right'} size={16} />
          {label}
        </button>
        {open && <div className="space-y-3 pt-1">{children}</div>}
      </div>
    );
  };

  const Checkbox = ({ label }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span className="w-4.5 h-4.5 rounded border border-neutral-300 bg-white group-hover:border-violet-400 transition-colors flex items-center justify-center" />
      <span className="text-[13px] text-neutral-700">{label}</span>
    </label>
  );

  const ColorSwatch = ({ label }) => (
    <button className={`inline-flex items-center gap-2 mr-2 px-3 h-8 rounded-md border text-[12.5px] font-medium transition-colors ${
      label === 'Dark'
        ? 'bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700'
        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
    }`}>
      <div
        className="w-4 h-4 rounded border border-neutral-300/50"
        style={{
          backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0',
        }}
      />
      {label}
    </button>
  );

  const ImageInput = () => {
    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setElementImage(url);
      }
    };

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[12.5px] text-neutral-700 font-medium">Image</label>
          {elementImage && (
            <button
              onClick={() => setElementImage(null)}
              className="text-[11px] text-neutral-500 hover:text-red-500 transition-colors font-medium"
            >
              Remove
            </button>
          )}
        </div>

        {elementImage ? (
          <div className="relative w-full h-[280px] rounded-lg overflow-hidden border border-neutral-200 group">
            <img
              src={elementImage}
              alt="Element"
              className="w-full h-full object-cover"
            />
            {/* Hover overlay with expand button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <button
                onClick={() => setImageExpanded(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 h-9 rounded-lg bg-white/90 backdrop-blur-sm text-[12.5px] font-medium text-neutral-800 hover:bg-white shadow-sm"
              >
                <M icon="open_in_full" size={16} /> Expand
              </button>
            </div>
            {/* Bottom bar with file info */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/80 font-medium truncate">Uploaded image</span>
                <button
                  onClick={() => setImageExpanded(true)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <M icon="open_in_full" size={15} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-[120px] rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 hover:border-violet-400 hover:bg-violet-50/30 transition-all cursor-pointer group">
            <div className="w-11 h-11 rounded-full bg-neutral-100 group-hover:bg-violet-100 flex items-center justify-center mb-2.5 transition-colors">
              <M icon="add_photo_alternate" size={22} className="text-neutral-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <span className="text-[13px] font-medium text-neutral-600 group-hover:text-violet-700 transition-colors">Upload image</span>
            <span className="text-[11.5px] text-neutral-500 mt-0.5">PNG, JPG, SVG or WebP</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
    );
  };

  const RowProperties = () => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <M icon="table_rows" size={18} className="text-violet-600" />
        <span className="text-[11px] font-bold tracking-wider text-violet-700 uppercase">Row</span>
      </div>
      <Field label="ID"><Input value="row_7b2129a8-b784-4687-b583-3379818f5ab8" mono /></Field>
      <Section label="Image">
        <ImageInput />
      </Section>
      <Section label="Layout">
        <Field label="Gap"><Input value="8" suffix="px" /></Field>
        <Field label="Align"><Select value="start" /></Field>
        <Field label="Cross Align"><Select value="start" /></Field>
        <Checkbox label="Wrap" />
      </Section>
      <Section label="Scrollable">
        <Checkbox label="Scrollable (Carousel)" />
      </Section>
      <Section label="Spacing">
        <Field label="Padding"><Input placeholder="0" suffix="px" /></Field>
      </Section>
      <Section label="Style">
        <div>
          <div className="text-[12.5px] text-neutral-700 font-medium mb-2">Background</div>
          <ColorSwatch label="Light" /><ColorSwatch label="Dark" />
        </div>
        <Field label="Border Radius"><Input suffix="px" /></Field>
        <Field label="Border Width"><Input suffix="px" /></Field>
        <div>
          <div className="text-[12.5px] text-neutral-700 font-medium mb-2">Border Color</div>
          <ColorSwatch label="Light" /><ColorSwatch label="Dark" />
        </div>
      </Section>
      <div className="text-[11.5px] text-neutral-500 pt-2 flex items-center gap-1">
        <M icon="info" size={15} className="text-neutral-400" /> 0 child elements
      </div>
    </div>
  );

  const CardProperties = () => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <M icon="dashboard" size={18} className="text-violet-600" />
        <span className="text-[11px] font-bold tracking-wider text-violet-700 uppercase">Card</span>
      </div>
      <Section label="Message">
        <Field label="Type"><Input value="custom_type" mono /></Field>
      </Section>
      <Section label="Background">
        <ColorSwatch label="Light" /><ColorSwatch label="Dark" />
      </Section>
      <Section label="Border & Shape">
        <Field label="Border Radius (px)"><Input value="16" /></Field>
        <Field label="Border Width"><Input /></Field>
        <div>
          <div className="text-[12.5px] text-neutral-700 font-medium mb-2">Border Color</div>
          <ColorSwatch label="Light" /><ColorSwatch label="Dark" />
        </div>
      </Section>
      <Section label="Spacing">
        <Field label="Padding"><Input value="12" /></Field>
      </Section>
      <Section label="Text">
        <div className="space-y-1.5">
          <label className="text-[12.5px] text-neutral-700 font-medium">Fallback Text (required)</label>
          <div className="relative">
            <textarea
              placeholder="Plain text for older UI Kit versions"
              className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
            />
            <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </Section>
    </div>
  );

  const NotificationProperties = () => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <M icon="notifications" size={18} className="text-violet-600" />
        <span className="text-[11px] font-bold tracking-wider text-violet-700 uppercase">Notification</span>
      </div>
      <Section label="Push Notification Content">
        <div className="space-y-1.5">
          <label className="text-[12.5px] text-neutral-700 font-medium">Body</label>
          <div className="relative">
            <textarea
              placeholder="Notification body…"
              className="w-full min-h-[90px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
            />
            <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
        <div className="text-[12.5px] text-neutral-500 leading-relaxed pt-1">
          The notification preview is shown in the canvas area. Edit the title and body here to see it update in real-time.
        </div>
      </Section>
    </div>
  );

  const VariablesProperties = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <M icon="data_object" size={18} className="text-violet-600" />
          <span className="text-[11px] font-bold tracking-wider text-violet-700 uppercase">Variables</span>
        </div>
        <button className="px-3 h-8 rounded-md border border-neutral-200 text-[12.5px] text-neutral-600 hover:bg-neutral-50 font-medium flex items-center gap-1 transition-colors">
          Add <M icon="add" size={16} />
        </button>
      </div>
      <div className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">0 Variables</div>
      <div className="text-[13px] text-neutral-500 leading-relaxed">No variables defined. Click "Add +" to create one.</div>
    </div>
  );

  const TreeProperties = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <M icon="account_tree" size={18} className="text-violet-600" />
        <span className="text-[11px] font-bold tracking-wider text-violet-700 uppercase">Tree</span>
      </div>
      <div className="text-[13px] text-neutral-600">Hierarchical view of the card tree will appear here.</div>
      <div className="space-y-0.5 mt-2 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 text-neutral-700 px-2 py-2 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors">
          <M icon="expand_more" size={16} /> body
        </div>
        <div className="flex items-center gap-1.5 text-violet-700 pl-6 pr-2 py-2 bg-violet-50 rounded-md">
          <M icon="chevron_right" size={16} /> row[0]
        </div>
      </div>
    </div>
  );

  const RightPanel = () => {
    const tabs = [
      { id: 'tree', icon: 'account_tree', label: 'Tree' },
      { id: 'element', icon: 'tune', label: 'Element' },
      { id: 'card', icon: 'dashboard', label: 'Card' },
      { id: 'notification', icon: 'notifications', label: 'Notification' },
      { id: 'variables', icon: 'data_object', label: 'Variables' },
    ];
    return (
      <div className="w-[400px] shrink-0 border-l border-neutral-200 bg-white flex flex-col h-full min-w-0">
        {/* Tabs */}
        <div className="px-2 pt-2 border-b border-neutral-200 shrink-0">
          <div className="flex items-center">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setRightTab(t.id)}
                className={`flex-1 flex items-center justify-center py-2.5 text-[12.5px] font-medium relative transition-colors whitespace-nowrap ${
                  rightTab === t.id ? 'text-violet-700' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {t.label}
                {rightTab === t.id && <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-violet-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {rightTab === 'tree' && <TreeProperties />}
          {rightTab === 'element' && <RowProperties />}
          {rightTab === 'card' && <CardProperties />}
          {rightTab === 'notification' && <NotificationProperties />}
          {rightTab === 'variables' && <VariablesProperties />}
        </div>
      </div>
    );
  };

  // ---------- ROOT ----------
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-neutral-50 text-neutral-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader />
        <BuilderHeader />

        {/* Demo helper */}
        <div className="px-4 py-2 bg-violet-50/50 border-b border-violet-100 flex items-center gap-2 text-[12px] flex-wrap shrink-0">
          <span className="text-violet-600 font-semibold uppercase tracking-wider text-[10px] mr-1">Views</span>
          {[
            { label: '1 · Empty row', fn: () => { setLeftTab('components'); setRightTab('element'); setPhoneMode('chat'); setHasContent(false); } },
            { label: '2 · Card', fn: () => { setLeftTab('components'); setRightTab('card'); setPhoneMode('chat'); setHasContent(true); } },
            { label: '3 · Notification', fn: () => { setLeftTab('components'); setRightTab('notification'); setPhoneMode('ios'); } },
            { label: '4 · Variables', fn: () => { setLeftTab('elements'); setRightTab('variables'); setPhoneMode('chat'); setHasContent(true); } },
            { label: '5 · Elements', fn: () => { setLeftTab('elements'); setRightTab('element'); setPhoneMode('chat'); setHasContent(true); } },
          ].map((v) => (
            <button
              key={v.label}
              onClick={v.fn}
              className="px-2.5 h-6 rounded bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 text-[11px] font-medium transition-colors"
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          <LeftPanel />
          <Canvas />
          <RightPanel />
        </div>
      </main>

      {/* Image expand modal */}
      {imageExpanded && elementImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setImageExpanded(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={elementImage}
              alt="Expanded view"
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                onClick={() => setImageExpanded(false)}
                className="w-9 h-9 rounded-lg bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <M icon="close" size={20} className="text-white" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
              <span className="text-[12.5px] text-white/90 font-medium">Element image preview</span>
              <button
                onClick={() => setImageExpanded(false)}
                className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-[12px] font-medium text-white transition-colors"
              >
                <M icon="close_fullscreen" size={15} /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
