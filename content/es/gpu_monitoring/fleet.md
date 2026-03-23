---
description: Un inventario de todos tus hosts acelerados por GPU que te ayuda a diagnosticar
  problemas de rendimiento.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimiza y soluciona los problemas de la infraestructura de IA con Datadog
    GPU Monitoring
private: true
title: Page (página) de GPU Monitoring Fleet
---

## Información general

La [page (página) de GPU Fleet][0] proporciona un inventario detallado de todos tus hosts acelerados por GPU durante un periodo de tiempo especificado. Utiliza esta vista para descubrir ineficiencias a través de la telemetría de recursos, desde métricas de rendimiento y uso hasta costos. Esta page (página) también muestra recomendaciones predefinidas para el aprovisionamiento y la optimización del rendimiento para tus dispositivos, que te ayudan a maximizar el valor de tus gastos en GPU. 

## Desglosa tu infraestructura por clúster, host o dispositivo

En primer lugar selecciona cómo deseas comprender tu flota de GPU utilizando el conmutador que agrupa tu flota por clúster de Kubernetes (solo disponible para usuarios de Kubernetes), host (nodo) o dispositivo de GPU:

{{< img src="gpu_monitoring/fleet-toggle-2.png" alt="Conmutar a la page (página) de la flota de GPU que agrupa resultados de tablas por clúster, host o dispositivo de Kubernetes." style="width:90%;" >}}

Tu selección se utiliza para rellenar la tabla resultante. Si seleccionas _Clúster_ o _Host_, puedes hacer clic en el botón **`>`** junto a cada entrada de la tabla para ver los hosts de un cluster o los dispositivos de un host, respectivamente. 

{{< img src="gpu_monitoring/host_row_expansion.png" alt="Una entrada de host en la tabla" style="width:90%;" >}}

**Nota**: La tabla Clúster solo se rellena si se utiliza Kubernetes.

### Explora tu flota de GPU con filtros y agrupaciones

Utilice los filtros desplegables rápidos de la parte superior de la page (página) para filtrar por **Proveedor**, **Tipo de dispositivo**, **Clúster**, **Región**, **Servicio**, **Centro de datos**, **Entorno** o **Equipo** específico.

También puedes **Search** (Buscar) o **Group** (Agrupar) por otras tags (etiquetas) en los campos que se muestran a continuación. Por ejemplo, puedes seleccionar el conmutador para Host y luego agrupar por `Team` para ver una entrada de la tabla para cada equipo único. Haz clic en el botón **`>`** junto a cualquier entrada para ver los hosts utilizados por ese equipo y los dispositivos GPU que aceleran esos hosts. 

**Nota**: Solo puedes **Group by** (Agrupar por) una etiqueta adicional.

{{< img src="gpu_monitoring/filters_and_groupings-2.png" alt="El menú para filtrar y agrupar en la page (página) GPU Fleet" style="width:90%;" >}}

## Vistas orientadas al case (incidencia) de uso 
Datadog te guía a través de sus workflows (UI) / procesos (generic) de aprovisionamiento y optimización del rendimiento que te proporcionan dos vistas dedicadas orientadas al case (incidencia) de uso. 

### Suministro
La pestaña Aprovisionamiento muestra recomendaciones y métricas clave para asignar y gestionartu capacidad. 

{{< img src="gpu_monitoring/provisioning-tab.png" alt="La vista orientada al case (incidencia) de uso del aprovisionamiento" style="width:90%;" >}}

Recomendaciones predefinidas: 
- Datadog detecta de forma proactiva defectos de alternancia térmica o de hardware y recomienda al instante la corrección basada en errores de hardware como los errores ECC/XID.
- Datadog detecta si los dispositivos inactivos deben aprovisionarse para evitar que permanezcan inactivos.

Métricas relevantes para tu workflow (UI) / proceso (generic) de aprovisionamiento: 
- Número de errores ECC y XID
- Actividad gráfica
- Actividad SM
- Memoria GPU
- Dispositivos asignados
- Dispositivos activos
- Costo de inactividad

### Rendimiento
La pestaña Rendimiento te ayuda a comprender la ejecución de las cargas de trabajo y a ajustar la utilización de la GPU para utilizar tus dispositivos de forma más eficaz.

{{< img src="gpu_monitoring/performance-tab.png" alt="La vista orientada al case (incidencia)  de uso del aprovisionamiento" style="width:90%;" >}}

Recomendaciones predefinidas: 
- Si tus cargas de trabajo hacen un uso intensivo de la CPU, Datadog marca los hosts con saturación de CPU y recomienda soluciones.
- Si tus cargas de trabajo no están utilizando eficazmente los dispositivos de GPU asignados, Datadog proporciona recomendaciones para ajustar las cargas de trabajo con el fin de obtener más valor de su capacidad.

Métricas relevantes para tu workflow (UI) / proceso (generic) de rendimiento: 
- Número de errores ECC y XID
- Actividad gráfica
- Actividad SM
- Memoria GPU
- Dispositivos eficaces
- Potencia
- Temperatura
- PCIe RX
- PCIe Tx
- Utilización de la CPU

## Gráfico de resumen

Tras alternar entre Clúster, Host o Dispositivo, el **Summary Graph** (Gráfico de resumen) muestra la telemetría de recursos clave de toda tu infraestructura de GPU agrupada por ese valor de alternancia. Amplía la sección siguiente para ver una tabla de las métricas disponibles y lo que representan. 

{{% collapse-content title="See the full list of GPU metrics" level="h4" expanded=false id="gpu-metrics-table" %}}
| Métrica | Definición | Nombre de la métrica |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Utilización del núcleo | (Solo disponible con System Probe activado para métricas eBPF avanzadas) `Cores Used/Cores Limit` para procesos GPU. Medida de la utilización temporal del núcleo. `gpu_core_utilization` 
| Utilización de memoria | Memoria GPU utilizada / Límite de memoria GPU para procesos GPU. | `gpu_memory_utilization`
| Rendimiento de PCIe | Bytes recibidos y bytes transmitidos a través de PCI desde el dispositivo GPU por segundo. | `gpu.pci.throughput.rx`,`gpu.pci.throughput.tx` 
| Actividad Gráfica | Porcentaje de tiempo que el motor gráfico estuvo activo. | `gpu.gr_engine_active`
| Actividad SM | Porcentaje de tiempo que el multiprocesador de streaming estuvo activo. | `gpu.sm_active`
| Energía | Uso de energía para el dispositivo GPU.<br>**Nota**: En GA100 y arquitecturas anteriores, esto representa la potencia instantánea en ese momento.<br>Para arquitecturas más recientes, representa el consumo medio de energía (vatios) durante un segundo. | `gpu.power.usage`
| Temperatura | Temperatura de un dispositivo GPU. | `gpu.temperature`
| (Solo se emite si hay procesos activos) Número medio de núcleos de GPU utilizados por un proceso en el intervalo.  | `gpu.core.usage`
| (Solo se emite si los procesos están activos) La memoria utilizada por este proceso en el momento en que se consultó la métrica. | `gpu.memory.usage`
| Total de dispositivos | Recuento de todos los dispositivos que envían datos durante este intervalo de tiempo. | `gpu.device.total`
{{% /collapse-content %}} 

Si has seleccionado una tag (etiqueta) adicional para agrupar, por ejemplo, por _equipo_, cada serie temporal única del gráfico de resumen corresponde al valor de un equipo para la métrica seleccionada.

## Inventario de tu infraestructura basada en GPU

En esta tabla se desglosa tu infraestructura de GPU por cualquier tag (etiqueta) de tu elección. Si no has especificado una tag (etiqueta) adicional en el campo **Group by** (Agrupar por), los resultados se agrupan según la vista seleccionada: Clúster, Host o Dispositivo.

En forma predeterminada, la tabla de resultados muestra las siguientes columnas: 

- Tipo de dispositivo 
- Actividad del motor gráfico 
- Actividad SM (solo si la sonda del sistema está activada) 
- Utilización del núcleo 
- Utilización de la memoria 
- Costo de inactividad
- Recomendación

Puedes hacer clic en el icono de engranaje para personalizar las métricas que se muestran en la tabla. Amplía la sección siguiente para ver una lista completa de las métricas disponibles. 

{{% collapse-content title="See the full list of available metrics" level="h4" expanded=false id="metric-full-list" %}}
| Métrica | Definición | Nombre de la métrica |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Utilización de la CPU | Porcentaje de tiempo que la CPU dedica a ejecutar procesos de espacio de usuario. Se muestra como porcentaje. | `system.cpu.user`
| Tipo de dispositivo | Tipo de dispositivo GPU. | `gpu_device`
| Total de dispositivos | Número de todos los dispositivos que envían datos durante este periodo de tiempo. | `gpu.device.total`
| Dispositivos asignados | Número de dispositivos que se han asignado a una carga de trabajo. | `gpu.device.total`
| Dispositivos activos | Número de dispositivos asignados que se utilizan activamente para una carga de trabajo. | `gpu.gr_engine_active`
| Dispositivos eficaces | Número de dispositivos que se utilizan y funcionan durante más del 50% de su vida útil. | `gpu.sm_active`
| Actividad del motor gráfico | Porcentaje de tiempo que el motor gráfico estuvo activo. | `gpu.gr_engine_active`
| Actividad del SM | Porcentaje de tiempo que el multiprocesador de streaming estuvo activo. | `gpu.sm_active`
| Reloj SM | Frecuencia del reloj SM en MHz. | `gpu.clock_speed.sm`
| Rendimiento de PCIe RX | Bytes recibidos a través de PCI desde el dispositivo GPU por segundo. | `gpu.pci.throughput.rx`
| Rendimiento de PCIe TX | Bytes transmitidos a través de PCI al dispositivo GPU por segundo. | `gpu.pci.throughput.tx`
| Potencia | Consumo de energía del dispositivo GPU.<br>**Nota**: En GA100 y arquitecturas anteriores, esto representa la potencia instantánea en ese momento.<br>Para arquitecturas más recientes, representa el consumo medio de energía (vatios) durante un segundo. | `gpu.power.usage`
| Temperatura | Temperatura de un dispositivo GPU. | `gpu.temperature`
| (Solo se emite si hay procesos activos) Número medio de núcleos de GPU utilizados por un proceso en el intervalo.  | `gpu.core.usage`
| Límite de núcleos | Número de núcleos de GPU que el proceso, contenedor o dispositivo tiene disponibles. | `gpu.core.limit`
| Memoria utilizada (solo se emite si los procesos están activos) La memoria utilizada por este proceso en el momento en que se envió la métrica. | `gpu.memory.usage`
| Límite de memoria | La cantidad máxima de memoria que un proceso, contenedor o dispositivo puede asignar. | `gpu.memory.limit`
| Toneladas métricas de CO2 | Toneladas métricas equivalentes de dióxido de carbono (MTCO2e) es una unidad de medida que compara las emisiones de gases de efecto invernadero en función de su potencial de calentamiento global (PCG). Se calcula multiplicando la cantidad de un gas por su PCA. Por ejemplo, si el metano tiene un PCA de 21, 1 millón de toneladas métricas de metano equivale a 21 millones de toneladas métricas de dióxido de carbono. | Fórmula basada en `gpu.power.usage`
| Utilización del núcleo | (Solo disponible si System Probe está activado) `Cores Used/Cores Limit` para procesos GPU. Medida de la utilización temporal del núcleo. | `gpu_core_utilization` 
| Utilización de memoria | Memoria GPU utilizada / Límite de memoria GPU para procesos GPU. | `gpu_memory_utilization`
| Costo de inactividad (solo distinto de cero para periodos superiores a 2 días) Costo de los recursos de la GPU reservados y asignados, pero no utilizados.
{{% /collapse-content %}} 

## Panel lateral  de detalles

Al hacer clic en cualquier fila de la tabla Flota, se abre un panel lateral con más detalles sobre el clúster, el host o el dispositivo seleccionado.

### Entidades vinculadas 

GPU Monitoring de Datadog no necesita depender del exportador DCGM de NVIDIA. Utiliza el Datadog Agent para observar las GPU directamente, proporcionando información sobre el uso de la GPU y los costos de los pods y procesos. En la sección **Connected Entities** (Entidades conectadas) de cualquier vista detallada, puedes ver la actividad de SM, la utilización del núcleo de la GPU (solo si System Probe está activado) y el uso de memoria de los pods, procesos y trabajos Slurm. Esto te ayuda a identificar qué cargas de trabajo debes reducir u optimizar para disminuir el gasto total. 

**Nota**: La pestaña **Pods** solo está disponible si utilizas Kubernetes.

{{< tabs >}}
{{% tab "Panel lateral del clúster" %}}

Dentro de este panel lateral, tienes un embudo específico del clúster que identifica:

- Número de dispositivos totales, asignados, activos y efectivos dentro de ese clúster concreto.
- Estimación del costo total y ocioso de ese clúster
- Entidades conectadas de ese clúster: pods, procesos y trabajos Slurm.
- Cuatro métricas clave (personalizables) para ese clúster: Utilización de núcleos (solo si la sonda del sistema está activada), utilización de memoria, rendimiento de PCIe y actividad gráfica.
- Tabla de hosts asociados a ese clúster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Panel lateral específico del clúster que desglosa los dispositivos inactivos, los costos y las entidades conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del host" %}}

Dentro de este panel lateral, tienes una vista específica del host que identifica:

- Metadatos relacionados con el host, como el proveedor, el tipo de instancia, la utilización de la CPU, la memoria del sistema utilizada, la memoria total del sistema, la utilización de E/S del sistema, la actividad de SM y la temperatura.
- Los dispositivos GPU específicos asignados a ese host ordenados por actividad del motor gráfico.
- Entidades conectadas de ese host: pods, procesos y trabajos Slurm

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Panel lateral específico del host que muestra los dispositivos de GPU relacionados con ese host y las entidades conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del dispositivo" %}}

Dentro de este panel lateral, tienes una vista específica del dispositivo que identifica:

- Recomendaciones (si las hubiera) sobre cómo utilizar este dispositivo de forma más eficaz 
- Detalles relacionados con el dispositivo: tipo de dispositivo, actividad SM y temperatura.
- Cuatro métricas clave relacionadas con las GPU: Actividad de SM, utilización de memoria, potencia y actividad del motor gráfico. 
- Entidades conectadas de ese clúster: pods y procesos

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Panel lateral específico del dispositivo que muestra recomendaciones sobre cómo utilizar el dispositivo más eficazmente y otra telemetría clave." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Recomendaciones de instalación

Datadog examina activamente tu infraestructura y detecta las lagunas de instalación que pueden disminuir el valor que obtienes de GPU Monitoring. En este modal, puedes encontrar recomendaciones de actualización de instalaciones para obtener el valor óptimo de GPU Monitoring. Por ejemplo, asegurarte de que tus hosts tengan instalada la [última versión][1] del Datadog Agent, instalar la última versión del controlador NVIDIA y comprobar si hay hosts mal configurados.

Para ver funciones avanzadas de GPU Monitoring, como la atribución de recursos de GPU por procesos relacionados o trabajos SLURM, debes activar [Live Processes][3] y la integración de [Slurm][4], respectivamente.

{{< img src="gpu_monitoring/installation.png" alt="Modal que contiene una orientación para la instalación para tener una experiencia de usuario más suave de GPU Monitoring." style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[2]: https://www.nvidia.com/drivers/
[3]: /es/infrastructure/process/
[4]: /es/integrations/slurm/