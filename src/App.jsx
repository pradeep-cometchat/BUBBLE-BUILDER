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
  const [previewDark, setPreviewDark] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
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
        <button className="flex items-center gap-1.5 px-3.5 h-9 rounded-lg border border-neutral-200 text-[13px] text-neutral-600 hover:bg-neutral-50 font-medium transition-colors">
          <span className="text-violet-600 font-mono text-[12px]">{'{...}'}</span> Variables
        </button>
        <button className="px-4 h-9 rounded-lg bg-violet-600 text-white text-[13px] font-medium hover:bg-violet-700 transition-colors">
          Create Template
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
  const ChatPhonePreview = () => {
    const dark = previewDark;
    return (
    <div className={`relative w-[340px] h-[780px] rounded-[24px] border shadow-sm overflow-hidden flex flex-col shrink-0 ${dark ? 'bg-[#1e1e2e] border-neutral-700/60' : 'bg-neutral-50 border-neutral-200'}`}>
      {/* header — title only, transparent bg */}
      <div className={`px-4 py-3 border-b ${dark ? 'border-neutral-700/40' : 'border-neutral-200'}`}>
        <span className={`text-[15px] font-semibold ${dark ? 'text-neutral-100' : 'text-neutral-900'}`}>Notifications</span>
      </div>

      {/* chips row */}
      <div className={`px-3 py-2.5 flex items-center gap-2 border-b ${dark ? 'border-neutral-700/40' : 'border-neutral-100'}`}>
        <span className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-medium ${dark ? 'bg-violet-500 text-white' : 'bg-violet-600 text-white'}`}>Promotions</span>
        {['Updates', 'Alerts', 'Social'].map((label) => (
          <button
            key={label}
            className={`shrink-0 px-3 py-1.5 rounded-full border border-dashed text-[11.5px] font-medium transition-colors ${
              dark
                ? 'border-neutral-600/50 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300'
                : 'border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700'
            }`}
          >
            {label}
          </button>
        ))}
        <button className={`shrink-0 w-7 h-7 rounded-full border border-dashed flex items-center justify-center transition-colors ${
          dark
            ? 'border-neutral-600/50 text-neutral-500 hover:border-neutral-500 hover:text-neutral-400'
            : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600'
        }`}>
          <M icon="add" size={15} />
        </button>
      </div>

      {/* messages */}
      <div className={`flex-1 overflow-y-auto px-3 flex flex-col ${dark ? 'bg-[#1e1e2e]' : 'bg-neutral-50'}`}>
        {!hasContent ? (
          <div className="flex-1 flex items-center justify-center py-3">
          <button
            onClick={() => setHasContent(true)}
            className={`w-full rounded-xl border-2 border-dashed py-10 flex flex-col items-center gap-3 transition-all group cursor-pointer ${
              dark
                ? 'border-neutral-700/50 bg-neutral-800/30 hover:border-violet-500/50 hover:bg-violet-900/15'
                : 'border-neutral-300 bg-white/60 hover:border-violet-400 hover:bg-violet-50/30'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-neutral-800/40 group-hover:bg-violet-900/30' : 'bg-neutral-100 group-hover:bg-violet-100'
            }`}>
              <M icon="add" size={24} className={`transition-colors ${dark ? 'text-neutral-500 group-hover:text-violet-400' : 'text-neutral-400 group-hover:text-violet-600'}`} />
            </div>
            <div className="text-center">
              <div className={`text-[13px] font-medium transition-colors ${dark ? 'text-neutral-300 group-hover:text-violet-400' : 'text-neutral-700 group-hover:text-violet-700'}`}>Add an element</div>
              <div className={`text-[12px] mt-0.5 ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}>Drag from the left panel or click here</div>
            </div>
          </button>
          </div>
        ) : (
          <div className="py-3">
          {/* Category + Timestamp row — outside the card */}
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className={`text-[13px] font-semibold ${dark ? 'text-white' : 'text-neutral-900'}`}>Category</span>
            <span className={`flex items-center gap-1.5 text-[12px] ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Time stamp
            </span>
          </div>
          <div className={`rounded-xl border overflow-hidden shadow-sm ${dark ? 'bg-[#262638] border-neutral-700/40' : 'bg-white border-neutral-200/70'}`}>
            {/* product image area */}
            <div
              className={`aspect-square bg-gradient-to-br from-violet-100 via-violet-50 to-indigo-100 relative overflow-hidden cursor-pointer ${selectedElement === 'image' ? 'ring-2 ring-violet-500 ring-inset' : ''}`}
              onClick={() => { setSelectedElement('image'); setRightTab('element'); }}
            >
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
            </div>

            <div className={`p-3.5 ${dark ? 'text-neutral-200' : ''}`} onClick={(e) => { e.stopPropagation(); setSelectedElement(null); }}>
              <div
                className={`text-[13px] font-semibold cursor-pointer rounded-md px-1 -mx-1 transition-all ${selectedElement === 'text' ? 'ring-2 ring-violet-500 ring-offset-1' : 'hover:bg-violet-50/50'} ${dark ? 'text-neutral-100' : 'text-neutral-900'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedElement('text'); setRightTab('element'); }}
              >Product Title</div>
              <div
                className={`text-[14px] font-bold text-violet-600 mt-0.5 cursor-pointer rounded-md px-1 -mx-1 transition-all ${selectedElement === 'price' ? 'ring-2 ring-violet-500 ring-offset-1' : 'hover:bg-violet-50/50'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedElement('price'); setRightTab('element'); }}
              >$0.00</div>
              <div
                className={`text-[11.5px] mt-1 cursor-pointer rounded-md px-1 -mx-1 transition-all ${selectedElement === 'description' ? 'ring-2 ring-violet-500 ring-offset-1' : 'hover:bg-violet-50/50'} ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedElement('description'); setRightTab('element'); }}
              >Product description goes here.</div>
              <div
                className={`flex gap-2 mt-2.5 cursor-pointer rounded-lg px-1 -mx-1 py-1 -my-1 transition-all ${selectedElement === 'buttonRow' ? 'ring-2 ring-violet-500 ring-offset-1' : 'hover:bg-violet-50/50'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedElement('buttonRow'); setRightTab('element'); }}
              >
                <button
                  className={`px-3.5 h-8 rounded-md bg-violet-600 text-white text-[11.5px] font-semibold transition-all ${selectedElement === 'buyBtn' ? 'ring-2 ring-violet-500 ring-offset-1' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedElement('buyBtn'); setRightTab('element'); }}
                >Buy Now</button>
                <button
                  className={`px-3.5 h-8 rounded-md border text-[11.5px] font-semibold transition-all ${selectedElement === 'detailBtn' ? 'ring-2 ring-violet-500 ring-offset-1' : ''} ${dark ? 'border-violet-400 text-violet-400' : 'border-violet-300 text-violet-700'}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedElement('detailBtn'); setRightTab('element'); }}
                >Details</button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                <M icon="check_circle" size={18} className="text-emerald-500" />
                <span className="text-[12.5px] font-semibold text-emerald-600">Order Confirmed</span>
              </div>

              <div className={`mt-3 pt-2.5 border-t space-y-1 text-[11.5px] ${dark ? 'border-neutral-700/40 text-neutral-400' : 'border-neutral-100 text-neutral-600'}`}>
                <div className="flex gap-2"><span>Order ID:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.id}}'}</code></div>
                <div className="flex gap-2"><span>Total:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.total}}'}</code></div>
                <div className="flex gap-2"><span>Delivery:</span><code className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10.5px]">{'{{order.deliveryDate}}'}</code></div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  const IOSPhonePreview = () => (
    <div
      className="relative w-[320px] h-[780px] rounded-[36px] overflow-hidden shadow-lg shrink-0"
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

  const AndroidPhonePreview = () => (
    <div
      className="relative w-[320px] h-[780px] rounded-[28px] overflow-hidden shadow-lg shrink-0"
      style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)' }}
    >
      {/* status bar */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-white/70">
        <span className="text-[11px] font-medium">12:30</span>
        <div className="flex items-center gap-1.5">
          <M icon="signal_cellular_alt" size={13} />
          <M icon="wifi" size={13} />
          <M icon="battery_full" size={15} />
        </div>
      </div>

      {/* Clock */}
      <div className="pt-14 text-center text-white">
        <div className="text-[64px] font-light tracking-tight leading-none">12:30</div>
        <div className="text-[13px] font-medium text-white/60 mt-1">Mon, May 4</div>
      </div>

      {/* Notification card */}
      <div className="absolute bottom-20 left-3 right-3">
        <div className="rounded-2xl bg-white/12 backdrop-blur-xl p-3.5 border border-white/10">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-violet-500 shrink-0 flex items-center justify-center">
              <M icon="notifications" size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] font-semibold text-white">App</span>
                <span className="text-[10px] text-white/50">now</span>
              </div>
              <div className="text-[12px] text-white/70 mt-0.5 leading-snug">
                Enter title and body in the Notification tab
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Android nav bar */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-8">
        <div className="w-4 h-4 border-2 border-white/30 rounded-sm" />
        <div className="w-4 h-4 rounded-full border-2 border-white/30" />
        <div className="w-0 h-0 border-l-[8px] border-l-white/30 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent" />
      </div>
    </div>
  );

  const Canvas = () => (
    <div
      className="flex-1 relative overflow-hidden bg-neutral-100 min-w-0"
      style={{ backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)', backgroundSize: '14px 14px' }}
    >
      {/* phone — centered and responsive */}
      <div className="w-full h-full flex items-center justify-center p-6">
        {phoneMode === 'ios' ? <IOSPhonePreview /> : phoneMode === 'android' ? <AndroidPhonePreview /> : <ChatPhonePreview />}
      </div>

      {/* right toolbar — theme + device switcher, vertically centered with 32px gap */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col items-center gap-8">
        {/* dark/light mode toggle */}
        <div className="flex flex-col bg-white rounded-xl border border-neutral-200 shadow-sm p-1">
          <button
            onClick={() => setPreviewDark(false)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              !previewDark ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title="Light mode"
          >
            <M icon="light_mode" size={19} />
          </button>
          <button
            onClick={() => setPreviewDark(true)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              previewDark ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title="Dark mode"
          >
            <M icon="dark_mode" size={19} />
          </button>
        </div>

        {/* device mode switcher */}
        <div className="flex flex-col gap-1 bg-white rounded-xl border border-neutral-200 shadow-sm p-1.5">
          <button
            onClick={() => setPhoneMode('chat')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              phoneMode === 'chat' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title="Chat"
          >
            <M icon="chat" size={20} />
          </button>
          <button
            onClick={() => setPhoneMode('ios')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              phoneMode === 'ios' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title="iOS"
          >
            <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.8-105.6-209.3-105.6-330.8 0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
          </button>
          <button
            onClick={() => setPhoneMode('android')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              phoneMode === 'android' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
            }`}
            title="Android"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
          </button>
        </div>
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

  const Select = ({ value, options }) => (
    <div className="relative">
      <select defaultValue={value} className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium appearance-none focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors">
        {options ? options.map((o) => <option key={o} value={o}>{o}</option>) : <option>{value}</option>}
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
        {elementImage && (
          <div className="flex items-center justify-end">
            <button
              onClick={() => setElementImage(null)}
              className="text-[11px] text-neutral-500 hover:text-red-500 transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        )}

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

  const RowProperties = () => {
    const [alignment, setAlignment] = useState('start');
    const [colorMode, setColorMode] = useState('light');
    const [paddingMode, setPaddingMode] = useState('all'); // 'all' | 'custom'
    const [paddingAll, setPaddingAll] = useState('8');
    const [paddingTop, setPaddingTop] = useState('8');
    const [paddingRight, setPaddingRight] = useState('8');
    const [paddingBottom, setPaddingBottom] = useState('8');
    const [paddingLeft, setPaddingLeft] = useState('8');
    const [radiusMode, setRadiusMode] = useState('all'); // 'all' | 'custom'
    const [radiusAll, setRadiusAll] = useState('8');
    const [radiusTL, setRadiusTL] = useState('8');
    const [radiusTR, setRadiusTR] = useState('8');
    const [radiusBR, setRadiusBR] = useState('8');
    const [radiusBL, setRadiusBL] = useState('8');

    const ToggleGroup = ({ options, value, onChange }) => (
      <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 h-10 flex items-center justify-center transition-colors ${
              value === opt.value
                ? 'bg-violet-50 text-violet-600'
                : 'bg-white text-neutral-500 hover:bg-neutral-50'
            } ${idx > 0 ? 'border-l border-neutral-200' : ''}`}
            title={opt.label}
          >
            <M icon={opt.icon} size={18} />
          </button>
        ))}
      </div>
    );

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    return (
      <div className="space-y-0">
        {/* ── ID ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="row_06c30909-946e-4476-9560-bd226f7935ff" mono />
        </div>

        {/* ── Layout ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Layout</div>
          <div className="space-y-3">
            <FieldRow label="Distribution">
              <Select value="Start" options={['Start', 'Center', 'End', 'Space Between', 'Space Around', 'Space Evenly']} />
            </FieldRow>
            <FieldRow label="Alignment">
              <ToggleGroup
                value={alignment}
                onChange={setAlignment}
                options={[
                  { value: 'start', icon: 'align_horizontal_left', label: 'Start' },
                  { value: 'center', icon: 'align_horizontal_center', label: 'Center' },
                  { value: 'end', icon: 'align_horizontal_right', label: 'End' },
                ]}
              />
            </FieldRow>
            <FieldRow label="Gap">
              <Input value="8" />
            </FieldRow>

            {/* Padding */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
                <div className="flex-1"><Input value={paddingAll} /></div>
                <button
                  onClick={() => setPaddingMode('all')}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                    paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                  }`}
                  title="All sides"
                >
                  <M icon="crop_square" size={18} />
                </button>
                <button
                  onClick={() => setPaddingMode('custom')}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                    paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                  }`}
                  title="Custom per side"
                >
                  <M icon="dashboard_customize" size={18} />
                </button>
              </div>
              {paddingMode === 'custom' && (
                <div className="ml-[112px] grid grid-cols-2 gap-2">
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Frame ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Corner radius</span>
              <div className="flex-1"><Input value={radiusAll} /></div>
              <button
                onClick={() => setRadiusMode('all')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="All corners"
              >
                <M icon="rounded_corner" size={18} />
              </button>
              <button
                onClick={() => setRadiusMode('custom')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Custom per corner"
              >
                <M icon="dashboard_customize" size={18} />
              </button>
            </div>
            {radiusMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} /></div>
              </div>
            )}
          </div>
        </div>

        {/* ── Color ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button
                onClick={() => setColorMode('light')}
                className={`w-9 h-8 flex items-center justify-center transition-colors ${
                  colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Light"
              >
                <M icon="light_mode" size={16} />
              </button>
              <button
                onClick={() => setColorMode('dark')}
                className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${
                  colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Dark"
              >
                <M icon="dark_mode" size={16} />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Background</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-indigo-700 shrink-0 cursor-pointer" />
                <div className="flex-1"><Input value="#11D800" /></div>
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Border</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-indigo-100 shrink-0 cursor-pointer" />
                <div className="flex-1"><Input value="#11D800" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Image ── */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">Image</div>
          <ImageInput />
        </div>
      </div>
    );
  };

  const ImageElementProperties = () => {
    const [radiusMode, setRadiusMode] = useState('all');
    const [radiusAll, setRadiusAll] = useState('0');
    const [radiusTL, setRadiusTL] = useState('0');
    const [radiusTR, setRadiusTR] = useState('0');
    const [radiusBR, setRadiusBR] = useState('0');
    const [radiusBL, setRadiusBL] = useState('0');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('0');
    const [paddingTop, setPaddingTop] = useState('0');
    const [paddingRight, setPaddingRight] = useState('0');
    const [paddingBottom, setPaddingBottom] = useState('0');
    const [paddingLeft, setPaddingLeft] = useState('0');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    return (
      <div className="space-y-0">
        {/* Back to row */}
        <button
          onClick={() => setSelectedElement(null)}
          className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors"
        >
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        {/* ── ID ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="img_a3f1e8b2-7c4d-4e9a-b5f6-2d8e1c9a0b3f" mono />
        </div>

        {/* ── Source ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Source</div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">URL</div>
              <Input value="https://example.com/image.png" />
            </div>
            <div>
              <div className="text-[14px] font-semibold text-neutral-900 mb-3 mt-4">Preview</div>
              <ImageInput />
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Alt Text</div>
              <Input placeholder="Describe the image for accessibility" />
            </div>
          </div>
        </div>

        {/* ── Dimensions ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Dimensions</div>
          <div className="space-y-3">
            <FieldRow label="Fit">
              <Select value="Cover" options={['Cover', 'Contain', 'Fill', 'None', 'Scale Down']} />
            </FieldRow>
            <FieldRow label="Width">
              <Input value="100%" />
            </FieldRow>
            <FieldRow label="Height">
              <Input value="auto" />
            </FieldRow>
          </div>
        </div>

        {/* ── Frame ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
              <div className="flex-1"><Input value={radiusAll} /></div>
              <button
                onClick={() => setRadiusMode('all')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="All corners"
              >
                <M icon="rounded_corner" size={18} />
              </button>
              <button
                onClick={() => setRadiusMode('custom')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Custom per corner"
              >
                <M icon="dashboard_customize" size={18} />
              </button>
            </div>
            {radiusMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} /></div>
              </div>
            )}
          </div>
        </div>

        {/* ── Spacing ── */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button
                onClick={() => setPaddingMode('all')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="All sides"
              >
                <M icon="crop_square" size={18} />
              </button>
              <button
                onClick={() => setPaddingMode('custom')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Custom per side"
              >
                <M icon="dashboard_customize" size={18} />
              </button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TextElementProperties = () => {
    const [colorMode, setColorMode] = useState('light');
    const [alignment, setAlignment] = useState('start');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('0');
    const [paddingTop, setPaddingTop] = useState('0');
    const [paddingRight, setPaddingRight] = useState('0');
    const [paddingBottom, setPaddingBottom] = useState('0');
    const [paddingLeft, setPaddingLeft] = useState('0');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    const ToggleGroup = ({ options, value, onChange }) => (
      <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 h-10 flex items-center justify-center transition-colors ${
              value === opt.value ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-500 hover:bg-neutral-50'
            } ${idx > 0 ? 'border-l border-neutral-200' : ''}`}
            title={opt.label}
          >
            <M icon={opt.icon} size={18} />
          </button>
        ))}
      </div>
    );

    return (
      <div className="space-y-0">
        <button
          onClick={() => setSelectedElement(null)}
          className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors"
        >
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        {/* ── ID ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="txt_d4e2a1f8-9b3c-4f7e-a6d5-8c1b0e3f2a7d" mono />
        </div>

        {/* ── Content ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Content</div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Text</div>
              <div className="relative">
                <textarea
                  defaultValue="Product Title"
                  className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
                />
                <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Variant</div>
              <Select value="Title" options={['Title', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Body', 'Caption']} />
            </div>
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Typography</div>
          <div className="space-y-3">
            <FieldRow label="Alignment">
              <ToggleGroup
                value={alignment}
                onChange={setAlignment}
                options={[
                  { value: 'start', icon: 'format_align_left', label: 'Left' },
                  { value: 'center', icon: 'format_align_center', label: 'Center' },
                  { value: 'end', icon: 'format_align_right', label: 'Right' },
                ]}
              />
            </FieldRow>
            <FieldRow label="Font Weight">
              <Select value="Semibold" options={['Thin', 'Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Extra Bold']} />
            </FieldRow>
            <FieldRow label="Max Lines">
              <Input value="1" />
            </FieldRow>
          </div>
        </div>

        {/* ── Color ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button
                onClick={() => setColorMode('light')}
                className={`w-9 h-8 flex items-center justify-center transition-colors ${
                  colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Light"
              >
                <M icon="light_mode" size={16} />
              </button>
              <button
                onClick={() => setColorMode('dark')}
                className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${
                  colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Dark"
              >
                <M icon="dark_mode" size={16} />
              </button>
            </div>
          </div>
          <div>
            <div className="text-[13px] text-neutral-600 mb-1.5">Text Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-neutral-900 shrink-0 cursor-pointer" />
              <div className="flex-1"><Input value="#171717" /></div>
            </div>
          </div>
        </div>

        {/* ── Spacing ── */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button
                onClick={() => setPaddingMode('all')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="All sides"
              >
                <M icon="crop_square" size={18} />
              </button>
              <button
                onClick={() => setPaddingMode('custom')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Custom per side"
              >
                <M icon="dashboard_customize" size={18} />
              </button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PriceElementProperties = () => {
    const [colorMode, setColorMode] = useState('light');
    const [alignment, setAlignment] = useState('start');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('0');
    const [paddingTop, setPaddingTop] = useState('0');
    const [paddingRight, setPaddingRight] = useState('0');
    const [paddingBottom, setPaddingBottom] = useState('0');
    const [paddingLeft, setPaddingLeft] = useState('0');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    const ToggleGroup = ({ options, value, onChange }) => (
      <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 h-10 flex items-center justify-center transition-colors ${
              value === opt.value ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-500 hover:bg-neutral-50'
            } ${idx > 0 ? 'border-l border-neutral-200' : ''}`}
            title={opt.label}
          >
            <M icon={opt.icon} size={18} />
          </button>
        ))}
      </div>
    );

    return (
      <div className="space-y-0">
        <button
          onClick={() => setSelectedElement(null)}
          className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors"
        >
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        {/* ── ID ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="price_7f2b4e1a-3c8d-4a6f-b9e5-1d0c8f3a2b6e" mono />
        </div>

        {/* ── Content ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Content</div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Price</div>
              <Input value="$0.00" />
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Variant</div>
              <Select value="Title" options={['Title', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Body', 'Caption']} />
            </div>
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Typography</div>
          <div className="space-y-3">
            <FieldRow label="Alignment">
              <ToggleGroup
                value={alignment}
                onChange={setAlignment}
                options={[
                  { value: 'start', icon: 'format_align_left', label: 'Left' },
                  { value: 'center', icon: 'format_align_center', label: 'Center' },
                  { value: 'end', icon: 'format_align_right', label: 'Right' },
                ]}
              />
            </FieldRow>
            <FieldRow label="Font Weight">
              <Select value="Bold" options={['Thin', 'Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Extra Bold']} />
            </FieldRow>
            <FieldRow label="Max Lines">
              <Input value="1" />
            </FieldRow>
          </div>
        </div>

        {/* ── Color ── */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button
                onClick={() => setColorMode('light')}
                className={`w-9 h-8 flex items-center justify-center transition-colors ${
                  colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Light"
              >
                <M icon="light_mode" size={16} />
              </button>
              <button
                onClick={() => setColorMode('dark')}
                className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${
                  colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Dark"
              >
                <M icon="dark_mode" size={16} />
              </button>
            </div>
          </div>
          <div>
            <div className="text-[13px] text-neutral-600 mb-1.5">Text Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-violet-600 shrink-0 cursor-pointer" />
              <div className="flex-1"><Input value="#7C3AED" /></div>
            </div>
          </div>
        </div>

        {/* ── Spacing ── */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button
                onClick={() => setPaddingMode('all')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="All sides"
              >
                <M icon="crop_square" size={18} />
              </button>
              <button
                onClick={() => setPaddingMode('custom')}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'
                }`}
                title="Custom per side"
              >
                <M icon="dashboard_customize" size={18} />
              </button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DescriptionElementProperties = () => {
    const [colorMode, setColorMode] = useState('light');
    const [alignment, setAlignment] = useState('start');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('0');
    const [paddingTop, setPaddingTop] = useState('0');
    const [paddingRight, setPaddingRight] = useState('0');
    const [paddingBottom, setPaddingBottom] = useState('0');
    const [paddingLeft, setPaddingLeft] = useState('0');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    const ToggleGroup = ({ options, value, onChange }) => (
      <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
        {options.map((opt, idx) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 h-10 flex items-center justify-center transition-colors ${
              value === opt.value ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-500 hover:bg-neutral-50'
            } ${idx > 0 ? 'border-l border-neutral-200' : ''}`}
            title={opt.label}
          >
            <M icon={opt.icon} size={18} />
          </button>
        ))}
      </div>
    );

    return (
      <div className="space-y-0">
        <button onClick={() => setSelectedElement(null)} className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors">
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="desc_b8c3d1e4-5f6a-4b7c-9d2e-0a1f3c5b7d9e" mono />
        </div>

        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Content</div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Text</div>
              <div className="relative">
                <textarea defaultValue="Product description goes here." className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors" />
                <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Variant</div>
              <Select value="Body" options={['Title', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Body', 'Caption']} />
            </div>
          </div>
        </div>

        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Typography</div>
          <div className="space-y-3">
            <FieldRow label="Alignment">
              <ToggleGroup value={alignment} onChange={setAlignment} options={[
                { value: 'start', icon: 'format_align_left', label: 'Left' },
                { value: 'center', icon: 'format_align_center', label: 'Center' },
                { value: 'end', icon: 'format_align_right', label: 'Right' },
              ]} />
            </FieldRow>
            <FieldRow label="Font Weight">
              <Select value="Regular" options={['Thin', 'Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Extra Bold']} />
            </FieldRow>
            <FieldRow label="Max Lines">
              <Input value="3" />
            </FieldRow>
          </div>
        </div>

        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button onClick={() => setColorMode('light')} className={`w-9 h-8 flex items-center justify-center transition-colors ${colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Light"><M icon="light_mode" size={16} /></button>
              <button onClick={() => setColorMode('dark')} className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Dark"><M icon="dark_mode" size={16} /></button>
            </div>
          </div>
          <div>
            <div className="text-[13px] text-neutral-600 mb-1.5">Text Color</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-neutral-500 shrink-0 cursor-pointer" />
              <div className="flex-1"><Input value="#737373" /></div>
            </div>
          </div>
        </div>

        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button onClick={() => setPaddingMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All sides"><M icon="crop_square" size={18} /></button>
              <button onClick={() => setPaddingMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per side"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ButtonRowElementProperties = () => {
    const [colorMode, setColorMode] = useState('light');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('0');
    const [paddingTop, setPaddingTop] = useState('0');
    const [paddingRight, setPaddingRight] = useState('0');
    const [paddingBottom, setPaddingBottom] = useState('0');
    const [paddingLeft, setPaddingLeft] = useState('0');
    const [radiusMode, setRadiusMode] = useState('all');
    const [radiusAll, setRadiusAll] = useState('0');
    const [radiusTL, setRadiusTL] = useState('0');
    const [radiusTR, setRadiusTR] = useState('0');
    const [radiusBR, setRadiusBR] = useState('0');
    const [radiusBL, setRadiusBL] = useState('0');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    return (
      <div className="space-y-0">
        <button onClick={() => setSelectedElement(null)} className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors">
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        {/* ID */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value="row_btn_e5a2c8f1-3d7b-4e9a-a6c4-9f0d2b1e8c3a" mono />
        </div>

        {/* Layout */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Layout</div>
          <div className="space-y-3">
            <FieldRow label="Gap">
              <Input value="8" />
            </FieldRow>
            <FieldRow label="Horizontal">
              <Select value="Start" options={['Start', 'Center', 'End', 'Space Between', 'Space Around', 'Space Evenly']} />
            </FieldRow>
            <FieldRow label="Vertical">
              <Select value="Center" options={['Start', 'Center', 'End', 'Stretch', 'Baseline']} />
            </FieldRow>
          </div>
        </div>

        {/* Color */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button onClick={() => setColorMode('light')} className={`w-9 h-8 flex items-center justify-center transition-colors ${colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Light"><M icon="light_mode" size={16} /></button>
              <button onClick={() => setColorMode('dark')} className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Dark"><M icon="dark_mode" size={16} /></button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Background</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-transparent shrink-0 cursor-pointer" style={{ backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)', backgroundSize: '8px 8px', backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0' }} />
                <div className="flex-1"><Input value="transparent" /></div>
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Border</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-transparent shrink-0 cursor-pointer" style={{ backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)', backgroundSize: '8px 8px', backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0' }} />
                <div className="flex-1"><Input value="transparent" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
              <div className="flex-1"><Input value={radiusAll} /></div>
              <button onClick={() => setRadiusMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All corners"><M icon="rounded_corner" size={18} /></button>
              <button onClick={() => setRadiusMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per corner"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {radiusMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} /></div>
              </div>
            )}
          </div>
        </div>

        {/* Spacing */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button onClick={() => setPaddingMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All sides"><M icon="crop_square" size={18} /></button>
              <button onClick={() => setPaddingMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per side"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ButtonElementProperties = ({ isBuyNow = false }) => {
    const [colorMode, setColorMode] = useState('light');
    const [fullWidth, setFullWidth] = useState(false);
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('12');
    const [paddingTop, setPaddingTop] = useState('8');
    const [paddingRight, setPaddingRight] = useState('16');
    const [paddingBottom, setPaddingBottom] = useState('8');
    const [paddingLeft, setPaddingLeft] = useState('16');
    const [radiusMode, setRadiusMode] = useState('all');
    const [radiusAll, setRadiusAll] = useState('6');
    const [radiusTL, setRadiusTL] = useState('6');
    const [radiusTR, setRadiusTR] = useState('6');
    const [radiusBR, setRadiusBR] = useState('6');
    const [radiusBL, setRadiusBL] = useState('6');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    const ColorField = ({ label, color, value }) => (
      <div>
        <div className="text-[13px] text-neutral-600 mb-1.5">{label}</div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg border border-neutral-200 shrink-0 cursor-pointer" style={{ backgroundColor: color }} />
          <div className="flex-1"><Input value={value} /></div>
        </div>
      </div>
    );

    return (
      <div className="space-y-0">
        <button onClick={() => setSelectedElement(null)} className="flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-700 mb-3 transition-colors">
          <M icon="arrow_back" size={16} /> Back to Row
        </button>

        {/* ID */}
        <div className="border-b border-neutral-100 pb-4 mb-4">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">ID</div>
          <Input value={isBuyNow ? 'btn_f1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c' : 'btn_c7d8e9f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f'} mono />
        </div>

        {/* Content */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Content</div>
          <div className="space-y-3">
            <FieldRow label="Label">
              <Input value={isBuyNow ? 'Buy Now' : 'Details'} />
            </FieldRow>
            <FieldRow label="Size">
              <Select value="Medium" options={['Small', 'Medium', 'Large']} />
            </FieldRow>
            <FieldRow label="Icon">
              <Input placeholder="e.g. shopping_cart" />
            </FieldRow>
            <FieldRow label="Icon Position">
              <Select value="Start" options={['Start', 'End']} />
            </FieldRow>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Full Width</span>
              <button
                onClick={() => setFullWidth(!fullWidth)}
                className={`w-10 h-6 rounded-full transition-colors relative ${fullWidth ? 'bg-violet-600' : 'bg-neutral-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${fullWidth ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Color */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button onClick={() => setColorMode('light')} className={`w-9 h-8 flex items-center justify-center transition-colors ${colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Light"><M icon="light_mode" size={16} /></button>
              <button onClick={() => setColorMode('dark')} className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Dark"><M icon="dark_mode" size={16} /></button>
            </div>
          </div>
          <div className="space-y-3">
            <ColorField label="Background" color={isBuyNow ? '#7C3AED' : 'transparent'} value={isBuyNow ? '#7C3AED' : 'transparent'} />
            <ColorField label="Text" color={isBuyNow ? '#FFFFFF' : '#7C3AED'} value={isBuyNow ? '#FFFFFF' : '#7C3AED'} />
            <ColorField label="Border" color={isBuyNow ? '#7C3AED' : '#C4B5FD'} value={isBuyNow ? '#7C3AED' : '#C4B5FD'} />
          </div>
        </div>

        {/* Frame */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div className="space-y-3">
            <FieldRow label="Border Width">
              <Input value={isBuyNow ? '0' : '1'} />
            </FieldRow>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
                <div className="flex-1"><Input value={radiusAll} /></div>
                <button onClick={() => setRadiusMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All corners"><M icon="rounded_corner" size={18} /></button>
                <button onClick={() => setRadiusMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per corner"><M icon="dashboard_customize" size={18} /></button>
              </div>
              {radiusMode === 'custom' && (
                <div className="ml-[112px] grid grid-cols-2 gap-2">
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} /></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Typography</div>
          <FieldRow label="Font Size">
            <Input value="12" />
          </FieldRow>
        </div>

        {/* Spacing */}
        <div className="border-b border-neutral-100 pb-4 mb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button onClick={() => setPaddingMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All sides"><M icon="crop_square" size={18} /></button>
              <button onClick={() => setPaddingMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per side"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Action</div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">URL</div>
              <Input placeholder="https://" />
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Open in</div>
              <Select value="Browser" options={['Browser', 'Webview']} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CardProperties = () => {
    const [colorMode, setColorMode] = useState('light');
    const [radiusMode, setRadiusMode] = useState('all');
    const [radiusAll, setRadiusAll] = useState('16');
    const [radiusTL, setRadiusTL] = useState('16');
    const [radiusTR, setRadiusTR] = useState('16');
    const [radiusBR, setRadiusBR] = useState('16');
    const [radiusBL, setRadiusBL] = useState('16');
    const [paddingMode, setPaddingMode] = useState('all');
    const [paddingAll, setPaddingAll] = useState('12');
    const [paddingTop, setPaddingTop] = useState('12');
    const [paddingRight, setPaddingRight] = useState('12');
    const [paddingBottom, setPaddingBottom] = useState('12');
    const [paddingLeft, setPaddingLeft] = useState('12');

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    return (
      <div className="space-y-0">
        {/* Message */}
        <div className="border-b border-neutral-100 pb-4 mb-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Message</div>
          <FieldRow label="Type">
            <Input value="custom_type" mono />
          </FieldRow>
        </div>

        {/* Color */}
        <div className="border-b border-neutral-100 pb-4 mb-2 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-neutral-900">Color</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <button onClick={() => setColorMode('light')} className={`w-9 h-8 flex items-center justify-center transition-colors ${colorMode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Light"><M icon="light_mode" size={16} /></button>
              <button onClick={() => setColorMode('dark')} className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${colorMode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Dark"><M icon="dark_mode" size={16} /></button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Background</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-white shrink-0 cursor-pointer" />
                <div className="flex-1"><Input value="#FFFFFF" /></div>
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Border</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border border-neutral-200 bg-neutral-200 shrink-0 cursor-pointer" />
                <div className="flex-1"><Input value="#E5E5E5" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame */}
        <div className="border-b border-neutral-100 pb-4 mb-2 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div className="space-y-3">
            <FieldRow label="Border Width">
              <Input value="1" />
            </FieldRow>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
                <div className="flex-1"><Input value={radiusAll} /></div>
                <button onClick={() => setRadiusMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All corners"><M icon="rounded_corner" size={18} /></button>
                <button onClick={() => setRadiusMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per corner"><M icon="dashboard_customize" size={18} /></button>
              </div>
              {radiusMode === 'custom' && (
                <div className="ml-[112px] grid grid-cols-2 gap-2">
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} /></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="border-b border-neutral-100 pb-4 mb-2 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Spacing</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
              <div className="flex-1"><Input value={paddingAll} /></div>
              <button onClick={() => setPaddingMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All sides"><M icon="crop_square" size={18} /></button>
              <button onClick={() => setPaddingMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per side"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} /></div>
              </div>
            )}
          </div>
        </div>

        {/* Fallback Text */}
        <div className="pb-4 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-3">Fallback Text</div>
          <div className="text-[12px] text-neutral-500 mb-2">Required for older UI Kit versions</div>
          <div className="relative">
            <textarea
              placeholder="Plain text for older UI Kit versions"
              className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
            />
            <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  };

  const NotificationProperties = () => (
    <div className="space-y-0">
      {/* Content */}
      <div className="border-b border-neutral-100 pb-4 mb-2">
        <div className="text-[14px] font-semibold text-neutral-900 mb-4">Push Notification</div>
        <div className="space-y-3">
          <div>
            <div className="text-[13px] text-neutral-600 mb-1.5">Body</div>
            <div className="relative">
              <textarea
                placeholder="Notification body…"
                className="w-full min-h-[90px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
              />
              <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="pt-2">
        <div className="flex items-start gap-2 p-3 rounded-lg bg-neutral-50">
          <M icon="info" size={16} className="text-neutral-400 shrink-0 mt-0.5" />
          <div className="text-[12.5px] text-neutral-500 leading-relaxed">
            The notification preview is shown in the canvas area. Edit the title and body here to see it update in real-time.
          </div>
        </div>
      </div>
    </div>
  );

  const VariablesProperties = () => {
    const [variables, setVariables] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({ name: '', label: '', description: '', category: '' });

    const handleAdd = () => {
      if (!formData.name.trim()) return;
      setVariables([...variables, { ...formData, id: Date.now() }]);
      setFormData({ name: '', label: '', description: '', category: '' });
      setShowForm(false);
    };

    const handleDelete = (id) => {
      setVariables(variables.filter((v) => v.id !== id));
      setDeleteId(null);
    };

    return (
      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[14px] font-semibold text-neutral-900">Variables</div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-3 h-8 rounded-lg bg-violet-600 text-white text-[12.5px] font-medium hover:bg-violet-700 flex items-center gap-1.5 transition-colors"
            >
              <M icon="add" size={16} /> Add
            </button>
          )}
        </div>

        {/* Add form */}
        {showForm && (
          <div className="border border-violet-200 bg-violet-50/30 rounded-xl p-4 mb-4">
            <div className="text-[13px] font-semibold text-neutral-900 mb-3">New Variable</div>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Name <span className="text-red-500">*</span></div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. user_name"
                  className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors"
                />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Label</div>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. User Name"
                  className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors"
                />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Description</div>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What this variable is for"
                  className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors"
                />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Category</div>
                <select
                  value={formData.category || 'General'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium appearance-none focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors"
                >
                  {['General', 'User', 'Order', 'Product', 'System'].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleAdd}
                  className="px-4 h-9 rounded-lg bg-violet-600 text-white text-[12.5px] font-medium hover:bg-violet-700 transition-colors"
                >
                  Add Variable
                </button>
                <button
                  onClick={() => { setShowForm(false); setFormData({ name: '', label: '', description: '', category: '' }); }}
                  className="px-4 h-9 rounded-lg border border-neutral-200 text-[12.5px] text-neutral-600 font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Variable list */}
        {variables.length === 0 && !showForm ? (
          <div className="border-t border-neutral-100 pt-4">
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                <M icon="data_object" size={24} className="text-neutral-400" />
              </div>
              <div className="text-[13px] font-medium text-neutral-600">No variables defined</div>
              <div className="text-[12px] text-neutral-400 mt-0.5">Click "Add" to create your first variable</div>
            </div>
          </div>
        ) : variables.length > 0 && (
          <div className="border-t border-neutral-100 pt-3">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">{variables.length} Variable{variables.length !== 1 ? 's' : ''}</div>
            <div className="space-y-2.5">
              {variables.map((v) => (
                <div key={v.id} className="relative group">
                  {/* Delete confirmation overlay */}
                  {deleteId === v.id && (
                    <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-2.5 border border-red-200 shadow-sm">
                      <M icon="delete" size={20} className="text-red-400" />
                      <span className="text-[12.5px] text-neutral-700 font-medium">Delete this variable?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="px-3.5 h-8 rounded-lg bg-red-600 text-white text-[12px] font-medium hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteId(null)}
                          className="px-3.5 h-8 rounded-lg border border-neutral-200 text-[12px] text-neutral-600 font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="rounded-xl border border-neutral-200 bg-white hover:border-violet-200 hover:shadow-sm transition-all overflow-hidden">
                    {/* Top bar with name and category */}
                    <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                          <M icon="data_object" size={16} className="text-violet-600" />
                        </div>
                        <code className="text-[13px] font-semibold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded">{v.name || 'unnamed'}</code>
                      </div>
                      <button
                        onClick={() => setDeleteId(v.id)}
                        className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-neutral-300 group-hover:text-neutral-400 hover:!text-red-500 transition-colors shrink-0"
                      >
                        <M icon="delete" size={16} />
                      </button>
                    </div>
                    {/* Details */}
                    <div className="px-3.5 pb-3 space-y-1.5">
                      {v.label && (
                        <div className="flex items-center gap-2">
                          <M icon="label" size={14} className="text-neutral-400 shrink-0" />
                          <span className="text-[12.5px] text-neutral-700">{v.label}</span>
                        </div>
                      )}
                      {v.description && (
                        <div className="flex items-start gap-2">
                          <M icon="notes" size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                          <span className="text-[12px] text-neutral-500 leading-relaxed">{v.description}</span>
                        </div>
                      )}
                      {v.category && (
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-[10.5px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{v.category}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const TreeProperties = () => {
    const [expandedNodes, setExpandedNodes] = useState({ card: true });
    const [flashNode, setFlashNode] = useState(null);
    const toggleNode = (id) => setExpandedNodes((s) => ({ ...s, [id]: !s[id] }));

    const handleClick = (nodeId, hasChildren) => {
      setFlashNode(nodeId);
      if (hasChildren) toggleNode(nodeId);
      setTimeout(() => setFlashNode(null), 800);
    };

    const TreeNode = ({ icon, label, depth = 0, children, nodeId, isLast = false, parentLines = [] }) => {
      const hasChildren = !!children;
      const isExpanded = hasChildren && expandedNodes[nodeId];
      const isFlash = flashNode === nodeId;
      const indent = depth * 22;

      return (
        <div className="relative">
          {/* Vertical lines from ancestors */}
          {parentLines.map((showLine, i) =>
            showLine ? (
              <div
                key={i}
                className="absolute top-0 bottom-0 border-l border-neutral-200"
                style={{ left: `${i * 22 + 19}px` }}
              />
            ) : null
          )}

          {/* Branch connector */}
          {depth > 0 && (
            <>
              <div
                className="absolute border-l border-neutral-200"
                style={{ left: `${(depth - 1) * 22 + 19}px`, top: 0, height: isLast ? '20px' : '100%' }}
              />
              <div
                className="absolute border-t border-neutral-200"
                style={{ left: `${(depth - 1) * 22 + 19}px`, top: '20px', width: '14px' }}
              />
            </>
          )}

          {/* Node */}
          <button
            onClick={() => handleClick(nodeId, hasChildren)}
            className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-left relative transition-all duration-300 ${
              isFlash ? 'bg-violet-50 ring-1 ring-violet-200' : 'hover:bg-neutral-50'
            }`}
            style={{ paddingLeft: `${indent + 8}px` }}
          >
            {hasChildren ? (
              <M icon={isExpanded ? 'expand_more' : 'chevron_right'} size={15} className={`shrink-0 ${isFlash ? 'text-violet-600' : 'text-neutral-400'}`} />
            ) : (
              <span className="w-[15px] shrink-0" />
            )}
            <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors duration-300 ${
              isFlash ? 'border-violet-300 bg-violet-50' : 'border-neutral-200 bg-white'
            }`}>
              <M icon={icon} size={14} className={`transition-colors duration-300 ${isFlash ? 'text-violet-600' : 'text-neutral-600'}`} />
            </div>
            <span className={`transition-colors duration-300 ${
              hasChildren
                ? `text-[14px] font-semibold ${isFlash ? 'text-violet-700' : 'text-neutral-900'}`
                : `text-[13.5px] font-medium ${isFlash ? 'text-violet-700' : 'text-neutral-700'}`
            }`}>{label}</span>
          </button>

          {/* Children */}
          {isExpanded && children}
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center">
        <div className="w-full">
          {/* Product Card — parent with direct children */}
          <TreeNode icon="dashboard" label="Product Card" nodeId="card">
            <TreeNode icon="image" label="Image" depth={1} nodeId="cardImg" parentLines={[true]} />
            <TreeNode icon="title" label="Product Title" depth={1} nodeId="prodTitle" parentLines={[true]} />
            <TreeNode icon="attach_money" label="Price" depth={1} nodeId="price" parentLines={[true]} />
            <TreeNode icon="text_fields" label="Description" depth={1} nodeId="desc" parentLines={[true]} />
            <TreeNode icon="crop_free" label="Buy Now" depth={1} nodeId="buyBtn" parentLines={[true]} />
            <TreeNode icon="crop_free" label="Details" depth={1} nodeId="detailBtn" parentLines={[true]} />
            <TreeNode icon="check_circle" label="Order Confirmed" depth={1} nodeId="orderConfirm" parentLines={[true]} />
            <TreeNode icon="tag" label="Order ID" depth={1} nodeId="orderId" parentLines={[true]} />
            <TreeNode icon="tag" label="Total" depth={1} nodeId="orderTotal" parentLines={[true]} />
            <TreeNode icon="tag" label="Delivery" depth={1} nodeId="orderDelivery" isLast parentLines={[true]} />
          </TreeNode>
        </div>
      </div>
    );
  };

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
          {rightTab === 'element' && (
            selectedElement === 'image' ? <ImageElementProperties /> :
            selectedElement === 'text' ? <TextElementProperties /> :
            selectedElement === 'price' ? <PriceElementProperties /> :
            selectedElement === 'description' ? <DescriptionElementProperties /> :
            selectedElement === 'buttonRow' ? <ButtonRowElementProperties /> :
            selectedElement === 'buyBtn' ? <ButtonElementProperties isBuyNow /> :
            selectedElement === 'detailBtn' ? <ButtonElementProperties /> :
            <RowProperties />
          )}
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
