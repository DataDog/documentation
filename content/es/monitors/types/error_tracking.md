---
aliases:
- /es/monitors/create/types/error_tracking/
description: Más información sobre el tipo de monitor de rastreo de errores.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Información sobre el rastreo de errores para aplicaciones web y móviles
- link: /tracing/error_tracking/
  tag: Documentación
  text: Más información sobre el rastreo de errores para servicios de backend
- link: /logs/error_tracking/
  tag: Documentación
  text: Más información sobre el rastreo de errores para logs
- link: /monitors/notify/
  tag: Documentación
  text: Configurar tus notificaciones de monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
kind: documentación
title: Monitor de rastreo de errores
---

## Información general

El rastreo de errores de Datadog agrupa automáticamente todos tus errores en problemas en tus aplicaciones web, móviles y backend. Ver los errores agrupados en incidencias te ayuda a priorizar y encontrar los problemas que tienen más impacto, lo que facilita minimizar las caídas del servicio y reducir la frustración de los usuarios.

Con [Real User Monitoring][1], [APM][2], o [Logs][6] habilitado para tu organización, puedes crear un monitor de rastreo de errores para alertarte cuando un problema en tu aplicación web o móvil, servicio de backend, o logs comienza, cuando tiene un alto impacto y cuando comienza a retroceder.

## Crear un monitor de rastreo de errores

Para crear un monitor de rastreo de errores en Datadog, navega hasta [**Monitors** > **New Monitor** > **Error Tracking**][3] (Monitores > Nuevo monitor > Rastreo de errores).

<div class="alert alert-info"><strong>Nota</strong>: Hay un límite por defecto de 1000 monitores de rastreo de errores por cuenta. <a href="/help/">Contacta con Soporte</a> para aumentar este límite para tu cuenta.</div>

### Selecciona la condición de alertar

Hay dos tipos de condiciones de alertar con las que puedes configurar tu monitor de seguimiento de errores:

| Condición de alertar     | Descripción    | 
| ---  | ----------- |
|Cuenta| Alerta sobre incidencias con un elevado número de errores. Por ejemplo, alerta de tu servicio siempre que se produzcan más de 500 incidencias de tu error. |
|Nuevo problema| Se activa cuando se produce un problema por primera vez. Tienes la opción de recibir una notificación si se produce una regresión y establecer un umbral para reducir la fatiga de alertas.|

### Definir la consulta de búsqueda

{{< tabs >}}
{{% tab "Count" %}}

1. Selecciona **RUM Events**, **Traces**, o **logs** (Eventos RUM, Trazas o Logs) en el menú desplegable y elige qué métrica deseas monitorizar: un recuento, una faceta o una medida.
   - Para las incidencias de error, monitoriza sobre un recuento global basado en el ID de incidencia.
   - Para los usuarios afectados, monitoriza sobre un recuento único de correos electrónicos de usuarios basado en el ID de incidencia o sobre una medida.
   - Para las sesiones afectadas, monitoriza sobre un recuento único de IDs de sesión basados en el ID de incidencia.
   - Monitoriza sobre una medida. Si seleccionas una medida, el monitor alerta sobre el valor numérico de la faceta RUM (similar a un monitor de métrica). Selecciona un tipo de agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, o `max`).

   Existen tres opciones de filtro rápido para acceder a las facetas más utilizadas:

   - **Error Occurrences** (Ocurrencias de error): se activa cuando el recuento de errores es `above` o `above or equal to`.
   - **Impacted Users** (Usuarios afectados): se activa cuando el número de correos electrónicos de usuarios impactados es `above` o `above or equal to`.
   - **Impacted Sessions** (Sesiones afectadas): se activa cuando el número de IDs de sesión afectados es `above` o `above or equal to`.

   Si seleccionas **Traces** (Trazas) o **Logs** en el menú desplegable, solo estará disponible la opción **Error Occurrences** (Ocurrencias de error).

2. Crea una consulta de búsqueda utilizando la misma lógica que una [búsqueda de RUM Explorer][1], [búsqueda de APM Explorer][3], o [búsqueda de Log Explorer][4] para los sucesos de error de los problemas.
3. Opcionalmente, configurar la estrategia de agrupación de alertas. Para más información, consulta [Configuración del monitor][2].

<div class="alert alert-info"><strong>Nota</strong>: El recuento de monitores para APM solo puede crearse basándose en tramos (spans) retenidos por <a href="/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter/">filtros de retención personalizados</a> (no el filtro de retención inteligente).</div>

### Definir tus condiciones de alerta

Se activa cuando el recuento de errores es `above` o `above or equal to`. Se activa una alerta cuando una métrica supera un umbral.

[1]: /es/real_user_monitoring/explorer/search/
[2]: /es/monitors/configuration/#alert-grouping/
[3]: /es/tracing/trace_explorer/?tab=listview#filtering
[4]: /es/logs/explorer/search/
{{% /tab %}}

{{% tab "New Issue" %}}

1. Selecciona o introduce un periodo personalizado para que el monitor considere un problema como nuevo después de su primera aparición. El umbral seleccionado se evalúa en el periodo indicado. Una vez transcurrido el periodo especificado, el monitor deja de alertar y se vuelve verde.

   La lista de problemas tiene un selector de periodos. Se puede utilizar para encontrar los temas que se consideran nuevos en ese periodo.
2. Selecciona **RUM Events**, **Traces**, o **Logs** (Eventos de RUM, trazas o logs) y elige monitorizar sobre una cuenta o [medida][1].
   - Monitoriza el recuento de sucesos para un ID de problema específico.
   - Monitoriza sobre una medida. Si seleccionas una medida, el monitor alerta sobre el valor numérico de la faceta RUM o APM (similar a un monitor de métrica). Selecciona un tipo de agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, o `max`).
3. Crea una consulta de búsqueda utilizando la misma lógica que una [búsqueda de RUM Explorer][2], [búsqueda de APM Explorer][3], o [búsqueda de Log Explorer][5] para los sucesos de error de los problemas.
4. Opcionalmente, configurar la estrategia de agrupación de alertas. Para más información, consulta [Configuración del monitor][4].

### Definir tus condiciones de alerta

El monitor se activa cuando el número de errores es `above` o `above or equal to`.

- Establece un intervalo entre 5 minutos y 48 horas (como `5 minutes`, `15 minutes`. `1 hour`, o `custom`) a lo largo del cual se evalúa la métrica del monitor.
- Ajusta el umbral de alerta > `<NUMBER>`.
- Ajusta el umbral de advertencia > `<NUMBER>`.

[1]: /es/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[2]: /es/real_user_monitoring/explorer/search/
[3]: /es/tracing/trace_explorer/?tab=listview#filtering
[4]: /es/monitors/configuration/#alert-grouping/
[5]: /es/logs/explorer/search/
{{% /tab %}}
{{< /tabs >}}

#### Condiciones avanzadas de alerta

Para obtener más información sobre las opciones avanzadas de alerta, como la frecuencia de evaluación, consulta [Configurar monitores][4].

### Notificaciones

Para mostrar las etiquetas activadas en el título de la notificación, haz clic en **Include triggering tags in notification title** (Incluir etiquetas activadas en el título de notificación).

Para más información sobre la sección **Configurar notificaciones y automatizaciones**, consulta [Notificaciones][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/tracing/
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/
[6]: /es/logs/