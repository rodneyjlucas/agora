#!/usr/bin/env bash
# Download a library of public-domain Stoic texts from Project Gutenberg.
# Works by: Marcus Aurelius, Epictetus, Seneca the Younger.
#
# Usage:
#   chmod +x download_stoics.sh
#   ./download_stoics.sh
#
# Files land in author subfolders next to this script.

set -euo pipefail

cd "$(dirname "$0")"

UA="Mozilla/5.0 (compatible; stoic-library-downloader/1.0)"

fetch() {
  local url="$1"
  local out="$2"
  mkdir -p "$(dirname "$out")"
  if [[ -s "$out" ]]; then
    echo "  skip (already exists): $out"
    return
  fi
  echo "  -> $out"
  curl -fsSL -A "$UA" -o "$out" "$url" || {
    echo "     FAILED: $url" >&2
    rm -f "$out"
  }
}

echo "Marcus Aurelius — Meditations"
fetch "https://www.gutenberg.org/cache/epub/2680/pg2680.txt" \
      "Marcus Aurelius - Meditations/Meditations - George Long translation.txt"
fetch "https://www.gutenberg.org/cache/epub/15877/pg15877.txt" \
      "Marcus Aurelius - Meditations/Meditations - Meric Casaubon translation.txt"
fetch "https://www.gutenberg.org/cache/epub/55317/pg55317.txt" \
      "Marcus Aurelius - Meditations/Meditations - Jeremy Collier translation.txt"

echo ""
echo "Epictetus"
fetch "https://www.gutenberg.org/cache/epub/10661/pg10661.txt" \
      "Epictetus/Discourses and Enchiridion - George Long translation.txt"
fetch "https://www.gutenberg.org/cache/epub/45109/pg45109.txt" \
      "Epictetus/Moral Discourses and Enchiridion - Elizabeth Carter translation.txt"
fetch "https://www.gutenberg.org/cache/epub/871/pg871.txt" \
      "Epictetus/The Golden Sayings of Epictetus - Hastings Crossley translation.txt"

echo ""
echo "Seneca the Younger"
fetch "https://www.gutenberg.org/cache/epub/56075/pg56075.txt" \
      "Seneca/Moral Letters to Lucilius - Volume 1 - Gummere translation.txt"
fetch "https://www.gutenberg.org/cache/epub/56242/pg56242.txt" \
      "Seneca/Moral Letters to Lucilius - Volume 2 - Gummere translation.txt"
fetch "https://www.gutenberg.org/cache/epub/56243/pg56243.txt" \
      "Seneca/Moral Letters to Lucilius - Volume 3 - Gummere translation.txt"
fetch "https://www.gutenberg.org/cache/epub/45250/pg45250.txt" \
      "Seneca/Minor Dialogues - Aubrey Stewart translation.txt"
fetch "https://www.gutenberg.org/cache/epub/3794/pg3794.txt" \
      "Seneca/On Benefits - Aubrey Stewart translation.txt"

echo ""
echo "Done. Verifying sizes:"
find . -type f -name "*.txt" -not -name "README*" -exec du -h {} \; | sort
