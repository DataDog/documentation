---
app_id: oceanbase-cloud
app_uuid: a42252f6-63f8-4da8-bce9-c765f30e7771
assets:
  dashboards:
    OceanBase Cloud Overview: assets/dashboards/oceanbasecloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: oceanbase_cloud.sql_all_count
      metadata_path: metadata.csv
      prefix: oceanbase_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15206722
    source_type_name: OceanBase Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://en.oceanbase.com
  name: OceanBase
  sales_email: OceanBaseSales@oceanbase.com
  support_email: eco-products@service.oceanbase.com
categories:
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/oceanbasecloud/README.md
display_on_public_website: true
draft: false
git_integration_title: oceanbasecloud
integration_id: oceanbase-cloud
integration_title: OceanBase Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oceanbasecloud
public_title: OceanBase Cloud
short_description: Monitorización de clústeres de OceanBase Cloud con Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Cloud
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitorización de clústeres de OceanBase Cloud con Datadog
  media:
  - caption: Información general del dashboard de Datadog de OceanBase Cloud
    image_url: images/ob-dashboard.jpg
    media_type: imagen
  - caption: Métricas de rendimiento del host del dashboard de Datadog de OceanBase
      Cloud
    image_url: images/ob-host.jpg
    media_type: imagen
  - caption: Métricas de rendimiento de SQL del dashboard de Datadog de OceanBase
      Cloud
    image_url: images/ob-sql.jpg
    media_type: imagen
  - caption: Métricas de transacción del dashboard de Datadog de OceanBase Cloud
    image_url: images/ob-transaction.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: OceanBase Cloud
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[OceanBase Database][1] es una base de datos relacional distribuida. OceanBase Database adopta una arquitectura integrada desarrollada de forma independiente, que engloba tanto la escalabilidad de una arquitectura distribuida como la ventaja de rendimiento de una arquitectura centralizada.

[OceanBase Cloud][2] ofrece servicios de base de datos totalmente gestionados con escalabilidad elástica, rendimiento ultrarrápido y alta compatibilidad en la infraestructura global en la nube.

Con la integración de Oceanbase Cloud, los usuarios pueden recopilar diversos datos de monitorización para los clústeres de bases de datos creados en OceanBase Cloud en Datadog, incluidos el estado operativo, el rendimiento del clúster y el estado del clúster.

## Configuración

Para configurar la integración de OceanBase Cloud Datadog para tu clúster, consulta los siguientes pasos
1. Inicia sesión en la consola de Datadog.
    a. Elige el sitio adecuado en los [sitios de Datadog][3].
    b. Inicia sesión con tus credenciales de Dotadog.
2. Accede a la consola de OceanBase Cloud utilizando tus credenciales de OceanBase Cloud, navega hasta la página [integraciones][4] y busca la integración de Datadog.
3. Haz clic en Connect (Conectar). Se te redirigirá a la página de autorización de Datadog. Si no has iniciado sesión en Datadog antes de este paso, deberás seleccionar el sitio apropiado e iniciar sesión en la página de autorización abierta.
4. Haz clic en Authorize (Autorizar). Se te redirigirá de nuevo a la consola de OceanBase Cloud. Si la autorización se ha realizado correctamente, aparecerá un mensaje de notificación. Ponte en contacto con el soporte técnico de OceanBase Cloud si se produce un error.
5. Busca OceanBase en la consola de Datadog y haz clic en Install (Instalar). Los datos de monitorización para tu instancia de OceanBase Cloud aparecerán en unos minutos en la página de dashboards de Datadog.

## Desinstalación

1. Inicia sesión en la consola de OceanBase Cloud, ve a [OceanBase Cloud Integrations][4] (integraciones de OceanBase) y busca el producto de Datadog.
2. Haz clic en el botón de eliminar, una notificación se mostrará se realiza correctamente.

Una vez desinstalada esta integración, se revocarán todas las autorizaciones anteriores.
Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la página API Keys (Claves de API).

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oceanbase-cloud" >}}


### Checks de servicio

La integración de OceanBase Cloud no incluye ningún check de servicio.

### Eventos

La integración de OceanBase Cloud no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de OceanBase][6].

[1]: https://en.oceanbase.com
[2]: https://en.oceanbase.com/product/cloud
[3]: https://docs.datadoghq.com/es/getting_started/site
[4]: https://cloud.oceanbase.com/integrations
[5]: https://github.com/DataDog/integrations-extras/blob/master/oceanbasecloud/metadata.csv
[6]: https://en.oceanbase.com/docs/oceanbase-cloud
