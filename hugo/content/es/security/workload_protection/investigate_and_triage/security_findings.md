---
description: Revise y clasifique los hallazgos de Workload Protection para abordar
  los problemas de postura de seguridad en tiempo de ejecución.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
  tag: Documentación
  text: Obtenga información sobre las reglas de hallazgo
title: Hallazgos
---
Los hallazgos de [Workload Protection][1] se generan cuando los eventos de Agent de un recurso (un servidor o contenedor) coinciden con una [regla de hallazgo][2]. Visualice, filtre y clasifique los hallazgos en el [Findings Explorer][3] para evaluar y mejorar su postura de seguridad en tiempo de ejecución.

Datadog almacena un historial completo de hallazgos para investigación y auditoría.

## Findings Explorer {#findings-explorer}

El [Findings Explorer][3] enumera los hallazgos en toda su infraestructura. Cada entrada muestra el recurso afectado, la regla de hallazgo que generó el hallazgo, cuándo se informó el problema por primera vez, su estado actual y el equipo o servicio responsable.

Haga clic en {{< ui >}}View All{{< /ui >}} para ver una lista completa de los recursos afectados por la misma regla de hallazgo.

### Filtrar hallazgos {#filter-findings}

Utilice la barra de búsqueda y el panel de facetas para limitar los hallazgos por gravedad, estado de clasificación, regla, servidor o contenedor.

Para filtrar por estado de clasificación, utilice la consulta de búsqueda `@workflow.triage.status:(open OR in-progress)`.

### Agrupar hallazgos {#group-findings}

Utilice {{< ui >}}Group by{{< /ui >}} para organizar la lista:

- {{< ui >}}Rule Name{{< /ui >}}: Agrupa los recursos por regla de hallazgo.
- {{< ui >}}Resource Name{{< /ui >}}: Agrupa los hallazgos por servidor o contenedor.
- {{< ui >}}None{{< /ui >}}: Muestra una lista plana de hallazgos.

### Guardar visualizaciones {#save-views}

Para guardar su búsqueda actual y la configuración de filtros para su uso futuro, coloque el cursor sobre {{< ui >}}Views{{< /ui >}} y haga clic en {{< ui >}}Save as new view{{< /ui >}}.

## Detalles del hallazgo {#finding-details}

Haga clic en cualquier hallazgo para abrir el panel lateral con información detallada sobre el recurso y la regla de hallazgo que lo generó.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_side_panel.png" alt="Panel lateral de hallazgos que muestra la sección \"What Happened\" y los controles de triaje" width="100%">}}

La sección {{< ui >}}What Happened{{< /ui >}} muestra:

- Cuándo se informó el hallazgo por primera vez.
- La ubicación del recurso afectado.
- La regla de hallazgo que coincidió.

Seleccione la pestaña {{< ui >}}Trigger Event{{< /ui >}} para revisar el evento del Agent asociado con el hallazgo.

### Guía de remediación {#remediation-guidance}

Cada regla de hallazgo OOTB incluye una guía de remediación redactada por el equipo de seguridad de Datadog. Seleccione la pestaña {{< ui >}}Remediation{{< /ui >}} para revisar los pasos de remediación y solucionar la configuración incorrecta subyacente.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_remediation.png" alt="Detalles del hallazgo que muestran los pasos de remediación para un recurso afectado" width="100%">}}

## Clasificar hallazgos {#triage-findings}

Utilice {{< ui >}}Next Steps{{< /ui >}} en el panel lateral de hallazgos para gestionar los hallazgos:

- {{< ui >}}Status{{< /ui >}}: Actualice el estado del hallazgo para reflejar el progreso de la investigación.
- {{< ui >}}Mute{{< /ui >}}: Suprima un hallazgo durante un periodo determinado cuando el comportamiento sea esperado o aceptable.
- {{< ui >}}Add Ticket{{< /ui >}}: Añada el hallazgo a un ticket para su seguimiento.

[1]: /es/security/workload_protection/
[2]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings