---
algolia:
  tags:
  - codeLocations
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
- /es/internal_developer_portal/software_catalog/entity_model
description: Aprenda cómo Catalog utiliza esquemas de definición basados en YAML para
  almacenar y mostrar metadatos sobre servicios, sistemas, Datastore, colas y otros
  tipos de entidades.
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Cree y administre definiciones con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Obtenga información sobre la API de definición
- link: /integrations/github
  tag: Documentación
  text: Obtenga información sobre la integración con GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importe archivos YAML de Backstage a Datadog
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: Blog
  text: Mejore la experiencia del desarrollador y la colaboración con la versión 3.0
    del esquema de Service Catalog.
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: Blog
  text: Modele su arquitectura con entidades personalizadas en el Catálogo de Datadog.
title: Modelo de entidad
---
## Descripción general {#overview}

Catalog utiliza esquemas de definición para almacenar y mostrar metadatos relevantes sobre sus entidades. Los esquemas tienen reglas de validación integradas para garantizar que solo se acepten valores válidos. Puede visualizar advertencias en la pestaña **Definición** en el panel lateral de Catalog para cualquier servicio seleccionado.

{{< img src="/tracing/internal_developer_portal/catalog/entity-model-flow-chart.png" alt="Un diagrama de flujo que muestra cómo los componentes de Catalog se conectan entre sí y con su entorno en la nube " style="width:100%;" >}}

## Versiones admitidas {#supported-versions}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El esquema del modelo de entidad v3.0 no es compatible con su sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog admite cuatro versiones del esquema de definición:

- **v3.0**: Versión más reciente con modelo de datos ampliado, compatibilidad con propiedad múltiple, declaración manual de dependencias y funciones mejoradas para infraestructura compleja.
- **v2.2**: Admite anotaciones de usuario para metadatos personalizados y asociaciones de canalizaciones de CI para vincular servicios con sus procesos de compilación.
- **v2.1**: Admite agrupaciones de servicios para una mejor organización e introduce campos adicionales para descripciones de servicio más completas.
- **v2**: Versión admitida más antigua, que proporciona campos esenciales para metadatos y documentación básica de servicios.

Cada versión se basa en la anterior, añadiendo nuevas funcionalidades mientras mantiene la compatibilidad con versiones anteriores. Elija la versión que mejor se adapte a sus necesidades y a la complejidad de su infraestructura.

## Comparación de versiones {#version-comparison}

Las siguientes características son compatibles en cada versión:

| Característica                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Metadatos básicos                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Agrupaciones de servicios | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Anotaciones de usuario | {{< X >}}   | {{< X >}} |           |           |
| Asociaciones de canalización de CI | {{< X >}}   | {{< X >}} |           |           |
| Modelo de datos expandido | {{< X >}}   |           |           |           |
| Propiedad múltiple | {{< X >}}   |           |           |           |
| Declaración manual de dependencias | {{< X >}}   |           |           |           |

Para obtener información detallada sobre cada versión, incluidos esquemas completos y archivos YAML de ejemplo, consulte las páginas de versiones individuales en [Supported versions](#supported-versions).

## Detalles de la versión {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" header="Opte por la vista previa para obtener la versión más reciente de Catalog." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El esquema del modelo de entidad v3.0 no es compatible con su sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Características clave {#key-features}
- **Modelo de datos expandido**: la v3.0 admite múltiples tipos de entidades. Puede organizar sus sistemas utilizando varios componentes como sistemas, servicios, colas y Datastore.
- **Propiedad múltiple**: puede asignar varios propietarios a cualquier objeto definido a través del esquema de la v3.0 para especificar múltiples puntos de contacto.
- **Mapeo de relaciones mejorado**: con los datos de APM y USM, puede detectar automáticamente las dependencias entre los componentes. La v3.0 admite la declaración manual para aumentar la topología del sistema detectada automáticamente y garantizar una visión completa de cómo interactúan los componentes dentro de sus sistemas.
- **Herencia de metadatos del sistema**: los componentes dentro de un sistema heredan automáticamente los metadatos del sistema. Ya no es necesario declarar los metadatos para todos los componentes relacionados uno por uno como en la v2.1 y la v2.2.
- **Ubicación precisa del código**: agregue el mapeo de la ubicación de su código para su servicio. La sección `codeLocations` en la v3.0 especifica las ubicaciones del código con el repositorio que contiene el código y su `paths` asociado. El atributo `paths` es una lista de [globs][4] que deben coincidir con las rutas en el repositorio.
- **Registros y eventos filtrados**: declare consultas guardadas de registros y eventos para un `system` a través de las secciones `logs` y `events` y visualice los resultados en la página del Sistema.
- **Entidades personalizadas**: defina tipos de entidades personalizados más allá de Servicio, Sistema, Datastore, Cola y API. Defina el contexto de las tarjetas de puntuación y las acciones para tipos específicos de entidades.
- **(Próximamente) Integrations**: intégrese con herramientas de terceros para obtener información de forma dinámica relacionada con sus componentes (por ejemplo, solicitudes de extracción de GitHub, incidentes de PagerDuty y canalizaciones de GitLab). Genere informes y escriba reglas de tarjetas de puntuación para cualquier fuente de terceros.
- **(Próximamente) Agrupar por producto o dominio**: organice los componentes por producto, lo que permite múltiples capas de agrupación jerárquica.

### Estructura del esquema {#schema-structure}

Puede ver las [definiciones completas del esquema en Github][1].

La v3.0 contiene los siguientes cambios respecto a la v2.2:
- `schema_version` ahora es `apiVersion`
El campo - `kind` es nuevo y define el tipo de componente: servicio, cola, Datastore, sistema o API.
- `dd-service` ahora es `metadata.name`
- `team` ahora es `owner` y `additionalOwners` si hay varios equipos
- `lifecycle`, `tier`, `languages` y `type` ahora están bajo `spec`
- `links`, `contacts`, `description` y `tags` ahora están bajo metadatos
- `application` se ha mejorado para convertirse en su propio tipo: `system`. Ya no existe como un campo discreto en un servicio.

### Archivos YAML de ejemplo {#example-yaml-files}

{{% collapse-content title="Componente de <code>kind:system</code>" level="h4" expanded=false id="component-of-kind-system" %}}
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

{{% collapse-content title="Componente de <code>kind:library</code>" level="h4" expanded=false id="component-of-kind-library" %}}
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

{{% collapse-content title="Componentes que forman parte de múltiples sistemas" level="h4" expanded=false id="components-in-multiple-systems" %}}
Si un solo componente forma parte de múltiples sistemas, debe especificar ese componente en el YAML para cada sistema. Por ejemplo, si el Datastore `orders-postgres` es un componente tanto de un conjunto de postgres como de una aplicación web, especifique dos YAML:

Para el conjunto de postgres (`managed-postgres`), especifique una definición para `kind:system`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
spec:
  components:
    - datastore:orders-postgres
    - datastore:foo-postgres
    - datastore:bar-postgres
metadata:
  name: managed-postgres
  owner: db-team
{{< /code-block >}}

Para la aplicación web (`shopping-cart`), declare una definición separada para `kind:system`:
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

### Herencia de metadatos explícita e implícita {#explicit-and-implicit-metadata-inheritance}

#### Herencia explícita {#explicit-inheritance}

El campo `inheritFrom` indica a la canalización de ingesta que herede los metadatos de los metadatos de la entidad referenciados por `<entity_kind>:<name>`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### Herencia implícita {#implicit-inheritance}
Los componentes (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) heredan todos los metadatos del sistema al que pertenecen bajo las siguientes condiciones:
- Solo hay un sistema definido en el archivo YAML.
- La cláusula `inheritFrom:<entity_kind>:<name>` no está presente en el archivo YAML.

### Migración a la v3.0 {#migrating-to-v30}
La v3.0 admite los mismos métodos de creación de metadatos que las versiones anteriores, incluidos Github, API, Terraform, Backstage, ServiceNow y la interfaz de usuario. Sin embargo, existen nuevos [puntos finales de API][5] y un nuevo [recurso de Terraform][6] para la v3.0.

Para migrar archivos YAML de servicio existentes de la v1, v2, v2.1 o v2.2 a la v3, consulte [Migrar sus definiciones de servicio a la v3][7].

### Documentación de referencia de la API {#api-reference-documentation}
Para crear, obtener y eliminar definiciones para todos los tipos de entidades como puntos finales, sistemas, Datastore y colas, consulte la [referencia de la API de catálogo][8].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /es/code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /es/api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: /es/internal_developer_portal/catalog/entity_model/v3_migration
[8]: /es/api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### Características clave {#key-features-1}
- Anotaciones de usuario
- Sobrescribir el tipo de servicio y los lenguajes detectados automáticamente usando `type` y `languages`
- Asociar la canalización de CI con un servicio usando `ci-pipeline-fingerprints`
- Lógica de validación menos restrictiva para `contact.type` y `link.type`

### Estructura del esquema {#schema-structure-1}

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

### Documentación de referencia de la API {#api-reference-documentation-1}

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, Datastore y colas, consulte la [referencia de la API de catálogo][3].
- Para crear y actualizar reglas y resultados de Scorecards de servicio, consulte la [referencia de la API de Scorecards de servicio][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### Características clave {#key-features-2}
- Nuevos elementos de la interfaz de usuario, tales como agrupaciones de servicios y campos para `application`, `tier` y `lifecycle`
- `Application` y `Teams` se pueden usar como variables de agrupación en el Catálogo
- `Lifecycle`El campo indica la etapa de desarrollo para diferenciar entre servicios `production`, `experimental` o `deprecated`
- `Tier`El campo indica la criticidad del servicio para establecer prioridades durante la clasificación de incidentes

### Estructura del esquema {#schema-structure-2}

El [esquema completo está disponible en GitHub][1].

Ejemplo de YAML:

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

### Documentación de referencia de la API {#api-reference-documentation-2}

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, Datastore y colas, consulte la [referencia de la API de catálogo][3].
- Para crear y actualizar reglas y resultados de Scorecards de servicio, consulte la [referencia de la API de Scorecards de servicio][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### Características clave {#key-features-3}
- Metadatos básicos del servicio
- Asociaciones de equipo
- Información de contacto
- Enlaces externos

### Estructura del esquema {#schema-structure-3}

El [esquema completo está disponible en GitHub][1].

Ejemplo de YAML:

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

### Documentación de referencia de la API {#api-reference-documentation-3}

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de definiciones de servicio][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, Datastore y colas, consulte la [referencia de la API de catálogo][3].
- Para crear y actualizar reglas y resultados de Scorecards de servicio, consulte la [referencia de la API de Scorecards de servicio][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## Crear extensiones personalizadas {#build-custom-extensions}

<div class="alert alert-info">Las extensiones personalizadas están en Disponibilidad Limitada para todas las versiones de esquema.</div>

Las extensiones personalizadas le permiten adjuntar metadatos específicos de la organización a las entidades, lo que permite el soporte para herramientas y flujos de trabajo personalizados. Por ejemplo, utilice `extensions` el campo para incluir notas de la versión, etiquetas de cumplimiento o modelos de propiedad en las definiciones de sus entidades.

Datadog también admite claves de extensión específicas para ciertas funciones. Estas incluyen:
- `datadoghq.com/dora-metrics`: Defina patrones de ruta de código fuente para filtrar confirmaciones de Git al calcular [métricas DORA][21].
- `datadoghq.com/cd-visibility`: Controle qué confirmaciones se consideran parte de una implementación en [CD Visibility][22].

El siguiente ejemplo define una extensión personalizada utilizada para gestionar la programación de versiones en todos los entornos:
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: payment-platform
  displayName: "Payment Platform"
  links:
    - name: Runbook
      type: runbook
      url: https://runbook/payment-platform
  contacts:
    - name: Payment Team
      type: team
      contact: https://www.slack.com/archives/payments
  owner: payments-team
  additionalOwners:
    - name: finance-team
      type: stakeholder
spec:
  components:
    - service:payment-api
    - queue:payment-requests
    - datastore:payment-db
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


## Validación de esquema a través del complemento de IDE {#schema-validation-through-ide-plugin}

Datadog proporciona un [JSON Schema][18] para las definiciones, de modo que cuando edita una definición en un [IDE compatible][19], se proporcionan funciones como autocompletado y validación.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode reconoce el problema a solucionar" style="width:100%;" >}}

El [JSON schema para definiciones de Datadog][20] está registrado en el [Schema Store][19] de código abierto.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /es/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /es/internal_developer_portal/catalog/entity_model/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /es/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[21]: /es/delivery_performance/dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /es/continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns