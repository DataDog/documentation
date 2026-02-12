---
app_id: retool
app_uuid: 13239057-ebc6-4cb6-a789-35f064bbcd0f
assets:
  dashboards:
    'Retool + Datadog: ElasticSearch Action Console': assets/dashboards/retool_retool_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: retool
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10176
    source_type_name: Retool
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Retool
  sales_email: support@retool.com
  support_email: support@retool.com
categories:
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/retool/README.md
display_on_public_website: true
draft: false
git_integration_title: retool
integration_id: retool
integration_title: Retool
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: retool
public_title: Retool
short_description: Retool es una forma rápida de crear herramientas internas
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Retool es una forma rápida de crear herramientas internas
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Retool
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
La monitorización y el análisis ofrecen información crítica, pero los desarrolladores a menudo tienen que saltar entre herramientas separadas, aisladas y a menudo personalizadas para tomar medidas sobre la información, lo que lleva a respuestas ineficaces a esa información.

Retool ayuda a los desarrolladores a crear aplicaciones personalizadas que se integran directamente en tu dashboard de Datadog para ofrecerte la posibilidad de tomar medidas y automatizar flujos de trabajo sin tener que salir de Datadog.

![Captura de pantalla1][1]

### Métricas
La aplicación integrada Retool de Datadog para la gestión de Elasticsearch combina la visibilidad existente de métricas y logs clave de Elasticsearch con la capacidad de gestionar clústeres, cuentas y mucho más sin salir del dashboard de Datadog.

### Dashboards
Retool ha creado una aplicación integrada para la gestión de Elasticsearch. Ahora puedes monitorizar métricas, trazas (traces) y logs de Elasticsearch en Datadog. A través de esta aplicación integrada, los desarrolladores pueden tomar medidas sobre la abundante información de Datadog, directamente en el dashboard de Datadog. Estas medidas incluyen:

- Añadir un nuevo índice con fragmentos y réplicas
- Gestionar nodos mediante el redireccionamiento de fragmentos y la exclusión de índices
- Crear nuevos snapshots y restaurar índices

## Configuración
La integración Retool incluye un dashboard predefinido que te permite registrarte o iniciar sesión en Retool a través de un iframe.

Se te pedirá que te conectes a tu clúster ElasticSearch con una cadena de conexión. Esta aplicación se añade automáticamente a tu instancia. A continuación, debes hacer clic en recursos en la barra de navegación y crear un nuevo recurso Datadog (añadiendo tus claves de api y de aplicación). Por último, conecta tu recurso Datadog a las dos consultas de Datadog, seleccionándolo en el menú desplegable de selección de recursos del editor de consultas.

Regresa a Datadog para ver la aplicación en funcionamiento en el dashboard. Puedes editar la aplicación en cualquier momento para adaptarla a tus flujos de trabajo DevOps.

## Datos recopilados

### Métricas
La integración Retool no incluye métricas en este momento.

### Eventos
La integración Retool no incluye eventos en este momento.

### Checks de servicio
La integración Retool no incluye checks de servicio en este momento.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/retool/images/1.png
[2]: https://docs.datadoghq.com/es/help/