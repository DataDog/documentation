---
further_reading:
- link: /sheets/functions_operators
  tag: Documentation
  text: Funciones y operadores
title: Sheets
---

{{< callout url="https://www.datadoghq.com/private-beta/datadog-sheets/" btn_hidden="false" header="Join the Preview!">}}
Sheets está disponible en <strong>vista previa</strong>. Para poder acceder a esta vista previa, debes tener casos de uso existentes en los que utilices actualmente hojas de cálculo (como Excel o Google Sheets) con los datos de métricas de Datadog, logs, o RUM. Si estás interesado en esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Sheets es una herramienta de hoja de cálculo que se puede rellenar con datos de Datadog, lo que permite realizar análisis complejos y elaborar informes sin necesidad de conocimientos técnicos. Permite a los equipos utilizar la las funciones conocidas de hoja de cálculo, como búsquedas, tablas dinámicas y cálculos en los datos de Datadog, para que no tengas que exportar y utilizar otra herramienta con datos obsoletos. 

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
1. Haz clic en **Save and Open (Guardar y Abrir).

## Columnas calculadas

Puedes utilizar una columna calculada para añadir una fórmula, analizar un mensaje de log o añadir lógica de negocio a tus datos. Las columnas calculadas se pueden utilizar en la tabla dinámica que crearás más adelante.

En el encabezado de la columna del extremo derecho de tu tabla, haz clic en el icono Más para **Add calculated column** (Añadir columna calculada). Introduce un función para ver la sintaxis y la descripción del función. Para ver una lista completa de las funciones compatibles, consulta la documentación [funciones y operadores][3].

{{< img src="/sheets/calculated_columns.png" alt="Columna calculada agregada con el icono Más y un ejemplo de función IFS" style="width:90%;" >}}

## Búsqueda

La búsqueda enriquece los datos existentes y añade más contexto a la tabla. Haz clic en **Add Lookup** (Añadir búsqueda) en la parte superior de la página para añadir columnas de otra tabla o fuente de datos, como [Tablas de referencia][4]. La búsqueda es como una unión a la izquierda o un vlookup en Excel o Google Sheets; hace coincidir registros en una columna común y devuelve columnas de datos adicionales para enriquecer tu tabla de Sheets existente.

{{< img src="/sheets/lookup.png" alt="Búsqueda de ejemplo que añade metadatos del equipo de usuarios extraído de una tabla de referencia" style="width:90%;" >}}

Por ejemplo, tiene una tabla de datos RUM con correos electrónicos de usuarios, y quieres saber a qué equipos pertenecen estos usuarios. Puedes agregar una búsqueda que compare la columna de correo electrónico del usuario en tu tabla con la columna de correo electrónico del trabajo en una Tabla de referencia. La búsqueda extrae el equipo de la Tabla de referencia y lo añade como una nueva columna a tu hoja de cálculo.

## Tabla dinámica

Después de añadir una tabla de datos a una hoja de cálculo, analiza y añade contexto a tus datos sin formato con una tabla dinámica. Utiliza tablas dinámicas para resumir y organizar grandes cantidades de datos en tablas personalizadas. Te ayuda a analizar los datos para encontrar patrones y tendencias, y ver comparaciones. Por ejemplo, puedes tener una tabla de logs de errores con cien filas, pero con una tabla dinámica puedes desglosar esos datos en una tabla de resumen que recuente tus logs de error por método o región. Para crear una tabla dinámica:
1. Desde una hoja de cálculo existente que ya tenga una tabla de datos, haz clic en **Add Pivot Table** (Añadir tabla dinámica).
1. En la sección **Rows** (Filas), selecciona las dimensiones que deseas analizar, como el estado de logs.
1. En la sección **Calculations** (Cálculos), selecciona las dimensiones que deseas utilizar en los cálculos, incluidas suma, media, recuento, mín. y máx.

## Fuentes de datos compatibles

Crea tablas y analiza los datos extraídos de las siguientes fuentes de datos:

| Fuente de datos          | Página del producto       |
| -------------------- | -----------        | 
| Logs                 | [Logs Explorer][2] |
| Real User Monitoring | [RUM Explorer][5]  |
| Costo de la nube           | [Metrics Explorer][6] </br> <strong>Nota</strong>: Las fuentes de datos de costo en la nube deben estar seleccionadas. |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/sheets
[2]: https://app.datadoghq.com/logs
[3]: /es/sheets/functions_operators
[4]: https://docs.datadoghq.com/es/integrations/guide/reference-tables/?tab=manualupload
[5]: https://app.datadoghq.com/rum/sessions
[6]: https://app.datadoghq.com/metric/explorer