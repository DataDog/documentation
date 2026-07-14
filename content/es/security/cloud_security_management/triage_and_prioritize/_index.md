---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: Documentación
  text: Motor de Priorización en Tiempo de Ejecución
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentación
  text: Puntuación de Severidad
- link: /security/security_inbox/
  tag: Documentación
  text: Revisar los hallazgos priorizados en la Bandeja de Entrada de Seguridad
title: Clasificar y Priorizar
---
Cloud Security genera hallazgos sobre vulnerabilidades, configuraciones incorrectas y riesgos de identidad. Clasificar y Priorizar abarca dos capacidades relacionadas: el motor que identifica los hallazgos que exponen sus recursos críticos para el negocio, y el marco de puntuación que traduce ese juicio en una puntuación de severidad por hallazgo que puede ordenar, filtrar y dirigir.

## Motor de Priorización en Tiempo de Ejecución {#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Motor de Priorización en Tiempo de Ejecución no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="¡Únete a la Vista Previa!">}}
El Motor de Priorización en Tiempo de Ejecución está en Vista Previa para Vulnerabilidades de Cloud Security. Utilice este formulario para solicitar acceso.
{{< /callout >}}

El [Motor de Priorización en Tiempo de Ejecución][1] combina la observabilidad en tiempo de ejecución y los datos de seguridad para identificar el ~5% de los hallazgos que realmente exponen sus recursos críticos para el negocio. Evalúa cada hallazgo en cinco dimensiones: alcanzabilidad, exposición, explotabilidad, criticidad para el negocio y capacidad de acción.

## Puntuación de Severidad {#severity-scoring}

[Puntuación de Severidad][2] convierte la salida del Motor de Priorización en Tiempo de Ejecución en una Datadog Severity Score para cada hallazgo. Para vulnerabilidades, sigue el algoritmo [CVSS 4.0][3], enriqueciendo la puntuación base con factores temporales (como exploits activos o probabilidad de explotación) y factores ambientales (como contexto de ejecución, exposición o criticidad del recurso afectado). Para configuraciones incorrectas y riesgos de identidad, calcula la severidad utilizando una matriz de probabilidad × impacto que pondera cómo un adversario podría abusar del hallazgo en relación con el daño que dicho abuso ocasionaría.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /es/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/