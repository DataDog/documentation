---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatice la protección de identidad, la contención de amenazas y la inteligencia
    de amenazas con los flujos de trabajo de Datadog SOAR
- link: https://www.datadoghq.com/blog/security-operational-metrics/
  tag: Blog
  text: Mida y optimice la eficiencia del equipo de seguridad con las métricas operativas
    de seguridad de Cloud SIEM
title: Responder (SOAR) e informar
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation está en versión preliminar en su sitio de Datadog seleccionado ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

## Descripción general {#overview}

Datadog Security Orchestration, Automation, and Response (SOAR) le ayuda a orquestar las operaciones de seguridad, investigar señales y remediar amenazas mediante [Workflow Automation][1]. Por ejemplo, puede [ejecutar un flujo de trabajo][2] para:

- Bloquear una dirección IP de su entorno.
- Deshabilitar una cuenta de usuario.
- Buscar una dirección IP con un proveedor de inteligencia de amenazas externo.
- Enviar mensajes de Slack a sus colegas para obtener ayuda con su investigación.
- Asignar señales para investigación.
- Enriquecer casos automáticamente y cerrar casos duplicados.

SOAR también incluye [plantillas][4] personalizables listas para usar que le ayudarán a crear flujos de trabajo para remediar amenazas. Por ejemplo:

- Un flujo de trabajo de Identity and Access Management (IAM) que automatiza las respuestas a inicios de sesión sospechosos y cuentas comprometidas.
- Un flujo de trabajo de Endpoint Detection and Response (EDR) que acelera la investigación y contención de amenazas en puntos de conexión.
- Un flujo de trabajo de Threat Intelligence Enrichment que enriquece las Alerts con datos externos para que pueda priorizar y responder de manera más eficaz.

Cloud SIEM también proporciona [métricas operativas de seguridad][3] para que pueda determinar la eficiencia y eficacia de sus procesos de seguridad.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /actions/workflows/
 [2]: /security/cloud_siem/investigate_security_signals#run-workflow-automation
 [3]: /security/cloud_siem/security_operational_metrics/
 [4]: /actions/workflows/build/#build-a-workflow-from-a-blueprint