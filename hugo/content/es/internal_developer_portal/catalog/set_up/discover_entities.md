---
aliases:
- /es/software_catalog/set_up/existing_datadog_user
- /es/software_catalog/import_entries_dd/
- /es/software_catalog/enrich_default_catalog/import_entries_dd
- /es/service_catalog/import_entries_dd/
- /es/service_catalog/enrich_default_catalog/import_entries_dd
- /es/service_catalog/customize/import_entries_dd
- /es/software_catalog/customize/import_entries_dd
- /es/internal_developer_portal/software_catalog/set_up/discover_entities
description: Aprenda cómo Catalog descubre automáticamente entidades de APM, USM y
  RUM, y cómo importar entidades adicionales de métricas de infraestructura y registros
  de infraestructura.
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Canalizaciones de procesamiento de registros
title: Descubrir entidades
---
## Descripción general {#overview}

Catalog descubre automáticamente entidades de Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM) y Real User Monitoring (RUM). También puede configurarlo para importar entidades de métricas de infraestructura y registros de infraestructura.

## Descubrimiento automático con APM, USM y RUM {#automatic-discovery-with-apm-usm-and-rum}

Datadog Catalog viene precargado con entradas detectadas a través de [APM][1], autodescubrimiento basado en eBPF con [Universal Service Monitoring][2] y aplicaciones RUM.

Todas las entidades detectadas automáticamente aparecen en el Selector de Componentes dentro de Catalog.

APM y USM detectan automáticamente los siguientes tipos de entidades: `service`, `datastore`, `queue`, `external providers`, `inferred services` y `endpoints`. Los SDK de Datadog identifican las dependencias de los servicios instrumentados y las clasifican como bases de datos, colas o APIs de terceros, incluso si esas dependencias no están instrumentadas directamente. La instrumentación personalizada puede afectar cómo se descubren las entidades y cómo se asigna el `service tag`. Para obtener más información, consulte [APM Inferred Services][3].

RUM es responsable de descubrir entidades de `frontend apps`.

Para obtener información sobre cómo descubrir puntos de conexión, consulte [Discovering Endpoints from APM][5].

**Nota**: Las [métricas de rendimiento][6] de una entidad están vinculadas a sus [operaciones principales][7]. Si un servicio es detectado solo por USM, la visualización de rendimiento muestra [métricas de USM][9]; si una entidad es detectada solo por APM, o por ambos APM y USM, la visualización de rendimiento muestra [métricas de traza][8] de APM.

### Administración de servicios nombrados automáticamente {#managing-automatically-named-services}

Para ajustar cómo aparecen las entidades inferidas en Catalog, usted puede:

- [Crear una regla de cambio de nombre][18] para identificar una entidad mediante un nombre personalizado.
- [Filtrar entidades][3] por tipo (base de datos, cola, terceros).
- [Eliminar anulaciones de servicio][4] como `service:my-service-http-client` de Catalog o de mapa.

### Requisitos de correlación para APM {#correlation-requirements-for-apm}

Para garantizar una correlación automática adecuada entre APM y Catalog, siga estas prácticas recomendadas:

- Asegúrese de que sus versiones del SDK de Datadog y de Datadog Agent sean compatibles con [entidades inferidas][15].
- Evite [anulaciones de servicio][16] arbitrarias y utilice [entidades inferidas][15] en su lugar. 
  - Las anulaciones de servicio arbitrarias pueden hacer que la correlación no sea confiable y saturar su catálogo. También hacen que el Catálogo sea difícil de usar para aquellos que no están familiarizados con los nombres de anulación.
- [Cambie el nombre de las entidades inferidas][14], como almacenes de datos y colas, para que coincidan con las convenciones de nomenclatura de su equipo.
- Utilice [Unified Service Tagging][17] para garantizar que los nombres de servicio, los entornos y las versiones coincidan en las definiciones de APM, infraestructura y Catalog.
  - En Datadog APM, un servicio es un identificador utilizado para agrupar trazas y agregar métricas, no necesariamente un servicio lógico. Defina qué constituye un "servicio" para su organización (por ejemplo, un espacio de nombres de Kubernetes, una implementación o un pod individual) y aplique esta definición de manera consistente en todas las fuentes de telemetría. 


## Importar entidades desde infraestructura y registros {#import-entities-from-infrastructure-and-logs}

Puede importar servicios de otra telemetría de Datadog que contenga la `DD_SERVICE` [etiqueta][10] para completar Catalog. Para descubrir `kind:service` entidades a través de métricas de infraestructura de Datadog o registros de infraestructura, navegue a la [**pestaña Importar entradas**][11] de Catalog. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Pestaña Importar entradas en la sección de configuración de Catalog" style="width:90%;" >}}

Después de importar, las entradas aparecen en la pestaña **Explorar**. Las entradas pueden caducar a menos que agregue metadatos, como el propietario o los contactos, [usando la API][12], la [integración de GitHub][13] o la [integración de GitLab][14].

Para eliminar servicios importados de la vista predeterminada **Explorar**, haga clic en **Borrar servicios importados anteriormente** en la [**pestaña Importar entradas**][11]. Esto elimina todos los servicios que no tienen metadatos o que no tienen telemetría de APM, Universal Service Monitoring (USM) o Real User Monitoring (RUM).

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirme la eliminación de los servicios importados anteriormente en la sección de configuración de Catalog." style="width:90%;" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/universal_service_monitoring/
[3]: /es/tracing/services/inferred_services/
[4]: /es/tracing/guide/service_overrides/
[5]: /es/internal_developer_portal/catalog/endpoints/
[6]: https://app.datadoghq.com/software?lens=performance
[7]: /es/tracing/guide/configuring-primary-operation/
[8]: /es/tracing/metrics/metrics_namespace/
[9]: /es/universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/software/settings/get-started
[12]: /es/internal_developer_portal/catalog/entity_model/
[13]: /es/integrations/github/
[14]: /es/integrations/gitlab-source-code/
[14]: /es/tracing/services/renaming_rules/#step-3-name-your-rule-and-review
[15]: /es/tracing/services/inferred_services/?tab=agentv7600#set-up-inferred-services
[16]: /es/tracing/guide/service_overrides/#how-service-overrides-are-set
[17]: /es/getting_started/tagging/unified_service_tagging/
[18]: /es/tracing/services/renaming_rules/