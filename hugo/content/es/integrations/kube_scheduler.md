---
app_id: kube-scheduler
app_uuid: 1cf58691-ac6b-4f1d-b410-0132a4590378
assets:
  dashboards:
    kube_scheduler: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_scheduler.threads
      metadata_path: metadata.csv
      prefix: kube_scheduler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10056
    source_type_name: Kube_scheduler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
- recopilación de logs
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_scheduler
integration_id: kube-scheduler
integration_title: Programador Kubernetes
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: kube_scheduler
public_title: Programador Kubernetes
short_description: Monitorización del Programador Kubernetes
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Recopilación de logs
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización del Programador Kubernetes
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Programador Kubernetes
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


![Dashboard del Programador Kube][1]

## Información general

Este check monitoriza el [Programador Kubernetes ][2], parte del plano de control de Kubernetes.

**Nota**: Este check no recopila datos de clústeres Amazon EKS, ya que esos servicios no están expuestos.

## Configuración

### Instalación

El check del Programador Kubernetes está incluido en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

Consulta las [plantillas de integración de Autodiscovery][4] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

1. Edita el archivo `kube_scheduler.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de kube_scheduler. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kube_scheduler.d/conf.yaml][5].

2. [Reinicia el Agent][6].

#### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][7].

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<SERVICE_NAME>"}` |

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `kube_scheduler` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kube_scheduler" >}}


### Eventos

El Programador Kube no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "kube_scheduler" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/