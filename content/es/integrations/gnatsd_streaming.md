---
app_id: gnatsd-streaming
app_uuid: 264e486e-d704-4851-987a-d33c11036521
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: gnatsd.streaming.serverz.clients
      metadata_path: metadata.csv
      prefix: gnatsd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10235
    source_type_name: Gnatsd streaming
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: dev@goldstar.com
  support_email: dev@goldstar.com
categories:
- red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md
display_on_public_website: true
draft: false
git_integration_title: gnatsd_streaming
integration_id: gnatsd-streaming
integration_title: Gnatsd Streaming
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: gnatsd_streaming
public_title: Gnatsd Streaming
short_description: Streaming del servidor NATS
supported_os:
- Linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Streaming del servidor NATS
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gnatsd Streaming
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servicio gnatsd_streaming en tiempo real para:

- Visualizar y monitorizar estados de gnatsd_streaming
- Recibir notificaciones sobre fallos y eventos de gnatsd_streaming

## Configuración

El check de gnatsd_streaming no está incluido en el paquete del [Datadog Agent][1], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de gnatsd_streaming en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `gnatsd_streaming.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4], para empezar a recopilar tus [métricas](#metrics) de streaming de GnatsD.
   Consulta el [gnatsd_streaming.d/conf.yaml de ejemplo][5] para ver todas las opciones de configuración disponibles.

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `gnatsd_streaming` en la sección **Checks**.

## Compatibilidad

El check gnatsd_streaming check es compatible con todas las principales plataformas

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gnatsd_streaming" >}}


Las métricas del servidor de streaming Nats se etiquetan con nombres como "nss-cluster_id"

### Eventos

Si estás ejecutando el servidor de streaming Nats en un grupo con Tolerancia a fallos, se genera un evento de conmutación del streaming Nats cuando el estado de un servidor cambia entre `FT_STANDBY` y `FT_ACTIVE`.

### Checks de servicios
{{< get-service-checks-from-git "gnatsd_streaming" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/assets/service_checks.json
[10]: http://docs.datadoghq.com/help