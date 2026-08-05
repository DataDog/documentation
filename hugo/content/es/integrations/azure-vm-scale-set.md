---
aliases:
- /es/integrations/azure_vm_scale_set
app_id: azure-vm-scale-set
categories:
- azure
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
description: Los conjuntos de escalado de máquinas virtuales son un recurso de Azure
  para desplegar, gestionar y autoescalar un grupo de máquinas virtuales idénticas.
media: []
title: Azure VM Scale Set
---
{{< img src="integrations/azure_vm_scale_set/azure_vm_scale_set_dashboard.png" alt="dashboard de conjuntos escalados máquinas virtuales de azure" popup="true">}}

## Información general

Los conjuntos de escalado de máquinas virtuales son un recurso de Azure Compute que se utiliza para desplegar, gestionar y escalar automáticamente un conjunto de VM idénticas.

Obtén métricas de Azure Virtual Machine Scale Set para:

- Visualizar el rendimiento de tus Virtual Machine Scale Sets.
- Correlacionar el rendimiento de tus Virtual Machine Scale Sets con el de tus aplicaciones.

## Configuración

### Instalación

Las métricas de integración se incluyen como parte de la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). Para recopilar métricas con el Datadog Agent, siga las instrucciones para desplegar Agents:

- Si tu organización está en el sitio US3 de Datadog y has configurado el recurso de Datadog en Azure, utiliza las instrucciones de la [Guía de configuración manual para la integración nativa de Azure](https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent).
- **Todos los sitios** pueden utilizar las instrucciones de la [Guía de configuración manual para la integración nativa de Azure](https://docs.datadoghq.com/integrations/guide/azure-manual-setup/#agent-installation) o la [Guía de gestión con programación de Azure](https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension).

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

Para obtener más detalles, consulta la información del [log de eventos de Win 32](https://docs.datadoghq.com/integrations/win32_event_log/#log-collection).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.compute_virtualmachinescalesets.available_memory_bytes** <br>(gauge) | Cantidad de memoria física, en bytes<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.cpu_credits_consumed** <br>(count) | Número total de créditos consumidos por la máquina virtual|
| **azure.compute_virtualmachinescalesets.cpu_credits_remaining** <br>(count) | Número total de créditos disponibles para la ráfaga|
| **azure.compute_virtualmachinescalesets.data_disk_qd_deprecated** <br>(count) | Profundidad de la cola del disco de datos (o longitud de la cola)|
| **azure.compute_virtualmachinescalesets.data_disk_queue_depth_preview** <br>(count) | Profundidad de la cola del disco de datos (o longitud de la cola)|
| **azure.compute_virtualmachinescalesets.data_disk_read_bytes_sec_deprecated** <br>(count) | Bytes/segundo leídos de un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.data_disk_read_bytes_sec_preview** <br>(count) | Bytes/segundo leídos de un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.data_disk_read_operations_sec_deprecated** <br>(count) | IOPS de lectura de un solo disco durante el periodo de monitorización<br>_Mostrado como lectura_ |
| **azure.compute_virtualmachinescalesets.data_disk_read_operations_sec_preview** <br>(count) | IOPS de lectura de un solo disco durante el periodo de monitorización<br>_Mostrado como lectura_ |
| **azure.compute_virtualmachinescalesets.data_disk_write_bytes_sec_deprecated** <br>(count) | Bytes/segundo escritos en un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.data_disk_write_bytes_sec_preview** <br>(count) | Bytes/segundo escritos en un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.data_disk_write_operations_sec_deprecated** <br>(count) | IOPS de escritura de un solo disco durante el periodo de monitorización<br>_Mostrado como escritura_ |
| **azure.compute_virtualmachinescalesets.data_disk_write_operations_sec_preview** <br>(count) | IOPS de escritura de un solo disco durante el periodo de monitorización<br>_Mostrado como escritura_ |
| **azure.compute_virtualmachinescalesets.disk_read_bytes** <br>(gauge) | Bytes leídos del disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.disk_read_operations_sec** <br>(gauge) | IOPS de lectura de disco<br>_Mostrado como lectura_ |
| **azure.compute_virtualmachinescalesets.disk_write_bytes** <br>(gauge) | Bytes escritos en disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.disk_write_operations_sec** <br>(gauge) | IOPS de escritura de disco<br>_Mostrado como escritura_ |
| **azure.compute_virtualmachinescalesets.inbound_flows** <br>(count) | Flujos de entrada: número de flujos actuales en la dirección de entrada (tráfico que entra en la máquina virtual).|
| **azure.compute_virtualmachinescalesets.inbound_flows_maximum_creation_rate** <br>(count) | La tasa máxima de creación de flujos entrantes (tráfico que entra en la máquina virtual)<br>_Mostrado como elemento_ |
| **azure.compute_virtualmachinescalesets.network_in** <br>(gauge) | Número de bytes facturables recibidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico entrante)<br>_Mostrado como byte_. |
| **azure.compute_virtualmachinescalesets.network_in_total** <br>(gauge) | Número de bytes recibidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico entrante)<br>_Mostrado como byte_. |
| **azure.compute_virtualmachinescalesets.network_out** <br>(gauge) | Número de bytes facturables emitidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico saliente)<br>_Mostrado como byte_. |
| **azure.compute_virtualmachinescalesets.network_out_total** <br>(gauge) | Número de bytes emitidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico saliente)<br>_Mostrado como byte_. |
| **azure.compute_virtualmachinescalesets.os_disk_qd_deprecated** <br>(count) | Profundidad de la cola del disco del sistema operativo (o longitud de la cola)|
| **azure.compute_virtualmachinescalesets.os_disk_queue_depth_preview** <br>(count) | Profundidad de la cola del disco del sistema operativo (o longitud de la cola)|
| **azure.compute_virtualmachinescalesets.os_disk_read_bytes_sec_deprecated** <br>(count) | Bytes/segundo leídos de un solo disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.os_disk_read_bytes_sec_preview** <br>(count) | Bytes/segundo leídos de un solo disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.os_disk_read_operations_sec_deprecated** <br>(count) | IOPS de lectura de un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como lectura_. |
| **azure.compute_virtualmachinescalesets.os_disk_read_operations_sec_preview** <br>(count) | IOPS de lectura de un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como lectura_. |
| **azure.compute_virtualmachinescalesets.os_disk_write_bytes_sec_deprecated** <br>(count) | Bytes/segundo escritos en un solo disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.os_disk_write_bytes_sec_preview** <br>(count) | Bytes/segundo escritos en un solo disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.compute_virtualmachinescalesets.os_disk_write_operations_sec_deprecated** <br>(count) | IOPS de escritura desde un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como escritura_. |
| **azure.compute_virtualmachinescalesets.os_disk_write_operations_sec_preview** <br>(count) | IOPS de escritura desde un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como escritura_. |
| **azure.compute_virtualmachinescalesets.outbound_flows** <br>(count) | Flujos de salida es el número de flujos actuales en la dirección de salida (tráfico que sale de la máquina virtual).|
| **azure.compute_virtualmachinescalesets.outbound_flows_maximum_creation_rate** <br>(count) | La tasa máxima de creación de flujos de salida (tráfico que sale de la máquina virtual)<br>_Mostrado como elemento_. |
| **azure.compute_virtualmachinescalesets.percentage_cpu** <br>(gauge) | Porcentaje de unidades de cálculo asignadas que se están utilizando actualmente por la(s) máquina(s) virtual(es)<br>_Mostrado en porcentaje_. |
| **azure.compute_virtualmachinescalesets.premium_data_disk_cache_read_hit_preview** <br>(gauge) | Acierto de lectura de la caché de disco de datos premium<br>_Mostrado como porcentaje_. |
| **azure.compute_virtualmachinescalesets.premium_data_disk_cache_read_miss_preview** <br>(gauge) | Fallo de lectura de la caché de disco de datos premium<br>_Mostrado como porcentaje_. |
| **azure.compute_virtualmachinescalesets.premium_os_disk_cache_read_hit_preview** <br>(gauge) | Acierto de lectura de la caché de disco del sistema operativo premium<br>_Mostrado como porcentaje_. |
| **azure.compute_virtualmachinescalesets.premium_os_disk_cache_read_miss_preview** <br>(gauge) | Fallo de lectura de la caché de disco del sistema operativo premium<br>_Mostrado como porcentaje_. |
| **azure.compute_virtualmachinescalesets.vm_count** <br>(count) | Count de máquinas virtuales|

### Eventos

La integración Azure Virtual Machine Scale Set no incluye eventos.

### Checks de servicio

La integración Azure Virtual Machine Scale Set no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).