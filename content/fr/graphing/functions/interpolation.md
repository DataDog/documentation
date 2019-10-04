---
title: Interpolation
kind: documentation
---

## Fill

| Fonction | Description                                       | Exemple                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Permet d'interpoler les valeurs manquantes d'une métrique. | `<NOM_MÉTRIQUE>{*}.fill(<MÉTHODE>, <LIMITE>)` |

La fonction `fill()` comprend deux paramètres :

* **`MÉTHODE`** : la fonction à utiliser comme méthode d'interpolation. Valeurs autorisées :
    * **linear** : renvoie une interpolation linéaire entre le début et la fin de l'intervalle manquant.
    * **last** : remplace l'intervalle manquant par la dernière valeur de celui-ci.
    * **zero** : remplace l'intervalle manquant par un zéro.
    * **null** : désactive l'interpolation.

* `LIMITE` : la limite d'interpolation (en secondes), c'est-à-dire la taille maximale d'un intervalle manquant que vous souhaitez interpoler.

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}
