---
title: Fonctions Bêta
kind: documentation
---

Des fonctions Bêta sont disponibles lorsque vous modifiez directement une requête JSON.

## Valeur par défaut

| Fonction    | Description                             | Exemple                                      |
|-------------|-----------------------------------------|----------------------------------------------|
| `default()` | Ajoute une valeur par défaut aux métriques creuses. | `default(system.load.1{*}, <valeur_défaut>)` |

**valeur_défaut** correspond à la valeur à utiliser en l'absence de données.

## Exclure les valeurs null

| Fonction         | Description                                    | Exemple                                        |
|------------------|------------------------------------------------|------------------------------------------------|
| `exclude_null()` | Supprime les groupes sans valeur de votre graphique ou de votre Top List. | `exclude_null(avg:system.load.1{*} by {host})` |

## Moyenne mobile

| Fonction          | Description                                    | Exemple                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Calcule la moyenne mobile sur un intervalle de 5 éléments.   | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Calcule la moyenne mobile sur un intervalle de 13 éléments.  | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Calcule la moyenne mobile sur un intervalle de 21 éléments.  | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Calcule la moyenne mobile sur un intervalle de 29 éléments.  | `rollingavg_29(system.load.1{*})` |

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}
