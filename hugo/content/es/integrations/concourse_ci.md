---
app_id: concourse-ci
app_uuid: eb83d03f-e1d6-4718-8e54-922f4d2528b1
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: concourse.ci.goroutines
      metadata_path: metadata.csv
      prefix: concourse.ci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10041
    source_type_name: Concourse CI
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automatización
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/README.md
display_on_public_website: true
draft: false
git_integration_title: concourse_ci
integration_id: concourse-ci
integration_title: Concourse-CI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: concourse_ci
public_title: Concourse-CI
short_description: Recopila métricas emitidas desde Concourse CI.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila métricas emitidas desde Concourse CI.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Concourse-CI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Configure el emisor de métricas de Datadog en Concourse CI para:

- Visualizar la duración de los pipelines, el número de contenedores y los volúmenes montados de workers.
- Identificar las solicitudes lentas para crear rutas.

## Configuración

### Instalación

Concourse CI incluye un emisor de métricas de Datadog. Un requisito previo para configurar [ATC][1] para que emita métricas al inicio es tener instalado un [Datadog Agent][2].

### Configuración

Configura ATC para utilizar el emisor de Datadog al establecer las siguientes opciones. Es importante utilizar el prefijo `concourse.ci` para evitar emitir [métricas personalizadas][3].

### Opciones del emisor de métricas

Consulta [Configuración de métricas][4] en la documentación de Concourse CI para obtener más información.

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Datadog agent host to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Datadog agent port to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Prefix for all metrics to easily find them in Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "concourse_ci" >}}


### Eventos

Esta integración no admite eventos.

### Servicio

Esta integración no recopila checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://concourse-ci.org/concepts.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/developers/metrics/custom_metrics/
[4]: https://concourse-ci.org/metrics.html#configuring-metrics
[5]: https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/metadata.csv
[6]: https://docs.datadoghq.com/es/help/