---
title: Ajouter des tags à un host
type: apicontent
order: 20.3
external_redirect: /api/#add-tags-to-a-host
---

## Ajouter des tags à un host
Cet endpoint vous permet d'ajouter des tags à un host.

##### ARGUMENTS

* **`tags`** [*obligatoire*]:  
    Une liste de tags à appliquer à l'host.
* **`source`** [*optionnel*, *défaut*=**users**]:  
    La source des tags (par exemple, chef, puppet).
    [Liste complète des valeurs d'attribut source](/integrations/faq/list-of-api-source-attribute-value)