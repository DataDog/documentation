---
aliases:
- /fr/graphing/functions/rate/
description: Calculer les taux, les dérivées et les différences temporelles pour analyser
  les changements de métrique par seconde, minute ou heure.
further_reading:
- link: /monitors/guide/alert-on-no-change-in-value/
  tag: Documentation
  text: Alerte en cas d'absence de changement d'une valeur
title: Taux
---

## Par seconde

| Fonction       | Rôle                                                | Exemple                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | Crée un graphique illustrant le taux de variation de la métrique par seconde. | `per_second(<METRIC_NAME>{*})` |

## Par minute

| Fonction       | Rôle                                                | Exemple                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | Crée un graphique illustrant le taux de variation de la métrique par minute. | `per_minute(<METRIC_NAME>{*})` |

## Par heure

| Fonction     | Rôle                                              | Exemple                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | Crée un graphique illustrant le taux de variation de la métrique par heure. | `per_hour(<METRIC_NAME>{*})` |

## Différence temporelle

| Fonction | Rôle                                                    | Exemple                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | Crée un graphique illustrant la différence temporelle en secondes entre les points envoyés. | `dt(<METRIC_NAME>{*})` |

La fonction dt() renvoie une seule série temporelle quel que soit le nombre de groupes impliqués. Dans cette série temporelle unique, elle prend en compte la différence temporelle de tous les points soumis à travers les différents groupes.

## Différence de valeur

| Fonction | Rôle                    | Exemple                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | Crée un graphique illustrant le delta de la métrique. | `diff(<METRIC_NAME>{*})` |

Calcule la différence entre chaque intervalle sur une base par intervalle. Par exemple, une métrique soumet des points de données avec un intervalle de 15 secondes, le modificateur `diff()` l'afficherait sur un taux de 15 secondes. **Remarque :** le calcul est effectué après l'application de l'agrégation temporelle et avant que l'agrégation spatiale n'ait lieu.

## Différence monotone

| Fonction           | Rôle                                                                     | Exemple                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | Représente le delta de la métrique, tout comme `diff()`, mais uniquement si le delta est positif. | `monotonic_diff(<METRIC_NAME>{*})` |

## Dérivée

| Fonction       | Rôle                                   | Exemple                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | Crée un graphique illustrant la dérivée (diff/dt) de la métrique. | `derivative(<METRIC_NAME>{*})` |

## Débit

| Fonction       | Rôle                                                                                                                                        | Exemple                          |
|:---------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| `throughput()` | Convertit une série temporelle en un taux par seconde, en divisant chaque valeur par le nombre de secondes dans le bucket temporel pour produire la valeur par seconde. | `throughput(<METRIC_NAME>{*})` |

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}