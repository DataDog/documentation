---
app_id: impala
app_uuid: faf33df8-b1e0-4529-a281-7e176b2365ec
assets:
  dashboards:
    Impala - Catalog - Overview: assets/dashboards/impala_catalog_overview.json
    Impala - Daemon - Overview: assets/dashboards/impala_daemon_overview.json
    Impala - Overview: assets/dashboards/impala_overview.json
    Impala - Statestore - Overview: assets/dashboards/impala_statestore_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: impala.daemon.jvm.gc.count
      metadata_path: metadata.csv
      prefix: impala.
    process_signatures:
    - impalad
    - catálogo
    - statestored
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10301
    source_type_name: Impala
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/impala/README.md
display_on_public_website: true
draft: false
git_integration_title: impala
integration_id: impala
integration_title: Impala
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: impala
public_title: Impala
short_description: Monitorizar el estado y el rendimiento de Apache Impala
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de Apache Impala
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Impala
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Impala][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Impala está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `impala.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar tus datos de rendimiento de Impala. Para conocer todas las opciones de configuración disponibles, consulta el [impala.d/conf.yaml de ejemplo][4].

El siguiente es un ejemplo de monitorización de un daemon:

```yaml
init_config:

instances:
  ## @param service_type - string - required
  ## The Impala service you want to monitor. Possible values are `daemon`, `statestore`, and `catalog`.
  #
- service_type: daemon

  ## @param openmetrics_endpoint - string - required
  ## The URL exposing metrics in the OpenMetrics format.
  ##
  ## The default port for the services are:
  ## - Daemon: 25000
  ## - Statestore: 25010
  ## - Catalog: 25020
  #
  openmetrics_endpoint: http://%%host%%:25000/metrics_prometheus
```

También puedes monitorizar varios servicios al mismo tiempo con el mismo Agent:

```yaml
init_config:

instances:

- service_type: daemon
  service: daemon-1
  openmetrics_endpoint: http://<DAEMON-1-IP>:25000/metrics_prometheus
- service_type: daemon
  service: daemon-2
  openmetrics_endpoint: http://<DAEMON-2-IP>:25000/metrics_prometheus
- service_type: statestore
  openmetrics_endpoint: http://<STATESTORE-IP>:25010/metrics_prometheus
- service_type: catalog
  openmetrics_endpoint: http://<CATALOG-IP>:25020/metrics_prometheus
```

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `impala` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "impala" >}}


### Eventos

La integración Impala no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "impala" >}}


### Logs

La integración Impala puede recopilar logs del servicio Impala y reenviarlos a Datadog. 

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `impalad.d/conf.yaml`. A continuación podrás ver un ejemplo con el proceso daemon:

   ```yaml
   logs:
     - type: file
       path: /var/log/impala/impalad.INFO
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.WARNING
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.ERROR
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.FATAL
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
   ```

Consulta el [ejemplo de archivo de configuración][9] para saber cómo recopilar todos los logs.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://impala.apache.org
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/impala/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/impala/assets/service_checks.json
[9]: https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example#L632-L755
[10]: https://docs.datadoghq.com/es/help/