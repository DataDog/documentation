---
app_id: azure_diagnostic_extension
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Diagnostic Extension.
title: Azure Diagnostic Extension
---
<div class="alert alert-danger">Esta integración está obsoleta. Instala el Datadog Agent para obtener información similar a nivel de invitado y de proceso sobre tus máquinas virtuales de Azure, con mejor granularidad y latencia.

Las métricas que aparecen en esta página ya no se completan para las organizaciones Datadog recién creadas. Para los usuarios existentes, estas métricas se deshabilitaron el 1 de junio de 2023.

Ante cualquier duda, ponte en contacto con el <a href="https://docs.datadoghq.com/help/" target="_blank">equipo de asistencia de Datadog</a>.</div>

## Información general

Azure Diagnostic Extension ayuda a un usuario a monitorizar el estado de una máquina virtual que se ejecuta en Microsoft Azure.

La integración de Datadog con Azure puede recopilar métricas de Azure Diagnostic Extension, pero se te [recomienda](https://www.datadoghq.com/blog/dont-fear-the-agent/) instalar el Datadog Agent en tus máquinas virtuales:

- Si tu organización está en el sitio US3 de Datadog y has configurado el recurso Datadog en Azure, utiliza las instrucciones de la [Guía de configuración manual de la integración nativa de Azure](https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent).
- **Todos los sitios** pueden utilizar las instrucciones de la [guía de configuración manual de la integración nativa de Azure](https://docs.datadoghq.com/integrations/guide/azure-manual-setup/#agent-installation) o la [guía de gestión mediante programación de Azure](https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension).

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.vm.builtin_disk_averagediskqueuelength** <br>(gauge) | Número medio de operaciones de disco en cola (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_disk_averagereadtime** <br>(gauge) | Promedio de segundos por operación de lectura (obsoleto)<br>_Se muestra como segundo_ |
| **azure.vm.builtin_disk_averagetransfertime** <br>(gauge) | Promedio de segundos por operación (obsoleto)<br>_Se muestra como segundo_ |
| **azure.vm.builtin_disk_averagewritetime** <br>(gauge) | Promedio de segundos por operación de escritura (obsoleto)<br>_Se muestra como segundo_ |
| **azure.vm.builtin_disk_bytespersecond** <br>(rate) | Número de bytes leídos o escritos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_disk_readbytespersecond** <br>(rate) | Número de bytes leídos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_disk_readspersecond** <br>(rate) | Operaciones de lectura por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_disk_transferspersecond** <br>(rate) | Total de operaciones por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_disk_writebytespersecond** <br>(rate) | Número de bytes escritos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_disk_writespersecond** <br>(rate) | Operaciones de escritura por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_filesystem_bytespersecond** <br>(rate) | Bytes leídos o escritos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_filesystem_bytesreadpersecond** <br>(rate) | Bytes leídos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_filesystem_byteswrittenpersecond** <br>(rate) | Bytes escritos por segundo (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_filesystem_freespace** <br>(gauge) | Espacio disponible en el disco en bytes (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_filesystem_percentfreeinodes** <br>(gauge) | Porcentaje de inodos no utilizados (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_filesystem_percentfreespace** <br>(gauge) | Porcentaje de espacio libre (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_filesystem_percentusedinodes** <br>(gauge) | Porcentaje de inodos asignados (en uso) sumados en todos los sistemas de archivos (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_filesystem_percentusedspace** <br>(gauge) | Porcentaje de espacio utilizado (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_filesystem_readspersecond** <br>(rate) | Operaciones de lectura por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_filesystem_transferspersecond** <br>(rate) | Operaciones de lectura o escritura por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_filesystem_usedspace** <br>(gauge) | Espacio utilizado en el disco en bytes (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_filesystem_writespersecond** <br>(rate) | Operaciones de escritura por segundo (obsoleto)<br>_Se muestra como operación_ |
| **azure.vm.builtin_memory_availablememory** <br>(gauge) | Memoria física disponible en MiB (obsoleto)<br>_Se muestra como mebibyte_ |
| **azure.vm.builtin_memory_availableswap** <br>(gauge) | Espacio de intercambio no utilizado (MiB) (obsoleto)<br>_Se muestra como mebibyte_ |
| **azure.vm.builtin_memory_pagespersec** <br>(rate) | Paginación total (lectura/escritura) (obsoleto)<br>_Se muestra como página_ |
| **azure.vm.builtin_memory_pagesreadpersec** <br>(rate) | Páginas leídas del almacén de respaldo (archivo de intercambio, archivo de programa, archivo asignado, etc.) (obsoleto)<br>_Se muestra como página_ |
| **azure.vm.builtin_memory_pageswrittenpersec** <br>(rate) | Páginas escritas en el almacén de respaldo (archivo de intercambio, archivo asignado, etc.) (obsoleto)<br>_Se muestra como página_ |
| **azure.vm.builtin_memory_percentavailablememory** <br>(gauge) | Memoria física disponible como porcentaje de la memoria total (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_memory_percentavailableswap** <br>(gauge) | Espacio de intercambio no utilizado como porcentaje del intercambio total (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_memory_percentusedmemory** <br>(gauge) | Memoria física en uso como porcentaje de la memoria total (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_memory_percentusedswap** <br>(gauge) | Espacio de intercambio en uso como porcentaje del intercambio total (obsoleto)<br>_Se muestra como porcentaje_. |
| **azure.vm.builtin_memory_usedmemory** <br>(gauge) | Memoria física en uso (MiB) (obsoleto)<br>_Se muestra como mebibyte_ |
| **azure.vm.builtin_memory_usedswap** <br>(gauge) | Espacio de intercambio en uso (MiB) (obsoleto)<br>_Se muestra como mebibyte_ |
| **azure.vm.builtin_network_bytesreceived** <br>(gauge) | Total de bytes recibidos desde el arranque (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_network_bytestotal** <br>(gauge) | Total de bytes enviados o recibidos desde el arranque (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_network_bytestransmitted** <br>(gauge) | Total de bytes enviados desde el arranque (obsoleto)<br>_Se muestra como byte_ |
| **azure.vm.builtin_network_packetsreceived** <br>(gauge) | Total de paquetes recibidos desde el arranque (obsoleto)<br>_Se muestra como paquete_ |
| **azure.vm.builtin_network_packetstransmitted** <br>(gauge) | Total de paquetes enviados desde el arranque (obsoleto)<br>_Se muestra como paquete_ |
| **azure.vm.builtin_network_totalcollisions** <br>(gauge) | Número de colisiones notificadas por los puertos de red desde el arranque (obsoleto)|
| **azure.vm.builtin_network_totalrxerrors** <br>(gauge) | Número de errores de recepción desde el arranque (obsoleto)<br>_Se muestra como error_ |
| **azure.vm.builtin_network_totaltxerrors** <br>(gauge) | Número de errores de transmisión desde el arranque (obsoleto)<br>_Se muestra como error_ |
| **azure.vm.builtin_processor_percentidletime** <br>(gauge) | Porcentaje de tiempo del periodo de agregación durante el que los procesadores estuvieron ejecutando el bucle de inactividad del kernel (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentinterrupttime** <br>(gauge) | Porcentaje de tiempo de ejecución de interrupciones de hardware/software y DPC (llamadas a procedimiento diferido) (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentiowaittime** <br>(gauge) | Porcentaje de tiempo de espera hasta que se completen las operaciones de E/S (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentnicetime** <br>(gauge) | Del tiempo no inactivo, el porcentaje transcurrido en prioridad baja (nice) (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentprivilegedtime** <br>(gauge) | Del tiempo no inactivo, el porcentaje transcurrido en modo privilegiado (kernel) (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentprocessortime** <br>(gauge) | Porcentaje de tiempo de ejecución de un subproceso no inactivo (obsoleto)<br>_Se muestra como porcentaje_ |
| **azure.vm.builtin_processor_percentusertime** <br>(gauge) | Del tiempo no inactivo durante el periodo de agregación, el porcentaje de tiempo transcurrido en modo usuario con una prioridad normal (obsoleto)<br>_Se muestra como porcentaje_. |
| **azure.vm.logical_disk_total_avg.disk_queue_length** <br>(gauge) | Número medio de operaciones de disco en cola<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_avg.disk_read_queue_length** <br>(gauge) | Número medio de operaciones de disco en cola a la espera de ser leídas<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_avg.disk_sec_read** <br>(gauge) | Promedio de segundos por operación de lectura<br>_Se muestra como segundo_ |
| **azure.vm.logical_disk_total_avg.disk_sec_transfer** <br>(gauge) | Promedio de segundos por operación<br>_Se muestra como segundo_ |
| **azure.vm.logical_disk_total_avg.disk_sec_write** <br>(gauge) | Promedio de segundos por operación de escritura<br>_Se muestra como segundo_ |
| **azure.vm.logical_disk_total_avg.disk_write_queue_length** <br>(gauge) | Número medio de operaciones de disco en cola a la espera de ser escritas<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_disk_bytes_per_sec** <br>(tasa) | Número de bytes leídos o escritos por segundo<br>_Se muestra como byte_ |
| **azure.vm.logical_disk_total_disk_read_bytes_per_sec** <br>(rate) | Número de bytes leídos por segundo<br>_Se muestra como byte_ |
| **azure.vm.logical_disk_total_disk_reads_per_sec** <br>(rate) | Operaciones de lectura por segundo<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_disk_transfers_per_sec** <br>(rate) | Total de operaciones por segundo<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_disk_write_bytes_per_sec** <br>(rate) | Número de bytes escritos por segundo<br>_Se muestra como byte_ |
| **azure.vm.logical_disk_total_disk_writes_per_sec** <br>(rate) | Operaciones de escritura por segundo<br>_Se muestra como operación_ |
| **azure.vm.logical_disk_total_free_megabytes** <br>(gauge) | Espacio no asignado, en megabytes, en el disco|
| **azure.vm.logical_disk_total_pct_disk_read_time** <br>(gauge) | Porcentaje de operaciones de disco en cola a la espera de ser leídas<br>_Se muestra como porcentaje_ |
| **azure.vm.logical_disk_total_pct_disk_time** <br>(gauge) | Porcentaje de operaciones de disco en cola<br>_Se muestra como porcentaje_. |
| **azure.vm.logical_disk_total_pct_disk_write_time** <br>(gauge) | Porcentaje de operaciones de disco en cola a la espera de ser escritas<br>_Se muestra como porcentaje_ |
| **azure.vm.logical_disk_total_pct_free_space** <br>(gauge) | Porcentaje de espacio sin asignar en el disco<br>_Se muestra como porcentaje_ |
| **azure.vm.logical_disk_total_pct_idle_time** <br>(gauge) | Porcentaje de tiempo que el disco ha permanecido inactivo<br>_Se muestra como porcentaje_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_bytes_received_per_sec** <br>(rate) | Bytes recibidos por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_bytes_sent_per_sec** <br>(rate) | Bytes enviados por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_bytes_total_per_sec** <br>(rate) | Total de bytes por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_packets_outbound_errors** <br>(gauge) | Número de errores de salida de paquetes<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_packets_per_sec** <br>(rate) | Número total de paquetes por segundo<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_packets_received_errors** <br>(gauge) | Número de errores de paquetes recibidos<br>_Se muestra como error_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_packets_received_per_sec** <br>(rate) | Número de paquetes recibidos por segundo<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_microsoft_hyper_v_network_adapter_2_packets_sent_per_sec** <br>(rate) | Número de paquetes enviados por segundo<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_bytes_received_per_sec** <br>(rate) | Bytes recibidos por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_bytes_sent_per_sec** <br>(rate) | Bytes enviados por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_bytes_total_per_sec** <br>(rate) | Total de bytes por segundo<br>_Se muestra como byte_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_packets_outbound_errors** <br>(gauge) | Número de errores de salida de paquetes<br>_Se muestra como error_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_packets_per_sec** <br>(rate) | Número total de paquetes por segundo<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_packets_received_errors** <br>(gauge) | Número de errores de paquetes recibidos<br>_Se muestra como error_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_packets_received_per_sec** <br>(rate) | Número de paquetes recibidos por segundo<br>_Se muestra como paquete_ |
| **azure.vm.network_interface_teredo_tunneling_pseudo_interface_packets_sent_per_sec** <br>(rate) | Número de paquetes enviados por segundo<br>_Se muestra como paquete_ |
| **azure.vm.processor_information_total_pct_privileged_time** <br>(gauge) | Del tiempo no inactivo, el porcentaje transcurrido en modo privilegiado (kernel)<br>_Se muestra como porcentaje_ |
| **azure.vm.processor_information_total_pct_processor_performance** <br>(gauge) | Porcentaje de rendimiento del procesador<br>_Se muestra como porcentaje_ |
| **azure.vm.processor_information_total_pct_processor_time** <br>(gauge) | Porcentaje de tiempo de ejecución de un subproceso no inactivo<br>_Se muestra como porcentaje_ |
| **azure.vm.processor_information_total_pct_user_time** <br>(gauge) | Del tiempo no inactivo durante el periodo de agregación, el porcentaje de tiempo transcurrido en modo usuario con una prioridad normal<br>_Se muestra como porcentaje_ |
| **azure.vm.processor_percent_idle_time** <br>(gauge) | Porcentaje de tiempo del periodo de agregación durante el que los procesadores estuvieron ejecutando el bucle de inactividad del kernel<br>_Se muestra como porcentaje_ |
| **azure.vm.system_context_switches_per_sec** <br>(rate) | Número de cambios de contexto del sistema por segundo<br>_Se muestra como operación_ |
| **azure.vm.system_processor_queue_length** <br>(gauge) | Número de subprocesos a la espera del tiempo de procesador<br>_Se muestra como subproceso_ |
| **azure.vm.system_system_up_time** <br>(gauge) | Tiempo de actividad del sistema|

### Eventos

La integración Azure Diagnostic Extension no incluye eventos.

### Checks de servicio

La integración Azure Diagnostic Extension no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).