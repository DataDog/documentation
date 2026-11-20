---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sample Processor
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador muestrea sus Logs para obtener un subconjunto representativo a la tasa que usted defina, descartando los eventos restantes. Como ejemplo, puede usar este procesador para muestrear el 20% de los eventos de un servicio ruidoso no crítico.

El muestreo solo se aplica a los eventos que coinciden con su consulta de filtro y no afecta a otros eventos. Si un evento se descarta en este procesador, el evento no se envía a los procesadores posteriores.

## Configuración {#setup}

Para configurar el Sample Processor:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte la [Sintaxis de búsqueda de registros][1] para obtener más información.
    - Solo los eventos que coinciden con la consulta de filtro especificada se muestrean a la tasa de retención especificada.
    - Los eventos muestreados y los eventos que no coinciden con la consulta de filtro se envían al siguiente paso en la canalización.
1. Ingrese la tasa de muestreo deseada en el campo {{< ui >}}Retain{{< /ui >}}. Por ejemplo, ingresar `2` significa que se retiene el 2% de los eventos de todos los eventos que coinciden con la consulta de filtro.
1. Opcionalmente, ingrese un campo {{< ui >}}Group By{{< /ui >}} para crear grupos de muestreo separados para cada valor único de ese campo. Por ejemplo, `status:error` y `status:info` son dos valores de campo únicos. Cada grupo de eventos con el mismo campo se muestrea de forma independiente. Haga clic en {{< ui >}}Add Field{{< /ui >}} si desea agregar más campos para particionar. Consulte el [group-by example](#group-by-example).

### Group-by example {#group-by-example}

Si tiene la siguiente configuración para el Sample Processor:
- Consulta de filtro: `env:staging`
- Retener: `40%` de los eventos coincidentes
- Group by: `status` y `service`

{{< img src="observability_pipelines/processors/group-by-example-service.png" alt="El Sample Processor con valores de ejemplo" style="width:40%;" >}}

Luego, se retiene el 40% de los eventos para cada combinación única de `status` y `service` de `env:staging`. Por ejemplo:

- Se retiene el 40% de los eventos con `status:info` y `service:networks`.
- Se retiene el 40% de los eventos con `status:info` y `service:core-web`.
- Se retiene el 40% de los eventos con `status:error` y `service:networks`.
- Se retiene el 40% de los eventos con `status:error` y `service:core-web`.

[1]: /es/observability_pipelines/search_syntax/logs/