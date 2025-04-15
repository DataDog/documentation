---
aliases:
- /es/dashboards/ddsql_editor/reference/data_types/
title: Tipos de datos DDSQL
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL está en Vista previa.
{{< /callout >}}

## Tipos de datos

DDSQL implementa una versión simplificada del sistema de tipos SQL que proviene principalmente de PostgreSQL.

### Tipos de bases

| Nombre SQL   | Alias                  | Descripción |
|------------|--------------------------|-------------|
| entero    | Int                      | El almacenamiento es siempre int64. |
| texto       | char, varchar, cadena    | El almacenamiento es siempre UTF-8 de longitud ilimitada. |
| real       | doble, decimal          | El almacenamiento es siempre IEEE-754 float64. |
| marca de tiempo  | marca de tiempo sin zona horaria | Tipo de fecha y hora estándar de SQL. |
| fecha       |                          | Marca de tiempo con resolución a nivel de día. |
| intervalo   |                          | Duración. |
| grupo      | hstore, etiqueta_columna       | Conjunto ordenado de cadenas con semántica "= es contiene" similar a etiqueta (tag). |
| booleano    |                          | `TRUE` o `FALSE` |
| json       |                          | Datos JSON |

### Matrices
Las matrices son una colección ordenada de un tipo base específico. Cada tipo base puede tener su correspondiente tipo de matriz.

### Literales

La siguiente tabla contiene ejemplos sobre cómo declarar literales para cada tipo, para su uso en expresiones como `SELECT <LITERAL>` o en comparaciones como `WHERE timestamp > timestamp '1 hr ago'`.

| Nombre       | Ejemplo |
|------------|---------|
| entero    | `1`, `4`, `23901239412`, `0x4B1D` |
| texto       | `'Hello, world'` |
| real       | `1.0`, `1e30`, `314e-2`, `.25`, `5.` |
| fecha       | `date <DATE_STRING>` (donde `DATE_STRING` es una cadena que puede convertirse en una fecha, o una cadena relativa como `1 day ago`') |
| marca de tiempo  | `timestamp <TIMESTAMP_STRING>` (donde `TIMESTAMP_STRING` es una cadena que puede analizarse como una marca de tiempo, o una cadena relativa como `'1 day ago'`, `'now'`) |
| intervalo  | `interval <INTERVAL>` (donde `INTERVAL` es una cadena que puede analizarse en un intervalo, como `1 day`, `30s`, `2 min`') |
| matrices    | `array<type>[values...]` |