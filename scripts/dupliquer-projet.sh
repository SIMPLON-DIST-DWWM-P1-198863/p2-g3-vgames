#!/usr/bin/env bash
# =============================================================================
# Duplique le projet Ludothèque (tableau + issues) vers un autre dépôt.
# Le dépôt d'origine et son tableau ne sont PAS modifiés.
#
# Prérequis :
#   - GitHub CLI installé :      gh --version
#   - Connecté avec le droit "project" :   gh auth refresh -s project
#   - Le dépôt de destination existe déjà sur GitHub (même vide)
#
# Lancement (Git Bash) :   bash dupliquer-projet.sh
# =============================================================================

set -euo pipefail

# ------------------------------- À REMPLIR ----------------------------------
SRC_OWNER="Xodia-stack"                     # Propriétaire du dépôt et du project d'origine
SRC_REPO="Ludotheque"                       # Dépôt d'origine
DST_OWNER="SIMPLON-DIST-DWWM-P1-198863"     # Propriétaire du nouveau dépôt (l'organisation)
DST_REPO="p2-g3-vgames"                     # Dépôt de destination
OLD_PROJECT=1                               # Numéro du project : dans l'URL .../projects/<numéro>
NEW_TITLE="p2-g3-vgames project"            # Nom du nouveau tableau
# ----------------------------------------------------------------------------

SRC="$SRC_OWNER/$SRC_REPO"
DST="$DST_OWNER/$DST_REPO"
TMP_BODY="$(mktemp)"
trap 'rm -f "$TMP_BODY"' EXIT

declare -A NEW_NUM   # numéro d'issue d'origine -> numéro dans le nouveau dépôt

echo "▶ Vérifications…"
gh repo view "$SRC" >/dev/null
gh repo view "$DST" >/dev/null
gh project view "$OLD_PROJECT" --owner "$SRC_OWNER" >/dev/null

# --- 1. Copie du tableau -----------------------------------------------------
echo "▶ Copie du tableau…"
NEW_PROJECT=$(gh project copy "$OLD_PROJECT" \
  --source-owner "$SRC_OWNER" --target-owner "$DST_OWNER" \
  --title "$NEW_TITLE" --format json --jq '.number')
gh project link "$NEW_PROJECT" --owner "$DST_OWNER" --repo "$DST"
NEW_PROJECT_ID=$(gh project view "$NEW_PROJECT" --owner "$DST_OWNER" --format json --jq '.id')
STATUS_FIELD_ID=$(gh project field-list "$NEW_PROJECT" --owner "$DST_OWNER" --format json \
  --jq '.fields[] | select(.name=="Status") | .id')
echo "  Nouveau tableau n°$NEW_PROJECT créé et lié à $DST"

# --- 2. Copie des labels -----------------------------------------------------
echo "▶ Copie des labels…"
gh label clone "$SRC" --repo "$DST" --force

# --- 3. Recréation des issues ------------------------------------------------
echo "▶ Recréation des issues…"
NUMBERS=$(gh issue list --repo "$SRC" --state all --limit 1000 \
  --json number --jq 'sort_by(.number) | .[].number')

for n in $NUMBERS; do
  title=$(gh issue view "$n" --repo "$SRC" --json title --jq '.title')
  gh issue view "$n" --repo "$SRC" --json body --jq '.body' > "$TMP_BODY"
  labels=$(gh issue view "$n" --repo "$SRC" --json labels --jq '[.labels[].name] | join(",")')
  state=$(gh issue view "$n" --repo "$SRC" --json state --jq '.state')

  args=(--repo "$DST" --title "$title" --body-file "$TMP_BODY")
  [[ -n "$labels" ]] && args+=(--label "$labels")

  url=$(gh issue create "${args[@]}")
  new="${url##*/}"
  NEW_NUM[$n]=$new

  [[ "$state" == "CLOSED" ]] && gh issue close "$new" --repo "$DST" >/dev/null

  # Ajout au nouveau tableau, dans la même colonne que l'original
  item_id=$(gh project item-add "$NEW_PROJECT" --owner "$DST_OWNER" --url "$url" --format json --jq '.id')
  status=$(gh project item-list "$OLD_PROJECT" --owner "$SRC_OWNER" --limit 1000 --format json \
    --jq ".items[] | select(.content.number==$n) | .status // empty" | head -n1)
  if [[ -n "$status" ]]; then
    option_id=$(gh project field-list "$NEW_PROJECT" --owner "$DST_OWNER" --format json \
      --jq ".fields[] | select(.name==\"Status\") | .options[] | select(.name==\"$status\") | .id")
    if [[ -n "$option_id" ]]; then
      gh project item-edit --id "$item_id" --project-id "$NEW_PROJECT_ID" \
        --field-id "$STATUS_FIELD_ID" --single-select-option-id "$option_id" >/dev/null
    fi
  fi

  echo "  #$n → #$new  [$status]  $title"
  sleep 1   # évite la limite de requêtes de GitHub
done

# --- 4. Reconstruction des sous-tâches --------------------------------------
echo "▶ Reconstruction des sous-tâches…"
for n in $NUMBERS; do
  children=$(gh api "repos/$SRC/issues/$n/sub_issues" --jq '.[].number' 2>/dev/null || true)
  for child in $children; do
    new_parent=${NEW_NUM[$n]:-}
    new_child=${NEW_NUM[$child]:-}
    [[ -z "$new_parent" || -z "$new_child" ]] && continue
    child_id=$(gh api "repos/$DST/issues/$new_child" --jq '.id')
    gh api -X POST "repos/$DST/issues/$new_parent/sub_issues" -F sub_issue_id="$child_id" >/dev/null
    echo "  #$new_child rattachée à #$new_parent"
  done
done

echo "✔ Terminé : ${#NEW_NUM[@]} issues copiées dans $DST, tableau « $NEW_TITLE » (n°$NEW_PROJECT)."
