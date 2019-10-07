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
La [page Metrics Summary][1] affiche la liste de toutes les [métriques][2] transmises à Datadog pendant un intervalle de temps donné : l'heure précédente, le jour précédent ou la semaine précédente. Cette liste peut être filtrée par nom. Lorsque vous cliquez sur une métrique, un volet comportant des informations plus détaillées apparaît.

{{< img src="graphing/metrics/summary/summary.mp4" alt="Résumé" video="true" responsive="true" width="80%" >}}

## Volet de métrique

Le volet de métrique affiche des informations générales sur une métrique donnée :

{{< img src="graphing/metrics/summary/metric_panel.png" alt="Volet de métrique" responsive="true" style="width:80%;">}}

Les principales informations concernant votre métrique que vous pourrez y trouver sont les suivantes :

* **Nom de la métrique** : le nom de métrique à utiliser dans l'[explorateur de métriques][3], les [widgets de dashboard][4], etc.
* **Nombre de métriques distinctes** : le nom d'une métrique peut correspondre à plusieurs métriques distinctes en fonction des tags qui lui sont associés. Consultez la [documentation relative aux métriques custom][5] pour en savoir plus.
* **Nombre de hosts** : le nombre total de hosts qui transmettent cette métrique.
* **Nombre de tags** : le nombre total de tags associés à cette métrique. En savoir plus sur le [tagging][6] et la [façon d'assigner des tags][7].
* **Métadonnées de métriques** : toutes les métadonnées associées à votre métrique :
    * Description de la métrique
    * L'[unité de la métrique][8]
    * [Type de métrique][9]
    * Le nom de l'intégration, si cette métrique provient d'une [intégration][10]
    * L'intervalle de collecte de cette métrique

### Métadonnées de métrique 

Chaque métadonnée de métrique peut être modifiée manuellement : 

#### Modifier la description d'une métrique

Modifiez la description de la métrique pour mieux comprendre à quoi elle sert.
Si une métrique provient d'une intégration et que sa description est incorrecte, [signalez un problème dans le référentiel GitHub dédié à la documentation de Datadog][11].

#### Modifier l'unité d'une métrique ou ajouter une unité personnalisée

Lors de l'envoi de métriques custom à Datadog, vous pouvez modifier l'[unité de mesure][1] qui s'affiche lorsque vous passez le curseur sur certaines métriques dans votre graphique. Pour ce faire, sélectionnez votre métrique custom dans la liste, puis sélectionnez l'unité de mesure que vous souhaitez utiliser comme illustré ci-dessous :

{{< img src="graphing/metrics/summary/metrics_metadata.mp4" alt="Métadonnées de métrique" video="true" responsive="true" width="80%" >}}

**Remarque** : ces changements n'ont aucune incidence sur les graphiques de métriques (ils affectent uniquement les unités de mesure utilisées lorsque vous passez le curseur sur des valeurs brutes). Des règles de formatage sont automatiquement appliquées pour améliorer la lisibilité : par exemple, les octets (`B`) peuvent être affichés en tant que kibioctets (`KiB`).

#### Modifier le type de métrique

Modifiez le type de métrique pour mieux identifier le type de métrique réellement envoyé.
**Avertissement** : cela modifie le comportement de votre métrique dans **TOUS** vos monitors et analyses. Faites preuve de prudence lorsque vous modifiez cette information.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/developers/metrics
[3]: /fr/graphing/metrics/explorer
[4]: /fr/graphing/functions
[5]: /fr/developers/metrics/custom_metrics
[6]: /fr/tagging
[7]: /fr/tagging/assigning_tags
[8]: /fr/developers/metrics/#units
[9]: /fr/developers/metrics/#metric-types
[10]: /fr/integrations
[11]: https://github.com/DataDog/documentation/issues/new/choose