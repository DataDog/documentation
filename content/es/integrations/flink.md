---
app_id: flink
app_uuid: 39d70c50-017c-407a-9117-2055d8e03427
assets:
  dashboards:
    Flink Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flink.taskmanager.Status.JVM.CPU.Load
      metadata_path: metadata.csv
      prefix: flink.
    process_signatures:
    - java org.apache.flink.client.python.PythonShellParser
    - java org.apache.flink.container.entrypoint.StandaloneApplicationClusterEntryPoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesSessionClusterEntrypoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
    - java org.apache.flink.kubernetes.taskmanager.KubernetesTaskExecutorRunner
    - java org.apache.flink.kubernetes.cli.KubernetesSessionCli
    - java org.apache.flink.runtime.taskexecutor.TaskManagerRunner
    - java org.apache.flink.runtime.zookeeper.FlinkZooKeeperQuorumPeer
    - java org.apache.flink.runtime.webmonitor.history.HistoryServer
    - java org.apache.flink.runtime.entrypoint.StandaloneSessionClusterEntrypoint
    - java org.apache.flink.table.gateway.SqlGateway
    - java org.apache.flink.table.client.SqlClient
    - java org.apache.flink.yarn.cli.FlinkYarnSessionCli
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10088
    source_type_name: flink
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/flink/README.md
display_on_public_website: true
draft: false
git_integration_title: flink
integration_id: flink
integration_title: Flink
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: flink
public_title: Flink
short_description: Realiza el seguimiento de métricas de tus tareas de Flink.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza el seguimiento de métricas de tus tareas de Flink.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Flink
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Flink][1]. Datadog recopila métricas de Flink a través del
[Reportador HTTP de Datadog][2] de Flink, que utiliza la [API HTTP de Datadog][3].

## Configuración

### Instalación

El check de Flink está incluido en el paquete del [Datadog Agent][4].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Recopilación de métricas

1. Configura el [Reportador HTTP de Datadog][2] en Flink.

   En tu `<FLINK_HOME>/conf/flink-conf.yaml`, añade estas líneas, sustituyendo `<DATADOG_API_KEY>` por tu [clave de API][5] Datadog:

    ```yaml
    metrics.reporter.dghttp.factory.class: org.apache.flink.metrics.datadog.DatadogHttpReporterFactory
    metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
    metrics.reporter.dghttp.dataCenter: US #(optional) The data center (EU/US) to connect to, defaults to US.
    ```

2. Vuelve a asignar contextos de sistema en tu `<FLINK_HOME>/conf/flink-conf.yaml`.

    ```yaml
    metrics.scope.jm: flink.jobmanager
    metrics.scope.jm.job: flink.jobmanager.job
    metrics.scope.tm: flink.taskmanager
    metrics.scope.tm.job: flink.taskmanager.job
    metrics.scope.task: flink.task
    metrics.scope.operator: flink.operator
    ```

   **Nota**: Los contextos de sistema deben ser reasignados para que tus métricas de Flink sean compatibles, de lo contrario se envían como métricas personalizadas.

3. Configura [etiquetas (tags)][2] adicionales en `<FLINK_HOME>/conf/flink-conf.yaml`. El siguiente es un ejemplo de etiquetas personalizadas:

    ```yaml
    metrics.reporter.dghttp.scope.variables.additional: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

   **Nota**: Por defecto, cualquier variable en los nombres de las métrica se envía como etiqueta, por lo que no es necesario añadir etiquetas personalizadas para `job_id`, `task_id`, etc.

4. Reinicia Flink para empezar a enviar tus métricas de Flink a Datadog.

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. Flink utiliza el generador de logs `log4j` por defecto. Para habilitar la generación de logs en un archivo, personaliza el formato editando los archivos de configuración `log4j*.properties` en el directorio `conf/` de la distribución de Flink. Consulta la [documentación de generación de logs de Flink][6] para obtener información sobre qué archivo de configuración es relevante para tu configuración. Consulta el [repositorio de Flink][7] para ver las configuraciones predeterminadas.

2. Por defecto, el pipeline de la integración admite el siguiente patrón de diseño:

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   Un ejemplo de marca de tiempo válida es: `2020-02-03 18:43:12,251`.

   Clona y edita el [pipeline de la integración][8] si tienes un formato diferente.

3. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

4. Descomenta y edita el bloque de configuración de logs en tu archivo `flink.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [flink.d/conf.yaml de ejemplo][9] para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/flink/server.log
       source: flink
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

5. [Reinicia el Agent][10].

### Validación

[Ejecuta el subcomando de estado del Agent][11] y busca `flink` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "flink" >}}


### Checks de servicio

Flink no incluye checks de servicio.

### Eventos

Flink no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].


[1]: https://flink.apache.org/
[2]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog
[3]: https://docs.datadoghq.com/es/api/?lang=bash#api-reference
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/advanced/logging/
[7]: https://github.com/apache/flink/tree/release-1.16/flink-dist/src/main/flink-bin/conf
[8]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines
[9]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[13]: https://docs.datadoghq.com/es/help/