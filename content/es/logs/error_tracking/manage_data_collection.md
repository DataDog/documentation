---
description: Aprende a controlar los costes en el rastreo de errores.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre los monitores de rastreo de errores
- link: /tracing/error_tracking
  tag: Documentación
  text: Más información sobre el rastreo de errores para servicios de backend
is_beta: true
kind: documentación
private: true
title: Gestionar recopilación de datos
---

## Información general

El rastreo de errores proporciona un control preciso de los errores que se ingieren, lo que te ayuda a reducir el ruido y evitar costes inesperados.

Puedes definir qué datos se incluyen en el rastreo de errores de dos maneras:

1. [Reglas](#rules-inclusion)
2. [Límites de tarifa](#rate-limits)

Puedes configurar tanto las reglas como los límites de velocidad en la página [**Logs** > **Error Tracking** > **Settings**][1] (Logs > Rastreo de errores > Configuración)

## Reglas

Las reglas te permiten seleccionar qué errores se introducen en el rastreo de errores.

Cada regla consta de:
- Un filtro de inclusión, que contiene una [consulta de búsqueda de log][3], como `service:my-web-store`.
- Opcionalmente, uno o más filtros de exclusión anidados para refinar aún más la regla. Por ejemplo, un filtro de exclusión podría utilizar la consulta `env:staging` para excluir el staging de logs.

Una regla determinada puede activarse o desactivarse. Un evento de error se incluye si coincide con una consulta de uno de los filtros de inclusión activos y no coincide con ninguna consulta de exclusión anidada activa.

**Nota:** Los eventos de error aceptados por una regla pueden quedar excluidos del rastreo de errores si carecen de los [atributos requeridos][2].

### Orden de evaluación

Las reglas se evalúan en orden, deteniéndose la evaluación en la primera regla coincidente. La prioridad de las reglas y sus filtros anidados dependen de su orden en la lista.

### Reglas por defecto

Por defecto, el rastreo de errores tiene un filtro de inclusión `*` y ningún filtro de exclusión. Esto significa que todos los logs de errores con los [requisitos][2] para ser identificados se ingieren en el rastreo de errores.

### Añadir una regla

Para añadir una regla (filtro de inclusión):
1. Navega hasta [Error Tracking Settings][1] (Configuración de rastreo de errores).
1. Haz clic en **Add New Rule** (Añadir nueva regla).
1. Introduce un nombre en el campo **Name** (Nombre).
1. Introduce una [consulta de búsqueda de log][3] en el campo **Define rule query** (Definir consulta de regla).
1. Haz clic en **Add new rule** (Añadir nueva regla).
1. Opcionalmente, reordena las reglas para cambiar tu [orden de evaluación](#evaluation-order). Haz clic y arrastra el icono de seis puntos sobre una regla determinada para moverla hacia arriba o hacia abajo en lista.

{{< img src="logs/error_tracking/reorder_filters.png" alt="En el lado derecho de cada regla hay un ícono de seis puntos, que puedes arrastrar de forma vertical para reordenar las reglas." style="width:80%;">}}

### Añadir un filtro de exclusión anidado a una regla

1. Expande la regla para la que deseas añadir un filtro de exclusión. 
1. Haz clic en **Add Exclusion Filter** (Añadir filtro de exclusión).
    {{< img src="logs/error_tracking/filters.png" alt="Expande una regla para ver la opción Añadir filtro de exclusión." style="width:70%;">}}
1. Introduce un nombre en el campo **Name** (Nombre).
1. Introduce una [consulta de búsqueda de log][3] en el campo **Define exclusion filter query** (Definir consulta de filtro de exclusión).
1. Haz clic en **Save Exclusion Filter** (Guardar filtro de exclusión).

## Límites de tasa

Los límites de tasa te permiten controlar el número de logs de errores indexados incluidos en el rastreo de errores por día. Este límite se aplica a todos los logs de errores indexados que coincidan con el filtro de inclusión de una [regla](#rules).

Una vez alcanzado el tope diario, se interrumpe la ingesta hasta el día siguiente. Puedes modificar o eliminar el tope en cualquier momento.

### Establecer un límite de tasa

Para establecer un límite de tasa:
1. Ve a [**Logs** > **Error Tracking** > **Settings**][1] (Logs > Rastreo de errores > Configuración).
1. Haz clic en **Rate Limits** (Límites de tasa).
1. Edita el campo **errors/month** (errores/mes).
1. Haz clic en **Save Rate Limit** (Guardar límite de tasa).

{{< img src="logs/error_tracking/rate_limit.png" alt="En el lado izquierdo de esta página, en 'Set your Rate Limit below' (Establecer tu límite de tasa a continuación) hay un menú desplegable donde puedes establecer tu límite de tasa." style="width:70%;">}}

Se genera un evento `Rate limit applied` cuando se alcanza el límite de tasa. Consulta la [documentación de gestión de eventos][4] para obtener información detallada sobre la visualización y el uso de eventos.

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="Captura de pantalla de un evento 'Rate limit applied' (Límite de tasa aplicada) en el Event Explorer. El estado del evento es INFO, la fuente es el rastreo de errores, la marca temporal es '6h ago' (6 horas atrás) y el título es 'Rate limit applied' (Límite de tasa aplicado). El evento tiene la etiqueta 'source:error_tracking'. El mensaje dice 'Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page (Tu límite de tasa se ha aplicado ya que más de 60000000 eventos de errores de logs se enviaron al rastreo de errores. El límite de tasa se puede cambiar en la página de control de ingesta). " style="width:70%;">}}

## Monitorización del uso

Puedes monitorizar tu uso del rastreo de errores configurando monitores y alertas para la métrica `datadog.estimated_usage.error_tracking.logs.events`, que realiza un rastreo del número de logs de errores ingestados.

Esta métrica está disponible por defecto sin coste adicional, y tus datos se conservan durante 15 meses.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /es/logs/error_tracking/#setup
[3]: /es/logs/explorer/search_syntax/
[4]: /es/service_management/events/