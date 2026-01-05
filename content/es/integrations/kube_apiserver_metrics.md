---
app_id: kube-apiserver-metrics
app_uuid: c5caf884-25c1-4a35-a72e-fa75e7cc10fc
assets:
  dashboards:
    Kubernetes API Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_apiserver.go_goroutines
      metadata_path: metadata.csv
      prefix: kube_apiserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10197
    source_type_name: Métricas del servidor de API Kubernetes
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- Kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Métricas del servidor de API Kubernetes
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: kube_apiserver_metrics
public_title: Métricas del servidor de API Kubernetes
short_description: 'Recopilación de métricas del servidor de API Kubernetes '
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopilación de métricas del servidor de API Kubernetes
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Métricas del servidor de API Kubernetes
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard del servidor de API Kubernetes][1]

## Información general

Este check monitoriza [Kube_apiserver_metrics][2].

## Configuración

### Instalación

El check Kube_apiserver_metrics está incluido en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

Si tus clústeres de Kubernetes tienen nodos maestros y se ejecuta un pod y un contenedor para la imagen `kube-apiserver`, el Datadog Agent [descubre de manera automática][4] este pod y configura la integración en relación con tu archivo `kube_apiserver_metrics.d/auto_conf.yaml`. 

Sin embargo, si usas una distribución de Kubernetes gestionada como GKE, EKS o AKS, es posible que no tengas un pod `kube-apiserver` en ejecución para que el Agent lo descubra. 

En este caso, puedes configurar la integración con el servicio `kubernetes` en el espacio de nombres `default`.

- El caso de uso principal para ejecutar el check `kube_apiserver_metrics` es como [check a nivel de clúster][5]. 
- Puedes hacer esto con [anotaciones en tu servicio](#annotate-service), o un [archivo local](#local-file) a través de Datadog Operator, Helm chart o de manera manual. 
- Para recopilar métricas, establece los siguientes parámetros y valores en una plantilla de [Autodiscovery][4]. 

| Parámetro         | Valor                                                                 |
|-------------------|-----------------------------------------------------------------------|
| `<INTEGRATION_NAME>`| `["kube_apiserver_metrics"]`                                            |
| `<INIT_CONFIG>`     | `[{}]`                                                                  |
| `<INSTANCE_CONFIG>` | `[{"prometheus_url": "https://%%host%%:%%port%%/metrics"}]` |

Puedes revisar todas las opciones de configuración disponibles en [kube_apiserver_metrics.yaml][6].

#### Servicio de anotaciones

Puedes anotar el servicio de Kubernetes en tu espacio de nombres `default` con lo siguiente:

{{< tabs >}}
{{% tab "Annotations v2 (for Datadog Agent v7.36)" %}}

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "kube_apiserver_metrics": {
      "instances": [
        {
          "prometheus_url": "https://%%host%%:%%port%%/metrics"
        }
      ]
    }
  }
```

{{% /tab %}}

{{% tab "Annotations v1 (for Datadog Agent < v7.36)" %}}

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics"}]'
```

{{% /tab %}}
{{< /tabs >}}

A continuación, el Datadog Cluster Agent programa el/los check(s) para cada endpoint en el/los Datadog Agent(s).

#### Archivo local

También puedes ejecutar el check al configurar los endpoints directamente en el archivo `kube_apiserver_metrics.yaml`, en la carpeta `conf.d/` de la raíz de tu [directorio de configuración del Agent][7] para enviarla como un [check de clúster][8].

**Nota**: Debes añadir `cluster_check: true` a tu archivo de configuración si usas un archivo local o ConfigMap para configurar los checks de clúster.

Proporciona una [configuración][9] a tu Cluster Agent para configurar un check de clúster:

{{< tabs >}}

{{% tab "Helm" %}}

```yaml
clusterAgent:
  confd:
    kube_apiserver_metrics.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "kubernetes"
            namespace: "default"
      cluster_check: true
      init_config:
      instances:
        - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{% tab "Operator" %}}

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          kube_apiserver_metrics.yaml: |-
            advanced_ad_identifiers:
              - kube_endpoints:
                  name: "kubernetes"
                  namespace: "default"
            cluster_check: true
            init_config:
            instances:
              - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{< /tabs >}}

Estas configuraciones hacen que el Agent realice una solicitud al servicio `kubernetes` en el espacio de nombres `default` en sus direcciones IP de endpoint y puerto definidos.

### Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `kube_apiserver_metrics` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### Checks de servicio

Kube_apiserver_metrics no incluye checks de servicios.

### Eventos

Kube_apiserver_metrics no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[6]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https:docs.datadoghq.com//containers/cluster_agent/clusterchecks/?tab=datadogoperator#setting-up-check-configurations
[9]: https://docs.datadoghq.com/es/containers/cluster_agent/clusterchecks/?tab=helm#configuration-from-configuration-files
[10]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#agent-status-and-information
[11]: https://docs.datadoghq.com/es/help/