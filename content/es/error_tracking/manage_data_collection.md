---
description: Aprende a controlar los costes en Error Tracking.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre los monitores de seguimiento de errores
- link: /tracing/error_tracking
  tag: Documentación
  text: Más información sobre el seguimiento de errores para servicios de backend
title: Gestionar la recopilación de datos
---

## Información general

El rastreo de errores proporciona un control preciso de los errores que se ingieren, lo que te ayuda a reducir el ruido y evitar costes inesperados.

Puedes definir qué datos se incluyen en el rastreo de errores de dos maneras:

- [Reglas](#rules-inclusion)
- [Límites de tasa](#rate-limits)

Puedes configurar tanto las reglas como los límites de tasa en la página [**Error Tracking** > **Configuración**][1].

## Reglas

Las reglas te permiten seleccionar qué errores se ingieren en Error Tracking. Se aplican tanto a errores facturables como no facturables.

Cada regla consta de:
- Un contexto: un filtro de inclusión, que contiene una consulta de búsqueda, como `service:my-web-store`.
- Opcionalmente, uno o más filtros de exclusión anidados para ajustar aún más la regla e ignorar algunos de los eventos de coincidencias. Por ejemplo, un filtro de exclusión podría utilizar la consulta `env:staging` para excluir los errores de preparación.

Una regla determinada puede activarse o desactivarse. Un evento de error se incluye si coincide con una consulta de uno de los filtros de inclusión activos _y_ no coincide con ninguna consulta de exclusión anidada activa.

Cada evento de error se comprueba con las reglas en orden. El evento es procesado sólo por la primera regla activa con la que coincide, y todas las reglas posteriores son ignoradas. Si la regla con la que coincide tiene un filtro de exclusión, se excluye el evento; de lo contrario, se incluye el evento.

**Nota:** Los eventos de error aceptados por una regla pueden quedar excluidos del rastreo de errores si carecen de los [atributos requeridos][2].

### Orden de evaluación

Las reglas se evalúan en orden, deteniéndose la evaluación en la primera regla coincidente. La prioridad de las reglas y sus filtros anidados dependen de su orden en la lista.

{{% collapse-content title="Ejemplo" level="p" %}}
Dada una lista de reglas:
- Regla 1: `env:prod`
    - Filtro de exclusión 1-1: `servicio:api`
    - Filtro de exclusión 1-2: `status:warn`
- Regla 2: `servicio:web`
- Regla 3 (esta regla está desactivada): `team:security`
- Regla 4: `servicio:foo`


{{< img src="error_tracking/error-tracking-filters-example.png" alt="Ejemplo de configuración de filtros de Error Tracking" style="width:75%;" >}}

El flujo de procesamiento es el siguiente:
{{< img src="error_tracking/error-tracking-filters-diagram-brand-design.png" alt="Filtros de Error Tracking" style="width:90%;" >}}


Un evento con `env:prod servicio:my-servicio status:warn` 
- coincidirá con la regla 1 y pasará a sus filtros de exclusión 
- no coincidirá con la exclusión 1-1 por lo que pasará a la exclusión 1-2
- en la exclusión 1-2, será una coincidencia, por lo que se descartará los eventos 

Un evento con `env:staging servicio:web` 
- no coincidirá con la regla 1, por lo que pasará a la regla 2 
- en la regla 2, será una coincidencia, por lo que el evento se mantendrá

{{% /collapse-content %}}

### Reglas por defecto

Por defecto, Error Tracking tiene un filtro de inclusión `*` y ningún filtro de exclusión. Esto significa que todos los errores con los [requisitos][2] para ser identificados se ingieren en Error Tracking.

### Añadir una regla

Para añadir una regla (filtro de inclusión):
1. Navega hasta [Error Tracking Settings][1] (Configuración de rastreo de errores).
2. Haz clic en **Add New Rule** (Añadir nueva regla).
3. Selecciona la **fuente de Error Tracking** a la que se aplicará la regla.
4. Introduce una consulta de búsqueda en el campo **Define scope** (Definir contexto).
5. Opcionalmente, **Add Exclusion** (Añadir filtros de exclusión) y una descripción a la regla.
6. Pulsa **Save Changes** (Guardar cambios).
7. También puedes reorganizar las reglas para cambiar el [orden de evaluación](#evaluation-order) como prefieras. Haz clic y arrastra el icono de seis puntos sobre una regla determinada para moverla hacia arriba o hacia abajo en lista.

{{< img src="error_tracking/reorder-filters.png" alt="En el lado derecho de cada regla hay un icono de seis puntos que puedes arrastrar de forma vertical para reordenar las reglas." style="width:80%;">}}


## Límites de tasa

Los límites de tasa te permiten controlar el número de errores facturables incluidos en Error Tracking por día. Este límite se aplica a todos los errores que coincidan con los filtros de una [regla](#rules).

Una vez alcanzado el tope diario, se interrumpe la ingesta hasta el día siguiente. Puedes modificar o eliminar el tope en cualquier momento.

### Establecer un límite de tasa

Para establecer un límite de tasa:
1. Ve a [**Error Tracking** > **Configuración**][1].
1. Haz clic en **Rate Limits** (Límites de tasa).
1. Edita el campo **errors/day** (errores/día).
1. Haz clic en **Save Rate Limit** (Guardar límite de tasa).

{{< img src="error_tracking/rate-limit.png" alt="En el lado izquierdo de esta página, en 'Set your Rate Limit below' (Establecer tu límite de tasa a continuación) hay un menú desplegable donde puedes establecer tu límite de tasa." style="width:70%;">}}

Se genera un evento `Rate limit applied` cuando se alcanza el límite de tasa. Consulta la [Documentación de Event Management][4] para obtener más información sobre la visualización y el uso de eventos.

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="Captura de pantalla de un evento 'Rate limit applied' (Límite de tasa aplicada) en el Event Explorer. El estado del evento es INFO, la fuente es el rastreo de errores, la marca temporal es '6h ago' (hace 6 horas) y el título es 'Rate limit applied' (Límite de tasa aplicado). El evento tiene la etiqueta 'source:error_tracking'. El mensaje dice 'Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page (Tu límite de tasa se ha aplicado ya que más de 60000000 eventos de errores de logs se enviaron al rastreo de errores. El límite de tasa se puede cambiar en la página de control de ingesta). " style="width:70%;">}}

## Monitorización del uso

Puedes monitorizar tu Error Tracking en el uso de logs configurando monitores y alertas para la métrica `Datadog.estimated_usage.error_tracking.log.eventos`, que realiza un seguimiento del número de logs de errores ingeridos.

Esta métrica está disponible por defecto sin coste adicional, y tus datos se conservan durante 15 meses.

## Muestreo dinámico

Dado que la facturación del seguimiento de errores se basa en el número de errores, los grandes aumentos en los errores de una sola incidencia pueden consumir rápidamente tu presupuesto de seguimiento de errores. El muestreo dinámico te protege mediante un umbral para la tasa de error por incidencia basado en tu límite de tasa diario y en los volúmenes de error históricos; muestrea los errores cuando se alcanza dicho umbral. El muestreo dinámico se desactiva automáticamente cuando la tasa de error de tu incidencia disminuye por debajo del umbral dado.

### Configuración

El muestreo dinámico se activa automáticamente con el seguimiento de errores con un umbral de consumo por defecto basado en tu límite de tasa diaria y volumen histórico.

Para obtener mejores resultados, establece un límite de tasa diario en la página [Límites de tasa de Error Tracking][5]: haz clic en **Edit Rate Limit** (Editar límite de tasa) e introduce un nuevo valor.

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Límite de tasa del seguimiento de errores" style="width:90%" >}}

### Desactivar el muestreo dinámico

El muestreo dinámico puede desactivarse en la página [Configuración de seguimiento de errores][4].

{{< img src="error_tracking/dynamic-sampling-settings.png" alt="Configuración de muestreo dinámico del seguimiento de errores" style="width:90%" >}}

### Monitorización del muestreo dinámico

Se genera un evento `Dynamic Sampling activated` cuando se aplica Dynamic Sampling a un incidente. Consulta la [Documentación de Event Management][4] para obtener información detallada sobre la visualización y el uso de eventos.

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Límite de tasa del seguimiento de errores" style="width:90%" >}}

#### Investigación y pasos de mitigación

Cuando se aplica el muestreo dinámico, los siguientes pasos son recomendados:

- Comprueba qué incidencia está consumiendo tu cuota. La incidencia a la que se aplica el muestreo dinámico está vinculada en el evento generado en la Gestión de eventos.
- Si deseas recopilar muestras adicionales para esta edición, aumenta tu cuota diaria en la página [Límites de la tasa de Error Tracking][5].
- Si deseas evitar la recopilación de muestras para este problema en el futuro, considera la posibilidad de crear un filtro de exclusión para evitar que eventos adicionales se ingieran en Error Tracking.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /es/error_tracking/troubleshooting/?tab=java#errors-are-not-found-in-error-tracking
[4]: /es/service_management/events/
[5]: https://app.datadoghq.com/error-tracking/settings/rate-limits