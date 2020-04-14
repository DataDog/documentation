---
title: Metrics Summary
kind: documentation
description: Consultez la liste complète des métriques transmises à Datadog.
aliases:
  - /fr/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /fr/graphing/metrics/summary/
further_reading:
  - link: /metrics/explorer
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/distributions
    tag: Documentation
    text: Distributions de métriques
---
## Présentation

La [page Metrics Summary][1] affiche la liste de vos métriques transmises à Datadog pendant un intervalle de temps donné : l'heure précédente, le jour précédent ou la semaine précédente. Recherchez vos métriques en fonction de leur nom, à l'aide du champ de recherche **Metric**, ou de leur tag, avec le champ **Tag** :

{{< img src="metrics/summary/tagexplorer.gif" alt="Filtrer par tag"  style="width:75%;">}}

## Volet de métrique

Cliquez sur le nom d'une métrique pour afficher un volet comportant plus de détails à son sujet. Ce volet présente des informations clés sur la métrique de votre choix.

{{< img src="metrics/summary/metric_panel.png" alt="Volet de métrique"  style="width:75%;">}}

### Le nom de la métrique

Le nom de votre métrique dans le [Metrics Explorer][2], les [dashboards][3], etc.

### Nombre de métriques distinctes

Une métrique peut correspondre à plusieurs métriques distinctes en fonction des tags qui lui sont associés. Pour en savoir plus, consultez la documentation relative aux [métriques custom][4].

### Hosts

Le nombre total de hosts transmettant une métrique, ainsi que la liste de ces hosts. Cliquez sur un host pour filtrer les données ou pour afficher la métrique filtrée dans le [Metrics Explorer][2].

### Tags

Le nombre total de tags appliqués à une métrique, ainsi que la liste de ces tags. Cliquez sur un tag pour filtrer les données ou pour afficher la métrique filtrée dans le [Metrics Explorer][2].

{{< img src="metrics/summary/tag_click.png" alt="Cliquer sur un tag"  style="width:75%;">}}

[En savoir plus sur le tagging][5].

### Métadonnées de métrique

Les métadonnées associées à votre métrique. La plupart des métadonnées peuvent être modifiées sur la page Metric Summary ou avec l'[API Datadog][6].

#### Description de la métrique

La description de la métrique vous aide à mieux comprendre à quoi elle sert. Les descriptions sont prédéfinies pour les métriques provenant d'[intégrations][7] prises en charge. Utilisez ce champ pour mettre à jour les descriptions de vos [métriques custom][4].

#### Unité de la métrique

L'unité de votre métrique (byte, second, request, query, etc.). Consultez la page relative aux [unités de métriques][8] pour en savoir plus.

Lors de l'envoi de métriques custom à Datadog, il est possible de modifier l'[unité de mesure][1] qui s'affiche lorsque vous passez le curseur sur la métrique dans votre graphique. **Remarque** : ces changements n'ont aucune incidence sur les graphiques de métriques. Ils affectent uniquement les unités de mesure utilisées lorsque vous passez le curseur sur des valeurs brutes. Des règles de formatage sont automatiquement appliquées pour améliorer la lisibilité. Par exemple, les octets (`B`) peuvent être affichés en tant que kibioctets (`KiB`).

#### Type de métrique

Le type de votre métrique (gauge, rate ou count). Consultez la page relative aux [types de métriques][9] pour en savoir plus.

**Attention** : si vous modifiez le type de métrique, cela modifie le comportement de cette métrique pour **TOUS** vos monitors et  **TOUTES** vos analyses.

#### Nom de l'intégration

Si la métrique provient d'une [intégration][7] prise en charge, les métadonnées répertorient le nom de l'intégration. Cette information ne peut pas être modifiée.

#### Intervalle

L'intervalle de collecte de la métrique en secondes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/explorer
[3]: /fr/dashboards
[4]: /fr/developers/metrics/custom_metrics
[5]: /fr/tagging
[6]: /fr/api/?lang=python#edit-metric-metadata
[7]: /fr/integrations
[8]: /fr/developers/metrics/units
[9]: /fr/developers/metrics/types