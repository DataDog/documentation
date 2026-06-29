---
app_id: traffic-server
app_uuid: aaf78f60-10de-453c-b2d8-dc44818720c9
assets:
  dashboards:
    Traffic Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: traffic_server.node.restarts.proxy.restart_count
      metadata_path: metadata.csv
      prefix: traffic_server.
    process_signatures:
    - traffic_cop
    - traffic_manager
    - traffic_server
    - inicio de trafficserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10259
    source_type_name: Traffic Server
  monitors:
    4xx errors number is high: assets/monitors/4xx.json
    5xx errors number is high: assets/monitors/5xx.json
  saved_views:
    traffic_server_error_logs: assets/saved_views/traffic_server_error_logs.json
    traffic_server_overview: assets/saved_views/traffic_server_overview.json
    traffic_server_patterns: assets/saved_views/traffic_server_error_patterns.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/traffic_server/README.md
display_on_public_website: true
draft: false
git_integration_title: traffic_server
integration_id: traffic-server
integration_title: Traffic Server
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: traffic_server
public_title: Traffic Server
short_description: Monitorizar las métricas de conexión, caché y DNS
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar las métricas de conexión, caché y DNS
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traffic Server
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el [Traffic Server][1] a través del Datadog Agent.

Habilita la integración de Datadog y Apache Traffic Server para:

- Garantizar la disponibilidad y el rendimiento de los recursos en línea, como sitios web y aplicaciones.
- Rastrear métricas como visitas, volumen y cambios en el tráfico a sitios web y aplicaciones.
- Determinar los tiempos y tamaños medios de respuesta de las solicitudes.
- Monitorizar los logs de sistema y error.


## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Traffic Server está incluido en el paquete del [Datadog Agent][3].

Para habilitar la monitorización en Traffic Server, habilita el [complemento Stats Over HTTP][4] en tu Traffic Server añadiendo la siguiente línea a tu archivo `plugin.config` y recargando Traffic Server:

```
stats_over_http.so
```

### Configuración

1. Edita el archivo `traffic_server.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de la configuración de directorio de tu Agent para empezar a recopilar tus datos de rendimiento de Traffic Server. Consulta el [traffic_server.d/conf.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración.

**Nota**: Cuando se utiliza el [archivo de configuración][5] por defecto, no se recopilan todas las métricas por defecto.

Comenta la opción `metric_patterns` para recopilar todas las métricas disponible, o edítala para recopilar un subconjunto diferente de métricas:

```
    ## @param metric_patterns - mapping - optional
    ## A mapping of metrics to include or exclude, with each entry being a regular expression.
    ##
    ## Metrics defined in `exclude` will take precedence in case of overlap.
    ## Comment out this option to collect all available metrics.
    #
    metric_patterns:
      include:
         - <METRIC_1>
         - <METRIC_2>
```

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `traffic_server` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "traffic-server" >}}


### Recopilación de logs

_Disponible para versiones >6.0 del Agent_

1. Los logs de Traffic Server son altamente [personalizables][9], pero el pipeline de integración de Datadog admite el patrón de conversión por defecto. Clona y edita el [pipeline de integración][10] si tienes un formato diferente.

2. La recopilación de logs está desactivada por defecto en el Datadog Agent . Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Anula los comentarios y edita el bloque de configuración de logs en tu archivo `traffic_server.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [traffic_server.d/.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración.

   ```yaml
   logs:
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/traffic.out
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/diags.log
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/error.log
        source: traffic_server
   ```

### Eventos

La integración de Traffic Server no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "traffic-server" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].


[1]: https://trafficserver.apache.org/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.trafficserver.apache.org/en/latest/admin-guide/monitoring/statistics/accessing.en.html#stats-over-http
[5]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/datadog_checks/traffic_server/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/metadata.csv
[9]: https://docs.trafficserver.apache.org/en/9.1.x/admin-guide/logging/understanding.en.html
[10]: https://docs.datadoghq.com/es/logs/processing/#integration-pipelines
[11]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/