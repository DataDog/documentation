---
description: Aprende a establecer umbrales mínimos de solicitud para los monitores
  de tasa de error utilizando funciones booleanas para reducir las falsas alarmas
  durante periodos de poco tráfico.
disable_toc: false
further_reading:
- link: /metrics/nested_queries
  tag: Documentación
  text: Consultas anidadas
title: Añadir un umbral mínimo de solicitud para las alertas de tasa de error
---

{{< jqmath-vanilla >}}

## Información general

Al monitorizar las tasas de error u otras métricas basadas en porcentajes, los periodos de poco tráfico pueden disparar falsas alarmas. Por ejemplo, un solo error entre dos solicitudes se muestra como una tasa de error del 50 %, lo que podría superar tu umbral a pesar de representar un impacto mínimo.

Esta guía te muestra cómo añadir un umbral mínimo de solicitudes a tus monitores utilizando funciones booleanas de reasignación de umbrales. Al establecer un número mínimo de solicitudes necesarias antes de evaluar tu tasa de errores, puedes reducir el ruido de los periodos de poco tráfico y centrarte en las alertas que representan problemas significativos.

## Ejemplo de recorrido

Tienes dos métricas que miden las solicitudes de tramo de APM:
- `trace.rack.request.errors` (consulta a)
- `trace.rack.request` (consulta b)

Con estas dos métricas se puede calcular el porcentaje de error:

$$\text"Error Rate" =  \text"trace.rack.request.errors" / \text"trace.rack.request"$$

Quieres monitorizar la tasa de error, pero solo si hay al menos 15 entradas. En la configuración de la consulta de monitor, toma la tasa de error y establece un umbral mínimo en la consulta b (`is_greater(b,15)`).

```((a/b)*100)*is_greater(b,15)```

La función `is_greater` funciona del siguiente modo:
- Devuelve `1` cuando el número de `trace.rack.requests` es superior a 15
- Devuelve `0` cuando el número de `trace.rack.requests` es igual o inferior a 15

Esto significa que tu monitor muestra un valor de `0` cuando no se alcanza el umbral mínimo (15 solicitudes), y muestra la tasa de error calculada cuando se alcanza el umbral. Esto te da más flexibilidad a la hora de configurar tus alertas y te permite evitar falsos positivos en periodos de poco tráfico, a la vez que detectas auténticos problemas de tasa de error cuando el tráfico es suficiente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/nested_queries/#boolean-threshold-remapping-functions