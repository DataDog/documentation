---
app_id: google-gemini
app_uuid: 93179a9e-98f8-48fe-843a-59f9c9bb84df
assets:
  dashboards:
    LLM Observability Overview Dashboard: assets/dashboards/llm_observability_overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31079799
    source_type_name: Google Gemini
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- google cloud
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_gemini
integration_id: google-gemini
integration_title: Google Gemini
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_gemini
public_title: Google Gemini
short_description: Monitorizar el uso y el estado de Google Gemini a nivel de aplicación
supported_os:
- Linux
- Windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Categoría::Google Cloud
  - Categoría::Métricas
  - Tipo de datos enviados::Trazas (traces)
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Supported OS::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el uso y el estado de Google Gemini a nivel de aplicación
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Google Gemini
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Información general

Monitoriza, soluciona problemas y evalúa tus aplicaciones basadas en LLM, como chatbots o herramientas de extracción de datos, utilizando [Google Gemini][1].

Si estás creando aplicaciones LLM, utiliza LLM Observability de Datadog para investigar la causa de origen de los problemas, monitorizar el rendimiento operativo, y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones LLM.

Consulta el [vídeo de la vista de rastreo de LLM Observability][2] para ver un ejemplo de cómo puedes investigar una traza.

## Configuración

### LLM Observability: Obtén una visibilidad de extremo a extremo de tu aplicación LLM con Google Gemini
Puedes activar LLM Observability en diferentes entornos. Sigue la configuración correspondiente en función de tu escenario:

#### Instalación para Python

##### Si no tienes instalado el Datadog Agent:
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

3. Inicia tu aplicación utilizando el comando `ddtrace-run` para activar automáticamente el rastreo:

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

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].


[1]: https://gemini.google.com/
[2]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[3]: https://docs.datadoghq.com/es/help/