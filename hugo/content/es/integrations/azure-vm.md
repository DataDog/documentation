---
aliases:
- /es/integrations/azure_vm
app_id: azure-vm
categories:
- azure
- nube
- configuración y despliegue
- sistema operativo y sistema
custom_kind: integración
description: Microsoft Azure VM es un servicio que permite crear máquinas virtuales
  de Linux y Windows en cuestión de minutos.
further_reading:
- link: https://docs.datadoghq.com/integrations/azure
  tag: documentación
  text: Azure
- link: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog
  tag: blog
  text: Monitoriza tus máquinas virtuales de Microsoft Azure con CPU basadas en Ampere
    Altra Arm con Datadog
- link: https://www.datadoghq.com/blog/dash-2024-new-feature-roundup-infrastructure
  tag: blog
  text: 'DASH 2024: Guía de las últimas novedades en infraestructuras de Datadog'
media:
- caption: Dashboard general de Azure VM
  image_url: images/1_azure_vm_overview_dashboard.png
  media_type: imagen
- caption: Plantilla de monitor (noun) del estado de Azure VM
  image_url: images/2_azure_vm_health_monitor_template.png
  media_type: imagen
title: Azure VM
---
## Información general

Azure Virtual Machine te permite ejecutar de forma flexible entornos virtualizados con la capacidad de escalar bajo demanda.

Obtén métricas de Azure VM para:

- Visualizar el rendimiento de tus VM.
- Correlacionar el rendimiento de tus VM con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/).

Para las máquinas virtuales desplegadas **ARM**, debes activar Diagnósticos y seleccionar las métricas de máquinas virtuales a recopilar. Consulta [Activar diagnósticos](https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/#enable-diagnostics) para obtener instrucciones.

### Silenciamiento automático de monitores

Datadog puede silenciar de forma proactiva los monitores relacionados con el apagado o la finalización de las máquinas virtuales de Azure, tanto si el apagado se ha activado manualmente como por autoescalado de Azure, basándose en los estados disponibles a través de la [API de Azure Resource Health](https://docs.microsoft.com/en-us/rest/api/resourcehealth/). Al silenciar los monitores para apagados esperados de máquinas virtuales de Azure, puedes reducir el ruido de alertas innecesarias.

Las máquinas virtuales silenciadas automáticamente se enumeran en la page (página) [Gestionar el tiempo de inactividad](https://app.datadoghq.com/monitors/downtimes) activando **Mostrar hosts silenciados automáticamente**. La integración de Azure debe estar instalada para que la automatización surta efecto.

Para silenciar los monitores en VM de Azure apagadas o finalizadas, marca la casilla **Azure automuting** en el cuadro de integración de Azure.

Para crear monitores de métricas que se puedan silenciar automáticamente, asegúrate de activarlos en función de la etiqueta (tag) `host`. Los monitores de métricas que no incluyen la etiqueta `host` en el grupo monitorizado no se silencian automáticamente.

![Un monitor (noun) que alerta sobre una consulta que incluye una tag (etiqueta) de host](images/azure_vm_automute2.png)

**Nota:** Si no estás ejecutando el Datadog Agent, la tag (etiqueta) `host` en tu Azure VM es un GUID. Utiliza la variable de plantilla de mensaje `{{host.name_tag}}` en la respuesta de notificación para incluir también el nombre legible por humanos.

## Datos recopilados

<div class="alert alert-warning">La métrica <code>azure.vm.status</code> está obsoleta y ya no se rellena para las organizaciones de Datadog recién creadas. Para los usuarios existentes, esta métrica se desactivó el 1 de junio de 2023. Utiliza la métrica <code>azure.vm.count</code> y sus valores de etiqueta de <code>estado</code> asociados para determinar el estado de tus máquinas virtuales.

Si tienes alguna pregunta, ponte en contacto con <a href="https://docs.datadoghq.com/help/" target="_blank">el servicio de asistencia de Datadog </a>.</div>

### Métricas

| | |
| --- | --- |
| **azure.vm.available_memory_bytes** <br>(gauge) | Cantidad de memoria física, en bytes, inmediatamente disponible para asignar a un proceso o para el uso del sistema en la máquina virtual<br>_Mostrado como byte_ |
| **azure.vm.available_memory_percentage** <br>(gauge) | Cantidad de memoria física, en porcentaje, inmediatamente disponible para asignar a un proceso o para el uso del sistema en la máquina virtual.<br>_Mostrado como porcentaje_ |
| **azure.vm.cpu_credits_consumed** <br>(count) | Número total de créditos consumidos por la máquina virtual. Solo disponible en máquinas virtuales de ráfagas de la serie B.|
| **azure.vm.cpu_credits_remaining** <br>(count) | Número total de créditos disponibles para ráfagas. Solo disponible en máquinas virtuales de ráfagas de la serie B.|
| **azure.vm.data_disk_bandwidth_consumed_percentage** <br>(gauge) | Porcentaje de ancho de banda de disco de datos consumido por minuto. Solo disponible en las series de máquinas virtuales que admiten almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.data_disk_iops_consumed_percentage** <br>(gauge) | Porcentaje de E/S de disco de datos consumidas por minuto. Solo disponible en las series de máquinas virtuales que admiten almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.data_disk_latency_preview** <br>(gauge) | Tiempo medio para completar cada ES durante el periodo de monitorización para el disco de datos. Valores en milisegundos<br>_Mostrado como milisegundos_ |
| **azure.vm.data_disk_max_burst_bandwidth** <br>(count) | Máximo rendimiento de bytes por segundo que puede alcanzar el disco de datos con ráfagas|
| **azure.vm.data_disk_max_burst_iops** <br>(count) | IOPS máximas que puede alcanzar el disco de datos con ráfagas|
| **azure.vm.data_disk_queue_depth** <br>(count) | Profundidad de la cola del disco de datos (o longitud de la cola)|
| **azure.vm.data_disk_read_bytes_sec** <br>(count) | Bytes/segundo leídos de un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.vm.data_disk_read_bytes_sec.max** <br>(count) | Bytes/segundo máximos leídos de un solo disco durante el periodo de monitorización (máximo agregado)<br>_Mostrado como byte_ |
| **azure.vm.data_disk_read_operations_sec** <br>(count) | IOPS de lectura de un solo disco durante el periodo de monitorización<br>_Mostrado como operación_ |
| **azure.vm.data_disk_target_bandwidth** <br>(count) | Número de bytes por segundo de referencia que puede alcanzar el disco de datos sin ráfagas|
| **azure.vm.data_disk_target_iops** <br>(count) | IOPS de referencia que el disco de datos puede alcanzar sin ráfagas|
| **azure.vm.data_disk_used_burst_bps_credits_percentage** <br>(gauge) | Porcentaje de créditos de ancho de banda de ráfaga del disco de datos utilizados hasta el momento<br>_Mostrado como porcentaje_ |
| **azure.vm.data_disk_used_burst_io_credits_percentage** <br>(gauge) | Porcentaje de créditos de E/S de ráfaga del disco de datos utilizados hasta el momento<br>_Mostrado como porcentaje_. |
| **azure.vm.data_disk_write_bytes_sec** <br>(count) | Bytes/segundo escritos en un único disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.vm.data_disk_write_operations_sec** <br>(count) | IOPS de escritura de un solo disco durante el periodo de monitorización<br>_Mostrado como operación_ |
| **azure.vm.disk_read_bytes** <br>(count) | Bytes leídos del disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.vm.disk_read_operations_sec** <br>(count) | IOPS de lectura de disco<br>_Mostrado como operación_ |
| **azure.vm.disk_write_bytes** <br>(count) | Bytes escritos en el disco durante el periodo de monitorización<br>_Mostrado como byte_ |
| **azure.vm.disk_write_operations_sec** <br>(count) | IOPS de escritura en el disco<br>_Mostrado como operación_ |
| **azure.vm.inbound_flows** <br>(count) | Los flujos de entrada son el número de flujos actuales en la dirección de entrada (tráfico que entra en la máquina virtual)<br>_Mostrado como elemento_. |
| **azure.vm.inbound_flows_maximum_creation_rate** <br>(count) | La tasa máxima de creación de flujos entrantes (tráfico que entra en la máquina virtual)<br>_Mostrado como elemento_ |
| **azure.vm.network_in** <br>(gauge) | El número de bytes facturables recibidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico entrante) (obsoleto)<br>_Mostrado como byte_ |
| **azure.vm.network_in_total** <br>(gauge) | El número de bytes recibidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico entrante)<br>_Mostrado como byte_ |
| **azure.vm.network_out** <br>(gauge) | Número de bytes facturables emitidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico saliente) (obsoleto)<br>_Mostrado como byte_ |
| **azure.vm.network_out_total** <br>(gauge) | Número de bytes emitidos en todas las interfaces de red por la(s) máquina(s) virtual(es) (tráfico saliente)<br>_Mostrado como byte_. |
| **azure.vm.os_disk_bandwidth_consumed_percentage** <br>(gauge) | Porcentaje de ancho de banda de disco del sistema operativo consumido por minuto. Solo disponible en las series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.os_disk_iops_consumed_percentage** <br>(gauge) | Porcentaje de E/S de disco del sistema operativo consumidas por minuto. Solo disponible en las series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.os_disk_latency_preview** <br>(gauge) | Tiempo medio para completar cada ES durante el periodo de monitorización para el disco del sistema operativo. Valores en milisegundos<br>_Mostrado como milisegundo_ |
| **azure.vm.os_disk_max_burst_bandwidth** <br>(count) | Rendimiento máximo de bytes por segundo que puede alcanzar el disco del sistema operativo con ráfagas|
| **azure.vm.os_disk_max_burst_iops** <br>(count) | IOPS máximas que puede alcanzar el disco del sistema operativo con ráfagas|
| **azure.vm.os_disk_queue_depth** <br>(count) | Profundidad de la cola del disco del sistema operativo (o la longitud de la cola)|
| **azure.vm.os_disk_read_bytes_sec** <br>(count) | Bytes/segundo leídos de un solo disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.vm.os_disk_read_operations_sec** <br>(count) | IOPS de lectura de un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como operación_. |
| **azure.vm.os_disk_target_bandwidth** <br>(count) | Número de bytes por segundo de referencia que el disco del sistema operativo puede alcanzar sin ráfagas|
| **azure.vm.os_disk_target_iops** <br>(count) | IOPS de referencia que el disco del sistema operativo puede alcanzar sin ráfagas|
| **azure.vm.os_disk_used_burst_bps_credits_percentage** <br>(gauge) | Porcentaje de créditos de ancho de banda de ráfaga de disco del sistema operativo utilizados hasta el momento<br>_Mostrado como porcentaje_. |
| **azure.vm.os_disk_used_burst_io_credits_percentage** <br>(gauge) | Porcentaje de créditos de E/S en ráfaga de disco del sistema operativo utilizados hasta el momento<br>_Mostrado como porcentaje_. |
| **azure.vm.os_disk_write_bytes_sec** <br>(count) | Bytes/segundo escritos en un único disco durante el periodo de monitorización para el disco del sistema operativo<br>_Mostrado como byte_ |
| **azure.vm.outbound_flows** <br>(count) | Flujos de salida es el número de flujos actuales en la dirección de salida (tráfico que sale de la máquina virtual)<br>_Mostrado como elemento_. |
| **azure.vm.outbound_flows_maximum_creation_rate** <br>(count) | La tasa máxima de creación de flujos de salida (tráfico que sale de la máquina virtual)<br>_Mostrado como elemento_. |
| **azure.vm.percentage_cpu** <br>(gauge) | Porcentaje de unidades de cálculo asignadas que se están utilizando actualmente por la(s) máquina(s) virtual(es)<br>_Mostrado en porcentaje_. |
| **azure.vm.premium_data_disk_cache_read_hit** <br>(gauge) | Acierto de lectura de la caché de disco de datos Premium<br>_Mostrado como porcentaje_. |
| **azure.vm.premium_data_disk_cache_read_miss** <br>(gauge) | Fallo de lectura de la caché de disco de datos premium<br>_Mostrado como porcentaje_. |
| **azure.vm.premium_os_disk_cache_read_hit** <br>(gauge) | Acierto de lectura de la caché de disco del sistema operativo Premium<br>_Mostrado como porcentaje_. |
| **azure.vm.premium_os_disk_cache_read_miss** <br>(gauge) | Fallo de lectura de la caché de disco del sistema operativo premium<br>_Mostrado como porcentaje_. |
| **azure.vm.temp_disk_latency_preview** <br>(gauge) | Tiempo medio para completar cada ES durante el periodo de monitorización para el disco temporal. Valores en milisegundos<br>_Mostrado como milisegundos_ |
| **azure.vm.temp_disk_queue_depth** <br>(count) | Profundidad de la cola del disco temporal (o longitud de la cola)|
| **azure.vm.temp_disk_read_bytes_sec** <br>(count) | Bytes/segundo leídos de un solo disco durante el periodo de monitorización para el disco temporal<br>_Mostrado como byte_ |
| **azure.vm.temp_disk_read_operations_sec** <br>(count) | IOPS de lectura de un único disco durante el periodo de monitorización para el disco temporal<br>_Mostrado como operación_. |
| **azure.vm.temp_disk_write_bytes_sec** <br>(count) | Bytes/segundo escritos en un solo disco durante el periodo de monitorización para el disco temporal<br>_Mostrado como byte_ |
| **azure.vm.temp_disk_write_operations_sec** <br>(count) | IOPS de escritura de un solo disco durante el periodo de monitorización para el disco temporal<br>_Mostrado como operación_. |
| **azure.vm.vm_cached_bandwidth_consumed_percentage** <br>(gauge) | Porcentaje de ancho de banda de disco en caché consumido por la máquina virtual. Solo disponible en las series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_cached_iops_consumed_percentage** <br>(gauge) | Porcentaje de IOPS de disco en caché consumidas por la máquina virtual. Solo disponible en las series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_cached_used_burst_bps_credits_percentage** <br>(gauge) | Porcentaje de créditos BPS de ráfaga en caché utilizados por la máquina virtual<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_cached_used_burst_io_credits_percentage** <br>(gauge) | Porcentaje de créditos de ES de ráfagas en caché utilizados por la máquina virtual<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_uncached_used_burst_bps_credits_percentage** <br>(gauge) | Porcentaje de créditos BPS de ráfaga no almacenados en caché utilizados por la máquina virtual<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_uncached_used_burst_io_credits_percentage** <br>(gauge) | Porcentaje de créditos de ES en ráfaga no almacenados en caché utilizados por la máquina virtual<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_uncached_bandwidth_consumed_percentage** <br>(gauge) | Porcentaje de ancho de banda de disco no almacenado en caché consumido por la máquina virtual. Solo disponible en series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_uncached_iops_consumed_percentage** <br>(gauge) | Porcentaje de IOPS de disco no almacenadas en caché consumidas por la máquina virtual. Solo disponible en las series de máquinas virtuales que admiten el almacenamiento premium<br>_Mostrado como porcentaje_. |
| **azure.vm.vm_availability_metric_preview** <br>(count) | Medida de la disponibilidad de las máquinas virtuales a lo largo del tiempo|

### Eventos

La integración Azure Virtual Machine no incluye eventos.

### Checks de servicio

La integración Azure Virtual Machine no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Cómo monitorizar las máquinas virtuales de Microsoft Azure](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms)
- [Cómo recopilar métricas de Azure](https://www.datadoghq.com/blog/how-to-collect-azure-metrics)
- [Monitorizar máquinas virtuales Azure con Datadog](https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog)
- [Estrategias de tu migración a Azure para cargas de trabajo de SQL con Datadog](https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/)