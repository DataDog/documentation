---
app_id: kubevirt-handler
app_uuid: 751006a9-b87a-4f54-acc5-2886ec49073e
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_handler.can_connect
      - kubevirt_handler.vmi.cpu_system_usage_seconds.count
      metadata_path: metadata.csv
      prefix: kubevirt_handler.
    process_signatures:
    - virt-handler
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22778164
    source_type_name: KubeVirt Handler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_handler
integration_id: kubevirt-handler
integration_title: KubeVirt Handler
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_handler
public_title: KubeVirt Handler
short_description: Recopila métricas clave para monitorizar el estado de los daemons
  de tu KubeVirt Handler.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Categoría::Kubernetes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Recopila métricas clave para monitorizar el estado de los daemons de
    tu KubeVirt Handler.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: KubeVirt Handler
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


<div class="alert alert-danger">
Esta integración se encuentra en fase beta pública y debe activarse en cargas de trabajo de producción con precaución.
</div>

## Información general

Este check monitoriza [KubeVirt Handler]][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check KubeVirt Handler está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en su servidor.

### Configuración

1. Edita el archivo `kubevirt_handler.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de kubevirt_handler. Para ver todas las opciones de configuración disponibles, consulta el [kubevirt_handler.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `kubevirt_handler` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kubevirt-handler" >}}


### Eventos

La integración KubeVirt Handler no incluye eventos.

### Checks de servicio

La integración KubeVirt Handler no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://docs.datadoghq.com/es/integrations/kubevirt_handler
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/datadog_checks/kubevirt_handler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/metadata.csv
[8]: https://docs.datadoghq.com/es/help/