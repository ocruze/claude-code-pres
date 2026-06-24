---
theme: default
title: "L'écosystème Claude Code"
background: "#000091"
class: text-center
highlighter: shiki
favicon: "/dsfr/favicon.svg"
lineNumbers: true
transition: slide-left
mdc: true
colorSchema: light
author: Orka Arnest CRUZE
---

# L'écosystème Claude Code

<div class="flex justify-center">
  <img width="100px" class="text-center" src="/icons/claudecode-color.svg">
</div>

<div class="mt-8 fr-tags-group justify-center">
  <span class="fr-tag">plugins</span>
  <span class="fr-tag">mcp</span>
  <span class="fr-tag">skills</span>
  <span class="fr-tag">figma</span>
  <span class="fr-tag">playwright</span>
  <span class="fr-tag">RTK</span>
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-white/60 text-sm">
  Orka Arnest CRUZE - Concepteur-développeur - RDS/SDM
</div>

---

# Concepts

<div class="fr-table" id="table-0-component">
  <div class="fr-table__wrapper">
    <div class="fr-table__container">
      <div class="fr-table__content">
        <table>
          <thead>
            <tr>
              <th scope="col">Concept</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tool</strong></td>
              <td>Capacité native (lecture/écriture de fichiers, lecture page web, exécution de commandes)</td>
            </tr>
            <tr>
              <td><strong>MCP</strong></td>
              <td>Connexion à un service externe (figma, slack, notion)</td>
            </tr>
            <tr>
              <td><strong>Skill</strong></td>
              <td>Savoir procédural décrit en Markdown</td>
            </tr>
            <tr>
              <td><strong>Hook</strong><img src="/icons/claudecode-color.svg"></td>
              <td>Script déclenché sur un événement du cycle de vie</td>
            </tr>
            <tr>
              <td><strong>Subagent</strong><img src="/icons/claudecode-color.svg"></td>
              <td>Boucle agentique isolée, retourne un résumé à l'agent parent</td>
            </tr>
            <tr>
              <td><strong>Plugin</strong><img src="/icons/claudecode-color.svg"></td>
              <td>Bundle : skills + hooks + subagents + serveurs MCP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- <div class="fr-text--sm fr-mt-2w" style="color: var(--grey-text)">
  Un <strong>Marketplace</strong> est un dépôt GitHub qui distribue plusieurs plugins sous un même registre.
</div> -->

---
layout: two-cols-header
---

# Famille 1 - Capacités & accès

<span class="fr-badge fr-badge--blue-ecume">Tool + MCP</span>

::left::

### Tool

Les capacités **natives** de Claude Code - lire/écrire des fichiers, chercher, exécuter des commandes, accéder au web. Vous n'en créez pas directement : vous les étendez via MCP.

### MCP

Standard ouvert Anthropic. Un serveur MCP expose trois types de capacités :

- **Ressources** - données en lecture seule
- **Tools** - actions (créer un ticket, envoyer un message…)
- **Prompts** - templates réutilisables

<span class="fr-text--sm">Le même serveur MCP fonctionne dans Claude Code, Cursor, OpenCode…</span>

::right::

<div class="fr-callout fr-callout--blue-ecume fr-mx-4v">
  <p class="fr-callout__title">Sur cartes.gouv.fr</p>
  <ul>
    <li><strong>Figma MCP</strong> - lecture du design (nœud vers code) + screenshot direct dans Claude</li>
    <li><strong>Playwright MCP</strong> - vérification du rendu live dans le navigateur sans quitter Claude</li>
    <li><strong>Serena MCP</strong> - navigation sémantique au niveau du symbole (classes/fonctions) ; économise des tokens sur un gros codebase</li>
  </ul>
</div>

---
layout: two-cols-header
---

# Famille 2 - Savoir & instructions (1/3)

## CLAUDE.md [Pourquoi c'est central]{class="fr-badge fr-badge--green-emeraude"}

::left::

Le fichier `CLAUDE.md` est **injecté dans le contexte à chaque session**. C'est le mécanisme qui permet à Claude de connaître les conventions du projet sans avoir à les ré-expliquer.

- Hiérarchie : `~/.claude/CLAUDE.md` (global) → `CLAUDE.md` du projet
- Peut inclure d'autres fichiers avec `@file.md`
- Peut viser des sous-dossiers avec des `CLAUDE.md` locaux

::right::

### Exemples d'instructions

- priorité à `fr.cx()` (utilitaires DSFR)
```ts
<div className={fr.cx("fr-container", "fr-py-4w")}>
```

- tss-react uniquement pour le CSS scopé
```ts
const useStyles = tss.create({ card: { borderRadius: "8px" } });
```

- Imports par composant, pas de barrel. Commentaires en FR.
- Tests et lint doivent être au vert.

---
layout: two-cols-header
comark: true

---

# Famille 2 - Savoir & instructions (2/3)

## CLAUDE.md [Bonnes pratiques]{class="fr-badge fr-badge--green-emeraude"}

::left::

### À faire

- **Concis et impératif** - une règle = une ligne
- **Exemples concrets > prose** - montrer, pas raconter
- **Lister les commandes** du projet (`npm run dev`, `make test`…)
- **Dire ce qu'il NE faut PAS faire** - les interdictions sont aussi importantes que les règles

### À éviter

- Dupliquer ce que le code dit déjà (imports évidents, structure standard)
- Des paragraphes de prose que Claude doit interpréter

::right::

::div{class="fr-highlight"}
**Règle d'or** : le CLAUDE.md est le contrat entre l'équipe et Claude. S'il est précis, la première génération de code est quasi commit-ready. S'il est vague, Claude invente.
::

::div{class="fr-highlight fr-mt-4v"}
**Commande utile** : `/init` dans Claude Code génère un CLAUDE.md à partir de l'analyse du codebase existant - bon point de départ à affiner.
::

---
layout: two-cols-header
---

# Famille 2 - Savoir & instructions (3/3)

## Skill [savoir procédural en Markdown]{class="fr-badge fr-badge--green-emeraude"}

::left::

Une skill est un **fichier Markdown** contenant un workflow, une méthodologie ou des conventions. Elle est chargée **à la demande** (~30-50 tokens), pas en permanence.

- Invocable manuellement : `/nom-de-la-skill`
- Ou chargée automatiquement par Claude quand c'est pertinent
- Peut s'exécuter dans un subagent isolé

::div{class="fr-highlight fr-mt-2w"}
**MCP = connectivité** (accès à un système externe)

**Skill = méthodologie** (savoir faire quelque chose)
::

::right::

<div class="fr-callout fr-callout--green-emeraude">
  <p class="fr-callout__title">Sur cartes.gouv.fr</p>
  <ul>
    <li><code>react-dsfr</code> - conventions d'import, composants natifs, pas de barrel, pas de MUI</li>
    <li><code>rgaa</code> - grille RGAA 4.1.2 intégrée dans chaque revue d'accessibilité</li>
    <li><code>securite-anssi</code> - règles de sécurité de l'État appliquées sur les inputs utilisateur</li>
  </ul>
</div>

---
layout: two-cols-header
---

# Famille 3 - Automatisation & parallélisme

<span class="fr-badge fr-badge--purple-glycine">Hook + Subagent</span>

::left::

### Hook

Script déclenché sur un **événement du cycle de vie** (avant/après une commande, à l'arrêt de session…). Déterministe - Claude ne réfléchit pas, le hook s'exécute.

Cas d'usage : formater à la sauvegarde, rejeter `rm -rf /`, poster un message Slack en fin de session.

### Subagent

Boucle agentique **isolée** qui renvoie un résumé. Mécanisme de parallélisation : plusieurs subagents sur des tâches indépendantes.

Types disponibles : `Explore` (lecture seule), `Plan` (architecture), `code-reviewer`, agents de workflow…

::right::

<div class="fr-callout fr-callout--purple-glycine">
  <p class="fr-callout__title">Sur cartes.gouv.fr</p>
  <p><strong>RTK (Rust Token Killer)</strong> est un hook transparent sur chaque commande Bash - chaque appel est proxifié automatiquement sans configuration par commande.</p>
  <p>Pour les tâches complexes, Claude lance des subagents en parallèle : <code>Explore</code> pour cartographier le codebase, <code>Plan</code> pour l'architecture, <code>code-reviewer</code> pour la revue.</p>
</div>

---
layout: two-cols-header
---

# Famille 4 - Packaging & distribution (1/2)

<span class="fr-badge fr-badge--pink-tuile">Plugin + Marketplace</span>

::left::

### Plugin

Un plugin **regroupe** des skills, des hooks, des subagents et des serveurs MCP en une seule unité installable.

- Namespace propre : `/mon-plugin:review`
- Plusieurs plugins coexistent sans conflit
- Créer un plugin quand l'intégration est spécifique à Claude Code ; un serveur MCP quand n'importe quel client LLM pourrait l'utiliser

### Marketplace

Dépôt GitHub distribuant plusieurs plugins sous un même registre. On s'y abonne pour accéder à une collection de skills, MCP, hooks et agents.

::right::

<div class="fr-callout fr-callout--pink-tuile">
  <p class="fr-callout__title">Sur cartes.gouv.fr</p>
  <p>16 plugins installés :</p>
  <p class="fr-text--sm">figma · playwright · serena · context7 · superpowers · feature-dev · pr-review-toolkit · commit-commands · typescript-lsp · php-lsp · claude-md-management · security-guidance · code-simplifier · claude-code-setup · karpathy-skills · headroom</p>
  <p class="fr-text--sm fr-mt-1w">Marketplace officiel Anthropic : <code>github.com/anthropics/claude-plugins-official</code></p>
</div>

---
layout: two-cols-header
---

# Famille 4 - Packaging & distribution (2/2)

<span class="fr-badge fr-badge--pink-tuile">Les plugins qui changent la donne</span>

::left::

<div style="font-size: 0.82rem">
<div class="fr-tile fr-tile--horizontal fr-tile--sm fr-mb-1w">
  <div class="fr-tile__body">
    <p class="fr-tile__title">context7</p>
    <p class="fr-tile__desc">Doc à jour des libs/frameworks injectée dans le contexte - évite les API hallucinées</p>
  </div>
</div>
<div class="fr-tile fr-tile--horizontal fr-tile--sm fr-mb-1w">
  <div class="fr-tile__body">
    <p class="fr-tile__title">superpowers</p>
    <p class="fr-tile__desc">Méthodologie câblée : brainstorming, TDD, debugging systématique, plans d'implémentation</p>
  </div>
</div>
<div class="fr-tile fr-tile--horizontal fr-tile--sm fr-mb-1w">
  <div class="fr-tile__body">
    <p class="fr-tile__title">feature-dev</p>
    <p class="fr-tile__desc">Dev de feature guidé : architecte + explorer + reviewer en agents spécialisés</p>
  </div>
</div>
</div>

::right::

<div style="font-size: 0.82rem">
<div class="fr-tile fr-tile--horizontal fr-tile--sm fr-mb-1w">
  <div class="fr-tile__body">
    <p class="fr-tile__title">pr-review-toolkit</p>
    <p class="fr-tile__desc">Revue de PR multi-agents : bugs, sécurité, tests, design des types</p>
  </div>
</div>
<div class="fr-tile fr-tile--horizontal fr-tile--sm fr-mb-1w">
  <div class="fr-tile__body">
    <p class="fr-tile__title">typescript-lsp / php-lsp</p>
    <p class="fr-tile__desc">Diagnostics LSP en direct - adaptés au stack cartes.gouv.fr (React/TS + Symfony/PHP)</p>
  </div>
</div>
<div class="fr-tile fr-tile--horizontal fr-tile--sm">
  <div class="fr-tile__body">
    <p class="fr-tile__title">commit-commands</p>
    <p class="fr-tile__desc">Commit + push + PR en une seule commande <code>/commit</code></p>
  </div>
</div>
</div>

---
layout: two-cols-header
---

# Mon setup - En pratique

::left::

<span class="fr-badge fr-badge--blue-ecume fr-mb-2w">MCPs</span>

- **Figma** - design → code direct
- **Playwright** - vérif. rendu live
- **Serena** - navigation sémantique

<span class="fr-badge fr-badge--green-emeraude fr-mt-2w fr-mb-2w">Skills perso</span>

- `react-dsfr` - composants DSFR natifs
- `rgaa` - audit accessibilité RGAA 4.1
- `securite-anssi` - règles sécu État

<span class="fr-badge fr-badge--purple-glycine fr-mt-2w fr-mb-2w">Hook</span>

**RTK** - proxy Bash transparent, **-85 % sur la sortie des CLI** (eslint, grep, git…)

::right::

<span class="fr-badge fr-badge--pink-tuile fr-mb-2w">16 plugins</span>

figma · playwright · serena · context7
superpowers · feature-dev · pr-review-toolkit
commit-commands · typescript-lsp · php-lsp…

<span class="fr-badge fr-badge--brown-caramel fr-mt-2w fr-mb-2w">Commandes utiles</span>

**Slash commands :**
`/figma-use` · `/commit` · `/clear` · `/model` · `/fast`

**RTK direct :**
```bash
rtk gain              # stats tokens économisés
rtk gain --history    # historique par commande
rtk discover          # commandes non-proxifiées
```

---
layout: center
---

# Le workflow

<div class="flex flex-col items-center gap-3 fr-mt-2w text-lg">
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #e3e3fd; border-color: var(--blue-france)">
    <strong>URL nœud Figma</strong> - <em>ou</em> - <strong>Issue GitHub + Figma lié</strong>
  </div>
  <div style="color: #6b6b6b">↓ get_design_context + screenshot</div>
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #e8d5fd; border-color: #5b0fa8">
    <strong>Claude Code</strong> - plan-first + CLAUDE.md du projet + skills
  </div>
  <div style="color: #6b6b6b">↓ rendu conforme DSFR + RGAA</div>
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #d7f5e3; border-color: #18753c">
    <strong>Composants générés</strong> (React, HTML, ou autre selon le stack)
  </div>
  <div style="color: #6b6b6b">↓ Playwright - vérification rendu live</div>
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #fff6da; border-color: #716143">
    <strong>Itération UX</strong> → commit
  </div>
</div>

---
layout: center
class: text-center
---

# Démo : design vers DSFR + RGAA

<!-- Placer le clip enregistré dans slides/public/demo-hero.mp4 -->
<!-- Décommenter la ligne video ci-dessous une fois le clip enregistré -->
<!-- <video class="mx-auto rounded-xl shadow-2xl" style="max-height: 65vh" autoplay loop muted src="/demo-hero.mp4" /> -->

<div class="fr-mt-2w fr-callout max-w-2xl mx-auto text-left">
  <p class="fr-callout__title">Prompt réel utilisé</p>
  <code class="fr-text--sm">
    « L'ajout d'une licence ouverte m'a l'air avoir un souci.
    À ma compréhension, ça doit ajouter seulement les éléments
    de ce design figma.com/design/[...] et rien d'autre »
  </code>
  <div class="fr-mt-2w fr-callout__title" style="font-size: 0.9rem">Ce qui se passe</div>
  <ol class="fr-text--sm" style="list-style: decimal inside">
    <li>Claude appelle <code>get_design_context</code> sur le nœud Figma</li>
    <li>Charge le skill <code>react-dsfr</code> pour les conventions DSFR</li>
    <li>Génère les composants conformes DSFR <em>et</em> RGAA</li>
    <li>Playwright vérifie le rendu dans le navigateur</li>
    <li>Itération sur les détails UX</li>
  </ol>
</div>

---
layout: center
class: text-center
---

# RTK - Réduction du bruit

<div class="stat-success" style="font-size: 5rem; font-weight: 700; line-height: 1.1">85,4 %</div>
<div class="fr-text--lg" style="color: #6b6b6b">de réduction sur la <strong>sortie des CLI courantes</strong></div>

<div class="fr-alert fr-alert--info fr-alert--sm fr-mt-2w max-w-2xl mx-auto text-left" role="alert">
  <p>RTK filtre la verbosité d'outils comme ESLint (-98,7 %), grep ou git - <strong>pas</strong> l'ensemble des tokens d'une session. Utile pour réduire le bruit, pas indispensable.</p>
</div>

<div class="flex justify-center gap-16 fr-mt-2w">
  <div class="text-center">
    <div style="font-size: 2rem; font-weight: 700">3 004</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">commandes</div>
  </div>
  <div class="text-center">
    <div style="font-size: 2rem; font-weight: 700">98,7 %</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">sur ESLint</div>
  </div>
  <div class="text-center">
    <div style="font-size: 2rem; font-weight: 700">5,9 M</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">tokens filtrés via <code>rtk read</code></div>
  </div>
</div>

---
layout: two-cols-header
---

# Pourquoi ça marche

::left::

### Le CLAUDE.md du projet

Les conventions du codebase dans le contexte de *chaque* session :

```ts
// fr.cx() d'abord (classes utilitaires DSFR)
<div className={fr.cx("fr-container", "fr-py-4w")}>

// tss-react uniquement pour le CSS scopé runtime
const useStyles = tss.create({ card: { borderRadius: "8px" } });
```

::right::

### Les skills perso

La connaissance métier directement câblée :

- `react-dsfr` : imports par composant, pas de barrel, pas de MUI
- `rgaa` : grille RGAA 4.1.2 intégrée dans chaque revue
- `securite-anssi` : règles de sécurité État

<div class="fr-highlight fr-mt-2w">
  <p><strong>Résultat :</strong> Claude écrit du code qui ressemble au codebase existant. Première génération = quasi commit-ready.</p>
</div>

---
layout: two-cols-header
---

# Questions fréquentes

::left::

<div style="font-size: 0.85rem">
<div class="fr-callout fr-callout--brown-caramel fr-py-1w fr-px-2w fr-mb-1w">
  <p class="fr-callout__title fr-text--sm">Ça remplace les développeurs ?</p>
  <p>Non. Claude génère un brouillon correct - le développeur valide, affine et décide. Les tâches aidées : design vers composant DSFR, code répétitif conforme aux conventions, audit RGAA.</p>
</div>
<div class="fr-callout fr-callout--brown-caramel fr-py-1w fr-px-2w fr-mb-1w">
  <p class="fr-callout__title fr-text--sm">C'est sécurisé ? Vous envoyez votre code ?</p>
  <p>Le code source (pas les données utilisateurs) est envoyé à l'API Anthropic. Anthropic ne réutilise pas les données des clients API pour entraîner ses modèles (politique Enterprise). RTK filtre localement avant envoi.</p>
</div>
</div>

::right::

<div style="font-size: 0.85rem">
<div class="fr-callout fr-callout--brown-caramel fr-py-1w fr-px-2w fr-mb-1w">
  <p class="fr-callout__title fr-text--sm">Combien ça coûte ?</p>
  <p>Abonnement Claude Code (Pro/Enterprise) + tokens API si hors plan. RTK réduit significativement le coût sur les opérations courantes (CLI). Voir les stats RTK pour l'ordre de grandeur.</p>
</div>
<div class="fr-callout fr-callout--brown-caramel fr-py-1w fr-px-2w">
  <p class="fr-callout__title fr-text--sm">Il hallucine ?</p>
  <p>Oui, parfois. Les skills et CLAUDE.md réduisent les erreurs de convention. Playwright détecte les erreurs de rendu en live. Le workflow plan-first permet de valider avant que le code ne s'écrive.</p>
</div>
</div>

---
layout: two-cols-header
---

# Démarrer & ressources

::left::

<div style="font-size: 0.85rem">

### Démarrer en 5 min

<ol style="list-style: decimal inside; line-height: 2">
  <li><code>npm install -g @anthropic-ai/claude-code</code></li>
  <li><code>claude</code> dans ton projet</li>
  <li>Crée un <code>CLAUDE.md</code> avec les conventions clés (<code>/init</code>)</li>
  <li><code>/plugin install figma</code></li>
  <li>Colle une URL de nœud Figma et demande l'implémentation</li>
</ol>
</div>

::right::

<div style="font-size: 0.85rem">

### Liens

<ul style="line-height: 2">
  <li><strong>Claude Code</strong> - <code>claude.ai/code</code></li>
  <li><strong>Docs MCP</strong> - <code>docs.claude.com/en/docs/claude-code/mcp</code></li>
  <li><strong>react-dsfr</strong> - <code>github.com/codegouvfr/react-dsfr</code></li>
  <li><strong>DSFR officiel</strong> - <code>systeme-de-design.gouv.fr</code></li>
  <li><strong>cartes.gouv.fr</strong> - <code>github.com/IGNF/cartes.gouv.fr</code></li>
  <li><strong>Plugins officiel</strong> - <code>github.com/anthropics/claude-plugins-official</code></li>
</ul>
</div>

<div class="absolute bottom-6 left-0 right-0 text-center fr-text--sm" style="color: #6b6b6b">
  ← → pour naviguer · Posez-moi des questions !
</div>
