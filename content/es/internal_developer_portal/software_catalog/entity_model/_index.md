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
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio Externo
  text: Crea y gestiona definiciones con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Aprende sobre la API de Definición
- link: /integrations/github
  tag: Documentación
  text: Aprende sobre la Integración de GitHub
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: Blog
  text: Importa archivos YAML de Backstage en Datadog
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: Blog
  text: Mejora la experiencia del desarrollador y la colaboración con el esquema del
    Service Catalog versión 3.0.
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: Blog
  text: Modela tu arquitectura con entidades personalizadas en el Datadog Software
    Catalog.
title: Modelo de Entidad
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El esquema del Modelo de Entidad v3.0 no está disponible en el sitio seleccionado en este momento.</div>

{{< /site-region >}}

## Resumen {#overview}

El Software Catalog utiliza esquemas de definición para almacenar y mostrar metadatos relevantes sobre tus entidades. Los esquemas tienen reglas de validación integradas para asegurar que solo se acepten valores válidos. Puedes ver advertencias en la pestaña **Definición** en el panel lateral del Software Catalog para cualquier servicio seleccionado.

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="Un diagrama de flujo que muestra cómo los componentes del Software Catalog se conectan entre sí y con tu entorno en la nube. " style="width:100%;" >}}

## Versiones soportadas {#supported-versions}

Datadog soporta cuatro versiones del esquema de definición:

- **v3.0**: Última versión con un modelo de datos ampliado, soporte para múltiples propietarios, declaración manual de dependencias y características mejoradas para infraestructuras complejas.
- **v2.2**: Soporta anotaciones de usuario para metadatos personalizados y asociaciones de canalización CI para vincular servicios con sus procesos de construcción.
- **v2.1**: Soporta agrupaciones de servicios para una mejor organización e introduce campos adicionales para descripciones de servicio más completas.
- **v2**: Versión más temprana soportada, proporcionando campos esenciales para metadatos y documentación básica de servicios.

Cada versión se basa en la anterior, añadiendo nueva funcionalidad mientras mantiene la compatibilidad hacia atrás. Elige la versión que mejor se adapte a tus necesidades y a la complejidad de tu infraestructura.

## Comparación de versiones {#version-comparison}

Las siguientes características son soportadas en cada versión:

| Característica                     | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| Metadatos Básicos                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| Agrupaciones de Servicios         | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| Anotaciones de Usuario            | {{< X >}}   | {{< X >}} |           |           |
| Asociaciones de canalización CI       | {{< X >}}   | {{< X >}} |           |           |
| Modelo de Datos Ampliado         | {{< X >}}   |           |           |           |
| Multi-propiedad                  | {{< X >}}   |           |           |           |
| Declaración Manual de Dependencias | {{< X >}}   |           |           |           |

Para obtener información detallada sobre cada versión, incluidos los esquemas completos y ejemplos de archivos YAML, consulte las páginas de versión individuales en [Versiones soportadas](#supported-versions).

## Detalles de la versión {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opta por la Vista Previa para la última versión del Software Catalog." >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### Características clave {#key-features}
- **Modelo de datos expandido**: v3.0 soporta múltiples tipos de entidades. Puedes organizar tus sistemas utilizando varios componentes como sistemas, servicios, colas y Datastore.
- **Multi-propiedad**: Puedes asignar múltiples propietarios a cualquier objeto definido a través del esquema v3.0 para especificar múltiples puntos de contacto.
- **Mapeo de relaciones mejorado**: Con los datos de APM y USM, puedes detectar automáticamente las dependencias entre componentes. v3.0 soporta la declaración manual para aumentar la topología del sistema detectada automáticamente y asegurar una visión completa de cómo interactúan los componentes dentro de tus sistemas.
- **Herencia de metadatos del sistema**: Los componentes dentro de un sistema heredan automáticamente los metadatos del sistema. Ya no es necesario declarar metadatos para todos los componentes relacionados uno por uno como en v2.1 y v2.2.
- **Ubicación de código precisa**: Agrega el mapeo de la ubicación de tu código para tu servicio. La sección `codeLocations` en v3.0 especifica las ubicaciones del código con el repositorio que contiene el código y su `paths` asociado. El atributo `paths` es una lista de [globs][4] que deben coincidir con las rutas en el repositorio.
- **Registros y eventos filtrados**: Declara registros guardados y consultas de eventos para un `system` a través de las secciones `logs` y `events` y visualiza los resultados en la página del Sistema.
- **Entidades personalizadas**: Define tipos de entidades personalizadas más allá de Servicio, Sistema, Datastore, Cola y API. Define los Scorecards y acciones para tipos de entidades específicos.
- **(Próximamente) Integrations**: Integra con herramientas de terceros para obtener dinámicamente información relacionada con tus componentes (por ejemplo, solicitudes de extracción de GitHub, incidentes de PagerDuty y canalizaciones de GitLab). Reporta y escribe reglas de Scorecard contra cualquier fuente de terceros.
- **(Próximo) Agrupar por producto o dominio**: Organizar componentes por producto, permitiendo múltiples capas de agrupamiento jerárquico.

### Estructura del esquema {#schema-structure}

Puedes ver las [definiciones completas del esquema en Github][1].

V3.0 contiene los siguientes cambios respecto a v2.2:
- `schema_version` ahora es `apiVersion`
El campo - `kind` es nuevo y define el tipo de componente: servicio, cola, Datastore, sistema o API.
- `dd-service` ahora es `metadata.name`
- `team` ahora es `owner` y `additionalOwners` si hay múltiples equipos.
- `lifecycle`, `tier`, `languages` y `type` ahora están bajo `spec`.
- `links`, `contacts`, `description` y `tags` ahora están bajo metadatos.
- `application` ha sido mejorado para convertirse en su propio tipo: `system`. Ya no existe como un campo discreto en un servicio.

### Ejemplos de archivos YAML {#example-yaml-files}

{{% collapse-content title="Componente de <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
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

{{% collapse-content title="Componente de <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
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

{{% collapse-content title="Componentes que son parte de múltiples sistemas." level="h4" expanded=false id="id-for-anchoring" %}}
Si un solo componente es parte de múltiples sistemas, debes especificar ese componente en el YAML para cada sistema. Por ejemplo, si el Datastore `orders-postgres` es un componente tanto de una flota de postgres como de una aplicación web, especifica dos YAMLs:

Para la flota de postgres (`managed-postgres`), especifica una definición para `kind:system`:
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

### Herencia de metadatos explícita e implícita {#explicit-and-implicit-metadata-inheritance}

#### Herencia explícita {#explicit-inheritance}

El campo `inheritFrom` instruye a la canalización de ingestión para heredar metadatos de los metadatos de la entidad referenciada por `<entity_kind>:<name>`.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### Herencia implícita {#implicit-inheritance}
Los componentes (`kind:service`, `kind:datastore`, `kind:queue`, `kind:ui`) heredan todos los metadatos del sistema al que pertenecen bajo las siguientes condiciones:
- Solo hay un sistema definido en el archivo YAML.
- La cláusula `inheritFrom:<entity_kind>:<name>` está ausente en el archivo YAML.

### Migrando a v3.0 {#migrating-to-v30}
v3.0 soporta los mismos métodos de creación de metadatos que las versiones anteriores, incluyendo Github, API, Terraform, Backstage, ServiceNow y la UI. Sin embargo, hay nuevos [puntos de conexión de API][5] y un nuevo [recurso de Terraform][6] para v3.0.

### Documentación de referencia de API {#api-reference-documentation}
Para crear, obtener y eliminar definiciones para todos los tipos de entidades como puntos de conexión, sistemas, Datastore y colas, consulte la [documentación de referencia de la API de Software Catalog][8].

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

### Características clave {#key-features-1}
- Anotaciones de usuario
- Sobrescribiendo el tipo de servicio y los idiomas detectados automáticamente usando `type` y `languages`
- Asociar la canalización CI con un servicio usando `ci-pipeline-fingerprints`
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

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de Service Definitions][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, Datastore y colas, consulte la [referencia de la API de Software Catalog][3].
- Para crear y actualizar reglas y resultados de los Scorecards de servicio, consulte la [referencia de la API de Scorecards del Servicio][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### Características clave {#key-features-2}
- Nuevos elementos de la UI, como agrupaciones de servicios y campos para `application`, `tier` y `lifecycle`
- `Application` y `Teams` pueden usarse como variables de agrupamiento en el Software Catalog
- `Lifecycle` el campo indica la etapa de desarrollo para diferenciar entre `production`, `experimental` o `deprecated` servicios
- `Tier` el campo indica la criticidad del servicio para priorizar durante la clasificación de incidentes

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

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de Definiciones de Servicio][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, almacenes de datos y colas, consulte la [referencia de la API del Software Catalog][3].
- Para crear y actualizar reglas y resultados del Scorecard del servicio, consulte la [referencia de la API de Service Scorecards][2].

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

- Para crear, obtener y eliminar definiciones de servicio, consulte la [referencia de la API de Definiciones de Servicio][4].
- Para crear, obtener y eliminar definiciones para nuevos tipos de componentes como sistemas, almacenes de datos y colas, consulte la [referencia de la API del Software Catalog][3].
- Para crear y actualizar reglas y resultados del Scorecard del servicio, consulte la [referencia de la API de Service Scorecards][2].

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /es/api/latest/service-scorecards/
[3]: /es/api/latest/software-catalog/
[4]: /es/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## Crear extensiones personalizadas {#build-custom-extensions}

<div class="alert alert-info">Las extensiones personalizadas están en disponibilidad limitada para todas las versiones del esquema.</div>

Las extensiones personalizadas permiten adjuntar metadatos específicos de la organización a las entidades, habilitando el soporte para herramientas y flujos de trabajo personalizados. Por ejemplo, utiliza el `extensions` campo para incluir notas de lanzamiento, etiquetas de cumplimiento o modelos de propiedad en tus definiciones de entidad.

Datadog también admite claves de extensión específicas para ciertas características. Estas incluyen:
- `datadoghq.com/dora-metrics`: Define patrones de ruta de código fuente para filtrar commits de Git al calcular [métricas DORA][21].
- `datadoghq.com/cd-visibility`: Controla qué commits se consideran parte de un despliegue en [CD Visibility][22].

El siguiente ejemplo define una extensión personalizada utilizada para gestionar la programación de lanzamientos a través de entornos:
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

Datadog proporciona un [Esquema JSON][18] para definiciones, de modo que cuando editas una definición en un [IDE compatible][19], se ofrecen características como autocompletar y validación.

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode detecta un problema para corregir" style="width:100%;" >}}

El [esquema JSON para definiciones de Datadog][20] está registrado en el [Schema Store][19] de código abierto.


## Lectura adicional {#further-reading}

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
[21]: /es/dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /es/continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns