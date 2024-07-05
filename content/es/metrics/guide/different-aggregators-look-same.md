---
aliases:
- /es/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
- /es/dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
further_reading:
- link: /metrics/introduction/#combining-time-series
  tag: Documentación
  text: Agregación de espacios
title: El cambio entre agregadores sum/min/max/avg no modifica el valor
---

Cuando utilizas los agregadores `sum`/`min`/`max`/`avg`, buscas en varias series y no en puntos de una única serie. Por lo tanto, si la consulta se limita a su nivel más granular, es posible que el cambio de agregadores no modifique los valores que ves.

Por ejemplo, si desglosas las solicitudes web por `host` y `path`, obtendrás una serie para cada combinación. Los datos en un momento determinado pueden tener este aspecto:

| Nombre de la métrica  | Etiquetas                      | Valor |
| ------------ | ------------------------- | ----- |
| solicitudes web | `host: a`, `path: /test1` | 5     |
| solicitudes web | `host: a`, `path: /test2` | 3     |
| solicitudes web | `host: b`, `path: /test1` | 2     |
| solicitudes web | `host: b`, `path: /test2` | 8     |

Obtienes resultados diferentes por método de agregación al agrupar por `host`, ya que hay dos series por `host` que deben combinarse.

| Consulta                           | host: a | host: b |
| ------------------------------- | ------- | ------- |
| `sum:web.requests(*) by {host}` | 8       | 10      |
| `min:web.requests(*) by {host}` | 3       | 2       |
| `max:web.requests(*) by {host}` | 5       | 8       |
| `avg:web.requests(*) by {host}` | 4       | 5       |

Si agrupas por `host` **y** `path` en este ejemplo, se obtienen cuatro series en las que `sum`/`min`/`max`/`avg` son iguales por serie, ya que ese es el nivel más granular para estos datos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}