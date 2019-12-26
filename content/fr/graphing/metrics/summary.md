---
title: Metrics Summary
kind: documentation
description: Consultez la liste complète des métriques transmises à Datadog.
aliases:
  - /fr/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
further_reading:
  - link: graphing/metrics/explorer
    tag: Documentation
    text: Metrics Explorer
  - link: graphing/metrics/distributions
    tag: Documentation
    text: Distributions de métriques
---
## Présentation

La [page Metrics Summary][1] affiche la liste de vos métriques transmises à Datadog pendant un intervalle de temps donné : l'heure précédente, le jour précédent ou la semaine précédente. Cette liste peut être filtrée par nom. Cliquez sur le nom d'une métrique pour afficher un volet comportant des informations plus détaillées.

## Volet de métrique

Le volet de métrique affiche des informations essentielles concernant une métrique donnée.

{{< img src="graphing/metrics/summary/metric_panel.png" alt="Volet de métrique" responsive="true" style="width:80%;">}}

### Le nom de la métrique

Le nom de votre métrique dans l'[explorateur de métriques][2], les [dashboards][3], etc.

### Nombre de métriques distinctes

Une métrique peut correspondre à plusieurs métriques distinctes en fonction des tags qui lui sont associés. Pour en savoir plus, consultez la documentation relative aux [métriques custom][4].

### Hosts

Le nombre total de hosts qui transmettent une métrique avec une liste des hosts.

### Tags

Le nombre total de tags associés à une métrique avec une liste des tags. Pour en savoir plus, consultez la documentation relative au [tagging][5].

### Métadonnées de métriques

Les métadonnées associées à votre métrique. La plupart des métadonnées peuvent être modifiées sur la page de résumé des métriques ou avec l'[API Datadog][6].

#### Description de la métrique

La description de la métrique vous aide à mieux comprendre à quoi elle sert. Les descriptions sont prédéfinies pour les métriques provenant d'[intégrations][7] prises en charge. Utilisez ce champ pour mettre à jour les descriptions de vos [métriques custom][4].

#### Unité de la métrique

L'unité de votre métrique (byte, second, request, query, etc.). Consultez la page relative aux [unités de métriques][8] pour en savoir plus.

Lors de l'envoi de métriques custom à Datadog, il est possible de modifier l'[unité de mesure][1] qui s'affiche lorsque vous passez le curseur sur la métrique dans votre graphique. **Remarque** : ces changements n'ont aucune incidence sur les graphiques de métriques (ils affectent uniquement les unités de mesure utilisées lorsque vous passez le curseur sur des valeurs brutes). Des règles de formatage sont automatiquement appliquées pour améliorer la lisibilité. Par exemple, les octets (`B`) peuvent être affichés en tant que kibioctets (`KiB`).

#### Type de métrique

Le type de votre métrique (gauge, rate ou count). Consultez la page relative aux [types de métrique][8] pour en savoir plus.

**Avertissement** : si vous modifiez le type de métrique, cela modifie le comportement de cette métrique pour **TOUS** vos monitors et analyses.

#### Nom de l'intégration

Si la métrique provient d'une [intégration][7] prise en charge, les métadonnées répertorient le nom de l'intégration. Cette information ne peut pas être modifiée.

#### Intervalle

L'intervalle de collecte de la métrique en secondes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/graphing/metrics/explorer
[3]: /fr/graphing/dashboards
[4]: /fr/developers/metrics/custom_metrics
[5]: /fr/tagging
[6]: /fr/api/?lang=python#edit-metric-metadata
[7]: /fr/integrations
[8]: /fr/developers/metrics/units