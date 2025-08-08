---
aliases:
- /es/continuous_integration/dora_metrics
description: Aprende a utilizar métricas de DORA para medir y mejorar los procesos
  de entrega de software de tu organización.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Consulta las últimas versiones de entrega de software. (Es necesario iniciar
    sesión en la aplicación)
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: Blog
  text: Prácticas recomendadas sobre el uso de métricas de DORA para la mejora de
    la entrega de software
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: Blog
  text: 3 formas de impulsar el éxito en la entrega de software con Datadog DORA Metrics
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre la visibilidad de despliegues
- link: /service_management/events
  tag: Documentación
  text: Más información sobre la Gestión de eventos
- link: /monitors/types/metric
  tag: Documentación
  text: Más información sobre los Monitores de métricas
- link: /software_catalog
  tag: Documentación
  text: Más información sobre el Catálogo de software
is_beta: true
title: Métricas de DORA
---

## Información general

Las métricas de DevOps Research and Assessment (DORA) son [cuatro métricas clave][1] que indican la velocidad y la estabilidad del desarrollo de software.

Frecuencia de despliegue
: Frecuencia con la que una organización pasa a producción de forma exitosa.

Plazo de modificación
: el tiempo que tarda una confirmación en pasar a producción.

Modificación de la frecuencia de fallos
: Porcentaje de despliegues que provocan un fallo en producción.

Tiempo para restablecer un servicio
: Tiempo que tarda una organización en recuperarse de un fallo en producción.

La definición y el seguimiento de métricas de DORA puede ayudarte a identificar áreas de mejora de la velocidad y la calidad de entrega de software de tu equipo u organización.

## Configurar métricas de DORA

Para empezar a configurar las fuentes de datos para que envíen eventos de despliegue y fallo a Datadog, consulta la [documentación de configuración][2].

## Analizar métricas de DORA

Una vez configuradas las fuentes de datos para los eventos de despliegue y fallo, ve a [**Software Delivery** > **DORA Metrics**][4] para identificar mejoras o regresiones para cada métrica. También puedes agregar las métricas por equipo, servicio, repositorio, entorno, periodo de tiempo y [etiquetas personalizadas][8] para comparar las tendencias a lo largo del tiempo.

{{< img src="dora_metrics/dora_ui_3.png" alt="Una descripción general de los cálculos de DORA Metrics filtrados por etiqueta personalizada de lenguaje" style="width:100%;" >}}

Haz clic en **View Deployments** (Ver despliegues) para abrir una nueva pestaña con las métricas Frecuencia de despliegue y Plazo de cambio, además de una lista de eventos de despliegues.

{{< img src="dora_metrics/deployments_list.png" alt="Desglose de despliegue que muestra un desglose de métricas y una lista de eventos relacionados" style="width:100%;" >}}

Haz clic en **View Failures** (Ver fallos) para abrir un panel lateral con las métricas Modificar la frecuencia de fallos y Tiempo de restauración, además de una lista de eventos de fallos.

{{< img src="dora_metrics/failures_list.png" alt="Desglose de errores que muestra un desglose de métricas y una lista de eventos relacionados" style="width:100%;" >}}

## Uso de los datos de métricas de DORA

### Exportar widgets de DORA Metrics
Exporta tus widgets de visualización a dashboards, notebooks o añádelos a incidentes existentes.

{{< img src="dora_metrics/dora_ui_2.png" alt="Haz clic en el ícono Exportar para añadir el widget de visualización para un incidente o un dashboard o notebook" style="width:100%;" >}}

Haz clic en el icono **Exportar** de cualquier visualización para añadirla a un incidente, dashboard o notebook. Para obtener más información sobre los métricas calculadas por las métricas de DORA, consulta la [documentación Datos recopilados][3].

### Crear dashboards personalizados

Las DORA Metrics son muy flexibles y pueden utilizarse en dashboards personalizados que se adapten a las necesidades específicas de tu equipo.

{{< img src="dora_metrics/dashboard.png" alt="Un ejemplo de un dashboard personalizado de DORA Metrics" style="width:100%;" >}}

En los dashboards y gráficos, las etiquetas personalizadas se tratan como [atributos][7]. Para filtrar o agrupar por una etiqueta personalizada, debe ir precedida del símbolo `@`.

{{< img src="dora_metrics/graph_with_custom_tag.png" alt="Un ejemplo de un gráfico personalizado de DORA Metrics agrupado por etiqueta personalizada" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /es/dora_metrics/setup/
[3]: /es/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /es/monitors/types/metric/?tab=threshold
[6]: /es/monitors/
[7]: /es/dashboards/guide/quick-graphs/#graphing-events
[8]: /es/dora_metrics/data_collected/#custom-tags