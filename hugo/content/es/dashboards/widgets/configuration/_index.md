---
description: Aprenda a configurar widgets en los dashboards de Datadog, incluyendo
  opciones para pantalla completa, enlaces personalizados, información de métricas
  y anulaciones de unidades.
further_reading:
- link: /dashboards/widgets/
  tag: Documentación
  text: Descripción general de widgets
- link: /dashboards/widgets/types
  tag: Documentación
  text: Tipos de widgets
title: Configuración de widgets
---
## Descripción general {#overview}

La configuración de widgets es esencial para crear dashboards efectivos que proporcionen información significativa sobre su infraestructura y aplicaciones. Esta guía cubre las opciones de configuración clave y las consideraciones que debe comprender al configurar widgets.


## Pantalla completa {#full-screen}

El modo de pantalla completa proporciona capacidades mejoradas de visualización y análisis para sus widgets. Puede visualizar la mayoría de los widgets en modo de pantalla completa y hacer lo siguiente:

* Cambiar los marcos de tiempo
* Moverse hacia atrás o hacia adelante según el marco de tiempo seleccionado
* Pausar el gráfico en el momento actual o visualizar el gráfico en tiempo real
* Restablecer el marco de tiempo
* Exportar el gráfico a un dashboard, notebook o copiar la consulta
* Descargar los datos que generan el gráfico en formato CSV

Para acceder directamente a la vista general del widget, haga clic en el botón de pantalla completa en la esquina superior derecha del widget.

Hay opciones adicionales disponibles para [widgets de series temporales][1].

## Data Preview {#data-preview}

Puede combinar múltiples fuentes de datos en el editor de gráficos para enriquecer sus visualizaciones con contexto y metadatos adicionales. Con Data Preview, puede ver qué datos está combinando o si la consulta funciona como se espera. Esta función le ayuda a:

- Confirmar la estructura de los datos y los nombres de las columnas
- Identificar claves coincidentes
- Validar los resultados antes de ejecutar la consulta completa

{{% collapse-content title="Ejemplo" level="h3" expanded=false %}}
Puede unir sus registros de pago con una tabla de referencia (tabla de búsqueda) que contenga detalles del producto para mostrar el precio de venta o la fecha de lanzamiento junto con los datos de la transacción. O bien, puede enriquecer los datos de sesión de RUM uniéndolos con información del cliente de una fuente externa, como Salesforce o Snowflake, para segmentar a los usuarios por nivel de cliente.

Las fuentes de datos admitidas para las uniones incluyen (pero no se limitan a):

- Logs
- Métricas
- RUM
- Cloud Cost Recommendations
- Netflow
- Spans de APM
- Trazas de APM
- Profiles
- Synthetics CI Batches
- Synthetics Run
- Static Analysis
- Pruebas de CI
- Compliance Findings
- Product Analytics
- Tablas de referencia

El uso de uniones y vistas previas de datos facilita la selección de los campos correctos y el enriquecimiento de sus gráficos con detalles relevantes, lo que mejora la calidad y la utilidad de sus dashboards.


{{% /collapse-content %}}

## Enlaces personalizados {#custom-links}

Los enlaces personalizados mejoran la interacción con los datos al conectar los valores de datos de los widgets con URLs relevantes, como las páginas de Datadog o su consola de AWS.

Para personalizar las interacciones con los datos en línea en sus widgets genéricos, consulte [Context Links][2].

## Descripciones de widgets {#widget-descriptions}

Las descripciones de widgets le permiten agregar una descripción de texto a cualquier widget de dashboard. Utilice descripciones para proporcionar contexto sobre una métrica, como qué representa, cómo interpretarla o qué acción tomar.

Para añadir una descripción:
1. Abra el editor de gráficos para el widget.
2. Introduzca una **Description** en la parte inferior del editor.
3. Haga clic en **Save**.

Después de guardar, pase el cursor sobre el icono de descripción en la esquina superior izquierda del widget para visualizar la descripción.

{{< img src="dashboards/widgets/configuration/widget-description-hover.png" alt="Un widget de gráfico de barras titulado \"Avg CPU User % by Service (Top 10)\" con el cursor sobre el icono de descripción en la esquina superior izquierda y la descripción mostrada en una ventana emergente encima del widget." >}}

## Información de métricas {#metrics-info}

En un gráfico de métricas, haga clic en el menú contextual (tres puntos verticales) para encontrar la opción {{< ui >}}Metrics Info{{< /ui >}}. Esto abre un panel con una descripción de la métrica. Hacer clic en el nombre de la métrica en este panel abre la métrica en la página de resumen de métricas para un análisis o ediciones adicionales.

## Anulación de unidad {#unit-override}

Las anulaciones de unidad son una opción de visualización clave que le permite personalizar cómo se presentan los valores de datos en los widgets, añadiendo contexto significativo a sus datos. Para obtener más casos de uso e información, consulte [Personalice sus visualizaciones con anulaciones de unidad][3].
- {{< ui >}}Unit override{{< /ui >}}: elija mostrar unidades en la familia de "memoria" y deje que Datadog se encargue de mostrar la escala adecuada según los datos (como megabytes o gigabytes).
- {{< ui >}}Unit and scale override{{< /ui >}}: fije las unidades a una sola escala (muestre los datos en megabytes independientemente del valor).
- {{< ui >}}Define custom units{{< /ui >}}: defina unidades completamente personalizadas (como "pruebas" en lugar de un conteo genérico).

Esta no es una alternativa para asignar unidades a sus datos.
{{< whatsnext desc="Establezca unidades a nivel de organización: ">}}
    {{< nextlink href="/metrics/units/">}} Establecer unidades de métricas{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Establecer unidades para consultas basadas en eventos{{< /nextlink >}}
{{< /whatsnext >}}

## Selector de tiempo global {#global-time-selector}

El selector de tiempo global es una opción fundamental de configuración de tiempo que sincroniza todos los widgets de un dashboard para usar el mismo marco de tiempo. Para usar el selector de tiempo global, al menos un widget basado en tiempo debe estar configurado para usar `Global Time`. Realice la selección en el editor de widgets en {{< ui >}}Set display preferences{{< /ui >}}, o agregue un widget (el tiempo global es la configuración de tiempo predeterminada).

El selector de tiempo global establece el mismo marco de tiempo para todos los widgets que usan la opción `Global Time` en el mismo dashboard. Seleccione una ventana móvil en el pasado (por ejemplo, `Past 1 Hour` o `Past 1 Day`) o un período fijo con la opción `Select from calendar…` o [ingrese un marco de tiempo personalizado][8]. Si se elige una ventana móvil, los widgets se actualizan para moverse junto con la ventana de tiempo.

Los widgets que no están vinculados al tiempo global muestran los datos de su marco de tiempo local según se aplica a la ventana global. Por ejemplo, si el selector de tiempo global está configurado del 1 de enero de 2019 al 2 de enero de 2019, un widget configurado con el marco de tiempo local para `Past 1 Minute` muestra el último minuto del 2 de enero de 2019 a partir de las 11:59 p. m.

## Copiar y pegar widgets {#copy-and-paste-widgets}

La funcionalidad de copiar y pegar es una característica clave de uso compartido y colaboración que le permite reutilizar widgets en diferentes contextos de Datadog y herramientas externas.

<div class="alert alert-info">Para compartir widgets fuera de Datadog con vistas previas de enlaces, un administrador debe configurar <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Widget Share URLs</strong></a> como Public o Private en Organization Settings. Los administradores pueden deshabilitar esta configuración para evitar que los usuarios generen enlaces y vistas previas para compartir widgets.</div>

Los widgets se pueden copiar en [Dashboards][4], [Notebooks][5], [APM Service][6] y en la página de [recursos de APM][7] usando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, o seleccionando el icono de compartir y eligiendo "Copy".

Los widgets copiados se pueden pegar dentro de Datadog usando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>:

* **Dashboards**: Agrega un nuevo widget posicionado debajo del cursor del mouse.
* **Notebooks**: Agrega una nueva celda al final del notebook.

También puede pegar el widget en su programa de chat favorito que muestre vistas previas de enlaces (como Slack o Microsoft Teams). Según el modo de Widget Share URLs de su organización, se muestra una imagen pública de vista previa de su gráfico o una imagen privada de vista previa en Slack, junto con un enlace directo a su widget. Para obtener más información, consulte [Widget Share URLs][11].

## Grupos de widgets {#groups-of-widgets}

Copie los widgets del grupo del timeboard pasando el cursor sobre el área del widget de grupo y usando <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> o seleccionando el icono de compartir y eligiendo "Copy".

**Nota**: Cuando pega gráficos en un panel visual o notebook, Datadog pega cada widget del grupo individualmente.

Para copiar varios widgets de un panel visual (solo en modo de edición), <kbd>Shift</kbd> + haga clic en los widgets y use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>.

**Nota**: Esto solo funciona al compartir dentro de Datadog. No genera una imagen de vista previa.

## Menús de gráficos de widgets {#widget-graph-menus}

Los menús de gráficos de widgets proporcionan opciones esenciales de interacción con los datos. Pase el cursor sobre un gráfico para acceder a las siguientes opciones de menú.

### View in full screen {#view-in-full-screen}

Visualice el gráfico en [modo de pantalla completa](#full-screen).

### Exportar {#export}

Haga clic en el icono de exportación de cualquier gráfico del dashboard para abrir un menú de opciones:

| Opción         | Descripción                               |
|----------------|-------------------------------------------|
| Copy           | Cree una copia del gráfico del dashboard.     |
| Share snapshot | Cree y envíe una instantánea de su gráfico. |

#### Use within Datadog {#use-within-datadog}

| Opción           | Descripción                                        |
|------------------|----------------------------------------------------|
| Declare incident | Declare un incidente desde el gráfico.                |
| Add to incident  | Agregue el gráfico a un incidente existente.             |
| Create case      | Cree una incidencia desde el gráfico.                      |
| Save to notebook | Guarde el gráfico en un notebook.                      |
| Link to widget   | Obtenga un enlace al widget copiado en el portapapeles. |

#### Share externally {#share-externally}

| Formato          | Descripción                        |
|-----------------|------------------------------------|
| Download as PNG | Descargue el widget en formato PNG. |
| Download as SVG | Descargue el widget en formato SVG. |
| Download as CSV | Descargue el widget en formato CSV. Consulte la sección [Exportar datos del widget a CSV](#export-widget-data-to-csv). |

### Edit {#edit}

Haga clic en el icono de lápiz de cualquier gráfico del dashboard para realizar ediciones.

### Opciones adicionales {#additional-options}

Haga clic en el menú contextual (tres puntos verticales) de cualquier gráfico del dashboard para abrir un menú de opciones:

| Opción                            | Descripción                                                                                                                |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Edit                              | Edite el gráfico.                                                                                                            |
| Clone                             | Cree una copia adyacente del gráfico.                                                                                      |
| Gráfico dividido                       | Cree un [gráfico dividido][10].                                                                                                |
| Create custom links               | Cree [enlaces personalizados](#custom-links).                                                                                      |
| Crear seguimiento                    | Cree un seguimiento preconfigurado con la consulta del gráfico.                                                                     |
| Información de métricas (solo gráficos de métricas) | Obtenga una descripción de las métricas en este gráfico. Puede hacer clic en los nombres de las métricas para abrirlos en la página Metric Summary. |
| Delete                            | Elimine el gráfico.                                                                                                          |

## Exportar datos del widget a CSV {#export-widget-data-to-csv}

Para descargar los datos subyacentes de un solo widget como un archivo CSV, haga clic en el icono de exportación del widget y seleccione {{< ui >}}Download as CSV{{< /ui >}}. También puede descargar datos CSV cuando visualiza el widget en [modo de pantalla completa](#full-screen).

La exportación a CSV está disponible para los siguientes tipos de widgets:

* Bar Chart
* Lista
* Pie Chart
* Scatter Plot
* Tabla
* Series temporales
* Lista principal
* Treemap

**Nota**: la exportación a CSV funciona en un widget a la vez. No puede exportar los datos de todos los widgets de un dashboard en un solo archivo.

La exportación a CSV está habilitada de forma predeterminada. Si {{< ui >}}Download as CSV{{< /ui >}} no aparece para un widget compatible, es posible que el soporte de Datadog haya deshabilitado la exportación a CSV para su organización. Esta restricción se aplica a todos los usuarios de la organización y a la exportación a CSV en otros productos de Datadog, así como en los widgets de los dashboards. No puede cambiar esta configuración desde la interfaz de usuario de Datadog. Para deshabilitar o volver a habilitar la exportación a CSV, comuníquese con [Datadog Support][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/timeseries/#full-screen
[2]: /es/dashboards/guide/context-links/
[3]: /es/dashboards/guide/unit-override
[4]: /es/dashboards/
[5]: /es/notebooks/
[6]: /es/tracing/services/service_page/
[7]: /es/tracing/services/resource_page/
[8]: /es/dashboards/guide/custom_time_frames/
[10]: /es/dashboards/widgets/split_graph/
[11]: /es/dashboards/sharing/widget_public_urls/
[12]: /es/help/