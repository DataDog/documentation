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

Usa las tags para filtrar las métricas que desees reflejar en un [gráfico del dashboard][1] o para crear grupos agregados de métricas que quieras mostrar. Para filtrar las métricas que quieres mostrar, introduce la tag en el campo de texto **from**. Acto seguido, la métrica que hayas elegido se mostrará en todas las fuentes que tengan esa tag asignada (`service:coffee-house` en el ejemplo de abajo).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags en el campo de texto from de los dashboards" style="width:80%;">}}

También se pueden filtrar valores de las tags de forma avanzada con los filtros boleanos. Así pues, se admite la siguiente sintaxis boleana:

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Usa `AND` y `ORs` para consultar una métrica en varias tags concretas:

{{< img src="tagging/using_tags/dashboard_boolean_1.png" alt="Filtro boleano con AND/OR" style="width:80%;">}}

Usa `IN` y `NOT IN` para filtrar rápidamente una métrica en función de varias tags concretas:

{{< img src="tagging/using_tags/dashboards_boolean_2.png" alt="Filtro boleano con IN/NOT IN" style="width:80%;">}}

Para crear un grupo agregado mediante tags, introduce el segmento clave de la tag en el campo de texto **avg by**. Por ejemplo, si tienes un gráfico cronológico en el que se refleje una métrica etiquetada con la clave `service`, como `service:coffee-house`, introduce `service` en el campo **avg by** para que se muestre una línea por cada valor de la tag `service`. Cada una de estas líneas representa el valor medio de la métrica en todas las fuentes que comparten el valor de la tag `service`.

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags en el campo de texto avg by de los dashboards" style="width:80%;">}}

Las tags también se pueden usar para superponer eventos en el dashboard. El procedimiento es el mismo que en el [Events Explorer][2] (Navegador de eventos).
Escribe `tags:` seguido de la tag. Los eventos que coincidan entre sí aparecerán en el gráfico como barras verticales superpuestas. En el ejemplo de abajo, se utiliza `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Superposiciones de eventos en los dashboards" style="width:80%;">}}

Utiliza las [variables de plantilla][3] para ahorrar tiempo al cambiar la tag **from** en los gráficos de tu dashboard. En el ejemplo de abajo, se usa `service` para representar la clave de la tag `service`. Para usar la variable de plantilla, añade la variable `$service` en el campo de texto **from** de la consulta del gráfico.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Variables de plantilla del dashboard" style="width:80%;">}}

[1]: /es/dashboards/
[2]: /es/events/
[3]: /es/dashboards/template_variables/
{{% /tab %}}
{{% tab "Ejemplos" %}}

Aquí tienes un ejemplo de tags que usan el editor de gráficos cronológicos. En la primera captura de pantalla, no se ha aplicado ninguna tag, por lo que se puede ver el uso medio de la CPU en todos los hosts:

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" style="width:75%;">}}

En la siguiente, el editor ha aplicado una tag (`region:eastus`) en el campo de texto **from** que permite a Datadog consultar el uso que se hace de la CPU en el este de Estados Unidos. En este caso, se emplea la tag `region` como ejemplo, pero tú podrías usar cualquier tag que se haya enviado a tu plataforma de Datadog, como `application`, `service`, `environment`, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" style="width:75%;">}}

Por último, se ha usado el segundo campo vacío (el campo de texto **avg by**) para mostrar una línea cronológica independiente por cada `host`. Por tanto, podemos ver la CPU del servidor de todos los hosts activos en el este de Estados Unidos.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" style="width:75%;">}}

En caso de necesidad, añade más tags para acotar aún más el contexto; por ejemplo, hosts en `region:eastus` y `env:production`. Las tags pueden usarse en toda la plataforma de Datadog y aplicarse a todos los elementos principales (métricas, trazas y logs).

{{% /tab %}}
{{< /tabs >}}

## Infraestructura

Para filtrar el [mapa de hosts][4], la [lista de infraestructuras][5], los [contenedores][6] y los [procesos][7], introduce una tag en el campo de texto **Filter by**, situado en la parte superior de la página. Los hosts y los contenedores se pueden agrupar por clave de tag mediante el campo de texto **Group by**. Si introduces `service` en el campo de grupo, verás cada servicio como un encabezado de grupo.

{{< tabs >}}
{{% tab "Mapa de hosts" %}}

En esta sección, usa tags para filtrar o agrupar hosts:

{{< img src="tagging/using_tags/hostmaptags.png" alt="Tags del mapa de hosts" style="width:80%;">}}

O contenedores:

{{< img src="tagging/using_tags/containermaptags.png" alt="Tags del mapa de contenedores" style="width:80%;">}}
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

{{< tabs >}}
{{% tab "Gestionar monitores" %}}

Para filtrar los monitores según sus [tags asignadas][1], puedes usar la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `tag:<KEY>:<VALUE>`; por ejemplo, `tag:service:coffee-house`. Si deseas excluir de tu búsqueda los monitores que tengan una tag en concreto, usa  `-`, for example: `tag:-service:coffee-house`.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Gestionar tags de monitores" style="width:80%;">}}

Las tags de monitor son diferentes e independientes de las tags de métrica.

[1]: /es/getting_started/tagging/assigning_tags/
{{% /tab %}}

{{% tab "Nuevo monitor" %}}

Cuando crees un [monitor][1], utiliza tags de métrica en:

* el campo de texto **from** para limitar el contexto del monitor solo a las métricas que tengan esas tags.

* el campo de texto **excluding** para eliminar las métricas correspondientes del contexto del monitor.

* el campo de texto **avg by** para transformar el monitor en un monitor multialerta en cada valor de la tag.

[1]: /es/monitors/types
{{% /tab %}}
{{% tab "Gestionar la caída del sistema" %}}

Para filtrar las [caídas del sistema][1] por tag de monitor, escribe el nombre de la tag en la barra de búsqueda. Ejemplo: `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Gestionar tags de monitores" style="width:80%;">}}

[1]: /es/monitors/notify/downtimes/
{{% /tab %}}
{{< /tabs >}}

## Métricas

En [Metrics Explorer][8] (Navegador de métricas), usa tags para filtrar las métricas de tags concretas o para mostrar varios gráficos por clave de tag. El ejemplo de abajo representa de forma gráfica una métrica de `service:coffee-house` y muestra un gráfico para cada `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Gestionar tags de monitores" style="width:80%;">}}

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

En la herramienta [Trace Explorer][1], puedes filtrar las trazas (traces) con tags usando la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Si deseas realizar una búsqueda avanzada, consulta la sección [Sintaxis de las consultas][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Tags de Trace Explorer" style="width:80%;">}}

[1]: /es/tracing/trace_explorer/search/
[2]: /es/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Mapa de servicios" %}}

Tras [asignar las tags][1], usa el mapa de servicios para dirigirte a distintas partes de la aplicación haciendo clic en un servicio concreto. En el ejemplo de abajo, puedes consultar los [análisis][2], los [monitores][3], los [logs][4] y el [mapa de hosts][5] filtrados en función de la tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Tags del mapa de servicios" style="width:80%;">}}

[1]: /es/getting_started/tagging/assigning_tags/
[2]: /es/tracing/app_analytics/search/
[3]: /es/monitors/manage/
[4]: /es/logs/explorer/search/
[5]: /es/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

Cuando crees un gráfico del [notebook][9], usa tags en el campo de texto **from** para limitar las métricas. Úsalas también en el campo de texto **avg by** para agrupar las métricas. En el ejemplo de abajo, las métricas están limitadas por `service:coffee-house` y agrupadas por `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Tags de notebook" style="width:80%;">}}

Si quieres excluir tags, edita el texto con `</>` y, a continuación, añade la tag en cuestión en formato `!<KEY>:<VALUE>`. En el ejemplo de abajo, se usa `!service:coffeehouse` para excluir `service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Tags para excluir de notebook" video="true" width="80%">}}

## Logs

En los apartados de [Search (Búsqueda)][10], [Analytics (Análisis)][11], [Patterns (Patrones)][12] y [Live Tail][13] de los logs, filtra las trazas (traces) con tags usando la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `service:coffee-house`. Si deseas realizar una búsqueda avanzada, consulta la página de [Buscar logs][10].

{{< tabs >}}
{{% tab "Búsqueda" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Tags de búsqueda de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Análisis" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Tags de Log Analytics" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patrones" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Tags de patrones de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Tags de Live Tail" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Las tags también se pueden usar para filtrar un [pipeline][14] de registros. En el ejemplo de abajo, el pipeline filtra los registros en función de la tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Tags de pipelines" style="width:80%;">}}

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
{{% tab "Navegador de resultados de CI" %}}

El [CI Results Explorer][1] (Navegador de resultados de CI) muestra los resultados de los tests de navegador que se ejecutan en un [pipeline de integración continua (CI)][2].

Para filtrar las ejecuciones de tests por tags, usa la barra de búsqueda o las casillas de facetas. El formato de la barra de búsqueda es `<KEY>:<VALUE>`; por ejemplo, `@ci.provider.name:github`. Si deseas realizar una búsqueda avanzada, consulta la sección [Buscar y gestionar tests Synthetic][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Tags de Synthetics y CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/
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

[1]: /es/monitors/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLOs basados en monitores" %}}

Cuando crees un [SLO basado en monitores][1] con un solo [monitor agrupado][2], usa la opción **Calculate on selected groups** (Calcular según los grupos seleccionados) para seleccionar hasta 20 valores de tag de monitores subyacentes. De este modo, será posible mostrar un porcentaje de estado, así como el presupuesto restante para subsanar errores del SLO general y de cada valor de tag:

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Tags del SLO basado en monitores" style="width:80%;">}}

[1]: /es/monitors/service_level_objectives/monitor/
[2]: /es/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## Desarrolladores

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