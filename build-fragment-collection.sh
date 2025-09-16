#!/bin/bash

# D&D Fragment Collection Build Script
echo "Building D&D Fragment Collection..."

# Create timestamp for versioning
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
VERSION="v1.0.0_$TIMESTAMP"

# Create collection directory if it doesn't exist
mkdir -p dnd-fragment-collection

# Copy fragments and collection metadata
echo "Copying fragment files..."
cp -r fragments dnd-fragment-collection/

# Create version info file in root
cat > version.txt << EOF
D&D Fragment Collection
Version: $VERSION
Built: $(date)
Description: D&D-themed Liferay DXP fragment collection with fantasy aesthetic

Fragments included:
- Hero Banner (Section Fragment)
- Character Card (Component Fragment) 
- Quest Navigation (Component Fragment)

Each fragment includes:
- HTML template with editable elements
- CSS styling with D&D theming
- JavaScript for interactive features
- Configuration options for customization
EOF

# Create README for the collection in root
cat > README.md << EOF
# D&D Fragment Collection for Liferay DXP

A collection of D&D-themed fragments designed for Liferay DXP portals, featuring medieval fantasy aesthetics with dark color schemes, ornate styling, and interactive elements.

## Fragments Included

### 🏰 Hero Banner Fragment
- **Type**: Section Fragment
- **Purpose**: Epic landing page hero sections
- **Features**: Parallax effects, magical animations, call-to-action buttons
- **Editable**: Title, subtitle, buttons, background image

### ⚔️ Character Card Fragment  
- **Type**: Component Fragment
- **Purpose**: Character profile displays
- **Features**: Stats, abilities, hover animations, particle effects
- **Editable**: Portrait, name, class, stats, abilities, action button

### 🗺️ Quest Navigation Fragment
- **Type**: Component Fragment
- **Purpose**: Site navigation with fantasy theming
- **Features**: Mobile responsive, user profile, badge notifications
- **Editable**: Brand, navigation links, user profile, badges

## Installation

1. Import the fragment collection into your Liferay DXP instance
2. Navigate to Site Builder > Page Fragments
3. Import the collection ZIP file
4. Use the fragments in your page compositions

## Theming

All fragments use a consistent D&D fantasy theme:
- **Colors**: Dark browns, golds, deep reds
- **Typography**: Cinzel (headings), Crimson Text (body)
- **Effects**: Magical animations, ornate borders, glowing elements

## Configuration

Each fragment includes configuration options for:
- Theme variants and color schemes
- Interactive effects and animations
- Layout and sizing options
- Content display preferences
EOF

# Create the ZIP file
ZIP_NAME="dnd-fragment-collection_$VERSION.zip"
echo "Creating ZIP file: $ZIP_NAME"

# Remove old ZIP files
rm -f dnd-fragment-collection_*.zip

# Create new ZIP file
cd dnd-fragment-collection
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*.git*"
cd ..

echo "✓ Fragment collection built successfully!"
echo "✓ ZIP file created: $ZIP_NAME"
echo "✓ Collection ready for Liferay DXP import"

# List contents for verification
echo ""
echo "ZIP file contents:"
unzip -l "$ZIP_NAME"