---
app_id: exim
categories:
- colas de mensajes
custom_kind: integración
description: Integración Exim para monitorizar colas de correo electrónico
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Exim
---
## Información general

Este check monitoriza [Exim](https://www.exim.org/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para el Agent v7.21+ / v6.21+, sigue las siguientes instrucciones para instalar la check de exim en tu host. Consulta [Utilizar integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-exim==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `exim.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de exim. Consulta el [exim.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/exim/datadog_checks/exim/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `exim` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **exim.queue.count** <br>(gauge) | El número de mensajes en una cola de correo determinada<br>_Se muestra como unidad_ |
| **exim.queue.volume** <br>(gauge) | El volumen de mensajes en una cola de correo determinada<br>_Se muestra como byte_ |

### Eventos

La integración Exim no incluye eventos.

### Checks de servicio

**exim.returns.output**

Devuelve `CRITICAL` si el Agent no puede ejecutar el comando para recuperar el estado de la cola de exim.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).