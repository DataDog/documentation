---
app_id: amazon-bedrock
app_uuid: ca7ffbc0-a346-4880-ab41-d6ef2dbd0ba3
assets:
  dashboards:
    amazon-bedrock: assets/dashboards/amazon_bedrock_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.bedrock.invocations
      metadata_path: metadata.csv
      prefix: aws.bedrock.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 370
    source_type_name: Amazon Bedrock
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_bedrock
integration_id: amazon-bedrock
integration_title: Amazon Bedrock
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_bedrock
public_title: Amazon Bedrock
short_description: Amazon Bedrock pone a disposición modelos fundacionales de IA a
  través de una API.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::AI/ML
  - Offering::Integration
  configuration: README.md#Configuración
  description: Amazon Bedrock pone a disposición modelos fundacionales de IA a través
    de una API.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/
  support: README.md#Soporte
  title: Amazon Bedrock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general
Monitoriza, soluciona problemas y evalúa tus aplicaciones impulsadas por LLM, como chatbots o herramientas de extracción de datos,
con Amazon Bedrock.

Si creas aplicaciones de LLM, usa la observabilidad de LLM para investigar la causa raíz de los problemas,
monitorizar el rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de tus aplicaciones de LLM.

Ve el [vídeo sobre la vista de rastreo de observabilidad de LLM][1] para obtener un ejemplo acerca de cómo puedes investigar una traza (trace).

Amazon Bedrock es un servicio totalmente gestionado que pone a disposición [modelos fundacionales][2] (FMs) de Amazon y de empresas emergentes
de IA líderes a través de una API, de modo que puedas elegir entre varios FMs para encontrar el modelo que mejor
se adapte a tu caso de uso.

Habilita esta integración para ver todas tus métricas de Bedrock en Datadog.

## Configuración

### Observabilidad de LLM: obtén visibilidad integral de tu aplicación de LLM con Amazon Bedrock
Puedes habilitar la observabilidad de LLM en diferentes entornos. Sigue la configuración adecuada en función de tu caso:

#### Instalación para Python

##### Si no tienes el Datadog Agent:
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

2. Si aún no lo has hecho, instala el paquete `ddtrace`.

  ```shell
    pip install ddtrace
  ```

3. Inicia tu aplicación con el comando `ddtrace-run` para habilitar el rastreo de manera automática:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

**Nota**: Si el Agent se ejecuta en un host o puerto personalizado, configura `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` según corresponda.

##### Si ejecutas la observabilidad de LLM en un entorno serverless (AWS Lambda):
1. Instala las capas de Lambda **Datadog-Python** y **Datadog-Extension** como parte de tu configuración de AWS Lambda.
2. Habilita la observabilidad de LLM al configurar las siguientes variables de entorno:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**Nota**: En entornos serverless, Datadog vacía de manera automática los tramos (spans) cuando la función de Lambda termina de ejecutarse.

##### Rastreo automático de Amazon Bedrock
La integración de Amazon Bedrock se habilita de manera automática cuando se configura la observabilidad de LLM. Esto captura latencia, errores, mensajes de entrada y salida, así como el uso de tokens para llamadas de Amazon Bedrock.

Se rastrean los siguientes métodos tanto para operaciones sincrónicas como transmitidas de Amazon Bedrock:
- `InvokeModel()`
- `InvokeModelWithResponseStream()`

No se requiere configuración adicional para estos métodos.

##### Validación
Valida que la observabilidad de LLM capture tramos de manera adecuada al comprobar los logs de tu aplicación a fin de verificar si se crean de forma correcta. También puedes ejecutar el siguiente comando para comprobar el estado de la integración `ddtrace`:

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

Aquí se muestran todos los errores relacionados con la instrumentación o transmisión de datos, incluidos los problemas con las trazas de Amazon Bedrock.

### APM: obtén métricas de uso para aplicaciones de Python

Si aún no lo has hecho, configura la [integración Amazon Web Services][3].

### Recopilación de métricas

1. En la [página de la integración de AWS][4], asegúrate de que `Bedrock` se encuentre habilitado en la pestaña `Metric Collection` (Recopilación de métricas).
2. Instala la [integración de Datadog con Amazon Bedrock][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-bedrock" >}}


### Eventos

La integración de Amazon Bedrock no incluye eventos.

### Checks de servicio

La integración de Amazon Bedrock no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Amazon Bedrock con Datadog][8]

[1]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[2]: https://aws.amazon.com/what-is/foundation-models/
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/integrations/amazon-bedrock
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_bedrock/metadata.csv
[7]: https://docs.datadoghq.com/es/help/
[8]: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/