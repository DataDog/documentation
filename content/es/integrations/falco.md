---
app_id: falco
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtener información sobre logs y métricas de alerta de Falco
integration_version: 2.0.0
media:
- caption: Falco - Alertas
  image_url: images/falco_alerts.png
  media_type: imagen
supported_os:
- linux
- windows
- macOS
title: Falco
---
## Información general

[Falco](https://falco.org/docs/getting-started/) es una herramienta de seguridad nativa de la nube. Proporciona detección de amenazas casi en tiempo real para cargas de trabajo en la nube, en contenedores y en Kubernetes aprovechando la información en tiempo de ejecución. Falco puede monitorizar eventos definidos con reglas personalizables de diversas fuentes, incluido el núcleo Linux, y enriquecerlos con metadatos del servidor de API Kubernetes, del tiempo de ejecución del contenedor y más.
Esta integración ingiere los siguientes logs:

- Alerta: Representa detalles como el nombre de la regla, la descripción, la condición, el mensaje de salida, el nivel de prioridad y las etiquetas (tags).

La integración de Falco ingiere de forma continua datos de los logs de Falco a través del webhook. Antes de la ingesta de los datos, normaliza y enriquece los logs, garantizando un formato de datos constante y mejorando el contenido de la información para el procesamiento y el análisis posteriores. La integración proporciona información sobre los logs de alertas a través de los dashboards predefinidos.

## Configuración

### Configuración

#### Recopilación de métricas

Falco expone métricas con formato Prometheus que ofrecen una observabilidad de tu tiempo de ejecución, tu procesamiento de eventos y tu postura de seguridad. El Datadog Agent puede recopilar estas métricas mediante la integración de OpenMetrics. Sigue los pasos que se indican a continuación para activar y configurar la recopilación de métricas de Falco.

##### 1. Activar las métricas de Prometheus en Falco

Edita tu archivo de configuración `falco.yaml` para activar el endpoint de métricas:

```yaml
metrics:
  enabled: true
  listen_address: "<FALCO_HOST>"
  listen_port: 8765
```

Reinicia Falco para aplicar los cambios:

```bash
systemctl restart falco
```

Si Falco se instala con Helm, puedes activar las métricas con:

```bash
helm upgrade -i falco falcosecurity/falco \
  --set metrics.enabled=true \
  --set metrics.listen_address="<FALCO_HOST>" \
  --set metrics.listen_port=8765
```

##### 2. Configurar el Datadog Agent

Actualiza tu configuración del Datadog Agent para scrapear el endpoint de métricas Prometheus de Falco. Por ejemplo, añade lo siguiente a `conf.d/prometheus.d/conf.yaml`:

```yaml
instances:
  - openmetrics_endpoint: http://<FALCO_HOST>:8765/metrics
```

Sustituye `<FALCO_HOST>` por el nombre de host o la dirección IP donde se ejecuta Falco.

En los entornos Kubernetes, puedes utilizar [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/) para configurar el Agent para que detecte y extraiga automáticamente los endpoints de métricas de Falco.

##### 3. Validación

Después de la configuración, comprueba que Datadog ingiere las métricas de Falco. Deberías ver métricas con el prefijo `falco.` en el Explorador de métricas de Datadog.

#### Recopilación de logs

{{< tabs >}}

{{% tab "Reenvío de API" %}}

##### Reenvío de API

- Actualiza los parámetros en el archivo de configuración (`falco.yaml`) como se muestra a continuación:

  ```yaml
  json_output: true
  http_output:
    enabled: true
    url: <DATADOG_WEBHOOK_URL> 
  ```

  **Nota:** Sustituye `<DATADOG_WEBHOOK_URL>` por la URL de entrada correcta para tu [sitio Datadog](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site), como por ejemplo `https://http-intake.logs.us3.datadoghq.com/api/v2/logs?dd-api-key=<dd-api-key>&ddsource=falco` para US3.

  - Reinicia Falco utilizando el siguiente comando:

    ```bash
    systemctl restart falco
    ```

- Si Falco se instala utilizando Helm, puedes utilizar el siguiente comando para añadir o actualizar la URL HTTP:

  ```bash
  helm upgrade -i falco falcosecurity/falco \
  --set falco.http_output.enabled=true \
  --set falco.http_output.url="<DATADOG_WEBHOOK_URL>" \
  --set falco.json_output=true \
  --set json_include_output_property=true
  ```

  **Nota:** Sustituye `<DATADOG_WEBHOOK_URL>` por la URL de entrada correcta para tu [sitio Datadog](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site), como por ejemplo `https://http-intake.logs.us3.datadoghq.com/api/v2/logs?dd-api-key=<dd-api-key>&ddsource=falco` para US3.

{{% /tab %}}

{{% tab "Agent" %}}

##### Agent

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `falco.d/conf.yaml` para empezar a recopilar logs de Falco:

   ```yaml
   logs:
     - type: file
       path: <PATH TO LOGS>
       service: myservice
       source: falco
   ```

   Cambia los valores de los parámetros `path` y `service`, y configúralos para tu entorno. Consulta el [ejemplo falco.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/falco/datadog_checks/falco/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/configuration/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: Asegúrate de que el usuario `datadog-agent` tiene acceso de lectura y ejecución para el rastreo de los archivos de logs de los que quieres recopilar logs.

{{% /tab %}}

{{< /tabs >}}

> > > > > > > master

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **falco.container.memory.used** <br>(gauge) | Uso de memoria del proceso Falco en despliegues de contenedores (similar a container_memory_working_set_bytes)<br>_Se muestra en bytes_ |
| **falco.cpu.usage.ratio** <br>(gauge) | Porcentaje de uso de CPU del proceso Falco (equivalente a la salida ps)|
| **falco.duration.seconds.count** <br>(count) | Duración total en segundos que Falco se ha estado ejecutando<br>_Se muestra en segundos_ |
| **falco.evt.hostname** <br>(gauge) | Información sobre el nombre de host|
| **falco.evt.source** <br>(gauge) | Información sobre fuentes de eventos (por ejemplo, syscall o fuentes basadas en complementos)|
| **falco.host.cpu.usage.ratio** <br>(gauge) | Porcentaje global de uso de CPU de todos los procesos en ejecución en el sistema anfitrión|
| **falco.host.memory.used** <br>(gauge) | Uso total de memoria en bytes de todos los procesos en ejecución en el sistema anfitrión<br>_Se muestra en bytes_ |
| **falco.host.num.cpus** <br>(gauge) | Número total de CPU en el sistema anfitrión<br>_Se muestra como cpu_ |
| **falco.host.open.fds** <br>(gauge) | Número total de descriptores de archivo abiertos en el sistema anfitrión<br>_Se muestra como archivo_ |
| **falco.host.procs.running** <br>(gauge) | Número de procesos actualmente en ejecución en el sistema anfitrión (de /proc/stat)<br>_Se muestra como proceso_ |
| **falco.jemalloc.active.count** <br>(count) | Asignación de memoria activa por el asignador de memoria jemalloc<br>_Se muestra en bytes_ |
| **falco.jemalloc.allocated.count** <br>(count) | Memoria total asignada por el asignador de memoria jemalloc<br>_Se muestra en bytes_ |
| **falco.jemalloc.mapped.count** <br>(count) | Memoria asignada por el asignador de memoria jemalloc<br>_Se muestra en bytes_ |
| **falco.jemalloc.metadata.count** <br>(count) | Memoria utilizada para los metadatos jemalloc<br>_Se muestra en bytes_ |
| **falco.jemalloc.metadata.thp.count** <br>(count) | Memoria Transparent Huge Page<br>_Se muestra en bytes_ |
| **falco.jemalloc.resident.count** <br>(count) | Memoria residente mantenida por el asignador de memoria jemalloc<br>_Se muestra en bytes_ |
| **falco.jemalloc.retained.count** <br>(count) | Memoria retenida por jemalloc para futuras asignaciones<br>_Se muestra en bytes_ |
| **falco.jemalloc.zero.reallocs.count** <br>(count) | Memoria de reasignaciones de tamaño cero en jemalloc<br>_Se muestra en bytes_ |
| **falco.kernel.release** <br>(gauge) | Información sobre la versión del núcleo|
| **falco.memory.pss** <br>(gauge) | Uso de memoria Proportional Set Size del proceso Falco<br>_Se muestra en bytes_ |
| **falco.memory.rss** <br>(gauge) | Uso de memoria Resident Set Size del proceso Falco<br>_Se muestra en bytes_ |
| **falco.memory.vsz** <br>(gauge) | Uso de memoria Virtual Set Size del proceso Falco<br>_Se muestra en bytes_ |
| **falco.outputs.queue.num.drops.count** <br>(count) | Número total de eventos descartados de la cola de salida|
| **falco.rules.matches.count** <br>(count) | Número total de coincidencias de reglas detectadas por las reglas de seguridad de Falco|
| **falco.scap.engine.name** <br>(gauge) | Información del motor SCAP (por ejemplo, bpf modern_bpf o kmod)|
| **falco.scap.n.added.fds.count** <br>(count) | Número total de descriptores de archivo añadidos a las tablas internas de seguimiento<br>_Se muestra como archivo_ |
| **falco.scap.n.added.threads.count** <br>(count) | Número total de subprocesos añadidos a las tablas internas de seguimiento<br>_Se muestra como subproceso_ |
| **falco.scap.n.cached.fd.lookups.count** <br>(count) | Número total de búsquedas correctas de descriptores de archivo desde la caché|
| **falco.scap.n.cached.thread.lookups.count** <br>(count) | Número total de búsquedas de subprocesos realizadas con éxito en la caché|
| **falco.scap.n.containers** <br>(gauge) | Número actual de contenedores rastreados|
| **falco.scap.n.drops.buffer.count** <br>(count) | Número total de eventos descartados por problemas de buffer|
| **falco.scap.n.drops.count** <br>(count) | Número total de descartes de eventos del lado del núcleo|
| **falco.scap.n.drops.full.threadtable.count** <br>(count) | Número total de eventos descartados debido a una tabla de subprocesos llena|
| **falco.scap.n.drops.scratch.map.count** <br>(count) | Número total de eventos descartados debido a problemas con el mapa Scratch|
| **falco.scap.n.evts.count** <br>(count) | Número total de eventos capturados por el motor de captura de llamadas al sistema|
| **falco.scap.n.failed.fd.lookups.count** <br>(count) | Número total de búsquedas fallidas de descriptores de archivo<br>_Se muestra como archivo_ |
| **falco.scap.n.failed.thread.lookups.count** <br>(count) | Número total de búsquedas de subprocesos fallidas|
| **falco.scap.n.fds** <br>(gauge) | Número actual de descriptores de archivo almacenados en tablas internas<br>_Se muestra como archivo_ |
| **falco.scap.n.missing.container.images** <br>(gauge) | Número de contenedores con imágenes faltantes o desconocidas|
| **falco.scap.n.noncached.fd.lookups.count** <br>(count) | Número total de búsquedas de descriptores de archivo no almacenados en caché<br>_Se muestra como archivo_ |
| **falco.scap.n.noncached.thread.lookups.count** <br>(count) | Número total de búsquedas de subprocesos no almacenados en caché|
| **falco.scap.n.removed.fds.count** <br>(count) | Número total de descriptores de archivo eliminados de las tablas de seguimiento internas<br>_Se muestra como archivo_ |
| **falco.scap.n.removed.threads.count** <br>(count) | Número total de subprocesos eliminados de las tablas de seguimiento internas<br>_Se muestra como subproceso_ |
| **falco.scap.n.retrieve.evts.drops.count** <br>(count) | Número total de eventos descartados durante el proceso de recuperación|
| **falco.scap.n.retrieved.evts.count** <br>(count) | Número total de eventos recuperados con éxito del núcleo|
| **falco.scap.n.store.evts.drops.count** <br>(count) | Número total de eventos descartados durante el proceso de almacenamiento|
| **falco.scap.n.stored.evts.count** <br>(count) | Número total de eventos almacenados correctamente|
| **falco.scap.n.threads** <br>(gauge) | Número actual de subprocesos almacenados en las tablas internas de seguimiento<br>_Se muestra como subproceso_ |
| **falco.sha256.config.files** <br>(gauge) | Información hash SHA256 de los archivos de configuración de Falco|
| **falco.sha256.rules.files** <br>(calibre) | Información hash SHA256 de los archivos de reglas de Falco|

### Logs

La integración de Falco recopila y envía logs de alerta de Falco a Datadog.

### Eventos

La integración de Falco no incluye eventos.

## Soporte

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).