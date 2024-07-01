---
further_reading:
- link: /logs/explorer/analytics/?tab=timeseries#overview
  tag: Documentación
  text: Más información sobre el Análisis de log
- link: /api/v2/logs/#aggregate-events
  tag: Documentación
  text: Sintaxis para la API de Análisis de log
- link: /logs/guide/collect-multiple-logs-with-pagination/?tab=v1api
  tag: Documentación
  text: Recopilar varios logs con paginación
kind: guía
title: Crea informes personalizados utilizando la API de Análisis de log
---


## Información general

Utilice la [API de Análisis de log][1] para crear rápidamente informes y dashboards personalizados para tu equipo combinando información de tu empresa y otros servicios junto con datos de log.

En esta guía se tratan los siguientes ejemplos:

* [Obtener recuentos](#getting-counts)
* [Obtener estadísticas](#getting-stats)
* [Obtener percentiles](#getting-percentiles)
* [Múltiples grupos, recuentos únicos y métricas](#multiple-group-bys-unique-counts-and-metrics) 
* [Paginación](#pagination)

## Requisitos previos

- El uso de la API de Análisis de log requiere una [clave de API][2] y una [clave de aplicación][3]. El usuario que ha creado la clave de aplicación debe tener los permisos adecuados para acceder a los datos. Para utilizar los ejemplos siguientes, sustituye `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tu clave de API de Datadog y tu clave de aplicación de Datadog, respectivamente.

- Esta guía también asume que tienes un terminal con `curl`.

## Ejemplos

### Obtener recuentos

{{< tabs >}}
{{% tab "Table" %}}

Con la siguiente llamada a la API, crea una `table` con `count` de eventos de log agrupados por el campo `status` y que muestra los 3 primeros elementos. El `type` debe ser `total`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Respuesta:**

El conjunto de datos resultante comprende el objeto `buckets` como se muestra en el siguiente ejemplo de respuesta. En este ejemplo, `c0` representa el total de `count`.

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
{{% tab "Timeseries" %}}
Con la siguiente llamada a la API, crea una `timeseries` con `count` de eventos de log agrupados por el campo `status` cambiado cada `1m`. El `type` debe ser `timeseries`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Respuesta:**

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

### Obtener estadísticas

{{< tabs >}}
{{% tab "Average" %}}

Con la siguiente llamada a la API, crea una `table` con `avg` de valores en una `metric` como `@http.response_time` agrupados por el campo `status`. El `type` debe ser `total`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Respuesta:**

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

Del mismo modo, puedes crear una serie temporal `avg` configurando `type` como `timeseries`.

{{% /tab %}}
{{% tab "Sum" %}}

Con la siguiente llamada a la API, crea una `table` con `sum` de valores en una `metric` como `@http.response_time` agrupados por el campo `service`. El `type` debe ser `total`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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
Del mismo modo, crea una serie temporal `sum` estableciendo `type` como `timeseries`.

**Respuesta:**

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
{{% tab "Min" %}}

Con la siguiente llamada a la API, crea una `table` con `min` de valores en una `metric` como `@http.response_time` agrupados por el campo `service`. El `type` debe ser `total`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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
Del mismo modo, crea una serie temporal `min` estableciendo `type` como `timeseries`.

**Respuesta:**

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
{{% tab "Max" %}}

Con la siguiente llamada a la API, crea una `table` con `max` de valores en una `metric` como `@http.response_time` agrupados por el campo `service`. El `type` debe ser `total`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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
Del mismo modo, puedes crear una serie temporal `max` configurando `type` como `timeseries`.

**Respuesta:**

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

### Obtener percentiles

Con la siguiente llamada a la API, crea una `table` con `percentiles` de valores en una `metric` como `@http.response_time` agrupados por el campo `service`. El `type` debe ser `total`. Los diferentes valores de percentil disponibles son `pc75`, `pc90`, `pc95`, `pc98` y `pc99`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Respuesta:**

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
Del mismo modo, crea una serie temporal `percentile` estableciendo `type` como `timeseries`.

### Múltiples grupos, recuentos únicos y métricas

Con la siguiente llamada a la API, crea una `table` para mostrar el desglose de tus datos de log por `facets` como `OS` y `Browser` y calcular diferentes métricas como el recuento único de `useragent`, `pc90` de `duration` de métrica, `avg` de métrica `network.bytes_written` , y el `count` total de eventos de log.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Respuesta:**

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
En la respuesta, `c0` representa el recuento único de `useragent`, `c1` representa el `pc90` de `duration` de métrica, `c2` representa el `avg` de métrica `network.bytes_written`, y `c3` representa el `count` total de eventos de log.

### Paginación

La siguiente llamada a la API crea una `table` para mostrar el desglose de tus datos de log por facetas (como `service` y `status`), ordena los resultados por `service` en orden ascendente, y pagina sobre el conjunto de resultados utilizando `limit`.

**Llamada a la API:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1611118800000",
       "to":"1611205140000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"asc"
           },
           "limit":2
       },
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"count"
           }
       }
   ]
}'

```

**Respuesta:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "MjZUNF9qRG1TaG1Tb01JenhBV2tYd3x3VTNjTUhIQUdaRUZKajQ0YTBqdmZn",
        "page": {
            "after": "eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iXX19"
        },
        "elapsed": 5923
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 312
                },
                "by": {
                    "status": "info",
                    "service": "activator"
                }
            },
            {
                "computes": {
                    "c0": 405606
                },
                "by": {
                    "status": "info",
                    "service": "ad-auction"
                }
            },
            {
                "computes": {
                    "c0": 124
                },
                "by": {
                    "status": "error",
                    "service": "ad-auction"
                }
            }
        ]
    }
}

```
Para paginar y acceder al siguiente conjunto de resultados, utiliza la opción `page` y establece el valor `cursor` en el valor `after` de la llamada anterior.

**Llamada a la API:**
```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1611118800000",
       "to":"1611205140000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"asc"
           },
           "limit":2
       },
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"count"
           }
       }
   ],
   "page":{
       "cursor":"eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iXX19"
   }
}'

```

**Respuesta:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "aVM2Y2VVMUZReVNmLVU4ZzUwV1JnUXxRWkVjamNHZU9Ka21ubjNDbHVYbXJn",
        "page": {
            "after": "eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iLCJhZC1zZXJ2ZXIiLCJhZGRvbi1yZXNpemVyIl19fQ"
        },
        "elapsed": 6645
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 24740759
                },
                "by": {
                    "status": "info",
                    "service": "ad-server"
                }
            },
            {
                "computes": {
                    "c0": 2854331
                },
                "by": {
                    "status": "error",
                    "service": "ad-server"
                }
            },
            {
                "computes": {
                    "c0": 139
                },
                "by": {
                    "status": "error",
                    "service": "addon-resizer"
                }
            }
        ]
    }
}
```

**Nota:** La paginación solo es posible si `sort` es `alphabetical` para al menos una faceta, como se muestra en el ejemplo anterior. Para crear un informe con varios grupos con facetas de cardinalidad alta, realiza llamadas a la API por separado. Por ejemplo, para crear un informe que muestre diferentes métricas para `url paths` por cada `session id`, realiza llamadas a la API por separado. La primera llamada devolvería todos los `sessions ids` ordenados y utilizarías estos resultados para obtener las métricas para `url paths` para cada `session id`.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/v2/logs/
[2]: /es/account_management/api-app-keys/#api-keys
[3]: /es/account_management/api-app-keys/#application-keys