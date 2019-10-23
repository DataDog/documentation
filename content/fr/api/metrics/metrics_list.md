---
title: Récupérer la liste des métriques actives
type: apicontent
order: 25.1
external_redirect: '/api/#recuperer-la-liste-des-metriques-actives'
---
## Récupérer la liste des métriques actives

<mark>Cet endpoint n'est pas pris en charge dans la bibliothèque client Ruby de Datadog. Pour demander cette fonctionnalité, contactez l’[assistance Datadog][1].</mark>

Obtenez la liste des métriques de reporting actives depuis une date précise. Cet endpoint n'est pas disponible dans les bibliothèques Python et Ruby.

**ARGUMENTS**:

* **`from`** [*obligatoire*] :
    secondes depuis l'epoch Unix
* **`host`** [*facultatif*] :
    le hostname qui permet de filtrer la liste des métriques renvoyées. Si ce paramètre est défini, les métriques récupérées sont celles avec le tag de hostname correspondant.

[1]: /fr/help