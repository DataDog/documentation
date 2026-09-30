---
app_id: esxi
categories:
- nube
- network
- sistema operativo y sistema
custom_kind: integración
description: Monitorizar el estado de tus máquinas ESXi y VMs
integration_version: 4.0.0
media: []
supported_os:
- linux
- windows
- macos
title: ESXi
---
## Información general

Este check monitoriza tus hosts vSphere [ESXi](https://www.vmware.com/products/esxi-and-esx.html) y las máquinas virtuales que se ejecutan en ellos de forma distribuida. Para monitorizar todo tu despliegue de vSphere de forma centralizada a través de tu vCenter, consulta la [integración de vSphere](https://docs.datadoghq.com/integrations/vsphere/).

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de ESXi se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `esxi.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de ESXi. Consulta el [esxi.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/esxi/datadog_checks/esxi/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `esxi` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **esxi.cpu.coreUtilization.avg** <br>(gauge) | Utilización de la CPU del núcleo correspondiente (si hyper-threading está activado) en porcentaje<br>_Se muestra en porcentaje_ |
| **esxi.cpu.costop.sum** <br>(gauge) | Tiempo en el que la máquina virtual está lista para ejecutarse, pero no puede hacerlo debido a restricciones de programación conjunta<br>_Se muestra como milisegundo_ |
| **esxi.cpu.demand.avg** <br>(gauge) | La cantidad de recursos de CPU que utilizaría una máquina virtual si no hubiera contención de CPU ni límite de CPU<br>_Se muestra en megahercios_ |
| **esxi.cpu.demandEntitlementRatio.latest** <br>(gauge) | Relación entre el derecho a recursos de CPU y la demanda de CPU (en porcentajes)<br>_Se muestra como porcentaje_ |
| **esxi.cpu.entitlement.latest** <br>(gauge) | Recursos de CPU dedicados por el planificador de ESXi<br>_Se muestra en megahercios_ |
| **esxi.cpu.idle.sum** <br>(gauge) | Tiempo total que la CPU pasó en estado inactivo<br>_Se muestra en milisegundos_ |
| **esxi.cpu.latency.avg** <br>(gauge) | Porcentaje de tiempo que la máquina virtual no puede ejecutarse porque está compitiendo por el acceso a la(s) CPU(s) física(s)<br>_Se muestra como porcentaje_ |
| **esxi.cpu.maxlimited.sum** <br>(gauge) | Tiempo en el que la máquina virtual está lista para funcionar, pero no lo hace porque ha alcanzado su límite máximo de CPU<br>_Se muestra como milisegundo_ |
| **esxi.cpu.overlap.sum** <br>(gauge) | Hora a la que se interrumpió la máquina virtual para realizar servicios del sistema en nombre de sí misma o de otras máquinas virtuales.<br>_Se muestra como milisegundo_ |
| **esxi.cpu.readiness.avg** <br>(gauge) | Porcentaje de tiempo que la máquina virtual estuvo lista, pero no pudo programarse para ejecutarse en la CPU física.<br>_Se muestra como porcentaje_ |
| **esxi.cpu.ready.sum** <br>(gauge) | Milisegundos de tiempo de CPU en estado listo<br>_Se muestra como milisegundo_ |
| **esxi.cpu.reservedCapacity.avg** <br>(gauge) | Capacidad total de la CPU reservada por las máquinas virtuales<br>_Se muestra en megahercios_ |
| **esxi.cpu.run.sum** <br>(gauge) | Hora a la que está previsto que se ejecute la máquina virtual<br>_Se muestra en milisegundos_ |
| **esxi.cpu.swapwait.sum** <br>(gauge) | Tiempo de espera de la CPU para swap-in<br>_Se muestra en milisegundos_ |
| **esxi.cpu.system.sum** <br>(gauge) | Cantidad de tiempo dedicado a los procesos del sistema en cada CPU virtual de la máquina virtual. Esta es la vista del host del uso de la CPU, no la vista del sistema operativo invitado.<br>_Se muestra como milisegundo_ |
| **esxi.cpu.totalCapacity.avg** <br>(gauge) | Capacidad total de CPU reservada y disponible para máquinas virtuales<br>_Se muestra en megahercios_ |
| **esxi.cpu.usage.avg** <br>(gauge) | Porcentaje de la capacidad de la CPU que se está utilizando<br>_Se muestra como porcentaje_ |
| **esxi.cpu.used.sum** <br>(gauge) | Tiempo contabilizado a la máquina virtual. Si un servicio del sistema se ejecuta en nombre de esta máquina virtual, el tiempo empleado por ese servicio (representado por cpu.system) debería cargarse a esta máquina virtual. En caso contrario, el tiempo empleado (representado por cpu.overlap) no debería cargarse a esta máquina virtual.<br>_Se muestra como milisegundo_ |
| **esxi.cpu.utilization.avg** <br>(gauge) | Utilización de la CPU en porcentaje durante el intervalo (el uso de la CPU y la utilización de la CPU pueden ser diferentes debido a las tecnologías de gestión de energía o hyper-threading)<br>_Se muestra en porcentaje_ |
| **esxi.cpu.wait.sum** <br>(gauge) | El tiempo total de espera de la CPU incluye el tiempo transcurrido en los estados de inactividad de la CPU, espera de intercambio de la CPU y espera de E/S de la CPU.<br>_Se muestra en milisegundos_ |
| **esxi.datastore.datastoreIops.avg** <br>(gauge) | IOPS agregada de control de E/S de almacenamiento<br>_Se muestra como operación_ |
| **esxi.datastore.datastoreMaxQueueDepth.latest** <br>(gauge) | Profundidad de la cola máxima de almacén de datos de Control de E/S de almacenamiento<br>_Se muestra como comando_ |
| **esxi.datastore.datastoreNormalReadLatency.latest** <br>(gauge) | Latencia de lectura normalizada del almacén de datos de Storage DRS<br>_Se muestra en milisegundos_ |
| **esxi.datastore.datastoreNormalWriteLatency.latest** <br>(gauge) | Latencia de escritura normalizada del almacén de datos de Storage DRS<br>_Se muestra en milisegundos_ |
| **esxi.datastore.datastoreReadBytes.latest** <br>(gauge) | Bytes leídos del almacén de datos de Storage DRS<br>_Se muestra en milisegundos_ |
| **esxi.datastore.datastoreReadIops.latest** <br>(gauge) | Tasa de E/S de lectura del almacén de datos de Storage DRS<br>_Se muestra como operación_ |
| **esxi.datastore.datastoreReadLoadMetric.latest** <br>(gauge) | Métrica del almacén de datos de Storage DRS para el modelo de carga de trabajo de lectura|
| **esxi.datastore.datastoreReadOIO.latest** <br>(gauge) | Solicitudes de lectura pendientes del almacén de datos de Storage DRS<br>_Se muestra como solicitud_ |
| **esxi.datastore.datastoreVMObservedLatency.latest** <br>(gauge) | La latencia media del almacén de datos vista por las máquinas virtuales<br>_Se muestra en microsegundos_ |
| **esxi.datastore.datastoreWriteBytes.latest** <br>(gauge) | Bytes escritos del almacén de datos de Storage DRS<br>_Se muestra en milisegundos_ |
| **esxi.datastore.datastoreWriteIops.latest** <br>(gauge) | Tasa de E/S de escritura del almacén de datos de Storage DRS<br>_Se muestra como operación_ |
| **esxi.datastore.datastoreWriteLoadMetric.latest** <br>(gauge) | Métrica del almacén de datos de Storage DRS para el modelo de carga de trabajo de escritura|
| **esxi.datastore.datastoreWriteOIO.latest** <br>(gauge) | Solicitudes de escritura pendientes del almacén de datos de Storage DRS<br>_Se muestra como solicitud_ |
| **esxi.datastore.maxTotalLatency.latest** <br>(gauge) | Valor de latencia más alto de todos los almacenes de datos utilizados por el host<br>_Se muestra en milisegundos_ |
| **esxi.datastore.numberReadAveraged.avg** <br>(gauge) | Número medio de comandos de lectura emitidos por segundo al almacén de datos<br>_Se muestra como comando_ |
| **esxi.datastore.numberWriteAveraged.avg** <br>(gauge) | Número medio de comandos de escritura emitidos por segundo al almacén de datos durante el intervalo de recopilación.|
| **esxi.datastore.read.avg** <br>(gauge) | Tasa de lectura de datos del almacén de datos<br>_Se muestra como kibibyte_ |
| **esxi.datastore.siocActiveTimePercentage.avg** <br>(gauge) | Porcentaje de tiempo que el Control de E/S de almacenamiento controló activamente la latencia del almacén de datos<br>_Se muestra como porcentaje_ |
| **esxi.datastore.sizeNormalizedDatastoreLatency.avg** <br>(gauge) | Latencia de E/S normalizada por tamaño del control de E/S de almacenamiento<br>_Se muestra en microsegundos_ |
| **esxi.datastore.totalReadLatency.avg** <br>(gauge) | Tiempo medio de una operación de lectura desde el almacén de datos<br>_Se muestra en milisegundos_ |
| **esxi.datastore.totalWriteLatency.avg** <br>(gauge) | Tiempo medio de una operación de escritura desde el almacén de datos<br>_Se muestra en milisegundos_ |
| **esxi.datastore.write.avg** <br>(gauge) | Tasa de escritura de datos en el almacén de datos<br>_Se muestra como kibibyte_ |
| **esxi.disk.busResets.sum** <br>(gauge) | Número de comandos de reinicio del bus SCSI emitidos<br>_Se muestra como comando_ |
| **esxi.disk.commands.sum** <br>(gauge) | Número de comandos SCSI emitidos<br>_Se muestra como comando_ |
| **esxi.disk.commandsAborted.sum** <br>(gauge) | Número de comandos SCSI abortados<br>_Se muestra como comando_ |
| **esxi.disk.commandsAveraged.avg** <br>(gauge) | Número medio de comandos SCSI emitidos por segundo<br>_Se muestra como comando_ |
| **esxi.disk.deviceLatency.avg** <br>(gauge) | Tiempo medio que tarda en completarse un comando SCSI desde el dispositivo físico<br>_Se muestra en milisegundos_ |
| **esxi.disk.deviceReadLatency.avg** <br>(gauge) | Tiempo medio de lectura del dispositivo físico<br>_Se muestra en milisegundos_ |
| **esxi.disk.deviceWriteLatency.avg** <br>(gauge) | Tiempo medio de escritura desde el dispositivo físico<br>_Se muestra en milisegundos_ |
| **esxi.disk.kernelLatency.avg** <br>(gauge) | Tiempo medio empleado por el VMkernel para procesar cada comando SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.kernelReadLatency.avg** <br>(gauge) | Tiempo medio empleado por el VMkernel para procesar cada comando de lectura SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.kernelWriteLatency.avg** <br>(gauge) | Tiempo medio que tarda el VMkernel en procesar cada comando de escritura SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.maxQueueDepth.avg** <br>(gauge) | Profundidad máxima de la cola<br>_Se muestra como comando_ |
| **esxi.disk.maxTotalLatency.latest** <br>(gauge) | Valor de latencia más alto de todos los discos utilizados por el host<br>_Se muestra en milisegundos_ |
| **esxi.disk.numberRead.sum** <br>(gauge) | Número de lecturas de disco durante el intervalo de recopilación.|
| **esxi.disk.numberReadAveraged.avg** <br>(gauge) | Número medio de comandos de lectura emitidos por segundo al almacén de datos<br>_Se muestra como comando_ |
| **esxi.disk.numberWrite.sum** <br>(gauge) | Número de escrituras en disco durante el intervalo de recopilación.|
| **esxi.disk.numberWriteAveraged.avg** <br>(gauge) | Número medio de comandos de escritura emitidos por segundo al almacén de datos<br>_Se muestra como comando_ |
| **esxi.disk.queueLatency.avg** <br>(gauge) | Tiempo medio de permanencia en la cola del VMkernel por comando SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.queueReadLatency.avg** <br>(gauge) | Tiempo medio de permanencia en la cola del VMkernel por comando de lectura SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.queueWriteLatency.avg** <br>(gauge) | Tiempo medio de permanencia en la cola del VMkernel por comando de escritura SCSI<br>_Se muestra en milisegundos_ |
| **esxi.disk.read.avg** <br>(gauge) | Número medio de kilobytes leídos del disco cada segundo<br>_Se muestra como kibibyte_ |
| **esxi.disk.totalLatency.avg** <br>(gauge) | Cantidad media de tiempo que se tarda durante el intervalo de recopilación en procesar un comando SCSI emitido por el SO huésped a la máquina virtual.<br>_Se muestra como milisegundo_ |
| **esxi.disk.totalReadLatency.avg** <br>(gauge) | Tiempo medio que se tarda en procesar un comando de lectura SCSI emitido desde el SO huésped a la máquina virtual<br>_Se muestra en milisegundos_ |
| **esxi.disk.totalWriteLatency.avg** <br>(gauge) | Cantidad media de tiempo que se tarda en procesar un comando de escritura SCSI emitido por el SO huésped a la máquina virtual<br>_Se muestra como milisegundo_ |
| **esxi.disk.usage.avg** <br>(gauge) | Tasa agregada de E/S de disco<br>_Se muestra como kibibyte_ |
| **esxi.disk.write.avg** <br>(gauge) | Número medio de kilobytes escritos en el disco cada segundo<br>_Se muestra como kibibyte_ |
| **esxi.hbr.hbrNetRx.avg** <br>(gauge) | Kilobytes por segundo de tráfico de red de replicación saliente basado en host (para esta máquina virtual o host).<br>_Se muestra como kibibyte_ |
| **esxi.hbr.hbrNetTx.avg** <br>(gauge) | Cantidad media de datos transmitidos por segundo<br>_Se muestra como kibibyte_ |
| **esxi.hbr.hbrNumVms.avg** <br>(gauge) | Número de máquinas virtuales encendidas que se ejecutan en este host y que actualmente tienen habilitada la protección de replicación basada en host.|
| **esxi.host.can_connect** <br>(gauge) | Si el check puede conectarse al host ESXi o no.|
| **esxi.host.count** <br>(gauge) | Serie temporal con valor 1 para cada host ESXi. Realiza consultas 'sum by {X}' para contar todos los hosts con la etiqueta X.|
| **esxi.mem.active.avg** <br>(gauge) | Cantidad de memoria utilizada activamente, estimada por el VMkernel basándose en las páginas de memoria tocadas recientemente<br>_Se muestra como kibibyte_ |
| **esxi.mem.activewrite.avg** <br>(gauge) | Estimación de la cantidad de memoria en la que está escribiendo activamente la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.compressed.avg** <br>(gauge) | Cantidad de memoria reservada por userworlds<br>_Se muestra como kibibyte_ |
| **esxi.mem.compressionRate.avg** <br>(gauge) | Tasa de compresión de memoria para la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.consumed.avg** <br>(gauge) | Cantidad de memoria física del host consumida por una máquina virtual, host o clúster<br>_Se muestra como kibibyte_ |
| **esxi.mem.decompressionRate.avg** <br>(gauge) | Tasa de descompresión de la memoria de la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.entitlement.avg** <br>(gauge) | Cantidad de memoria física del host a la que tiene derecho la máquina virtual, determinada por el planificador de ESX<br>_Se muestra como kibibyte_ |
| **esxi.mem.granted.avg** <br>(gauge) | Cantidad de memoria física del host o memoria física asignada para una máquina virtual o un host<br>_Se muestra como kibibyte_ |
| **esxi.mem.heap.avg** <br>(gauge) | Espacio de direcciones virtual del VMkernel dedicado al heap principal del VMkernel y a los datos relacionados<br>_Se muestra como kibibyte_ |
| **esxi.mem.heapfree.avg** <br>(gauge) | Espacio libre de direcciones en el heap principal del VMkernel.Varía en función del número de dispositivos físicos y de las opciones de configuración. No hay forma directa de que el usuario aumente o disminuya esta estadística. Solo con fines informativos: no es útil para monitorizar el rendimiento.<br>_Se muestra como kibibyte_ |
| **esxi.mem.latency.avg** <br>(gauge) | Porcentaje de tiempo que la máquina virtual está esperando para acceder a la memoria intercambiada o comprimida<br>_Se muestra como porcentaje_ |
| **esxi.mem.llSwapIn.avg** <br>(gauge) | Cantidad de memoria intercambiada desde la caché del host<br>_Se muestra como kibibyte_ |
| **esxi.mem.llSwapInRate.avg** <br>(gauge) | Tasa a la que se intercambia memoria de la caché del host a la memoria activa<br>_Se muestra como kibibyte_ |
| **esxi.mem.llSwapOut.avg** <br>(gauge) | Cantidad de memoria intercambiada a la caché del host<br>_Se muestra como kibibyte_ |
| **esxi.mem.llSwapOutRate.avg** <br>(gauge) | Tasa a la que se intercambia memoria de la memoria activa a la caché del host<br>_Se muestra como kibibyte_ |
| **esxi.mem.llSwapUsed.avg** <br>(gauge) | Espacio utilizado para almacenar en caché las páginas intercambiadas en la caché del host<br>_Se muestra como kibibyte_ |
| **esxi.mem.lowfreethreshold.avg** <br>(gauge) | Umbral de memoria física libre del host por debajo del cual ESX/ESXi comenzará a recuperar memoria de las máquinas virtuales mediante ballooning y swapping<br>_Se muestra como kibibyte_ |
| **esxi.mem.overhead.avg** <br>(gauge) | Memoria física del host consumida por la infraestructura de virtualización para ejecutar la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.overheadMax.avg** <br>(gauge) | Memoria física del host reservada para su uso como sobrecarga de virtualización para la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.overheadTouched.avg** <br>(gauge) | Memoria física del host de sobrecarga activamente tocada (KB) reservada para su uso como sobrecarga de virtualización para la máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.reservedCapacity.avg** <br>(gauge) | Cantidad total de reserva de memoria utilizada por las máquinas virtuales encendidas y los servicios vSphere en el host<br>_Se muestra como mebibyte_ |
| **esxi.mem.shared.avg** <br>(gauge) | Cantidad de memoria física del invitado que se comparte con otras máquinas virtuales, en relación con una sola máquina virtual o con todas las máquinas virtuales encendidas en un host<br>_Se muestra como kibibyte_ |
| **esxi.mem.sharedcommon.avg** <br>(gauge) | Cantidad de memoria de máquina compartida por todas las máquinas virtuales encendidas y los servicios de vSphere en el host<br>_Se muestra como kibibyte_ |
| **esxi.mem.state.latest** <br>(gauge) | Uno de los cuatro niveles de umbral que representan el porcentaje de memoria libre en el host. El valor del contador determina el comportamiento de swapping y ballooning para la recuperación de memoria<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapin.avg** <br>(gauge) | Cantidad de memoria intercambiada desde el disco<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapinRate.avg** <br>(gauge) | Tasa a la que la memoria se intercambia desde el disco a la memoria activa<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapout.avg** <br>(gauge) | Cantidad de memoria intercambiada a disco<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapoutRate.avg** <br>(gauge) | Tasa a la que se intercambia memoria de la memoria activa al disco<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapped.avg** <br>(gauge) | Cantidad actual de memoria física del invitado intercambiada al archivo de intercambio de la máquina virtual por el VMkernel. La memoria intercambiada permanece en disco hasta que la máquina virtual la necesita. Esta estadística se refiere al intercambio del VMkernel y no al intercambio del SO invitado<br>_Se muestra como kibibyte_ |
| **esxi.mem.swaptarget.avg** <br>(gauge) | Tamaño objetivo para el archivo swap de la máquina virtual. El VMkernel gestiona el swap comparando swaptarget con swapped<br>_Se muestra como kibibyte_ |
| **esxi.mem.swapused.avg** <br>(gauge) | Cantidad de memoria utilizada por swap. Suma de la memoria intercambiada de todas las máquinas virtuales encendidas y los servicios de vSphere en el host<br>_Se muestra como kibibyte_ |
| **esxi.mem.sysUsage.avg** <br>(gauge) | Cantidad de memoria física del host utilizada por el VMkernel para la funcionalidad principal, como los controladores de dispositivos y otros usos internos. No incluye la memoria utilizada por las máquinas virtuales o los servicios vSphere<br>_Se muestra como kibibyte_ |
| **esxi.mem.totalCapacity.avg** <br>(gauge) | Cantidad total de reserva de memoria utilizada y disponible para máquinas virtuales encendidas y servicios vSphere en el host<br>_Se muestra como mebibyte_ |
| **esxi.mem.unreserved.avg** <br>(gauge) | Cantidad de memoria no reservada. Reserva de memoria no utilizada por la consola de servicio, el VMkernel, los servicios vSphere y otras máquinas virtuales encendidas. Reservas de memoria especificadas por el usuario y memoria de gastos generales<br>_Se muestra como kibibyte_ |
| **esxi.mem.usage.avg** <br>(gauge) | Uso de memoria como porcentaje de la memoria total configurada o disponible<br>_Se muestra como porcentaje_ |
| **esxi.mem.vmfs.pbc.capMissRatio.latest** <br>(gauge) | Media final de la relación entre fallos de capacidad y fallos obligatorios para la caché PB de VMFS<br>_Se muestra como porcentaje_ |
| **esxi.mem.vmfs.pbc.overhead.latest** <br>(gauge) | Cantidad de heap de VMFS utilizada por la caché PB de VMFS<br>_Se muestra como kibibyte_ |
| **esxi.mem.vmfs.pbc.size.latest** <br>(gauge) | Espacio utilizado para mantener los bloques de punteros VMFS en la memoria<br>_Se muestra como mebibyte_ |
| **esxi.mem.vmfs.pbc.sizeMax.latest** <br>(gauge) | Tamaño máximo que puede alcanzar la caché de bloques de punteros VMFS<br>_Se muestra como mebibyte_ |
| **esxi.mem.vmfs.pbc.workingSet.latest** <br>(gauge) | Cantidad de bloques de archivos cuyas direcciones se almacenan en caché en la caché PB de VMFS<br>_Se muestra como tebibyte_ |
| **esxi.mem.vmfs.pbc.workingSetMax.latest** <br>(gauge) | Cantidad máxima de bloques de archivo cuyas direcciones se almacenan en caché en la caché PB de VMFS<br>_Se muestra como tebibyte_ |
| **esxi.mem.vmmemctl.avg** <br>(gauge) | Cantidad de memoria asignada por el controlador de control de memoria de la máquina virtual (vmmemctl)<br>_Se muestra como kibibyte_ |
| **esxi.mem.vmmemctltarget.avg** <br>(gauge) | Valor objetivo establecido por VMkernal para el tamaño del globo de memoria de la máquina virtual. Junto con la métrica vmmemctl, esta métrica es utilizada por VMkernel para inflar y desinflar el globo de una máquina virtual<br>_Se muestra como kibibyte_ |
| **esxi.mem.zero.avg** <br>(gauge) | Memoria que solo contiene 0s. Incluida en la cantidad compartida. Mediante el uso compartido transparente de la página, las páginas de memoria cero pueden compartirse entre máquinas virtuales que ejecuten el mismo sistema operativo<br>_Se muestra como kibibyte_ |
| **esxi.mem.zipSaved.latest** <br>(gauge) | Memoria ahorrada gracias a la compresión de memoria<br>_Se muestra como kibibyte_ |
| **esxi.mem.zipped.latest** <br>(gauge) | Memoria comprimida<br>_Se muestra como kibibyte_ |
| **esxi.net.broadcastRx.sum** <br>(gauge) | Número de paquetes de difusión recibidos<br>_Se muestra como paquete_ |
| **esxi.net.broadcastTx.sum** <br>(gauge) | Número de paquetes de difusión transmitidos<br>_Se muestra como paquete_ |
| **esxi.net.bytesRx.avg** <br>(gauge) | Cantidad media de datos recibidos por segundo<br>_Se muestra como kibibyte_ |
| **esxi.net.bytesTx.avg** <br>(gauge) | Cantidad media de datos transmitidos por segundo<br>_Se muestra como kibibyte_ |
| **esxi.net.droppedRx.sum** <br>(gauge) | Número de paquetes recibidos descartados<br>_Se muestra como paquete_ |
| **esxi.net.droppedTx.sum** <br>(gauge) | Número de paquetes transmitidos perdidos<br>_Se muestra como paquete_ |
| **esxi.net.errorsRx.sum** <br>(gauge) | Número de paquetes con errores recibidos<br>_Se muestra como paquete_ |
| **esxi.net.errorsTx.sum** <br>(gauge) | Número de paquetes con errores transmitidos<br>_Se muestra como paquete_ |
| **esxi.net.multicastRx.sum** <br>(gauge) | Número de paquetes multicast recibidos<br>_Se muestra como paquete_ |
| **esxi.net.multicastTx.sum** <br>(gauge) | Número de paquetes multicast transmitidos<br>_Se muestra como paquete_ |
| **esxi.net.packetsRx.sum** <br>(gauge) | Número de paquetes recibidos<br>_Se muestra como paquete_ |
| **esxi.net.packetsTx.sum** <br>(gauge) | Número de paquetes transmitidos<br>_Se muestra como paquete_ |
| **esxi.net.pnicBytesRx.avg** <br>(gauge) | |
| **esxi.net.pnicBytesTx.avg** <br>(gauge) | |
| **esxi.net.received.avg** <br>(gauge) | Tasa media a la que se han recibido los datos durante el intervalo. Representa el ancho de banda de la red<br>_Se muestra como kibibyte_ |
| **esxi.net.transmitted.avg** <br>(gauge) | Tasa media a la que se han transmitido los datos durante el intervalo. Representa el ancho de banda de la red<br>_Se muestra como kibibyte_ |
| **esxi.net.unknownProtos.sum** <br>(gauge) | Número de frames con protocolo desconocido recibidos<br>_Se muestra como kibibyte_ |
| **esxi.net.usage.avg** <br>(gauge) | Utilización de la red (tasas de transmisión y recepción combinadas)<br>_Se muestra como kibibyte_ |
| **esxi.power.energy.sum** <br>(gauge) | Energía total (en julios) utilizada desde la última puesta a cero de las estadísticas.|
| **esxi.power.power.avg** <br>(gauge) | Consumo actual de energía<br>_Se muestra en vatios_ |
| **esxi.power.powerCap.avg** <br>(gauge) | Uso máximo de energía permitido.<br>_Se muestra en vatios_ |
| **esxi.rescpu.actav1.latest** <br>(gauge) | Media de CPU activa durante 1 minuto<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.actav15.latest** <br>(gauge) | Media de CPU activa durante 15 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.actav5.latest** <br>(gauge) | Media de CPU activa durante 5 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.actpk1.latest** <br>(gauge) | Pico de actividad de la CPU durante 1 minuto<br>_Se muestra en porcentaje_ |
| **esxi.rescpu.actpk15.latest** <br>(gauge) | Pico de actividad de la CPU durante 15 minutos<br>_Se muestra en porcentaje_ |
| **esxi.rescpu.actpk5.latest** <br>(gauge) | Pico de actividad de la CPU durante 5 minutos<br>_Se muestra en porcentaje_ |
| **esxi.rescpu.maxLimited1.latest** <br>(gauge) | Cantidad de recursos de CPU por encima del límite que fueron rechazados, media de 1 minuto<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.maxLimited15.latest** <br>(gauge) | Cantidad de recursos de CPU por encima del límite que fueron rechazados, media de 15 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.maxLimited5.latest** <br>(gauge) | Cantidad de recursos de CPU por encima del límite que fueron rechazados, media de 5 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.runav1.latest** <br>(gauge) | Media de funcionamiento de la CPU durante 1 minuto<br>_Se muestra en porcentaje_ |
| **esxi.rescpu.runav15.latest** <br>(gauge) | Media de funcionamiento de la CPU durante 15 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.runav5.latest** <br>(gauge) | Media de funcionamiento de la CPU durante 5 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.runpk1.latest** <br>(gauge) | Pico de funcionamiento de la CPU durante 1 minuto<br>_Se muestra en porcentaje_ |
| **esxi.rescpu.runpk15.latest** <br>(gauge) | Pico de funcionamiento de la CPU durante 15 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.runpk5.latest** <br>(gauge) | Pico de funcionamiento de la CPU durante 5 minutos<br>_Se muestra como porcentaje_ |
| **esxi.rescpu.sampleCount.latest** <br>(gauge) | Recuento de muestras de CPU de grupo.|
| **esxi.rescpu.samplePeriod.latest** <br>(gauge) | Periodo de muestreo de la CPU del grupo.<br>_Se muestra en milisegundos_ |
| **esxi.storageAdapter.commandsAveraged.avg** <br>(gauge) | Número medio de comandos emitidos por segundo por el adaptador de almacenamiento<br>_Se muestra como comando_ |
| **esxi.storageAdapter.maxTotalLatency.latest** <br>(gauge) | Valor de latencia más alto de todos los adaptadores de almacenamiento utilizados por el host<br>_Se muestra en milisegundos_ |
| **esxi.storageAdapter.numberReadAveraged.avg** <br>(gauge) | Número medio de comandos de lectura emitidos por segundo por el adaptador de almacenamiento<br>_Se muestra como comando_ |
| **esxi.storageAdapter.numberWriteAveraged.avg** <br>(gauge) | Número medio de comandos de escritura emitidos por segundo por el adaptador de almacenamiento<br>_Se muestra como comando_ |
| **esxi.storageAdapter.read.avg** <br>(gauge) | Tasa de lectura de datos por el adaptador de almacenamiento<br>_Se muestra como kibibyte_ |
| **esxi.storageAdapter.totalReadLatency.avg** <br>(gauge) | Tiempo medio de una operación de lectura del adaptador de almacenamiento<br>_Se muestra en milisegundos_ |
| **esxi.storageAdapter.totalWriteLatency.avg** <br>(gauge) | Tiempo medio de una operación de escritura del adaptador de almacenamiento<br>_Se muestra en milisegundos_ |
| **esxi.storageAdapter.write.avg** <br>(gauge) | Tasa de escritura de datos por el adaptador de almacenamiento<br>_Se muestra como kibibyte_ |
| **esxi.storagePath.commandsAveraged.avg** <br>(gauge) | Número medio de comandos emitidos por segundo en la ruta de almacenamiento durante el intervalo de recopilación<br>_Se muestra como comando_ |
| **esxi.storagePath.maxTotalLatency.latest** <br>(gauge) | Valor de latencia más alto de todas las rutas de almacenamiento utilizadas por el host<br>_Se muestra en milisegundos_ |
| **esxi.storagePath.numberReadAveraged.avg** <br>(gauge) | Número medio de comandos de lectura emitidos por segundo en la ruta de almacenamiento durante el intervalo de recopilación|
| **esxi.storagePath.numberWriteAveraged.avg** <br>(gauge) | Número medio de comandos de escritura emitidos por segundo en la ruta de almacenamiento durante el intervalo de recopilación.|
| **esxi.storagePath.read.avg** <br>(gauge) | Tasa de lectura de datos en la ruta de almacenamiento<br>_Se muestra como kibibyte_ |
| **esxi.storagePath.totalReadLatency.avg** <br>(gauge) | Cantidad media de tiempo para una lectura emitida en la ruta de almacenamiento. Latencia total = latencia del núcleo + latencia del dispositivo.<br>_Se muestra en milisegundos_ |
| **esxi.storagePath.totalWriteLatency.avg** <br>(gauge) | Cantidad media de tiempo para una escritura emitida en la ruta de almacenamiento. Latencia total = latencia del núcleo + latencia del dispositivo.<br>_Se muestra en milisegundos_ |
| **esxi.storagePath.write.avg** <br>(gauge) | Tasa de escritura de datos en la ruta de almacenamiento<br>_Se muestra como kibibyte_ |
| **esxi.sys.heartbeat.latest** <br>(gauge) | Número de latidos emitidos por máquina virtual|
| **esxi.sys.osUptime.latest** <br>(gauge) | Tiempo total transcurrido, en segundos, desde el último arranque del sistema operativo<br>_Se muestra como segundo_ |
| **esxi.sys.resourceCpuAct1.latest** <br>(gauge) | Media de CPU activa durante 1 minuto del grupo de recursos del sistema<br>_Se muestra en porcentaje_ |
| **esxi.sys.resourceCpuAct5.latest** <br>(gauge) | Media de CPU activa durante 5 minutos del grupo de recursos del sistema<br>_Se muestra en porcentaje_ |
| **esxi.sys.resourceCpuAllocMax.latest** <br>(gauge) | Límite de asignación de CPU (en MHz) del grupo de recursos del sistema<br>_Se muestra en megahercios_. |
| **esxi.sys.resourceCpuAllocMin.latest** <br>(gauge) | Reserva de asignación de CPU (en MHz) del grupo de recursos del sistema<br>_Se muestra en megahercios_ |
| **esxi.sys.resourceCpuAllocShares.latest** <br>(gauge) | Cuotas de asignación de CPU del grupo de recursos del sistema|
| **esxi.sys.resourceCpuMaxLimited1.latest** <br>(gauge) | CPU máxima limitada durante 1 minuto del grupo de recursos del sistema<br>_Se muestra en porcentaje_ |
| **esxi.sys.resourceCpuMaxLimited5.latest** <br>(gauge) | CPU máxima limitada durante 5 minutos del grupo de recursos del sistema<br>_Se muestra en porcentaje_ |
| **esxi.sys.resourceCpuRun1.latest** <br>(gauge) | Media de funcionamiento de la CPU durante 1 minuto del grupo de recursos del sistema<br>_Se muestra como porcentaje_ |
| **esxi.sys.resourceCpuRun5.latest** <br>(gauge) | Media de funcionamiento de la CPU durante 5 minutos del grupo de recursos del sistema<br>_Se muestra en porcentaje_ |
| **esxi.sys.resourceCpuUsage.avg** <br>(gauge) | Cantidad de CPU utilizada por la consola de servicio y otras aplicaciones durante el intervalo por la consola de servicio y otras aplicaciones.<br>_Se muestra en megahercios_ |
| **esxi.sys.resourceFdUsage.latest** <br>(gauge) | Número de descriptores de archivo utilizados por el grupo de recursos del sistema|
| **esxi.sys.resourceMemAllocMax.latest** <br>(gauge) | Límite de asignación de memoria (en KB) del grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemAllocMin.latest** <br>(gauge) | Reserva de asignación de memoria (en KB) del grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemAllocShares.latest** <br>(gauge) | Cuotas de asignación de memoria del grupo de recursos del sistema|
| **esxi.sys.resourceMemConsumed.latest** <br>(gauge) | Memoria consumida por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemCow.latest** <br>(gauge) | Memoria compartida por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemMapped.latest** <br>(gauge) | Memoria asignada por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemOverhead.latest** <br>(gauge) | Memoria consumida por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemShared.latest** <br>(gauge) | Memoria ahorrada gracias al uso compartido por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemSwapped.latest** <br>(gauge) | Memoria intercambiada por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemTouched.latest** <br>(gauge) | Memoria afectada por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.resourceMemZero.latest** <br>(gauge) | Memoria llena a cero utilizada por el grupo de recursos del sistema<br>_Se muestra como kibibyte_ |
| **esxi.sys.uptime.latest** <br>(gauge) | Tiempo total transcurrido desde el último arranque del sistema<br>_Se muestra como segundo_ |
| **esxi.virtualDisk.largeSeeks.latest** <br>(gauge) | Número de búsquedas durante el intervalo que estuvieron separadas por más de 8192 LBNs|
| **esxi.virtualDisk.mediumSeeks.latest** <br>(gauge) | Número de búsquedas durante el intervalo que estaban separadas entre 64 y 8192 LBNs|
| **esxi.virtualDisk.numberReadAveraged.avg** <br>(gauge) | Número medio de comandos de lectura emitidos por segundo al disco virtual<br>_Se muestra como comando_ |
| **esxi.virtualDisk.numberWriteAveraged.avg** <br>(gauge) | Número medio de comandos de escritura emitidos por segundo en el disco virtual<br>_Se muestra como comando_ |
| **esxi.virtualDisk.read.avg** <br>(gauge) | Número medio de kilobytes leídos del disco virtual cada segundo<br>_Se muestra como kibibyte_ |
| **esxi.virtualDisk.readIOSize.latest** <br>(gauge) | Tamaño medio de la solicitud de lectura en bytes|
| **esxi.virtualDisk.readLatencyUS.latest** <br>(gauge) | Latencia de lectura en microsegundos<br>_Se muestra como microsegundo_ |
| **esxi.virtualDisk.readLoadMetric.latest** <br>(gauge) | Métrica de disco virtual de Storage DRS para el modelo de carga de trabajo de lectura|
| **esxi.virtualDisk.readOIO.latest** <br>(gauge) | Número medio de solicitudes de lectura pendientes en el disco virtual<br>_Se muestra como solicitud_ |
| **esxi.virtualDisk.smallSeeks.latest** <br>(gauge) | Número de búsquedas durante el intervalo que estuvieron separadas por menos de 64 LBNs|
| **esxi.virtualDisk.totalReadLatency.avg** <br>(gauge) | Tiempo medio de una operación de lectura del disco virtual<br>_Se muestra en milisegundos_ |
| **esxi.virtualDisk.totalWriteLatency.avg** <br>(gauge) | Tiempo medio de una operación de escritura desde el disco virtual<br>_Se muestra en milisegundos_ |
| **esxi.virtualDisk.write.avg** <br>(gauge) | Número medio de kilobytes escritos en el disco virtual cada segundo<br>_Se muestra como kibibyte_ |
| **esxi.virtualDisk.writeIOSize.latest** <br>(gauge) | Tamaño medio de la solicitud de escritura en bytes|
| **esxi.virtualDisk.writeLatencyUS.latest** <br>(gauge) | Latencia de escritura en microsegundos<br>_Se muestra como microsegundo_ |
| **esxi.virtualDisk.writeLoadMetric.latest** <br>(gauge) | Métrica de disco virtual de Storage DRS para el modelo de carga de trabajo de escritura|
| **esxi.virtualDisk.writeOIO.latest** <br>(gauge) | Número medio de solicitudes de escritura pendientes en el disco virtual<br>_Se muestra como solicitud_ |
| **esxi.vm.count** <br>(gauge) | Series temporales con valor 1 para cada máquina virtual. Realiza consultas 'sum by {X}' para contar todas las máquinas virtuales con la etiqueta X.|

#### Recopilación de métricas por instancia

**Nota**: La integración de ESXi tiene la capacidad de recopilar tanto métricas por recurso (como las relacionadas con las CPUs), como métricas por instancia (como las relacionadas con los núcleos de CPU). Como tal, hay métricas que son solo por recurso, por instancia o ambas.
Un recurso representa una representación física o virtual de una máquina. Puede representarse por vm, host, almacén de datos, clúster en vSphere.
Una instancia representa entidades individuales que se encuentran dentro de un recurso. Puedes encontrar más información sobre los recursos de vSphere en el [documento técnico VMWare Infrastructure Architecture Overview](https://www.vmware.com/pdf/vi_architecture_wp.pdf).

Por defecto, la integración de ESXi solo recopila métricas por recurso, lo que provoca que algunas métricas que son por instancia sean ignoradas. Éstas pueden configurarse utilizando la opción `collect_per_instance_filters`. Véase un ejemplo a continuación:

```
collect_per_instance_filters:
  host:
    - 'disk\.totalLatency\.avg'
    - 'disk\.deviceReadLatency\.avg'
```

Las métricas `disk` son específicas de cada disco en el host, por lo tanto estas métricas necesitan ser habilitadas utilizando `collect_per_instance_filters` para poder ser recopiladas.

### Eventos

La integración de ESXi no incluye ningún evento.

### Checks de servicio

La integración de ESXi no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).