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
- /es/internal_developer_portal/software_catalog/endpoints
description: Haga un seguimiento y administre puntos de conexión de API HTTP con métricas
  de rendimiento, seguimiento de propiedad, alertas y cobertura de prueba desde una
  sola vista.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Administre el rendimiento, Security y la propiedad de la API con Datadog API
    Catalog
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catálogo de Datadog
- link: /synthetics/api_tests/http_tests/
  tag: Documentación
  text: Pruebas Synthetic de API
- link: /security/application_security/how-it-works/#api-security
  tag: Documentación
  text: AAP API Security
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Mitigue los riesgos principales para la API Security
title: Observabilidad de puntos de conexión
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
 La observabilidad de puntos de conexión no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Lista de puntos de conexión en el Catálogo, que muestra información relacionada con el rendimiento para cada punto de conexión." style="width:100%;" >}}

## Descripción general {#overview}

La [lista de puntos de conexión][12] del Catálogo consolida todo lo que necesita saber sobre sus puntos de conexión de API. Proporciona una vista integral del rendimiento, la confiabilidad y la propiedad en todas sus API, ya sea que sirvan a equipos internos o a usuarios externos. Esto le ayuda a usted y a sus equipos a hacer un seguimiento eficaz de las funciones críticas impulsadas por API y a garantizar que cumplan con las expectativas de rendimiento.

## Casos de uso {#use-cases}

La lista de puntos de conexión combina datos de todo Datadog para proporcionar flujos de trabajo especializados. Puede hacer lo siguiente:

- **Descubra APIs automáticamente**: Mantenga un inventario completo de sus API públicas, privadas y de socios, organizadas por punto de conexión.
- **Muestre datos correlacionados**: Navegue desde los puntos de conexión hasta trazas, registros y métricas de diferentes fuentes de Datadog.
- **Identifique problemas de rendimiento**: Utilice métricas como *Última vez visto*, *Solicitudes*, *Latencia* y *Errores* para hacer un seguimiento del estado de la API.
- **Reciba alertas**: Defina expectativas de rendimiento y umbrales que activen alertas.
- **Asigne información de propiedad**: Establezca información de equipos, guardia y canales de comunicación para cada punto de conexión para que sepa a quién contactar cuando ocurran errores.
- **Garantice una cobertura integral**: Realice un seguimiento del estado de los monitores de API, las pruebas Synthetic y las señales de seguridad, con enlaces directos a información detallada para investigaciones.

## Primeros pasos {#getting-started}

Sus puntos de conexión se completan automáticamente en la lista de puntos de conexión si utiliza [Datadog APM][8] para hacer un seguimiento de servicios HTTP.

### Exploración de puntos de conexión {#exploring-endpoints}

Explore y consulte las propiedades y métricas relacionadas con sus puntos de conexión.

Lea [Exploring Endpoints][11] para obtener más información.

### Monitoreo de puntos de conexión {#monitoring-endpoints}

Administre y haga un seguimiento de sus API y puntos de conexión para:

- Encuentre y corrija puntos de conexión con bajo rendimiento.
- Haga un seguimiento de su confiabilidad frente a estándares y objetivos.
- Detecte anomalías.
- Investigue errores.
- Garantice la cobertura de prueba.
- Cierre brechas de Security.

Lea [Monitoring Endpoints][7] para obtener más información.

### Asignación de propietarios a los puntos de conexión {#assigning-owners-to-endpoints}

Agregue información de propiedad a los puntos de conexión para agilizar las investigaciones y la comunicación del equipo.

Lea [Assigning Owners][6] para obtener más información.

### Adición de puntos de conexión a la lista {#adding-endpoints-to-the-list}

Asigne puntos de conexión detectados automáticamente a grupos de API para hacer un seguimiento del uso, definir la propiedad y configurar políticas de monitoreo desde una ubicación centralizada. Alternativamente, cargue un archivo OpenAPI o Swagger para desbloquear todas las capacidades de la lista de puntos de conexión.

Lea [Adding Entries][9] para obtener más información.

### Adición de metadatos a las API {#adding-metadata-to-apis}

Agregue metadatos a las API a través de la interfaz de usuario o la API de Datadog, o utilice canalizaciones automatizadas a través de la integración de GitHub, la integración de GitLab o Terraform.

Lea [Adición de metadatos a las API][10] para obtener más información.

## Términos clave {#key-terminology}

| Término         | Definición                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | Un conjunto de protocolos y herramientas que permite que dos aplicaciones se comuniquen.                                                                                                                                                      |
| Punto de conexión de API | La dirección (URL) de un recurso de un servidor o servicio que implementa las reglas definidas en la API, a menudo a través de una interfaz HTTP o RESTful. El punto de conexión de la API procesa las solicitudes y proporciona las respuestas correspondientes. |
| API públicas  | Puntos de conexión de API orientados al cliente que son accesibles desde internet.                                                                                                                                                          |
| API privadas | También llamadas *API internas*. Estas están diseñadas exclusivamente para uso interno dentro de una organización y se utilizan principalmente para la comunicación de servicios de backend. Estos son los tipos de API más comunes.                                                   |
| API de socios | También llamadas *API de terceros*. Estos son puntos de conexión públicos proporcionados por otra organización (por ejemplo, Stripe, Google o Facebook) que su organización utiliza para proporcionar sus servicios.                                             |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /es/api_catalog/explore_apis/
[6]: /es/internal_developer_portal/catalog/set_up/
[7]: /es/internal_developer_portal/catalog/endpoints/monitor_endpoints/
[8]: /es/tracing/trace_collection/
[9]: /es/internal_developer_portal/catalog/set_up/create_entities/
[10]: /es/internal_developer_portal/catalog/entity_model/
[11]: /es/internal_developer_portal/catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint