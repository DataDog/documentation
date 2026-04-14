---
app_id: activemq
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Recopila métricas para agentes y colas, productores y consumidores, y
  mucho más.
further_reading:
- link: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
  tag: blog
  text: Arquitectura y métricas clave de ActiveMQ
- link: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
  tag: blog
  text: Blog de ActiveMQ
integration_version: 5.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: ActiveMQ
---
## Información general

El check de ActiveMQ recopila métricas para agentes, colas, productores, consumidores, etc.

**Nota:** Este check también admite ActiveMQ Artemis (futura versión de ActiveMQ `6`) e informa métricas bajo el espacio de nombres `activemq.artemis`. Consulta [metadata.csv][1](https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv) para ver una lista de métricas proporcionada por esta integración.

**Nota**: Si estás ejecutando una versión de ActiveMQ anterior a la 5.8.0, consulta los [archivos de versiones de ejemplo del Agent 5.10.x](https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example).

## Configuración

### Instalación

El check de ActiveMQ del Agent está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus nodos de ActiveMQ.

El check recopila métricas de JMX con [JMXFetch](https://github.com/DataDog/jmxfetch). Se necesita una JVM en cada nodo para que el Agent pueda ejecutar JMXFetch. Datadog recomienda utilizar una JVM proporcionada por Oracle.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. **Asegúrate de que [JMX Remote esté activado](https://activemq.apache.org/jmx.html) en tu servidor de ActiveMQ.**

1. Configura el Agent para conectarse a ActiveMQ. Edita `activemq.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [activemq.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles. Consulta el [archivo `metrics.yaml`](https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml) para ver la lista de métricas recopiladas por defecto.

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `activemq.d/conf.yaml` para empezar a recopilar tus logs de ActiveMQ:

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/guide/autodiscovery-with-jmx/?tab=containeragent) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `activemq`                           |
| `<INIT_CONFIG>`      | `"is_jmx": true`                     |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%","port":"1099"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `activemq` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **activemq.artemis.address.bytes_per_page** <br>(gauge) | (Solo Artemis) Número de bytes utilizados por cada página para esta dirección.<br>_Se muestra como byte_ |
| **activemq.artemis.address.number_of_messages** <br>(rate) | (Solo Artemis) La suma de mensajes en cola, incluyendo mensajes en entrega.<br>_Se muestra como mensaje_ |
| **activemq.artemis.address.pages_count** <br>(gauge) | (Solo Artemis) Número de páginas utilizadas por esta dirección.<br>_Se muestra como página_ |
| **activemq.artemis.address.routed_messages** <br>(rate) | (Solo Artemis) Número de mensajes enrutados a una o más vinculaciones, en forma de tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.address.size** <br>(gauge) | (Solo Artemis) Número de bytes estimados que están siendo utilizados por todas las colas vinculadas a esta dirección; se utiliza para controlar la paginación y el bloqueo.<br>_Se muestra como byte_ |
| **activemq.artemis.address.unrouted_messages** <br>(rate) | (Solo Artemis) Número de mensajes no enrutados a ninguna vinculación, como tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.address_memory_usage** <br>(gauge) | (Solo Artemis) Memoria utilizada por todas las direcciones en agente para mensajes en memoria.<br>_Se muestra como byte_ |
| **activemq.artemis.address_memory_usage_pct** <br>(gauge) | (Solo Artemis) Memoria utilizada por todas las direcciones del agente como porcentaje del tamaño máximo global.<br>_Se muestra como porcentaje_ |
| **activemq.artemis.connection_count** <br>(gauge) | (Solo Artemis) Número de clientes conectados a este servidor.<br>_Se muestra como conexión_ |
| **activemq.artemis.disk_store_usage_pct** <br>(gauge) | (Solo Artemis) Porcentaje del total de disco utilizado.<br>_Se muestra como porcentaje_ |
| **activemq.artemis.max_disk_usage** <br>(gauge) | (Solo Artemis) Límite máximo de uso del disco en porcentaje.<br>_Se muestra como porcentaje_ |
| **activemq.artemis.queue.consumer_count** <br>(gauge) | (Solo Artemis) Número de consumidores que consumen mensajes de esta cola.|
| **activemq.artemis.queue.max_consumers** <br>(gauge) | (Solo Artemis) Número máximo de consumidores permitidos en esta cola al mismo tiempo.|
| **activemq.artemis.queue.message_count** <br>(gauge) | (Solo Artemis) Número de mensajes actualmente en esta cola (incluye mensajes programados, paginados y en entrega), como tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.queue.messages_acknowledged** <br>(rate) | (Solo Artemis) Número de mensajes reconocidos desde que se creó esta cola, en forma de tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.queue.messages_added** <br>(rate) | (Solo Artemis) Número de mensajes añadidos a esta cola desde su creación, en forma de tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.queue.messages_expired** <br>(rate) | (Solo Artemis) Número de mensajes caducados de esta cola desde que se creó, en forma de tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.queue.messages_killed** <br>(rate) | (Solo Artemis) Número de mensajes eliminados de esta cola desde que se creó debido a que se superaron los intentos de entrega máximos, en forma de tasa.<br>_Se muestra como mensaje_ |
| **activemq.artemis.total_connection_count** <br>(rate) | (Solo Artemis) Número de clientes que se han conectado a este servidor desde que se inició, en forma de tasa.<br>_Se muestra como conexión_ |
| **activemq.artemis.total_consumer_count** <br>(rate) | (Solo Artemis) Número de consumidores que consumen mensajes de todas las colas de este servidor, en forma de tasa.|
| **activemq.artemis.total_message_count** <br>(rate) | (Solo Artemis) Número de mensajes en todas las colas del servidor, en forma de tasa.<br>_Se muestra como conexión_ |
| **activemq.artemis.total_messages_acknowledged** <br>(rate) | (Solo Artemis) Número de mensajes reconocidos desde todas las colas de este servidor desde que se inició, en forma de tasa.<br>_Se muestra como conexión_ |
| **activemq.artemis.total_messages_added** <br>(rate) | (Solo Artemis) Número de mensajes enviados a este servidor desde que se inició, en forma de tasa.<br>_Se muestra como conexión_ |
| **activemq.broker.memory_pct** <br>(gauge) | El porcentaje de memoria en uso.<br>_Se muestra como porcentaje_ |
| **activemq.broker.store_pct** <br>(gauge) | El porcentaje de tienda en uso.<br>_Se muestra como porcentaje_ |
| **activemq.broker.temp_pct** <br>(gauge) | El porcentaje de temporal en uso.<br>_Se muestra como porcentaje_ |
| **activemq.queue.avg_enqueue_time** <br>(gauge) | En promedio, la cantidad de tiempo (ms) que los mensajes permanecieron en cola.<br>_Se muestra como milisegundo_ |
| **activemq.queue.consumer_count** <br>(gauge) | El número de consumidores conectados.|
| **activemq.queue.dequeue_count** <br>(gauge) | La tasa de mensajes que se están poniendo en cola.<br>_Se muestra como mensaje_ |
| **activemq.queue.dispatch_count** <br>(gauge) | La tasa de mensajes que se están enviando.<br>_Se muestra como mensaje_ |
| **activemq.queue.enqueue_count** <br>(gauge) | La tasa de mensajes que se están poniendo en cola.<br>_Se muestra como mensaje_ |
| **activemq.queue.expired_count** <br>(gauge) | La tasa de mensajes que están caducando.<br>_Se muestra como mensaje_ |
| **activemq.queue.in_flight_count** <br>(gauge) | La tasa de mensajes que están por desplegar.<br>_Se muestra como mensaje_ |
| **activemq.queue.max_enqueue_time** <br>(gauge) | La cantidad máxima de tiempo (ms) que los mensajes permanecieron en cola.<br>_Se muestra como milisegundo_ |
| **activemq.queue.memory_pct** <br>(gauge) | El porcentaje de memoria actualmente en uso.<br>_Se muestra como porcentaje_ |
| **activemq.queue.min_enqueue_time** <br>(gauge) | La cantidad mínima de tiempo (ms) que los mensajes permanecieron en cola.<br>_Se muestra como milisegundo_ |
| **activemq.queue.producer_count** <br>(gauge) | El número de productores conectados.|
| **activemq.queue.size** <br>(gauge) | La cantidad de mensajes que quedaron en cola.<br>_Se muestra como mensaje_ |

### Eventos

El check de ActiveMQ no incluye ningún evento.

### Checks de servicio

**activemq.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de ActiveMQ monitorizada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Arquitectura y métricas clave de ActiveMQ](https://www.datadoghq.com/blog/activemq-architecture-and-metrics)
- [Monitorizar métricas y rendimiento de ActiveMQ](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance)