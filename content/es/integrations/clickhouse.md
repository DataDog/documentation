---
app_id: clickhouse
app_uuid: 668f43c1-bdd8-4686-bb92-d40f0c48fda9
assets:
  dashboards:
    ClickHouse Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: clickhouse.query.active
      metadata_path: metadata.csv
      prefix: clickhouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10078
    source_type_name: ClickHouse
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md
display_on_public_website: true
draft: false
git_integration_title: clickhouse
integration_id: clickhouse
integration_title: ClickHouse
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: clickhouse
public_title: ClickHouse
short_description: Monitoriza el estado y el rendimiento de tus clústeres de ClickHouse.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de tus clústeres de ClickHouse.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ClickHouse
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [ClickHouse][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de ClickHouse está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

#### Recopilación de métricas

1. Para comenzar a recopilar tus datos de rendimiento de ClickHouse, edita el archivo `clickhouse.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent. Para conocer todas las opciones de configuración disponibles, consulta el [clickhouse.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

##### Recopilación de logs

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade los archivos de logs que te interesan a tu archivo `clickhouse.d/conf.yaml` para empezar a recopilar tus logs de ClickHouse:

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [clickhouse.d/conf.yaml de ejemplo][1] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `clickhouse`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Recopilación de logs

La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `clickhouse` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "clickhouse" >}}


### Eventos

El check de ClickHouse no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "clickhouse" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].



[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/