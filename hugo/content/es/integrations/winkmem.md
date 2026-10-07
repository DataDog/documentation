---
app_id: winkmem
app_uuid: 70d34855-e504-4716-be0a-cc9d7d82e5ab
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: winkmem.paged_pool_bytes
      metadata_path: metadata.csv
      prefix: winkmem.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10254
    source_type_name: Memoria del núcleo de Windows
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
- Windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/winkmem/README.md
display_on_public_website: true
draft: false
git_integration_title: winkmem
integration_id: winkmem
integration_title: Memoria del núcleo de Windows
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: winkmem
public_title: Memoria del núcleo de Windows
short_description: Monitoriza tu asignación de memoria del núcleo de Windows.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - Category::Windows
  - Oferta::Integración
  configuration: README.md#Setup
  description: Monitoriza tu asignación de memoria del núcleo de Windows.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Memoria del núcleo de Windows
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Obtén el uso de memoria del núcleo de Windows para crear visualizaciones y monitores en Datadog.

**Nota:** La lista de métricas recopiladas por esta integración puede cambiar entre versiones secundarias del Agent. Es posible que dichos cambios no se mencionen en el registro de cambios del Agent.

## Configuración

### Instalación

La integración de la Memoria del núcleo de Windows está incluida en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Edita el archivo `winkmem.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][2]. Consulta el [winkmem.d/conf.yaml.example de ejemplo][3] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `winkmem` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "winkmem" >}}


### Eventos

La integración de la memoria del núcleo de Windows no incluye ningún evento.

### Checks de servicios

La integración de la memoria del núcleo de Windows no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/winkmem.d/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/winkmem/metadata.csv
[6]: https://docs.datadoghq.com/es/help/