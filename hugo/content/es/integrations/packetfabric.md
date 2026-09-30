---
app_id: packetfabric
app_uuid: da10a120-217b-40f3-8b7f-7dc2fdea3b94
assets:
  dashboards:
    PacketFabric-Metrics: assets/dashboards/metrics_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - packetfabric.ifd_traffic_rate_metric
      - packetfabric.ifl_traffic_rate_metric
      metadata_path: metadata.csv
      prefix: packetfabric.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8623825
    source_type_name: PacketFabric
  oauth: assets/oauth_clients.json
author:
  homepage: https://packetfabric.com
  name: PacketFabric
  sales_email: sales@packetfabric.com
  support_email: support@packetfabric.com
categories:
- la red
- nube
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/packetfabric/README.md
display_on_public_website: true
draft: false
git_integration_title: packetfabric
integration_id: packetfabric
integration_title: PacketFabric
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: packetfabric
public_title: PacketFabric
short_description: Sincronizar métricas de PacketFabric con Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Sincronizar métricas de PacketFabric con Datadog
  media:
  - caption: Dashboard de métricas de PacketFabric
    image_url: images/metrics_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: PacketFabric
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[PacketFabric][1] es un proveedor global de red como servicio (NaaS) que ofrece servicios de conectividad segura, privada y bajo demanda.

Puedes utilizar PacketFabric para construir rápida y fácilmente una sólida red entre plataformas en la nube, proveedores de SaaS y cientos de centros de colocación de todo el [mundo][2].

Con esta integración, puedes aprovechar Datadog para monitorizar tus datos de tráfico de red de PacketFabric, por ejemplo
- Métricas de tasa de tráfico para interfaces físicas
- Métricas de tasa de tráfico para interfaces lógicas

![Dashboard de métricas][3]

## Configuración

### Instalación

1. Ve a la integración de PacketFabric en Datadog. 
2. Haz clic en **Install Integration** (Instalar integración).
3. En la pestaña **Configure** (Configurar), haz clic en **Connect Accounts** (Conectar cuentas). 
4. Se te redirigirá a la página de inicio de sesión de PacketFabric. Introduce tus credenciales para acceder. 
5. Aparecerá una página solicitando permisos a Datadog. Haz clic en **Authorize** (Autorizar). 

Una vez autorizado, las métricas se enviarán desde PacketFabric a Datadog cada 15 minutos como parte de una tarea programada. 


## Desinstalación

Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores. 

Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la página Claves de API.  


## Datos recopilados

### Métricas
Consulta [metadata.csv][4] para ver una lista de las métricas proporcionadas por esta integración.


## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de PacketFabric][5].

[1]: https://packetfabric.com
[2]: https://packetfabric.com/locations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/packetfabric/images/metrics_dashboard.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/packetfabric/metadata.csv
[5]: mailto:support@packetfabric.com