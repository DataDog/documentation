---
further_reading:
- link: /sheets/functions_operators
  tag: Documentation
  text: Funciones y operadores
title: Sheets
---

## Información general

Sheets es una herramienta de hoja de cálculo que puedes rellenar con datos de Datadog, lo que te permite realizar análisis complejos y elaborar informes sin necesidad de conocimientos técnicos. Permite a Teams utilizar las funciones habituales de una hoja de cálculo, como búsquedas, tablas dinámicas y cálculos con datos de Datadog, para que no tengas que exportar y utilizar otra herramienta con datos obsoletos. 

Sheets te permite manipular, transformar y analizar datos de logs, real user monitoring y monitorización del coste en la nube en una interfaz de hoja de cálculo familiar. 

## Crear una tabla

Comienza por crear una tabla de datos, ya sea creando una nueva consulta desde Sheets o transfiriendo una consulta desde el Logs Explorer, el RUM Explorer o el Metrics Explorer.

### Añadir una nueva tabla en Sheets

{{< img src="/sheets/create_table.png" alt="Modal para crear una tabla desde Sheets, que muestra una consulta a Logs con status:error" style="width:90%;" >}}

1. En la página de [Datadog Sheets][1], haz clic en **New Spreadsheet** (Nueva hoja de cálculo).
1. Haz clic en **Add Data** (Añadir datos).
1. Comienza a crear tu consulta seleccionando tu fuente de datos y añadiendo parámetros de filtrado.
1. Selecciona las columnas que deseas visualizar y previsualiza la tabla resultante.
1. Haz clic en **Create Table** (Crear tabla).

### Transfiere tu consulta a una hoja de cálculo

1. En la página de un producto compatible (como el [Log Explorer][2]), crea la consulta de datos que deseas analizar, como filtrar tu vista de Logs a los que tienen `status:error`.
1. Haz clic en **Open on Sheets** (Abrir en hojas). Para consultar una lista de páginas de productos a partir de las que puedes crear una tabla, consulta la sección [Fuentes de datos compatibles](#supported-data-sources).
1. Puedes crear una **New Spreadsheet** (Hoja de cálculo nueva) o añadir esta tabla de datos a una **Existing Spreadsheet** (Hoja de cálculo existente).
1. Haz clic en **Save and Open** (Guardar y abrir).

## Columnas calculadas

Puedes utilizar una columna calculada para añadir una fórmula, analizar un mensaje de log, extraer expresiones regulares o añadir lógica empresarial a tus datos. Las columnas calculadas se pueden utilizar en la tabla dinámica que crearás más adelante.

En el encabezado de la columna del extremo derecho de tu tabla, haz clic en el icono Más para **Add calculated column** (Añadir columna calculada). Introduce un función para ver la sintaxis y la descripción del función. Para ver una lista completa de las funciones compatibles, consulta la documentación [funciones y operadores][3].

{{< img src="/sheets/calculated_columns.png" alt="Columna calculada agregada con el icono Más y un ejemplo de función IFS" style="width:90%;" >}}

## Búsqueda

Lookup enriquece tus datos existentes y añade más contexto a tu tabla. Haz clic en **Add Lookup** (Añadir Lookup) en la parte superior de la página para añadir columnas de otra tabla o fuente de datos, como [Tablas de referencia][4], logs o datos RUM. Lookup es como un left join o un vlookup en Excel o Google Sheets; hace coincidir registros en una columna común y devuelve columnas adicionales de datos para enriquecer tu tabla existente en Sheets.

{{< img src="/sheets/lookup.png" alt="Búsqueda de ejemplo que añade metadatos del equipo de usuarios extraído de una tabla de referencia" style="width:90%;" >}}

Por ejemplo, tiene una tabla de datos RUM con correos electrónicos de usuarios, y quieres saber a qué equipos pertenecen estos usuarios. Puedes agregar una búsqueda que compare la columna de correo electrónico del usuario en tu tabla con la columna de correo electrónico del trabajo en una Tabla de referencia. La búsqueda extrae el equipo de la Tabla de referencia y lo añade como una nueva columna a tu hoja de cálculo.

## Tabla dinámica

Después de añadir una tabla de datos a una hoja de cálculo, analiza y añade contexto a tus datos sin procesar con una tabla dinámica. Utiliza tablas dinámicas para resumir y organizar grandes cantidades de datos en tablas personalizadas. Te ayuda a analizar los datos para encontrar patrones y tendencias, y ver comparaciones. Por ejemplo, puedes tener una tabla con cien filas, pero, con una tabla dinámica, puedes desglosar esos datos en una tabla de resumen que cuente tus datos por método o región. Para crear una tabla dinámica:
1. En una hoja de cálculo existente que ya tenga una tabla de datos, haz clic en **Add Pivot Table** (Añadir tabla dinámica).
1. En la sección **Rows** (Filas) y **Columns** (Columnas), selecciona las dimensiones que deseas analizar, como el estado de logs.
1. En la sección **Calculations** (Cálculos), selecciona las dimensiones que deseas utilizar en los cálculos, incluidas suma, media, recuento, mín. y máx.

{{< img src="/sheets/example_pivot_table.png" alt="Panel de configuración de la tabla dinámica de ejemplo" style="width:90%;" >}}

### Visualizaciones

Después de tener tu tabla dinámica, puedes hacer clic en **Show Graphs** (Mostrar gráficos) y añadir hasta seis widgets para graficar tus datos. Los tipos de widget compatibles incluyen **Top List**, **Treemap** y **Pie Chart**. Pasa el ratón por encima del título de widget para eliminar, duplicar, expandir, exportar y reposicionar widgets. Para editar un widget, haz clic en el icono del lápiz. Las opciones de edición permiten seleccionar el tipo de widget, elegir el cálculo dinámico que se va a graficar (si hay más de uno) y especificar las filas, columnas y el número de agrupaciones graficadas por fila o columna.

## Fuentes de datos compatibles

Crea tablas y analiza los datos extraídos de las siguientes fuentes de datos:

| Fuente de datos          | Página del producto       |
| -------------------- | -----------        | 
| Coste de la nube           | [Cloud Cost Analytics][5] |
| Datos sobre infraestructura (vista previa) | [Datos de infraestructura][6] |
| Logs                 | [Logs Explorer][2] |
| Métricas              | [Metrics Explorer][7] |
| Real User Monitoring | [RUM Explorer][8]  |
| Tablas de referencia     | [Tablas de referencia][9] |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /es/sheets/functions_operators
[4]: https://docs.datadoghq.com/es/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/cost
[6]: https://app.datadoghq.com/infrastructure
[7]: https://app.datadoghq.com/metric/explorer
[8]: https://app.datadoghq.com/rum/sessions
[9]: https://app.datadoghq.com/reference-tables