---
aliases:
- /es/tagging/using_tags/
description: Descubre cómo utilizar etiquetas (tags) en los productos de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: Blog
  text: Prácticas recomendadas para el etiquetado de tu infraestructura y tus aplicaciones
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/assigning_tags/
  tag: Documentación
  text: Aprender a asignar etiquetas
title: Uso de etiquetas (tags)
---

## Información general

Una vez que hayas [asignado las etiquetas][1], podrás empezar a utilizarlas para filtrar y agrupar los datos en tu plataforma de Datadog. Las etiquetas sirven para incluir o excluir datos.

Cuándo incluir o excluir varias etiquetas:

* Para incluirlas, se emplea la lógica `AND`
* Para excluirlas, se emplea la lógica `OR`

## Eventos

El [explorador de eventos][2] muestra los eventos de tu entorno que tienen lugar durante un determinado periodo de tiempo. Utiliza etiquetas para filtrar la lista de eventos y centrarte en un subconjunto de eventos. Introduce `tags:` seguido de una etiqueta para ver todos los eventos procedentes de un host, una [integración][3] o un servicio que tengan esa misma etiqueta. Por ejemplo, puedes utilizar `tags:service:coffee-house` para buscar la etiqueta `service:coffee-house`.

Para buscar varias etiquetas de forma inclusiva, haz uso de los paréntesis y separa las etiquetas entre sí con OR: `tags:(service:coffee-house OR host:coffeehouseprod)`. Para buscar varias etiquetas de forma exclusiva, sepáralas entre sí con AND: `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards

{{< tabs >}}
{{% tab "Asignación" %}}

Utiliza etiquetas para filtrar métricas y mostrarlas en un [dashboard gráfico][1] o para crear grupos añadidos de métricas para mostrar. Para filtrar las métricas que se van a mostrar, introduce la etiqueta en el cuadro de texto **from** (desde). Esta métrica se muestra en todas las fuentes que tienen asignada esa etiqueta particular (`service:web-store`, en el ejemplo de abajo).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Filtra métricas en dashboards añadiendo una etiqueta en el campo 'from'. En este ejemplo, la métrica se filtra por 'service:web-store'" style="width:80%;">}}

También se pueden filtrar valores de etiquetas de forma avanzada con filtros booleanos. Se admite la siguiente sintaxis booleana:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Utiliza `AND` y `ORs` para consultar una métrica en varias etiquetas concretas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Filtro booleano con AND/OR" style="width:80%;">}}

Utiliza `IN` y `NOT IN` para filtrar rápidamente una métrica en función de varias etiquetas concretas:

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Filtro booleano con IN/NOT IN" style="width:80%;">}}

Para crear un grupo conjunto utilizando etiquetas, introduce la parte clave de la etiqueta en el cuadro de texto **avg by**. Por ejemplo, si tienes un gráfico de series temporales que muestra una métrica etiquetada con la clave `service`, como `service:web-store`, introduce `service` en el cuadro de texto **avg by** para mostrar una línea por cada valor de etiqueta `service`. Cada línea representa el valor promedio de métrica en todas las fuentes que comparten ese valor de etiqueta `service`.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Etiquetas en cuadros de texto avg by de dashboards" style="width:80%;">}}

Las etiquetas también pueden utilizarse para superponer eventos en el dashboard. Esto funciona de la misma manera que en el [explorador de eventos][2].
Las coincidencias de eventos se superponen como barras verticales en el gráfico. En el ejemplo siguiente se utiliza `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Utiliza etiquetas para añadir superposiciones de eventos en dashboards" style="width:80%;">}}

Utiliza las [variables de plantilla][3] para ahorrar tiempo al cambiar la etiqueta **from** (desde) en los gráficos de tu dashboard. En el ejemplo de abajo, se utiliza `service` para representar la clave de la etiqueta `service`. Para utilizar la variable de plantilla, añade la variable `$service` en el campo de texto **from** de tu consulta del gráfico.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Variables de plantillas de dashboards" style="width:80%;">}}

[1]: /es/dashboards/
[2]: /es/events/
[3]: /es/dashboards/template_variables/
{{% /tab %}}
{{% tab "Ejemplos" %}}

Este es un ejemplo de etiquetas que utilizan el editor de gráficos de series temporales. En la primera captura de pantalla no se han aplicado etiquetas y se muestra el uso promedio de CPU en todos los hosts:

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Editor de gráficos de series temporales sin etiquetas añadidas" style="width:75%;">}}

Luego, el editor se actualiza para incluir una etiqueta (`region:eastus`) en el cuadro de texto **from** (desde), que permite a Datadog ver el uso de CPU en toda la región este de los EE. UU. Aquí, la etiqueta `region` se utiliza como ejemplo, pero puedes usar cualquier etiqueta arbitraria que se envíe a tu plataforma Datadog, incluyendo `application`, `service` o `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Editor de gráficos de series temporales filtrado por la etiqueta region:us-east-1 " style="width:75%;">}}

Por último, se utiliza el segundo campo vacío (el campo de texto **avg by**) para mostrar una línea cronológica independiente por cada `host`. Por tanto, podemos ver la CPU del servidor de todos los hosts activos en el este de EE. UU.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Editor de gráficos de series temporales filtrado por 'region:us-east-1' y agrupado por 'host'" style="width:75%;">}}

Si es necesario, añade más etiquetas para acotar aún más el contexto; por ejemplo, hosts en `region:eastus` y `env:production`. Las etiquetas pueden utilizarse en toda la plataforma de Datadog y aplicarse a todos los elementos principales (métricas, trazas y logs).

{{% /tab %}}
{{< /tabs >}}

## Infraestructura

Para filtrar el [mapa de hosts][4], la [lista de infraestructuras][5], los [contenedores][6] y los [procesos][7], introduce una etiqueta en el campo de texto **Filter by** (Filtrar por), situado en la parte superior de la página. Los hosts y los contenedores se pueden agrupar por clave de etiqueta mediante el campo de texto **Group by** (Agrupar por). Si introduces `service` en el campo de grupo, verás cada servicio como un encabezado de grupo.

{{< tabs >}}
{{% tab "Mapa de host" %}}

En esta sección, utiliza etiquetas para filtrar o agrupar hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Etiquetas de mapa de hosts" style="width:80%;">}}

O contenedores:

{{< img src="tagging/using_tags/containermaptags.png" alt="Etiquetas de mapa de contenedores" style="width:80%;">}}
{{% /tab %}}

{{% tab "Lista de infraestructuras" %}}

Estos son los campos de texto para filtrar o agrupar de la página de la lista de infraestructuras:

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Etiquetas de la lista de infraestructuras" style="width:80%;">}}
{{% /tab %}}

{{% tab "Contenedores" %}}

Estos son los campos de texto para filtrar o agrupar de la página de Live Containers:

{{< img src="tagging/using_tags/livecontainertags.png" alt="Etiquetas de Live Containers" style="width:80%;">}}
{{% /tab %}}

{{% tab "Procesos" %}}

Estos son los campos de texto para filtrar o agrupar de la página de Live Processes:

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Etiquetas de Live Processes" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitores

Para filtrar monitores y [tiempos de inactividad de monitores][31] por [etiquetas][32] asignadas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `tag:<KEY>:<VALUE>`; por ejemplo: `tag:service:coffee-house`. Para excluir de tu búsqueda monitores con etiquetas específicas, utiliza `-`, for example: `tag:-service:coffee-house`.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filtra monitores en la barra de búsqueda con etiquetas" style="width:80%;">}}

**Nota**: Las etiquetas de monitores son diferentes y están separadas de las etiquetas de métricas. Para más información, consulta la documentación sobre [etiquetas de monitores][30].

Al crear un nuevo monitor, utiliza *etiquetas de métricas* en:
* el campo de texto **from** (desde), para limitar el contexto del monitor solo a las métricas que tengan esas etiquetas.
* el campo de texto **excluding** (excluido), para eliminar las métricas correspondientes del contexto del monitor.
* el campo de texto **avg by**, para transformar el monitor en un monitor multi-alerta en cada valor de la etiqueta.

## Métricas

Utiliza etiquetas en el [explorador de métricas][8] para filtrar métricas por etiquetas o para mostrar múltiples gráficos por clave de etiqueta. En el siguiente ejemplo se representa un gráfico de métrica sobre `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="Gráfico de métricas centrado en una etiqueta individual" style="width:80%;">}}

## Integraciones

Algunas integraciones te ofrecen la opción de limitar las métricas utilizando etiquetas.

{{< tabs >}}
{{% tab "AWS" %}}

El [cuadro de integración de AWS][1] tiene los filtros de etiquetas `to hosts with tag` y `to Lambdas with tag`.

Estos campos aceptan una lista de etiquetas separadas por comas (en formato `<KEY>:<VALUE>`), que defina un filtro, el cual se utiliza para recopilar tus recursos de EC2 o Lambda. Puedes utilizar `<KEY>:<VALUE>`, tanto para incluir como para excluir funciones de monitorización basadas en etiquetas. Para indicar qué etiqueta debe excluirse, añade un signo `!` antes de la clave de etiqueta. También puedes utilizar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres).

Los filtros pueden incluir recursos mediante una sentencia `OR` siempre que haya una etiqueta de inclusión presente. El filtro del siguiente ejemplo recopila instancias de EC2 que contienen la etiqueta `datadog:monitored` o `env:production`:

```text
datadog:monitored,env:production
```

Si has definido la exclusión de una etiqueta, esta preferencia tendrá prioridad y dará lugar a una sentencia `AND`. El filtro del siguiente ejemplo recopila instancias de EC2 que contienen las etiquetas `datadog:monitored` o `env:production`, o bien una etiqueta `instance-type` con un valor `c1.*`, y no una etiqueta `region:us-east-1`:

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Obtén más información sobre el etiquetado de AWS en la documentación acerca de [EC2][2] y [Lambda][3].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

El [cuadro de integración de Azure][1] tiene el filtro de etiqueta `Optionally filter to VMs with tag`.

Este campo acepta una lista de etiquetas separadas por comas (en formato `<KEY>:<VALUE>`), que defina un filtro, el cual se utiliza para recopilar métricas de las máquinas virtuales de Azure. También puedes utilizar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres). Solo se importarán a Datadog las máquinas virtuales que coincidan con una de las etiquetas definidas y se ignorarán las demás.

También se podrán excluir las máquinas virtuales que coincidan con una etiqueta determinada, siempre que se añada `!` antes de la etiqueta. Por ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

El [cuadro de integración de Google Cloud][1] tiene el filtro de etiqueta `to hosts with tag`.

Este campo acepta una lista de etiquetas (labels) de GCP separadas por comas (en formato `<KEY>:<VALUE>`) que defina un filtro, el cual se utiliza para recopilar métricas de las máquinas virtuales de GCP. También puedes utilizar comodines, como `?` (para caracteres únicos) y `*` (para varios caracteres). Solo se importarán a Datadog los hosts que coincidan con una de las etiquetas definidas y se ignorarán los demás.

Puedes excluir los hosts que coincidan con una etiqueta (label) determinada, siempre que añadas `!` antes de la etiqueta (tag). Ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Obtén más información sobre [cómo crear y gestionar etiquetas (labels)][2] en la documentación de Google Cloud.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "Trace Explorer" %}}

En [Trace Explorer][1], puedes filtrar las trazas con etiquetas utilizando la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Para realizar una búsqueda avanzada, consulta la sección [Sintaxis de las consultas][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Etiquetas del Trace Explorer" style="width:80%;">}}

[1]: /es/tracing/trace_explorer/search/
[2]: /es/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Mapa de servicios" %}}

Tras [asignar las etiquetas][1], utiliza el mapa de servicios para navegar a distintas partes de la aplicación haciendo clic en un servicio concreto. En el ejemplo de abajo, puedes consultar los [análisis][2], los [monitores][3], los [logs][4] y el [mapa de host][5] filtrados en función de la etiqueta `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Etiquetas de mapa de servicios" style="width:80%;">}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/tracing/app_analytics/search/
[3]: /es/monitors/manage/
[4]: /es/logs/explorer/search/
[5]: /es/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

Al crear un gráfico del [notebook][9], utiliza etiquetas en el campo de texto **from** (from) para limitar las métricas. Utilízalas también en el campo de texto **avg by** para agrupar las métricas. En el ejemplo de abajo, las métricas están limitadas por `service:coffee-house` y agrupadas por `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Etiquetas de notebooks" style="width:80%;">}}

Si quieres excluir etiquetas, edita el texto con `</>` y, a continuación, añade la etiqueta en cuestión en formato `!<KEY>:<VALUE>`. En el ejemplo de abajo, se utiliza `!service:coffeehouse` para excluir `service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Etiquetas para excluir de notebooks" video="true" width="80%">}}

## Logs

Para la [búsqueda (Search)][10], el [análisis (Analytics)][11], los [patrones (Patterns)][12] y [Live Tail][13] de los logs, filtra las trazas con etiquetas utilizando la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Para realizar una búsqueda avanzada, consulta la página [Buscar logs][10].

{{< tabs >}}
{{% tab "Búsqueda" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Etiquetas de búsqueda de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Análisis" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Etiquetas de análisis de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patrones" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Etiquetas de patrones de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Etiquetas de Live Tail" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Las etiquetas también se pueden utilizar para filtrar un [pipeline][14] de logs. En el ejemplo de abajo, el pipeline filtra los logs en función de la etiqueta `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Etiquetas de pipeline" style="width:80%;">}}

## RUM y Session Replay

El [navegador RUM][15] muestra los eventos de tu entorno que tienen lugar durante un determinado periodo de tiempo.

Para filtrar los datos de los eventos de RUM por etiquetas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:shopist`. Para realizar una búsqueda avanzada, consulta la sección [Buscar eventos de RUM][16].

{{< img src="tagging/using_tags/rumtags.png" alt="Etiquetas de RUM" style="width:80%;">}}

## Synthetics

{{< tabs >}}
{{% tab "Pruebas de Synthetic" %}}

Puedes ver tus pruebas de Synthetic en la página [Pruebas de Synthetic][1].

Para filtrar las pruebas por etiquetas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `tag:mini-website`. Para realizar una búsqueda avanzada, consulta la sección [Buscar y gestionar pruebas de Synthetic][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Etiquetas de Synthetics" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/synthetics/search/
{{% /tab %}}
{{% tab "Explorador" %}}

El [explorador de monitorización y prueba continua de Synthetic][1] muestra tus ejecuciones y lotes de ejecuciones de pruebas en un [pipeline CI][2].

Para filtrar las pruebas por etiquetas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo: `@ci.provider.name:github`. Para realizar una búsqueda avanzada, consulta [Buscar lotes de pruebas][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Etiquetas de Synthetics y CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/cicd_integrations
[3]: /es/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Objetivos de nivel de servicio (SLOs)

{{< tabs >}}
{{% tab "Gestionar SLOs" %}}

Para filtrar los SLOs según sus [etiquetasasignadas][1], puedes utilizar la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `journey:add_item`. Para excluir de tu búsqueda los SLOs que tengan una etiqueta específica, utiliza `-`, for example: `-journey:add_item`.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Etiquetas de SLOs" style="width:80%;">}}

Las etiquetas de SLOs son diferentes e independientes de las etiquetas de métricas y monitores que se emplean en las métricas o monitores subyacentes de un SLO.

[1]: /es/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLOs basados en métricas" %}}

Al crear un [SLO basado en métricas][1], utiliza las etiquetas de métricas en las consultas de métricas sobre el porcentaje de éxito del SLO (todas las métricas deben utilizar el mismo conjunto de etiquetas de métricas):

* el campo de texto **from** (desde), para limitar el contexto de la métrica solo a esas etiquetas.
* el campo de texto **sum by** (sumar por), para crear un SLO basado en métricas y agrupado para mostrar un porcentaje de estado, así como el presupuesto restante para subsanar errores del SLO general y de cada valor de etiqueta.

[1]: /es/service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLOs basados en monitores" %}}

Al crear un [SLO basado en monitores][1] con un solo [monitor agrupado][2], utiliza la opción **Calculate on selected groups** (Calcular según los grupos seleccionados) para seleccionar hasta 20 valores de etiquetas de monitores subyacentes y mostrar un porcentaje de estado, así como el presupuesto restante para subsanar errores del SLO general y de cada valor de etiqueta:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Etiquetas de SLO basadas en monitores" style="width:80%;">}}

[1]: /es/service_management/service_level_objectives/monitor/
[2]: /es/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility

{{< tabs >}}
{{% tab "Ejecuciones de pruebas" %}}

El [explorador de visibilidad CI][101] muestra tus pruebas ejecutadas en un pipeline CI.

Para filtrar las pruebas por etiquetas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo: `@test.status:failed`. Para realizar una búsqueda avanzada, consulta [Buscar y gestionar pruebas de CI][102].

{{< img src="/continuous_integration/test_runs.png" alt="Ejecuta pruebas en el explorador de visibilidad CI" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /es/tests/search/

{{% /tab %}}
{{% tab "Ejecuciones de pipelines" %}}

El [explorador de visibilidad CI][101] muestra las ejecuciones de tu pipeline CI.

Para filtrar las ejecuciones de pipeline por etiquetas, utiliza la barra de búsqueda o las casillas de verificación de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo: `@ci.provider.name:gitlab`. Para realizar una búsqueda avanzada, consulta [Buscar y gestionar pipelines CI][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Ejecuciones de pipelines en el explorador de visibilidad CI" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /es/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## Desarrolladores

Las etiquetas pueden utilizarse de diferentes formas con la [API][17].

Consulta esta lista para encontrar los enlaces a cada una de las siguientes secciones:

* [Programar el tiempo de inactividad de un monitor][18]
* [Realizar consultas en el navegador de eventos][19]
* [Buscar hosts][20]
* Integraciones para [AWS][21] y [Google Cloud][22]
* [Realizar consultas en puntos de las series temporales][23]
* [Obtener todos los detalles de un monitor][24]
* [Silenciar un monitor][25]
* [Búsqueda de monitores][24]
* [Búsqueda de grupos de monitores][24]
* [Crear un screenboard][26]
* [Crear un timeboard][26]
* [Crear un SLO][27]
* [Obtener los detalles de un SLO][28]
* [Actualizar un SLO][29]

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

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