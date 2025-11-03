---
app_id: traefik-mesh
app_uuid: 8ace5f4d-ba92-4b68-acf0-20275c8c2a2a
assets:
  dashboards:
    Traefik Mesh Overview: assets/dashboards/traefik_mesh_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: traefik_mesh.entrypoint.open_connections
      metadata_path: metadata.csv
      prefix: traefik_mesh.
    process_signatures:
    - traefik
    - traefik-mesh
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 15633073
    source_type_name: Traefik Mesh
  monitors:
    Traefik Mesh entrypoint request count failures are high.: assets/monitors/high_request_count.json
  saved_views:
    Traefik Mesh Error Logs Overview: assets/saved_views/traefik_mesh_error_overview.json
    Traefik Mesh Logs Overview: assets/saved_views/traefik_mesh_log_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/README.md
display_on_public_website: true
draft: false
git_integration_title: traefik_mesh
integration_id: traefik-mesh
integration_title: Traefik Mesh
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: traefik_mesh
public_title: Traefik Mesh
short_description: Rastrea métricas relacionadas con Traefik Mesh
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea métricas relacionadas con Traefik Mesh
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik Mesh
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Traefik Mesh es una malla de servicio ligera y fácil de desplegar que ofrece funciones avanzadas de gestión del tráfico, seguridad y observabilidad para aplicaciones de microservicios, aprovechando las capacidades del proxy de Traefik. Con la integración de Traefik de Datadog, puedes:
- Obtén información sobre el tráfico que entra en tu malla de servicio.
- Obtén información crítica sobre el rendimiento, la fiabilidad y la seguridad de cada servicio dentro de tu malla, lo que garantiza que tus servicios funcionan de forma eficiente y ayuda a identificar y resolver problemas rápidamente.
- Obtén información detallada sobre los flujos de tráfico interno dentro de tu malla de servicio, lo que ayuda a monitorizar el rendimiento y garantizar la fiabilidad.

Este check monitoriza [Traefik Mesh][1] a través del Datadog Agent.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir de la versión del Agent v7.55.0, el check de Traefik Mesh se incluye en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

**Nota**: Este check requiere el Agent v7.55.0 o posterior.

### Configuración

Traefik Mesh puede configurarse para exponer las métricas con formato Prometheus. El Datadog Agent puede recopilar estas métricas utilizando la integración descrita a continuación. Sigue las instrucciones para configurar la recopilación de datos para tus instancias de Traefik Mesh. Para las configuraciones requeridas para exponer las métricas de Prometheus, ve la [página de Observabilidad en la documentación oficial de Traefik Mesh][4].

Además, se puede recopilar un pequeño subconjunto de métricas comunicándote con diferentes endpoints de la API. En concreto:
- `/api/version`: información sobre la versión del proxy de Traefik.
- `/api/status/nodes`: estado de preparación de los nodos visibles por el [controlador][5] de Traefik.
- `/api/status/readiness`: estado listo del controlador de Traefik.

**Nota**: Este check utiliza [OpenMetrics][6] para la recopilación de métricas, que requiere Python 3.

#### Contenedores
##### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus estén expuestas en tu clúster de Traefik Mesh. Puedes configurar y personalizar esto siguiendo las instrucciones en la [página de Observabilidad en la documentación oficial de Traefik Mesh][4]. Para que el Agent empiece a recopilar métricas, los pods de Traefik Mesh deben estar anotados. Para obtener más información acerca de las anotaciones, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación. Puedes encontrar opciones adicionales de configuración revisando el [`traefik_mesh.d/conf.yaml` de ejemplo][7].

**Nota**: Las siguientes métricas sólo pueden recopilarse si están disponibles. Algunas métricas sólo se generan cuando se realizan determinadas acciones.

Al configurar el check de Traefik Mesh, puedes utilizar los siguientes parámetros:
- `openmetrics_endpoint`: este parámetro debe establecerse en la localización en la que las métricas con formato Prometheus están expuestas. El puerto por defecto es `8082`, pero puede configurarse usando el parámetro `--entryPoints.metrics.address`. En entornos en contenedores, `%%host%%` puede utilizarse para la [autodetección de hosts][2].
- `traefik_proxy_api_endpooint:` este parámetro es opcional. El puerto por defecto es `8080` y puede configurarse usando `--entryPoints.traefik.address`. En entornos en contenedores, `%%host%%` puede ser usado para la [autodetección de hosts][2].
- `traefik_controller_api_endpoint`: este parámetro es opcional. El puerto por defecto es `9000`.

#### Proxy de Traefik
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8082/metrics",
              "traefik_proxy_api_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

#### Controlador de Traefik
```yaml
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "traefik_mesh": {
          "init_config": {},
          "instances": [
            {
              "traefik_controller_api_endpoint": "http://%%host%%:9000"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME>
# (...)
```

Consulta el [traefik_mesh.d/conf.yaml de ejemplo][7] para ver todas las opciones disponibles de configuración.

### Recopilación de logs

_Disponible para las versiones >6.0 del Agent_

Los logs de Traefik Mesh pueden recopilarse de los diferentes pods de Traefik Mesh a través de Kubernetes. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][8].

Consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "traefik_mesh", "service": "<SERVICE_NAME>"}` |

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `traefik_mesh` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "traefik-mesh" >}}


### Eventos

La integración de Traefik Mesh no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "traefik-mesh" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].


[1]: https://traefik.io/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik-mesh/api/
[6]: https://docs.datadoghq.com/es/integrations/openmetrics/
[7]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/datadog_checks/traefik_mesh/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/traefik_mesh/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/