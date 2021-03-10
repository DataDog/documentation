---
title: Metrics Summary
kind: documentation
description: Consultez la liste complète des métriques transmises à Datadog.
aliases:
  - /fr/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
  - /fr/graphing/metrics/summary/
further_reading:
  - link: /metrics/explorer/
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/distributions/
    tag: Documentation
    text: Distributions de métriques
---
## Présentation

La [page Metrics Summary][1] affiche la liste de vos métriques transmises à Datadog pendant un intervalle de temps donné : l'heure précédente, le jour précédent ou la semaine précédente. Recherchez vos métriques en fonction de leur nom, à l'aide du champ de recherche **Metric**, ou de leur tag, avec le champ **Tag** :

{{< img src="metrics/summary/tagexplorer2.gif" alt="Filtrer par tag"  style="width:75%;">}}

## Volet latéral d'une métrique

Cliquez sur un nom de métrique pour afficher dans son volet latéral des détails concernant les métadonnées et les tags de cette métrique :

{{< img src="metrics/summary/metric_panel3.png" alt="Volet de métrique"  style="width:75%;">}}

### Nom de la métrique

Le nom de votre métrique dans le [Metrics Explorer][2], les [dashboards][3], etc.

### Métriques distinctes transmises

Un nom de métrique peut générer plusieurs métriques distinctes, en fonction de la combinaison de valeurs de tag qui lui est associée. Le nombre de métriques distinctes transmises varie selon l'intervalle sélectionné sur la page.

Pour en savoir plus, consultez la documentation relative aux [métriques custom][4].

### Hosts

Le nombre total de hosts qui transmettent une métrique.

### Valeurs de tag

Le nombre total de valeurs de tag uniques associées à une métrique.

[En savoir plus sur le tagging][5].

### Métadonnées de la métrique

Les métadonnées associées à votre métrique. La plupart des métadonnées peuvent être modifiées sur la page Metric Summary ou avec l'[API Datadog][6].

#### Unité de la métrique

L'unité de votre métrique (byte, second, request, query, etc.). Consultez la page relative aux [unités de métriques][7] pour en savoir plus.

Lors de l'envoi de métriques custom à Datadog, il est possible de modifier l'[unité de mesure][1] qui s'affiche lorsque vous passez le curseur sur la métrique dans votre graphique. **Remarque** : ces changements n'ont aucune incidence sur les graphiques de métriques. Ils affectent uniquement les unités de mesure utilisées lorsque vous passez le curseur sur des valeurs brutes. Des règles de formatage sont automatiquement appliquées pour améliorer la lisibilité. Par exemple, les octets (`B`) peuvent être affichés en tant que kibioctets (`KiB`).

#### Type de la métrique

Le type de votre métrique (gauge, rate, count ou distribution). Consultez la page relative aux [types de métrique][8] pour en savoir plus.

**Attention** : tout changement de type de métrique entraîne la modification du comportement de cette métrique pour **TOUS** vos dashboards et monitors.

#### Nom de l'intégration

Si la métrique provient d'une [intégration][9] prise en charge, les métadonnées répertorient le nom de l'intégration. Cette information ne peut pas être modifiée.

#### Intervalle

L'intervalle de collecte de la métrique en secondes.

#### Description de la métrique

La description de la métrique vous aide à mieux comprendre son utilité. Les descriptions sont prédéfinies pour les métriques provenant d'[intégrations][9] prises en charge. Utilisez ce champ pour mettre à jour les descriptions de vos [métriques custom][4].

### Tableau des tags

Le tableau des tags vous permet d'explorer de différentes façons toutes les clés et toutes les valeurs des tags qui sont activement transmises dans les données de votre métrique.

Grâce au tableau des tags, vous pouvez accomplir les actions suivantes :

- Trier les clés de tag en fonction de la **colonne Count** (qui compte le nombre de valeurs de tag uniques)
- Rechercher une clé de tag spécifique dans le tableau des tags paginé
- Exporter le tableau des tags sous la forme d'un fichier CSV téléchargeable

Pour chaque clé de tag spécifique, vous pouvez également effectuer les opérations suivantes :

- Passer en revue toutes les valeurs de tag de cette clé de tag
- Utiliser un tag spécifique au format `key:value` pour restreindre le nombre de métriques affichées sur la page Metrics Summary
- Ouvrir un graphique de votre métrique dans le Metrics Explorer, en appliquant un filtre basé sur la combinaison `key:value` de votre tag
- Copier la combinaison `key:value` d'un tag afin d'appliquer un filtre dans l'ensemble de l'application

{{< img src="metrics/summary/tags_table.gif" alt="Tableau des tags"  style="width:75%;">}}

[En savoir plus sur le tagging][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/explorer/
[3]: /fr/dashboards/
[4]: /fr/developers/metrics/custom_metrics/
[5]: /fr/getting_started/tagging/
[6]: /fr/api/v1/metrics/#edit-metric-metadata
[7]: /fr/developers/metrics/units/
[8]: /fr/developers/metrics/types/
[9]: /fr/integrations/