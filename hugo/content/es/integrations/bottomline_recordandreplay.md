---
app_id: bottomline-recordandreplay
app_uuid: d87fbcfa-71db-4d62-8264-5d88ba2338ce
assets:
  dashboards:
    Bottomline Record and Replay Overview: assets/dashboards/bottomline_activity_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bottomline.mainframe.activity.resource.duration
      metadata_path: metadata.csv
      prefix: bottomline.mainframe.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10324
    source_type_name: Bottomline Mainframe
  monitors:
    Resource response time is very slow: assets/monitors/bottomline_mainframe_resource_has_problem.json
author:
  homepage: https://www.bottomline.com/
  name: Bottomline Technologies
  sales_email: partner.cfrm@bottomline.com
  support_email: partner.cfrm@bottomline.com
  vendor_id: bottomline
categories:
- mainframes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/README.md
display_on_public_website: true
draft: false
git_integration_title: bottomline_recordandreplay
integration_id: bottomline-recordandreplay
integration_title: 'Record and Replay de Bottomline: Mainframe'
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: bottomline_recordandreplay
public_title: 'Record and Replay de Bottomline: Mainframe'
short_description: 'Monitoriza los 3270/5250 usuarios y recursos de tu mainframe mediante
  el tráfico de red '
supported_os:
- linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframes
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Monitoriza los 3270/5250 usuarios y recursos de tu Mainframe mediante
    el tráfico de red
  media:
  - caption: Sesión de usuarios de Mainframe Record and Replay
    image_url: images/mainframe_replay.png
    media_type: imagen
  - caption: Dashboard de Mainframe Record and Replay
    image_url: images/bt_dashboard.png
    media_type: imagen
  - caption: Información general de Mainframe Record and Replay
    image_url: images/bt_replay.png
    media_type: imagen
  - caption: Arquitectura de Mainframe Record and Replay
    image_url: images/bt_architecture.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: 'Record and Replay de Bottomline: Mainframe'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Mainframe Record and Replay de Bottomline es una solución no invasiva en su capacidad para monitorizar 3270/5250 usuarios a través del tráfico que ayuda a los clientes a monitorizar usuarios y sistemas.

Con esta integración, puedes monitorizar sesiones de Record and Replay de Bottomline en Datadog para proporcionar visibilidad sobre la utilización de recursos, el rendimiento de los recursos, la actividad de los usuarios, los eventos de seguridad y los monitores del sistema. Los clientes también pueden acceder directamente a las reproducciones de sesiones de usuarios a través de Datadog.

### Monitores

Esta integración incluye un monitor que informa cuando un recurso de Mainframe tiene un problema.

### Métricas

Consulta [metadata.csv][1] para obtener una lista de métricas proporcionada por este check.

### Dashboards

**Información general de Bottomline Record and Replay**: Este dashboard ofrece visibilidad sobre qué recursos se están utilizando, el rendimiento de los recursos, la actividad de los usuarios, los eventos de seguridad y los monitores del sistema.

## Configuración

Sigue las instrucciones paso a paso que figuran a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. 

### Requisitos previos

Los siguientes elementos son necesarios para que esta integración se ejecute según lo previsto:
  - Debes tener el Datadog Agent instalado y en funcionamiento.
  - Accede al servidor que ejecuta el Datadog Agent para instalar Record and Replay de Bottomline y modificar las configuraciones del Datadog Agent.
  - Una base de datos compatible (Oracle o Postgres).
  - Un escritorio de Windows para instalar Enterprise Manager de Bottomline para configurar Record y Replay.


### Configuración

Si todavía no eres cliente de Bottomline, visita el [listado de Marketplace de Bottomline][2] para adquirir una licencia.

Sigue las instrucciones descritas [aquí][3] para instalar la integración.

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con [Bottomline][4].


[1]: https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/metadata.csv
[2]: https://app.datadoghq.com/marketplace/app/bottomline-mainframe
[3]: https://github.com/nbk96f1/datadog/tree/main/Documentation
[4]: mailto:partner.cfrm@bottomline.com