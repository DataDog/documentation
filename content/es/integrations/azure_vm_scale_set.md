---
categories:
- azure
- cloud
- configuration & deployment
- log collection
custom_kind: integración
dependencies: []
description: 'Rastrea métricas por conjunto: bytes de entrada/salida, operaciones
  de disco, uso de CPU y más.'
doc_link: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
draft: false
git_integration_title: azure_vm_scale_set
has_logo: true
integration_id: azure-vm-scale-set
integration_title: Microsoft Azure VM Scale Set
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_vm_scale_set
public_title: Integración de Datadog y Microsoft Azure VM Scale Set
short_description: Rastrea por conjunto bytes de entrada/salida, operaciones de disco,
  uso de CPU y más.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="azure vm scale set dashboard" popup="true">}}

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
{{< get-metrics-from-git "azure-vm-scale-set" >}}


### Events (Eventos)

La integración Azure Virtual Machine Scale Set no incluye eventos.

### Service Checks (Checks de servicio)

La integración Azure Virtual Machine Scale Set no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/es/integrations/win32_event_log/#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm_scale_set/azure_vm_scale_set_metadata.csv
[7]: https://docs.datadoghq.com/es/help/