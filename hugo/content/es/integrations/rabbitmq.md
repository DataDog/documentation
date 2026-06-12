---
app_id: rabbitmq
categories:
- log collection
- message queues
custom_kind: integración
description: Seguimiento del tamaño de las colas, del recuento de consumidores, de
  mensajes no reconocidos, etc.
further_reading:
- link: https://www.datadoghq.com/blog/rabbitmq-monitoring
  tag: blog
  text: Métricas clave para la monitorización de RabbitMQ
- link: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
  tag: blog
  text: Recopilación de métricas utilizando las herramientas de monitorización de
    RabbitMQ
- link: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
  tag: blog
  text: Monitorización de RabbitMQ con Datadog
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: RabbitMQ
---
![RabbitMQ Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png)

## Información general

Este check monitoriza [RabbitMQ](https://www.rabbitmq.com) a través del Datadog Agent. Te permite:

- Realizar un seguimiento de estadísticas basadas en colas: tamaño de la cola, recuento de consumidores, mensajes no reconocidos, mensajes reenviados, etc.
- Realizar un de estadísticas basadas en nodos: procesos en espera, sockets utilizados, descriptores de archivos utilizados, etc.
- Monitoriza vhosts para comprobar la disponibilidad y el número de conexiones.

Considerar [Data Streams Monitoring](https://docs.datadoghq.com/data_streams/) para mejorar tu integración con RabbitMQ. Esta solución permite la visualización de pipelines y el seguimiento de retrasos, ayudándote a identificar y resolver cuellos de botella.

## Configuración

### Instalación

El check de RabbitMQ se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

RabbitMQ expone métricas de dos formas: el [complemento de gestión de RabbitMQ](https://www.rabbitmq.com/management.html) y el [complemento RabbitMQ Prometheus](https://www.rabbitmq.com/prometheus.html). La integración de Datadog admite ambas versiones. Sigue las instrucciones de configuración de este archivo correspondientes a la versión que quieres utilizar. La integración Datadog también viene con un dashboard y monitores predefinidos para cada versión, como se indica en los títulos Dashboard y Monitor.

#### Preparación de RabbitMQ

##### [Complemento RabbitMQ Prometheus](https://www.rabbitmq.com/prometheus.html).

*A partir de la versión 3.8 de RabbitMQ, el [complemento RabbitMQ Prometheus](https://www.rabbitmq.com/prometheus.html) está activado por defecto.*

*La versión del complemento Prometheus de RabbitMQ requiere el soporte de Python 3 del Datadog Agent, por lo que sólo es compatible con el Agent v6 o posterior. Asegúrate de que tu Agent está actualizado, antes de configurar la versión del complemento Prometheus de la integración.*

Configura la sección `prometheus_plugin` en la configuración de tu instancia. Cuando se utiliza la opción `prometheus_plugin`, se ignoran los parámetros relacionados con el complemento de gestión.

```yaml
instances:
  - prometheus_plugin:
      url: http://<HOST>:15692
```

Esto permite el scraping del [endpoint `/metrics`](https://www.rabbitmq.com/prometheus.html#default-endpoint) en un nodo RabbitMQ. Datadog también puede recopilar datos del [endpoint `/metrics/detailed`](https://www.rabbitmq.com/prometheus.html#detailed-endpoint). Las métricas recopiladas dependen de las familias que se incluyen.

```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
       unaggregated_endpoint: detailed?family=queue_coarse_metrics&family=queue_consumer_count&family=channel_exchange_metrics&family=channel_queue_exchange_metrics&family=node_coarse_metrics
```

Esta configuración recopila métricas de cada cola, intercambio y nodo. Para obtener más información sobre las métricas proporcionadas por cada familia, consulta la [documentación de la API `/metrics/detailed`](https://www.rabbitmq.com/prometheus.html#detailed-endpoint).

##### [Complemento de gestión de RabbitMQ](https://www.rabbitmq.com/management.html).

Habilita el complemento. El usuario del Agent necesita al menos la etiqueta (tag) `monitoring` y los siguientes permisos obligatorios:

| Permiso | Comando            |
| ---------- | ------------------ |
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

Crea un usuario del Agent para tu vhost predeterminado con los siguientes comandos:

```text
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

Aquí, `/` se refiere al host por defecto. Defínelo para tu nombre de host virtual especificado. Consulta la [documentación de RabbitMQ](https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions) para obtener más información.

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `rabbitmq.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus métricas de RabbitMQ. Consulta el [ejemplo de rabbitmq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   **Nota**: El Agent comprueba todas las colas, vhosts y nodos por defecto, pero puedes proporcionar listas o expresiones regulares para limitar esto. Para ver ejemplos, consulta [rabbitmq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. Para modificar la ubicación predeterminada del archivo de log, define la variable de entorno `RABBITMQ_LOGS` o añade lo siguiente a tu archivo de configuración de RabbitMQ (`/etc/rabbitmq/rabbitmq.conf`):

   ```conf
     log.dir = /var/log/rabbit
     log.file = rabbit.log
   ```

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Edita la sección `logs` de tu archivo `rabbitmq.d/conf.yaml` para empezar a recopilar tus logs de RabbitMQ:

   ```yaml
   logs:
     - type: file
       path: /var/log/rabbit/*.log
       source: rabbitmq
       service: myservice
       log_processing_rules:
         - type: multi_line
           name: logs_starts_with_equal_sign
           pattern: "="
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Puedes aprovechar la [detección automática de contenedores de Docker](https://docs.datadoghq.com/containers/docker/integrations/?tab=dockeradv2), de Datadog. Para ver parámetros específicos de RabbitMQ, consulta el ejemplo de configuración `auto_conf.yaml`.

Para entornos en contenedores, como Kubernetes, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `rabbitmq`                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"prometheus_plugin": {"url": "http://%%host%%:15692"}}` |

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `rabbitmq` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **rabbitmq.alarms.file_descriptor_limit** <br>(gauge) | \[OpenMetrics\] es 1 si la alarma de límite del descriptor de archivo está activa|
| **rabbitmq.alarms.free_disk_space.watermark** <br>(gauge) | \[OpenMetrics\] es 1 si la alarma de marca de agua del espacio libre en disco está activa|
| **rabbitmq.alarms.memory_used_watermark** <br>(gauge) | \[OpenMetrics\] es 1 si la alarma de marca de agua de memoria de la máquina virtual está vigente|
| **rabbitmq.auth_attempts.count** <br>(count) | \[OpenMetrics\] Número total de intentos de autenticación|
| **rabbitmq.auth_attempts.failed.count** <br>(count) | \[OpenMetrics\] Número total de intentos de autenticación fallidos|
| **rabbitmq.auth_attempts.succeeded.count** <br>(count) | \[OpenMetrics\] Número total de intentos de autenticación exitosos|
| **rabbitmq.build_info** <br>(gauge) | \[OpenMetrics\] Información de la versión RabbitMQ & Erlang/OTP|
| **rabbitmq.channel.acks_uncommitted** <br>(gauge) | \[OpenMetrics\] Reconocimientos de mensajes en una transacción aún no confirmada|
| **rabbitmq.channel.consumers** <br>(gauge) | \[OpenMetrics\] Consumidores en un canal|
| **rabbitmq.channel.get.ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes obtenidos con basic.get en modo de reconocimiento manual|
| **rabbitmq.channel.get.count** <br>(count) | \[OpenMetrics\] Número total de mensajes obtenidos con basic.get en modo de reconocimiento automático<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.get.empty.count** <br>(count) | \[OpenMetrics\] Número total de veces que las operaciones basic.get no obtuvieron ningún mensaje.|
| **rabbitmq.channel.messages.acked.count** <br>(count) | \[OpenMetrics\] Número total de mensajes reconocidos por los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.confirmed.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados en un intercambio y confirmados en el canal<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.delivered.ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores en modo de reconocimiento manual<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.delivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores en modo de reconocimiento automático<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.published.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados en un intercambio en un canal<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.redelivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes reenviados a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.unacked** <br>(gauge) | \[OpenMetrics\] Mensajes entregados pero aún no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.uncommitted** <br>(gauge) | \[OpenMetrics\] Mensajes recibidos en una transacción pero aún no confirmados<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.unconfirmed** <br>(gauge) | \[OpenMetrics\] Mensajes publicados pero aún no confirmados<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.unroutable.dropped.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados como no obligatorios en un intercambio y descartados como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.messages.unroutable.returned.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados como obligatorios en un intercambio y devueltos al publicador como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.prefetch** <br>(gauge) | \[OpenMetrics\] Límite total de mensajes no reconocidos para todos los consumidores en un canal<br>_Se muestra como mensaje_ |
| **rabbitmq.channel.process_reductions.count** <br>(count) | \[OpenMetrics\] Número total de reducciones de procesos de canal|
| **rabbitmq.channels** <br>(gauge) | \[OpenMetrics\] Canales actualmente abiertos|
| **rabbitmq.channels.closed.count** <br>(count) | \[OpenMetrics\] Número total de canales cerrados|
| **rabbitmq.channels.opened.count** <br>(count) | \[OpenMetrics\] Número total de canales abiertos|
| **rabbitmq.cluster.exchange_bindings** <br>(gauge) | \[OpenMetrics\] Número de enlaces de un intercambio. Este valor es válido para todo el clúster.|
| **rabbitmq.cluster.exchange_name** <br>(gauge) | \[OpenMetrics\] Enumera los intercambios sin información adicional. Este valor es válido para todo el clúster. Una alternativa más económica a `exchange_bindings`|
| **rabbitmq.cluster.vhost_status** <br>(gauge) | \[OpenMetrics\] Si se está ejecutando un vhost determinado|
| **rabbitmq.connection.channels** <br>(gauge) | \[OpenMetrics\] Canales en un conexión|
| **rabbitmq.connection.incoming_bytes.count** <br>(count) | \[OpenMetrics\] Número total de bytes recibidos en un conexión<br> _Se muestra como byte_ |
| **rabbitmq.connection.incoming_packets.count** <br>(count) | \[OpenMetrics\] Número total de paquetes recibidos en un conexión<br> _Se muestra como paquete_ |
| **rabbitmq.connection.outgoing_bytes.count** <br>(count) | \[OpenMetrics\] Número total de bytes enviados en una conexión<br>_Se muestra como bytes_ |
| **rabbitmq.connection.outgoing_packets.count** <br>(count) | \[OpenMetrics\] Número total de paquetes enviados en una conexión<br>_Se muestra como paquete_ |
| **rabbitmq.connection.pending_packets** <br>(gauge) | \[OpenMetrics\] Número de paquetes a la espera de ser enviados en una conexión<br>_Se muestra como paquete_ |
| **rabbitmq.connection.process_reductions.count** <br>(count) | \[OpenMetrics\] Número total de reducciones de procesos de conexión|
| **rabbitmq.connections** <br>(gauge) | \[OpenMetrics, CLI de gestión\] Número de conexiones actuales a un vhost rabbitmq dado, etiquetado 'rabbitmq_vhost:\<vhost_name>' Conexiones actualmente abiertas<br>_Se muestra como conexión_ |
| **rabbitmq.connections.closed.count** <br>(count) | \[OpenMetrics\] Número total de conexiones cerradas o terminadas|
| **rabbitmq.connections.opened.count** <br>(count) | \[OpenMetrics\] Número total de conexiones abiertas|
| **rabbitmq.connections.state** <br>(gauge) | Número de conexiones en el estado de conexión especificado<br>_Se muestra como conexión_ |
| **rabbitmq.consumer_prefetch** <br>(gauge) | \[OpenMetrics\] Límite de mensajes no reconocidos para cada consumidor.|
| **rabbitmq.consumers** <br>(gauge) | \[OpenMetrics\] Consumidores actualmente conectados|
| **rabbitmq.disk_space.available_bytes** <br>(gauge) | \[OpenMetrics\] Espacio en disco disponible en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.disk_space.available_limit_bytes** <br>(gauge) | \[OpenMetrics\] Marca de agua baja del espacio libre en disco en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.gc.reclaimed_bytes.count** <br>(count) | \[OpenMetrics\] Número total de bytes de memoria recuperados por el recolector de basura Erlang<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.gc.runs.count** <br>(count) | \[OpenMetrics\] Número total de ejecuciones del recolector de basura Erlang|
| **rabbitmq.erlang.mnesia.committed_transactions.count** <br>(count) | \[OpenMetrics\] Número de transacciones confirmadas.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.failed_transactions.count** <br>(count) | \[OpenMetrics\] Número de transacciones fallidas (es decir, abortadas).<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.held_locks** <br>(gauge) | \[OpenMetrics\] Número de bloqueos mantenidos.|
| **rabbitmq.erlang.mnesia.lock_queue** <br>(gauge) | \[OpenMetrics\] Número de transacciones a la espera de un bloqueo.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.logged_transactions.count** <br>(count) | \[OpenMetrics\] Número de transacciones registradas.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.memory_usage_bytes** <br>(gauge) | \[OpenMetrics\] Número total de bytes asignados por todas las tablas de mnesia<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.mnesia.restarted_transactions.count** <br>(count) | \[OpenMetrics\] Número total de reinicios de transacciones.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.tablewise_memory_usage_bytes** <br>(gauge) | \[OpenMetrics\] Número de bytes asignados por la tabla de mnesia<br>_Se muestra como byte_ |
| **rabbitmq.erlang.mnesia.tablewise_size** <br>(gauge) | \[OpenMetrics\] Número de filas presentes por tabla|
| **rabbitmq.erlang.mnesia.transaction_coordinators** <br>(gauge) | \[OpenMetrics\] Número de transacciones de coordinadores.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.mnesia.transaction_participants** <br>(gauge) | \[OpenMetrics\] Número de transacciones de participantes.<br>_Se muestra como transacción_ |
| **rabbitmq.erlang.net.ticktime_seconds** <br>(gauge) | \[OpenMetrics\] Intervalo de latidos entre nodos<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.processes_limit** <br>(gauge) | \[OpenMetrics\] Límite de procesos Erlang<br>_Se muestra como proceso_ |
| **rabbitmq.erlang.processes_used** <br>(gauge) | \[OpenMetrics\] Procesos Erlang utilizados<br>_Se muestra como proceso_ |
| **rabbitmq.erlang.scheduler.context_switches.count** <br>(count) | \[OpenMetrics\] Número total de cambios de contexto del programador Erlang|
| **rabbitmq.erlang.scheduler.run_queue** <br>(gauge) | \[OpenMetrics\] Cola de ejecución del programador Erlang|
| **rabbitmq.erlang.uptime_seconds** <br>(gauge) | \[OpenMetrics\] Tiempo de actividad del nodo<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.allocators** <br>(gauge) | \[OpenMetrics\] Memoria asignada (carriers_size) y utilizada (blocks_size) para los diferentes asignadores en la máquina virtual. Consulta erts_alloc(3).|
| **rabbitmq.erlang.vm.atom_count** <br>(gauge) | \[OpenMetrics\] Número de átomos existentes actualmente en el nodo local.|
| **rabbitmq.erlang.vm.atom_limit** <br>(gauge) | \[OpenMetrics\] Número máximo de átomos existentes simultáneamente en el nodo local.|
| **rabbitmq.erlang.vm.dirty_cpu_schedulers** <br>(gauge) | \[OpenMetrics\] Número de subprocesos sucios del programador de CPU utilizados por el emulador.<br>_Se muestra como subproceso_ |
| **rabbitmq.erlang.vm.dirty_cpu_schedulers_online** <br>(gauge) | \[OpenMetrics\] Número de subprocesos sucios del programador de CPU en línea.<br>_Se muestra como subproceso_ |
| **rabbitmq.erlang.vm.dirty_io_schedulers** <br>(gauge) | \[OpenMetrics\] Número de subprocesos sucios del programador de E/S utilizados por el emulador.<br>_Se muestra como subproceso_ |
| **rabbitmq.erlang.vm.dist.node_queue_size_bytes** <br>(gauge) | \[OpenMetrics\] Número de bytes en la cola de distribución de salida. Esta cola se sitúa entre el código Erlang y el controlador del puerto.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.node_state** <br>(gauge) | \[OpenMetrics\] Estado actual del enlace de distribución. El estado se representa como un valor numérico donde `pending=1', `up_pending=2' y `up=3'.| | **rabbitmq.erlang.vm.dist.port_input_bytes** <br>(gauge) | [OpenMetrics] Número total de bytes leídos desde el puerto.<br>_Se muestra como bytes_ | | **rabbitmq.erlang.vm.dist.port_memory_bytes** <br>(gauge) | [OpenMetrics] Número total de bytes asignados a este puerto por el sistema en tiempo de ejecución. El propio puerto puede tener memoria asignada que no está incluida.<br>_Se muestra como byte_ | | **rabbitmq.erlang.vm.dist.port_output_bytes** <br>(gauge) | [OpenMetrics] Número total de bytes escritos en el puerto.<br>_Se muestra como bytes_ | | **rabbitmq.erlang.vm.dist.port_queue.size_bytes** <br>(gauge) | [OpenMetrics] Número total de bytes puestos en cola por el puerto utilizando la implementación de colas del controlador ERTS.<br>_Se muestra como bytes_ | | **rabbitmq.erlang.vm.dist.proc.heap_size_words** <br>(gauge) | [OpenMetrics] Tamaño en palabras de la generación heap más joven del proceso. Esta generación incluye el stack tecnplógico del proceso. Esta información es altamente dependiente de la implementación y puede cambiar si la implementación cambia.| | **rabbitmq.erlang.vm.dist.proc.memory_bytes** <br>(gauge) | [OpenMetrics] Tamaño en bytes del proceso. Esto incluye el stack tecnológico de llamadas, heap y las estructuras internas.<br>_Se muestra como bytes_ | | **rabbitmq.erlang.vm.dist.proc.message_queue_len** <br>(gauge) | [OpenMetrics] Número de mensajes actualmente en la cola de mensajes del proceso.<br>_Se muestra como mensaje_ | | **rabbitmq.erlang.vm.dist.proc.min_bin_vheap_size_words** <br>(gauge) | [OpenMetrics] Tamaño mínimo de heap virtual binario para el proceso.| | **rabbitmq.erlang.vm.dist.proc.min_heap_size_words** <br>(gauge) | [OpenMetrics] Tamaño mínimo de heap para el proceso.| | **rabbitmq.erlang.vm.dist.proc.reductions** <br>(gauge) | [OpenMetrics] Número de reducciones ejecutadas por el proceso.| | **rabbitmq.erlang.vm.dist.proc.stack_size_words** <br>(gauge) | [OpenMetrics] Tamaño del stack tecnológico del proceso, en palabras.| | **rabbitmq.erlang.vm.dist.proc.status** <br>(gauge) | [OpenMetrics] Estado actual del proceso de distribución. El estado se representa como un valor numérico donde `exiting=1', `suspended=2', `runnable=3', `garbage_collecting=4', `running=5' and \`waiting=6'.|
| **rabbitmq.erlang.vm.dist.proc.total_heap_size_words** <br>(gauge) | \[OpenMetrics\] Tamaño total, en palabras, de todos los fragmentos de heap del proceso. Esto incluye el stack tecnológico del proceso y cualquier mensaje no recibido que se considere parte del heap.|
| **rabbitmq.erlang.vm.dist.recv.avg_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño medio de los paquetes, en bytes, recibidos por el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.recv.cnt** <br>(gauge) | \[OpenMetrics\] Número de paquetes recibidos por el socket.|
| **rabbitmq.erlang.vm.dist.recv.dvi_bytes** <br>(gauge) | \[OpenMetrics\] Desviación media del tamaño del paquete, en bytes, recibido por el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.recv.max_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño del paquete más grande, en bytes, recibido por el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.recv_bytes** <br>(gauge) | \[OpenMetrics\] Número de bytes recibidos por el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.send.avg_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño medio de los paquetes, en bytes, enviados desde el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.send.cnt** <br>(gauge) | \[OpenMetrics\] Número de paquetes enviados desde el socket.|
| **rabbitmq.erlang.vm.dist.send.max_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño del paquete más grande, en bytes, enviado desde el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.send.pend_bytes** <br>(gauge) | \[OpenMetrics\] Número de bytes a la espera de ser enviados por el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.dist.send_bytes** <br>(gauge) | \[OpenMetrics\] Número de bytes enviados desde el socket.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.ets_limit** <br>(gauge) | \[OpenMetrics\] Número máximo de tablas ETS permitidas.|
| **rabbitmq.erlang.vm.logical_processors** <br>(gauge) | \[OpenMetrics\] Número detectado de procesadores lógicos configurados en el sistema.|
| **rabbitmq.erlang.vm.logical_processors.available** <br>(gauge) | \[OpenMetrics\] Número detectado de procesadores lógicos disponibles para el sistema de tiempo de ejecución Erlang.|
| **rabbitmq.erlang.vm.logical_processors.online** <br>(gauge) | \[OpenMetrics\] Número detectado de procesadores lógicos en línea en el sistema.|
| **rabbitmq.erlang.vm.memory.atom_bytes_total** <br>(gauge) | \[OpenMetrics\] Cantidad total de memoria actualmente asignada para los átomos. Esta memoria es parte de la memoria presentada como memoria del sistema.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.memory.bytes_total** <br>(gauge) | \[OpenMetrics\] Cantidad total de memoria asignada actualmente. Es igual a la suma del tamaño de memoria de los procesos y del sistema.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.memory.dets_tables** <br>(gauge) | \[OpenMetrics\] Recuento de tablas DETS de máquinas virtuales Erlang.|
| **rabbitmq.erlang.vm.memory.ets_tables** <br>(gauge) | \[OpenMetrics\] Recuento de tablas ETS de máquinas virtuales Erlang.|
| **rabbitmq.erlang.vm.memory.processes_bytes_total** <br>(gauge) | \[OpenMetrics\] Cantidad total de memoria actualmente asignada para los procesos Erlang.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.memory.system_bytes_total** <br>(gauge) | \[OpenMetrics\] Cantidad total de memoria actualmente asignada para el emulador que no está directamente relacionada con un proceso Erlang. La memoria presentada como procesos no está incluida en esta memoria.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.msacc.alloc_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a gestionar la memoria. Sin estados adicionales, este tiempo se reparte entre todos los demás estados.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.aux_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a gestionar trabajos auxiliares.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.bif_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a BIF. Sin estados adicionales, este tiempo forma parte del estado 'emulador'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.busy_wait_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos de espera ocupada. Sin estados adicionales, este tiempo forma parte del estado 'otros'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.check_io_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a comprobar si hay nuevos eventos de E/S.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.emulator_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a ejecutar procesos Erlang.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.ets_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a ejecutar BIF ETS. Sin estados adicionales, este tiempo forma parte del estado 'emulador'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.gc_full_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a la recolección de basura fullsweep. Sin estados adicionales, este tiempo es parte del estado 'recolección de basura'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.gc_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a la recolección de basura. Cuando los estados adicionales están activados, este es el tiempo dedicado a recolectar basura non-fullsweep.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.nif_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a NIF. Sin estados adicionales, este tiempo forma parte del estado 'emulador'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.other_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a hacer cosas no explicadas.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.port_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a ejecutar puertos.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.send_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a enviar mensajes (solo procesos). Sin estados adicionales, este tiempo forma parte del estado 'emulador'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.sleep_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos que pasó durmiendo.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.msacc.timers_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total en segundos dedicado a gestionar temporizadores. Sin estados adicionales, este tiempo forma parte del estado 'otros'.<br>_Se muestra como segundos_ |
| **rabbitmq.erlang.vm.port_count** <br>(gauge) | \[OpenMetrics\] Número de puertos existentes actualmente en el nodo local.|
| **rabbitmq.erlang.vm.port_limit** <br>(gauge) | \[OpenMetrics\] Número máximo de puertos existentes simultáneamente en el nodo local.|
| **rabbitmq.erlang.vm.process_count** <br>(gauge) | \[OpenMetrics\] Número de procesos existentes actualmente en el nodo local.<br>_Se muestra como proceso_ |
| **rabbitmq.erlang.vm.process_limit** <br>(gauge) | \[OpenMetrics\] Número máximo de procesos existentes simultáneamente en el nodo local.<br>_Se muestra como proceso_ |
| **rabbitmq.erlang.vm.schedulers** <br>(gauge) | \[OpenMetrics\] Número de procesos del programador utilizados por el emulador.|
| **rabbitmq.erlang.vm.schedulers_online** <br>(gauge) | \[OpenMetrics\] Número de programadores en línea.|
| **rabbitmq.erlang.vm.smp_support** <br>(gauge) | \[OpenMetrics\] 1 si el emulador ha sido compilado con soporte SMP, en caso contrario 0.|
| **rabbitmq.erlang.vm.statistics.bytes_output.count** <br>(count) | \[OpenMetrics\] Número total de bytes emitidos a los puertos.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.statistics.bytes_received.count** <br>(count) | \[OpenMetrics\] Número total de bytes recibidos a través de los puertos.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.statistics.context_switches.count** <br>(count) | \[OpenMetrics\] Número total de cambios de contexto desde que se inició el sistema.|
| **rabbitmq.erlang.vm.statistics.dirty_cpu_run_queue_length** <br>(gauge) | \[OpenMetrics\] Longitud de la cola de ejecución de CPU sucia.|
| **rabbitmq.erlang.vm.statistics.dirty_io_run_queue_length** <br>(gauge) | \[OpenMetrics\] Longitud de la cola de ejecución de E/S sucia.|
| **rabbitmq.erlang.vm.statistics.garbage_collection.bytes_reclaimed.count** <br>(count) | \[OpenMetrics\] Recolección de basura: bytes recuperados.<br>_Se muestra como bytes_ |
| **rabbitmq.erlang.vm.statistics.garbage_collection.number_of_gcs.count** <br>(count) | \[OpenMetrics\] Recolección de basura: número de recolecciones de basura.|
| **rabbitmq.erlang.vm.statistics.garbage_collection.words_reclaimed.count** <br>(count) | \[OpenMetrics\] Recolección de basura: palabras recuperadas.|
| **rabbitmq.erlang.vm.statistics.reductions.count** <br>(count) | \[OpenMetrics\] Reducciones totales.|
| **rabbitmq.erlang.vm.statistics.run_queues_length** <br>(gauge) | \[OpenMetrics\] Longitud de las colas de ejecución normales.|
| **rabbitmq.erlang.vm.statistics.runtime_milliseconds.count** <br>(count) | \[OpenMetrics\] Suma del tiempo de ejecución de todos los subprocesos en el sistema de tiempo de ejecución Erlang. Puede ser mayor que el tiempo del reloj de pared.<br>_Se muestra como milisegundos_ |
| **rabbitmq.erlang.vm.statistics.wallclock_time_milliseconds.count** <br>(count) | \[OpenMetrics\] Información sobre el reloj de pared. Igual que erlang_vm_statistics_runtime_milliseconds excepto que se mide el tiempo real.<br>_Se muestra como milisegundos_ |
| **rabbitmq.erlang.vm.thread_pool_size** <br>(gauge) | \[OpenMetrics\] Número de subprocesos asíncronos en el grupo de subprocesos asíncronos utilizados en llamadas asíncronas al controlador.|
| **rabbitmq.erlang.vm.threads** <br>(gauge) | \[OpenMetrics\] 1 si el emulador ha sido compilado con soporte para subprocesos, 0 en caso contrario.|
| **rabbitmq.erlang.vm.time_correction** <br>(gauge) | \[OpenMetrics\] 1 si la corrección de tiempo está activada, 0 en caso contrario.|
| **rabbitmq.erlang.vm.wordsize_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño de las palabras de términos Erlang en bytes.<br>_Se muestra como bytes_ |
| **rabbitmq.exchange.messages.ack.count** <br>(gauge) | Número de mensajes en intercambios entregados a clientes y reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.ack.rate** <br>(gauge) | Tasa de mensajes en intercambios entregados a clientes y reconocidos por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.confirm.count** <br>(gauge) | Recuento de mensajes en intercambios confirmados<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.confirm.rate** <br>(gauge) | Tasa de mensajes en intercambios confirmados por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.deliver_get.count** <br>(gauge) | Suma de mensajes en intercambios entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.deliver_get.rate** <br>(gauge) | Tasa por segundo de la suma de mensajes en intercambios entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish.count** <br>(gauge) | Recuento de mensajes en intercambios publicados<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish.rate** <br>(gauge) | Tasa de mensajes en intercambios publicados por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish_in.count** <br>(gauge) | Recuento de mensajes publicados desde canales en este intercambio<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish_in.rate** <br>(gauge) | Tasa de mensajes publicados desde los canales a esta central por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish_out.count** <br>(gauge) | Recuento de mensajes publicados desde este intercambio en colas<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.publish_out.rate** <br>(gauge) | Tasa de mensajes publicados desde este intercambio a las colas por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.redeliver.count** <br>(gauge) | Recuento del subconjunto de mensajes en intercambios en deliver_get que tenían el indicador de reenviado activado<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.redeliver.rate** <br>(gauge) | Tasa del subconjunto de mensajes en intercambios en deliver_get que tenían el indicador de reenviado activado por segundo <br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.return_unroutable.count** <br>(gauge) | Recuento de mensajes en intercambios devueltos al publicador como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.exchange.messages.return_unroutable.rate** <br>(gauge) | Tasa de mensajes en intercambios devueltos al publicador como no enrutables por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.global.consumers** <br>(gauge) | \[OpenMetrics\] Número actual de consumidores|
| **rabbitmq.global.messages.acknowledged.count** <br>(count) | \[OpenMetrics\] Número total de mensajes reconocidos por los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.confirmed.count** <br>(count) | \[OpenMetrics\] Número total de mensajes confirmados a los publicadores<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.dead_lettered.confirmed.count** <br>(count) | \[OpenMetrics\] Número total de mensajes fallidos y confirmados por colas de destino<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.dead_lettered.delivery_limit.count** <br>(count) | \[OpenMetrics\] Número total de mensajes fallidos por exceder el límite de entrega<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.dead_lettered.expired.count** <br>(count) | \[OpenMetrics\] Número total de mensajes fallidos por exceder el ciclo de vida del mensaje<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.dead_lettered.maxlen.count** <br>(count) | \[OpenMetrics\] Número total de mensajes fallidos por desbordamiento drop-head o reject-publish-dlx<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.dead_lettered.rejected.count** <br>(count) | \[OpenMetrics\] Número total de mensajes fallidos debido a basic.reject o basic.nack<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.delivered.consume_auto_ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores utilizando basic.consume con reconocimiento automático<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.delivered.consume_manual_ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores utilizando basic.consume con reconocimiento manual<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.delivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.delivered.get_auto_ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores utilizando basic.get con reconocimiento automático<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.delivered.get_manual_ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados a los consumidores utilizando basic.get con reconocimiento manual<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.get_empty.count** <br>(count) | \[OpenMetrics\] Número total de veces que las operaciones basic.get no han obtenido ningún mensaje.|
| **rabbitmq.global.messages.received.count** <br>(count) | \[OpenMetrics\] Número total de mensajes recibidos de los publicadores<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.received_confirm.count** <br>(count) | \[OpenMetrics\] Número total de mensajes recibidos de publicadores que esperan confirmaciones<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.redelivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes reenviados a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.routed.count** <br>(count) | \[OpenMetrics\] Número total de mensajes enrutados a colas o flujos<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.unroutable.dropped.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados como no obligatorios en un intercambio y descartados como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.global.messages.unroutable.returned.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados como obligatorios en un intercambio y devueltos al publicador como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.global.publishers** <br>(gauge) | \[OpenMetrics\] Número actual de publicadores|
| **rabbitmq.identity_info** <br>(gauge) | \[OpenMetrics\] Información de la identidad de nodos y clústeres RabbitMQ|
| **rabbitmq.io.read_bytes.count** <br>(count) | \[OpenMetrics\] Número total de bytes de E/S leídos<br>_Se muestra como bytes_ |
| **rabbitmq.io.read_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de lectura de E/S<br>_Se muestra como operación_ |
| **rabbitmq.io.read_time_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total de lectura de E/S<br>_Se muestra en segundos_ |
| **rabbitmq.io.reopen_ops.count** <br>(count) | \[OpenMetrics\] Número total de veces que se han reabierto archivos|
| **rabbitmq.io.seek_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de búsqueda de E/S<br>_Se muestra como operación_ |
| **rabbitmq.io.seek_time_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total de búsqueda de E/S<br>_Se muestra como segundos_ |
| **rabbitmq.io.sync_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de sincronización de E/S<br>_Se muestra como operación_ |
| **rabbitmq.io.sync_time_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total de sincronización de E/S<br>_Se muestra como segundos_ |
| **rabbitmq.io.write_bytes.count** <br>(count) | \[OpenMetrics\] Número total de bytes de E/S escritos<br>_Se muestra como bytes_ |
| **rabbitmq.io.write_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de escritura de E/S<br>_Se muestra como operación_ |
| **rabbitmq.io.write_time_seconds.count** <br>(count) | \[OpenMetrics\] Tiempo total de escritura de E/S<br>_Se muestra en segundos_ |
| **rabbitmq.msg_store.read.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de lectura del almacén de mensajes<br>_Se muestra como operación_ |
| **rabbitmq.msg_store.write.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de escritura del almacén de mensajes<br>_Se muestra como operación_ |
| **rabbitmq.node.disk_alarm** <br>(gauge) | ¿Tiene el nodo alarma de disco?|
| **rabbitmq.node.disk_free** <br>(gauge) | Espacio libre actual en disco<br>_Se muestra como bytes_ |
| **rabbitmq.node.fd_used** <br>(gauge) | Descriptores de archivo utilizados|
| **rabbitmq.node.mem_alarm** <br>(gauge) | ¿Tiene el host alarma de memoria?|
| **rabbitmq.node.mem_limit** <br>(gauge) | Marca de agua alta del uso de memoria en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.node.mem_used** <br>(gauge) | Memoria utilizada en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.node.partitions** <br>(gauge) | Número de particiones de red que ve este nodo|
| **rabbitmq.node.run_queue** <br>(gauge) | Número medio de procesos Erlang a la espera de ejecución<br>_Se muestra como proceso_ |
| **rabbitmq.node.running** <br>(gauge) | ¿Se está ejecutando el nodo o no?|
| **rabbitmq.node.sockets_used** <br>(gauge) | Número de descriptores de archivo utilizados como sockets|
| **rabbitmq.overview.messages.ack.count** <br>(gauge) | Número de mensajes entregados a los clientes y reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.ack.rate** <br>(gauge) | Tasa de mensajes entregados a clientes y reconocidos por segundo <br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.confirm.count** <br>(gauge) | Recuento de mensajes confirmados<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.confirm.rate** <br>(gauge) | Tasa de mensajes confirmados por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.deliver_get.count** <br>(gauge) | Suma de mensajes entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.deliver_get.rate** <br>(gauge) | Tasa por segundo de la suma de mensajes entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.drop_unroutable.count** <br>(gauge) | Recuento de mensajes descartados como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.drop_unroutable.rate** <br>(gauge) | Tasa de mensajes descartados como no enrutables por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish.count** <br>(gauge) | Recuento de mensajes publicados<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish.rate** <br>(gauge) | Tasa de mensajes publicados por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish_in.count** <br>(gauge) | Recuento de mensajes publicados desde canales en este resumen<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish_in.rate** <br>(gauge) | Tasa de mensajes publicados desde canales en este resumen por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish_out.count** <br>(gauge) | Recuento de mensajes publicados desde este resumen en colas<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.publish_out.rate** <br>(gauge) | Tasa de mensajes publicados desde este resumen en colas por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.redeliver.count** <br>(gauge) | Recuento del subconjunto de mensajes en deliver_get que tenían el indicador de reenviado activado<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.redeliver.rate** <br>(gauge) | Tasa del subconjunto de mensajes en deliver_get que tenían el indicador de reenviado activado por segundo <br>__Se muestra como mensaje_ |
| **rabbitmq.overview.messages.return_unroutable.count** <br>(gauge) | Recuento de mensajes devueltos al publicador como no enrutables<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.messages.return_unroutable.rate** <br>(gauge) | Tasa de mensajes devueltos al publicador como no enrutables por segundo<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.object_totals.channels** <br>(gauge) | Número total de canales<br>_Se muestra como elemento_ |
| **rabbitmq.overview.object_totals.connections** <br>(gauge) | Número total de conexiones<br>_Se muestra como conexión_ |
| **rabbitmq.overview.object_totals.consumers** <br>(gauge) | Número total de consumidores<br>_Se muestra como elemento_ |
| **rabbitmq.overview.object_totals.queues** <br>(gauge) | Número total de colas<br>_Se muestra como elemento_ |
| **rabbitmq.overview.queue_totals.messages.count** <br>(gauge) | Número total de mensajes (listos más no reconocidos)<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.queue_totals.messages.rate** <br>(gauge) | Tasa del número de mensajes (listos más no reconocidos)<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.queue_totals.messages_ready.count** <br>(gauge) | Número de mensajes listos para su entrega<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.queue_totals.messages_ready.rate** <br>(gauge) | Tasa del número de mensajes listos para su entrega<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.queue_totals.messages_unacknowledged.count** <br>(gauge) | Número de mensajes no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.overview.queue_totals.messages_unacknowledged.rate** <br>(gauge) | Tasa del número de mensajes no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.process.max_fds** <br>(gauge) | \[OpenMetrics\] Límite de descriptores de archivo abiertos|
| **rabbitmq.process.max_tcp_sockets** <br>(gauge) | \[OpenMetrics\] Límite de sockets TCP abiertos|
| **rabbitmq.process.open_fds** <br>(gauge) | \[OpenMetrics\] Descriptores de archivo abiertos|
| **rabbitmq.process.open_tcp_sockets** <br>(gauge) | \[OpenMetrics\] Sockets TCP abiertos|
| **rabbitmq.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics\] Memoria utilizada en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.process_start_time_seconds** <br>(gauge) | \[OpenMetrics\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundos_ |
| **rabbitmq.queue.active_consumers** <br>(gauge) | Número de consumidores activos, consumidores que pueden recibir inmediatamente cualquier mensaje enviado a la cola.|
| **rabbitmq.queue.bindings.count** <br>(gauge) | Número de enlaces para una cola específica|
| **rabbitmq.queue.consumer_capacity** <br>(gauge) | \[OpenMetrics\] Capacidad de consumo|
| **rabbitmq.queue.consumer_utilisation** <br>(gauge) | Proporción de tiempo durante el que los consumidores de una cola pueden tomar nuevos mensajes<br>_Se muestra como fracción_ |
| **rabbitmq.queue.consumers** <br>(gauge) | Número de consumidores|
| **rabbitmq.queue.disk_reads.count** <br>(count) | \[OpenMetrics\] Número total de veces que la cola ha leído mensajes del disco|
| **rabbitmq.queue.disk_writes.count** <br>(count) | \[OpenMetrics\] Número total de veces que la cola ha escrito mensajes en el disco|
| **rabbitmq.queue.get.ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes obtenidos de una cola con basic.get en modo de reconocimiento manual.|
| **rabbitmq.queue.get.count** <br>(count) | \[OpenMetrics\] Número total de mensajes obtenidos de una cola con basic.get en modo de reconocimiento automático.|
| **rabbitmq.queue.get.empty.count** <br>(count) | \[OpenMetrics\] Número total de veces que las operaciones basic.get no han obtenido ningún mensaje en una cola.|
| **rabbitmq.queue.head_message_timestamp** <br>(gauge) | \[OpenMetrics, CLI de gestión\] Marca de tiempo del mensaje de cabecera de la marca de tiempo de la cola del primer mensaje de la cola, si lo hay<br>_Se muestra como milisegundos_ |
| **rabbitmq.queue.index.read_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de lectura de índices de cola<br>_Se muestra como operación_ |
| **rabbitmq.queue.index.write_ops.count** <br>(count) | \[OpenMetrics\] Número total de operaciones de escritura de índices de cola<br>_Se muestra como operación_ |
| **rabbitmq.queue.memory** <br>(gauge) | Bytes de memoria consumidos por el proceso Erlang asociado a la cola, incluyendo stack tecnológico, heap y estructuras internas<br>_Se muestra como bytes_ |
| **rabbitmq.queue.message_bytes** <br>(gauge) | Número de bytes de mensajes listos para ser entregados a los clientes<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages** <br>(gauge) | \[OpenMetrics, CLI de gestión\] Recuento del total de mensajes en la cola, que es la suma de mensajes listos y no reconocidos (profundidad total de la cola)<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ack.count** <br>(gauge) | Número de mensajes en cola entregados a clientes y reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ack.rate** <br>(gauge) | Número por segundo de mensajes entregados a clientes y reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.acked.count** <br>(count) | \[OpenMetrics\] Número total de mensajes reconocidos por los consumidores en una cola|
| **rabbitmq.queue.messages.bytes** <br>(gauge) | \[OpenMetrics\] Tamaño en bytes de los mensajes listos y no reconocidos<br>_Se muestra como bytes_ |
| **rabbitmq.queue.messages.deliver.count** <br>(gauge) | Recuento de mensajes entregados en modo de reconocimiento a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.deliver.rate** <br>(gauge) | Tasa de mensajes entregados en modo de reconocimiento a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.deliver_get.count** <br>(gauge) | Suma de mensajes en colas entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get.<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.deliver_get.rate** <br>(gauge) | Tasa por segundo de la suma de mensajes en colas entregados en modo de reconocimiento a los consumidores, en modo sin reconocimiento a los consumidores, en modo de reconocimiento en respuesta a basic.get y en modo sin reconocimiento en respuesta a basic.get.<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.delivered.ack.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados desde una cola a los consumidores en modo de reconocimiento automático.|
| **rabbitmq.queue.messages.delivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes entregados desde una cola a los consumidores en modo de reconocimiento automático.|
| **rabbitmq.queue.messages.paged_out** <br>(gauge) | \[OpenMetrics\] Mensajes paginados al disco|
| **rabbitmq.queue.messages.paged_out_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño en bytes de los mensajes paginados al disco<br>_Se muestra como bytes_ |
| **rabbitmq.queue.messages.persistent** <br>(gauge) | \[OpenMetrics\] Mensajes persistentes<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.persistent_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño en bytes de los mensajes persistentes<br>_Se muestra como bytes_ |
| **rabbitmq.queue.messages.publish.count** <br>(gauge) | Recuento de mensajes en colas publicados<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.publish.rate** <br>(gauge) | Tasa por segundo de mensajes publicados<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.published.count** <br>(count) | \[OpenMetrics\] Número total de mensajes publicados en colas<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ram** <br>(gauge) | \[OpenMetrics\] Mensajes listos y no reconocidos almacenados en memoria<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ram_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño de los mensajes listos y no reconocidos almacenados en memoria<br>_Se muestra como byte_ |
| **rabbitmq.queue.messages.rate** <br>(gauge) | Recuento por segundo del total de mensajes en la cola<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ready** <br>(gauge) | \[OpenMetrics\] Mensajes listos para ser entregados a los consumidores<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.ready_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño en bytes de los mensajes listos<br>_Se muestra como bytes_ |
| **rabbitmq.queue.messages.ready_ram** <br>(gauge) | \[OpenMetrics\] Mensajes listos almacenados en memoria<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.redeliver.count** <br>(gauge) | Recuento del subconjunto de mensajes en colas en deliver_get que tenían el indicador de reenviado activado<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.redeliver.rate** <br>(gauge) | Tasa por segundo del subconjunto de mensajes en deliver_get que tenían el indicador de reenviado activado<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.redelivered.count** <br>(count) | \[OpenMetrics\] Número total de mensajes redistribuidos desde una cola a los consumidores|
| **rabbitmq.queue.messages.unacked** <br>(gauge) | \[OpenMetrics\] Mensajes entregados a los consumidores pero aún no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages.unacked_bytes** <br>(gauge) | \[OpenMetrics\] Tamaño en bytes de todos los mensajes no reconocidos<br>_Se muestra como bytes_ |
| **rabbitmq.queue.messages.unacked_ram** <br>(gauge) | \[OpenMetrics\] Mensajes no reconocidos almacenados en memoria<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages_ready** <br>(gauge) | Número de mensajes listos para ser entregados a los clientes<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages_ready.rate** <br>(gauge) | Número por segundo de mensajes listos para ser entregados a los clientes<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages_unacknowledged** <br>(gauge) | Número de mensajes entregados a clientes pero aún no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.messages_unacknowledged.rate** <br>(gauge) | Número por segundo de mensajes entregados a clientes pero aún no reconocidos<br>_Se muestra como mensaje_ |
| **rabbitmq.queue.process_memory_bytes** <br>(gauge) | \[OpenMetrics\] Memoria en bytes utilizada por el proceso de cola Erlang<br>_Se muestra como bytes_ |
| **rabbitmq.queue.process_reductions.count** <br>(count) | \[OpenMetrics\] Número total de reducciones de procesos de cola|
| **rabbitmq.queues** <br>(gauge) | \[OpenMetrics\] Colas disponibles|
| **rabbitmq.queues.created.count** <br>(count) | \[OpenMetrics\] Número total de colas creadas|
| **rabbitmq.queues.declared.count** <br>(count) | \[OpenMetrics\] Número total de colas declaradas|
| **rabbitmq.queues.deleted.count** <br>(count) | \[OpenMetrics\] Número total de colas eliminadas|
| **rabbitmq.raft.entry_commit_latency_seconds** <br>(gauge) | \[OpenMetrics\] Tiempo que tarda en confirmarse una entrada de log<br>_Se muestra como segundos_ |
| **rabbitmq.raft.log.commit_index** <br>(gauge) | \[OpenMetrics] Índice de confirmación de logs Raft|
| **rabbitmq.raft.log.last_applied_index** <br>(gauge) | \[OpenMetrics\] Último índice de logs Raft aplicado|
| **rabbitmq.raft.log.last_written_index** <br>(gauge) | \[OpenMetrics\] Último índice de logs Raft escrito|
| **rabbitmq.raft.log.snapshot_index** <br>(gauge) | \[OpenMetrics\] Índice de snapshots de logs Raft|
| **rabbitmq.raft.term.count** <br>(count) | \[OpenMetrics\] Número de término Raft actual|
| **rabbitmq.resident_memory_limit_bytes** <br>(gauge) | \[OpenMetrics\] Marca de agua alta de memoria en bytes<br>_Se muestra como bytes_ |
| **rabbitmq.schema.db.disk_tx.count** <br>(count) | \[OpenMetrics\] Número total de transacciones de disco Schema DB<br>_Se muestra como transacción_ |
| **rabbitmq.schema.db.ram_tx.count** <br>(count) | \[OpenMetrics\] Número total de transacciones de memoria Schema DB<br>_Se muestra como transacción_ |
| **rabbitmq.telemetry.scrape.duration_seconds.count** <br>(count) | \[OpenMetrics\] Duración del raspado<br>_Se muestra como segundos_ |
| **rabbitmq.telemetry.scrape.duration_seconds.sum** <br>(count) | \[OpenMetrics\] Duración del raspado<br>_Se muestra como segundos_ |
| **rabbitmq.telemetry.scrape.encoded_size_bytes.count** <br>(count) | \[OpenMetrics\] Tamaño de raspado, codificado<br>_Se muestra como bytes_ |
| **rabbitmq.telemetry.scrape.encoded_size_bytes.sum** <br>(count) | \[OpenMetrics\] Tamaño de raspado, codificado<br>_Se muestra como bytes_ |
| **rabbitmq.telemetry.scrape.size_bytes.count** <br>(count) | \[OpenMetrics\] Tamaño de raspado, no codificado<br>_Se muestra como bytes_ |
| **rabbitmq.telemetry.scrape.size_bytes.sum** <br>(count) | \[OpenMetrics\] Tamaño de raspado, no codificado<br>_Se muestra como bytes_ |

### Eventos

### Checks de servicio

**rabbitmq.aliveness**

Solo disponible con el complemento de gestión de RabbitMQ. Devuelve el estado de un vhost basado en la [API Aliveness](https://github.com/rabbitmq/rabbitmq-management/blob/rabbitmq_v3_6_8/priv/www/api/index.html) de RabbitMQ. La API Aliveness crea una cola de test, luego publica y consume un mensaje de esa cola. Devuelve `OK` si el código de estado de la API es 200 y `CRITICAL` en caso contrario.

_Estados: ok, crítico_

**rabbitmq.status**

Solo disponible con el complemento de gestión de RabbitMQ. Devuelve el estado del servidor RabbitMQ. Devuelve `OK` si el Agent ha podido contactar con la API y `CRITICAL` en caso contrario.

_Estados: ok, crítico_

**rabbitmq.openmetrics.health**

Solo disponible con el complemento RabbitMQ Prometheus. Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics y `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

### Migración al complemento Prometheus

El complemento Prometheus expone un conjunto diferente de métricas del complemento de gestión.
Esto es lo que debes tener en cuenta al migrar del complemento de gestión a Prometheus.

- Busca tus métricas en [esta tabla](https://docs.datadoghq.com/integrations/rabbitmq/?tab=host#metrics).. Si la descripción de una métrica contiene una etiqueta `[OpenMetrics]`, significa que está disponible en el complemento Prometheus. Las métricas que solo están disponibles en el complemento de gestión no tienen etiquetas en sus descripciones.
- Todos los dashboards y monitores que utilizan métricas del complemento de gestión no funcionarán. Cambia a los dashboards y a los monitores marcados como *OpenMetrics Version*.
- La configuración por defecto recopila métricas agregadas. Esto significa, por ejemplo, que no hay métricas etiquetadas por cola. Configura la opción `prometheus_plugin.unaggregated_endpoint` para obtener métricas sin agregación.
- El check de servicio `rabbitmq.status` se sustituye por `rabbitmq.openmetrics.health`. El check de servicio `rabbitmq.aliveness` no tiene equivalente en el complemento Prometheus.

El complemento Prometheus modifica algunas etiquetas. En la siguiente tabla se describen los cambios de las etiquetas más comunes.

| Gestión          | Prometheus                               |
|:--------------------|:-----------------------------------------|
| `queue_name`        | `queue`                                  |
| `rabbitmq_vhost`    | `vhost`, `exchange_vhost`, `queue_vhost` |
| `rabbitmq_exchange` | `exchange`                               |

Para obtener más información, consulta [Etiquetado de colas RabbitMQ por familia de etiquetas](https://docs.datadoghq.com/integrations/faq/tagging-rabbitmq-queues-by-tag-family/).

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Métricas clave para la monitorización de RabbitMQ](https://www.datadoghq.com/blog/rabbitmq-monitoring)
- [Recopilación de métricas con las herramientas de monitorización de RabbitMQ](https://www.datadoghq.com/blog/rabbitmq-monitoring-tools)
- [Monitorización del rendimiento de RabbitMQ con Datadog](https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog)