---
app_id: vllm
app_uuid: 355886f0-31ae-44a9-9638-6951ad0f3039
assets:
  dashboards:
    vLLM Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vllm.num_requests.running
      metadata_path: metadata.csv
      prefix: vllm.
    process_signatures:
    - vllm.entrypoints.openai.api_server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17652503
    source_type_name: vLLM
  monitors:
    Average Request Latency is High: assets/monitors/latency.json
    vLLM application token usage is high: assets/monitors/token_throughput.json
  saved_views:
    errors: assets/saved_views/errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vllm/README.md
display_on_public_website: true
draft: false
git_integration_title: vllm
integration_id: vllm
integration_title: vLLM
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: vllm
public_title: vLLM
short_description: vLLM es una biblioteca para la inferencia y entrega de LLM
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: vLLM es una biblioteca para la inferencia y entrega de LLM
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/vllm-integration/
  support: README.md#Support
  title: vLLM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [vLLM][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de vLLM está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `vllm.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar los datos de rendimiento de tu vllm. Consulta el [vllm.d/conf.yaml de ejemplo][3] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `vllm` en la sección Check.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vllm" >}}


### Eventos

La integración de vLLM no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "vllm" >}}


### Logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Si estás ejecutando tu Agent como contenedor, consulta [Instalación del contenedor][8] para activar la recopilación de logs. Si estás ejecutando un Agent de host, consulta el [Agent de host][9] en su lugar.
En cualquier caso, asegúrate de que el valor de `source` para tus logs es `vllm`. Esta configuración garantiza que el pipeline de procesamiento integrado encuentre tus logs. Para establecer tu configuración de logs para un contenedor, consulta [integraciones de log][10].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].

## Referencias adicionales
Documentación útil adicional, enlaces y artículos:
- [Optimiza el rendimiento de las aplicaciones LLM con la integración vLLM de Datadog][12]


[1]: https://docs.vllm.ai/en/stable/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/vllm/datadog_checks/vllm/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/vllm/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/vllm/assets/service_checks.json
[8]: https://docs.datadoghq.com/es/containers/docker/log/?tab=containerinstallation#installation
[9]: https://docs.datadoghq.com/es/containers/docker/log/?tab=hostagent#installation
[10]: https://docs.datadoghq.com/es/containers/docker/log/?tab=dockerfile#log-integrations
[11]: https://docs.datadoghq.com/es/help/
[12]: https://www.datadoghq.com/blog/vllm-integration/