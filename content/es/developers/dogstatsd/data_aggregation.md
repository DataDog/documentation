---
aliases:
- /es/developers/faq/data-aggregation-with-dogstatsd-threadstats
description: Descubrir cómo el servidor de DogStatsD agrega tus datos antes de enviarlos
  a Datadog
further_reading:
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficiales y creadas por la comunidad, y bibliotecas cliente de DogStatsD
title: Agregación de datos de DogStatsD
---

Datadog DogStatsD implementa el protocolo StatsD [con algunas diferencias][1]. DogStatsD te permite enviar métricas y monitorizar el código de tu aplicación sin bloquearla. Los datos se transmiten desde tu aplicación a través del UDP al [servidor de DogStatsD][2] local (incorporado en el Datadog Agent), que los agrega y luego los envía al endpoint de la API de Datadog. Para obtener más información, consulta la [configuración de DogStatsD][2].

Este artículo explica por qué y cómo se realiza la agregación de tus datos.

## ¿Por qué agregar métricas?

La agregación mejora el rendimiento al reducir el número de llamadas a la API, cada una de las cuales requiere un cierto tiempo.

Considera una [métrica COUNT (Recuento)][3] que se incrementa 1.000 veces (1 cada vez) en un corto periodo de tiempo. En lugar de realizar 1.000 llamadas a la API por separado, el servidor de DogStatsD las agrega en unas pocas llamadas a la API. Dependiendo de la situación (consulta a continuación), la biblioteca puede enviar, por ejemplo, 1 punto de datos con un valor 1.000 o X puntos de datos agregados con un valor acumulado de 1.000.

## ¿Cómo se realiza la agregación con el servidor de DogStatsD?

[DogStatsD][2] utiliza un intervalo de vaciado de 10 segundos. Cada 10 segundos, [DogStatsD][2] comprueba todos los datos recibidos desde el último vaciado. Todos los valores que corresponden al mismo nombre de métrica y a las mismas etiquetas (tags) se agregan juntos en un único valor.

**Nota**: Con el protocolo StatsD, el cliente de StatsD no envía métricas con marcas de tiempo. La marca de tiempo se añade en el momento del vaciado. Así que, para un vaciado que ocurre a las 10:00:10, todos los datos recibidos por el servidor de [DogStatsD][2] (incorporado en el Datadog Agent) entre las 10:00:00 y las 10:00:10 se agrupan en un único punto de datos que recibe las 10:00:00 como marca de tiempo.

## Reglas de agregación por tipo de métrica 

Entre todos los valores recibidos durante el mismo intervalo de vaciado, el valor agregado enviado depende del [tipo de métrica][4]:

| Tipo de métrica       | Agregación realizada en un intervalo de vaciado                                                 |
|-------------------|-----------------------------------------------------------------------------------------------|
| [GAUGE][5] (Indicador)        | Se envía el último punto de datos recibido.                                                        |
| [COUNT][3] (Recuento)        | Se envía la suma de todos los puntos de datos recibidos.                                                   |
| [HISTOGRAM][6] (Histograma)    | Se envían el mínimo, el máximo, la suma, el promedio, los percentiles 95, el recuento y la mediana de todos los puntos de datos recibidos. |
| SET (Conjunto)               | Se envía el número de puntos de datos diferentes.                                                   |
| [DISTRIBUTION][7] (Distribución) | Agregados como distribuciones globales.                                                           |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/dogstatsd/
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: /es/metrics/types/?tab=count#metric-types
[4]: /es/metrics/types/
[5]: /es/metrics/types/?tab=gauge#metric-types
[6]: /es/metrics/types/?tab=histogram#metric-types
[7]: /es/metrics/types/?tab=distribution#metric-types