---
algolia:
  tags:
  - catálogo de software
aliases:
- /es/tracing/faq/software_catalog/
- /es/tracing/services/services_list/
- /es/tracing/visualization/services_list/
- /es/tracing/software_catalog/
- /es/tracing/faq/service_catalog/
- /es/tracing/service_catalog/
- /es/service_catalog/
- /es/software_catalog/
further_reading:
- link: /internal_developer_portal/use_cases
  tag: Documentación
  text: Más información sobre casos de uso de Software Catalog
title: Software Catalog
---

{{< img src="tracing/software_catalog/software_catalog_updated.mp4" video=true alt="Ir al Software Catalog" style="width:100%;" >}}

## Información general

[Software Catalog][1] proporciona una visión centralizada y dinámica de tu ecosistema de software, lo que permite a los equipos rastrear la propiedad, monitorizar el rendimiento, gestionar las dependencias y aplicar las normas de seguridad y cumplimiento.

Basada en telemetría en tiempo real y recopilación automatizada de metadatos, Software Catalog ofrece integraciones con herramientas de observabilidad, seguridad y gestión de costos. Esto permite a los equipos de ingeniería, SRE, seguridad y plataforma mantener la visibilidad, agilizar las operaciones y garantizar la fiabilidad del servicio a escala.

## Qué puedes hacer en Software Catalog
<br>
{{< img src="tracing/software_catalog/software_catalog_tabs.mp4" video=true alt="Información general en un video del Software Catalog, con el tipo de componente de servicios seleccionado, que se desplaza por las pestañas Propiedad, Fiabilidad, Rendimiento, Seguridad, Costos y Entrega" style="width:100%;" >}}
<br>

Software Catalog ofrece múltiples vistas para ayudarte a explorar y gestionar tus servicios.

- **Propiedad**: Accede a la información de Slack, repositorio o guardia de tu equipo.
- **Fiabilidad**: Aborda los riesgos mostrando servicios con despliegues recientes, tasas de error crecientes, incidencias abiertas o monitores que fallan.
- **Rendimiento**: Compara la latencia, el tráfico, la tasa de errores y Apdex por entorno.
- **Seguridad**: Encuentra bibliotecas vulnerables y ataques en tiempo real desde una única lista para reforzar la postura de seguridad.
- **Costos**: Rastrea los costos de AWS vinculados a cambios de código e infraestructura para controlar el gasto en la nube.
- **Entrega de software**: Monitoriza el estado de pipeline de CI, violaciones de análisis estático, y métricas de DORA para acortar los ciclos de entrega.

Consulta la [Documentación de casos de uso][4] para saber cómo Teams utiliza Software Catalog de Datadog para centralizar conocimientos, agilizar procesos, mejorar la eficacia operativa y mucho más.

## Lo que aparece en Software Catalog

Software Catalog incluye una entidad cuando:
- Datadog [la detecta por telemetría][5],
- Tú [la declaras en una definición de entidad][6] o
- Puedes [importarla desde una source (fuente) de terceros][7] como Backstage o ServiceNow.

[Más información][3] sobre los tipos de entidad y cómo configurarlos según tus necesidades.

**Nota**:
- Utiliza el tipo de entidad para un filtrado más preciso que el filtro heredado `type` (del atributo `span (tramo).type` ). Por ejemplo, utiliza la faceta `datastore type` para filtrar por tecnología de almacén de datos específica.
- Los resúmenes y las estadísticas de servicios y recursos de spans (tramos) se conservan durante un máximo de 30 días. Para un análisis más profundo de las métricas de traces (trazas) de APM, utiliza el Explorer de métricas. [Más información sobre la conservación de datos en APM][2].

{{< site-region region="gov" >}}
### Tipos de servicio

Cada servicio monitorizado se asocia a un tipo. Datadog determina automáticamente el tipo basándose en el atributo `span (tramo).type` adjunto a los datos de spans (tramos) entrantes. El tipo especifica el nombre de la aplicación o marco con el que el Datadog Agent se está integrando.

Por ejemplo, si utilizas la integración de Flask oficial, el `Type` aparece como "Web". Si estás monitorizando una aplicación personalizada, el `Type` aparece como "Custom" (Personalizado).

El tipo de servicio puede ser uno de los siguientes:

*  Caché
*  Personalizado
*  BASE DE DATOS
*  Función serverless
*  Web

Algunas integraciones tienen alias de ciertos tipos. Por ejemplo, Postgres, MySQL y Cassandra se asignan al tipo "DB". Las integraciones de Redis y Memcache se asignan al tipo "Cache".

{{< /site-region >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/data_security/data_retention_periods/
[3]: /es/internal_developer_portal/software_catalog/entity_model/entity_types
[4]: /es/internal_developer_portal/use_cases
[5]: /es/internal_developer_portal/software_catalog/set_up/discover_entities
[6]: /es/internal_developer_portal/software_catalog/set_up/create_entities
[7]: /es/internal_developer_portal/software_catalog/set_up/import_entities