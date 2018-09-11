---
title: Mettre en sourdine un serveur
type: apicontent
order: 13.3
external_redirect: /api/#mute-a-host
---

## Mettre en sourdine un serveur

**ARGUMENTS**:

* **`end`** [*optionnel*, *défaut*=**None**]:  
    Timestamp POSIX lorsque l'hôte est désactivé. S'il est omis, l'hôte reste muet jusqu'à ce qu'il soit explicitement désactivé.
* **`message`** [*optionnel*, *défaut*=**None**]:  
    Message à associer à la désactivation de cet hôte.
* **`override`** [*optionnel*, *défaut*=**False**]:  
    Si la valeur est true et que l'hôte est déjà désactivé, remplace les paramètres de désactivation de l'hôte existants.
