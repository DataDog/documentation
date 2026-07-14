---
description: Aprende cómo monitorizar tu uso de RUM y recibe alertas sobre picos inesperados
  y umbrales próximos.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a consultar eventos RUM
- link: /monitors/
  tag: Documentación
  text: Más información sobre monitores
title: Para monitorizar tu uso de RUM
---

## Información general

El objetivo de esta guía es explicarte cómo monitorizar tu uso de RUM con:

- La métrica del uso estimado de RUM
- Los eventos RUM almacenados en tu cuenta

Esta guía te explica cómo realizar un seguimiento de la cantidad de sesiones RUM tarificadas bajo un SKU o una aplicación específicos, alertarte sobre picos de tráfico esperados y alertarte cuando te estás acercando a un umbral de presupuesto en tus sesiones.

## Métricas del uso de RUM

Esta métrica es gratuita y está disponible durante 15 meses.

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/estimated-usage-metric-details.png" alt="Panel lateral con información de métricas del uso estimado" style="width:90%" >}}

Por defecto, puedes utilizar la [métrica][1] de RUM `datadog.estimated_usage.rum.sessions` para realizar un seguimiento del número de sesiones de usuario con la siguiente información:

- ID de aplicación: Identifica la aplicación disponible en la página **Información general de la aplicación**.
- Servicio: Contexto en una aplicación RUM perteneciente a un equipo determinado.
- Fuente: Lenguaje de programación o marco de trabajo con que se ha creado. 
- SKU: Plan pago con que se tarifica la sesión.

### Seguimiento del recuento de sesiones de una aplicación

Para realizar un seguimiento del recuento de sesiones generadas por una aplicación RUM, ve a la [lista de dashboards][2] y selecciona un dashboard para realizar un seguimiento de la tendencia de uso de RUM.

1. Haz clic en **+ Añadir widgets** para abrir el panel lateral de widgets y aplicaciones.
2. Selecciona **Series temporales** en **Gráficos**.
3. En la sección **Grafica tus datos**, selecciona **Métricas** y `datadog.estimated_usage.rum.sessions` en los menús desplegables.
4. En la cláusula `from`, selecciona el ID de la aplicación que te interesa rastrear. El ID de la aplicación RUM está disponible en su página **Información general de la aplicación**. 
5. Configura tus preferencias de visualización e introduce un nombre para tu gráfico.
6. Haz clic en **Guardar**.

### Seguimiento del recuento de sesiones tarificadas bajo un SKU

Para realizar un seguimiento del recuento de sesiones tarificadas bajo un SKU RUM determinado, ve a la [lista de dashboards][2] y selecciona un dashboard para realizar un seguimiento de tu tendencia de uso de RUM.

1. Haz clic en **+ Añadir widgets** para abrir el panel lateral de widgets y aplicaciones.
2. Selecciona **Series temporales** en **Gráficos**.
3. En la sección **Grafica tus datos**, selecciona **Métricas** y `datadog.estimated_usage.rum.sessions` en los menús desplegables.
4. En la cláusula `sum`, selecciona la etiqueta (tag) `sku` en el menú desplegable. 
5. Configura tus preferencias de visualización e introduce un nombre para tu gráfico.
6. Haz clic en **Guardar**.

## Alerta ante picos inesperados

Puedes utilizar la métrica de RUM en [monitores de detección de anomalías][3].

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notification.png" alt="Ejemplo de mensaje de notificación en el monitor de anomalías" style="width:90%" >}}

Para crear un monitor de detección de anomalías para recibir alertas de picos inesperados en el recuento de sesiones:

1. Ve a la página **Información general de la aplicación** de la aplicación RUM y copia el ID de la aplicación.
2. [Crea un monitor de anomalías][4].
3. Selecciona la métrica `datadog.estimated_usage.rum.sessions` en el menú desplegable.
4. En la cláusula `from`, introduce el `application.id` para que se te notifique si tu aplicación RUM tiene un pico de tráfico o deja de enviar eventos.
5. Configura la condición de alerta para que coincida con tu caso de uso, por ejemplo: una ventana de evaluación o el número de veces fuera de un rango esperado.
6. Configura el mensaje de notificación con instrucciones prácticas.

   Este ejemplo de mensaje de notificación contiene enlaces contextuales:

   ```
   An unexpected amount of sessions has been captured for application.id {{application.id}}.

   1. [Check the session count in the RUM Explorer for this application](https://app.datadoghq.com/rum/explorer?query=%40type%3Asession%20%40application.id%{{application.id}}&viz=timeseries&from_ts=1649824870521&to_ts=1649828470521&live=true).
   2. [Investigate whether this session count is unexpected in a specific geography or device using the query engine](https://docs.datadoghq.com/real_user_monitoring/explorer/group/).
   ```

7. Configura los permisos y los parámetros de notificación para este monitor.
8. Haz clic en **Crear**.

## Monitorizar sesiones RUM con un umbral fijo

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notifications-warning-rate.png" alt="Ejemplo de mensaje de notificación con índices de advertencia en el monitor de anomalías" style="width:90%" >}}

Para crear un monitor de detección de anomalías para recibir alertas cuando el número de sesiones crece inesperadamente y se acerca a un umbral:

1. Ve a la vista del [Explorador RUM Datadog][5].
2. Crea una consulta de búsqueda que represente el volumen que se va a monitorizar. Para monitorizar todas las sesiones de usuario, deja la consulta en blanco.
3. Haz clic en **Exportar a monitor**.
4. Define el índice que quieres configurar como `warning` o `error`.
5. Define un mensaje de notificación concreto.

   Este ejemplo de mensaje de notificación contiene instrucciones prácticas:

   ```
   Shopist.io is sending too many user sessions. Go to the application's codebase and decrease the sample rate. Here is the (documentation)[https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans] for how to do so.

   {{#is_warning}}@slack-Shopist-alerts {{/is_warning}}

   {{#is_alert}}@pagerduty-shopist{{/is_alert}}
   ```

6. Configura los permisos y los parámetros de notificación para este monitor.
7. Haz clic en **Crear**.

Se te notifica la cantidad de sesiones capturadas en cualquier contexto (como el `application.id`, `geography`, `device` y más) para tu aplicación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/usage_metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/monitors/types/anomaly/
[4]: https://app.datadoghq.com/monitors#create/anomaly
[5]: https://app.datadoghq.com/rum/explorer?query=%40type%3Asession