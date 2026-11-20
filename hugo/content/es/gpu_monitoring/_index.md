---
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentación
  text: Configure el seguimiento de GPU
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de infraestructura de IA con Datadog GPU Monitoring
- link: https://www.datadoghq.com/blog/monitor-tas-and-gang-scheduling-for-ai-training-in-kubernetes/
  tag: Blog
  text: Haga un seguimiento de TAS y de la programación de grupos para el entrenamiento
    de IA en Kubernetes.
- link: https://www.datadoghq.com/architecture/gpu-monitoring/
  tag: Centro de arquitectura
  text: Arquitectura de referencia de seguimiento de GPU
title: Seguimiento de GPU
---
## Descripción general {#overview}
El [seguimiento de GPU][1] de Datadog proporciona una vista centralizada de la salud, el costo y el rendimiento de su flota de GPU. Permite a los equipos tomar mejores decisiones de aprovisionamiento, optimizar y solucionar problemas de rendimiento de cargas de trabajo de IA, y eliminar los costos de GPU inactivos sin tener que configurar manualmente herramientas de proveedores individuales (como DCGM de NVIDIA). El seguimiento de GPU admite flotas implementadas en los principales proveedores de nube (AWS, GCP, Azure, Oracle Cloud), alojadas en instalaciones locales o aprovisionadas a través de plataformas de GPU como servicio como Coreweave y Lambda Labs. 

Puede acceder a información sobre su flota de GPU implementando el Datadog Agent en sus servidores acelerados por GPU. Para obtener instrucciones de configuración, consulte [Set up GPU Monitoring][2].

## Capacidades clave {#key-capabilities}
### Tome decisiones de asignación y aprovisionamiento de GPU basadas en datos {#make-data-driven-gpu-allocation-and-provisioning-decisions}
Con una vista integral de toda su flota y la capacidad disponible, el seguimiento de GPU de Datadog le ayuda a asignar y administrar su infraestructura y capacidad de manera justa en toda su organización. 

{{< img src="gpu_monitoring/funnel-3.png" alt="Visualización de embudo titulada 'Su flota de GPU de un vistazo'. Muestra los dispositivos totales, activos y efectivos. Resalta los núcleos de GPU subutilizados y los dispositivos inactivos." style="width:100%;" >}}

También puede comprender la disponibilidad actual de sus dispositivos y pronosticar cuántos dispositivos se necesitan para ciertos equipos o cargas de trabajo para evitar fallas en las cargas de trabajo debido a la contención de recursos.

{{< img src="gpu_monitoring/device_allocation.png" alt="Gráficos para ayudar a visualizar la asignación de GPU. Un gráfico de líneas titulado 'Asignación de dispositivos a lo largo del tiempo', que traza los recuentos de dispositivos totales/asignados/activos, incluido un pronóstico futuro de 4 semanas. Un gráfico de anillos titulado 'Desglose de instancias de proveedores de nube', que muestra la prevalencia de instancias de proveedores de nube en toda la flota. Un 'Desglose por tipo de dispositivo' que muestra los dispositivos asignados/totales para varios dispositivos GPU." style="width:100%;" >}}

### Maximice el rendimiento del modelo y de la aplicación {#maximize-model-and-application-performance}
Con la telemetría de recursos del seguimiento de GPU, puede analizar tendencias en los recursos y métricas de GPU (incluida la utilización de GPU, la energía y la memoria) por servidor, nodo o pod a lo largo del tiempo, lo que le ayuda a comprender los efectos de los dispositivos en el rendimiento de su modelo y aplicación. Por ejemplo, puede identificar puntos críticos o la subutilización de infraestructura de GPU costosa que podrían ser cuellos de botella para la ejecución de sus cargas de trabajo.

{{< img src="gpu_monitoring/device_metrics.png" alt="Vista detallada de un dispositivo, que muestra visualizaciones de series temporales configurables para la actividad de SM, la utilización de memoria, la energía y la actividad del motor." style="width:100%;" >}}

### Detecte problemas de hardware de forma proactiva {#proactively-detect-hardware-issues}
Las GPU son un recurso costoso y escaso que tienen tasas de falla más altas que los servidores estándar. La solución de seguimiento de GPU de Datadog proporciona monitores listos para usar y recomendaciones proactivas para ayudarle a detectar y solucionar problemas de hardware antes de que afecten sus cargas de trabajo críticas.

### Identifique y elimine los costos de GPU inactivos y desperdiciados {#identify-and-eliminate-wasted-idle-gpu-costs}
Identifique el gasto total en infraestructura de GPU y atribuya esos costos a cargas de trabajo e instancias específicas. Correlacione directamente el uso de la GPU con los pods o procesos relacionados.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Vista detallada de un clúster, que muestra una visualización de embudo de dispositivos (total/asignados/activos/efectivos), costo total en la nube, costo de nube inactiva, y visualizaciones y detalles de varias entidades conectadas (pods, procesadores, trabajos SLURM)." style="width:100%;" >}}

## ¿Listo para comenzar? {#ready-to-start}

Consulte [Set up GPU Monitoring][2] para obtener instrucciones sobre cómo configurar el seguimiento de GPU de Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /es/gpu_monitoring/setup