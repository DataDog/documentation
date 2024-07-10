---
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
- link: developers/dogstatsd
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: developers/libraries
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Types de métriques
---

## Présentation

Chaque métrique envoyée à Datadog doit posséder un type. Le type d'une métrique définit l'affichage des valeurs de la métrique renvoyées, ainsi que les fonctionnalités graphiques associées reposant sur des [modificateurs][1] et des [fonctions][2] supplémentaires dans Datadog. Le type d'une métrique figure dans le volet latéral des détails de votre métrique sur la page [Metrics Summary][3].

**Remarque** : si vous modifiez le type de votre métrique dans le volet latéral, il est possible que cela ait une incidence sur le comportement de la métrique dans toutes les visualisations et tous les monitors existants et que les données historiques deviennent incompréhensibles.

Les métriques envoyées peuvent être des types suivants :

- [COUNT](?tab=count#types-de-metriques)
- [RATE](?tab=rate#types-de-metriques)
- [GAUGE](?tab=gauge#types-de-metriques)
- [SET][4]
- [HISTOGRAM](?tab=histogram#types-de-metriques)
- [DISTRIBUTION](?tab=distribution#types-de-metriques)

Ces différents types de métriques envoyés correspondent à quatre types de métriques stockés dans l'application Web Datadog :

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**Remarque** : si vous envoyez une métrique sans aucun type à Datadog, celle-ci figurera sous le type `Not Assigned` dans Datadog. Pour remplacer ce type par une autre valeur, vous devez envoyer un type de métrique initial.

## Type envoyé et type stocké

Les métriques sont envoyées à Datadog à l'aide des trois ressources suivantes :

- [Check de l'Agent][5]
- [DogStatsD][6]
- [API HTTP de Datadog][7]

La plupart des données transmises à Datadog sont envoyées par l'Agent, que ce soit via un check d'Agent ou via DogStatsD. Pour ces méthodes d'envoi, le type d'une métrique détermine la méthode d'agrégation des différentes valeurs recueillies par l'Agent lors de [l'intervalle de transmission][8]. L'Agent combine ces valeurs au sein d'une unique valeur représentative de la métrique pour cet intervalle. Un timestamp est ajouté à la valeur combinée avant de la stocker dans Datadog.

À l'exception des métriques de distribution, les données envoyées directement à l'API Datadog ne sont pas agrégées par Datadog. Les valeurs brutes transmises sont stockées telles quelles.

Lisez la rubrique [Types envoyés et types stockés dans Datadog](#types-envoyes-et-types-stockes-dans-Datadog) pour découvrir comment les types de métriques envoyés sont associés aux types stockés correspondants.

## Types de métriques

### Définition

{{< tabs >}}
{{% tab "COUNT" %}}

Le type de métrique envoyé COUNT représente le nombre d'événements survenus lors d'un intervalle. Une métrique COUNT peut servir à surveiller le nombre total de connexions vers une base de données ou de requêtes transmises à un endpoint. Ce nombre d'événements peut augmenter ou diminuer au fil du temps : il n'est pas strictement croissant.

**Remarque** : les métriques COUNT diffèrent des métriques RATE. En effet, ces dernières représentent le nombre d'événements normalisé par seconde pour la période donnée.

{{% /tab %}}
{{% tab "RATE" %}}

Le type de métrique envoyé RATE représente le nombre total d'événements survenus par seconde lors d'un intervalle. Une métrique RATE peut servir à surveiller la répétitivité d'un événement, telle que la fréquence des connexions vers une base de données ou le flux de requêtes transmises à un endpoint.

**Remarque** : les métriques RATE diffèrent des métriques COUNT. En effet, ces dernières représentent le nombre total d'événements pour la période donnée.

{{% /tab %}}
{{% tab "GAUGE" %}}

Le type de métrique envoyé GAUGE représente un snapshot des événements survenus durant un intervalle. La valeur de ce snapshot représentatif correspond à la dernière valeur envoyée à l'Agent lors de l'intervalle. Une métrique GAUGE peut servir à mesurer des données sans cesse transmises, telles que l'espace disque disponible ou la mémoire utilisée.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Le type de métrique envoyé HISTOGRAM représente la distribution statistique d'un ensemble de valeurs calculées côté Agent sur un intervalle unique. Le type de métrique HISTOGRAM de Datadog est une extension du type de métrique timing de StatsD. L'Agent agrège les valeurs envoyées durant un intervalle donné et génère différentes métriques représentant l'ensemble de valeurs.

Si vous envoyez `X` valeurs pour la métrique HISTOGRAM `<NOM_MÉTRIQUE>` durant un intervalle donné, l'Agent génère par défaut les métriques suivantes :

`<NOM_MÉTRIQUE>.avg`
: Représente la moyenne des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`<NOM_MÉTRIQUE>.count`
: Représente le nombre de valeurs envoyées lors de l'intervalle. Ce nombre `X` est envoyé par l'Agent en tant que RATE, ce qui signifie que la valeur affichée dans Datadog correspond à `X / intervalle`. <br>
**Type stocké dans Datadog** : RATE

`<NOM_MÉTRIQUE>.median`
: Représente la médiane des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`<NOM_MÉTRIQUE>.95percentile` 
: Représente le 95 centile des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`<NOM_MÉTRIQUE>.max`
: Représente la valeur maximale des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

**Remarques** :

- Configurez les agrégations que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_aggregates` dans votre [fichier de configuration `datadog.yaml`][1]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. Les agrégations `sum` et `min` sont également disponibles.
- Configurez les agrégations par centile que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_percentiles` dans votre [fichier de configuration `datadog.yaml`][2]. Par défaut, seul le centile `95percentile` est envoyé à Datadog.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Le type de métrique envoyé DISTRIBUTION représente la distribution statistique globale d'un ensemble de valeurs calculées lors d'un intervalle unique sur l'intégralité de votre infrastructure distribuée. Une métrique DISTRIBUTION peut servir à instrumenter des objets logiques, tels que des services, indépendamment des hosts sous-jacents.

Contrairement aux métriques HISTOGRAM, qui effectuent l'agrégation au niveau de l'Agent durant un intervalle donné, les métriques DISTRIBUTION envoient l'intégralité des données brutes recueillies lors d'un intervalle à Datadog. Les agrégations se font alors côté serveur. Puisque la structure sous-jacente représente des données brutes et non agrégées, les distributions offrent deux fonctionnalités importantes :

- Calcul des agrégations par centile
- Personnalisation du tagging

Si vous envoyez `X` valeurs pour la métrique DISTRIBUTION `<NOM_MÉTRIQUE>` durant un intervalle donné, par défaut, vos requêtes peuvent porter sur les agrégations suivantes :

`avg:<NOM_MÉTRIQUE>`
: Représente la moyenne des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`count:<NOM_MÉTRIQUE>`
: Représente le nombre de points envoyés durant l'intervalle. Ce nombre `X` est ensuite envoyé par l'Agent en tant que COUNT.<br>
**Type stocké dans Datadog** : COUNT

`max:<NOM_MÉTRIQUE>`
: Représente la valeur maximale des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`min:<NOM_MÉTRIQUE>`
: Représente la valeur minimale des `X` valeurs transmises lors de l'intervalle.<br>
**Type stocké dans Datadog** : GAUGE

`sum:<NOM_MÉTRIQUE>`
: Représente la somme des `X` valeurs envoyées lors de l'intervalle.<br>
**Type stocké dans Datadog** : COUNT

{{% /tab %}}
{{< /tabs >}}

### Exemple

{{< tabs >}}
{{% tab "COUNT" %}}

Imaginons que vous envoyiez la métrique COUNT `activeusers.basket_size` depuis un seul host sur lequel l'Agent Datadog s'exécute. Ce host génère les valeurs suivantes lors de l'intervalle de transmission : `[1,1,1,2,2,2,3,3]`.

L'Agent ajoute toutes les valeurs reçues durant cet intervalle. Il envoie ensuite le total, ici `15`, en tant que valeur de la métrique COUNT.

{{% /tab %}}
{{% tab "RATE" %}}

Imaginons que vous envoyiez la métrique RATE `queue_messages.rate` depuis un seul host sur lequel l'Agent Datadog s'exécute. Ce host génère les valeurs suivantes lors de l'intervalle de transmission : `[1,1,1,2,2,2,3,3]`.

L'Agent ajoute toutes les valeurs reçues durant cet intervalle. Il envoie ensuite le total divisé par le nombre de secondes de l'intervalle. Ici, avec un intervalle de transmission de 10 secondes, la valeur `1.5` est envoyée pour la métrique RATE.

{{% /tab %}}
{{% tab "GAUGE" %}}

Imaginons que vous envoyiez la métrique GAUGE `temperature` depuis un seul host sur lequel l'Agent Datadog s'exécute. Ce host génère les valeurs suivantes lors de l'intervalle de transmission : `[71,71,71,71,71,71,71.5]`.

L'Agent envoie la dernière valeur transmise, ici `71.5`, pour la métrique GAUGE.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Imaginons que vous envoyez la métrique HISTOGRAM `request.response_time.histogram` à partir d'un serveur Web. Celle-ci envoie les valeurs `[1,1,1,2,2,2,3,3]` lors de l'intervalle de transmission. Par défaut, l'Agent transmet les métriques suivantes à Datadog afin de représenter la distribution statistique des valeurs lors de l'intervalle :

| Nom de la métrique                                    | Valeur  | Type stocké dans Datadog |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Imaginons que vous envoyiez la métrique DISTRIBUTION `request.response_time.distribution` à partir de deux serveurs Web : `webserver:web_1` et `webserver:web_2`. Lors de l'intervalle de transmission donné, `webserver:web_1` renvoie les valeurs `[1,1,1,2,2,2,3,3]` pour la métrique, tandis que `webserver:web_2` renvoie les valeurs `[1,1,2]`. Durant cet intervalle, les cinq agrégations suivantes représentent la distribution statistique globale de l'ensemble des valeurs recueillies à partir des deux serveurs Web :

| Nom de la métrique                                | Valeur  | Type stocké dans Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Calcul des agrégations par centile

Comme d'autres types de métriques, tels que GAUGE ou HISTOGRAM, le type DISTRIBUTION dispose des agrégations suivantes : `count`, `min`, `max`, `sum` et `avg`. Les métriques Distribution sont initialement taguées de la même manière que les autres métriques (avec des tags personnalisés définis dans le code).

Des agrégations par centile supplémentaires (`p50`, `p75`, `p90`, `p95` et `p99`) peuvent être ajoutées aux métriques Distribution. Si vous ajoutez des agrégations par centile à une métrique Distribution stockée dans Datadog, vos requêtes peuvent porter sur les cinq agrégations supplémentaires suivantes :

| Nom de la métrique                              | Valeur | Type stocké dans Datadog |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

Si vous ajoutez des agrégations par centile supplémentaires à une métrique Distribution durant un intervalle donné, vous pouvez utiliser les 10 agrégations suivantes : `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` et `p99`.

#### Personnalisation du tagging

Cette fonctionnalité vous permet de contrôler le tagging pour les métriques pour lesquelles une granularité au niveau des hosts n'est pas nécessaire. Consultez la section [Metrics without Limits™][1] pour en savoir plus.

**Remarque** : l'exclusion de tags comportant le caractère `!` n'est pas possible avec cette fonction.


[1]: /fr/metrics/metrics-without-limits/
{{% /tab %}}
{{< /tabs >}}

### Envoi

{{< tabs >}}
{{% tab "COUNT" %}}

Envoyez vos métriques de type COUNT depuis l'une des sources suivantes :

| Source de l'envoi | Méthode d'envoi (python)           | Type envoyé | Type stocké dans Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Check de l'Agent][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Check de l'Agent][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**Remarque** : lorsque vous envoyez une métrique de type COUNT via DogStatsD, la métrique stockée dans Datadog possède le type RATE, afin de garantir la pertinence des comparaisons entre les différents Agents. Par conséquent, les nombres totaux StatsD peuvent comporter des décimales dans Datadog (puisqu'ils sont normalisés sur un intervalle dans le but de transmettre des unités par seconde).


[1]: /fr/metrics/agent_metrics_submission/?tab=count#count
[2]: /fr/metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /fr/api/v1/metrics/#submit-metrics
[4]: /fr/metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

Envoyez vos métriques de type RATE depuis l'une des sources suivantes :

| Source de l'envoi | Méthode d'envoi (python)          | Type envoyé | Type stocké dans Datadog |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Check de l'Agent][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**Remarque** : lorsque vous envoyez une métrique de type RATE via DogStatsD, la métrique stockée dans Datadog possède le type GAUGE, afin de garantir la pertinence des comparaisons entre les différents Agents.


[1]: /fr/metrics/agent_metrics_submission/?tab=rate
[2]: /fr/api/v1/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Envoyez vos métriques de type GAUGE depuis l'une des sources suivantes :

| Source de l'envoi | Méthode d'envoi (python)           | Type envoyé | Type stocké dans Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Check de l'Agent][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /fr/metrics/agent_metrics_submission/?tab=gauge
[2]: /fr/api/v1/metrics/#submit-metrics
[3]: /fr/metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Envoyez vos métriques de type HISTOGRAM depuis l'une des sources suivantes :

| Source de l'envoi | Méthode d'envoi (python) | Type envoyé | Types stockés dans Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Check de l'Agent][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

L'envoi d'une métrique TIMER à l'Agent Datadog correspond à l'envoi d'une métrique HISTOGRAM dans DogStatsD. Ne confondez pas les métriques TIMER avec les timers StatsD standard. Les [`TIMER` DogStatsD][3] représentent uniquement les données caractérisées par une durée, par exemple le temps d'exécution d'une section de code ou le temps d'affichage d'une page entière.


[1]: /fr/metrics/agent_metrics_submission/?tab=histogram
[2]: /fr/metrics/dogstatsd_metrics_submission/#histogram
[3]: /fr/metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Envoyez vos métriques de type DISTRIBUTION depuis la source suivante :

| Source de l'envoi | Méthode d'envoi (python) | Type envoyé | Types stockés dans Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |


[1]: /fr/metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

## Types envoyés et types stockés dans Datadog

Vous trouverez ci-dessous une synthèse de l'ensemble des sources et des méthodes d'envoi de métriques. Ce tableau présente la correspondance entre les types de métriques envoyés et les types stockés :

| Source de l'envoi | Méthode d'envoi (python)           | Type envoyé | Types stockés dans Datadog |
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
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/type_modifiers/
[2]: /fr/dashboards/functions/
[3]: /fr/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.2.2/types.html#sets
[5]: /fr/metrics/agent_metrics_submission/
[6]: /fr/metrics/dogstatsd_metrics_submission/
[7]: /fr/api/v1/metrics/#submit-metrics
[8]: /fr/developers/dogstatsd/#how-it-works
[9]: /fr/metrics/agent_metrics_submission/?tab=count#count
[10]: /fr/metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /fr/metrics/agent_metrics_submission/?tab=gauge
[12]: /fr/metrics/agent_metrics_submission/?tab=histogram
[13]: /fr/metrics/agent_metrics_submission/?tab=rate
[14]: /fr/metrics/dogstatsd_metrics_submission/#gauge
[15]: /fr/metrics/dogstatsd_metrics_submission/#distribution
[16]: /fr/metrics/dogstatsd_metrics_submission/#count
[17]: /fr/metrics/dogstatsd_metrics_submission/#set
[18]: /fr/metrics/dogstatsd_metrics_submission/#histogram