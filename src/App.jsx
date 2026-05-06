import { useState } from 'react';
import { useBuilderStore } from './builder/store';
import BuilderRenderer from './builder/Renderer';
import ElementPanel from './builder/ElementPanel';
import M from './builder/Icon';

export default function App() {
  const [leftTab, setLeftTab] = useState('components');
  const [rightTab, setRightTab] = useState('element');
  const [phoneMode, setPhoneMode] = useState('chat');
  const builder = useBuilderStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewDark, setPreviewDark] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    cards: true, quick: false, timelines: false, tables: false,
    content: false, dataDisplay: false, actions: false, layout: true,
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
    <aside className={`${sidebarCollapsed ? 'w-16' : 'w-[220px]'} shrink-0 border-r border-neutral-200 bg-white flex flex-col h-full transition-all duration-200 overflow-hidden`}>
      <div className={`px-4 pt-4 pb-2 flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="w-8 h-8 rounded-md bg-neutral-900 flex items-center justify-center text-white text-[11px] font-bold shrink-0">CC</div>
        {!sidebarCollapsed && <span className="font-semibold text-[15px] tracking-tight text-neutral-900">Campaigns</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            title={sidebarCollapsed ? item.label : undefined}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-[14px] transition-colors ${
              item.active ? 'bg-violet-50 text-violet-700 font-medium' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            } ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <M icon={item.icon} size={20} className={item.active ? 'text-violet-600' : 'text-neutral-500'} />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
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
                <button key={s} className="w-full text-left px-2.5 py-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors">{s}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

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
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors">
                <M icon="close" size={13} className="text-neutral-600" />
              </button>
            )}
          </div>
        </div>

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
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className={`w-full flex items-center gap-2 px-2.5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                      isOpen ? 'text-neutral-900 bg-neutral-100' : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    <M icon={group.icon} size={18} className={isOpen ? 'text-neutral-900' : 'text-neutral-500'} />
                    <span>{group.label}</span>
                    <span className={`ml-auto text-[11px] font-medium tabular-nums ${isOpen ? 'text-neutral-700' : 'text-neutral-600'}`}>{group.items.length}</span>
                    <M icon="expand_more" size={18} className={`transition-transform duration-200 ${isOpen ? 'text-neutral-700' : 'text-neutral-500'} ${isOpen ? '' : '-rotate-90'}`} />
                  </button>

                  {isOpen && (
                    <div className="mt-0.5 pb-1 relative ml-[18px]">
                      <div className="absolute left-0 top-0 w-px bg-neutral-200" style={{ bottom: '28px' }} />
                      {group.items.map((item, i) => (
                        <div key={i} className="relative flex items-center">
                          <div className="absolute left-0 top-1/2 w-3 h-px bg-neutral-200" />
                          <button
                            onClick={() => builder.addComponent(item.title)}
                            className="w-full flex items-center gap-2.5 pl-5 pr-2.5 py-2.5 ml-3 rounded-lg text-left transition-all border border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                          >
                            <div className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center bg-neutral-100">
                              <M icon={item.icon} size={18} className="text-neutral-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-medium truncate text-neutral-800">{item.title}</div>
                              {item.sub && <div className="text-[12.5px] text-neutral-500 truncate leading-snug mt-0.5">{item.sub}</div>}
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-dashed border-neutral-200 p-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[12.5px] text-neutral-500 py-2.5 rounded-lg border border-dashed border-neutral-200 hover:border-neutral-300 hover:text-neutral-600 cursor-pointer transition-colors">
            <M icon="add" size={18} /> Add element
          </div>
        </div>
      </div>
    );
  };

  // ---------- CANVAS ----------
  const ChatPhonePreview = () => {
    const dark = previewDark;
    return (
      <div className={`relative w-[340px] h-[780px] rounded-[24px] border shadow-sm overflow-hidden flex flex-col shrink-0 ${dark ? 'bg-[#1c1c28] border-[#2e2e3e]' : 'bg-neutral-50 border-neutral-200'}`}>
        <div className={`px-4 py-3 border-b ${dark ? 'border-[#2e2e3e]' : 'border-neutral-200'}`}>
          <span className={`text-[15px] font-semibold ${dark ? 'text-neutral-50' : 'text-neutral-900'}`}>Notifications</span>
        </div>

        <div className={`px-3 py-2.5 flex items-center gap-2 border-b ${dark ? 'border-[#2e2e3e]' : 'border-neutral-100'}`}>
          <span className={`shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-medium ${dark ? 'bg-violet-500 text-white' : 'bg-violet-600 text-white'}`}>Promotions</span>
          {['Updates', 'Alerts', 'Social'].map((label) => (
            <button
              key={label}
              className={`shrink-0 px-3 py-1.5 rounded-full border border-dashed text-[11.5px] font-medium transition-colors ${
                dark ? 'border-[#4a4a5e] text-neutral-300 hover:border-violet-400/60 hover:text-neutral-200' : 'border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700'
              }`}
            >
              {label}
            </button>
          ))}
          <button className={`shrink-0 w-7 h-7 rounded-full border border-dashed flex items-center justify-center transition-colors ${
            dark ? 'border-[#4a4a5e] text-neutral-400 hover:border-violet-400/60 hover:text-neutral-300' : 'border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600'
          }`}>
            <M icon="add" size={15} />
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto px-3 flex flex-col ${dark ? 'bg-[#1c1c28]' : 'bg-neutral-50'}`}>
          {builder.nodes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-3">
              <button
                onClick={() => builder.addComponent('Product Card')}
                className={`w-full rounded-xl border-2 border-dashed py-10 flex flex-col items-center gap-3 transition-all group cursor-pointer ${
                  dark ? 'border-[#3a3a4e] bg-[#24243a]/50 hover:border-violet-400/50 hover:bg-violet-900/20' : 'border-neutral-300 bg-white/60 hover:border-violet-400 hover:bg-violet-50/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  dark ? 'bg-[#2e2e42] group-hover:bg-violet-800/30' : 'bg-neutral-100 group-hover:bg-violet-100'
                }`}>
                  <M icon="add" size={24} className={`transition-colors ${dark ? 'text-neutral-300 group-hover:text-violet-300' : 'text-neutral-400 group-hover:text-violet-600'}`} />
                </div>
                <div className="text-center">
                  <div className={`text-[13px] font-medium transition-colors ${dark ? 'text-neutral-200 group-hover:text-violet-300' : 'text-neutral-700 group-hover:text-violet-700'}`}>Add an element</div>
                  <div className={`text-[12px] mt-0.5 ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>Drag from the left panel or click here</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="py-3 pt-5">
              <BuilderRenderer
                nodes={builder.nodes}
                dark={dark}
                selectedId={builder.selectedId}
                onSelect={(id) => { builder.setSelectedId(id); setRightTab('element'); }}
                onRemove={(id) => builder.removeNode(id)}
                onMoveUp={(id) => builder.moveUp(id)}
                onMoveDown={(id) => builder.moveDown(id)}
                onDuplicate={(id) => builder.duplicateNode(id)}
                onAddInside={(parentId) => builder.addInside(parentId)}
                onReorder={(activeId, overId) => builder.moveNode(activeId, overId)}
              />
              <button
                onClick={() => builder.addComponent('Product Card')}
                className={`w-full mt-3 py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-1.5 text-[12px] font-medium transition-all ${
                  dark ? 'border-[#3a3a4e] text-neutral-400 hover:border-violet-400/50 hover:text-violet-300' : 'border-neutral-200 text-neutral-400 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                <M icon="add" size={16} /> Add Element or Component
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const IOSPhonePreview = () => (
    <div className="relative w-[320px] h-[780px] rounded-[36px] overflow-hidden shadow-lg shrink-0" style={{ background: 'linear-gradient(160deg, #a5b8ff 0%, #b89ff5 35%, #9a7fea 65%, #7fc4d4 100%)' }}>
      <div className="absolute top-3.5 right-4 flex items-center gap-1.5 text-white">
        <M icon="signal_cellular_alt" size={14} />
        <M icon="wifi" size={14} />
        <M icon="battery_full" size={16} />
      </div>
      <div className="pt-16 text-center text-white">
        <div className="text-[13px] font-medium opacity-90">Monday, May 4</div>
        <div className="text-[72px] font-thin tracking-tight leading-none mt-0.5">13:53</div>
      </div>
      <div className="absolute bottom-28 left-3 right-3">
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3.5 border border-white/40 shadow-lg">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-violet-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-bold text-neutral-900">App</span>
                <span className="text-[11px] text-neutral-500">now</span>
              </div>
              <div className="text-[12.5px] text-neutral-700 mt-0.5 leading-snug">Enter title and body in the Notification tab</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-9 left-0 right-0 flex justify-around px-12">
        <button className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center"><M icon="lightbulb" size={18} className="text-white" /></button>
        <button className="w-11 h-11 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center"><M icon="photo_camera" size={18} className="text-white" /></button>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/80" />
    </div>
  );

  const AndroidPhonePreview = () => (
    <div className="relative w-[320px] h-[780px] rounded-[28px] overflow-hidden shadow-lg shrink-0" style={{ background: 'linear-gradient(160deg, #a5b8ff 0%, #b89ff5 35%, #9a7fea 65%, #7fc4d4 100%)' }}>
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-white/70">
        <span className="text-[11px] font-medium">12:30</span>
        <div className="flex items-center gap-1.5">
          <M icon="signal_cellular_alt" size={13} />
          <M icon="wifi" size={13} />
          <M icon="battery_full" size={15} />
        </div>
      </div>
      <div className="pt-14 text-center text-white">
        <div className="text-[64px] font-light tracking-tight leading-none">12:30</div>
        <div className="text-[13px] font-medium text-white/60 mt-1">Mon, May 4</div>
      </div>
      <div className="px-3 mt-6">
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3.5 border border-white/40 shadow-lg">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-violet-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] font-bold text-neutral-900">App</span>
                <span className="text-[10px] text-neutral-500">now</span>
              </div>
              <div className="text-[12px] text-neutral-700 mt-0.5 leading-snug">Enter title and body in the Notification tab</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-12">
        <div className="w-4 h-4 border-2 border-white/30 rounded-sm" />
        <div className="w-4 h-4 rounded-full border-2 border-white/30" />
        <div className="w-0 h-0 border-l-[8px] border-l-white/30 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent" />
      </div>
    </div>
  );

  const Canvas = () => (
    <div className="flex-1 relative overflow-hidden bg-neutral-100 min-w-0" style={{ backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
      <div className="w-full h-full flex items-center justify-center p-6">
        {phoneMode === 'ios' ? <IOSPhonePreview /> : phoneMode === 'android' ? <AndroidPhonePreview /> : <ChatPhonePreview />}
      </div>

      <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col items-center gap-8">
        <div className="flex flex-col bg-white rounded-xl border border-neutral-200 shadow-sm p-1">
          <button onClick={() => setPreviewDark(false)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${!previewDark ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`} title="Light mode">
            <M icon="light_mode" size={19} />
          </button>
          <button onClick={() => setPreviewDark(true)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${previewDark ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`} title="Dark mode">
            <M icon="dark_mode" size={19} />
          </button>
        </div>

        <div className="flex flex-col gap-1 bg-white rounded-xl border border-neutral-200 shadow-sm p-1.5">
          <button onClick={() => setPhoneMode('chat')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${phoneMode === 'chat' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`} title="Chat">
            <M icon="chat" size={20} />
          </button>
          <button onClick={() => setPhoneMode('ios')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${phoneMode === 'ios' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`} title="iOS">
            <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.8-105.6-209.3-105.6-330.8 0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
          </button>
          <button onClick={() => setPhoneMode('android')} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${phoneMode === 'android' ? 'bg-violet-50 text-violet-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'}`} title="Android">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );

  // ---------- RIGHT PANEL ----------
  const NotificationProperties = () => (
    <div className="space-y-0">
      <div className="border-b border-neutral-100 pb-4 mb-2">
        <div className="text-[14px] font-semibold text-neutral-900 mb-4">Push Notification</div>
        <div className="space-y-3">
          <div>
            <div className="text-[13px] text-neutral-600 mb-1.5">Body</div>
            <div className="relative">
              <textarea placeholder="Notification body…" className="w-full min-h-[90px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors" />
              <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <div className="flex items-start gap-2 p-3 rounded-lg bg-neutral-50">
          <M icon="info" size={16} className="text-neutral-400 shrink-0 mt-0.5" />
          <div className="text-[12.5px] text-neutral-500 leading-relaxed">The notification preview is shown in the canvas area. Edit the title and body here to see it update in real-time.</div>
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
        <div className="flex items-center justify-between mb-4">
          <div className="text-[14px] font-semibold text-neutral-900">Variables</div>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="px-3 h-8 rounded-lg bg-violet-600 text-white text-[12.5px] font-medium hover:bg-violet-700 flex items-center gap-1.5 transition-colors">
              <M icon="add" size={16} /> Add
            </button>
          )}
        </div>

        {showForm && (
          <div className="border border-violet-200 bg-violet-50/30 rounded-xl p-4 mb-4">
            <div className="text-[13px] font-semibold text-neutral-900 mb-3">New Variable</div>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Name <span className="text-red-500">*</span></div>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. user_name" className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors" />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Label</div>
                <input type="text" value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} placeholder="e.g. User Name" className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors" />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Description</div>
                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="What this variable is for" className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors" />
              </div>
              <div>
                <div className="text-[13px] text-neutral-600 mb-1.5">Category</div>
                <select value={formData.category || 'General'} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium appearance-none focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors">
                  {['General', 'User', 'Order', 'Product', 'System'].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={handleAdd} className="px-4 h-9 rounded-lg bg-violet-600 text-white text-[12.5px] font-medium hover:bg-violet-700 transition-colors">Add Variable</button>
                <button onClick={() => { setShowForm(false); setFormData({ name: '', label: '', description: '', category: '' }); }} className="px-4 h-9 rounded-lg border border-neutral-200 text-[12.5px] text-neutral-600 font-medium hover:bg-neutral-50 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

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
                  {deleteId === v.id && (
                    <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-2.5 border border-red-200 shadow-sm">
                      <M icon="delete" size={20} className="text-red-400" />
                      <span className="text-[12.5px] text-neutral-700 font-medium">Delete this variable?</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleDelete(v.id)} className="px-3.5 h-8 rounded-lg bg-red-600 text-white text-[12px] font-medium hover:bg-red-700 transition-colors">Delete</button>
                        <button onClick={() => setDeleteId(null)} className="px-3.5 h-8 rounded-lg border border-neutral-200 text-[12px] text-neutral-600 font-medium hover:bg-neutral-50 transition-colors">Cancel</button>
                      </div>
                    </div>
                  )}
                  <div className="rounded-xl border border-neutral-200 bg-white hover:border-violet-200 hover:shadow-sm transition-all overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                          <M icon="data_object" size={16} className="text-violet-600" />
                        </div>
                        <code className="text-[13px] font-semibold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded">{v.name || 'unnamed'}</code>
                      </div>
                      <button onClick={() => setDeleteId(v.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-neutral-300 group-hover:text-neutral-400 hover:!text-red-500 transition-colors shrink-0">
                        <M icon="delete" size={16} />
                      </button>
                    </div>
                    <div className="px-3.5 pb-3 space-y-1.5">
                      {v.label && <div className="flex items-center gap-2"><M icon="label" size={14} className="text-neutral-400 shrink-0" /><span className="text-[12.5px] text-neutral-700">{v.label}</span></div>}
                      {v.description && <div className="flex items-start gap-2"><M icon="notes" size={14} className="text-neutral-400 shrink-0 mt-0.5" /><span className="text-[12px] text-neutral-500 leading-relaxed">{v.description}</span></div>}
                      {v.category && <div className="flex items-center gap-2 pt-0.5"><span className="text-[10.5px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{v.category}</span></div>}
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
    const [expandedNodes, setExpandedNodes] = useState({});
    const toggleNode = (id) => setExpandedNodes((s) => ({ ...s, [id]: !(s[id] !== false) }));

    const getNodeIcon = (type) => {
      const icons = { container: 'dashboard', row: 'table_rows', image: 'image', text: 'text_fields', button: 'crop_free', table: 'table_chart', divider: 'horizontal_rule', spacer: 'space_bar', code: 'code', progress: 'percent' };
      return icons[type] || 'widgets';
    };

    const getNodeLabel = (node) => {
      if (node.props.label) return node.props.label;
      if (node.props.content) return node.props.content.length > 25 ? node.props.content.slice(0, 25) + '…' : node.props.content;
      if (node.type === 'button') return node.props.label || 'Button';
      return node.type.charAt(0).toUpperCase() + node.type.slice(1);
    };

    const TreeNode = ({ node, depth = 0, isLast = false, parentLines = [] }) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedNodes[node.id] !== false;
      const isSelected = builder.selectedId === node.id;

      return (
        <div className="relative">
          {parentLines.map((showLine, i) =>
            showLine ? <div key={i} className="absolute top-0 bottom-0 border-l border-neutral-200" style={{ left: `${i * 22 + 19}px` }} /> : null
          )}
          {depth > 0 && (
            <>
              <div className="absolute border-l border-neutral-200" style={{ left: `${(depth - 1) * 22 + 19}px`, top: 0, height: isLast ? '20px' : '100%' }} />
              <div className="absolute border-t border-neutral-200" style={{ left: `${(depth - 1) * 22 + 19}px`, top: '20px', width: '14px' }} />
            </>
          )}
          <button
            onClick={() => {
              if (hasChildren && !isExpanded) {
                toggleNode(node.id);
              } else {
                builder.setSelectedId(node.id);
                setRightTab('element');
              }
            }}
            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-left relative transition-all w-full ${
              isSelected ? 'bg-violet-50 ring-1 ring-violet-200' : 'hover:bg-neutral-50'
            }`}
            style={{ marginLeft: depth > 0 ? `${depth * 22 + 4}px` : '0', width: depth > 0 ? `calc(100% - ${depth * 22 + 4}px)` : '100%' }}
          >
            {hasChildren ? (
              <span onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }} className={`shrink-0 cursor-pointer rounded hover:bg-neutral-200/50 p-0.5 ${isSelected ? 'text-violet-600' : 'text-neutral-400'}`}>
                <M icon={isExpanded ? 'expand_more' : 'chevron_right'} size={15} />
              </span>
            ) : (
              <span className="w-[15px] shrink-0" />
            )}
            <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'border-violet-300 bg-violet-50' : 'border-neutral-200 bg-white'}`}>
              <M icon={getNodeIcon(node.type)} size={14} className={isSelected ? 'text-violet-600' : 'text-neutral-600'} />
            </div>
            <span className={`truncate ${hasChildren ? `text-[13.5px] font-semibold ${isSelected ? 'text-violet-700' : 'text-neutral-900'}` : `text-[13px] font-medium ${isSelected ? 'text-violet-700' : 'text-neutral-700'}`}`}>{getNodeLabel(node)}</span>
          </button>
          {hasChildren && isExpanded && (
            <div className="mt-1">
              {node.children.map((child, i) => (
                <TreeNode key={child.id} node={child} depth={depth + 1} isLast={i === node.children.length - 1} parentLines={[...parentLines, !isLast]} />
              ))}
            </div>
          )}
        </div>
      );
    };

    if (builder.nodes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
            <M icon="account_tree" size={26} className="text-neutral-300" />
          </div>
          <div className="text-[13px] font-medium text-neutral-600">No elements yet</div>
          <div className="text-[12px] text-neutral-400 mt-1 max-w-[200px]">Add components or elements from the left panel to see the tree structure</div>
        </div>
      );
    }

    return (
      <div className="w-full space-y-1">
        {builder.nodes.map((node, i) => (
          <TreeNode key={node.id} node={node} isLast={i === builder.nodes.length - 1} />
        ))}
      </div>
    );
  };

  const CardProperties = () => {
    const cardNode = builder.nodes.length > 0 ? builder.nodes[0] : null;
    const cardProps = cardNode?.props || {};
    const [colorMode, setColorMode] = useState('light');
    const [messageType, setMessageType] = useState('custom_type');
    const [borderColor, setBorderColor] = useState('#E5E5E5');
    const [borderWidth, setBorderWidth] = useState('1');
    const [radiusMode, setRadiusMode] = useState('all');
    const [paddingMode, setPaddingMode] = useState('all');
    const [fallbackText, setFallbackText] = useState('');

    const bgColor = cardProps.bgColor || '#FFFFFF';
    const radiusAll = String(cardProps.borderRadius != null ? cardProps.borderRadius : 12);
    const radiusTL = String(cardProps.radiusTL != null ? cardProps.radiusTL : radiusAll);
    const radiusTR = String(cardProps.radiusTR != null ? cardProps.radiusTR : radiusAll);
    const radiusBR = String(cardProps.radiusBR != null ? cardProps.radiusBR : radiusAll);
    const radiusBL = String(cardProps.radiusBL != null ? cardProps.radiusBL : radiusAll);
    const paddingAll = String(cardProps.padding != null ? cardProps.padding : 12);
    const paddingTop = String(cardProps.paddingTop != null ? cardProps.paddingTop : paddingAll);
    const paddingRight = String(cardProps.paddingRight != null ? cardProps.paddingRight : paddingAll);
    const paddingBottom = String(cardProps.paddingBottom != null ? cardProps.paddingBottom : paddingAll);
    const paddingLeft = String(cardProps.paddingLeft != null ? cardProps.paddingLeft : paddingAll);

    const updateCard = (props) => { if (cardNode) builder.updateNode(cardNode.id, props); };

    const FieldRow = ({ label, children }) => (
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
        <div className="flex-1">{children}</div>
      </div>
    );

    const Input = ({ value = '', mono = false, placeholder = '', onChange, suffix }) => {
      const ref = { current: null };
      return (
        <div className="relative">
          <input
            ref={(el) => { ref.current = el; }}
            type="text"
            defaultValue={value}
            placeholder={placeholder}
            onBlur={(e) => onChange && onChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onChange && onChange(e.target.value); } }}
            className={`w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors ${mono ? 'font-mono text-[12px]' : ''} ${suffix ? 'pr-9' : ''}`}
          />
          {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-500">{suffix}</span>}
        </div>
      );
    };

    const handleRadiusAllChange = (v) => {
      const val = parseInt(v) || 0;
      updateCard({ borderRadius: val, radiusTL: val, radiusTR: val, radiusBR: val, radiusBL: val });
    };

    const handlePaddingAllChange = (v) => {
      const val = parseInt(v) || 0;
      updateCard({ padding: val, paddingTop: val, paddingRight: val, paddingBottom: val, paddingLeft: val });
    };

    if (!cardNode) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
            <M icon="dashboard" size={26} className="text-neutral-300" />
          </div>
          <div className="text-[13px] font-medium text-neutral-600">No card on canvas</div>
          <div className="text-[12px] text-neutral-400 mt-1 max-w-[200px]">Add a component from the left panel to configure card properties</div>
        </div>
      );
    }

    return (
      <div className="space-y-0">
        {/* Message */}
        <div className="border-b border-neutral-100 pb-4 mb-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Message</div>
          <FieldRow label="Type"><Input value={messageType} mono onChange={(v) => setMessageType(v)} /></FieldRow>
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
                <div className="relative w-10 h-10 shrink-0">
                  <div className="w-10 h-10 rounded-lg border border-neutral-200 pointer-events-none" style={{ backgroundColor: bgColor }} />
                  <input type="color" value={bgColor || '#ffffff'} onInput={(e) => updateCard({ bgColor: e.target.value })} onChange={(e) => updateCard({ bgColor: e.target.value })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1"><Input value={bgColor} onChange={(v) => updateCard({ bgColor: v })} /></div>
              </div>
            </div>
            <div>
              <div className="text-[13px] text-neutral-600 mb-1.5">Border</div>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 shrink-0">
                  <div className="w-10 h-10 rounded-lg border border-neutral-200 pointer-events-none" style={{ backgroundColor: borderColor }} />
                  <input type="color" value={borderColor} onInput={(e) => setBorderColor(e.target.value)} onChange={(e) => setBorderColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1"><Input value={borderColor} onChange={(v) => setBorderColor(v)} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame */}
        <div className="border-b border-neutral-100 pb-4 mb-2 pt-2">
          <div className="text-[14px] font-semibold text-neutral-900 mb-4">Frame</div>
          <div className="space-y-3">
            <FieldRow label="Border Width"><Input value={borderWidth} suffix="px" onChange={(v) => setBorderWidth(v)} /></FieldRow>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
                <div className="flex-1"><Input value={radiusAll} onChange={handleRadiusAllChange} /></div>
                <button onClick={() => setRadiusMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All corners"><M icon="rounded_corner" size={18} /></button>
                <button onClick={() => setRadiusMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${radiusMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per corner"><M icon="dashboard_customize" size={18} /></button>
              </div>
              {radiusMode === 'custom' && (
                <div className="ml-[112px] grid grid-cols-2 gap-2">
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={radiusTL} onChange={(v) => updateCard({ radiusTL: parseInt(v) || 0 })} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={radiusTR} onChange={(v) => updateCard({ radiusTR: parseInt(v) || 0 })} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={radiusBL} onChange={(v) => updateCard({ radiusBL: parseInt(v) || 0 })} /></div>
                  <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={radiusBR} onChange={(v) => updateCard({ radiusBR: parseInt(v) || 0 })} /></div>
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
              <div className="flex-1"><Input value={paddingAll} onChange={handlePaddingAllChange} /></div>
              <button onClick={() => setPaddingMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="All sides"><M icon="crop_square" size={18} /></button>
              <button onClick={() => setPaddingMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${paddingMode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`} title="Custom per side"><M icon="dashboard_customize" size={18} /></button>
            </div>
            {paddingMode === 'custom' && (
              <div className="ml-[112px] grid grid-cols-2 gap-2">
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={paddingTop} onChange={(v) => updateCard({ paddingTop: parseInt(v) || 0 })} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={paddingRight} onChange={(v) => updateCard({ paddingRight: parseInt(v) || 0 })} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={paddingBottom} onChange={(v) => updateCard({ paddingBottom: parseInt(v) || 0 })} /></div>
                <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={paddingLeft} onChange={(v) => updateCard({ paddingLeft: parseInt(v) || 0 })} /></div>
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
              value={fallbackText}
              onChange={(e) => setFallbackText(e.target.value)}
              placeholder="Plain text for older UI Kit versions"
              className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors"
            />
            <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  };

  const RightPanel = () => {
    const tabs = [
      { id: 'tree', label: 'Tree' },
      { id: 'element', label: 'Element' },
      { id: 'card', label: 'Card' },
      { id: 'notification', label: 'Notification' },
      { id: 'variables', label: 'Variables' },
    ];
    return (
      <div className="w-[400px] shrink-0 border-l border-neutral-200 bg-white flex flex-col h-full min-w-0">
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
        <div className="flex-1 overflow-y-auto p-5">
          {rightTab === 'tree' && <TreeProperties />}
          {rightTab === 'element' && (
            <ElementPanel key={builder.selectedId} node={builder.findNode(builder.selectedId)} onUpdate={(props) => { if (builder.selectedId) builder.updateNode(builder.selectedId, props); }} />
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
    </div>
  );
}
