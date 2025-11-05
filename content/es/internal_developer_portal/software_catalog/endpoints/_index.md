---
aliases:
- /es/tracing/api_catalog/get_started
- /es/tracing/api_catalog/
- /es/api_catalog/
- /es/api_catalog/endpoint_discovery/
- /es/software_catalog/endpoints/discover_endpoints
- /es/service_catalog/endpoints/discover_endpoints
- /es/service_catalog/endpoints/
- /es/software_catalog/endpoints
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gestiona el rendimiento, la seguridad y la propiedad de las API con el Catálogo
    de API de Datadog
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software de Datadog
- link: /synthetics/api_tests/http_tests/
  tag: Documentación
  text: Tests de API Synthetic
- link: /security/application_security/how-it-works/#api-security
  tag: Documentación
  text: Seguridad de la API de la AAP
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Mitigar los principales riesgos para la seguridad de las API
title: Observabilidad del punto final
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
 Observabilidad de endpoint no es compatible con el <a href="/getting_started/site">sitioDatadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Lista de endpoints en el Catálogo de software, que muestra información de rendimiento de cada endpoint" style="width:100%;" >}}

## Información general

La [Lista de endpoints][12] de Software Catalog consolida todo lo que necesitas saber sobre tus endpoints de API. Proporciona una visión completa del rendimiento, la fiabilidad y la propiedad de todas tus API, ya sea que sirvan a equipos internos o a usuarios externos. Esto te ayuda a ti y a tu equipos a monitorizar eficazmente las funciones de misión crítica basadas en API y a garantizar que satisfagan las expectativas de rendimiento.

## Casos prácticos

La lista de endpoints combina datos de todo Datadog para proporcionar workflows (UI) / procesos basados en opiniones. Puedes hacer lo siguiente:

- **Descubrir API automáticamente**: Lleva un inventario completo de tus API públicas, privadas y de socios, organizadas por endpoint.
- **Mostrar datos correlacionados**: Ve desde los endpoints a las traces (trazas), logs y métricas de diferentes sources (fuentes) de Datadog.
- **Identificar problemas de rendimiento**: Utiliza métricas como *Última vista*, *Solicitudes*, *Latencia* y *Errores* para rastrear el estado de la API.
- **Recibir alertas**: Define las expectativas de rendimiento y los umbrales que activan las alertas.
- **Asignar información de propiedad**: Configura la información de equipos, de guardia y de canal de comunicación a cada endpoint para saber a quién contactar cuando se produzcan errores.
- **Garantizar una cobertura completa**: Sigue el estado de los monitores de API, los tests sintéticos y las señales de seguridad, con enlaces directos a información detallada para las investigaciones.

## Empezando

Tus endpoints aparecen automáticamente en la lista de endpoints si utilizas [APM de Datadog][8] para monitorizar servicios HTTP.

### Explorar los endpoints

Examina y consulte las propiedades y métricas relacionadas con tus endpoints.

Lee [Explorar endpoints][11] para obtener más información.

### Monitorizar endpoints

Gestiona y monitoriza tus API y endpoints para:

- Encontrar y corregir los endpoints de bajo rendimiento.
- Rastrear su fiabilidad con respecto a las normas y objetivos.
- Estar atento a las anomalías.
- Investigar los errores.
- Garantizar la cobertura de test.
- Cerrar las brechas de seguridad.

Lee [Monitorizar endpoints][7] para obtener más información.

### Asignación de propietarios a endpoints

Añade información de propiedad a los endpoints para agilizar las investigaciones y la comunicación entre equipos.

Lee [Asignación de propietarios][6] para obtener más información.

### Añadir endpoints a la lista

Asigna endpoints detectados automáticamente a grupos de API para rastrear el uso, definir la propiedad y configurar políticas de monitorización desde una ubicación centralizada. Como alternativa, carga un archivo OpenAPI o Swagger para desbloquear todas las capacidades de la lista de endpoints.

Lee [Añadir entradas][9] para obtener más información.

### Añadir metadatos a las API

Añade metadatos a las API a través de la interfaz de usuario o la API de Datadog o utiliza pipelines automatizados a través de la integración con GitHub o Terraform.

Lee [Añadir metadatos a las API][10] para obtener más información.

## Terminología clave

| Término         | Definición                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | Conjunto de protocolos y herramientas que permiten la comunicación entre dos aplicaciones.                                                                                                                                                      |
| Endpoint de la API | La dirección (URL) de un recurso de un servidor o servicio que implementa las reglas definidas en la API, a menudo a través de una interfaz HTTP o RESTful. El endpoint de la API procesa las solicitudes y proporciona las respuestas correspondientes. |
| API públicas  | Endpoints de la API orientados al cliente que son accesibles desde Internet.                                                                                                                                                          |
| API privadas | También llamadas *API internas*. Están diseñadas exclusivamente para uso interno dentro de una organización y se utilizan principalmente para la comunicación de servicios backend. Son el tipo más común de API.                                                   |
| API de socios | También llamadas *API de terceros*. Se trata de endpoints públicos proporcionados por otra organización (por ejemplo, Stripe, Google o Facebook) que tu organización utiliza para prestar sus servicios.                                             |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /es/api_catalog/explore_apis/
[6]: /es/software_catalog/manage
[7]: /es/internal_developer_portal/software_catalog/endpoints/monitor_endpoints/
[8]: /es/tracing/trace_collection/
[9]: /es/software_catalog/customize/create_entries
[10]: /es/software_catalog/service_definitions/#add-metadata-to-endpoints
[11]: /es/internal_developer_portal/software_catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint