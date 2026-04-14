---
aliases:
- /es/software_catalog/manage_entries/
- /es/software_catalog/enrich_default_catalog/
- /es/service_catalog/manage_entries/
- /es/service_catalog/enrich_default_catalog/
- /es/service_catalog/customize/
- /es/software_catalog/best-practices
- /es/software_catalog/guides/best-practices
- /es/service_catalog/guides/best-practices
- /es/service_catalog/use_cases/best_practices
- /es/software_catalog/use_cases/best_practices
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
title: Personalizar Software Catalog
---

Personaliza la experiencia de tu equipo de ingenieros en Software Catalog con las siguientes funciones.

## Crear una página de inicio personalizada con Developer Homepage (en vista previa)

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" >}}
Developer Homepage es una experiencia personalizada de dashboard que permite a los desarrolladores acceder a tareas priorizadas, solicitudes pull, alertas e información, todo en un solo lugar. <strong>Solicita acceso</strong> para participar.
{{< /callout >}}


## Mejorar con metadatos los servicios autodetectados 
Para especificar la disponibilidad, el código fuente o la documentación de tus servicios, puedes añadir metadatos a cualquier servicio existente mediante la interfaz de usuario, las APIs u [otro tipo de automatización][10]. v3 es la versión recomendada.

### Entity Definition Schema (v3) (Recomendado)
Entity Definition Schema es una estructura que contiene información básica sobre un componente de software. 

Para más detalles, consulta [Definition Schema v3.0][3].

### Service Definition Schema (v2.2)

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

## Buscar acciones de Software Catalog
Para explorar el conjunto completo de acciones específicamente relacionadas con Software Catalog, navega hasta [Datadog Action Catalog][6]. Filtra las acciones que necesites:

1. **Acceso a Action Catalog**: busca Action Catalog dentro de tu entorno de Datadog Workflow Automation.
2. **Buscar funcionalidad**: utiliza la barra de búsqueda para buscar palabras clave como "Software Catalog" o términos más específicos relacionados con las acciones deseadas (por ejemplo, "obtener dependencias de servicio").

### Acciones disponibles en el catálogo de software

A continuación, encontrarás una lista completa de las acciones disponibles para Software Catalog en Datadog Workflow Automation. Ten en cuenta que esta lista puede modificarse a medida que se añadan nuevas acciones.

- **Retrieve Service Information** (Recuperar información de servicio)
  - "Get service definition" (Obtener definición de servicio) para un solo servicio
  - "List service definitions" (Enumerar definiciones de servicio) para obtener todas las definiciones del catálogo de software de Datadog 
  - "Get service dependencies" (Obtener las dependencias de servicio) para consultar los servicios ascendentes y descendentes
- **Incident Triage** (Triaje de incidencias)
  - "Get service PagerDuty on call" (Llamar al servicio PagerDuty de guardia)
  - Cuando se integra con otras acciones, puedes desencadenar flujos de trabajo basados en eventos críticos (por ejemplo, ejecutar runbooks). 

## Cambiar el color de servicio
El color de servicio se utiliza en las visualizaciones de trazas. Haz clic en el icono de tipo de servicio para cambiarlo.

{{< img src="tracing/software_catalog/change_service_color.png" alt="Haz clic en el icono de servicio para seleccionar un color de icono diferente." style="width:80%;" >}}

## Actualizar el tipo y el lenguaje del servicio 
Con el [Esquema de metadatos de Software Catalog 2.2][5], puedes especificar el tipo y el lenguaje de los servicios definidos por el usuario o sobrescribir el tipo y el lenguaje autodetectados de los servicios instrumentados. Etiqueta correctamente el tipo y el lenguaje de servicio para ayudar a que otros equipos comprendan mejor lo que tus servicios hacen y cómo interactuar con ellos.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/universal_service_monitoring/
[2]: /es/tracing/
[3]: /es/software_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /es/actions/actions_catalog/
[7]: /es/tracing/services/inferred_services
[8]: /es/tracing/guide/service_overrides/#remove-service-overrides
[9]: /es/tracing/guide/service_overrides/
[10]: /es/software_catalog/service_definitions/#add-metadata-with-automation
[11]: /es/software_catalog/endpoints/discover_endpoints/
[12]: /es/integrations/github/