---
aliases:
- /es/graphing/faq/how-to-graph-percentiles-in-datadog
- /es/graphing/guide/how-to-graph-percentiles-in-datadog
title: ¿Cómo representar gráficamente los percentiles en Datadog?
---

## Implementación de DogStatsD

Es posible obtener percentiles en Datadog enviando datos como métrica de histograma a través de DogStatsD. El Agent integra un servidor [DogStatsD][1] que recibe paquetes [DogStatsD][1], [realiza la agregación de datos][2], y envía las métricas de percentiles finales a Datadog.

Dado que esta agregación se realiza en la colección, no está disponible como la función Crear gráficas en la GUI.

De los datos de histograma, se obtiene: percentil 95, percentil 50, prom., máx., recuento.

* Una rápida [introducción a DogStatsD][1]

* [Clientes disponibles DogStatsD para cada lenguaje de programación][3].

### Percentiles adicionales

A través de la línea "histogram_percentiles" del archivo de configuración del Agent, obtén percentiles extra, como por ejemplo:

* histogram_percentiles: 0.95, 0.75

[Más información sobre histograma][4]

## Agregaciones locales

Los histogramas se calculan cada 10 segundos sobre una base host por host por el Agent Datadog. Este modelo de recogida tiene sus ventajas y sus limitaciones.

### Ventajas

* Los puntos de datos brutos utilizados para calcular métricas de histograma no se exponen ni se transmiten al sitio Datadog.
* StatsD gestiona las agregaciones pertinentes y envía directamente el paquete de los datos calculados al servidor Datadog.

### Desventajas

* Si tienes dos flujos de información de datos agregados, hoy en día no es posible agregar los puntos de datos brutos de ambos flujos, solo los agregados.
    * EX: Promedio a través de `<METRIC_NAME>.avg` para todas las regiones, toma los valores medios de flujo (stream) para cada región y produce un promedio de promedios.

* Realizar un cambio para aumentar la complejidad de etiqueta (añadiendo etiquetas adicionales para ser más específicos) provoca cambios en el comportamiento de una visualización de métrica enrollada
    * EJ: Mientras que antes del cambio `<METRIC_NAME>.avg` (sin etiquetas) agregaba todos los puntos brutos (StatsD toma todos los puntos de datos brutos, los agrega y los envía a través de un flujo de métrica único), añadir una etiqueta como una de región (EE. UU., UE) hace que StatsD divida los puntos de datos brutos en dos regiones, los agregue y los envíe a través de dos flujos. Esto significa que cuando se crean gráficas `<METRIC_NAME>.avg` AVG por * significa un agregado a través de los dos flujos en lugar de uno solo.

[Más información sobre las características de los histogramas Datadog][5]

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[3]: /es/developers/community/libraries/
[4]: /es/metrics/types/?tab=histogram#metric-types
[5]: /es/developers/faq/characteristics-of-datadog-histograms/