---
app_id: hikaricp
app_uuid: fa40ec7e-e8f6-4c4b-a675-31716b23a9fa
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hikaricp.connections.active
      metadata_path: metadata.csv
      prefix: hikaricp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10308
    source_type_name: hikaricp
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: damien.bertau@blablacar.com
  support_email: damien.bertau@blablacar.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hikaricp/README.md
display_on_public_website: true
draft: false
git_integration_title: hikaricp
integration_id: hikaricp
integration_title: HikariCP
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: hikaricp
public_title: HikariCP
short_description: Integración de HikariCP con openmetrics v2
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración de HikariCP con openmetrics v2
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HikariCP
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
[HikariCP][1] es un marco de agrupación de conexiones JDBC ligero y rápido.
Este check monitoriza HikariCP a través del Datadog Agent.

## Configuración

### Instalación

Para instalar el check de HikariCP en tu host:


1. Instala el [kit de herramientas para desarrolladores][2]
 en cualquier máquina.

2. Clona el repositorio [integrations-extras][3] y navega hasta el directorio.

3. Ejecuta `ddev release build hikaricp` para crear el paquete.

4. [Descarga el Datadog Agent][4].

5. Sube el artefacto de compilación a cualquier host con un Agent y
 ejecuta `datadog-agent integration install -w
 path/to/hikaricp/dist/<ARTIFACT_NAME>.whl`.

### Configuración

1. Edita el archivo `hikaricp/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de HikariCP. Consulta el [hikaricp/conf.yaml de ejemplo][5] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent[7] y busca `hikaricp` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hikaricp" >}}


### Eventos

HikariCP no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://github.com/brettwooldridge/HikariCP
[2]: https://docs.datadoghq.com/es/developers/integrations/python/
[3]: https://github.com/DataDog/integrations-extras
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/datadog_checks/hikaricp/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/hikaricp/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/