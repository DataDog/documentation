---
title: Types de métriques
kind: documentation
aliases:
  - /fr/developers/metrics/counts/
  - /fr/developers/metrics/distributions/
  - /fr/developers/metrics/gauges/
  - /fr/developers/metrics/histograms/
  - /fr/developers/metrics/rates/
  - /fr/developers/metrics/sets/
  - /fr/developers/metrics_type/
  - /fr/developers/metrics/metrics_type/
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: En savoir plus sur DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
---
Le type d'une métrique détermine la façon dont elle est agrégée dans les requêtes et les valeurs affichées sur les graphiques Datadog. Les fonctions d'agrégation temporelle par défaut et les [modificateurs de type de métrique][1] peuvent différer en fonction du type de métrique utilisé. Ce type est visible dans le volet latéral affichant les détails d'une métrique spécifique sur la [page de résumé des métriques][2]. Remarque : la modification du type de métrique depuis ce volet latéral peut affecter le comportement de la métrique dans les visualisations et les monitors existants, rendant alors les données historiques potentiellement incompréhensibles.

Les métriques envoyées peuvent être des types suivants :

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)

Lorsqu'une métrique est envoyée, elle est ensuite stockée dans l'application Web Datadog. Les métriques stockées peuvent être des 3 types suivants :

* `COUNT`
* `RATE`
* `GAUGE`

Pour en savoir plus sur les différents types de métrique disponibles, consultez la section [Définition des types de métrique](#definition-des-types-de-metrique). Consultez également les sections [Types envoyés et types stockés dans Datadog](#types-envoyes-et-types-stockes-dans-datadog) pour découvrir le comportement de chaque type de métrique entre son envoi et son stockage dans Datadog.

## Définitions des types de métriques

Afin de mieux comprendre les différents types de métriques, ce qu'ils représentent et comment les modifier au sein de Datadog, imaginez l'exemple suivant :

Vous avez deux serveurs Web : `server:web_1` et `server:web_2`. Les deux serveurs Web reçoivent continuellement :

* 10 requêtes HTTP pendant les 30 premières secondes, puis
* 20 requêtes HTTP pendant les 30 secondes suivantes, puis
* 0 requête HTTP pendant les 30 secondes suivantes.

### Types de métriques envoyés

{{< tabs >}}
{{% tab "COUNT" %}}

**Les métriques de type `COUNT` représentent le nombre d'événements survenus dans une période définie, également appelée intervalle de transmission**. Ce nombre d'événements peut augmenter ou diminuer dans le temps : il n'est pas strictement croissant. Un `COUNT` peut servir à surveiller le nombre de requêtes qui atteignent vos serveurs Web ou le nombre d'erreurs.

**Remarque** : le type de métrique `COUNT` est différent de `RATE`, qui représente le nombre d'événements normalisé _par seconde_ pour la période donnée.

Par exemple, imaginons que la métrique `number.of.requests.count` est envoyée à Datadog toutes les 30 secondes avec le type `COUNT` pour `server:web_1`.

Chaque valeur ou point de données de cette métrique envoyée en tant que `COUNT` représente le nombre de requêtes reçues durant l'intervalle de transmission de 30 secondes. La métrique renvoie donc les valeurs suivantes :

* `10` pour les 30 premières secondes
* `20` pour le deuxième intervalle de 30 secondes
* `null` pour le dernier intervalle de 30 secondes

**Remarque** : lorsque la valeur `0` est envoyée pour une métrique `COUNT`, la valeur stockée dans Datadog est `null`.

La représentation graphique de cette métrique `COUNT` donne ce qui suit :

{{< img src="developers/metrics/types/count_metric.png" alt="Métrique count" >}}

**Remarque** : les valeurs des métriques count StatsD s'affichent avec une valeur décimale dans Datadog, car elles sont normalisées sur l'intervalle de transmission et renvoyées en unités par seconde.

Découvrez comment envoyer des métriques count :

* [Avec un check custom de l'Agent][1]
* [Avec DogStatsD][2]
* [Avec l'API Datadog][3]

[1]: /fr/developers/metrics/agent_metrics_submission/?tab=count
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/#count
[3]: /fr/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**Les métriques de type `RATE` représentent le nombre d'événements survenus dans une période définie (l'intervalle de transmission), normalisé par seconde. Le type `RATE` peut servir à surveiller le taux de requêtes qui atteignent vos serveurs Web.

**Remarque** : le type de métrique `RATE` est différent de `COUNT`, qui représente le nombre d'événements dans l'intervalle de transmission.

Par exemple, imaginons que la métrique `number.of.requests.rate` est envoyée à Datadog toutes les 30 secondes avec le type `RATE` pour `server:web_1`.

Chaque valeur ou point de données représente le taux de requêtes. La métrique renvoie donc les valeurs suivantes :

* `0.33` pour les 30 premières secondes
* `0.66` pour le deuxième intervalle de 30 secondes
* `null` pour le dernier intervalle de 30 secondes
Cette séquence de `0.33`, `0.66`, `0` se répète. **Remarque** : lorsque la valeur `0` est envoyée pour une métrique `RATE`, la valeur stockée dans Datadog est `null`.

Le type de métrique `RATE` étant la variation normalisée par seconde du nombre de requêtes, sa représentation graphique donne ce qui suit :

{{< img src="developers/metrics/types/rate_metric.png" alt="Métrique rate" >}}

Découvrez comment envoyer des métriques rate :

* [Avec un check custom de l'Agent][1]
* [Avec l'API Datadog][2]

[1]: /fr/developers/metrics/agent_metrics_submission/?tab=rate
[2]: /fr/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**Les métriques de type `GAUGE` représentent une valeur d'un certain élément évalué en continu dans le temps.** Il s'agit d'un snapshot de la dernière valeur enregistrée de cet élément durant une période définie (l'intervalle de transmission). Le type `GAUGE` peut représenter la température ou la mémoire utilisée.

Par exemple, imaginons que la métrique `number.of.requests.gauge` est envoyée à Datadog toutes les 30 secondes avec le type `GAUGE` pour `server:web_1`.

Chaque valeur ou point de données représente le nombre total de requêtes reçues à un moment donné. La métrique renvoie donc les valeurs suivantes :

* `10` pour les 30 premières secondes
* `30` pour le deuxième intervalle de 30 secondes (10 + 20 requêtes)
* `30` pour le dernier intervalle de 30 secondes (la valeur reste identique car aucune nouvelle requête n'est reçue)

La représentation graphique de cette métrique `GAUGE` donne ce qui suit :

{{< img src="developers/metrics/types/gauge_metric.png" alt="Métrique gauge" >}}

Découvrez comment envoyer des métriques gauge :

* [Avec un check custom de l'Agent][1]
* [Avec DogStatsD][2]
* [Avec l'API Datadog][3]

[1]: /fr/developers/metrics/agent_metrics_submission/?tab=gauge
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /fr/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

**Les métriques de type `HISTOGRAM` vous permettent de mesurer la distribution statistique d'un ensemble de valeurs**. Le type de métrique `HISTOGRAM` de Datadog est une extension du [type de métrique timer dans StatsD][1] : il agrège (du côté de l'Agent) les valeurs envoyées durant un intervalle donné (l'intervalle de transmission par défaut est de 10 secondes) et génère différentes valeurs temporelles représentant les différentes agrégations possibles pour l'ensemble de valeurs. Le type de métrique stocké dans Datadog varie en fonction de l'agrégation.

Par exemple : si vous envoyez `X` valeurs pour la métrique `HISTOGRAM` `<NOM_MÉTRIQUE>` durant un intervalle de transmission de l'Agent, l'Agent génère par défaut les séries temporelles suivantes :

| Agrégation                  | Description                                                                                                                                               | Type de métrique Datadog |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `<NOM_MÉTRIQUE>.avg`          | Renvoie la moyenne des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                      | GAUGE               |
| `<NOM_MÉTRIQUE>.count`        | Renvoie le nombre de points échantillonnés durant l'intervalle. Ce nombre `X` est ensuite envoyé par l'Agent en tant que `RATE`, ce qui signifie que la valeur affichée dans Datadog est `X/intervalle`. | RATE                |
| `<NOM_MÉTRIQUE>.median`       | Renvoie la médiane des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                           | GAUGE               |
| `<NOM_MÉTRIQUE>.95percentile` | Renvoie la valeur correspondant au 95e centile des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                  | GAUGE               |
| `<NOM_MÉTRIQUE>.max`          | Renvoie la valeur maximale des `X` valeurs envoyées durant l'intervalle de transmission.                                                                           | GAUGE               |

Par exemple, imaginons que la métrique `request.response_time.histogram` est envoyée à Datadog par un Agent avec le type `HISTOGRAM` pour `server:web_1`, les valeurs de l'intervalle de transmission étant [1,1,1,2,2,2,3,3]. Les métriques suivantes sont alors envoyées à Datadog pour cet intervalle de transmission :

| Nom de la métrique                                    | Valeur  | Type de métrique Datadog |
|------------------------------------------------|--------|---------------------|
| `request.response_time.histogram.avg`          | `1,88` | GAUGE               |
| `request.response_time.histogram.count`        | `8`    | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

**Remarques** :

* Configurez les agrégations que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][2]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. Les agrégations `sum` et `min` peuvent être ajoutées à cette liste.
* Configurez les agrégations en centile que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][2]. Par défaut, seul le centile `95pc` est envoyé à Datadog.

Découvrez comment envoyer des métriques histogram :

* [Avec un check custom de l'Agent][3]
* [Avec DogStatsD][4]

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/developers/metrics/agent_metrics_submission/?tab=histogram
[4]: /fr/developers/metrics/dogstatsd_metrics_submission/#histogram
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

**Les métriques de type `DISTRIBUTION` vous permettent d'agréger les valeurs envoyées par plusieurs hosts lors d'un intervalle de transmission afin de mesurer les distributions statistiques dans l'ensemble de votre infrastructure.** Les métriques `DISTRIBUTION` sont conçues pour instrumenter des objets logiques, tels que des services, indépendamment des hosts sous-jacents.

Contrairement aux métriques `HISTOGRAM`, qui effectuent l'agrégation au niveau de l'Agent durant l'intervalle de transmission, les métriques `DISTRIBUTION` envoient l'intégralité des données brutes  recueillies durant un intervalle de transmission à Datadog, et les agrégations se font côté serveur. La structure de données sous-jacente représentant les données brutes et non agrégées, les distributions offrent deux fonctionnalités importantes :

* Calcul des agrégations en centiles
* Personnalisation du tagging

Par exemple : si vous envoyez `X` valeurs pour la métrique `DISTRIBUTION` `<NOM_MÉTRIQUE>` durant un intervalle, les séries temporelles suivantes peuvent être interrogées par défaut :

| Agrégation           | Description                                                                                                                                               | Type de métrique Datadog |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `avg:<NOM_MÉTRIQUE>`   | Renvoie la moyenne des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                      | GAUGE               |
| `count:<NOM_MÉTRIQUE>` | Renvoie le nombre de points échantillonnés durant l'intervalle. Ce nombre `X` est ensuite envoyé par l'Agent en tant que `RATE`, ce qui signifie que la valeur affichée dans Datadog est `X/intervalle`. | RATE                |
| `max:<NOM_MÉTRIQUE>`   | Renvoie la valeur maximale des `X` valeurs envoyées durant l'intervalle de transmission.                                                                           | GAUGE               |
| `min:<NOM_MÉTRIQUE>`   | Renvoie la valeur minimale des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                  | GAUGE               |
| `sum:<NOM_MÉTRIQUE>`   | Renvoie la somme des `X` valeurs envoyées durant l'intervalle de transmission.                                                                                       | GAUGE               |

Par exemple, imaginons que la métrique `request.response_time.distribution` est envoyée à Datadog avec le type `DISTRIBUTION` pour `server:web_1` et `server:web_2`. Durant un intervalle de transmission donné, `server:web_1` renvoie [1,1,1,2,2,2,3,3] tandis que `server:web_2` renvoie [1,1,2] pour la même métrique. Les métriques suivantes sont alors créées dans Datadog pour cet intervalle de transmission :

| Nom de la métrique                                | Valeur  | Type de métrique Datadog |
|--------------------------------------------|--------|---------------------|
| `avg:request.response_time.distribution`   | `1,73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | RATE                |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | GAUGE               |

Découvrez comment envoyer des métriques Distribution [avec DogStatsD][1].

### Calcul des agrégations en centiles

Comme d'autres types de métriques, tels que `GAUGE` ou `HISTOGRAM`, le type de métrique `DISTRIBUTION` dispose des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les métriques Distribution sont initialement taguées de la même manière que les autres métriques (avec des tags personnalisés définis dans le code).

Des agrégations en centiles supplémentaires (`p50`, `p75`, `p90`, `p95`, `p99`) peuvent être ajoutées aux métriques Distribution. Ainsi, si vous ajoutez ces agrégations supplémentaires  à une métrique Distribution durant un intervalle de transmission de 10 secondes, les agrégations suivantes sont disponibles : `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` et `p99`.

Si vous ajoutez les agrégations en centiles à votre métrique Distribution (comme expliqué sur la [page Distribution Metrics dans Datadog][2]), les séries temporelles suivantes seront alors créées :

| Nom de la métrique                              | Valeur | Type de métrique Datadog |
|------------------------------------------|-------|---------------------|
| `p50:request.response_time.distribution` | `2 `  | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

**Remarque** : dans l'exemple ci-dessus, le p50 (médiane) pour `server:web_1` est `2` et le p50 pour `server:web_2` est `1`. Si l'agrégation était effectuée côté Agent, la valeur calculée serait la médiane des deux valeurs médianes, c'est-à-dire `1,5`. En réalité, le p50 (médiane) global est la médiane de l'ensemble complet [1,1,1,1,1,2,2,2,2,3,3], qui est égal à `2`. Il s'agit d'une valeur statistique exacte qui peut être renvoyée par une agrégation de métrique Distribution effectuée côté serveur.

### Personnalisation du tagging

Cette fonctionnalité vous permet de contrôler le tagging pour les métriques pour lesquelles une granularité au niveau des hosts n'est pas nécessaire. Consultez la [page Métriques de distribution][2] pour en savoir plus sur le contrôle des tags à partir d'une liste blanche. **Remarque** : l'exclusion de tags comportant le caractère `!` n'est pas possible avec cette fonction.

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/#distribution
[2]: /fr/metrics/distributions
{{% /tab %}}
{{% tab "SET" %}}

**Les métriques de type `SET` comptent le nombre d'occurrences uniques d'un événement durant une certaine période.**

Découvrez comment envoyer des métriques set :

* [Avec un check custom de l'Agent][1]
* [Avec DogStatsD][2]

[1]: /fr/developers/metrics/agent_metrics_submission/?tab=set
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/#set
{{% /tab %}}
{{% tab "TIMER" %}}

**Dans DogStatsD, le type de métrique `TIMER` est une implémentation du type de métrique `HISTOGRAM`** (à ne pas confondre avec les timers de StatsD standard). Ces métriques mesurent uniquement les données temporelles : par exemple, le temps d'exécution d'une section de code ou le temps d'affichage d'une page entière. Pour découvrir comment instrumenter votre code afin d'envoyer des TIMER, consultez la [documentation DogStatsD sur les métriques `TIMER`][1].

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/#timers
{{% /tab %}}
{{< /tabs >}}

## Types envoyés et types stockés dans Datadog

Datadog prend en charge l'envoi de métriques à partir de diverses sources :

* [API Datadog][3]
* [DogStatsD][4]
* [Check de l'Agent][5]

Chaque source a ses propres limitations et le type de métrique envoyé ne correspond pas toujours exactement au type de métrique stocké dans l'application Datadog :

| Source de l'envoi | Méthode d'envoi (python)           | Type envoyé | Type stocké dans Datadog |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][3]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [DogStatsD][6]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][7]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][8]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][9]   | `dog.set(...)`                       | SET             | GAUGE               |
| [DogStatsD][10]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE         |
| [Check de l'Agent][11] | `self.count(...)`                    | COUNT           | COUNT               |
| [Check de l'Agent][12] | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Check de l'Agent][13] | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Check de l'Agent][14] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE         |
| [Check de l'Agent][15] | `self.rate(...)`                     | RATE            | GAUGE               |
| [Check de l'Agent][16] | `self.set(...)`                      | SET             | GAUGE               |

[1]: /fr/developers/metrics/type_modifiers
[2]: /fr/metrics/summary
[3]: /fr/api/?lang=python#post-timeseries-points
[4]: /fr/developers/metrics/dogstatsd_metrics_submission
[5]: /fr/developers/metrics/agent_metrics_submission
[6]: /fr/developers/metrics/dogstatsd_metrics_submission/#gauge
[7]: /fr/developers/metrics/dogstatsd_metrics_submission/#distribution
[8]: /fr/developers/metrics/dogstatsd_metrics_submission/#count
[9]: /fr/developers/metrics/dogstatsd_metrics_submission/#set
[10]: /fr/developers/metrics/dogstatsd_metrics_submission/#histogram
[11]: /fr/developers/metrics/agent_metrics_submission/?tab=count#count
[12]: /fr/developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[13]: /fr/developers/metrics/agent_metrics_submission/?tab=gauge
[14]: /fr/developers/metrics/agent_metrics_submission/?tab=histogram
[15]: /fr/developers/metrics/agent_metrics_submission/?tab=rate
[16]: /fr/developers/integrations