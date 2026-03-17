---
app_id: hudi
categories:
- recopilación de logs
custom_kind: integración
description: Realiza el seguimiento de las métricas de tu configuración de Hudi.
integration_version: 4.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Hudi
---
## Información general

Este check monitoriza [Hudi](https://hudi.apache.org/).
Es compatible con las [versiones] de Hudi (https://github.com/apache/hudi/releases) `0.10.0` y posteriores.

## Configuración

### Instalación

El check de Hudi se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. [Configura](https://hudi.apache.org/docs/configurations#Metrics-Configurations) el [JMX Metrics Reporter](https://hudi.apache.org/docs/metrics/#jmxmetricsreporter) en Hudi:

   ```
   hoodie.metrics.on=true
   hoodie.metrics.reporter.type=JMX
   hoodie.metrics.jmx.host=<JMX_HOST>
   hoodie.metrics.jmx.port=<JMX_PORT>
   ```

1. Edita el archivo `hudi.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Hudi.
   Consulta el [hudi.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado](https://github.com/DataDog/integrations-core/blob/master/hudi/assets/service_checks.json) del Datadog Agent.
   Puedes especificar las métricas que te interesan editando la [configuración](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example).
   Para saber cómo personalizar las métricas que se recopilarán, consulta la [documentación de checks de JMX](https://docs.datadoghq.com/integrations/java/) para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hudi` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hudi.action.bytes_written** <br>(rate) | La cantidad total de bytes escritos en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como byte_ |
| **hudi.action.commit_time** <br>(gauge) | El tiempo de confirmación de una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como milisegundo_ |
| **hudi.action.compacted_records_updated** <br>(rate) | La cantidad de registros compactados actualizados en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como registro_ |
| **hudi.action.create_time** <br>(rate) | El tiempo de creación de una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como milisegundo_ |
| **hudi.action.duration** <br>(gauge) | La cantidad de tiempo que se tardó en realizar con éxito una acción en un lote de registros (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como milisegundo_ |
| **hudi.action.files_inserted** <br>(rate) | La cantidad de archivos insertados (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como archivo_ |
| **hudi.action.files_updated** <br>(rate) | La cantidad de archivos actualizados (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como archivo_ |
| **hudi.action.insert_records_written** <br>(rate) | El número de registros de inserción escritos en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como registro_ |
| **hudi.action.log_files_compacted** <br>(rate) | El número de archivos de log compactados en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como archivo_ |
| **hudi.action.log_files_size** <br>(rate) | El tamaño de todos los archivos de log en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como byte_ |
| **hudi.action.partitions_written** <br>(rate) | El número de particiones escritas en una acción (commit, deltacommit, replacecommit, compaction, etc)|
| **hudi.action.records_written** <br>(rate) | El número de registros escritos en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como registro_ |
| **hudi.action.scan_time** <br>(rate) | El tiempo total de exploración en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como milisegundo_ |
| **hudi.action.time.50th_percentile** <br>(gauge) | Mide el percentil 50 del tiempo necesario para completar la acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.75th_percentile** <br>(gauge) | Mide el percentil 75 del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.95th_percentile** <br>(gauge) | Mide el percentil 95 del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.98th_percentile** <br>(gauge) | Mide el percentil 98 del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.999th_percentile** <br>(gauge) | Mide el percentil 999 del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.99th_percentile** <br>(gauge) | Mide el percentil 99 del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.count** <br>(rate) | Mide el recuento de veces que se completa una acción (commit, deltacommit, replacecommit, compaction, etc)|
| **hudi.action.time.max** <br>(gauge) | Mide la cantidad máxima de tiempo para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.mean** <br>(gauge) | Mide la cantidad media de tiempo para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.min** <br>(gauge) | Mide la cantidad mínima de tiempo para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.time.std_dev** <br>(gauge) | Mide la desviación estándar del tiempo necesario para completar una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como nanosegundo_ |
| **hudi.action.update_records_written** <br>(rate) | La cantidad de registros de actualización escritos en una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como registro_ |
| **hudi.action.upsert_time** <br>(rate) | El tiempo de upsert de una acción (commit, deltacommit, replacecommit, compaction, etc)<br>_Se muestra como milisegundo_ |
| **hudi.clean.duration** <br>(gauge) | El tiempo total dedicado a la limpieza<br>_Se muestra en milisegundos_ |
| **hudi.clean.files_deleted** <br>(gauge) | El número de archivos borrados en limpiezas<br>_Se muestra como archivo_ |
| **hudi.finalize.duration** <br>(gauge) | El tiempo total empleado en finalizar<br>_Se muestra en milisegundos_ |
| **hudi.finalize.files_finalized** <br>(gauge) | El número de archivos finalizados"<br>_Se muestra como archivo_ |
| **hudi.index.command.duration** <br>(gauge) | El tiempo empleado en ejecutar un comando de índice (UPSERT, INSERT_OVERWRITE, etc.)<br>_Se muestra en milisegundos_ |
| **hudi.rollback.duration** <br>(gauge) | El tiempo total pasado en rollback<br>_Se muestra como milisegundo_ |
| **hudi.rollback.files_deleted** <br>(gauge) | El número de archivos borrados en rollback<br>_Se muestra como archivo_ |

### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. Hudi usa el registrador `log4j` por defecto. Para personalizar el formato, edita el archivo `log4j.properties` en el directorio `conf` de [Flink](https://github.com/apache/flink/tree/release-1.11.4/flink-dist/src/main/flink-bin/conf) o [Spark](https://github.com/apache/spark/tree/v3.1.2/conf). Un archivo de ejemplo de `log4j.properties` es:

   ```conf
    log4j.rootCategory=INFO, file
    log4j.appender.file=org.apache.log4j.FileAppender
    log4j.appender.file.File=/var/log/hudi.log
    log4j.appender.file.append=false
    log4j.appender.file.layout=org.apache.log4j.PatternLayout
    log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

1. Por defecto, el pipeline de integración de Datadog admite el siguiente patrón de conversión:

   ```text
   %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

   Un ejemplo de marca de tiempo válida es: `2020-02-03 18:43:12,251`.

   Clona y edita el [pipeline de integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) si tienes un formato diferente.

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Quita los comentarios y edita el bloque de configuración de logs en tu archivo `hudi.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta [hudi.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

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

### Checks de servicio

**hudi.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Hudi supervisada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).