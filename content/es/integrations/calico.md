---
app_id: calico
app_uuid: 9e361f97-5332-4c86-8119-e1594b83841e
assets:
  dashboards:
    '[calico] dashboard overview': ./assets/dashboards/calico_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: calico.felix.active.local_endpoints
      metadata_path: metadata.csv
      prefix: calico.
    process_signatures:
    - calico-node
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10236
    source_type_name: Calico
  monitors:
    Dataplane is failing: assets/monitors/dataplane_failures.json
    IPset is failing: assets/monitors/ipset_error.json
    IPtables restore is failing: assets/monitors/iptables_restore_errors.json
    IPtables save is failing: assets/monitors/iptables_save_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- métricas
- la red
- seguridad
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/calico/README.md
display_on_public_website: true
draft: false
git_integration_title: calico
integration_id: calico
integration_title: calico
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: calico
public_title: calico
short_description: Calico es una solución de redes y seguridad en redes para contenedores.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Metrics
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Kubernetes
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Calico es una solución de redes y seguridad en redes para contenedores.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-calico-with-datadog/
  support: README.md#Support
  title: calico
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza a [Calico][1] a través del Datadog Agent.

El check de Calico envía métricas sobre la red y la seguridad en un clúster de Kubernetes establecido con Calico.

## Configuración

### Instalación

El check de Calico está incluido en el paquete del [Datadog Agent][2].

#### Instalación con un Agent basado en clústeres de Kubernetes

Uso de anotaciones:

1. Configura Calico en tu clúster.

2. Habilita las métricas de Prometheus siguiendo las instrucciones en [Monitorizar las métricas del componente de Calico][3].
   Una vez habilitado, deberías tener un servicio `felix-metrics-svc` funcionando en tu clúster, así como un `prometheus-pod`.

3. Para utilizar Autodiscovery, modifica `prometheus-pod`. Añade el siguiente fragmento a tu archivo de configuración YAML de Prometheus:

   ```
   metadata:
     [...]
     annotations:
      ad.datadoghq.com/prometheus-pod.check_names: |
      ["openmetrics"]
      ad.datadoghq.com/prometheus-pod.init_configs: |
      [{}]
      ad.datadoghq.com/prometheus-pod.instances: |
        [
           {
              "prometheus_url": "http://<FELIX-SERVICE-IP>:<FELIX-SERVICE-PORT>/metrics",
              "namespace": "calico",
              "metrics": ["*"]
           }
        ]
     spec:
       [....]
   ```

Puedes encontrar los valores de `<FELIX-SERVICE-IP>` y `<FELIX-SERVICE-PORT>` ejecutando `kubectl get all -all-namespaces`.

#### Instalación con un Agent basado en un sistema operativo

1. Sigue las instrucciones en [Monitorizar las métricas del componente de Calico][3] hasta que tengas un servicio `felix-metrics-svc` funcionando con `kubectl get all --all-namespaces`.

2. Si utilizas minikube, debes redirigir el puerto 9091 a `felix-metrics-svc`.
   Ejecuta `kubectl port-forward service/felix-metrics-svc 9091:9091 -n kube-system`.

   Si no estás utilizando minikube, comprueba que `felix-metrics-svc` tenga una IP externa. Si el servicio no tiene una IP externa, utiliza `kubectl edit svc` para cambiar su tipo de `ClusterIP` a `LoadBalancer`.


### Configuración

Sigue las instrucciones para configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta la sección [Contenedores](#containerized).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `calico.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Calico.
   El único parámetro obligatorio es la URL `openmetrics_endpoint`. Consulta el [calico.d/conf.yaml de ejemplo][1] para ver todas las opciones disponibles de configuración.

2. Si utilizas minikube, utiliza 'http://localhost:9091/métricas' como URL de `openmetrics_endpoint`.
   Si no utilizas minikube, utiliza `http://<FELIX-METRICS-SVC-EXTERNAL-IP>:<PORT>/metrics` como URL de `openmetrics_endpoint`.

3. [Reinicia el Agent][2].

##### Recopilación de métricas

1. La configuración predeterminada de tu archivo `calico.d/conf.yaml` activa la recopilación de tus [métricas de Calico](#metrics). Ve el [calico.d/conf.yaml de ejemplo][1] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][2].

##### Recopilación de logs

Dado que la estructura de Calico se configura en un clúster de Kubernetes, se crea con despliegues, pods y servicios. La integración de Kubernetes obtiene logs de los contenedores.

Después de configurar la integración de [Kubernetes][3], los logs de Calico estarán disponible en el Datadog Log Explorer.

La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

[1]: https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/kubernetes
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación. 

##### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `calico`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{openmetrics_endpoint: <OPENMETRICS_ENDPOINT>}`           |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "calico", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `calico` en la sección de Checks.

### Métricas
{{< get-metrics-from-git "calico" >}}


### Eventos

La integración de Calico no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "calico" >}}



## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Calico con Datadog][6]


[1]: https://www.tigera.io/project-calico/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.tigera.io/calico/3.25/operations/monitor/monitor-component-metrics
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/monitor-calico-with-datadog/