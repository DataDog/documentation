---
title: Désactiver un host
type: apicontent
order: 14.3
external_redirect: /api/#desactiver-un-host
---

## Désactiver un host

**ARGUMENTS**:

* **`end`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    timestamp POSIX du moment où le host est réactivé. S'il est omis, le host reste désactivé jusqu'à ce qu'il soit explicitement réactivité.
* **`message`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    message à associer à la désactivation de ce host.
* **`override`** [*facultatif*, *défaut*=**False**] :
    si la valeur est true et le host est déjà désactivé, remplace les paramètres de désactivation du host existants.
