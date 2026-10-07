---
aliases:
- /es/dashboards/ddsql_editor/
- /es/ddsql_editor/getting_started/
description: Consulte recursos de infraestructura y datos de telemetría mediante lenguaje
  natural o sintaxis DDSQL con soporte para etiquetas como columnas de tabla.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Datadog MCP Server
- link: ddsql_reference/ddsql_default
  tag: Documentación
  text: Referencia de DDSQL
- link: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
  tag: Centro de aprendizaje
  text: Introducción al editor de DDSQL
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: Blog
  text: Explore las métricas de Datadog con consultas en lenguaje natural
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explore sus datos con Sheets, el editor DDSQL y Notebooks para análisis avanzados
    en Datadog
title: DDSQL Editor
---
{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Fuentes de datos avanzadas">}}
Si desea consultar fuentes de datos que aún no están disponibles, utilice el siguiente formulario para enviar su solicitud. Para obtener una lista completa de las fuentes de datos admitidas, consulte el <a href="/ddsql_reference/data_directory/">Directorio de datos</a>.
{{< /callout >}}

## Descripción general {#overview}

Con el [DDSQL Editor][1], puede obtener una visibilidad más profunda de su telemetría consultando sus recursos con lenguaje natural o con [DDSQL](#use-sql-syntax-ddsql), un dialecto de SQL con soporte adicional para consultar etiquetas.

También puede exportar los resultados de una consulta DDSQL para visualizarlos en un Dashboard o Notebook, o para automatizarlos en un flujo de trabajo de Datadog a través de [DDSQL Action](#save-and-share-queries).

Puede ejecutar consultas DDSQL desde agentes de IA utilizando el [Datadog MCP Server][9] `ddsql` conjunto de herramientas (versión preliminar).

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="El resultado de una consulta SQL que muestra el uso promedio de CPU por servidor en la página de DDSQL en Datadog" style="width:100%;" >}}

## Consultar en lenguaje natural {#query-in-natural-language}

Escriba su pregunta en el cuadro de búsqueda y Datadog creará la consulta SQL por usted. Puede aceptar o descartar cambios, y puede proporcionar comentarios para ayudar a mejorar la función.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="Una consulta ingresada en el cuadro de búsqueda de lenguaje natural" style="width:90%;" >}}

## Usar sintaxis SQL (DDSQL) {#use-sql-syntax-ddsql}

[DDSQL][6] es un lenguaje de consulta para datos de Datadog. Implementa varias operaciones SQL estándar, como `SELECT`, y permite realizar consultas en datos no estructurados, como [tags][2]. Obtenga exactamente los datos que desea escribiendo su propia sentencia `SELECT`. Consulte tags como si fueran columnas de tabla estándar. Para obtener más información, consulte la [Referencia de DDSQL][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## Explore su telemetría {#explore-your-telemetry}

Visualice, filtre y cree consultas en el Explorador de datos.

Haga clic en el nombre de una tabla para visualizar sus columnas y relaciones:

{{< img src="ddsql_editor/data-tab.png" alt="La pestaña de datos que muestra la información de la tabla para aws.ec2_instance" style="width:70%;" >}}

Para fuentes de datos como Logs, utilice el query builder para generar funciones de tabla.

## Guarde y comparta consultas {#save-and-share-queries}

Guarde consultas útiles para referencia futura o descargue los datos como CSV. Navegue y vuelva a ejecutar consultas recientes o guardadas en el panel lateral.

{{< img src="/ddsql_editor/save-and-actions.png" alt="Interfaz de DDSQL Editor que muestra los resultados de la consulta con el botón de guardar y el menú desplegable de acciones resaltados" style="width:90%;" >}}

Exporte los resultados de una consulta guardada a:
- Un Dashboard o Notebook para visualización y generación de informes
- Automatice usando una [DDSQL Action](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery) en un flujo de trabajo de Datadog, con la cual puede:
  - [Crear una métrica personalizada a partir de una consulta de DDSQL](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [Exportar programáticamente los resultados de una consulta de DDSQL](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [Programar un mensaje de Slack para verificar el cumplimiento de los recursos](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- [Alertar sobre una consulta de DDSQL][8] (solo Logs, métricas, RUM, Spans y Product Analytics)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="Panel lateral que muestra la pestaña Consultas con la lista de consultas guardadas y recientes en DDSQL Editor" style="width:70%;" >}}

## Permisos {#permissions}

Para acceder a la aplicación DDSQL Editor, los usuarios necesitan el permiso `ddsql_editor_read`. Este permiso se incluye de forma predeterminada en el rol Datadog Read Only. Si su organización utiliza roles personalizados, agregue este permiso al rol correspondiente. Para obtener más información sobre la administración de permisos, consulte la [documentación de RBAC][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /es/ddsql_reference/ddsql_default/#tags
[3]: /es/account_management/rbac/
[4]: /es/bits_ai
[5]: /es/help/
[6]: /es/ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/es/ddsql_editor/#save-and-share-queries
[8]: /es/monitors/types/analysis/
[9]: /es/mcp_server/