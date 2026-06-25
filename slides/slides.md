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
  <span class="fr-tag">concepts</span>
  <span class="fr-tag">mcp</span>
  <span class="fr-tag">skills</span>
  <span class="fr-tag">hooks</span>
  <span class="fr-tag">plugins</span>
  <span class="fr-tag">workflow</span>
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
              <td>Connexion à un service externe (figma, slack, notion…)</td>
            </tr>
            <tr>
              <td><strong>Skill</strong></td>
              <td>Savoir procédural décrit en Markdown, chargé à la demande</td>
            </tr>
            <tr>
              <td><strong>Memory</strong><img src="/icons/claudecode-color.svg"></td>
              <td>Faits persistants entre sessions, rappelés selon leur pertinence au contexte courant</td>
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

---
layout: two-cols-header
---

# Capacités & accès

::left::

## Tool

Les capacités **natives** de Claude Code : lire/écrire des fichiers, chercher, exécuter des commandes, accéder au web. On les étend via MCP.

## MCP

Standard ouvert Anthropic. Un serveur MCP expose trois types de capacités :

- **Ressources** - données en lecture seule
- **Tools** - actions (créer un ticket, envoyer un message…)
- **Prompts** - templates réutilisables

::right::

::div{class="fr-callout fr-callout--blue-ecume fr-mx-4v"}
<p class="fr-callout__title">Un seul serveur, plusieurs clients</p>

Le même serveur MCP fonctionne dans **Claude Code, Copilot, Cursor, OpenCode**…

MCP est agnostique du client LLM. Installer un serveur une fois, l'utiliser partout.
::

---
layout: two-cols-header
---

# Savoir & instructions

## CLAUDE.md - Quoi & pourquoi

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

- Imports par composant, pas de barrel.
- Commentaires en français, noms des variables en anglais.
- Tests et lint doivent être au vert.

Exemple réel : `github.com/IGNF/cartes.gouv.fr/blob/main/CLAUDE.md`

---
layout: two-cols-header
---

# Savoir & instructions

## CLAUDE.md - Bonnes pratiques

::left::

### À faire

- **Concis et impératif** - une règle = une ligne
- **Exemples concrets > prose** - montrer, pas raconter
- **Lister les commandes** du projet (`npm run dev`, `npm run test`, `npm run lint`)
- **Dire ce qu'il NE faut PAS faire** - les interdictions sont aussi importantes que les règles

### À éviter

- Dupliquer ce que le code dit déjà (imports évidents, structure standard)
- Des paragraphes de prose que Claude doit interpréter

::right::

::div{class="fr-highlight"}
**Règle d'or** : le CLAUDE.md est le contrat entre l'équipe développeur et Claude. La qualité du code produit dépend largement de la précision de ces instructions. S'il est vague, Claude va inventer des choses.
::

::div{class="fr-highlight fr-mt-4v"}
**Commande utile** : `/init` dans Claude Code génère un CLAUDE.md à partir de l'analyse du codebase existant - bon point de départ **à affiner**.
::

---
layout: two-cols-header
---

# Savoir & instructions

## Memory

::left::

Faits persistants entre sessions, **stockés en fichiers Markdown** (un fait par fichier, frontmatter `type`). Un index `MEMORY.md` est chargé à chaque session.

Types : `user` · `feedback` · `project` · `reference`

### Comment la mémoire se nourrit

- Claude **écrit lui-même** un fait quand il rencontre une préférence ou contrainte digne d'être retenue
- On peut demander explicitement (« retiens ça » ou `/remember`)
- Fichiers **éditables à la main** ; Claude déduplique avant d'écrire

::right::

::div{class="fr-callout fr-callout--green-emeraude"}
<p class="fr-callout__title">CLAUDE.md vs Memory</p>

**CLAUDE.md** - toujours injecté dans le contexte (contrat projet, présent à chaque session).

**Memory** - rappelée seulement quand pertinente, pas en permanence. Zéro surcharge token.

Exemples : « préfère le CSS DSFR natif », « jamais de tiret cadratin ».
::

---
layout: two-cols-header
---

# Savoir & instructions

## Skill - Savoir procédural en Markdown

::left::

Une skill est un **fichier Markdown** contenant un workflow, une méthodologie ou des conventions. Elle est chargée **à la demande**, pas en permanence.

- Invocable manuellement : `/nom-de-la-skill`
- Ou chargée automatiquement par Claude quand c'est pertinent
- Peut s'exécuter dans un subagent isolé

::div{class="fr-highlight fr-mt-2w"}
**MCP = connectivité** (accès à un système externe)

**Skill = méthodologie** (savoir faire quelque chose)
::

::right::

### Exemples de skills

- `react-dsfr` - conventions d'import, composants natifs, pas de barrel, pas de MUI
- `rgaa` - grille RGAA 4.1.2 intégrée dans chaque revue d'accessibilité
- `securite-anssi` - règles de sécurité de l'État appliquées sur les inputs utilisateur
- `tdd` - red/green/refactor à chaque nouvelle fonctionnalité
- `systematic-debugging` - diagnostic avant correction

---
layout: two-cols-header
---

# Automatisation & parallélisme

::left::

## Hook

Script déclenché sur un **événement du cycle de vie** (avant/après une commande, à l'arrêt de session…). Déterministe : Claude ne réfléchit pas, le hook s'exécute.

Cas d'usage : formater à la sauvegarde, rejeter `rm -rf /`, poster un message Slack en fin de session, proxifier les sorties CLI.

## Subagent

Boucle agentique **isolée** qui renvoie un résumé. Mécanisme de parallélisation : plusieurs subagents sur des tâches indépendantes.

Types disponibles : `Explore` (lecture seule), `Plan` (architecture), `code-reviewer`, agents de workflow…

::right::

::div{class="fr-callout fr-callout--purple-glycine"}
<p class="fr-callout__title">Parallélisation concrète</p>

Pour une feature complexe, Claude lance des subagents en parallèle :

- `Explore` - cartographie du codebase
- `Plan` - architecture de la solution
- `code-reviewer` - revue du code produit

Chaque subagent a son propre contexte et retourne un résumé à l'agent parent.
::

---
layout: two-cols-header
---

# Packaging & distribution

::left::

## Plugin

Un plugin **regroupe** des skills, des hooks, des subagents et des serveurs MCP en une seule unité installable.

- Namespace propre : `/mon-plugin:review`
- Plusieurs plugins coexistent sans conflit
- **Plugin vs MCP** - Plugin quand l'intégration est propre à Claude Code ; MCP quand n'importe quel client LLM pourrait l'utiliser.
- **Marketplace** - Registre GitHub : s'abonner = accéder à une collection de skills, MCP, hooks et agents.

::right::

::div{class="fr-callout fr-callout--pink-tuile"}
<p class="fr-callout__title">Marketplace officiel Anthropic</p>

`github.com/anthropics/claude-plugins-official`

Installation en une commande :

`/marketplace install github.com/anthropics/claude-plugins-official`
::

---
layout: two-cols-header
---

# MCP à installer

[Rôle · Quand · Install]{.fr-badge .fr-badge--blue-ecume}

::left::

<div style="font-size: 0.82rem">

**Figma** - lit le design (nœud → données structurées + screenshot) directement dans Claude.
Quand : à chaque fois que tu implémente un composant à partir d'un design Figma.
`/plugin install figma` · [docs.figma.com/api](https://www.figma.com/developers/api)

<hr style="margin: 0.5rem 0; border-color: #e5e5e5">

**Playwright** - pilote un navigateur réel, vérifie le rendu live sans quitter Claude.
Quand : pour valider qu'un composant rendu correspond au design (pas seulement que le code compile).
`/plugin install playwright` · [playwright.dev](https://playwright.dev/docs/api/class-page)

</div>

::right::

<div style="font-size: 0.82rem">

**Serena** - navigation sémantique au niveau du symbole (classes, fonctions, interfaces).
Quand : sur un gros codebase où lire chaque fichier coûte trop de tokens.
`/plugin install serena` · [github.com/oraios/serena](https://github.com/oraios/serena)

<hr style="margin: 0.5rem 0; border-color: #e5e5e5">

**context7** - injecte la doc à jour des libs/frameworks dans le contexte.
Quand : dès qu'on travaille avec une lib versionée (évite les API hallucinées).
`/plugin install context7` · [context7.com](https://context7.com)

</div>

---
layout: two-cols-header
---

# Skills

[Rôle · Quand · Install]{.fr-badge .fr-badge--green-emeraude}

::left::

**react-dsfr** - conventions d'import, composants natifs, `fr.cx()`, pas de barrel, pas de MUI.
Quand : sur tout projet utilisant `@codegouvfr/react-dsfr`.
`/marketplace install` + dépôt skills DSFR

<p></p>

**rgaa** - grille RGAA 4.1.2 intégrée automatiquement dans chaque revue.
Quand : avant toute PR touchant du HTML/JSX visible.
`/marketplace install` + dépôt skills accessibilité

::right::

**securite-anssi** - règles de sécurité de l'État sur les inputs, les headers, les dépendances.
Quand : sur tout projet exposé au public ou traitant des données personnelles.
`/marketplace install` + dépôt skills sécurité

::div{class="fr-callout fr-callout--green-emeraude fr-mt-2w"}
<p class="fr-callout__title">À retenir</p>

Une skill s'installe une fois, s'active à la demande (`/nom`) ou automatiquement par Claude.
Elle n'est pas dans le contexte en permanence - pas de surcharge token.
::

---
layout: two-cols-header
---

# Hook - RTK (Rust Token Killer)

[Rôle · Quand · Install]{.fr-badge .fr-badge--purple-glycine}

::left::

**Rôle** : proxy transparent sur chaque commande Bash. Filtre la verbosité des CLI avant qu'elle n'entre dans le contexte Claude.

**Quand** : dès qu'on utilise des outils verbeux dans la session (ESLint, grep, git, jest…). Le hook s'enregistre une fois, s'applique à toutes les commandes automatiquement.

**Install** : [rtk-ai.app/#install](https://www.rtk-ai.app/#install)

::right::

<div class="fr-callout fr-callout--purple-glycine">
  <p class="fr-callout__title">Chiffres réels</p>
  <div class="flex gap-8 fr-mt-1w">
    <div class="text-center">
      <div style="font-size: 2rem; font-weight: 700">85,4 %</div>
      <div style="color: #6b6b6b; font-size: 0.8rem">réduction sortie CLI courante</div>
    </div>
    <div class="text-center">
      <div style="font-size: 2rem; font-weight: 700">98,7 %</div>
      <div style="color: #6b6b6b; font-size: 0.8rem">sur ESLint</div>
    </div>
  </div>
  <p class="fr-mt-2w fr-text--sm">Stats locales via <code>rtk gain</code> / <code>rtk gain --history</code> / <code>rtk discover</code></p>
</div>

---
layout: two-cols-header
---

# Plugins qui changent la donne

[Rôle · Quand · Install : `/plugin install nom`]{.fr-badge .fr-badge--pink-tuile}

::left::

::div{style="font-size: 0.82rem; line-height: 1.4"}
**superpowers** - Méthodologie câblée : brainstorming, TDD, debugging systématique, plans. Quand : toujours.

**feature-dev** - Architecte + explorer + reviewer en agents spécialisés. Quand : avant chaque feature.

**pr-review-toolkit** - Revue multi-agents : bugs, sécurité, tests, types. Quand : avant chaque merge.
::

::right::

::div{style="font-size: 0.82rem; line-height: 1.4"}
**typescript-lsp / php-lsp** - Diagnostics LSP en direct dans Claude. Quand : stack TS ou PHP.

**commit-commands** - Commit + push + PR en une commande `/commit`. Quand : toujours.

**claude-md-management** - Maintient le CLAUDE.md à jour depuis les sessions passées. Quand : après chaque sprint.
::

---

# Le workflow

<div class="flex flex-col items-center gap-3 fr-mt-2w text-lg">
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #e3e3fd; border-color: var(--blue-france)">
    <strong>URL Figma</strong> - <em>et/ou</em> - <strong>Issue GitHub</strong>
  </div>
  <div style="color: #6b6b6b">↓ get_design_context + screenshot + librairie DSFR figma</div>
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #e8d5fd; border-color: #5b0fa8">
    <strong>Claude Code</strong> - plan-first + CLAUDE.md du projet + skills react-dsfr + rgaa
  </div>
  <div style="color: #6b6b6b">↓ rendu conforme DSFR + RGAA</div>
  <div class="fr-callout fr-py-1w fr-px-3w" style="background: #d7f5e3; border-color: #18753c">
    <strong>Composants générés</strong> (React, HTML, ou autre selon le stack)
  </div>
  <div style="color: #6b6b6b">↓ Playwright - vérification rendu live dans le navigateur</div>
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

::div{class="fr-mt-2w fr-callout max-w-2xl mx-auto text-left"}
<p class="fr-callout__title">Prompt réel utilisé</p>

`« L'ajout d'une licence ouverte m'a l'air avoir un souci. À ma compréhension, ça doit ajouter seulement les éléments de ce design figma.com/design/[...] et rien d'autre »`

**Ce que Claude fait automatiquement**

- Appelle `get_design_context` sur le nœud Figma
- Charge les skills `react-dsfr` et `rgaa`
- Génère les composants conformes DSFR *et* RGAA
- Playwright vérifie le rendu dans le navigateur
- Itère sur les détails UX jusqu'à validation
::

---
layout: center
class: text-center
---

# À retenir

<div class="flex justify-center gap-12 fr-mt-4w fr-mb-4w">
  <div class="text-center">
    <div class="fr-badge fr-badge--blue-ecume fr-mb-1w">Acte 1</div>
    <div style="font-weight: 600">Concepts</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">Tool · MCP · Skill · Memory<br>Hook · Subagent · Plugin</div>
  </div>
  <div style="font-size: 2rem; color: #6b6b6b; align-self: center">→</div>
  <div class="text-center">
    <div class="fr-badge fr-badge--green-emeraude fr-mb-1w">Acte 2</div>
    <div style="font-weight: 600">Outillage</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">Figma · Playwright · Serena<br>context7 · RTK · plugins</div>
  </div>
  <div style="font-size: 2rem; color: #6b6b6b; align-self: center">→</div>
  <div class="text-center">
    <div class="fr-badge fr-badge--pink-tuile fr-mb-1w">Acte 3</div>
    <div style="font-weight: 600">Workflow</div>
    <div style="color: #6b6b6b; font-size: 0.85rem">Figma → DSFR + RGAA<br>Playwright → commit</div>
  </div>
</div>

<div class="fr-highlight max-w-2xl mx-auto text-left">
  CLAUDE.md + skills = première génération quasi commit-ready. Claude écrit du code qui ressemble au codebase existant.
</div>

<div class="fr-mt-4w fr-text--sm" style="color: #6b6b6b">
  <code>github.com/IGNF/cartes.gouv.fr</code>
  &nbsp;·&nbsp;
  ← → pour naviguer · Des questions ?
</div>
