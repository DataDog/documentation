---
aliases:
- /es/getting_started/application/monitors
description: Crea monitores de métricas con alertas de umbral y notificaciones personalizadas
  para realizar un rastreo proactivo del estado del sistema y los problemas de rendimiento.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Inicio a la monitorización: alertar sobre lo importante'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad
- link: /monitors/types/metric/
  tag: Documentación
  text: Monitores de métricas
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitor
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva sobre la creación de monitores eficaces
title: Empezando con los monitores
---

## Información general

Con la función de alertas de Datadog, tienes la capacidad de crear monitores que comprueben forma activa las métricas, la disponibilidad de la integración y los endpoints de red, entre otros. Utiliza monitores para alertar sobre los sistemas que requieren observación, inspección e intervención.

Esta page (página) es una introducción a los monitores y describe las instrucciones para configurar un monitor (noun) de métrica. Un [monitor (noun) de métrica][1] proporciona alertas y notificaciones si una métrica específica está por encima o por debajo de un determinado umbral. Por ejemplo, un monitor (noun) de métrica puede alertarte cuando el espacio en disco es bajo.

Esta guía aborda lo siguiente:
- Creación y configuración de monitores
- Configuración de alertas de monitores
- Personalización de los mensajes de notificación 
- Permisos de monitores

## Requisitos previos

Antes de comenzar, necesitas una cuenta de Datadog vinculada a un host con el Datadog Agent instalado. Para obtener más información sobre el Agent, consulta la [guía Empezando con el Agent][2], o accede a **[Integration > Agent][3]**  (Integraciones > Agent) para ver las instrucciones de instalación.

Para verificar que el Datadog Agent se está ejecutando, comprueba que la [lista de infraestructuras][4] en Datadog contiene información.

## Monitorización instantánea para nuevas organizaciones

<div class="alert alert-info">Los monitores automáticos están disponibles para las <strong>nuevas</strong> organizaciones y se activan después de que se instala el Datadog Agent.</div>

Cuando instalas el Datadog Agent, Datadog detecta automáticamente tu stack tecnológico y crea un conjunto personalizado de **monitores de línea de base**. Esto te proporciona una cobertura instantánea sin necesidad de instalación.

Los monitores automáticos pueden incluir:
- Monitores a nivel de host (utilización de CPU y memoria)
- Monitores de Kubernetes (reinicios de pods, estado de los nodos)
- Monitores de APM (tasas de error o latencia por servicio)

Puedes ver estos monitores inmediatamente en la page (página) [**Monitors**][17] de Datadog.
Desde allí, puedes editarlos, clonarlos o desactivarlos como cualquier otro monitor (noun).

## Crear un monitor

Para crear un monitor, ve a **[Monitors > New Monitor][5]** (Monitores > Nuevo monitor) y selecciona **Metric** (Métrica).

## Configurar

Los principales ajustes de la configuración de un monitor son:

- **Choose the detection method** (Elegir el método de detección): ¿Cómo vas a medir lo que se va a alertar? ¿Te preocupa que un valor de métrica supere un umbral, que un cambio en un valor supere un umbral, un valor anómalo u otra cosa?
- **Definir la métrica**: ¿Qué valor vas a monitorizar para enviar alertas? ¿El espacio en disco de tu sistema? ¿El número de errores en los inicios de sesión?
- **Configurar las condiciones de alerta**: ¿Cuándo hay que despertar a un ingeniero?
- **Configure notifications and automations** (Configurar notificaciones y automatizaciones): ¿Qué información debe figurar en la alerta?
- **Define permissions and audit notifications** (Definir los permisos y notificaciones de auditoría): ¿Quién tiene acceso a estas alertas y quién debe ser notificado si se modifica la alerta?

### Elegir el método de detección

Al crear un monitor de métricas, se selecciona automáticamente **Threshold Alert** (Alerta de umbral) como método de detección. Una alerta de umbral compara los valores de la métrica con los umbrales definidos por el usuario. El objetivo de este monitor es alertar sobre un umbral estático, por lo que no es necesario realizar ningún cambio.

### Definir la métrica

Para obtener una alerta de poco espacio en disco, utiliza la métrica `system.disk.in_use` de la [integración del disco][6] y promedia la métrica sobre el `host` y `device`:

{{< img src="getting_started/monitors/monitor_query.png" alt="Definir la métrica para system.disk.in_use avg por host y dispositivo" style="width:100%" >}}

### Definir condiciones de alerta

Según la [documentación de integración del disco][6], `system.disk.in_use` es *la cantidad de espacio de disco en uso respecto al total*. Así, cuando esta métrica tiene un valor de `0.7`, significa que un 70 % del espacio del disco está lleno.

Para alertar sobre poco espacio en disco, el monitor debe activarse cuando la métrica esté por encima (`above`) el umbral. Los valores del umbral se basan en tus preferencias. Para esta métrica, los valores entre `0` y `1` son apropiados:

Establece los siguientes umbrales:
```
Umbral de alerta: > 0.9
Umbral de alerta: > 0.8
```

En este ejemplo, deja los demás ajustes de esta sección en los valores predeterminados. Consulta más detalles en la documentación [Monitores de métricas][7].

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Establecer los umbrales de alerta y advertencia para que el monitor active alertas" style="width:80%" >}}

### Notificaciones y automatizaciones

Cuando se activa este monitor para alertar, se envía un mensaje de notificación. En este mensaje se pueden incluir valores condicionales, instrucciones para la resolución o un resumen de lo que es la alerta. Como mínimo, una notificación debe tener un título y un mensaje.

#### Título

El título debe ser único para cada monitor. Dado que se trata de un monitor con varias alertas, los nombres están disponibles para cada elemento del grupo (`host` y `device`) con las variables de plantilla de mensaje:
```text
Hay poco espacio en disco en {{device.name}} / {{host.name}}
```

#### Mensaje

Utiliza el mensaje para indicar a tu equipo cómo resolver el problema, por ejemplo:
```text
Pasos para liberar espacio en disco:
1. Eliminar los paquetes que no utilices
2. Borrar la caché de APT
3. Desinstalar aplicaciones innecesarias
4. Eliminar archivos duplicados
```

Para añadir mensajes condicionales basados en umbrales de alerta o advertencia, consulta las [variables de notificación][8] disponibles que puedes incluir en tu mensaje.

#### Notificar a servicios y a personas de tu equipo

Envía notificaciones a tu equipo a través de correo electrónico, Slack, PagerDuty, etc. Puedes buscar los miembros del equipo y las cuentas conectadas con el cuadro desplegable.

{{< img src="getting_started/monitors/monitor_notification.png" alt="Añadir un mensaje de monitor y automatizaciones a tu notificación de alerta" style="width:100%;" >}}

Para añadir un flujo de trabajo de [automatización de flujos de trabajo][14] o un caso de [gestión de casos][15] a la notificación de alerta, haz clic en **Add Workflow** (Añadir flujo de trabajo) o **Add Case** (Añadir caso). También puedes etiquetar a miembros del [equipo de Datadog][16] utilizando el identificador `@team`.

Deja las demás secciones como están. Para obtener más información sobre lo que hace cada ajuste, consulta la documentación de  [Configuración de monitores][9].

### Permisos

Haz clic en **Edit Access** (Editar acceso de edición) para restringir la edición de tu monitor a su creador, equipos, usuarios, grupos o a funciones específicas de tu organización. Si lo deseas, selecciona `Notify` para recibir una alerta cuando se modifique el monitor.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Establecer permisos de acceso para un monitor y opciones para notificaciones de auditoría" style="width:80%;" >}}

Para más información, consulta [Control de acceso detallado][10].

## Ver monitores y alertas de triaje en el móvil

Puedes consultar las vistas guardadas de monitores desde la pantalla de inicio de tu móvil o ver y silenciar monitores al descargar la [aplicación móvil de Datadog][11], disponible en el [App Store de Apple][12] y [Google Play Store][13]. Esto te ayudará a clasificar los mensajes cuando no tengas a mano tu ordenador portátil o sobremesa.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidencias en la aplicación móvil">}}

## Referencias adicionales

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
[14]: /es/service_management/workflows/
[15]: /es/service_management/case_management/
[16]: /es/account_management/teams/
[17]: https://app.datadoghq.com/monitors/manage