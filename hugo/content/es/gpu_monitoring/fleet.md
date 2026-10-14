---
description: Un inventario de todos sus servidores acelerados por GPU que le ayuda
  a diagnosticar problemas de rendimiento.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: blog
  text: Optimice y solucione problemas de infraestructura de IA con Datadog GPU Monitoring
title: Página de flota de GPU Monitoring
---
## Descripción general {#overview}

[GPU Fleet Explorer][0] proporciona un desglose detallado de la infraestructura de IA (como dispositivos GPU, servidores o clústeres de Ray) y las cargas de trabajo de IA (como Pods, contenedores Kube o ejecuciones de entrenamiento) para un período de tiempo específico. Esta página le ayuda a descubrir ineficiencias en el aprovisionamiento y optimizaciones del rendimiento de las cargas de trabajo a través de telemetría de recursos, incluida la utilización de GPU, métricas a nivel de servidor y costos. También muestra la detección en tiempo real de Datadog de problemas que afectan a su flota y cargas de trabajo, con orientación sobre cómo remediarlos.

## Detecte problemas con seguimientos preconfigurados {#detect-issues-with-out-of-the-box-monitors}

Datadog proporciona varias plantillas de seguimientos preconfigurados (OOTB) que detectan problemas comunes de GPU en tiempo real, que incluyen:

- Picos de temperatura
- Limitación de potencia (Power cap throttling)
- Solicitudes de GPU no satisfechas
- Errores XID
- Errores ECC
- Cargas de trabajo con ráfagas
- Dispositivos inactivos

Puede personalizar los umbrales de cualquier seguimiento para adaptarlos a las necesidades de su organización.

Para acceder a estas plantillas, haga clic en el menú desplegable {{< ui >}}Monitors{{< /ui >}} en la esquina superior derecha de la página.

{{< img src="gpu_monitoring/fleet-ootb-monitors.jpg" alt="Menú desplegable de seguimientos en la esquina superior derecha de la página de GPU Fleet, que muestra plantillas de seguimientos preconfigurados para temperatura, limitación de potencia, solicitudes de GPU no satisfechas, errores XID críticos, errores XID generales, errores ECC, cargas de trabajo ráfaga y dispositivos inactivos" style="width:40%;" >}}

## Divida su flota por cualquier etiqueta {#break-down-your-fleet-by-any-tag}

GPU Fleet Explorer le brinda visibilidad desde sus cargas de trabajo de IA hasta la infraestructura de IA subyacente. Puede cambiar entre entidades de carga de trabajo como pods y ejecuciones de entrenamiento, y entidades de infraestructura como dispositivos, servidores y clústeres.

{{< img src="gpu_monitoring/gpu-fleet-sidenav.jpg" alt="Barra de navegación lateral que muestra entidades de infraestructura de IA (Dispositivos, Hosts, Clústeres Kube, Clústeres Ray) y entidades de cargas de trabajo de IA (Pods, Contenedores Kube, Ejecuciones de entrenamiento)" style="width:30%;" >}}

**Nota**: Las opciones de Clústeres Kube, Pods y Contenedores Kube en la navegación lateral solo están disponibles si utiliza Kubernetes.

Utilice los menús desplegables de filtro en la parte superior de la página para filtrar por un {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Device Type{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Region{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Data Center{{< /ui >}}, {{< ui >}}Environment{{< /ui >}} o {{< ui >}}Team{{< /ui >}} específico.

También puede {{< ui >}}Search{{< /ui >}} o {{< ui >}}Group{{< /ui >}} por otras etiquetas utilizando los campos de búsqueda y agrupación. Por ejemplo, puede agrupar por {{< ui >}}Service{{< /ui >}} para visualizar una fila en la tabla para cada servicio único. Haga clic en el botón {{< ui >}}\>{{< /ui >}} junto a cualquier entrada para ver los dispositivos de ese servicio.

{{< img src="gpu_monitoring/host_row_expansion-2.png" alt="Tabla de flota de GPU que muestra los servicios con sus tipos de dispositivo, con el botón de expandir fila resaltado" style="width:90%;" >}}

{{< img src="gpu_monitoring/filters_and_groupings-3.png" alt="Menús desplegables de filtro y selector de agrupar por en la parte superior de la página de GPU Fleet" style="width:90%;" >}}

## Vistas y recomendaciones basadas en casos de uso {#use-case-driven-views-and-recommendations}
La página Fleet Explorer de GPU Monitoring ofrece dos vistas dedicadas basadas en casos de uso:

- **Aprovisionamiento**: Asigne capacidad y administre cuotas.
- **Rendimiento**: Optimice la eficiencia y el rendimiento de la carga de trabajo.

### Aprovisionamiento {#provisioning}
La pestaña {{< ui >}}Provisioning{{< /ui >}} detecta cualquier problema de salud del hardware que afecte la asignación de sus dispositivos a las cargas de trabajo y proporciona orientación sobre cómo remediarlos.

{{< img src="gpu_monitoring/provisioning-tab-3.jpg" alt="La vista basada en casos de uso de Aprovisionamiento" style="width:90%;" >}}

Para cada incidencia detectada, Datadog recomienda acciones de remediación paso a paso para ayudarle a resolverla.

{{< img src="gpu_monitoring/critical-xid-recommendation.jpg" alt="Acciones de remediación recomendadas para un error XID crítico" style="width:60%;" >}}

#### Gráfico de resumen de aprovisionamiento {#provisioning-summary-graph}

El gráfico de resumen proporciona visualizaciones listas para usar (OOTB) para la telemetría clave vinculada a la vista basada en el caso de uso seleccionada. Para el caso de uso de Aprovisionamiento, esto desglosa sus dispositivos Aprovisionados, Asignados y Activos para que pueda recuperar el gasto inactivo desperdiciado y redescubrir dispositivos disponibles que pueden asignarse a cargas de trabajo.

{{< img src="gpu_monitoring/summary-graph.jpg" alt="Gráfico de resumen que muestra los desgloses de Dispositivos Aprovisionados, Dispositivos Asignados y Dispositivos Activos" style="width:90%;" >}}

Expanda esta sección a continuación para ver una tabla de las opciones disponibles y lo que representan.

{{% collapse-content title="Ver la lista completa de opciones del gráfico de resumen de Aprovisionamiento" level="h5" expanded=false id="provisioning-summary-graph-table" %}}
| Opción              | Definición                                                |
| -------------------- | ---------------------------------------------------------- |
| Dispositivos Aprovisionados  | Desglose de dispositivos aprovisionados y dispositivos activos.       |
| Dispositivos Asignados    | Desglose de dispositivos disponibles por asignados frente a no asignados. |
| Dispositivos Activos       | Desglose de dispositivos asignados por activos frente a inactivos.          |
{{% /collapse-content %}}

### Rendimiento {#performance}
La pestaña {{< ui >}}Performance{{< /ui >}} detecta cualquier incidencia de salud del hardware o de carga de trabajo que esté deteniendo las cargas de trabajo que se ejecutan en sus dispositivos GPU. Esto proporciona una única fuente de información y orientación para los ingenieros de plataforma y los equipos de IA/ML sobre cómo solucionar esos problemas.

{{< img src="gpu_monitoring/performance-tab-3.jpg" alt="La vista basada en casos de uso de Rendimiento" style="width:90%;" >}}

Para cada incidencia detectada, Datadog recomienda acciones de remediación paso a paso para ayudarle a resolverla.

{{< img src="gpu_monitoring/power-cap-recommendation.jpg" alt="Acciones de remediación recomendadas para una incidencia de limitación de potencia de GPU" style="width:60%;" >}}

#### Gráfico de resumen de rendimiento {#performance-summary-graph}

El gráfico de resumen proporciona visualizaciones listas para usar (OOTB) para la telemetría clave vinculada a la vista basada en el caso de uso seleccionada. Para el caso de uso de Rendimiento, esto desglosa métricas clave de utilización de recursos como la Utilización de GPU o la Saturación de GPU junto con métricas de red, energía, temperatura y más.

{{< img src="gpu_monitoring/summary-graph-performance.jpg" alt="Gráfico de resumen que muestra los desgloses de Utilización de GPU, Saturación de GPU y Memoria de GPU" style="width:90%;" >}}

Expanda la sección a continuación para ver una tabla de las opciones disponibles y lo que representan.

{{% collapse-content title="Ver la lista completa de opciones del gráfico de resumen de Rendimiento" level="h5" expanded=false id="performance-summary-graph-table" %}}
| Opción              | Definición                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utilización de CPU            | Porcentaje de tiempo que la CPU pasó ejecutando procesos de espacio de usuario.                                                                                                                                                        |
| Memoria del servidor         | Porcentaje de memoria utilizable en uso.                                                                                                                                                                                    |
| Utilización de GPU            | Porcentaje promedio de tiempo que cada multiprocesador de transmisión estuvo activo (los valores más bajos indican tiempo de inactividad).                                                                                                                |
| Saturación de GPU      | Mide qué tan completamente se está utilizando la capacidad de ejecución paralela de la GPU durante el período de tiempo (relación promedio de warps activos con respecto a los warps máximos admitidos por multiprocesador de transmisión en todos los SM).            |
| Memoria de GPU          | Porcentaje de memoria de GPU utilizada respecto al límite total de memoria de GPU.                                                                                                                                                               |
| PCIe RX             | Bytes recibidos a través de PCI desde el dispositivo GPU por segundo.                                                                                                                                                             |
| PCIe TX             | Bytes transmitidos a través de PCI al dispositivo GPU por segundo.                                                                                                                                                            |
| NVLink RX           | RX total de todos los enlaces NVLINK.                                                                                                                                                                                          |
| NVLink TX           | TX total de todos los enlaces NVLINK.                                                                                                                                                                                          |
| Actividad de gráficos   | Fracción de tiempo que la GPU estuvo realizando cualquier trabajo de cómputo durante el intervalo. Una señal general de si la GPU está ocupada o inactiva.                                                                                     |
| Energía               | Consumo de energía del dispositivo GPU. En GA100 y arquitecturas anteriores, esto representa la potencia instantánea en ese momento. Para arquitecturas más recientes, representa la potencia promedio (vatios) durante un segundo. |
| Temperatura         | Temperatura de un dispositivo GPU.                                                                                                                                                                                            |
| Reloj SM            | Frecuencia de reloj SM en MHz.                                                                                                                                                                                             |
| Enlaces NVLink activos | Número de enlaces NVLINK activos para el dispositivo.                                                                                                                                                                          |
| Errores ECC          | Recuento total de errores ECC no corregidos.                                                                                                                                                                                 |
| Errores XID          | Recuento de errores XID de NVIDIA, que indican problemas de hardware o a nivel de controlador.                                                                                                                                                |
{{% /collapse-content %}}

## Inventario de su infraestructura GPU {#inventory-of-your-gpu-powered-infrastructure}

Esta tabla desglosa su infraestructura GPU por cualquier etiqueta que elija. Si no ha especificado una etiqueta adicional en el campo {{< ui >}}Group by{{< /ui >}}, los resultados se agrupan según la vista seleccionada: {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}} o {{< ui >}}Device{{< /ui >}}.

Puede hacer clic en el icono de engranaje para personalizar qué métricas se muestran dentro de la tabla. Expanda la sección a continuación para ver una lista completa de las métricas disponibles. 

{{% collapse-content title="Ver la lista completa de métricas disponibles" level="h3" expanded=false id="metric-full-list" %}}
| Métrica                   | Definición                                                                                                                                                                                                              | Nombre de la métrica                                        | Pestaña de aprovisionamiento | Pestaña de rendimiento |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | --------------- |
| Costo de inactividad                | (Solo distinto de cero para períodos de tiempo superiores a 2 días) El costo de los recursos de GPU que están reservados y asignados, pero no utilizados.                                                                                              | `gpu_monitoring.estimated_idle_cost`               | ✓                 | ✓               |
| | Dispositivos GPU con GPU Monitoring de Datadog configurados correctamente y que reportan métricas.                                                                                                                                    | `kubernetes_state.node.gpu_capacity`               | ✓                 | —               |
| Kubernetes disponible     | Dispositivos GPU en buen estado que están encendidos y disponibles para su asignación, según el orquestador de Kubernetes.                                                                                                          | `kubernetes_state.node.gpu_allocatable`            | ✓                 | —               |
| Dispositivos asignados        | (Solo disponible si usa Kubernetes) Cantidad de dispositivos que se han asignado a una carga de trabajo.                                                                                                                           | `gpu.device.total`                                 | ✓                 | —               |
| Dispositivos no asignados      | Cantidad de dispositivos no asignados y disponibles para su uso durante el período de tiempo.                                                                                                                                                 |                                                    | ✓                 | —               |
| Dispositivos activos           | Cantidad de dispositivos que se utilizan activamente para una carga de trabajo o que están ocupados. Si usa Kubernetes: cantidad de dispositivos asignados que se utilizan activamente para una carga de trabajo.                                                                   | `gpu.gr_engine_active`                             | ✓                 | —               |
| Dispositivos inactivos             | Dispositivos GPU asignados a cargas de trabajo pero que no realizan ningún trabajo durante el período de tiempo. Un dispositivo se considera inactivo si `gpu.gr_engine_active` es igual a 0.                                                                        | `gpu.gr_engine_active`                             | ✓                 | —               |
| Utilización de CPU          | Porcentaje de tiempo que la CPU pasó ejecutando procesos de espacio de usuario.                                                                                                                                       | `system.cpu.user`                                  | —                 | ✓               |
| Memoria de servidor              | Porcentaje de memoria utilizable en uso.                                                                                                                                                                                    | `system.mem.pct_usable`                            | —                 | ✓               |
| Utilización de GPU          | Porcentaje promedio de tiempo que cada multiprocesador de transmisión estuvo activo (los valores más bajos indican tiempo de inactividad).                                                                                                                           | `gpu.sm_active`                                    | —                 | ✓               |
| Saturación de GPU           | Mide qué tan completamente se está utilizando la capacidad de ejecución paralela de la GPU durante el período de tiempo (relación promedio de warps activos con respecto a los warps máximos admitidos por multiprocesador de transmisión en todos los SM).                 | `gpu.sm_occupancy`                                 | —                 | ✓               |
| Memoria de GPU               | Porcentaje de memoria de GPU utilizada respecto al límite total de memoria de GPU.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` | —                 | ✓               |
| Rendimiento de recepción PCIe       | Bytes recibidos a través de PCI desde el dispositivo GPU por segundo.                                                                                                                                                              | `gpu.pci.throughput.rx`                            | —                 | ✓               |
| Rendimiento de transmisión PCIe       | Bytes transmitidos a través de PCI al dispositivo GPU por segundo.                                                                                                                                                             | `gpu.pci.throughput.tx`                            | —                 | ✓               |
| NVLink RX                | RX total de todos los enlaces NVLINK.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     | —                 | ✓               |
| NVLink TX                | TX total de todos los enlaces NVLINK.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     | —                 | ✓               |
| Energía                    | Uso de energía para el dispositivo GPU.<br>**Nota**: En GA100 y arquitecturas anteriores, esto representa la energía instantánea en ese momento.<br>Para arquitecturas más recientes, representa el consumo de energía promedio (vatios) durante un segundo. | `gpu.power.usage`                                  | —                 | ✓               |
| Temperatura              | Temperatura de un dispositivo GPU.                                                                                                                                                                                            | `gpu.temperature`                                  | —                 | ✓               |
{{% /collapse-content %}} 

## Panel lateral de detalles {#details-side-panel}

Al hacer clic en cualquier fila de la tabla de Fleet se abre un panel lateral con más detalles sobre el clúster, servidor o dispositivo seleccionado.

### Entidades conectadas {#connected-entities}

GPU Monitoring de Datadog no necesita depender del DCGM Exporter de NVIDIA. Utiliza el Datadog Agent para observar las GPU directamente, proporcionando información sobre el uso y los costos de GPU para pods y procesos. En la sección {{< ui >}}Connected Entities{{< /ui >}} de cualquier vista de detalles, puede ver la actividad de SM, la utilización del núcleo de la GPU (solo si System Probe está habilitado) y el uso de memoria de pods, procesos y trabajos de Slurm. Esto le ayuda a identificar qué cargas de trabajo reducir u optimizar para disminuir el gasto total. 

**Nota**: La pestaña {{< ui >}}Pods{{< /ui >}} solo está disponible si utiliza Kubernetes.

{{< tabs >}}
{{% tab "Panel lateral del clúster" %}}

Dentro de este panel lateral, tiene un embudo específico del clúster que identifica:

- Número de dispositivos totales, asignados (solo usuarios de Kubernetes), activos y efectivos dentro de ese clúster en particular
- Costo total estimado y costo de inactividad de ese clúster
- Entidades conectadas a ese clúster: pods, procesos y trabajos de Slurm
- Cuatro métricas clave (personalizables) para ese clúster: utilización de núcleos (solo si la sonda del sistema está habilitada), utilización de memoria, rendimiento de PCIe y actividad de gráficos
- Tabla de servidores asociados con ese clúster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Panel lateral específico del clúster que desglosa los dispositivos inactivos, los costos y las entidades conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del servidor" %}}

Dentro de este panel lateral, tiene una vista específica del servidor que identifica:

- Metadatos relacionados con el servidor, tales como proveedor, tipo de instancia, utilización de CPU, memoria del sistema utilizada, memoria total del sistema, utilización de E/S del sistema, actividad de SM y temperatura
- (solo disponible para usuarios de Kubernetes) Los dispositivos GPU específicos asignados a ese servidor, ordenados por actividad del motor de gráficos
- Entidades conectadas a ese servidor: pods, procesos y trabajos de Slurm

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Panel lateral específico del servidor que muestra los dispositivos GPU vinculados a ese servidor y las entidades conectadas" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panel lateral del dispositivo" %}}

Dentro de este panel lateral, tiene una vista específica del dispositivo que identifica:

- Recomendaciones (si las hay) sobre cómo utilizar este dispositivo de manera más efectiva 
- Detalles relacionados con el dispositivo: tipo de dispositivo, actividad de SM y temperatura
- Cuatro métricas clave vinculadas a las GPU: actividad de SM, utilización de memoria, energía y actividad del motor de gráficos 
- Entidades conectadas a ese clúster: pods y procesos

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Panel lateral específico del dispositivo que muestra recomendaciones sobre cómo usar el dispositivo de manera más efectiva y otra telemetría clave." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Recomendaciones de instalación {#installation-recommendations}

Datadog analiza activamente su infraestructura y detecta brechas de instalación que pueden disminuir el valor que obtiene del GPU Monitoring. En este modal, puede encontrar recomendaciones de actualización de instalación para obtener el valor óptimo del GPU Monitoring. Por ejemplo, asegurarse de que sus servidores tengan instalada la [versión más reciente][1] del Datadog Agent, instalar la versión más reciente del controlador de NVIDIA y verificar si hay servidores mal configurados.

<div class="alert alert-danger">No utilice Datadog Agent v7.82.0, ya que puede causar pánicos de kernel inesperados.</div>

Para ver funciones avanzadas de monitoreo de GPU, como la atribución de recursos de GPU por procesos relacionados o trabajos de SLURM, debe habilitar [Live Processes][3] y la integración de [Slurm][4], respectivamente.

{{< img src="gpu_monitoring/installation.png" alt="Modal que contiene orientación de instalación para una experiencia de usuario de GPU Monitoring más fluida." style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[3]: /es/infrastructure/process/
[4]: /es/integrations/slurm/