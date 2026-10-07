---
app_id: flink
categories:
- recopilación de logs
custom_kind: integración
description: Realiza el seguimiento de métricas de tus tareas de Flink.
integration_version: 3.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Flink
---
## Información general

Este check monitoriza [Flink](https://flink.apache.org/). Datadog recopila las métricas de Flink a través de Flink
[Datadog HTTP Reporter](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog), que utiliza la [API HTTP de Datadog] (https://docs.datadoghq.com/api/?lang=bash#api-reference).

## Configuración

### Instalación

El check de Flink está incluido en el paquete (https://app.datadoghq.com/account/settings/agent/latest) del [Datadog Agent].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Recopilación de métricas

{{< site-region region="gov" >}}

1. Configura el [StatsD reporter](https://nightlies.apache.org/flink/flink-docs-release-1.20/docs/deployment/metric_reporters/#statsd) en Flink.
   En tu `<FLINK_HOME>/conf/flink-conf.yaml`, añade estas líneas:
   ```yaml
   metrics.reporter.stsd.factory.class: org.apache.flink.metrics.statsd.StatsDReporterFactory
   metrics.reporter.stsd.host: datadog-agent
   metrics.reporter.stsd.port: 8125
   metrics.reporter.stsd.interval: 60 SECONDS 
   ```
1. Asegúrate de que DogStatsD/StatsD esté habilitado en el Datadog Agent y considera la posibilidad de configurar `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` para entornos en contenedores.
1. Reinicia Flink para empezar a enviar tus métricas de Flink a Datadog.

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Configura el [Datadog HTTP Reporter](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog) en Flink.

   En tu `<FLINK_HOME>/conf/flink-conf.yaml`, añade estas líneas, sustituyendo `<DATADOG_API_KEY>` por tu [clave de API] de Datadog (https://app.datadoghq.com/organization-settings/api-keys):

   ```yaml
   metrics.reporter.dghttp.factory.class: org.apache.flink.metrics.datadog.DatadogHttpReporterFactory
   metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
   metrics.reporter.dghttp.dataCenter: US #(optional) The data center (EU/US) to connect to, defaults to US.
   ```

1. Vuelve a asignar contextos de sistema en tu `<FLINK_HOME>/conf/flink-conf.yaml`.

   ```yaml
   metrics.scope.jm: flink.jobmanager
   metrics.scope.jm.job: flink.jobmanager.job
   metrics.scope.tm: flink.taskmanager
   metrics.scope.tm.job: flink.taskmanager.job
   metrics.scope.task: flink.task
   metrics.scope.operator: flink.operator
   ```

   **Nota**: Los ámbitos del sistema deben reasignarse para que tus métricas de Flink sean compatibles, de lo contrario se envían como métricas personalizadas.

1. Configura [etiquetas (tags)] adicionales (https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog) en `<FLINK_HOME>/conf/flink-conf.yaml`. He aquí un ejemplo de etiquetas (tags) personalizadas:

   ```yaml
   metrics.reporter.dghttp.scope.variables.additional: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
   ```

   **Nota**: En forma predeterminada, cualquier variable en los nombres de las métricas se envía como etiquetas (tags), por lo que no es necesario añadir etiquetas (tags) personalizadas para `job_id`, `task_id`, etc.

1. Reinicia Flink para empezar a enviar tus métricas de Flink a Datadog.

{{< /site-region >}}

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. Flink utiliza el registrador `log4j` en forma predeterminada. Para habilitar el registro en un archivo, personaliza el formato editando los archivos de configuración `log4j*.properties` en el directorio `conf/` de la distribución de Flink. Consulta la [documentación de registro de Flink](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/advanced/logging/) para obtener información sobre qué archivo de configuración es relevante para tu configuración. Consulta [repositorio de Flink](https://github.com/apache/flink/tree/release-1.16/flink-dist/src/main/flink-bin/conf) para configuraciones predeterminadas.

1. Por defecto, el pipeline de la integración admite el siguiente patrón de diseño:

   ```text
   %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
   ```

   Un ejemplo de marca de tiempo válida es: `2020-02-03 18:43:12,251`.

   Clona y edita el [pipeline de integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) si tienes un formato diferente.

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Quita los comentarios y edita el bloque de configuración de logs en tu archivo `flink.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta [ejemplo de flink.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

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

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busque `flink` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **flink.jobmanager.Status.JVM.CPU.Load** <br>(medidor) | El uso reciente de la CPU de la JVM en el jobmanager<br>_Mostrado como porcentaje_. |
| **flink.jobmanager.Status.JVM.CPU.Time** <br>(medidor) | El tiempo de la CPU utilizado por la JVM en el jobmanager<br>_Mostrado en segundos_. |
| **flink.jobmanager.Status.JVM.ClassLoader.ClassesLoaded** <br>(count) | El número total de clases cargadas desde el inicio de la JVM en el jobmanager.|
| **flink.jobmanager.Status.JVM.ClassLoader.ClassesUnloaded** <br>(count) | El número total de clases descargadas desde el inicio de la JVM en el jobmanager.|
| **flink.jobmanager.Status.JVM.Memory.Direct.Count** <br>(count) | El número de búferes en la mezcla directa de búferes en el jobmanager<br>_Mostrado como búfer_ |
| **flink.jobmanager.Status.JVM.Memory.Direct.MemoryUsed** <br>(medidor) | La cantidad de memoria utilizada por la JVM para la mezcla directa de búferes en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Direct.TotalCapacity** <br>(count) | La capacidad total de todos los búferes de la mezcla directa de búferes en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Heap.Committed** <br>(medidor) | La cantidad de memoria heap garantizada para estar disponible para la JVM en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Heap.Max** <br>(medidor) | La cantidad máxima de memoria heap que se puede utilizar para la gestión de memoria en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Heap.Used** <br>(medidor) | La cantidad de memoria heap utilizada actualmente en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Mapped.Count** <br>(medidor) | El número de búferes en la mezcla de búferes asignada en el jobmanager<br>_Mostrado como búfer_ |
| **flink.jobmanager.Status.JVM.Memory.Mapped.MemoryUsed** <br>(medidor) | La cantidad de memoria utilizada por la JVM para la mezcla de búferes asignada en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.Mapped.TotalCapacity** <br>(count) | La capacidad total de todos los búferes de la mezcla de búferes asignada en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.NonHeap.Committed** <br>(medidor) | La cantidad de memoria no-Heap garantizada para estar disponible para la JVM en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.NonHeap.Max** <br>(medidor) | La cantidad máxima de memoria no-Heap que se puede utilizar para la gestión de memoria en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Memory.NonHeap.Used** <br>(medidor) | La cantidad de memoria no-heap utilizada actualmente en el jobmanager<br>_Mostrado como byte_ |
| **flink.jobmanager.Status.JVM.Threads.Count** <br>(count) | El número total de hilos activos en el jobmanager<br>_Mostrado como hilo_ |
| **flink.jobmanager.job.downtime** <br>(medidor) | Para trabajos actualmente en situación de fallo/recuperación- el tiempo transcurrido durante esta interrupción. Devuelve 0 para trabajos en ejecución y -1 para trabajos finalizados<br>_Se muestra en milisegundos_ |
| **flink.jobmanager.job.lastCheckpointAlignmentBuffered** <br>(medidor) | El número de bytes almacenados en búfer durante la alineación sobre todas las subtareas para el último punto de control<br>_Mostrado como byte_ |
| **flink.jobmanager.job.lastCheckpointDuration** <br>(medidor) | El tiempo que se tardó en finalizar el último punto de control<br>_Se muestra en milisegundos_ |
| **flink.jobmanager.job.lastCheckpointExternalPath** <br>(medidor) | La ruta donde se almacenó el último punto de control externo|
| **flink.jobmanager.job.lastCheckpointRestoreTimestamp** <br>(medidor) | Marca de tiempo en la que se restauró el último punto de control en el coordinador<br>_Mostrado en milisegundos_ |
| **flink.jobmanager.job.lastCheckpointSize** <br>(medidor) | El tamaño total del último punto de control<br>_Mostrado como byte_ |
| **flink.jobmanager.job.numRestarts** <br>(medidor) | El número total de reinicios desde que se envió este job, incluidos los reinicios completos y los reinicios precisos.|
| **flink.jobmanager.job.numberOfCompletedCheckpoints** <br>(count) | Número de puntos de control finalizados con éxito|
| **flink.jobmanager.job.numberOfFailedCheckpoints** <br>(count) | Número de puntos de control fallidos|
| **flink.jobmanager.job.numberOfInProgressCheckpoints** <br>(medidor) | Número de puntos de control en curso|
| **flink.jobmanager.job.restartingTime** <br>(medidor) | El tiempo que ha tardado en reiniciarse job o el tiempo que lleva en curso el reinicio actual<br>_Mostrado en milisegundos_ |
| **flink.jobmanager.job.totalNumberOfCheckpoints** <br>(count) | Número total de puntos de control (en curso, finalizados y fallidos)|
| **flink.jobmanager.job.uptime** <br>(medidor) | El tiempo que el job se ha estado ejecutando sin interrupción. Devuelve -1 para trabajos finalizados<br>_Mostrado en milisegundos_. |
| **flink.jobmanager.numRegisteredTaskManagers** <br>(medidor) | Número de gestores de tareas registrados|
| **flink.jobmanager.numRunningJobs** <br>(medidor) | El número de trabajos en ejecución<br>_Mostrado com job_ |
| **flink.jobmanager.taskSlotsTotal** <br>(medidor) | El número total de ranuras de tareas|
| **flink.operator.commitsFailed** <br>(count) | El número total de fallos en la confirmaciones de compensaciones a Kafka si la confirmación de compensaciones está activada y la comprobación de puntos de control está habilitada. Ten en cuenta que la confirmación de compensaciones a Kafka es sólo un medio para exponer el progreso del consumidor, por lo que un fallo de confirmación no afecta a la integridad de las compensaciones de partición comprobadas de Flink<br>_Mostrado como confirmación_. |
| **flink.operator.commitsSucceeded** <br>(count) | El número total de confirmaciones de compensaciones realizadas con éxito en Kafka si la confirmación de compensación está activada y la comprobación de puntos de control está activada<br>_Mostrado como confirmación_ |
| **flink.operator.currentInput1Watermark** <br>(medidor) | La última marca de agua que este operador ha recibido en su primera entrada. Sólo para operadores con 2 entradas<br>_Mostrado como milisegundo_. |
| **flink.operator.currentInput2Watermark** <br>(medidor) | La última marca de agua que este operador ha recibido en su segunda entrada. Sólo para operadores con 2 entradas<br>_Mostrado como milisegundo_. |
| **flink.operator.currentInputWatermark** <br>(medidor) | La última marca de agua que ha recibido este operador. Para tareas con 2 entradas, es el mínimo de las últimas marcas de agua recibidas<br>_Mostrado como milisegundo_. |
| **flink.operator.currentOutputWatermark** <br>(medidor) | La última marca de agua que ha emitido este operador<br>_Mostrado como milisegundo_ |
| **flink.operator.numLateRecordsDropped** <br>(count) | El número de registros que este operador ha abandonado por llegar tarde<br>_Mostrado como registro_ |
| **flink.operator.numRecordsIn** <br>(count) | El número total de registros que ha recibido este operador<br>_Mostrado como registro_ |
| **flink.operator.numRecordsInPerSecond** <br>(medidor) | El número de registros que recibe este operador por segundo<br>_Mostrado como registro_ |
| **flink.operator.numRecordsOut** <br>(count) | El número total de registros que ha emitido este operador<br>_Mostrado como registro_ |
| **flink.operator.numRecordsOutPerSec** <br>(medidor) | El número total de registros que este operador ha emitido por segundo<br>_Mostrado como registro_ |
| **flink.operator.numSplitsProcessed** <br>(count) | El número total de InputSplits que este source (fuente) de datos ha procesado (si el operador es un source (fuente) de datos)|
| **flink.task.Shuffle.Netty.Input.Buffers.inPoolUsage** <br>(medidor) | Una estimación del uso de los búferes de entrada|
| **flink.task.Shuffle.Netty.Input.Buffers.inputQueueLength** <br>(medidor) | El número de búferes de entrada en cola<br>_Mostrado como búfer_ |
| **flink.task.Shuffle.Netty.Input.numBuffersInLocal** <br>(count) | El número total de búferes de red que esta tarea ha leído de un source (fuente) local<br>_Mostrado como búfer_ |
| **flink.task.Shuffle.Netty.Input.numBuffersInLocalPerSecond** <br>(medidor) | El número de búferes de red que esta tarea lee de un source (fuente) local por segundo.|
| **flink.task.Shuffle.Netty.Input.numBuffersInRemote** <br>(count) | El número total de búferes de red que esta tarea ha leído de un source (fuente) remoto<br>_Mostrado como búfer_ |
| **flink.task.Shuffle.Netty.Input.numBuffersInRemotePerSecond** <br>(medidor) | El número de búferes de red que esta tarea lee de un source (fuente) remoto por segundo<br>_Mostrado como búfer_ |
| **flink.task.Shuffle.Netty.Input.numBytesInLocal** <br>(count) | El número total de bytes que esta tarea ha leído de un source (fuente) local <br> _Mostrado como byte_ |
| **flink.task.Shuffle.Netty.Input.numBytesInLocalPerSecond** <br>(medidor) | El número de bytes que esta tarea lee de un source (fuente) local por segundo<br>_Mostrado como byte_ |
| **flink.task.Shuffle.Netty.Input.numBytesInRemote** <br>(count) | El número total de bytes que esta tarea ha leído de un source (fuente) remoto<br>_Mostrado como byte_ |
| **flink.task.Shuffle.Netty.Input.numBytesInRemotePerSecond** <br>(medidor) | El número de bytes que esta tarea lee de un source (fuente) remoto por segundo<br>_Mostrado como byte_ |
| **flink.task.Shuffle.Netty.Output.Buffers.outPoolUsage** <br>(medidor) | Una estimación del uso de los búferes de salida|
| **flink.task.Shuffle.Netty.Output.Buffers.outputQueueLength** <br>(medidor) | El número de búferes de salida en cola<br>_Mostrado como búfer_ |
| **flink.task.checkpointAlignmentTime** <br>(medidor) | El tiempo en nanosegundos que tardó en finalizarse la última alineación de barrera o cuánto ha tardado hasta ahora la alineación actual<br>_Mostrado como nanosegundo_ |
| **flink.task.currentInputWatermark** <br>(medidor) | La última marca de agua que ha recibido esta tarea. Para tareas con 2 entradas, es el mínimo de las últimas marcas de agua recibidas<br>_Mostrado como milisegundo_. |
| **flink.task.numBuffersOut** <br>(count) | El número total de búferes de red que esta tarea ha emitido<br>_Mostrado como búfer_ |
| **flink.task.numBuffersOutPerSecond** <br>(medidor) | El número de búferes de red que esta tarea emite por segundo<br>_Mostrado como búfer_ |
| **flink.task.numBytesOut** <br>(count) | El número total de bytes que esta tarea ha emitido<br>_Mostrado como byte_ |
| **flink.task.numBytesOutPerSecond** <br>(medidor) | El número de bytes que esta tarea emite por segundo<br>_Mostrado como byte_ |
| **flink.task.numLateRecordsDropped** <br>(count) | El número de registros que esta tarea ha abandonado por llegar tarde<br>_Mostrado como registro_ |
| **flink.task.numRecordsIn** <br>(count) | El número total de registros que ha recibido esta tarea<br>_Mostrado como registro_ |
| **flink.task.numRecordsInPerSecond** <br>(medidor) | El número de registros que esta tarea recibe por segundo<br>_Mostrado como registro_ |
| **flink.task.numRecordsOut** <br>(count) | El número total de registros que esta tarea ha emitido<br>_Mostrado como registro_ |
| **flink.task.numRecordsOutPerSec** <br>(medidor) | El número total de registros que esta tarea ha emitido por segundo<br>_Mostrado como registro_ |
| **flink.taskmanager.Status.JVM.CPU.Load** <br>(medidor) | El uso reciente de la CPU de la JVM en el administrador de tareas<br>_Mostrado como porcentaje_. |
| **flink.taskmanager.Status.JVM.CPU.Time** <br>(medidor) | El tiempo de la CPU utilizado por la JVM en el administrador de tareas<br>_Mostrado en segundos_. |
| **flink.taskmanager.Status.JVM.ClassLoader.ClassesLoaded** <br>(count) | El número total de clases cargadas desde el inicio de la JVM en el administrador de tareas.|
| **flink.taskmanager.Status.JVM.ClassLoader.ClassesUnloaded** <br>(count) | El número total de clases descargadas desde el inicio de la JVM en el administrador de tareas.|
| **flink.taskmanager.Status.JVM.Memory.Direct.Count** <br>(medidor) | El número de búferes en la mezcla directa de búferes en el administrador de tareas<br>_Mostrado como búfer_ |
| **flink.taskmanager.Status.JVM.Memory.Direct.MemoryUsed** <br>(medidor) | La cantidad de memoria utilizada por la JVM para la mezcla directa  de búferes en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Direct.TotalCapacity** <br>(count) | La capacidad total de todos los búferes en la mezcla directa de búferes en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Heap.Committed** <br>(medidor) | La cantidad de memoria heap garantizada para estar disponible para la JVM en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Heap.Max** <br>(medidor) | La cantidad máxima de memoria heap que se puede utilizar para la gestión de memoria en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Heap.Used** <br>(medidor) | La cantidad de memoria heap utilizada actualmente en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Mapped.Count** <br>(medidor) | El número de búferes en la mezcla de búferes asignados en el administrador de tareas.|
| **flink.taskmanager.Status.JVM.Memory.Mapped.MemoryUsed** <br>(medidor) | La cantidad de memoria utilizada por la JVM para la mezcla de búferes asignados en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.Mapped.TotalCapacity** <br>(count) | La capacidad total de todos los búferes en la mezcla de búferes asignados en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Memory.NonHeap.Committed** <br>(medidor) | La cantidad de memoria no-Heap garantizada para estar disponible para la JVM en el administrador de tareas<br>_Se muestra como byte_. |
| **flink.taskmanager.Status.JVM.Memory.NonHeap.Max** <br>(medidor) | La cantidad máxima de memoria no-Heap que se puede utilizar para la gestión de memoria en el administrador de tareas<br>_Mostrado como byte_. |
| **flink.taskmanager.Status.JVM.Memory.NonHeap.Used** <br>(medidor) | La cantidad de memoria no-Heap utilizada actualmente en el administrador de tareas<br>_Mostrado como byte_ |
| **flink.taskmanager.Status.JVM.Threads.Count** <br>(count) | El número total de hilos activos en el administrador de tareas<br>_Mostrado como hilo_ |
| **flink.taskmanager.Status.Shuffle.Netty.AvailableMemorySegments** <br>(medidor) | El número de segmentos de memoria no utilizados en el administrador de tareas|
| **flink.taskmanager.Status.Shuffle.Netty.TotalMemorySegments** <br>(medidor) | El número de segmentos de memoria asignados en el administrador de tareas|

### Checks de servicio

Flink no incluye checks de servicio.

### Eventos

Flink no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).