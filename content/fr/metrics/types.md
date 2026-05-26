---
algolia:
  tags:
  - metric types
aliases:
- /fr/developers/metrics/counts/
- /fr/developers/metrics/distributions/
- /fr/developers/metrics/gauges/
- /fr/developers/metrics/histograms/
- /fr/developers/metrics/rates/
- /fr/developers/metrics/sets/
- /fr/developers/metrics_type/
- /fr/developers/metrics/metrics_type/
- /fr/developers/metrics/types/
further_reading:
- link: extend/dogstatsd
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /metrics/units
  tag: Documentation
  text: Unités des métriques
- link: extend/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Types de métriques
---
## Aperçu {#overview}

Chaque métrique soumise à Datadog doit avoir un type. Le type d'une métrique influe sur la manière dont les valeurs de la métrique sont affichées lors des requêtes, ainsi que sur les possibilités de création de graphiques dans Datadog en utilisant des [modificateurs][1] et des [fonctions][2]. Le type d'une métrique est affiché dans le panneau latéral des détails pour la métrique donnée sur la [page Résumé des métriques][3].

**Remarque** : Modifier le type de métrique dans ce panneau latéral des détails peut modifier le comportement de la métrique dans toutes les visualisations et monitors existants, rendant potentiellement les données historiques incohérentes.

Les types d'envoi de métrique suivants sont acceptés :

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

Ces différents types de métriques envoyés correspondent à quatre types de métriques stockés dans l'application Web Datadog :

- COMPTE
- TAUX
- JAUGE
- DISTRIBUTION

**Remarque** : Si vous soumettez une métrique à Datadog sans type, le type de métrique apparaît comme `Not Assigned` dans Datadog. Le type de métrique `Not Assigned` ne peut pas être changé en un autre type dans l'application tant qu'un type de métrique initial n'est pas soumis.

## Soumission vs. type dans l'application {#submission-vs-in-app-type}

Les métriques sont envoyées à Datadog de trois façons différentes :

- [Vérification de l'agent][5]
- [DogStatsD][6]
- [Datadog's HTTP API][7]

La majorité des données que Datadog reçoit est soumise par l'Agent, soit par le biais d'un [Agent check], soit par DogStatsD. Pour ces méthodes de soumission, le type d'une métrique détermine comment plusieurs valeurs collectées sur un Agent dans [un intervalle de temps de vidage][8] sont agrégées. L'Agent combine ces valeurs en une seule valeur métrique représentative pour cet intervalle. Cette valeur combinée est stockée avec un seul horodatage dans Datadog.

Les données soumises directement à l'API Datadog ne sont pas agrégées par Datadog, à l'exception des métriques de distribution. Les valeurs brutes envoyées à Datadog sont stockées telles quelles.

Lisez la section [Types de soumission et types dans l'application Datadog](#submission-types-and-datadog-in-app-types) pour en savoir plus sur la façon dont différents types de soumission de métriques sont mappés à leurs types correspondants dans l'application.

## Types de métriques {#metric-types}

### Définition {#definition}

{{< tabs >}}
{{% tab "NOMBRE" %}}

Le type de soumission de métriques COUNT représente le nombre total d'occurrences d'événements dans un intervalle de temps. Un COUNT peut être utilisé pour suivre le nombre total de connexions établies à une base de données ou le nombre total de requêtes à un point de terminaison. Ce nombre d'événements peut s'accumuler ou diminuer au fil du temps—il n'est pas monotoniquement croissant.

**Remarque** : Un COUNT est différent du type de métrique RATE, qui représente le nombre d'occurrences d'événements normalisées par seconde compte tenu de l'intervalle de temps défini.

{{% /tab %}}
{{% tab "RATE" %}}

Le type de soumission de métriques RATE représente le nombre total d'occurrences d'événements par seconde dans un intervalle de temps. Un RATE peut être utilisé pour suivre la fréquence à laquelle quelque chose se produit — par exemple, le nombre de connexions établies à une base de données ou le flux de requêtes adressées à un point de terminaison.

**Remarque** : Un RATE est différent du type de soumission de métriques COUNT, qui représente le nombre total d'occurrences d'événements dans l'intervalle de temps donné.

{{% /tab %}}
{{% tab "GAUGE" %}}

Le type de soumission de métriques GAUGE représente un instantané d'événements dans un intervalle de temps. Cette valeur d'instantané représentative est la dernière valeur soumise à l'Agent pendant un intervalle de temps. Un GAUGE peut être utilisé pour mesurer quelque chose qui rapporte en continu—comme l'espace disque disponible ou la mémoire utilisée.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Le type de soumission de métriques HISTOGRAM représente la distribution statistique d'un ensemble de valeurs calculées côté Agent dans un intervalle de temps. Le type de métrique HISTOGRAM de Datadog est une extension du type de métrique de timing StatsD. L'Agent agrège les valeurs qui sont envoyées dans un intervalle de temps défini et produit différentes métriques qui représentent l'ensemble des valeurs.

Si vous envoyez `X` valeurs pour une métrique HISTOGRAM `<METRIC_NAME>` dans un intervalle de temps donné, les métriques suivantes sont produites par défaut par l'Agent :

`<METRIC_NAME>.avg`
: Représente la moyenne de ces `X` valeurs dans l'intervalle de temps.<br>
**Type In-App de Datadog**: GAUGE

`<METRIC_NAME>.count`
: Représente le nombre de valeurs soumises pendant l'intervalle, `X`. L'Agent soumet ce nombre en tant que RATE afin qu'il affiche dans l'application la valeur de `X/interval`. <br>
**Type In-App de Datadog**: RATE

`<METRIC_NAME>.median`
: Représente la médiane de ces `X` valeurs dans l'intervalle de temps.<br>
**Type In-App de Datadog** : GAUGE

`<METRIC_NAME>.95percentile` 
: Représente le 95ème percentile de ces `X` valeurs dans l'intervalle de temps.<br>
**Type In-App de Datadog** : GAUGE

`<METRIC_NAME>.max`
: Représente la valeur maximale de ces `X` valeurs envoyées pendant l'intervalle de temps.<br>
**Type In-App de Datadog** : GAUGE

**Remarques** :

- Configurez les agrégations que vous souhaitez envoyer à Datadog avec le paramètre `histogram_aggregates` dans votre [`datadog.yaml` fichier de configuration][1]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. `sum` et `min` sont également disponibles.
- Configurez l'agrégation de percentile que vous souhaitez envoyer à Datadog avec le paramètre `histogram_percentiles` dans votre [`datadog.yaml` fichier de configuration][2]. Par défaut, seul le `95percentile` est envoyé à Datadog.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Le type de soumission de métriques DISTRIBUTION représente la distribution statistique globale d'un ensemble de valeurs calculées sur l'ensemble de votre infrastructure distribuée dans un intervalle de temps. Une DISTRIBUTION peut être utilisée pour instrumenter des objets logiques, comme des services, indépendamment des hôtes sous-jacents.

Contrairement au type de métrique HISTOGRAM, qui agrège sur l'Agent pendant un intervalle de temps donné, une métrique DISTRIBUTION envoie toutes les données brutes pendant un intervalle de temps à Datadog. Les agrégations se produisent côté serveur. Parce que la structure de données sous-jacente représente des données brutes, non agrégées, les distributions offrent deux fonctionnalités majeures :

- Calcul des agrégations de percentile
- Personnalisation des tags

Si vous envoyez `X` valeurs pour une métrique DISTRIBUTION `<METRIC_NAME>` dans un intervalle de temps donné, les agrégations suivantes sont disponibles par défaut pour la requête :

`avg:<METRIC_NAME>`
: Représente la moyenne de ces `X` valeurs dans l'intervalle de temps.<br>
**Type In-App de Datadog**: GAUGE

`count:<METRIC_NAME>`
: Représente le nombre de points soumis dans l'intervalle de temps, `X`. L'Agent l'envoie ensuite en tant que COUNT.<br>
**Type In-App Datadog**: COUNT

`max:<METRIC_NAME>`
: Représente la valeur maximale de ces `X` valeurs envoyées dans l'intervalle de temps.<br>
**Type In-App Datadog** : GAUGE

`min:<METRIC_NAME>`
: Représente la valeur minimale de ces `X` envoyées dans l'intervalle de temps.<br>
**Type In-App Datadog** : GAUGE

`sum:<METRIC_NAME>`
: Représente la somme de toutes les `X` valeurs envoyées dans l'intervalle de temps.<br>
**Type In-App Datadog** : COUNT

**Remarque** : Bien que les différentes agrégations des valeurs des métriques de distribution soient représentées sous forme de GAUGE ou de COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

{{% /tab %}}
{{< /tabs >}}

### Exemple {#example}

{{< tabs >}}
{{% tab "NOMBRE" %}}

Supposons que vous soumettiez une métrique COUNT, `notifications.sent`, depuis un seul hôte exécutant l'Agent Datadog. Cet hôte émet les valeurs suivantes dans un intervalle de temps de vidage : `[1,1,1,2,2,2,3,3]`.

L'Agent additionne toutes les valeurs reçues dans un intervalle de temps. Ensuite, il soumet le nombre total, dans ce cas `15`, comme valeur de la métrique COUNT.

{{% /tab %}}
{{% tab "RATE" %}}

Supposons que vous soumettiez une métrique RATE, `queue_messages.rate`, depuis un seul hôte exécutant l'Agent Datadog. Cet hôte émet les valeurs suivantes dans un intervalle de temps de vidage : `[1,1,1,2,2,2,3,3]`.

L'Agent additionne toutes les valeurs reçues dans un intervalle de temps. Ensuite, il soumet le nombre total divisé par le nombre total de secondes dans cet intervalle de temps. Dans ce cas, si l'intervalle de vidage est de 10 secondes, la valeur soumise serait `1.5` comme valeur de la métrique RATE.

{{% /tab %}}
{{% tab "GAUGE" %}}

Supposons que vous soumettiez une métrique GAUGE, `temperature`, depuis un seul hôte exécutant l'Agent Datadog. Cet hôte émet les valeurs suivantes dans un intervalle de temps de vidage : `[71,71,71,71,71,71,71.5]`.

L'Agent soumet le dernier nombre rapporté, dans ce cas `71.5`, comme valeur de la métrique GAUGE.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Par exemple, supposons que vous soumettiez une métrique HISTOGRAM, `request.response_time.histogram`, depuis un serveur web qui rapporte les valeurs `[1,1,1,2,2,2,3,3]` pendant une période de flush de 10 secondes. Par défaut, l'Agent soumet les métriques suivantes à Datadog qui représentent la distribution statistique de ces valeurs dans cet intervalle de temps :

| Nom de la métrique                                    | Valeur  | Type dans l’application Datadog |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Supposons que vous soumettiez une métrique DISTRIBUTION, `request.response_time.distribution`, depuis deux serveurs web : `webserver:web_1` et `webserver:web_2`. Supposons que dans un intervalle de temps de flush donné, `webserver:web_1` rapporte la métrique avec les valeurs `[1,1,1,2,2,2,3,3]`, et `webserver:web_2` rapporte la même métrique avec les valeurs `[1,1,2]`. Au cours de cet intervalle de temps, les cinq agrégations suivantes représenteront la distribution statistique globale de toutes les valeurs collectées à partir des deux serveurs web :

| Nom de la métrique                                | Valeur  | Type dans l’application Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Calcul des agrégations de percentile {#calculation-of-percentile-aggregations}

Comme d'autres types de métriques, tels que GAUGE ou HISTOGRAM, le type de métrique DISTRIBUTION a les agrégations suivantes disponibles : `count`, `min`, `max`, `sum`, et `avg`. Les métriques de distribution sont initialement étiquetées de la même manière que les autres métriques (avec des étiquettes personnalisées définies dans le code).

Des agrégations de percentile supplémentaires (`p50`, `p75`, `p90`, `p95`, `p99`) peuvent être ajoutées aux métriques de distribution depuis le [panneau latéral des détails][2] de la métrique. Si vous deviez ajouter des agrégations de percentile à votre métrique de distribution dans l'application, les cinq agrégations supplémentaires suivantes sont disponibles pour la requête :

| Nom de la métrique                              | Valeur | Type dans l’application Datadog |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

C'est-à-dire que pour une métrique de distribution avec des agrégations de percentile ajoutées pendant un intervalle de temps donné, les 10 agrégations suivantes sont disponibles : `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95`, et `p99`.

**Remarque** : Bien que les différentes agrégations des valeurs métriques de distribution soient _représentées_ sous forme de jauges ou de comptes dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

#### Personnalisation des étiquettes {#customization-of-tagging}

Cette fonctionnalité vous permet de contrôler l'étiquetage pour les métriques où la granularité au niveau de l'hôte n'est pas nécessaire. En savoir plus sur [Metrics without Limits™][1].

**Remarque** : L'exclusion des étiquettes n'est pas prise en charge dans la personnalisation des étiquettes basée sur la liste autorisée. L'ajout d'étiquettes commençant par `!` n'est pas accepté.

[1]: /fr/metrics/metrics-without-limits/
[2]: /fr/metrics/summary/#metric-details-sidepanel
{{% /tab %}}
{{< /tabs >}}

### Soumission {#submission}

{{< tabs >}}
{{% tab "NOMBRE" %}}

Envoyez vos métriques de type COUNT depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (python)           | Type de soumission | Type dans l'application Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Vérification de l'agent][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Vérification de l'agent][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**Remarque** : Lors de la soumission d'une métrique de type COUNT via DogStatsD, la métrique apparaît comme un RATE dans l'application pour garantir une comparaison pertinente entre différents agents. Par conséquent, les COUNT StatsD peuvent apparaître avec une valeur décimale dans Datadog (puisqu'ils sont normalisés sur un intervalle de temps pour rapporter des unités par seconde).


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /fr/api/latest/metrics/#submit-metrics
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

Envoyez vos métriques de type RATE depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (python)          | Type de soumission | Type dans l'application Datadog |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Vérification de l'agent][1]  | `self.rate(...)`                    | TAUX            | JAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | TAUX            | TAUX                |

**Remarque** : Pour obtenir des métriques de RATE via DogStatsD, soumettez soit une métrique COUNT soit une métrique HISTOGRAM. Les valeurs de la métrique COUNT et `<HISTOGRAM>.count` sont des deltas normalisés dans le temps de la valeur de la métrique sur la période de flush de StatsD.


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /fr/api/latest/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Envoyez vos métriques de type GAUGE depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (Python)           | Type de soumission | Type dans l'application Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Vérification de l'agent][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /fr/api/latest/metrics/#submit-metrics
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Envoyez vos métriques de type HISTOGRAM depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (Python) | Type de soumission | Types dans l'application Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Vérification de l'agent][1]  | `self.histogram(...)`      | HISTOGRAM           | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

Soumettre une métrique TIMER à l'Agent Datadog équivaut à soumettre une métrique de type HISTOGRAM via DogStatsD (à ne pas confondre avec les timers du StatsD standard). [DogStatsD `TIMER`][3] représente uniquement des données de durée. Par exemple, le temps qu'une section de code met à s'exécuter ou combien de temps il faut pour rendre complètement une page.


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Envoyez vos métriques de type DISTRIBUTION depuis la source suivante :

| Source de soumission | Méthode de soumission (Python) | Type de soumission | Types dans l'application Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |
| [API][2]          | `api_instance.submit_distribution_points(...)` | DISTRIBUTION           | GAUGE, COUNT               |

**Remarque**: Bien que les différentes agrégations des valeurs métriques de distribution soient _représentées_ sous forme de gauges ou de counts dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[2]: /fr/api/latest/metrics/#submit-distribution-points
{{% /tab %}}
{{< /tabs >}}

## Types de soumission et types dans l'application Datadog {#submission-types-and-datadog-in-app-types}

Ci-dessous se trouve un résumé de toutes les sources et méthodes de soumission de métriques disponibles. Ce tableau montre la correspondance entre le type de soumission de métrique correspondant et les types dans l'application :

| Source de soumission | Méthode de soumission (Python)           | Type de soumission | Types dans l'application Datadog |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Vérification de l'agent][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Vérification de l'agent][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Vérification de l'agent][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent check][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Vérification de l'agent][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | DISTRIBUTION         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |

**Remarque&nbsp;:** Bien que les différentes agrégations des valeurs de distribution soient _représentées_ sous forme de GAUGE ou de COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`. Consultez la section [Définitions][19] de cette page pour plus d'informations.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/custom_metrics/type_modifiers/
[2]: /fr/dashboards/functions/
[3]: /fr/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /fr/metrics/custom_metrics/agent_metrics_submission/
[6]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /fr/api/latest/metrics/#submit-metrics
[8]: /fr/extend/dogstatsd/#how-it-works
[9]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[19]: /fr/metrics/types/?tab=distribution#definition