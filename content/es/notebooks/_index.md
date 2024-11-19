---
aliases:
- /es/graphing/notebooks/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/incident-management-templates-notebooks-list/
  tag: Blog
  text: Crear y consultar una biblioteca de documentación
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Crear artículos basados en datos con notebooks colaborativos
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Prácticas recomendadas para redactar informes de incidentes
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: Blog
  text: Transforma y mejora tus logs con pipelines de observabilidad de Datadog
title: Notebooks
---

## Información general

Los notebooks combinan gráficos y texto en un formato lineal con celdas. De esta forma, te permiten consultar y compartir artículos mediante la creación de informes, estudios, runbooks y otros documentos.

## Para empezar

1. En la página de la [lista de notebooks][1], haz clic en **+ New Notebook** (+ Nuevo notebook).

2. Haz clic en el botón **Save Notebook** (Guardar notebook). </br>
  **Nota**: De forma predeterminada, los notebooks nuevos no se guardan automáticamente.

3. Añade nuevas celdas a tu notebook con [gráficos y contenidos compatibles](#types-of-content).

4. [Configura las celdas](#cell-configuration).

## Colaboración

{{< img src="notebooks/collaboration.png" alt="Indicadores de los usuarios que están consultando un notebook y realizando cambios en vivo" style="width:100%;">}}

Los notebooks permiten la colaboración en tiempo real. Los indicadores de presencia te permiten ver quiénes están consultando un notebook en cualquier momento, además de las modificaciones en tiempo real de las celdas. Los cambios llevados a cabo en un notebook aparecen de forma automática, sin necesidad de actualizar.

Todos los miembros del equipo pueden abrirlos, pero sólo los usuarios de Datadog con el permiso `Notebooks Write` pueden modificarlos o eliminarlos.

### Comentarios

Para añadir un comentario, selecciona un texto o pasa el cursor sobre un gráfico. El icono **Add comment** (Añadir comentario) aparecerá a la derecha de la celda. Desde los comentarios, también puedes notificar a un miembro del equipo mediante la función`@mention`. Haz clic en los tres puntos verticales de la esquina superior derecha de un comentario que hayas escrito para editarlo o borrarlo. También puedes consultar o reabrir comentarios resueltos en el panel lateral Comment History (Historial de comentarios), al que podrás acceder desde el menú del engranaje del notebook.

Los creadores reciben notificaciones de correo electrónico cada vez que alguien publica comentarios en sus notebooks. A su vez, la persona que deja el comentario también los recibe cuando alguien le responde. Gestiona los parámetros de las notificaciones mediante `Notifications`, en el menú del engranaje.

### Tipo de vista

{{< img src="notebooks/read_mode.png" alt="Menú desplegable del tipo de vista" style="width:100%;">}}

Puedes elegir entre las distintas vistas del notebook seleccionando el menú desplegable en la parte superior derecha de tu notebook.

- **Editing** (Edición): para hacer cambios en el notebook.

- **Viewing** (Visualización): para consultar contenidos que son de sólo lectura y evitar que los usuarios hagan cambios no deseados en parámetros y datos.

- **Presenting** (Presentación): para compartir contenidos de forma que cada celda del notebook aparezca como una diapositiva. Este modo es compatible con interacciones gráficas como cuadros de información y leyendas.

## Compartir un notebook

Haz clic en el icono del engranaje en la parte superior derecha de un notebook para ver las opciones para compartir. Puedes exportarlo a PDF, Markdown y otros formatos compatibles con un editor de documentos.

Para copiar un notebook en un editor de documentos, haz clic en **Copy formatted contents** (Copiar contenidos con formato). Luego, pégalo en un editor de documentos como Google Docs o Microsoft Word para ver los contenidos, incluidos los gráficos, en su formato original.

### Importar o exportar un notebook en formato JSON

Utiliza **Export Notebook JSON** (Exportar notebook en formato JSON) para descargar un archivo JSON que contiene la definición de tu notebook. Con **Import Notebook JSON** (Importar notebook en formato JSON) se sobreescribe el contenido del notebook con el contenido del archivo JSON cargado.

### Enlace a celdas individuales

Para copiar la URL de una celda específica, haz clic en el menú **Share** (Compartir) de la celda y selecciona **Link directly to cell** (Vincular directamente a celda). La vinculación directa está disponible tanto para las celdas de visualización como para las celdas Markdown.

Cuando un usuario visita la URL de una celda específica, el notebook se abre y muestra la celda en la parte superior de la ventanilla. Los enlaces son absolutos. La URL de una celda no varía incluso si se la cambia de sitio dentro del notebook. 

## Añadir imágenes a notebooks

<div class="alert alert-info">Solo se admiten los tipos de archivo PNG, JPG, JPEG y GIF. El tamaño máximo de los archivos es de 4 MB.</a></div>

Puedes añadir imágenes a tu notebook mediante la [celda de imagen](#image-cell) o el [editor de Markdown](#markdown-editor).

### Celda de imagen

Este método coloca la imagen en una celda separada del texto y ofrece opciones para redimensionar, alinear y titular la imagen. Las imágenes cargadas por la celda de imagen se alojan en Datadog.

Para añadir una imagen, haz clic en la opción de celda **Image** (Imagen) del menú **Add New Cell** (Añadir nueva celda).

{{< img src="notebooks/image_cell.png" alt="Celda de imagen en el menú de celdas Añadir nueva celda" style="width:70%;" >}}

Puedes utilizar cualquiera de las siguientes opciones para subir una imagen que se alojará en Datadog:
- Coloca un archivo de imagen en el área de carga
- Haz clic en **Choose File** (Seleccionar archivo) y localiza la imagen en tu directorio de archivos
- Pega una URL de acceso público para la imagen

Haz clic en los iconos de la bandeja de acciones de la celda para ajustar el tamaño, la alineación, añadir una leyenda para la celda de la imagen o ver la imagen en modo de pantalla completa.

{{< img src="notebooks/notebooks_image_edit_action_tray.png" alt="Bandeja de acciones de la celda para ajustar la alineación de la imagen y añadir una leyenda" style="width:70%;" >}}

### Editor de Markdown

Este método coloca la imagen en línea con el texto, pero no ofrece opciones para cambiar el tamaño de la imagen.

Accede al modo de edición en cualquier celda de Markdown y utiliza cualquiera de las siguientes opciones para añadir la imagen:
- Coloca un archivo de imagen en el área de celdas de texto.
- Copia y pega la imagen directamente en el área de la celda de texto.
- Hipervincula una imagen externa mediante el widget de la imagen en el encabezado o haciendo referencia a la [guía oficial de Markdown][2]. **Nota**: Esta opción no carga la imagen que se alojará en Datadog. 

Puedes previsualizar la imagen en pestaña de vista previa antes de guardarla en tu notebook.

## Lista de notebooks

{{< img src="notebooks/notebook_list.png" alt="Lista de notebooks con la vista previa de los tipos de celdas de un notebook seleccionado" style="width:100%;">}}

La [lista de notebooks][1] te permite ver y buscar notebooks creados anteriormente. Se muestra el nombre, el creador y la fecha de la última modificación de cada notebook. Los notebooks se agrupan por:

* **Your notebooks** (Tus notebooks): notebooks que has creado.
* **All Notebooks** (Todos los notebooks): todos los notebooks de tu organización.
* **[Notebook Type (Tipo de notebook)](#notebook-types)**: agrupa los notebooks por tipo.

Pasa el cursor sobre el icono de vista previa en cualquier notebook para ver los contenidos, incluidos los de tipo widget y Markdown. Para abrir el notebook en [modo de visualización](#view-mode), pasa el cursor sobre el notebook y haz clic en **Open notebook in view mode** (Abrir notebook en modo de visualización) a la derecha.

## Galería de plantillas
En la [galería de plantillas][3], puedes obtener plantillas listas para usar a partir de las que puedes crear notebooks. Estas plantillas incluyen un informe retrospectivo de la respuesta ante incidencias, un informe de incidencias y una especificación de SLO. También puedes crear una nueva plantilla personalizada para generar estructuras de notebook reutilizables.

## Historial de versiones
Desde un notebook, haz clic en el icono **Configure** (Configurar) y haz clic en **Version history** (Historial de versiones) para abrir el panel lateral Historial de versiones. Puedes previsualizar, restaurar o clonar el historial de versiones de tu notebook. Para más información, consulta la [Guía del historial de versiones][4].

## Configuración del notebook

### Periodos de tiempo

De forma predeterminada, todas las celdas con gráficos están vinculadas al periodo de tiempo que se define en el encabezado del notebook.

Para ver un periodo diferente, elige otra opción en el selector. También puedes arrastrar en el gráfico directamente. La URL se actualizará para reflejar el nuevo periodo de tiempo sin guardarlo en el notebook.

**Nota**: Hacer clic y arrastrar para hacer zoom en un gráfico no desvincula la celda del periodo global, cambia el periodo global del notebook.

{{< img src="notebooks/set_default_time.png" alt="Guardar el periodo global del notebook con el botón Set Default Time" style="width:100%;">}}

Para guardar el periodo elegido como el predeterminado del notebook, haz clic en  **Set Default Time** (Definir periodo por omisión). Para restablecer el periodo al global que tuvieras guardado de forma predeterminada, haz clic en el botón de restablecimiento.

Las celdas individuales pueden desvincularse del periodo global y asociarse a un periodo de tiempo concreto.

{{< img src="notebooks/cell_time.png" alt="Selector de periodos de tiempo para celdas con la celda desvinculada del periodo global" style="width:100%;">}}

Para ver un periodo de tiempo diferente en una sola celda, edítala y utiliza el conmutador para desvincularla del periodo global. Cambia el periodo utilizando el selector o arrastrando el gráfico. Los cambios que se hacen en modo de edición se guardan automáticamente cuando pulsas **Done** (Listo). Si lo que quieres es descartarlos, haz clic en **Cancel** (Cancelar).

### Tipos de notebooks

{{< img src="notebooks/add_notebook_type.png" alt="Botón Add Type (Añadir tipo) destacado en un notebook" style="width:100%;">}}

Los notebooks pueden agruparse en tipos, lo que te permite acceder rápidamente a la información relevante. Si se crean a partir de otros productos como gestión de incidencias o monitores, se les asigna un tipo automáticamente. Pasa el cursor sobre el título para que se muestre la opción para añadirlo o editarlo. Para añadir un tipo haz clic en **+ Add Type** y, si lo que quieres es editarlo, haz clic en el icono del lápiz que aparece al lado cuando pasas el cursor por encima.

### Snapshots gráficas

Puedes configurar tus notebooks para que capturen snapshots de gráficos que podrían dejar de estar disponibles pronto de forma automática. Activa esta función haciendo clic en **Turn on snapshots** (Activar snapshots) en el menú del engranaje de cualquier notebook. También puedes utilizar este menú para ver tus snapshots y desactivar las automáticas. Recuerda que tendrás que desactivar la función para retirar el acceso a las snapshots que ya tengas.

{{< img src="notebooks/cog_snapshots.png" alt="Opción del menú del engranaje para activar las snapshots" style="width:100%;">}}

 Los notebooks que tengan la función de toma de snapshots automática activa capturan una imagen estática de los gráficos para un periodo de tiempo determinado (por ejemplo, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Estas snapshots se actualizan cuando el gráfico se modifica, siempre y cuando el nuevo gráfico también tenga vinculado un periodo de tiempo determinado. Si cambias el periodo de tiempo del gráfico a global (por ejemplo `Past 1 Hour`), la snapshot se eliminará. 

Para previsualizar una snapshot en un gráfico vinculado a un periodo de tiempo concreto, basta con pasar el ratón sobre el icono de la cámara mientras estás en modo de edición.

Si quieres compartir una versión de tu notebook con snapshots, desde el menú del engranaje, haz clic en **View snapshots** (Ver snapshots). Copia la URL o anexa `&view=snapshots` a la URL de cualquier notebook que tenga la función de snapshot activada.

### Variables de plantilla

Los notebooks aceptan variables de plantilla. Recorre las visualizaciones de forma dinámica añadiendo y seleccionando valores de variables de plantilla. Para obtener más información, consulta [Variables de plantilla][5].

### Configuración de las celdas

Para añadir celdas, usa el botón **+** que aparece a la izquierda de la celda o selecciona una opción de la sección **Add New Cell** (Añadir celda nueva) de la parte inferior del notebook. Usa la bandeja de acciones que aparece sobre la celda cuando pasas el cursor por encima para compartir, clonar o borrar celdas. Las celdas gráficas pueden exportarse a un dashboard o descargarse como PNG o CSV de datos gráficos. Los cambios que hagas en el modo de edición se guardan automáticamente al pulsar **Done** (Listo). Si quieres descartarlos, haz clic en **Cancel** (Cancelar).

#### Opciones de edición

Haz clic en **More options** (Más opciones) en el editor integrado de un widget para editar las opciones del widget. Añade detalles como superposiciones de eventos, marcadores y controles del eje Y. 

#### Opciones de diseño

En una celda de un notebook, haz clic en **Edit** (Editar) para ver la configuración de la celda en el modo de edición. También puedes ver las opciones de diseño disponibles, que varían en función del tipo de contenido de la celda. Tienes algunos ejemplos a continuación:

* **Graph size** (Tamaño del gráfico): elige entre `XS`, `S`, `M` (por omisión), `L` y `XL`.
* **Graph legend** (Leyenda del gráfico): desmarca la casilla para ocultar la leyenda. Las leyendas se desactivan automáticamente para los gráficos `XS` y `S`.
* **Grouping** (Grupos): muestra un gráfico por valor de etiqueta (tag) para ver pequeños múltiplos de tu visualización.

{{< img src="notebooks/edit_cell_action_menu.png" alt="Parámetros gráficos de una celda de un notebook en modo de edición que muestran las opciones de tamaño, leyenda y agrupación" style="width:100%;">}}

**Nota**: Cambiar alguno de estos parámetros solo afectará a la celda seleccionada.

#### Tipos de contenido

Los notebooks aceptan celdas de visualización y de texto. Las celdas de texto tienen formato [Markdown][6], lo que permite usar encabezados, subencabezados, enlaces, imágenes, listas y bloques de código. También aceptan diagramas con formato [MermaidJS][6].

Los gráficos en notebooks son compatibles con todos los orígenes de datos de Datadog: métricas, eventos de logs, tráfico de redes, eventos RUM, métricas de elaboración de perfiles, señales de seguridad, etc. Los gráficos se crean con el editor de consultas de Datadog. Notebook acepta: 

* [Texto][8]
* [Imágenes](#add-images-to-cells)
* [Series temporales][9]
* [Lista principal][10]
* [Tabla][11]
* [Valor de la consulta][12]
* [Mapa de calor][13]
* [Distribución][14]
* [Lista][15]
* [Perfilado de la gráfica de llamas][16]
* [Embudo][17]
* [Torta][18]
* [Mapa de árboles][16]
* [Mapa geográfico][19]
* [SLO][20]

### Limitar el acceso de edición

Por omisión, todos los usuarios tienen acceso completo a notebooks.

Utiliza controles de acceso detallados para limitar los [roles][21] que pueden editar un determinado notebook:
1. Cuando consultes un notebook, haz clic en el engranaje que aparece en la parte superior derecha. Se abrirá el menú de configuración.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar uno o varios roles, equipos o usuarios que pueden modificar el notebook.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

**Nota:** Para mantener tu acceso de edición al notebook, el sistema necesita que incluyas al menos un rol al que pertenezcas antes de guardar.

Para restablecer el acceso general a un notebook con acceso restringido, sigue estos pasos:
1. Cuando consultes un notebook, haz clic en el engranaje que aparece en la parte superior derecha. Se abrirá el menú de configuración.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Guardar**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://www.markdownguide.org/basic-syntax/#images-1
[3]: https://app.datadoghq.com/notebook/template-gallery
[4]: /es/notebooks/guide/version_history
[5]: /es/dashboards/template_variables/
[6]: https://daringfireball.net/projects/markdown/
[7]: https://mermaid.js.org/
[8]: /es/dashboards/widgets/free_text/
[9]: /es/dashboards/widgets/timeseries/
[10]: /es/dashboards/widgets/top_list/
[11]: /es/dashboards/widgets/table/
[12]: /es/dashboards/widgets/query_value/
[13]: /es/dashboards/widgets/heatmap/
[14]: /es/dashboards/widgets/distribution/
[15]: /es/dashboards/widgets/list/
[16]: /es/dashboards/widgets/treemap/
[17]: /es/dashboards/widgets/funnel/
[18]: /es/dashboards/widgets/pie_chart/
[19]: /es/dashboards/widgets/geomap/
[20]: /es/dashboards/widgets/slo/
[21]: /es/account_management/rbac/