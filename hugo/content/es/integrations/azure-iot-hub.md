---
aliases:
- /es/integrations/azure_iot_hub
app_id: azure-iot-hub
categories:
- azure
- nube
- iot
- aprovisionamiento
custom_kind: integración
description: Un servicio gestionado que garantiza una comunicación bidireccional fiable
  y segura entre millones de dispositivos IoT.
media: []
title: Azure IOT Hub
---
## Información general

Azure IOT Hub es un servicio totalmente gestionado que permite comunicaciones bidireccionales confiables y seguras entre millones de dispositivos IoT.

Obtén métricas de Azure IOT Hub para:

- Visualizar el rendimiento de tus IOT Hubs
- Correlacionar el rendimiento de tus IOT Hubs con tus aplicaciones

Azure Provisioning Service es un servicio auxiliar para IoT Hub que habilita el aprovisionamiento sin intervención humana y justo a tiempo en el centro de IoT correcto, lo que permite a los clientes aprovisionar millones de dispositivos de forma segura y escalable.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.devices_iothubs.c2d.commands.egress.abandon.success** <br>(count) | Número de mensajes de la nube al dispositivo abandonados por el dispositivo.|
| **azure.devices_iothubs.c2d.commands.egress.complete.success** <br>(count) | Número de entregas de mensajes de la nube al dispositivo completadas con éxito por el dispositivo.|
| **azure.devices_iothubs.c2d.commands.egress.reject.success** <br>(count) | Número de mensajes de la nube al dispositivo rechazados por el dispositivo.|
| **azure.devices_iothubs.c2d.methods.failure** <br>(count) | Recuento de todas las llamadas a métodos directos fallidas.|
| **azure.devices_iothubs.c2d.methods.request_size** <br>(gauge) | Media, mínimo y máximo de todas las solicitudes de método directo realizadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.c2d.methods.response_size** <br>(gauge) | Media, mínimo y máximo de todas las respuestas directas correctas.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.c2d.methods.success** <br>(count) | Recuento de todas las llamadas a métodos directos realizadas con éxito.|
| **azure.devices_iothubs.c2d.twin.read.failure** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el backend que han fallado.|
| **azure.devices_iothubs.c2d.twin.read.size** <br>(gauge) | Media, mínimo y máximo de todas las lecturas gemelas iniciadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.c2d.twin.read.success** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el backend que han tenido éxito.|
| **azure.devices_iothubs.c2d.twin.update.failure** <br>(count) | Recuento de todas las actualizaciones de gemelos iniciadas por el backend que han fallado.|
| **azure.devices_iothubs.c2d.twin.update.size** <br>(gauge) | Tamaño medio, mínimo y máximo de todas las actualizaciones de gemelos iniciadas con éxito por el backend.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.c2d.twin.update.success** <br>(count) | Recuento de todas las actualizaciones de gemelos iniciadas por el backend.|
| **azure.devices_iothubs.c2_d_messages_expired** <br>(count) | Número de mensajes de la nube a dispositivo caducados.|
| **azure.devices_iothubs.configuration_metrics** <br>(count) | Métricas para operaciones de configuración.|
| **azure.devices_iothubs.connected_devices** <br>(gauge) | Número de dispositivos conectados a tu IoT Hub.|
| **azure.devices_iothubs.d2c.endpoints.egress.built_in.events** <br>(count) | Número de veces que el enrutamiento de IoT Hub ha entregado correctamente mensajes al endpoint integrado (mensajes/eventos).|
| **azure.devices_iothubs.d2c.endpoints.egress.event_hubs** <br>(count) | Número de veces que el enrutamiento de IoT Hub ha entregado correctamente mensajes a los endpoints de Event Hub.|
| **azure.devices_iothubs.d2c.endpoints.egress.service_bus_queues** <br>(count) | Número de veces que el enrutamiento IoT Hub ha entregado correctamente mensajes a los endpoints de la cola del Service Bus.|
| **azure.devices_iothubs.d2c.endpoints.egress.service_bus_topics** <br>(count) | Número de veces que el enrutamiento de IoT Hub ha entregado correctamente mensajes a endpoints de temas del Service Bus.|
| **azure.devices_iothubs.routing_messages_delivered_to_storage** <br>(count) | Número de veces que el enrutamiento de IoT Hub ha entregado correctamente mensajes a los endpoints de almacenamiento.|
| **azure.devices_iothubs.routing_blobs_delivered_to_storage** <br>(count) | Número de veces que el enrutamiento de IoT Hub entregó blobs a endpoints de almacenamiento.|
| **azure.devices_iothubs.routing_data_delivered_to_storage** <br>(count) | Cantidad de datos (bytes) que el enrutamiento IoT Hub entregó a los endpoints de almacenamiento.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.d2c.endpoints.latency.built_in.events** <br>(gauge) | Latencia media (milisegundos) entre la entrada de mensajes en IoT Hub y la entrada de mensajes de telemetría en el endpoint integrado (mensajes/eventos).<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.d2c.endpoints.latency.event_hubs** <br>(gauge) | Latencia media (milisegundos) entre la entrada de mensajes en IoT Hub y la entrada de mensajes en un endpoint de Event Hub.<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.d2c.endpoints.latency.service_bus_queues** <br>(gauge) | Latencia media (milisegundos) entre la entrada del mensaje en IoT Hub y la entrada del mensaje de telemetría en un endpoint de la cola del Service Bus.<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.d2c.endpoints.latency.service_bus_topics** <br>(gauge) | Latencia media (milisegundos) entre la entrada del mensaje en IoT Hub y la entrada del mensaje de telemetría en un endpoint de tema del Service Bus.<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.routing_message_latency_for_storage** <br>(gauge) | Latencia media (milisegundos) entre la entrada del mensaje en IoT Hub y la entrada del mensaje de telemetría en un endpoint de almacenamiento.<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.d2c.telemetry.egress.dropped** <br>(count) | Número de veces que los mensajes fueron descartados por el enrutamiento IoT Hub debido a endpoints muertos. Este valor no cuenta los mensajes entregados a la ruta de reserva, ya que los mensajes perdidos no se entregan allí.|
| **azure.devices_iothubs.d2c.telemetry.egress.fallback** <br>(count) | Número de veces que el enrutamiento IoT Hub entregó mensajes al endpoint asociado con la ruta alternativa.|
| **azure.devices_iothubs.d2c.telemetry.egress.invalid** <br>(count) | Número de veces que el enrutamiento de IoT Hub ha fallado en la entrega de mensajes debido a una incompatibilidad con el endpoint. Este valor no incluye los reintentos.|
| **azure.devices_iothubs.d2c.telemetry.egress.orphaned** <br>(count) | Número de veces que los mensajes quedaron huérfanos por el enrutamiento de IoT Hub porque no coincidían con ninguna regla de enrutamiento (incluida la regla fallback).|
| **azure.devices_iothubs.d2c.telemetry.egress.success** <br>(count) | Número de veces que los mensajes se han entregado correctamente a todos los endpoints utilizando el enrutamiento de IoT Hub. Si un mensaje se enruta a varios endpoints, este valor aumenta en uno por cada entrega correcta. Si un mensaje se entrega varias veces al mismo endpoint, este valor aumenta en uno por cada entrega correcta.|
| **azure.devices_iothubs.d2c.telemetry.ingress.all_protocol** <br>(count) | Número de mensajes de telemetría del dispositivo a la nube que se han intentado enviar a tu IoT Hub.|
| **azure.devices_iothubs.number_of_throttling_errors** <br>(count) | Número de errores de limitación debidos a limitaciones de rendimiento de dispositivos.|
| **azure.devices_iothubs.d2c.telemetry.ingress.success** <br>(count) | Número de mensajes de telemetría del dispositivo a la nube enviados correctamente a tu Hub IoT.|
| **azure.devices_iothubs.d2c.twin.read.failure** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el dispositivo que han fallado.|
| **azure.devices_iothubs.d2c.twin.read.size** <br>(gauge) | Promedio, mínimo y máximo de todas las lecturas gemelas iniciadas con éxito por el dispositivo.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.d2c.twin.read.success** <br>(count) | Recuento de todas las lecturas gemelas iniciadas con éxito por el dispositivo.|
| **azure.devices_iothubs.d2c.twin.update.failure** <br>(count) | Recuento de todas las actualizaciones gemelas iniciadas por el dispositivo que han fallado.|
| **azure.devices_iothubs.d2c.twin.update.size** <br>(gauge) | Tamaño medio, mínimo y máximo de todas las actualizaciones gemelas iniciadas con éxito por el dispositivo.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.d2c.twin.update.success** <br>(count) | Recuento de todas las actualizaciones de gemelos iniciadas con éxito por el dispositivo.|
| **azure.devices_iothubs.total_number_of_messages_used** <br>(gauge) | Número total de mensajes utilizados hoy.|
| **azure.devices_iothubs.total_device_data_usage** <br>(count) | Bytes transferidos hacia y desde cualquier dispositivo conectado a IotHub.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.total_device_data_usage_preview** <br>(count) | Bytes transferidos hacia y desde cualquier dispositivo conectado a IotHub.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.devices.connected_devices.all_protocol** <br>(count) | Número de dispositivos conectados a tu IoT Hub.|
| **azure.devices_iothubs.devices.total_devices** <br>(count) | Número de dispositivos registrados en tu IoT Hub.|
| **azure.devices_iothubs.event_grid_deliveries** <br>(count) | Número de eventos de IoT Hub publicados en Event Grid. Utiliza la dimensión Result (Resultado) para conocer el número de solicitudes exitosas y fallidas. La dimensión EventType muestra el tipo de evento (https://aka.ms/ioteventgrid).|
| **azure.devices_iothubs.event_grid_latency** <br>(gauge) | Latencia media (milisegundos) desde que se generó el evento de Iot Hub hasta que se publicó en Event Grid. Este número es un promedio entre todos los tipos de eventos. Utiliza la dimensión EventType para ver la latencia de un tipo específico de evento.<br>_Se muestra como milisegundo_ |
| **azure.devices_iothubs.jobs.cancel_job.failure** <br>(count) | Recuento de todas las llamadas fallidas para cancelar un trabajo.|
| **azure.devices_iothubs.jobs.cancel_job.success** <br>(count) | Recuento de todas las llamadas realizadas con éxito para cancelar un trabajo.|
| **azure.devices_iothubs.jobs.completed** <br>(count) | Recuento de todos los trabajos completados.|
| **azure.devices_iothubs.jobs.create_direct_method_job.failure** <br>(count) | Recuento de todos los trabajos fallidos de creación de invocación directa de métodos.|
| **azure.devices_iothubs.jobs.create_direct_method_job.success** <br>(count) | Recuento de todos los trabajos de creación exitosa de invocación directa de métodos.|
| **azure.devices_iothubs.jobs.create_twin_update_job.failure** <br>(count) | Recuento de todos los trabajos de creación de actualizaciones gemelas fallidos.|
| **azure.devices_iothubs.jobs.create_twin_update_job.success** <br>(count) | Recuento de todos los trabajos de creación de actualizaciones gemelas realizados con éxito.|
| **azure.devices_iothubs.jobs.failed** <br>(count) | Recuento de todos los trabajos fallidos.|
| **azure.devices_iothubs.jobs.list_jobs.failure** <br>(count) | Recuento de todas las llamadas fallidas para enumerar trabajos.|
| **azure.devices_iothubs.jobs.list_jobs.success** <br>(count) | Recuento de todas las llamadas exitosas para enumerar trabajos.|
| **azure.devices_iothubs.jobs.query_jobs.failure** <br>(count) | Recuento de todas las llamadas fallidas a trabajos de consulta.|
| **azure.devices_iothubs.jobs.query_jobs.success** <br>(count) | Recuento de todas las llamadas realizadas con éxito a trabajos de consulta.|
| **azure.devices_iothubs.routing_delivery_message_size_in_bytes_preview** <br>(count) | Tamaño total en bytes de los mensajes entregados por IoT Hub a un endpoint. Puedes utilizar las dimensiones EndpointName y EndpointType para ver el tamaño de los mensajes en bytes entregados a tus diferentes endpoints. El valor de la métrica aumenta por cada mensaje entregado; incluso si el mensaje se entrega a varios endpoints o si el mensaje se entrega al mismo endpoint varias veces.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.routing_deliveries_preview** <br>(count) | Número de veces que IoT Hub intentó entregar mensajes a todos los endpoints mediante enrutamiento.|
| **azure.devices_iothubs.routing_delivery_latency_preview** <br>(gauge) | Latencia media (milisegundos) entre la entrada del mensaje en IoT Hub y la entrada del mensaje de telemetría en un endpoint. Puedes utilizar las dimensiones EndpointName y EndpointType para comprender la latencia de tus diferentes endpoints.<br>_Se muestra en milisegundos_ |
| **azure.devices_iothubs.total_devices** <br>(gauge) | Número de dispositivos registrados en tu IoT Hub.|
| **azure.devices_iothubs.twin_queries.failure** <br>(count) | Recuento de todas las consultas gemelas fallidas.|
| **azure.devices_iothubs.twin_queries.result_size** <br>(gauge) | Promedio, mínimo y máximo del tamaño del resultado de todas las consultas gemelas realizadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_iothubs.twin_queries.success** <br>(count) | Recuento de todas las consultas gemelas realizadas con éxito.|
| **azure.devices_iothubs.count** <br>(gauge) | Recuento de dispositivos Iot Hubs.|
| **azure.devices_provisioningservices.attestation_attempts** <br>(count) | Número de atestaciones de dispositivos intentadas.|
| **azure.devices_provisioningservices.device_assignments** <br>(count) | Número de dispositivos asignados a un IoT Hub.|
| **azure.devices_provisioningservices.registration_attempts** <br>(count) | Número de registros de dispositivos intentados.|
| **azure.devices_provisioningservices.count** <br>(gauge) | Recuento de dispositivos que prestan servicios.|

### Eventos

La integración Azure IoT Hub no incluye eventos.

### Checks de servicio

La integración Azure IoT Hub no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).