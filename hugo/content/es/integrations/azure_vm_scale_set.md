---
app_id: azure-vm-scale-set
app_uuid: f3caa324-4c3d-4734-b902-9df396b28144
assets:
  dashboards:
    azure_vm_scale_set: assets/dashboards/azure_vm_scale_set.json
  integration:
    auto_install: verdadero
    events:
      creates_events: false
    metrics:
      check: azure.compute_virtualmachinescalesets.network_in
      metadata_path: metadata.csv
      prefix: azure.compute_virtualmachinescalesets
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 180
    source_type_name: Azure VM Scale Set
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- configuration & deployment
- log collection
custom_kind: integración
dependencies: []
display_on_public_website: verdadero
draft: falso
git_integration_title: azure_vm_scale_set
integration_id: azure-vm-scale-set
integration_title: Azure VM Scale Set
integration_version: ''
is_public: verdadero
manifest_version: 2.0.0
name: azure_vm_scale_set
public_title: Azure VM Scale Set
short_description: Los conjuntos de escala de máquinas virtuales son un recurso de
  Azure para desplegar, gestionar y escalar automáticamente un grupo de máquinas virtuales
  idénticas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Configuración y despliegue
  - Category::Recopilación de logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Los conjuntos de escala de máquinas virtuales son un recurso de Azure
    para desplegar, gestionar y escalar automáticamente un grupo de máquinas virtuales
    idénticas.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure VM Scale Set
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="dashboard de azure vm scale set" popup="true">}}

## Información general

Los conjuntos de escalado de máquinas virtuales son un recurso de Azure Compute que se utiliza para desplegar, gestionar y escalar automáticamente un conjunto de VM idénticas.

Obtén métricas de Azure Virtual Machine Scale Set para:

- Visualizar el rendimiento de tus Virtual Machine Scale Sets.
- Correlacionar el rendimiento de tus Virtual Machine Scale Sets con el de tus aplicaciones.

## Configuración

### Instalación

Las métricas de integración se incluyen como parte de la [integración de Microsoft Azure][1]. Para recopilar métricas con el Datadog Agent, sigue las instrucciones para desplegar Agents:

- Si tu organización está en el sitio US3 de Datadog y has configurado el recurso Datadog en Azure, usa las instrucciones de la [Guía de configuración manual de la integración nativa de Azure][2].
- **Todos los sitios** pueden utilizar las instrucciones de la [Guía de configuración manual de la integración de Azure][3] o la [Guía de gestión programática de Azure][4].

### Recopilación de logs

Para recopilar logs de eventos específicos de Windows, añade canales al archivo `conf.d/win32_event_log.d/conf.yaml` manualmente o mediante el Datadog Agent Manager. Por ejemplo:

```yaml
logs:
  - type: windows_event
    channel_path: '<CHANNEL_1>'
    source: '<CHANNEL_1>'
    service: myservice
    sourcecategory: windowsevent
   - type: windows_event
    channel_path: '<CHANNEL_2>'
    source: '<CHANNEL_2>'
    service: myservice
    sourcecategory: windowsevent
```

Para obtener detalles adicionales, consulta la información sobre la integración del [log de eventos de Win 32][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_vm_scale_set" >}}


### Eventos

La integración Azure Virtual Machine Scale Set no incluye eventos.

### Checks de servicio

La integración Azure Virtual Machine Scale Set no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/es/integrations/win32_event_log/#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[7]: https://docs.datadoghq.com/es/help/