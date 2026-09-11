---
app_id: hikaricp
custom_kind: integración
description: Integración de HikariCP con openmetrics v2
integration_version: 1.2.0
media: []
supported_os:
- linux
- windows
- macos
title: HikariCP
---
## Información general

[HikariCP](https://github.com/brettwooldridge/HikariCP) es un framework de agrupación de conexiones JDBC ligero y rápido.
Este check monitoriza HikariCP a través del Datadog Agent.

## Configuración

### Instalación

Para instalar el check de HikariCP en tu host:

1. Instala el [kit de herramientas para desarrolladores](https://docs.datadoghq.com/developers/integrations/python/)
   en cualquier máquina.

1. Clona el repositorio [integrations-extras](https://github.com/DataDog/integrations-extras) y navega hasta el directorio.

1. Ejecuta `ddev release build hikaricp` para crear el paquete.

1. [Descarga el Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

1. Sube el artefacto de compilación a cualquier host con un Agent y
   Ejecuta `datadog-agent integration install -w path/to/hikaricp/dist/<ARTIFACT_NAME>.whl`.

### Configuración

1. Edita el archivo `hikaricp/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento de HikariCP. Consulta el [hikaricp/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/hikaricp/datadog_checks/hikaricp/data/conf.yaml.example) para todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hikaricp` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hikaricp.connections** <br>(gauge) | Número de conexiones|
| **hikaricp.connections.timeout.count** <br>(count) | Número total de conexiones con tiempo de espera|
| **hikaricp.connections.active** <br>(gauge) | Número de conexiones activas|
| **hikaricp.connections.idle** <br>(gauge) | Número de conexiones inactivas|
| **hikaricp.connections.max** <br>(gauge) | Número máximo de conexiones<br>_Se muestra como conexión_ |
| **hikaricp.connections.min** <br>(gauge) | Número mínimo de conexiones<br>_Se muestra como conexión_ |
| **hikaricp.connections.pending** <br>(gauge) | Número de conexiones pendientes|
| **hikaricp.connections.acquire.seconds.count** <br>(count) | Recuento del tiempo de adquisición de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.acquire.seconds.max** <br>(gauge) |  Máximo del tiempo de adquisición de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.acquire.seconds.sum** <br>(count) | Suma del tiempo de adquisición de la conexión<br> _Se muestra como segundo_ |
| **hikaricp.connections.creation.seconds.count** <br>(count) | Recuento del tiempo de creación de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.creation.seconds.max** <br>(gauge) | Máximo del tiempo de creación de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.creation.seconds.sum** <br>(count) | Suma del tiempo de creación de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.usage.seconds.count** <br>(count) | Recuento del tiempo de uso de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.usage.seconds.max** <br>(gauge) | Máximo del tiempo de uso de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.connections.usage.seconds.sum** <br>(count) | Suma del tiempo de uso de la conexión<br>_Se muestra como segundo_ |
| **hikaricp.threads.pending** <br>(gauge) | Número de subprocesos pendientes<br>_Se muestra como subproceso_ |
| **hikaricp.connections.acquired.nanos.count** <br>(count) | Recuento del tiempo de conexión adquirido<br> _Se muestra como nanosegundo_ |
| **hikaricp.connections.acquired.nanos.sum** <br>(count) | Suma del tiempo de conexión adquirido<br> _Se muestra en nanosegundos_ |
| **hikaricp.connections.acquired.nanos.quantile** <br>(gauge) | Cuantil del tiempo de conexión adquirido<br>_Se muestra en nanosegundos_ |
| **hikaricp.connections.creation.millis.count** <br>(count) | Recuento del tiempo de creación de la conexión<br>_Se muestra en milisegundos_ |
| **hikaricp.connections.creation.millis.sum** <br>(count) | Suma del tiempo de creación de la conexión<br>_Se muestra en milisegundos_ |
| **hikaricp.connections.creation.millis.quantile** <br>(gauge) | Cuantil del tiempo de creación de la conexión<br>_Se muestra en milisegundos_ |
| **hikaricp.connections.usage.millis.count** <br>(count) | Recuento del tiempo de uso de la conexión<br>_Se muestra en milisegundos_ |
| **hikaricp.connections.usage.millis.sum** <br>(count) | Suma del tiempo de uso de la conexión<br>_Se muestra en milisegundos_ |
| **hikaricp.connections.usage.millis.quantile** <br>(gauge) | Cuantil del tiempo de uso de la conexión<br>_Se muestra en milisegundos_ |

### Checks de servicio

**hikaricp.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse con el endpoint de HikariCP OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

### Eventos

HikariCP no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).