#!/usr/bin/env bash
# Migrate Oceanic's binary assets off Weebly into /public.
# Source of truth for URLs: reference/content/oceanic-content-reference.md (asset manifest).
# Records HTTP status + bytes per file; a non-200 leaves no partial file behind.
set -u

BASE="http://www.oceanicprojectconsultants.com/uploads/1/3/2/8/132812941"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/public/projects" "$ROOT/public/certificates"

# name|destdir  (dest filename = source filename, lowercased already)
ASSETS=(
  # --- 12 gallery collages -> public/projects ---
  "ca-collage_orig.jpg|projects"
  "rsv-projectfinalfinal_orig.jpg|projects"
  "atlas-project-1_orig.jpg|projects"
  "unipon-collage_orig.jpg|projects"
  "jj-project-1_orig.jpg|projects"
  "projectmedella_orig.jpg|projects"
  "purulia-project-3_orig.jpg|projects"
  "gg-project_orig.jpg|projects"
  "fern-project-1_orig.jpg|projects"
  "sparsh-project_orig.jpg|projects"
  "mercury-project_orig.jpg|projects"
  "eastend-project_orig.jpg|projects"
  # --- 5 certificate PDFs -> public/certificates ---
  "columbiaasiacertificate.pdf|certificates"
  "rsvcertificate.pdf|certificates"
  "atlascertificate.pdf|certificates"
  "uniponcertificate.pdf|certificates"
  "sparshcertificate.pdf|certificates"
  # --- 5 certificate thumbnail images -> public/certificates ---
  "casia-project_orig.jpg|certificates"
  "rsv-s_orig.jpg|certificates"
  "atlas_orig.jpg|certificates"
  "unipon_orig.jpg|certificates"
  "sparsh-diagnostica_orig.jpg|certificates"
)

printf '%-6s %-10s %-22s %s\n' "CODE" "BYTES" "TYPE" "DEST"
printf '%s\n' "-------------------------------------------------------------------------------"
ok=0; fail=0
for entry in "${ASSETS[@]}"; do
  name="${entry%%|*}"; sub="${entry##*|}"
  dest="$ROOT/public/$sub/$name"
  out=$(curl -sS -L --max-time 120 -w '%{http_code} %{size_download}' -o "$dest" "$BASE/$name" 2>/dev/null)
  code="${out%% *}"; size="${out##* }"
  if [ "$code" = "200" ] && [ "${size:-0}" -gt 0 ]; then
    type=$(file -b --mime-type "$dest" 2>/dev/null || echo "?")
    printf '%-6s %-10s %-22s %s\n' "$code" "$size" "$type" "public/$sub/$name"
    ok=$((ok+1))
  else
    rm -f "$dest"
    printf '%-6s %-10s %-22s %s\n' "${code:-ERR}" "${size:-0}" "MISSING" "public/$sub/$name  TODO(asset)"
    fail=$((fail+1))
  fi
done
printf '%s\n' "-------------------------------------------------------------------------------"
echo "OK=$ok  FAIL=$fail  TOTAL=${#ASSETS[@]}"
