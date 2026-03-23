---
description: Un inventario de todos tus hosts acelerados por GPU que te ayuda a diagnosticar
  problemas de rendimiento.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimiza y soluciona problemas de infraestructura de IA con la Monitorización
    de GPU de Datadog.
private: true
title: Página de Monitorización de GPU.
---
## Resumen

La [página de la flota de GPU][0] proporciona un inventario detallado de todos tus hosts acelerados por GPU para un período de tiempo específico. Utiliza esta vista para descubrir ineficiencias a través de la telemetría de recursos, que abarca desde métricas de rendimiento y uso hasta costos. Esta página también presenta las recomendaciones de aprovisionamiento y optimización de rendimiento de Datadog para tus dispositivos, para ayudarte a maximizar el valor de tu gasto en GPU. 

## Desglosa tu infraestructura por clúster, host o dispositivo.

Primero selecciona cómo deseas entender tu flota de GPU utilizando el interruptor que agrupa tu flota por clúster de Kubernetes (disponible solo para usuarios de Kubernetes), Host (Nodo) o dispositivo GPU:

{{< img src="gpu_monitoring/fleet-toggle-2.png" alt="Interruptor para la página de flota de GPU que agrupa los resultados de la tabla por Clúster de Kubernetes, Host o Dispositivo." style="width:90%;" >}}

Tu selección se utiliza para llenar la tabla resultante. Si seleccionas _Clúster_ o _Host_, puedes hacer clic en el botón **`>`** al lado de cada entrada de la tabla para ver los hosts de un clúster o los dispositivos de un host, respectivamente. 

{{< img src="gpu_monitoring/host_row_expansion.png" alt="Una entrada de host en la tabla." style="width:90%;" >}}

**Nota**: La tabla de Clúster solo se llena si utilizas Kubernetes.

### Explora tu flota de GPU con filtros y agrupaciones.

Utiliza los menús desplegables de filtro rápido en la parte superior de la página para filtrar por un **Proveedor**, **Tipo de Dispositivo**, **Clúster**, **Región**, **Servicio**, **Centro de Datos**, **Entorno** o **Equipo**.

También puedes **Buscar** o **Agrupar** por otras etiquetas en los campos que se muestran a continuación. Por ejemplo, puedes seleccionar el interruptor para Host y luego agrupar por `Team` para ver una entrada de tabla para cada equipo único. Haz clic en el botón **`>`** al lado de cualquier entrada para ver los hosts utilizados por ese equipo y los dispositivos GPU que aceleran esos hosts. 

**Nota**: Solo puedes **Agrupar por** una etiqueta adicional.

{{< img src="gpu_monitoring/filters_and_groupings-2.png" alt="El menú para filtrar y agrupar en la página de la flota de GPU" style="width:90%;" >}}

## Vistas impulsadas por casos de uso
Datadog te guía a través de tus flujos de trabajo de aprovisionamiento y optimización de rendimiento al proporcionar dos vistas dedicadas impulsadas por casos de uso. 

### Aprovisionamiento
La pestaña de Aprovisionamiento muestra recomendaciones clave e información sobre métricas para asignar y gestionar tu capacidad. 

{{< img src="gpu_monitoring/provisioning-tab.png" alt="La vista impulsada por casos de uso de Aprovisionamiento" style="width:90%;" >}}

Recomendaciones OOTB: 
- Datadog detecta proactivamente la reducción térmica o defectos de hardware y recomienda instantáneamente remediaciones basadas en errores de hardware como errores ECC/XID.
- Datadog detecta si los dispositivos inactivos deben ser aprovisionados para evitar que los dispositivos permanezcan inactivos.

Métricas relevantes para tu flujo de trabajo de aprovisionamiento: 
- Conteo de errores ECC y XID
- Actividad gráfica
- Actividad de SM
- Memoria de GPU
- Dispositivos asignados (solo disponible para usuarios de Kubernetes) 
- Dispositivos activos
- Costo inactivo

### Rendimiento
La pestaña de Rendimiento te ayuda a entender la ejecución de cargas de trabajo y a ajustar la utilización de la GPU para usar tus dispositivos de manera más efectiva.

{{< img src="gpu_monitoring/performance-tab.png" alt="La vista impulsada por casos de uso de Rendimiento" style="width:90%;" >}}

Recomendaciones OOTB: 
- Si tus cargas de trabajo son intensivas en CPU, Datadog señala los hosts con saturación de CPU y recomienda soluciones.
- Si tus cargas de trabajo no están utilizando efectivamente sus dispositivos de GPU asignados, Datadog proporciona recomendaciones para ajustar las cargas de trabajo y obtener más valor de su capacidad.

Métricas relevantes para tu flujo de trabajo de rendimiento: 
- Conteo de errores ECC y XID
- Actividad gráfica
- Actividad de SM
- Memoria de GPU
- Dispositivos Efectivos
- Potencia
- Temperatura
- PCIe RX
- PCIe Tx
- Utilización de CPU

## Gráfico Resumen

Después de alternar entre Clúster, Host o Dispositivo, el **Gráfico Resumen** muestra la telemetría clave de recursos a través de toda tu infraestructura de GPU agrupada por ese valor de alternancia. Expande la sección a continuación para ver una tabla de las métricas disponibles y lo que representan. 

{{% collapse-content title="Consulta la lista completa de métricas de GPU" level="h4" expanded=false id="gpu-metrics-table" %}}
| Métrica                | Definición                                                              | Nombre de Métrica                                    |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Utilización de Núcleo      | (Solo disponible con el Sistema de Sondeo habilitado para métricas avanzadas de eBPF) `Cores Used/Cores Limit` para procesos de GPU. Medida de Utilización Temporal del Núcleo.| `gpu_core_utilization`  
| Utilización de Memoria    | Memoria de GPU utilizada / Límite de Memoria de GPU para procesos de GPU. | `gpu_memory_utilization`
| Rendimiento PCIe       | Bytes recibidos y bytes transmitidos a través de PCI desde el dispositivo GPU por segundo. | `gpu.pci.throughput.rx`,`gpu.pci.throughput.tx` 
| Actividad Gráfica     | Porcentaje de tiempo que el motor gráfico estuvo activo. | `gpu.gr_engine_active`
| Actividad SM           | Porcentaje de tiempo que el multiprocesador de transmisión estuvo activo. | `gpu.sm_active`
| Potencia                 | Uso de energía para el dispositivo GPU.<br>**Nota**: En arquitecturas GA100 y anteriores, esto representa la potencia instantánea en ese momento.<br>Para arquitecturas más nuevas, representa el consumo promedio de energía (Watts) durante un segundo. | `gpu.power.usage`
| Temperatura           | Temperatura de un dispositivo GPU. | `gpu.temperature`
| Núcleos Usados            | (Solo emitido si hay procesos activos) Número promedio de núcleos GPU que un proceso estaba utilizando en el intervalo.  | `gpu.core.usage`
| Memoria Usada           | (Solo emitido si hay procesos activos) La memoria utilizada por este proceso en el momento en que se consultó la métrica. | `gpu.memory.usage`
| Total de Dispositivos          | Conteo de todos los dispositivos que envían datos durante este período de tiempo. | `gpu.device.total`
{{% /collapse-content %}} 

Si has seleccionado una etiqueta adicional para agrupar---por ejemplo, _equipo_---cada serie temporal única en el Gráfico Resumen corresponde al valor de un equipo para la métrica seleccionada.

## Inventario de tu infraestructura impulsada por GPU

Esta tabla desglosa tu infraestructura impulsada por GPU según cualquier etiqueta de tu elección. Si no has especificado una etiqueta adicional en el campo **Agrupar por**, los resultados se agrupan según tu vista seleccionada: Clúster, Host o Dispositivo.

Por defecto, la tabla de resultados muestra las siguientes columnas: 

- Tipo de dispositivo 
- Actividad del motor gráfico 
- Actividad de SM (solo si la sonda del sistema está habilitada) 
- Utilización del núcleo 
- Utilización de la memoria 
- Costo de inactividad
- Recomendación

Puede hacer clic en el ícono de engranaje para personalizar qué métricas se muestran en la tabla. Expanda la sección a continuación para ver una lista completa de las métricas disponibles. 

{{% collapse-content title="Vea la lista completa de métricas disponibles" level="h4" expanded=false id="metric-full-list" %}}
| Métrica                | Definición                                                              | Nombre de Métrica                                    |
| ----------------------| ------------------------------------------------------------------------| ---------------------------------------------  |
| Utilización de CPU       | El porcentaje de tiempo que la CPU pasó ejecutando procesos en el espacio de usuario. Mostrado como porcentaje. | `system.cpu.user`
| Tipo de dispositivo           | Tipo de dispositivo GPU. | `gpu_device`
| Dispositivos totales         | Conteo de todos los dispositivos que envían datos durante este período de tiempo. | `gpu.device.total`
| Dispositivos asignados     | (solo disponible si se utiliza Kubernetes) Conteo de dispositivos que han sido asignados a una carga de trabajo. | `gpu.device.total`
| Dispositivos activos        | Conteo de dispositivos que se utilizan activamente para una carga de trabajo / ocupados. Si se utiliza Kubernetes: cantidad de dispositivos asignados que están siendo utilizados activamente para una carga de trabajo. | `gpu.gr_engine_active`
| Dispositivos Efectivos     | Cantidad de dispositivos que están en uso y funcionando por más del 50% de su vida útil. | `gpu.sm_active`
| Actividad del Motor Gráfico| Porcentaje de tiempo que el motor gráfico estuvo activo. | `gpu.gr_engine_active`
| Actividad de SM           | Porcentaje de tiempo que el multiprocesador de streaming estuvo activo. | `gpu.sm_active`
| Reloj de SM              | Frecuencia del reloj de SM en MHz. | `gpu.clock_speed.sm`
| Rendimiento de PCIe RX    | Bytes recibidos a través de PCI desde el dispositivo GPU por segundo. | `gpu.pci.throughput.rx`
| Rendimiento de PCIe TX    | Bytes transmitidos a través de PCI al dispositivo GPU por segundo. | `gpu.pci.throughput.tx`
| Potencia                 | Uso de energía para el dispositivo GPU.<br>**Nota**: En arquitecturas GA100 y anteriores, esto representa la potencia instantánea en ese momento.<br>Para arquitecturas más nuevas, representa el consumo promedio de energía (Watts) durante un segundo. | `gpu.power.usage`
| Temperatura           | Temperatura de un dispositivo GPU. | `gpu.temperature`
| Núcleos Usados            | (Solo emitido si hay procesos activos) Número promedio de núcleos GPU que un proceso estaba utilizando en el intervalo.  | `gpu.core.usage`
| Núcleos de GPU           | Número de núcleos de GPU que el proceso, contenedor o dispositivo tiene disponibles. | `gpu.core.limit`
| Memoria Usada           | (Solo se emite si hay procesos activos) La memoria utilizada por este proceso en el momento en que se envió la métrica. | `gpu.memory.usage`
| Límite de Memoria          | La cantidad máxima de memoria que un proceso, contenedor o dispositivo podría asignar. | `gpu.memory.limit`
| Toneladas Métricas de CO2       | Las toneladas métricas de dióxido de carbono equivalente (MTCO2e) son una unidad de medida que compara las emisiones de gases de efecto invernadero según su potencial de calentamiento global (GWP). Se calcula multiplicando la cantidad de un gas por su GWP. Por ejemplo, si el metano tiene un GWP de 21, entonces 1 millón de toneladas métricas de metano es equivalente a 21 millones de toneladas métricas de dióxido de carbono. | Fórmula basada en `gpu.power.usage`
| Utilización del Núcleo      | (Solo disponible si se habilita la Sonda del Sistema) `Cores Used/Cores Limit` para procesos de GPU. Medida de la Utilización Temporal del Núcleo. | `gpu_core_utilization`  
| Utilización de Memoria    | Memoria de GPU utilizada / Límite de Memoria de GPU para procesos de GPU. | `gpu_memory_utilization`
| Costo Inactivo             | (Solo no cero para intervalos de tiempo mayores a 2 días) El costo de los recursos de GPU que están reservados y asignados, pero no utilizados.
{{% /collapse-content %}} 

## Panel lateral de detalles 

Hacer clic en cualquier fila en la tabla de Flota abre un panel lateral con más detalles para el clúster, host o dispositivo seleccionado.

### Entidades Conectadas 

La Monitoreo de GPU de Datadog no necesita depender del Exportador DCGM de NVIDIA. Utiliza el Agente de Datadog para observar las GPU directamente, proporcionando información sobre el uso y los costos de las GPU para los pods y procesos. En la sección **Entidades Conectadas** de cualquier vista de detalle, puedes ver la actividad de SM, la utilización de núcleos de GPU (solo si el Sistema de Sondeo está habilitado) y el uso de memoria de pods, procesos y trabajos de Slurm. Esto te ayuda a identificar qué cargas de trabajo reducir o optimizar para disminuir el gasto total. 

**Nota**: La pestaña **Pods** solo está disponible si estás utilizando Kubernetes.

{{< tabs >}}
{{% tab "Panel lateral del clúster" %}}

Dentro de este panel lateral, tienes un embudo específico del clúster que identifica:

- Número de dispositivos Totales, Asignados (solo para usuarios de Kubernetes), Activos y Efectivos dentro de ese clúster en particular
- Costo total estimado e inactivo de ese clúster
- Entidades conectadas de ese clúster: pods, procesos y trabajos de Slurm
- Cuatro métricas clave (personalizables) para ese clúster: Utilización de Núcleos (solo si el sistema de sondeo está habilitado), Utilización de Memoria, Rendimiento de PCIe y Actividad Gráfica
- Tabla de hosts asociados con ese clúster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Panel lateral específico del clúster que desglosa dispositivos inactivos, costos y entidades conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del host" %}}

Dentro de este panel lateral, tienes una vista específica del host que identifica:

- Metadatos relacionados con el host, como proveedor, tipo de instancia, utilización de CPU, memoria del sistema utilizada, memoria total del sistema, utilización de IO del sistema, actividad de SM y temperatura
- (solo disponible para usuarios de Kubernetes) Los dispositivos GPU específicos asignados a ese host ordenados por Actividad del Motor Gráfico
- Entidades Conectadas de ese host: pods, procesos y trabajos de Slurm

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Panel lateral específico del host que muestra los dispositivos GPU vinculados a ese host y Entidades Conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del dispositivo" %}}

Dentro de este panel lateral, tienes una vista específica del dispositivo que identifica:

- Recomendaciones (si las hay) sobre cómo utilizar este dispositivo de manera más efectiva 
- Detalles relacionados con el dispositivo: tipo de dispositivo, actividad de SM y temperatura
- Cuatro métricas clave relacionadas con las GPU: Actividad de SM, Utilización de Memoria, Potencia y Actividad del Motor Gráfico 
- Entidades conectadas de ese clúster: pods y procesos

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Panel lateral específico del dispositivo que muestra recomendaciones sobre cómo utilizar el dispositivo de manera más efectiva y otra telemetría clave." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Recomendaciones de instalación

Datadog supervisa activamente su infraestructura y detecta brechas de instalación que pueden disminuir el valor que obtiene del Monitoreo de GPU. En este modal, puede encontrar recomendaciones de actualización de instalación para obtener el valor óptimo del Monitoreo de GPU. Por ejemplo, asegurarse de que sus hosts tengan instalada la [última versión][1] del Agente de Datadog, instalar la última versión del controlador de NVIDIA y verificar hosts mal configurados.

Para ver características avanzadas de Monitoreo de GPU, como la atribución de recursos de GPU por procesos relacionados o trabajos de SLURM, debe habilitar [Procesos en Vivo][3] y la integración de [Slurm][4], respectivamente.

{{< img src="gpu_monitoring/installation.png" alt="Modal que contiene orientación de instalación para una experiencia de usuario más fluida en el Monitoreo de GPU." style="width:90%;" >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[2]: https://www.nvidia.com/drivers/
[3]: /es/infrastructure/process/
[4]: /es/integrations/slurm/