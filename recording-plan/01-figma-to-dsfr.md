# Clip 01 : Figma → composant react-dsfr

**Durée cible :** 60 à 90 secondes (boucle fluide)
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

### Acte 1 : Coller le nœud Figma (10 s)

Saisir ce prompt dans Claude Code (session dans `demo-app/`) :

```
Implémente ce design Figma en React avec react-dsfr :
[FIGMA_NODE_URL]

Crée un composant autonome dans src/components/DemoSection.tsx
et intègre-le dans App.tsx sous l'Alert existante.
Utilise uniquement des composants @codegouvfr/react-dsfr natifs.
```

**Montrer à l'écran :** le prompt complet visible avant d'appuyer sur Entrée.

### Acte 2 : Claude analyse le design (20 s)

Claude appelle `get_design_context` puis `get_screenshot`. Laisser tourner.
**Montrer à l'écran :** les appels MCP Figma dans le log Claude Code (en-têtes verts).

### Acte 3 : Code généré (20 s)

Claude écrit `src/components/DemoSection.tsx`.
**Montrer à l'écran :** défilement du code généré dans l'éditeur, imports DSFR par composant visibles.

### Acte 4 : Rendu dans le navigateur (10 s)

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
