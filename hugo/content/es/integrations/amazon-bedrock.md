---
aliases:
- /es/integrations/amazon_bedrock
app_id: amazon-bedrock
categories:
- aws
- métricas
- nube
- ia/ml
custom_kind: integración
description: Amazon Bedrock pone a disposición modelos fundacionales de IA a través
  de una API.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/
  tag: blog
  text: Monitorizar Amazon Bedrock con Datadog
media: []
title: Amazon Bedrock
---
## Información general

Monitoriza, soluciona problemas y evalúa tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos,
con Amazon Bedrock.

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas,
monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Consulta el [vídeo de la vista de rastreo de LLM Observability](https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max) para ver un ejemplo de cómo puedes investigar una traza (trace).

Amazon Bedrock es un servicio totalmente gestionado que ofrece [modelos fundacionales](https://aws.amazon.com/what-is/foundation-models/) (FM) de Amazon y de las principales startups de IA
a través de una API, para que puedas elegir entre varios FM y encontrar el modelo que mejor
se adapta a tu caso de uso.

Habilita esta integración para ver todas tus métricas de Bedrock en Datadog.

## Configuración

### Observabilidad de LLM: obtén visibilidad integral de tu aplicación de LLM con Amazon Bedrock

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

##### Si estás ejecutando LLM Observability en un entorno serverless (AWS Lambda):

1. Instala las capas de Lambda **Datadog-Python** y **Datadog-Extension** como parte de tu configuración de AWS Lambda.
1. Activa LLM Observability configurando las siguientes variables de entorno:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) cuando la función Lambda termina de ejecutarse.

##### Rastreo automático de Amazon Bedrock

La integración de Amazon Bedrock se habilita de manera automática cuando se configura la observabilidad de LLM. Esto captura latencia, errores, mensajes de entrada y salida, así como el uso de tokens para llamadas de Amazon Bedrock.

Se rastrean los siguientes métodos tanto para operaciones sincrónicas como transmitidas de Amazon Bedrock:

- `InvokeModel()`
- `InvokeModelWithResponseStream()`

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

Aquí se muestran todos los errores relacionados con la instrumentación o transmisión de datos, incluidos los problemas con las trazas de Amazon Bedrock.

#### Installation for Node.js

##### Si no tienes el Datadog Agent:

1. Instala el paquete `dd-trace`:

   ```shell
     npm install dd-trace
   ```

1. Inicia tu aplicación con el siguiente comando, habilitando el modo sin agente:

   ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

##### Si ya tienes instalado el Datadog Agent:

1. Asegúrate de que el Agent se está ejecutando y que APM está activado. Por ejemplo, utiliza el siguiente comando con Docker:

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

1. Instale la biblioteca Node.js de Datadog APM.

   ```shell
   npm install dd-trace
   ```

1. Inicia tu aplicación utilizando el comando `-r dd-trace/init` o `NODE_OPTIONS='--require dd-trace/init'` para habilitar automáticamente el rastreo:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

**Nota**: Si el Agent se ejecuta en un puerto o host personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` en consecuencia.

##### Si estás ejecutando LLM Observability en un entorno serverless (AWS Lambda):

1. Activa LLM Observability configurando las siguientes variables de entorno:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
   ```

1. Antes de que termine la función Lambda, llama a `llmobs.flush()`:

   ```js
   const llmobs = require('dd-trace').llmobs;
   // or, if dd-trace was not initialized via NODE_OPTIONS
   const llmobs = require('dd-trace').init({
     llmobs: {
       mlApp: <YOUR_ML_APP>,
     }
   }).llmobs; // with DD_API_KEY and DD_SITE being set at the environment level

   async function handler (event, context) {
     ...
     llmobs.flush()
     return ...
   }
   ```

### APM: obtén métricas de uso para aplicaciones de Python

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Bedrock` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon Bedrock](https://app.datadoghq.com/integrations/amazon-bedrock).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.bedrock.content_filtered_count** <br>(count) | Número total de ocasiones en que se ha filtrado el contenido de la salida de texto.<br>_Se muestra como ocasiones_ |
| **aws.bedrock.input_token_count** <br>(gauge) | Número medio de tokens de entrada utilizados en los avisos invocados de un modelo.<br>_Se muestra como token_ |
| **aws.bedrock.input_token_count.minimum** <br>(gauge) | Número mínimo de tokens de entrada utilizados en los avisos invocados de un modelo.<br>_Se muestra como token_ |
| **aws.bedrock.input_token_count.maximum** <br>(gauge) | Número máximo de tokens de entrada utilizados en los avisos invocados de un modelo.<br>_Se muestra como token_ |
| **aws.bedrock.input_token_count.sum** <br>(count) | Número total de tokens de entrada utilizados en los avisos invocados de un modelo.<br>_Se muestra como token_ |
| **aws.bedrock.invocation_client_errors** <br>(count) | Número de errores de invocación del cliente.<br>_Se muestra como error_ |
| **aws.bedrock.invocation_latency** <br>(gauge) | Latencia media de las invocaciones en milisegundos.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_latency.minimum** <br>(gauge) | Latencia mínima de las invocaciones en un periodo de 1 minuto.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_latency.maximum** <br>(gauge) | Latencia máxima de las invocaciones en un periodo de 1 minuto.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_latency.p99** <br>(gauge) | Percentil 99 de la latencia de las invocaciones en un periodo de 1 minuto.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_latency.p95** <br>(gauge) | Percentil 95 de la latencia de las invocaciones en un periodo de 1 minuto.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_latency.p90** <br>(gauge) | Percentil 90 de la latencia de las invocaciones en un periodo de 1 minuto.<br>_Se muestra como milisegundos_ |
| **aws.bedrock.invocation_server_errors** <br>(count) | Número de errores de invocación del servidor.<br>_Se muestra como error_ |
| **aws.bedrock.invocation_throttles** <br>(count) | Número de límites de invocación.<br>_Se muestra como límite_ |
| **aws.bedrock.invocations** <br>(count) | Número de invocaciones enviadas a un endpoint del modelo.<br>_Se muestra como invocación_ |
| **aws.bedrock.output_image_count** <br>(gauge) | Número medio de imágenes de salida devueltas por las invocaciones del modelo durante un periodo de 1 minuto.<br>_Se muestra como elemento_ |
| **aws.bedrock.output_token_count** <br>(gauge) | Número medio de tokens de salida devueltos por las invocaciones del modelo durante un periodo de 1 minuto.<br>_Se muestra como token_ |
| **aws.bedrock.output_token_count.minimum** <br>(gauge) | Número mínimo de tokens de salida devueltos por las invocaciones del modelo durante un periodo de 1 minuto.<br>_Se muestra como token_ |
| **aws.bedrock.output_token_count.maximum** <br>(gauge) | Número máximo de tokens de salida devueltos por las invocaciones del modelo durante un periodo de 1 minuto.<br>_Se muestra como token_ |
| **aws.bedrock.output_token_count.sum** <br>(count) | Número total de tokens de salida devueltos por todas las invocaciones del modelo.<br>_Se muestra como token_ |

### Eventos

La integración de Amazon Bedrock no incluye eventos.

### Checks de servicio

La integración de Amazon Bedrock no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Amazon Bedrock con Datadog](https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/)