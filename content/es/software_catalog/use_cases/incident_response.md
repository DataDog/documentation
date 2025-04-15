---
aliases:
- /es/tracing/software_catalog/use_cases/incident_response
- /es/tracing/software_catalog/guides/upstream-downstream-dependencies
- /es/software_catalog/guides/upstream-downstream-dependencies
- /es/tracing/service_catalog/guides/upstream-downstream-dependencies
- /es/service_catalog/guides/upstream-downstream-dependencies
- /es/service_catalog/use_cases/upstream_downstream_dependencies
further_reading:
- link: /service_management/incident_management/
  tag: Documentación
  text: Gestión de incidencias
- link: /integrations/pagerduty/
  tag: Documentación
  text: Integración PagerDuty
title: Mejorar la respuesta a los incidentes
---


El Catálogo de software mejora la respuesta a los incidentes:

- Mejorando la experiencia de cada turno mediante la verificación y consolidación de los datos de propiedad, los canales de comunicación y los recursos de monitorización y resolución de problemas.
- Integrando soluciones así como también documentación y manuales de operaciones de tipo herramienta, directamente en los flujos de trabajo de observabilidad existentes.
- Acelerando la recuperación de incidentes mediante la simplificación del proceso de identificación de propietarios de dependencias ascendentes y descendentes.

El Catálogo de software también se integra con [Datadog Incident Management][1] y [PagerDuty][2], lo que te permite ver los incidentes relacionados en la pestaña Fiabilidad en la página de detalles de servicio.

**Nota**: Los incidentes de Datadog se vinculan automáticamente con el Catálogo de software, pero debes aplicar etiquetas (tags) `SERVICE` a los incidentes para asegurarte de que los datos de cada incidente de servicio son precisos. La integración PagerDuty debe configurarse manualmente para integrarse con la información de incidentes del Catálogo de software.

{{< img src="tracing/software_catalog/incident-mgmt-reliability.png" alt="Pestaña Fiabilidad de un servicio, que muestra métricas de incidentes y errores para el servicio global y por versión" style="width:100%;" >}}

Para ver el estado de los incidentes de las dependencias ascendentes y descendentes, haz clic en un servicio en el Catálogo de software para abrir la página de detalles del servicio y, a continuación, haz clic en la pestaña Dependencias. 

{{< img src="tracing/software_catalog/incident-mgmt-incident-status.png" alt="Pestaña Incidentes de un servicio, que muestra las dependencias ascendentes y descendentes y resalta aquellas afectadas por un incidente" style="width:100%;" >}}



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/
[2]: /es/integrations/pagerduty/