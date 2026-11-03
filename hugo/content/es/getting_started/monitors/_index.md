---
aliases:
- /es/getting_started/application/monitors
description: Cree monitores de métricas con alertas de umbral y notificaciones personalizadas
  para hacer un seguimiento proactivo del estado del sistema y de los problemas de
  rendimiento.
further_reading:
- link: /monitors/types/metric/
  tag: Documentación
  text: Monitores de métricas
- link: /monitors/notify/
  tag: Documentación
  text: Notifications de monitores
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva sobre la creación de monitores eficaces
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: blog
  text: Cómo auditar y limpiar monitores de manera eficaz
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: blog
  text: 'Monitoreo 101: Alerting sobre lo que importa'
title: Primeros pasos con monitores
---
## Descripción general {#overview}

Con las alertas de Datadog, tiene la capacidad de crear monitores que verifican activamente métricas, disponibilidad de integraciones, puntos finales de red y más. Utilice los monitores para llamar la atención sobre los sistemas que requieren observación, inspección e intervención.

Esta página es una introducción a los monitores y describe las instrucciones para configurar un monitor de métricas. Un [monitor de métricas][1] proporciona alertas y notificaciones si una métrica específica está por encima o por debajo de un cierto umbral. Por ejemplo, un monitor de métricas puede alertarle cuando el espacio en disco sea bajo.

Esta guía cubre:
- Creación y configuración de monitores
- Configuración de alertas de monitor
- Personalización de mensajes de notificación
- Permisos de monitor

## Requisitos previos {#prerequisites}

Antes de comenzar, necesita una cuenta de Datadog vinculada a un servidor con el Datadog Agent instalado. Para obtener más información sobre el Agent, consulte la [guía de primeros pasos con el Agent][2], o navegue a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Agent{{< /ui >}}][3] para visualizar las instrucciones de instalación.

Para verificar que el Datadog Agent se esté ejecutando, compruebe que su [Lista de infraestructura][4] en Datadog esté poblada.

## Monitoreo instantáneo para nuevas organizaciones {#instant-monitoring-for-new-organizations}

<div class="alert alert-info">Los monitores automáticos están disponibles para <strong>nuevas</strong> organizaciones y se activan después de instalar el Datadog Agent.</div>

Cuando instala el Datadog Agent, Datadog detecta automáticamente su pila y crea un conjunto personalizado de **monitores de referencia**. Esto le brinda cobertura instantánea sin necesidad de configuración.

Los monitores automáticos pueden incluir:
- Monitores a nivel de host (utilización de CPU y memoria)
- Monitores de Kubernetes (reinicio de pods, estado del nodo)
- Monitores de APM (tasas de error o latencia por servicio)

Puede visualizar estos monitores inmediatamente en la página [{{< ui >}}Monitors{{< /ui >}}][17] de Datadog.
Desde allí, puede editarlos, clonarlos o deshabilitarlos como cualquier otro monitor.

## Crear un monitor {#create-a-monitor}

Para crear un monitor, navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][5] y seleccione {{< ui >}}Metric{{< /ui >}}.

## Configure {#configure}

Los componentes principales de la configuración de un monitor son:

- **Elija el método de detección**: ¿Cómo mide aquello sobre lo que se generará una alerta? ¿Le preocupa que el valor de una métrica supere un umbral, que un cambio en un valor supere un umbral, un valor anómalo o alguna otra cosa?
- **Defina la métrica**: ¿Qué valor está monitoreando para enviar una alerta? ¿El espacio en disco de su sistema? ¿La cantidad de errores encontrados en los inicios de sesión?
- **Establezca las condiciones de alerta**: ¿Cuándo es necesario despertar a un ingeniero?
- **Configure notificaciones y automatizaciones**: ¿Qué información debe incluir la alerta?
- **Defina permisos y notificaciones de auditoría**: ¿Quién tiene acceso a estas alertas y a quién se debe notificar si se modifica la alerta?

### Elija el método de detección {#choose-the-detection-method}

Cuando crea un monitor de métricas, {{< ui >}}Threshold Alert{{< /ui >}} se selecciona automáticamente como el método de detección. Una alerta de umbral compara los valores de las métricas con los umbrales definidos por el usuario. El objetivo de este monitor es alertar sobre un umbral estático, por lo que no es necesario realizar cambios.

### Defina la métrica {#define-the-metric}

Para recibir una alerta sobre poco espacio en disco, utilice la métrica `system.disk.in_use` de la [integración de disco][6] y calcule el promedio de la métrica durante `host` y `device`:

{{< img src="getting_started/monitors/monitor_query.png" alt="Defina la métrica para system.disk.in_use avg por servidor y dispositivo" style="width:100%" >}}

### Establecer condiciones de alerta {#set-alert-conditions}

De acuerdo con la [documentación de integración de disco][6], `system.disk.in_use` es *la cantidad de espacio en disco en uso como una fracción del total*. Por lo tanto, cuando esta métrica informa un valor de `0.7`, el dispositivo está lleno al 70%.

Para recibir una alerta sobre poco espacio en disco, el monitor debe activarse cuando la métrica esté `above` del umbral. Los valores de umbral se basan en su preferencia. Para esta métrica, los valores entre `0` y `1` son adecuados:

Establezca los siguientes umbrales:

```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

Para este ejemplo, deje las otras configuraciones en esta sección con los valores predeterminados. Para obtener más detalles, consulte la documentación de [Metric Monitors][7].

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Establezca los umbrales de alerta y advertencia para que el monitor active alertas" style="width:80%" >}}

### Notifications y automatizaciones {#notifications-and-automations}

Cuando este monitor se activa para alertar, se envía una notificación. En esta notificación, puede incluir valores condicionales, instrucciones para la resolución o un resumen de lo que es la alerta. Como mínimo, una notificación debe tener un título y un mensaje.

#### Título de la notificación {#notification-title}

El título debe ser único para cada monitor. Dado que este es un monitor de alertas múltiples, los nombres están disponibles para cada elemento del grupo (`host` y `device`) con variables de plantilla de mensaje:

```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Mensaje de notificación {#notification-message}

Use el mensaje para decirle a su equipo cómo resolver el problema, por ejemplo:

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

Para agregar mensajes condicionales basados en umbrales de alerta frente a advertencia, consulte las [variables de notificaciones][8] disponibles que puede incluir en su mensaje.

#### Notifique a sus servicios y a los miembros de su equipo {#notify-your-services-and-your-team-members}

Envíe notificaciones a su equipo a través de correo electrónico, Slack, PagerDuty y más. Puede buscar miembros del equipo y cuentas conectadas con el cuadro desplegable.

{{< img src="getting_started/monitors/monitor_notification.png" alt="Agregue un mensaje de monitor y automatizaciones a su notificación de alerta" style="width:100%;" >}}

Para agregar un flujo de trabajo de [Workflow Automation][14] o un elemento de trabajo de [Work Management][15] a la notificación de alerta, haga clic en {{< ui >}}Add Workflow{{< /ui >}} o {{< ui >}}Add Work Item{{< /ui >}}. También puede etiquetar a los miembros del [Datadog Team][16] usando el identificador `@team`.

Deje las otras secciones tal como están. Para obtener más información sobre lo que hace cada opción de configuración, consulte la documentación de [Configuración del monitor][9].

### Permisos{#permissions}

Haga clic en {{< ui >}}Edit Access{{< /ui >}} para restringir la edición de su monitor a su creador, equipos, usuarios, grupos o a roles específicos en su organización. Opcionalmente, seleccione {{< ui >}}Notify{{< /ui >}} para recibir una alerta cuando se modifique el monitor.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Establezca permisos de acceso para un monitor y opciones para notificaciones de auditoría" style="width:80%;" >}}

Para obtener más información, consulte [Granular Access Control][10].

## Visualice monitores y clasifique alertas en dispositivos móviles {#view-monitors-and-triage-alerts-on-mobile}

Puede ver las Saved Views de monitores desde la pantalla de inicio de su dispositivo móvil o visualizar y silenciar monitores descargando la [aplicación móvil de Datadog][11], disponible en [Apple App Store][12] y [Google Play Store][13]. Esto ayuda con la clasificación cuando no se encuentra frente a su laptop o computadora de escritorio.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidentes en la aplicación móvil">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: /es/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors/create/metric
[6]: /es/integrations/disk/
[7]: /es/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /es/monitors/notify/variables/
[9]: /es/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /es/account_management/rbac/granular_access/
[11]: /es/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /es/actions/workflows/
[15]: /es/incident_response/work_management/
[16]: /es/account_management/teams/
[17]: https://app.datadoghq.com/monitors/manage