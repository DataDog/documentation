---
disable_toc: false
further_reading:
- link: /dashboards/functions/smoothing
  tag: Documentación
  text: Suavizado
kind: guía
title: ¿Cómo funciona weighted()?
---

Cada consulta de métricas tiene un orden estándar de evaluación (consulta la [anatomía de una consulta][1] para un repaso rápido). Por ejemplo, la siguiente consulta se calcula del siguiente modo: 
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 10)`

1. Agregación temporal: Suma los valores en el tiempo de cada serie temporal (definida por una combinación única de valores de etiquetas [tags]) para cada intervalo de tiempo de agrupación de 10 segundos. El número de combinaciones únicas de valores de etiquetas viene determinado por la etiqueta de alta granularidad/más volátil; por ejemplo `container_id`, en este métrica. 
2. A continuación, por cada `kube_container_name` (agregación espacial), toma la suma de todos los valores promediados como un único valor representativo. Los valores sumados para cada `kube_container_name` dependen del número de `container_id` únicos que haya para cada intervalo de agrupación.

La función `weighted()` tiene en cuenta la corta duración de los valores de la etiqueta`container_id` al sumar por `kube_container_name` para esta métrica de gauge.

#### Ejemplo
Considera esta consulta con los siguientes supuestos: <br>
`sum:kubernetes_state.pod.uptime{*} by {version}.rollup(avg, 10)`

- El intervalo de envío de métricas de gauge está definido en 10 segundos. 
- Se grafica un punto de datos cada 60 segundos.
- En todo momento hay un pod Kubernetes con 2 versiones. Cada versión está etiquetada con una aplicación y sólo hay una versión por aplicación.

Los datos sin procesar durante 60 segundos podrían parecerse a: 

| Tiempo                 | 0s  |  10s |  20s |  30s |  40s |  50s |
| ---                  | --  | ---  | ---  | ---  |  --- |  --- |
| `app:a`, `version:1`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:b`, `version:1`   | NAN | 12   | 12   | 12   | NAN  | NAN  |
| `app:c`, `version:1`   | NAN | NAN  | NAN  | NAN  | 12   | 12   |
| `app:d`, `version:2`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:e`, `version:2`   | NAN | 16   | 16   | 16   | NAN  | NAN  |
| `app:f`, `version:2`   | NAN | NAN  | NAN  | NAN  | 18   | 18   |


1. Agregación temporal -- Agrupación de datos_
Con la agregación temporal, agrupamos datos ya sea `avg` (sin weighted) o la media propuesta de `weighted`: 
| Agregación temporal | .rollup(avg) | Con .weighted() |
| ----------------   | ------------ | ---------------- |
| `app:a`, `version:1` | 12           | 2.0              |
| `app:b`, `version:1` | 12           | 6.0              |
| `app:c`, `version:1` | 12           | 4.0              |
| `app:d`, `version:2` | 12           | 2.0              |
| `app:e`, `version:2` | 16           | 8.0              |
| `app:f`, `version:2` | 18           | 6.0              |

2. _Agregación espacial_ 
Por último, la métrica se agrega por versión para obtener los siguientes valores finales: 
| Agregación espacial por versión | .rollup(avg) | Con .weighted() |
| ------------------------   | ------------ | ---------------- |
| `version:1`                  | 36           | 12               |
| `version:2`                  | 46           | 16               |


La función `weighted()` resuelve cualquier comportamiento incoherente con etiquetas de corta duración, ponderando los valores en función de su tasa de envío.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/#anatomy-of-a-metric-query