---
aliases:
- /fr/graphing/functions/arithmetic/
title: Opérations arithmétiques
---

## Valeur absolue

| Fonction | Description                             | Exemple                 |
| :----    | :-------                                | :---------              |
| `abs()`  | Représente la valeur absolue de la métrique. | `abs(<NOM_MÉTRIQUE>{*})` |

Transforme cette série temporelle sinus `sin{*}` :

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Fonction sinus" style="width:80%;">}}

en la fonction `abs(sin{*})` :

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="Fonction sinus avec valeur absolue" style="width:80%;">}}

## Opérations logarithmiques

### Logarithme binaire

| Fonction | Description                               | Exemple                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Représente le logarithme de base 2 de la métrique. | `log2(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si une métrique `x{*}` s'incrémente de 1 pour chaque point de données, alors `log2(x{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/log2.png" alt="Fonction log2" style="width:80%;">}}

### Logarithme décimal

| Fonction  | Description                                | Exemple                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Représente le logarithme de base 10 de la métrique. | `log10(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si une métrique `x{*}` s'incrémente de 1 pour chaque point de données, alors `log10(x{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/log10.png" alt="Fonction log10" style="width:80%;">}}

## Somme cumulée

| Fonction   | Description                                                          | Exemple                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Représente la somme cumulée de la métrique sur l'intervalle visible. | `cumsum(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si une métrique `const_1{*}` est une constante de valeur `1`, alors `cumsum(const_1{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="Fonction somme cumulée avec valeur absolue" style="width:80%;">}}

## Somme cumulée dans les monitors

La somme cumulée doit être évitée dans les requêtes de monitor, car sa fonction est visuelle. Lorsqu'elle est utilisée dans une requête dashboard ou notebook, les points reflètent les valeurs basées sur la période sélectionnée. Cela ne sʼapplique pas bien dans une requête monitor, car le monitor ne sait pas quelle période utiliser.

Au lieu de cela, configurez [des périodes cumulées][1] dans votre période d'évaluation monitor.

## Intégrale

| Fonction     | Description                       | Exemple                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Représente l'intégrale de la métrique. | `integral(<NOM_MÉTRIQUE>{*})` |

**Remarque** : la fonction `integral()` de Datadog représente la somme cumulée de `[delta durée] x [delta valeur]` sur toutes les paires de points consécutives dans l'intervalle visible d'une métrique donnée.

{{< img src="dashboards/functions/arithmetic/integral.png" alt="Fonction intégrale avec valeur absolue" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
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

[1]: /fr/monitors/configuration/?tab=thresholdalert#cumulative-time-windows