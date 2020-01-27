---
title: Surveillance des métriques arithmétiques et creuses
kind: guide
aliases:
  - /fr/monitors/guide/monitor-arithmetic-and-sparse-metrics
---
## Présentation

De nombreuses requêtes reposent sur des données arithmétiques. Il est important d'utiliser certains outils et d'appliquer certains comportements pour veiller à ce que les réglages d'un monitor évaluent correctement les requêtes.

## Métriques creuses

Si vous effectuez une division avec comme dénominateur une métrique creuse ou une métrique dont la valeur est égale à 0, certains résultats peuvent être rejetés.

Prenons par exemple les valeurs de métrique suivantes :

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

Pour la formule `a/b`, le monitor évalue :

```text
10/0 + 10/1 + 10/NaN = 10
```

Si la fenêtre d'évaluation comprend de nombreux compartiments "null" (**10/NaN + 10/Nan + ... + 10/Nan**), les évaluations sont ignorées. Vous devrez donc modifier votre métrique ou utiliser l'une des solutions ci-dessous.

## Solutions pour les métriques creuses et décalées

### `.rollup()`

Vous pouvez appliquer une fonction `.rollup()` pour que tous les compartiments de temps évalués disposent de valeurs valides. Cette fonction peut également être utile pour les métriques avec des vides, peu importe si la requête comprend des opérations arithmétiques ou non.

**Version d'origine** : `sum:ma_metrique.creuse{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2019-03-29 11:00:00 | 1     |
| 2019-03-29 11:00:30 |       |
| 2019-03-29 11:01:00 | 2     |
| 2019-03-29 11:01:30 | 1     |
| 2019-03-29 11:02:00 |       |
```

**Version modifiée** : `sum:ma_metrique.creuse{*}.rollup(sum,60)`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2019-03-29 11:00:00 | 1     |
| 2019-03-29 11:01:00 | 3     |
| 2019-03-29 11:02:00 | 1*    |
```

La fonction `rollup()` crée des compartiments de temps en fonction des intervalles de temps que vous définissez. Vous pouvez ainsi ignorer les données manquantes en définissant un intervalle de cumul supérieur à la longueur des vides de vos métriques. Dans cet exemple, les nouveaux compartiments regroupent les sommes des valeurs dans une fenêtre de 60 secondes.

\*Vous remarquerez que la valeur du timestamp `2019-03-29 11:02:00` pour la requête modifiée ne correspond pas à la valeur du premier tableau. En effet, la fonction `.rollup()` s'aligne avec le temps UNIX. Ici, on peut imaginer que la valeur `1` se produit à `2019-03-29 11:02:30`. Elle apparaît dans la fenêtre des cumuls, mais pas dans la fenêtre d'évaluation du monitor. Pour éviter de déclencher votre monitor à partir d'un intervalle de cumul incomplet contenant seulement un court extrait de données, ajoutez un **délai d'évaluation** au monitor. Attribuez-lui une valeur au moins égale à la longueur de l'intervalle de cumul.

### `.fill()`

Vous pouvez appliquer une fonction `.fill()` pour garantir que tous les compartiments de temps possèdent des valeurs valides. Pour les types de métriques **gauge**, l'interpolation par défaut est linéaire, ou `.fill(linear)`, pendant 5 minutes. Pour les métriques de type **count** et **rate**, la valeur par défaut est `.fill(null)`, ce qui désactive l'interpolation. Datadog déconseille généralement l'interpolation pour les métriques count/rate dans les monitors.

**Version d'origine** : `sum:ma_metrique.avec_vides.gauge{env:a} by {timer,env}`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                |                    |
| 2019-03-29 12:05:00 |                  | 1                  |
| 2019-03-29 12:10:00 | 0                |                    |
| 2019-03-29 12:15:00 |                  | 1                  |
| 2019-03-29 12:20:00 | 1                |                    |
| 2019-03-29 12:25:00 |                  | 1                  |
| 2019-03-29 12:30:00 | 1                |                    |
```

Imaginons que `ma_metrique.avec_vides.gauge` est une métrique de type **gauge**. Une interpolation linéaire de 5 minutes s'applique donc par défaut. Cependant, la métrique n'est transmise que toutes les 10 minutes. Avec la requête suivante :

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a} / sum:my_metric.has_gaps.gauge{timer:offset,env:a}
```

La majorité des évaluations ignorées s'affichent désormais.

| Chemin                | Évaluation                              | Résultat |
|:--------------------|:----------------------------------------|:-------|
| `classic_eval_path` | **1/Nan + Nan/1 + ... + 1/Nan + Nan/1** | S. O.    |

En ajustant l'interpolation, vous pouvez faire en sorte que chaque intervalle contienne des métriques.

**Version modifiée** : `sum:ma_metrique.avec_vides.gauge{env:a} by {timer,env}.fill(last,900)`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                | (1)                |
| 2019-03-29 12:05:00 | 1                | 1                  |
| 2019-03-29 12:10:00 | 0                | 1                  |
| 2019-03-29 12:15:00 | 0                | 1                  |
| 2019-03-29 12:20:00 | 1                | 1                  |
| 2019-03-29 12:25:00 | 1                | 1                  |
| 2019-03-29 12:30:00 | 1                | 1                  |
```

Requête modifiée :

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a}.fill(last,900) / sum:my_metric.has_gaps.gauge{timer:offset,env:a}.fill(last,900)
```

Avec `.fill(last,900)`, voici le résultat :

| Chemin                | Évaluation                                    | Résultat |
|:--------------------|:----------------------------------------------|:-------|
| `classic_eval_path` | **(1)/1 + 1/1 + 0/1 + 0/1 + 1/1 + 1/1 + 1/1** | 5      |

[Contactez l'équipe d'assistance Datadog][1] si vous avez des questions sur cette logique.

[1]: /fr/help