---
app_id: cloud-foundry-api
app_uuid: a0c8e3e8-f3de-4405-88d3-0856e6c0948f
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloud_foundry_api.events.count
      metadata_path: metadata.csv
      prefix: cloud_foundry_api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: API de Cloud Foundry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md
display_on_public_website: true
draft: false
git_integration_title: cloud_foundry_api
integration_id: cloud-foundry-api
integration_title: API de Cloud Foundry
integration_version: 5.2.0
is_public: true
manifest_version: 2.0.0
name: cloud_foundry_api
public_title: API de Cloud Foundry
short_description: Recopila eventos de auditoría de Cloud Foundry.
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
  - Category::Cloud
  - Category::Orchestration
  - Offering::Integration
  configuration: README.md#Configuración
  description: Recopila eventos de auditoría de Cloud Foundry.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: API de Cloud Foundry
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check consulta la [API de Cloud Foundry][1] para recopilar eventos de auditoría y enviarlos a Datadog a través del Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de la API de Cloud Foundry está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `cloud_foundry_api.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de tu API de Cloud Foundry. Para conocer todas las opciones de configuración disponibles, consulta el [cloud_foundry_api.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `cloud_foundry_api` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cloud_foundry_api" >}}


### Eventos

La integración de la API de Cloud Foundry recopila los eventos de auditoría configurados.

### Checks de servicio
{{< get-service-checks-from-git "cloud_foundry_api" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help