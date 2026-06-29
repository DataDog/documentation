---
aliases:
- /es/integrations/azure_service_bus
app_id: azure-service-bus
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure Service Bus.
media: []
title: Azure Service Bus
---
## Información general

Microsoft Azure Service Bus es un agente de mensajes de integración empresarial totalmente gestionado.

Obtén métricas de Azure Service Bus para:

- Visualizar el rendimiento de tus Service Buses.
- Correlacionar el rendimiento de tus Service Buses con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.servicebus_namespaces.abandoned_messages** <br>(count) | Mensajes abandonados.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.active_connections** <br>(count) | Total de conexiones activas para Microsoft.ServiceBus.<br>_Mostrado como connection (conexión)_ |
| **azure.servicebus_namespaces.count_of_active_messages_in_a_queue_topic.** <br>(gauge) | Count de mensajes activos en una cola/tema.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.completed_messages** <br>(count) | Mensajes completados.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.connections_closed.** <br>(gauge) | Conexiones cerradas para Microsoft.ServiceBus.<br>_Mostrado como connection (conexión)_ |
| **azure.servicebus_namespaces.connections_opened.** <br>(gauge) | Conexiones abiertas para Microsoft.ServiceBus.<br>_Mostrado como connection (conexión)_ |
| **azure.servicebus_namespaces.cpu_per_namespace** <br>(gauge) | Métrica de uso de CPU del espacio para nombre premium del bus de servicio. Esta métrica está obsoleta. Utiliza en su lugar la métrica de CPU (NamespaceCpuUsage).<br>_Mostrado como porcentaje_. |
| **azure.servicebus_namespaces.count_of_dead_lettered_messages_in_a_queue_topic.** <br>(gauge) | Count de mensajes con letra muerta en una cola/tema.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.incoming_messages** <br>(count) | Mensajes entrantes para Microsoft.ServiceBus.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.incoming_requests** <br>(count) | Solicitudes entrantes para Microsoft.ServiceBus.<br>_Mostrado como solicitud_ |
| **azure.servicebus_namespaces.count_of_messages_in_a_queue_topic.** <br>(gauge) | Count de mensajes en una cola/tema.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.cpu** <br>(gauge) | Métrica de uso de la CPU para los espacios de nombres de SKU Premium.<br>_Mostrado como porcentaje_ |
| **azure.servicebus_namespaces.memory_usage** <br>(gauge) | Métrica del uso de memoria para los espacios de nombres SKU Premium.<br>_Mostrado como porcentaje_ |
| **azure.servicebus_namespaces.outgoing_messages** <br>(count) | Mensajes salientes para Microsoft.ServiceBus.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.pending_checkpoint_operations_count.** <br>(count) | Count de operaciones de punto de control pendientes.<br>_Mostrado como operación_ |
| **azure.servicebus_namespaces.count_of_scheduled_messages_in_a_queue_topic.** <br>(gauge) | Count de mensajes programados en una cola/tema.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.server_errors.** <br>(count) | Errores del servidor para Microsoft.ServiceBus.<br>_Mostrado como error_ |
| **azure.servicebus_namespaces.server_send_latency.** <br>(gauge) | Latencia de envío del servidor.<br>_Mostrado como milisegundos_ |
| **azure.servicebus_namespaces.size** <br>(gauge) | Tamaño de una cola/tema en bytes.<br>_Mostrado como byte_ |
| **azure.servicebus_namespaces.successful_requests** <br>(count) | Total de solicitudes aceptadas para un espacio de nombres.<br>_Mostrado como solicitud_ |
| **azure.servicebus_namespaces.throttled_requests.** <br>(count) | Solicitudes limitadas para Microsoft.ServiceBus.<br>_Mostrado como solicitud_ |
| **azure.servicebus_namespaces.user_errors.** <br>(count) | Errores de usuario para Microsoft.ServiceBus.<br>_Mostrado como error_ |
| **azure.servicebus_namespaces.mem_usage_per_namespace** <br>(gauge) | Métrica de uso de memoria del espacio para nombres premium del bus de servicio. Esta métrica está obsoleta. En su lugar, utiliza la métrica de uso de memoria (NamespaceMemoryUsage).<br>_Mostrado como porcentaje_ |
| **azure.servicebus_namespaces.count** <br>(gauge) | El count de todos los recursos de Azure Service Bus.|
| **azure.servicebus_namespaces.count_of_active_messages_in_a_topic_subscription** <br>(gauge) | Count de mensajes activos en una suscripción temática.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.count_of_dead_lettered_messages_in_a_topic_subscription** <br>(gauge) | Count de mensajes con letra muerta en una suscripción temática.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.count_of_messages_in_a_topic_subscription** <br>(gauge) | Count de mensajes en una suscripción temática.<br>_Mostrado como mensaje_ |
| **azure.servicebus_namespaces.max_size** <br>(gauge) | Tamaño máximo en bytes de una cola o tema.<br>_Mostrado como byte_ |
| **azure.servicebus_namespaces.free_space** <br>(gauge) | Bytes restantes disponibles de una cola o tema.<br>_Mostrado como byte_ |

### Eventos

La integración Azure Service Bus no incluye ningún evento.

### Checks de servicio

La integración Azure Service Bus no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).