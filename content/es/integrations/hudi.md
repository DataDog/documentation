---
app_id: hudi
app_uuid: ee9cd120-9667-4a81-a309-c34f5942406a
assets:
  dashboards:
    Hudi Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hudi.action.duration
      metadata_path: metadata.csv
      prefix: hudi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10217
    source_type_name: Hudi
  monitors:
    Commit duration is high: assets/monitors/commit_duration.json
  saved_views:
    hudi_error_logs: assets/saved_views/error_logs.json
    hudi_overview: assets/saved_views/hudi_overview.json
    hudi_patterns: assets/saved_views/hudi_patterns.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hudi/README.md
display_on_public_website: true
draft: false
git_integration_title: hudi
integration_id: hudi
integration_title: Hudi
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: hudi
public_title: Hudi
short_description: Realiza el seguimiento de las métricas de tu configuración de Hudi.
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
  description: Realiza el seguimiento de las métricas de tu configuración de Hudi.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hudi
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Hudi][1].
Es compatible con [versiones][2] de Hudi `0.10.0` y posteriores.

## Configuración

### Instalación

El check de check está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. [Configura][4] el [Reportador de métricas JMX][5] en Hudi:

    ```
    hoodie.metrics.on=true
    hoodie.metrics.reporter.type=JMX
    hoodie.metrics.jmx.host=<JMX_HOST>
    hoodie.metrics.jmx.port=<JMX_PORT>
    ```


2. Edita el archivo `hudi.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Hudi.
   Para conocer todas las opciones de configuración disponibles, consulta el [hudi.d/conf.yaml de ejemplo][6].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado][7] del Datadog Agent.
   Puedes especificar las métricas que te interesan editando la [configuración][6]..
   Para saber cómo personalizar las métricas que se van a recopilar,, consulta la [documentación de checks de JMX][8] para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][9].

3. [Reinicia el Agent][10].


### Validación

[Ejecuta el subcomando `status` del Agent][11] y busca `hudi` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hudi" >}}



### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. Hudi utiliza el generador de logs `log4j` por defecto. Para personalizar el formato, edita el archivo `log4j.properties` en tu directorio `conf` de [Flink][13] o [Spark][14]. Un ejemplo de archivo `log4j.properties` es:

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

2. Por defecto, el pipeline de integración de Datadog admite el siguiente patrón de conversión:

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   Un ejemplo de marca de tiempo válida es: `2020-02-03 18:43:12,251`.

   Clona y edita el [pipeline de la integración][15] si tienes un formato diferente.

3. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

4. Descomenta y edita el bloque de configuración de logs en tu archivo `hudi.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [hudi.d/conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hudi.log
       source: hudi
       log_processing_rules:
         - type: multi_line
           pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           name: new_log_start_with_date
   ```
### Eventos

La integración Hudi no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "hudi" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://hudi.apache.org/
[2]: https://github.com/apache/hudi/releases
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://hudi.apache.org/docs/configurations#Metrics-Configurations
[5]: https://hudi.apache.org/docs/metrics/#jmxmetricsreporter
[6]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json
[8]: https://docs.datadoghq.com/es/integrations/java/
[9]: https://docs.datadoghq.com/es/help/
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/hudi/metadata.csv
[13]: https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf
[14]: https://github.com/apache/spark/tree/v3.1.2/conf
[15]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines