---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-csm-threats#all
  tag: Documentación
  text: Explorar las reglas de detección de CSM Threats
- link: /security/threats/workload_security_rules
  tag: Documentación
  text: Más información sobre cómo gestionar las reglas de detección de CSM Threats
- link: /security/notifications/
  tag: Documentación
  text: Más información sobre las notificación de seguridad
- link: https://www.datadoghq.com/blog/datadog-csm-windows/
  tag: Blog
  text: Protección de tus cargas de trabajo en Windows con Datadog Cloud Security
    Management
title: Investigar las señales de seguridad
---

Las señales de seguridad de [Cloud Security Management Threats][9] (CSM Threats) se crean cuando Datadog detecta una amenaza basándose en una regla de seguridad. Ve, busca, filtra e investiga las señales de seguridad en el [Signals Explorer][4], o configura [reglas de notificación][1] para enviar señales a herramientas de terceros.

Para modificar las señales de seguridad, debes tener el permiso `security_monitoring_signals_write`. Consulta [Control de acceso basado en roles][3] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para la Cloud Security Management.

{{< img src="security/cws/signals_explorer.png" alt="Página de CSM Signals Explorer" width="100%">}}

## Filtrar las señales de seguridad

Para filtrar las señales de seguridad en el [Signals Explorer][4], utiliza la consulta de búsqueda `@workflow.triage.state:<status>` , donde `<status>` es el estado por el que deseas filtrar (`open`, `under_review` o `archived`). También puedes utilizar la faceta **Signal State** (Estado de la señal) del panel de facetas.

## Clasificación de una señal

Puedes clasificar una señal asignándola a un usuario para que la investigue. El usuario asignado puede hacer un seguimiento de su revisión actualizando el estado de la señal.

1. En [Signals Explorer][4], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en el icono de perfil de usuario y selecciona un usuario.
3. Para actualizar el estado de la señal de seguridad, haz clic en el menú desplegable de estado de clasificación y selecciona un estado. El estado por defecto es **Abierto**.
    - **Abierto**: la señal aún no ha sido resuelta.
    - **En revisión**: la señal está siendo investigada activamente. Desde el estado **En revisión**, puedes mover la señal a **Archivado** o **Abierto** según sea necesario.
    - **Archivado**: la detección que causó la señal se ha resuelto. Desde el estado **Archivado**, puedes volver a mover la señal a **Abierto** si no han transcurrido más de 30 días desde que se detectó la señal originalmente.

## Crear un caso

{{< site-region region="gov" >}}
<div class="alert alert-danger">La gestión de casos no es compatible para tu <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utiliza [Gestión de casos][6] para rastrear, clasificar e investigar las señales de seguridad.

1. En [Signals Explorer][4], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en el menú desplegable **Escalate Investigation** (Escalar investigación) y selecciona **Create a case** (Crear un caso). Alternativamente, selecciona **Add to an existing case** (Añadir a un caso existente) para añadir la señal a un caso existente. 
3. Introduce un título y una descripción opcional.
4. Haz clic en **Create case** (Crear caso).

## Declarar una incidencia

Utiliza [Gestión de incidencias][5] para crear una incidencia para una señal de seguridad.

1. En [Signals Explorer][4], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en el menú desplegable **Escalate Investigation** (Escalar investigación) y selecciona **Create a case** (Crear un caso). Alternativamente, selecciona **Add to incident** (Añadir a una incidencia) para añadir la señal a una incidencias existente.
3. En el modal de creación de incidencias, configura la incidencia especificando detalles como el nivel de gravedad y el encargado de la incidencia.
4. Haz clic en **Declare Incident** (Declarar incidencia).

## Ejecutar un flujo de trabajo

Utiliza [Workflow Automation][8] para activar manualmente un flujo de trabajo para una señal de seguridad. Consulta [Activar un flujo de trabajo desde una señal de seguridad][7] para obtener más información.

1. En [Signals Explorer][4], selecciona una señal de seguridad.
2. En el panel lateral de señales, haz clic en la pestaña **Workflows** (Flujos de trabajo).
3. Haz clic en **Run Workflow** (Ejecutar flujo de trabajo).
4. En el modal de flujo de trabajo, selecciona el flujo de trabajo que deseas ejecutar. El flujo de trabajo debe tener un desencadenante de seguridad para aparecer en la lista. En función del flujo de trabajo, es posible que debas introducir parámetros de entrada adicionales.
5. Haz clic en **Run** (Ejecutar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/rules/
[2]: /es/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /es/account_management/rbac/permissions/#cloud-security-platform
[4]: https://app.datadoghq.com/security?product=cws
[5]: /es/service_management/incident_management/
[6]: /es/service_management/case_management/
[7]: /es/security/cloud_security_management/workflows
[8]: /es/service_management/workflows
[9]: /es/security/threats/