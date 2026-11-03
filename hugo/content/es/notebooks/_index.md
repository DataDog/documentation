---
aliases:
- /es/graphing/notebooks/
- /es/notebooks_new/
- /es/notebooks_legacy/
description: Cree documentos de texto enriquecido colaborativos con gráficos de Datadog
  en tiempo real para investigaciones, análisis post mortem, runbooks y narrativas
  basadas en datos.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: blog
  text: Administre y optimice sus costos de OCI con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: blog
  text: Cuente historias basadas en datos con Notebooks colaborativos
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: blog
  text: Mejores prácticas para redactar análisis post mortem de incidentes
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transforme y enriquezca sus registros con Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: blog
  text: Explore sus datos con Sheets, el editor DDSQL y Notebooks para análisis avanzados
    en Datadog
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: blog
  text: Cómo hemos creado una práctica de FinOps exitosa en Datadog
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centro de aprendizaje
  text: Introducción a los Notebooks
- link: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
  tag: Centro de aprendizaje
  text: Uso de Datadog Notebooks para informes centralizados
title: Notebooks
---
## Descripción general {#overview}

Los Notebooks son documentos de texto enriquecido colaborativos que le brindan todo el poder de los gráficos de Datadog. Varios usuarios pueden trabajar juntos para elaborar una investigación o un [análisis post mortem][8] que incluya datos en tiempo real de su incidente. Los Notebooks también son excelentes para runbooks y documentación que incluyen información real sobre sus sistemas junto con su contenido.

## Creación de un notebook {#creating-a-notebook}

Puede crear un notebook en dos lugares:

- Desde la barra de navegación izquierda, haga clic en {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}New Notebook{{< /ui >}}.
- En la esquina superior derecha de la [página de lista de Notebooks][1], haga clic en {{< ui >}}New Notebook{{< /ui >}}.

### Plantillas de notebook {#notebook-templates}

En la [Galería de plantillas][2], vea plantillas listas para usar a partir de las cuales puede crear nuevos notebooks. Las plantillas incluyen un Incident Response [postmortem][8], un informe de incidentes y una especificación de SLO. También puede crear una nueva plantilla personalizada para generar estructuras de notebook reutilizables.

## Edición de un notebook {#editing-a-notebook}

Los Notebooks ofrecen una experiencia de edición de texto enriquecido para crear y colaborar en contenido. Puede escribir y dar formato al texto libremente usando opciones de barra de herramientas y atajos de teclado conocidos (como negrita, cursiva, encabezados, listas y más) directamente en el editor.

Para los usuarios que prefieren los atajos, Notebooks también admite la sintaxis de Markdown. Por ejemplo, escribir `#` seguido de un espacio crea un encabezado, y usar tres acentos graves (<code>```</code>) inicia un bloque de código.

El contenido de texto se guarda automáticamente a medida que escribe. Para los gráficos incrustados, asegúrese de guardar sus cambios en el editor de gráficos para aplicarlos dentro del notebook.

### Tipos de contenido {#content-types}

Los Notebooks admiten varios tipos de contenido de texto enriquecido e incrustado, incluidos, entre otros:

- [Gráficos](#graphs-in-notebooks)
- Imágenes
- Encabezados (H1 - H3)
- Listas (listas con viñetas, listas numeradas y listas de verificación)
- Bloques de código
- Citas en bloque
- Celdas de Markdown

Para ver la lista completa, escriba <kbd>/</kbd> en un notebook.

### Gráficos en Notebooks {#graphs-in-notebooks}

Notebooks admiten todos los tipos de widgets. Para ver la lista completa, consulte [Widgets][3].

Pase el cursor sobre el widget para mostrar las opciones de edición y configuración de gráficos.

Para editar la consulta o configurar la visualización del gráfico, utilice la funcionalidad {{< ui >}}Quick Edit{{< /ui >}} para realizar la mayoría de los cambios en línea. Para una configuración más avanzada, haga clic en el icono del lápiz o mantenga presionada la tecla <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> y haga clic en el gráfico para abrir el editor de gráficos completo. Puede ajustar el marco de tiempo local o vincular el gráfico a la hora global del notebook haciendo clic en el icono del reloj.

Hay opciones de configuración de gráfico adicionales disponibles en el menú de tres puntos, según el tipo de gráfico:
- {{< ui >}}Graph size{{< /ui >}}: Ajuste la altura del gráfico seleccionando XS, S, M (predeterminado), L o XL.
- {{< ui >}}Graph legend{{< /ui >}}: Desmarque la casilla para ocultar la leyenda. Las leyendas se desactivan automáticamente para los gráficos XS y S.

### Funcionalidades de texto enriquecido {#rich-text-features}

Notebooks admiten funcionalidades de texto enriquecido de uso común como negrita, cursiva, código en línea y encabezados. Notebooks también admiten una variedad de tipos de listas, como viñetas, numeradas o listas de verificación.

| Funcionalidad       | Descripción                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Negrita**      | Para poner texto en negrita, selecciónelo y presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Cursiva*     | Para poner texto en cursiva, selecciónelo y presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | Para código en línea, escriba <code>`</code> al principio y al final del texto.                                          |
| Bloques de código    | Inserte un bloque de código escribiendo <code>```</code> y presionando <kbd>Enter</kbd>, o utilizando el menú de comandos de barra diagonal.           |
| Citas        | Inserte un bloque de cita escribiendo `>`, o utilizando el menú de comandos de barra diagonal.                                                    |
| Tablas de texto   | Inserte una tabla escribiendo `/table` o utilizando el menú {{< ui >}}Add Cell{{< /ui >}}.                                                          |
| Llamadas      | Inserte una llamada escribiendo `/table` o escribiendo `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT` o `!CAUTION` y luego presionando <kbd>Espacio</kbd>.   |

### Chips inteligentes {#smart-chips}

| Funcionalidad    | Descripción                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | Para mencionar a otro usuario, escriba `@` seguido de su nombre o dirección de correo electrónico. |
| `$TemplateVariable` | Escriba `$` seguido del nombre de su variable de plantilla existente. |
| `/date` | Agregue un chip de fecha escribiendo `/date`. Puede editar la fecha o la hora en la ventana emergente siempre que haga clic en el chip. ¡Pruebe también `/today` y `/now`! |

### Comandos de barra {#slash-commands}

Los comandos de barra son una interfaz para crear gráficos o insertar otro contenido. En una línea nueva, escriba `/` para abrir el menú de comandos de barra. Continúe escribiendo el nombre del tipo de contenido deseado y seleccione la opción adecuada.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Menú de comandos de barra que aparece cuando escribe / en un notebook" style="width:70%;" >}}

Cuando selecciona un tipo de gráfico, se abre el [editor de gráficos][3]. Después de hacer clic en {{< ui >}}Save{{< /ui >}}, el gráfico aparece en su notebook.

### Atajos de teclado {#keyboard-shortcuts}

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menú de atajos de teclado para Datadog Notebooks" style="width:70%;" >}}

En la esquina inferior izquierda de un notebook, haga clic en el icono de teclado para ver una lista de atajos de teclado para editar.

Además, puede usar los siguientes atajos para cortar y pegar widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Tabla de contenido {#table-of-contents}

Los Notebooks generan automáticamente una tabla de contenido a partir de cualquier encabezado o gráfico que inserte en su documento. Puede crear un encabezado usando el atajo de markdown `#` o seleccionando texto y haciendo clic en {{< ui >}}Header{{< /ui >}} en la barra de herramientas.

### Etiquetas de notebook {#notebook-tags}

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Opciones de etiqueta de notebook para marcar un notebook como favorito, agregar un equipo o agregar un tipo" style="width:80%;" >}}

| Acción de etiqueta                | Descripción                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Marcar un notebook como favorito**   | Marque un notebook como favorito para fijarlo en la parte superior de sus resultados en la página de Lista de Notebooks. Para alternar un notebook como favorito, haga clic en el icono de estrella en el encabezado del notebook.                                                                     |
| **Etiquetar por equipo**           | Etiquetar un notebook con un equipo le permite usarlo como filtro al buscar un notebook. Puede etiquetar un notebook con hasta 5 equipos. Para etiquetar un notebook, haga clic en la opción {{< ui >}}Team{{< /ui >}} en el encabezado del notebook y seleccione los equipos deseados. |
| **Etiquetar por tipo**           | Puede etiquetar sus notebooks con etiquetas de tipo para facilitar la búsqueda, como: Postmortem, Runbook, Investigación, Documentación, Informe. Para etiquetar un notebook, haga clic en {{< ui >}}Type{{< /ui >}} y seleccione un tipo.                                                     |

### Agregar imágenes a los notebooks {#add-images-to-notebooks}

<div class="alert alert-info">Solo se admiten los tipos de archivo PNG, JPG, JPEG y GIF. Las cargas tienen un tamaño máximo de archivo de 4MB.</a></div>

Puede agregar imágenes a su notebook usando `/image` o el menú {{< ui >}}Add Cell{{< /ui >}}. Esto proporciona opciones para cambiar el tamaño, alinear y agregar un título a la imagen. Las imágenes cargadas están alojadas en Datadog.

<!-- TODO Add updated image from new notebooks -->

Puede usar cualquiera de las siguientes opciones para cargar una imagen para que sea alojada por Datadog:
- Arrastre un archivo de imagen al área de carga
- Haga clic en {{< ui >}}Choose File{{< /ui >}} y busque la imagen en su directorio de archivos
- Pegue una URL de acceso público para la imagen

Haga clic en los iconos de la bandeja de acciones de la imagen para ajustar el tamaño, la alineación, añadir un pie de foto para la imagen o ver la imagen en modo de pantalla completa.


## Cómo añadir comentarios a un notebook {#adding-comments-to-a-notebook}

Puede añadir comentarios sobre el contenido en el cuerpo del notebook. Para comentar sobre un texto, resalte el texto y haga clic en el icono de comentario en la barra de herramientas.

<!-- TODO Add updated image from new notebooks -->

Para comentar sobre un gráfico o una imagen, haga clic en el icono de comentario a la derecha del gráfico.

| Funcionalidad                  | Descripción                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Cómo navegar a los comentarios** | Los comentarios guardados aparecen en el margen derecho del notebook. Haga clic en un resaltado de comentario en el texto para abrirlo en el margen, o haga clic en un comentario en el margen para desplazarse a su ubicación. |
| **Cómo responder a los comentarios** | Responda a los comentarios haciendo clic en ellos en el margen derecho, lo cual abre un cuadro de comentarios. Puede escribir texto, `@mention` a un usuario de Datadog, o resolver un comentario haciendo clic en {{< ui >}}Resolve{{< /ui >}}. |
| **Cómo enlazar a comentarios**    | Enlace a un comentario específico haciendo clic en el icono de enlace en la esquina superior derecha del comentario para copiar su enlace.      |
| **Cómo editar o eliminar comentarios** | Edite o elimine sus comentarios haciendo clic en el menú de puntos suspensivos en la esquina superior derecha del comentario.                 |
| **Notifications de comentarios** | De forma predeterminada, se envían Notifications por correo electrónico al autor del notebook para los nuevos comentarios de otros usuarios. Los usuarios en un hilo de comentarios reciben Notifications por cada respuesta. Para ajustar las Notifications, en el menú de engranaje, seleccione {{< ui >}}Notifications{{< /ui >}}. |

## Experiencia multijugador en Notebooks {#multiplayer-experience-in-notebooks}

Los notebooks admiten colaboración total, lo que permite que varios usuarios editen simultáneamente. Cuando un colaborador abre su notebook, su cursor aparece en tiempo real. Pase el cursor sobre un cursor para ver el nombre del colaborador.

<!-- TODO Add updated image from new notebooks -->

### Widgets {#widgets}

Cuando otro usuario está editando un widget, aparece un contorno alrededor del widget. Dado que los widgets se guardan con la política de "última escritura gana", evite editar un widget en el que otra persona esté trabajando.

<!-- TODO Add updated image from new notebooks -->

#### Presencia {#presence}

En la parte superior del notebook, puede ver las imágenes de avatar de todos los usuarios que están viendo el notebook actualmente. Pase el cursor sobre un avatar para ver el nombre del colaborador asociado.

<!-- TODO Add updated image from new notebooks -->

## Configuración de un notebook {#configuring-a-notebook}

### Variables de plantilla {#template-variables}

Los notebooks admiten variables de plantilla. Delimite dinámicamente las visualizaciones agregando y seleccionando valores de variables de plantilla. Para obtener más información, consulte [Variables de plantilla][5].

Una variable de plantilla cuya clave de etiqueta es `team` se representa como el filtro de equipo, con selección jerárquica y una lista combinada de Datadog Teams y valores de etiqueta `team`. Para obtener más información, consulte [Team filter][9].

<div class="alert alert-danger">Algunas funciones de Analysis tienen soporte limitado o nulo para variables de plantilla. Para obtener más información, consulte <a href="/notebooks/guide/template_variables_analysis_notebooks">Template Variable Support in Analysis Notebooks</a>.</div>

### Controles de tiempo {#time-controls}

De forma predeterminada, todos los gráficos están vinculados al marco de tiempo global establecido en el encabezado del notebook.

Para ver un marco de tiempo diferente, seleccione una opción en el selector de tiempo global o desplace el cursor directamente sobre un gráfico. La URL del notebook se actualiza para reflejar este nuevo marco de tiempo sin guardarlo en el notebook.

**Nota**: Hacer clic y arrastrar para acercar un gráfico no desbloquea el gráfico del tiempo global. En su lugar, cambia el tiempo global del notebook.

<!-- TODO Add updated image from new notebooks -->

Para guardar este tiempo como el predeterminado del notebook, haga clic en {{< ui >}}Set Default Time{{< /ui >}}. Para restablecer su tiempo global al tiempo global predeterminado guardado anteriormente, haga clic en el botón de restablecimiento.

Los gráficos individuales se pueden desvincular del tiempo global y configurar en un marco temporal independiente.

<!-- TODO Add updated image from new notebooks -->

Para ver un marco temporal diferente en un solo gráfico, edite el gráfico y use el interruptor para desvincularlo de Global Time. Cambie el marco temporal usando el selector de tiempo o arrastrando sobre el gráfico. Los cambios realizados en el modo de edición se guardan automáticamente cuando hace clic en {{< ui >}}Done{{< /ui >}}. Para descartar sus cambios, haga clic en {{< ui >}}Cancel{{< /ui >}} en lugar de {{< ui >}}Done{{< /ui >}}.

### Modos {#modes}

Puede cambiar entre modos desde el notebook seleccionando el menú desplegable en la parte superior derecha de su notebook.

- {{< ui >}}Editing{{< /ui >}}: Realice cambios en el notebook.
- {{< ui >}}Viewing{{< /ui >}}: El contenido es de solo lectura, lo que evita que los usuarios realicen ediciones no deseadas en las configuraciones y la información existentes.

### Historial de versiones {#version-history}

Desde un notebook, haga clic en el icono de engranaje y haga clic en {{< ui >}}Version history{{< /ui >}} para abrir el panel lateral del Historial de versiones. Puede obtener una vista previa, restaurar o clonar una versión anterior de su notebook. Para obtener más información, consulte la [guía del Historial de versiones][6].

### Instantáneas de gráficos {#graph-snapshots}

Los notebooks toman instantáneas automáticamente de los gráficos con rangos de tiempo fijos para preservar la vista antes de que se apliquen los límites de retención de datos. No se requiere configuración. Utilice el menú kebab junto a un gráfico para visualizar o descargar una instantánea.

{{< img src="notebooks/kebab_snapshots.png" alt="Opción del menú kebab para visualizar o descargar una instantánea" style="width:100%;">}}

Las instantáneas son imágenes estáticas de gráficos con un rango de tiempo fijo (por ejemplo, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Una instantánea se actualiza cuando se actualiza el gráfico, siempre que el gráfico continúe utilizando un rango de tiempo fijo. Cambiar el gráfico a un rango de tiempo global (por ejemplo, `Past 1 hour`) elimina la instantánea.

Puede obtener una vista previa del estado de la instantánea de un notebook pasando el cursor sobre el indicador de instantánea del gráfico debajo del título del notebook. La vista previa muestra la hora de la instantánea más reciente y la cantidad de instantáneas creadas.

{{< img src="notebooks/hover_graph_snapshots.png" alt="Indicador de instantánea que muestra cuántas instantáneas se han generado" style="width:100%;">}}

Cuando un notebook contiene un gráfico con datos que han superado sus límites de retención, el notebook muestra una instantánea integrada del gráfico. La instantánea es una imagen estática, pero se reemplaza si edita el gráfico subyacente.

### Permisos{#permissions}

De forma predeterminada, todos los usuarios tienen acceso completo a los notebooks.

Utilice nuestros controles de acceso para restringir el acceso de visualización y edición solo a usted mismo:
1. Mientras visualiza un notebook, haga clic en el botón {{< ui >}}Share{{< /ui >}} en la esquina superior derecha.
1. Seleccione {{< ui >}}Private to me{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Utilice controles de acceso granulares para limitar los [roles][7] que pueden editar un notebook en particular:
1. Mientras visualiza un notebook, haga clic en el botón {{< ui >}}Share{{< /ui >}} en la esquina superior derecha.
1. Seleccione {{< ui >}}Custom{{< /ui >}}.
1. Actualice el acceso de la Organización a {{< ui >}}Viewer{{< /ui >}} para revocar el acceso de edición al resto de la organización.
1. Use el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el notebook.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota:** Para mantener su acceso de edición al notebook, el sistema requiere que incluya al menos un rol del que usted sea miembro antes de guardar.

Usted debe tener acceso de edición para restaurar el acceso general a un notebook restringido. Complete los siguientes pasos:
1. Mientras visualiza un notebook, haga clic en el botón {{< ui >}}Share{{< /ui >}} en la esquina superior derecha.
1. Seleccione {{< ui >}}My Org{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Buscando Notebooks {#finding-notebooks}

La página [Notebooks Lista][1] es el lugar para encontrar todos sus Notebooks.

<!-- TODO Add updated image from new notebooks -->

### Buscar {#search}

El campo de búsqueda admite búsqueda de texto completo. Escriba su consulta para mostrar los Notebooks relevantes como resultados.

### Filtrado {#filtering}

Puede filtrar los Notebooks con los siguientes métodos:
| Tipo de filtro      | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| {{< ui >}}Author{{< /ui >}}       | Para filtrar por autor, seleccione el menú desplegable de autor e ingrese los nombres para filtrar. |
| {{< ui >}}Team{{< /ui >}}         | Para filtrar por equipo, seleccione el menú desplegable de equipo e ingrese los nombres de los equipos para filtrar. |
| {{< ui >}}Notebook Type{{< /ui >}}| Filtre por investigación, postmortem, runbook, informe o documentación.     |
| {{< ui >}}Modified Date{{< /ui >}}| Filtre según qué tan recientemente se editó un notebook usando el menú desplegable de fecha de modificación. |

También hay filtros rápidos para acceder a sus Notebooks y a los Notebooks etiquetados con sus equipos.

### Retome su trabajo {#jump-back-in}

Si no hay filtros habilitados, aparece la sección Jump Back In, que muestra los Notebooks más recientes que ha visto o editado.

<!-- TODO Add updated image from new notebooks -->

### Ordenar Notebooks {#sorting-notebooks}

Puede ordenar los Notebooks seleccionando los encabezados ⭐, details o modified para ordenar según esos valores.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/list?location=templates
[3]: /es/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /es/dashboards/template_variables/
[6]: /es/notebooks/guide/version_history
[7]: /es/account_management/rbac/
[8]: /es/incident_response/incident_management/post_incident/postmortems
[9]: /es/dashboards/template_variables/#team-filter