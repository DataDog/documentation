---
app_id: buoyant-cloud
app_uuid: dee4b74f-34b7-457e-98b1-7bb8306f2c18
assets:
  dashboards:
    Buoyant Cloud: assets/dashboards/buoyant_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - buoyant_cloud.cp_workload.inbound_response.rate1m
      metadata_path: metadata.csv
      prefix: buoyant_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10320
    source_type_name: Buoyant Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://buoyant.io/cloud
  name: Buoyant
  sales_email: cloud@buoyant.io
  support_email: cloud@buoyant.io
categories:
- nube
- la red
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: buoyant_cloud
integration_id: buoyant-cloud
integration_title: Buoyant Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: buoyant_cloud
public_title: Buoyant Cloud
short_description: Buoyant Cloud integra la red de servicios Linkerd totalmente gestionada
  directamente en tu clúster.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Buoyant Cloud integra la red de servicios Linkerd totalmente gestionada
    directamente en tu clúster.
  media:
  - caption: 'Buoyant Cloud: dashboard de Datadog'
    image_url: images/bcloud_datadog_dashboard.png
    media_type: imagen
  - caption: 'Buoyant Cloud: página de información general'
    image_url: images/bcloud_01.png
    media_type: imagen
  - caption: 'Buoyant Cloud: vista del estado de Linkerd'
    image_url: images/bcloud_02.png
    media_type: imagen
  - caption: 'Buoyant Cloud: evento gestionado de Linkerd'
    image_url: images/bcloud_03.png
    media_type: imagen
  - caption: 'Buoyant Cloud: página de tráfico'
    image_url: images/bcloud_04.png
    media_type: imagen
  - caption: 'Buoyant Cloud: página de topología'
    image_url: images/bcloud_05.png
    media_type: imagen
  - caption: 'Buoyant Cloud: página de métricas'
    image_url: images/bcloud_06.png
    media_type: imagen
  - caption: 'Buoyant Cloud: página de detalles de la carga de trabajo'
    image_url: images/bcloud_07.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Buoyant Cloud
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Buoyant Cloud][1] integra la red de servicios Linkerd totalmente gestionada directamente en tu clúster para monitorizar el estado de Linkerd y los despliegues. Con esta integración, puedes monitorizar y recibir alertas sobre el estado de Linkerd, el tráfico de la carga de trabajo, los eventos de implementación y las métricas.

## Configuración

### Instalación

Tienes que tener una cuenta en [Buoyant Cloud][1] para usar esta integración. También puedes suscribirte a Buoyant Cloud en el Datadog Marketplace.

### Configuración

1. Haz clic en el botón **Connect Accounts** (Conectar cuentas) en cuadro para completar el flujo de OAuth.
2. Ve a la página [Buoyant Cloud Notifications][2] (Notificaciones de Buoyant Cloud).
3. Añade o edita una regla en **Events** (Eventos) o **Metrics** (Métricas).
4. Ve a la sección **Destinations** (Destinos) y selecciona tu cuenta de Datadog para enviar todos los eventos o métricas que coincidan con la regla de notificación a Datadog.

### Validación

A medida que Buoyant Cloud cree eventos, estos aparecerán en el [explorador de eventos][3] de Datadog. Las métricas aparecerán en el [explorador de métricas][4] de Datadog.

## Desinstalación

1. Ve a la página [Buoyant Cloud Settings][5] (Configuración de Buoyant Cloud).
2. Haz clic en el menú kebab situado a la derecha de tu organización de Datadog.
3. Haz clic en **Remove** (Eliminar).

Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado buscando el nombre de la integración en la [página API Keys][6] (Claves de API).

## Datos recopilados

### Eventos

Buoyant Cloud envía los siguientes [eventos][3] a Datadog:

- Alertas sobre el estado de Linkerd
- Alertas sobre la configuración de Linkerd
- Alertas sobre el tráfico de la carga de trabajo
- Implementaciones de la carga de trabajo
- Eventos manuales

### Métricas

Para ver la lista de métricas de esta integración, consulta [metadata.csv][7].

## Resolución de problemas

¿Necesitas ayuda? Obtén ayuda de las siguientes fuentes:

- Consulta los [documentos de Buoyant Cloud][8].
- Ponte en contacto con alguien en [Linkerd Slack][9].
- [Envía un correo electrónico al equipo de Buoyant Cloud][10].

[1]: https://buoyant.io/cloud
[2]: https://buoyant.cloud/notifications
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://buoyant.cloud/settings
[6]: https://app.datadoghq.com/organization-settings/api-keys?filter=Buoyant%20Cloud
[7]: https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/metadata.csv
[8]: https://docs.buoyant.cloud
[9]: https://slack.linkerd.io
[10]: mailto:cloud@buoyant.io