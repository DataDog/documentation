---
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentación
  text: Configurar GPU Monitoring
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimiza y soluciona los problemas de la infraestructura de IA con Datadog
    GPU Monitoring
private: true
title: GPU Monitoring
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring/" >}}
GPU Monitoring está en vista previa. Para unirse a la vista previa, haz clic en <strong>Solicitar acceso</strong> y completa el formulario.
{{< /callout >}}

## Información general
[GPU Monitoring][1] de Datadog proporciona una visión centralizada del estado, costo y rendimiento de la flota de GPU. GPU Monitoring permite a los equipos tomar mejores decisiones de aprovisionamiento, solucionar problemas de cargas de trabajo fallidas y eliminar costos de GPU inactiva sin tener que configurar manualmente herramientas de proveedores individuales (como DCGM de NVIDIA). Puedes acceder a la información de tu flota de GPU mediante el despliegue del Datadog Agent.

Para obtener instrucciones de configuración, consulta [Configurar GPU Monitoring][2].

### Tomar decisiones de asignación y aprovisionamiento de GPU basadas en datos
Gracias a la visibilidad de la utilización de la GPU por el host, nodo o pod, es posible identificar los puntos conflictivos o la subutilización de la costosa infraestructura de GPU.

{{< img src="gpu_monitoring/funnel-2.png" alt="Visualización del embudo titulada 'Tu flota de GPU de un vistazo.' Muestra dispositivos totales, asignados, activos y eficaces. Pone de relieve los núcleos de GPU subutilizados y los dispositivos inactivos." style="width:100%;" >}}

### Solucionar cargas de trabajo fallidas debido a la contención de recursos
Conoce tu disponibilidad actual de dispositivos y prevé cuántos dispositivos se necesitan para determinados equipos o cargas de trabajo para evitar cargas de trabajo fallidas por contención de recursos.

{{< img src="gpu_monitoring/device_allocation.png" alt="Gráficos para ayudar a visualizar la asignación de GPU. Gráfica lineal titulada 'Asignación de dispositivos en el tiempo', en la que se grafican counts de dispositivos totales/asignados/activos, incluida una previsión futura a 4 semanas. Un gráfico de anillos titulado 'Desglose de instancias de proveedores en la nube', en que se muestra el predominio de instancias de proveedores en la nube en toda la flota. Un 'Desglose por tipo de dispositivo' en que se muestran dispositivos asignados/totales para distintas GPU." style="width:100%;" >}}

### Identificar y eliminar los costos de GPU desperdiciada e inactiva
Identifica el gasto total en infraestructura de GPU y atribuye esos costos a cargas de trabajo e instancias específicas. Correlaciona directamente el uso de la GPU con los pods o procesos relacionados.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Vista detallada de un clúster, en el que se muestra la visualización de embudo de dispositivos (totales/asignados/activos/eficaces),  el costo total de la nube, el costo de la nube inactiva y la visualización y los detalles de distintas entidades conectadas  (pods, procesadores, trabajos SLURM)." style="width:100%;" >}}

### Maximizar el rendimiento del modelo y la aplicación
Con la telemetría de recursos de GPU Monitoring, puedes analizar las tendencias de los recursos y las métricas de la GPU (incluida la utilización de la GPU, la potencia y la memoria) a lo largo del tiempo, lo que te ayudará a comprender sus efectos en el rendimiento de tu modelo y tu aplicación.

{{< img src="gpu_monitoring/device_metrics.png" alt="Vista detallada de un dispositivo, en la que se muestran visualizaciones de series temporales configurables de la actividad de SM, la utilización de la memoria, la potencia y la actividad del motor." style="width:100%;" >}}

## ¿Estás listo para comenzar?

Consulta [Configurar GPU Monitoring][2] para obtener instrucciones sobre cómo configurar GPU Monitoring de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /es/gpu_monitoring/setup