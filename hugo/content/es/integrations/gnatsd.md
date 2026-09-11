---
app_id: gnatsd
categories:
- colas de mensajes
- notificaciones
custom_kind: integración
description: Monitoriza clústeres de gnatsd con Datadog.
integration_version: 2.0.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Gnatsd
---
## Información general

Obtén métricas del servicio Gnatsd en tiempo real para:

- Visualizar y monitorizar estados Gnatsd
- Recibir notificaciones sobre fallos y eventos de Gnatsd.

## Configuración

El check de Gnatsd no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21 o posterior/v6.21 o posterior, sigue las instrucciones siguientes para instalar el check de Gnatsd en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `gnatsd.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de Gnatsd. Consulta el [ejemplo gnatsd.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `gnatsd` en la sección Checks.

## Compatibilidad

El check de Gnatsd es compatible con las principales plataformas

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gnatsd.connz.connections.in_bytes** <br>(count) | Número de bytes entrantes<br>_Se muestra en bytes_ |
| **gnatsd.connz.connections.in_msgs** <br>(count) | Número de mensajes recibidos<br>_Se muestra como unidad_ |
| **gnatsd.connz.connections.out_bytes** <br>(count) | Número de bytes salientes<br>_Se muestra en bytes_ |
| **gnatsd.connz.connections.out_msgs** <br>(count) | Número de mensajes enviados<br>_Se muestra como unidad_ |
| **gnatsd.connz.connections.pending_bytes** <br>(gauge) | Número de bytes pendientes de ack en una suscripción<br>_Se muestra como unidad_ |
| **gnatsd.connz.connections.subscriptions** <br>(gauge) | Número de suscripciones en una conexión<br>_Se muestra como unidad_ |
| **gnatsd.connz.num_connections** <br>(gauge) | Número de conexiones actuales al broker NATS<br>_Se muestra como unidad_ |
| **gnatsd.connz.total** <br>(count) | Número de conexiones al broker NATS<br>_Se muestra como unidad_ |
| **gnatsd.routez.num_routes** <br>(gauge) | Número de rutas en el clúster<br>_Se muestra como unidad_ |
| **gnatsd.routez.routes.in_bytes** <br>(count) | Número de bytes entrantes<br>_Se muestra en bytes_ |
| **gnatsd.routez.routes.in_msgs** <br>(count) | Número de mensajes recibidos<br>_Se muestra como unidad_ |
| **gnatsd.routez.routes.out_bytes** <br>(count) | Número de bytes salientes<br>_Se muestra en bytes_ |
| **gnatsd.routez.routes.out_msgs** <br>(count) | Número de mensajes enviados<br>_Se muestra como unidad_ |
| **gnatsd.routez.routes.pending_bytes** <br>(gauge) | Número de bytes pendientes<br>_Se muestra como unidad_ |
| **gnatsd.routez.routes.subscriptions** <br>(gauge) | Número de suscripciones en una conexión<br>_Se muestra como unidad_ |
| **gnatsd.varz.connections** <br>(gauge) | Número de conexiones al broker NATS<br>_Se muestra como unidad_ |
| **gnatsd.varz.in_bytes** <br>(count) | Cantidad de tráfico enviado al clúster<br>_Se muestra en bytes_ |
| **gnatsd.varz.in_msgs** <br>(count) | Número de mensajes pasados al cluster<br>_Se muestra como unidad_ |
| **gnatsd.varz.mem** <br>(gauge) | Cantidad de memoria utilizada actualmente por el proceso<br>_Se muestra en bytes_ |
| **gnatsd.varz.out_bytes** <br>(count) | Cantidad de tráfico enviado desde el clúster<br>_Se muestra en bytes_ |
| **gnatsd.varz.out_msg** <br>(count) | Número de mensajes enviados fuera del clúster<br>_Se muestra como unidad_ |
| **gnatsd.varz.remotes** <br>(gauge) | Número de remotos conectados actualmente<br>_Se muestra como unidad_ |
| **gnatsd.varz.routes** <br>(gauge) | Número de rutas actuales<br>_Se muestra como unidad_ |
| **gnatsd.varz.slow_consumers** <br>(count) | Número de consumidores lentos conectados alguna vez<br>_Se muestra como unidad_ |
| **gnatsd.varz.subscriptions** <br>(gauge) | Número de suscripciones gestionadas actualmente<br>_Se muestra como unidad_ |

**Nota**: Si utilizas nombres de clúster Nats personalizados, tus métricas podrían tener el siguiente aspecto:
`gnatsd.connz.connections.cluster_name.in_msgs`

### Eventos

El check de Gnatsd no incluye eventos.

### Checks de servicio

**gnatsd.can_connect**

Devuelve `CRITICAL` si el Agent no se puede conectar con el endpoint Gnastd, de lo contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).