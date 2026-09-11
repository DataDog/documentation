---
aliases:
- /es/tracing/api_catalog/get_started
- /es/tracing/api_catalog/
- /es/api_catalog/
- /es/api_catalog/endpoint_discovery/
- /es/software_catalog/endpoints/discover_endpoints
- /es/service_catalog/endpoints/discover_endpoints
- /es/service_catalog/endpoints/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gestionar el rendimiento, la seguridad y la propiedad de las API con el Catálogo
    de API de Datadog
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software de Datadog
- link: /synthetics/api_tests/http_tests/
  tag: Documentación
  text: Tests de API Synthetic
- link: /security/application_security/how-it-works/#api-security
  tag: Documentación
  text: AAP API Security
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Mitigar los principales riesgos para la seguridad de las API
title: Observabilidad de endpoints
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
 La observabilidad de endpoints no es compatible con el <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Lista de endpoints en el Catálogo de software, que muestra información de rendimiento de cada endpoint" style="width:100%;" >}}

## Información general

La [lista de endpoints][12] del Catálogo de software consolida todo lo que necesitas saber sobre tus endpoints de API. Proporciona una visión completa del rendimiento, la fiabilidad y la propiedad de todas tus API, ya sea que sirvan a equipos internos o a usuarios externos. Esto te ayuda a ti y a tus equipos a monitorizar eficazmente las funciones de misión crítica basadas en API y a garantizar que cumplen las expectativas de rendimiento.

## Casos prácticos

La lista de endpoints combina datos de Datadog para proporcionar flujos de trabajo basados en opiniones. Puedes hacer lo siguiente:

- **Detectar las API automáticamente**: Mantén un inventario completo de tus API públicas, privadas y de socios, organizadas por endpoint.
- **Generar datos correlacionados**: Navega desde los endpoints a las trazas (traces), los logs y las métricas de diferentes fuentes de Datadog.
- **Identificar problemas de rendimiento**: Utiliza métricas como *Visto por última vez*, *Solicitudes*, *Latencia* y *Errores* para realizar un seguimiento del estado de la API.
- **Recibir alertas**: Define expectativas de rendimiento y umbrales para activar alertas.
- **Asignar información de propiedad**: Configura equipos, guardias e información de canales de comunicación para cada endpoint, para saber a quién contactar cuando se producen errores.
- **Garantizar una cobertura completa**: Realiza un seguimiento de los monitores de API, los tests Synthetic y las señales de seguridad, con enlaces directos a información detallada para realizar investigaciones.

## Empezando

Tus endpoints se rellenan automáticamente en la lista de endpoints si utilizas [Datadog APM][8] para monitorizar servicios HTTP.

### Explorar endpoints

Examina y consulta propiedades y métricas relacionadas con tus endpoints.

Para obtener más información, consulta [Exploración de endpoints][11].

### Monitorizar endpoints

Gestiona y monitoriza tus API y tus endpoints para:

- Encontrar y corregir endpoints de bajo rendimiento.
- Realizar un seguimiento de su fiabilidad en relación con las normas y los objetivos.
- Detectar anomalías.
- Investigar errores.
- Garantizar la cobertura de los tests.
- Reducir las brechas de seguridad.

Para obtener más información, consulta [Monitorizar endpoints][7].

### Asignación de propietarios a endpoints

Añade información de propiedad a los endpoints para agilizar las investigaciones y la comunicación entre equipos.

Para obtener más información, consulta [Asignación de propietarios][6].

### Añadir endpoints a la lista

Asigna endpoints detectados automáticamente a grupos de API para realizar un seguimiento del uso, definir la propiedad y configurar políticas de monitorización desde una localización centralizada. Como alternativa, carga un archivo OpenAPI o Swagger para desbloquear todas las capacidades de la lista de endpoints.

Para obtener más información, consulta [Añadir entradas][9].

### Añadir metadatos a las API

Añade metadatos a las API a través de la interfaz de usuario o la API de Datadog, o utiliza pipelines automatizados a través de la integración GitHub o Terraform.

Para obtener más información, consulta [Añadir metadatos a las API][10].

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
[7]: /es/software_catalog/endpoints/monitor_endpoints/
[8]: /es/tracing/trace_collection/
[9]: /es/software_catalog/customize/create_entries
[10]: /es/software_catalog/service_definitions/#add-metadata-to-endpoints
[11]: /es/software_catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint