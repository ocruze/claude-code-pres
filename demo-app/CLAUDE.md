# CLAUDE.md

Ce fichier fournit les conventions de développement à Claude Code pour ce projet de démo.

## Stack

React 18 · TypeScript · Vite · @codegouvfr/react-dsfr · tss-react · react-hook-form + yup

## Règles de style

### Imports de composants DSFR
Toujours importer par sous-chemin, jamais de barrel import :
```tsx
// ✅ Correct
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";

// ❌ Interdit
import { Button, Input } from "@codegouvfr/react-dsfr";
```

### Styling : DSFR d'abord, tss-react pour le reste
```tsx
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react/dsfr";

// Classes utilitaires DSFR en priorité
<div className={fr.cx("fr-container", "fr-py-4w")}>

// CSS scopé uniquement si pas de classe DSFR disponible
const useStyles = tss.create({
    custom: { borderRadius: "8px" }
});
```

### Composants
- Fonctions (pas de classes), export `default` par fichier.
- Props typées avec `interface`.
- Commentaires en **français**.
- Apostrophes typographiques `'` (U+2019), jamais `'`.
- Égalité stricte `===` uniquement.
- Pas de `console.log` dans les commits.

### Formulaires
react-hook-form + yup pour tout formulaire avec validation.

## Ce projet est une sandbox de démo

L'objectif est de réimplémenter des designs Figma fournis via l'URL du nœud.
Pas de routing complexe, pas de backend. Un seul composant par démo.
