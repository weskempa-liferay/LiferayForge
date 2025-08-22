#!/bin/bash

# Simple auto-build script for D&D Fragment Collection
# This script can be run manually or set up to run periodically

echo "🏰 D&D Fragment Collection Auto-Builder"
echo "========================================"

# Check if any fragment files have been modified
FRAGMENT_FILES=$(find fragments/ fragment-collection.json -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json")
LAST_BUILD=$(find . -maxdepth 1 -name "dnd-fragment-collection_*.zip" -printf "%T@\n" | sort -n | tail -1)

if [ -z "$LAST_BUILD" ]; then
    echo "No previous build found. Creating initial build..."
    ./build-fragment-collection.sh
    exit 0
fi

# Check if any fragment files are newer than the last build
NEWER_FILES=$(find $FRAGMENT_FILES -newer $(find . -maxdepth 1 -name "dnd-fragment-collection_*.zip" | head -1) 2>/dev/null)

if [ -n "$NEWER_FILES" ]; then
    echo "Fragment files have been updated. Rebuilding collection..."
    echo "Updated files:"
    echo "$NEWER_FILES"
    ./build-fragment-collection.sh
else
    echo "No changes detected since last build."
fi

echo "Auto-build complete! ✨"