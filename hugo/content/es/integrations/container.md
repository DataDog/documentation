---
app_id: contenedor
categories:
- contenedores
- kubernetes
custom_kind: integración
description: Rastreo de tus métricas de contenedor con Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
title: Contenedor
---
## Información general

Este check informa de un conjunto de métricas de cualquier contenedor en ejecución, independientemente del tiempo de ejecución utilizado para iniciarlos.

**NOTA**: El check `container` es diferente del check `containerd`. Los checks `container` informan de métricas estandarizadas de todos los contenedores que se encuentran en el sistema, independientemente del tiempo de ejecución de los contenedores.
El check `containerd` es exclusivo del tiempo de ejecución del check `containerd` y publica métricas en el espacio de nombres de `containerd.*`.

## Configuración

### Instalación

El check de contenedor es un check central del Datadog Agent y se activa automáticamente si se detecta cualquier tiempo de ejecución de contenedor compatible.
Dependiendo de tu entorno, puede que sea necesario configurar el acceso a los tiempos de ejecución de contenedores compatibles (Docker, containerd).

#### Instalación en contenedores

El check `container` requiere que se instalen algunas carpetas para permitir la activación automática. Esto es controlado por el Helm Chart oficial, el Datadog Operator y como configuraciones documentadas para Kubernetes, Docker, ECS y ECS Fargate.

### Configuración

El check `container` no expone ningún parámetro de configuración específico. Para personalizar campos comunes o forzar la activación del check `container`, sigue estos pasos:

1. Crea el archivo `container.d/conf.yaml` en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

El check `container` puede recopilar métricas de CPU, memoria, red y E/S en discos.
Algunas métricas pueden no estar disponibles dependiendo de tu entorno (Linux/Windows, por ejemplo).

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) y busca `container` en la sección **Checks**.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **container.cpu.limit** <br>(gauge) | El tiempo máximo de CPU disponible para el contenedor<br>_Mostrado como nanocore_. |
| **container.cpu.system** <br>(gauge) | El uso de la CPU del sistema del contenedor<br>_Mostrado como nanocore_. |
| **container.cpu.throttled** <br>(gauge) | El tiempo total de aceleración de la cpu<br>_Mostrado como nanosegundo_ |
| **container.cpu.throttled.periods** <br>(gauge) | El número de periodos durante los cuales el contenedor estaba limitado|
| **container.cpu.usage** <br>(gauge) | El uso total de la CPU del contenedor<br>_Mostrado como nanocore_. |
| **container.cpu.user** <br>(gauge) | El uso de CPU del espacio de usuario del contenedor<br>_Mostrado como nanocore_. |
| **container.io.read** <br>(gauge) | El número de bytes leídos de los discos por este contenedor<br>_Mostrado como byte_ |
| **container.io.read.operations** <br>(gauge) | El número de operaciones de lectura realizadas por este contenedor|
| **container.io.write** <br>(gauge) | El número de bytes escritos en discos por este contenedor<br>_Mostrado como byte_ |
| **container.io.write.operations** <br>(gauge) | El número de operaciones de escritura realizadas por este contenedor|
| **container.memory.cache** <br>(gauge) | El uso de la caché del contenedor<br>_Mostrado como byte_ |
| **container.memory.commit** <br>(gauge) | El uso de memoria de confirmaciones del contenedor<br>_Mostrado como byte_ |
| **container.memory.commit.peak** <br>(gauge) | Uso máximo de memoria de confirmaciones del contenedor<br>_Mostrado como byte_ |
| **container.memory.kernel** <br>(gauge) | El uso de memoria del núcleo del contenedor<br>_Mostrado como byte_ |
| **container.memory.limit** <br>(gauge) | El límite de memoria del contenedor<br>_Mostrado como byte_ |
| **container.memory.major_page_faults** <br>(count) | Número de averías graves de la page (página) |
| **container.memory.oom_events** <br>(gauge) | Número de eventos OOM provocados por el contenedor|
| **container.memory.page_faults** <br>(count) | Número total de fallos de la page (página) |
| **container.memory.rss** <br>(gauge) | El uso RSS del contenedor<br>_Mostrado como byte_ |
| **container.memory.soft_limit** <br>(gauge) | El límite suave de memoria del contenedor<br>_Mostrado como byte_ |
| **container.memory.swap** <br>(gauge) | El uso de intercambio de contenedores<br>_Mostrado como byte_ |
| **container.memory.usage** <br>(gauge) | El uso total de memoria del contenedor<br>_Mostrado como byte_ |
| **container.memory.usage.peak** <br>(gauge) | El uso máximo de memoria registrado desde que se inició el contenedor<br>_Mostrado como byte_ |
| **container.memory.working_set** <br>(gauge) | Uso del conjunto de trabajo del contenedor<br>_Mostrado como byte_ |
| **container.net.rcvd** <br>(gauge) | El número de bytes de red recibidos (por interfaz)<br>_Mostrado como byte_ |
| **container.net.rcvd.packets** <br>(gauge) | El número de paquetes de red recibidos (por interfaz)|
| **container.net.sent** <br>(gauge) | El número de bytes de red enviados (por interfaz)<br>_Mostrado como byte_ |
| **container.net.sent.packets** <br>(gauge) | El número de paquetes de red enviados (por interfaz)|
| **container.pid.open_files** <br>(gauge) | El número de descriptores de archivo abiertos (solo Linux)|
| **container.pid.thread_count** <br>(gauge) | El número de subprocesos que se ejecutan en este contenedor|
| **container.pid.thread_limit** <br>(gauge) | El número máximo de subprocesos para este contenedor|
| **container.restarts** <br>(gauge) | El número de contenedores reiniciados|
| **container.uptime** <br>(gauge) | El tiempo de actividad del contenedor<br>_Mostrado como segundos_ |

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).