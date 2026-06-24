# Cheat-sheet : Mon setup Claude Code

## MCPs actifs

| MCP | Usage quotidien |
|-----|----------------|
| Figma | `get_design_context`, `get_screenshot`, Code Connect |
| Playwright | `browser_navigate`, `browser_take_screenshot`, `browser_evaluate` |
| Serena | Navigation sémantique du codebase |
| symfony-mcp | Routes Symfony (scopé à cartes.gouv.fr) |
| Headroom | Compression du contexte / résumés |

## Skills perso

| Skill | Déclenché quand |
|-------|----------------|
| `react-dsfr` | Tout composant DSFR à créer/modifier |
| `rgaa` | Revue d'accessibilité |
| `securite-anssi` | Revue de sécurité, inputs utilisateur |
| `commit-message-staged-oneline` | `/commit-message-staged-oneline` |

## Plugins installés (16)

figma · playwright · serena · context7 · superpowers · feature-dev
pr-review-toolkit · commit-commands · typescript-lsp · php-lsp
claude-md-management · security-guidance · code-simplifier
claude-code-setup · karpathy-skills · headroom

## Commandes RTK directes

```bash
rtk gain              # Stats cumulées (tokens économisés)
rtk gain --history    # Historique par commande
rtk discover          # Commandes non-proxifiées dans l'historique Claude
rtk proxy <cmd>       # Exécuter sans filtrage (debug)
```

## Slash commands clés

```
/figma-use            # Avant tout appel use_figma (obligatoire)
/react-dsfr           # Charger le skill DSFR
/commit               # Commit avec message généré
/commit-message-staged-oneline
/clear                # Nouveau contexte
/model                # Changer de modèle
/fast                 # Toggle mode rapide (Opus + fast output)
```

## Workflow type : Figma -> composant

1. Ouvrir Claude Code dans le projet (`claude` dans le terminal)
2. Coller l'URL du noeud Figma dans le prompt
3. Claude appelle `get_design_context` + charge le skill `react-dsfr`
4. Relire le plan -> approuver -> code généré
5. Playwright vérifie le rendu -> itération si besoin
6. `/commit-message-staged-oneline` + push

## Chiffres RTK (session courante)

- Commandes totales : 3 004
- Tokens économisés : **9 012 543 (85,4 %)**
- Meilleure commande : `rtk lint eslint` (98,7 % d'économie)
- Top usage : `rtk grep` (478 appels)
