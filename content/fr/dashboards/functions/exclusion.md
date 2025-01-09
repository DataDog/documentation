---
aliases:
- /fr/graphing/functions/exclusion/
title: Exclusion
---

## Exclude null

| Fonction         | Description                                                    | Exemple                                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `exclude_null()` | Supprime de votre graphique ou de votre Top List tous les groupes qui possèdent un tag avec la valeur N/A. | `exclude_null(avg:system.load.1{*} by {host})` |

Imaginons que vous disposez d'une métrique avec deux tags : `account` et `region`. `account` peut prendre trois valeurs différentes (`prod`, `build` et `N/A`), et `region` quatre valeurs différentes (`us-east-1`, `us-west-1`, `eu-central-1` et `N/A`).

Lorsque vous représentez cette métrique sous la forme d'une série temporelle, vous obtenez 12 lignes sur votre graphique (3 x 4). Si vous appliquez la fonction `exclude_null()`, les lignes avec les combinaisons de tags contenant _n'importe quelle_ valeur N/A sont supprimées. Ainsi, cette fonction vous permet d'obtenir 6 groupes (2 x 3).

## Clamp

| Fonction      | Description                                                          | Exemple                                |
| ------------- | -------------------------------------------------------------------- | -------------------------------------- |
| `clamp_min()` | Définit les valeurs d'une métrique _inférieures_ à un seuil sur la valeur de ce seuil. | `clamp_min(avg:system.load.1{*}, 100)` |
| `clamp_max()` | Définit les valeurs d'une métrique _supérieures_ à un seuil sur la valeur de ce seuil.  | `clamp_max(avg:system.load.1{*}, 100)` |

Les fonctions `clamp_min()` et `clamp_max()` comprennent un paramètre :

-   `THRESHOLD` : la valeur du seuil que vous spécifiez.
    -   `clamp_min()` définit la valeur de tous les points de données en dessous du seuil sur la valeur de ce seuil, tandis que la fonction `clamp_max()` limite les points de données au-dessus du seuil.

## Cutoff

| Fonction       | Description                                     | Exemple                                 |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| `cutoff_min()` | Supprime les valeurs d'une métrique _inférieures_ à un seuil. | `cutoff_min(avg:system.load.1{*}, 100)` |
| `cutoff_max()` | Supprime les valeurs d'une métrique _supérieures_ à un seuil.  | `cutoff_max(avg:system.load.1{*}, 100)` |

Les fonctions `cutoff_min()` et `cutoff_max()` comprennent un paramètre :

- `THRESHOLD` : la valeur du seuil que vous spécifiez.
    - `cutoff_min()` supprime du graphique toutes les valeurs de métrique inférieures au seuil, tandis que `cutoff_max()` supprime toutes les valeurs de métrique supérieures au seuil.

Les fonctions Cutoff ne suppriment pas les valeurs égales au seuil.

De plus, les fonctions ne suppriment pas définitivement les points de données de Datadog : les valeurs sont uniquement retirées de votre visualisation. Si vous désactivez la fonction, les valeurs supprimées s'affichent à nouveau.

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