---
app_id: cri-o
app_uuid: a5f9ace1-19b5-4928-b98b-21f15d62cce2
assets:
  dashboards:
    crio: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: recuento.operaciones.crio
      metadata_path: metadata.csv
      prefix: crio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10044
    source_type_name: CRI-O
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/crio/README.md
display_on_public_website: true
draft: false
git_integration_title: crio
integration_id: cri-o
integration_title: CRI-O
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: crio
public_title: CRI-O
short_description: Seguimiento de todas tus métricas de CRI-O con Datadog
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
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento de todas tus métricas de CRI-O con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI-O
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [CRI-O][1].

## Configuración

### Instalación

La integración se basa en la opción `--enable-metrics` de CRI-O desactivada por defecto, cuando se exponen métricas activadas en`127.0.0.1:9090/metrics`.

### Configuración

1. Edita el archivo `crio.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu CRI-O. Para conocer todas las opciones de configuración disponibles, consulta el [crio.d/conf.yaml de ejemplo][2].

2. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `crio` en la sección **Checks**.

## Datos recopilados

CRI-O recopila métricas del recuento y la latencia de las operaciones realizadas por el tiempo de ejecución.
La integración CRI-O en Datadog recopila el uso de CPU y de memoria del propio binario CRI-O golang.

### Métricas
{{< get-metrics-from-git "cri-o" >}}


### Checks de servicio
{{< get-service-checks-from-git "cri-o" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/es/help/
