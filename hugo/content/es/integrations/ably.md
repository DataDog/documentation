---
app_id: ably
categories:
- nube
- métricas
custom_kind: integración
description: Recopilar y graficar métricas de Ably
integration_version: 1.0.0
media:
- caption: 'Ably: dashboard'
  image_url: images/ably-dashboard.png
  media_type: imagen
supported_os:
- Linux
- Windows
- macOS
title: Ably
---
## Información general

La plataforma [Ably](https://ably.com) se utiliza para potenciar casos de uso en tiempo real como multijugadores, chat, sincronización de datos, transmisión de datos y notificaciones en aplicaciones web y móviles altamente escalables de todo el mundo. Al utilizar nuestras API, los ingenieros pueden centrarse en la creación de funciones básicas, en lugar de tener que aprovisionar y mantener servidores e infraestructuras en la nube.

La integración de Datadog y Ably envía métricas de [estadísticas de Ably](https://ably.com/docs/general/statistics) directamente a tu cuenta de Datadog.

Al utilizar la integración Datadog de Ably, puedes:

- Uso de [estadísticas de Ably](https://ably.com/docs/general/statistics) junto con otras métricas clave en Datadog
- Correlacionar el uso de mensajes, canales y conexiones de Ably para el análisis colaborativo en dashboards de Datadog
- Visualizar y realizar un seguimiento de las estadísticas de uso de Ably en Datadog

## Configuración

- **En Datadog**: Ve a **integraciones**, selecciona el cuadro de Ably y haz clic en **Install Integration** (Instalar integración).

- Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar la autorización de esta integración. Se te redirigirá a [Ably](https://ably.com).

- **En Ably**: Inicia sesión y ve a **Tus aplicaciones**.

![Captura de pantalla de Ably](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png)

- Seleccione la **aplicación Ably** para la que quieres configurar la **integración Datadog** y haz clic en **Integrations** (Integraciones).

![Captura de pantalla de Ably](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png)

- Haz clic en el botón **Connect to Datadog** (Conectarse a Datadog) para iniciar la autorización de esta integración.

- Se te redirigirá a la página de autorización de Datadog.

- Haz clic en el botón **Authorise** (Autorizar) para finalizar la configuración y volver al sitio web de Ably.

![Captura de pantalla de Ably](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png)

Tus estadísticas de aplicaciones Ably aparecen ahora en Datadog.

## Datos recopilados

Para ver más detalles sobre las estadísticas de Ably, consulta la [documentación sobre estadísticas de aplicaciones](https://ably.com/docs/general/statistics).

### Métricas

| | |
| --- | --- |
| **ably.apiRequests.all.failed** <br>(count) | Número total de solicitudes fallidas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.all.refused** <br>(count) | Número total de solicitudes rechazadas (debido a los límites de la cuenta).<br>_Se muestra como solicitud_ |
| **ably.apiRequests.all.succeeded** <br>(count) | Número total de solicitudes realizadas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.other.failed** <br>(count) | Número total de solicitudes fallidas, excluidas las solicitudes de token y de extracción.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.other.refused** <br>(count) | Número total de solicitudes rechazadas, excluidas las solicitudes de token y de extracción.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.other.succeeded** <br>(count) | Número total de solicitudes realizadas, excluidas las solicitudes de token y de extracción.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.push.failed** <br>(count) | Número total de solicitudes de extracción fallidas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.push.refused** <br>(count) | Número total de solicitudes de extracción rechazadas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.push.succeeded** <br>(count) | Número total de solicitudes de extracción realizadas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.tokenRequests.failed** <br>(count) | Número total de solicitudes de token fallidas.<br>_Se muestra como solicitud_ |
| **ably.apiRequests.tokenRequests.refused** <br>(count) | Número total de solicitudes de token rechazadas (debido a permisos o limitación de frecuencia).<br>_Se muestra como solicitud_ |
| **ably.apiRequests.tokenRequests.succeeded** <br>(count) | Número total de solicitudes de token realizadas.<br>_Se muestra como solicitud_ |
| **ably.channels.mean** <br>(gauge) | Recuento medio de canales activos.<br>_Se muestra como elemento_ |
| **ably.channels.min** <br>(gauge) | Número mínimo de canales activos.<br>_Se muestra como elemento_ |
| **ably.channels.opened** <br>(count) | Número total de canales abiertos.<br>_Se muestra como elemento_ |
| **ably.channels.peak** <br>(gauge) | Número máximo de canales activos.<br>_Se muestra como elemento_ |
| **ably.channels.refused** <br>(count) | Número total de solicitudes de conexión de canales fallidas debido a los permisos.<br>_Se muestra como solicitud_ |
| **ably.connections.all.mean** <br>(gauge) | Recuento medio de conexiones.<br>_Se muestra como conexión_ |
| **ably.connections.all.min** <br>(gauge) | Recuento mínimo de conexiones.<br>_Se muestra como conexión_ |
| **ably.connections.all.opened** <br>(count) | Número total de conexiones abiertas.<br>_Se muestra como conexión_ |
| **ably.connections.all.peak** <br>(gauge) | Recuento de conexiones pico.<br>_Se muestra como conexión_ |
| **ably.connections.all.refused** <br>(count) | Número total de conexiones rechazadas.<br>_Se muestra como conexión_ |
| **ably.messages.all.all.count** <br>(count) | Recuento total de mensajes.<br>_Se muestra como mensaje_ |
| **ably.messages.all.all.data** <br>(count) | Tamaño total de mensajes.<br>_Se muestra como bytes_ |
| **ably.messages.all.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas).<br>_Se muestra como bytes_ |
| **ably.messages.all.messages.count** <br>(count) | Recuento total de mensajes, excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.all.messages.data** <br>(count) | Tamaño total de mensajes, excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.all.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.all.presence.count** <br>(count) | Recuento total de mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.all.presence.data** <br>(count) | Tamaño total de mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.all.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.all.count** <br>(count) | Recuento total de mensajes entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.all.all.data** <br>(count) | Tamaño total de mensajes entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.messages.count** <br>(count) | Recuento total de mensajes entrantes (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.all.messages.data** <br>(count) | Tamaño total de mensajes entrantes (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.presence.count** <br>(count) | Recuento total de mensajes de presencia entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.all.presence.data** <br>(count) | Tamaño total de mensajes de presencia entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.all.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.realtime.all.count** <br>(count) | Recuento total de mensajes entrantes en tiempo real (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.realtime.all.data** <br>(count) | Tamaño total de los mensajes entrantes en tiempo real (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.realtime.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes entrantes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.realtime.messages.count** <br>(count) | Recuento total de mensajes entrantes en tiempo real (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.realtime.messages.data** <br>(count) | Tamaño total de los mensajes entrantes en tiempo real (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra en bytes_ |
| **ably.messages.inbound.realtime.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes entrantes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.inbound.realtime.presence.count** <br>(count) | Recuento total de mensajes de presencia entrantes en tiempo real (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.realtime.presence.data** <br>(count) | Tamaño total de los mensajes de presencia entrantes en tiempo real (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.realtime.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia entrantes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.rest.all.count** <br>(count) | Recuento total de mensajes REST entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.rest.all.data** <br>(count) | Tamaño total de los mensajes REST entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.rest.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes REST entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.rest.messages.count** <br>(count) | Recuento total de mensajes REST entrantes (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.rest.messages.data** <br>(count) | Tamaño total de los mensajes REST entrantes (recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytea_ |
| **ably.messages.inbound.rest.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes REST entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.inbound.rest.presence.count** <br>(count) | Recuento total de mensajes de presencia REST entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.inbound.rest.presence.data** <br>(count) | Tamaño total de los mensajes de presencia REST entrantes (recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.inbound.rest.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia REST entrantes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, recibidos por el servicio Ably de los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.all.count** <br>(count) | Recuento total de mensajes salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.all.all.data** <br>(count) | Tamaño total de los mensajes salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.messages.count** <br>(count) | Recuento total de mensajes salientes (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.all.messages.data** <br>(count) | Tamaño total de los mensajes salientes (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.presence.count** <br>(count) | Recuento total de mensajes de presencia salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.all.presence.data** <br>(count) | Tamaño total de los mensajes de presencia salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.all.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.all.count** <br>(count) | Recuento total de mensajes de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.externalQueue.all.data** <br>(count) | Tamaño total de los mensajes de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Reactor Firehose (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.messages.count** <br>(count) | Recuento total de mensajes de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.externalQueue.messages.data** <br>(count) | Tamaño total de los mensajes de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Reactor Firehose (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.presence.count** <br>(count) | Recuento total de mensajes de presencia de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.externalQueue.presence.data** <br>(count) | Tamaño total de los mensajes de presencia de Reactor Firehose (enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.externalQueue.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia de Reactor Firehose (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a algún objetivo externo utilizando Reactor Firehose).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.httpEvent.all.count** <br>(count) | Total de mensajes enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.httpEvent.all.data** <br>(count) | Tamaño total de los mensajes enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.httpEvent.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes enviados por un activador HTTP (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.httpEvent.messages.count** <br>(count) | Total de mensajes enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.httpEvent.messages.data** <br>(count) | Tamaño total de los mensajes enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.httpEvent.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes enviados por un activador HTTP (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.httpEvent.presence.count** <br>(count) | Total de mensajes de presencia enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.httpEvent.presence.data** <br>(count) | Tamaño total de los mensajes de presencia enviados por un activador HTTP (normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.httpEvent.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia enviados por un activador HTTP (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, normalmente una función sin servidor en un servicio como AWS Lambda, Google Cloud Functions o Azure Functions).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.all.count** <br>(count) | Recuento total de mensajes Push (enviados a dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.push.all.data** <br>(count) | Tamaño total de los mensajes Push (enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes Push (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.messages.count** <br>(count) | Recuento total de mensajes Push (enviados a dispositivos a través de un transporte de notificaciones Push como FCM o APNS), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.push.messages.data** <br>(count) | Tamaño total de los mensajes Push (enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes Push (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.presence.count** <br>(count) | Recuento total de mensajes de presencia Push (enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.push.presence.data** <br>(count) | Tamaño total de los mensajes de presencia Push (enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.push.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia Push (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados a los dispositivos a través de un transporte de notificaciones Push como FCM o APNS).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.all.count** <br>(count) | Recuento total de mensajes salientes en tiempo real (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.realtime.all.data** <br>(count) | Tamaño total de los mensajes salientes en tiempo real (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes salientes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.messages.count** <br>(count) | Recuento total de mensajes salientes en tiempo real (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.realtime.messages.data** <br>(count) | Tamaño total de los mensajes salientes en tiempo real (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes salientes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.presence.count** <br>(count) | Recuento total de mensajes de presencia salientes en tiempo real (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.realtime.presence.data** <br>(count) | Tamaño total de los mensajes de presencia salientes en tiempo real (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.realtime.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia salientes en tiempo real (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.all.count** <br>(count) | Recuento total de mensajes REST salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.rest.all.data** <br>(count) | Tamaño total de los mensajes REST salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes REST salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.messages.count** <br>(count) | Recuento total de mensajes REST salientes (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.rest.messages.data** <br>(count) | Tamaño total de los mensajes REST salientes (enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes REST salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.presence.count** <br>(count) | Recuento total de mensajes de presencia REST salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.rest.presence.data** <br>(count) | Tamaño total de los mensajes de presencia REST salientes (enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.rest.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia REST salientes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.all.count** <br>(count) | Recuento total de mensajes de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.sharedQueue.all.data** <br>(count) | Tamaño total de los mensajes de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Reactor Queue (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.messages.count** <br>(count) | Recuento total de mensajes de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.sharedQueue.messages.data** <br>(count) | Tamaño total de los mensajes de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Reactor Queue (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a un Reactor Queue), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.presence.count** <br>(count) | Recuento total de mensajes de presencia de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.sharedQueue.presence.data** <br>(count) | Tamaño total de los mensajes de presencia de Reactor Queue (enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.sharedQueue.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir del mensaje de presencia de Reactor Queue (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a un Reactor Queue).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.all.count** <br>(count) | Recuento total de mensajes de Webhook (enviados desde el servicio Ably a clientes que utilizan Webhooks).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.webhook.all.data** <br>(count) | Tamaño total de los mensajes de Webhook (enviados desde el servicio Ably a los clientes que utilizan Webhooks).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Webhook (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes que utilizan Webhooks).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.messages.count** <br>(count) | Recuento total de mensajes de Webhook (enviados desde el servicio Ably a clientes que utilizan Webhooks), excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.webhook.messages.data** <br>(count) | Tamaño total de los mensajes de Webhook (enviados desde el servicio Ably a los clientes que utilizan Webhooks), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de Webhook (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes que utilizan Webhooks), excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.presence.count** <br>(count) | Recuento total de mensajes de presencia de Webhook (enviados desde el servicio Ably a clientes que utilizan Webhooks).<br>_Se muestra como mensaje_ |
| **ably.messages.outbound.webhook.presence.data** <br>(count) | Tamaño total de los mensajes de presencia de Webhook (enviados desde el servicio Ably a los clientes que utilizan Webhooks).<br>_Se muestra como bytes_ |
| **ably.messages.outbound.webhook.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia de Webhook (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas, enviados desde el servicio Ably a los clientes que utilizan Webhooks).<br>_Se muestra como bytes_ |
| **ably.messages.persisted.all.count** <br>(count) | Recuento total de mensajes persistentes en función de las reglas de canal configuradas.<br>_Se muestra como mensaje_ |
| **ably.messages.persisted.all.data** <br>(count) | Tamaño total de los mensajes persistentes en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.persisted.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes persistentes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.persisted.messages.count** <br>(count) | Recuento total de mensajes persistentes en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.persisted.messages.data** <br>(count) | Tamaño total de los mensajes persistentes en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.persisted.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes persistentes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.persisted.presence.count** <br>(count) | Recuento total de mensajes de presencia persistentes en función de las reglas de canal configuradas.<br>_Se muestra como mensaje_ |
| **ably.messages.persisted.presence.data** <br>(count) | Tamaño total de los mensajes de presencia persistentes en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.persisted.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia persistentes (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.processed.all.count** <br>(count) | Recuento total de mensajes procesados en función de las reglas de canal configuradas.<br>_Se muestra como mensaje_ |
| **ably.messages.processed.all.data** <br>(count) | Tamaño total de los mensajes procesados en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.processed.all.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes procesados (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.processed.messages.count** <br>(count) | Recuento total de mensajes procesados en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como mensaje_ |
| **ably.messages.processed.messages.data** <br>(count) | Tamaño total de los mensajes procesados en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.processed.messages.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes procesados (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas, excluidos los mensajes de presencia.<br>_Se muestra como bytes_ |
| **ably.messages.processed.presence.count** <br>(count) | Recuento total de mensajes de presencia procesados en función de las reglas de canal configuradas.<br>_Se muestra como mensaje_ |
| **ably.messages.processed.presence.data** <br>(count) | Tamaño total de los mensajes de presencia procesados en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.messages.processed.presence.uncompressedData** <br>(count) | Tamaño total sin comprimir de los mensajes de presencia procesados (excluida cualquier compresión, como la compresión delta: https://ably.com/documentation/realtime/channels/channel-parameters/deltas) en función de las reglas de canal configuradas.<br>_Se muestra como bytes_ |
| **ably.push.channelMessages** <br>(count) | Número total de mensajes del canal Push.<br>_Se muestra como mensaje_ |
| **ably.push.directPublishes** <br>(count) | Número total de publicaciones directas.<br>_Se muestra como operación_ |
| **ably.push.notifications.all** <br>(count) | Número total de notificaciones Push.<br>_Se muestra como mensaje_ |
| **ably.push.notifications.delivered** <br>(count) | Número total de notificaciones Push entregadas.<br>_Se muestra como mensaje_ |
| **ably.push.notifications.failed** <br>(count) | Número total de notificaciones Push fallidas.<br>_Se muestra como mensaje_ |
| **ably.push.notifications.refused** <br>(count) | Número total de notificaciones Push rechazadas.<br>_Se muestra como mensaje_ |

### Eventos

La integración de Ably no incluye eventos.

### Checks de servicio

La integración de Ably no incluye checks de servicio.

## Desinstalación

- **En Ably**: Ingresa a https://ably.com, inicia sesión y ve a **Tus aplicaciones**.

- Selecciona la aplicación Ably de la que quieres desinstalar la **integración Datadog**.

- Haz clic en el botón **Remove** (Eliminar) de la sección **Integración Datadog**.

![Captura de pantalla de Ably](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png)

Las estadísticas de tu aplicación Ably ya no se envían a Datadog.

- **En Datadog**: Ve a **integraciones**, selecciona el cuadro de Ably y haz clic en **Uninstall Integration** (Desinstalar integración).

Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.

Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado, buscando el nombre de la integración en la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys?filter=Ably).

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Ably](https://ably.com/support).