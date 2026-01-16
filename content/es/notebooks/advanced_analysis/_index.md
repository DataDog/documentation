---
aliases:
- /es/logs/workspaces/
- /es/logs/workspaces/export/
description: Realiza análisis avanzados de datos en notebooks con consultas SQL, transformaciones
  de datos, uniones y visualizaciones en varios conjuntos de datos.
further_reading:
- link: /notebooks
  tag: Documentación
  text: Más información sobre notebooks
- link: /notebooks/advanced_analysis/getting_started
  tag: Documentación
  text: Introducción a Analysis Features
title: Analysis Features
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Los análisis avanzados en notebooks no están disponibles en el <a href="/getting_started/site">sitio Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Información general

La función de análisis de los notebooks permite realizar análisis avanzados de los datos de Datadog. Puedes unir varios conjuntos de datos, encadenar consultas y transformar los datos mediante transformaciones predefinidas o SQL, sin perder ninguna de las funciones que ofrecen los notebooks.

Los notebooks son editores de texto colaborativos que permiten incrustar gráficos de Datadog directamente en los documentos. Aunque esto es ideal para explorar y narrar, las investigaciones más profundas pueden requerir un control más avanzado sobre las consultas de datos. Las funciones de análisis te permiten realizar consultas que te ayudarán a:

* Encadena consultas, como la agregación de datos agregados existentes o la unión de dos conjuntos de datos agregados.
* Unir datos de múltiples fuentes de logs y otros conjuntos de datos.
* Realiza análisis avanzados, extrae datos y añade campos calculados en el momento de la consulta.
* Visualizar conjuntos de datos transformados con gráficos.

## Añadir datos a tu notebook

Para ejecutar consultas complejas en un notebook, añade primero una celda **Fuente de datos**. Hay dos maneras de hacerlo:

**Desde un notebook**:
1. Escribe `/datasource` y presiona <kbd>Intro</kbd> o haz clic en el cuadro **Data Source** (Fuente de datos) situado en la parte inferior de la página.
2. Escribe o seleccione tu fuente de datos deseada en el menú desplegable y presiona <kbd>Intro</kbd>.<br/>
**Nota**: Si buscas una fuente de datos y no está disponible, solicítala [aquí][5].
3. Introduce tu consulta. Los atributos reservados de los logs filtrados se añaden automáticamente como columnas.

**Desde el [Explorador de logs][1]**:

1. Introduce tu consulta en el Explorador de logs.
2. Haz clic en **Analyze in Notebooks** (Analizar en notebooks).
3. Marca la casilla **Use as a computational data source** (Utilizar como fuente de datos de cálculo) y selecciona el notebook que quieres utilizar.
4. Se añade una celda de fuente de datos al notebook seleccionado con la misma consulta introducida en el Explorador de logs. Por defecto, las columnas mostradas en el Explorador de logs se incluyen en la celda de fuente de datos.

## Configuración de una celda de fuente de datos

Después de añadir una celda de fuente de datos a un notebook, puedes seguir modificándola para estructurar los datos según tus necesidades de análisis.

### Cambiar el marco temporal de los datos

Por defecto, las celdas de fuente de datos creadas a partir de notebooks utilizan el marco temporal global del notebook. Las celdas de fuente de datos creadas a partir del Explorador de logs utilizan una hora local fijada al marco temporal en el momento de la exportación.

Puedes cambiar cualquier celda de fuente de datos entre un marco temporal local o global, utilizando el botón conmutador situado en la esquina superior derecha de la celda.

### Filtrar la fuente de datos

Independientemente de cómo crees la celda de fuente de datos, puedes modificar la consulta utilizando la barra de búsqueda. Cualquier cambio en la consulta vuelve a ejecutar automáticamente la celda de fuente de datos y cualquier celda posterior, actualizando la vista previa de los datos.

### Añadir o modificar una columna

Puedes añadir o modificar columnas en tu celda de fuente de datos. Hay dos formas de ajustar las columnas:

- En la sección de vista previa, haz clic en **columns** (columnas) para buscar entre los atributos disponibles para tu fuente de datos.
- En la vista previa, haz clic en una fila para abrir el panel lateral de detalles. Haz clic en el atributo que desees añadir como columna y, en la opción emergente, selecciona "@your_column" a tu conjunto de datos "@your_datasource".

{{< img src="/notebooks/analysis_features/add_column_to_dataset.png" alt="Panel lateral de detalles abierto con la opción para añadir una columna de atributos a la celda de fuente de datos" style="width:100%;" >}}

### Consultas de campos calculados

Puedes tomar consultas existentes del Explorador de logs que incluyan [Campos calculados][4] y abrirlas en notebooks. Para transferir estas consultas desde el Explorador de logs, haz clic en **More** (Más) y selecciona **Analyze in Notebooks** (Analizar en notebooks). Los campos calculados se convierten automáticamente en una celda de transformación.

También puedes crear campos calculados directamente en un notebook para definir un campo calculado a partir de fuentes de datos existentes. Estos campos pueden reutilizarse en análisis posteriores:
1. Abre un Workspace con una fuente de datos.
1. Añade una [Celda de transformación](#transformation-cell).
1. Haz clic en **More operations** (Más operaciones).
1. Selecciona **Calculate** (Calcular).

{{< img src="/logs/workspace/calculated_fields_transformation_cell.png" alt="Captura de pantalla de una interfaz de espacio de trabajo de ejemplo con la opción 'Calcular' seleccionada en el menú desplegable 'Más', que demuestra cómo añadir Campos calculados a una consulta." style="width:100%;" >}}

## Transformación y análisis de datos

Puedes añadir varios tipos de celdas para mejorar tus capacidades de análisis. Estas celdas te permiten incluir fuentes de datos adicionales, como tablas de referencia, RUM o tramos. Utiliza SQL para unir, transformar, correlacionar y visualizar tus datos de forma eficaz. Una de las principales ventajas de este enfoque es que las celdas que dependen de otras celdas se actualizan automáticamente cada vez que cambia una dependencia, lo que garantiza que tu análisis refleje siempre los datos más actuales.

### Célula de transformación

Añade una celda de transformación para filtrar, agrupar, unir o extraer datos definidos en una celda de fuente de datos.

1. Escribe `/transformation` y presiona <kbd>Intro</kbd> o haz clic en el cuadro del conjunto de datos de transformación situado en la parte inferior de la página.
2. Selecciona la fuente de datos que quieres transformar en el menú desplegable del conjunto de datos fuente.

Después de añadir la celda de transformación, puedes añadir cualquier número de operaciones de transformación dentro de la celda. Elige una operación de la lista de transformaciones admitidas:
| Operación | Descripción |
|-----------|-------------|
| Parse | Introduce [sintaxis grok][2] para extraer datos en una columna separada. En el menú desplegable "De", selecciona la columna de la que se extraerán los datos. |
| Agrupar | Selecciona por qué deseas agrupar los datos en los menús desplegables. |
| Unir | Selecciona el tipo de unión, el conjunto de datos contra el que se va a unir y los campos en los que se va a unir. |
| Filtrar | Añade una consulta de filtro para el conjunto de datos. |
| Calcular | Añade un nombre para el campo y la fórmula de la función, utilizando el [lenguaje de expresión de campo calculado][3]. |
| Limitar | Introduce el número de filas del conjunto de datos que deseas mostrar. |
| Ordenar | Selecciona el orden de organización y la columna por la que deseas ordenar. |
| Convertir | Permite convertir una columna en un tipo diferente. Selecciona la columna y el tipo de columna que deseas convertir. |

### Célula de análisis

También puedes transformar tus datos utilizando SQL añadiendo una celda de análisis a tu notebook.

1. Escribe `/sql` o `/analysis` y presiona <kbd>Intro</kbd> o haz clic en el cuadro **SQL Query** (Consulta SQL) situado en la parte inferior de la página.
2. En el desplegable del conjunto de datos de la fuente, selecciona la fuente de datos que quieres transformar.
3. Escribe tu consulta SQL. Para conocer la sintaxis SQL compatible, consulta la [referencia de DDSQL][4].
4. Haz clic en **Run** (Ejecutar) en la esquina superior derecha de la celda de análisis para ejecutar la consulta.

{{< img src="/notebooks/analysis_features/analysis_cell_example.png" alt="Ejemplo de una celda de análisis con datos de transformación de consulta SQL en un notebook" style="width:100%;" >}}

## Visualización de datos transformados

Puedes representar gráficamente los datos que has transformado utilizando celdas de análisis dentro de un notebook, personalizando la visualización con filtros, agregaciones y ajustes de apariencia.

Para representar gráficamente los datos:

1. Escribe `/graph` y presiona <kbd>Intro</kbd> o haz clic en el cuadro **Graph Dataset** (Graficar conjunto de datos) situado en la parte inferior de la página.
2. Escribe o selecciona tu fuente de datos deseada en el menú desplegable y presiona <kbd>Intro</kbd>.
3. Selecciona el tipo de visualización en el menú de gráficos y presiona <kbd>Intro</kbd>.

## Visualización y exportación de datos

Para cualquier celda de análisis que incluya una vista previa del conjunto de datos, puedes ver la vista previa completa de 100 filas haciendo clic en el botón **View dataset** (Ver conjunto de datos).

### Exportar tu consulta a un dashboard

Puedes guardar los resultados de cualquier celda de análisis en un dashboard haciendo clic en **Save to Dashboard** (Guardar en dashboard) y seleccionando un dashboard existente, o creando uno nuevo. Aunque esto crea una sincronización entre tu celda de notebook y el gráfico de dashboard exportado, los cambios en la consulta en tu notebook no actualizan automáticamente el dashboard.

{{< img src="/notebooks/analysis_features/analysis_cell_save_to_dashboard.png" alt="Ejemplo de guardar una celda de análisis en un dashboard desde un notebook" style="width:100%;" >}}

Si actualizas la celda publicada o cualquiera de las celdas anteriores, aparecerá un distintivo en la esquina superior derecha de la celda indicando **unpublished changes** (cambios no publicados). Una vez publicados los cambios, las actualizaciones se sincronizan con **todos** los dashboard en los que se utiliza la consulta.

**Nota**: Por defecto, el conjunto de datos está vinculado al marco temporal global del **dashboard**, no al marco temporal del notebook. Sin embargo, tienes la posibilidad de establecer un marco temporal personalizado en el widget del dashboard.

### Descargar conjunto de datos como CSV

Puedes descargar los datos de las celdas para utilizarlos en herramientas externas o procesarlos posteriormente fuera de Datadog.

Para descargar tu conjunto de datos como archivo CSV:

1. Desplázate a cualquier celda de análisis que contenga un conjunto de datos.
2. Haz clic en el icono de descarga situado en la esquina superior derecha de la celda.
3. Selecciona el número de filas que deseas exportar (hasta el máximo disponible).
4. El archivo CSV se descarga automáticamente en tu ordenador.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /es/logs/log_configuration/parsing/
[3]: /es/logs/explorer/calculated_fields/expression_language/
[4]: /es/ddsql_reference/
[5]: https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/