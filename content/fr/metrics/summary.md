---
aliases:
- /fr/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /fr/graphing/metrics/summary/
description: Consultez la liste complète des métriques transmises à Datadog.
further_reading:
- link: /metrics/explorer/
  tag: Documentation
  text: Metrics Explorer
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions de métriques
title: Metrics Summary
---

## Présentation

La [page Metrics Summary][1] affiche la liste des métriques transmises à Datadog pendant un intervalle précis, à savoir l'heure précédente, le jour précédent ou la semaine précédente.

Recherchez vos métriques par nom ou par tag à l'aide des champs de recherche **Metric** ou **Tag** :

{{< img src="metrics/summary/tagexplorer2.mp4" alt="Filtrer par tag" video=true style="width:75%;">}}

## Volet des facettes

Grâce aux barres de recherche, vous bénéficiez d'un vaste choix d'options vous permettant de filtrer la liste des métriques. Les facettes vous aident également à filtrer rapidement vos métriques en fonction des éléments suivants :
* **Configuration** : identifiez rapidement les métriques qui possèdent certaines configurations de tag ou des agrégations par centile supplémentaires.
* **Metric Type** : distinguez rapidement les métriques de distribution des autres métriques (counts, gauges, rates).
* **Distribution Metric Origin** : identifiez rapidement le produit qui a généré les métriques de distribution (par exemple, les logs, les spans, etc.).

{{< img src="metrics/summary/facets2.jpg" alt="Volet de facettes des métriques" style="width:75%;">}}


## Configuration de plusieurs métriques
Vous pouvez configurer plusieurs métriques à la fois à l'aide de deux boutons :

{{< img src="metrics/summary/configurationbuttons.jpg" alt="Boutons de configuration groupée" style="width:75%;">}}

* **Calculate Percentiles** : cette option vous permet d'ajouter des agrégations par centile à plusieurs métriques de distribution.

{{< img src="metrics/summary/bulkpercentiles.jpg" alt="Centiles groupés" style="width:75%;">}}

* **Configure Tags** : cette option vous permet de configurer des tags pour plusieurs métriques custom partageant un espace de nommage commun à l'aide de la solution Metrics without Limits™.

{{< img src="metrics/summary/bulkconfig.mp4" alt="Configuration groupée de tags pour les métriques" video=true style="width:75%;">}} 

## Volet latéral d'une métrique

Cliquez sur un nom de métrique pour afficher dans son volet latéral des détails concernant les métadonnées et les tags de cette métrique :

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Volet d'une métrique" style="width:75%;">}}

### Metric name

Le nom de votre métrique dans le [Metrics Explorer][2], les [dashboards][3], etc.

### Ingested Custom Metrics

Un nom de métrique peut générer plusieurs métriques custom ingérées, en fonction de la combinaison de valeurs de tag qui lui est associée. Les métriques custom ingérées représentent toutes les données envoyées initialement avec le code.

Pour en savoir plus, consultez la documentation relative aux [métriques custom][4].

### Indexed Custom Metrics

Contrairement aux métriques custom ingérées, les métriques custom indexées représentent les métriques qui peuvent être interrogées sur toute la plateforme Datadog. L'ajout ou la suppression d'agrégations par centile et l'utilisation de la solution Metrics without Limits™ sont susceptibles d'augmenter ou de diminuer le nombre de métriques custom ingérées. Pour en savoir plus, consultez la section [Metrics without Limits™][10].

### Hosts

Le nombre total de hosts qui transmettent une métrique.

### Valeurs de tag

Le nombre total de valeurs de tag uniques associées à une métrique.

[En savoir plus sur le tagging][5].

### Métadonnées de la métrique

Les métadonnées associées à votre métrique. La plupart des métadonnées peuvent être modifiées sur la page Metrics Summary ou avec l'[API Datadog][6].

#### Unité de la métrique

L'unité de votre métrique (byte, second, request, query, etc.). Consultez la page relative aux [unités de métriques][7] pour en savoir plus.

Lors de l'envoi de métriques custom à Datadog, vous pouvez modifier l'[unité de mesure][1] affichée lorsque vous passez votre curseur sur une métrique dans un graphique.

**Remarque** : ce changement n'a aucune incidence sur la représentation des métriques. Il affecte uniquement les unités de mesure utilisées pour les données brutes lorsque vous passez le curseur sur une métrique. Des règles de mise en forme sont automatiquement appliquées pour améliorer la lisibilité : par exemple, les octets (`B`) peuvent être affichés en tant que kibioctets (`KiB`).

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

Le tableau des tags vous permet d'explorer de plusieurs façons toutes les clés et toutes les valeurs des tags qui sont activement transmises dans les données de votre métrique.

Grâce au tableau des tags, vous pouvez accomplir les actions suivantes :

- Trier les clés de tag en fonction de la **colonne Count** (qui compte le nombre de valeurs de tag uniques)
- Rechercher une clé de tag spécifique dans le tableau des tags paginé
- Exporter le tableau des tags sous la forme d'un fichier CSV téléchargeable
- Basculer entre les tags que vous avez configurés pour votre métrique et ceux initialement envoyés avec la métrique

Pour chaque clé de tag spécifique, vous pouvez également effectuer les opérations suivantes :

- Passer en revue toutes les valeurs de tag de cette clé de tag
- Utiliser un tag spécifique au format `key:value` pour restreindre le nombre de métriques affichées sur la page Metrics Summary
- Ouvrir un graphique de votre métrique dans le Metrics Explorer, en appliquant un filtre basé sur la combinaison `key:value` de votre tag
- Copier la combinaison `key:value` d'un tag afin d'appliquer un filtre dans l'ensemble de l'application

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tableau des tags" video=true style="width:75%;">}}

[En savoir plus sur le tagging][5].

## Metrics without Limits\*
La solution Metrics without Limits\* vous permet de contrôler le volume de vos métriques custom sans avoir à modifier vos Agents ou votre code.

**Remarque :** Metrics without Limits\* fonctionne uniquement avec les métriques custom.

Vous pouvez configurer des tags à l'aide du bouton de configuration groupée de tags pour les métriques ou du bouton **Manage Tags**, situé dans le volet latéral des détails de la métrique.

{{< img src="metrics/distributions/managetags.png" alt="Configuration des tags pour une distribution" style="width:80%;">}}

1. Cliquez sur le nom de la métrique de distribution custom dans le tableau **Metrics Summary** afin d'ouvrir le volet latéral des détails de la métrique.
2. Cliquez sur le bouton **Manage Tags** pour ouvrir une fenêtre de configuration des tags.
3. Cliquez sur l'onglet **Custom…** pour personnaliser les tags que vous souhaitez utiliser dans vos requêtes. Pour définir les tags à conserver, utilisez des _listes d'autorisation_.
4. Avant d'enregistrer vos modifications à l'aide de l'option **Save**, vérifiez l'impact de votre liste d'autorisation grâce à une estimation de la cardinalité.

**Remarque** : la personnalisation de tags via cette liste ne permet pas d'exclure de tags. L'ajout de tags débutant par `!` n'est pas accepté. De plus, pour obtenir une estimation de la cardinalité, la métrique doit exister depuis plus de 48 heures.

### Tags interrogeables

Une fois votre métrique configurée via Metrics without Limits\*, vous pouvez visualiser les tags pouvant être interrogées, à savoir les tags qui rentrent en compte dans le calcul du volume des _métriques custom indexées_. Il est également possible de rétablir l'affichage de tous les tags qui ont été initialement envoyés et ingérés et qui rentrent dans le calcul des _métriques custom ingérées_.

### Optimiser votre métrique avec des agrégations grâce au mode Avancé

Vous pouvez ajuster les configurations des métriques custom de type count, gauge ou rate en ajoutant des agrégations supplémentaires facultatives. Pour ce faire, utilisez le mode Avancé de Metrics without Limits\*. Par défaut, pour veiller à la précision mathématique des requêtes de vos métriques configurées, Datadog stocke de la façon suivante la combinaison des agrégations les plus souvent interrogées en fonction du type de la métrique :

- Les métriques count/rate configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type `SUM`.
- Les métriques gauge configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type `AVG`.

{{< img src="metrics/summary/customize_aggr_docs.jpg" alt="Ajuster les agrégations pour les métriques count, rate et gauge" style="width:80%;">}}

D'autres agrégations sont disponibles en cas de besoin. Vous pouvez ajouter ou supprimer des agrégations à tout moment, sans avoir à modifier vos Agents ou votre code.

**Remarque** : toute configuration d'une métrique count, rate ou gauge et toute suppression d'une agrégation peuvent entraîner la modification de vos monitors et dashboards existants.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[10]:/fr/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/explorer/
[3]: /fr/dashboards/
[4]: /fr/metrics/custom_metrics/
[5]: /fr/getting_started/tagging/
[6]: /fr/api/v1/metrics/#edit-metric-metadata
[7]: /fr/metrics/units/
[8]: /fr/metrics/types/
[9]: /fr/integrations/