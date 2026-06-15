---
app_id: crewai
categories:
- ia/ml
- métricas
custom_kind: integración
description: Monitorizar, optimizar y evaluar tus aplicaciones LLM con CrewAI
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: CrewAI
---
## Información general

Utiliza la integración de CrewAI para monitorizar, solucionar problemas y evaluar tus aplicaciones basadas en el marco de [CrewAI](https://docs.crewai.com/introduction).

**Nota**: Requiere Python.

## Configuración

#### Instalación

##### Si no tienes el Datadog Agent:

1. Instala el paquete `ddtrace`:

```shell
  pip install ddtrace
```

2. Inicia tu aplicación con el siguiente comando para habilitar el modo sin Agent:

```shell
  DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

##### Si ya tienes instalado el Datadog Agent:

1. Asegúrate de que el Agent se está ejecutando, y que APM y StatsD están activados. Por ejemplo, utiliza el siguiente comando con Docker:

```shell
docker run -d \
  --cgroupns host \
  --pid host \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  -p 127.0.0.1:8126:8126/tcp \
  -p 127.0.0.1:8125:8125/udp \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_ENABLED=true \
  gcr.io/datadoghq/agent:latest
```

2. Si aún no lo hiciste, instala el paquete `ddtrace`:

```shell
  pip install ddtrace
```

3. Para habilitar de manera automática el rastreo, inicia tu aplicación con el comando `ddtrace-run`:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <your_app>.py
```

**Nota**: Si el Agent se ejecuta en un puerto o host personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` en consecuencia.

##### Si estás ejecutando LLM Observability en un entorno serverless (AWS Lambda):

1. Instala las capas de Lambda **Datadog-Python** y **Datadog-Extension** como parte de tu configuración de AWS Lambda.
1. Activa LLM Observability configurando las siguientes variables de entorno:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) al final de la función de Lambda.

##### Rastreo automático de CrewAI

La integración de CrewAI permite el seguimiento automático de los lanzamientos de Crew, incluidas las invocaciones de tareas/agents/herramientas, realizadas a través del [SDK Python de CrewAI](https://docs.crewai.com/introduction). La integración de CrewAI también detecta la latencia, los errores, los mensajes de entrada/salida y la vinculación direccional del flujo de datos durante las ejecuciones de Crew.

Se rastrean los siguientes métodos de CrewAI:

- [Lanzamientos de Crew](https://docs.crewai.com/concepts/crews#kicking-off-a-crew):

  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Ejecución de tareas](https://docs.crewai.com/concepts/tasks):

  - `task.execute_sync()`
  - `task.execute_async()`

- [Ejecución de Agents](https://docs.crewai.com/concepts/agents):

  - `agent.execute_task()`

- [Invocación de herramientas](https://docs.crewai.com/concepts/tools):

  - `tool.invoke()`

Estos métodos no requieren ninguna configuración adicional.

##### Validación

Valida que la observabilidad de LLM capture tramos de manera adecuada al comprobar los logs de tu aplicación a fin de verificar si se crean de forma correcta. También puedes ejecutar el siguiente comando para comprobar el estado de la integración `dd-trace`:

```shell
ddtrace-run --info
```

Busca el siguiente mensaje para confirmar la configuración:

```shell
Agent error: None
```

##### Depuración

Si tienes problemas durante la configuración, activa el registro de depuración pasando el marcador `--debug`:

```shell
ddtrace-run --debug
```

Muestra cualquier error relacionado con la transmisión o la instrumentación de datos, incluidos los problemas con las trazas (traces) de CrewAI.

## Datos recopilados

### Métricas

La integración de CrewAI no incluye métricas personalizadas.

### Checks de servicio

La integración de CrewAI no incluye checks de servicio.

### Eventos

La integración CrewAI no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).