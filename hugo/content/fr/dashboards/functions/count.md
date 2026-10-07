---
title: Nombre de valeurs
aliases:
  - /fr/graphing/functions/count/
---
## Nombre de valeurs différentes de zéro

| Fonction          | Description                           | Exemple                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | Calcule le nombre de valeurs qui diffèrent de zéro. | `count_nonzero(<NOM_MÉTRIQUE>{*})` |

Pour une requête regroupée selon une ou plusieurs [clés de tag][1], cette fonction permet de calculer le nombre de valeurs de tag en tenant uniquement compte des valeurs de métriques qui diffèrent de zéro pour chaque point.

Exemple : `count_nonzero(system.cpu.user{*} by {host})` renvoie une série temporelle représentant le nombre de hosts avec une charge système différente de zéro pour chaque point.

{{< img src="dashboards/functions/count/count_nonzero.png" alt="nombre de valeurs différentes de zéro" style="width:80%;">}}

Remarque : `count_nonzero_finite()` peut être utilisé en tant qu'alias de `count_nonzero()`.

## Nombre de valeurs différentes de null

| Fonction           | Description                           | Exemple                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | Calcule le nombre de valeurs qui diffèrent de null. | `count_not_null(<NOM_MÉTRIQUE>{*})` |

Pour une requête regroupée selon une ou plusieurs [clés de tag][1], cette fonction permet de calculer le nombre de valeurs de tag en tenant uniquement compte des valeurs de métriques qui diffèrent de null pour chaque point. Une valeur de métrique null correspond à une valeur non finie.

Exemple : `count_not_null(system.cpu.user{*} by {host})` renvoie une série temporelle représentant le nombre de hosts avec une charge système différente de null pour chaque point.

{{< img src="dashboards/functions/count/count_not_null.png" alt="nombre de valeurs différentes de null" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez uniquement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/getting_started/tagging/