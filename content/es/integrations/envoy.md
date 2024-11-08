---
app_id: envoy
app_uuid: 49dc62d7-7e0c-4c46-b90f-dfd4d5c35d53
assets:
  dashboards:
    Envoy - Overview: assets/dashboards/envoy_overview.json
    Envoy Openmetrics Overview: assets/dashboards/openmetrics_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: envoy.server.uptime
      metadata_path: metadata.csv
      prefix: envoy.
    process_signatures:
    - envoy
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10012
    source_type_name: Envoy
  monitors:
    Envoy instance disconnected from control plane: assets/monitors/connected_state.json
  saved_views:
    envoy_4xx: assets/saved_views/envoy_4xx.json
    envoy_5xx: assets/saved_views/envoy_5xx.json
    envoy_error_grouped: assets/saved_views/envoy_error_grouped.json
    envoy_overview: assets/saved_views/envoy_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/envoy/README.md
display_on_public_website: true
draft: false
git_integration_title: envoy
integration_id: envoy
integration_title: Envoy
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: envoy
public_title: Envoy
short_description: Envoy es un borde de código abierto y servicio proxy
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Nube
  - Category::Recopilación de logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Red
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integración
  configuration: README.md#Configuración
  description: Envoy es un borde de código abierto y servicio proxy
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Envoy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check recopila métricas de observabilidad de sistemas distribuidos de [Envoy][1].

## Configuración

### Instalación

El check de Envoy está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

#### Istio

Si utilizas Envoy como parte de [Istio][3], configura la integración Envoy para recopilar métricas del endpoint de métricas del proxy Istio.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### Standard (Estándar)

Existen dos maneras de configurar el endpoint `/stats`:

##### Endpoint de estadísticas no seguro

He aquí un ejemplo de configuración de un administrador Envoy:

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### Endpoint de estadísticas seguro

Crea un agente de escucha/vhost dirigido al [endpoint de administrador][4] (Envoy conectándose a sí mismo), pero que sólo tenga una ruta para `/stats` (todas las demás rutas obtienen una respuesta estática/de error). Además, esto permite una buena integración con filtros L3 para la autenticación, por ejemplo.

Este es un ejemplo de configuración de [envoy_secured_stats_config.json][5]:

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `envoy.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu Envoy. Para conocer todas las opciones de configuración disponibles, consulta el [envoy.d/conf.yaml de ejemplo][2].

    ```yaml
    init_config:

    instances:
        ## @param openmetrics_endpoint - string - required
        ## The URL exposing metrics in the OpenMetrics format.
        #
      - openmetrics_endpoint: http://localhost:8001/stats/prometheus

    ```

2. Comprueba si el Datadog Agent puede acceder al [endpoint de administrador][3] de Envoy.
3. [Reinicia el Agent][4].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Luego, edita `envoy.d/conf.yaml` y descomenta las líneas `logs` de la parte inferior. Actualiza la `path` de los logs con la ruta correcta a tus archivos de logs de Envoy.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

3. [Reinicia el Agent][4].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[3]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                       |
| -------------------- | ------------------------------------------- |
| `<INTEGRATION_NAME>` | `envoy`                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
**Nota**: La versión actual del check (v1.26.0 o posterior) utiliza [OpenMetrics][2] para la recopilación de métricas, que requiere Python 3. Para hosts que no puedan utilizar Python 3, o para utilizar una versión legacy de este check, consulta la siguiente [configuración][3].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][4].

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/integrations/openmetrics/
[3]: https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `envoy` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "envoy" >}}


Consulta [métricas.py][7], para ver una lista de las etiquetas (tags) enviadas por cada métrica.

### Eventos

El check de Envoy no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "envoy" >}}


## Solucionar problemas

### Problemas comunes

#### Endpoint `/server_info` inalcanzable
- Para minimizar los logs con errores, desactiva la opción `collect_server_info` en tu configuración de Envoy, si el endpoint no está disponible en tu entorno Envoy.

**Nota**: No se recopilan datos de la versión de Envoy.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[8]: https://docs.datadoghq.com/es/help/