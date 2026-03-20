---
aliases:
- /es/software_catalog/service_definitions/
- /es/software_catalog/adding_metadata
- /es/tracing/software_catalog/service_metadata_structure
- /es/tracing/software_catalog/adding_metadata
- /es/software_catalog/add_metadata
- /es/service_catalog/adding_metadata
- /es/tracing/service_catalog/service_metadata_structure
- /es/tracing/service_catalog/adding_metadata
- /es/service_catalog/add_metadata
- /es/service_catalog/service_definitions
- /es/service_catalog/service_definitions/v2-0
- /es/software_catalog/service_definitions/v2-0
- /es/service_catalog/service_definitions/v2-1
- /es/software_catalog/service_definitions/v2-1
- /es/service_catalog/service_definitions/v2-2
- /es/software_catalog/service_definitions/v2-2
- /es/service_catalog/service_definitions/v3-0
- /es/software_catalog/service_definitions/v3-0
- /es/software_catalog/apis
- /es/tracing/faq/service_definition_api/
- /es/tracing/software_catalog/service_definition_api
- /es/software_catalog/service_definition_api
- /es/tracing/service_catalog/service_definition_api
- /es/service_catalog/service_definition_api
- /es/tracing/api_catalog/api_catalog_api/
- /es/api_catalog/api_catalog_api
- /es/service_catalog/apis
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Más información sobre la API de definición
- link: /integrations/github
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importar archivos YAML de Backstage a Datadog
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: Blog
  text: Mejorar la experiencia y la colaboración de los desarrolladores con el esquema
    del Catálogo de servicios versión 3.0
title: Entity Model
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">El esquema Entity Model v3.0 no está disponible en el sitio seleccionado en este momento.</div>

{{< /site-region >}}

## Información general

Software Catalog utiliza esquemas de definición para almacenar y mostrar metadatos relevantes sobre tus servicios. Los esquemas incorporan reglas de validación para garantizar que sólo se aceptan valores válidos. Puedes ver las advertencias en la pestaña **Definición** del panel lateral de Software Catalog para cualquier servicio seleccionado. 

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" btn_hidden="true" header="false" >}}
<a href="https://forms.gle/fwzarcSww6By7tn39">Comparte tus comentarios</a> sobre las nuevas y futuras funciones de Software Catalog.
{{< /callout >}}

## Versiones compatibles

Datadog admite cuatro versiones del esquema de definición:

- **v3.0**: Última versión con modelo de datos ampliado, compatibilidad con múltiples propietarios, declaración manual de dependencias y funciones mejoradas para infraestructuras complejas.
- **v2.2**: Admite anotaciones de usuario para metadatos personalizados y asociaciones CI pipeline para vincular servicios con sus procesos de compilación.
- **v2.1**: Admite agrupaciones de servicios para una mejor organización e introduce campos adicionales para descripciones de servicios más completas.
- **v2**: La primera versión compatible, que proporciona campos esenciales para los metadatos básicos del servicio y la documentación.

Cada versión se basa en la anterior, añadiendo nuevas funciones y manteniendo la compatibilidad con versiones anteriores. Elige la versión que mejor se adapte a tus necesidades y a la complejidad de infraestructura.

## Comparación de versiones

Cada versión admite las siguientes funciones:

| Función                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Metadatos básicos                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Agrupaciones de servicio             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Anotaciones del usuario              | {{< X >}}   | {{< X >}} |           |           |
| Asociaciones de CI Pipeline      | {{< X >}}   | {{< X >}} |           |           |
| Modelo de datos ampliado           | {{< X >}}   |           |           |           |
| Multipropiedad               | {{< X >}}   |           |           |           |
| Declaración manual de dependencia | {{< X >}}   |           |           |           |

Para obtener información detallada sobre cada versión, incluidos esquemas completos y archivos YAML de ejemplo, consulta las páginas de cada versión en [Versiones compatibles](#supported-versions).

## Detalles de la versión

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opt in to the Preview for the latest version of Software Catalog." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### Características principales
- **Modelo de datos ampliado**: la versión 3.0 admite varios tipos de entidades. Puedes organizar tus sistemas utilizando distintos componentes, como sistemas, servicios, colas y almacenes de datos.
- **Multipropietario**: Puedes asignar múltiples propietarios a cualquier objeto definido a través del esquema v3.0 para especificar múltiples puntos de contacto.
- **Asignación de relaciones mejorada**: Con los datos de APM y USM, puedes detectar automáticamente las dependencias entre componentes. v3.0 admite la declaración manual para aumentar la topology (topología) del sistema autodetectado con el fin de garantizar una visión completa de cómo interactúan los componentes dentro de tus sistemas.
- **Herencia de los metadatos del sistema**: Los componentes de un sistema heredan automáticamente los metadatos del sistema. Ya no es necesario declarar uno a uno los metadatos de todos los componentes relacionados, como en las versiones 2.1 y 2.2. 
- **Localización precisa del código**: Añade la asignación de la ubicación del código para tu servicio. La sección `codeLocations` en v3.0 especifica las ubicaciones del código con el repositorio que contiene el código y su `paths` asociado. El atributo `paths` es una lista de [globs][4] que deben coincidir con las rutas del repositorio.
- **Logs y eventos filtrados**: Declara logs guardados y consultas de eventos para un `system` a través de las secciones `logs` y `events` y mira los resultados en la page (página) Sistema.  
- **Entidades personalizadas**: Define tipos de entidad personalizados más allá de Servicio, Sistema, Datastore, Cola y API. Alcanza los scorcards y las acciones a tipos de entidad específicos.
- **(Próximas) integraciones**: Integra con herramientas de terceros para source (fuente) dinámicamente información relacionada con tus componentes (por ejemplo, pull requests de GitHub, incidents (incidentes) de PagerDuty y pipelines de GitLab). Informa y escribe reglas de scorecard contra cualquier source (fuente) de terceros.
- **Agrupación por producto o dominio**: Organiza los componentes por producto, permitiendo múltiples capas de agrupación jerárquica.

### Estructura del esquema

Puede consultar las [definiciones completas del esquema en Github][1]. 

La versión 3.0 contiene los siguientes cambios con respecto a la versión 2.2:
- `schema_version` es ahora `apiVersion`
- el campo `kind` es nuevo y define el tipo de componente: servicio, cola, almacén de datos, sistema o API.
- `dd-service` es ahora `metadata.name`
- `team` es ahora `owner` y `additionalOwners` si hay varios Teams
- `lifecycle`, `tier`, `languages` y `type` están ahora en`spec`
- `links`, `contacts`, y `description`, y `tags` están ahora en metadatos
- `application` se ha mejorado para convertirse en un tipo propio: `system`. Ya no existe como campo discreto en un servicio.

### Ejemplos de archivos YAML

{{% collapse-content title="Component of <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: system
  metadata:
    name: myapp
    displayName: My App
    tags:
      - tag:value
    links:
      - name: shopping-cart runbook
        type: runbook
        url: https://runbook/shopping-cart
      - name: shopping-cart architecture
        provider: gdoc
        url: https://google.drive/shopping-cart-architecture
        type: doc
      - name: shopping-cart Wiki
        provider: wiki
        url: https://wiki/shopping-cart
        type: doc
      - name: shopping-cart source code
        provider: github
        url: http://github/shopping-cart
        type: repo
    contacts:
      - name: Support Email
        type: email
        contact: team@shopping.com
      - name: Support Slack
        type: slack
        contact: https://www.slack.com/archives/shopping-cart
    owner: myteam
    additionalOwners:
      - name: opsTeam
        type: operator
  integrations:
    pagerduty:
      serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
    opsgenie:
      serviceURL: https://www.opsgenie.com/service/shopping-cart
      region: US
  spec:
    components:
      - service:myservice
      - service:otherservice
  extensions:
    datadoghq.com/shopping-cart:
      customField: customValue
  datadog:
    codeLocations:
      - repositoryURL: https://github.com/myorganization/myrepo.git
        paths:
          - path/to/service/code/**
    events:
      - name: "deployment events"
        query: "app:myapp AND type:github"
      - name: "event type B"
        query: "app:myapp AND type:github"
    logs:
      - name: "critical logs"
        query: "app:myapp AND type:github"
      - name: "ops logs"
        query: "app:myapp AND type:github"
    pipelines:
      fingerprints:
        - fp1
        - fp2
  {{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Component of <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: library
  metadata:
    name: my-library
    displayName: My Library
    tags:
      - tag:value
    links:
      - name: shopping-cart runbook
        type: runbook
        url: https://runbook/shopping-cart
      - name: shopping-cart architecture
        provider: gdoc
        url: https://google.drive/shopping-cart-architecture
        type: doc
      - name: shopping-cart Wiki
        provider: wiki
        url: https://wiki/shopping-cart
        type: doc
      - name: shopping-cart source code
        provider: github
        url: http://github/shopping-cart
        type: repo
    contacts:
      - name: Support Email
        type: email
        contact: team@shopping.com
      - name: Support Slack
        type: slack
        contact: https://www.slack.com/archives/shopping-cart
    owner: myteam
    additionalOwners:
      - name: opsTeam
        type: operator
  {{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Components that are part of multiple systems" level="h4" expanded=false id="id-for-anchoring" %}}
  Si un único componente forma parte de varios sistemas, debes especificar dicho componente en el YAML de cada sistema. Por ejemplo, si el almacén de datos `orders-postgres` es un componente de una flota y de una aplicación web, especifica dos YAML:

  Para la flota postgres (`managed-postgres`), especifica una definición para `kind:system`:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  type: system
  spec:
    components:
      - datastore:orders-postgres
      - datastore:foo-postgres
      - datastore:bar-postgres
  metadata:
    name: managed-postgres
    owner: db-team
  {{< /code-block >}}

  Para la aplicación web (`shopping-cart`), declara una definición separada para `kind:system`:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

  apiVersion: v3
  kind: system
  spec:
    lifecycle: production
    tier: critical
    components:
      - service:shopping-cart-api
      - service:shopping-cart-processor
      - queue:orders-queue
      - datastore:orders-postgres
  metadata:
    name: shopping-cart
    owner: shopping-team
    additionalOwners:
      - name: sre-team
        type: operator
  ---
  apiVersion: v3
  kind: datastore
  metadata:
    name: orders-postgres
    additionalOwners:
      - name: db-team
        type: operator
  ---
  apiVersion: v3
  kind: service
  metadata:
    name: shopping-cart-api
  ---
  apiVersion: v3
  kind: service
  metadata:
    name: shopping-cart-processor
  ---
  {{< /code-block >}}
{{% /collapse-content %}}

### Herencia explícita e implícita de metadatos 

#### Herencia explícita 

El campo `inheritFrom` indica al pipeline de ingesta que herede los metadatos de los metadatos de la entidad de la referencia por `<entity_kind>:<name>`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### Herencia implícita 
Los componentes (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) heredan todos los metadatos del sistema al que pertenecen en las siguientes condiciones:
- Sólo hay un sistema definido en el archivo YAML.
- La cláusula `inheritFrom:<entity_kind>:<name>` está ausente en el archivo YAML.

### Migración a la versión 3.0
v3.0 admite los mismos métodos de creación de metadatos que las versiones anteriores, incluidos Github, API, Terraform, Backstage, ServiceNow y la interfaz de usuario. Sin embargo, hay nuevos [endpoints de la API][5] y un nuevo [módulo de Terraform][6] para la v3.0.

### Documentación de referencia de la API
Para crear, obtener y eliminar definiciones para todos los tipos de entidades como endpoints, sistemas, almacenes de datos y colas, consulta la [Referencia de API Software Catalog][8].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /es/code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /es/api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: software_catalog/customize/import_entries_backstage
[8]: /es/api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### Características principales
- Anotaciones de usuario
- Sobreescritura del tipo y los lenguajes detectados automáticamente en el servicio mediante `type` y `languages`.
- Asociación del pipeline de CI a un servicio mediante el uso de `ci-pipeline-fingerprints`.
- Lógica de validación menos restrictiva para `contact.type` y `link.type`.

### Estructura del esquema

El [esquema completo está disponible en GitHub][1].

Ejemplo de YAML:
```yaml
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
```

### Documentación de referencia de la API

- Para crear, obtener y eliminar definiciones de servicio, consulta la [Referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones de nuevos tipos de componentes como sistemas, almacenes de datos y colas, consulta la [Referencia de la API de Software Catalog][3].
- Para crear y actualizar las reglas y resultados del servicio scorecard, consulta la [Referencia de la API de Service Scorecards][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### Características principales
- Nuevos elementos de interfaz de usuario, como las agrupaciones de servicios y los campos `application`, `tier` y `lifecycle`.
- `Application` y `Teams` pueden utilizarse como variables de agrupación en Software Catalog.
- El campo `Lifecycle` indica la fase de desarrollo para diferenciar entre los servicios `production`, `experimental` o `deprecated`.
- El campo `Tier` indica la prioridad del servicio durante el triaje de incidentes.

### Estructura del esquema

El [esquema completo está disponible en GitHub][1].

Ejemplo YAML:
```yaml
schema-version: v2.1
dd-service: delivery-state-machine
team: serverless
application: delivery-state-machine
tier: tier0
lifecycle: production
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist-serverless/tree/main/delivery-state-machine
    type: repo
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist-serverless/blob/main/delivery-state-machine/serverless.yml
    type: repo
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
    type: doc
tags:
  - "app:serverless-delivery"
  - "tier:3"
  - "business-unit:operations"
```

### Documentación de referencia de la API

- Para crear, obtener y eliminar definiciones de servicio, consulta la [Referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones de nuevos tipos de componentes como sistemas, almacenes de datos y colas, consulta la [Referencia de la API de Software Catalog][3].
- Para crear y actualizar las reglas y resultados del servicio scorecard, consulta la [Referencia de la API de Service Scorecards][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### Características principales
- Metadatos básicos del servicio
- Asociaciones de equipos
- Información de contacto
- Enlaces externos

### Estructura del esquema

El [esquema completo está disponible en GitHub][1].

Ejemplo YAML:
```yaml
schema-version: v2
dd-service: delivery-api
team: distribution-management
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
docs:
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
  pagerduty: https://datadog.pagerduty.com/service-directory/PXZNFXP
```

### Documentación de referencia de la API

- Para crear, obtener y eliminar definiciones de servicio, consulta la [Referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones de nuevos tipos de componentes como sistemas, almacenes de datos y colas, consulta la [Referencia de la API Software Catalog][3].
- Para crear y actualizar las reglas y resultados del servicio scorecard, consulta la [Referencia de la API de Service Scorecards][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## Crear extensiones personalizadas

<div class="alert alert-info">La disponibilidad de las extensiones personalizadas es limitada.</div>

El campo `extensions` es compatible con todas las versiones. Puedes incorporar este campo personalizado a los procesos de despliegue para estandarizar y codificar las prácticas recomendadas.

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: web-store
team: shopist
...
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "ci-tool://shopist/k8s/staging-deploy"
          branch: "main"
          schedule: "0 9 * * 1"
{{< /code-block >}}


## Validación de esquemas a través del complemento IDE 

Datadog proporciona un [Esquema JSON][18] para las definiciones, de modo que al editar una definición en un [IDE compatible][19], se proporcionen funciones como autocompletar y validación.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="Corregir problema de reconocimiento de VSCode" style="width:100%;" >}}

El [Esquema JSON para definiciones de Datadog ][20] está registrado en el [Almacén de esquemas][19] de código abierto.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /es/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /es/tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /es/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json