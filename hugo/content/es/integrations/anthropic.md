---
app_id: anthropic
categories:
- ia/ml
- métricas
custom_kind: integración
description: Monitorizar, optimizar y evaluar tus aplicaciones LLM con Anthropic
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Anthropic
---
## Información general

Utiliza la integración de Anthropic para monitorizar, solucionar problemas y evaluar tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos, utilizando modelos de Anthropic.

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas,
monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Consulta el [vídeo de la vista de rastreo de LLM Observability](https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max) para ver un ejemplo de cómo puedes investigar una traza (trace).

## Configuración

# Configuración de evaluaciones LLM Anthropic para Datadog

## Información general

LLM Observability de Datadog permite la monitorización de extremo a extremo de tu aplicación LLM utilizando modelos Anthropic. Sigue los pasos que se indican a continuación para configurar tu integración de Anthropic para evaluaciones LLM.

## Requisitos previos

- Una **cuenta de Anthropic** con acceso a despliegues de modelos.
- Una **clave de API Anthropic válida** con **permisos de escritura** para las funcionalidades del modelo.

## Configuración

### 1. Generar una clave de API Anthropic

1. Inicia sesión en tu [dashboard de Anthropic](https://console.anthropic.com/login?selectAccount=true&returnTo=%2Fdashboard%3F).
1. Ve a **API keys** (Claves de API) en tu perfil.
1. Haz clic en el botón **Create Key** (Crear clave).
   - Para LLM Observability, asegúrate de que la clave de API tiene permiso de **escritura** para las **funcionalidades del modelo**. Esto permite a Datadog invocar modelos en tu cuenta de Anthropic.
1. Copia en el portapapeles la clave de API creada.

### 2. Configurar la integración de Anthropic para Datadog

1. Ve a la pestaña de configuración dentro del cuadro de la integración de Anthropic de Datadog.
1. En la pestaña **Configure** (Configurar), haz clic en **Add New** (Añadir nuevo).
1. En **Name** (Nombre), introduce un nombre para tu cuenta. En **API key** (Clave de API), introduce tu clave de API Anthropic.
1. Haz clic en la marca de verificación para guardar.

### Notas adicionales

- Esta integración permite a LLM Observability hacer un seguimiento del rendimiento del modelo Anthropic.
- No se requieren permisos adicionales más allá de habilitar el acceso de escritura para las funcionalidades del modelo.

## Recursos adicionales

- [Documentación de la API Anthropic](https://docs.anthropic.com/)

### Observabilidad de LLM: obtén visibilidad integral de tu aplicación de LLM con Anthropic

Puedes activar LLM Observability en diferentes entornos. Sigue la configuración adecuada en función de tu escenario:

#### Instalación para Python

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

##### Rastreo automático de Anthropic

La integración de Anthropic permite el rastreo automático de las llamadas de mensajes de chat realizadas por el SDK de Python de Anthropic, al capturar la latencia, errores, mensajes de entrada/salida y uso de tokens durante las operaciones de Anthropic.

Se rastrean los siguientes métodos para operaciones sincrónicas y asincrónicas de Anthropic:

- Mensajes de chat (incluidas las llamadas transmitidas): `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- Mensajes de chat transmitidos: `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

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

Aquí se muestran todos los errores relacionados con la instrumentación o transmisión de datos, incluidos los problemas con las trazas de Anthropic.

## Datos recopilados

### Métricas

La integración de Anthropic no incluye métricas personalizadas.

### Checks de servicio

La integración de Anthropic no incluye checks de servicio.

### Eventos

La integración de Anthropic no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).