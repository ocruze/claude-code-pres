# Clip 02 : RTK, économies de tokens en temps réel

**Durée cible :** 30 à 45 secondes
**Outil :** asciinema (enregistrement terminal) ou capture OBS du terminal seul
**Sortie :** `slides/public/demo-rtk.cast` (asciinema) ou `slides/public/demo-rtk.mp4`

---

## Pré-requis

- RTK installé et fonctionnel : `rtk --version` doit répondre.
- Se placer dans `~` (hors de tout projet) pour avoir les stats globales.

---

## Option A : asciinema (recommandé, format léger et boucle)

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

## Option B : capture OBS du terminal

Lancer dans un terminal avec grande police (18 px) :

```bash
rtk gain
```

**Ce qui doit être visible :**
- Total commands : **3 004**
- Tokens saved : **9 012 543 (85,4 %)**
- Top saver : `rtk read` : 5,9 M tokens

Puis :
```bash
rtk gain --history
```

Montrer 5 à 6 lignes récentes avec les pourcentages d'économie par commande.

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
