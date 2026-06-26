---
app_id: mergify
app_uuid: 17230c84-50c7-4025-8fc8-69a9bc0bd502
assets:
  dashboards:
    Mergify merge queue overview [deprecated]: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mergify.queue_checks_outcome
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10349
    source_type_name: Mergify
author:
  homepage: https://mergify.com
  name: Comunidad
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- herramientas para desarrolladores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify
integration_id: mergify
integration_title: Mergify [obsoleto]
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: mergify
public_title: Mergify [obsoleto]
short_description: Integración de estadísticas de la cola de fusión de Mergify
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
  - Submitted Data Type::Metrics
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración de estadísticas de la cola de fusión de Mergify
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify [obsoleto]
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

**Importante**: A partir del 10 de octubre de 2024, esta integración dejará de ser compatible. Debes utilizar la [nueva integración][1].

Esta integración monitoriza la longitud de la cola de fusión para cada repositorio configurado en
[Mergify][2] y realiza un seguimiento de la disponibilidad global de Mergify. Al enviar métricas a tu
cuenta de Datadog, puedes configurar monitores para alertas de anomalía y analizar el rendimiento de la cola de fusión.
Puedes mantenerte al tanto de la disponibilidad del servicio de Mergify 
y optimizar tu flujo de trabajo de desarrollo utilizando esta integración de Datadog.

## Configuración

### Instalación

#### Desde el lanzamiento

Ejecuta `datadog-agent integration install -t datadog-mergify==<INTEGRATION_VERSION>`.

#### Desde la fuente

Para instalar el check de Mergify en tu host:

1. Instala la [herramienta para desarrolladores][3] en cualquier máquina.

2. Ejecuta `ddev release build mergify` para crear el paquete.

3. [Descarga el Datadog Agent][4].

4. Sube el artefacto de compilación a cualquier host con un Agent y
 ejecuta `datadog-agent integration install -w
 path/to/mergify/dist/<ARTIFACT_NAME>.whl`.

### Configuración

1. Edita el archivo `mergify.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][5] para empezar a recopilar tus [métricas](#metrics) de Mergify.

   Consulta el archivo [mergify.d/conf.yaml.example][6] de ejemplo para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][7].

### Validación

Ejecuta el [subcomando de estado del Agent][8] y busca `mergify` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mergify" >}}


### Eventos

Mergify no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Mergify][2].

[1]: https://app.datadoghq.com/integrations/mergify-oauth
[2]: https://mergify.com
[3]: https://docs.datadoghq.com/es/developers/integrations/new_check_howto/#configure-the-developer-tool
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/mergify/datadog_checks/mergify/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/mergify/assets/service_checks.json