---
title: Désactiver un hôte
type: apicontent
order: 13.3
external_redirect: /api/#desactiver-un-hote
---

## Désactiver un hôte
##### ARGUMENTS

* **`end`** [*facultatif*, *défaut* = **None**] :  
    Timestamp POSIX du moment où l'hôte est réactivé. S'il est omis, l'hôte reste désactivé jusqu'à ce qu'il soit explicitement réactivité.
* **`message`** [*facultatif*, *défaut* = **None**] :  
    Message à associer à la désactivation de cet hôte.
* **`override`** [*facultatif*, *défaut* = **False**] :
    Si la valeur est true et l'hôte est déjà désactivé, remplace les paramètres de désactivation de l'hôte existants.
