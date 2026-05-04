# Bubble Builder

A visual template builder UI for designing rich messaging cards, notifications, and interactive components.

**Live Demo** → [pradeep-cometchat.github.io/BUBBLE-BUILDER](https://pradeep-cometchat.github.io/BUBBLE-BUILDER/)

## Overview

Bubble Builder is a drag-and-drop style interface for composing message templates. It features a three-panel layout with a component library on the left, a live phone preview in the center, and a property editor on the right.

## Features

- **Component Library** — Pre-built cards (Product, Order Confirmation, Announcement, Event, Carousel), quick actions, timelines, and tables
- **Element Palette** — Layout primitives (Container, Row, Column, Tabs) and content elements (Text, Image, Icon, Avatar, Badge, Divider, and more)
- **Live Phone Preview** — Chat, iOS lock screen, and Android preview modes with responsive scaling
- **Property Editor** — Full control over layout, spacing, style, background colors, border radius, and more
- **Image Upload** — Upload and preview images directly in the element properties with an expand/lightbox view
- **Search** — Filter components and elements by name or description
- **Collapsible Sidebar** — Dashboard navigation that collapses to icon-only mode
- **Empty State** — Guided empty state in the phone preview prompting users to add elements

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling
- **Google Material Symbols Outlined** — Icon system
- **Satoshi Variable** — Typography

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173/`.

## Project Structure

```
├── index.html              # Entry HTML with font imports
├── vite.config.js          # Vite config with GitHub Pages base path
├── tailwind.config.js      # Tailwind config with Satoshi font
├── postcss.config.js       # PostCSS config
├── package.json
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Tailwind directives and global styles
    └── App.jsx             # Full application component
```

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`. The workflow is defined in `.github/workflows/deploy.yml`.

## License

MIT
