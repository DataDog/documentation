---
title: Taux
aliases:
  - /fr/graphing/functions/rate/
---
## Par seconde

| Fonction       | Description                                                | Exemple                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | Crée un graphique illustrant le taux de variation de la métrique par seconde. | `per_second(<NOM_MÉTRIQUE>{*})` |

## Par minute

| Fonction       | Description                                                | Exemple                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | Crée un graphique illustrant le taux de variation de la métrique par minute. | `per_minute(<NOM_MÉTRIQUE>{*})` |

## Par heure

| Fonction     | Description                                              | Exemple                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | Crée un graphique illustrant le taux de variation de la métrique par heure. | `per_hour(<NOM_MÉTRIQUE>{*})` |

## Durée du delta

| Fonction | Description                                                    | Exemple                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | Crée un graphique illustrant la différence temporelle en secondes entre les points envoyés. | `dt(<NOM_MÉTRIQUE>{*})` |

## Valeur du delta

| Fonction | Description                    | Exemple                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | Crée un graphique illustrant le delta de la métrique. | `diff(<NOM_MÉTRIQUE>{*})` |

## Valeur du delta monotone

| Fonction           | Description                                                                     | Exemple                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | Représente le delta de la métrique, tout comme `diff()`, mais uniquement si le delta est positif. | `monotonic_diff(<NOM_MÉTRIQUE>{*})` |

## Dérivée

| Fonction       | Description                                   | Exemple                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | Crée un graphique illustrant la dérivée (diff/dt) de la métrique. | `derivative(<NOM_MÉTRIQUE>{*})` |

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}