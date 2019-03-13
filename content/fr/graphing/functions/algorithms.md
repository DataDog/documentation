---
title: Algorithmes
kind: documentation
disable_toc: true
---
## Anomalies

| Fonction      | Description                                                                                | Exemple                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | Applique une bande grise sur la métrique pour montrer le comportement attendu d'une série d'après les données historiques. | `anomalies(avg:<NOM_MÉTRIQUE>{*}, '<ALGORITHME>', <BORNES>)` |

La fonction `anomalies()` comprend deux paramètres :

* `ALGORITHME` :  la méthodologie utilisée pour détecter les anomalies.
* `BORNES` :  largeur de la bande grise. `bornes` peut être interprété comme représentant l'écart type de votre algorithme. Une valeur de 2 ou 3 doit suffire pour inclure la plupart des points « normaux ».

**Remarque** : si vous utilisez des algorithmes de détection d'anomalies agiles ou robustes avec un caractère saisonnier hebdomadaire ou quotidien, vous pouvez mettre à jour votre monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local à l'aide de l'API et de l'IU.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< vimeo 188833506 >}}

Consultez la page [Monitor d'anomalies][1] pour en savoir plus.

## Singularités

| Fonction     | Description                | Exemple                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | Mettre en valeur les séries de singularités. | `outliers(avg:<NOM_MÉTRIQUE>{*}, '<ALGORITHME>', <TOLÉRANCE>, <POURCENTAGE>)` |

La fonction `outliers()` comprend trois paramètres :

* `ALGORITHM` : l'algorithme de singularité à utiliser.
* `TOLÉRANCE` : la tolérance de l'algorithme de singularité.
* `POURCENTAGE` : le pourcentage de points extrêmes nécessaires pour considérer qu'une série constitue une singularité (disponible uniquement pour les algorithmes MAD et scaledMAD).

{{< img src="graphing/functions/algorithms/outlier.gif" alt="détection de singularités" responsive="true" style="width:70%;">}}

Consultez la page [Monitor outlier][2] pour en savoir plus.

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank/" >}}Rang : sélectionnez seulement un sous-ensemble de métriques.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/monitors/monitor_types/anomaly
[2]: /fr/monitors/monitor_types/outlier
