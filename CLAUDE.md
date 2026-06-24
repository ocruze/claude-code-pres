# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature du dépôt

Kit de stand pour une démo Claude Code à l'IGN (sujet : Claude Code au quotidien sur
cartes.gouv.fr). Pas de `package.json` racine : ce sont trois parties indépendantes, à installer
et lancer chacune dans son sous-dossier.

```
slides/          Deck Slidev (DSFR), déployé sur GitHub Pages
demo-app/        Sandbox Vite + React 19 + react-dsfr
recording-plan/  Scripts de tournage (markdown)
```

## slides/

Deck de présentation en [Slidev](https://sli.dev/). Le CSS DSFR (`dsfr.min.css`) et la police
Marianne sont chargés via `slides/style.css`.

```bash
cd slides
npm install
npm run dev      # Slidev en mode dev (hot reload)
npm run build    # Build statique dans slides/dist/
npm run demo     # Plein écran, avance automatiquement toutes les 10 s (mode stand)
```

**Déploiement GitHub Pages :** `.github/workflows/deploy.yml` déploie uniquement `slides/dist/`
sur push sur `main`, avec la base `/claude-code-pres/`.

**Contrainte Slidev + Vue :** ne jamais mettre un bloc de code clôturé (`` ``` ``) à l'intérieur
d'un `<div>` HTML. Les lignes vides requises autour du bloc ferment le bloc HTML, ce qui casse la
compilation Vue. Placer les blocs de code au top-level d'une slide ou dans une colonne
`layout: two-cols`.

Le deck ne charge que le CSS DSFR : éviter les composants DSFR qui dépendent du JS (accordéon,
modale, etc.).

## demo-app/

Sandbox Vite + React 19 pour implémenter des rendus DSFR à partir de designs Figma.

```bash
cd demo-app
npm install      # REQUIS : le postinstall copie les assets DSFR dans public/dsfr
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint (pas ESLint, pas Prettier)
npm run preview  # Prévisualiser le build statique
```

Voir `demo-app/CLAUDE.md` pour les conventions de code (imports react-dsfr, fr.cx, tss-react,
style d'écriture FR).

**Aucun test configuré.**

## Conventions transversales

- **Linter :** oxlint uniquement (`demo-app/.oxlintrc.json`). Pas d'ESLint, pas de Prettier.
- **DSFR :** imports par sous-chemin de composant (`@codegouvfr/react-dsfr/Button`), `fr.cx()` pour
  les classes utilitaires, `tss-react` seulement pour du CSS scopé sans équivalent DSFR. CSS DSFR
  chargé statiquement dans `index.html`, pas via plugin Vite.
- **Style d'écriture :** pas de tiret cadratin (em-dash « - » ou « : » à la place).
