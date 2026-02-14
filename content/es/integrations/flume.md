---
app_id: flume
custom_kind: integración
description: Rastreo del receptor, del canal y de la source (fuente) del Agent Apache
  Flume
media: []
supported_os:
- linux
- macos
- windows
title: flume
---
## Información general

Esta check monitoriza [Apache Flume](https://flume.apache.org/).

## Configuración

La check de Flume no está incluida en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que deberás instalarlo.

### Instalación

Para el Agent v7.21+ / v6.21+, sigue las siguientes instrucciones para instalar la check de Flume en tu host. Consulta [Utilizar integraciones de Community](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] del núcleo (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Configura el agent de Flume para habilitar JMX añadiendo los siguientes argumentos JVM a tu [flume-env.sh](https://flume.apache.org/FlumeUserGuide.html#jmx-reporting):

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Edita el archivo `flume.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración de tu Agent, para empezar a recopilar datos de rendimiento de Flume.
   Consulta el archivo [ejemplo `flume.d/conf.yaml`](https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en el resultado del estado.
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para obtener instrucciones detalladas sobre la personalización de las métricas a recopilar, consulta la [documentación de JMX Checks](https://docs.datadoghq.com/integrations/java/).
   Si necesitas monitorizar más métricas, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Validación

[Ejecuta el subcomando  `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `flume` en la sección Checks.

### Métricas de componente

Las métricas recuperadas por este check dependen del source (fuente), del canal y del receptor utilizados por tu agent de Flume. Para obtener una lista completa de las métricas expuestas por cada componente, revisa [Métricas de componente disponibles](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) de la documentación de Apache Flume. Para obtener una lista de las métricas que puedes ver en Datadog, consulta la sección [Métricas](#metrics) en esta page (página).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **flume.channel.capacity** <br>(gauge) | El número máximo de eventos que pueden estar en cola en el canal en cualquier momento. Para los tipos de canal sin límite de capacidad, el valor será cero.<br>_Mostrado como evento_. |
| **flume.channel.fill_percentage** <br>(gauge) | El porcentaje de relleno del canal.<br>_Mostrado como porcentaje_ |
| **flume.channel.size** <br>(gauge) | El número de eventos actualmente en cola en el canal.<br>_Mostrado como evento_ |
| **flume.channel.event_put_attempt_count** <br>(count) | El número total de eventos que se han intentado introducir en el canal.<br>_Mostrado como evento_ |
| **flume.channel.event_put_success_count** <br>(count) | El número total de eventos que se han introducido con éxito en el canal.<br>_Mostrado como evento_ |
| **flume.channel.event_take_attempt_count** <br>(count) | El número total de intentos que se han hecho para tomar un evento del canal.<br>_Mostrado como evento_ |
| **flume.channel.event_take_success_count** <br>(count) | El número total de eventos que se han tomado con éxito del canal.<br>_Mostrado como evento_ |
| **flume.channel.kafka_commit_timer** <br>(gauge) | El temporizador para las confirmaciones del canal Kafka.<br>_Mostrado como tiempo_ |
| **flume.channel.kafka_event_get_timer** <br>(gauge) | El temporizador para el canal kafka que recupera eventos. <br> Mostrado como tiempo_ |
| **flume.channel.kafka_event_send_timer** <br>(gauge) | El temporizador para el canal Kafka que envía eventos.<br>_Mostrado como tiempo_ |
| **flume.channel.rollbackcount** <br>(count) | El número de reversiones del canal kafka.<br>_Mostrado como evento_ |
| **flume.sink.event_write_fail** <br>(count) | El número total de eventos de escritura fallidos.<br>_Mostrado como evento_ |
| **flume.sink.batch_empty_count** <br>(count) | El número de lotes de anexados intentados que contienen cero eventos.<br>_Mostrado como evento_ |
| **flume.sink.channel_read_fail** <br>(count) | El número de eventos de lectura fallidos del canal.<br>_Mostrado como evento_ |
| **flume.sink.batch_complete_count** <br>(count) | El número de lotes anexados intentados que contienen el número máximo de eventos admitido por el siguiente salto.<br>_Mostrado como evento_ |
| **flume.sink.batch_underflow_count** <br>(count) | El número de lotes de anexión intentados que contienen menos del número máximo de eventos admitidos por el siguiente salto.<br>_Mostrado como evento_ |
| **flume.sink.connection_closed_count** <br>(count) | El número de conexiones cerradas por este receptor.<br>_Mostrado como connection (conexión)_ |
| **flume.sink.connection_failed_count** <br>(count) | El número de conexiones fallidas.<br>_Mostrado como connection (conexión)_ |
| **flume.sink.connection_created_count** <br>(count) | El número de conexiones creadas por este receptor. Solo aplicable a algunos tipos de receptores.<br>_Mostrado como connection (conexión)_. |
| **flume.sink.event_drain_attempt_count** <br>(count) | El número total de eventos que se han intentado purgar al siguiente salto.<br>_Mostrado como evento_ |
| **flume.sink.event_drain_success_count** <br>(count) | El número total de eventos que se han purgado con éxito al siguiente salto<br>_Mostrado como evento_ |
| **flume.sink.kafka_event_sent_timer** <br>(gauge) | El temporizador para el receptor Kafka que envía eventos.<br>_Mostrado como tiempo_ |
| **flume.sink.rollbackcount** <br>(gauge) | El número de reversiones del receptor Kafka.<br>_Mostrado como evento_ |
| **flume.source.event_read_fail** <br>(count) | El número total de eventos de source (fuente) de lectura fallidos.<br>_Mostrado como evento_ |
| **flume.source.channel_write_fail** <br>(count) | El número total de eventos de escritura de canal fallidos.<br>_Mostrado como evento_ |
| **flume.source.event_accepted_count** <br>(count) | El número total de eventos aceptados con éxito, ya sea a través de lotes de anexión o anexiones de un solo evento.<br>_Mostrado como evento_ |
| **flume.source.event_received_count** <br>(count) | El número total de eventos recibidos, ya sea a través de lotes de anexión o anexiones de un solo evento.<br>_Mostrado como evento_ |
| **flume.source.append_accepted_count** <br>(count) | Número total de anexiones de un solo evento aceptadas con éxito.<br>_Mostrado como evento_ |
| **flume.source.append_received_count** <br>(count) | El número total de anexos de un solo evento recibidos.<br>_Mostrado como evento_ |
| **flume.source.open_connection_count** <br>(count) | El número de conexiones abiertas<br>_Mostrado como conexión_ |
| **flume.source.generic_processing_fail** <br>(count) | El número total de fallos de procesamiento genérico.<br>_Mostrado como evento_ |
| **flume.source.append_batch_accepted_count** <br>(count) | El número total de lotes anexados aceptados con éxito.<br>_Mostrado como evento_ |
| **flume.source.append_batch_received_count** <br>(count) | El número total de lotes anexados recibidos.<br>_Mostrado como evento_ |
| **flume.source.kafka_commit_timer** <br>(gauge) | El temporizador para los eventos de confirmación de source (fuente) Kafka.<br>_Mostrado como tiempo_ |
| **flume.source.kafka_empty_count** <br>(count) | El número de eventos vacíos de la source (fuente) Kafka. <br> _Mostrado como evento_ |
| **flume.source.kafka_event_get_timer** <br>(gauge) | El temporizador para la recuperación de eventos de la source (fuente) Kafka.<br>_Mostrado como tiempo_ |

### Eventos

Flume no incluye eventos.

### Checks de servicio

**flume.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Flume monitorizada. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).