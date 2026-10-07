---
app_id: gitea
categories:
- colaboración
- control de fuentes
custom_kind: integración
description: Rastrea todas tus métricas de Gitea con Datadog
integration_version: 1.0.2
media: []
supported_os:
- linux
- Windows
- macOS
title: Gitea
---
## Información general

[Gitea](https://docs.gitea.io/en-us/) es una solución ligera de alojamiento de código gestionada por la comunidad y escrita en Go.

Esta integración monitoriza instancias de Gitea a través del [Datadog Agent](https://docs.datadoghq.com/agent/).

## Configuración

### Requisito previo

Gitea no expone sus métricas internas en forma predeterminada. Necesitas activar el servidor HTTP incorporado que expone las métricas del endpoint en tu archivo de configuración `app.ini`.

```ini
[metrics]
ENABLED = true
```

Para obtener más información, consulta la [documentación] (https://docs.gitea.io/en-us/) oficial.

### Instalación

La integración de Gitea no está incluida por defecto en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que debes instalarla.

Para la versión 7.36 o posterior del Agent, sigue las instrucciones a continuación para instalar el check de Gitea en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalarlo con el Docker Agent o con versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) basadas en el Agent.

### Configuración

1. Edita el archivo `gitea.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de Gitea. Consulta el [ejemplo gitea.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gitea` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gitea.accesses** <br>(gauge) | Número de accesos.|
| **gitea.actions** <br>(gauge) | Número de acciones.|
| **gitea.attachments** <br>(gauge) | Número de anexos.|
| **gitea.comments** <br>(gauge) | Número de comentarios.|
| **gitea.follows** <br>(gauge) | Número de seguidores.|
| **gitea.hooktasks** <br>(gauge) | Número de HookTasks.|
| **gitea.issues** <br>(gauge) | Número de incidentes.|
| **gitea.issues.closed** <br>(gauge) | Número de incidentes cerrados.|
| **gitea.issues.open** <br>(gauge) | Número de incidentes abiertos.|
| **gitea.labels** <br>(gauge) | Número de etiquetas (labels).|
| **gitea.loginsources** <br>(gauge) | Número de orígenes de inicio de sesión.|
| **gitea.milestones** <br>(gauge) | Número de hitos.|
| **gitea.mirrors** <br>(gauge) | Número de espejos.|
| **gitea.oauths** <br>(gauge) | Número de oauths.|
| **gitea.organizations** <br>(gauge) | Número de organizaciones.|
| **gitea.projects** <br>(gauge) | Número de proyectos.|
| **gitea.projects_boards** <br>(gauge) | Número de juntas de proyectos.|
| **gitea.publickeys** <br>(gauge) | Número de claves públicas.|
| **gitea.releases** <br>(gauge) | Número de versiones.|
| **gitea.repositories** <br>(gauge) | Número de repositorios.|
| **gitea.stars** <br>(gauge) | Número de estrellas.|
| **gitea.teams** <br>(gauge) | Número de equipos.|
| **gitea.updatetasks** <br>(gauge) | Número de tareas de actualización.|
| **gitea.users** <br>(gauge) | Número de usuarios.|
| **gitea.watches** <br>(gauge) | Número de relojes.|
| **gitea.webhooks** <br>(gauge) | Número de webhooks.|
| **gitea.go.info** <br>(gauge) | Información sobre el entorno Go.|
| **gitea.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente.|
| **gitea.go.threads** <br>(gauge) | Número de subprocesos de SO creados.|
| **gitea.metric_handler.requests_in_flight** <br>(gauge) | Número actual de scrapings proporcionados.|
| **gitea.metric_handler.requests.count** <br>(count) | Número total de scrapings por código de estado HTTP.|
| **gitea.process.cpu_seconds.count** <br>(count) | Tiempo total de CPU del usuario y del sistema transcurrido en segundos.<br>_Se muestra en segundos_ |
| **gitea.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **gitea.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **gitea.process.resident_memory.bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra en bytes_ |
| **gitea.process.start_time** <br>(gauge) | Hora de inicio del proceso desde unix epoch en segundos.<br>_Se muestra en segundos_ |
| **gitea.process.virtual_memory.bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra en bytes_ |
| **gitea.process.virtual_memory.max_bytes** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes.<br>_Se muestra en bytes_ |

### Eventos

El check de Gitea no incluye ningún evento.

### Checks de servicio

**gitea.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia Gitea.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).