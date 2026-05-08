import { useState } from 'react';
import {
  DndContext,
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import M from './Icon';
import { findNodeInTree, containsIdInTree } from './store';

function ActionToolbar({ nodeId, isFirst, isLast, onRemove, onMoveUp, onMoveDown, onDuplicate, dragListeners }) {
  return (
    <div className="flex items-center gap-0.5 bg-white rounded-lg border border-neutral-200 shadow-md px-1 py-0.5" onClick={(e) => e.stopPropagation()}>
      <button
        {...dragListeners}
        className="w-6 h-6 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-grab active:cursor-grabbing"
        title="Drag to reorder"
      >
        <M icon="drag_indicator" size={14} />
      </button>
      <div className="w-px h-4 bg-neutral-200 mx-0.5" />
      {!isFirst && (
        <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onMoveUp(nodeId); }} className="w-6 h-6 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors" title="Move up">
          <M icon="arrow_upward" size={14} />
        </button>
      )}
      {!isLast && (
        <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onMoveDown(nodeId); }} className="w-6 h-6 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors" title="Move down">
          <M icon="arrow_downward" size={14} />
        </button>
      )}
      <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onDuplicate(nodeId); }} className="w-6 h-6 rounded flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors" title="Duplicate">
        <M icon="content_copy" size={14} />
      </button>
      <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onRemove(nodeId); }} className="w-6 h-6 rounded flex items-center justify-center text-neutral-500 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete">
        <M icon="delete" size={14} />
      </button>
    </div>
  );
}

function SortableNode({ node, dark, selectedId, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onAddInside, isFirst, isLast, depth = 0 }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id });
  const isSelected = selectedId === node.id;
  const isTopLevel = depth === 0;
  const hasSelectedDescendant = selectedId && containsIdInTree(node.children || [], selectedId);
  const showHoverToolbar = isTopLevel && !hasSelectedDescendant;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={`relative ${isTopLevel ? 'group/parent' : ''} ${isDragging ? 'z-50' : ''}`}>
      {showHoverToolbar && (
        <div className="absolute -top-3 left-1 z-30 opacity-0 group-hover/parent:opacity-100 transition-opacity pointer-events-none group-hover/parent:pointer-events-auto">
          <ActionToolbar nodeId={node.id} isFirst={isFirst} isLast={isLast} onRemove={onRemove} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onDuplicate={onDuplicate} dragListeners={listeners} />
        </div>
      )}

      {!isTopLevel && isSelected && (
        <div className="absolute -top-3 left-1 z-30">
          <ActionToolbar nodeId={node.id} isFirst={isFirst} isLast={isLast} onRemove={onRemove} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onDuplicate={onDuplicate} dragListeners={listeners} />
        </div>
      )}

      <div
        onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
        className={`relative rounded-lg transition-all cursor-pointer ${
          isSelected ? 'ring-2 ring-violet-500 ring-offset-1' : isTopLevel ? 'hover:ring-1 hover:ring-violet-300 hover:ring-offset-1' : 'hover:ring-1 hover:ring-neutral-300'
        }`}
      >
        {renderContent(node, dark, selectedId, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onAddInside, depth)}
      </div>
    </div>
  );
}

function SortableList({ items, dark, selectedId, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onAddInside, depth }) {
  return (
    <SortableContext items={items.map((n) => n.id)} strategy={verticalListSortingStrategy}>
      {items.map((child, i) => (
        <SortableNode
          key={child.id}
          node={child}
          dark={dark}
          selectedId={selectedId}
          onSelect={onSelect}
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDuplicate={onDuplicate}
          onAddInside={onAddInside}
          isFirst={i === 0}
          isLast={i === items.length - 1}
          depth={depth}
        />
      ))}
    </SortableContext>
  );
}

function renderContent(node, dark, selectedId, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onAddInside, depth) {
  const { type, props, children } = node;

  switch (type) {
    case 'container':
      return (
        <div
          className={`border ${dark ? 'bg-[#24243a] border-[#3a3a4e]' : 'bg-white border-neutral-200/70'}`}
          style={{
            ...(props.width ? { width: props.width } : {}),
            borderRadius: props.radiusTL != null || props.radiusTR != null || props.radiusBR != null || props.radiusBL != null
              ? `${parseInt(props.radiusTL) || parseInt(props.borderRadius) || 12}px ${parseInt(props.radiusTR) || parseInt(props.borderRadius) || 12}px ${parseInt(props.radiusBR) || parseInt(props.borderRadius) || 12}px ${parseInt(props.radiusBL) || parseInt(props.borderRadius) || 12}px`
              : `${parseInt(props.borderRadius) || 12}px`,
            backgroundColor: props.bgColor && props.bgColor !== '#FFFFFF' ? props.bgColor : undefined,
          }}
        >
          <div className="space-y-2 pt-2" style={{
            padding: props.paddingTop != null || props.paddingRight != null || props.paddingBottom != null || props.paddingLeft != null
              ? `${parseInt(props.paddingTop) || parseInt(props.padding) || 12}px ${parseInt(props.paddingRight) || parseInt(props.padding) || 12}px ${parseInt(props.paddingBottom) || parseInt(props.padding) || 12}px ${parseInt(props.paddingLeft) || parseInt(props.padding) || 12}px`
              : `${parseInt(props.padding) || 12}px`
          }}>
            <SortableList items={children} dark={dark} selectedId={selectedId} onSelect={onSelect} onRemove={onRemove} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onDuplicate={onDuplicate} onAddInside={onAddInside} depth={depth + 1} />
            <button onClick={(e) => { e.stopPropagation(); onAddInside && onAddInside(node.id); }} className={`w-full py-2 rounded-lg border border-dashed flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors ${dark ? 'border-[#3a3a4e] text-neutral-500 hover:border-violet-400/50 hover:text-violet-300' : 'border-neutral-200 text-neutral-400 hover:border-violet-300 hover:text-violet-600'}`}>
              <M icon="add" size={14} /> Add element
            </button>
          </div>
        </div>
      );

    case 'row':
      return (
        <div className={`rounded-lg border p-2 ${dark ? 'border-[#3a3a4e]' : 'border-neutral-200/70'}`}>
          <div className={`flex items-center ${props.scrollable ? 'overflow-x-auto' : ''} ${props.wrap ? 'flex-wrap' : ''}`} style={{ gap: props.gap || 8 }}>
            <SortableList items={children} dark={dark} selectedId={selectedId} onSelect={onSelect} onRemove={onRemove} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onDuplicate={onDuplicate} onAddInside={onAddInside} depth={depth + 1} />
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAddInside && onAddInside(node.id); }} className={`mt-2 w-full py-1.5 rounded border border-dashed flex items-center justify-center gap-1 text-[10px] font-medium transition-colors ${dark ? 'border-[#3a3a4e] text-neutral-500 hover:border-violet-400/50 hover:text-violet-300' : 'border-neutral-200 text-neutral-400 hover:border-violet-300 hover:text-violet-600'}`}>
            <M icon="add" size={12} /> Add
          </button>
        </div>
      );

    case 'image': {
      const isAvatar = props.rounded;
      return (
        <div className={`${isAvatar ? 'w-10 h-10 rounded-full' : 'aspect-[16/10] rounded-lg'} overflow-hidden flex items-center justify-center ${dark ? 'bg-[#2e2e42]' : 'bg-gradient-to-br from-violet-50 to-indigo-50'}`}>
          {props.src ? <img src={props.src} alt={props.alt} className="w-full h-full object-cover" /> : <M icon={isAvatar ? 'account_circle' : 'image'} size={isAvatar ? 20 : 28} className={dark ? 'text-neutral-500' : 'text-violet-300'} />}
        </div>
      );
    }

    case 'text': {
      const textSizes = { title: 'text-[14px]', 'heading-1': 'text-[18px]', body: 'text-[12px]', caption: 'text-[11px]' };
      const textWeights = { thin: 'font-thin', light: 'font-light', regular: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' };
      if (props.badge) return <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${dark ? 'bg-violet-900/40 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>{props.content}</span>;
      return (
        <div className={`${textSizes[props.variant] || 'text-[12.5px]'} ${textWeights[props.weight] || 'font-normal'} ${props.align === 'center' ? 'text-center' : props.align === 'end' ? 'text-right' : ''} py-0.5 ${dark ? 'text-neutral-200' : 'text-neutral-800'}`} style={props.color ? { color: props.color } : {}}>
          {props.content}
        </div>
      );
    }

    case 'button':
      if (props.variant === 'filled') return <button className="px-3.5 h-8 rounded-md text-white text-[11.5px] font-semibold" style={{ backgroundColor: props.color || '#7C3AED' }}>{props.label}</button>;
      if (props.variant === 'link') return <span className="inline-flex items-center gap-1 text-[12px] font-medium text-violet-600">{props.label} <M icon="arrow_forward" size={14} /></span>;
      return <button className={`px-3.5 h-8 rounded-md border text-[11.5px] font-semibold ${dark ? 'border-violet-400/60 text-violet-300' : 'border-violet-300 text-violet-700'}`}>{props.label}</button>;

    case 'table':
      return (
        <div className={`rounded-xl border overflow-hidden ${dark ? 'bg-[#24243a] border-[#3a3a4e]' : 'bg-white border-neutral-200/70'}`}>
          <table className="w-full text-[11.5px]">
            <thead><tr className={dark ? 'bg-[#1c1c28]' : 'bg-neutral-50'}>{(props.headers || []).map((h, i) => <th key={i} className={`text-left py-2.5 px-3 font-semibold ${i === props.headers.length - 1 ? 'text-right' : ''} ${dark ? 'text-neutral-200 border-b border-[#3a3a4e]' : 'text-neutral-700 border-b border-neutral-200'}`}>{h}</th>)}</tr></thead>
            <tbody>{(props.rows || []).map((row, i) => <tr key={i} className={dark ? 'border-b border-[#3a3a4e] last:border-0' : 'border-b border-neutral-100 last:border-0'}>{row.map((cell, j) => <td key={j} className={`py-2.5 px-3 ${j === row.length - 1 ? 'text-right font-medium' : ''} ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );

    case 'divider': return <div className={`w-full h-px my-1 ${dark ? 'bg-[#3a3a4e]' : 'bg-neutral-200'}`} />;
    case 'spacer': return <div style={{ height: props.height || 16 }} className={`w-full rounded ${dark ? 'bg-[#2e2e42]/30' : 'bg-neutral-100/50'}`} />;
    case 'code': return <div className={`rounded-lg p-3 font-mono text-[11px] leading-relaxed overflow-x-auto ${dark ? 'bg-[#1c1c28] text-emerald-300 border border-[#3a3a4e]' : 'bg-neutral-900 text-emerald-400'}`}>{props.content}</div>;
    case 'progress': return (
      <div className="w-full">
        {props.label && <div className={`text-[11px] font-medium mb-1.5 flex justify-between ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}><span>{props.label}</span><span>{props.value}%</span></div>}
        <div className={`w-full h-2 rounded-full overflow-hidden ${dark ? 'bg-[#2e2e42]' : 'bg-neutral-200'}`}><div className="h-full rounded-full bg-violet-500" style={{ width: `${props.value || 0}%` }} /></div>
      </div>
    );

    default: return <div className={`p-2 rounded border text-[11px] ${dark ? 'border-[#3a3a4e] text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>Unknown: {type}</div>;
  }
}

export default function BuilderRenderer({ nodes, dark, selectedId, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onAddInside, onReorder }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 3 } }));
  const [activeId, setActiveId] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      onReorder(active.id, over.id);
    }
  };

  if (nodes.length === 0) return null;

  const activeNode = activeId ? findNodeInTree(nodes, activeId) : null;

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={(e) => setActiveId(e.active.id)} onDragEnd={handleDragEnd}>
      <div className="space-y-2.5">
        <SortableList
          items={nodes}
          dark={dark}
          selectedId={selectedId}
          onSelect={onSelect}
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDuplicate={onDuplicate}
          onAddInside={onAddInside}
          depth={0}
        />
      </div>

      <DragOverlay>
        {activeNode ? (
          <div className="opacity-80 rotate-1 scale-[0.98] pointer-events-none">
            <div className="rounded-lg ring-2 ring-violet-500 ring-offset-2 shadow-xl bg-white">
              {renderContent(activeNode, dark, null, () => {}, () => {}, () => {}, () => {}, () => {}, () => {}, 0)}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
