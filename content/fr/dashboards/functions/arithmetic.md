---
title: Opérations arithmétiques
kind: documentation
aliases:
  - /fr/graphing/functions/arithmetic/
---
## Valeur absolue

| Fonction | Description                             | Exemple                 |
| :----    | :-------                                | :---------              |
| `abs()`  | Représente la valeur absolue de la métrique. | `abs(<NOM_MÉTRIQUE>{*})` |

Transforme cette série temporelle sinus `sin{*}` :

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Fonction sinus" style="width:80%;">}}

en la fonction `abs(sin{*})` :

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="Fonction sinus avec valeur abs" style="width:80%;">}}

## Opérations logarithmiques

### Logarithme binaire

| Fonction | Description                               | Exemple                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Représente le logarithme de base 2 de la métrique. | `log2(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si vous avez une métrique `x{*}` qui s'incrémente de 1 pour chaque point de données, alors `log2(x{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/log2.png" alt="fonction log2" style="width:80%;">}}

### Logarithme décimal

| Fonction  | Description                                | Exemple                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Représente le logarithme de base 10 de la métrique. | `log10(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si vous avez une métrique `x{*}` qui s'incrémente de 1 pour chaque point de données, alors `log10(x{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/log10.png" alt="function log10" style="width:80%;">}}

## Somme cumulée

| Fonction   | Description                                                          | Exemple                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Représente la somme cumulée de la métrique sur l'intervalle visible. | `cumsum(<NOM_MÉTRIQUE>{*})` |

Exemple :

Si vous avez une métrique `const_1{*}` qui est une constante de valeur `1`, alors `cumsum(const_1{*})` donne le graphique suivant :

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="fonction somme cumulée avec valeur absolue" style="width:80%;">}}

## Intégrale

| Fonction     | Description                       | Exemple                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Représente l'intégrale de la métrique. | `integral(<NOM_MÉTRIQUE>{*})` |

**Remarque** : la fonction `integral()` de Datadog représente la somme cumulée de `[delta durée] x [delta valeur]` sur toutes les paires de points consécutives dans l'intervalle visible d'une métrique donnée.

{{< img src="dashboards/functions/arithmetic/integral.png" alt="fonction intégrale avec valeur absolue" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmes : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Total : comptez les valeurs différentes de zéro ou de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique à votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}