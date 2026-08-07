---
aliases:
- /es/real_user_monitoring/generate_metrics
description: Crea métricas personalizadas a partir de tus eventos RUM.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre cómo capturar eventos RUM desde tu navegador y tus aplicaciones
    móviles
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre cómo crear consultas en el Explorador RUM
- link: /real_user_monitoring/explorer/search/#event-types
  tag: Documentación
  text: Más información sobre los tipos de eventos RUM
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentación
  text: Generar métricas a partir de logs ingeridos
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: Blog
  text: Generar métricas basadas en RUM para realizar un seguimiento de las tendencias
    históricas de la experiencia del cliente
title: Generar métricas personalizadas a partir de eventos RUM
---

## Información general

Real User Monitoring (RUM) te permite capturar los eventos que se producen en tu navegador y aplicaciones móviles utilizando los SDK RUM Datadog y recopilar datos de eventos con una determinada [frecuencia de muestreo][1]. Datadog conserva los datos de estos eventos en el [Explorador RUM][2], donde puedes crear consultas de búsqueda y visualizaciones.

Las métricas personalizadas basadas en RUM son una opción rentable para resumir los datos de tu conjunto de eventos RUM. Puedes visualizar las tendencias y anomalías de tus datos RUM a un nivel granular de hasta 15 meses.

**Nota de facturación:** Las métricas creadas a partir de eventos RUM se facturan como [métricas personalizadas][3].

## Crear una métrica personalizada basada en RUM

Para crear una métrica personalizada a partir de los datos de eventos RUM, ve a [**Experiencia digital** > **Gestión de aplicaciones** > **Generar métricas**][4] y haz clic en **+ Nueva métrica**.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="Hacer clic en + Nueva métrica para crear una métrica personalizada basada en RUM" width="80%" >}}

Para crear una métrica personalizada a partir de una consulta de búsqueda en el [Explorador RUM][5], haz clic en el botón **Exportar** y selecciona **Generar nuevo métrica** en el menú desplegable.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Generar una métrica personalizada basada en RUM" width="80%" >}}

1. Pon un nombre a tu [métrica personalizada][3] que no empiece por `datadog.estimated_usage`, como `rum.sessions.count_by_geography`. Para obtener más información, consulta la [convención de nomenclatura][6].
2. Selecciona un tipo de evento para el que quieras crear una métrica personalizada, como por ejemplo `Sessions`. Tus opciones incluyen **Sesiones**, **Vistas**, **Acciones**, **Errores**, **Recursos** y **Tareas prolongadas**. Para obtener más información, consulta [Buscar eventos RUM][7].
3. Crea una consulta de búsqueda que filtre tus eventos RUM utilizando la [sintaxis de búsqueda][8] de Explorador RUM, como `@session.type:user`.
4. Elige un campo para realizar su seguimiento en el menú desplegable situado junto a **Recuento**.

   - Selecciona `*` para generar un recuento de todos los eventos RUM que coinciden con tu consulta de búsqueda.
   - También puedes introducir un evento de atributo como `@action.target` para agregar un valor numérico y crear la métrica `count` o `distribution` correspondiente.

   Si la faceta del atributo RUM es una medida, el valor de la métrica es el valor del atributo RUM.

5. Selecciona una ruta para la agrupación en el menú desplegable situado junto a **agrupar por**. El nombre de etiqueta (tag) de la métrica es el atributo original o el nombre de etiqueta sin `@`. Por defecto, las métricas personalizadas generadas a partir de eventos RUM no contienen etiquetas, a menos que se añadan explícitamente. Puedes utilizar un atributo o dimensión de etiqueta que exista en tus eventos RUM, como `@error.source` o `env`, para crear etiquetas de métricas. 

   <div class="alert alert-danger">RUM-based custom metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs.
   </div>

6. Para las métricas personalizadas creadas en sesiones y vistas, selecciona **La sesión/vista activa comienza a coincidir con la consulta** o **La sesión/vista se vuelve inactiva o se completa** para definir los criterios de coincidencia para sesiones y vistas. Para obtener más información, consulta [Añadir una métrica basada en RUM en sesiones y vistas](#add-a-rum-based-metric-on-sessions-and-views).

7. Añade agregaciones de percentiles para las métricas de distribución. Puedes optar por la funcionalidad de consulta avanzada y utilizar percentiles de precisión global (como P50, P75, P90, P95 y P99).

   <div class="alert alert-danger">Al habilitar la función de consulta avanzada con percentiles se generan más <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se <a href="/account_management/billing/custom_metrics/">facturan en consecuencia</a>.

8. Haz clic en **Crear métrica**.

Tus métricas personalizadas basadas en RUM aparecen en la lista debajo de **Métricas personalizadas RUM**. Puede haber un pequeño retraso hasta que tu métrica esté disponible en [dashboards][9] y [monitores][10]. 

No se crean puntos de datos para métricas con datos históricos. Los puntos de datos para tus métricas personalizadas basadas en RUM se generan en un intervalo de diez segundos. Los datos de las métricas se conservan durante 15 meses.

### Añadir una métrica basada en RUM en sesiones y vistas

Las sesiones y las vistas se consideran activas cuando hay una aplicación o una actividad del usuario activas en una aplicación RUM. Por ejemplo, cuando un usuario abre nuevas páginas, estas vistas de páginas se recopilan en la sesión del usuario. Cuando un usuario interactúa con los botones de una página, estas acciones se recopilan en las vistas de páginas.

Supongamos que tienes una métrica personalizada basada en RUM que contabiliza el número de sesiones de usuario que contienen más de cinco errores y un ID de sesión `123` que alcanza cinco errores a las 11 AM y se cierra a las 12 PM.

   - Al contabilizar la sesión o la vista en cuanto coincide con la consulta, se incrementa en uno el valor de recuento de la métrica en la marca horaria de las 11 AM.
   - Al contabilizar la sesión o vista inactiva, se incrementa en uno el valor de recuento de la métrica en la marca horaria de las 12 PM.

## Gestionar métricas personalizadas basadas en RUM

Puedes generar una métrica de recuento de eventos RUM que coinciden con una consulta o una [métrica de distribución][11] de un valor numérico contenido en eventos RUM, como la duración de la solicitud.

### Actualizar una métrica personalizada basada en RUM

Para actualizar una métrica, pasa el cursor sobre la métrica y haz clic en el icono **Editar** en la esquina derecha.

- Filtrar consulta: Cambia el conjunto de eventos RUM coincidentes que se agregan a métricas.
- Grupos de agregación: Actualiza las etiquetas para gestionar la cardinalidad de las métricas generadas.
- Selección de percentiles: Haz clic en el conmutador **Calcular percentiles** para eliminar o generar métricas de percentiles.

Dado que no se puede cambiar el nombre de una métrica existente, Datadog recomienda crear otra métrica.

### Eliminar una métrica personalizada basada en RUM

Para detener el cálculo de los puntos de datos de tu métrica personalizada y tu facturación, pasa el cursor sobre una métrica y haz clic en el icono **Eliminar** en la esquina derecha. 

## Uso

Puedes utilizar métricas personalizadas basadas en RUM para las siguientes acciones:

- Visualizar tendencias durante un periodo de tiempo determinado en un [dashboard][12]
- Activar una alerta cuando una métrica se comporta de forma diferente a como lo ha hecho en el pasado en un [monitor de anomalías][13]
- Activar una alerta cuando se prevé que una métrica superará un umbral en el futuro en un [monitor de predicción][14]
- Crea [SLOs basados en métricas][15] para realizar un seguimiento de los objetivos de rendimiento centrados en el usuario, para tus equipos y tus organizaciones. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/sampling-browser-plans
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /es/real_user_monitoring/explorer/
[6]: /es/metrics/custom_metrics/#naming-custom-metrics
[7]: /es/real_user_monitoring/explorer/search/#event-types
[8]: /es/real_user_monitoring/explorer/search_syntax/
[9]: /es/dashboards/
[10]: /es/monitors/
[11]: /es/metrics/distributions/
[12]: /es/dashboards/querying/#configuring-a-graph
[13]: /es/monitors/types/anomaly/
[14]: /es/monitors/types/forecasts/
[15]: /es/service_management/service_level_objectives/metric/