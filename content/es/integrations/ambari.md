---
app_id: ambari
app_uuid: 081f9cd9-a86a-4cea-ae5b-b4f7e163f413
assets:
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ambari.cpu.cpu_user
      metadata_path: metadata.csv
      prefix: ambari.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10064
    source_type_name: Ambari
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- la red
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ambari/README.md
display_on_public_website: true
draft: false
git_integration_title: ambari
integration_id: ambari
integration_title: Ambari
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: ambari
public_title: Ambari
short_description: Obtener métricas por host o servicio para todos los clústeres gestionados
  de Ambari
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtener métricas por host o servicio para todos los clústeres gestionados
    de Ambari
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambari
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Ambari][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Ambari está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ambari.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Ambari. Para conocer todas las opciones de configuración disponibles, consulta el [ambari.d/conf.yaml de ejemplo][1].

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Reinicia el Agent][2].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Edita tu `ambari.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de Ambari.

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                        |
| -------------------- | ---------------------------- |
| `<INTEGRATION_NAME>` | `ambari`                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%"}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `ambari` en la sección Checks.

## Datos recopilados

Esta integración recopila para cada host de cada clúster las siguientes métricas del sistema:

- boottime
- la cpu
- el disco
- la memoria
- la carga
- la red
- el proceso

Si se habilita la recopilación de métricas de servicio con `collect_service_metrics`, esta integración recopila para cada componente de servicio incluido las métricas con encabezados en la lista de inclusión.

### Métricas
{{< get-metrics-from-git "ambari" >}}


### Eventos

Ambari no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "ambari" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://ambari.apache.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/