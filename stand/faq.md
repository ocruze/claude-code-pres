# FAQ : Stand Claude Code

Questions anticipées et réponses < 30 s.

---

## « Ça remplace les développeurs ? »

Non. Claude génère un brouillon correct en connaissant les conventions du projet - le développeur
valide, affine et décide. C'est un accélérateur, pas un remplaçant. Les tâches où ça aide vraiment :
convertir un design Figma en composants DSFR, rédiger du code répétitif conforme aux conventions,
et repérer les problèmes d'accessibilité RGAA.

---

## « Comment Claude connaît nos conventions ? »

Deux mécanismes :
1. **CLAUDE.md** dans le dépôt - les règles du projet (imports DSFR, fr.cx, tss-react, commentaires
   FR...) sont injectées dans chaque session.
2. **Skills perso** (`react-dsfr`, `rgaa`, `securite-anssi`) - règles métier et design system câblées
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
RTK économise **85 %** des tokens sur les opérations courantes - ce qui réduit significativement
le coût API. Sur mon usage (3 004 commandes, 9 M tokens économisés), l'économie est substantielle
pour du dev quotidien.

---

## « Et le RGAA / l'accessibilité ? »

Le skill `rgaa` est directement dans le contexte Claude : il connaît la grille RGAA 4.1.2.
Je peux demander un audit d'accessibilité d'un composant React et Claude génère une liste de
points de conformité et de non-conformité avec les critères RGAA correspondants. C'est un filet
de sécurité, pas un auditeur officiel - mais ça permet d'attraper les problèmes courants tôt.

---

## « Il fait des erreurs / des hallucinations ? »

Oui, parfois. Les erreurs les plus fréquentes :
- Un composant DSFR nommé légèrement différemment : le CLAUDE.md et la skill react-dsfr réduisent
  ça drastiquement.
- Des props imaginaires : Playwright détecte les erreurs de rendu en live.

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
