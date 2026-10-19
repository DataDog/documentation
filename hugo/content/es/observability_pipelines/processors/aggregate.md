---
description: Aprenda a usar el procesador Aggregate para combinar múltiples métricas
  con los mismos valores de etiqueta en una sola muestra.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Procesador Aggregate
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Aggregate combina múltiples métricas con los mismos valores de etiqueta en una sola muestra según el modo de agregación seleccionado. Agregar métricas puede ayudar a reducir el volumen y los costos de sus métricas.

## Configuración {#setup}

Para configurar el procesador Aggregate:

1. Defina una consulta de filtro. Consulte la [Sintaxis de búsqueda de métricas][1] para obtener información sobre cómo crear consultas.
    - Las métricas que no coinciden con la consulta de filtro se envían al siguiente paso en la canalización.
    - Las métricas que coinciden con la consulta se agregan y las métricas agregadas se envían al siguiente paso en la canalización.
1. En el menú desplegable **Mode**, seleccione la función de agregación que desea utilizar. Consulte la sección [Modos ](#modes) para obtener más detalles.
1. En el campo **Interval**, ingrese la ventana de tiempo en segundos para agregar métricas. El valor máximo es 60 segundos.

## Modos {#modes}

El procesador Aggregate puede combinar métricas en una sola métrica según los siguientes modos. Algunos modos están disponibles solo para [tipos de métricas][2] específicos, incrementales o absolutos.

| Modo   | Descripción                                                                            | Métricas incrementales | Métricas absolutas |
| ------ | -------------------------------------------------------------------------------------- | :-----------------: | :--------------: |
| Auto   | Modo predeterminado. Suma las métricas incrementales y utiliza el valor más reciente para las métricas absolutas. | {{< X >}}           | {{< X >}}        |
| Sum    | Suma los valores de las métricas.                                                                | {{< X >}}           |                  |
| Count  | Cuenta la cantidad de veces que se recibe la métrica.                                     | {{< X >}}           | {{< X >}}        |
| Más reciente | Devuelve el valor de métrica más reciente.                                                       |                     | {{< X >}}        |
| Máximo | Devuelve el valor de métrica máximo.                                                      |                     | {{< X >}}        |
| Promedio | Devuelve el valor de métrica promedio.                                                         |                     | {{< X >}}        |
| Mínimo | Devuelve el valor de métrica mínimo.                                                      |                     | {{< X >}}        |

[1]: /es/observability_pipelines/search_syntax/metrics/
[2]: /es/observability_pipelines/configuration/?tab=metrics#metrics-data