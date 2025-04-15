---
app_id: neutrona
app_uuid: f44f84d4-1436-4ab1-8023-b952850b64c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: neutrona.azure.expressroute.egress_bps
      metadata_path: metadata.csv
      prefix: neutrona.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10051
    source_type_name: Neutrona
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neutrona
  sales_email: david@neutrona.com
  support_email: david@neutrona.com
categories:
- nube
- la red
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md
display_on_public_website: true
draft: false
git_integration_title: neutrona
integration_id: neutrona
integration_title: Neutrona
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: neutrona
public_title: Neutrona
short_description: Telemetría de Neutrona
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Telemetría de Neutrona
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neutrona
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza servicios de conectividad de la nube de [Neutrona][1] a:

- Azure (ExpressRoute)

## Configuración

El check de Neutrona no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+/v6.21+, sigue las instrucciones a continuación para instalar el check de Neutrona en tu host. Consulta [Usar integraciones de la comunidad][3] para realizar la instalación con el Agent de Docker o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `neutrona.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][5] para empezar a recopilar tus [métricas](#metrics) de Neutrona.
   Consulta el [neutrona.d/conf.yaml de ejemplo][6] para conocer todas las opciones disponibles de configuración.

2. [Reiniciar el Agent][7]

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `neutrona` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "neutrona" >}}


### Checks de servicio

Neutrona no incluye ningún check de servicio en este momento.

### Eventos

Neutrona no incluye ningún evento en este momento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://telemetry.neutrona.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/metadata.csv
[10]: https://docs.datadoghq.com/es/help/