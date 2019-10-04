---
title: Total
kind: documentation
---
## Total sans les zéros

| Fonction          | Description                           | Exemple                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | Calcule le total de toutes les valeurs qui diffèrent de zéro. | `count_nonzero(<NOM_MÉTRIQUE>{*})` |


Pour une requête regroupée selon une ou plusieurs [clés de tag][1], cette fonction permet de calculer le nombre de valeurs de tag en tenant uniquement compte des valeurs de métriques qui diffèrent de zéro pour chaque point.

Exemple : `count_nonzero(system.cpu.user{*} by {host})` renvoie une série temporelle représentant le nombre de hosts avec une charge système différente de zéro pour chaque point.

{{< img src="graphing/functions/count/count_nonzero.png" alt="total sans les zéros" responsive="true" style="width:80%;">}}

## Total sans les null

| Fonction           | Description                           | Exemple                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | Calcule le total de toutes les valeurs qui diffèrent de null. | `count_not_null(<NOM_MÉTRIQUE>{*})` |

Pour une requête regroupée selon une ou plusieurs [clés de tag][1], cette fonction permet de calculer le nombre de valeurs de tag en tenant uniquement compte des valeurs de métriques qui diffèrent de null pour chaque point. Une valeur de métrique null correspond à une valeur non finie.

Exemple : `count_not_null(system.cpu.user{*} by {host})` renvoie une série temporelle représentant le nombre de hosts avec une charge système différente de null pour chaque point.

{{< img src="graphing/functions/count/count_not_null.png" alt="total sans les null" responsive="true" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/tagging