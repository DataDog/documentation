---
app_id: singlestoredb-cloud
app_uuid: c7638089-0864-4ddc-bd32-b731c58fe567
assets:
  dashboards:
    singlestoredb_cloud_overview: assets/dashboards/singlestoredb_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: singlestoredb_cloud.cpu_resource_limits
      metadata_path: metadata.csv
      prefix: singlestoredb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10373
    source_type_name: SinglestoreDB Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.singlestore.com
  name: Singlestore
  sales_email: info@singlestore.com
  support_email: support@singlestore.com
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestoredb_cloud
integration_id: singlestoredb-cloud
integration_title: SingleStoreDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: singlestoredb_cloud
public_title: SingleStoreDB Cloud
short_description: Enviar tus métricas de SinglestoreDB Cloud a Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Enviar tus métricas de SinglestoreDB Cloud a Datadog
  media:
  - caption: 'SinglestoreDB Cloud: dashboard'
    image_url: images/singlestoredb-cloud-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: SingleStoreDB Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

SingleStoreDB Cloud es una base de datos distribuida y relacional con velocidad y escalabilidad optimizadas para admitir aplicaciones con alta carga de datos y en tiempo real. Utilizando esta integración, puedes monitorizar el estado general y el rendimiento de un grupo/clúster de espacio de trabajo de SingleStoreDB Cloud. Para integrar Datadog con SingleStoreDB Cloud, instala la integración de Datadog SingleStore y luego configúrala en el [Portal de Cloud][1]. 

Conecta SinglestoreDB Cloud a Datadog para:

- Visualizar métricas clave de SinglestoreDB Cloud
- Mejorar la eficiencia en la utilización de los recursos
- Observar la tasa de consultas y el rendimiento
- Correlacionar el rendimiento de SinglestoreDB con el del resto de tus aplicaciones

## Configuración

### Instalar la integración de SingleStoreDB Cloud en Datadog

1. Navega hasta el cuadro de integración de [SingleStoreDB Cloud][2] en Datadog.
3. Selecciona **Install Integration** (Instalar integración) y espera a que finalice la instalación antes de continuar.
4. En la pestaña **Configure** (Configurar), selecciona **Connect Accounts** (Conectar cuentas). Esta acción te lleva al [Portal de Cloud][1] para autorizar la integración a través de OAuth.

Los pasos anteriores sólo deben realizarse una vez para conectar tu primer grupo de espacios de trabajo con Datadog. Una vez instalada la integración y conectadas las cuentas, sigue los pasos especificados en [Configurar la integración de Datadog en el Portal de Cloud](#configure-the-datadog-integration-in-the-cloud-portal) para conectar grupos de espacios de trabajo consecutivos. 

### Configurar la integración de Datadog en el Portal de Cloud

Para conectar tu grupo de espacios de trabajo de SingleStoreDB Cloud con Datadog:

1. Inicia sesión en el Portal de Cloud. Al iniciar sesión, accederás a la página **Integration** (Integración). También puedes seleccionar **Monitoring > Integration** (Monitorización > Integración) en el panel de navegación izquierdo para acceder a esta página.
2. De la lista de integraciones disponibles, selecciona **+ Integration** (+ Integración) para Datadog.
3. En el cuadro de diálogo **Create Datadog Integration** (Crear integración de Datadog), en la lista **Workspace Group** (Grupo de espacios de trabajo), selecciona tu grupo de espacios de trabajo.
4. Selecciona **Create** (Crear). Esta acción te llevará a la página de inicio de sesión de Datadog. Después de iniciar sesión en Datadog, continúa con el siguiente paso.
5. En la pantalla **Authorize access** (Autorizar acceso), selecciona el botón **Authorize** (Autorizar). Una vez obtenida la autorización, accederás a la página **Integración** del Portal de Cloud.

Ahora puedes monitorizar tus bases de datos de SingleStoreDB Cloud utilizando Datadog.

### Desinstalar la integración de Datadog

Sigue estos pasos para desinstalar la integración de Datadog:

1. **Desinstalar la integración de SingleStoreDB Cloud en Datadog**: en Datadog, navega hasta el [cuadro de integración de SingleStore DB Cloud][2] y haz clic en **Uninstall Integration** (Desinstalar integración). Una vez desinstalada la integración, todas las autorizaciones anteriores serán revocadas.
2. **Eliminar la integración de Datadog del Portal de SingleStore Cloud**: en el Portal de Cloud, ve a **Monitoring > Integration** (Monitorización > Integración). Selecciona **Delete** (Eliminar) para cada configuración de Datadog que desees eliminar. 

Además, elimina todas las claves de API asociadas a esta integración.

Para detener la monitorización de un grupo de espacios de trabajo específico (y conservar la integración), navega hasta el Portal de SingleStore DB Cloud y selecciona **Delete** (Eliminar) (**Cloud Portal > Monitoring > Integration** (Portal de Cloud > Monitorización > Integración)) para eliminar la configuración de Datadog para este grupo de espacios de trabajo.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "singlestoredb_cloud" >}}


### Checks de servicio

SingleStoreDB Cloud no incluye ningún check de servicio.

### Eventos

SingleStoreDB Cloud no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].


[1]: https://portal.singlestore.com
[2]: https://app.datadoghq.com/integrations/singlestoredb-cloud
[3]: https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/metadata.csv
[4]: https://docs.datadoghq.com/es/help/