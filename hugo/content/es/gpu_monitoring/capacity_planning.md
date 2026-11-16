---
description: Realice un seguimiento del uso de la cuota de GPU entre equipos y colas,
  encuentre tipos de GPU sobresuscritos y comprenda por qué las cargas de trabajo
  están pendientes o fueron desalojadas.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentación
  text: Configure el seguimiento de GPU
- link: /gpu_monitoring/fleet
  tag: Documentación
  text: Explore su flota de GPU con la página Flota
- link: /gpu_monitoring
  tag: Documentación
  text: Obtenga más información sobre lo que ofrece el seguimiento de GPU
title: Planifique la capacidad de GPU con Monitoreo de GPU
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
La Planificación de capacidad en Monitoreo de GPU se encuentra en Vista previa de acceso anticipado. Complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Cuando muchos equipos comparten grupos de GPU costosas, es difícil ver qué equipos están subutilizando sus dispositivos. También es difícil detectar la contención de recursos y saber por qué los trabajos están bloqueados en estado pendiente. La página de Planificación de capacidad en Monitoreo de GPU brinda a los equipos de plataforma y a los propietarios de cargas de trabajo una vista compartida del aprovisionamiento de GPU en todas las colas. No se requiere filtrado ni consultas manuales. Úsela para ejecutar cargas de trabajo de manera confiable y obtener más provecho de su flota de GPU.

Con la página de Planificación de capacidad, puede responder preguntas como:

- **¿Qué equipos o proyectos están usando su cuota en exceso o en defecto?** Encuentre la cuota no utilizada y reasigne la capacidad de cómputo de manera justa en toda su organización.
- **¿Qué tipos de GPU están sobresuscritos?** Identifique dónde la demanda supera la cuota para que pueda agregar capacidad.
- **¿Cuál es el estado actual de una carga de trabajo?** Vea si cada carga de trabajo está admitida, pendiente o desalojada, y cuántas GPU utiliza.
- **¿Por qué se retrasa o está desalojada una carga de trabajo?** Correlacione las cargas de trabajo pendientes y preemptadas con la cuota y la contención en su cola.

{{< img src="gpu_monitoring/capacity-planning-page.png" alt="La página de Planificación de capacidad en Monitoreo de GPU muestra gráficos de cuota de GPU, GPU asignadas inactivas, preemption y cobertura de flota sobre una lista de cargas de trabajo." style="width:100%;" >}}

## Requisitos previos {#prerequisites}

Para usar la página de Planificación de capacidad, debe cumplir con los siguientes criterios:
- Está ejecutando Datadog Agent versión 7.84.1 o posterior con [GPU Monitoring habilitado][1]. Para actualizar, consulte [Actualizar el Agent con Fleet Automation][2].
- Sus cargas de trabajo de GPU se ejecutan en Kubernetes.
- Ha habilitado la [integración de Kueue][3] en Datadog. Para obtener más detalles, consulte la [documentación de la integración de Kueue][4].

## Explore la página de Planificación de capacidad {#explore-the-capacity-planning-page}

Para comenzar, navegue a la [página de Planificación de capacidad][5] en GPU Monitoring.

### Filtrar por equipo y cola {#filter-by-team-and-queue}

Utilice los filtros en la parte superior de la página para establecer el contexto de la vista. Puede filtrar por {{< ui >}}Team{{< /ui >}}, {{< ui >}}Cluster Name{{< /ui >}}, {{< ui >}}Cluster Queue{{< /ui >}}, {{< ui >}}Resource Flavor{{< /ui >}}, {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Datacenter{{< /ui >}} y {{< ui >}}Environment{{< /ui >}}. Guarde una vista filtrada para volver a ella más tarde.

### Cuota y utilización {#quota-and-utilization}

Los gráficos en la parte superior de la página muestran cómo se utiliza la cuota de GPU en toda su flota:

| Gráfico | Descripción |
|-------|-------------|
| Cuota de GPU no asignada - Cantidad | Número de GPU en la cuota que no están en uso, agrupadas por ClusterQueue. |
| Cuota de GPU no asignada - Porcentaje | Porcentaje de la cuota de GPU que no está en uso, agrupado por ClusterQueue. |
| GPU asignadas inactivas | Número de GPU asignadas que no están realizando trabajo de motor, agrupadas por ClusterQueue. |
| Tasa de preemption | Cargas de trabajo desalojadas por preemption por cada carga de trabajo admitida, agrupadas por ClusterQueue. |
| Cobertura de GPU de la flota | Cuota de GPU asignada dividida en dispositivos activos, inactivos y no atribuidos en toda la flota. |
| Saturación - GPUs por encima de la cuota | Pares de ClusterQueue y ResourceFlavor clasificados por el número de GPUs utilizadas más allá de su cuota nominal. |

Las colas con una cuota alta sin asignar o muchas GPUs asignadas inactivas son candidatas para la reasignación. Las colas que superan constantemente la cuota, o que tienen una tasa de preemption alta, pueden necesitar más capacidad.

### Colas y cargas de trabajo {#queues-and-workloads}

La tabla en la parte inferior de la página tiene dos pestañas:

- {{< ui >}}Queues{{< /ui >}}: Enumera cada cola con su cuota y uso.
- {{< ui >}}Workloads{{< /ui >}}: Enumera cada carga de trabajo con su equipo, clúster, ClusterQueue, uso de GPU por tipo de recurso y estado más reciente, como {{< ui >}}Admitted{{< /ui >}}.

Utilice la pestaña {{< ui >}}Workloads{{< /ui >}} para verificar el estado actual de una carga de trabajo e investigar aquellas que están pendientes o están desalojadas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/gpu_monitoring/setup
[2]: /es/agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /es/integrations/kueue/
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=capacity-planning