---
aliases:
- /es/tagging/using_tags/
description: Descubre cómo usar las etiquetas (tags) en los productos de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: Blog
  text: Prácticas recomendadas para el etiquetado de tu infraestructura y aplicaciones
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/assigning_tags/
  tag: Documentación
  text: Aprende a asignar etiquetas (tags)
kind: documentación
title: Usar etiquetas (tags)
---

## Información general

Una vez que hayas [asignado las tags][1], podrás empezar a usarlas para filtrar y agrupar los datos en la plataforma de Datadog. Las tags sirven para incluir o excluir datos.

Cuando se trata de incluir o excluir varias tags:

* Para incluir, se emplea la lógica `AND`
* Para excluir, se emplea la lógica `OR`

## Eventos

El [Events Explorer][2] (Navegador de eventos) muestra los eventos de tu entorno que tienen lugar durante un determinado período de tiempo. Utiliza las tags para filtrar la lista de eventos y centrarte en un subconjunto de eventos. Después, escribe `tags:` seguido de una tag para ver todos los eventos procedentes de un host, una [integración][3] o un servicio que tengan esa misma tag. Por ejemplo, puedes usar `tags:service:coffee-house` para buscar la tag `service:coffee-house`.

Para buscar varias tags de forma inclusiva, haz uso de los paréntesis y separa las tags entre sí con OR: `tags:(service:coffee-house OR host:coffeehouseprod)`. Para buscar varias tags de forma exclusiva, sepáralas entre sí con AND: `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards

{{< tabs >}}
{{% tab "Asignación" %}}

Utiliza etiquetas (tags) para filtrar métricas y mostrarlas en un [dashboard gráfico][1], o para crear grupos añadidos de métricas para mostrar. Para filtrar los métricas que se van a mostrar, introduce la etiqueta (tag) en el cuadro de texto **from** (desde). Esta métrica se muestra en todas las fuentes que tienen asignada esa etiqueta (tag) particular (`service:web-store`, en el ejemplo de abajo).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Filtra métricas en dashboards añadiendo una etiqueta (tag) en el campo 'from' (desde). En este ejemplo, la métrica se filtra por 'service:web-store'" style="width:80%;">}}

También se pueden filtrar valores de las tags de forma avanzada con los filtros boleanos. Así pues, se admite la siguiente sintaxis boleana:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Usa `AND` y `ORs` para consultar una métrica en varias tags concretas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Filtro booleano con Y/O" style="width:80%;">}}

Usa `IN` y `NOT IN` para filtrar rápidamente una métrica en función de varias tags concretas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Filtro booleano con EN/NO EN" style="width:80%;">}}

Para crear un grupo añadido utilizando etiquetas (tags), introduce la parte clave de la etiqueta (tag) en el cuadro de texto **avg by**. Por ejemplo, si tienes un gráfico de series temporales que muestra una métrica etiquetada con la clave `service`, como `service:web-store`, introduce `service` en el cuadro de texto **avg by** para mostrar una línea por cada valor de etiqueta (tag) `service`. Cada línea representa el valor promedio de métrica en todas las fuentes que comparten ese valor de etiqueta (tag)`service`.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Etiquetas (tags) en cuadros de texto avg by de dashboards" style="width:80%;">}}

Las etiquetas (tags) también pueden utilizarse para superponer eventos en el dashboard. Esto funciona de la misma manera que en el [explorador de eventos][2].
Las coincidencias de eventos se superponen como barras verticales en el gráfico. En el ejemplo siguiente se utiliza `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Utiliza etiquetas (tags) para añadir superposiciones de eventos en dashboards" style="width:80%;">}}

Utiliza las [variables de plantilla][3] para ahorrar tiempo al cambiar la tag **from** en los gráficos de tu dashboard. En el ejemplo de abajo, se usa `service` para representar la clave de la tag `service`. Para usar la variable de plantilla, añade la variable `$service` en el campo de texto **from** de la consulta del gráfico.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Variables de plantillas de dashboards" style="width:80%;">}}

[1]: /es/dashboards/
[2]: /es/events/
[3]: /es/dashboards/template_variables/
{{% /tab %}}
{{% tab "Ejemplos" %}}

Este es un ejemplo de etiquetas (tags) que utilizan el editor de gráficos de series temporales. En la primera captura de pantalla, no se han aplicado etiquetas (tags) y se muestra el uso promedio de CPU en todos los hosts:

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Editor de gráficos de series temporales sin etiquetas (tags) añadidas" style="width:75%;">}}

Luego, el editor se actualiza para incluir una etiqueta (tag) (`region:eastus`) en el cuadro de texto **from** (desde), que permite a Datadog ver el uso de CPU en toda la región este de los EE.UU. Aquí, la etiqueta (tag) `region` se utiliza como ejemplo, pero puedes utilizar cualquier etiqueta (tag) arbitraria que se envíe a tu plataforma Datadog, incluyendo `application`, `service` o `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Editor de gráficos de series temporales filtrado por 'region:us-east-1' tag" style="width:75%;">}}

Por último, se ha usado el segundo campo vacío (el campo de texto **avg by**) para mostrar una línea cronológica independiente por cada `host`. Por tanto, podemos ver la CPU del servidor de todos los hosts activos en el este de Estados Unidos.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Editor de gráficos de series temporales filtrado por 'region:us-east-1' and grouped by 'host'" style="width:75%;">}}

En caso de necesidad, añade más tags para acotar aún más el contexto; por ejemplo, hosts en `region:eastus` y `env:production`. Las tags pueden usarse en toda la plataforma de Datadog y aplicarse a todos los elementos principales (métricas, trazas y logs).

{{% /tab %}}
{{< /tabs >}}

## Infraestructura

Para filtrar el [mapa de hosts][4], la [lista de infraestructuras][5], los [contenedores][6] y los [procesos][7], introduce una tag en el campo de texto **Filter by**, situado en la parte superior de la página. Los hosts y los contenedores se pueden agrupar por clave de tag mediante el campo de texto **Group by**. Si introduces `service` en el campo de grupo, verás cada servicio como un encabezado de grupo.

{{< tabs >}}
{{% tab "Mapa de hosts" %}}

En esta sección, usa tags para filtrar o agrupar hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Tags de Mapa de hosts" style="width:80%;">}}

O contenedores:

{{< img src="tagging/using_tags/containermaptags.png" alt="Tags de Mapa de contenedores" style="width:80%;">}}
{{% /tab %}}

{{% tab "Lista de infraestructuras" %}}

Estos son los campos de texto para filtrar o agrupar de la página de Lista de infraestructuras:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags en Lista de infraestructuras" style="width:80%;">}}
{{% /tab %}}

{{% tab "Contenedores" %}}

Estos son los campos de texto para filtrar o agrupar de la página de Live Containers:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Tags de Live Containers" style="width:80%;">}}
{{% /tab %}}

{{% tab "Procesos" %}}

Estos son los campos de texto para filtrar o agrupar de la página de Live Processes:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Tags de Live Processes" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitores

Para filtrar monitores y [tiempos de inactividad de monitores][31] por [etiquetas (tags)][32] asignadas, utiliza las casillas de verificación de barra o faceta. El formato de la barra de búsqueda es `tag:<KEY>:<VALUE>`, por ejemplo: `tag:service:coffee-house`. Para excluir de tu búsqueda monitores con etiquetas (tags) específicas, utiliza `-`, for example: `tag:-service:coffee-house`.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filtra monitores en la barra de búsqueda con etiquetas (tags)" style="width:80%;">}}

**Nota**: Las etiquetas (tags) de monitores son diferentes y están separadas de las etiquetas (tags) de métricas. Para más información, consulta la documentación sobre [etiquetas (tags) de monitores][30].

Al crear un nuevo monitor, utiliza *etiquetas (tags) de métricas* en:
* el campo de texto **from** para limitar el contexto del monitor solo a las métricas que tengan esas tags.
* el campo de texto **excluding** para eliminar las métricas correspondientes del contexto del monitor.
* el campo de texto **avg by** para transformar el monitor en un monitor multialerta en cada valor de la tag.

## Métricas

Utiliza etiquetas (tags) en el [explorador de métricas][8] para filtrar métricas por etiquetas (tags) o para mostrar múltiples gráficos por clave de etiqueta (tag). En el siguiente ejemplo se representa un gráfico de métrica sobre `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="Gráfico de métrica centrado en una etiqueta (tag) individual" style="width:80%;">}}

## Integraciones

Algunas integraciones te ofrecen la opción de limitar las métricas usando tags.

{{< tabs >}}
{{% tab "AWS" %}}

El [cuadro de integración de AWS][1] tiene los filtros de tag `to hosts with tag` y `to Lambdas with tag`.

Estos campos aceptan una lista de tags separadas por comas (en formato `<KEY>:<VALUE>`) que defina un filtro, el cual se usará para recopilar tus recursos de EC2 o Lambda. Puedes usar `<KEY>:<VALUE>` tanto para incluir como para excluir funciones de monitorización según las tags. Para indicar qué tag debería excluirse, añade un `!` antes de la clave de tag. También puedes usar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres).

Los filtros pueden incluir recursos mediante una sentencia `OR` siempre que haya una tag de inclusión presente. El filtro del siguiente ejemplo recopila instancias EC2 que contienen la tag `datadog:monitored` o `env:production`:

```text
datadog:monitored,env:production
```

Si has definido la exclusión de una tag, esta preferencia tendrá prioridad y dará lugar a una sentencia `AND`. El filtro del siguiente ejemplo recopila instancias EC2 que contienen las tags `datadog:monitored` o `env:production`, o bien una tag `instance-type` con un valor `c1.*`, y que no contengan una tag `region:us-east-1`:

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Obtén más información sobre el etiquetado de AWS en la documentación acerca de [EC2][2] y [Lambda][3].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

El [cuadro de integración de Azure][1] tiene el filtro de tag `Optionally filter to VMs with tag`.

Este campo acepta una lista de tags separadas por comas (en formato `<KEY>:<VALUE>`) que defina un filtro, el cual se usará para recopilar métricas de las máquinas virtuales de Azure. También puedes usar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres). Solo se importarán a Datadog las máquinas virtuales que coincidan con una de las tags definidas, y se ignorarán las demás.

Asimismo, se podrán excluir las máquinas virtuales que coincidan con una tag determinada siempre que se añada `!` antes de la tag. Ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

El [cuadro de integración de Google Cloud][1] tiene el filtro de tag `to hosts with tag`.

Este campo acepta una lista de etiquetas (labels) de GCP separadas por comas (en formato `<KEY>:<VALUE>`) que defina un filtro, el cual se usará para recopilar métricas de las máquinas virtuales de GCP. También puedes usar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres). Solo se importarán a Datadog los hosts que coincidan con una de las labels definidas, y se ignorarán los demás.

Puedes excluir los hosts que coincidan con una label determinada siempre que añadas `!` antes de la tag. Ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Obtén más información sobre [cómo crear y gestionar etiquetas (labels)][2] en la documentación acerca de Google Cloud.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "Trace Explorer" %}}

En la herramienta [Trace Explorer][1], puedes filtrar las trazas (traces) con tags usando la barra de búsqueda o las casillas de faceta. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Si deseas realizar una búsqueda avanzada, consulta la sección [Sintaxis de las consultas][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Tags de Trace Explorer" style="width:80%;">}}

[1]: /es/tracing/trace_explorer/search/
[2]: /es/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Mapa de servicios" %}}

Tras [asignar las tags][1], usa el mapa de servicios para dirigirte a distintas partes de la aplicación haciendo clic en un servicio concreto. En el ejemplo de abajo, puedes consultar los [análisis][2], los [monitores][3], los [logs][4] y el [mapa de hosts][5] filtrados en función de la tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Tags de Mapa de servicios" style="width:80%;">}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/tracing/app_analytics/search/
[3]: /es/monitors/manage/
[4]: /es/logs/explorer/search/
[5]: /es/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

Cuando crees un gráfico del [notebook][9], usa tags en el campo de texto **from** para limitar las métricas. Úsalas también en el campo de texto **avg by** para agrupar las métricas. En el ejemplo de abajo, las métricas están limitadas por `service:coffee-house` y agrupadas por `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Tags de Notebook" style="width:80%;">}}

Si quieres excluir tags, edita el texto con `</>` y, a continuación, añade la tag en cuestión en formato `!<KEY>:<VALUE>`. En el ejemplo de abajo, se usa `!service:coffeehouse` para excluir `service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Tags para excluir de notebook" video="true" width="80%">}}

## Logs

En los apartados de [búsqueda (Search)][10], [análisis (Analytics)][11], [patrones (Patterns)][12] y [Live Tail][13] de los logs, filtra las trazas (traces) con tags usando la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Si deseas realizar una búsqueda avanzada, consulta la página de [Buscar logs][10].

{{< tabs >}}
{{% tab "Búsqueda" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Tags de Log Search" style="width:80%;">}}

{{% /tab %}}
{{% tab "Análisis" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Tags de Log Analytics" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patrones" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Tags de Log Patterns" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Tags de Live Tail" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Las tags también se pueden usar para filtrar un [pipeline][14] de registros. En el ejemplo de abajo, el pipeline filtra los registros en función de la tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Tags de Pipeline" style="width:80%;">}}

## RUM y Session Replay

El [navegador RUM][15] muestra los eventos de tu entorno que tienen lugar durante un determinado período de tiempo.

Para filtrar los datos de los eventos de RUM por tags, usa la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:shopist`. Si deseas realizar una búsqueda avanzada, consulta la sección [Buscar eventos de RUM][16].

{{< img src="tagging/using_tags/rumtags.png" alt="Tags de RUM" style="width:80%;">}}

## Synthetics

{{< tabs >}}
{{% tab "Tests Synthetic" %}}

Tus tests Synthetic pueden verse en la página de [Tests Synthetic][1].

Para filtrar los tests por tags, usa la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `tag:mini-website`. Si deseas realizar una búsqueda avanzada, consulta la sección [Buscar y gestionar tests de Synthetic][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Tags de Synthetics" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/synthetics/search/
{{% /tab %}}
{{% tab "Explorer" %}}

El [explorador de monitorización y prueba continua de Synthetic][1] muestra tus ejecuciones y lotes de ejecuciones de tests en un [pipeline CI][2].

Para filtrar los tests por etiquetas (tags), utiliza la barra de búsqueda o las casillas de verificación de faceta. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@ci.provider.name:github`. Para realizar búsquedas avanzadas, consulta [Buscar Lotes de pruebas de búsqueda][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Tags de Synthetics y CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/cicd_integrations
[3]: /es/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Objetivos de nivel de servicio (SLOs)

{{< tabs >}}
{{% tab "Gestionar SLOs" %}}

Para filtrar los SLOs según sus [tags asignadas][1], puedes usar la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `journey:add_item`. Si deseas excluir de tu búsqueda los SLOs que tengan una tag en concreto, usa `-`, for example: `-journey:add_item`.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Tags de SLO" style="width:80%;">}}

Las tags de SLO son diferentes e independientes de las tags de métrica y monitor que se emplean en las métricas o monitores subyacentes de un SLO.

[1]: /es/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLOs basados en métricas" %}}

Cuando crees un [SLO basado en métricas][1], usa las tags de métrica en las consultas de métrica sobre el porcentaje de éxito del SLO (todas las métricas deben usar el mismo conjunto de tags de métrica):

* en el campo de texto **from** para limitar el contexto de la métrica solo a esas tags.
* en el campo de texto **sum by** para crear un SLO basado en métricas y agrupado para mostrar un porcentaje de estado, así como el presupuesto restante para subsanar errores del SLO general y de cada valor de tag.

{{< img src="tagging/using_tags/metric_based_slo_tags.png" alt="Tags del SLO basado en métricas" style="width:80%;">}}

[1]: /es/service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLOs basados en monitores" %}}

Cuando crees un [SLO basado en monitores][1] con un solo [monitor agrupado][2], usa la opción **Calculate on selected groups** (Calcular según los grupos seleccionados) para seleccionar hasta 20 valores de tag de monitores subyacentes. De este modo, será posible mostrar un porcentaje de estado, así como el presupuesto restante para subsanar errores del SLO general y de cada valor de tag:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Tags del SLO basado en monitores" style="width:80%;">}}

[1]: /es/service_management/service_level_objectives/monitor/
[2]: /es/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## Monitorización de bases de datos

{{< tabs >}}
{{% tab "Test Runs" %}}

El [explorador de Visibilidad CI][101] muestra tus pruebas ejecutados en un pipeline CI.

Para filtrar las pruebas por etiquetas (tags), utiliza la barra de búsqueda o las casillas de verificación de faceta. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@test.status:failed`. Para realizar búsquedas avanzadas, consulta [Buscar y gestionar tests de CI][102].

{{< img src="/continuous_integration/test_runs.png" alt="Ejecuta tests en el explorador de visibilidad de CI" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /es/tests/search/

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

El [explorador de visibilidad CI][101] muestra las ejecuciones de tu pipeline CI.

Para filtrar las ejecuciones de pipeline por etiquetas (tags), utiliza la barra de búsqueda o las casillas de verificación de faceta. El formato de la barra de búsqueda es `<KEY>:<VALUE>`. Por ejemplo: `@ci.provider.name:gitlab`. Para realizar búsquedas avanzadas, consulta [Busca y gestiona pipelines CI][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Ejecuciones de pipelines en el explorador de visibilidad CI" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /es/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## Guías

Las tags pueden usarse de diferentes formas con la [API][17].

Consulta esta lista para encontrar los enlaces a cada una de las siguientes secciones:

* [Programar la caída del sistema de un monitor][18]
* [Realizar consultas en el navegador de eventos][19]
* [Buscar hosts][20]
* Integraciones de [AWS][21] y [Google Cloud][22]
* [Realizar consultas en los puntos de las cronologías][23]
* [Obtener todos los detalles de un monitor][24]
* [Silenciar un monitor][25]
* [Búsqueda de monitores][24]
* [Búsqueda de un grupo de monitores][24]
* [Crear un screenboard][26]
* [Crear un timeboard][26]
* [Crear un SLO][27]
* [Obtener los detalles de un SLO][28]
* [Actualizar un SLO][29]

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/service_management/events/explorer
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