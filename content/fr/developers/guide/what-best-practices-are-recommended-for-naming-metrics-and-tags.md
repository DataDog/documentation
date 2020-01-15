---
title: "Quelles sont les bonnes pratiques à adopter pour nommer les métriques et les tags\_?"
kind: faq
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques Datadog
  - link: /tagging
    tag: Documentation
    text: Débuter avec les tags
aliases:
  - /fr/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---
Datadog recommande certaines bonnes pratiques pour nommer les métriques et les tags.

**Règles et bonnes pratiques pour nommer les métriques** :

* Les noms des métriques doivent commencer par une lettre.
* Ils doivent uniquement contenir des caractères alphanumériques ASCII, des underscores et des points. Les autres caractères sont convertis en underscores.
* Ils ne doivent pas dépasser 200 caractères (moins de 100 caractères sont toutefois conseillés pour une meilleure lisibilité sur l'interface).
* La norme Unicode n'est pas prise en charge.
* Il est conseillé d'éviter les espaces.

Les métriques renvoyées par l'Agent respectent un format pseudo hiérarchique où chaque élément est séparé par un point (par exemple, `http.nginx.response_time`). Le format est pseudo hiérarchique car aucune hiérarchie n'est véritablement appliquée, mais la structure est utilisée pour déduire certaines relations (par exemple, si hostA et hostB renvoient tous les deux http.nginx.*, il doit s'agir de front-ends web).

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

**Règles et bonnes pratiques pour nommer les tags** :

* Les tags doivent commencer par une lettre.
* Ils peuvent contenir des caractères alphanumériques, des underscores, des signes moins, des deux-points, des points et des barres obliques. Les autres caractères sont convertis en underscores.
* Les noms de tag peuvent comporter jusqu'à 200 caractères et prennent en charge la norme Unicode.
* Les tags sont convertis en minuscule.
* Pour un fonctionnement optimal, nous conseillons d'utiliser la syntaxe `key:value`.

Les clés de tag de métrique fréquemment utilisées comprennent `env`, `instance`, `name` et `role`.

{{< partial name="whats-next/whats-next.html" >}}