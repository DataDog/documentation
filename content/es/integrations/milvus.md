---
app_id: milvus
app_uuid: 38ddb395-6770-4b81-9730-e43cf4b4b2a0
assets:
  dashboards:
    Milvus Overview: assets/dashboards/milvus_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: milvus.build_info
      metadata_path: metadata.csv
      prefix: milvus.
    process_signatures:
    - milvus
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30880529
    source_type_name: Milvus
  logs:
    source: milvus
  monitors:
    DML channel lag: assets/monitors/dml_channel_lag.json
    Index build latency: assets/monitors/index_build_latency.json
    Request latency: assets/monitores/request_latency.json
  saved_views:
    Milvus Error Logs Overview: assets/saved_views/error_logs_overview.json
    Milvus Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/milvus/README.md
display_on_public_website: true
draft: false
git_integration_title: milvus
integration_id: milvus
integration_title: Milvus
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: milvus
public_title: Milvus
short_description: Monitoriza el rendimiento y el uso de tus despliegues Milvus.
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
  - Category::AI/ML
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Monitoriza el rendimiento y el uso de tus despliegues Milvus.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Milvus
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Milvus][1] a través del Datadog Agent. Proporciona información sobre el rendimiento de tu despliegue Milvus mediante la recopilación de información sobre la latencia y el número de ejecuciones de operaciones individuales. Esta integración también permite monitorizar el tamaño y la asignación de recursos de tu despliegue.

## Configuración

### Instalación

El check de Milvus está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Host

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

{{< tabs >}}
{{% tab "Host" %}}

1. Edita el archivo `milvus.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Milvus. Para conocer todas las opciones de configuración disponibles, consulta el [milvus.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/milvus/datadog_checks/milvus/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### En contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de estas instrucciones.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Logs

La integración Milvus puede recopilar logs de pods y contenedores Milvus.

{{< tabs >}}
{{% tab "Host" %}}

Aplica esta opción si quieres recopilar logs de contenedores Milvus autónomos.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `milvus.d/conf.yaml`. A continuación podrás ver un ejemplo:

   ```yaml
   logs:
     - type: docker
       source: milvus
       service: milvus
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Aplica esta opción si quieres recopilar logs de un clúster Kubernetes Milvus.

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][1].

A continuación, configura las integraciones de logs como anotaciones de pod. Esto también se puede configurar con un archivo, un configmap o un almacén de clave-valor. Para obtener más información, consulta la sección [Recopilación de logs de Kubernetes][2].

[1]: https://docs.datadoghq.com/es/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `milvus` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "milvus" >}}


### Eventos

La integración Milvus no incluye eventos.

### Checks de servicios

La integración Milvus no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].



[1]: https://milvus.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/