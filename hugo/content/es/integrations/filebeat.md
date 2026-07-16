---
app_id: filebeat
categories:
- sistema operativo y sistema
custom_kind: integración
description: Remitente ligero de logs
integration_version: 1.3.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Filebeat
---
## Información general

Obtén métricas del servicio Filebeat en tiempo real para:

- Visualiza y monitoriza los estados de Filebeat.
- Recibe notificaciones sobre fallos y eventos de Filebeat.

## Configuración

El check de Filebeat no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que deberás instalarlo.

### Instalación

Para las versiones 7.21 o posterior/v6.21 o posterior del Agent, sigue las instrucciones a continuación para instalar el check de Filebeat en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalarlo con el Docker Agent o con versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] del núcleo (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `filebeat.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de Filebeat. Consulta el [ejemplo filebeat.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

## Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `filebeat` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **filebeat.registry.unprocessed_bytes** <br>(gauge) | Número de bytes aún no procesados por filebeat.<br>_Se muestra en bytes_ |

### Eventos

El check de Filebeat no incluye eventos.

### Checks de servicio

**filebeat.can_connect**

Devuelve `Critical` si el Agent no puede conectarse a Filebeat para recopilar métricas, de lo contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).