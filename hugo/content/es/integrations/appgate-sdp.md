---
aliases:
- /es/integrations/appgate_sdp
app_id: appgate-sdp
categories:
- métricas
- recopilación de logs
custom_kind: integración
description: Monitorizar el estado y el rendimiento de Appgate SDP.
integration_version: 2.0.0
media: []
supported_os:
- linux
- macos
title: Appgate SDP
---
## Información general

Este check monitoriza [Appgate SDP](https://sdphelp.appgate.com/adminguide/v6.3/introduction.html) a través del Datadog Agent.

- Monitoriza el estado y el rendimiento de dispositivos, controladores y puertas de enlace Appgate SDP mediante la recopilación de métricas clave.
- Proporciona visibilidad de uso de recursos, conexiones activas, recuentos de sesiones y uso de licencias para ayudar a garantizar una gestión del acceso segura y eficaz.
- Permite la alerta proactiva y la resolución de problemas mediante el seguimiento de indicadores críticos como el uso de CPU, memoria, y disco, y los eventos del sistema en entornos distribuidos.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Appgate SDP se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `appgate_sdp.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Appgate SDP. Consulta el [ejemplo de appgate_sdp.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/appgate_sdp/datadog_checks/appgate_sdp/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `appgate_sdp` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **appgate_sdp.appliance.active_connections** <br>(gauge) | Número actual de conexiones activas.<br>_Se muestra como conexión_ |
| **appgate_sdp.appliance.active_connections.max** <br>(gauge) | Número máximo de conexiones activas.<br>_Se muestra como conexión_ |
| **appgate_sdp.appliance.audit_events.count** <br>(count) | Recuento del número de eventos de auditoría.<br>_Se muestra como evento_ |
| **appgate_sdp.appliance.audit_logs.count** <br>(count) | Recuento del número de transmisiones de logs de auditoría.|
| **appgate_sdp.appliance.certificate_days.remaining** <br>(gauge) | Número de días restantes hasta la expiración del certificado.|
| **appgate_sdp.appliance.cpu.percent_usage** <br>(gauge) | Uso de CPU por parte de un dispositivo.<br>_Se muestra como porcentaje_ |
| **appgate_sdp.appliance.disk** <br>(gauge) | Uso de disco por parte de un dispositivo.|
| **appgate_sdp.appliance.disk.partition_statistic** <br>(gauge) | Uso de la partición del disco por parte de un dispositivo.|
| **appgate_sdp.appliance.dns.cache_entries** <br>(gauge) | Número de elementos en la caché DNS, diferenciados por tipo de caché.|
| **appgate_sdp.appliance.dns.requests.count** <br>(count) | Recuento de solicitudes DNS realizadas por zona, protocolo y familia.<br>_Se muestra como solicitud_ |
| **appgate_sdp.appliance.dns.responses.count** <br>(count) | Recuento de respuestas DNS realizadas por zona, protocolo y familia.<br>_Se muestra como respuesta_ |
| **appgate_sdp.appliance.function.sessions** <br>(gauge) | Número de sesiones para esta función del dispositivo.|
| **appgate_sdp.appliance.function.status** <br>(gauge) | Estado de una función del dispositivo.|
| **appgate_sdp.appliance.function.suspended** <br>(gauge) | Estado de suspensión de una función del dispositivo, diferenciado por motivo.|
| **appgate_sdp.appliance.image.size** <br>(gauge) | Tamaño de la partición de la imagen del dispositivo en bytes.<br>_Se muestra como bytes_ |
| **appgate_sdp.appliance.memory** <br>(gauge) | Uso de memoria del dispositivo en bytes.<br>_Se muestra como bytes_ |
| **appgate_sdp.appliance.network_interface.speed** <br>(gauge) | Velocidad de la interfaz de red en bits por segundo.|
| **appgate_sdp.appliance.network_interface.statistic.count** <br>(count) | Estadísticas de la interfaz de red del dispositivo.|
| **appgate_sdp.appliance.proxy.protocol_messages.count** <br>(count) | Número de mensajes del protocolo proxy procesados.<br>_Se muestra como mensaje_ |
| **appgate_sdp.appliance.snat** <br>(gauge) | Número de puertos UDP/TCP o tipos ICMP utilizados para Source Network Address Translation (SNAT).|
| **appgate_sdp.appliance.spa.dropped_packets.count** <br>(count) | Número de paquetes SPA perdidos.<br>_Se muestra como paquete_ |
| **appgate_sdp.appliance.spa.packet_authorization_time** <br>(gauge) | Tiempo de autorización del paquete SPA.|
| **appgate_sdp.appliance.spa.packets.count** <br>(count) | Número de paquetes SPA (Single Packet Authorization) procesados por el dispositivo.<br>_Se muestra como paquete_ |
| **appgate_sdp.appliance.spa.replay_attack_cache_entries.count** <br>(count) | Número de entradas en la caché de ataques de repetición SPA (Single Packet Authorization).|
| **appgate_sdp.appliance.state_size** <br>(gauge) | Tamaño de esta partición de estado del dispositivo en bytes.<br>_Se muestra como bytes_ |
| **appgate_sdp.appliance.status** <br>(gauge) | Estado de un dispositivo en tu red.|
| **appgate_sdp.appliance.volume_number** <br>(gauge) | Número de volumen de un dispositivo.|
| **appgate_sdp.controller.admin.authentication.count** <br>(count) | Recuento de llamadas a la API para la autenticación de administradores.|
| **appgate_sdp.controller.admin.authorization.count** <br>(count) | Recuento de llamadas a la API para la autorización de administradores.|
| **appgate_sdp.controller.admin.evaluate_all_policies.count** <br>(count) | Recuento de llamadas a la API para la evaluación por parte de administradores de todas las políticas.|
| **appgate_sdp.controller.admin.mfa.count** <br>(count) | Recuento de llamadas a la API para la autenticación multifactor (MFA) de administradores.|
| **appgate_sdp.controller.client.authentication.count** <br>(count) | Recuento de llamadas a la API para la autenticación de clientes.|
| **appgate_sdp.controller.client.authorization.count** <br>(count) | Recuento de llamadas a la API para la autorización de clientes.|
| **appgate_sdp.controller.client.csr.count** <br>(count) | La llamada a la API cuenta para las operaciones CSR (Certificate Signing Request) de clientes.|
| **appgate_sdp.controller.client.enter.password.count** <br>(count) | Recuento de llamadas a la API para introducir contraseñas de clientes.|
| **appgate_sdp.controller.client.evaluate_all_policies.count** <br>(count) | Recuento de llamadas a la API para la evaluación por parte de clientes de todas las políticas.|
| **appgate_sdp.controller.client.mfa.count** <br>(count) | Recuento de llamadas a la API para la autenticación multifactor (MFA) de clientes.|
| **appgate_sdp.controller.client.new_ip_allocation.count** <br>(count) | Recuento de llamadas a la API para la asignación de nuevas IP a clientes.|
| **appgate_sdp.controller.client.risk_engine_response.count** <br>(count) | Recuento de llamadas a la API para respuestas de motor de riesgos a clientes.<br>_Se muestra como respuestas_ |
| **appgate_sdp.controller.client.sign_in_with_mfa.count** <br>(count) | Recuento de llamadas a la API para el inicio de sesiones con autenticación multifactor (MFA) de clientes.|
| **appgate_sdp.controller.database.conflicts** <br>(gauge) | Número de conflictos de BDR (replicación bidireccional) de la base de datos para el controlador.|
| **appgate_sdp.controller.database.node_state** <br>(gauge) | Estado de un nodo dentro del sistema de BDR.|
| **appgate_sdp.controller.database.raft_state** <br>(gauge) | Estado raft de un nodo en el sistema de BDR del controlador.|
| **appgate_sdp.controller.database.replication** <br>(gauge) | Estado de conexión de los nodos en el sistema de BDR del controlador.|
| **appgate_sdp.controller.database.replication.slot_replay_lag** <br>(gauge) | Retraso de replicación para un slot de replicación específico en el sistema de BDR del controlador en bytes.<br>_Se muestra como bytes_ |
| **appgate_sdp.controller.database.size** <br>(gauge) | Tamaño de la base de datos PostgreSQL utilizada por el controlador en bytes.<br>_Se muestra como bytes_ |
| **appgate_sdp.controller.evaluate_user_claim_script.count** <br>(count) | Ejecución y rendimiento de los scripts de reclamación de usuarios en el sistema del controlador.|
| **appgate_sdp.controller.ip_pool** <br>(gauge) | Uso de direcciones IP de un grupo de IP específico.|
| **appgate_sdp.controller.license** <br>(gauge) | Derechos de licencia para los distintos tipos de usuarios o funciones de tu sistema.|
| **appgate_sdp.controller.license.days_remaining** <br>(gauge) | Número de días restantes hasta la próxima expiración de licencia del dispositivo.<br>_Se muestra como días_ |
| **appgate_sdp.controller.memory_heap** <br>(gauge) | Uso heap de memoria del daemon controlador.<br>_Se muestra como bytes_ |
| **appgate_sdp.controller.policy_evaluator** <br>(gauge) | Tamaño de caché utilizado por el evaluador de políticas del controlador.<br>_Se muestra como bytes_ |
| **appgate_sdp.controller.threads** <br>(gauge) | Número de subprocesos que se están ejecutando actualmente para el daemon controlador en el dispositivo.<br>_Se muestra como subproceso_ |
| **appgate_sdp.gateway.azure_resolver.cache.count** <br>(count) | Recuento de varias operaciones en la caché del resolver Azure, incluidos los aciertos, los fallos, las inserciones y los desalojos de la caché.|
| **appgate_sdp.gateway.azure_resolver.cache_ttl** <br>(gauge) | Tiempo de vida (TTL) de la caché del resolver Azure.|
| **appgate_sdp.gateway.dns_forwarder.cache.count** <br>(count) | Rendimiento de la caché del forwarder DNS, concretamente los aciertos y fallos en la caché del forwarder DNS.|
| **appgate_sdp.gateway.dns_forwarder.domain.count** <br>(count) | Número de aciertos en el dominio del forwarder DNS.|
| **appgate_sdp.gateway.dns_forwarder.query.count** <br>(count) | Número de consultas el dominio del forwarder DNS.|
| **appgate_sdp.gateway.event_queue.period_peak** <br>(gauge) | Tamaño máximo actual de la cola de eventos de la puerta de enlace.|
| **appgate_sdp.gateway.event_queue.size** <br>(gauge) | Tamaño de la cola de eventos de la puerta de enlace para la medida dada.|
| **appgate_sdp.gateway.ha_interface.count** <br>(count) | Actividad de las interfaces de red que forman parte de una configuración de alta disponibilidad.|
| **appgate_sdp.gateway.http.action.count** <br>(count) | Recuento de acciones HTTP procesadas por una puerta de enlace, distinguiendo específicamente entre acciones HTTP permitidas y bloqueadas.|
| **appgate_sdp.gateway.http.connection.count** <br>(count) | Número de conexiones HTTP procesadas por la puerta de enlace, distinguiendo específicamente entre conexiones aceptadas y gestionadas.|
| **appgate_sdp.gateway.http.open_connection** <br>(gauge) | Número de conexiones HTTP abiertas en la puerta de enlace, clasificadas por su estado actual (activas o lectura).|
| **appgate_sdp.gateway.http.requests.count** <br>(count) | Número total de solicitudes HTTP procesadas por la puerta de enlace.<br>_Se muestra como solicitud_ |
| **appgate_sdp.gateway.illumio.resolver.cache.count** <br>(count) | Recuento de métricas de la caché del resolver Illumio.|
| **appgate_sdp.gateway.illumio.resolver.cache_ttl** <br>(gauge) | Tiempo de vida (TTL) de la caché del resolver Illumio.|
| **appgate_sdp.gateway.illumio.resolver.label** <br>(gauge) | Número de etiquetas rastreadas por el resolver Illumio.|
| **appgate_sdp.gateway.name.resolver.cache.count** <br>(count) | Uso de la caché del resolver.|
| **appgate_sdp.gateway.name.resolver.names_missing_resolver** <br>(gauge) | Número de nombres de recursos configurados en sitios en los que no se ha configurado el resolver necesario.|
| **appgate_sdp.gateway.name.resolver.value** <br>(gauge) | Número de recursos detectados.|
| **appgate_sdp.gateway.policy.evaluator** <br>(gauge) | Tamaño de la caché del evaluador de políticas de la puerta de enlace.<br>_Se muestra como bytes_ |
| **appgate_sdp.gateway.session.dropped_signin.count** <br>(count) | Número de sesiones de puerta de enlace que se han descartado al iniciar sesión.<br>_Se muestra como sesión_ |
| **appgate_sdp.gateway.session.event.count** <br>(count) | Número de eventos de sesión que se han producido en la puerta de enlace.<br>_Se muestra como evento_ |
| **appgate_sdp.gateway.session.event_timing** <br>(gauge) | Temporización de eventos relacionados con sesiones en la puerta de enlace.|
| **appgate_sdp.gateway.session.js_exectime** <br>(gauge) | Tiempo de ejecución javascript de sesiones en puertas de enlace en milisegundos.<br>_Se muestra como milisegundos_ |
| **appgate_sdp.gateway.sessiond.heap** <br>(gauge) | Valor heap sessiond de la puerta.<br>_Se muestra como bytes_ |
| **appgate_sdp.gateway.sessiond.thread_count** <br>(gauge) | Valor del recuento de subprocesos sessiond en puertas de enlace.<br>_Se muestra como subprocesos_ |
| **appgate_sdp.gateway.token_size** <br>(gauge) | Valor para una medida de tamaño de token.<br>_Se muestra como bytes_ |
| **appgate_sdp.gateway.vpn.client_metric** <br>(gauge) | Medidas, como el tiempo de actividad de todos los sitios y los fallos de búsqueda DNS, en el cliente.|
| **appgate_sdp.gateway.vpn.memory_usage** <br>(gauge) | Uso total de memoria por el motor del cortafuegos en bytes.|
| **appgate_sdp.gateway.vpn.resolved_actions** <br>(gauge) | Número de acciones de resolver resueltas.|
| **appgate_sdp.gateway.vpn.rules** <br>(gauge) | Número de reglas de cortafuegos.|
| **appgate_sdp.gateway.vpn.rules_size** <br>(gauge) | Tamaño de las reglas de cortafuegos en bytes para sesiones VPN en una puerta de enlace.<br>_Se muestra como bytes_ |
| **appgate_sdp.gateway.vpn.sessions** <br>(gauge) | Número de sesiones VPN en un dispositivo de puerta de enlace particular.<br>_Se muestra como sesión_ |
| **appgate_sdp.portal.client** <br>(gauge) | Estadísticas de clientes de portal en el dispositivo.|

### Eventos

La integración de Appgate SDP no incluye eventos.

### Checks de servicio

**appgate_sdp.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectrase con el endpoint OpenMetrics Appgate SDP, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).