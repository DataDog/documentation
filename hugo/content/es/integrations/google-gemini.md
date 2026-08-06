---
aliases:
- /es/integrations/google_gemini
app_id: google-gemini
categories:
- ia/ml
- google cloud
- métricas
custom_kind: integración
description: Monitorizar el uso y el estado de Google Gemini a nivel de aplicación
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Google Gemini
---
## Información general

Monitoriza, soluciona problemas y evalúa tus aplicaciones basadas en LLM, como chatbots o herramientas de extracción de datos, utilizando [Google Gemini](https://gemini.google.com/).

Si estás creando aplicaciones LLM, utiliza LLM Observability de Datadog para investigar la causa de origen de los problemas, monitorizar el rendimiento operativo, y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones LLM.

Consulta el [video de vista de rastreo de LLM Observability](https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max) para ver un ejemplo de cómo puedes investigar una trace (traza).

## Configuración

### LLM Observability: Obtén una visibilidad de extremo a extremo de tu aplicación LLM con Google Gemini

Puedes activar LLM Observability en diferentes entornos. Sigue la configuración adecuada en función de tu escenario:

#### Instalación para Python

##### Si no tienes el Datadog Agent:

1. Instala el paquete `ddtrace`:

```shell
  pip install ddtrace
```

2. Inicia tu aplicación con el siguiente comando, habilitando el modo Agentless:

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

3. Inicia tu aplicación utilizando el comando `ddtrace-run` para habilitar automáticamente el rastreo:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

**Nota**: Si el Agent se ejecuta en un puerto o host personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` en consecuencia.

##### Si estás ejecutando LLM Observability en un entorno serverless:

Activa LLM Observability configurando las siguientes variables de entorno:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**Nota**: En entornos serverless, Datadog descarga automáticamente tramos (spans) cuando la función serverless termina de ejecutarse.

##### Rastreo automático de Google Gemini

La integración Google Gemini proporciona un rastreo automático de las llamadas de generación de contenido del SDK Python de Google AI. Esto captura la latencia, los errores, los mensajes de entrada y salida, así como el uso de tokens para operaciones de Google Gemini.

Los siguientes métodos se rastrean tanto para operaciones síncronas como asíncronas de Google Gemini:

- Generación de contenidos (incluidas las llamadas transmitidas): `model.generate_content()`, `model.generate_content_async()`
- Mensajes de chat: `chat.send_message()`, `chat.send_message_async()`

Estos métodos no requieren ninguna configuración adicional.

##### Validación

Comprueba si LLM Observability captura correctamente los tramos, verificando la creación exitosa de tramos en tus logs de aplicación. También puedes ejecutar el siguiente comando para comprobar el estado de la integración `ddtrace`:

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

Se muestra cualquier error relacionado con la instrumentación o la transmisión de datos, incluyendo problemas con las trazas de Google Gemini.

## Datos recopilados

### Métricas

La integración Google Gemini no incluye métricas.

### Checks de servicio

La integración Google Gemini no incluye checks de servicios.

### Eventos

La integración Google Gemini no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).