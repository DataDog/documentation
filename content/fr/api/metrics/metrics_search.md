---
title: Rechercher des métriques
type: apicontent
order: 26.6
external_redirect: '/api/#rechercher-des-metriques'
---
## Rechercher des métriques
Cet endpoint vous permet de rechercher des métriques parmi celles recueillies au cours des dernières 24 heures dans Datadog.


**ARGUMENTS**:

* `q` [*obligatoire*] :
  la chaîne de requête utilisée pour la recherche de métriques.
  Doit commencer par `metrics:`

**Remarque** : le préfixe `host:` est également pris en charge pour rechercher des hostnames, mais il est maintenant obsolète. Utilisez l'[endpoint de recherche de host][1] à la place.
[1]: /fr/api/?lang=bash#search-hosts