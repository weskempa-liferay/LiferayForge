# Overview

This is a D&D-themed component library and Liferay fragment reference application built with React. The project serves as a showcase and documentation tool for reusable UI components designed with a fantasy/medieval aesthetic, featuring dark browns, gold accents, and ornate styling. The application displays both standalone React components and Liferay fragment collections that can be used in Liferay portal development.

## Recent Updates (November 16, 2025)

### New Fragment: Inventory Item 🎒
- **New Component Fragment**: Added "Inventory Item" fragment for modular inventory composition
  - Displays individual inventory items with icon, name, quantity, and type
  - Can be dropped into Equipment Inventory drop zones
  - Supports item types: weapon, armor, consumable, tool, misc
  - Total fragments now: **13**

### Equipment Inventory Enhancement 📦
- **Added Liferay Drop Zones**: Equipment Inventory now supports dynamic composition
  - Users can drop "Inventory Item" fragments into designated zones
  - Enables flexible, customizable inventory layouts
  - Two drop zones: player-inventory and inventory-grid

### Code Quality Improvements 🧹
- **Character Journal**: Removed duplicate function definitions
  - Removed duplicate `setupSessionDetailsHandlers` function
  - Removed duplicate `setupRelationshipDetailsHandlers` function
  - Reduced file size by ~6KB (71,694 → 68,778 bytes)
  - Cleaner codebase with no conflicting function definitions

## Previous Updates (November 14, 2025)

### Critical Performance Fixes 🚨

**DM Chat Storage Quota Management**
- **Storage Quota Error Resolved**: Fixed `QuotaExceededError` when saving chat histories
  - **Problem**: Browser localStorage has 5-10MB limit, DM responses can be lengthy
  - **Smart Pruning**: Automatically keeps most recent 50 messages when quota exceeded
  - **Fallback Strategy**: Progressive limits (50 → 20 → clear) if still over quota
  - **Multi-character Cleanup**: Removes other characters' old data to free space
  - **Graceful Degradation**: Never loses current conversation, always saves successfully

**DM Chat Memory Leak Resolved**
- Fixed browser freeze/hang with multiple characters
  - **Root Cause**: History replay was re-saving messages to localStorage exponentially
  - **Impact**: Each page load doubled the chat history, causing massive JSON blobs in localStorage
  - **Fix**: Separated rendering from persistence - replaying history no longer mutates storage
  - **Auto-cleanup**: Added deduplication logic to clean corrupted histories on load
  - **Polling intervals**: Now properly cleared when switching characters to prevent orphaned timers
  - **Result**: Browser performance restored, supports unlimited characters and chat history

### Previous Critical Bug Fixes (November 13, 2025) 🐛
- **Character Header Fragment**: Fixed broken Liferay fragment initialization
  - Restored proper IIFE pattern matching other fragments
  - Fixed undefined `fragmentElement` error that prevented fragment from loading
  - Added null guard to prevent errors when header element not found
- **Cleric Image Mapping**: Corrected backwards class mapping
  - Removed incorrect `cleric → claric` mapping (file is now correctly named `dwarf-cleric-male.png`)
  - Cleric character portraits now load properly
- **Race Alias Support**: Added "high elf" → "elf" mapping for both character-card and character-header
- **DM Chat Avatar Positioning**: Fine-tuned avatar icon vertical alignment (top: 2px)

### Demo Polish & Improvements 🎨
- **Quest Navigation**: Simplified UI for cleaner demo presentation
  - Removed hardcoded quest badge (avoids showing static numbers)
  - Fixed pagination text color (white for better visibility on dark backgrounds)
  - Cleaned up HTML formatting
- **Equipment Inventory**: Streamlined layout
  - Commented out "Currently Equipped" section (focusing on inventory grid)
  - Added Liferay drop zones for dynamic content integration
- **Demo Notes**: Created `Demo Notes.md` with example prompts for public demonstrations
  - Character creation examples
  - Dice rolling demonstrations
  - DM interaction scenarios

### Expanded Character Portrait Library 🖼️
- **New Portraits Added** (4 images):
  - `dwarf-cleric-female.png`
  - `elf-bard-female.png`
  - `halfling-wizard-female.png`
  - `halfling-wizard-male.png`
- **Total Portrait Library**: 20 character images
  - Dwarf: Cleric (M/F), Fighter (M/F)
  - Elf: Bard (M/F), Druid (M/F), Rogue (M/F), Wizard (M/F)
  - Halfling: Rogue (M/F), Wizard (M/F)
  - Human: Fighter (M), Wizard (M)

### New Admin Fragment 🔧
- **Admin Data Cleaner**: Testing utility fragment for clearing test data
  - One-click batch deletion of all Liferay Objects data
  - Processes collections in order: Quests → Inventory Items → Player Actions → Characters
  - Real-time status indicators and progress tracking
  - Double confirmation prompts to prevent accidental deletion
  - Uses Liferay.Util.fetch with automatic CSRF token handling
  - Designed for admin/testing pages only

## Previous Updates (October 31, 2025)

### DM Chat - Persistent Conversation System ⭐
- **Character-based Chat History**: Each character maintains separate conversation history
- **Browser Storage Persistence**: Chat logs stored in localStorage and persist across page refreshes
- **Auto-restore**: Switching characters automatically loads their chat history
- **Character Selection Memory**: Last selected character remembered across sessions
- **Fixed OData Filter**: Corrected user filter query syntax for proper character loading
- **Rich Text Formatting**: DM responses support markdown-style formatting
  - `**text**` syntax renders as **bold text**
  - `\n` line breaks convert to HTML line breaks for multi-line responses
  - Security-first: HTML escaping prevents XSS, then formatting applied
  - Only DM messages support formatting (user messages remain plain text for safety)

### Visual Improvements
- **Friendlier Player Avatar**: Changed from crossed swords (⚔️) on red to theater masks (🎭) on teal/blue-green
- **Color Psychology**: Teal background conveys creativity and roleplay vs. red combat intensity
- **Context-appropriate**: Better suited for non-combat DM consultations

### Dynamic Character Portrait Loading
- **Character Card & Character Header** fragments now automatically load character portraits based on character attributes
- Images are dynamically selected using the pattern: `{race}-{class}-{sex}.png`
- Supports class aliases (mage→wizard, warrior→fighter, etc.) and race aliases (half-elf→elf)
- Portrait images stored in `resources/` folder and served via Liferay Documents & Media

### Character Portrait Library
15 character portrait images added to support various race/class/gender combinations:
- Dwarf: Cleric (M), Fighter (M)
- Elf: Bard (M), Druid (M/F), Rogue (M/F), Wizard (M/F)
- Halfling: Rogue (M/F)
- Human: Fighter (M), Wizard (M)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18+ with vanilla JavaScript (no build system)
- **Styling**: Styled Components for CSS-in-JS with a comprehensive theming system
- **Loading Strategy**: Dynamic script loading using Babel standalone for in-browser JSX compilation
- **Component Organization**: Modular structure with components organized by type (Layout, Cards, Forms, etc.)

## Design System
- **Theme Provider**: Centralized theme configuration with color palette, typography, spacing, and breakpoints
- **Visual Design**: Fantasy/D&D aesthetic with dark color scheme (browns, golds, reds)
- **Typography**: Custom font stack using Google Fonts (Cinzel for headings, Crimson Text for body)
- **Component Variants**: Support for different sizes and states across components

## Application Structure
- **Two Main Views**: Component Library showcase and Fragment Collections reference
- **Tab Navigation**: Sticky navigation system for switching between different component categories
- **Responsive Design**: Mobile-first approach with consistent breakpoint system
- **Component Categories**: 
  - Layout components (Header, Footer, Navigation)
  - Interactive elements (Buttons, Forms)
  - Content display (Cards, Media galleries)
  - Liferay-specific fragments

## Fragment System
- **Three Fragment Types**: Basic, Content Display, and Navigation fragments
- **Documentation Format**: Each fragment includes description, preview, and code examples
- **Liferay Integration**: Designed for easy integration into Liferay portal environments

# External Dependencies

## CDN Dependencies
- **React & ReactDOM**: Version 18+ loaded from unpkg CDN
- **Styled Components**: Version 5.3.11 for styling
- **Babel Standalone**: For in-browser JSX compilation
- **Google Fonts**: Cinzel and Crimson Text font families
- **Font Awesome**: Version 6.4.0 for iconography

## Development Dependencies
- **Webpack**: Module bundler with dev server capability
- **Babel**: Core compilation with React preset
- **CSS/Style Loaders**: For handling CSS imports in webpack build
- **HTML Webpack Plugin**: For generating HTML files

Note: The application currently runs entirely in the browser using CDN dependencies, but includes webpack configuration for potential build optimization.