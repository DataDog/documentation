---
algolia:
  tags:
  - anomaly
  - graphique des anomalies
aliases:
- /fr/graphing/functions/algorithms/
kind: documentation
title: Algorithmes
---

## Anomalies

| Fonction      | Description                                                                                | Exemple                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | Applique une bande grise sur la métrique pour montrer le comportement attendu d'une série d'après les données historiques. | `anomalies(<NOM_MÉTRIQUE>{*}, '<ALGORITHME>', <LIMITES>)` |

La fonction `anomalies()` comprend deux paramètres :

* `ALGORITHME` :  méthodologie utilisée pour détecter les anomalies.
* `LIMITES` :  largeur de la bande grise. `LIMITES` peut être interprété comme la représentation de l'écart type de votre algorithme. Une valeur de 2 ou 3 doit suffire pour inclure la plupart des points « normaux ».

**Remarque** : si vous utilisez des algorithmes de détection d'anomalies agiles ou robustes avec un caractère saisonnier hebdomadaire ou quotidien, vous pouvez mettre à jour votre monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local à l'aide de l'API et de l'IU.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/188833506/rendition/1080p/file.mp4?loc=external&signature=96eacc46a18438ce0f45d5b57952cd924482f8f18e011ceb7b76b6ce1b4587a2" poster="/images/poster/algorithms.png" >}}

**Saisonnalité** : Par défaut, les algorithmes `robust` et `agile` utilisent la [saisonnalité hebdomadaire][4], qui nécessite de recueillir des données historiques pendant trois semaines pour calculer la référence.

Consultez la page [Monitor d'anomalie][1] pour en savoir plus.

## Singularités

| Fonction     | Description                | Exemple                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | Mettre en valeur les séries de singularités. | `outliers(<NOM_MÉTRIQUE>{*}, '<ALGORITHME>', <TOLÉRANCE>, <POURCENTAGE>)` |

La fonction `outliers()` comprend trois paramètres :

* `ALGORITHME` : l'algorithme de singularité à utiliser.
* `TOLÉRANCE` : la tolérance de l'algorithme de singularité.
* `POURCENTAGE` : le pourcentage de points extrêmes nécessaires pour considérer qu'une série constitue une singularité (disponible uniquement pour les algorithmes MAD et scaledMAD).

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="détection des singularités" video="true" width="70%" >}}

Consultez la page [Monitor outlier][2] pour en savoir plus.

## Forecast

| Fonction     | Description                | Exemple                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | Prédit la direction future d'une métrique. | `forecast(<NOM_MÉTRIQUE>{*}, '<ALGORITHME>', <DÉVIATIONS>)` |

La fonction `forecast()` comprend deux paramètres :

* `ALGORITHME` : l'algorithme de prévision à utiliser. Les options disponibles sont `linear` et `seasonal`. Pour en savoir plus sur ces algorithmes, consultez la section [Algorithmes de prévision][3].
* `DÉVIATIONS` : la largeur de la plage des valeurs prédites. Une valeur de 1 ou 2 devrait être suffisante pour prévoir avec précision la plupart des points « normaux ».

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
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

[1]: /fr/monitors/types/anomaly/
[2]: /fr/monitors/types/outlier/
[3]: /fr/monitors/types/forecasts/?tab=linear#algorithms
[4]: /fr/monitors/types/anomaly/?s=anomaly%20algorithm#seasonality