---
app_id: emqx
categories:
- métricas
- iot
custom_kind: integración
description: Recopila rendimiento, datos de estado, rendimiento de los mensajes y
  latencia de los mensajes en los brokers de MQTT, etc.
integration_version: 1.1.0
media:
- caption: Métricas del broker EMQX en el dashboard(1) de Datadog
  image_url: images/emqx-overview-1.png
  media_type: imagen
- caption: Métricas del broker EMQX en el dashboard(2) de Datadog
  image_url: images/emqx-overview-2.png
  media_type: imagen
- caption: Métricas del broker EMQX en el dashboard(3) de Datadog
  image_url: images/emqx-overview-3.png
  media_type: imagen
- caption: Métricas del broker EMQX en el dashboard(4) de Datadog
  image_url: images/emqx-overview-4.png
  media_type: imagen
- caption: Métricas del broker EMQX en el dashboard(5) de Datadog
  image_url: images/emqx-overview-5.png
  media_type: imagen
supported_os:
- linux
- Windows
- macOS
title: EMQX
---
## Información general

[EMQX](https://github.com/emqx/emqx) es un broker de MQTT de código abierto altamente escalable, diseñado para IoT (Internet de las cosas). MQTT es la sigla de Message Queuing Telemetry Transport, un protocolo ligero de red de publicación/suscripción que transporta mensajes entre dispositivos.

**Principales funciones de EMQX

- Escalabilidad: EMQX puede manejar millones de conexiones concurrentes de MQTT, lo que lo hace adecuado para aplicaciones de IoT que requieren manejar un gran número de dispositivos.
- Fiabilidad: Proporciona una entrega de mensajes estable y fiable, garantizando que los datos se transfieran correctamente entre dispositivos y servidores.
- Baja latencia: Diseñado para escenarios que requieren una comunicación de baja latencia.
- Alto rendimiento: Capaz de procesar un gran volumen de mensajes de forma eficiente.
- Agrupación en clústeres: EMQX puede desplegarse en un clúster distribuido para mejorar el rendimiento y la fiabilidad.

La integración de EMQX con Datadog enriquece las capacidades de monitorización, proporcionando información valiosa sobre el rendimiento y el estado de los brokers de MQTT. Esto es especialmente beneficioso en aplicaciones de IoT en las que es fundamental una transmisión de datos eficiente, fiable y en tiempo real.

**Tipos de datos enviados a Datadog:**

- Métricas: Esto incluye métricas del rendimiento como el rendimiento de los mensajes (mensajes enviados/recibidos por segundo), el número de clientes conectados y más.

- Rendimiento de los nodos: Monitorización del rendimiento de los nodos individuales en un clúster, como latencia, carga y métricas operativas.

- Estado operativo: Datos sobre el estado del broker de MQTT, incluidas tasas de errores y otros indicadores críticos.

## Configuración

### Instalación

Instala manualmente el check de EMQX (ten en cuenta que [las instrucciones pueden cambiar en función de tu entorno](https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent)):

Ejecuta `datadog-agent integration install -t datadog-emqx==1.1.0`.

### Configuración

1. Edita el archivo `emqx/conf.yaml`, situado en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent, para empezar a recopilar los datos del rendimiento de EMQX.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `emqx` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **emqx.connections.count** <br>(gauge) | Número de conexiones|
| **emqx.live.connections.count** <br>(gauge) | Número de conexiones activas|
| **emqx.sessions.count** <br>(gauge) | Número de sesiones|
| **emqx.topics.count** <br>(gauge) | Número de temas|
| **emqx.suboptions.count** <br>(gauge) | Número de opciones de suscripción|
| **emqx.subscribers.count** <br>(gauge) | Número de suscripciones|
| **emqx.subscriptions.count** <br>(gauge) | Número de suscripciones|
| **emqx.subscriptions.shared.count** <br>(gauge) | Número de suscripciones compartidas|
| **emqx.retained.count** <br>(gauge) | Número de mensaje de retención|
| **emqx.delayed.count** <br>(gauge) | Número de mensajes retrasados|
| **emqx.vm.cpu.use** <br>(gauge) | CPU utilizada por la máquina virtual.|
| **emqx.vm.cpu.idle** <br>(gauge) | CPU inactiva de la máquina virtual.|
| **emqx.vm.run_queue** <br>(gauge) | Longitud total de todas las colas de ejecución de CPU normales y sucias.|
| **emqx.vm.process.messages_in_queues** <br>(gauge) | Número total de todas las colas de mensajes de clientes.|
| **emqx.vm.total_memory** <br>(gauge) | Cantidad total de memoria disponible para el emulador Erlang, asignada y libre. Puede o no ser igual a la cantidad de memoria configurada en el sistema.<br>_Se muestra en bytes_ |
| **emqx.vm.used_memory** <br>(gauge) | Tamaño actual de la memoria que se está utilizando.<br>_Se muestra en bytes_ |
| **emqx.cluster.nodes_running** <br>(gauge) | Número de nodos actualmente en ejecución en el clúster.|
| **emqx.cluster.nodes_stopped** <br>(gauge) | Número de nodos actualmente detenidos en el clúster.|
| **emqx.bytes.received.count** <br>(count) | Bytes de tráfico recibidos.<br>_Se muestra en bytes_ |
| **emqx.bytes.sent.count** <br>(count) | Bytes de tráfico enviados.<br>_Se muestra en bytes_ |
| **emqx.packets.received.count** <br>(count) | Número de paquetes de datos transmitidos|
| **emqx.packets.sent.count** <br>(count) | Número de paquetes de datos recibidos|
| **emqx.packets.connack.sent.count** <br>(count) | Número de paquetes connack enviados|
| **emqx.packets.connect.count** <br>(count) | Número de paquetes de conexión recibidos|
| **emqx.packets.connack.error.count** <br>(count) | Número de paquetes de error connack enviados|
| **emqx.packets.connack.auth_error.count** <br>(count) | Número de paquetes connack auth_error enviados|
| **emqx.packets.publish.received.count** <br>(count) | Número de paquetes de publicación recibidos|
| **emqx.packets.publish.sent.count** <br>(count) | Número de paquetes de publicación enviados|
| **emqx.packets.publish.inuse.count** <br>(count) | Número de paquetes de publicación con error packet_identifter_in_use|
| **emqx.packets.publish.error.count** <br>(count) | Número de paquetes de publicación con error|
| **emqx.packets.publish.auth_error.count** <br>(count) | Número de paquetes de publicación auth_error|
| **emqx.packets.publish.dropped.count** <br>(count) | Número de paquetes de publicación descartados|
| **emqx.packets.puback.received.count** <br>(count) | Número de paquetes de recepción puback|
| **emqx.packets.puback.sent.count** <br>(count) | Número de paquetes puback enviados|
| **emqx.packets.puback.inuse.count** <br>(count) | Número de paquetes de error de infusión puback|
| **emqx.packets.puback.missed.count** <br>(count) | Número de paquetes de error puback perdidos|
| **emqx.packets.pubrec.received.count** <br>(count) | Número de paquetes pubrec recibidos|
| **emqx.packets.pubrec.sent.count** <br>(count) | Número de paquetes pubrec enviados|
| **emqx.packets.pubrec.inuse.count** <br>(count) | Número de paquetes de error de infusión pubrec|
| **emqx.packets.pubrec.missed.count** <br>(count) | Número de paquetes de error pubrec perdidos|
| **emqx.packets.pubrel.received.count** <br>(count) | Número de paquetes pubrel recibidos|
| **emqx.packets.pubrel.sent.count** <br>(count) | Número de paquetes pubrel enviados|
| **emqx.packets.pubrel.missed.count** <br>(count) | Número de paquetes pubrel perdidos|
| **emqx.packets.pubcomp.received.count** <br>(count) | Número de paquetes pubcomp recibidos|
| **emqx.packets.pubcomp.sent.count** <br>(count) | Número de paquetes pubcomp enviados|
| **emqx.packets.pubcomp.inuse.count** <br>(count) | Número de paquetes de error de infusión pubcomp|
| **emqx.packets.pubcomp.missed.count** <br>(count) | Número de paquetes pubcomp perdidos|
| **emqx.packets.subscribe.received.count** <br>(count) | Número de paquetes de suscripción recibidos|
| **emqx.packets.subscribe.error.count** <br>(count) | Número de paquetes de suscripción con error |
| **emqx.packets.subscribe.auth_error.count** <br>(count) | Número de paquetes de suscripción con error de autenticación |
| **emqx.packets.suback.sent.count** <br>(count) | Número de paquetes suback enviados|
| **emqx.packets.unsuback.sent.count** <br>(count) | Número de paquetes unsuback enviados|
| **emqx.packets.unsubscribe.received.count** <br>(count) | Número de paquetes de cancelación de suscripción recibidos|
| **emqx.packets.unsubscribe.error.count** <br>(count) | Número de paquetes de cancelación de suscripción con error|
| **emqx.packets.pingreq.received.count** <br>(count) | Número de paquetes pingreq recibidos|
| **emqx.packets.pingresp.sent.count** <br>(count) | Número de paquetes pingresp enviados|
| **emqx.packets.disconnect.received.count** <br>(count) | Número de paquetes de desconexión recibidos|
| **emqx.packets.disconnect.sent.count** <br>(count) | Número de paquetes de desconexión enviados|
| **emqx.packets.auth.received.count** <br>(count) | Número de paquetes de autenticación recibidos|
| **emqx.packets.auth.sent.count** <br>(count) | Número de paquetes de autenticación enviados|
| **emqx.messages.received.count** <br>(count) | Número de mensajes recibidos|
| **emqx.messages.sent.count** <br>(count) | Número de mensajes enviados|
| **emqx.messages.qos0.received.count** <br>(count) | Número de mensajes qos0 recibidos|
| **emqx.messages.qos0.sent.count** <br>(count) | Número de mensajes qos0 enviados|
| **emqx.messages.qos1.received.count** <br>(count) | Número de mensajes qos1 recibidos|
| **emqx.messages.qos1.sent.count** <br>(count) | Número de mensajes qos1 enviados|
| **emqx.messages.qos2.received.count** <br>(count) | Número de mensajes qos2 recibidos|
| **emqx.messages.qos2.sent.count** <br>(count) | Número de mensajes qos2 enviados|
| **emqx.messages.publish.count** <br>(count) | Número de mensajes publicados|
| **emqx.messages.dropped.count** <br>(count) | Número de mensajes descartados|
| **emqx.messages.dropped.expired.count** <br>(count) | Número de mensajes caducados eliminados|
| **emqx.messages.dropped.no_subscribers.count** <br>(count) | Número de mensajes no_subscribers descartados|
| **emqx.messages.forward.count** <br>(count) | Número de mensajes de reenvío|
| **emqx.messages.retained.count** <br>(count) | Número de mensajes retenidos enviados|
| **emqx.messages.delayed.count** <br>(count) | Número de mensajes enviados con retraso|
| **emqx.messages.delivered.count** <br>(count) | Número de mensajes entregados|
| **emqx.messages.acked.count** <br>(count) | Número de mensajes aceptados|
| **emqx.delivery.dropped.count** <br>(count) | Número total de mensajes descartados|
| **emqx.delivery.dropped.no_local.count** <br>(count) | Número de mensajes de entrega no_local descartados|
| **emqx.delivery.dropped.too_large.count** <br>(count) | Número de mensajes de entrega demasiado grandes descartados|
| **emqx.delivery.dropped.qos0.msg.count** <br>(count) | Número de mensajes de entrega qos0 descartados|
| **emqx.delivery.dropped.queue_full.count** <br>(count) | Número de mensajes de entrega queue_full descartados|
| **emqx.delivery.dropped.expired.count** <br>(count) | Número de mensajes de entrega caducados descartados|
| **emqx.client.connect.count** <br>(count) | Número del hook client_connect que se ha ejecutado|
| **emqx.client.connack.count** <br>(count) | Número del hook client_connack que se ha ejecutado|
| **emqx.client.connected.count** <br>(count) | Número del hook client_connected que se ha ejecutado|
| **emqx.client.authenticate.count** <br>(count) | Número del hook client_authenticated que se ha ejecutado|
| **emqx.client.auth_anonymous.count** <br>(count) | Número de clientes que se han conectado de forma anónima|
| **emqx.client.authorize.count** <br>(count) | Número del hook client_authorize que se ha ejecutado|
| **emqx.client.subscribe.count** <br>(count) | Número del hook client_subscribe que se ha ejecutado|
| **emqx.client.unsubscribe.count** <br>(count) | Número del hook client_unsubscribe que se ha ejecutado|
| **emqx.client.disconnected.count** <br>(count) | Número del hook client_disconnected que se ha ejecutado|
| **emqx.session.created.count** <br>(count) | Número del hook session_created que se ha ejecutado|
| **emqx.session.resumed.count** <br>(count) | Número del hook session_resumed que se ha ejecutado|
| **emqx.session.takenover.count** <br>(count) | Número del hook session_takenover que se ha ejecutado|
| **emqx.session.discarded.count** <br>(count) | Número del hook session_discarded que se ha ejecutado|
| **emqx.session.terminated.count** <br>(count) | Número del hook session_terminated que se ha ejecutado|
| **emqx.authorization.allow.count** <br>(count) | Número de autorizaciones exitosas (permitidas)|
| **emqx.authorization.deny.count** <br>(count) | Número de autorizaciones fallidas (denegadas)|
| **emqx.authorization.cache_hit.count** <br>(count) | Número de autorizaciones con caché|
| **emqx.authorization.superuser.count** <br>(count) | Número de autorizaciones con superusuario|
| **emqx.authorization.nomatch.count** <br>(count) | Número de autorizaciones fallidas sin coincidencia|
| **emqx.authorization.matched_allow.count** <br>(count) | Número de autorizaciones con coincidencia permitidas|
| **emqx.authorization.matched_deny.count** <br>(count) | Número de autorizaciones con coincidencia denegadas|
| **emqx.authentication.success.count** <br>(count) | Número de autorizaciones exitosas|
| **emqx.authentication.success_anonymous.count** <br>(count) | Número de autorizaciones correctas con anónimos|
| **emqx.authentication.failure.count** <br>(count) | Número de autenticaciones fallidas|
| **emqx.mria.last_intercepted_trans** <br>(gauge) | Número de la última transacción interceptada en el nodo central|
| **emqx.mria.weight** <br>(gauge) | Peso del tráfico de mria en el clúster|
| **emqx.mria.replicants** <br>(gauge) | Número de réplicas notificadas por mria en el clúster|
| **emqx.mria.server.mql** <br>(gauge) | Mensajes que aún no han sido procesados en el fragmento mria.|

### Checks de servicio

**emqx.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de EMQX OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

### Eventos

EMQX no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de EMQX](https://www.emqx.com/en/support).