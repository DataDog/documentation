---
aliases:
- /es/service_catalog/manage_entries/
- /es/service_catalog/enrich_default_catalog/
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones de servicio con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Más información sobre la API de definición de servicio
- link: /integrations/github
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importar archivos YAML de Backstage a Datadog
title: Personalizar Service Catalog
---

Puedes personalizar la experiencia de inicio de tu equipo de ingeniería en Service Catalog. Developer Home es una nueva experiencia personalizada de dashboard en fase beta, diseñada para ayudar a los desarrolladores a acceder a tareas prioritarias, solicitudes pull, alertas e información en un solo lugar.

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" header="Suscríbete para obtener la fase beta privada de nuestra experiencia Developer Homepage." >}}
{{< /callout >}}

## Detección automática

Datadog Service Catalog se rellena previamente con entradas detectadas a través de [APM][2], Autodiscovery basado en eBPF con [Universal Service Monitoring][1] y aplicaciones RUM.

Con APM, Datadog puede detectar automáticamente las dependencias para un servicio instrumentado, como una base de datos, una cola o una dependencia de terceros, incluso si esa dependencia aún no se ha instrumentado. Estas dependencias no instrumentadas se categorizan como *servicios* independientes. Datadog cambió nombres de servicio de tramos (spans) de cliente (span.kind:client) para representar dependencias de tus servicios instrumentados. Por ejemplo, un tramo que representa una llamada de cliente de un servicio auth-dotnet a una base de datos PostgreSQL se etiquetaría con service:auth-dotnet-postgres. 

Si estás utilizando APM y deseas eliminar el nombre automático de *servicios* de tu Service Catalog y Service Map (mapa de servicios), puedes optar por la nueva [experiencia de entidades inferidas][7], que te permite filtrar las entradas del Service Catalog por tipo de entidad, como base de datos, cola o dependencias de terceros. Opcionalmente, puedes [eliminar][8] cualquier [anulación de servicio][9] como service:my-service-http-client de tu catálogo o mapa.

Para más información sobre la detección de endpoints, consulta [Detección de endpoints en APM][11].

## Mejorar la autodetección de servicios con metadatos 
Para especificar la llamada, el código fuente o la documentación de tus servicios puedes añadir metadatos a cualquier servicio utilizando la interfaz de usuario, las API u [otro tipo de automatización][10]. 2.2 es la versión recomendada. Para probar funciones experimentales como la asignación de relaciones mejorada y la localización de código preciso, inscríbete en el programa beta de [schema 3.0][3] [enviando una solicitud][4].

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="Suscríbete para la vista previa de metadata schema v3.0!" >}}
{{< /callout >}}

### Service Definition Schema (v2.2) (Recomendado)

Service Definition Schema es una estructura que contiene información básica sobre un servicio. Consulta el [esquema completo en GitHub][5].

#### Ejemplo
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

## Buscar acciones de Service Catalog
Para explorar el conjunto completo de acciones específicamente relacionadas con Service Catalog, navega hasta [Datadog Action Catalog][6]. Filtra las acciones que necesites:

1. **Acceso al Action Catalog**: busca el Action Catalog dentro de tu entorno de Datadog Workflow Automation.
2. **Buscar funcionalidad**: utiliza la barra de búsqueda para buscar palabras clave como "Service Catalog" o términos más específicos relacionados con las acciones deseadas (por ejemplo, "obtener dependencias de servicio").

### Acciones disponibles en Service Catalog

A continuación, encontrarás una lista completa de acciones disponibles para Service Catalog en Datadog Workflow Automation. Ten en cuenta que esta lista puede modificarse a medida que se añadan nuevas acciones.

- **Recuperar información de servicio**
  - "Obtener definición de servicio" para un solo servicio
  - "Lista de definiciones de servicio" para obtener todas las definiciones de Datadog Service Catalog
  - "Obtener dependencias de servicio" para obtener las dependencias de servicios ascendentes y descendentes
- **Triaje de incidentes**
  - "Llamar al servicio PagerDuty de guardia"
  - Cuando se integra con otras acciones, puedes desencadenar flujos de trabajo basados en eventos críticos (por ejemplo, ejecutar runbooks). 

## Cambiar el color del servicio
El color del servicio se utiliza en las visualizaciones de trazas. Haz clic en el icono de tipo de servicio para cambiarlo.

{{< img src="tracing/service_catalog/change_service_color.png" alt="Hacer clic en el icono de servicio para seleccionar un color de icono diferente." style="width:80%;" >}}

## Actualizar el tipo y el idioma del servicio
Con [Service Catalog metadata schema 2.2][5], puedes especificar el tipo y el idioma para los servicios definidos por el usuario o sobrescribir el tipo e idioma autodetectados para los servicios instrumentados. Etiqueta correctamente el tipo y el idioma del servicio para ayudar a que otros equipos comprendan mejor lo que tus servicios hacen y cómo interactuar con ellos. 


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/universal_service_monitoring/
[2]: /es/tracing/
[3]: /es/service_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /es/actions/actions_catalog/
[7]: /es/tracing/services/inferred_services
[8]: /es/tracing/guide/service_overrides/#remove-service-overrides
[9]: /es/tracing/guide/service_overrides/
[10]: /es/service_catalog/service_definitions/#add-metadata-with-automation
[11]: /es/service_catalog/endpoints/discover_endpoints/
[12]: /es/integrations/github/