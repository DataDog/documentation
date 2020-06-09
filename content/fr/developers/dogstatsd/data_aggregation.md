---
title: Agrégation de données DogStatsD
kind: documentation
description: Découvrez comment le serveur DogStatsD agrège vos données avant de les envoyer à Datadog
aliases:
  - /fr/developers/faq/data-aggregation-with-dogstatsd-threadstats
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
Le service DogStatsD de Datadog implémente le protocole StatsD, [avec quelques différences][1]. DogStatsD vous permet d'envoyer des métriques et de surveiller le code de votre application sans la bloquer. Les données sont transmises depuis votre application via UDP au [serveur DogStatsD][2] local (intégré à l'Agent Datadog), qui les agrège et les envoie ensuite à l'endpoint d'API Datadog. [En savoir plus sur la configuration de DogStatsD][2].

Cet article explique pourquoi et comment vos données sont agrégées.

## Pourquoi agréger les métriques ?

L'agrégation permet d'améliorer les performances en réduisant le nombre d'appels d'API, qui prennent chacun un certain temps.

Prenons pour exemple une [métrique COUNT][3] qui est incrémentée 1 000 fois (+1 chaque fois) sur une courte période. Au lieu d'effectuer 1 000 appels d'API distincts, le serveur DogStatsD les agrège en quelques appels d'API. Selon la situation (voir ci-dessous), la bibliothèque peut envoyer, par exemple, 1 point de données avec la valeur 1 000 ou X points de données agrégés avec une valeur cumulée de 1 000.

## Comment l'agrégation est-elle effectuée avec le serveur DogStatsD ?

[DogStatsD][2] utilise un _intervalle de transmission_ de 10 secondes. Toutes les 10 secondes, [DogStatsD][2] vérifie toutes les données reçues depuis la dernière transmission (c'est-à-dire, au cours des 10 dernières secondes). Toutes les valeurs qui correspondent au même nom de métrique et aux mêmes tags sont agrégées afin d'obtenir une valeur unique.

**Remarque** : avec le protocole StatsD, le client StatsD n'envoie pas les métriques avec leurs timestamps. Le timestamp est ajouté au moment de la transmission. Ainsi, si une transmission se produit à 10:00:10, toutes les données reçues par le serveur [DogStatsD][2] (intégré à l'Agent Datadog) entre 10:00:00 et 10:00:10 sont cumulées sous la forme d'un point de données unique qui reçoit le timestamp 10:00:00.

## Règles d'agrégation par type de métrique

Parmi toutes les valeurs reçues pendant un même intervalle de transmission, la valeur agrégée envoyée dépend du [type de métrique][4] :

| Type de métrique       | Agrégation effectuée sur un intervalle de transmission                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GAUGE][5]        | Le dernier point de données est envoyé.                                                                                                                           |
| [COUNT][3]        | La somme de tous les points de données est envoyée.                                                                                                                      |
| [HISTOGRAM][6]    | Les valeurs min, max, sum, avg, 95 percentile, count et median de tous les points de données sont envoyées. Consultez la [page relative aux métriques HISTOGRAM][6] pour en savoir plus. |
| SET               | Le nombre points de données distincts est envoyé.                                                                                                                      |
| [DISTRIBUTION][7] | Agrégation en tant que distributions globales.                                                                                                                              |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/
[3]: /fr/developers/metrics/types/?tab=count#metric-types
[4]: /fr/developers/metrics/types/
[5]: /fr/developers/metrics/types/?tab=gauge#metric-types
[6]: /fr/developers/metrics/types/?tab=histogram#metric-types
[7]: /fr/developers/metrics/types/?tab=distribution#metric-types