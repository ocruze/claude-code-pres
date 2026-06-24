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
