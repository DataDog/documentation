---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatiza la protección de identidades, la contención de amenazas y la inteligencia
    sobre amenazas con los flujos de trabajo SOAR de Datadog
- link: https://www.datadoghq.com/blog/security-operational-metrics/
  tag: Blog
  text: Mide y optimiza la eficacia del equipo de seguridad con las métricas operativas
    de seguridad de Cloud SIEM
title: Responder (SOAR) e informar
---

## Información general

Security Orchestration, Automation, and Response (SOAR) de Datadog te ayuda a orquestar operaciones de seguridad, investigar señales y remediar amenazas utilizando [Workflow Automation (automatización de procesos)][1]. Por ejemplo, puedes [ejecutar un workflow (UI) / proceso (generic)][2] para:

- Bloquea una dirección IP de tu entorno.
- Desactiva una cuenta de usuario.
- Busca una dirección IP en un proveedor externo de inteligencia sobre amenazas.
- Envía mensajes de Slack a tus compañeros para que te ayuden en tu investigación.
- Asigna señales para investigación.
- Enriquece automáticamente los casos y cierra los casos duplicados.

SOAR también incluye [planos][4] personalizables y listos para usar que te ayudarán a crear workflows (UI) / procesos (generic) para corregir las amenazas. Por ejemplo:

- Un workflow (UI) / proceso (generic) de Gestión de identidad y acceso (IAM) que automatiza las respuestas a los inicios de sesión sospechosos y las cuentas comprometidas.
- Un workflow (UI) / proceso (generic) Endpoint Detection and Response (EDR) que acelera la investigación y contención de las amenazas a los endpoints.
- Un workflow (UI) / proceso (generic) enriquecimiento de inteligencia de amenazas que enriquece las alertas con datos externos para que puedas priorizar y responder con mayor eficacia.

Cloud SIEM también proporciona [métricas operativas de seguridad][3], para que puedas determinar la eficiencia y eficacia de tus procesos de seguridad.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /actions/workflows/
 [2]: /security/cloud_siem/investigate_security_signals#run-workflow-automation
 [3]: /security/cloud_siem/security_operational_metrics/
 [4]: /actions/workflows/build/#build-a-workflow-from-a-blueprint