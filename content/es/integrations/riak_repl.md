---
app_id: riak-repl
app_uuid: bbba11cf-2ea1-4a8b-904c-eb3b55ed169a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: riak_repl.server_bytes_sent
      metadata_path: metadata.csv
      prefix: riak_repl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10168
    source_type_name: Replicación Riak MDC
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: britt.treece@gmail.com
  support_email: britt.treece@gmail.com
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md
display_on_public_website: true
draft: false
git_integration_title: riak_repl
integration_id: riak-repl
integration_title: Replicación Riak MDC
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: riak_repl
public_title: Replicación Riak MDC
short_description: Seguimiento del rendimiento, la capacidad y el estado de la replicación
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
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento del rendimiento, la capacidad y el estado de la replicación
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Replicación Riak MDC
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza la replicación Riak [riak-repl][1].

## Configuración

El check de Riak-Repl no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

En el caso de las versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Riak-Repl en tu host. Para instalarlo con el Docker Agent o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `riak_repl.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu Riak-Repl. Para conocer todas las opciones de configuración disponibles, consulta el [riak_repl.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `riak_repl` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "riak_repl" >}}


### Checks de servicio

La integración Riak-Repl no incluye checks de servicio.

### Eventos

La integración Riak-Repl no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/es/integrations/riak_repl/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[9]: https://docs.datadoghq.com/es/help/