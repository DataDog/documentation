---
title: Récupérer les tags d'un host
type: apicontent
order: 20.2
external_redirect: /api/#get-host-tags
---

## Récupérer les tags d'un host
Renvoie la liste des tags qui s'appliquent à un host donné.

##### ARGUMENTS
* **`source`** [*optionnel*, *défaut*=**None**]:  
    Affiche uniquement les tags d'une source particulière Sinon, montre tous les tags.
    [Liste complète des valeurs d'attribut source](/integrations/faq/list-of-api-source-attribute-value)
* **`by_source`** [*optionnel*, *défaut*=**False**]:  
   Renvoie les tags groupés par source.