---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: Documentación
  text: Motor de priorización en tiempo de ejecución
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentación
  text: Puntuación de gravedad
- link: /security/security_inbox/
  tag: Documentación
  text: Revise los hallazgos priorizados en la Bandeja de entrada de Security
title: Clasificar y priorizar
---
Cloud Security genera hallazgos sobre vulnerabilidades, configuraciones incorrectas y riesgos de identidad. Clasificar y priorizar abarca dos capacidades relacionadas: el motor que identifica los hallazgos que exponen sus recursos críticos para el negocio y el marco de puntuación que traduce ese juicio en una puntuación de gravedad por hallazgo que puede ordenar, filtrar y enrutar.

## Motor de priorización en tiempo de ejecución {#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Motor de priorización en tiempo de ejecución no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

El [Motor de priorización en tiempo de ejecución][1] combina la observabilidad en tiempo de ejecución y los datos de seguridad para identificar el ~5% de los hallazgos que realmente exponen sus recursos críticos para el negocio. Evalúa cada hallazgo en cinco dimensiones: alcanzabilidad, exposición, explotabilidad, criticidad empresarial y capacidad de acción.

## Puntuación de gravedad {#severity-scoring}

La [Puntuación de gravedad][2] convierte el resultado del Motor de priorización en tiempo de ejecución en un Datadog Severity Score para cada hallazgo. Para las vulnerabilidades, sigue el algoritmo [CVSS 4.0][3], enriqueciendo la puntuación base con factores temporales (como exploits activos o probabilidad de explotación) y factores ambientales (como el contexto de tiempo de ejecución, la exposición o la criticidad del recurso afectado). Para las configuraciones incorrectas y los riesgos de identidad, calcula la gravedad utilizando una matriz de probabilidad × impacto que pondera cómo un adversario podría abusar del hallazgo frente al daño que dicho abuso causaría.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /es/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/