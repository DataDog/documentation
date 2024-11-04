---
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: Documentación
  text: Explorar las reglas predefinidas de detección de amenazas de ASM
- link: /security/application_security/threats/custom_rules/
  tag: Documentación
  text: Configurar reglas personalizadas de detección de amenazas de ASM
- link: /security/application_security/threats/threat-intelligence/
  tag: Documentación
  text: Inteligencia sobre amenazas de ASM
title: Investigar las señales de seguridad
---

## Información general

Las señales de seguridad de ASM se crean cuando Datadog detecta una amenaza basándose en una regla de detección. Ve, busca, filtra e investiga las señales de seguridad en el [Signals Explorer][2], o configura [reglas de notificación][8] para enviar señales a herramientas de terceros.

En el [Signals Explorer][2], filtra por atributos y facetas para encontrar amenazas críticas. Haz clic en una señal para ver los detalles sobre ella, incluido el propietario de servicio y los detalles del ataque. Los detalles del ataque incluyen el usuario autenticado y su dirección IP, qué regla activó, el flujo del ataque, las trazas (traces) relacionadas y otras señales de seguridad. Desde esta página, puedes bloquear direcciones IP y usuarios, y también hacer clic para crear un caso y declarar una incidencia.

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Información general de la investigación de amenazas en el Signals Explorer con el panel lateral de detalles">}}

## Filtrar las señales de seguridad

Para filtrar las señales de seguridad en el [Signals Explorer][2], utiliza la consulta de búsqueda `@workflow.triage.state:<status>` , donde `<status>` es el estado por el que deseas filtrar (`open`, `under_review` o `archived`). También puedes utilizar la faceta **Signal State** (Estado de la señal) del panel de facetas.

## Clasificación de una señal

Puedes clasificar una señal asignándola a un usuario para que la investigue. El usuario asignado puede hacer un seguimiento de su revisión actualizando el estado de la señal.

1. En la página [Signals Explorer][2], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en el icono de perfil de usuario y selecciona un usuario.
3. Para actualizar el estado de la señal de seguridad, haz clic en el menú desplegable de estado de clasificación y selecciona un estado. El estado por defecto es **Abierto**.
    - **Abierto**: la señal aún no ha sido resuelta.
    - **En revisión**: la señal está siendo investigada activamente. Desde el estado **En revisión**, puedes mover la señal a **Archivado** o **Abierto** según sea necesario.
    - **Archivado**: la detección que causó la señal se ha resuelto. Desde el estado **Archivado**, puedes volver a mover la señal a **Abierto** si no han transcurrido más de 30 días desde que se detectó la señal originalmente.

**Nota**: Para modificar las señales de seguridad, debes tener el permiso `security_monitoring_signals_write`. Consulta [Control de acceso basado en roles][9] para obtener más información sobre los roles predeterminados de Datadog y los permisos detallados de control de acceso basados en roles disponibles para la Application Security Management.

## Crear un caso

Utiliza [Gestión de casos][6] para rastrear, clasificar e investigar las señales de seguridad.

1. En la página [Signals Explorer][2], selecciona una señal de seguridad.
2. En el panel lateral de la señal, selecciona el menú desplegable **Create a case** (Crear un caso). Selecciona **Create a case** (Crear un caso), o **Add to an existing case** (Añadir a un caso existente) para añadir la señal a un caso existente.
3. Introduce un título y una descripción opcional.
4. Haz clic en **Create case** (Crear caso).

## Declarar una incidencia

Utiliza [Gestión de incidencias][4] para crear una incidencia para una señal de seguridad.

1. En la página [Signals Explorer][2], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en el menú desplegable **Declare incident** (Declarar incidencia) y selecciona **Create an incident** (Crear una incidencia), o **Add to an existing incident** (Añadir a una incidencia existente).
3. En el modal de creación de incidencias, configura la incidencia especificando detalles como el nivel de gravedad y el encargado de la incidencia.
4. Haz clic en **Declare Incident** (Declarar incidencia).

## Ejecutar un flujo de trabajo

Utiliza la [Automatización del flujo de trabajo][5] para activar manualmente un flujo de trabajo para una señal de seguridad. 

1. Asegúrate de que el flujo de trabajo que deseas ejecutar tiene un activador de seguridad.
2. En la página [Signals Explorer][2], selecciona una señal de seguridad.
3. Desplázate a la sección **What is Workflow Automation** (Qué es la automatización del flujo de trabajo).
4. Haz clic en **Run Workflow** (Ejecutar flujo de trabajo).
5. En el modal de flujo de trabajo, selecciona el flujo de trabajo que deseas ejecutar. En función del flujo de trabajo, es posible que debas introducir parámetros de entrada adicionales.
6. Haz clic en **Run** (Ejecutar).

## Revisar y corregir

1. En la página [Signals Explorer][2], selecciona una señal de seguridad.
2. En el panel lateral de la señal, haz clic en cada una de las pestañas, como **Attack Flow**, **Activity Summary** y **Rule Details** (Flujo de ataque, Resumen de actividad y Detalles de la regla), para revisar la información.
3. Revisa los **Suggested Next Steps** (Siguientes pasos sugeridos) y haz lo siguiente:
    -  Haz clic en **Block all Attacking IPs** (Bloquear todas las IPs atacantes) (por una duración específica o permanentemente).
    -  Haz clic en **Automated Attacker Blocking** (Bloqueo automático de atacantes) (basado en reglas de [detección][10]).
    -  Haz clic en **[Block with Edge WAF][11]** (Bloqueo con Edge WAF).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /es/service_management/incident_management/
[5]: /es/service_management/workflows/
[6]: /es/service_management/case_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /es/security/notifications/rules/
[9]: /es/account_management/rbac/permissions/#cloud-security-platform
[10]: /es/security/application_security/threats/protection/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /es/security/application_security/threats/protection/#blocking-attack-attempts-with-in-app-waf