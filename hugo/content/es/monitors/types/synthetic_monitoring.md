---
aliases:
- /es/synthetics/guide/synthetic-test-monitors/
description: Cree y administre monitores para pruebas Synthetic para recibir notificaciones
  cuando las pruebas web y de API fallen o tengan un rendimiento deficiente.
further_reading:
- link: /monitors/manage/
  tag: Documentación
  text: Aprenda a administrar monitores
- link: /synthetics/notifications/
  tag: Documentación
  text: Obtenga más información sobre Synthetic Monitoring Notifications.
title: Monitores de Synthetic
---
## Descripción general {#overview}

Cuando usted crea una prueba Synthetic, Datadog crea automáticamente un monitor asociado. Usted puede configurar notificaciones cuando el monitor de prueba Synthetic emita una alerta.

## Crear un monitor de prueba Synthetic {#create-a-synthetic-test-monitor}

<div class="alert alert-info">Usted solo puede crear <strong>monitores de prueba Synthetic</strong> dentro de la sección <a href="https://app.datadoghq.com/synthetics/tests">Synthetic Monitoring</a> de la aplicación. La página general de <a href="https://app.datadoghq.com/monitors">Monitors</a> se utiliza para crear otros tipos de monitores, como aquellos basados en métricas, registros o procesos.</div>

Cree un monitor en la sección {{< ui >}}Monitor{{< /ui >}} de una prueba Synthetic nueva o existente para enviar notificaciones cuando una prueba Synthetic Monitoring falle. Los monitores están asociados con la prueba Synthetic que usted crea y se vinculan a las condiciones de alerta establecidas en la configuración de su prueba Synthetic. Para usar variables de atributos y etiquetas de monitor, cree un [monitor de métricas][1].

Los mensajes de monitor en Synthetic Monitoring consisten en:

- {{< ui >}}Title{{< /ui >}}: El nombre del monitor.
- {{< ui >}}Custom message{{< /ui >}}: Texto opcional escrito al crear el monitor.
- {{< ui >}}Auto-appended summary{{< /ui >}}: Incluye ubicaciones con fallas, mensajes de error y enlaces a la prueba.
- {{< ui >}}Footer{{< /ui >}}: Incluye detalles de la última ejecución de prueba fallida. </br><br>

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test_2.png" alt="Creación de un monitor en su prueba Synthetic" style="width:90%;">}}

## Visualice y administre monitores Synthetic {#view-and-manage-synthetic-monitors}

- Personalice el nombre del monitor para buscarlo en la página [{{< ui >}}Manage Monitors{{< /ui >}}][2]. Para encontrar un monitor de prueba Synthetic, filtre por `type:synthetics` en la barra de búsqueda. Puede usar [variables condicionales][3] de monitor para caracterizar el mensaje de notificación según el estado de la prueba. 

- El monitor de prueba Synthetic se integra con canales de notificación como correo electrónico, Slack, Pagerduty y Microsoft Teams. Para obtener más información, consulte [Notifications][4].

- Si tiene varias capas de notificaciones (por ejemplo, notificar a más equipos cuanto más tiempo esté alertando una prueba Synthetic), Datadog recomienda habilitar [renotification][5] en sus monitores Synthetic.

## Etiquetas agregadas automáticamente {#automatically-added-tags}

Además de las etiquetas personalizadas que agregue, Datadog agrega las siguientes etiquetas a un monitor de prueba Synthetic según la configuración de la prueba. Utilice estas etiquetas para buscar y filtrar en la página [{{< ui >}}Manage Monitors{{< /ui >}}][2] o en la lista de pruebas Synthetic Monitoring.

| Clave de etiqueta             | Valores disponibles                                                                 | Lo que captura la etiqueta                                                                                                    |
|----------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `check_type`         | `api`, `browser`, `api-ssl`, `api-dns`, `api-tcp`, `api-icmp`, `api-grpc`, `api-udp`, `api-websocket`, `api-multi`, `mobile` | El tipo de prueba y, si corresponde, su subtipo. El `http` subtipo se omite en las pruebas `api` por brevedad.        |
| `check_status`       | `live`, `paused`                                                                   | Si la prueba está activa o pausada.                                                                              |
| `probe_dc`           | `aws:us-east-1`, `aws:eu-west-1` y otras ubicaciones administradas o privadas          | Las ubicaciones desde las que se ejecuta la prueba. Las pruebas de múltiples ubicaciones tienen una etiqueta `probe_dc` para cada ubicación asignada.         |
| `ci_execution_rule`  | `blocking`, `non_blocking`                                                         | La regla de ejecución de CI/CD de la prueba. La etiqueta se agrega cuando la prueba se utiliza como puerta de calidad en un pipeline de CI/CD.              |

Estas etiquetas se actualizan automáticamente cuando edita la prueba, por lo que las búsquedas siguen siendo precisas a medida que las pruebas cambian de ubicación, se pausan o cambian su configuración de CI/CD. Busque etiquetas utilizando la faceta `tag` y citando el par `key:value` completo. Por ejemplo:

- `type:synthetics tag:"check_status:live"` encuentra todos los monitores de prueba Synthetic activos.
- `type:synthetics tag:("probe_dc:aws:us-east-1" AND "probe_dc:aws:ap-northeast-1")` encuentra pruebas que se ejecutan desde ambas ubicaciones.
- `type:synthetics tag:"ci_execution_rule:blocking"` encuentra pruebas configuradas para bloquear un pipeline de CI/CD si fallan.

### Personalice las notificaciones del monitor {#tailor-monitor-notifications}

Dependiendo de su estrategia de gestión de incidentes, es posible que desee involucrar a varios equipos cuando una prueba Synthetic alerte. Para notificar al Equipo B solo en alertas posteriores a la primera alerta, rodee la notificación al Equipo B con `{{#is_renotify}}` and `{{/is_renotify}}`. Utilice [variables condicionales][3] para caracterizar aún más el mensaje de notificación según los atributos del monitor. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="Seleccione la cantidad de tiempo para que el monitor de alertas vuelva a notificar" style="width:90%;">}}

Para habilitar la renotificación, active {{< ui >}}Enable renotification{{< /ui >}} y seleccione un intervalo de tiempo en el menú desplegable.

Para obtener más información sobre cómo las notificaciones de Synthetic Monitoring evalúan los resultados de las pruebas y activan alertas, consulte [Comprender las alertas de Synthetic Monitor][7].

## Notificaciones mejoradas {#enhanced-notifications}

Utilice y enriquezca los monitores Synthetic para enviar notificaciones más detalladas cuando una prueba Synthetic Monitoring esté fallando. Las siguientes funciones están disponibles:

Mensajes de monitor prellenados
: Los mensajes de monitor prellenados proporcionan un punto de partida estructurado para alertas de prueba Synthetic. Cada mensaje incluye un título, un resumen y un pie de página estandarizados que contienen metadatos de la prueba, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: Las variables de plantilla le permiten insertar datos específicos de la prueba en las notificaciones del monitor de forma dinámica. Estas variables se obtienen del objeto `synthetics.attributes`.

Uso avanzado
: El uso avanzado incluye técnicas para obtener información más profunda de las pruebas o estructurar mensajes complejos mediante el uso de plantillas de handlebars.

Alerta condicional
: La alerta condicional le permite cambiar el contenido de una notificación de monitor según resultados de prueba o condiciones de falla específicos.

Para obtener más información, consulte [Synthetic Monitoring Notifications][6].

## Inicie una Bits Investigation {#launch-a-bits-investigation}

Cuando un monitor de prueba Synthetic Browser o API entre en estado de alerta, puede iniciar una [Bits Investigation][8] para identificar la causa raíz. Bits Investigation analiza los resultados de las pruebas, trazas, registros y métricas para revelar una causa raíz y marcar si el fallo es una regresión o una configuración incorrecta. También puede activar {{< ui >}}Auto-Investigate{{< /ui >}} en un monitor de prueba Synthetic para iniciar investigaciones automáticamente cuando este alerte.

## Mejores prácticas {#best-practices}

- Siempre incluya un `@notification` predeterminado (fuera de cualquier condición) para evitar que se pierdan mensajes.
- Evite la lógica compleja para herramientas de paginación como PagerDuty, que requieren un enrutamiento consistente para la recuperación.
- Utilice lógica condicional para anular el texto de la alerta, cambiar la prioridad o dividir las notificaciones entre equipos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: /es/monitors/manage/
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /es/monitors/notify/#notification-recipients
[5]: /es/monitors/notify/#renotify
[6]: /es/synthetics/notifications
[7]: /es/synthetics/guide/how-synthetics-monitors-trigger-alerts/
[8]: /es/bits_ai/bits_investigation/investigate_issues/