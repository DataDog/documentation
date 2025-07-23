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
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre la Visibilidad de los despliegues
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

<div class="alert alert-warning">Las métricas de DORA están en Vista previa.</div>

## Información general

Las métricas de DevOps Research and Assessment (DORA) son [cuatro métricas clave][1] que indican la velocidad y la estabilidad del desarrollo de software.

Frecuencia de despliegue
: Frecuencia con la que una organización pasa a producción de forma exitosa.

Plazo de cambio
: El tiempo que tarda un commit en pasar a producción.

Modificación de la frecuencia de fallos
: Porcentaje de despliegues que provocan un fallo en producción.

Tiempo para restablecer un servicio
: Tiempo que tarda una organización en recuperarse de un fallo en producción.

La definición y el seguimiento de métricas de DORA puede ayudarte a identificar áreas de mejora de la velocidad y la calidad de entrega de software de tu equipo u organización.

## Configurar métricas de DORA

Para empezar a configurar las fuentes de datos con el fin de enviar eventos de despliegues e incidentes a Datadog, consulta la [documentación de configuración][2].

## Analizar métricas de DORA

Una vez que hayas configurado las fuentes de datos de tus eventos de despliegues y fallos, ve a [**Entrega de software** > **Métricas de DORA**][4] para identificar mejoras o regresiones de cada métrica, agregarlas por servicio o entorno y comparar tendencias a lo largo del tiempo.

{{< img src="dora_metrics/overview_2.png" alt="Información general de cálculos y datos de métricas de Dora durante una semana determinada" style="width:100%;" >}}

Puedes examinar visualizaciones y filtrar los datos recopilados por equipo, servicio, repositorio, entorno y periodo de tiempo.

Haz clic en **View Deployments** (Ver despliegues) para abrir un panel lateral con las métricas Frecuencia de despliegue y el Plazo de cambio, además de una lista de eventos de despliegues.

{{< img src="dora_metrics/deployments_2.png" alt="Panel lateral Desglose de despliegues en la página Métricas de DORA, que muestra un desglose de métricas y una lista de eventos relacionados" style="width:100%;" >}}

Haz clic en **View Failures** (Ver fallos) para abrir un panel lateral con las métricas Modificar la frecuencia de fallos y Tiempo medio de restauración (MTTR), además de una lista de eventos de fallos.

{{< img src="dora_metrics/failures_2.png" alt="Panel lateral Desglose de fallos en la página Métricas de DORA, que muestra un desglose de métricas y una lista de eventos relacionados" style="width:100%;" >}}

## Uso de los datos de métricas de DORA

Exporta tus widgets de visualizaciones a dashboards o notebooks, añádelos a incidentes existentes y crea [monitores de métricas][5] para activar alertas en tus métricas.

{{< img src="dora_metrics/export_2.png" alt="Hacer clic en el icono Exportar para agregar el widget de visualizaciones a un incidente o a un dashboard o notebook" style="width:100%;" >}}

Haz clic en el icono **Exportar** de cualquier visualización para añadirla a un incidente, dashboard o notebook. Para obtener más información sobre los métricas calculadas por las métricas de DORA, consulta la [documentación Datos recopilados][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /es/dora_metrics/setup/
[3]: /es/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /es/monitors/types/metric/?tab=threshold
[6]: /es/monitors/