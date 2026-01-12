---
algolia:
  tags:
  - visibilidad de pipelines
  - usm
  - pipeline ci
description: Monitoriza la salud y el rendimiento de los pipelines CI con trazas (traces),
  métricas y análisis para optimizar la velocidad de desarrollo y reducir costes.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorización de todos tus pipelines CI con Datadog
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de CI/CD
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Más información sobre CI Pipeline Visibility
- link: /monitors/types/ci
  tag: Documentación
  text: Más información sobre CI Pipeline Monitors
- link: /account_management/billing/ci_visibility
  tag: Documentation
  text: Más información sobre consideraciones de facturación de CI Visibility
title: Empezando con CI Visibility
---

## Información general

CI Visibility, o CI Pipeline Visibility, te permite monitorizar el estado de tus pipelines CI y visualizar el rendimiento de las ejecuciones de tus pipelines en forma de trazas, donde los tramos (spans) representan los diferentes niveles del pipeline. 

{{< img src="/getting_started/ci_visibility/pipelines_list.png" alt="Vista de lista de tus pipelines CI en Datadog CI Visibility" style="width:100%" >}}

Puedes reenviar logs de tareas CI y correlacionarlos automáticamente con tus pipelines en CI Visibility. Dependiendo de los proveedores que utilices, puedes habilitar la recopilación de logs de tareas en la [página **Configuración**][1] de CI Visibility o en la configuración de tu proveedor para integrarlos con Datadog.

También puedes utilizar la CLI `datadog-ci` para [rastrear comandos][2] en tus pipelines, así como [etiquetas (tags) personalizadas y comandos de medidas][3] para añadir texto y etiquetas numéricas definidos por el usuario en las trazas de tu pipeline.

CI Visibility proporciona a las organizaciones de DevOps y de ingeniería de plataformas una monitorización y un análisis completos y la capacidad de localizar y solucionar cuellos de botella, optimizar la asignación de recursos y reducir los costes de CI. 

Al integrar métricas, logs y alertas de rendimiento, las organizaciones pueden mejorar la velocidad de desarrollo, aumentar la fiabilidad de sus pipelines y tomar decisiones basadas en datos en la nube y en entornos autoalojados.

## Configuración de tu proveedor de CI

CI Visibility realiza un seguimiento del rendimiento y de los resultados de tus pipelines CI y muestra los resultados una vez que finaliza el pipeline.

Para empezar a enviar métricas de pipelines, consulte la documentación de uno de los siguientes proveedores de CI compatibles con Datadog a continuación.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

Si tu proveedor de CI no es compatible, puedes enviar tus eventos de pipelines a Datadog mediante programación. Consulta la sección [Enviar eventos de pipelines a Datadog](#send-pipeline-events-to-datadog).

Dependiendo del proveedor de CI elegido, es posible que CI Visibility no admita todos los niveles de tu pipeline (etapa, tarea, paso o comando). Para obtener más información sobre cómo CI Visibility define un pipeline CI, consulta la [sección Terminología][4].

## Uso de los datos de un pipeline CI

Accede a las métricas de tus pipelines (como tiempos de espera en cola, duraciones, percentiles y estados) para empezar a identificar tendencias y patrones importantes utilizando los datos recopilados a través de tus proveedores de CI. 

{{< img src="/getting_started/ci_visibility/pipelines_dashboard.png" alt="Dashboard predefinido con widgets que muestran los datos recopilados de tus pipelines, tareas y estapas en CI Visibility" style="width:100%" >}}

Puedes crear [dashboards][5] para visualizar en qué puntos se producen los fallos en tus pipelines o utilizar un [dashboard predefinido][6] que contenga widgets rellenados con datos recopilados en CI Visibility para visualizar el estado y el rendimiento de tus pipelines, etapas y tareas CI.

## Buscar y gestionar tus pipelines CI

La página [**Lista de CI Pipeline**][7] proporciona una visión completa del rendimiento y la fiabilidad de tus pipelines CI en la rama predeterminada. Accede a estadísticas agregadas, tendencias e información sobre tus pipelines para identificar y solucionar problemas como fallos y regresiones.

Para mejorar la resolución de problemas y agilizar los procesos de gestión de pipelines, haz clic en un pipeline para acceder a la información, revisar historiales de ejecución y consultar logs y datos de telemetría relacionados. Para obtener más información, consulta [Buscar y gestionar pipelines CI][8].

## Examinar los resultados en el Explorador de CI Visibility

El [Explorador de CI Visibility][9] te permite crear visualizaciones y filtrar tramos de pipelines utilizando los datos recopilados de tus proveedores de CI. Cada ejecución de pipeline se informa como una traza que incluye información sobre la etapa y la tarea.

{{< tabs >}}
{{% tab "Pipeline" %}}

Ve a [**Software Delivery** > **CI Visibility** > **Executions** (Entrega de software > CI Visibility > Ejecuciones)][101] y selecciona `Pipeline` para empezar a filtrar los resultados del tramo de tu pipeline.

{{< img src="/getting_started/ci_visibility/pipeline_view.png" alt="Resultados de la ejecución de un pipeline en el Explorador de CI Visibility, filtrados en el respositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Apipeline

{{% /tab %}}
{{% tab "Etapa" %}}

Ve a [**Software Delivery** > **CI Visibility** > **Executions** (Entrega de software > CI Visibility > Ejecuciones)][101] y selecciona `Stage` para empezar a filtrar los resultados del tramo de tu etapa.

{{< img src="/getting_started/ci_visibility/stage_view.png" alt="Resultados de la etapa en el Explorador de CI Visibility, filtrados en el respositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astage

{{% /tab %}}
{{% tab "Tarea" %}}

Ve a [**Software Delivery** > **CI Visibility** > **Executions** (Entrega de software > CI Visibility > Ejecuciones)][101] y selecciona `Job` para empezar a filtrar los resultados del tramo de tu tarea.

{{< img src="/getting_started/ci_visibility/job_view.png" alt="Resultados de la tarea en el Explorador de CI Visibility, filtrados en el respositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Ajob

{{% /tab %}}
{{% tab "Paso" %}}

Ve a [**Software Delivery** > **CI Visibility** > **Executions** (Entrega de software > CI Visibility > Ejecuciones)][101] y selecciona `Step` para empezar a filtrar los resultados del tramo de tu paso.

{{< img src="/getting_started/ci_visibility/step_view.png" alt="Resultados del paso en el Explorador de CI Visibility, filtrados en el respositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astep

{{% /tab %}}
{{< /tabs >}}

Utiliza [facetas][9] para personalizar la consulta de búsqueda e identificar los cambios en el tiempo empleado en cada nivel de tu pipeline.

Una vez que hagas clic en un pipeline, podrás acceder a las ejecuciones individuales de pipelines que aparecen en la sección **Pipeline Executions** (Ejecuciones de pipelines). Al hacer clic en una ejecución de pipeline, podrás ver un gráfico de llama o una lista de tramos en la pestaña **Rastrear**.

{{< img src="/getting_started/ci_visibility/executions.png" alt="Resultados de la ejecución de un pipeline mostrados en un gráfico de llama para el pipeline de compilación pretest y test" style="width:100%" >}}

Puedes identificar cuellos de botella en tu pipeline y examinar nodos individuales ordenados de mayor a menor porcentaje de tiempo de ejecución. 

Después de haber configurado la Optimización de tests, puedes acceder a la información de los tests que se ejecutaron en tus pipelines CI, incluyendo el estado del test (Fallido, Nuevo defectuoso, Aprobado u Omitido), en la pestaña Ejecuciones de tests, en el panel lateral de una ejecución de pipeline. Para obtener más información, consulta la [documentación Gestión de tests defectuosos][10].

Puede acceder a logs del pipeline o la tarea a través de ejecutores en la nube y autoalojados y ver información sobre tus ejecutores en la pestaña Logs, en el panel lateral de una ejecución de pipeline.

Si utilizas [proveedores compatibles][11], puedes correlacionar métricas de infraestructura con tus tareas de GitLab y acceder a la información del host, del sistema, de las etiquetas del host y de las métricas del host de la tarea de GitLab. Para obtener más información, consulta [Correlacionar métricas de infraestructura con tareas de GitLab en Datadog][12].

## Enviar eventos de pipelines a Datadog

Para otros proveedores de pipelines y de pipelines personalizados, puedes enviar eventos de pipeline a Datadog mediante programación, utilizando la [API de pipelines de CI Visibility][16]. Para obtener más información, consulta [Modelo de datos y tipos de ejecución de pipelines][13].

Proporciona la siguiente información Git (la URL del repositorio, el SHA de confirmación y el correo electrónico del autor) de la confirmación que activó la ejecución del pipeline en la solicitud.

## Crear un monitor de pipelines CI

Envía alertas a los equipos pertinentes de tu organización sobre el estado y las regresiones de rendimiento de los pipelines cuando se produzcan fallos o se superen los umbrales de duración de tus pipelines CI con [monitores CI][14].

{{< img src="/getting_started/ci_visibility/avg_duration_monitor.png" alt="Monitor de pipelines CI configurado para activar una alerta cuando la duración media del pipeline de test y Deploy Cart superó el umbral de 5 minutos en el último día" style="width:100%" >}}

Para configurar un monitor que envía alertas sobre tu pipeline CI cuando la duración media en el último día superó un umbral de 5 minutos:

1. Ve a [**Monitors** > **New Monitor* (Monitores > Nuevo Monitor)][15] y selecciona **CI**. 
1. Para empezar,, selecciona un tipo de monitor común para pipelines CI, por ejemplo `Long Running Pipeline`, para activar alertas cuando un pipeline ha estado funcionando durante demasiado tiempo, o `Failed Job`, para activar alertas por fallos en la tarea, o personaliza tu propia consulta de búsqueda. En este ejemplo, introduce `@ci.pipeline.name:test_and_deploy_cart` y selecciona el tiempo medio de `Duration (@duration)`.
1. En la sección `Evaluate the query over the`, selecciona **last 1 day** (último día).
1. Configura las condiciones de activación de las alertas cuando el valor evaluado esté **por encima** del umbral y especifica valores para los umbrales de alerta o advertencia, como `Alert threshold > 300000000000`.
1. En la sección `Configure notifications and automations`, configura los parámetros de notificación de tu monitor.
1. Establece permisos para el monitor.
1. Haz clic en **Create** (Crear).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings
[2]: /es/continuous_integration/pipelines/custom_commands/
[3]: /es/continuous_integration/pipelines/custom_tags_and_measures/
[4]: /es/continuous_integration/pipelines/?tab=githubactions#terminology
[5]: /es/dashboards/
[6]: https://app.datadoghq.com/dash/integration/30516/ci-visibility---pipelines-dashboard
[7]: https://app.datadoghq.com/ci/pipelines
[8]: /es/continuous_integration/search/
[9]: /es/continuous_integration/explorer
[10]: /es/tests/flaky_test_management/
[11]: /es/continuous_integration/pipelines/?tab=githubactions#supported-features
[12]: /es/continuous_integration/guides/infrastructure_metrics_with_gitlab/
[13]: /es/continuous_integration/guides/pipeline_data_model/
[14]: /es/monitors/types/ci/?tab=pipelines
[15]: https://app.datadoghq.com/monitors/create
[16]: /es/api/latest/ci-visibility-pipelines/