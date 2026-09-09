---
aliases:
- /es/continuous_integration/dora_metrics
- /es/dora_metrics/
description: Aprenda a utilizar las métricas DORA para medir y mejorar los procesos
  de Software Delivery de su organización.
further_reading:
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentación
  text: Aprenda cómo Datadog calcula las métricas DORA.
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /events
  tag: Documentación
  text: Aprenda sobre Event Management
- link: /monitors/types/metric
  tag: Documentación
  text: Aprenda sobre los monitores de métricas
- link: /catalog
  tag: Documentación
  text: Aprenda sobre el catálogo
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métricas de éxito para Platform Engineering Teams.
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: Blog
  text: Mejores prácticas para utilizar las métricas DORA para mejorar Software Delivery.
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: Blog
  text: 3 formas de impulsar el éxito en Software Delivery con Datadog DORA Metrics.
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: Blog
  text: Aprendizajes clave del estudio State of DevSecOps 2026
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación).
is_beta: true
title: DORA Metrics
---
## Descripción general {#overview}

Las métricas de DevOps Research and Assessment (DORA) son [cuatro métricas clave][1] que indican la velocidad y la estabilidad del desarrollo de software.

Frecuencia de despliegue
: Con qué frecuencia una organización realiza despliegues exitosos a producción.

Tiempo de entrega de cambios
: La cantidad de tiempo que le toma a una confirmación llegar a producción.

Tasa de fallos en cambios
: La proporción de despliegues que fallan y requieren intervención inmediata.

Tiempo de recuperación de despliegues fallidos
: El tiempo que toma recuperarse de un despliegue que falla y requiere intervención inmediata.

Definir y realizar un seguimiento de las métricas DORA puede ayudarle a identificar áreas de mejora en la velocidad y la calidad de Software Delivery de su equipo u organización.

## Configure DORA Metrics {#set-up-dora-metrics}

Para comenzar a configurar las fuentes de datos para enviar eventos de despliegue a Datadog, consulte la [documentación de configuración][2].

## Analice DORA Metrics {#analyze-dora-metrics}

Después de configurar las fuentes de datos para sus eventos de despliegue, navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}}][4] para identificar mejoras o regresiones para cada métrica. También puede agregar las métricas por equipo, servicio, repositorio, entorno, período de tiempo y [etiquetas personalizadas][8] para comparar tendencias a lo largo del tiempo.

{{< img src="delivery_performance/dora_metrics/dora_ui_3.png" alt="Una descripción general de los cálculos de DORA Metrics filtrados por la etiqueta personalizada de idioma" style="width:100%;" >}}

Haga clic en {{< ui >}}View Deployments{{< /ui >}} para abrir una nueva pestaña con la lista de eventos de despliegue.

{{< img src="delivery_performance/dora_metrics/deployments_list.png" alt="El desglose de despliegues que muestra un desglose de las métricas y una lista de eventos relacionados" style="width:100%;" >}}

Haga clic en {{< ui >}}View Change Failures{{< /ui >}} para abrir un panel lateral con la lista de eventos de despliegue marcados como fallos de cambio.

{{< img src="delivery_performance/dora_metrics/change_failures_list.png" alt="El desglose de fallos de cambio que muestra un desglose de las métricas y una lista de eventos relacionados" style="width:100%;" >}}

## Utilice los datos de DORA Metrics {#use-dora-metrics-data}

### Exporte los widgets de DORA Metrics {#export-dora-metrics-widgets}
Exporte sus widgets de visualización a Dashboards o notebooks.

Haga clic en el icono {{< ui >}}Export{{< /ui >}} en cualquier visualización para añadirla a un Dashboard o notebook. Para obtener más información sobre las métricas calculadas por DORA Metrics, consulte la [documentación de datos recopilados][3].

### Cree Dashboards personalizados {#create-custom-dashboards}

Cree Dashboards personalizados utilizando DORA Metrics para analizar su flujo de trabajo de extremo a extremo, desde los commits y pull requests hasta los despliegues en producción. Por ejemplo, compare el rendimiento de la revisión de código entre Teams para identificar qué Teams están bloqueados por aprobaciones lentas y priorice dónde invertir en mejoras del flujo de trabajo.

{{< img src="delivery_performance/dora_metrics/dashboard.png" alt="Un ejemplo de un Dashboard de DORA Metrics personalizado" style="width:100%;" >}}

Dentro de los Dashboards y gráficos, las etiquetas personalizadas se tratan como [atributos][7]. Para filtrar o agrupar por una etiqueta personalizada, debe tener el prefijo de un símbolo `@`.

{{< img src="delivery_performance/dora_metrics/graph_with_custom_tag.png" alt="Un ejemplo de un gráfico de DORA Metrics personalizado agrupado por una etiqueta personalizada" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /es/delivery_performance/dora_metrics/setup/
[3]: /es/delivery_performance/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /es/monitors/types/metric/?tab=threshold
[6]: /es/monitors/
[7]: /es/dashboards/guide/quick-graphs/#graphing-events
[8]: /es/delivery_performance/dora_metrics/data_collected/#custom-tags