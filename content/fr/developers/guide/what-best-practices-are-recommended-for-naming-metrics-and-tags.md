---
title: "Quelles sont les bonnes pratiques à adopter pour nommer les métriques et les tags\_?"
kind: faq
further_reading:
  - link: /developers/metrics/
    tag: Documentation
    text: En savoir plus sur les métriques Datadog
  - link: /getting_started/tagging/
    tag: Documentation
    text: Débuter avec les tags
aliases:
  - /fr/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---
Voici quelques recommandations pour bien nommer vos métriques, tags et services.

## Règles et bonnes pratiques pour nommer des métriques

* Les noms des métriques doivent commencer par une lettre.
* Ils doivent uniquement contenir des caractères alphanumériques ASCII, des underscores et des points. Les autres caractères sont convertis en underscores.
* Ils ne doivent pas dépasser 200 caractères (moins de 100 caractères sont toutefois conseillés pour une meilleure lisibilité sur l'interface).
* La norme Unicode n'est pas prise en charge.
* Il est conseillé d'éviter les espaces.

Les métriques renvoyées par l'Agent respectent un format pseudo hiérarchique où chaque élément est séparé par un point (par exemple, `http.nginx.response_time`). Le format est pseudo hiérarchique car aucune hiérarchie n'est véritablement appliquée, mais la structure est utilisée pour déduire certaines relations (par exemple, si hostA et hostB renvoient tous les deux `http.nginx.*`, il doit s'agir de front-ends web).

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

## Règles et bonnes pratiques pour nommer des tags

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous attribuez des tags. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la [documentation dédiée][1].

* Les tags doivent commencer par une lettre.
* Ils peuvent contenir des caractères alphanumériques, des underscores, des signes moins, des deux-points, des points et des barres obliques. Les autres caractères sont convertis en underscores.
* Lorsqu'un tag se termine par un underscore, que ce soit à la suite de la conversion d'un caractère ou tout simplement parce que son nom finit par un « _ », l'underscore est supprimé.
* Les noms de tag peuvent comporter jusqu'à 200 caractères et prennent en charge la norme Unicode.
* Les tags sont convertis en minuscule.
* Pour un fonctionnement optimal, nous conseillons d'utiliser la syntaxe `key:value`.

Les clés de tag de métrique fréquemment utilisées comprennent `instance`, `name` et `role`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging