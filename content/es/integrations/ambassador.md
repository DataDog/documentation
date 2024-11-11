---
app_id: ambassador
app_uuid: eb591405-8cda-486a-8cf5-a06af769a3d7
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: envoy.listener.downstream_cx_total
      metadata_path: metadata.csv
      prefix: envoy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10010
    source_type_name: Ambassador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Ambassador
  sales_email: hello@datawire.io
  support_email: hello@datawire.io
categories:
- cloud
- containers
- kubernetes
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md
display_on_public_website: true
draft: false
git_integration_title: ambassador
integration_id: ambassador
integration_title: Ambassador API Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ambassador
public_title: Ambassador API Gateway
short_description: Ambassador es una API Gateway de código abierto, nativa de Kubernetes,
  creada en Envoy
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Nube
  - Category::Contenedores
  - Category::Kubernetes
  - Category::Orquestación
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::integración
  configuration: README.md#Setup
  description: Ambassador es una API Gateway de código abierto, nativa de Kubernetes,
    creada en Envoy
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambassador API Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas de [Ambassador][1] en tiempo real para:

- Visualizar el rendimiento de tus microservicios

- Comprender el impacto de las nuevas versiones de tus servicios a medida que utilizas Ambassador para realizar un despliegue canary

![snapshot][2]

## Configuración

Habilita DogStatsD en tu Agent Daemonset y configura la siguiente variable de entorno en tu pod Ambassador:

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

Con esta configuración, las métricas de StatsD se envían a la IP del host, que redirige el tráfico al puerto 8125 del Agent.

Consulta [Estadísticas de Envoy con StatsD][3] para obtener más información.

También puedes enviar datos de rastreo desde Ambassador a Datadog APM. Consulta [Rastreo distribuido con Datadog][4] para obtener más información.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ambassador" >}}


### Eventos

El check de Ambassador no incluye ningún evento.

### Checks de servicio

El check de Ambassador no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/es/help/