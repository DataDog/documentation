---
app_id: azure-openai
app_uuid: 20d1d2b1-9f8e-46b4-a3ef-9767449e22c8
assets:
  dashboards:
    azure-openai: assets/dashboards/azure_openai_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.cognitiveservices_accounts.processed_prompt_tokens
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12193845
    source_type_name: Azure OpenAI
  monitors:
    OpenAI Account's Token Usage is Abnormally High: assets/monitors/azure_openai_token_usage_high.json
    OpenAI Harmful Calls: assets/monitors/azure_openai_harmful_calls_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- ia/ml
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_openai
integration_id: azure-openai
integration_title: Azure OpenAI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_openai
public_title: Azure OpenAI
short_description: Utiliza la integración de Datadog para realizar un seguimiento
  del rendimiento y el uso de la API de Azure OpenAI y los despliegues.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Utiliza la integración de Datadog para realizar un seguimiento del
    rendimiento y el uso de la API de Azure OpenAI y los despliegues.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure OpenAI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general
Monitoriza, soluciona problemas y evalúa tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos, mediante Azure OpenAI.

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas, monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Ve el [vídeo sobre la vista de rastreo de observabilidad de LLM][1] para obtener un ejemplo acerca de cómo puedes investigar una traza (trace).

Azure OpenAI permite el desarrollo de copilotos y aplicaciones de IA generativa utilizando la biblioteca de modelos de OpenAI. Utiliza la integración de Datadog para realizar un seguimiento del rendimiento y el uso de la API y los despliegues de Azure OpenAI.

## Configuración

### LLM Observability: visibilidad de extremo a extremo en tu aplicación de LLM mediante Azure OpenAI.
Puedes habilitar la observabilidad de LLM en diferentes entornos. Sigue la configuración adecuada en función de tu caso:

#### Instalación para Python

##### Si no dispones del Datadog Agent:
1. Instala el paquete `ddtrace`:

  ```shell
    pip install ddtrace
  ```

2. Inicia tu aplicación con el siguiente comando y habilita el modo sin Agent:

  ```shell
    DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

##### Si ya tienes instalado el Datadog Agent:
1. Asegúrate de que el Agent se encuentre en ejecución y de que se haya habilitado APM y StatsD. Por ejemplo, usa el siguiente comando con Docker:

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

2. Si aún no lo has hecho, instala el paquete `ddtrace`:

  ```shell
    pip install ddtrace
  ```

3. Inicia tu aplicación con el comando `ddtrace-run` para habilitar el rastreo de manera automática:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

**Nota**: Si el Agent se ejecuta en un host o puerto personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` según corresponda.

##### Si estás ejecutando LLM Observability en un entorno serverless (funciones de Azure):

Habilita la observabilidad de LLM al configurar las siguientes variables de entorno:

  ```shell
  DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) cuando la función de Azure termina de ejecutarse.

##### Rastreo automático de Azure OpenAI
La integración de Azure OpenAI se activa automáticamente cuando se configura LLM Observability. Esto captura la latencia, los errores, los mensajes de entrada y salida, así como el uso de tokens para las llamadas de Azure OpenAI.

Los siguientes métodos son rastreados tanto para operaciones síncronas como asíncronas de Azure OpenAI:
- `AzureOpenAI().completions.create()`
- `AsyncAzureOpenAI().completions.create()`
- `AzureOpenAI().chat.completions.create()`
- `AsyncAzureOpenAI().chat.completions.create()`

Estos métodos no requieren ninguna configuración adicional.

##### Validación
Valida que LLM Observability capture tramos de manera adecuada al comprobar los logs de tu aplicación a fin de verificar si se crean de forma correcta. También puedes ejecutar el siguiente comando para comprobar el estado de la integración `ddtrace`:

  ```shell
  ddtrace-run --info
  ```

Busca el siguiente mensaje para confirmar la configuración:

  ```shell
  Agent error: None
  ```

##### Depuración
Si tienes problemas durante la configuración, habilita el registro de depuración al pasar la marca `--debug`:

  ```shell
  ddtrace-run --debug
  ```

Aquí se muestran todos los errores relacionados con la instrumentación o transmisión de datos, incluidos los problemas con las trazas de Azure OpenAI.

### Monitorización de infraestructura: métricas y visibilidad sobre tus recursos de Azure OpenAI
Si aún no lo has hecho, configura primero la [integración de Microsoft Azure][2]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_openai" >}}


### Checks de servicio

La integración de Azure OpenAI no incluye ningún check de servicio.

### Eventos

La integración de Azure OpenAI no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].


[1]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_openai/metadata.csv
[4]: https://docs.datadoghq.com/es/help/