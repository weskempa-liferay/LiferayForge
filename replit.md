# Overview

This is a D&D-themed component library and Liferay fragment reference application built with React. The project serves as a showcase and documentation tool for reusable UI components designed with a fantasy/medieval aesthetic, featuring dark browns, gold accents, and ornate styling. The application displays both standalone React components and Liferay fragment collections that can be used in Liferay portal development.

## Recent Updates (October 31, 2025)

### DM Chat - Persistent Conversation System ⭐
- **Character-based Chat History**: Each character maintains separate conversation history
- **Browser Storage Persistence**: Chat logs stored in localStorage and persist across page refreshes
- **Auto-restore**: Switching characters automatically loads their chat history
- **Character Selection Memory**: Last selected character remembered across sessions
- **Fixed OData Filter**: Corrected user filter query syntax for proper character loading

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