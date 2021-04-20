---
title: Rang
kind: documentation
aliases:
  - /fr/graphing/functions/rank/
---
## Top

| Fonction | Description               | Exemple                                              |
| :----    | :-------                  | :---------                                           |
| `top()`  | Crée un graphique à partir des N premiers éléments. | `top(<NOM_MÉTRIQUE>{*}, <LIMITE_MAX>, '<PAR>', '<ORDRE>')` |

La fonction `top()` comprend trois paramètres :

* `LIMITE_MAX` : le nombre de séries à afficher. Valeurs autorisées :
    - `5`
    - `10`
    - `25`
    - `50`
    - `100`
* `PAR` : la méthode d'agrégation. Valeurs autorisées :
    - `max` : le maximum parmi toutes les valeurs de métriques.
    - `mean` : la moyenne de toutes les valeurs de métriques.
    - `min` : le minimum parmi toutes les valeurs de métriques.
    - `sum` : la somme de toutes les valeurs de métriques.
    - `last` : la dernière valeur de métrique.
    - `l2norm` : utilise la [norme][1] des séries temporelles, qui est toujours positive, pour classer les séries.
    - `area` : l'aire signée sous la courbe du graphique créé, qui peut être négative

* `ORDRE` : l'ordre des résultats. Valeurs autorisées :
    - `asc` : classe les résultats dans l'ordre croissant.
    - `desc` : classe les résultats dans l'ordre décroissant. 

La méthode `top()` offre également des fonctions de commodité de la forme suivante, qui prennent toutes comme argument une seule liste de série :

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm][2]`

Par exemple, `bottom10_min()` récupère les 10 séries de plus faible valeur avec la métrique `min`.

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)