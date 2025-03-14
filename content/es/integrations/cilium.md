---
app_id: cilium
app_uuid: 791bc8e8-1a70-465a-b423-709b6af4e6e5
assets:
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
    Cilium Overview v2: assets/dashboards/overview_v2.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cilium.endpoint.state
      metadata_path: metadata.csv
      prefix: cilium.
    process_signatures:
    - cilium-operator-generic
    - cilium-agent
    - cilium-health-responder
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10077
    source_type_name: Cilium
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- red
- seguridad
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cilium/README.md
display_on_public_website: true
draft: false
git_integration_title: cilium
integration_id: cilium
integration_title: Cilium
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: cilium
public_title: Cilium
short_description: Recopilar métricas del Agent por pod y métricas de operador de
  todo el clúster
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Containers
  - Category::Network
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Recopilar métricas del Agent por pod y métricas de operador de todo
    el clúster
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cilium
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Cilium][1] a través del Datadog Agent. La integración puede recopilar métricas de `cilium-agent` o `cilium-operator`.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cilium está incluido en el paquete del [Datadog Agent][3], pero requiere pasos de configuración adicionales para exponer las métricas de Prometheus.

Comenzando con la versión 1.10.0, esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: true) y un modo heredado (`use_openmetrics`: false). Para obtener todas las funciones más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics][4].

1. Para habilitar las métricas de Prometheus tanto en `cilium-agent` como en `cilium-operator`, despliega Cilium con los siguientes valores de Helm establecidos según tu versión de Cilium:
   * Versiones de Cilium anteriores a 1.8.x:
     `global.prometheus.enabled=true`
   * Versiones de Cilium 1.8.x o posteriores y anteriores a 1.9.x:
     `global.prometheus.enabled=true` y `global.operatorPrometheus.enabled=true`
   * Versiones de Cilium 1.9.x o posteriores:
     `prometheus.enabled=true` y `operator.prometheus.enabled=true`

O bien, habilita métricas de Prometheus por separado en los manifiestos de Kubernetes:
<div class="alert alert-warning">Para versiones de <a href="https://docs.cilium.io/en/v1.12/operations/upgrade/#id2">Cilium 1.11 o anteriores</a>, usa <code>--prometheus-serve-addr=:9090</code>.</a></div>

   - En `cilium-agent`, añade `--prometheus-serve-addr=:9962` a la sección `args` de la configuración de DaemonSet de Cilium:

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --prometheus-serve-addr=:9962
     ```

   - En `cilium-operator`, añade `--enable-metrics` a la sección  `args` de la configuración de despliegue de Cilium:

      ```yaml
      # [...]
      spec:
        containers:
          - args:
              - --enable-metrics
      ```

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:
1. Edita el archivo `cilium.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Cilium. Para conocer todas las opciones de configuración disponibles, consulta el [cilium.d/conf.yaml de ejemplo][1].

   - Para recopilar métricas `cilium-agent`, habilita la opción `agent_endpoint`.
   - Para recopilar métricas `cilium-operator`, habilita la opción `operator_endpoint`.

    ```yaml  
        instances:

            ## @param use_openmetrics - boolean - optional - default: false
            ## Use the latest OpenMetrics implementation for more features and better performance.
            ##
            ## Note: To see the configuration options for the legacy OpenMetrics implementation (Agent 7.33 or older),
            ## see https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
            #
          - use_openmetrics: true # Enables OpenMetrics latest mode

            ## @param agent_endpoint - string - optional
            ## The URL where your application metrics are exposed by Prometheus.
            ## By default, the Cilium integration collects `cilium-agent` metrics.
            ## One of agent_endpoint or operator_endpoint must be provided.
            #
            agent_endpoint: http://localhost:9090/metrics

            ## @param operator_endpoint - string - optional
            ## Provide instead of `agent_endpoint` to collect `cilium-operator` metrics.
            ## Cilium operator metrics are exposed on port 6942.
            #
            operator_endpoint: http://localhost:6942/metrics
   ```

2. [Reinicia el Agent][2].

##### Recopilación de logs

Cilium contiene dos tipos de logs: `cilium-agent` y `cilium-operator`.

1. La recopilación de Logs se encuentra deshabilitada por defecto en el Datadog Agent. Habilítala en tu [configuración de DaemonSet][1]:

   ```yaml
     # (...)
       env:
       #  (...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     # (...)
   ```

2. Monta el socket de Docker en el Datadog Agent a través del manifiesto o monta el directorio `/var/log/pods` si no estás usando Docker. Para ver ejemplos de manifiestos, consulta las [Instrucciones de instalación de Kubernetes para DaemonSet][3].

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=daemonset#installation
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

##### Para recopilar métricas `cilium-agent` y logs:

- Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics", "use_openmetrics": "true"}` |

- Recopilación de logs

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

##### Para recopilar métricas `cilium-operator` y logs:

- Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"operator_endpoint": "http://%%host%%:6942/metrics", "use_openmetrics": "true"}` |

- Recopilación de logs

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-operator", "service": "cilium-operator"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `cilium` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cilium" >}}


### Eventos

La integración Cilium no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "cilium" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: https://cilium.io
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadohgq.com/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/