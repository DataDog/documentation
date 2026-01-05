---
aliases:
- /es/graphing/notebooks/
- /es/notebooks_new/
- /es/notebooks_legacy/
description: Crea documentos de texto enriquecido en colaboración con gráficos en
  directo en Datadog para investigaciones, análisis retrospectivos, runbooks y narraciones
  basadas en datos.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gestiona y optimiza tus costes de OCI con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Crear artículos basados en datos con notebooks colaborativos
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Prácticas recomendadas para redactar informes retrospectivos de incidencias
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transformar y enriquecer tus logs con Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorar tus datos con Shettes, DDSQL Editor y Notebooks para análisis avanzados
    en Datadog
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica de FinOps de éxito en Datadog
title: Notebooks
---

## Información general

Los notebooks son documentos colaborativos de texto enriquecido que ofrecen todo el poder de los gráficos de Datadog. Varios usuarios pueden trabajar juntos en la elaboración de una investigación o un análisis retrospectivo con datos de incidentes en tiempo real. Los notebooks también son perfectos para los libros de ejecución y la documentación, ya que ofrecen información real de tus sistemas junto con su contenido.

## Creación de un notebook

Puedes crear un notebook en dos lugares:

- En la barra de navegación de la izquierda, haz clic en **Dashboards > New Notebook** (Dashboard > Nuevo notebook).
- En la esquina superior derecha de la [página de la lista de notebooks][1], haz clic en **New Notebook** (Nuevo notebook).

### Plantillas de notebook

En la [galería de plantillas][2], puedes obtener plantillas listas para utilizar a partir de las que puedes crear notebooks. Estas plantillas incluyen un informe retrospectivo de la respuesta ante incidentes, un informe de incidentes y una especificación de SLO. También puedes crear una nueva plantilla personalizada para generar estructuras de notebook reutilizables.

## Edición de un notebook

Los notebooks ofrecen una rica experiencia de edición de texto para crear contenidos y colaborar en ellos. Puedes escribir y dar formato al texto con total libertad utilizando las opciones de la barra de herramientas y los métodos abreviados de teclado (negrita, cursiva, encabezados, listas, etc.) directamente en el editor.

Para los usuarios que prefieren los atajos, los notebooks también admiten la sintaxis Markdown. Por ejemplo, si se escribe `#` seguido de un espacio, se crea una cabecera, y si se utilizan tres puntos suspensivos<code>(```</code>), se inicia un bloque de código.

El contenido del texto se guarda automáticamente a medida que se escribe. En el caso de los gráficos incrustados, asegúrate de guardar los cambios en el editor de gráficos para aplicarlos en el notebook.

### Tipos de contenido

Los notebooks admiten varios tipos de contenido de texto enriquecido e incrustado, entre otros:

- [Gráficos](#graphs-in-notebooks)
- Imágenes
- Cabeceras (H1 - H3)
- Listas (listas con viñetas, listas numeradas y listas de verificación)
- Bloques de código
- Citas en bloque
- Celdas Markdown

Para ver la lista completa, escribe <kbd>/</kbd> en un notebook.

### Gráficos en notebooks

Los notebooks admiten todos los tipos de widgets. Para ver la lista completa, consulta [Widgets][3].

Pasa el ratón por encima del widget para ver las opciones de edición y configuración de los gráficos.

Para editar la consulta o configurar la visualización del gráfico, utiliza la función **Edición rápida** para realizar la mayoría de los cambios en línea. Para una configuración más avanzada, haz clic en el icono del lápiz o mantén pulsada la tecla <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> y haz clic en el gráfico para abrir el editor de gráficos completo. Puedes ajustar el marco temporal local o vincular el gráfico a la hora global del notebook haciendo clic en el icono del reloj.

En el menú de tres puntos se puede acceder a otras opciones de configuración de gráficos, dependiendo del tipo de gráfico:
- **Tamaño del gráfico**: Ajusta la altura del gráfico seleccionando XS, S, M (por defecto), L o XL.
- **Leyenda del gráfico**: Desmarca la casilla para ocultar la leyenda. Las leyendas se desactivan automáticamente en los gráficos XS y S.

### Funciones de texto enriquecido

Los notebooks admiten funciones de texto enriquecido de uso común como negrita, cursiva, código en línea y cabeceras. Los notebooks también admite diversos tipos de listas como viñetas, numeradas o de verificación. 

| Función       | Descripción                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Negrita**      | Para poner un texto en negrita, selecciónalo y pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Cursiva*     | Para poner un texto en cursiva, selecciónalo y pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | Para el código en línea, escribe <code>`</code> al principio y al final del texto.                                          |
| Bloques de código    | Inserta un bloque de código escribiendo <code>```</code> y pulsando <kbd>Intro</kbd> o utilizando el menú de comandos de barra.           |
| Comillas        | Inserta un bloque de comillas escribiendo `>` o utilizando el menú de comandos de barra.                                                    |
| Tablas de texto   | Inserta una tabla escribiendo `/table` o utilizando el menú **Añadir celda**.                                                          |
| Llamadas      | Inserta una llamada escribiendo `/table` o escribiendo `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT` o `!CAUTION` y pulsando <kbd>la barra espaciadora</kbd>.   |

### Fichas inteligentes

| Función    | Descripción                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | Para mencionar a otro usuario, escribe `@` seguido de su nombre o dirección de correo electrónico. |
| `$TemplateVariable` | Escribe `$` seguido del nombre de tu variable de plantilla existente. |
| `/date` | Añade una ficha de fecha escribiendo `/date`. Puedes editar la fecha o la hora en la ventana emergente cada vez que hagas clic en la ficha. Haz la prueba `/today` y `/now`. |

### Comandos de barra

Los comandos de barra son una interfaz para crear gráficos o insertar otros contenidos. En una nueva línea, escribe `/` para abrir el menú de comandos de barra. Sigue escribiendo el nombre del tipo de contenido deseado y selecciona la opción adecuada.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Menú de comandos de barra que aparece cuando escribes / en un notebook" style="width:70%;" >}}

Al seleccionar un tipo de gráfico, se abre el [editor de gráficos][3]. Al hacer clic en **Save** (Guardar), el gráfico aparece en tu notebook.

### Atajos de teclado

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menú de atajos de teclado para notebooks de Datadog" style="width:70%;" >}}

En la esquina inferior izquierda de un notebook, haz clic en el icono del teclado para ver una lista de atajos de teclado para la edición.

Además, puedes utilizar los siguientes atajos para cortar y pegar widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Índice 

Los notebooks generan automáticamente una tabla de contenidos a partir de cualquier encabezado o gráfico que insertes en tu documento. Puedes crear un encabezado utilizando el atajo Markdown `#` o seleccionando texto y haciendo clic en **Header** (Encabezado) en la barra de herramientas.

### Etiquetas (tags) de notebooks

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Opciones de etiquetado para notebooks, para marcar un notebook como favorita, añadir un equipo o añadir un tipo" style="width:80%;" >}}

| Acción de etiquetado                | Descripción                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Marcar un notebook como favorito**   | Marca un notebook como favorito para fijarlo en la parte superior de tus resultados en la página de la lista de notebooks. Para marcar un notebook como favorito, haz clic en el icono de la estrella que aparece en la cabecera del notebook.                                                                     |
| **Etiquetar por equipo**           | Etiquetar un notebook con un equipo te permite utilizarlo como filtro cuando buscas un notebook. Puedes etiquetar un notebook con hasta 5 equipos. Para etiquetar un notebook, haz clic en la opción **Team** (Equipo) en la cabecera del notebook y selecciona los equipos deseados. |
| **Etiquetar por tipo**           | Para facilitar la búsqueda, puedes etiquetar tus notebooks con etiquetas de tipo, como: Postmortem, Runbook, Investigation, Documentation, Report. Para etiquetar un notebook, haz clic en **Type** (Tipo) y selecciona un tipo.                                                     |

### Añadir imágenes a notebooks

<div class="alert alert-info">Solo se admiten los tipos de archivo PNG, JPG, JPEG y GIF. El tamaño máximo de los archivos es de 4 MB.</a></div>

Puedes añadir imágenes a tu notebook utilizando `/image` o el menú **Añadir celda**. Esta acción proporciona opciones para redimensionar, alinear y subtitular la imagen. Las imágenes cargadas se alojan en Datadog.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Puedes utilizar cualquiera de las siguientes opciones para subir una imagen que se alojará en Datadog:
- Coloca un archivo de imagen en el área de carga
- Haz clic en **Choose File** (Seleccionar archivo) y localiza la imagen en tu directorio de archivos
- Pega una URL de acceso público para la imagen

Haz clic en los iconos de la bandeja de imágenes acción para ajustar el tamaño, la alineación, añadir un subtítulo a la imagen o verla en pantalla completa.


## Añadir comentarios a un notebook

Puedes añadir comentarios sobre el contenido en el cuerpo del notebook. Para comentar un texto, resáltalo y haz clic en el icono de comentario de la barra de herramientas. 

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para comentar un gráfico o una imagen, haz clic en el icono de comentario situado a la derecha del gráfico.

| Función                  | Descripción                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Ir a los comentarios** | Los comentarios guardados aparecen en el margen derecho del notebook. Haz clic en un comentario resaltado en el texto para abrirlo en el margen o haz clic en un comentario en el margen para desplazarte hasta su ubicación. |
| **Responder a los comentarios** | Responde a los comentarios haciendo clic en ellos en el margen derecho, lo que abre un cuadro de comentarios. Puedes escribir texto, `@mention` un usuario de Datadog o resolver un comentario haciendo clic en **Resolve** (Resolver). |
| **Crear enlaces a comentarios**    | Crea un enlace a un comentario específico haciendo clic en el icono del enlace situado en la esquina superior derecha del comentario para copiar su enlace.      |
| **Editar o eliminar comentarios** | Edita o elimina tus comentarios haciendo clic en el menú de tres puntos situado en la esquina superior derecha del comentario.                 |
| **Comentar notificaciones** | Por defecto, las notificaciones por correo electrónico se envían al autor del notebook para obtener nuevos comentarios de los demás. Los usuarios de un hilo de comentarios reciben las notificaciones de cada respuesta. Para ajustar las notificaciones, en el menú del engranaje selecciona **Notifications** (Notificaciones). |

## Experiencia multi-usuario en notebooks

Los notebooks son totalmente colaborativos, lo que permite que varios usuarios editen simultáneamente. Cuando un colaborador abre tu notebook, su cursor aparece en tiempo real. Pasa el cursor por encima para ver el nombre del colaborador.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

### Widgets

Cuando otro usuario está editando un widget, aparece un contorno alrededor del widget. Como los widgets se guardan como escrituras recientes, evita editar un widget en el que esté trabajando otra persona.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

#### Presencia

En la parte superior del notebook, puedes ver las imágenes de los avatares de todos los usuarios que están visualizando el notebook. Pasa el ratón por encima de un avatar para ver el nombre del colaborador asociado.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

## Configuración de un notebook

### Variables de plantilla

Los notebooks aceptan variables de plantilla. Recorre las visualizaciones de forma dinámica añadiendo y seleccionando valores de variables de plantilla. Para obtener más información, consulta [Variables de plantilla][5].

<div class="alert alert-danger">Algunas funciones de Análisis tienen un soporte limitado o nulo para las variables de plantilla. Para obtener más información, consulta <a href="/notebooks/guide/template_variables_analysis_notebooks">Compatibilidad con variables de plantilla en Analysis Notebooks</a>.</div>

### Controles de tiempo

Por defecto, todos los gráficos están vinculados al marco temporal global definido en la cabecera del notebook.

Para ver un marco temporal diferente, selecciona una opción en el selector de tiempo global o desplázate directamente sobre un gráfico. La URL del notebook se actualiza para reflejar este nuevo marco temporal sin guardarlo en el notebook.

**Nota**: Al hacer clic y arrastrar para ampliar un gráfico no se desbloquea el gráfico de la hora global, sino que se cambia la hora global del notebook.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para guardar el periodo elegido como el predeterminado del notebook, haz clic en  **Set Default Time** (Definir periodo por omisión). Para restablecer el periodo al global que tuvieras guardado de forma predeterminada, haz clic en el botón de restablecimiento.

Los gráficos individuales pueden desvincularse de la hora global y ajustarse a un marco temporal independiente.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para ver un marco temporal diferente en un solo gráfico, edita el gráfico y utiliza el conmutador para desvincularlo de la hora global. Cambia el marco temporal utilizando el selector de tiempo o desplazándote por el gráfico. Los cambios realizados en el modo de edición se guardan automáticamente al hacer clic en **Done** (Listo). Para descartar los cambios, haz clic en **Cancel** (Cancelar) en lugar de en **Done** (Listo).

### Modos

Puedes cambiar de un modo a otro en el propio notebook. seleccionando el menú desplegable situado en la parte superior derecha del notebook.

- **Edición**: Realizar cambios en el notebook.
- **Visualización**: Los contenidos son de solo lectura, lo que evita que los usuarios realicen ediciones no deseadas en las configuraciones e información existentes.

### Historial de versiones

Desde el notebook, haz clic en el icono de engranaje y en **Version history** (Historial de versiones) para abrir el panel lateral del historial de versiones. Puedes previsualizar, restaurar o clonar una versión anterior de tu notebook. Para obtener más información, consulta la [guía del historial de versiones][6].

### Snapshots gráficas

Puedes configurar tus notebooks para que capturen snapshots de gráficos que podrían dejar de estar disponibles pronto de forma automática. Activa esta función haciendo clic en **Turn on snapshots** (Activar snapshots) en el menú del engranaje de cualquier notebook. También puedes utilizar este menú para ver tus snapshots y desactivar las automáticas. Recuerda que tendrás que desactivar la función para retirar el acceso a las snapshots que ya tengas.

{{< img src="notebooks/cog_snapshots.png" alt="Opción del menú del engranaje para activar las snapshots" style="width:100%;">}}

 Los notebooks que tengan la función de toma de snapshots automática activa capturan una imagen estática de los gráficos para un periodo de tiempo determinado (por ejemplo, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Estas snapshots se actualizan cuando el gráfico se modifica, siempre y cuando el nuevo gráfico también tenga vinculado un periodo de tiempo determinado. Si cambias el periodo de tiempo del gráfico a global (por ejemplo `Past 1 Hour`), la snapshot se eliminará. 

Puedes previsualizar el snapshot existente en cualquier gráfico de tiempo fijo pasando el ratón por encima del icono de la cámara mientras estás en modo edición.

Si quieres compartir una versión de tu notebook con snapshots, desde el menú del engranaje, haz clic en **View snapshots** (Ver snapshots). Copia la URL o anexa `&view=snapshots` a la URL de cualquier notebook que tenga la función de snapshot activada.

### Permisos

Por omisión, todos los usuarios tienen acceso completo a notebooks.

Utiliza los controles de acceso granular para limitar los [roles][7] que pueden editar un notebook concreto:
1. Cuando consultes un notebook, haz clic en el engranaje que aparece en la parte superior derecha. Se abrirá el menú de configuración.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar uno o varios roles, equipos o usuarios que pueden modificar el notebook.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

**Nota:** Para mantener tu acceso de edición al notebook, el sistema necesita que incluyas al menos un rol al que pertenezcas antes de guardar.

Debes tener acceso de edición para restaurar el acceso general a un notebook restringido. Realiza los siguientes pasos:
1. Cuando consultes un notebook, haz clic en el engranaje que aparece en la parte superior derecha. Se abrirá el menú de configuración.
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

## Buscar notebooks

La [página de la lista de notebooks][1] es el lugar donde encontrarás todos tus notebooks.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

### Búsqueda

El campo de búsqueda admite la búsqueda de texto completo. Escribe tu consulta para ver los notebook relevantes como resultados.

### Filtrado

Puedes filtrar notebooks con los siguientes métodos:
| Tipo de filtro | Descripción |
|------------------|------------------------------------------------------------------------------------------------------------------|
| **Autor** | Para filtrar por autor, selecciona el menú desplegable de autores e introduce los nombres por los que quieres filtrar. |
| **Equipo** |  Para filtrar por equipo, selecciona el menú desplegable de equipos e introduce los nombres por los que quieres filtrar. |
| **Tipo de notebook**| Filtra por investigación, análisis retrospectivo, guía, informe o documentación. |
| **Fecha de modificación**| Filtra en función de la fecha de edición reciente de un notebook, utilizando el desplegable de fechas de modificación. |

También existen filtros rápidos para acceder a tus notebooks y a los notebooks etiquetados con tus equipos.

### Acceso rápido

Si no hay filtros activados, aparece la sección Acceso rápido, que muestra los notebooks más recientes que visualizaste o editaste.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

### Clasificación de notebooks

Puedes clasificar notebooks seleccionando la ⭐, los detalles o las cabeceras modificadas para clasificar por estos valores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/template-gallery
[3]: /es/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /es/dashboards/template_variables/
[6]: /es/notebooks/guide/version_history
[7]: /es/account_management/rbac/