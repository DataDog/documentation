---
app_id: pusher
categories:
- metrics
- message queues
custom_kind: integración
description: Obtén métricas de Pusher en Datadog para ver y monitorizar el compromiso
  con la aplicación.
further_reading:
- link: https://www.datadoghq.com/blog/pusher-monitoring/
  tag: blog
  text: Monitorización de pusher
integration_version: 1.0.0
media: []
title: Pusher
---
![Pusher dashboard](images/pusher_dashboard.png)

## Información general

Monitoriza tus mensajes y análisis de conexiones en tiempo real en todas tus aplicaciones Pusher:

- Visualiza conexiones simultáneas en tiempo real.
- Realiza un seguimiento de los mensajes enviados por tipo, incluyendo difusión, eventos de clientes, webhooks y mensajes API.
- Obtén un desglose estadístico del tamaño de los mensajes, incluyendo la media, la mediana, el máximo y el percentil 95.
- Monitoriza el uso en los horarios de facturación.

## Configuración

### Instalación

Para monitorizar tus métricas de Pusher:

1. Copia tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys).

1. Ve a la configuración de tu cuenta Pusher y selecciona **Integración Datadog** o [inicia sesión](https://dashboard.pusher.com/accounts/sign_in).

1. Pega tu clave de API Datadog y haz clic en **Save** (Guardar).

1. Vuelve a tu dashboard de Datadog para ver cómo las métricas empiezan a rellenar la vista predeterminada del dashboard de Pusher.

<div class="alert alert-info">
Las métricas se rellenan en tiempo real. Los datos históricos se rellenan una vez que se instala correctamente la integración.
</div>

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **pusher.messages** <br>(count) | Mensajes enviados a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.messages.api_request** <br>(count) | Solicitudes API enviadas a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.messages.webhook** <br>(count) | Webhooks enviados a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.messages.presence_event** <br>(count) | Eventos de presencia enviados a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.messages.broadcast** <br>(count) | Mensajes de difusión enviados a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.messages.client_event.received** <br>(count) | Eventos de cliente recibidos, enviados a lo largo del tiempo.<br>_Se muestra como evento_ |
| **pusher.messages.client_event.sent** <br>(count) | Eventos de cliente enviados a lo largo del tiempo.<br>_Se muestra como evento_ |
| **pusher.message_size.avg** <br>(gauge) | Tamaño medio del mensaje.<br>_Se muestra como byte_ |
| **pusher.message_size.max** <br>(gauge) | Tamaño máximo del mensaje.<br>_Se muestra como byte_ |
| **pusher.message_size.p95** <br>(gauge) | Percentil 95 del tamaño del mensaje.<br>_Se muestra como byte_ |
| **pusher.message_size.count** <br>(rate) | Recuento de mensajes enviados a lo largo del tiempo.<br>_Se muestra como mensaje_ |
| **pusher.message_size.median** <br>(gauge) | Mediana del tamaño del mensaje.<br>_Se muestra como byte_ |
| **pusher.connections** <br>(count) | Conexiones concurrentes por segundo.<br>_Se muestra como conexión_ |
| **pusher.connections.non_secure** <br>(count) | Conexiones no seguras cada 5 segundos.<br>_Se muestra como conexión_ |
| **pusher.connections.non_secure.sockjs** <br>(count) | Conexiones sockjs no seguras cada 5 segundos.<br>_Se muestra como conexión_ |
| **pusher.connections.non_secure.ws** <br>(count) | Conexiones websocket no seguras cada 5 segundos.<br>_Se muestra como conexión_ |
| **pusher.connections.secure** <br>(count) | Conexiones seguras cada 5 segundos.<br>_Se muestra como conexión_ |
| **pusher.connections.secure.sockjs** <br>(count) | Conexiones sockjs seguras cada 5 segundos.<br>_Se muestra como conexión_ |
| **pusher.connections.secure.ws** <br>(count) | Conexiones websocket seguras cada 5 segundos.<br>_Se muestra como conexión_ |

### Eventos

La integración Pusher no incluye eventos.

### Checks de servicio

La integración Pusher no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Introducción de la monitorización de Pusher en tiempo real](https://www.datadoghq.com/blog/pusher-monitoring/)