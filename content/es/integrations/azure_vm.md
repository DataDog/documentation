---
app_id: azure-vm
app_uuid: 2bcae6e7-13df-45c2-8085-ae9fc5ba0b09
assets:
  dashboards:
    azure_vm: assets/dashboards/azure_vm.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.vm.percentage_cpu
      metadata_path: metadata.csv
      prefix: azure.vm
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 139
    source_type_name: Azure VM
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- configuration & deployment
- os & system
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_vm
integration_id: azure-vm
integration_title: Azure VM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_vm
public_title: Azure VM
short_description: Microsoft Azure VM es un servicio que te permite crear máquinas
  virtuales Linux y Windows en minutos
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Nube
  - Category::Configuración y despliegue
  - Category::Sistema operativo y sistema
  - Offering::Integración
  configuration: README.md#Configuración
  description: Microsoft Azure VM es un servicio que te permite crear máquinas virtuales
    Linux y Windows en minutos
  media:
  - caption: Dashboard de información general de Azure VM
    image_url: images/1_azure_vm_overview_dashboard.png
    media_type: imagen
  - caption: Plantilla de monitorización del estado de Azure VM
    image_url: images/2_azure_vm_health_monitor_template.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/azure
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog
  - resource_type: blog
    url: https://www.datadoghq.com/blog/dash-2024-new-feature-roundup-infrastructure
  support: README.md#Support
  title: Azure VM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Virtual Machine te permite ejecutar de forma flexible entornos virtualizados con la capacidad de escalar bajo demanda.

Obtén métricas de Azure VM para:

- Visualizar el rendimiento de tus VM.
- Correlacionar el rendimiento de tus VM con tus aplicaciones.

## Configuración

### Instalación

Si todavía no lo hiciste, configura primero la [integración de Microsoft Azure][1].

En el caso de las máquinas virtuales desplegadas con **ARM**, debes activar los diagnósticos y seleccionar las métricas de la VM que deseas recopilar. Consulta [Habilitar diagnósticos][2] para obtener instrucciones.

### Silenciamiento automático de monitores

Datadog puede silenciar de forma proactiva los monitores relacionados con el apagado o la finalización de las VM de Azure, ya sea que el apagado se haya activado de forma manual o mediante el escalado automático de Azure, en función de los estados de mantenimiento disponibles a través de la [API de estado de recursos de Azure][3]. Al silenciar los monitores para los apagados esperados de las VM de Azure, puedes reducir el ruido de las alertas innecesarias.

Las máquinas virtuales silenciadas automáticamente aparecen en la página [Gestionar la caída del sistema][4] al habilitar **Show automatically muted hosts**. La integración de Azure debe estar instalada para que el silenciamiento automático surta efecto.

Para silenciar los monitores en VM de Azure apagadas o finalizadas, marca la casilla **Azure automuting** en el cuadro de integración de Azure.

Para crear monitores de métricas que se puedan silenciar automáticamente, asegúrate de activarlos en función de la etiqueta (tag) `host`. Los monitores de métricas que no incluyen la etiqueta `host` en el grupo monitorizado no se silencian automáticamente.

![Una alerta de monitor en una consulta que incluye etiqueta de host][5]

**Nota:** Si no estás ejecutando el Datadog Agent, la etiqueta `host` en su VM de Azure es un GUID. Usa la variable de plantilla de mensaje `{{host.name_tag}}` en la respuesta de notificación para incluir también el nombre legible para humanos.

## Datos recopilados

<div class="alert alert-danger">La métrica <code>azure.vm.status</code> está obsoleta y no se completa para organizaciones de Datadog recientemente creadas. Para los usuarios existentes, esta métrica se desactivó el 1 de junio de 2023. Usa la métrica <code>azure.vm.count</code> y sus valores de etiqueta <code>estado</code> asociados para determinar el estado de tus máquinas virtuales.

Para cualquier pregunta, contacta con el <a href="https://docs.datadoghq.com/help/" target="_blank">soporte de Datadog</a>.</div>

### Métricas
{{< get-metrics-from-git "azure_vm" >}}


### Eventos

La integración Azure Virtual Machine no incluye eventos.

### Checks de servicio

La integración Azure Virtual Machine no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Referencias adicionales

- [Cómo monitorizar máquinas virtuales de Microsoft Azure][8]
- [Cómo recopilar métricas de Azure][9]
- [Monitorizar máquinas virtuales de Azure mediante Datadog][10]
- [Estrategiza tu migración de Azure para cargas de trabajo SQL con Datadog][11]

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors/downtimes
[5]: images/azure_vm_automute2.png
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[7]: https://docs.datadoghq.com/es/help/
[8]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[9]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[10]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[11]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/