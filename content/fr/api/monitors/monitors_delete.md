---
title: Supprimer un monitor
type: apicontent
order: 27.05
external_redirect: /api/#supprimer-un-monitor
---

## Supprimer un monitor

**ARGUMENTS** :

Lorsqu'un monitor est utilisé ailleurs, cet endpoint renvoie une erreur, car le monitor est référencé.

* **`force`** [*facultatif*, *défaut*=**False**] :

    booléen : force la suppression du monitor. Le monitor est supprimé, même s'il est référencé par d'autres ressources (p. ex., un SLO ou un monitor composite).
