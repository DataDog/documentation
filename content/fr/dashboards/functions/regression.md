---
title: Régression
aliases:
  - /fr/graphing/functions/regression/
---
## Évolution tendancielle robuste

| Fonction         | Description                                          | Exemple                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Ajuste une ligne de tendance de régression robuste grâce à la fonction de perte de Huber. | `robust_trend(avg:<NOM_MÉTRIQUE>{*})` |

La méthode des moindres carrés ordinaire (MCO) est le type le plus courant de régression linéaire. Elle peut être grandement influencée par un petit nombre de points avec des valeurs extrêmes. La régression robuste est une méthode alternative qui n'est pas autant influencée par un petit nombre de valeurs extrêmes. Prenons comme exemple le graphique suivant.

{{< img src="dashboards/functions/regression/robust_trend.png" alt="Évolution tendancielle robuste" style="width:80%;">}}

La métrique d'origine est représentée par une ligne bleue continue. La ligne violette en pointillés est une ligne de régression MCO et la ligne jaune en pointillés est une ligne de régression robuste. Le seul pic de courte durée de la métrique engendre une ligne de régression MCO qui suit une tendance à la hausse, mais la ligne de régression robuste ignore ce pic et reflète davantage la tendance générale de la métrique.

## Ligne de tendance

| Fonction       | Description                                                              | Exemple                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | Ajuste une ligne de régression des moindres carrés ordinaire en fonction des valeurs des métriques. | `trend_line(avg:<NOM_MÉTRIQUE>{*})` |

Exemple :

Pour la fonction `sin(x) * x/2 + x`, `trend_line(sin(x) * x/2 + x)` donne le graphique suivant :

{{< img src="dashboards/functions/regression/trend_line_function.png" alt="Fonction de ligne de tendance" style="width:80%;">}}

## Fonction constante par morceaux

| Fonction               | Description                                                                            | Exemple                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | Réalise une estimation de la métrique à l'aide d'une fonction par morceaux composée de segments avec des valeurs constantes. | `piecewise_constant(avg:<NOM_MÉTRIQUE>{*})` |

Exemple :

Pour la fonction `x`, `piecewise_constant(x)` donne le graphique suivant :

{{< img src="dashboards/functions/regression/piecewise_constant.png" alt="Fonction constante par morceaux" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}