---
title: as_count() dans les évaluations de monitors
kind: guide
aliases:
  - /monitors/guide/as-count-monitor-evaluation
---
## Présentation

Lors des évaluations de monitors, les requêtes utilisant les modificateurs **`as_count()`** et **`as_rate()`** sont calculées selon des méthodes susceptibles de produire des résultats différents. Les monitors faisant intervenir une opération arithmétique et au moins 1 modificateur **`as_count()`** utilisent un chemin d'évaluation distinct qui modifie l'ordre dans lequel les agrégations arithmétique et temporelle sont réalisées.

## Exemple de taux d'erreur

Imaginez que vous souhaitez surveiller un taux d'erreur pendant 5 minutes à l'aide des métriques `requests.error` et `requests.total`. On procède à une seule évaluation à l'aide de ces points de série temporelle alignés sur l'intervalle de 5 min :

**Numérateur** : `sum:requests.error{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 1     |
| 2018-03-13 11:01:30 | 2     |
| 2018-03-13 11:02:40 | 3     |
| 2018-03-13 11:03:30 | 4     |
| 2018-03-13 11:04:40 | 5     |
```

**Dénominateur* : `sum:requests.total{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 5     |
| 2018-03-13 11:01:30 | 5     |
| 2018-03-13 11:02:40 | 5     |
| 2018-03-13 11:03:30 | 5     |
| 2018-03-13 11:04:40 | 5     |
```

### 2 méthodes de calcul

On désigne cette requête **`classic_eval_path`** :

```text
sum(last_5m): sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate()
```

et cette requête **`as_count_eval_path`** :

```text
sum(last_5m): sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()
```

Comparez les résultats de l'évaluation en fonction du chemin emprunté :

| Chemin                     | Comportement                                       | Expression développée         | Résultat  |
|:-------------------------|:-----------------------------------------------|:----------------------------|:--------|
| **`classic_eval_path`**  | Fonction d'agrégation appliquée _après_ division  | **(1/5 + 2/5 + ... + 5/5)** | **3**   |
| **`as_count_eval_path`** | Fonction d'agrégation appliquée _avant_ division | **(1+2+...+5)/(5+5+...+5)** | **0,6** |

_Notez que les évaluations sont toutes deux mathématiquement exactes. Choisissez une méthode en accord avec vos intentions._

Il peut être utile de visualiser le chemin **`classic_eval_path`** comme :

```text
sum(last_5m):error/total
```

et le chemin **`as_count_eval_path`** comme :

```text
sum(last_5m):error
---
sum(last_5m):total
```

Si l'agrégation temporelle **`avg`** avec **`.as_rate()`** convient généralement, l'agrégation **`sum`** avec **`.as_count()`** est recommandée pour les taux d'erreur. L'utilisation de méthodes d'agrégation autres que **`sum`** (affichée sous forme de _total_ dans l'application) avec **`.as_count()`** serait illogique.

**Remarque** : les méthodes d'agrégation autres que la somme (affichée sous forme de total dans l'application) ne peuvent pas être utilisées avec `.as_count()`.

[Contactez l'équipe d'assistance Datadog][1] si vous avez des questions.

[1]: /fr/help