# Stand de démo : Claude Code au quotidien sur cartes.gouv.fr

Kit de stand pour une démonstration booth (~1 h) à l'IGN.

## Structure

| Dossier | Contenu |
|---------|---------|
| `slides/` | Deck Slidev en boucle (mode attract + Q&A) |

## Lancer le jour J

```bash
cd slides
npm install
npm run demo   # Slidev en plein écran, avance automatiquement toutes les 10 s
```

> Naviguer manuellement avec ←/→ lors des questions.

## Pré-requis

- Node ≥ 20
- Claude Code installé : `npm install -g @anthropic-ai/claude-code`

## Ressources

- react-dsfr : https://github.com/codegouvfr/react-dsfr
- DSFR officiel : https://www.systeme-de-design.gouv.fr/
- cartes.gouv.fr : https://github.com/IGNF/cartes.gouv.fr

## Deck en ligne

Le deck Slidev est déployé automatiquement sur GitHub Pages :
**https://ocruze.github.io/claude-code-pres/**

Le déploiement se déclenche à chaque push sur `main` via `.github/workflows/deploy.yml`.

> **Prérequis (une seule fois) :**
> 1. Rendre le dépôt public : `gh repo edit --visibility public`
> 2. Activer GitHub Pages source = GitHub Actions dans les Settings du dépôt
