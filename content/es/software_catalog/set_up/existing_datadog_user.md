---
aliases:
- /es/software_catalog/import_entries_dd/
- /es/software_catalog/enrich_default_catalog/import_entries_dd
- /es/service_catalog/import_entries_dd/
- /es/service_catalog/enrich_default_catalog/import_entries_dd
- /es/service_catalog/customize/import_entries_dd
- /es/software_catalog/customize/import_entries_dd
further_reading:
- link: /tracing/software_catalog/setup/
  tag: Documentación
  text: Configuración de Software Catalog
title: Detectar componentes en Software Catalog
---

Aprende cómo Software Catalog detecta servicios desde Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), métricas y logs de infraestructura.

## Detección automática con APM, USM y RUM

Datadog Software Catalog está precargado con entradas detectadas a través de [APM][5], autodetección basada en eBPF con las aplicaciones [Universal Service Monitoring][6] y RUM.

Todos los componentes detectados automáticamente aparecen en el selector de componentes en Software Catalog.

APM y USM detectan automáticamente los siguientes tipos de componentes: `service`,`datastore`, `queue`, `external providers`, `inferred services` y `endpoints`. Los SDK de APM identifican dependencias de servicios instrumentados y las clasifican como bases de datos, colas o API de terceros, incluso si esas dependencias no se instrumentan directamente. La instrumentación personalizada puede afectar la manera en que se autodetectan los componentes y en que se asigna la `service tag`. Para obtener más información, consulta [Servicios inferidos de APM][12].

RUM se encarga de detectar los componentes de `frontend apps`.

**Gestión de servicios nombrados en forma automática:**
- Puedes optar por [entidades inferidas][7] para filtrar las entidades por tipo (base de datos, cola, terceros).
- Opcionalmente, puedes [eliminar sustituciones de servicios][8] como `service:my-service-http-client` de tu catálogo o mapa.

Para obtener más información sobre la detección de endpoints, consulta [Detección de endpoints en APM][10].

## Importa componentes de infraestructura y logs 

Puedes importar servicios desde otra telemetría de Datadog que contenga la [tag (etiqueta)][2] `DD_SERVICE` to poblar el Software Catalog. Para detectar componentes `kind:service` a través de métricas o logs de la infraestructura de Datadog, ve a la [pestaña **Import Entries** (Importar entradas)][11] de Software Catalog. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Pestaña Importar entradas en la sección de configuración de Software Catalog" style="width:90%;" >}}

Tras la importación, las entradas aparecen en la pestaña **Explore** (Explorar). Las entradas pueden caducar a menos que añadas metadatos, como el propietario o los contactos, mediante [el uso de la API][3] o la [integración de GitHub][4].

Para eliminar los servicios importados de la vista predeterminada **Explore** (Explorar), haz clic en **Eliminar servicios importados anteriormente** en la pestaña [**Import Entries** (Importar entradas)][11]. Esto elimina todos los servicios que no tienen metadatos o no tienen telemetría de APM, Universal Service Monitoring (USM) o Real User Monitoring (RUM).

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirmar la eliminación de servicios importados anteriormente en la sección de configuración del Software Catalog" style="width:90%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/software/settings/get-started
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/software_catalog/service_definition_api/
[4]: /es/integrations/github/
[5]: /es/tracing/
[6]: /es/universal_service_monitoring/
[7]: /es/tracing/services/inferred_services
[8]: /es/tracing/guide/service_overrides/#remove-service-overrides
[9]: /es/tracing/guide/service_overrides/
[10]: /es/software_catalog/endpoints/
[11]: https://app.datadoghq.com/software/settings/get-started?currentTab=import
[12]: /es/tracing/services/inferred_services