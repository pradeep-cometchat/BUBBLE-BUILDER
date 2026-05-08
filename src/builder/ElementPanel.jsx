import { useState, useRef } from 'react';
import M from './Icon';

// Uncontrolled input — commits on blur or Enter
function Input({ value = '', placeholder = '', mono = false, suffix, onChange }) {
  const ref = useRef(null);
  return (
    <div className="relative">
      <input ref={ref} type="text" defaultValue={value}
        onBlur={() => { if (ref.current && onChange) onChange(ref.current.value); }}
        onKeyDown={(e) => { if (e.key === 'Enter' && ref.current && onChange) { e.preventDefault(); onChange(ref.current.value); } }}
        placeholder={placeholder}
        className={`w-full h-10 px-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium placeholder:text-neutral-400 placeholder:font-normal focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors ${mono ? 'font-mono text-[12px]' : ''} ${suffix ? 'pr-9' : ''}`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-500">{suffix}</span>}
    </div>
  );
}

function TextArea({ value = '', placeholder = '', onChange }) {
  const ref = useRef(null);
  return (
    <div className="relative">
      <textarea ref={ref} defaultValue={value} onBlur={() => { if (ref.current && onChange) onChange(ref.current.value); }} placeholder={placeholder}
        className="w-full min-h-[80px] p-3 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 resize-y transition-colors" />
      <M icon="expand" size={14} className="absolute bottom-2 right-2 text-neutral-400 pointer-events-none" />
    </div>
  );
}

const Select = ({ value, options = [], onChange }) => (
  <div className="relative">
    <select value={value} onChange={(e) => onChange && onChange(e.target.value)} className="w-full h-10 px-3 pr-8 rounded-md border border-neutral-200 bg-white text-[13px] text-neutral-900 font-medium appearance-none focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-50 transition-colors">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <M icon="expand_more" size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
  </div>
);

const FieldRow = ({ label, children }) => (
  <div className="flex items-center gap-3">
    <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

function ColorInput({ label, value, onChange }) {
  const [preview, setPreview] = useState(value);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        <div className="relative w-10 h-10 shrink-0">
          <div className="w-10 h-10 rounded-lg border border-neutral-200 pointer-events-none" style={{ backgroundColor: preview }} />
          <input
            type="color"
            value={preview || '#000000'}
            onInput={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
            onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex-1"><Input value={value} onChange={(v) => { setPreview(v); onChange(v); }} /></div>
      </div>
    </div>
  );
}

function ImagePreview({ src, onUpdate }) {
  const fileRef = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdate({ src: url });
    }
  };
  return (
    <div>
      <div className="text-[13px] text-neutral-600 mb-1.5">Preview</div>
      {src ? (
        <div className="relative w-full h-[140px] rounded-lg overflow-hidden border border-neutral-200 group">
          <img src={src} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2">
            <button onClick={() => fileRef.current?.click()} className="opacity-0 group-hover:opacity-100 transition-opacity px-3 h-8 rounded-lg bg-white/90 text-[12px] font-medium text-neutral-800 hover:bg-white shadow-sm flex items-center gap-1.5">
              <M icon="swap_horiz" size={15} /> Change
            </button>
            <button onClick={() => window.open(src, '_blank')} className="opacity-0 group-hover:opacity-100 transition-opacity px-3 h-8 rounded-lg bg-white/90 text-[12px] font-medium text-neutral-800 hover:bg-white shadow-sm flex items-center gap-1.5">
              <M icon="open_in_full" size={15} /> Expand
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-[100px] rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 hover:border-violet-400 hover:bg-violet-50/30 transition-all cursor-pointer group">
          <M icon="add_photo_alternate" size={22} className="text-neutral-400 group-hover:text-violet-600 transition-colors mb-1" />
          <span className="text-[12px] font-medium text-neutral-500 group-hover:text-violet-700">Upload image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

const Section = ({ title, children, noBorder, headerRight }) => (
  <div className={`pb-4 mb-2 pt-2 ${noBorder ? '' : 'border-b border-neutral-100'}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-[14px] font-semibold text-neutral-900">{title}</span>
      {headerRight}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const ColorModeToggle = ({ mode, setMode }) => (
  <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
    <button onClick={() => setMode('light')} className={`w-9 h-8 flex items-center justify-center transition-colors ${mode === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="light_mode" size={16} /></button>
    <button onClick={() => setMode('dark')} className={`w-9 h-8 flex items-center justify-center border-l border-neutral-200 transition-colors ${mode === 'dark' ? 'bg-violet-50 text-violet-600' : 'bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="dark_mode" size={16} /></button>
  </div>
);

const PaddingControl = ({ node, onUpdate }) => {
  const [mode, setMode] = useState('all');
  const allVal = String(node.props.padding != null ? node.props.padding : 12);
  const pt = String(node.props.paddingTop != null ? node.props.paddingTop : allVal);
  const pr = String(node.props.paddingRight != null ? node.props.paddingRight : allVal);
  const pb = String(node.props.paddingBottom != null ? node.props.paddingBottom : allVal);
  const pl = String(node.props.paddingLeft != null ? node.props.paddingLeft : allVal);
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Padding</span>
        <div className="flex-1"><Input value={allVal} onChange={(v) => onUpdate({ padding: parseInt(v) || 0 })} /></div>
        <button onClick={() => setMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${mode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="crop_square" size={18} /></button>
        <button onClick={() => setMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${mode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="dashboard_customize" size={18} /></button>
      </div>
      {mode === 'custom' && (
        <div className="ml-[112px] grid grid-cols-2 gap-2">
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top</div><Input value={pt} onChange={(v) => onUpdate({ paddingTop: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Right</div><Input value={pr} onChange={(v) => onUpdate({ paddingRight: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom</div><Input value={pb} onChange={(v) => onUpdate({ paddingBottom: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Left</div><Input value={pl} onChange={(v) => onUpdate({ paddingLeft: parseInt(v) || 0 })} /></div>
        </div>
      )}
    </div>
  );
};

const RadiusControl = ({ node, onUpdate }) => {
  const [mode, setMode] = useState('all');
  const allVal = String(node.props.borderRadius != null ? node.props.borderRadius : 12);
  const tl = String(node.props.radiusTL != null ? node.props.radiusTL : allVal);
  const tr = String(node.props.radiusTR != null ? node.props.radiusTR : allVal);
  const br = String(node.props.radiusBR != null ? node.props.radiusBR : allVal);
  const bl = String(node.props.radiusBL != null ? node.props.radiusBL : allVal);
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Border radius</span>
        <div className="flex-1"><Input value={allVal} onChange={(v) => onUpdate({ borderRadius: parseInt(v) || 0 })} /></div>
        <button onClick={() => setMode('all')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${mode === 'all' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="rounded_corner" size={18} /></button>
        <button onClick={() => setMode('custom')} className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${mode === 'custom' ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-50'}`}><M icon="dashboard_customize" size={18} /></button>
      </div>
      {mode === 'custom' && (
        <div className="ml-[112px] grid grid-cols-2 gap-2">
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Left</div><Input value={tl} onChange={(v) => onUpdate({ radiusTL: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Top Right</div><Input value={tr} onChange={(v) => onUpdate({ radiusTR: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Left</div><Input value={bl} onChange={(v) => onUpdate({ radiusBL: parseInt(v) || 0 })} /></div>
          <div><div className="text-[10.5px] text-neutral-500 mb-1 uppercase tracking-wider font-medium">Bottom Right</div><Input value={br} onChange={(v) => onUpdate({ radiusBR: parseInt(v) || 0 })} /></div>
        </div>
      )}
    </div>
  );
};

// ─── Panels ───

function ContainerPanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Layout">
        <FieldRow label="Label"><Input value={node.props.label || ''} onChange={(v) => onUpdate({ label: v })} /></FieldRow>
        <FieldRow label="Gap"><Input value={String(node.props.gap || 0)} onChange={(v) => onUpdate({ gap: parseInt(v) || 0 })} /></FieldRow>
        <PaddingControl node={node} onUpdate={onUpdate} />
      </Section>
      <Section title="Frame"><RadiusControl node={node} onUpdate={onUpdate} /></Section>
      <Section title="Color" noBorder headerRight={<ColorModeToggle mode="light" setMode={() => {}} />}>
        <ColorInput label="Background" value={node.props.bgColor || '#FFFFFF'} onChange={(v) => onUpdate({ bgColor: v })} />
      </Section>
    </>
  );
}

function RowPanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Layout">
        <FieldRow label="Label"><Input value={node.props.label || ''} onChange={(v) => onUpdate({ label: v })} /></FieldRow>
        <FieldRow label="Gap"><Input value={String(node.props.gap || 8)} onChange={(v) => onUpdate({ gap: parseInt(v) || 0 })} /></FieldRow>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-neutral-600 w-[100px] shrink-0">Wrap</span>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => onUpdate({ wrap: !node.props.wrap })}
              className={`w-10 h-6 rounded-full transition-colors relative ${node.props.wrap ? 'bg-violet-600' : 'bg-neutral-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${node.props.wrap ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
        <PaddingControl node={node} onUpdate={onUpdate} />
      </Section>
      <Section title="Frame" noBorder><RadiusControl node={node} onUpdate={onUpdate} /></Section>
    </>
  );
}

function TextPanel({ node, onUpdate }) {
  const [colorMode, setColorMode] = useState('light');
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Content">
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Text</div>
          <TextArea value={node.props.content || ''} onChange={(v) => onUpdate({ content: v })} />
        </div>
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Variant</div>
          <Select value={node.props.variant || 'body'} options={['title', 'heading-1', 'body', 'caption']} onChange={(v) => onUpdate({ variant: v })} />
        </div>
      </Section>
      <Section title="Typography">
        <FieldRow label="Alignment"><Select value={node.props.align || 'start'} options={['start', 'center', 'end']} onChange={(v) => onUpdate({ align: v })} /></FieldRow>
        <FieldRow label="Font Weight"><Select value={node.props.weight || 'regular'} options={['thin', 'light', 'regular', 'medium', 'semibold', 'bold']} onChange={(v) => onUpdate({ weight: v })} /></FieldRow>
      </Section>
      <Section title="Color" headerRight={<ColorModeToggle mode={colorMode} setMode={setColorMode} />}>
        <ColorInput label="Text Color" value={node.props.color || '#171717'} onChange={(v) => onUpdate({ color: v })} />
      </Section>
      <Section title="Spacing" noBorder><PaddingControl node={node} onUpdate={onUpdate} /></Section>
    </>
  );
}

function ImagePanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Source">
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">URL</div>
          <Input value={node.props.src || ''} placeholder="https://example.com/image.png" onChange={(v) => onUpdate({ src: v })} />
        </div>
        <ImagePreview src={node.props.src} onUpdate={onUpdate} />
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Alt Text</div>
          <Input value={node.props.alt || ''} placeholder="Describe the image" onChange={(v) => onUpdate({ alt: v })} />
        </div>
      </Section>
      <Section title="Dimensions">
        <FieldRow label="Fit"><Select value={node.props.fit || 'cover'} options={['cover', 'contain', 'fill', 'none']} onChange={(v) => onUpdate({ fit: v })} /></FieldRow>
      </Section>
      <Section title="Frame"><RadiusControl node={node} onUpdate={onUpdate} /></Section>
      <Section title="Spacing" noBorder><PaddingControl node={node} onUpdate={onUpdate} /></Section>
    </>
  );
}

function ButtonPanel({ node, onUpdate }) {
  const [colorMode, setColorMode] = useState('light');
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Content">
        <FieldRow label="Label"><Input value={node.props.label || ''} onChange={(v) => onUpdate({ label: v })} /></FieldRow>
        <FieldRow label="Variant"><Select value={node.props.variant || 'filled'} options={['filled', 'outlined', 'link']} onChange={(v) => onUpdate({ variant: v })} /></FieldRow>
      </Section>
      <Section title="Color" headerRight={<ColorModeToggle mode={colorMode} setMode={setColorMode} />}>
        <ColorInput label="Background" value={node.props.color || '#7C3AED'} onChange={(v) => onUpdate({ color: v })} />
      </Section>
      <Section title="Frame"><RadiusControl node={node} onUpdate={onUpdate} /></Section>
      <Section title="Spacing"><PaddingControl node={node} onUpdate={onUpdate} /></Section>
      <Section title="Action" noBorder>
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">URL</div>
          <Input value={node.props.url || ''} placeholder="https://" onChange={(v) => onUpdate({ url: v })} />
        </div>
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Open in</div>
          <Select value={node.props.openIn || 'Browser'} options={['Browser', 'Webview']} onChange={(v) => onUpdate({ openIn: v })} />
        </div>
      </Section>
    </>
  );
}

function TablePanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Data">
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Headers (comma separated)</div>
          <Input value={(node.props.headers || []).join(', ')} onChange={(v) => onUpdate({ headers: v.split(',').map(s => s.trim()) })} />
        </div>
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Rows (one per line, | separated)</div>
          <TextArea value={(node.props.rows || []).map(r => r.join(' | ')).join('\n')} onChange={(v) => onUpdate({ rows: v.split('\n').map(r => r.split('|').map(c => c.trim())) })} />
        </div>
      </Section>
      <Section title="Frame" noBorder><RadiusControl node={node} onUpdate={onUpdate} /></Section>
    </>
  );
}

function DividerPanel({ node }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Style" noBorder>
        <FieldRow label="Thickness"><Input value="1" suffix="px" /></FieldRow>
      </Section>
    </>
  );
}

function SpacerPanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Dimensions" noBorder>
        <FieldRow label="Height"><Input value={String(node.props.height || 16)} suffix="px" onChange={(v) => onUpdate({ height: parseInt(v) || 16 })} /></FieldRow>
      </Section>
    </>
  );
}

function CodePanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Content" noBorder>
        <div>
          <div className="text-[13px] text-neutral-600 mb-1.5">Code</div>
          <TextArea value={node.props.content || ''} onChange={(v) => onUpdate({ content: v })} />
        </div>
      </Section>
    </>
  );
}

function ProgressPanel({ node, onUpdate }) {
  return (
    <>
      <Section title="ID" noBorder><Input value={node.id} mono /></Section>
      <Section title="Content" noBorder>
        <FieldRow label="Value"><Input value={String(node.props.value || 0)} suffix="%" onChange={(v) => onUpdate({ value: parseInt(v) || 0 })} /></FieldRow>
        <FieldRow label="Label"><Input value={node.props.label || ''} onChange={(v) => onUpdate({ label: v })} /></FieldRow>
      </Section>
    </>
  );
}

// ─── Main ───

export default function ElementPanel({ node, onUpdate }) {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
          <M icon="tune" size={26} className="text-neutral-300" />
        </div>
        <div className="text-[13px] font-medium text-neutral-600">No element selected</div>
        <div className="text-[12px] text-neutral-400 mt-1 max-w-[200px]">Click on any element in the canvas or tree to edit its properties</div>
      </div>
    );
  }

  const update = onUpdate || (() => {});

  switch (node.type) {
    case 'container': return <ContainerPanel node={node} onUpdate={update} />;
    case 'row': return <RowPanel node={node} onUpdate={update} />;
    case 'text': return <TextPanel node={node} onUpdate={update} />;
    case 'image': return <ImagePanel node={node} onUpdate={update} />;
    case 'button': return <ButtonPanel node={node} onUpdate={update} />;
    case 'table': return <TablePanel node={node} onUpdate={update} />;
    case 'divider': return <DividerPanel node={node} onUpdate={update} />;
    case 'spacer': return <SpacerPanel node={node} onUpdate={update} />;
    case 'code': return <CodePanel node={node} onUpdate={update} />;
    case 'progress': return <ProgressPanel node={node} onUpdate={update} />;
    default: return (
      <>
        <Section title="ID" noBorder><Input value={node.id} mono /></Section>
        <div className="text-[12px] text-neutral-400 text-center py-4">No specific properties for this element type</div>
      </>
    );
  }
}
