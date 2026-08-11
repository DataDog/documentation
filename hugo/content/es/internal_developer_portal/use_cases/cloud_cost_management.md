---
aliases:
- /es/tracing/software_catalog/guides/cloud_cost_management
- /es/software_catalog/guides/cloud_cost_management
- /es/tracing/service_catalog/guides/cloud_cost_management
- /es/service_catalog/guides/cloud_cost_management
- /es/service_catalog/use_cases/cloud_cost_management
- /es/software_catalog/use_cases/cloud_cost_management
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software de Datadog
- link: /tracing/software_catalog/scorecards/
  tag: Documentación
  text: Cuadros de mandos de Datadog
- link: /cloud_cost_management/
  tag: Documentación
  text: Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/monitor-cloud-costs-with-scorecards/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de los costes de la nube con
    Scorecards
title: Gestionar y optimizar los costes de la nube
---

El [Catálogo de software][4], [Scorecards][2] y [Workflow Automation][5] de Datadog permiten a las organizaciones monitorizar y optimizar los costes de la nube en detalle a nivel de equipo, asegurando una asignación de costes adecuada y el cumplimiento de los protocolos.

## Monitorización proactiva de picos de costes

[Cloud Cost Management de Datadog][1] se integra con el Catálogo de software para detectar y alertar sobre las anomalías de costes en tiempo real. Los equipos pueden investigar rápidamente los picos correlacionándolos con cambios a nivel de servicio, como fluctuaciones de tráfico, despliegues o fusiones de solicitudes pull.

{{< img src="tracing/software_catalog/ccm-use-cases-cost-spikes.png" alt="La pestaña de Costes de un servicio en el Catálogo de software, que muestra las métricas de costes para distintos componentes de la infraestructura." >}}

## Asegurar el cumplimiento de los costes y la transparencia

Los equipos pueden monitorizar y optimizar la asignación de costes mediante el etiquetado de recursos en la nube y el seguimiento del cumplimiento con [Scorecards][2]. 

Por ejemplo, puedes activar el rastreo de costes a nivel de equipo aplicando la etiqueta "team" (equipo) a los componentes de infraestructura y estableciendo una regla de Scorecard personalizada para aplicar esta práctica.

Datadog ofrece [planos de flujo de trabajo][3] preconfigurados para que crees procesos de gestión de costes. Puedes utilizar los planos tal cual o modificar la lógica de evaluación para adaptarla a tu caso de uso. 

{{< img src="tracing/software_catalog/ccm-use-cases-finops.png" alt="Una regla de Scorecard que requiere el etiquetado por equipo del 80% de los costes de un servicio." >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: /es/software_catalog/scorecards/
[3]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[4]: /es/software_catalog/
[5]: /es/service_management/workflows/