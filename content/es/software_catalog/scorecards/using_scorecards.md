---
aliases:
- /es/tracing/software_catalog/scorecards/using_scorecards
- /es/tracing/service_catalog/scorecards/using_scorecards
- /es/service_catalog/scorecards/using_scorecards
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de Scorecards
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas recomendadas de observabilidad del servicio
    con Scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con Scorecards personalizados
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
title: Utilización de Scorecards
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards está en vista previa.
{{< /callout >}}

Después de configurar tus Scorecards, puedes ver las puntuaciones a nivel de servicio, realizar un seguimiento de las puntuaciones a lo largo del tiempo y generar informes de Scorecards para actualizar automáticamente tu equipo con la información de la Scorecard.

## Ver detalles y puntuaciones a nivel de servicio

Puedes acceder al resumen de las Scorecards en la [**página Explorar**][1] del Catálogo de software, en la columna **Scorecards** de la pestaña **Propiedad**. Puedes ver cómo está tu servicio específico o tu subconjunto de servicios en cada Scorecard y las reglas de cada uno de ellos. 

Haz clic en **View Details* (Ver detalles) en la Scorecard o abre el panel lateral de detalles del servicio para ver la pestaña **Scorecards** que enumera todas las Scorecards, las reglas y la puntuación aprobada o fallida del servicio para cada regla.

## Seguimiento de las puntuaciones a lo largo del tiempo

Puedes visualizar cómo progresan las puntuaciones de los equipos a lo largo del tiempo a medida que realizan cambios y solucionan problemas conocidos mediante series temporales históricas en la interfaz de usuario de las Scorecards. También puedes exportar estas series temporales a dashboards y notebooks donde puedes filtrar por diferentes etiquetas (tags) como `team`, `rule`, `scorecard`, `application`, `tier` y `lifecycle`. 

{{< img src="/tracing/software_catalog/scorecard-historical-metrics.png" alt="Series temporales que muestran cambios en las puntuaciones a lo largo del tiempo en la interfaz de usuario de la Scorecard" style="width:90%;" >}}

## Generar informes de Scorecards

Puedes generar informes de Scorecards, que envían información general programada de los datos de la Scorecard al canal de Slack de tu equipo para que todos puedan entender cómo los servicios y los equipos cumplen los estándares esperados. La creación de un informe genera un flujo de trabajo utilizando [Datadog Workflow Automation][2], que se ejecuta en un horario programado.

<div class="alert alert-warning">La ejecución de este flujo de trabajo puede afectar a tu facturación. Para obtener más información, consulta la <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">página de precios</a>.</div>

Para crear un informe:

1. Haz clic en **Create Report** (Crear informe) en la página Scorecards.
2. Elige si quieres incluir todos los servicios definidos en tu organización o los servicios de un equipo específico. 
3. Define la fecha, la hora y la frecuencia con la que quieres recibir estos informes.
4. Define el espacio de trabajo y el canal de Slack al que deben enviarse los informes. El canal seleccionado debe ser público y debe tener instalada la aplicación Slack de Datadog. 
5. Haz clic en **Enable this Workflow** (Habilitar este flujo de trabajo).

Con esta información, Datadog te envía informes sobre las reglas, los servicios y los equipos con mayor y menor puntuación. 

{{< img src="/tracing/software_catalog/scorecard-reports.png" alt="Modal de creación de informes de Scorecards, que muestra cómo crear informes para todos los servicios" style="width:90%;" >}}


### Gestionar informes de Scorecards
Para editar o eliminar un flujo de trabajo, haz clic en **Manage Reports** (Gestionar Informes) en la página Scorecards y selecciona el flujo de trabajo. Edita el flujo de trabajo o elimínalo utilizando el menú Configuración.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/service_management/workflows/