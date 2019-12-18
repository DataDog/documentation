---
title: Ajouter des tags à un host
type: apicontent
order: 32.3
external_redirect: '/api/#ajouter-des-tags-a-un-host'
---
## Ajouter des tags à un host
Cet endpoint vous permet d'ajouter de nouveaux tags à un host. Vous pouvez également spécifier d'où proviennent ces tags si vous le souhaitez.

**ARGUMENTS**:

* **`tags`** [*obligatoire*] :
    La liste des tags à appliquer au host.
* **`source`** [*facultatif*, *défaut*=**users**] :
    La source des tags (p. ex., chef, puppet).
    [Liste complète des valeurs d'attributs source][1]

[1]: /fr/integrations/faq/list-of-api-source-attribute-value