---
app_id: unbound
app_uuid: 33cd72ba-822b-4a74-92eb-f1240ea71975
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unbound.time.up
      metadata_path: metadata.csv
      prefix: unbound.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10165
    source_type_name: Unbound
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: david.byron@avast.com
  support_email: david.byron@avast.com
categories:
- almacenamiento en caché
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_on_public_website: true
draft: false
git_integration_title: unbound
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: unbound
public_title: Unbound
short_description: Una integración de Datadog para recopilar métricas
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Una integración de Datadog para recopilar métricas
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Unbound
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Unbound][1] a través del Datadog Agent.

Obtén métricas del servicio unbound en tiempo real para:

- Visualizar y monitorizar estados de unbound

## Configuración

El check de Unbound no está incluido en el paquete de [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+/v6.21+, sigue las instrucciones a continuación para instalar el check de Unbound en tu host. Consulta [Usar integraciones de la comunidad][3] para realizar la instalación con el Agent de Docker o versiones anteriores de Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `unbound.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de
   tu directorio de configuración del Agent para empezar a recopilar métricas. Consulta
   el [unbound.d/conf.yaml de ejemplo][5] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `unbound` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "unbound" >}}


### Eventos

El check de Unbound no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "unbound" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/