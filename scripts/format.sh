#!/bin/bash

echo "=== Biome Formatter ==="
echo "Processing files in src/ and questions/..."
echo ""

# List files being processed
find src questions -type f \( -name "*.js" -o -name "*.json" \) 2>/dev/null | sort | while read file; do
  echo "  → $file"
done

echo ""
biome format --write
