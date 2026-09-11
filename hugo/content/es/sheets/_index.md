---
description: Analice datos de Datadog en una interfaz de hoja de cálculo familiar
  con tablas, tablas dinámicas, búsquedas, columnas calculadas y hojas de cálculos
  flexibles.
further_reading:
- link: /sheets/functions_operators
  tag: Documentación
  text: Funciones y operadores
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: Blog
  text: Analice Cloud Cost con Sheets flexibles en Datadog Sheets
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: Blog
  text: Convierta los comentarios de los desarrolladores en información operativa
    con Datadog Forms y Sheets
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explore sus datos con Sheets, el editor DDSQL y Notebooks para un análisis
    avanzado en Datadog
title: Sheets
---
## Descripción general {#overview}

Sheets es una herramienta de hoja de cálculo que puede poblarse con datos de Datadog, lo que le permite realizar análisis complejos y crear informes sin necesidad de conocimientos técnicos. Permite a los equipos utilizar funciones de hojas de cálculos familiares como búsquedas, tablas dinámicas y cálculos en los datos de Datadog, para que no tengan que exportar y utilizar otra herramienta con datos obsoletos.

Sheets le permite manipular, transformar y analizar datos de Logs, monitoreo de usuarios reales y monitoreo de Cloud Cost en una interfaz de Sheets familiar. Puede contener las siguientes pestañas:

- [{{< ui >}}Table{{< /ui >}}](#table): Consulte datos en tiempo real desde una fuente de datos de Datadog y enriquécelos con columnas calculadas, búsquedas y filtros.
- [{{< ui >}}Pivot{{< /ui >}}](#pivot): Resuma y agregue datos de una tabla con dimensiones y cálculos personalizados.
- [{{< ui >}}Sheet{{< /ui >}}](#sheet-preview) (Vista previa): Una hoja de cálculos flexible de lienzo en blanco donde puede escribir fórmulas que hacen referencia a datos directamente desde una tabla para crear modelos, informes o realizar un seguimiento de las operaciones.

## Tabla {#table}

Comience creando una tabla de datos, ya sea creando una nueva consulta desde Sheets o transfiriendo una consulta desde las páginas del explorador, como Logs, RUM, métricas o Cloud Cost.

### Agregue una nueva tabla en Sheets {#add-a-new-table-in-sheets}

{{< img src="/sheets/create_table.png" alt="Modal para crear una tabla desde Sheets, que muestra una consulta de Logs con status:error." style="width:90%;" >}}

1. En la [página de Datadog Sheets][1], haga clic en {{< ui >}}New Spreadsheet{{< /ui >}}.
1. Haga clic en {{< ui >}}Add Data{{< /ui >}}.<br/>
**Nota**: si hay una fuente de datos que desea y no está disponible, solicítela [aquí][19].
1. Comience a crear su consulta seleccionando su fuente de datos y agregando parámetros de filtrado.
1. Seleccione las columnas que desea mostrar y obtenga una vista previa de la tabla resultante.
1. Haga clic en {{< ui >}}Create Table{{< /ui >}}.

### Transfiera su consulta a una hoja de cálculos {#transfer-your-query-to-a-spreadsheet}

1. En la página de un producto compatible (como el [Log Explorer][2]), cree la consulta de los datos que desea analizar, como filtrar su vista de Logs a aquellos que tengan `status:error`.
1. Haga clic en {{< ui >}}Open in Sheets{{< /ui >}}. Para obtener una lista de las páginas de productos a partir de las cuales puede crear una tabla, consulte la sección [fuentes compatibles](#supported-data-sources).
1. Puede crear una {{< ui >}}New Spreadsheet{{< /ui >}} o agregar esta tabla de datos a un {{< ui >}}Existing Spreadsheet{{< /ui >}}.
1. Haga clic en {{< ui >}}Save and Open{{< /ui >}}.

### Columnas calculadas {#calculated-columns}

Puede usar una columna calculada para agregar una fórmula, analizar un mensaje de registro, extraer una expresión regular o agregar lógica de negocio a sus datos. Sus columnas calculadas se pueden usar en la tabla dinámica que creará más adelante.

Desde el encabezado de la columna del extremo derecho de su tabla, haga clic en el icono de más para {{< ui >}}Add calculated column{{< /ui >}}. Ingrese una función para ver la sintaxis y la descripción de la función. Para obtener una lista completa de las funciones admitidas, consulte la documentación de [Functions and Operators][3].

{{< img src="/sheets/calculated_columns.png" alt="Columna calculada agregada con el icono de más y un ejemplo de función IFS" style="width:90%;" >}}

### Búsqueda {#lookup}

La búsqueda enriquece sus datos existentes y agrega más contexto a su tabla. Haga clic en {{< ui >}}Add Lookup{{< /ui >}} en la parte superior de la página para agregar columnas de otra tabla o fuente de datos, como [Reference Tables][4], Logs o datos de RUM. La búsqueda es como una combinación izquierda o un buscarv en Excel o Google Sheets; hace coincidir registros en una columna común y devuelve columnas de datos adicionales para enriquecer su tabla de Sheets existente.

{{< img src="/sheets/lookup.png" alt="Ejemplo de búsqueda que agrega los metadatos del equipo de un usuario obtenidos de una Reference Table" style="width:90%;" >}}

Por ejemplo, tiene una tabla de datos RUM con correos electrónicos de usuarios y desea saber a qué equipos pertenecen estos usuarios. Puede agregar una búsqueda que compare la columna de correo electrónico del usuario en su tabla con la columna de correo electrónico de trabajo en una Reference Table. La búsqueda extrae el equipo de la Reference Table y lo agrega como una nueva columna a su hoja de cálculo.

## Tabla dinámica {#pivot}

Después de agregar una tabla de datos a una hoja de cálculo, analice y agregue contexto a sus datos sin procesar con una tabla dinámica. Utilice tablas dinámicas para resumir y organizar grandes cantidades de datos en tablas personalizadas. Le ayuda a analizar datos para encontrar patrones y tendencias, y ver comparaciones. Por ejemplo, puede tener una tabla con cien filas, pero con una tabla dinámica puede desglosar esos datos en una tabla de resumen que cuenta sus datos por método o región. Para crear una tabla dinámica:
1. Desde una hoja de cálculo existente que ya tenga una tabla de datos, haga clic en {{< ui >}}Add Pivot Table{{< /ui >}}.
1. En la sección {{< ui >}}Rows{{< /ui >}} y {{< ui >}}Columns{{< /ui >}}, seleccione las dimensiones que desea analizar, como el estado de Logs.
1. En la sección {{< ui >}}Calculations{{< /ui >}}, seleccione las dimensiones que desea utilizar en los cálculos, incluyendo suma, promedio, recuento, mínimo y máximo.

{{< img src="/sheets/example_pivot_table.png" alt="Ejemplo de panel de configuración de tabla dinámica" style="width:90%;" >}}

### Visualizations {#visualizations}

Después de tener su tabla dinámica, puede hacer clic en {{< ui >}}Show Graphs{{< /ui >}} y agregar hasta seis widgets para graficar sus datos. Los tipos de widgets admitidos incluyen widgets de {{< ui >}}Top List{{< /ui >}}, {{< ui >}}Treemap{{< /ui >}} y {{< ui >}}Pie Chart{{< /ui >}}. Pase el cursor sobre el título del widget para eliminar, duplicar, expandir, exportar y reposicionar widgets. Para editar un widget, haga clic en el icono del lápiz. Las opciones de edición le permiten seleccionar el tipo de widget, elegir qué cálculo de tabla graficar (si hay más de uno) y especificar las filas, columnas y el número de agrupaciones graficadas por fila o columna.

## Hoja (Vista previa) {#sheet-preview}

{{< callout url="https://www.datadoghq.com/product-preview/flexible-spreadsheets-in-datadog-sheets/">}}
Cree hojas de cálculo flexibles: diseñadas para permitirle empezar desde cero, crear modelos, realizar un seguimiento de operaciones y más.
{{< /callout >}}

Una hoja es una hoja de cálculo flexible de lienzo en blanco con un motor de fórmulas completo. Úsela para crear modelos financieros, rastreadores operativos, plantillas de planificación o cualquier cálculo de forma libre que no se ajuste a un flujo de trabajo basado en consultas.

Para agregar una hoja, haga clic en la pestaña {{< ui >}}\+{{< /ui >}} en la parte inferior de su hoja de cálculo y seleccione {{< ui >}}Add Sheet{{< /ui >}}.

{{< img src="/sheets/flexible_spreadsheet.png" alt="Una hoja flexible que muestra un modelo de gasto en la nube de 2025 por proveedor, con fórmulas SUMIFS y VLOOKUP que hacen referencia a las pestañas de Cloud Cost y tabla de conversión de moneda" style="width:90%;" >}}

### Referencias de celda {#cell-references}

Las celdas se referencian utilizando la notación estándar A1, donde la columna es una letra y la fila es un número. Por ejemplo, `A1` es la primera celda, `B3` es la tercera fila de la columna B y `A1:C5` es un rango que abarca las columnas A a C y las filas 1 a 5.

| Tipo de referencia | Sintaxis | Descripción |
| -------------- | ------ | ----------- |
| Celda relativa | `A1` | Se ajusta al copiar la fórmula a otra celda |
| Celda absoluta | `$A$1` | Siempre hace referencia a la misma celda |
| Columna absoluta, fila relativa | `$A1` | La columna permanece fija; la fila se ajusta |
| Columna relativa, fila absoluta | `A$1` | La fila permanece fija; la columna se ajusta |
| Rango | `A1:C5` | Todas las celdas de A1 a C5 |

### Referencias entre hojas {#cross-sheet-references}

Puede hacer referencia a datos de otras pestañas en la misma hoja de cálculo directamente en sus fórmulas. Utilice el nombre de la hoja seguido de un signo de exclamación y la celda o el rango:

```
='My Table'!A1
='Summary'!B2:B20
```

Para hacer referencia a una columna específica de una pestaña de **tabla** por nombre, utilice la notación `#`:

```
='Error Logs'#"duration_ms"
='Table 1'#"status"
```

Por ejemplo, `=SUM('Error Logs'#"duration_ms")` suma cada valor en la columna `duration_ms` de su tabla llamada "Error Logs".

### Fórmulas {#formulas}

Las fórmulas de Sheets admiten todas las funciones enumeradas en la página [Funciones y operadores][3], además de funciones adicionales de búsqueda, estadísticas, financieras y otras disponibles solo en Sheets. Consulte la sección [Funciones de Sheets][21] para obtener la lista completa.

#### Ejemplos {#examples}

**Agregue una columna de tabla en Sheets**

Sume todos los valores en la columna `duration_ms` de una tabla llamada "Error Logs":

```
=SUM('Error Logs'#"duration_ms")
```

Cuente cuántas filas en esa tabla tienen `status = "error"`:

```
=COUNTIF('Error Logs'#"status","error")
```

**Búsqueda segura con una alternativa**

Busque el equipo de un usuario en una tabla de referencia, devolviendo «desconocido» si no se encuentra:

```
=IFNA(VLOOKUP(A2,'User Directory'!A:B,2,0),"unknown")
```

**Días desde un incidente**

Calcule hace cuánto tiempo se abrió un incidente, dada una marca de tiempo en A2:

```
=DATEDIF(A2,TODAY(),"D")&" days ago"
```

**latencia p95 de una tabla**

Obtenga el percentil 95 de los tiempos de respuesta de una tabla conectada:

```
=PERCENTILE('APM Data'#"duration",0.95)
```

**Clasificar un valor en niveles de gravedad**

```
=IFS(A2>500,"critical",A2>200,"warn",A2>0,"ok",TRUE,"no data")
```

**Pago mensual de préstamo**

Calcule el pago mensual de un préstamo de $50,000 al 6% de interés anual durante 3 años:

```
=PMT(0.06/12,36,-50000)
```

### Valores de error {#error-values}

| <span style="min-width:80px;display:block">Error</span> | Causa | Cómo manejarlo |
| -------------------- | ----- | ------------- |
| `#DIV/0!` | División por cero | `=IFERROR(A1/B1,0)` |
| `#VALUE!` | Tipo de argumento incorrecto; por ejemplo, texto pasado a una función matemática | Verifique los tipos de entrada |
| `#NUM!` | Valor numérico no válido; por ejemplo, `SQRT(-1)` | Valide las entradas con `IF` |
| `#N/A` | Valor no encontrado; por ejemplo, un error en `VLOOKUP` | `=IFNA(VLOOKUP(...),"not found")` |
| `#REF!` | Referencia a una celda que ya no existe | Actualice la fórmula |
| `#NAME?` | Nombre de función no reconocido | Verifique la ortografía |
| `#ERROR!` | No se pudo analizar la fórmula | Verifique la sintaxis |

### Formato de celda {#cell-formatting}

Las celdas se pueden formatear como texto sin formato, número, porcentaje, moneda (USD o EUR) o fecha y hora. El formato afecta la forma en que se muestran los valores, pero no el valor subyacente utilizado en los cálculos.

### Límites {#limits}

Las Sheets tienen los siguientes límites en cuanto al número de filas y columnas:

| Dimensión | Predeterminado | Máximo |
| --------- | ------- | ------- |
| Filas | 1,000 | 2,000 |
| Columnas | 26 | 52 |

## Fuentes de datos admitidas {#supported-data-sources}

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Fuentes de datos avanzadas">}}
Si desea consultar fuentes de datos que aún no están disponibles, utilice este formulario para enviar su solicitud.
{{< /callout >}}

Cree tablas y analice los datos extraídos de las siguientes fuentes de datos:

| Fuente de datos          | Página del producto       |
| -------------------- | -----------        |
| Spans de APM            | [APM Explorer][18] |
| Audit Trail          | [Audit Trail][15] |
| CI Pipelines         | [CI Visibility][17] |
| Cloud Cost           | [Cloud Cost Analytics][5] |
| Consultas de base de datos     | [Database Monitoring][16] |
| Eventos               | [Event Management][14] |
| Infraestructura       | [Host List][6] |
| Agent Observability    | [Agent Observability][13] |
| Logs                 | [Logs Explorer][2] |
| Métricas              | [Metrics Explorer][7] |
| Product Analytics    | [Product Analytics Events][20] |
| Real User Monitoring | [RUM Explorer][8]  |
| Tablas de referencia     | [Reference Tables][9] |
| Hallazgos de seguridad    | [Cloud Security][12] |
| Señales de seguridad     | [Security][11] |

## Configuración de una hoja de cálculo {#configuring-a-spreadsheet}

### Permisos {#permissions}

De forma predeterminada, todos los usuarios tienen acceso completo a las hojas de cálculo.

Utilice controles de acceso granulares para limitar los [roles][10] que pueden editar una hoja de cálculo en particular:
1. Mientras visualiza una hoja de cálculo, haga clic en el engranaje en la parte superior derecha. El menú de configuración se abre.
1. Seleccione {{< ui >}}Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen {{< ui >}}Viewer{{< /ui >}} acceso de forma predeterminada.
1. Utilice el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar la hoja de cálculo.
2. Haga clic en {{< ui >}}Add{{< /ui >}}. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota:** Para mantener su acceso de edición a la hoja de cálculo, debe incluir al menos un rol del cual usted sea miembro antes de guardar.

Debe tener acceso de edición para restaurar el acceso general a una hoja de cálculo restringida. Complete los siguientes pasos:
1. Mientras visualiza la hoja de cálculo, haga clic en el engranaje en la parte superior derecha. El menú de configuración se abre.
1. Seleccione {{< ui >}}Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /es/sheets/functions_operators
[4]: https://docs.datadoghq.com/es/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure/
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables
[10]: /es/account_management/rbac/
[11]: https://app.datadoghq.com/security
[12]: https://app.datadoghq.com/security/compliance
[13]: https://app.datadoghq.com/llm/applications
[14]: https://app.datadoghq.com/event/explorer
[15]: https://app.datadoghq.com/audit-trail
[16]: https://app.datadoghq.com/databases/queries
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/apm/traces
[19]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/
[20]: https://app.datadoghq.com/product-analytics/events
[21]: /es/sheets/functions_operators#functions