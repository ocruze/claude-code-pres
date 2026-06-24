---
theme: default
title: Claude Code au quotidien sur cartes.gouv.fr
background: '#000091'
class: text-center
highlighter: shiki
lineNumbers: false
transition: slide-left
mdc: true
colorSchema: light
---

# Claude Code au quotidien
## sur cartes.gouv.fr

<div class="mt-8">
  <span class="tag">Figma MCP</span>
  <span class="tag">react-dsfr skill</span>
  <span class="tag">Playwright MCP</span>
  <span class="tag">RTK</span>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-white/60 text-sm">
  IGN · Géoplateforme · 2026 - <em>Viens me poser des questions !</em>
</div>

---
layout: two-cols
---

# Mon setup Claude Code

::left::

### MCPs actifs
- **Figma** - design vers code direct
- **Playwright** - vérif. rendu live
- **Serena** - navigation sémantique
- **symfony-mcp** - routes Symfony
- **Headroom** - compression contexte

### Skills perso
- `react-dsfr` - composants DSFR natifs
- `rgaa` - audit accessibilité RGAA 4.1
- `securite-anssi` - règles sécu État
- `commit-message-staged-oneline`

::right::

### Plugins (16 installés)
figma · playwright · serena · context7
superpowers · feature-dev · pr-review-toolkit
commit-commands · typescript-lsp · php-lsp...

### RTK (Rust Token Killer)
Hook transparent sur chaque commande Bash.
Filtre la verbosité : **-85 % de tokens**.

<div class="mt-4 p-3 bg-blue-50 rounded text-sm">
  <strong>Résultat :</strong> Claude voit le signal,
  pas le bruit.
</div>

---
layout: center
---

# Le workflow

<div class="flex flex-col items-center gap-3 mt-4 text-lg">
  <div class="px-6 py-2 bg-blue-100 rounded-lg font-bold">Figma - URL de noeud</div>
  <div class="text-gray-400">↓ get_design_context + screenshot</div>
  <div class="px-6 py-2 bg-purple-100 rounded-lg font-bold">Claude Code - plan-first</div>
  <div class="text-gray-400">↓ react-dsfr skill + CLAUDE.md du projet</div>
  <div class="px-6 py-2 bg-green-100 rounded-lg font-bold">Composants React (react-dsfr)</div>
  <div class="text-gray-400">↓ Playwright - vérification rendu live</div>
  <div class="px-6 py-2 bg-yellow-100 rounded-lg font-bold">Itération UX vers commit</div>
</div>

---
layout: center
class: text-center
---

# Démo : Figma vers react-dsfr

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
    <li>Claude appelle <code>get_design_context</code> sur le noeud Figma</li>
    <li>Charge le skill <code>react-dsfr</code> pour les conventions</li>
    <li>Écrit les composants (<code>Button</code>, <code>Input</code>, <code>SelectNext</code>...)</li>
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

**Le CLAUDE.md du projet** - les conventions dans le contexte de chaque session :

```ts
// fr.cx() d'abord (classes utilitaires DSFR)
<div className={fr.cx("fr-container", "fr-py-4w")}>

// tss-react uniquement pour le CSS scopé runtime
const useStyles = tss.create({ card: { borderRadius: "8px" } });
```

**Les skills perso** - la connaissance métier directement câblée :
- `react-dsfr` : imports par composant, pas de barrel, pas de MUI
- `rgaa` : grille RGAA 4.1.2 intégrée dans chaque revue
- `securite-anssi` : règles de sécurité État

**Résultat :** Claude écrit du code qui ressemble au codebase existant.
Première génération = quasi-commit-ready.

---
layout: center
class: text-center
---

# Outils et liens

<div class="grid grid-cols-2 gap-6 mt-4 text-left max-w-4xl mx-auto text-sm">
  <div>
    <div class="font-bold mb-2 text-base">MCPs</div>
    <ul class="space-y-1 text-gray-600">
      <li><strong>Figma</strong> - Plugin officiel (figma.com/developers/mcp)</li>
      <li><strong>Playwright</strong> - <code>github.com/microsoft/playwright-mcp</code></li>
      <li><strong>Serena</strong> - <code>github.com/oraios/serena</code></li>
      <li><strong>Context7</strong> - <code>github.com/upstash/context7</code></li>
      <li><strong>Headroom</strong> - <code>github.com/chopratejas/headroom</code></li>
      <li><strong>symfony-mcp</strong> - interne projet</li>
    </ul>
    <div class="font-bold mt-3 mb-2 text-base">Skills perso</div>
    <ul class="space-y-1 text-gray-600">
      <li><strong>react-dsfr</strong> - <code>github.com/codegouvfr/react-dsfr</code></li>
      <li><strong>rgaa</strong> - <code>accessibilite.numerique.gouv.fr</code></li>
      <li><strong>securite-anssi</strong> - <code>cyber.gouv.fr</code></li>
    </ul>
  </div>
  <div>
    <div class="font-bold mb-2 text-base">Plugins Claude Code</div>
    <ul class="space-y-1 text-gray-600">
      <li><code>github.com/anthropics/claude-plugins-official</code></li>
    </ul>
    <div class="font-bold mt-3 mb-2 text-base">RTK (Rust Token Killer)</div>
    <ul class="space-y-1 text-gray-600">
      <li>Proxy Bash transparent - interne, pas de lien public</li>
      <li>Hook : chaque commande passe par <code>rtk</code></li>
    </ul>
    <div class="font-bold mt-3 mb-2 text-base">Guides</div>
    <ul class="space-y-1 text-gray-600">
      <li><strong>MCP Claude Code</strong> - <code>docs.claude.com/en/docs/claude-code/mcp</code></li>
      <li><strong>DSFR</strong> - <code>systeme-de-design.gouv.fr</code></li>
    </ul>
  </div>
</div>

---
layout: center
class: text-center
---

# Ressources

<div class="grid grid-cols-2 gap-12 mt-6 text-left max-w-3xl mx-auto">
  <div class="space-y-4">
    <div>
      <div class="font-bold text-lg">react-dsfr</div>
      <code class="text-sm">github.com/codegouvfr/react-dsfr</code>
    </div>
    <div>
      <div class="font-bold text-lg">DSFR officiel</div>
      <code class="text-sm">systeme-de-design.gouv.fr</code>
    </div>
    <div>
      <div class="font-bold text-lg">cartes.gouv.fr</div>
      <code class="text-sm">github.com/IGNF/cartes.gouv.fr</code>
    </div>
    <div>
      <div class="font-bold text-lg">Claude Code</div>
      <code class="text-sm">claude.ai/code</code>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center">
    <div class="text-6xl mb-3">📄</div>
    <div class="text-sm text-gray-500">Handout disponible</div>
    <div class="text-xs text-gray-400 mt-1">(stand/handout.html vers PDF)</div>
  </div>
</div>

<div class="absolute bottom-6 left-0 right-0 text-center text-sm text-gray-400">
  ← → pour naviguer · Posez-moi des questions !
</div>
