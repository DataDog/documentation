---
description: Aprenda a usar el procesador Throttle para establecer un límite en la
  cantidad de registros enviados dentro de un intervalo de tiempo específico.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Throttle
---
{{< jqmath-vanilla >}}

{{< product-availability >}}

## Descripción general {#overview}

Use este procesador para establecer un límite en la cantidad de registros enviados dentro de un intervalo de tiempo específico. Por ejemplo, puede establecer un límite para que solo se envíen 100 registros por segundo. Establecer un límite de tasa puede ayudarle a detectar cualquier pico en la ingesta de registros y evitar costos de facturación inesperados.

## Configuración {#setup}

Para configurar el procesador:

1. Defina una consulta de filtro. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Todos los registros coincidentes se limitan. Los registros que se envían dentro del límite de tasa y los registros que no coinciden con el filtro se envían al siguiente paso. Los registros enviados después de que se haya alcanzado el límite de tasa se descartan. Consulte [Sintaxis de búsqueda][4] para obtener más información.
1. Establezca la tasa de limitación. Esta es la cantidad de eventos permitidos para un bucket determinado durante el intervalo de tiempo establecido. **Nota**: Este límite de tasa se aplica a nivel de **Worker**. Si aumenta o disminuye la cantidad de Workers, es posible que desee ajustar el límite de tasa del procesador en consecuencia. Puede actualizar el límite de tasa mediante programación utilizando la [Observability Pipelines API][1].
1. Establezca el intervalo de tiempo.
1. Opcionalmente, haga clic en {{< ui >}}Add Field{{< /ui >}} si desea agrupar por un campo.

## Cómo funciona el procesador Throttle {#how-the-throttle-processor-works}

El procesador Throttle establece un límite de tasa en la cantidad de registros enviados dentro de un intervalo de tiempo especificado. Aunque es similar al [procesador Quota][2], la principal diferencia entre los procesadores Throttle y Quota es que el intervalo de tiempo del procesador Quota es fijo de 24 horas y no se puede cambiar, mientras que el intervalo de tiempo del procesador Throttle se puede configurar. Dado que la ventana de tiempo del procesador Throttle es configurable, el procesador tiene una tasa de reabastecimiento de capacidad basada en la tasa de limitación y la ventana de tiempo que usted establezca. Consulte [Tasa de reabastecimiento de capacidad](#capacity-replenishment-rate) para obtener más información.

La siguiente tabla compara el procesador Throttle con el procesador Quota:

| Característica | Procesador Quota | Procesador Throttle |
|---------|----------------|-------------------|
| Ventana de tiempo | Fija en 24 horas | Configurable |
| Manejo de ráfagas iniciales de eventos | Procesa datos hasta el límite diario fijo. | Procesa eventos hasta su tasa de limitación configurada. |
| Después de alcanzar el límite | Deja de procesar datos hasta que se restablezca la ventana de tiempo de 24 horas. | Continúa a una tasa constante y calculada. |
| Mecanismo de restablecimiento | Se restablece cada 24 horas. | Reabastecimiento continuo. La ventana de tiempo también se restablece si vuelve a implementar el Worker o el pipeline. |
| Cómo se almacenan o rastrean los límites | Los límites de cuota persisten incluso si el Worker se reinicia, porque los límites se almacenan en el backend. | La ventana de tiempo se restablece si vuelve a implementar el Worker o el pipeline, porque los límites de limitación se rastrean en la memoria del Worker. |

### Capacidad inicial {#initial-capacity}

{{< img src="observability_pipelines/processors/throttling_rate.png" alt="El procesador Throttle con la tasa de limitación establecida en 1000 K" style="width:40%;" >}}

Cuando el procesador Throttle está habilitado, la cantidad de registros que el procesador permite pasar inmediatamente se basa en la {{< ui >}}Throttling Rate{{< /ui >}} configurada. Por ejemplo, si la {{< ui >}}Throttling Rate{{< /ui >}} se establece en `1000` eventos durante 60 segundos, y llegan 5,000 eventos en el momento en que se habilita el procesador:

- El procesador permite que pase una capacidad inicial de 1,000 eventos.
- Los 4,000 eventos restantes se descartan.
- Este comportamiento inicial es idéntico al del procesador Quota.

### Tasa de reabastecimiento de capacidad {#capacity-replenishment-rate}

El procesador Throttle utiliza un [algoritmo de tasa de celda genérica][3], que permite que los eventos se procesen a una tasa constante. La tasa de reabastecimiento se basa en la configuración de su procesador Throttle y permite que pase una cierta cantidad de eventos por segundo. Esta tasa se puede calcular de la siguiente manera:

$$\\text\"Tasa de limitación\" / \\text\"Ventana de tiempo (en segundos)\"$$

#### Ejemplo {#example}

Si utiliza la siguiente configuración de procesador:
- Tasa de limitación = 1000 eventos
- Ventana de tiempo = 60 minutos (3600 segundos)

La tasa de reabastecimiento de capacidad es:

$$\\text\"1000 eventos\" / \\text\"60 minutos\" ≈ \\text\"17 eventos\"/ \\text\"minuto\" ≈ \\text\"0.28 eventos\"/ \\text\"segundo\"$$

Si `T` es el momento en que el procesador se habilita y el procesador recibe 5000 eventos en ese momento, la cantidad de eventos que el procesador permite pasar según `T` es la siguiente:
- `T + 0` minutos (cuando el procesador está habilitado):
    - 1000 eventos procesados.
    - 4000 eventos descartados.
- `T + 1` minuto: ~17 eventos pueden ser procesados
- `T + 2` minutos: ~17 eventos pueden ser procesados
- ...el procesador continúa procesando eventos a una tasa constante de ~17 eventos por minuto y descartando el resto hasta el siguiente minuto.

**Nota**: La tasa de reabastecimiento determina el rendimiento máximo después de la capacidad inicial. Puede ajustar la tasa de limitación para obtener un mayor o menor rendimiento si es necesario.

[1]: /es/api/latest/observability-pipelines/#update-a-pipeline
[2]: /es/observability_pipelines/processors/quota/
[3]: https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm
[4]: /es/observability_pipelines/search_syntax/logs/