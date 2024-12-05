---
aliases:
- /fr/graphing/functions/smoothing/
title: Lissage
---

## Autosmooth

| Fonction       | Description                                                           | Exemple                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | Supprime automatiquement les valeurs parasites tout en préservant la tendance de la métrique. | `autosmooth(<NOM_MÉTRIQUE>{*})` |

La fonction `autosmooth()` applique une moyenne mobile avec un intervalle sélectionné automatiquement. Elle lisse une série temporelle tout en préservant sa tendance. Dans cet exemple, la fonction choisit l'intervalle optimal pour lisser la série temporelle :

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="Illustration d'autosmooth" style="width:80%;">}}

Lorsque la fonction est utilisée sur une requête `group by`, par exemple `avg by`, le même intervalle appliqué à toutes les séries temporelles. Lorsque la fonction est utilisée sur plusieurs métriques d'un même graphique, différents intervalles peuvent être sélectionnés pour lisser de façon optimale chaque série temporelle de métrique.

L'algorithme est inspiré de l'[algorithme ASAP][1]. Vous pouvez en savoir plus dans cet [article de blog][2] (en anglais).

La fonction `autosmooth()` ne peut pas être utilisée dans les monitors. L'intervalle étant choisi de façon dynamique, le résultat de l'application de la fonction peut changer d'une minute à l'autre : il est donc difficile de définir un seuil, et les alertes risqueraient de se déclencher trop fréquemment.

## Moyenne mobile avec pondération exponentielle (EWMA)

### Ewma 3

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | Calcule la moyenne mobile avec pondération exponentielle sur un intervalle de 3.  | `ewma_3(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `ewma_3()` utilise les 3 derniers points de données pour calculer la moyenne.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 à partir de 10 puis revient à 10 après 10 points de données, alors `ewma3(10 + x%10 {*})` donne le graphique suivant :

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | Calcule la moyenne mobile avec pondération exponentielle sur un intervalle de 5. | `ewma_5(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `ewma_5()` utilise les 5 derniers points de données pour calculer la moyenne.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 à partir de 10 puis revient à 10 après 10 points de données, alors `ewma5(10 + x%10 {*})` donne le graphique suivant :

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7

| Fonction   | Description                                                         | Exemple                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | Calcule la moyenne mobile avec pondération exponentielle sur un intervalle de 7. | `ewma_7(<METRIC_NAME>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `ewma_7()` utilise les 7 derniers points de données pour calculer la moyenne.

### Ewma 10

| Fonction    | Description                                                          | Exemple                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | Calcule la moyenne mobile avec pondération exponentielle sur un intervalle de 10. | `ewma_10(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `ewma_10()` utilise les 10 derniers points de données pour calculer la moyenne.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 à partir de 10 puis revient à 10 après 10 points de données, alors `ewma10(10 + x%10 {*})` donne le graphique suivant :

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20

| Fonction    | Description                                                          | Exemple                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_20()` | Calcule la moyenne mobile avec pondération exponentielle sur un intervalle de 20. | `ewma_20(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `ewma_20()` utilise les 20 derniers points de données pour calculer la moyenne.

Exemple :

Si une métrique `10 + x%10 {*}` s'incrémente de 1 à partir de 10 puis revient à 10 après 10 points de données, alors `ewma20(10 + x%10 {*})` donne le graphique suivant :

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Médiane

### Median 3

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_3()` | Médiane mobile avec un intervalle de 3. | `median_3(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `median_3()` utilise les 3 derniers points de données pour calculer la valeur médiane.

### Median 5

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | Médiane mobile avec un intervalle de 5. | `median_5(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `median_5()` utilise les 5 derniers points de données pour calculer la valeur médiane.

### Median 7

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | Médiane mobile avec un intervalle de 7. | `median_7(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `median_7()` utilise les 7 derniers points de données pour calculer la valeur médiane.

### Median 9

| Fonction     | Description                      | Exemple                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | Médiane mobile avec un intervalle de 9. | `median_9(<NOM_MÉTRIQUE>{*})` |

Remarque : la valeur de l'intervalle correspond au nombre de points de données. Par conséquent, `median_9()` utilise les 9 derniers points de données pour calculer la valeur médiane.

## Pondéré 
<div class="alert alert-info">La fonction Weighted() n'est disponible que lors de l'interrogation de `SUM BY` sur des métriques de type gauge.</div> 

| Fonction       | Description                                                           | Exemple                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | Supprime automatiquement les valeurs parasites tout en préservant le poids des tags transitoires. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

La fonction `weighted()` tient compte de la courte durée de vie  des valeurs de tag transitoires et fluctuantes lors de l'addition de métriques de type gauge dans l'espace afin d'éviter les pics artificiels. 

Cette fonction est automatiquement ajoutée aux requêtes sur des métriques de type gauge lorsque les deux conditions suivantes sont respectées :
1. La métrique possède un intervalle dʼenvoi régulier et cohérent, qui est également spécifié dans Metrics Summary
2. La métrique est agrégée avec `SUM by` (par exemple, `sum: mygaugemetric{*}`)

Voici un exemple de graphique de la requête originale avec des pics inexacts (en violet) et de la requête avec le calcul correctement pondéré (en vert) : 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="Exemple de graphique comparant des requêtes avec et sans le modificateur pondéré" style="width:80%;">}}

Pour en savoir plus sur le modificateur weighted(), consultez la section [Comment fonctionne weighted() ?][3].

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme :  mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /fr/dashboards/guide/how-weighted-works