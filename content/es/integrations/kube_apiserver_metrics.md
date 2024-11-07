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
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Métricas del servidor de API Kubernetes
integration_version: 4.3.1
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

El principal caso de uso de ejecución del check kube_apiserver_metrics es el de check a nivel de clúster.
Consulta la documentación de los [checks a nivel de clúster][4].
Puedes anotar el servicio de tu apiserver con lo siguiente:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

A continuación, el Datadog Cluster Agent programa el/los check(s) para cada endpoint en el/los Datadog Agent(s).

También puedes ejecutar el check configurando los endpoints directamente en el archivo `kube_apiserver_metrics.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del [directorio de configuración de tu Agent][5].
Cuando utilices un archivo de configuración estático o ConfigMap para configurar checks de clúster, debes añadir `cluster_check: true` a tu [archivo de configuración][6]. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kube_apiserver_metrics.d/conf.yaml][7].

Por defecto, el Agent que ejecuta el check intenta obtener el token del poseedor de la cuenta de servicio para autenticarse en el APIServer. Si no utilizas RBAC, configura `bearer_token_auth` como `false`.

Por último, si ejecutas el Datadog Agent en los nodos principales, puedes confiar en [Autodiscovery][8] para programar el check. Esto sucede automáticamente, si estás ejecutando la imagen oficial `registry.k8s.io/kube-apiserver`.

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `kube_apiserver_metrics` en la sección Checks:

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### Checks de servicio

Kube_apiserver_metrics no incluye checks de servicios.

### Eventos

Kube_apiserver_metrics no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/#set-up-cluster-checks
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[11]: https://docs.datadoghq.com/es/help/