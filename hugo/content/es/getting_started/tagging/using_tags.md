---
aliases:
- /es/tagging/using_tags/
description: Aprenda a usar etiquetas en los productos de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: Blog
  text: Prácticas recomendadas para etiquetar su infraestructura y aplicaciones
- link: /getting_started/tagging/
  tag: Documentación
  text: Primeros pasos con las etiquetas
- link: /getting_started/tagging/assigning_tags/
  tag: Documentación
  text: Aprenda a asignar etiquetas
title: Uso de etiquetas
---
## Descripción general {#overview}

Después de [asignar etiquetas][1], comience a usarlas para filtrar y agrupar sus datos en su plataforma Datadog. Las etiquetas se pueden usar para incluir o excluir datos.

Al incluir o excluir varias etiquetas:

* Incluir usa lógica `AND`
* Excluir usa lógica `OR`

## Eventos {#events}

El [Events Explorer][2] muestra los eventos de su entorno durante un período de tiempo específico. Use etiquetas para filtrar la lista de eventos y centrarse en un subconjunto de eventos. Ingrese `tags:` seguido de una etiqueta para ver todos los eventos provenientes de un servidor, [integración][3] o servicio con esa etiqueta. Por ejemplo, use `tags:(service:coffee-house)` para buscar la etiqueta `service:coffee-house`.

Para buscar varias etiquetas de forma inclusiva, separe cada etiqueta con OR: `tags:(service:coffee-house OR host:coffeehouseprod)`. Para buscar varias etiquetas de forma exclusiva, separe cada etiqueta con AND: `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards {#dashboards}

{{< tabs >}}
{{% tab "Asignación" %}}

Use etiquetas para filtrar las métricas que se mostrarán en un [gráfico de Dashboard][1], o para crear grupos agregados de métricas para mostrar. Para filtrar las métricas que se mostrarán, ingrese la etiqueta en el cuadro de texto {{< ui >}}from{{< /ui >}}. Esta métrica se muestra en todas las fuentes que tienen esa etiqueta en particular asignada (`service:web-store` en el ejemplo a continuación).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Filtre las métricas en los dashboards agregando una etiqueta al campo 'from'; en este ejemplo, la métrica se filtra a 'service:web-store'" style="width:80%;">}}

El filtrado avanzado de valores de etiquetas también está disponible con filtros booleanos. Se admite la siguiente sintaxis booleana:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Use `AND`, `ORs` para observar una métrica a través de etiquetas específicas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Filtro booleano con AND/OR" style="width:80%;">}}

Use `IN`, `NOT IN` para filtrar rápidamente una métrica por etiquetas específicas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Filtro booleano con IN/NOT IN" style="width:80%;">}}

Para crear un grupo agregado usando etiquetas, ingrese la parte clave de la etiqueta en el cuadro de texto {{< ui >}}avg by{{< /ui >}}. Por ejemplo, si tiene un gráfico de series temporales que muestra una métrica etiquetada con la clave `service`, como `service:web-store`, ingrese `service` en el cuadro de texto {{< ui >}}avg by{{< /ui >}} para mostrar una línea por cada valor de etiqueta `service`. Cada línea representa el valor promedio de la métrica en todas las fuentes que comparten ese valor de la etiqueta `service`.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Etiquetas en el cuadro de texto avg by de los Dashboards" style="width:80%;">}}

Las etiquetas también se pueden usar para superponer eventos en el Dashboard. Esto funciona de la misma manera que en el [Events Explorer][2].
Los eventos coincidentes se superponen como barras verticales en el gráfico. El ejemplo a continuación usa `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Use etiquetas para agregar Event Overlays en los Dashboards" style="width:80%;">}}

Utilice [variables de plantilla][3] para ahorrar tiempo al cambiar la etiqueta {{< ui >}}from{{< /ui >}} en los gráficos de su Dashboard. En el ejemplo siguiente, `service` se utiliza para representar la clave de etiqueta `service`. Para utilizar la variable de plantilla, añada la variable de plantilla `$service` en el cuadro de texto {{< ui >}}from{{< /ui >}} de su consulta de gráfico.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Variables de plantilla del Dashboard" style="width:80%;">}}

[1]: /es/dashboards/
[2]: /es/events/
[3]: /es/dashboards/template_variables/
{{% /tab %}}
{{% tab "Ejemplos" %}}

Aquí tiene un ejemplo de etiquetas utilizando el editor de gráficos de series temporales. Para la primera captura de pantalla, no se han aplicado etiquetas y se muestra el uso promedio de CPU en todos los servidores:

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Editor de gráficos de series temporales sin etiquetas añadidas" style="width:75%;">}}

A continuación, se actualiza el editor para incluir una etiqueta (`region:eastus`) en el cuadro de texto {{< ui >}}from{{< /ui >}} que permite a Datadog observar el uso de CPU en la región US East. La etiqueta `region` se utiliza aquí como ejemplo, pero podría usar cualquier etiqueta arbitraria enviada a su plataforma Datadog, incluyendo `application`, `service` o `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Editor de gráficos de series temporales filtrado por la etiqueta 'region:us-east-1'" style="width:75%;">}}

Finalmente, el segundo campo vacío (el cuadro de texto {{< ui >}}avg by{{< /ui >}}) se utiliza para mostrar una línea de series temporales para cada `host`. Se muestra el uso de CPU de cada servidor de la región US East.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Editor de gráficos de series temporales filtrado por 'region:us-east-1' y agrupado por 'host'" style="width:75%;">}}

Si es necesario, añada etiquetas adicionales para delimitar aún más el contexto; por ejemplo, servidores en `region:eastus` y `env:production`. Las etiquetas se pueden utilizar en todo Datadog y aplicarse a todos los elementos principales (métricas, trazas y registros).

{{% /tab %}}
{{< /tabs >}}

## Infraestructura {#infrastructure}

Para filtrar el [Mapa de servidores][4], la [Lista de infraestructura][5], los [Containers][6] y los [Procesos][7], introduzca una etiqueta en el cuadro de texto {{< ui >}}Filter by{{< /ui >}} en la parte superior de la página. Los servidores y contenedores se pueden agrupar por clave de etiqueta utilizando el cuadro de texto {{< ui >}}Group by{{< /ui >}}. Si ingresa `service` en el cuadro de grupo, verá cada servicio como un encabezado de grupo.

{{< tabs >}}
{{% tab "Mapa de servidores" %}}

En esta sección, utilice etiquetas para filtrar o agrupar hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Etiquetas del mapa de servidores" style="width:80%;">}}

O containers:

{{< img src="tagging/using_tags/containermaptags.png" alt="Etiquetas del mapa de contenedores" style="width:80%;">}}
{{% /tab %}}

{{% tab "Lista de infraestructura" %}}

Aquí están los cuadros de texto de filtro y agrupación en la página de Lista de infraestructura:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Etiquetas en la Lista de infraestructura" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

Aquí están los cuadros de texto de filtro y agrupación en la página de Live Containers:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Etiquetas de Live Containers" style="width:80%;">}}
{{% /tab %}}

{{% tab "Procesos" %}}

Aquí están los cuadros de texto de filtro y agrupación en la página de Live Processes:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Etiquetas de Live Processes" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitores {#monitors}

Para filtrar los seguimientos y los [períodos de inactividad de los seguimientos][31] por [etiquetas asignadas][32], utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `tag:"<KEY>:<VALUE>"`, por ejemplo: `tag:"service:coffee-house"`. Para coincidir con cualquier valor de una clave de etiqueta, escape los dos puntos con una barra invertida (`\`) en lugar de usar comillas, ya que los comodines no son compatibles dentro de las comillas. Por ejemplo, `tag:service\:*` devuelve todos los seguimientos que tienen una etiqueta `service`. Para excluir de su búsqueda los seguimientos con una etiqueta específica, utilice `-`, por ejemplo: `-tag:"service:coffee-house"`.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filtrar seguimientos en la barra de búsqueda con etiquetas" style="width:80%;">}}

**Nota**: Las etiquetas de seguimiento son diferentes de las etiquetas de métricas y se mantienen separadas de ellas. Para obtener más información, consulte la documentación sobre [etiquetas de seguimiento][30].

Al crear un nuevo seguimiento, utilice *etiquetas de métricas* en:
* {{< ui >}}from{{< /ui >}} cuadro de texto para limitar el contexto del seguimiento únicamente a las métricas que tienen esas etiquetas.
* {{< ui >}}excluding{{< /ui >}} cuadro de texto para eliminar las métricas correspondientes del contexto del seguimiento.
* {{< ui >}}avg by{{< /ui >}} cuadro de texto para convertir el seguimiento en uno de alertas múltiples para cada valor de etiqueta.

## Métricas {#metrics}

Use etiquetas en [Metrics Explorer][8] para filtrar métricas por etiquetas o mostrar múltiples gráficos por clave de etiqueta. El siguiente ejemplo grafica una métrica sobre `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="Un gráfico de métricas cuyo contexto se limita a una etiqueta individual" style="width:80%;">}}

## Integrations {#integrations}

Algunas integraciones le permiten limitar opcionalmente las métricas mediante etiquetas.

{{< tabs >}}
{{% tab "AWS" %}}

El [mosaico de integración de AWS][1] tiene los filtros de etiquetas `to hosts with tag` y `to Lambdas with tag`.

Estos campos aceptan una lista de etiquetas separadas por comas (en el formato `<KEY>:<VALUE>`) que define un filtro, el cual se utiliza para recopilar sus recursos de EC2 o Lambda. Puede usar estos `<KEY>:<VALUE>` tanto para incluir funciones en el seguimiento como para excluirlas de él según las etiquetas. Para especificar que una etiqueta debe excluirse, agregue un `!` antes de la clave de etiqueta. También puede usar comodines, como `?` (para caracteres individuales) y `*` (para múltiples caracteres).

Los filtros incluyen recursos donde cualquier etiqueta de inclusión está presente mediante el uso de una instrucción `OR`. El siguiente filtro de ejemplo recopila instancias de EC2 que contienen la etiqueta `datadog:monitored` OR `env:production`:

```text
datadog:monitored,env:production
```

Si especificó una etiqueta de exclusión, esta tiene prioridad y forma una instrucción `AND`. El siguiente filtro de ejemplo recopila instancias de EC2 que contienen la etiqueta `datadog:monitored`, OR `env:production`, OR una etiqueta `instance-type` con un valor `c1.*` AND NOT una etiqueta `region:us-east-1`:

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Lea más sobre el etiquetado de AWS en la documentación de [EC2][2] y [Lambda][3].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

El [mosaico de integración de Azure][1] tiene el filtro de etiquetas `Optionally filter to VMs with tag`.

Este campo acepta una lista de etiquetas separadas por comas (con el formato `<KEY>:<VALUE>`) que define un filtro, el cual se utiliza para recopilar métricas de las máquinas virtuales de Azure. También puede usar comodines, como `?` (para caracteres individuales) y `*` (para múltiples caracteres). Solo se importan a Datadog las máquinas virtuales que coinciden con una de las etiquetas definidas. El resto se ignora.

Las máquinas virtuales que coinciden con una etiqueta determinada también se pueden excluir añadiendo `!` antes de la etiqueta, por ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

El [mosaico de integración de Google Cloud][1] tiene el filtro de etiquetas `to hosts with tag`.

Este campo acepta una lista de etiquetas de GCP separadas por comas (con el formato `<KEY>:<VALUE>`) que define un filtro, el cual se utiliza para recopilar métricas de GCP. También puede usar comodines, como `?` (para caracteres individuales) y `*` (para múltiples caracteres). Solo se importan a Datadog los servidores que coinciden con una de las etiquetas definidas. El resto se ignora.

Puede excluir los servidores que coinciden con una etiqueta determinada añadiendo `!` antes de la etiqueta, por ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Lea más sobre [Cómo crear y administrar etiquetas][2] en la documentación de Google Cloud.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM {#apm}

{{< tabs >}}
{{% tab "Trace Explorer" %}}

En el [Trace Explorer][1], puede filtrar trazas con etiquetas mediante la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`, por ejemplo: `service:coffee-house`. Para búsquedas avanzadas, consulte [Sintaxis de consulta][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Etiquetas de Trace Explorer" style="width:80%;">}}

[1]: /es/tracing/trace_explorer/search/
[2]: /es/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

Después de [asignar etiquetas][1], utilice el Service Map para navegar a diferentes áreas de la aplicación haciendo clic en un servicio en particular. En el ejemplo siguiente, visualice [Analytics][2], [Monitors][3], [Logs][4] y el [mapa de servidores][5] filtrados por la etiqueta `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Etiquetas de Service Map" style="width:80%;">}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/tracing/app_analytics/search/
[3]: /es/monitors/manage/
[4]: /es/logs/explorer/search/
[5]: /es/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks {#notebooks}

Al crear un gráfico de [Notebook][9], limite las métricas usando etiquetas en el cuadro de texto {{< ui >}}from{{< /ui >}}. Además, agrupe las métricas usando etiquetas en el cuadro de texto {{< ui >}}avg by{{< /ui >}}. En el ejemplo siguiente, las métricas se limitan a `service:coffee-house` y se agrupan por `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Etiquetas de Notebook" style="width:80%;">}}

Para excluir etiquetas, utilice `</>` para editar el texto y luego añada la etiqueta en el formato `!<KEY>:<VALUE>`. En el ejemplo siguiente, `service:coffeehouse` se excluye utilizando `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Etiquetas de exclusión de Notebook" video="true" width="80%">}}

## Logs {#logs}

Para Logs [Search][10], [Analytics][11], [Patterns][12] y [Live Tail][13], filtre los logs con etiquetas utilizando la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`, por ejemplo: `service:coffee-house`. Para búsquedas avanzadas, consulte [Search Logs][10].

Además, las etiquetas se utilizan para filtrar un [Pipeline][14] de logs. Por ejemplo, si solo desea que los logs del servicio coffee-house pasen por el pipeline, añada la etiqueta `service:coffee-house` al campo de filtro.

## RUM y Session Replay {#rum-session-replay}

El [RUM Explorer][15] visualiza eventos de su entorno durante un período de tiempo especificado.

Para filtrar datos de eventos RUM por etiquetas, utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`, por ejemplo: `service:shopist`. Para búsquedas avanzadas, consulte [Search RUM Events][16].

{{< img src="tagging/using_tags/rumtags.png" alt="Etiquetas de RUM" style="width:80%;">}}

## Synthetics {#synthetics}

{{< tabs >}}
{{% tab "Pruebas Synthetic" %}}

La página [Synthetic Tests][1] lista sus pruebas Synthetic.

Para filtrar pruebas por etiquetas, utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `tag:mini-website`. Para una búsqueda avanzada, consulte [Search and Manage Synthetic Tests][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Etiquetas de Synthetics" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/synthetics/search/
{{% /tab %}}
{{% tab "Explorador" %}}

El [Synthetic Monitoring & Testing Results Explorer][1] muestra sus ejecuciones de prueba y lotes de ejecuciones en un [pipeline de CI][2].

Para filtrar ejecuciones de prueba por etiquetas, utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@ci.provider.name:github`. Para una búsqueda avanzada, consulte [Search Test Batches][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Etiquetas de Synthetics y CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/cicd_integrations
[3]: /es/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Objetivos de nivel de servicio {#service-level-objectives}

{{< tabs >}}
{{% tab "Administrar los SLO" %}}

Para filtrar los SLO por [etiquetas asignadas][1], utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`, por ejemplo: `journey:add_item`. Para excluir los SLO con una etiqueta específica de su búsqueda, utilice `-`, por ejemplo: `-journey:add_item`.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Etiquetas de SLO" style="width:80%;">}}

Las etiquetas de SLO son diferentes e independientes de las etiquetas de métricas o de seguimiento utilizadas en las métricas o los seguimientos subyacentes de un SLO.

[1]: /es/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLO basados en métricas" %}}

Al crear un [metric-based SLO][1], utilice etiquetas de métricas en las consultas de métricas de tasa de éxito del SLO (todas las métricas deben utilizar el mismo conjunto de etiquetas de métricas):

* {{< ui >}}from{{< /ui >}} cuadro de texto para limitar el contexto de la métrica solo a esas etiquetas.
* {{< ui >}}sum by{{< /ui >}} cuadro de texto para crear un SLO basado en métricas agrupado que muestre un porcentaje de estado y el presupuesto de error restante tanto para el SLO general como para cada valor de etiqueta.

[1]: /es/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLO basados en monitores" %}}

Al crear un [SLO basado en seguimiento][1] utilizando un único [seguimiento agrupado][2], utilice el interruptor {{< ui >}}Calculate on selected groups{{< /ui >}} para seleccionar hasta 20 valores de etiqueta del seguimiento subyacente para mostrar un porcentaje de estado y el presupuesto de error restante tanto para el SLO general como para cada valor de etiqueta:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Etiquetas de SLO basados en el seguimiento" style="width:80%;">}}

[1]: /es/service_level_objectives/monitor/
[2]: /es/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility {#ci-visibility}

{{< tabs >}}
{{% tab "Ejecuciones de prueba" %}}

El [CI Visibility Explorer][101] muestra sus ejecuciones de prueba realizadas en un pipeline de CI.

Para filtrar ejecuciones de prueba por etiquetas, utilice la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@test.status:failed`. Para una búsqueda avanzada, consulte [Test Optimization Explorer Search Syntax][102].

{{< img src="/continuous_integration/test_runs.png" alt="Ejecuciones de prueba en CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /es/tests/explorer/search_syntax

{{% /tab %}}
{{% tab "Ejecuciones de pipelines" %}}

El [CI Visibility Explorer][101] muestra las ejecuciones de sus pipelines de CI.

Para filtrar las ejecuciones de pipelines por etiquetas, use la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@ci.provider.name:gitlab`. Para una búsqueda avanzada, consulte [Search and Manage CI Pipelines][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Ejecuciones de pipelines en CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /es/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## DORA Metrics {#dora-metrics}

El [DORA Metrics Explorer][33] muestra sus agregaciones de DORA Metrics. Para filtrar las métricas y agregaciones mostradas por etiquetas, use el botón {{< ui >}}\+ Filter{{< /ui >}} para agregar facetas para las etiquetas existentes. Para realizar consultas con etiquetas en gráficos y tableros, consulte [DORA Metrics Create Custom Dashboards][34].

{{< img src="/delivery_performance/dora_metrics/dora_ui_3.png" alt="Una descripción general de los cálculos de DORA Metrics filtrados por la etiqueta personalizada de idioma" style="width:80%;">}}

## Desarrolladores {#developers}

Las etiquetas se pueden usar de varias maneras con la [API][17].

Consulte esta lista para obtener enlaces a las secciones respectivas:

* [Programar el tiempo de inactividad de un seguimiento][18]
* [Consultar el explorador de eventos][19]
* [Buscar hosts][20]
* Integrations para [AWS][21] y [Google Cloud][22]
* [Consultar puntos de series temporales][23]
* [Obtener todos los detalles de un seguimiento][24]
* [Silenciar un seguimiento][25]
* [Búsqueda de seguimientos][24]
* [Búsqueda de grupos de seguimientos][24]
* [Crear un panel visual][26]
* [Crear un timeboard][26]
* [Crear un SLO][27]
* [Obtener los detalles de un SLO][28]
* [Actualizar un SLO][29]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/events/explorer
[3]: /es/integrations/
[4]: /es/infrastructure/hostmap/
[5]: /es/infrastructure/
[6]: /es/infrastructure/livecontainers/
[7]: /es/infrastructure/process/
[8]: /es/metrics/explorer/
[9]: /es/notebooks/
[10]: /es/logs/explorer/search/
[11]: /es/logs/explorer/analytics/
[12]: /es/logs/explorer/patterns/
[13]: /es/logs/live_tail/
[14]: /es/logs/log_configuration/pipelines
[15]: /es/real_user_monitoring/explorer/
[16]: /es/real_user_monitoring/explorer/search/
[17]: /es/api/
[18]: /es/api/v1/downtimes/#schedule-a-downtime
[19]: /es/api/v1/events/#query-the-event-stream
[20]: /es/api/v1/hosts/
[21]: /es/api/v1/aws-integration/
[22]: /es/api/v1/gcp-integration/
[23]: /es/api/v1/metrics/#query-timeseries-points
[24]: /es/api/v1/monitors/#get-all-monitor-details
[25]: /es/api/v1/monitors/#mute-a-monitor
[26]: /es/api/v1/dashboards/#create-a-new-dashboard
[27]: /es/api/v1/service-level-objectives/#create-a-slo-object
[28]: /es/api/v1/service-level-objectives/#get-a-slos-details
[29]: /es/api/v1/service-level-objectives/#update-a-slo
[30]: /es/monitors/manage/#monitor-tags
[31]: /es/monitors/downtimes/
[32]: /es/getting_started/tagging/assigning_tags?tab=monitors
[33]: https://app.datadoghq.com/ci/dora
[34]: /es/delivery_performance/dora_metrics/#create-custom-dashboards