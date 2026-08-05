---
app_id: yugabytedb-managed
app_uuid: c5cf1ad4-fa3f-4835-9f3b-f467288b382a
assets:
  dashboards:
    yugabytedb_managed_overview: assets/dashboards/yugabytedb_managed_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ybdb.up
      metadata_path: metadata.csv
      prefix: ybdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10408
    source_type_name: YugabyteDB Managed
author:
  homepage: https://yugabyte.com/
  name: YugabyteDB
  sales_email: sales@yugabyte.com
  support_email: support@yugabyte.com
categories:
- almacenes de datos
- nube
- aws
- azure
- google cloud
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/README.md
display_on_public_website: true
draft: false
git_integration_title: yugabytedb_managed
integration_id: yugabytedb-managed
integration_title: YugabyteDB Managed
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: yugabytedb_managed
public_title: YugabyteDB Managed
short_description: Exportar métricas de clúster YugabyteDB Managed a Datadog
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Categoría::Nube
  - Categoría::AWS
  - Categoría::Azure
  - Categoría::Google Cloud
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Exportar métricas de clúster YugabyteDB Managed a Datadog
  media:
  - caption: Dashboard de información general de YugabyteDB Managed
    image_url: images/overview.png
    media_type: imagen
  - caption: Gráficos para la monitorización de métricas YSQL
    image_url: images/ysql.png
    media_type: imagen
  - caption: Gráficos para la monitorización de métricas YCQL
    image_url: images/ycql.png
    media_type: imagen
  - caption: Gráficos para monitorizar métricas de nodo/infraestructura
    image_url: images/infrastructure.png
    media_type: imagen
  - caption: Gráficos para monitorizar métricas de servidor principal
    image_url: images/master.png
    media_type: imagen
  - caption: Gráficos para monitorizar métricas de servidor tablet
    image_url: images/tserver.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: YugabyteDB Managed
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[YugabyteDB][1] es una base de datos distribuida y nativa en la nube cuya API es compatible con PostgreSQL.

[YugabyteDB Managed][2] es la base de datos como servicio (DBaaS) totalmente gestionada de YugabyteDB. Con esta integración, puedes enviar tus métricas de clúster a Datadog para obtener una visibilidad del estado y el rendimiento de tus clústeres YugabyteDB Managed. Esta integración viene con un dashboard predefinido para proporcionar una visibilidad de todas las métricas más importantes, necesarias para monitorizar el estado y el rendimiento de un clúster YugabyteDB Managed, como:
- Uso de recursos de nodo (disco, memoria, CPU, red, etc.).
- Rendimiento y latencia de las operaciones de lectura/escritura (tanto YSQL como YCQL).
- Telemetría avanzada de servidor maestro y tablet (por ejemplo, rendimiento/latencias RPC internas y rendimiento de lectura/escritura WAL).

## Configuración
**Nota**: Esta función no está disponible para [clústeres sandbox][3].

### Instalación

Para habilitar la integración de YugabyteDB Managed con Datadog:

#### Crear un configuración
1. En YugabyteDB Managed, ve a la pestaña **Integraciones > Métricas**.
2. Haz clic en **Create Export Configuration** (Crear configuración de exportación) o **Add Export Configuration** (Añadir configuración de exportación).
3. Selecciona el proveedor **Datadog**.
4. Rellena los campos **Clave de API** y **Sitio** con los valores correspondientes. Para obtener más información, consulta la documentación [API y claves de aplicación Datadog][4] y [URL del sitio Datadog][5].
5. Haz clic en **Test Configuration** (Probar configuración) para validar la configuración.
6. Haz clic en **Create Configuration** (Crear configuración).

#### Asociar una configuración a un clúster
1. En YugabyteDB Managed, ve a la pestaña **Integraciones > Métricas**.
2. Busca tu clúster en la tabla **Exportar métricas por clúster**.
3. Selecciona la configuración deseada en el menú desplegable **Exportar configuración**.
4. Espera a que el **Estado de la exportación** esté `Active`.

**Nota**: Tu clúster no puede asociar una configuración cuando está en pausa o cuando otra operación está en curso.

Para obtener más información sobre la configuración, consulta la [documentación de YugabyteDB][6].

## Desinstalación

Para desactivar la exportación de métricas a Datadog:
1. En YugabyteDB Managed, ve a la pestaña **Integraciones > Métricas**.
2. Busca tu clúster en la tabla **Exportar métricas por clúster**.
3. Abre el desplegable de tu clúster en **Exportar configuración** y selecciona `None`.
4. Espera a que el **Estado de la exportación** esté `-`.

**Nota**: Tu clúster no puede asociar una configuración cuando está en pausa o cuando otra operación está en curso.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "yugabytedb-managed" >}}


### Checks de servicio

YugabyteDB Managed no incluye checks de servicios.

### Eventos

YugabyteDB Managed no incluye eventos.

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de YugabyteDB][8].


[1]: https://yugabyte.com/
[2]: https://www.yugabyte.com/managed/
[3]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-basics/create-clusters/create-clusters-free/
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/es/getting_started/site/
[6]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-monitor/metrics-export/#datadog
[7]: https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/metadata.csv
[8]: https://support.yugabyte.com/hc/en-us/requests/new