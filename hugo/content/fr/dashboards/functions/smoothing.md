---
aliases:
- /fr/graphing/functions/smoothing/
description: Réduisez le bruit dans les données de métriques à l'aide d'autosmooth,
  de moyennes mobiles pondérées exponentiellement, de filtres médians et de fonctions
  pondérées.
title: Lissage
---
## Autosmooth {#autosmooth}

| Fonction       | Description                                                           | Exemple                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | Supprime automatiquement le bruit tout en préservant la tendance de la métrique. | `autosmooth(<METRIC_NAME>{*})` |

La fonction `autosmooth()` applique une moyenne mobile avec un span sélectionné automatiquement. Elle lisse une série temporelle tout en préservant sa tendance. Dans cet exemple, la fonction choisit le span optimal pour lisser la série temporelle :

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="illustration autosmooth" style="width:80%;">}}

Lorsqu'elle est utilisée sur une requête `group by`, telle que `avg by`, le même span est appliqué à toutes les séries temporelles. Si elle est utilisée sur plusieurs métriques dans le même graphique, différents spans peuvent être sélectionnés pour lisser de manière optimale chacune des séries temporelles de métriques.

L'algorithme est inspiré de l'[algorithme ASAP][1] ; vous pouvez en savoir plus à ce sujet dans cet [article de blog][2].

La fonction `autosmooth()` ne peut pas être utilisée dans les moniteurs. Comme le span est choisi dynamiquement, le résultat de l'application de la fonction peut changer d'une minute à l'autre, ce qui complique la définition des seuils et entraîne des alertes qui se déclenchent et se résolvent à répétition.

## Moyenne mobile pondérée exponentiellement {#exponentially-weighted-moving-average}

### Ewma 1 {#ewma-1}

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_1()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 1. | `ewma_1(<METRIC_NAME>{*})` |

### Ewma 3 {#ewma-3}

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 3. | `ewma_3(<METRIC_NAME>{*})` |

Remarque : la valeur du span est égale au double de l'âge moyen pondéré de la série. Ainsi, `ewma_3()` est comparable à une moyenne mobile sur 3 jours.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 en partant de 10 jusqu'à retomber à 10 après 10 points de données, alors `ewma3(10 + x%10 {*})` a la forme suivante :

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5 {#ewma-5}

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 5. | `ewma_5(<METRIC_NAME>{*})` |

Remarque : la valeur du span est égale au double de l'âge moyen pondéré de la série. Ainsi, `ewma_5()` est comparable à une moyenne mobile sur 5 jours.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 en partant de 10 jusqu'à retomber à 10 après 10 points de données, alors `ewma5(10 + x%10 {*})` a la forme suivante :

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7 {#ewma-7}

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 7. | `ewma_7(<METRIC_NAME>{*})` |

Remarque : la valeur du span est égale au double de l'âge moyen pondéré de la série. Ainsi, `ewma_7()` est comparable à une moyenne mobile sur 7 jours.

### Ewma 10 {#ewma-10}

| Fonction    | Description                                                          | Exemple                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 10. | `ewma_10(<METRIC_NAME>{*})` |

Remarque : la valeur du span est égale au double de l'âge moyen pondéré de la série. Ainsi, `ewma_10()` est comparable à une moyenne mobile sur 10 jours.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 en commençant à 10 jusqu'à ce qu'elle revienne à 10 après 10 points de données, alors `ewma10(10 + x%10 {*})` a la forme suivante :

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20 {#ewma-20}

| Fonction    | Description | Exemple |
| :----       | :-------    | :------ |
| `ewma()`    | Calcule la moyenne mobile pondérée exponentiellement sur le span par défaut de 20. | `ewma(<METRIC_NAME>{*})` |
| `ewma_20()` | Calcule la moyenne mobile pondérée exponentiellement sur un span de 20. | `ewma_20(<METRIC_NAME>{*})` |

`ewma()` et `ewma_20()` fonctionnent de manière identique.

Remarque : la valeur du span est égale au double de l'âge moyen pondéré de la série. Ainsi, `ewma()` et `ewma_20()` sont comparables à une moyenne mobile sur 20 jours.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 en commençant à 10 jusqu'à ce qu'elle revienne à 10 après 10 points de données, alors `ewma20(10 + x%10 {*})` a la forme suivante :

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Médiane {#median}

### Médiane 3 {#median-3}

| Fonction     | Description | Exemple |
| :----        | :-------    | :------ |
| `median()`   | Médiane mobile avec un span par défaut de 3. | `median(<METRIC_NAME>{*})` |
| `median_3()` | Médiane mobile avec un span de 3. | `median_3(<METRIC_NAME>{*})` |

`median()` et `median_3()` fonctionnent de manière identique.

Remarque : la valeur du span correspond au nombre de points de données. Ainsi, `median()` et `median_3()` utilisent les 3 derniers points de données pour calculer la médiane.

### Médiane 5 {#median-5}

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | Médiane mobile avec un span de 5. | `median_5(<METRIC_NAME>{*})` |

Remarque : la valeur du span correspond au nombre de points de données. Ainsi, `median_5()` utilise les 5 derniers points de données pour calculer la médiane.

### Médiane 7 {#median-7}

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | Médiane mobile avec un span de 7. | `median_7(<METRIC_NAME>{*})` |

Remarque : la valeur du span correspond au nombre de points de données. Ainsi, `median_7()` utilise les 7 derniers points de données pour calculer la médiane.

### Médiane 9 {#median-9}

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | Médiane mobile avec un span de 9. | `median_9(<METRIC_NAME>{*})` |

Remarque : la valeur du span correspond au nombre de points de données. Ainsi, `median_9()` utilise les 9 derniers points de données pour calculer la médiane.

## Pondéré {#weighted}
<div class="alert alert-info">Weighted() est uniquement disponible lors de l'exécution d'une requête <code>SUM BY</code> sur des métriques de type jauge.</div> 

| Fonction       | Description                                                           | Exemple                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | Supprime automatiquement le bruit tout en préservant le poids approprié des tags transitoires. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

La fonction `weighted()` tient compte de la courte durée de vie des valeurs de tags transitoires qui changent fréquemment lors de l'agrégation spatiale des métriques de type jauge par somme, afin d'éviter les pics artificiels. 

Cette fonction est automatiquement ajoutée aux requêtes sur les métriques de jauge si les deux conditions suivantes sont remplies : 
1. La métrique a un intervalle de soumission régulier et cohérent, également spécifié dans le Metrics Catalog
2. La métrique est agrégée avec `SUM by` (par exemple, `sum: mygaugemetric{*}`)

Voici un exemple de graphique de la requête originale avec des pics inexacts (en violet) et de la requête avec le calcul correctement pondéré (en vert) : 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="Exemple de graphique comparant les requêtes avec et sans le modificateur weighted" style="width:80%;">}}

Pour plus d'informations sur le modificateur weighted(), consultez [Comment fonctionne weighted() ?][3].

## Autres fonctions {#other-functions}

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic : implémentez la détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic : effectuez une opération arithmétique sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count : comptez les valeurs non égales à zéro ou non nulles de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : remplissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank : sélectionnez uniquement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression : appliquez une fonction d'apprentissage automatique à votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift : décalez un point de données de votre métrique le long de la chronologie. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /fr/dashboards/guide/how-weighted-works