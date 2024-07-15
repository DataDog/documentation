---
aliases:
- /es/logs/dynamic_volume_control
- /es/logs/indexes/
description: Control del volumen de logs indexados por Datadog
further_reading:
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Logging without Limits*
kind: documentación
title: Índices
---

Los índices de logs te proporcionan un control preciso de tu presupuesto de gestión de logs, ya que te permiten segmentar los datos en grupos de valor para diferenciar la conservación, las cuotas, la monitorización del uso y la facturación. Los índices se encuentran en la [página de configuración][1], en la sección Índices. Haz doble clic en ellos o pulsa el botón *edit* (editar) para ver más información sobre el número de logs que se han indexado en los últimos 3 días, así como el periodo de conservación de esos logs:

{{< img src="logs/indexes/index_details.jpg" alt="Detalles de los índices" style="width:70%;">}}

Puede utilizar logs indexados para la [búsqueda por facetas][2], los [patrones][3], el [análisis][4] y la [monitorización][6].

## Índices múltiples

Por defecto, cada nueva cuenta obtiene un único índice que representa un conjunto monolítico de todos tus logs. Datadog recomienda utilizar varios índices, si es necesario:

* Múltiples [periodos de conservación](#update-log-retention)
* Múltiples [cuotas diarias](#set-daily-quota), para un control más fino del presupuesto.

El Explorador de logs admite [consultas a través de varios índices][7].

### Añadir índices

Utiliza el botón "New Index" (Nuevo índice) para crear un nuevo índice. Existe un número máximo de índices que puedes crear para cada cuenta, fijado en 100 por defecto.

{{< img src="logs/indexes/add-index.png" alt="Añadir índices" style="width:70%;">}}

**Nota**: Los nombres de índices deben empezar por una letra y sólo pueden contener letras minúsculas, números o el carácter "-".

<div class="alert alert-info">
<a href="/help">Ponte en contacto con el servicio de asistencia de Datadog</a> si necesitas aumentar el número máximo de índices en tu cuenta.
</div>

### Eliminar índices

Para eliminar un índice de tu organización, utiliza el "Delete icon" (icono Eliminar) de la bandeja de acciones de índices. Sólo los usuarios con el permiso `Logs delete data` pueden utilizar esta opción.

{{< img src="logs/indexes/delete-index.png" alt="Eliminar índices" style="width:70%;">}}

<div class="alert alert-warning">
No puedes volver a crear un índice con el mismo nombre del índice eliminado. 
</div>

**Nota:** El índice eliminado ya no aceptará nuevas entradas de logs. Los logs del índice eliminado ya no se podrán consultar. Una vez que todos los logs hayan caducado de acuerdo con el periodo de conservación aplicable, el índice dejará de aparecer en la página Índice.



## Filtros de índices

Los filtros de índices proporcionan un control dinámico sobre qué logs circulan hacia un índice determinado. Por ejemplo, si crearas un primer índice filtrado con el atributo `status:notice`, un segundo índice filtrado con el atributo `status:error` y un índice final sin ningún filtro (el equivalente a `*`), todos tus logs `status:notice` irían al primer índice, todos tus logs `status:error` irían al segundo índice y el resto de los logs irían al índice final.

{{< img src="logs/indexes/multi_index.png" alt="Índices múltiples" style="width:70%;">}}

**Nota**: **Los logs ingresan al primer índice con cuyo filtro coinciden**. Arrastra y suelta en la lista de índices para reordenarlos según tu caso de uso.

## Filtros de exclusión

Por defecto, los índices de logs no tienen filtro de exclusión; es decir, se indexan todos los logs que coinciden con el filtro del índice.

Pero como no todos tus logs son igualmente valiosos, los filtros de exclusión controlan qué logs de los que circulan en tu índice deben ser eliminados. Los logs excluidos se descartan de los índices, pero siguen circulando por [Live Tail][8] y pueden utilizarse para [generar métricas][9] y [archivarse][10].

Para añadir un filtro de exclusión:

1. Ve a [Índices de logs][11].
2. Amplía el pipeline para el que quieres añadir un filtro de exclusión. 
3. Haz clic en **Add an Exclusion Filter** (Añadir un filtro de exclusión).

Los filtros de exclusión se definen mediante una consulta, una regla de muestreo y un conmutador activo/inactivo:

* La **consulta** por defecto es `*`, lo que significa que se excluirían todos los logs que circulan en el índice. Limita el filtro de exclusión a sólo un subconjunto de logs [con una consulta de log][12].
* La **regla de muestreo** por defecto es `Exclude 100% of logs`, que coincide con la consulta. Adapta la tasa de muestreo de 0% a 100% y decide si se aplica a logs individuales o a un grupo de logs definido por los valores únicos de cualquier atributo.
* Por defecto, el **conmutador** está activo, lo que significa que los logs que circulan en el índice se desechan de acuerdo con la configuración del filtro de exclusión. Colócalo en inactivo para ignorar este filtro de exclusión en los nuevos logs que circulan en el índice.

**Nota**: Los filtros de índices para logs sólo se procesan con el primer filtro de exclusión **activo** coincidente. Si un log coincide con un filtro de exclusión (incluso si el log no es muestreado), ignora todos los filtros de exclusión siguientes de la secuencia.

Arrastra y suelta en la lista de filtros de exclusión para reordenarlos según tu caso de uso.

{{< img src="logs/indexes/reorder_index_filters.png" alt="Reordenar filtros de índices" style="width:80%;">}}

### Ejemplos

#### Apagar, encender

Puede que no necesites tus logs DEBUG (Depuración) hasta que realmente te hagan falta cuando tu plataforma sufra un incidente o cuando quieras observar cuidadosamente el despliegue de una versión crítica de tu aplicación. Configura un filtro de exclusión del 100% en `status:DEBUG`, luego actívalo y desactívalo desde la interfaz de usuario de Datadog o a través de la [API][13], cuando sea necesario.

{{< img src="logs/indexes/enable_index_filters.png" alt="Habilitar filtros de índices" style="width:80%;">}}

#### Es necesario prestar atención a las tendencias

¿Qué ocurre si no quieres conservar todos los logs de las solicitudes de tu servidor de acceso web? Podrías optar por indexar todos los logs 3xx, 4xx y 5xx, pero excluir el 95% de los logs 2xx: `source:nginx AND http.status_code:[200 TO 299]` para realizar un seguimiento de las tendencias.
**Consejo**: Transforma los logs de acceso web en KPI significativos con una [métrica generada a partir de tus logs][9], contando el número de solicitudes y etiquetándolos por código de estado, [navegador][14] y [país][15].

{{< img src="logs/indexes/sample_200.png" alt="Habilitar filtros de índices" style="width:80%;">}}

#### Muestreo coherente con entidades de nivel superior

Tienes millones de usuarios que se conectan a tu sitio web todos los días. Y aunque no necesitas contar con una observabilidad de todos y cada uno de tus usuarios, te gustaría conservar una imagen completa de algunos de ellos. Configura un filtro de exclusión que se aplique a todos los logs de producción (`env:production`) y excluya los logs del 90% de las `@user.email`:

{{< img src="logs/indexes/sample_user_id.png" alt="Habilitar filtros de índices" style="width:80%;">}}

Gracias a la [inyección de ID de rastreo en logs][16], puedes utilizar APM junto con los logs. En cuanto a los usuarios, no es necesario que conserves todos tus logs, pero asegurarte de que los logs siempre proporcionen una imagen completa a una traza es fundamental para solucionar problemas.
Configura un filtro de exclusión aplicado a los logs de tu servicio instrumentado (`service:my_python_app`) y excluye los logs del 50% de los `Trace ID`. Asegúrate de utilizar el [reasignador de ID de rastreo][17] ascendente en tus pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="Habilitar filtros de índices" style="width:80%;">}}

Para garantizar la coherencia del muestreo en varios índices:

1. Crea una regla de exclusión en cada índice.
2. Utiliza la **misma frecuencia de muestreo** y el **mismo atributo** que define la entidad de nivel superior para todas las reglas de exclusión.
3. Vuelve a verificar las reglas de exclusión, los **filtros** y el **orden respectivo** (los logs sólo pasan por la primera regla de exclusión coincidente).

En el siguiente ejemplo:

{{< img src="logs/indexes/cross-index_sampling.png" alt="Habilitar filtros de índices" style="width:80%;">}}

* En general, todos los logs con un `request_id` específico se conservan o se excluyen (con una probabilidad del 50%).
* Los logs con una etiqueta `threat:true` o `compliance:true` se conservan independientemente del `request_id`.
* Los logs `DEBUG` se indexan de acuerdo con la regla de muestreo de `request_id`, a menos que el filtro de exclusión de logs de depuración esté habilitado, en cuyo caso se muestrean.
* Se conserva el 50% de los logs de acceso web `2XX` con un `request_id` real. El resto de los logs de acceso web `2XX` se muestrean en función de la regla del filtro de exclusión del 90%.

## Actualizar la conservación de logs

La configuración de la conservación de índices determina durante cuánto tiempo se almacenan los logs y es posible realizar búsquedas en ellos. Puedes configurar la conservación con cualquier valor permitido en los parámetros de tu cuenta.

Para poder añadir opciones de conservación adicionales que no están en tu contrato actual, ponte en contacto con el asesor de clientes en: `success@datadoghq.com`. Una vez habilitadas las opciones de conservación adicionales, debes actualizar los periodos de conservación de tus índices.

{{< img src="logs/indexes/log_retention.png" alt="Detalles de índices" style="width:70%;">}}

**Nota**: Para utilizar opciones de conservación que no están en tu contrato actual, [la opción][21] debe ser habilitada por un administrador en los parámetros de tu organización.

## Definir una cuota diaria

Puedes definir una cuota diaria para limitar el número de logs que se almacenan diariamente en un índice. Esta cuota se aplica a todos los logs que deberían haberse almacenado (por ejemplo, después de la aplicación de filtros de exclusión).
Una vez alcanzada la cuota diaria, los logs ya no se indexan, pero siguen estando disponibles en [Live Tail][18], [se siguen enviando a tus archivos][10] y se siguen utilizando para [generar métricas a partir de logs][9].

Puedes configurar o eliminar esta cuota en cualquier momento al editar el índice:
- Definir una cuota diaria en millones de logs
- (Opcional) Configura una hora de restablecimiento personalizada. Por defecto, las cuotas diarias de índices se restablecen automáticamente a las [14:00 UTC][19].
- (Opcional) Configura un umbral de advertencia como porcentaje de la cuota diaria (mínimo 50%)

**Nota**: Los cambios en las cuotas diarias y los umbrales de advertencia se activan inmediatamente.

{{< img src="logs/indexes/daily_quota_config.png" alt="Detalles de índices" style="width:70%;">}}

Se genera un evento cuando se alcanza la cuota diaria o el umbral de advertencia:

{{< img src="logs/indexes/index_quota_event.png" alt="Notificación de cuotas de índices" style="width:70%;">}}

Para saber cómo monitorizar y recibir alertas sobre tu uso, consulta [Monitorizar el uso de logs][20].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
<br>
* Logging without Limits es una marca registrada de Datadog, Inc.

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
[14]: /es/logs/log_configuration/processors/#user-agent-parser
[15]: /es/logs/log_configuration/processors/#geoip-parser
[16]: /es/tracing/other_telemetry/connect_logs_and_traces/
[17]: /es/logs/log_configuration/processors/#trace-remapper
[18]: /es/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /es/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /es/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes