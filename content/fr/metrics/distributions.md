---
title: Distributions
kind: documentation
description: Calculez les centiles globaux de l'intégralité de votre ensemble de données.
aliases:
  - /fr/developers/faq/characteristics-of-datadog-histograms/
  - /fr/graphing/metrics/distributions/
further_reading:
  - link: /developers/metrics/dogstatsd_metrics_submission/
    tag: Documentation
    text: Utilisation des distributions dans DogStatsD
---
## Présentation

Les métriques Distribution agrègent les valeurs envoyées par plusieurs hosts lors d'un intervalle de transmission afin de mesurer les distributions statistiques dans l'ensemble de votre infrastructure.

Les distributions globales sont conçues pour instrumenter des objets logiques, comme des services, indépendamment des hosts sous-jacents. Contrairement aux [histogrammes][1] qui effectuent l'agrégation au niveau de l'Agent, les distributions globales envoient toutes les données brutes recueillies durant un intervalle de transmission, et l'agrégation se fait du côté serveur. La structure de données sous-jacente n'ayant pas été agrégée et représentant les données brutes, les distributions présentent deux caractéristiques importantes :

* **Calcul des agrégations par centile** : les agrégations par centile (p50, p75, p90, p95, p99) sont calculées à partir des données brutes pour tous les hosts. Elles sont donc globalement exactes.

* **Personnalisation du tagging** : cette fonctionnalité vous permet de contrôler le schéma de tagging pour les métriques pour lesquelles une granularité au niveau des hosts n'est pas nécessaire (p. ex. les transactions par seconde pour un service de paiement).

Consultez la [section Outils de développement][1] pour découvrir les détails d'implémentation. Remarque : étant donné que les distributions sont un nouveau type de métrique, elles doivent être instrumentées avec de nouveaux noms de métrique lors de leur envoi à Datadog.

## Agrégations

Comme d'autres types de métriques, `gauges` ou `histograms` par exemple, les distributions disposent des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les distributions sont initialement taguées de la même manière que d'autres métriques (avec des tags personnalisés définis dans le code) et sont résolues avec le tag de host qui a signalé la métrique. Vous pouvez également calculer des agrégations par centile pour un ensemble de tags (jusqu'à 10) spécifiés sur la page [Métriques de distribution][2]. Cela fournit des agrégations pour `p50`, `p75`, `p90`, `p95` et `p99`.

{{< img src="metrics/distributions/revised_global_metrics_selection.png" alt="UI des métriques de distribution"  style="width:80%;">}}

Après avoir choisi d'appliquer des agrégations par centile sur une métrique de distribution, ces agrégations sont automatiquement disponibles dans l'interface de création de graphique :

{{< img src="metrics/distributions/dogweb_latency_bis.png" alt="Métrique de distribution bis" style="width:80%;">}}

## Personnaliser le tagging

Les distributions vous permettent de contrôler le tagging pour les métriques pour lesquelles une granularité au niveau des hosts est inutile.

Pour personnaliser le tagging, passez le curseur sur votre métrique dans le tableau, puis cliquez sur l'icône en forme de crayon pour apporter des modifications. Dans la fenêtre contextuelle qui s'affiche, sélectionnez *Custom...*. Une _liste blanche_ apparaît, avec les tags que vous avez définis par défaut dans le code. Vous pouvez en supprimer ou ajouter des tags liés aux hosts.

**Remarque** : la personnalisation de tags via liste blanche ne permet pas d'exclure de tags. L'ajout de tags débutant par `!` n'est pas accepté.

{{< img src="metrics/distributions/distribution_metric.png" alt="Métrique de distribution" style="width:80%;">}}

## Nombre de métriques de distribution

Les métriques de distribution avec agrégations par centile (`p50`, `p75`, `p90`, `p95` et `p99`) génèrent des métriques custom ou des séries temporelles de façon différentes que les gauges, counts, histograms et distributions avec agrégations sans centile (`sum`, `count`, `min`, `max` et `avg`). Les centiles ne pouvant pas être regroupés, Datadog conserve cinq séries temporelles pour chaque combinaison de tags pouvant faire l'objet d'une requête. Ce nombre n'est pas aligné à celui des métriques custom générées à partir des gauges, counts, histograms ou distributions avec agrégations sans centile (qui dépend du nombre unique de combinaisons de valeurs de tag se trouvant dans vos données).

Pour en savoir plus sur le nombre de métriques custom créées à partir de métriques gauge, count, histogram ou distribution avec agrégation sans centile, reportez-vous à la page sur les [métriques custom][2]. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/metrics/types/
[2]: https://app.datadoghq.com/metric/distribution_metrics