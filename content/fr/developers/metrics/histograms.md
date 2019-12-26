---
title: Histogrammes
kind: documentation
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogstatsD et les API
---
## Présentation

Les histogrammes mesurent la distribution statistique d'un ensemble de valeurs.

Les histogrammes et les métriques de temps Datadog jouent un rôle similaire et viennent compléter la [métrique de temps de StatsD][1] : ils permettent d'agréger les valeurs envoyées durant l'intervalle de transmission. Par défaut, cet intervalle correspond à une période de 10 secondes.

Si vous envoyez 20 valeurs pour la métrique `<NOM_MÉTRIQUE>` durant l'intervalle de transmission, un histogramme Datadog vous renverra l'agrégation de ces valeurs pour l'intervalle de transmission. Voici les différents types d'agrégations :

* `<NOM_MÉTRIQUE>.avg` : renvoie la moyenne des 20 valeurs envoyées durant l'intervalle de transmission.
* `<NOM_MÉTRIQUE>.count` : renvoie le nombre de valeurs envoyées durant l'intervalle de transmission (20 dans le cas présent).
* `<NOM_MÉTRIQUE>.median` : renvoie la médiane des valeurs envoyées durant l'intervalle de transmission.
* `<NOM_MÉTRIQUE>.95percentile` : renvoie la valeur correspondant au 95e centile durant l'intervalle de transmission.
* `<NOM_MÉTRIQUE>.max` : renvoie la valeur maximale envoyée durant l'intervalle de transmission.
* `<NOM_MÉTRIQUE>.min` : renvoie la valeur minimale envoyée durant l'intervalle de transmission.
* `<NOM_MÉTRIQUE>.sum` : renvoie la somme des valeurs envoyées durant l'intervalle de transmission.

Configurez les agrégations que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][2].
Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog.

## Envoi

### Check de l'Agent


| Méthode              | Présentation                                                       |
| :---                | :---                                                           |
| self.histogram(...) | Utilisé pour suivre la distribution statistique d'un ensemble de valeurs. |

### DogStatsD

| Méthode             | Présentation                                                                                  |
| :---               | :---                                                                                      |
| dog.histogram(...) | Utilisé pour suivre la distribution statistique d'un ensemble de valeurs pour un intervalle de transmission StatsD. |


#### Exemple

Consultez la [documentation relative à DogStatsD][3] pour obtenir des exemples de code.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/developers/dogstatsd/data_types#histograms