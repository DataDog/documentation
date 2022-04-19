---
aliases:
- /fr/graphing/graphing_json/request_json/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: Schéma JSON des widgets
kind: documentation
title: Schéma JSON des requêtes
---

Le format global du `REQUEST_SCHEMA` est un array composé d'une ou de plusieurs `requests` :

```text

   "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query)"
                },
                {
                    "formula": "query1"
                },
                {
                    "formula": "query1 / 100"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query",
                    "query": "avg:system.load.5{*}"
                },
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ]
```

## Fonctions

Vous pouvez appliquer des fonctions au résultat de chaque requête.

Si vous souhaitez en savoir plus sur les fonctions, des séries d'exemples sont disponibles depuis la page [Fonctions][1].

#### Méthode d'agrégation

Dans la plupart des cas, le nombre de points de données disponibles dépasse le nombre maximum pouvant être affiché à l'écran. Pour remédier à ce problème, les données sont agrégées selon l'une des quatre méthodes disponibles : moyenne, max, min et somme.

#### Métriques

Vos sources de données, à savoir les métriques, les logs ou encore les traces, sont le point focal des graphiques. Vous trouverez la liste des métriques disponibles sur la page de [résumé des métriques][2]. Cliquez sur une métrique pour l'examiner plus en détail et visualiser le type de données recueillies, les unités, les tags, les hosts et plus encore.

## Contexte

Définissez un contexte pour filtrer une série. Il peut s'agir d'un host, d'un appareil sur un host ou d'un tag quelconque composé de caractères alphanumériques, de deux-points et de tirets bas (`[a-zA-Z0-9:_]+`).

Exemples de contextes et leurs significations :

| Contexte                            | Signification                                    |
|----------------------------------|--------------------------------------------|
| `host:my_host`                   | Relatif à un host donné.                   |
| `host:my_host, device:my_device` | Relatif à un appareil donné sur un host donné. |
| `source:my_source`               | Relatif à une source donnée.                 |
| `my_tag`                         | Relatif à un groupe de hosts tagué.        |
| `my:tag`                         | Identique à ci-dessus.                             |
| `*`                              | Wildcard pour tout.                   |

#### Groupes

Les données pour une même métrique peuvent provenir de plusieurs hosts différents. Les données issues de tous les hosts sont généralement agrégées de façon à obtenir une seule valeur pour chaque intervalle de temps. Vous pouvez les décomposer en spécifiant un tag quelconque. Pour obtenir un point de données distinct pour chaque host, utilisez [host] au sein de votre groupe.

#### Opérations arithmétiques

Vous pouvez appliquer des opérations arithmétiques simples à une série (+, -, * et /).

L'exemple suivant permet de représenter graphiquement la charge mesurée sur 5 minutes ainsi que son double :

```json
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                },
                {
                    "formula": "2 * query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

Vous pouvez également additionner, soustraire, multiplier et diviser une série. **Remarque** : aucune cohérence n'est imposée par Datadog ; vous *pouvez* donc diviser une métrique « pommes » par une métrique « oranges ».

```json
{"viz": "timeseries", "requests": [{"q": "metric{pommes} / metric{oranges}"}]}
```

## Scénarios

{{< img src="dashboards/graphing_json/graph_example_for_json.png" alt="Graphique JSON" style="width:75%;" >}}

Voici le JSON correspondant à l'exemple ci-dessus. Il permet de représenter la moyenne `average` des octets réseau reçus pour un appareil et un host spécifiques, avec un regroupement par compte.

```text
"requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.net.bytes_rcvd{device:eth0,host:dsg-demo-1} by {account}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```


{{< img src="dashboards/graphing_json/rate_example_for_json.png" alt="Exemple de taux" style="width:75%;" >}}

Voici un exemple avec la fonction `rate()`, qui accepte uniquement comme paramètre une seule métrique :


```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*} by {host}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```

Voici le même exemple sous la forme de top list :

```json
{
    "viz": "toplist",
    "requests": [
        {
            "formulas": [
                {
                    "limit": {
                        "count": 10,
                        "order": "desc"
                    },
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{role:db} by {host}",
                    "aggregator": "avg"
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ]
}
```

Voici un exemple qui utilise la fonction de décalage temporel `week_before()` :

```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "week_before(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": ""
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line"
        }
    ]
```

L'exemple ci-dessous permet de représenter un ratio des logs `error` par rapport aux logs `info`, puis d'appliquer une fonction de décalage temporel.

{{< img src="dashboards/graphing_json/advanced_graph_example_for_json.png" alt="Exemple de ratio" style="width:75%;" >}}

```json
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1 / query2",
                    "alias": "Ratio of Error to Info"
                },
                {
                    "formula": "week_before(query1 / query2)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                },
                {
                    "data_source": "logs",
                    "name": "query2",
                    "search": {
                        "query": "status:info"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary