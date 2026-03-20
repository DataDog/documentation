---
app_id: resilience4j
app_uuid: 2aee627c-b49a-4cfb-829e-03121f6a7d3c
assets:
  dashboards:
    resilience4j-overview: assets/dashboards/resilience4j_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: resilience4j.circuitbreaker.state
      metadata_path: metadata.csv
      prefix: resilience4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33574225
    source_type_name: Resilience4j
  monitors:
    Circuit Breaker State Alert: assets/monitors/circuitbreaker_state_open.json
    Circuit Breaker State Alert with Slow Calls: assets/monitors/circuitbreaker_state_open_slow_calls.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Willian César Cincerre da Silva
  sales_email: willian@appoena.io
  support_email: willianccs@gmail.com
categories:
- métricas
- events
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resilience4j/README.md
display_on_public_website: true
draft: false
git_integration_title: resilience4j
integration_id: resilience4j
integration_title: Resilience4j
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: resilience4j
public_title: Resilience4j
short_description: Resilience4j ofrece funciones como Circuit Breaker, Rate Limiter,
  Bulkhead y Retry
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Alertas
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  configuration: README.md#Configuración
  description: Resilience4j ofrece funciones como Circuit Breaker, Rate Limiter, Bulkhead
    y Retry
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://resilience4j.readme.io/docs/getting-started
  support: README.md#Soporte
  title: Resilience4j
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Resilience4j][1] es una biblioteca de tolerancia a fallos ligera inspirada en Netflix Hystrix, pero diseñada para la programación funcional. Este check monitoriza [Resilience4j][2] a través del Datadog Agent.

## Configuración

### Instalación

Para instalar el check Resilience4j en tu host:

1. Instala el [kit de herramientas para desarrolladores].
(<https://docs.datadoghq.com/developers/integrations/python/>)
 en cualquier máquina.

2. Ejecuta `ddev release build resilience4j` para compilar el paquete.

3. [Descarga el Datadog Agent][3].

4. Carga el artefacto de compilación a cualquier host con un Agent, y
 ejecuta `datadog-agent integration install -w
 path/to/resilience4j/dist/<ARTIFACT_NAME>.whl`.

### Configuración

1. Edita el archivo `resilience4j/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Resilience4j. Para conocer todas las opciones de configuración disponibles, consulta el [resilience4j/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `resilience4j` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "resilience4j" >}}


### Checks de servicio

La integración Resilience4j no incluye checks de servicios.

### Eventos

La integración Resilience4j no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con la [persona responsable del mantenimiento][8] de esta integración.

[1]: https://github.com/resilience4j/resilience4j
[2]: https://resilience4j.readme.io/docs/micrometer#prometheus
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/resilience4j/datadog_checks/resilience4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/resilience4j/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resilience4j/manifest.json