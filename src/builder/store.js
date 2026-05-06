// Builder state management — tree of components
import { useState, useCallback } from 'react';

let idCounter = 1;
const genId = () => `node_${idCounter++}`;

// ─── Tree utilities (exported for use in Renderer) ───

export function findNodeInTree(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n;
    const found = findNodeInTree(n.children || [], id);
    if (found) return found;
  }
  return null;
}

export function containsIdInTree(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return true;
    if (containsIdInTree(n.children || [], id)) return true;
  }
  return false;
}

// ─── Component templates ───

export const COMPONENT_TEMPLATES = {
  'Product Card': {
    type: 'container',
    props: { label: 'Product Card' },
    children: [
      { type: 'image', props: { src: '', alt: 'Product image', fit: 'cover' }, children: [] },
      { type: 'text', props: { content: 'Product Title', variant: 'title', weight: 'semibold' }, children: [] },
      { type: 'text', props: { content: '$0.00', variant: 'title', weight: 'bold', color: '#7C3AED' }, children: [] },
      { type: 'text', props: { content: 'Product description goes here.', variant: 'body', weight: 'regular' }, children: [] },
      {
        type: 'row',
        props: { gap: 8 },
        children: [
          { type: 'button', props: { label: 'Buy Now', variant: 'filled' }, children: [] },
          { type: 'button', props: { label: 'Details', variant: 'outlined' }, children: [] },
        ],
      },
    ],
  },
  'Order Confirmation': {
    type: 'container',
    props: { label: 'Order Confirmation' },
    children: [
      { type: 'text', props: { content: '✓ Order Confirmed', variant: 'title', weight: 'semibold', color: '#059669', align: 'center' }, children: [] },
      { type: 'text', props: { content: 'Your order has been placed successfully', variant: 'body', align: 'center' }, children: [] },
      { type: 'text', props: { content: 'Order ID: {{order.id}}', variant: 'caption' }, children: [] },
      { type: 'text', props: { content: 'Total: {{order.total}}', variant: 'caption' }, children: [] },
      { type: 'button', props: { label: 'Track Order', variant: 'filled', color: '#059669' }, children: [] },
    ],
  },
  'Announcement': {
    type: 'container',
    props: { label: 'Announcement' },
    children: [
      { type: 'text', props: { content: 'Announcement Title', variant: 'title', weight: 'semibold' }, children: [] },
      { type: 'text', props: { content: 'This is an announcement message. Share important updates with your users.', variant: 'body' }, children: [] },
      { type: 'button', props: { label: 'Learn More', variant: 'link' }, children: [] },
    ],
  },
  'Event Card': {
    type: 'container',
    props: { label: 'Event Card' },
    children: [
      { type: 'image', props: { src: '', alt: 'Event banner', fit: 'cover' }, children: [] },
      { type: 'text', props: { content: 'Event Title', variant: 'title', weight: 'semibold' }, children: [] },
      { type: 'text', props: { content: '📅 May 15, 2026 · 📍 San Francisco', variant: 'caption' }, children: [] },
      { type: 'button', props: { label: 'RSVP', variant: 'filled', color: '#E11D48' }, children: [] },
    ],
  },
  'Carousel': {
    type: 'row',
    props: { label: 'Carousel', scrollable: true, gap: 8 },
    children: [
      { type: 'container', props: { label: 'Slide 1', width: 180 }, children: [
        { type: 'image', props: { src: '', alt: 'Slide 1' }, children: [] },
        { type: 'text', props: { content: 'Card 1', variant: 'body', weight: 'semibold' }, children: [] },
        { type: 'button', props: { label: 'Action', variant: 'filled' }, children: [] },
      ]},
      { type: 'container', props: { label: 'Slide 2', width: 180 }, children: [
        { type: 'image', props: { src: '', alt: 'Slide 2' }, children: [] },
        { type: 'text', props: { content: 'Card 2', variant: 'body', weight: 'semibold' }, children: [] },
        { type: 'button', props: { label: 'Action', variant: 'filled' }, children: [] },
      ]},
      { type: 'container', props: { label: 'Slide 3', width: 180 }, children: [
        { type: 'image', props: { src: '', alt: 'Slide 3' }, children: [] },
        { type: 'text', props: { content: 'Card 3', variant: 'body', weight: 'semibold' }, children: [] },
        { type: 'button', props: { label: 'Action', variant: 'filled' }, children: [] },
      ]},
    ],
  },
  'Quick Reply Buttons': {
    type: 'container',
    props: { label: 'Quick Reply' },
    children: [
      { type: 'text', props: { content: 'How can we help you today?', variant: 'body', weight: 'medium' }, children: [] },
      {
        type: 'row',
        props: { gap: 8, wrap: true },
        children: [
          { type: 'button', props: { label: 'Check order', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: 'Return item', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: 'Talk to agent', variant: 'outlined' }, children: [] },
        ],
      },
    ],
  },
  'Feedback': {
    type: 'container',
    props: { label: 'Feedback' },
    children: [
      { type: 'text', props: { content: 'How was your experience?', variant: 'body', weight: 'medium' }, children: [] },
      { type: 'text', props: { content: 'Your feedback helps us improve', variant: 'caption' }, children: [] },
      {
        type: 'row',
        props: { gap: 8, align: 'center' },
        children: [
          { type: 'button', props: { label: '😞', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: '😐', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: '🙂', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: '😊', variant: 'outlined' }, children: [] },
          { type: 'button', props: { label: '🤩', variant: 'outlined' }, children: [] },
        ],
      },
    ],
  },
  'Order Tracking': {
    type: 'container',
    props: { label: 'Order Tracking' },
    children: [
      { type: 'text', props: { content: 'Order Tracking', variant: 'title', weight: 'semibold' }, children: [] },
      { type: 'text', props: { content: '✓ Order Placed', variant: 'body', color: '#059669' }, children: [] },
      { type: 'text', props: { content: '✓ Processing', variant: 'body', color: '#059669' }, children: [] },
      { type: 'text', props: { content: '✓ Shipped', variant: 'body', color: '#059669' }, children: [] },
      { type: 'text', props: { content: '○ Delivered', variant: 'body' }, children: [] },
      { type: 'button', props: { label: 'View Details', variant: 'outlined' }, children: [] },
    ],
  },
  'Data Table': {
    type: 'table',
    props: {
      label: 'Data Table',
      headers: ['Item', 'Qty', 'Price'],
      rows: [
        ['Widget A', '2', '$24.00'],
        ['Widget B', '1', '$18.50'],
        ['Widget C', '3', '$9.99'],
      ],
    },
    children: [],
  },

  // ── Elements ──
  'Container': {
    type: 'container',
    props: { label: 'Container' },
    children: [
      { type: 'text', props: { content: 'Container content', variant: 'body' }, children: [] },
    ],
  },
  'Row': {
    type: 'row',
    props: { gap: 8, label: 'Row', wrap: true },
    children: [
      { type: 'button', props: { label: 'Item 1', variant: 'outlined' }, children: [] },
      { type: 'button', props: { label: 'Item 2', variant: 'outlined' }, children: [] },
    ],
  },
  'Column': {
    type: 'container',
    props: { label: 'Column' },
    children: [
      { type: 'text', props: { content: 'Column item 1', variant: 'body' }, children: [] },
      { type: 'text', props: { content: 'Column item 2', variant: 'body' }, children: [] },
    ],
  },
  'Tabs': {
    type: 'row',
    props: { gap: 0, label: 'Tabs' },
    children: [
      { type: 'button', props: { label: 'Tab 1', variant: 'filled' }, children: [] },
      { type: 'button', props: { label: 'Tab 2', variant: 'outlined' }, children: [] },
      { type: 'button', props: { label: 'Tab 3', variant: 'outlined' }, children: [] },
    ],
  },
  'Text': {
    type: 'text',
    props: { content: 'Text element', variant: 'body', weight: 'regular' },
    children: [],
  },
  'Image': {
    type: 'image',
    props: { src: '', alt: 'Image', fit: 'cover' },
    children: [],
  },
  'Icon': {
    type: 'text',
    props: { content: '⭐', variant: 'title', align: 'center' },
    children: [],
  },
  'Avatar': {
    type: 'image',
    props: { src: '', alt: 'Avatar', fit: 'cover', rounded: true },
    children: [],
  },
  'Badge': {
    type: 'text',
    props: { content: 'Badge', variant: 'caption', weight: 'semibold', color: '#7C3AED', badge: true },
    children: [],
  },
  'Divider': {
    type: 'divider',
    props: {},
    children: [],
  },
  'Spacer': {
    type: 'spacer',
    props: { height: 16 },
    children: [],
  },
  'Chip': {
    type: 'button',
    props: { label: 'Chip', variant: 'outlined' },
    children: [],
  },
  'Markdown': {
    type: 'text',
    props: { content: '**Bold** and *italic* text with [links]()', variant: 'body' },
    children: [],
  },
  'Code Block': {
    type: 'code',
    props: { content: 'const greeting = "Hello World";' },
    children: [],
  },
  'Table': {
    type: 'table',
    props: {
      label: 'Table',
      headers: ['Column 1', 'Column 2'],
      rows: [['Row 1', 'Value 1'], ['Row 2', 'Value 2']],
    },
    children: [],
  },
  'Progress Bar': {
    type: 'progress',
    props: { value: 65, label: 'Progress' },
    children: [],
  },
  'Button': {
    type: 'button',
    props: { label: 'Button', variant: 'filled' },
    children: [],
  },
  'Icon Button': {
    type: 'button',
    props: { label: '★', variant: 'outlined' },
    children: [],
  },
  'Link': {
    type: 'button',
    props: { label: 'Link text', variant: 'link' },
    children: [],
  },
};

// Recursively assign IDs to a template tree
function assignIds(node) {
  return {
    ...node,
    id: genId(),
    children: (node.children || []).map(assignIds),
  };
}

// Custom hook for builder state
export function useBuilderStore() {
  const [nodes, setNodes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addComponent = useCallback((templateName) => {
    const template = COMPONENT_TEMPLATES[templateName];
    if (!template) return;
    const newNode = assignIds(template);
    setNodes((prev) => [...prev, newNode]);
    setSelectedId(newNode.id);
  }, []);

  const removeNode = useCallback((id) => {
    const removeFromTree = (nodes) =>
      nodes.filter((n) => n.id !== id).map((n) => ({ ...n, children: removeFromTree(n.children || []) }));
    setNodes((prev) => removeFromTree(prev));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const moveNode = useCallback((activeId, overId) => {
    if (activeId === overId) return;
    setNodes((prev) => {
      const activeNode = findNodeInTree(prev, activeId);
      if (!activeNode) return prev;
      if (containsIdInTree(activeNode.children || [], overId)) return prev;

      let movedNode = null;
      const removeActive = (nodes) =>
        nodes.filter((n) => {
          if (n.id === activeId) { movedNode = n; return false; }
          return true;
        }).map((n) => ({ ...n, children: removeActive(n.children || []) }));

      const withoutActive = removeActive(prev);
      if (!movedNode) return prev;

      const overNode = findNodeInTree(withoutActive, overId);
      if (overNode && (overNode.type === 'container' || overNode.type === 'row')) {
        const insertInside = (nodes) =>
          nodes.map((n) => {
            if (n.id === overId) return { ...n, children: [...(n.children || []), movedNode] };
            return { ...n, children: insertInside(n.children || []) };
          });
        return insertInside(withoutActive);
      }

      const insertNear = (nodes) => {
        const idx = nodes.findIndex((n) => n.id === overId);
        if (idx !== -1) {
          const newNodes = [...nodes];
          newNodes.splice(idx, 0, movedNode);
          return newNodes;
        }
        return nodes.map((n) => ({ ...n, children: insertNear(n.children || []) }));
      };
      return insertNear(withoutActive);
    });
  }, []);

  const moveUp = useCallback((id) => {
    const moveInArray = (nodes) => {
      const idx = nodes.findIndex((n) => n.id === id);
      if (idx > 0) {
        const newNodes = [...nodes];
        [newNodes[idx - 1], newNodes[idx]] = [newNodes[idx], newNodes[idx - 1]];
        return newNodes;
      }
      return nodes.map((n) => ({ ...n, children: moveInArray(n.children || []) }));
    };
    setNodes((prev) => moveInArray(prev));
  }, []);

  const moveDown = useCallback((id) => {
    const moveInArray = (nodes) => {
      const idx = nodes.findIndex((n) => n.id === id);
      if (idx !== -1 && idx < nodes.length - 1) {
        const newNodes = [...nodes];
        [newNodes[idx], newNodes[idx + 1]] = [newNodes[idx + 1], newNodes[idx]];
        return newNodes;
      }
      return nodes.map((n) => ({ ...n, children: moveInArray(n.children || []) }));
    };
    setNodes((prev) => moveInArray(prev));
  }, []);

  const duplicateNode = useCallback((id) => {
    const dupInArray = (nodes) => {
      const idx = nodes.findIndex((n) => n.id === id);
      if (idx !== -1) {
        const clone = assignIds(structuredClone(nodes[idx]));
        const newNodes = [...nodes];
        newNodes.splice(idx + 1, 0, clone);
        return newNodes;
      }
      return nodes.map((n) => ({ ...n, children: dupInArray(n.children || []) }));
    };
    setNodes((prev) => dupInArray(prev));
  }, []);

  const addInside = useCallback((parentId, templateName) => {
    const template = COMPONENT_TEMPLATES[templateName];
    if (!template) {
      const newNode = assignIds({ type: 'text', props: { content: 'New text', variant: 'body' }, children: [] });
      const insertInto = (nodes) =>
        nodes.map((n) => {
          if (n.id === parentId) return { ...n, children: [...(n.children || []), newNode] };
          return { ...n, children: insertInto(n.children || []) };
        });
      setNodes((prev) => insertInto(prev));
      setSelectedId(newNode.id);
      return;
    }
    const newNode = assignIds(template);
    const insertInto = (nodes) =>
      nodes.map((n) => {
        if (n.id === parentId) return { ...n, children: [...(n.children || []), newNode] };
        return { ...n, children: insertInto(n.children || []) };
      });
    setNodes((prev) => insertInto(prev));
    setSelectedId(newNode.id);
  }, []);

  const findNode = useCallback((id) => findNodeInTree(nodes, id), [nodes]);

  const updateNode = useCallback((id, newProps) => {
    const updateInTree = (nodes) =>
      nodes.map((n) => {
        if (n.id === id) return { ...n, props: { ...n.props, ...newProps } };
        return { ...n, children: updateInTree(n.children || []) };
      });
    setNodes((prev) => updateInTree(prev));
  }, []);

  return { nodes, selectedId, setSelectedId, addComponent, removeNode, moveNode, moveUp, moveDown, duplicateNode, addInside, updateNode, findNode };
}
