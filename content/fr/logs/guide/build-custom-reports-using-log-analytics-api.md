---
title: Créer des rapports personnalisés à l'aide de l'API Log Analytics
kind: guide
further_reading:
  - link: '/logs/explorer/analytics/?tab=serietemporelle#presentation'
    tag: Documentation
    text: En savoir plus sur Log Analytics
  - link: '/api/v2/logs/#agreger-des-evenements'
    tag: Documentation
    text: Syntaxe de l'API Log Analytics
  - link: /logs/guide/collect-multiple-logs-with-pagination/?tab=v1api
    tag: Documentation
    text: Collecter plusieurs logs avec la Pagination
---
## Présentation

Utilisez l'[API Log Analytics][1] pour créer rapidement des rapports et des dashboards personnalisés pour votre équipe en combinant les informations de votre entreprise et d'autres services avec vos données de log.

Les exemples suivants sont abordés dans ce guide :

* [Obtenir des nombres](#getting-counts)
* [Obtenir des statistiques](#getting-stats)
* [Obtenir des centiles](#getting-percentiles)
* [Regroupements multiples, nombres uniques et métriques](#regroupements-multiples-nombres-uniques-et-metriques) 

## Prérequis

Ce guide décrit l'utilisation de l'API : vous aurez donc besoin d'obtenir une clé d'API et une clé application auprès d'un administrateur. Elles sont disponibles sur la [page des clés d'API de votre compte Datadog][2].

Tout au long de cet article, vous devez remplacer chaque occurrence de `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par vos clés d'API et d'application Datadog, respectivement.

Ce guide suppose également que vous avez accès à un terminal avec `CURL`. 

**Remarques :** si vous utilisez le site européen de Datadog, utilisez https://api.datadoghq.eu/api/ comme endpoint.

## Exemples

### Obtenir des nombres

{{< tabs >}}
{{% tab "Tableau" %}}

L'appel d'API suivant vous permet de créer un tableau `table` avec le nombre `count` d'événements de log regroupés selon le champ `status` et affichant les trois premiers éléments. Le `type` doit correspondre à `total`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type": "measure",
               "aggregation":"count"
           },
           "limit":3
       }
   ]
}'
```

**Réponse :**

L'ensemble de données généré comprend les objets `buckets` comme illustré dans l'exemple de réponse suivant. Dans cet exemple, `c0` représente le `count` total.

```json
{
    "meta": {
        "status": "done",
        "request_id": "MlNkM2lwdXpSMXExVndrWldqV2F0d3xYU1dqejF1Qm9QbU1STnF6RVQ4M3Jn",
        "page": {
            "after": "eyJhZnRlciI6eyJzdGF0dXMiOlsid2FybiIsIm5vdGljZSIsImluZm8iXX19"
        },
        "elapsed": 399
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 644291
                },
                "by": {
                    "status": "warn"
                }
            },
            {
                "computes": {
                    "c0": 223652
                },
                "by": {
                    "status": "notice"
                }
            },
            {
                "computes": {
                    "c0": 2886959
                },
                "by": {
                    "status": "info"
                }
            }
        ]
    }
}

```
{{% /tab %}}
{{% tab "Série temporelle" %}}
L'appel d'API suivant vous permet de créer une série temporelle `timeseries` avec le nombre `count` d'événements de log regroupés selon le champ `status` et cumulés chaque minute `1m`. Le `type` doit correspondre à `timeseries`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"timeseries",
       "aggregation":"count",
       "interval":"1m"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type": "measure",
               "aggregation":"count"
           }
       }
   ]
}
'
```

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "U1VfQTc4M19SWldjNkJFUkh2R2R1Z3w3Uk9lajlmQklnUnZyQnpCV0k1Tmtn",
        "elapsed": 152
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": [
                        {
                            "value": 1856,
                            "time": "2020-08-10T19:00:00.000Z"
                        },
                        {
                            "value": 1614,
                            "time": "2020-08-10T19:01:00.000Z"
                        }
                    ]
                },
                "by": {
                    "status": "info"
                }
            },
            {
                "computes": {
                    "c0": [
                        {
                            "value": 25,
                            "time": "2020-08-10T19:00:00.000Z"
                        },
                        {
                            "value": 24,
                            "time": "2020-08-10T19:01:00.000Z"
                        }
                    ]
                },
                "by": {
                    "status": "error"
                }
            }
        ]
    }
}

```

{{% /tab %}}
{{< /tabs >}}

### Obtenir des statistiques

{{< tabs >}}
{{% tab "Moyenne" %}}

L'appel d'API suivant permet de créer un tableau `table` affichant les moyennes `avg` des valeurs d'une métrique `metric` comme `@http.response_time` regroupées selon le champ `status`. Le `type` doit correspondre à `total`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"avg",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"avg",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "ZHZlZ1Myek1UMjZDYXZ4am16bFFnUXxIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 429
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 2317.284155937053
                },
                "by": {
                    "status": "warn"
                }
            },
            {
                "computes": {
                    "c0": 119.5178351086976
                },
                "by": {
                    "status": "ok"
                }
            },
            {
                "computes": {
                    "c0": 54.850206927300384
                },
                "by": {
                    "status": "info"
                }
            }
        ]
    }
}
```

De la même façon, vous pouvez créer une série temporelle `avg` en définissant le `type` sur `timeseries`.

{{% /tab %}}
{{% tab "Somme" %}}

L'appel d'API suivant permet de créer un tableau `table` affichant les sommes `sum` des valeurs d'une métrique `metric` comme `@http.response_time` regroupées selon le champ `service`. Le `type` doit correspondre à `total`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"sum",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"sum",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
De la même façon, vous pouvez créer une série temporelle `sum` en définissant le `type` sur `timeseries`.

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "SDZMOEZDOW1RUHFaXzc5M1FWSmFTQXxaRHJxZnNuNFVnXzdYRkZ5cjJtMGRB",
        "elapsed": 412
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 30486.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 16113.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{% tab "Minimum" %}}

L'appel d'API suivant permet de créer un tableau `table` affichant les valeurs minimales `min` d'une métrique `metric` comme `@http.response_time` regroupées selon le champ `service`. Le `type` doit correspondre à `total`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"min",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"min",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
De la même façon, vous pouvez créer une série temporelle `min` en définissant le `type` sur `timeseries`.

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "S1FPbUJVUWVSZk9vUFVQdEdNeGhyQXw2Sk9ZcHpiWkZHa0tVYll1LTUyOGZ3",
        "elapsed": 427
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 2440.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 294.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{% tab "Maximum" %}}

L'appel d'API suivant permet de créer un tableau `table` affichant les valeurs maximales `max` d'une métrique `metric` comme `@http.response_time` regroupées selon le champ `service`. Le `type` doit correspondre à `total`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"max",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"max",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
De la même façon, vous pouvez créer une série temporelle `max` en définissant le `type` sur `timeseries`.

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "eEtaMk1rVUlUU1NseWlTWnR5R1VDd3xIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 338
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 23456.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 8399.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{< /tabs >}}

### Obtenir des centiles

L'appel d'API suivant vous permet de créer un tableau `table` affichant les `percentiles` des valeurs d'une métrique `metric` comme `@http.response_time` regroupées selon le champ `service`. Le `type` doit correspondre à `total`. Les différentes valeurs de centiles disponibles sont `pc75`, `pc90`, `pc95`, `pc98` et `pc99`.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"pc99",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"pc99",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "SWlGQVh2YkpRaTJvalprbUFDWmFCQXxIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 513
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 23078.68
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 8379.42
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```
De la même façon, vous pouvez créer une série temporelle `percentile` en définissant le `type` sur `timeseries`.

### Regroupements multiples, nombres uniques et métriques

L'appel d'API suivant vous permet de créer un tableau `table` affichant la répartition de vos données de logs en fonction de facettes `facets` comme `OS` et `Browser`. Ce tableau permet également de calculer différentes métriques comme le nombre unique de `useragent`, la valeur `pc90` de la métrique `duration`, la moyenne `avg` de la métrique `network.bytes_written` et le nombre `count` total d'événements de log.

**Appel d'API :**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"cardinality",
       "metric":"@http.useragent"
   },
   {
       "type":"total",
       "aggregation":"pc90",
       "metric":"@duration"
   },
   {
       "type":"total",
       "aggregation":"avg",
       "metric":"@network.bytes_written"
   },
   {
       "type":"total",
       "aggregation":"count"
   }
   ],
   "filter": {
       "from":"1597428000000",
       "to":"1597428180000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"@http.useragent_details.os.family",
           "limit":2,
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"cardinality",
               "metric":"@http.useragent"
           }
       },
       {
           "type":"facet",
           "facet":"@http.useragent_details.browser.family",
           "limit":2,
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"cardinality",
               "metric":"@http.useragent"
           }
       }
   ]
}
'

```

**Réponse :**

```json
{
    "meta": {
        "status": "done",
        "request_id": "dkt3bGhON0lSOEdCVWFqa3pyUEtNUXxzU0p5RG1qN3MwNk45aExrazFGTTR3",
        "elapsed": 1299
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c3": 534310,
                    "c2": 29855.686900195342,
                    "c1": 289880482.9557167,
                    "c0": 430
                },
                "by": {
                    "@http.useragent_details.browser.family": "Chrome",
                    "@http.useragent_details.os.family": "Mac OS X"
                }
            },
            {
                "computes": {
                    "c3": 47973,
                    "c2": 25117.50770936209,
                    "c1": 270379443.2579185,
                    "c0": 64
                },
                "by": {
                    "@http.useragent_details.browser.family": "Firefox",
                    "@http.useragent_details.os.family": "Mac OS X"
                }
            },
            {
                "computes": {
                    "c3": 901506,
                    "c2": 9170.975124352715,
                    "c1": 235075236.08510733,
                    "c0": 342
                },
                "by": {
                    "@http.useragent_details.browser.family": "Other",
                    "@http.useragent_details.os.family": "Other"
                }
            },
            {
                "computes": {
                    "c3": 2734,
                    "c2": 953181.3177150192,
                    "c1": 200800000.00000006,
                    "c0": 45
                },
                "by": {
                    "@http.useragent_details.browser.family": "Apache-HttpClient",
                    "@http.useragent_details.os.family": "Other"
                }
            }
        ]
    }
}

```
Dans la réponse, `c0` représente le nombre unique de `useragent`, `c1` représente le `pc90` de la métrique `duration`, `c2` représente la moyenne `avg` de la métrique `network.bytes_written` et `c3` représente le nombre `count` total d'événements de log.

**Remarque :** la pagination est uniquement prise en charge si `sort` est défini sur `alphabetical`.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/v2/logs/
[2]: https://docs.datadoghq.com/fr/api/v1/authentication/