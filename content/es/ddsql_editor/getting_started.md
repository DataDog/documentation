---
aliases:
- /es/dashboards/ddsql_editor/getting_started/
title: Empezando con DDSQL Editor
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
DDSQL está en fase de vista previa.
{{< /callout >}}

## Información general

Puedes escribir una consulta en [DDSQL Editor][1] en lenguaje natural o en SQL. Consulta la [Referencia de DDSQL][2] para conocer las expresiones SQL compatibles y los detalles de uso. También se proporcionan ejemplos de consultas en toda la interfaz de usuario.

{{< img src="ddsql_editor/query-ui-overview.png" alt="Una lista de tablas disponibles" style="width:100%;" >}}

- Para realizar una consulta en lenguaje natural, escribe tu pregunta en la barra de búsqueda, o haz clic en uno de los ejemplos proporcionados debajo de la barra de búsqueda.
- Para ejecutar una consulta SQL, escribe una expresión DDSQL válida en la sección superior de la página o ejecuta uno de los ejemplos que aparecen en **Queries to get you started** (Consultas para empezar).

## Ejemplo de flujo de consulta

Este flujo de ejemplo destaca las características clave de DDSQL Editor. Si la consulta de ejemplo no es adecuada para tus datos, puedes utilizar tu propia consulta en su lugar.

### 1. Ejecutar una consulta en lenguaje natural

1. Navega hasta [DDSQL Editor][1].
2. En la pantalla de lenguaje natural, escribe `Most common instance types`.

La consulta generada resultante es similar a la que se muestra a continuación.

{{< code-block lang="sql" >}}
SELECT instance_type,
  COUNT(*) AS count
FROM host
GROUP BY instance_type
ORDER BY count DESC;
{{< /code-block >}}

### 2. Modificar la consulta SQL con el explorador de esquemas

Si no estás seguro de qué campos contienen los datos que deseas, puedes utilizar el explorador de esquemas para examinar las tablas disponibles, sus columnas y sus relaciones con otras tablas:

1. Haz clic en el icono de base de datos de la barra lateral izquierda para abrir el explorador de esquemas.
    {{< img src="ddsql_editor/schema-explorer-example.png" alt="Lista de tablas disponibles del explorador de esquemas" style="width:100%;" >}}
1. La consulta actual es para la tabla `host`, así que haz clic en **All Tables > Hosts > host** (Todas las tablas > Hosts > host) para ver los campos disponibles. Decide qué campo añadir a la consulta. En este ejemplo se utiliza `availability_zone`.
    {{< img src="ddsql_editor/schema-explorer-table-example.png" alt="La tabla de host que se muestra en el explorador de esquemas" style="width:50%;" >}}
1. Edita la consulta SQL para añadir `availability_zone` al resultado:

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

### 3. Añadir un filtro basado en etiquetas a la consulta

Las etiquetas (tags) pueden consultarse como si fueran columnas de una tabla. Añade una cláusula `WHERE` a la consulta para contar sólo las instancias en producción:

{{< code-block lang="sql" >}}
SELECT instance_type, availability_zone,
  COUNT(*) AS count
FROM host
WHERE #env = 'prod' -- Use '#' in front of tag names
GROUP BY instance_type, availability_zone
ORDER BY count DESC;
{{< /code-block >}}

Consulta [Consulta de etiquetas en DDSQL][3] para obtener más información.

### 4. Compartir la consulta

Para generar un enlace para compartir la consulta:

1. Haz clic en el icono del engranaje.
1. Haz clic en **Copy Share Link** (Copiar enlace para compartir).

### 5. Guardar y ver la consulta

1. Haz doble clic en el título de la consulta para editar el título, cambiándolo a "Tipos de instancia de producción por zona de disponibilidad".
1. Haz clic en **Save Query** (Guardar consulta).
1. Haz clic en el icono de página de la barra lateral izquierda para abrir el panel de consultas guardadas y busca tu consulta guardada en la lista.

### 6. Ver la consulta en consultas recientes

Si olvidas guardar una consulta útil antes de salir, aún puedes acceder a ella en el panel **Recent Queries** (Consultas recientes). Haz clic en el icono del reloj de la barra lateral izquierda para ver un lista de las consultas recientes.

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /es/ddsql_editor/#use-sql-syntax-ddsql
[3]: /es/ddsql_editor/reference/tags