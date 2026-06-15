---
aliases:
- /es/dashboards/ddsql_editor/
description: Consulta de recursos de infraestructura y datos telemétricos mediante
  lenguaje natural o sintaxis de DDSQL compatible con etiquetas como columnas de tabla.
further_reading:
- link: ddsql_reference/ddsql_default
  tag: Documentación
  text: Referencia de DDSQL
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explora tus datos con Sheets, DDSQL Editor y Notebooks para análisis avanzados
    en Datadog
title: Editor DDSQL
---

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Advanced Data Sources">}}
La consulta de logs, métricas, spans  (tramos), RUM y Product Analytics como sources (fuentes) de datos en DDSQL está en vista previa. Utiliza este formulario para solicitar acceso.

Si deseas acceder a spans (tramos), RUM u otras sources (fuentes) de datos no enumeradas en la sección de casos de uso, menciónalas en el formulario de solicitud de acceso.
{{< /callout >}}

## Información general

Con el [Editor DDSQL][1], puedes lograr una visibilidad más profunda de tu infraestructura consultando tus recursos con lenguaje natural o con [DDSQL](#use-sql-syntax-ddsql), un dialecto de SQL con soporte adicional para consultar etiquetas (tags).

{{< img src="/ddsql_editor/query-results-cloud-provider-host-count.png" alt="El resultado de una consulta SQL que muestra el recuento de host del proveedor en la nube en la página de DDSQL en Datadog" style="width:100%;" >}}

## Consulta en lenguaje natural

Escribe tu pregunta en el cuadro de búsqueda y Datadog creará la consulta de SQL por ti. Puedes aceptar o descartar los cambios y aportar tus comentarios para mejorar la función.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="Una consulta ingresada en el cuadro de búsqueda en lenguaje natural" style="width:90%;" >}}

## Utilizar la sintaxis SQL (DDSQL)

DDSQL es un lenguaje de consulta para datos de Datadog. Implementa varias operaciones SQL estándar, como `SELECT`, y permite realizar consultas sobre datos no estructurados, como [etiquetas][2]. Obtén exactamente los datos que deseas escribiendo tu propia sentencia `SELECT`. Consulta las etiquetas como si fueran columnas de una tabla estándar. Para más información, consulta la [Referencia de DDSQL][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## Explorar tu telemetría

<div class="alert alert-danger">La consulta de logs, métricas, spans (tramos) and RUM mediante DDSQL está en vista previa. Utiliza este <a href="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/">formulario</a> para solicitar acceso.

Si deseas acceder a spans (tramos), RUM u otras sources (fuentes) de datos no enumeradas en la sección de casos de uso, menciónalas en el formulario de solicitud de acceso.
</div>

Visualiza, filtra y crea consultas en el Explorador de datos.

{{< img src="/ddsql_editor/data-tab-available-tables.png" alt="Panel lateral que muestra una lista de tablas disponibles para consultar en el DDSQL Editor" style="width:90%;" >}}

Haz clic en el nombre de una tabla para ver tus columnas y relaciones:

{{< img src="ddsql_editor/data-tab.png" alt="La pestaña de datos que muestra la información de la tabla para aws.ec2_instance" style="width:70%;" >}}

Para sources (fuentes) de datos como logs, utiliza el creador de consultas para generar funciones de tabla.

## Guardar y compartir consultas

Guarda las consultas útiles para futuras consultas o descarga los datos como CSV.

{{< img src="/ddsql_editor/save_export.png" alt="Interfaz de DDSQL Editor que muestra resultados de consulta con las opciones de guardar y exportar resaltadas" style="width:90%;" >}}

Exporta una consulta guardada a un dashboard haciendo clic en **Save to Dashboard** (Guardar en el dashboard). Desde un dashboard puede visualizar los resultados y enviar informes programados.

Explora y vuelve a ejecutar consultas recientes o guardadas en el panel lateral.

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="Panel lateral que muestra la pestaña Consultas con una lista de las consultas guardadas y recientes en el DDSQL Editor" style="width:70%;" >}}

## Permisos

Para acceder a la aplicación del Editor de DDSQL, los usuarios necesitan el permiso `ddsql_editor_read`. Este permiso está incluido por defecto en el rol de solo lectura de Datadog. Si tu organización utiliza roles personalizados, añade este permiso al rol apropiado. Para obtener más información sobre la gestión de permisos, consulta la [documentación de RBAC][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /es/ddsql_reference/ddsql_default/#tags
[3]: /es/account_management/rbac/
[4]: /es/bits_ai
[5]: /es/help/
[6]: /es/ddsql_reference/ddsql_default/