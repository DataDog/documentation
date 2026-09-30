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
description: Découvrez les types de soumission de métriques Datadog (nombre, taux,
  jauge, histogramme, distribution) et la manière dont ils correspondent aux types
  dans l'application.
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
## Présentation {#overview}

Chaque métrique soumise à Datadog doit avoir un type. Le type d'une métrique affecte la manière dont les valeurs de la métrique sont affichées lors d'une requête, ainsi que les possibilités de représentation graphique associées dans Datadog à l'aide de [modificateurs][1] et de [fonctions][2] supplémentaires. Le type d'une métrique est affiché dans le panneau latéral des détails pour la métrique donnée sur la [page Metrics Summary][3].

**Note** : La modification du type de métrique dans ce panneau latéral de détails peut modifier le comportement de la métrique dans toutes les visualisations et tous les monitors existants, rendant potentiellement les données historiques dénuées de sens.

Les types d'envoi de métrique suivants sont acceptés :

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

Ces différents types de soumission de métriques sont mappés sur cinq types de métriques stockés dans l'application Web Datadog :

- COUNT
- RATE
- GAUGE
- DISTRIBUTION
- HISTOGRAM (Explicit, Exponential)

**Remarque** : Si vous soumettez une métrique à Datadog sans type, le type de métrique apparaît comme {{< ui >}}Not Assigned{{< /ui >}} dans Datadog. Le type de métrique {{< ui >}}Not Assigned{{< /ui >}} ne peut pas être modifié en un autre type intégré tant qu'un type de métrique initial n'a pas été soumis.

## Type envoyé et type stocké {#submission-vs-in-app-type}

Les métriques sont envoyées à Datadog de quatre manières principales :

- [Check de l'Agent][5]
- [DogStatsD][6]
- [API HTTP de Datadog][7]
- [API OTLP Metrics][20]

La majorité des données reçues par Datadog sont soumises par l'Agent, soit via [Agent check], soit via DogStatsD. Pour ces méthodes de soumission, le type d'une métrique détermine comment les valeurs multiples collectées sur un Agent dans [a flush time interval][8] sont agrégées. L'Agent combine ces valeurs en une seule valeur de métrique représentative pour cet intervalle. Cette valeur combinée est stockée avec un horodatage unique dans Datadog.

Les données envoyées directement à la Datadog API ne sont pas agrégées par Datadog, à l'exception des métriques de distribution. Les valeurs brutes envoyées à Datadog sont stockées telles quelles.

Lisez la section [Types envoyés et types stockés dans Datadog](#submission-types-and-datadog-in-app-types) pour en savoir plus sur la manière dont les différents types de soumission de métriques sont mappés à leurs types correspondants dans l'application.

## Types de métriques {#metric-types}

### Définition {#definition}

{{< tabs >}}
{{% tab "NOMBRE" %}}

Le type de soumission de métrique COUNT représente le nombre total d'occurrences d'événements dans un intervalle de temps. Un COUNT peut être utilisé pour suivre le nombre total de connexions établies vers une base de données ou le nombre total de requêtes vers un endpoint. Ce nombre d'événements peut augmenter ou diminuer au fil du temps ; il n'est pas strictement croissant.

**Remarque** : Un COUNT est différent du type de métrique RATE, qui représente le nombre d'occurrences d'événements normalisé par seconde sur l'intervalle de temps défini.

{{% /tab %}}
{{% tab "RATE" %}}

Le type de soumission de métrique RATE représente le nombre total d'occurrences d'événements par seconde dans un intervalle de temps. Un RATE peut être utilisé pour suivre la fréquence à laquelle quelque chose se produit, comme la fréquence des connexions établies vers une base de données ou le flux de requêtes effectuées vers un endpoint.

**Remarque** : Un RATE est différent du type de soumission de métrique COUNT, qui représente le nombre total d'occurrences d'événements dans l'intervalle de temps donné.

{{% /tab %}}
{{% tab "GAUGE" %}}

Le type de soumission de métrique GAUGE représente un instantané des événements dans un intervalle de temps. Cette valeur instantanée représentative est la dernière valeur soumise à l'Agent pendant un intervalle de temps. Une GAUGE peut être utilisée pour prendre une mesure de quelque chose qui fait rapport en continu, comme l'espace disque disponible ou la mémoire utilisée.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Le type de soumission de métrique HISTOGRAM représente la distribution statistique d'un ensemble de valeurs calculées côté Agent dans un intervalle de temps. Le type de métrique HISTOGRAM de Datadog est une extension du type de métrique de timing StatsD. L'Agent agrège les valeurs envoyées dans un intervalle de temps défini et produit différentes métriques qui représentent l'ensemble des valeurs.

Si vous envoyez `X` valeurs pour une métrique HISTOGRAM `<METRIC_NAME>` dans un intervalle de temps donné, les métriques suivantes sont produites par l'Agent par défaut :

`<METRIC_NAME>.avg`
: Représente la moyenne de ces `X` valeurs dans l'intervalle de temps.<br>
**Type dans l'application Datadog**: GAUGE

`<METRIC_NAME>.count`
: Représente le nombre de valeurs soumises pendant l'intervalle, `X`. L'Agent soumet ce nombre en tant que TAUX, de sorte qu'il affiche dans l'application la valeur de `X/interval`. <br>
**Type dans l'application Datadog**: RATE

`<METRIC_NAME>.median`
: Représente la médiane de ces `X` valeurs dans l'intervalle de temps.<br>
**Type dans l'application Datadog** : GAUGE

`<METRIC_NAME>.95percentile` 
: Représente le 95e percentile de ces `X` valeurs dans l'intervalle de temps.<br>
**Type dans l'application Datadog** : GAUGE

`<METRIC_NAME>.max`
: Représente la valeur maximale de ces `X` valeurs envoyées pendant l'intervalle de temps.<br>
**Type dans l'application Datadog** : GAUGE

**Remarques** :

- Configurez les agrégations que vous souhaitez envoyer à Datadog avec le paramètre `histogram_aggregates` dans votre [`datadog.yaml` fichier de configuration][1]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. `sum` et `min` sont également disponibles.
- Configurez l'agrégation de centiles que vous souhaitez envoyer à Datadog avec le paramètre `histogram_percentiles` dans votre [`datadog.yaml` fichier de configuration][1]. Par défaut, seule la `95percentile` est envoyée à Datadog.


[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Le type de soumission de métrique DISTRIBUTION représente la distribution statistique globale d'un ensemble de valeurs calculées sur l'ensemble de votre infrastructure distribuée dans un intervalle de temps. Une DISTRIBUTION peut être utilisée pour instrumenter des objets logiques, comme des services, indépendamment des hosts sous-jacents.

Contrairement au type de soumission de métrique HISTOGRAM, qui agrège les valeurs sur l'Agent durant un intervalle de temps donné, une métrique DISTRIBUTION envoie toutes les données brutes à Datadog pendant un intervalle de temps. Les agrégations se produisent côté serveur. Comme la structure de données sous-jacente représente des données brutes non agrégées, les distributions offrent deux fonctionnalités majeures :

- Calcul des agrégations de centiles
- Personnalisation du marquage

Si vous envoyez `X` valeurs pour une métrique DISTRIBUTION `<METRIC_NAME>` dans un intervalle de temps donné, les agrégations suivantes sont disponibles par défaut pour les requêtes :

`avg:<METRIC_NAME>`
: Représente la moyenne de ces `X` valeurs dans l'intervalle de temps.<br>
**Type dans l'application Datadog**: GAUGE

`count:<METRIC_NAME>`
: Représente le nombre de points soumis dans l'intervalle de temps, `X`. L'Agent l'envoie ensuite en tant que COUNT.<br>
**Type dans l'application Datadog**: COUNT

`max:<METRIC_NAME>`
: Représente la valeur maximale de ces `X` valeurs envoyées dans l'intervalle de temps.<br>
**Type dans l'application Datadog** : GAUGE

`min:<METRIC_NAME>`
: Représente la valeur minimale de ces `X` valeurs envoyées dans l'intervalle de temps.<br>
**Type dans l'application Datadog** : GAUGE

`sum:<METRIC_NAME>`
: Représente la somme de toutes les valeurs `X` envoyées dans l'intervalle de temps.<br>
**Type dans l'application Datadog** : COUNT

**Remarque** : Bien que les différentes agrégations des valeurs de métriques de distribution soient _représentées_ en tant que GAUGE ou COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

{{% /tab %}}
{{< /tabs >}}

### Exemple {#example}

{{< tabs >}}
{{% tab "NOMBRE" %}}

Supposons que vous soumettiez une métrique COUNT, `notifications.sent`, depuis un seul host exécutant le Datadog Agent. Cet host émet les valeurs suivantes dans un intervalle de temps de vidage : `[1,1,1,2,2,2,3,3]`.

L'Agent ajoute toutes les valeurs reçues dans un intervalle de temps. Ensuite, il soumet le nombre total, dans ce cas `15`, en tant que valeur de la métrique COUNT.

{{% /tab %}}
{{% tab "RATE" %}}

Supposons que vous soumettiez une métrique RATE, `queue_messages.rate`, depuis un seul host exécutant le Datadog Agent. Cet host émet les valeurs suivantes dans un intervalle de temps de vidage : `[1,1,1,2,2,2,3,3]`.

L'Agent ajoute toutes les valeurs reçues dans un intervalle de temps. Ensuite, il soumet le nombre total divisé par le nombre total de secondes dans cet intervalle de temps. Dans ce cas, si l'intervalle de vidage est de 10 secondes, la valeur soumise serait `1.5` en tant que valeur de la métrique RATE.

{{% /tab %}}
{{% tab "GAUGE" %}}

Supposons que vous soumettiez une métrique GAUGE, `temperature`, depuis un seul host exécutant le Datadog Agent. Cet host émet les valeurs suivantes dans un intervalle de temps de vidage : `[71,71,71,71,71,71,71.5]`.

L'Agent soumet le dernier nombre rapporté, dans ce cas `71.5`, en tant que valeur de la métrique GAUGE.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Par exemple, supposons que vous soumettiez une métrique HISTOGRAM, `request.response_time.histogram`, depuis un serveur web qui rapporte les valeurs `[1,1,1,2,2,2,3,3]` dans un intervalle de vidage de 10 secondes. Par défaut, l'Agent soumet les métriques suivantes à Datadog, qui représentent la distribution statistique de ces valeurs dans cet intervalle de temps :

| Nom de la métrique                                    | Valeur  | Type dans l'application Datadog |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Supposons que vous soumettiez une métrique DISTRIBUTION, `request.response_time.distribution`, depuis deux serveurs web : `webserver:web_1` et `webserver:web_2`. Supposons que dans un intervalle de temps de vidage donné, `webserver:web_1` rapporte la métrique avec les valeurs `[1,1,1,2,2,2,3,3]`, et `webserver:web_2` rapporte la même métrique avec les valeurs `[1,1,2]`. Sur cet intervalle de temps, les cinq agrégations suivantes représenteront la distribution statistique globale de toutes les valeurs collectées à partir des deux serveurs web :

| Nom de la métrique                                | Valeur  | Type dans l'application Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Calcul des agrégations de centiles {#calculation-of-percentile-aggregations}

Comme pour les autres types de métriques, tels que GAUGE ou HISTOGRAM, le type de métrique DISTRIBUTION propose les agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les métriques de distribution sont initialement taguées de la même manière que les autres métriques (avec des tags personnalisés définis dans le code).

Des agrégations de centiles supplémentaires (`p50`, `p75`, `p90`, `p95`, `p99`) peuvent être ajoutées aux métriques de distribution depuis le [panneau latéral des détails][2] de la métrique. Si vous ajoutiez des agrégations de centiles à votre métrique de distribution dans l'application, les cinq agrégations supplémentaires suivantes seraient disponibles pour la requête :

| Nom de la métrique                              | Valeur | Type dans l'application Datadog |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

C'est-à-dire que pour une métrique de distribution avec des agrégations de centiles ajoutées au cours d'un intervalle de temps donné, les 10 agrégations suivantes sont disponibles : `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` et `p99`.

**Remarque** : Bien que les différentes agrégations des valeurs de métriques de distribution soient _représentées_ en tant que GAUGE ou COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

#### Personnalisation du tagging {#customization-of-tagging}

Cette fonctionnalité vous permet de contrôler le tagging pour les métriques où une granularité au niveau du host n'est pas nécessaire. En savoir plus sur [Metrics without Limits™][1].

**Remarque** : L'exclusion de tags n'est pas prise en charge dans la personnalisation des tags basée sur une liste d'autorisation. L'ajout de tags commençant par `!` n'est pas accepté.

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
| [Check de l'Agent][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Check de l'Agent][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**Remarque** : Lors de la soumission d'un type de métrique COUNT via DogStatsD, la métrique apparaît comme un RATE dans l'application pour garantir une comparaison pertinente entre différents Agents. Par conséquent, les comptes StatsD peuvent apparaître avec une valeur décimale dans Datadog (puisqu'ils sont normalisés sur un intervalle de temps pour rapporter des unités par seconde).


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /fr/api/latest/metrics/#submit-metrics
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

Envoyez vos métriques de type RATE depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (python)          | Type de soumission | Type dans l'application Datadog |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Check de l'Agent][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**Remarque** : Pour obtenir des métriques de type RATE via DogStatsD, soumettez soit une métrique [COUNT][16], soit une métrique [HISTOGRAM][18]. Les valeurs des métriques COUNT et `<HISTOGRAM>.count` sont des deltas normalisés dans le temps de la valeur de la métrique sur la période de flush de StatsD.


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /fr/api/latest/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Envoyez vos métriques de type GAUGE depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (Python)           | Type de soumission | Type dans l'application Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Check de l'Agent][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /fr/api/latest/metrics/#submit-metrics
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Envoyez vos métriques de type HISTOGRAM depuis l'une des sources suivantes :

| Source de soumission | Méthode de soumission (Python) | Type de soumission | Types Datadog dans l'application |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Check de l'Agent][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

La soumission d'une métrique TIMER au Datadog Agent équivaut à la soumission d'un type de métrique HISTOGRAM dans DogStatsD (à ne pas confondre avec les timers dans le StatsD standard). [DogStatsD `TIMER`][3] représente uniquement des données de durée. Par exemple, le temps qu'une section de code met à s'exécuter ou le temps nécessaire pour rendre entièrement une page.


[1]: /fr/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Envoyez vos métriques de type DISTRIBUTION depuis la source suivante :

| Source de soumission | Méthode de soumission (Python) | Type de soumission | Types Datadog dans l'application |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |
| [API][2]          | `api_instance.submit_distribution_points(...)` | DISTRIBUTION           | GAUGE, COUNT               |

**Remarque** : Bien que les différentes agrégations des valeurs de métriques de distribution soient _représentées_ en tant que GAUGE ou COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`.

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[2]: /fr/api/latest/metrics/#submit-distribution-points
{{% /tab %}}
{{< /tabs >}}

## Types envoyés et types stockés dans Datadog {#submission-types-and-datadog-in-app-types}

Vous trouverez ci-dessous un résumé de toutes les sources et méthodes de soumission de métriques disponibles. Ce tableau présente le mappage entre le type de soumission de métrique correspondant et les types dans l'application :

| Source de soumission | Méthode de soumission (Python)           | Type de soumission | Type dans l'application Datadog |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Check de l'Agent][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Check de l'Agent][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Check de l'Agent][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Check de l'Agent][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Check de l'Agent][13] | `self.rate(...)`                     | RATE            | GAUGE                |
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

**Remarque** : Bien que les différentes agrégations des valeurs de métriques de distribution soient _représentées_ en tant que GAUGE ou COUNT dans l'application, la métrique elle-même conserve le type `DISTRIBUTION`. Consultez la section [Définitions][19] de cette page pour plus d'informations.

## Pour aller plus loin {#further-reading}

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
[20]: /fr/opentelemetry/setup/otlp_ingest/metrics/