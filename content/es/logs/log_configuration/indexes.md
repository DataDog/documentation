---
aliases:
- /es/logs/dynamic_volume_control
- /es/logs/indexes/
description: Controla el volumen de logs indexados por Datadog
further_reading:
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realiza análisis de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprende más sobre el parseo
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Logging without Limits*
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#optimizing-log-usage-to-manage-volume-and-cost
  tag: Blog
  text: 'Optimizando Datadog a gran escala: Observabilidad rentable en Zendesk'
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centro de aprendizaje
  text: Gestiona y monitorea los volúmenes de logs indexados
title: Índices
---
Los índices de logs proporcionan un control detallado sobre tu presupuesto de Log Management al permitirte segmentar datos en grupos de valor para diferentes períodos de retención, cuotas, monitoreo de uso y facturación. Los índices se encuentran en la [página de configuración][1] en la sección de índices. Haz doble clic en ellos o haz clic en el botón *editar* para ver más información sobre el número de logs que fueron indexados en los últimos 3 días, así como el período de retención para esos logs:

{{< img src="logs/indexes/index_details.jpg" alt="detalles del índice" style="width:70%;">}}

Puedes usar logs indexados para [búsquedas facetadas][2], [patrones][3], [análisis][4] y [monitoreo][6].

## Múltiples índices {#multiple-indexes}

Por defecto, cada nueva cuenta obtiene un único índice que representa un conjunto monolítico de todos tus registros. Datadog recomienda usar múltiples índices si requieres:

* Múltiples [períodos de retención](#update-log-retention)
* Múltiples [cuotas diarias](#set-daily-quota), para un mejor control del presupuesto.

El Explorador de logs admite [consultas a través de múltiples índices][7].

### Agregar índices {#add-indexes}

Utilice el botón "Nuevo Índice" para crear un nuevo índice. Hay un número máximo de índices que puede crear para cada cuenta, establecido en 100 por defecto.

{{< img src="logs/indexes/add-index.png" alt="Agregar índice" style="width:70%;">}}

**Nota**: Los nombres de los índices deben comenzar con una letra y solo pueden contener letras minúsculas, números o el carácter '-'.

<div class="alert alert-info">
<a href="/help">Contacta al soporte de Datadog</a> si necesitas aumentar el número máximo de índices para tu cuenta.
</div>

### Eliminar índices {#delete-indexes}

Para eliminar un índice de tu organización, utiliza el "ícono de eliminar" en la bandeja de acciones del índice. Solo los usuarios con el `Logs delete data` permiso pueden usar esta opción.

{{< img src="logs/indexes/delete-index.png" alt="Eliminar índice" style="width:70%;">}}

<div class="alert alert-danger">
No puedes recrear un índice con el mismo nombre que el eliminado. 
</div>

**Nota:** El índice eliminado ya no aceptará nuevos registros entrantes. Los registros en el índice eliminado ya no están disponibles para consultas. Después de que todos los registros hayan caducado de acuerdo con el período de retención aplicable, el índice ya no aparecerá en la página de Índices.



## Filtros de índices {#indexes-filters}

Los filtros de índice permiten un control dinámico sobre qué registros fluyen hacia qué índices. Por ejemplo, si creas un primer índice filtrado por el atributo `status:notice`, un segundo índice filtrado por el atributo `status:error`, y uno final sin ningún filtro (el equivalente a `*`), todos tus registros `status:notice` irían al primer índice, todos tus registros `status:error` al segundo índice, y el resto iría al índice final.

{{< img src="logs/indexes/multi_index.png" alt="Índices múltiples" style="width:70%;">}}

**Nota**: **Los registros ingresan al primer índice cuyo filtro coincida**, utiliza arrastrar y soltar en la lista de índices para reordenarlos según tu caso de uso.

## Filtros de exclusión {#exclusion-filters}

Por defecto, los índices de registros no tienen filtro de exclusión: es decir, todos los registros que coinciden con el Filtro de Índice son indexados.

Pero dado que tus registros no son todos y igualmente valiosos, los filtros de exclusión controlan qué registros que fluyen en tu índice deben ser eliminados. Los registros excluidos son descartados de los índices, pero aún fluyen a través de [Livetail][8] y pueden ser utilizados para [generar métricas][9] y [archivados][10].

Para agregar un filtro de exclusión:

1. Navega a [Índices][11].
2. Expande el índice para el cual deseas agregar un filtro de exclusión. 
3. Haz clic en **Agregar un Filtro de Exclusión**.

Los filtros de exclusión se definen por una consulta, una regla de muestreo y un interruptor de activo/inactivo:

* La **consulta** predeterminada es `*`, lo que significa que todos los registros que fluyen en el índice serían excluidos. Restringe el ámbito del filtro de exclusión para que se aplique únicamente a un subconjunto de registros [con una consulta de registro][12].
* La **regla de muestreo** predeterminada es `Exclude 100% of logs` que coincide con la consulta. Adapta la tasa de muestreo del 0% al 100%, y decide si la tasa de muestreo se aplica a registros individuales o a grupos de registros definidos por los valores únicos de cualquier atributo.
  * Si la tasa de muestreo se aplica a registros individuales, el muestreo se realiza sobre la existencia de un ID de traza en los registros, si está presente. En este escenario, los registros muestreados tienen una mayor probabilidad de estar correlacionados con trazas muestreadas, para promover datos de telemetría unificados.
  * Si el valor único de un ID de traza es elegido para muestreo, el comportamiento es el mismo que en registros individuales.
* El **interruptor** predeterminado está activo, lo que significa que los registros que fluyen en el índice son realmente descartados de acuerdo con la configuración del filtro de exclusión. Desactívalo para ignorar este filtro de exclusión para los nuevos registros que fluyen en el índice.

**Nota**: Los filtros de índice para registros solo se procesan con el primer **filtro** de exclusión activo que coincida. Si un registro coincide con un filtro de exclusión (incluso si el registro no es muestreado), ignora todos los filtros de exclusión siguientes en la secuencia.

Utiliza arrastrar y soltar en la lista de filtros de exclusión para reordenarlos de acuerdo con tu caso de uso.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reordenar filtros de índice" style="width:80%;">}}

### Ejemplos {#examples}

#### Apagar, encender {#switch-off-switch-on}

Puede que no necesites tus registros de DEBUG hasta que realmente los necesites cuando tu plataforma sufra un incidente, o quieras observar cuidadosamente el despliegue de una versión crítica de tu aplicación. Configura un filtro de exclusión del 100% en el `status:DEBUG`, y actívalo y desactívalo desde la interfaz de Datadog o a través de la [API][13] cuando sea necesario.

{{< img src="logs/indexes/enable_index_filters.png" alt="habilitar filtros de índice" style="width:80%;">}}

#### Mantén un ojo en las tendencias {#keep-an-eye-on-trends}

¿Qué pasa si no deseas mantener todos los registros de las solicitudes de tu servidor de acceso web? Podrías optar por indexar todos los registros 3xx, 4xx y 5xx, pero excluir el 95% de los registros 2xx: `source:nginx AND http.status_code:[200 TO 299]` para hacer un seguimiento de las tendencias.
**Consejo**: Transforma los registros de acceso web en KPIs significativos con una [métrica generada a partir de tus registros][9], contando el número de solicitudes y etiquetadas por código de estado, [navegador][14] y [país][15].

{{< img src="logs/indexes/sample_200.png" alt="habilitar filtros de índice" style="width:80%;">}}

#### Muestreo consistente con entidades de nivel superior {#sampling-consistently-with-higher-level-entities}

Tienes millones de usuarios conectándose a tu sitio web todos los días. Y aunque no necesitas visibilidad en cada usuario individual, aún deseas mantener la imagen completa para algunos. Configura un filtro de exclusión que se aplique a todos los registros de producción (`env:production`) y excluye registros para el 90% de los `@user.email`:

{{< img src="logs/indexes/sample_user_id.png" alt="habilitar filtros de índice" style="width:80%;">}}

Puedes usar APM junto con registros, gracias a la [inserción de ID de traza en los registros][16]. En cuanto a los usuarios, no es necesario mantener todos tus registros, pero asegurarte de que los registros siempre ofrezcan una imagen completa para una traza es fundamental para la solución de problemas.
Configura un filtro de exclusión aplicado a los registros de tu servicio instrumentado (`service:my_python_app`) y excluye registros para el 50% de los `Trace ID` - asegúrate de usar el [remapeador de ID de traza][17] aguas arriba en tus canalizaciones.

{{< img src="logs/indexes/sample_trace_id.png" alt="habilitar filtros de índice" style="width:80%;">}}

Para asegurar la consistencia de muestreo a través de múltiples índices:

1. Crea una regla de exclusión en cada índice.
2. Usa la **misma tasa de muestreo** y el **mismo atributo** que define la entidad de nivel superior para todas las reglas de exclusión.
3. Verifica dos veces las reglas de exclusión, **filtros** y **el orden respectivo** (los registros solo pasan a través de la primera regla de exclusión que coincida).

En el siguiente ejemplo:

{{< img src="logs/indexes/cross-index_sampling.png" alt="habilitar filtros de índice" style="width:80%;">}}

* En general, todos los registros con un `request_id` específico son o bien conservados o excluidos (con un 50% de probabilidad).
* Los registros con una etiqueta `threat:true` o `compliance:true` se conservan independientemente del `request_id`.
* `DEBUG` los registros se indexan de manera consistente con la `request_id` regla de muestreo, a menos que el filtro de exclusión de registros de depuración esté habilitado, en cuyo caso se muestrean.
* El 50% de los `2XX` registros de acceso web con un `request_id` real se conservan. Todos los demás `2XX` registros de acceso web se muestrean según la regla de filtro de exclusión del 90%.

## Actualiza la retención de registros {#update-log-retention}

La configuración de retención del índice determina cuánto tiempo se almacenan y son buscables los registros en Datadog. Puedes establecer la retención a cualquier valor permitido en la configuración de tu cuenta.

Para habilitar la adición de retenciones adicionales que no están en tu contrato actual, contacta al equipo de Customer Success en: `success@datadoghq.com`. Después de que se hayan habilitado retenciones adicionales, necesitas actualizar los períodos de retención para tus índices.

{{< img src="logs/indexes/log_retention.png" alt="detalles del índice" style="width:70%;">}}

**Nota**: Para usar retenciones que no están en tu contrato actual, [la opción][21] debe ser habilitada por un administrador en la configuración de tu organización.

## Establece la cuota diaria {#set-daily-quota}

Puedes establecer una cuota diaria para limitar estrictamente el número de registros que se almacenan dentro de un índice por día. Esta cuota se aplica a todos los registros que deberían haberse almacenado (como después de que se aplican los filtros de exclusión).
Una vez que se alcanza la cuota diaria, los registros ya no se indexan, pero aún están disponibles en el [livetail][18], [enviados a tus archivos][10] y utilizados para [generar métricas a partir de registros][9].

Puedes configurar o eliminar esta cuota en cualquier momento al editar el índice:
- Establecer una cuota diaria en millones de registros
- (Opcional) Establecer un tiempo de reinicio personalizado; por defecto, las cuotas diarias del índice se reinician automáticamente a las [2:00pm UTC][19]
- (Opcional) Establecer un umbral de advertencia como un porcentaje de la cuota diaria (mínimo 50%)

**Nota**: Los cambios en las cuotas diarias y los umbrales de advertencia entran en efecto de inmediato.

{{< img src="logs/indexes/daily_quota_config.png" alt="detalles del índice" style="width:70%;">}}

Se genera un evento cuando se alcanza la cuota diaria o el umbral de advertencia:

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="Eventos de cuota diaria y advertencia" style="width:90%;">}}

Consulta [Seguimiento del uso de registros][20] sobre cómo hacer seguimiento y alertar sobre tu uso.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/
[2]: /es/logs/explorer/#visualization
[3]: /es/logs/explorer/patterns/
[4]: /es/logs/explorer/analytics/
[6]: /es/monitors/types/log/
[7]: /es/logs/explorer/facets/#the-index-facet
[8]: /es/logs/live_tail/
[9]: /es/logs/logs_to_metrics/
[10]: /es/logs/archives/
[11]: https://app.datadoghq.com/logs/pipelines/indexes
[12]: /es/logs/search_syntax/
[13]: /es/api/v1/logs-indexes/#update-an-index
[14]: /es/logs/log_configuration/processors/user_agent_parser/
[15]: /es/logs/log_configuration/processors/geoip_parser/
[16]: /es/tracing/other_telemetry/connect_logs_and_traces/
[17]: /es/logs/log_configuration/processors/trace_remapper/
[18]: /es/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /es/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /es/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes