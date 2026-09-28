---
aliases:
- /es/security/application_security/security_signals/
- /es/security/application_security/threats/security_signals
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: Documentación
  text: Explore las reglas de detección de amenazas OOTB de AAP
- link: /security/application_security/threat_protection/policies/custom_rules/
  tag: Documentación
  text: Configure reglas personalizadas de detección de amenazas de AAP
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: Documentación
  text: Inteligencia de amenazas de AAP
title: Investigue las señales de seguridad
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Descripción general {#overview}

Las señales de seguridad de AAP se crean cuando Datadog detecta una amenaza basada en una regla de detección. Vea, busque, filtre e investigue señales de seguridad en el [Explorador de señales][2], o configure [Notification Rules][8] para enviar señales a herramientas de terceros.

<!-- {{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Descripción general de la investigación de amenazas en el explorador de señales con panel lateral de detalles">}} -->

## Columnas del Explorador de señales{#signals-explorer-columns}

El Explorador de señales muestra las siguientes columnas.

{{< ui >}}Severity{{< /ui >}}
: Existen cinco estados de gravedad: {{< ui >}}Info{{< /ui >}}, {{< ui >}}Low{{< /ui >}}, {{< ui >}}Medium{{< /ui >}}, {{< ui >}}High{{< /ui >}} y {{< ui >}}Critical{{< /ui >}}. {{< ui >}}High{{< /ui >}} y {{< ui >}}Critical{{< /ui >}} indican un impacto importante en la disponibilidad del servicio o un compromiso activo.

{{< ui >}}Title{{< /ui >}}
: El nombre de la señal. Los títulos podrían actualizarse cuando se correlacionan nuevos datos, lo que altera el impacto evaluado del ataque.

{{< ui >}}Service/Env{{< /ui >}}
: El servicio y el entorno identificados en el ataque. Pase el cursor sobre el nombre del servicio para enlazar a la página del servicio y al repositorio de código, y para ver quién está de guardia para el servicio.

{{< ui >}}Entities{{< /ui >}}
: Los atacantes y las víctimas de un ataque. Los atacantes se identifican mediante direcciones IP. Las víctimas se identifican como usuarios autenticados. Pase el cursor sobre la lista de IP y luego haga clic en una IP para ver detalles como {{< ui >}}Threat Intelligence{{< /ui >}} y {{< ui >}}Security Activity{{< /ui >}}.

{{< ui >}}Triage State{{< /ui >}}
: Puede asignar un responsable y establecer un estado de clasificación para la señal. Los estados disponibles son {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}} y {{< ui >}}Archived{{< /ui >}}.

{{< ui >}}Creation Date{{< /ui >}}
: La fecha en la que se creó la señal por primera vez. Las señales se ordenan por fecha de forma predeterminada.

## Filtrar señales de seguridad {#filter-security-signals}

Para filtrar las señales de seguridad en el [Explorador de señales][2], utilice la consulta de búsqueda `@workflow.triage.state:<status>`, donde `<status>` es el estado por el que desea filtrar (`open`, `under_review` o `archived`). También puede utilizar la faceta {{< ui >}}Signal State{{< /ui >}} en el panel de facetas.

## Clasificar una señal {#triage-a-signal}

Puede clasificar una señal asignándola a un usuario para una investigación más detallada. El usuario asignado puede entonces realizar un seguimiento de su revisión actualizando el estado de la señal.

1. En la página [Explorador de señales][2], haga clic en el icono de perfil de usuario en la columna {{< ui >}}Triage State{{< /ui >}}.
2. Seleccione un usuario para asignar la señal.
3. Para actualizar el estado de la señal de seguridad, haga clic en el menú desplegable de estado de clasificación y seleccione un estado. El estado predeterminado es {{< ui >}}Open{{< /ui >}}.
    - {{< ui >}}Open{{< /ui >}}: La señal aún no ha sido resuelta.
    - {{< ui >}}Under Review{{< /ui >}}: La señal está siendo investigada activamente. Desde el estado {{< ui >}}Under Review{{< /ui >}}, puede mover la señal a {{< ui >}}Archived{{< /ui >}} o {{< ui >}}Open{{< /ui >}} según sea necesario.
    - {{< ui >}}Archived{{< /ui >}}: La detección que causó la señal ha sido resuelta. Desde el estado {{< ui >}}Archived{{< /ui >}}, puede mover la señal de vuelta a {{< ui >}}Open{{< /ui >}} si se encuentra dentro de los 30 días posteriores a cuando la señal fue detectada originalmente.

**Nota**: Para modificar señales de seguridad, debe tener el permiso `security_monitoring_signals_write`. Consulte [Control de acceso basado en roles][9] para obtener más información sobre los roles predeterminados de Datadog y los permisos de control de acceso basado en roles granulares disponibles para App y API Protection.

## Declarar un incidente {#declare-an-incident}

Utilice [Incident Management][4] para crear un incidente para una señal de seguridad.

Declare un incidente si:

- Un problema está afectando o podría estar afectando a los clientes.
- Usted considera que un problema (incluso si es interno) debe abordarse como una emergencia.

Si no sabe si debe declarar un incidente, notifique a otros usuarios y aumente la gravedad según corresponda.

1. En la página [Explorador de señales][2], seleccione una señal de seguridad para abrir su panel de detalles.
2. En el panel de señales, haga clic en {{< ui >}}Declare Incident{{< /ui >}} o seleccione la flecha desplegable y seleccione {{< ui >}}Add to an existing incident{{< /ui >}}.
3. Cuando declare un nuevo incidente, en la configuración de {{< ui >}}Declare Incident{{< /ui >}}, configure el incidente especificando detalles como el nivel de gravedad y el comandante del incidente.
   1. Estime el impacto. Los niveles de gravedad van desde SEV-1 (crítico) hasta SEV-5 (impacto menor). En caso de duda, elija siempre la gravedad más alta.
4. Haga clic en {{< ui >}}Declare Incident{{< /ui >}}.

## Ejecute un flujo de trabajo {#run-a-workflow}

Utilice [Workflow Automation][5] para activar manualmente un flujo de trabajo para una señal de seguridad.

1. Asegúrese de que el flujo de trabajo que desea ejecutar tenga un activador de seguridad.
2. En la página [Explorador de señales][2], abra una señal de seguridad.
3. En la sección {{< ui >}}Respond{{< /ui >}}, haga clic en {{< ui >}}Run Workflow{{< /ui >}}.
4. En {{< ui >}}Run a workflow{{< /ui >}}, seleccione el flujo de trabajo que desea ejecutar o haga clic en {{< ui >}}New Workflow{{< /ui >}}.
   - Dependiendo del flujo de trabajo que seleccione, es posible que deba ingresar parámetros de entrada adicionales.
   - Si seleccionó {{< ui >}}New Workflow{{< /ui >}}, se abrirá Ejecutar un flujo de trabajo de seguridad. Para obtener más información sobre los flujos de trabajo, consulte [Workflow Automation][5].
5. Haga clic en {{< ui >}}Run{{< /ui >}}.

## Revise y remedie {#review-and-remediate}

1. En la página [Signals Explorer][2], abra una señal de seguridad.
2. En los detalles de la señal, vea cada una de las secciones, como {{< ui >}}What Happened{{< /ui >}}, {{< ui >}}Activity Summary{{< /ui >}} y {{< ui >}}Detection Rule{{< /ui >}}.
3. Revise {{< ui >}}Next Steps{{< /ui >}} y tome medidas:
    -  Haga clic en {{< ui >}}Block all Attacking IPs{{< /ui >}} (por una duración específica o de forma permanente).
    -  Haga clic en {{< ui >}}Automated Attacker Blocking{{< /ui >}} (según las reglas de [detección][10]). Esta configuración requiere el permiso `Protect Write` de App and API Protection.
    -  Haga clic en [{{< ui >}}Block with Edge WAF{{< /ui >}}][11].

## Acciones masivas {#bulk-actions}

Cuando selecciona una o más señales, puede usar {{< ui >}}Bulk Actions{{< /ui >}} para realizar lo siguiente.

### Establecer estado {#set-state}

Establezca el estado de clasificación en {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}} o {{< ui >}}Archived{{< /ui >}}.

### Asigne la señal a usuarios {#assign-the-signal-to-users}

Seleccione {{< ui >}}Assign selection{{< /ui >}} y luego seleccione el o los usuarios que desea asignar a la señal.

Seleccione {{< ui >}}Remove all assignments{{< /ui >}} para restablecer la asignación de la señal a ninguno.

### Case Management {#case-management}

Datadog [Case Management][6] ofrece un lugar centralizado para clasificar, realizar un seguimiento y solucionar problemas detectados por Datadog y por integraciones de terceros.

1. En la página [Signals Explorer][2], seleccione una señal de seguridad.
2. En {{< ui >}}Bulk Actions{{< /ui >}}, seleccione {{< ui >}}Create a case{{< /ui >}}.
3. Seleccione {{< ui >}}Create a case{{< /ui >}} o {{< ui >}}Add to an existing case{{< /ui >}} para agregar la señal a un caso existente.
4. Ingrese un título y una descripción opcional.
5. Haga clic en {{< ui >}}Create Case{{< /ui >}}.

Cuando hace clic en {{< ui >}}Create Case{{< /ui >}}, se le dirige a Case Management y al proyecto que seleccionó.

## Vistas guardadas {#saved-views}

Puede guardar diferentes configuraciones del Explorador de señales como vistas. Por ejemplo, podría filtrar el explorador para mostrar todas las señales no asignadas y luego guardarlo como una vista.

Cuando una configuración se guarda como una vista, usted y sus compañeros de equipo pueden usarla más tarde.

Una vista contiene las selecciones actuales del explorador para:

- Tiempo y consulta
- Columnas mostradas y ordenamiento
- Configuración de agregación de análisis
- Visibilidad de la línea de tiempo
- Facetas mostradas
- Agrupar por regla de detección

1. Para guardar una vista, configure el explorador para mostrar la vista que desea y luego haga clic en {{< ui >}}Save{{< /ui >}}.
2. Ingrese un nombre para la vista y luego seleccione los equipos con los que desea compartirla.
3. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para ver todas las vistas guardadas, haga clic en {{< ui >}}Views{{< /ui >}} junto al título de la página {{< ui >}}Signals Explorer{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /es/incident_response/incident_management/
[5]: /es/actions/workflows/
[6]: /es/incident_response/work_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /es/security/notifications/rules/
[9]: /es/account_management/rbac/permissions/#cloud-security-platform
[10]: /es/security/application_security/threat_protection/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /es/security/application_security/threat_protection/policies/#blocking-attack-attempts-with-in-app-waf