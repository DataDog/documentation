---
aliases:
- /es/integrations/gnatsd_streaming
app_id: gnatsd-streaming
categories:
- red
custom_kind: integración
description: Streaming del servidor NATS
integration_version: 0.1.0
media: []
supported_os:
- linux
- windows
- macos
title: Gnatsd Streaming
---
## Información general

Obtén métricas del servicio gnatsd_streaming en tiempo real para:

- Visualizar y monitorizar estados de gnatsd_streaming
- Recibir notificaciones sobre fallos y eventos de gnatsd_streaming

## Configuración

El check de gnatsd_streaming no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21 o posterior/v6.21 o posterior, sigue las instrucciones siguientes para instalar el check de gnatsd_streaming en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `gnatsd_streaming.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar [métricas](#metrics) de GnatsD Streaming.
   Consulta el [ejemplo gnatsd_streaming.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example)para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `gnatsd_streaming` en la sección Checks.

## Compatibilidad

El check gnatsd_streaming check es compatible con todas las principales plataformas

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gnatsd.streaming.serverz.clients** <br>(gauge) | Número de clientes conectados actualmente<br>_Se muestra como unidad_ |
| **gnatsd.streaming.serverz.subscriptions** <br>(count) | Número de suscripciones que ha gestionado el servidor<br>_Se muestra como unidad_ |
| **gnatsd.streaming.serverz.channels** <br>(gauge) | Número de canales activos actualmente<br>_Se muestra como unidad_ |
| **gnatsd.streaming.serverz.total_msgs** <br>(count) | Número total de mensajes pasados por el servidor<br>_Se muestra como unidad_ |
| **gnatsd.streaming.serverz.total_bytes** <br>(count) | Número total de bytes pasados por el servidor<br>_Se muestra en bytes_ |
| **gnatsd.streaming.storez.total_msgs** <br>(count) | Número total de mensajes pasados por el almacén<br>_Se muestra como unidad_ |
| **gnatsd.streaming.storez.total_bytes** <br>(count) | Número total de bytes pasados por el almacén<br>_Se muestra en bytes_ |
| **gnatsd.streaming.clientsz.total** <br>(gauge) | Número de clientes conectados<br>_Se muestra como unidad_ |
| **gnatsd.streaming.channelsz.total** <br>(gauge) | Número de canales abiertos<br>_Se muestra como unidad_ |
| **gnatsd.streaming.channelsz.msgs** <br>(count) | Recuento total de mensajes en un canal<br>_Se muestra como unidad_ |
| **gnatsd.streaming.channelsz.bytes** <br>(count) | Total de bytes de los mensajes en un canal<br>_Se muestra en bytes_ |

Las métricas del servidor Nats Streaming se etiquetan con nombres como "nss-cluster_id"

### Eventos

Si estás ejecutando el servidor Nats Streaming en un grupo con Tolerancia a fallos, se genera un evento de conmutación de Nats Streaming cuando el estado de un servidor cambia entre `FT_STANDBY` y `FT_ACTIVE`.

### Checks de servicio

**gnatsd_streaming.can_connect**

Devuelve `CRITICAL` si el Agent no se puede conectar con el endpoint Gnastd Streaming, de lo contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](http://docs.datadoghq.com/help)