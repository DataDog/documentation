---
app_id: cockroach-cloud
app_uuid: e0ab9a47-da5b-4008-8571-3842ac318f74
assets:
  dashboards:
    cockroach_cloud_dedicated_overview: assets/dashboards/cockroach_cloud_dedicated_overview.json
    cockroach_cloud_serverless_overview: assets/dashboards/cockroach_cloud_serverless_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - crdb_dedicated.sys.uptime
      - crdb_cloud.sys.uptime
      metadata_path: metadata.csv
      prefix: crdb_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10274
    source_type_name: CockroachDB Dedicated
  logs:
    source: cockroach-cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb_dedicated
integration_id: cockroach-cloud
integration_title: Cockroach Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cockroachdb_dedicated
public_title: Cockroach Cloud
short_description: Envía tus métricas de Cockroach Cloud a Datadog.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Envía tus métricas de Cockroach Cloud a Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cockroach Cloud
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

La integración de CockroachDB Cloud para Datadog permite la recopilación de datos y la alerta en un subconjunto de métricas de CockroachDB mediante la utilización de la plataforma Datadog. 

## Configuración

### Instalación

Para activar la monitorización de Datadog para un clúster de Cockroach Cloud:

1. En la **Monitorización** del clúster > [página de **Herramientas**][1].

2. Completa los campos **Clave de la API** y **Sitio de Datadog** con los valores correspondientes.
    - La **clave de la API** está asociada a tu organización de Datadog. Si no tienes una clave de la API para utilizar con tu clúster de Cockroach Cloud, necesitas crear una. Para obtener instrucciones, consulta la [documentación de Datadog][2].
    - Tu **Sitio de Datadog** corresponde a la URL de tu sitio de Datadog. Para obtener más detalles, consulta la [documentación de Datadog][3].

3. Haz clic en **Crear**. En función del tamaño de tu clúster y de la carga actual del sistema, la integración puede tardar algún tiempo para activarse.

4. Una vez registrado en Datadog, el clúster aparecerá en tu Datadog [lista de infraestructuras][4]. Esto puede tardar hasta varios minutos.

### Configuración

Abre tu Datadog [lista de dashboards][5]. Hay dos dashboards predefinidos que presentan métricas de CockroachDB
- CockroachDB Cloud serverless (Vista previa limitada)
- CockroachDB Cloud Dedicated

Para crear tu propio dashboard de Cockroach Cloud, puedes [clonar][6] el dashboard `CockroachDB Cloud Dedicated` predeterminado y editar los widgets o [crear un nuevo dashboard][7].

Las [métricas disponibles][8] están pensadas como bloques de creación para tus propios gráficos.

Para previsualizar las métricas que se están recopilando, puedes:

- Hacer clic en la entrada de tu clúster en la [lista de infraestructuras][4] para ver los gráficos de series temporales de cada métrica disponible.
- Utilizar el [explorador de métricas][9] para buscar y ver las métricas de `crdb_cloud` o `crdb_dedicated`.

### Validación

Una vez activado, el **estado de integración** en el panel de **Datadog** de la página de **Monitorización** se mostrará como `Active`.

Si se encuentra un problema durante la integración, en su lugar puede aparecer uno de los siguientes estados:
- `Active` indica que la integración se ha desplegado correctamente.
- `Inactive` indica que la integración no se ha desplegado correctamente. No se ha intentado la configuración o se ha producido un error.
- `Unhealthy` indica que la clave de la API de la integración no es válida y necesita ser [actualizada](#update-integration).
- `Unknown` indica que se ha producido un error desconocido. Si se muestra este estado, [ponte en contacto con nuestro equipo de asistencia][10].

La exportación de métricas desde CockroachDB puede interrumpirse en los siguientes casos:

- Una clave de la API obsoleta. En este caso, el estado de la integración será `Unhealthy`. Para resolver el problema, [actualiza tu integración](#update-integration) con una nueva clave de la API.
- No disponibilidad transitoria de CockroachDB. En este caso, el estado de la integración seguirá siendo `Active`. Para resolver el problema, intenta [desactivar](#deactive-integration) y vuelve a activar la integración desde el panel de **Datadog**. Si esto no resuelve el problema, [ponte en contacto con nuestro equipo de asistencia][10].

Para monitorizar el mantenimiento de la exportación de métricas, puedes crear una monitorización personalizada en Datadog. 

### Actualizar la integración

Para actualizar los metadatos asociados a la integración (por ejemplo, para rotar las claves de la API):

1. En el panel de **Datadog**, haz clic en la elipsis y selecciona **Actualizar**.

1. Actualiza los campos **clave de la API** y **sitio de Datadog** y haz clic en **Crear**. Se volverá a desplegar la integración. 

### Desactivar la integración

Para desactivar la integración:

1. En el panel de **Datadog**, haz clic en la elipsis y selecciona **Desactivar la integración**.

1. Cuando esté desactivada, el **estado de la integración** en el panel se mostrará como `Inactive`.

Tras desactivar una integración, los datos de las métricas permanecen en Datadog durante un [periodo de retención] predeterminado[11]. 

## Datos recopilados

### Métricas

- `crdb_cloud` y `crdb_dedicated` [métricas][12]

### Checks de servicio

La integración de Cockroach Cloud no incluye ningún check de servicio.

### Eventos

La integración de Cockroach Cloud no incluye ningún evento.

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13].


[1]: https://www.cockroachlabs.com/docs/cockroachcloud/tools-page
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.datadoghq.com/es/infrastructure/list/
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://docs.datadoghq.com/es/dashboards/configure/#configuration-actions
[7]: https://docs.datadoghq.com/es/dashboards/#new-dashboard
[8]: https://docs.datadoghq.com/es/integrations/cockroachdb_dedicated/#data-collected
[9]: https://docs.datadoghq.com/es/metrics/explorer/
[10]: https://support.cockroachlabs.com/
[11]: https://docs.datadoghq.com/es/developers/guide/data-collection-resolution-retention/
[12]: https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/metadata.csv
[13]: https://docs.datadoghq.com/es/help/