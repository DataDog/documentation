---
description: Monitoriza los costes asociados a las plataformas en la nube.
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentación
  text: Gestión de costes en la nube
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: Blog
  text: Reaccionar rápidamente a los sobrecostes utilizando monitores para la gestión
    de costes en la nube de Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permitir a los ingenieros hacerse cargo de los costes de Google Cloud con
    Datadog
kind: Documentación
title: Monitor de costes de la nube
---

## Información general
Obtén notificaciones proactivas sobre los cambios en los costes para ayudar a atenuar los costes imprevistos en la nube. Los monitores de costes en la nube te ayudan a identificar rápidamente cambios en los costes para que puedas investigar sus causas. Puedes configurar tus alertas para detectar cambios inesperados.

Para configurar monitores de costes en la nube, necesitas tener instalada la [Gestión de costes en la nube][1]. Después de instalarla, puedes configurar los monitores para que envíen alertas cuando los costes aumentan o disminuyen.

## Creación de un monitor

Para crear un monitor de costes en la nube en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Cloud Cost* (Monitores > Nuevo monitor > Costes en la nube).

También puedes crear monitores de costes en la nube en [Análisis de costes en la nube][2]. Haz clic en **+Export to Monitor** (+Exportar al monitor), arriba de la tabla de costes.

{{< img src="/monitors/monitor_types/cloud_cost/cloud_cost_analytics.png" alt="Botón "Exportar al monitor" en la página Análisis de costes en la nube" style="width:100%;" >}}

## Seleccionar un tipo de monitor de costes

Elige entre dos tipos de monitores: **Comparar costes en el tiempo** o **Configurar umbral de costes diario**.

| Tipo de coste | Descripción | Ejemplos de uso |
| ---  | ----------- | ----------- |
| Cambios en los costes  | Comparar costes diarios, semanales o mensuales | Crea alertas para cuando la diferencia entre el coste del día actual y el de la semana anterior supera el 5%. |
| Umbral de coste | Configurar alertas sobre los costes totales que superan un umbral en un día | Configurar alertas para cuando el coste total del día actual supera los 10.000 dólares estadounidenses |

## Especificar qué costes se deben controlar

Cualquier tipo de coste o métrica que informe a Datadog está disponible para monitores. Puedes utilizar métricas personalizadas o métricas de observabilidad junto a una métrica de costes para monitorizar unidades económicas. Para obtener más información, consulta la página [Gestión de costes en la nube][1]. Utiliza el editor para definir los tipos de costes o exportaciones. 

| Etapa                              | Obligatorio | Predeterminado              | Ejemplo             |
|-----------------------------------|----------|----------------------|---------------------|
| Seleccionar la métrica para costes                 | Sí      | `aws.cost.amortized` | `azure.cost.actual` |
| Definir el `filter by`            | No       | Todo           | `aws_product:s3`    |
| Agrupar por                          | No       | Todo           | `aws_availability_zone` |
| Añadir una métrica de observabilidad | No      | `system.cpu.user` | `aws.s3.all_requests` |

{{< img src="monitors/monitor_types/cloud_cost/ccm_metrics_source.png" alt="Opciones de costes en la nube y de origen de datos de métricas para especificar los costes que se deben controlar" style="width:100%;" >}}

## Definir tus condiciones de alerta

Si el tipo de monitor de costes es **Umbral de coste**, puedes activar una alerta para cuando el coste de la nube es `above`, `below`, `above or equal` o `below or equal to` a un umbral.  

Si el tipo de monitor de costes es **Cambios de costes**, puedes activar una alerta para cuando el coste `increases` o `decreases` con respecto al umbral definido. El umbral puede configurarse como **Cambio porcentual** o **Importe en dólares estadounidenses**.

**Nota**: Para el monitor de **Cambio porcentual**, también puedes filtrar los cambios que están por debajo de un determinado umbral en dólares estadounidenses.
Ejemplo: crea una alerta para cuando hay un cambio de costes superior al 5% en cualquier cambio que supere los 500 dólares estadounidenses.

## Configurar notificaciones y automatizaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analytics
[3]: /es/monitors/notify/