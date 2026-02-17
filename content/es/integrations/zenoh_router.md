---
app_id: zenoh-router
app_uuid: 8ef30e8d-955c-4456-b176-a01f2560bda1
assets:
  dashboards:
    Zenoh routers - Overview: assets/dashboards/zenoh_routers_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zenoh.router.sessions
      metadata_path: metadata.csv
      prefix: zenoh.router.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10445
    source_type_name: Enrutador Zenoh
  monitors:
    No active sessions: assets/monitors/zenoh_router_disconnected.json
author:
  homepage: https://zenoh.io/
  name: ZettaScale
  sales_email: contact@zettascale.tech
  support_email: alexander@bushnev.pro
categories:
- la red
- iot
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/README.md
display_on_public_website: true
draft: false
git_integration_title: zenoh_router
integration_id: zenoh-router
integration_title: Enrutador Zenoh
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zenoh_router
public_title: Enrutador Zenoh
short_description: Recopila métricas de red de los enrutadores Zenoh.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Category::IoT
  - Offering::Integration
  - Queried Data Type::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Recopila métricas de los enrutadores Zenoh.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Enrutador Zenoh
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza el enrutador Zenoh.

[Zenoh][1] es un protocolo de red de código abierto Zero Overhead.

Zenoh (/zeno/) es un protocolo de pub/sub/consulta que unifica datos en movimiento, datos en reposo y cálculos. Combina con elegancia el almacenamiento pub/sub tradicional con el almacenamiento geodistribuido, las consultas y los cálculos, al tiempo que mantiene un nivel de eficiencia temporal y espacial muy superior al de cualquiera de los stacks tecnológicos convencionales.

La integración del enrutador Zenoh te permite monitorizar métricas del enrutador y estados de conexión del enrutador/par/cliente en Datadog.

## Configuración

### Instalación con el Datadog Agent (v7.21+ y v6.21+)

Para Agent v7.21+/v6.21+, sigue las siguientes instrucciones para instalar el check del enrutador Zenoh en tu host.

1. En tu host, ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-zenoh_router==<INTEGRATION_VERSION>
   ```

### Instalación desde el código fuente

Para instalar el check del enrutador Zenoh en tu host:

1. Instala el [kit de herramientas para desarrolladores][2] en cualquier máquina.

2. Ejecuta `ddev release build zenoh_router` para crear el paquete.

3. Carga el artefacto de creación en cualquier host con [el Agent instalado][3]

4. En el host, ejecuta `datadog-agent integration install -w path/to/zenoh_router/dist/<ARTIFACT_NAME>.whl`.

### Configuración

1. Asegúrate de que el [complemento de la API de Zenoh REST][4] esté activado.

2. Edita el archivo `zenoh_router.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][5] para empezar a recopilar tus [métricas](#metrics) del enrutador Zenoh.
Consulta en el [ejemplo de zenoh_router.d/conf.yaml][6] todas las opciones disponibles de configuración.

3. [Reinicia el Agent][7].

### Validación

Ejecuta el [subcomando de estado del Agent][8] y busca `zenoh_router` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "zenoh-router" >}}


### Eventos

El enrutador Zenoh no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "zenoh-router" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].


[1]: https://zenoh.io/
[2]: https://docs.datadoghq.com/es/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://zenoh.io/docs/apis/rest/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/datadog_checks/zenoh_router/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/