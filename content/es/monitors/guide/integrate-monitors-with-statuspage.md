---
description: Aprende a integrar los monitores de Datadog con Atlassian Statuspage.
further_reading:
- link: /integrations/statuspage
  tag: Documentación
  text: Obtener más información sobre la integración con Statuspage
- link: /synthetics/guide/synthetic-test-monitors/
  tag: Documentación
  text: Más información sobre los monitores de test sintéticos
kind: guía
title: Integración de monitores con Statuspage
---

## Información general

[Atlassian Statuspage][1] es una herramienta de gestión de estados e incidencias que te proporciona una visibilidad del tiempo de actividad de tus aplicaciones y servicios. Una página de estado puede mostrar métricas personalizadas y eventos de Datadog, y puedes actualizar el estado de tus sistemas gracias a las notificaciones de monitor de Datadog.

## Añadir alertas de Statuspage como eventos de Datadog

Puedes configurar la [integración con Statuspage][2] para realizar un seguimiento de las alertas de Statuspage en el [Explorador de eventos][3].

1. Ve a [Integraciones][4] y busca `statuspage` en la lista de integraciones.
2. Selecciona el mosaico Integración StatusPage y haz clic en **Add New** (Añadir nuevo).
3. Añade la URL de estado y las etiquetas (tags) personalizadas que quieres monitorizar, por ejemplo: `https://status.datadoghq.com` o `https://datadogintegrations.statuspage.io/` con las etiquetas `datadog`, `test` y `test1`. Debes incluir al menos una etiqueta personalizada por página.
3. Haz clic en el icono **Save** (Guardar). 

Después de cinco minutos, en el [Explorador de eventos][5] deberías ver aparecer alertas de monitor de Statuspage. Establece un [intervalo de tiempo][6] en la esquina superior derecha y selecciona **Statuspage** en lista de fuentes bajo **Core**.

{{< img src="monitors/guide/statuspage_integration_configuration.png" alt="Configurar la integración con Statuspage en Datadog" style="width:90%;" >}}

Haz clic en una alerta para ver el panel lateral donde se encuentran el mensaje, las etiquetas y los atributos del evento.

{{< img src="monitors/guide/statuspage_side_panel.png" alt="Panel lateral de un evento con el mensaje, las etiquetas y los atributos del evento" style="width:90%;" >}}

## Añadir alertas de Statuspage en monitores Datadog

### Generar una dirección de correo electrónico de Statuspage

Consulta la [documentación de Statuspage][7] para generar una dirección de correo electrónico específica para cada componente.

### Crear un monitor de métricas

Para crear un [monitor de métricas][8] que se active con las alertas de Statuspage:

1. Ve a [**Monitors** > **New Monitor** (Monitores > Nuevo monitor)][9] y haz clic en **Metric** (Métrica).
2. Consulta la [documentación del monitor de métricas][8] para seleccionar un método de detección, definir sus métricas, establecer condiciones de alerta y configurar opciones de monitorización avanzadas. 
3. Personaliza el nombre del monitor para que devuelva `UP` o `DOWN` en función del estado del test. Por ejemplo, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. En la sección **Configurar notificaciones y automatizaciones**, añade la dirección de correo electrónico generada como `@custom-statuspage-email@notifications.statuspage.io` en el mensaje. Esta acción rellena automáticamente el campo `Notify your services and your team members` que se encuentra arriba de **Renotification** (Renotificación).
5. Rellena la sección de notificaciones de monitor y añade un resumen en el nombre del monitor, como `Shopist Checkout Functionality`.
6. Establece las condiciones de renotificación del monitor y añade etiquetas, como `service:status-page`.
7. Selecciona un equipo y asigna una prioridad al monitor.
8. Define los permisos de edición de monitor y las condiciones de notificación.
9. Una vez que hayas configurado tu monitor, haz clic en **Create** (Crear). 

{{< img src="monitors/guide/statuspage_alerts_metric_monitor.png" alt="Creación de un monitor de métricas que contiene alertas de Statuspage" style="width:90%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: /es/integrations/statuspage
[3]: /es/service_management/events/explorer/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/event/explorer
[6]: /es/dashboards/guide/custom_time_frames/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /es/monitors/types/metric/
[9]: https://app.datadoghq.com/monitors/create/metric