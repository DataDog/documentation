---
app_id: kube-controller-manager
app_uuid: 25d4ccd6-de50-4ef0-849f-b7ab1aea203e
assets:
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_controller_manager.threads
      metadata_path: metadata.csv
      prefix: kube_controller_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10055
    source_type_name: Kubernetes Controller Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- Kubernetes
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_controller_manager
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
integration_version: 7.1.0
is_public: true
manifest_version: 2.0.0
name: kube_controller_manager
public_title: Kubernetes Controller Manager
short_description: Monitorización del Kubernetes Controller Manager
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
  description: Monitorización del Kubernetes Controller Manager
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kubernetes Controller Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard del Kube Controller Manager][1]

## Información general

Este check monitoriza el [Kubernetes Controller Manager][2], parte del plano de control de Kubernetes.

**Nota**: Este check no recopila datos de clústeres Amazon EKS, ya que esos servicios no están expuestos.

## Configuración

### Instalación

El check del Kubernetes Controller Manager está incluido en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

1. Edita el archivo `kube_controller_manager.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de kube_controller_manager. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kube_controller_manager.d/conf.yaml][4].

2. [Reinicia el Agent][5]

Esta integración requiere acceso al endpoint de la métrica del Controller Manager. Para tener acceso al endpoint de la métrica debes:

* tener acceso a la dirección IP/al puerto del proceso del controller-manager
* tener permisos RBAC para el endpoint de las métricas (el Helm chart por defecto de Datadog ya añade los roles y los bindings RBAC correctos)

### Validación

[Ejecuta el subcomando `status` del Agent][6] y busca `kube_controller_manager` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kube-controller-manager" >}}


### Eventos

El check del Kubernetes Controller Manager no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "kube-controller-manager" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/