---
title: Mettre à jour les tags d'un host
type: apicontent
order: 32.4
external_redirect: '/api/#mettre-a-jour-les-tags-d-un-host'
---
## Mettre à jour les tags d'un host
Cet endpoint vous permet de mettre à jour/remplacer tous les tags d'une source d'intégration par les tags fournis dans la requête.

**ARGUMENTS**:

* **`tags`** [*obligatoire*] :
    Une liste de tags.
* **`source`** [*facultatif*, *défaut*=**users**] :
    La source des tags (p. ex., chef, puppet).
    [Liste complète des valeurs d'attributs source][1]

[1]: /fr/integrations/faq/list-of-api-source-attribute-value