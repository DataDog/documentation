---
aliases:
- /es/dashboards/ddsql_editor/
- /es/ddsql_editor/reference/
further_reading:
- link: /ddsql_editor/reference
  tag: Documentation
  text: Referencias para consultas DDSQL
- link: /ddsql_editor/guide/ddsql_use_cases
  tag: Guía
  text: Consultas y casos de uso habituales
title: Editor DDSQL
---


{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
El Editor DDSQL Editor está en vista previa.
{{< /callout >}}

## Información general

Con el [Editar DDSQL][1], puedes obtener una visibilidad más profunda de tu infraestructura consultando tus recursos con lenguaje natural o con [DDSQL](#use-sql-syntax-ddsql), un dialecto de SQL con soporte adicional para consultar etiquetas (tags).

{{< img src="ddsql_editor/query-result.png" alt="El resultado de una consulta SQL que muestra la página DDSQL en Datadog" style="width:100%;" >}}

## Consulta en lenguaje natural

Escribe tu pregunta en el cuadro de búsqueda y Datadog creará la consulta SQL por ti.

{{< img src="ddsql_editor/natural-language-query.png" alt="Una consulta ingresada en el cuadro de búsqueda por lenguaje natural" style="width:90%;" >}}

## Utilizar la sintaxis SQL (DDSQL)

DDSQL es un lenguaje de consulta para datos de Datadog. Implementa varias operaciones SQL estándar, como `SELECT`, y permite realizar consultas contra datos no estructurados, como [etiquetas (tags)][2]. Obtén exactamente los datos que deseas escribiendo tu propia sentencia `SELECT`. Consulta etiquetas como si fueran columnas de una tabla estándar. 

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws_ec2_instance
WHERE env = 'staging' -- env is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

{{< whatsnext desc="For more information on DDSQL queries, see the DDSQL References:" >}}
    {{< nextlink href="ddsql_editor/reference/functions" >}}Funciones{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/data_types" >}}Tipos de datos{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/expressions_and_operators" >}}Expresiones y operadores{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/statements" >}}Sentenciass{{< /nextlink >}}
    {{< nextlink href="ddsql_editor/reference/tags" >}}Etiquetas{{< /nextlink >}}
{{< /whatsnext >}}

### Explora tus datos en infraestructura 

Ve y filtra la lista de tablas y campos en el panel lateral del esquema:

{{< img src="ddsql_editor/schema-explorer.png" alt="Una lista de las tablas disponibles" style="width:90%;" >}}

Haz clic en el nombre de una tabla para ver tus columnas y relaciones:

{{< img src="ddsql_editor/table-details.png" alt="Los detalles de una tabla, incluidas sus columnas y relaciones" style="width:60%;" >}}

### Guardar y compartir consultas

Guarda consultas útiles o exporta los datos como CSV.

{{< img src="ddsql_editor/save-or-export-result.png" alt="Un resultado de consulta que muestra las acciones de guardar y exportar" style="width:90%;" >}}

Examina y vuelve a ejecutar las consultas guardadas en el panel lateral.

{{< img src="ddsql_editor/saved-queries-panel.png" alt="Una lista de consultas guardadas" style="width:60%;" >}}

## Permisos

Para acceder a la aplicación del Editor de DDSQL, los usuarios necesitan el permiso `ddsql_editor_read`. Este permiso está incluido por defecto en el rol de solo lectura de Datadog. Si tu organización utiliza roles personalizados, añade este permiso al rol apropiado. Para obtener más información sobre la gestión de permisos, consulta la [documentación de RBAC][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ddsql/editor
[2]: /es/dashboards/ddsql_editor/reference/tags
[3]: /es/account_management/rbac/