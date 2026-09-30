---
aliases:
- /fr/metrics/otlp
further_reading:
- link: metrics/distributions
  tag: Documentation
  text: En savoir plus sur les distributions
- link: tracing/trace_collection/open_standards/
  tag: Documentation
  text: En savoir plus sur OpenTelemetry
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: Guide
  text: Générer des métriques de temporalité delta avec OpenTelemetry
title: Types de métriques OTLP
---

## Présentation

L'Agent Datadog et l'exportateur Datadog pour le Collector OpenTelemetry peuvent ingérer les métriques au format OpenTelemetry (OTLP), qui sont générées par les applications instrumentées via OpenTelemetry.

Les types de métriques OTLP suivants peuvent être ingérés par l'Agent Datadog et l'exportateur Datadog pour le Collector OpenTelemetry :
- Sum
- Gauge
- Histogram
- Summary

Ces types de métriques OTLP sont mis en correspondance avec les types de métriques Datadog :

- COUNT
- GAUGE
- DISTRIBUTION

Une même métrique OTLP peut être mise en correspondance avec plusieurs métriques Datadog différentes, un suffixe étant ajouté pour indiquer leur signification.

**Remarque** : OpenTelemetry offre des instruments pour l'API Metrics (`Gauge`, `Counter`, `UpDownCounter`, `Histogram`, etc.) dont les mesures peuvent être exportées en tant que métriques OTLP (Sum, Gauge, Histogram). Les métriques OTLP peuvent également provenir d'autres sources. Certaines applications et bibliothèques permettent de personnaliser les métriques OTLP qu'elles génèrent. Consultez la documentation de votre SDK OpenTelemetry ou de votre application qui génère des métriques OTLP pour mieux comprendre ces métriques et découvrir comment les personnaliser.

**Remarque** : le protocole OpenTelemetry peut représenter de deux manières l'évolution temporelle des métriques, avec la [temporalité cumulative et delta][2]. Cette temporalité s'applique aux métriques décrites plus bas. Définissez la préférence de temporalité de l'implémentation OpenTelemetry sur **DELTA**, car la méthode CUMULATIVE peut ignorer certains points de données lors du lancement de l'application (ou du collecteur). Pour en savoir plus, consultez la section [Générer des métriques de temporalité delta avec OpenTelemetry][3].

## Types de métriques

### Correspondances


{{< tabs >}}
{{% tab "Sum" %}}

Une métrique OTLP de type Sum représente une somme de mesures transmises sur un certain intervalle. Par exemple, une métrique Sum peut être utilisée pour suivre le nombre total de connexions à une base de données ou le nombre total de requêtes vers un endpoint. La mise en correspondance des métriques Sum dépend de deux caractéristiques différentes :

- Leur *agrégation temporelle*, qui peut être cumulative ou delta. Les intervalles de temps des métriques delta ne se chevauchent pas, tandis que les métriques cumulatives représentent un intervalle de temps avec un point de départ fixe.
- Leur *monotonicité*. Les métriques Sum monotones ne diminuent jamais, et le count sous-jacent peut uniquement être additionné.

Les correspondances par défaut sont les suivantes :
1. Dans le cas des métriques Sum cumulatives monotones, le delta entre les points consécutifs est calculé et transmis à Datadog en tant que count. Le premier point est stocké mais ignoré. Pour récupérer la valeur dans la charge utile OTLP, utilisez la [fonction arithmétique `cumsum`][1].
2. Les Sums cumulatives non monotones sont exportées en tant que gauges Datadog.
3. Les Sums delta sont exportées en tant que counts Datadog.

[1]: /fr/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Gauge" %}}

Une métrique OTLP de type Gauge représente une valeur échantillonnée à un moment donné. Seule la dernière valeur sur un intervalle de temps donné est incluse dans les métriques OTLP.

Les Gauges OTLP correspondent à des Gauges Datadog, étant donné que ces métriques ne fournissent pas de sémantique d'agrégation. Les points de données sous forme d'entiers et de nombres à virgule flottante des métriques Gauge correspondent à des nombres à virgule flottante dans Datadog.

{{% /tab %}}
{{% tab "Histogram" %}}

Une métrique OTLP de type Histogram représente la distribution statistique d'un ensemble de valeurs sur un intervalle de temps donné, certaines métriques d'agrégation telles que les Sums ou Counts d'une population de points étant stockées avec une série de counts de bucket. La mise en correspondance des métriques Histogram dépend d'une caractéristique :

- Leur *agrégation temporelle*, qui peut être cumulative ou delta. Les intervalles de temps des métriques delta ne se chevauchent pas, tandis que les métriques cumulatives représentent un intervalle de temps avec un point de départ fixe.

Les correspondances par défaut sont les suivantes :
1. Les Histograms delta sont transmis en tant que distributions Datadog. [Consultez la documentation sur les distributions][1] pour découvrir les agrégations disponibles.
2. Dans le cas des métriques Histogram cumulatives, le delta entre les points consécutifs est calculé et transmis à Datadog en tant que distribution. Vous pouvez utiliser la [fonction arithmétique `cumsum`][2] ou des agrégations individuelles pour récupérer la valeur dans la charge utile OTLP.

**Remarque** : dans OTLP, les métriques histogram sont mappées aux métriques de distribution. En raison du processus d'envoi de ces données par OTLP, les agrégations max, min et percentile représentent des valeurs approximatives et ne sont pas le résultat de calculs précis. 

L'Agent Datadog et l'exportateur Datadog pour le Collector OpenTelemetry permettent de changer l'exportation des métriques Histogram dans la sous-section `histogram`.
- Si le `mode` est défini sur `counters`, les métriques suivantes sont générées :

`<NOM_MÉTRIQUE>.bucket`, avec les tags `lower_bound` et `upper_bound`
: Count du bucket sur l'intervalle de temps du bucket, avec les limites inférieure et supérieure spécifiées.<br>
**Type stocké dans Datadog** : COUNT

- Si le paramètre `send_count_sum_metrics` est activé, les métriques suivantes sont générées :

`<NOM_MÉTRIQUE>.sum`
: Somme des valeurs transmises pendant l'intervalle de temps.<br>
**Type stocké dans Datadog** : COUNT

`<NOM_MÉTRIQUE>.count`
: Nombre de valeurs transmises pendant l'intervalle de temps.<br>
**Type stocké dans Datadog** : COUNT

**Remarque** : `send_count_sum_metrics` est uniquement utile lorsque vous n'utilisez pas le mode distributions.

[1]: /fr/metrics/distributions
[2]: /fr/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Summary" %}}

Les métriques OTLP de type Summary, désormais obsolètes, indiquent les quantiles pour une population sur un intervalle de temps donné. Ces métriques ne sont pas générées par les SDK OpenTelemetry, mais d'autres composants sont susceptibles d'en générer à des fins de rétrocompatibilité.

`<NOM_MÉTRIQUE>.sum`
: Somme des valeurs depuis que l'application a commencé à générer cette métrique.<br>
**Type stocké dans Datadog** : COUNT

`<NOM_MÉTRIQUE>.count`
: Nombre de valeurs dans la population. <br>
**Type stocké dans Datadog** : COUNT

`<NOM_MÉTRIQUE>.quantile`, avec le tag `quantile`
: Valeur d'un quantile spécifique.<br>
**Type stocké dans Datadog** : GAUGE

{{% /tab %}}
{{< /tabs >}}

### Mappage des attributs

OTLP prend en charge deux types d'attributs : les attributs de points de données et les attributs de ressources. Ces attributs peuvent suivre les conventions sémantiques d'OpenTelemetry et ont une sémantique bien connue.

L'Agent Datadog et l'exportateur Datadog pour le Collector OpenTelemetry convertissent les attributs de points de données en tags. Les attributs de ressources qui respectent les conventions sémantiques d'OpenTelemetry sont mis en correspondance avec les conventions Datadog équivalentes, si elles existent.

Vous pouvez ajouter l'ensemble des attributs de ressources en tant que tags à l'aide du paramètre `resource_attributes_as_tags`.

### Résolution du hostname

OpenTelemetry définit certaines conventions sémantiques liées aux hostnames. Si une charge utile OTLP possède un attribut de hostname connu, Datadog respecte ces conventions et tente d'utiliser sa valeur comme hostname. Les conventions sémantiques sont appliquées dans l'ordre suivant :

1. `datadog.host.name`, une convention de hostname propre à Datadog
1. Les conventions utilisées par les fournisseurs de cloud, en fonction de la convention sémantique `cloud.provider`
1. Les conventions Kubernetes provenant des conventions sémantiques `k8s.node.name` et `k8s.cluster.name`
1. `host.id`, l'ID unique du host
1. `host.name`, le hostname du système

Si aucune convention n'est présente, Datadog attribue un hostname propre au système aux charges utiles. Si vous envoyez des données à partir d'un host à distance, ajoutez le [processeur 'resource detection'][1] à vos pipelines pour une résolution efficace du hostname.

### Exemple

{{< tabs >}}
{{% tab "Sum" %}}

Imaginons que vous utilisez un instrument Counter OpenTelemetry depuis une seule application qui, par défaut, exporte des métriques Sum cumulatives et **monotones**. Le tableau suivant décrit le comportement de Datadog :

| Période de collecte | Valeurs Counter    | Valeur Sum OTLP | Valeur transmise à Datadog | Type stocké dans Datadog | Remarques                                          |
|-------------------|-------------------|----------------|---------------------------| ------------------- |------------------------------------------------|
| N° 1                | [1,1,1,2,2,2,3,3] | 15             | Aucune                      |  COUNT              | La valeur de la première période de collecte n'est pas transmise. |
| N° 2                | [3,4,1,2]         | 25             | 10                        |  COUNT              | La différence entre les valeurs est transmise.     |
| N° 3                | []                | 25             | 0                         |  COUNT              | Aucune nouvelle valeur n'a été transmise pendant cette période.    |

Imaginons que vous utilisez un instrument UpDownCounter OpenTelemetry depuis une seule application qui, par défaut, exporte des métriques Sum cumulatives. Le tableau suivant décrit le comportement de Datadog :

| Période de collecte | Valeurs UpDownCounter | Valeur Sum OTLP | Valeur transmise à Datadog | Type stocké dans Datadog |
|-------------------|----------------------|----------------|---------------------------| ------------------- |
| N° 1                | [1,1,1,2,2,2,3,3]    | 15             | 15                        | GAUGE               |
| N° 2                | [3,-4,1,2]           | 17             | 17                        | GAUGE               |
| N° 3                | [-1]                 | 16             | 16                        | GAUGE               |

{{% /tab %}}
{{% tab "Gauge" %}}

Imaginons que vous utilisez un instrument Gauge penTelemetry, `temperature`, depuis une seule application.
Le tableau suivant décrit le comportement de Datadog :

| Période de collecte | Instrument Gauge | Valeur Gauge OTLP | Valeur transmise à Datadog | Type stocké dans Datadog |
|-------------------|------------------|------------------|---------------------------| ------------------- |
| N° 1                | 71.5             | 71.5             | 71.5                      | GAUGE               |
| N° 2                | 72               | 72               | 72                        | GAUGE               |
| N° 3                | 70               | 70               | 70                        | GAUGE               |

{{% /tab %}}
{{% tab "Histogram" %}}

Imaginons que vous utilisez un instrument Histogram OpenTelemetry, `request.response_time.histogram`, à partir de deux serveurs Web : `webserver:web_1` et `webserver:web_2`. Lors de la période de collecte donnée, `webserver:web_1` renvoie les valeurs `[1,1,1,2,2,2,3,3]` pour la métrique, tandis que `webserver:web_2` renvoie les valeurs `[1,1,2]`. Durant cette période de collecte, les cinq agrégations suivantes représentent la distribution statistique globale de l'ensemble des valeurs recueillies à partir des deux serveurs Web :

| Nom de la métrique                                | Valeur  | Type stocké dans Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

[Consultez la documentation sur les distributions][1] pour comprendre comment configurer d'autres agrégations.

Par ailleurs, si vous utilisez le mode `counters` et que vous activez le paramètre `send_count_sum_metrics`, les métriques suivantes seront transmises si les limites du bucket de l'histogram sont définies sur `[-inf, 2, inf]` :

| Nom de la métrique                                 | Valeur  | Tags                                | Type stocké dans Datadog |
| ------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`  | `8`    | S.O.                                 | COUNT               |
| `request.response_time.distribution.sum`    | `15`   | S.O.                                 | COUNT               |
| `request.response_time.distribution.bucket` | `6`    | `lower_bound:-inf`, `upper_bound:2` | GAUGE               |
| `request.response_time.distribution.bucket` | `2`    | `lower_bound:2`, `upper_bound:inf`  | GAUGE               |

[1]: /fr/metrics/distributions
{{% /tab %}}
{{% tab "Summary" %}}

Imaginons que vous envoyez une métrique OTLP de type Summary, `request.response_time.summary`, à partir d'un serveur Web. Lors de la période de collecte donnée, le serveur Web renvoie les valeurs `[1,1,1,2,2,2,3,3]` pour la métrique. Si les quantiles min., max. et médian sont activés, les métriques suivantes seront alors transmises :

| Nom de la métrique                                   | Valeur  | Tags                                | Type stocké dans Datadog |
| --------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`    | `8`    | S.O.                                 | COUNT               |
| `request.response_time.distribution.sum`      | `15`   | S.O.                                 | COUNT               |
| `request.response_time.distribution.quantile` | `1`    | `quantile:0`                        | GAUGE               |
| `request.response_time.distribution.quantile` | `2`    | `quantile:0.5`                      | GAUGE               |
| `request.response_time.distribution.quantile` | `3`    | `quantile:1.0`                      | GAUGE               |


{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#temporality
[3]: /fr/opentelemetry/guide/otlp_delta_temporality/