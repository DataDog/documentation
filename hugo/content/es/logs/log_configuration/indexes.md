---
aliases:
- /es/logs/dynamic_volume_control
- /es/logs/indexes/
description: Controle el volumen de registros indexados por Datadog
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centro de arquitectura
  text: Una guía sobre estrategias de indexación para Log Management con Datadog
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Logging without Limits*
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#optimizing-log-usage-to-manage-volume-and-cost
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centro de aprendizaje
  text: Administrar y hacer un seguimiento de volúmenes de logs indexados
title: Índices
---
Los índices de registros brindan un control preciso sobre su presupuesto de Log Management al permitirle segmentar los datos en grupos de valor para diferentes retenciones, cuotas, seguimiento de uso y facturación. Los índices se encuentran en la [página de configuración][1] en la sección Índices. Haga doble clic en ellos o haga clic en el botón *edit* para ver más información sobre la cantidad de registros que se indexaron en los últimos 3 días, así como el período de retención para esos registros:

{{< img src="logs/indexes/index_details.jpg" alt="detalles del índice" style="width:70%;">}}

Puede usar logs indexados para [búsquedas por facetas][2], [patrones][3], [análisis][4] y [hacer un seguimiento][6].

## Múltiples índices {#multiple-indexes}

De forma predeterminada, cada cuenta nueva obtiene un único índice que representa un conjunto monolítico de todos sus registros. Datadog recomienda usar múltiples índices si necesita:

* Múltiples [períodos de retención](#update-log-retention)
* Múltiples [cuotas diarias](#set-daily-quota), para un control de presupuesto más preciso.

El Log Explorer admite [consultas en múltiples índices][7].

### Agregar índices {#add-indexes}

Use el botón {{< ui >}}New Index{{< /ui >}} para crear un nuevo índice. Existe un número máximo de índices que puede crear para cada cuenta, establecido en 100 de forma predeterminada.

{{< img src="logs/indexes/add-index.png" alt="Agregar índice" style="width:70%;">}}

**Nota**: Los nombres de índice deben comenzar con una letra y solo pueden contener letras minúsculas, números o el carácter '-'.

<div class="alert alert-info">
<a href="/help">Comuníquese con el soporte de Datadog</a> si necesita aumentar el número máximo de índices para su cuenta.
</div>

### Eliminar índices {#delete-indexes}

Para eliminar un índice de su organización, use el icono {{< ui >}}Delete{{< /ui >}} en la bandeja de acciones del índice. Solo los usuarios con el permiso `Logs delete data` pueden usar esta opción.

{{< img src="logs/indexes/delete-index.png" alt="Eliminar índice" style="width:70%;">}}

<div class="alert alert-danger">
No puede volver a crear un índice con el mismo nombre que el eliminado. 
</div>

**Nota:** El índice eliminado ya no aceptará nuevos registros entrantes. Los registros en el índice eliminado ya no están disponibles para realizar consultas. Después de que todos los registros hayan caducado de acuerdo con el período de retención aplicable, el índice ya no aparecerá en la página de Índices.



## Filtros de índices {#indexes-filters}

Los filtros de índice permiten un control dinámico sobre qué registros fluyen hacia qué índices. Por ejemplo, si crea un primer índice filtrado por el atributo `status:notice`, un segundo índice filtrado por el atributo `status:error` y uno final sin ningún filtro (el equivalente a `*`), todos sus registros `status:notice` irían al primer índice, todos sus registros `status:error` al segundo índice y el resto iría al final.

{{< img src="logs/indexes/multi_index.png" alt="Índices múltiples" style="width:70%;">}}

**Nota**: **Los registros ingresan al primer índice cuyo filtro coincida**, utilice arrastrar y soltar en la lista de índices para reordenarlos según su caso de uso.

## Filtros de exclusión {#exclusion-filters}

De forma predeterminada, los índices de registros no tienen filtro de exclusión: es decir, todos los registros que coinciden con el Filtro de índice se indexan.

Pero debido a que no todos sus registros son igual de valiosos, los filtros de exclusión controlan qué registros que fluyen hacia su índice deben eliminarse. Los registros excluidos se descartan de los índices, pero aún fluyen a través de [Livetail][8] y pueden usarse para [generar métricas][9] y [archivarse][10].

Para agregar un filtro de exclusión:

1. Navegue a [Log Indexes][11].
2. Expanda el índice para el cual desea agregar un filtro de exclusión. 
3. Haga clic en {{< ui >}}Add an Exclusion Filter{{< /ui >}}.

Los filtros de exclusión se definen mediante una consulta, una regla de muestreo y un interruptor de activo/inactivo:

* La **consulta** predeterminada es `*`, lo que significa que todos los registros que fluyen en el índice serían excluidos. Reduzca el alcance del filtro de exclusión a solo un subconjunto de registros [con una consulta de registro][12].
* La **regla de muestreo** predeterminada es `Exclude 100% of logs` coincidente con la consulta. Adapte la tasa de muestreo del 0% al 100% y decida si la tasa de muestreo se aplica a registros individuales o a un grupo de registros definidos por los valores únicos de cualquier atributo.
  * Si la tasa de muestreo se aplica a registros individuales, el muestreo se realiza según la existencia de ID de traza en los registros, si están presentes. En este escenario, los registros muestreados tienen una mayor probabilidad de correlacionarse con trazas muestreadas, para promover datos de telemetría unificados.
  * Si se elige el valor único de un ID de traza para el muestreo, el comportamiento es el mismo que en los registros individuales.
* El **interruptor** predeterminado está activo, lo que significa que los registros que fluyen en el índice se descartan realmente de acuerdo con la configuración del filtro de exclusión. Cambie esto a inactivo para ignorar este filtro de exclusión para los nuevos registros que fluyen en el índice.

**Nota**: Los filtros de índice para registros solo se procesan con el primer filtro de exclusión **activo** que coincida. Si un registro coincide con un filtro de exclusión (incluso si el registro no se descarta mediante muestreo), ignora todos los filtros de exclusión siguientes en la secuencia.

Use arrastrar y soltar en la lista de filtros de exclusión para reordenarlos según su caso de uso.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reordenar filtros de índice" style="width:80%;">}}

### Ejemplos {#examples}

#### Switch off, switch on {#switch-off-switch-on}

Es posible que no necesite sus registros de DEBUG hasta que realmente los requiera cuando su plataforma sufra un incidente, o desee observar cuidadosamente la implementación de una versión crítica de su aplicación. Configure un filtro de exclusión del 100% en el `status:DEBUG`, y actívelo y desactívelo desde la interfaz de usuario de Datadog o a través de la [API][13] cuando sea necesario.

{{< img src="logs/indexes/enable_index_filters.png" alt="habilitar filtros de índice" style="width:80%;">}}

#### Esté atento a las tendencias {#keep-an-eye-on-trends}

¿Qué sucede si no desea conservar todos los registros de las solicitudes de su servidor de acceso web? Podría optar por indexar todos los registros 3xx, 4xx y 5xx, pero excluir el 95% de los registros 2xx: `source:nginx AND http.status_code:[200 TO 299]` para hacer un seguimiento de las tendencias.
**Consejo**: Transforme los registros de acceso web en KPI significativos con una [métrica generada a partir de sus registros][9], contando el número de solicitudes y etiquetadas por código de estado, [navegador][14] y [país][15].

{{< img src="logs/indexes/sample_200.png" alt="habilitar filtros de índice" style="width:80%;">}}

#### Muestreo consistente con entidades de nivel superior {#sampling-consistently-with-higher-level-entities}

Tiene millones de usuarios conectándose a su sitio web todos los días. Y aunque no necesita observabilidad de cada usuario, aún desea mantener el panorama completo para algunos. Configure un filtro de exclusión que se aplique a todos los registros de producción (`env:production`) y excluya los registros del 90% de los `@user.email`:

{{< img src="logs/indexes/sample_user_id.png" alt="habilitar filtros de índice" style="width:80%;">}}

Puede usar APM junto con Logs, gracias a la [inyección de ID de traza en los registros][16]. En cuanto a los usuarios, no necesita conservar todos sus registros, pero asegurarse de que los registros siempre brinden el panorama completo de una traza es fundamental para la resolución de problemas.
Configure un filtro de exclusión aplicado a los registros de su servicio instrumentado (`service:my_python_app`) y excluya los registros del 50% de los `Trace ID`; asegúrese de usar el [remapeador de ID de traza][17] en sus canalizaciones.

{{< img src="logs/indexes/sample_trace_id.png" alt="habilitar filtros de índice" style="width:80%;">}}

Para garantizar la consistencia del muestreo en múltiples índices:

1. Cree una regla de exclusión en cada índice.
2. Use la **misma tasa de muestreo** y el **mismo atributo** que define la entidad de nivel superior para todas las reglas de exclusión.
3. Verifique dos veces las reglas de exclusión, los **filtros** y el **orden respectivo** (los registros solo pasan por la primera regla de exclusión que coincida).

En el siguiente ejemplo:

{{< img src="logs/indexes/cross-index_sampling.png" alt="habilitar filtros de índice" style="width:80%;">}}

* En general, todos los registros con un `request_id` específico se conservan o se excluyen (con un 50% de probabilidad).
* Los registros con una etiqueta `threat:true` o `compliance:true` se conservan independientemente del `request_id`.
* `DEBUG` los registros se indexan de forma coherente con la regla de muestreo `request_id`, a menos que el filtro de exclusión de registros de depuración esté habilitado, en cuyo caso se muestrean.
* Se conserva el 50% de los `2XX` registros de acceso web con un `request_id` real. Todos los demás `2XX` registros de acceso web se muestrean según la regla del filtro de exclusión del 90%.

## Actualizar retención de registros {#update-log-retention}

La configuración de retención del índice determina cuánto tiempo se almacenan los registros y cuánto tiempo se pueden buscar en Datadog. Puede establecer la retención en cualquier valor permitido en la configuración de su cuenta.

Para habilitar la adición de retenciones adicionales que no se encuentren en su contrato actual, comuníquese con el equipo de Customer Success en: `success@datadoghq.com`. Una vez habilitadas las retenciones adicionales, debe actualizar los periodos de retención de sus índices.

{{< img src="logs/indexes/log_retention.png" alt="detalles del índice" style="width:70%;">}}

**Nota**: Para utilizar retenciones que no se encuentren en su contrato actual, [la opción][21] debe ser habilitada por un administrador en la configuración de su organización.

## Establecer cuota diaria {#set-daily-quota}

Puede establecer una cuota diaria para limitar estrictamente la cantidad de registros que se almacenan en un índice por día. Esta cuota se aplica a todos los registros que deberían haberse almacenado (por ejemplo, después de aplicar los filtros de exclusión).
Una vez alcanzada la cuota diaria, los registros ya no se indexan, pero siguen estando disponibles en [livetail][18], [enviados a sus archivos][10] y utilizados para [generar métricas a partir de registros][9].

Puede configurar o eliminar esta cuota en cualquier momento al editar el índice:
- Establecer una cuota diaria en millones de registros
- (Opcional) Establecer una hora de restablecimiento personalizada; de forma predeterminada, las cuotas diarias de los índices se restablecen automáticamente a las [2:00pm UTC][19]
- (Opcional) Establecer un umbral de advertencia como porcentaje de la cuota diaria (mínimo 50%)

**Nota**: Los cambios en las cuotas diarias y los umbrales de advertencia entran en vigor de inmediato.

{{< img src="logs/indexes/daily_quota_config.png" alt="detalles del índice" style="width:70%;">}}

Se genera un evento cuando se alcanza la cuota diaria o el umbral de advertencia:

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="Eventos de cuota diaria y advertencia" style="width:90%;">}}

Consulte [Monitor log usage][20] para saber cómo hacer un seguimiento y alertar sobre su uso.

## Lecturas adicionales {#further-reading}

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