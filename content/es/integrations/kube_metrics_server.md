---
app_id: kube-metrics-server
app_uuid: df9c9e3c-368a-4472-b0cb-b32f1066a2f5
assets:
  dashboards:
    Kubernetes Metrics Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_metrics_server.process.open_fds
      metadata_path: metadata.csv
      prefix: kube_metrics_server.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10061
    source_type_name: Servidor de métricas Kube
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_metrics_server
integration_id: kube-metrics-server
integration_title: Servidor de métricas Kubernetes
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: kube_metrics_server
public_title: Servidor de métricas Kubernetes
short_description: Monitorización del servidor de métricas Kubernetes
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización del servidor de métricas Kubernetes
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Servidor de métricas Kubernetes
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Kube_metrics_server][1] v0.3.0+, un componente utilizado por el plano de control de Kubernetes.

## Configuración

### Instalación

El check de Kube_metrics_server está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `kube_metrics_server.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de kube_metrics_server. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kube_metrics_server.d/conf.yaml][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kube_metrics_server `                                         |
| `<INIT_CONFIG>`      | en blanco o `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### SSL

Si tu endpoint es seguro, se requiere una configuración adicional:

1. Identifica el certificado utilizado para proteger la métrica del endpoint.

2. Monta el archivo del certificado relacionado en el pod del Agent.

3. Aplica tu configuración SSL. Para obtener más información, consulta el [archivo de configuración predeterminado][3].

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `kube_metrics_server` en la sección Checks:

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kube_metrics_server" >}}


### Eventos

kube_metrics_server no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "kube_metrics_server" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].



[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/