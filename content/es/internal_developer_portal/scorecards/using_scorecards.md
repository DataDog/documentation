---
aliases:
- /es/tracing/software_catalog/scorecards/using_scorecards
- /es/tracing/service_catalog/scorecards/using_scorecards
- /es/service_catalog/scorecards/using_scorecards
- /es/catálogo_de_software/scorecards/utilizando_scorecards
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de tarjetas de puntuación
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas de observabilidad recomendadas del servicio
    con tarjetas de puntuación
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con tarjetas de puntuación personalizadas
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
title: Utilización de Scorecards
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Las tarjetas de puntuación están en vista previa.
{{< /callout >}}

Una vez configurados sus cuadros de mando, puede ver las puntuaciones a nivel de entidad, realizar un seguimiento de las puntuaciones a lo largo del tiempo y generar informes scorecard para actualizar automáticamente su equipo con la información de scorecard.

## Ver detalles y puntuaciones a nivel de entidad

Se puede acceder al resumen de scorecard en [**Explorar** Page ( página)][1] en Software Catalog bajo la columna **Tarjetas de puntuación** en la pestaña **Propiedad**. Puede ver qué nivel ha alcanzado su entidad específica o subconjunto de entidades y el número de reglas superadas dentro de cada nivel.  

Haga clic en **Ver detalles** en scorecard, o abra el panel lateral de detalles de la entidad y navegue hasta la pestaña Scorecards. Ambas vistas muestran todos los niveles, las reglas aplicadas en cada nivel y el estado de la entidad -`pass`, `fail` o `no data`- para cada regla.

## Seguimiento de las puntuaciones a lo largo del tiempo

Puedes visualizar cómo progresan las puntuaciones de los equipos a lo largo del tiempo a medida que realizan cambios y solucionan problemas conocidos mediante series temporales históricas en la interfaz de usuario de las Scorecards. También puedes exportar estas series temporales a dashboards y notebooks donde puedes filtrar por diferentes etiquetas (tags) como `team`, `rule`, `scorecard`, `application`, `tier` y `lifecycle`. 

{{< img src="/tracing/software_catalog/scorecard-historical-metrics.png" alt="Series temporales que muestran cambios en las puntuaciones a lo largo del tiempo en la interfaz de usuario de la Scorecard" style="width:90%;" >}}

## Generar informes de Scorecards

Puede generar informes scorecard, que envían resúmenes programados de información scorecard al canal Slack de su equipo para ayudar a todos a comprender cómo las entidades y Teams están cumpliendo los estándares esperados. La creación de un informe genera un workflow (UI) / proceso (generic) mediante [Datadog workflow (UI) / proceso (generic) Automatización (automatización de procesos)][2], que se ejecuta a una hora programada. 

<div class="alert alert-danger">La ejecución de este flujo de trabajo puede afectar a tu facturación. Para obtener más información, consulta la <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">página de precios</a>.</div>

Para crear un informe:

1. Haz clic en **Create Report** (Crear informe) en la página Scorecards.
2. Elija si desea incluir todas las entidades definidas en su organización o las entidades de un equipo específico. 
3. Define la fecha, la hora y la frecuencia con la que quieres recibir estos informes.
4. Define el espacio de trabajo y el canal de Slack al que deben enviarse los informes. El canal seleccionado debe ser público y debe tener instalada la aplicación Slack de Datadog. 
5. Haz clic en **Enable this Workflow** (Habilitar este flujo de trabajo).

Con esta información, Datadog le envía informes sobre las reglas, entidades y Teams con mayor y menor puntuación. 

{{< img src="/tracing/software_catalog/scorecard-reports.png" alt="Modal de creación de informes de Scorecards, que muestra cómo crear informes para todos los servicios" style="width:90%;" >}}


### Gestionar informes de Scorecards
Para editar o eliminar un flujo de trabajo, haz clic en **Manage Reports** (Gestionar Informes) en la página Scorecards y selecciona el flujo de trabajo. Edita el flujo de trabajo o elimínalo utilizando el menú Configuración.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/service_management/workflows/