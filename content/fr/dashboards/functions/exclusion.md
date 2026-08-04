---
aliases:
- /fr/graphing/functions/exclusion/
description: Exclure les valeurs nulles et appliquer un filtrage basé sur des seuils
  en utilisant les fonctions clamp et cutoff sur les métriques.
title: Exclusion
---

## Exclude null

| Fonction         | Rôle                                                    | Exemple                                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `exclude_null()` | Supprime de votre graphique ou de votre Top List tous les groupes qui possèdent un tag avec la valeur N/A. | `exclude_null(avg:system.load.1{*} by {host})` |

Imaginons que vous disposez d'une métrique avec deux tags : `account` et `region`. `account` peut prendre trois valeurs différentes (`prod`, `build` et `N/A`), et `region` quatre valeurs différentes (`us-east-1`, `us-west-1`, `eu-central-1` et `N/A`).

Lorsque vous représentez cette métrique sous la forme d'une série temporelle, vous obtenez 12 lignes sur votre graphique (3 x 4). Si vous appliquez la fonction `exclude_null()`, les lignes avec les combinaisons de tags contenant _n'importe quelle_ valeur N/A sont supprimées. Ainsi, cette fonction vous permet d'obtenir 6 groupes (2 x 3).

## Clamp

| Fonction      | Rôle                                                          | Exemple                                |
| ------------- | -------------------------------------------------------------------- | -------------------------------------- |
| `clamp_min()` | Définit les valeurs d'une métrique _inférieures_ à un seuil sur la valeur de ce seuil. | `clamp_min(avg:system.load.1{*}, 100)` |
| `clamp_max()` | Définit les valeurs d'une métrique _supérieures_ à un seuil sur la valeur de ce seuil.  | `clamp_max(avg:system.load.1{*}, 100)` |

Ajouter une valeur de seuil. La fonction `clamp_min()` définit tous les points de données en dessous du seuil pour qu'ils soient égaux à cette valeur, tandis que `clamp_max()` limite les points de données au-dessus du seuil.

Remarque : `clamp_min(values, threshold)` et `clamp_max(values, threshold)` définissent tout `NaN` dans les valeurs sur `threshold`.

Pour éviter ce comportement, appliquez la fonction `default_zero()` avant la fonction `clamp_min()` / `clamp_max()`.

## Cutoff

| Fonction       | Rôle                                     | Exemple                                 |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| `cutoff_min()` | Remplacer les valeurs de métrique _en dessous_ d'une valeur de seuil par NaN. | `cutoff_min(avg:system.load.1{*}, 100)` |
| `cutoff_max()` | Exclure les valeurs nulles et appliquer un filtrage basé sur des seuils en utilisant les fonctions clamp et cutoff sur les métriques.  | `cutoff_max(avg:system.load.1{*}, 100)` |

Ajouter une valeur de seuil. La fonction `cutoff_min()` remplace toutes les valeurs de métrique inférieures à cette valeur de seuil par `NaN`, tandis que `cutoff_max()` remplace toutes les valeurs de métrique supérieures à cette valeur de seuil par `NaN`. Les fonctions cutoff ne remplacent pas les valeurs qui sont **égales à** la valeur de seuil.

**Conseil** : pour les fonctions Clamp et Cutoff, il peut s'avérer utile de visualiser la valeur du seuil que vous avez défini. Vous pouvez [définir un indicateur horizontal][1] dans les dashboards pour représenter cette valeur.

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
{{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmes : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou de null de votre métrique. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/blog/customize-graphs-dashboards-graph-markers/