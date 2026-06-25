# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature du dépôt

Kit de stand pour une démo Claude Code à l'IGN (sujet : Claude Code au quotidien sur
cartes.gouv.fr). Le livrable principal est le deck Slidev dans `slides/`.

```
slides/  Deck Slidev (DSFR), déployé sur GitHub Pages
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

## Conventions transversales

- **Style d'écriture :** pas de tiret cadratin (em-dash « - » ou « : » à la place).
