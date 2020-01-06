---
title: Régression
kind: documentation
---

## Évolution tendancielle robuste

| Fonction         | Description                                          | Exemple                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Ajuste une ligne de tendance de régression robuste grâce à la fonction de perte de Huber. | `robust_trend(avg:<NOM_MÉTRIQUE>{*})` |


La méthode des moindres carrés ordinaire (MCO) est le type le plus courant de régression linéaire. Elle peut être grandement influencée par un petit nombre de points avec des valeurs extrêmes. La régression robuste est une méthode alternative qui n'est pas autant influencée par un petit nombre de valeurs extrêmes. Prenons comme exemple le graphique suivant.

{{< img src="graphing/functions/regression/robust_trend.png" alt="évolution tendancielle robuste" responsive="true" style="width:80%;">}}

La métrique d'origine est représentée par une ligne bleue continue. La ligne violette en pointillés est une ligne de régression MCO et la ligne jaune en pointillés est une ligne de régression robuste. Le seul pic de courte durée de la métrique engendre une ligne de régression MCO qui suit une tendance à la hausse, mais la ligne de régression robuste ignore ce pic et reflète davantage la tendance générale de la métrique.

## Ligne de tendance

| Fonction       | Description                                                              | Exemple                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | Ajuste une ligne de régression des moindres carrés ordinaire en fonction des valeurs des métriques. | `trend_line(avg:<NOM_MÉTRIQUE>{*})` |

Exemple :

Si on trace la fonction `sin(x) * x/2 + x`, alors `trend_line(sin(x) * x/2 + x)` prendra la forme suivante : 

{{< img src="graphing/functions/regression/trend_line_function.png" alt="fonction de ligne de tendance" responsive="true" style="width:80%;">}}

## Fonction constante par morceaux

| Fonction               | Description                                                                            | Exemple                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | Réalise une estimation de la métrique à l'aide d'une fonction par morceaux composée de segments avec des valeurs constantes. | `piecewise_constant(avg:<NOM_MÉTRIQUE>{*})` |

Exemple :

Si on trace la fonction `x`, alors `piecewise_constant(x)` prendra la forme suivante : 

{{< img src="graphing/functions/regression/piecewise_constant.png" alt="fonction constante par morceaux" responsive="true" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : saisissez ou définissez des valeurs par défaut pour votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique.. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}
