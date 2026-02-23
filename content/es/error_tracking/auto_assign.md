---
description: Más información sobre la Auto Assign en Error Tracking.
further_reading:
- link: /error_tracking/suspect_commits/
  tag: Documentación
  text: Commits sospechosos
- link: /error_tracking/issue_team_ownership/
  tag: Documentación
  text: Propiedad del equipo de incidencias
title: Auto Assign
---

## Información general

Auto Assign automatiza el triaje asignando las incidencias al autor de su [confirmación sospechosa][1].

Esta función agiliza la resolución de incidencias asignándolas automáticamente a los desarrolladores más familiarizados con el código en cuestión, al tiempo que reduce el trabajo de triaje manual. Recibirás una notificación inmediata cuando surjan incidencias en tu código.

## Configuración

Una vez configuradas y activadas, las incidencias se asignan automáticamente a los desarrolladores en función del análisis de confirmaciones sospechosas.

### Configura la integración del código fuente

1. Asegúrate de que la [integración del código fuente][2] está activada y configurada.
2. Instala [la integración de GitHub][3].
3. Asegúrate de que se conceden todos los permisos solicitados (Contenidos, Miembros) para la integración de GitHub.

**Nota**: Auto Assign requiere vincular tu cuenta de Datadog a tu cuenta de GitHub. Esta conexión se establece cuando cargas por primera vez un fragmento de código del stack trace.

## Cómo funciona

Cuando se produce un error, Auto Assign:

1. Analiza el stack trace para identificar una confirmación sospechosa.
2. Encuentra al autor de esta confirmación.
3. Asigna la incidencia a ese desarrollador y envía una notificación.

## Gestión de asignaciones

Puedes ver los desarrolladores asignados directamente dentro de cada incidencia en Datadog. En caso necesario, siempre es posible la reasignación manual para anular la asignación automática.

{{< img src="error_tracking/ownership-details.png" alt="Información de la propiedad del equipo en los detalles de la incidencia" style="width:80%;" >}}

# Configuración

Navega hasta la [página de configuración de Error Tracking](https://app.datadoghq.com/error-tracking/settings/issues/ownership) en Datadog para gestionar la configuración de la Auto Assign. Puedes activar o desactivar Auto Assign globalmente para toda la organización, o configurarlo por servicio para un control más granular.

{{< img src="error_tracking/ownership-config.png" alt="Configuración de la Propiedad del equipo de incidencia" style="width:80%;" >}}
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/suspect_commits/
[2]: /es/integrations/guide/source-code-integration/
[3]: /es/integrations/github/
[4]: https://app.datadoghq.com/integrations