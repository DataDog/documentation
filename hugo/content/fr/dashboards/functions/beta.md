---
title: Fonctions Bêta
aliases:
  - /fr/graphing/functions/beta/
---
Des fonctions Bêta sont disponibles lorsque vous modifiez directement une requête JSON.

## Moyenne mobile

| Fonction          | Description                                    | Exemple                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Calcule la moyenne mobile sur un intervalle de 5 points de données.   | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Calcule la moyenne mobile sur un intervalle de 13 points de données.  | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Calcule la moyenne mobile sur un intervalle de 21 points de données.  | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Calcule la moyenne mobile sur un intervalle de 29 points de données.  | `rollingavg_29(system.load.1{*})` |

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmes : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique à votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}