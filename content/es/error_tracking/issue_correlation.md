---
description: Entiende cómo se agrupan los errores en incidentes.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre los monitores de seguimiento de errores
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de incidentes en Error Tracking
title: Correlación de incidentes con Error Tracking
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-issue-correlation/" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
La Correlación de incidentes con Error Tracking está actualmente en vista previa, pero puedes solicitar acceso fácilmente. Utiliza este formulario para enviar tu solicitud. Una vez aprobada, podrás asignar automáticamente incidentes relacionados entre servicios, lo que te ayudará a rastrear el verdadero origen de un incidente.
{{< /callout >}} 
## Información general

{{< img src="error_tracking/issue-correlation-overview.png" alt="Vista de la pestaña de incidentes correlacionados en el contexto del explorador de Error Tracking" style="width:100%;" >}}

Utiliza Error Tracking para simplificar la depuración agrupando miles de errores similares en un único incidente. Utiliza la correlación de incidentes para determinar la causa del incidente, el impacto que tiene en otros servicios y si el error es consecuencia de una dependencia posterior.

La correlación de incidentes también ayuda a reducir el ruido de la lista de incidentes identificando los más críticos. Esto te permite alertar al equipo adecuado y lograr una resolución más rápida.

## Identificar incidentes correlacionados
Para identificar qué incidentes de tus servicios están correlacionadas, ve a la página de Error Tracking en [**Error > Issues** (Error > Incidentes)][1].

{{< img src="error_tracking/issue-correlation-et-page.png" alt="Lista de incidentes en el explorador de Error Tracking" style="width:70%;" >}}

Selecciona un incidente para abrir el panel lateral y ver su información.

{{< img src="error_tracking/issue-correlation-side-panel.png" alt="Información de un incidente en el explorador de Error Tracking" style="width:70%;" >}}

Abre la pestaña `Correlated issues` para ver el mapa de correlación de incidentes.

{{< img src="error_tracking/issue-correlation-correlation-tab.png" alt="Información de un incidente en el explorador de Error Tracking, centrada en la pestaña de correlación de incidentes" style="width:70%;" >}}

El mapa de correlación de incidentes muestra la siguiente información de un incidente determinado:
- **Root cause** (Causa de origen): servicios que probablemente estén causando el incidente
- **Current issue** (Incidente actual): incidente seleccionado y si está asignado a un equipo
- **Impact** (Impacto): recursos, usuarios y sesiones afectados


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/error-tracking