---
aliases:
- /fr/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
further_reading:
- link: /metrics/
  tag: Documentation
  text: En savoir plus sur les métriques Datadog
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
title: Quelles sont les bonnes pratiques à adopter pour nommer les métriques et les
  tags ?
---

La convention de nommage est un art et constitue probablement l'une des décisions les plus difficiles à prendre d'un commun accord. Définir une convention de nommage pour vos métriques, tags et services est essentiel pour disposer de données de télémétrie propres, lisibles et faciles à gérer. Voici quelques recommandations :

* Fournissez des noms descriptifs et significatifs : les métriques ou les tags décrivent clairement l'objectif ou la signification de la valeur.
* Respectez le format et les limitations décrits ci-dessous.
* Éviter les abréviations pouvant avoir plusieurs significations
* Maintenez une cohérence entre toutes les équipes, applications et services.
* Évitez les mots-clés réservés susceptibles d'entrer en conflit avec d'autres tags ou métriques.
* Dans le cas des métriques, ajoutez-leur un préfixe sous la forme d'un namespace décrivant l'application ou le service qui génère les données.
* Évitez l'utilisation de données personnelles et sensibles de quelque nature que ce soit.

## Règles et bonnes pratiques pour nommer des métriques

* Les noms des métriques doivent commencer par une lettre.
* Ils doivent uniquement contenir des caractères alphanumériques ASCII, des underscores et des points. Les autres caractères sont convertis en underscores.
* Ils ne doivent pas dépasser 200 caractères (moins de 100 caractères sont toutefois conseillés pour une meilleure lisibilité sur l'interface).
* La norme Unicode n'est pas prise en charge.

Les métriques renvoyées par l'Agent respectent un format pseudo hiérarchique où chaque élément est séparé par un point : par exemple, `http.nginx.response_time`. Le format est pseudo hiérarchique car aucune hiérarchie n'est véritablement appliquée, mais la structure est utilisée pour déduire certaines relations. Ainsi, si hostA et hostB renvoient tous les deux `http.nginx.*`, il doit s'agir de frontends Web.

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

## Règles et bonnes pratiques pour nommer des tags

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Cette fonctionnalité permet de lier les données de télémétrie Datadog entre elles via trois tags standard : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la section [Tagging de service unifié][1].

* Les tags doivent commencer par une lettre.
* Ils peuvent contenir des caractères alphanumériques, des underscores, des signes moins, des deux-points, des points et des barres obliques. Les autres caractères sont convertis en underscores.
* Lorsqu'un tag se termine par un underscore, que ce soit à la suite de la conversion d'un caractère ou tout simplement parce que son nom finit par un « _ », l'underscore est supprimé.
* Les underscores adjacents sont modifiés de façon à ne garder qu'un seul underscore.
* Les tags peuvent contenir jusqu'à 200 caractères (clé et valeur comprises) et prennent en charge Unicode. Les caractères supplémentaires au-delà de cette limite sont tronqués.
* Les tags sont convertis en minuscule.
* Pour un fonctionnement optimal, nous conseillons d'utiliser la syntaxe `key:value`.

Les clés de tag de métrique fréquemment utilisées comprennent `instance`, `name` et `role`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging