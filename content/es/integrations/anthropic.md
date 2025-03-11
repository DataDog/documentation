---
app_id: anthropic
app_uuid: 53fe7c3e-57eb-42ca-8e43-ec92c04b6160
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31102434
    source_type_name: Anthropic
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/anthropic/README.md
display_on_public_website: true
draft: false
git_integration_title: anthropic
integration_id: anthropic
integration_title: Anthropic
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: anthropic
public_title: Anthropic
short_description: Monitoriza el uso y el estado de Anthropic a nivel de aplicación
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Category::Metrics
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza el uso y el estado de Anthropic a nivel de aplicación
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Anthropic
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general
Usa la integración de Anthropic para monitorizar, solucionar problemas y evaluar tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos, con los modelos de Anthropic. 

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas,
monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Ve el [vídeo sobre la vista de rastreo de observabilidad de LLM][1] para obtener un ejemplo acerca de cómo puedes investigar una traza (trace).

## Configuración

### Observabilidad de LLM: obtén visibilidad integral de tu aplicación de LLM con Anthropic
Puedes habilitar la observabilidad de LLM en diferentes entornos. Sigue la configuración adecuada en función de tu caso:

#### Instalación para Python

##### Si no tienes el Datadog Agent:
1. Instala el paquete `ddtrace`:

  ```shell
    pip install ddtrace
  ```

2.  Inicia tu aplicación con el siguiente comando para habilitar el modo sin Agent:

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

2. Si aún no lo has hecho, instala el paquete `ddtrace`.

  ```shell
    pip install ddtrace
  ```

3. Para habilitar de manera automática el rastreo, inicia tu aplicación con el comando `ddtrace-run`:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <your_app>.py
  ```

**Nota**: Si el Agent se ejecuta en un host o puerto personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` según corresponda.

##### Si ejecutas la observabilidad de LLM en un entorno serverless (AWS Lambda):
1. Instala las capas de Lambda **Datadog-Python** y **Datadog-Extension** como parte de tu configuración de AWS Lambda.
2. Habilita la observabilidad de LLM al configurar las siguientes variables de entorno:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) al final de la función de Lambda.

##### Rastreo automático de Anthropic

La integración de Anthropic permite el rastreo automático de las llamadas de mensajes de chat realizadas por el SDK de Python de Anthropic, al capturar la latencia, errores, mensajes de entrada/salida y uso de tokens durante las operaciones de Anthropic.

Se rastrean los siguientes métodos para operaciones sincrónicas y asincrónicas de Anthropic:
- Mensajes de chat (incluidas las llamadas transmitidas): `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- Mensajes de chat transmitidos: `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

No se requiere configuración adicional para estos métodos.

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

Si tienes problemas durante la configuración, habilita el registro de depuración al pasar la marca `--debug`:

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

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].


[1]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[2]: https://docs.datadoghq.com/es/help/