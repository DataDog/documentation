---
aliases:
- /es/tracing/service_catalog/guides/upstream-downstream-dependencies
further_reading:
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios de Datadog
title: Ver dependencias ascendentes y descendentes durante una incidencia activa
---

El Catálogo de servicios se integra con herramientas de gestión de incidencias como la [Gestión de incidencias de Datadog][1] y [PagerDuty][2], y puedes ver información sobre incidencias relacionadas en curso en la pestaña **Reliability** (Fiabilidad) de detalles del servicio.

{{< img src="tracing/service_catalog/svc_cat_reliability.png" alt="Pestaña Fiabilidad de los detalles del servicio en el Catálogo de servicios." >}}

Las incidencias de Datadog se conectan automáticamente al Catálogo de servicios. Aplica las etiquetas `SERVICE` apropiadas a una incidencia para asegurarte de que los datos de una incidencia en el servicio son correctos. La integración de incidencias de PagerDuty requiere que hayas configurado la [integración de PagerDuty][2].

Para ver el estado de las incidencias de las dependencias ascendentes y descendentes de tu servicio, haz clic en el servicio en el Catálogo de servicios y, en la página de detalles del servicio, ve a la pestaña **Dependencies** (Dependencias).

{{< img src="tracing/service_catalog/svc_cat_dependencies.png" alt="Pestaña Dependencias de los detalles del servicio en el Catálogo de servicios." >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/
[2]: /es/integrations/pagerduty/