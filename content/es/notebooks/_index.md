---
aliases:
- /es/graphing/notebooks/
- /es/notebooks_new/
- /es/notebooks_legacy/
further_reading:
- link: https://www.datadoghq.com/blog/incident-response-templates-notebooks-list/
  tag: Blog
  text: Crear y consultar una biblioteca de documentación
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Crear artículos basados en datos con notebooks colaborativos
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Prácticas recomendadas para redactar informes retrospectivos de incidencias
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: Blog
  text: Transformar y enriquecer tus logs con Datadog Observability Pipelines
title: Notebooks
---

## Información general

Los notebooks son editores de texto colaborativos que proporcionan toda la potencia de los gráficos de Datadog a tus documentos. Varios usuarios pueden trabajar juntos para elaborar una investigación o un análisis retrospectivo con datos en tiempo real del incidente. Los notebooks también son ideales para guías y documentación, ya que ofrecen información real de tus sistemas junto con tus contenidos.

## Creación de un notebook

Puedes crear un notebook en dos lugares:

- En la barra de navegación de la izquierda, haz clic en **Dashboards > New Notebook** (Dashboard > Nuevo notebook).
- En la esquina superior derecha de la [página de la lista de notebooks][1], haz clic en **New Notebook** (Nuevo notebook).

### Plantillas de notebook

En la [galería de plantillas][2], puedes obtener plantillas listas para utilizar a partir de las que puedes crear notebooks. Estas plantillas incluyen un informe retrospectivo de la respuesta ante incidentes, un informe de incidentes y una especificación de SLO. También puedes crear una nueva plantilla personalizada para generar estructuras de notebook reutilizables.

## Edición de un notebook

Con los notebooks, puedes empezar a escribir utilizando atajos de markdown, como `#`, para las cabeceras, o <code>```</code>, para los bloques de código. Los notebooks guardan automáticamente tu contenido de texto a medida que escribes. En el caso de los gráficos, guarda todas las ediciones en el editor de gráficos para que el widget se guarde en el notebook.

### Tipos de celdas
Los notebooks admiten varios tipos de células, entre las que se incluyen:
- [Gráficos](#graphs-in-notebooks)
- Imágenes
- Cabeceras (H1 - H3)
- Listas (listas con viñetas, listas numeradas y listas de verificación)
- Bloques de código
- Comillas
- [Markdown](#markdown-cells)

Para ver la lista completa, escribe <kbd>/</kbd> en un notebook.

### Gráficos en notebooks

Los notebooks admiten todos los tipos de widgets. Para ver la lista completa, consulta [Widgets][3].

En una celda de un gráfico del notebook, pasa el ratón por encima del widget para ver las opciones de edición y configuración del gráfico.

Para editar la consulta o configurar la visualización del gráfico, haz clic en el icono del lápiz o mantén pulsada la tecla <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> y haz clic en el gráfico para abrir el editor de gráficos completo. Puedes ajustar el periodo de tiempo local o vincular el gráfico a la hora global del notebook haciendo clic en el icono del reloj.

En el menú de tres puntos se puede acceder a otras opciones de configuración de gráficos, dependiendo del tipo de gráfico:
- **Tamaño del gráfico**: Ajusta la altura del gráfico seleccionando XS, S, M (por defecto), L o XL.
- **Leyenda del gráfico**: Desmarca la casilla para ocultar la leyenda. Las leyendas se desactivan automáticamente en los gráficos XS y S.
- **Gráfico dividido**: Muestra un gráfico por cada valor de etiqueta (tag) para ver pequeños múltiplos de tu visualización.

### Características markdown y de texto enriquecido

El contenido markdown puede añadirse directamente al texto. Utiliza markdown en notebooks para las siguientes funciones:
- Tablas de texto  
- Resaltado de sintaxis en bloques de código  
- Variables de plantilla en línea
- @Menciones

Los notebooks admiten funciones de texto enriquecido de uso común como negrita, cursiva, código en línea y cabeceras. Los notebooks también admite diversos tipos de listas como viñetas, numeradas o de verificación. 

| Función       | Descripción                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| **Negrita**      | Para poner un texto en negrita, selecciónalo y pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                 |
| *Cursiva*     | Para poner un texto en cursiva, selecciónalo y pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                            |
| `Inline code` | Para el código en línea, escribe <code>`</code> al principio y al final del texto.                                |
| Bloques de código    | Inserta un bloque de código escribiendo <code>```</code> y pulsando <kbd>Intro</kbd> o utilizando el menú de comandos de barra. |
| Comillas        | Inserta un bloque de comillas escribiendo `>` o utilizando el menú de comandos de barra.                                          |

### Comandos de barra

Los comandos de barra son una interfaz para crear gráficos o celdas. En una nueva línea, escribe `/` para abrir el menú de comandos de barra. Continúa escribiendo el nombre del tipo de celda deseado y selecciona la opción correspondiente.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Menú de comandos de barra que aparece cuando escribes / en una celda de notebook" style="width:70%;" >}}

Al seleccionar un tipo de gráfico, se abre el [editor de gráficos][3]. Al hacer clic en **Save** (Guardar), el gráfico aparece en tu notebook.

### Atajos de teclado

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menú de atajos de teclado para notebooks de Datadog" style="width:70%;" >}}

En la esquina inferior izquierda de un notebook, haz clic en el icono del teclado para ver una lista de atajos de teclado para la edición.

Además, puedes utilizar los siguientes atajos para cortar y pegar widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Índice 

Los notebooks generan automáticamente una tabla de contenidos a partir de cualquier cabecera que insertes en tu documento. Puedes crear una cabecera utilizando el atajo markdown `#` o seleccionando texto y luego **Cabecera ** en la barra de herramientas.

### Etiquetas de notebooks

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Opciones de etiquetado para notebooks, para marcar un notebook como favorita, añadir un equipo o añadir un tipo" style="width:80%;" >}}

| Acción de etiquetado                | Descripción                                                                                                          |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Marcar un notebook como favorito** | Marca un notebook como favorito para fijarlo en la parte superior de tus resultados en la página de la lista de notebooks. Para marcar un notebook como favorito, haz clic en el icono de la estrella que aparece en la cabecera del notebook.                                                                     |
| **Etiquetar por equipo**         | Etiquetar un notebook con un equipo te permite utilizarlo como filtro cuando buscas un notebook. Puedes etiquetar un notebook con hasta 5 equipos. Para etiquetar un notebook, haz clic en la opción **Team** (Equipo) en la cabecera del notebook y selecciona los equipos deseados. |
| **Etiquetar por tipo**         | Para facilitar la búsqueda, puedes etiquetar tus notebooks con etiquetas de tipo, como: Postmortem, Runbook, Investigation, Documentation, Report. Para etiquetar un notebook, haz clic en **Type** (Tipo) y selecciona un tipo.                                           |

### Añadir imágenes a notebooks

<div class="alert alert-info">Solo se admiten los tipos de archivo PNG, JPG, JPEG y GIF. El tamaño máximo de los archivos es de 4 MB.</a></div>

Puedes añadir imágenes a tu notebook utilizando la [celda de imagen](#image-cell).

#### Celda de imagen

Este método coloca la imagen en una celda separada del texto y ofrece opciones para redimensionar, alinear y titular la imagen. Las imágenes cargadas por la celda de imagen se alojan en Datadog.

Para añadir una imagen, haz clic en la opción de celda **Image** (Imagen) del menú **Add New Cell** (Añadir nueva celda).

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Puedes utilizar cualquiera de las siguientes opciones para subir una imagen que se alojará en Datadog:
- Coloca un archivo de imagen en el área de carga
- Haz clic en **Choose File** (Seleccionar archivo) y localiza la imagen en tu directorio de archivos
- Pega una URL de acceso público para la imagen

Haz clic en los iconos de la bandeja de acciones de la celda para ajustar el tamaño, la alineación, añadir una leyenda para la celda de la imagen o ver la imagen en modo de pantalla completa.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

#### Editor de Markdown

Este método coloca la imagen en línea con el texto, pero no ofrece opciones para cambiar el tamaño de la imagen.

Accede al modo de edición en cualquier celda markdown y utiliza cualquiera de las siguientes opciones para añadir la imagen:
- Coloca un archivo de imagen en el área de celdas de texto.
- Copia y pega la imagen directamente en el área de la celda de texto.
- Hipervincula una imagen externa utilizando el widget de la imagen en la cabecera o haciendo referencia a la [guía oficial de markdown][4].

  **Nota**: Esta opción no sube la carga para ser alojada por Datadog. 

Puedes previsualizar la imagen en pestaña de vista previa antes de guardarla en tu notebook.

## Añadir comentarios a un notebook

Puedes añadir comentarios sobre el contenido en el cuerpo del notebook. Para comentar un texto, resáltalo y haz clic en el icono de comentario de la barra de herramientas. 

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para comentar un gráfico o una imagen, selecciona la celda y haz clic en el icono de comentario situado a la derecha de la celda.

| Función                  | Descripción                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Ir a los comentarios** | Los comentarios guardados aparecen en el margen derecho del notebook. Haz clic en un comentario resaltado en el texto para abrirlo en el margen o haz clic en un comentario en el margen para desplazarte hasta su localización en la celda. |
| **Responder a los comentarios** | Responde a los comentarios haciendo clic en ellos en el margen derecho, lo que abre un cuadro de comentarios. Puedes escribir texto, `@mention` un usuario de Datadog o resolver un comentario haciendo clic en **Resolve** (Resolver). |
| **Crear enlaces a comentarios**    | Crea un enlace a un comentario específico haciendo clic en el icono del enlace situado en la esquina superior derecha del comentario para copiar su enlace.      |
| **Editar o eliminar comentarios** | Edita o elimina tus comentarios haciendo clic en el menú de tres puntos situado en la esquina superior derecha del comentario.                 |
| **Comentar notificaciones** | Por defecto, las notificaciones por correo electrónico se envían al autor del notebook para obtener nuevos comentarios de los demás. Los usuarios de un hilo de comentarios reciben las notificaciones de cada respuesta. Para ajustar las notificaciones, en el menú del engranaje selecciona **Notificaciones**. |

## Experiencia multi-usuario en notebooks

Gracias a la presencia de texto enriquecido, los notebooks admiten la colaboración total, lo que permite que varios usuarios trabajen simultáneamente. Cuando un colaborador abre tu notebook, su cursor aparece en tiempo real. Pasa el ratón por encima del cursor para ver el nombre del colaborador.

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

### Controles de tiempo

De forma predeterminada, todas las celdas con gráficos están vinculadas al periodo de tiempo que se define en el encabezado del notebook.

Para ver un periodo de tiempo diferente, selecciona una opción en el selector de tiempo global o desplázate directamente sobre un gráfico. La URL del notebook se actualiza para reflejar este nuevo periodo de tiempo sin guardarlo en el notebook.

**Nota**: Hacer clic y arrastrar para hacer zoom en un gráfico no desvincula la celda del periodo global, cambia el periodo global del notebook.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para guardar el periodo elegido como el predeterminado del notebook, haz clic en  **Set Default Time** (Definir periodo por omisión). Para restablecer el periodo al global que tuvieras guardado de forma predeterminada, haz clic en el botón de restablecimiento.

Las celdas individuales pueden desvincularse del periodo global y asociarse a un periodo de tiempo concreto.

<!-- TODO Añadir imagen actualizada de notebooks nuevos -->

Para ver un periodo de tiempo diferente en una sola celda, edítala y utiliza el conmutador para desvincularla del periodo global. Cambia el periodo utilizando el selector o arrastrando el gráfico. Los cambios que se hacen en modo de edición se guardan automáticamente cuando pulsas **Done** (Listo). Si lo que quieres es descartarlos, haz clic en **Cancel** (Cancelar).

### Modos

Puedes cambiar de un modo a otro en el propio notebook. seleccionando el menú desplegable situado en la parte superior derecha del notebook.

- **Edición**: Realizar cambios en el notebook.
- **Visualización**: Los contenidos son de sólo lectura, lo que evita que los usuarios realicen ediciones no deseadas en las configuraciones e información existentes.

### Historial de versiones

En el notebook, haz clic en el icono de engranaje y en **Version history** (Historial de versiones) para abrir el panel lateral Historial de versiones. Puedes previsualizar, restaurar o clonar el historial de versiones de tu notebook. Para obtener más información, consulta la [Guía del historial de versiones][6].

### Snapshots gráficas

Puedes configurar tus notebooks para que capturen snapshots de gráficos que podrían dejar de estar disponibles pronto de forma automática. Activa esta función haciendo clic en **Turn on snapshots** (Activar snapshots) en el menú del engranaje de cualquier notebook. También puedes utilizar este menú para ver tus snapshots y desactivar las automáticas. Recuerda que tendrás que desactivar la función para retirar el acceso a las snapshots que ya tengas.

{{< img src="notebooks/cog_snapshots.png" alt="Opción del menú del engranaje para activar las snapshots" style="width:100%;">}}

 Los notebooks que tengan la función de toma de snapshots automática activa capturan una imagen estática de los gráficos para un periodo de tiempo determinado (por ejemplo, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Estas snapshots se actualizan cuando el gráfico se modifica, siempre y cuando el nuevo gráfico también tenga vinculado un periodo de tiempo determinado. Si cambias el periodo de tiempo del gráfico a global (por ejemplo `Past 1 Hour`), la snapshot se eliminará. 

Para previsualizar una snapshot en un gráfico vinculado a un periodo de tiempo concreto, basta con pasar el ratón sobre el icono de la cámara mientras estás en modo de edición.

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

El campo de búsqueda admite la búsqueda por texto. Escribe tu consulta para ver los notebooks relevantes como resultados.

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

## Acceso API

Los notebooks de API actualmente se están actualizando para que sean compatibles con el nuevo producto notebook. La creación de notebooks a través de la API los coloca en "modo de compatibilidad", y admiten sólo celdas markdown y widget. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/template-gallery
[3]: /es/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /es/dashboards/template_variables/
[6]: /es/notebooks/guide/version_history
[7]: /es/account_management/rbac/