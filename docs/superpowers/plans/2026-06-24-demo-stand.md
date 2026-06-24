# Stand de démo Claude Code Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete IGN/cartes.gouv.fr demo booth kit — looping Slidev deck, fresh Vite+react-dsfr sandbox, clip recording scripts, and printable stand materials — all in French, ready for a ~1h walk-up demo stand.

**Architecture:** Four independent deliverables under the repo root: `slides/` (Slidev), `demo-app/` (Vite+DSFR), `recording-plan/` (clip scripts), `stand/` (FAQ/handout). A top-level `README.md` ties them together with day-of instructions. All content is static (no build pipeline between deliverables).

**Tech Stack:** Slidev (Markdown presentation), Vite + TypeScript + @codegouvfr/react-dsfr + react-router-dom, plain Markdown for scripts/FAQ, HTML/CSS for handout.

## Global Constraints

- Tout le contenu (slides, scripts, FAQ, handout) est **en français**. Apostrophes typographiques `'` (U+2019), pas `'`.
- react-dsfr : imports **par composant** (`@codegouvfr/react-dsfr/Button`), jamais `import { Button } from "@codegouvfr/react-dsfr"` en masse.
- Styling dans demo-app : `fr.cx()` d'abord, `tss-react` (`tss.create`) pour le CSS scopé uniquement.
- Node ≥ 20 supposé disponible (`.nvmrc` non requis pour le stand kit).
- Pas de framework de test — les étapes de vérification se font via browser/CLI.

---

## File Structure

```
cartes.gouv.fr-claude/
├── README.md                            # Lancer le jour J
├── slides/
│   ├── package.json                     # slidev, scripts: dev/build/demo
│   └── slides.md                        # Deck complet FR, 8 slides, clips embarqués
├── demo-app/
│   ├── package.json                     # vite, react, @codegouvfr/react-dsfr, tss-react
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── index.html                       # Assets DSFR injectés
│   ├── CLAUDE.md                        # Conventions cartes.gouv.fr (mini)
│   └── src/
│       ├── main.tsx                     # startReactDsfr + Link
│       └── App.tsx                      # Page d'accueil minimale DSFR
├── recording-plan/
│   ├── 01-figma-to-dsfr.md             # Script clip héros (prompts exacts)
│   └── 02-rtk-token-savings.md         # Script clip RTK (asciinema)
└── stand/
    ├── faq.md                           # 7 questions + réponses < 30 s
    ├── cheat-sheet.md                   # Stack en un coup d'œil
    └── handout.html                     # One-pager imprimable, QR codes inline SVG
```

---

### Task 1: Top-level scaffold + README.md

**Files:**
- Create: `README.md`

**Interfaces:**
- Produces: rien (fichier de doc pure)

- [ ] **Step 1 : Créer le README.md**

```markdown
# Stand de démo — Claude Code au quotidien sur cartes.gouv.fr

Kit de stand pour une démonstration booth (~1 h) à l'IGN.

## Structure

| Dossier | Contenu |
|---------|---------|
| `slides/` | Deck Slidev en boucle (mode attract + Q&A) |
| `demo-app/` | Projet Vite + react-dsfr neuf (sandbox live) |
| `recording-plan/` | Scripts de tournage des clips |
| `stand/` | FAQ, cheat-sheet, handout imprimable |

## Lancer le jour J

### 1. Deck (écran principal du stand)
```bash
cd slides
npm install
npm run demo   # Slidev en plein écran, avance automatiquement toutes les 10 s
```
> Naviguer manuellement avec ←/→ lors des questions.

### 2. App démo (pour la démo live en option)
```bash
cd demo-app
npm install
npm run dev    # http://localhost:5173
```

### 3. Handout imprimable
Ouvrir `stand/handout.html` dans le navigateur → Imprimer → Enregistrer en PDF.

## Pré-requis
- Node ≥ 20
- Accès Figma avec le fichier source partagé (URL dans `recording-plan/01-figma-to-dsfr.md`)
- Claude Code installé : `npm install -g @anthropic-ai/claude-code`

## Ressources
- react-dsfr : https://github.com/codegouvfr/react-dsfr
- DSFR officiel : https://design.numerique.gouv.fr/
- cartes.gouv.fr : https://github.com/IGNF/cartes.gouv.fr
```

- [ ] **Step 2 : Vérifier**

```bash
cat README.md | head -5
# Attendu : # Stand de démo — Claude Code…
```

- [ ] **Step 3 : Commit**

```bash
git init
git add README.md
git commit -m "chore: init stand de démo"
```

---

### Task 2: demo-app — scaffold Vite + installation dépendances

**Files:**
- Create: `demo-app/package.json`, `demo-app/vite.config.ts`, `demo-app/tsconfig.json`, `demo-app/tsconfig.app.json`, `demo-app/tsconfig.node.json`

**Interfaces:**
- Produces: `demo-app/` installable avec `npm install && npm run dev`

- [ ] **Step 1 : Scaffolder le projet Vite**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude
npm create vite@latest demo-app -- --template react-ts
```

- [ ] **Step 2 : Installer les dépendances react-dsfr + tss-react**

```bash
cd demo-app
npm install @codegouvfr/react-dsfr react-router-dom
npm install tss-react @emotion/react
```

- [ ] **Step 3 : Ajouter les scripts postinstall/predev dans package.json**

Ouvrir `demo-app/package.json` et ajouter dans `"scripts"` :

```json
"postinstall": "cp -r node_modules/@codegouvfr/react-dsfr/dsfr public/dsfr",
"predev": "react-dsfr update-icons",
"prebuild": "react-dsfr update-icons"
```

- [ ] **Step 4 : Copier les assets DSFR**

```bash
cd demo-app
mkdir -p public
cp -r node_modules/@codegouvfr/react-dsfr/dsfr public/dsfr
```

- [ ] **Step 5 : Vérifier**

```bash
ls demo-app/public/dsfr/dsfr.min.css
# Attendu : le fichier existe
```

- [ ] **Step 6 : Commit**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude
git add demo-app/
git commit -m "feat(demo-app): scaffold Vite + @codegouvfr/react-dsfr"
```

---

### Task 3: demo-app — configuration DSFR (index.html + main.tsx + App.tsx)

**Files:**
- Modify: `demo-app/index.html`
- Modify: `demo-app/src/main.tsx`
- Modify: `demo-app/src/App.tsx`

**Interfaces:**
- Consumes: assets copiés dans `demo-app/public/dsfr/` (Task 2)
- Produces: app DSFR fonctionnelle sur `http://localhost:5173`

- [ ] **Step 1 : Modifier index.html**

Remplacer le contenu de `demo-app/index.html` par :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo stand — Claude Code + react-dsfr</title>
    <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
    <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
    <link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
    <link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2 : Modifier src/main.tsx**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import App from "./App";

startReactDsfr({ defaultColorScheme: "system", Link });

declare module "@codegouvfr/react-dsfr/spa" {
    interface RegisterLink {
        Link: typeof Link;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

- [ ] **Step 3 : Modifier src/App.tsx**

```tsx
import { fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

export default function App() {
    return (
        <>
            <Header
                brandTop={<>IGN<br />Géoplateforme</>}
                homeLinkProps={{ href: "/", title: "Accueil" }}
                serviceTitle="Demo stand"
                serviceTagline="Claude Code + react-dsfr"
            />
            <main className={fr.cx("fr-container", "fr-py-6w")}>
                <h1>Sandbox de démo</h1>
                <Alert
                    severity="info"
                    title="Prêt pour la démo"
                    description="Colle une URL de nœud Figma dans Claude Code et commence à implémenter."
                    className={fr.cx("fr-mb-4w")}
                />
                <Button>Exemple de bouton DSFR</Button>
            </main>
        </>
    );
}
```

- [ ] **Step 4 : Vérifier le rendu**

```bash
cd demo-app
npm run dev
# Ouvrir http://localhost:5173
# Attendu : Header DSFR bleu marine, alert bleue, bouton DSFR visible. Pas d'erreurs console.
```

- [ ] **Step 5 : Arrêter le dev server (Ctrl+C), commit**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude
git add demo-app/index.html demo-app/src/
git commit -m "feat(demo-app): config DSFR (index.html, main.tsx, App.tsx)"
```

---

### Task 4: demo-app — CLAUDE.md (conventions cartes.gouv.fr)

**Files:**
- Create: `demo-app/CLAUDE.md`

**Interfaces:**
- Produces: fichier de contexte injecté par Claude Code dans chaque session dans `demo-app/`

- [ ] **Step 1 : Créer demo-app/CLAUDE.md**

```markdown
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
```

- [ ] **Step 2 : Vérifier**

```bash
head -3 demo-app/CLAUDE.md
# Attendu : # CLAUDE.md
```

- [ ] **Step 3 : Commit**

```bash
git add demo-app/CLAUDE.md
git commit -m "docs(demo-app): CLAUDE.md avec conventions cartes.gouv.fr"
```

---

### Task 5: Slidev — scaffold + package.json

**Files:**
- Create: `slides/package.json`

**Interfaces:**
- Produces: `slides/` avec `npm run dev` (port 3030) et `npm run demo` (mode kiosk)

- [ ] **Step 1 : Créer slides/package.json**

```json
{
  "name": "demo-stand-slides",
  "private": true,
  "scripts": {
    "dev": "slidev slides.md",
    "build": "slidev build slides.md",
    "demo": "slidev slides.md --open --interval 10000"
  },
  "dependencies": {
    "@slidev/cli": "^0.50.0",
    "@slidev/theme-default": "latest"
  }
}
```

- [ ] **Step 2 : Installer**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude/slides
npm install
```

- [ ] **Step 3 : Vérifier**

```bash
ls slides/node_modules/@slidev/cli/bin/
# Attendu : slidev.js (ou équivalent)
```

- [ ] **Step 4 : Commit**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude
git add slides/package.json slides/package-lock.json
git commit -m "feat(slides): scaffold Slidev"
```

---

### Task 6: Slidev — slides.md (deck complet 8 slides en français)

**Files:**
- Create: `slides/slides.md`
- Create: `slides/public/` (dossier vide avec .gitkeep pour les clips futurs)

**Interfaces:**
- Consumes: Slidev installé (Task 5)
- Produces: deck navigable sur `http://localhost:3030`, auto-boucle toutes les 10 s en mode `demo`

- [ ] **Step 1 : Créer slides/slides.md**

```markdown
---
theme: default
title: Claude Code au quotidien sur cartes.gouv.fr
background: '#003189'
class: text-center
highlighter: shiki
lineNumbers: false
transition: slide-left
mdc: true
---

<style>
  .slidev-layout h1 { color: white; }
  .tag { background: rgba(255,255,255,0.15); border-radius: 4px; padding: 2px 8px; font-size: 0.9em; }
</style>

# Claude Code au quotidien
## sur cartes.gouv.fr

<div class="mt-8">
  <span class="tag">Figma MCP</span>
  <span class="tag">react-dsfr skill</span>
  <span class="tag">Playwright MCP</span>
  <span class="tag">RTK</span>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-white/60 text-sm">
  IGN · Géoplateforme · 2026 — <em>Viens me poser des questions !</em>
</div>

---
layout: two-cols
---

# Mon setup Claude Code

::left::

### MCPs actifs
- 🎨 **Figma** — design → code direct
- 🎭 **Playwright** — vérif. rendu live
- 🔍 **Serena** — navigation sémantique
- 🔧 **symfony-mcp** — routes Symfony
- 💨 **Headroom** — compression contexte

### Skills perso
- `react-dsfr` — composants DSFR natifs
- `rgaa` — audit accessibilité RGAA 4.1
- `securite-anssi` — règles sécu État
- `commit-message-staged-oneline`

::right::

### Plugins (16 installés)
figma · playwright · serena · context7
superpowers · feature-dev · pr-review-toolkit
commit-commands · typescript-lsp · php-lsp…

### RTK (Rust Token Killer)
Hook transparent sur chaque commande Bash.
Filtre la verbosité → **−85 % de tokens**.

<div class="mt-4 p-3 bg-blue-50 rounded text-sm">
  <strong>Résultat :</strong> Claude voit le signal,
  pas le bruit.
</div>

---
layout: center
---

# Le workflow

<div class="flex flex-col items-center gap-3 mt-4 text-lg">
  <div class="px-6 py-2 bg-blue-100 rounded-lg font-bold">🎨 Figma — URL de nœud</div>
  <div class="text-gray-400">↓ get_design_context + screenshot</div>
  <div class="px-6 py-2 bg-purple-100 rounded-lg font-bold">🤖 Claude Code — plan-first</div>
  <div class="text-gray-400">↓ react-dsfr skill + CLAUDE.md du projet</div>
  <div class="px-6 py-2 bg-green-100 rounded-lg font-bold">⚛️ Composants React (react-dsfr)</div>
  <div class="text-gray-400">↓ Playwright — vérification rendu live</div>
  <div class="px-6 py-2 bg-yellow-100 rounded-lg font-bold">✅ Itération UX → commit</div>
</div>

---
layout: center
class: text-center
---

# Démo : Figma → react-dsfr

<!-- Placer le clip enregistré dans slides/public/demo-hero.mp4 -->
<!-- Décommenter la ligne video ci-dessous une fois le clip enregistré -->
<!-- <video class="mx-auto rounded-xl shadow-2xl" style="max-height: 65vh" autoplay loop muted src="/demo-hero.mp4" /> -->

<div class="mt-8 p-6 bg-gray-50 rounded-xl text-left max-w-2xl mx-auto text-sm">
  <div class="font-bold mb-2">Prompt réel utilisé :</div>
  <code class="text-xs leading-relaxed">
    « L'ajout d'une licence ouverte m'a l'air avoir un souci.
    À ma compréhension, ça doit ajouter seulement les éléments
    de ce design figma.com/design/[...] et rien d'autre »
  </code>
  <div class="mt-4 font-bold mb-2">Ce qui se passe :</div>
  <ol class="list-decimal list-inside space-y-1 text-gray-600">
    <li>Claude appelle <code>get_design_context</code> sur le nœud Figma</li>
    <li>Charge le skill <code>react-dsfr</code> pour les conventions</li>
    <li>Écrit les composants (<code>Button</code>, <code>Input</code>, <code>SelectNext</code>…)</li>
    <li>Playwright vérifie le rendu dans le navigateur</li>
    <li>Itération sur les détails UX</li>
  </ol>
</div>

---
layout: center
class: text-center
---

# 9 millions de tokens économisés

<div class="text-9xl font-bold mt-6" style="color: #18753c">85,4 %</div>
<div class="text-2xl text-gray-400 mt-2">de tokens économisés via RTK</div>

<div class="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-left">
  <div class="text-center">
    <div class="text-4xl font-bold">3 004</div>
    <div class="text-gray-500 mt-1">commandes</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold">98,7 %</div>
    <div class="text-gray-500 mt-1">sur ESLint</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold">5,9 M</div>
    <div class="text-gray-500 mt-1">tokens via <code>rtk read</code></div>
  </div>
</div>

---

# Pourquoi ça marche

**Le CLAUDE.md du projet** — les conventions dans le contexte de chaque session :

```ts
// fr.cx() d'abord (classes utilitaires DSFR)
<div className={fr.cx("fr-container", "fr-py-4w")}>

// tss-react uniquement pour le CSS scopé runtime
const useStyles = tss.create({ card: { borderRadius: "8px" } });
```

**Les skills perso** — la connaissance métier directement câblée :
- `react-dsfr` : imports par composant, pas de barrel, pas de MUI
- `rgaa` : grille RGAA 4.1.2 intégrée dans chaque revue
- `securite-anssi` : règles de sécurité État

**Résultat :** Claude écrit du code qui ressemble au codebase existant.
Première génération = quasi-commit-ready.

---
layout: center
class: text-center
---

# Ressources

<div class="grid grid-cols-2 gap-12 mt-6 text-left max-w-3xl mx-auto">
  <div class="space-y-4">
    <div>
      <div class="font-bold text-lg">🎨 react-dsfr</div>
      <code class="text-sm">github.com/codegouvfr/react-dsfr</code>
    </div>
    <div>
      <div class="font-bold text-lg">📐 DSFR officiel</div>
      <code class="text-sm">design.numerique.gouv.fr</code>
    </div>
    <div>
      <div class="font-bold text-lg">💻 cartes.gouv.fr</div>
      <code class="text-sm">github.com/IGNF/cartes.gouv.fr</code>
    </div>
    <div>
      <div class="font-bold text-lg">🤖 Claude Code</div>
      <code class="text-sm">claude.ai/code</code>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center">
    <div class="text-6xl mb-3">📄</div>
    <div class="text-sm text-gray-500">Handout disponible</div>
    <div class="text-xs text-gray-400 mt-1">(stand/handout.html → PDF)</div>
  </div>
</div>

<div class="absolute bottom-6 left-0 right-0 text-center text-sm text-gray-400">
  ← → pour naviguer · Posez-moi des questions !
</div>
```

- [ ] **Step 2 : Créer slides/public/.gitkeep** (pour les clips futurs)

```bash
mkdir -p slides/public
touch slides/public/.gitkeep
```

- [ ] **Step 3 : Vérifier le rendu**

```bash
cd slides
npm run dev
# Ouvrir http://localhost:3030
# Attendu : 8 slides navigables, slide 1 fond bleu marine, slide 5 chiffre vert.
# Arrêter avec Ctrl+C.
```

- [ ] **Step 4 : Commit**

```bash
cd /home/OACruze/dev/claude-tests/cartes.gouv.fr-claude
git add slides/slides.md slides/public/.gitkeep
git commit -m "feat(slides): deck complet 8 slides en français"
```

---

### Task 7: recording-plan — script clip héros (01-figma-to-dsfr.md)

**Files:**
- Create: `recording-plan/01-figma-to-dsfr.md`

**Interfaces:**
- Produces: script de tournage actionnable, prompts exacts, timing, plan B

- [ ] **Step 1 : Créer recording-plan/01-figma-to-dsfr.md**

```markdown
# Clip 01 — Figma → composant react-dsfr

**Durée cible :** 60–90 secondes (boucle fluide)
**Outil de capture :** OBS Studio ou QuickTime (macOS) / enregistrement écran GNOME (Linux)
**Résolution :** 1920×1080 minimum, format MP4 H.264
**Sortie :** `slides/public/demo-hero.mp4`

---

## Pré-requis avant de lancer OBS

1. **Ouvrir** `demo-app/` dans VS Code + terminal Claude Code (`claude` dans ce dossier).
2. **Authentification Figma** : vérifier que `claude` peut appeler `mcp__plugin_figma_figma__get_design_context`
   (tester avec `/figma-use` dans une session de test au préalable).
3. **Figma source :** remplacer `[FIGMA_NODE_URL]` ci-dessous par l'URL du nœud de démo
   (par ex. un nœud de la feature « licence / dates » d'Alim-diff, ou tout nœud DSFR non-sensible).
4. **Layout écran :** Claude Code (gauche, 60 %) · navigateur sur `http://localhost:5173` (droite, 40 %).
5. **Font size** du terminal Claude Code : 16 px minimum pour la lisibilité à distance.
6. Lancer `npm run dev` dans `demo-app/` → attendre que le navigateur affiche la page d'accueil DSFR.

---

## Séquence à enregistrer

### Acte 1 — Coller le nœud Figma (10 s)

Saisir ce prompt dans Claude Code (session dans `demo-app/`) :

```
Implémente ce design Figma en React avec react-dsfr :
[FIGMA_NODE_URL]

Crée un composant autonome dans src/components/DemoSection.tsx
et intègre-le dans App.tsx sous l'Alert existante.
Utilise uniquement des composants @codegouvfr/react-dsfr natifs.
```

**Montrer à l'écran :** le prompt complet visible avant d'appuyer sur Entrée.

### Acte 2 — Claude analyse le design (20 s)

Claude appelle `get_design_context` puis `get_screenshot`. Laisser tourner.
**Montrer à l'écran :** les appels MCP Figma dans le log Claude Code (en-têtes verts).

### Acte 3 — Code généré (20 s)

Claude écrit `src/components/DemoSection.tsx`.
**Montrer à l'écran :** défilement du code généré dans l'éditeur, imports DSFR par composant visibles.

### Acte 4 — Rendu dans le navigateur (10 s)

Vite HMR recharge automatiquement. Basculer sur le navigateur (droite).
**Montrer à l'écran :** le composant DSFR rendu dans la page. Pan lent du design Figma (screenshot) vers le rendu browser.

---

## Prompts optionnels pour allonger à 90 s

Si le rendu est bon mais qu'on veut montrer l'itération :

```
Aligne le champ de saisie avec les autres inputs DSFR de la page.
L'espacement entre les éléments doit respecter les tokens fr-mb-2w.
```

---

## Plan B (si Figma MCP indisponible le jour J)

1. Avoir le composant déjà généré dans `src/components/DemoSection_backup.tsx`.
2. Montrer le code en lecture et décrire le workflow verbalement.
3. Lancer : `cp src/components/DemoSection_backup.tsx src/components/DemoSection.tsx`
   puis montrer le rendu dans le browser.

---

## Embed dans Slidev

Une fois le clip enregistré et converti en MP4 :

```bash
cp /chemin/vers/enregistrement.mp4 slides/public/demo-hero.mp4
```

Puis dans `slides/slides.md`, slide 4, décommenter la ligne `<video …>` et supprimer le bloc `.bg-gray-50`.
```

- [ ] **Step 2 : Vérifier**

```bash
wc -l recording-plan/01-figma-to-dsfr.md
# Attendu : > 60 lignes
```

- [ ] **Step 3 : Commit**

```bash
git add recording-plan/01-figma-to-dsfr.md
git commit -m "docs(recording-plan): script clip héros Figma→react-dsfr"
```

---

### Task 8: recording-plan — script clip RTK (02-rtk-token-savings.md)

**Files:**
- Create: `recording-plan/02-rtk-token-savings.md`

**Interfaces:**
- Produces: script actionnable pour le clip terminal RTK

- [ ] **Step 1 : Créer recording-plan/02-rtk-token-savings.md**

```markdown
# Clip 02 — RTK : économies de tokens en temps réel

**Durée cible :** 30–45 secondes
**Outil :** asciinema (enregistrement terminal) ou capture OBS du terminal seul
**Sortie :** `slides/public/demo-rtk.cast` (asciinema) ou `slides/public/demo-rtk.mp4`

---

## Pré-requis

- RTK installé et fonctionnel : `rtk --version` doit répondre.
- Se placer dans `~` (hors de tout projet) pour avoir les stats globales.

---

## Option A — asciinema (recommandé, format léger et boucle)

```bash
# Installer si besoin
pip install asciinema

# Enregistrer
asciinema rec slides/public/demo-rtk.cast --overwrite
```

### Séquence à taper dans l'enregistrement

```bash
# Montrer les stats globales
rtk gain

# (pause 2 s pour laisser le spectateur lire)

# Montrer l'historique récent
rtk gain --history

# (pause 2 s)

# Montrer les opportunités manquées (contexte pédagogique)
rtk discover
```

Arrêter avec `Ctrl+D`.

Pour lire en boucle dans Slidev :
```html
<!-- Dans slides.md, créer une slide dédiée -->
<script setup>
import { ref, onMounted } from 'vue'
// asciinema-player doit être installé via CDN ou npm
</script>
```

> **Alternative plus simple :** exporter en GIF via `agg` :
> `agg slides/public/demo-rtk.cast slides/public/demo-rtk.gif`
> puis l'intégrer dans la slide avec `<img src="/demo-rtk.gif" />`.

---

## Option B — capture OBS du terminal

Lancer dans un terminal avec grande police (18 px) :

```bash
rtk gain
```

**Ce qui doit être visible :**
- Total commands : **3 004**
- Tokens saved : **9 012 543 (85,4 %)**
- Top saver : `rtk read` — 5,9 M tokens

Puis :
```bash
rtk gain --history
```

Montrer 5–6 lignes récentes avec les pourcentages d'économie par commande.

---

## Embed dans Slidev

Ajouter une slide optionnelle après la slide 5 (chiffres) :

```markdown
---
layout: center
class: text-center
---

# RTK en action

<img src="/demo-rtk.gif" class="mx-auto rounded-lg" style="max-height: 60vh" />
```
```

- [ ] **Step 2 : Commit**

```bash
git add recording-plan/02-rtk-token-savings.md
git commit -m "docs(recording-plan): script clip RTK token savings"
```

---

### Task 9: stand — FAQ (faq.md)

**Files:**
- Create: `stand/faq.md`

**Interfaces:**
- Produces: 7 questions + réponses ≤ 30 s chacune, à lire à voix haute avant le stand

- [ ] **Step 1 : Créer stand/faq.md**

```markdown
# FAQ — Stand Claude Code

Questions anticipées et réponses < 30 s.

---

## « Ça remplace les développeurs ? »

Non. Claude génère un brouillon correct en connaissant les conventions du projet — le développeur
valide, affine et décide. C'est un accélérateur, pas un remplaçant. Les tâches où ça aide vraiment :
convertir un design Figma en composants DSFR, rédiger du code répétitif conforme aux conventions,
et repérer les problèmes d'accessibilité RGAA.

---

## « Comment Claude connaît nos conventions ? »

Deux mécanismes :
1. **CLAUDE.md** dans le dépôt — les règles du projet (imports DSFR, fr.cx, tss-react, commentaires
   FR…) sont injectées dans chaque session.
2. **Skills perso** (`react-dsfr`, `rgaa`, `securite-anssi`) — règles métier et design system câblées
   directement dans le contexte de Claude.

Résultat : Claude écrit du code qui ressemble au codebase existant dès la première génération.

---

## « C'est sécurisé ? Vous envoyez votre code à Anthropic ? »

Le code source (pas les données utilisateurs) est envoyé à l'API Anthropic pour le traitement.
Anthropic ne ré-utilise pas les données des clients API pour entraîner ses modèles (politique
Enterprise). **RTK** et **Headroom** sont locaux : ils filtrent le bruit avant envoi, ils ne
sortent rien de votre réseau. Pour les projets sensibles, vérifier la politique de confidentialité
Anthropic et les options d'hébergement Enterprise.

---

## « Combien ça coûte ? »

Deux postes : l'abonnement Claude Code (Pro ou Enterprise) et les tokens API si on sort du plan.
RTK économise **85 %** des tokens sur les opérations courantes — ce qui réduit significativement
le coût API. Sur mon usage (3 004 commandes, 9 M tokens économisés), l'économie est substantielle
pour du dev quotidien.

---

## « Et le RGAA / l'accessibilité ? »

Le skill `rgaa` est directement dans le contexte Claude : il connaît la grille RGAA 4.1.2.
Je peux demander un audit d'accessibilité d'un composant React et Claude génère une liste de
points de conformité et de non-conformité avec les critères RGAA correspondants. C'est un filet
de sécurité, pas un auditeur officiel — mais ça permet d'attraper les problèmes courants tôt.

---

## « Il fait des erreurs / des hallucinations ? »

Oui, parfois. Les erreurs les plus fréquentes :
- Un composant DSFR nommé légèrement différemment → le CLAUDE.md et la skill react-dsfr réduisent
  ça drastiquement.
- Des props imaginaires → Playwright détecte les erreurs de rendu en live.

Le workflow plan-first (Claude propose, tu valides avant l'exécution) permet d'attraper les
problèmes avant qu'ils ne s'écrivent dans le code.

---

## « Par où je commence ? »

1. `npm install -g @anthropic-ai/claude-code`
2. `claude` dans ton projet
3. Crée un `CLAUDE.md` avec les conventions clés (stack, règles de style, commandes)
4. Installe le plugin Figma : `/plugin install figma`
5. Colle une URL de nœud Figma et demande l'implémentation

Voir aussi : [react-dsfr](https://github.com/codegouvfr/react-dsfr),
[DSFR](https://design.numerique.gouv.fr/), et le dépôt
[cartes.gouv.fr](https://github.com/IGNF/cartes.gouv.fr) pour un exemple de CLAUDE.md complet.
```

- [ ] **Step 2 : Vérifier**

```bash
grep -c "^##" stand/faq.md
# Attendu : 7
```

- [ ] **Step 3 : Commit**

```bash
git add stand/faq.md
git commit -m "docs(stand): FAQ 7 questions avec réponses < 30 s"
```

---

### Task 10: stand — cheat-sheet + handout HTML imprimable

**Files:**
- Create: `stand/cheat-sheet.md`
- Create: `stand/handout.html`

**Interfaces:**
- Produces: `cheat-sheet.md` (référence rapide pour toi) + `stand/handout.html` (imprimable A4 PDF)

- [ ] **Step 1 : Créer stand/cheat-sheet.md**

```markdown
# Cheat-sheet — Mon setup Claude Code

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

## RTK — commandes directes

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

## Workflow type : Figma → composant

1. Ouvrir Claude Code dans le projet (`claude` dans le terminal)
2. Coller l'URL du nœud Figma dans le prompt
3. Claude appelle `get_design_context` + charge le skill `react-dsfr`
4. Relire le plan → approuver → code généré
5. Playwright vérifie le rendu → itération si besoin
6. `/commit-message-staged-oneline` + push

## Chiffres RTK (session courante)

- Commandes totales : 3 004
- Tokens économisés : **9 012 543 (85,4 %)**
- Meilleure commande : `rtk lint eslint` — 98,7 % d'économie
- Top usage : `rtk grep` (478 appels)
```

- [ ] **Step 2 : Créer stand/handout.html**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Claude Code au quotidien — IGN / cartes.gouv.fr</title>
<style>
  @page { size: A4; margin: 14mm 16mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Marianne", Arial, sans-serif; font-size: 11px; line-height: 1.5; color: #1e1e1e; }
  h1 { font-size: 18px; color: #003189; margin-bottom: 4px; }
  h2 { font-size: 12px; color: #003189; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin: 12px 0 6px; text-transform: uppercase; letter-spacing: 0.05em; }
  h3 { font-size: 11px; font-weight: bold; margin: 8px 0 3px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #003189; padding-bottom: 8px; margin-bottom: 12px; }
  .header-left p { color: #666; font-size: 10px; margin-top: 2px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
  code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; font-size: 10px; font-family: monospace; }
  .tag { display: inline-block; background: #e8edff; color: #003189; border-radius: 3px; padding: 1px 6px; font-size: 9.5px; margin: 1px 2px 1px 0; }
  .stat { text-align: center; padding: 8px; background: #f6f6f6; border-radius: 6px; }
  .stat .num { font-size: 22px; font-weight: bold; color: #18753c; }
  .stat .label { font-size: 9px; color: #666; margin-top: 2px; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 8px 0; }
  .workflow { background: #f8f9ff; border-left: 3px solid #003189; padding: 6px 10px; border-radius: 0 4px 4px 0; }
  .workflow p { margin: 2px 0; font-size: 10.5px; }
  .footer { margin-top: 14px; padding-top: 8px; border-top: 1px solid #ddd; font-size: 9px; color: #888; display: flex; justify-content: space-between; }
  ul { padding-left: 14px; }
  li { margin: 2px 0; }
  .qr-placeholder { width: 70px; height: 70px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #999; text-align: center; }
  .links-qr { display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap; }
  .link-item { text-align: center; }
  .link-item .url { font-size: 8.5px; color: #666; margin-top: 3px; max-width: 75px; word-break: break-all; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <h1>Claude Code au quotidien</h1>
    <p>Développeur cartes.gouv.fr · IGN · Géoplateforme · 2026</p>
  </div>
  <div>
    <span class="tag">Figma MCP</span>
    <span class="tag">react-dsfr skill</span>
    <span class="tag">Playwright MCP</span>
    <span class="tag">RTK</span>
  </div>
</div>

<div class="grid">

  <div>
    <h2>Le workflow</h2>
    <div class="workflow">
      <p>🎨 <strong>Figma</strong> — coller l'URL du nœud design</p>
      <p>↓ <code>get_design_context</code> + screenshot</p>
      <p>🤖 <strong>Claude Code</strong> — plan-first + skill react-dsfr</p>
      <p>↓ génération des composants react-dsfr</p>
      <p>🎭 <strong>Playwright</strong> — vérif. rendu live</p>
      <p>↓ itération UX → commit</p>
    </div>

    <h2>MCPs actifs</h2>
    <ul>
      <li><strong>Figma</strong> — design → code direct via <code>get_design_context</code></li>
      <li><strong>Playwright</strong> — vérification du rendu dans le navigateur</li>
      <li><strong>Serena</strong> — navigation sémantique du codebase</li>
      <li><strong>symfony-mcp</strong> — routes Symfony (projet cartes.gouv.fr)</li>
      <li><strong>Headroom</strong> — compression du contexte</li>
    </ul>

    <h2>Skills perso</h2>
    <ul>
      <li><code>react-dsfr</code> — composants DSFR natifs, imports par composant</li>
      <li><code>rgaa</code> — audit accessibilité RGAA 4.1.2</li>
      <li><code>securite-anssi</code> — règles de sécurité pour l'État</li>
    </ul>
  </div>

  <div>
    <h2>RTK — économies de tokens</h2>
    <div class="stats-row">
      <div class="stat">
        <div class="num">85,4 %</div>
        <div class="label">tokens économisés</div>
      </div>
      <div class="stat">
        <div class="num">9 M</div>
        <div class="label">tokens filtrés</div>
      </div>
      <div class="stat">
        <div class="num">98,7 %</div>
        <div class="label">sur ESLint</div>
      </div>
    </div>
    <p style="font-size:10px;color:#666;margin-top:4px">RTK filtre la verbosité des outils (ls, grep, lint…) avant envoi à Claude — transparent, aucun changement de commande.</p>

    <h2>Démarrer en 5 min</h2>
    <ol style="padding-left:14px">
      <li>Installer Claude Code : <code>npm i -g @anthropic-ai/claude-code</code></li>
      <li>Lancer dans ton projet : <code>claude</code></li>
      <li>Créer un <code>CLAUDE.md</code> avec tes conventions clés</li>
      <li>Installer le plugin Figma : <code>/plugin install figma</code></li>
      <li>Coller une URL de nœud Figma dans le prompt !</li>
    </ol>

    <h2>Ressources</h2>
    <div class="links-qr">
      <div class="link-item">
        <div class="qr-placeholder">QR<br/>react-dsfr</div>
        <div class="url">github.com/codegouvfr/react-dsfr</div>
      </div>
      <div class="link-item">
        <div class="qr-placeholder">QR<br/>DSFR</div>
        <div class="url">design.numerique.gouv.fr</div>
      </div>
      <div class="link-item">
        <div class="qr-placeholder">QR<br/>Claude Code</div>
        <div class="url">claude.ai/code</div>
      </div>
    </div>
    <p style="font-size:9px;color:#aaa;margin-top:6px">Remplacer les QR placeholders par des QR codes générés via qr-code-generator.com</p>
  </div>

</div>

<div class="footer">
  <span>Stand demo Claude Code · IGN Géoplateforme · 2026</span>
  <span>Orka-arnest.Cruze@ign.fr</span>
</div>

</body>
</html>
```

- [ ] **Step 3 : Vérifier le handout**

```bash
# Ouvrir dans le navigateur
xdg-open stand/handout.html   # Linux
# ou : open stand/handout.html   # macOS
# Attendu : mise en page A4 deux colonnes, pas de débordement horizontal,
# header bleu IGN, stats RTK vertes, section QR codes visibles.
```

- [ ] **Step 4 : Commit final**

```bash
git add stand/cheat-sheet.md stand/handout.html
git commit -m "docs(stand): cheat-sheet + handout imprimable A4"
```

---

## Vérification finale (avant le jour J)

- [ ] `cd slides && npm run demo` → deck s'affiche, avance toutes les 10 s, 8 slides visibles.
- [ ] `cd demo-app && npm run dev` → `http://localhost:5173` charge, Header DSFR + Alert + Button visibles, console sans erreur.
- [ ] Lire `recording-plan/01-figma-to-dsfr.md` et remplacer `[FIGMA_NODE_URL]` par le nœud réel.
- [ ] Enregistrer et exporter les clips → copier dans `slides/public/` → décommenter les `<video>` dans `slides/slides.md`.
- [ ] Ouvrir `stand/handout.html` → Imprimer → PDF → scanner les QR codes (remplacer les placeholders par de vrais QR en SVG inline).
- [ ] Relire `stand/faq.md` à voix haute — chaque réponse doit tenir en < 30 s.
