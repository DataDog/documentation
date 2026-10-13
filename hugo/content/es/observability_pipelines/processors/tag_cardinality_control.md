---
description: Aprenda a usar el procesador Tag Cardinality Control para limitar la
  cantidad de valores de etiqueta para cada métrica.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Procesador Tag Cardinality Control
---
{{< jqmath-vanilla >}}

{{< product-availability >}}

## Descripción general {#overview}

El procesador Tag Cardinality Control limita la cantidad de valores de etiqueta para cada métrica. Por ejemplo, una métrica con claves de etiqueta sin límites, como `userID`, puede provocar que la cardinalidad de la métrica aumente drásticamente e impacte en los costos de ingesta e indexación. Para evitar estos picos inesperados, use el procesador para establecer un límite de cardinalidad para las métricas que coinciden con la consulta de filtro, y descarte las métricas recibidas después de alcanzar el límite o descarte las etiquetas de esas métricas.

Opcionalmente, también puede configurar [anulaciones por métrica](#optional-per-metric-override-settings) para establecer un límite para una métrica específica o para excluir la métrica de cualquier límite de cardinalidad. Para cada anulación por métrica, también puede establecer un límite personalizado para etiquetas individuales dentro de la métrica, o excluirlas del límite de cardinalidad por métrica.

## Configuración {#setup}

Para configurar el procesador Tag Cardinality Control:

1. Defina una consulta de filtro. Consulte [Sintaxis de búsqueda de métricas][1] para obtener más información.
    - Solo se procesan las métricas que coinciden con el filtro.
    - Todas las métricas, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Seleccione un **Modo de seguimiento** en el menú desplegable. Consulte la sección [Modos exacto y probabilístico](#exact-and-probabilistic-modes) para obtener más información.
1. Ingrese un límite de cardinalidad para la cantidad máxima de valores distintos por etiqueta. Este límite se aplica a todas las métricas que coinciden con la consulta de filtro.
1. En el menú desplegable **Cuando se alcanza el límite**, seleccione si desea **Descartar etiqueta** o **Descartar evento** para las métricas que han excedido el límite de cardinalidad.

{{< img src="observability_pipelines/processors/tag_cardinality_control_settings.png" alt="El procesador Tag Cardinality Control configurado con un límite de cardinalidad de 200 y para descartar la etiqueta cuando se alcanza el límite." style="width:40%;" >}}

### Configuración opcional de anulación por métrica {#optional-per-metric-override-settings}

Si desea establecer un límite de cardinalidad para una métrica específica:

1. Haga clic en **Administrar anulaciones** y luego en **Agregar anulación de métrica** en el panel lateral.
1. Ingrese el nombre de la métrica.
1. Seleccione el modo de anulación en el menú desplegable.
    - **Límite personalizado**: Establece un límite de cardinalidad para esta métrica.
    - **Excluir del límite**: Excluye esta métrica de ser contada para el límite de cardinalidad. Esto es útil cuando está rastreando una métrica importante y no desea descartar ninguna muestra o etiqueta debido a un límite de cardinalidad.
1. En el menú desplegable **Cuando se alcanza el límite**, seleccione si desea **Descartar etiqueta** o **Descartar evento** para las métricas que han excedido el límite de cardinalidad.

#### Anulaciones por etiqueta {#per-tag-overrides}

Para agregar anulaciones de etiqueta específicas para esta métrica:

1. Haga clic en **Agregar anulación de etiqueta**.
1. Ingrese la clave de etiqueta para la que desea establecer un límite.
1. Seleccione el modo de anulación en el menú desplegable:
    - **Límite personalizado**: Establece un límite en el número de valores únicos por etiqueta. Por ejemplo, si se establece el límite de cardinalidad en `5`, se utilizan los primeros cinco valores de etiqueta recibidos.
        - **Nota**: Los valores de etiqueta persisten hasta que el Worker se reinicia o se actualiza la configuración de la canalización. Cualquier actualización de la configuración de la canalización restablece los valores de etiqueta, incluso si la actualización no modifica el procesador Tag Cardinality Control.
    - **Excluir del límite**: Excluye las métricas con la etiqueta especificada de ser contadas para el límite de cardinalidad.
1. Ingrese el límite para el número máximo de valores de clave de etiqueta.
1. Haga clic en **Agregar anulación**.

{{< img src="observability_pipelines/processors/tag_cardinality_control_overrides.png" alt="El panel de anulación por métrica con un límite personalizado establecido en 100, con anulaciones por etiqueta para la etiqueta servidor excluida del límite y la etiqueta region limitada a cinco." style="width:80%;" >}}

## Cómo funciona el procesador {#how-the-processor-works}

### Modos exacto y probabilístico {#exact-and-probabilistic-modes}

El procesador Tag Cardinality Control admite dos modos para realizar el seguimiento de la cardinalidad de las etiquetas:

- **Exacto**: Almacena los valores de las etiquetas como un hash de 8 bytes para optimizar el uso de la memoria, a costa de una probabilidad extremadamente pequeña de que dos valores distintos se conviertan en la misma huella digital.
- **Probabilístico**: Utiliza [filtros de Bloom][2] para realizar el seguimiento de los valores vistos, lo que puede optimizar considerablemente el uso de la memoria a costa de falsos positivos ocasionales. Un falso positivo ocurre cuando se determina incorrectamente que un valor que aún no se ha visto ha sido visto, lo que hace que el procesador exceda ligeramente el límite de cardinalidad especificado.

#### Uso de memoria para el modo exacto {#memory-usage-for-exact-mode}

La siguiente fórmula calcula cuánta memoria utiliza el modo exacto:

$$A = \\text\"número total de métricas\"\\ \\×\\ \\text\"número promedio de claves de etiqueta por métrica\"$$

$$B = \\text\"longitud promedio de cada clave de etiqueta\"\\ + (\\text\"value_limit\"\\ \\×\\ \\text\"longitud promedio de los valores de etiqueta\")$$

$$\\text\"Uso de memoria\" = A\\ \\×\\ B$$

Dado que cada valor de etiqueta se almacena como una huella digital hash de 8 bytes, el `average length of tag values` es `8`.

#### Uso de memoria para el modo probabilístico {#memory-usage-for-probabilistic-mode}

El modo probabilístico utiliza filtros de Bloom para realizar el seguimiento de los valores vistos para cada par (métrica, etiqueta). Por ejemplo, si el nombre de la métrica es `request.latency` con las claves de etiqueta `host` y `region`, los pares rastreados son:

- (`request.latency`, `host`)
- (`request.latency`, `region`)

La siguiente fórmula estima el uso de memoria para el modo probabilístico:

$$A = \\text\"número total de métricas\"\\ \\×\\ \\text\"número promedio de claves de etiqueta por métrica\"$$

$$B = \\text\"longitud promedio de los nombres de campo para las etiquetas\"\\ \\+\\ \\text\"cache_size_per_key\"$$

$$\\text\"Uso de memoria\" = A\\ \\×\\ B$$

Puede calcular `cache_size_per_key` con una calculadora de filtros de Bloom utilizando una fórmula estándar, donde `n` es el límite de cardinalidad y la tasa de falsos positivos (`p`) está fijada en `0.1%` en el Worker.

### Puntos de referencia para el modo exacto frente al modo probabilístico {#benchmarks-for-exact-mode-versus-probabilistic-mode}

Las siguientes tablas muestran los puntos de referencia para el modo exacto y el modo probabilístico. A medida que aumenta el número de valores únicos para cada etiqueta, el modo probabilístico se vuelve más eficiente en cuanto a memoria. Los nombres de las métricas y los nombres de las etiquetas utilizados para estos benchmarks fueron cadenas de 20 bytes generadas aleatoriamente.

El tipo de máquina utilizado para el benchmarking es una instancia AWS M6gd.4xlarge.

#### Puntos de referencia para 10,000 métricas rastreadas {#benchmarks-for-10000-metrics-tracked}

La siguiente tabla muestra el uso de memoria RSS del Worker para el modo probabilístico y exacto al rastrear 10,000 métricas.

**10 etiquetas por métrica**

| Valores únicos por etiqueta | Modo probabilístico (GB) | Modo exacto (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 500                   | 0.20                    | 1.04            |
| 250                   | 0.13                    | 0.56            |
| 100                   | 0.10                    | 0.21            |

#### Puntos de referencia para 50,000 métricas rastreadas {#benchmarks-for-50000-metrics-tracked}

La siguiente tabla muestra el uso de memoria RSS del Worker para el modo probabilístico y exacto al rastrear 50,000 métricas.

**10 etiquetas por métrica**

| Valores únicos por etiqueta | Modo probabilístico (GB) | Modo exacto (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 0.35                    | 0.92            |
| 250                   | 0.54                    | 2.67            |
| 500                   | 0.83                    | 5.06            |

**50 etiquetas por métrica**

| Valores únicos por etiqueta | Modo probabilístico (GB) | Modo exacto (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 1.27                    | 3.98            |
| 250                   | 2.08                    | 12.91           |
| 500                   | 3.33                    | 24.87           |

#### Puntos de referencia para 100,000 métricas rastreadas {#benchmarks-for-100000-metrics-tracked}

La siguiente tabla muestra el uso de memoria RSS del Worker para el modo probabilístico y exacto al rastrear 100,000 métricas.

**10 etiquetas por métrica**

| Valores únicos por etiqueta | Modo probabilístico (GB) | Modo exacto (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 0.66                    | 1.79            |
| 250                   | 1.02                    | 5.29            |
| 500                   | 1.61                    | 10.11           |

**50 etiquetas por métrica**

| Valores únicos por etiqueta | Modo probabilístico (GB) | Modo exacto (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 2.49                    | 7.86            |
| 250                   | 4.08                    | 25.74           |
| 500                   | 6.61                    | 47.15 (estimado)|

[1]: /es/observability_pipelines/search_syntax/metrics/
[2]: https://en.wikipedia.org/wiki/Bloom_filter