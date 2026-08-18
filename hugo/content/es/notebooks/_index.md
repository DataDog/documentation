---
aliases:
- /es/graphing/notebooks/
- /es/notebooks_new/
- /es/notebooks_legacy/
description: Crea documentos colaborativos de texto enriquecido con gráficos en vivo
  de Datadog para investigaciones, postmortems, runbooks y narrativas basadas en datos.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Administra y optimiza tus costos de OCI con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Cuenta historias basadas en datos con Notebooks Colaborativos
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Mejores prácticas para redactar postmortems de incidentes
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transforma y enriquece tus registros con los Datadog Observability Pipelines.
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explora tus datos con Sheets, DDSQL Editor y Notebooks para análisis avanzado
    en Datadog.
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica exitosa de FinOps en Datadog
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centro de Aprendizaje
  text: Comenzando con Notebooks
- link: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
  tag: Centro de Aprendizaje
  text: Usando Notebooks de Datadog para Reportes Centralizados
title: Notebooks
---
## Resumen {#overview}

Los Notebooks son documentos colaborativos de texto enriquecido que te brindan todo el poder de los gráficos de Datadog. Múltiples usuarios pueden trabajar juntos para realizar una investigación o [postmortem][8] con datos en vivo de tu incidente. Los Notebooks también son excelentes para runbooks y documentación que presentan información real sobre tus sistemas junto a tu contenido.

## Creando un notebook {#creating-a-notebook}

Puedes crear un notebook en dos lugares:

- Desde la barra de navegación izquierda, haz clic en **Dashboards > New Notebook**.
- En la esquina superior derecha de la página de [Notebooks List page][1], haz clic en **New Notebook**.

### Plantillas de Notebook {#notebook-templates}

En la [Galería de Plantillas][2], consulta plantillas listas para usar de las cuales puedes crear nuevos Notebooks. Las plantillas incluyen un [postmortem][8] de Respuesta a Incidentes, un Informe de Incidentes y Especificación de Service Level Objectives. También puedes crear una nueva plantilla personalizada para construir estructuras reutilizables de Notebooks.

## Editando un Notebook {#editing-a-notebook}

Los Notebooks ofrecen una experiencia de edición de texto enriquecido para crear y colaborar en contenido. Puedes escribir y dar formato al texto libremente utilizando opciones de barra de herramientas familiares y atajos de teclado, como negrita, cursiva, encabezados, listas y más, directamente en el editor.

Para los usuarios que prefieren atajos, los Notebooks también soportan la sintaxis Markdown. Por ejemplo, escribir `#` seguido de un espacio crea un encabezado, y usar tres comillas invertidas ("<code>```</code>) inicia un bloque de código.

El contenido de texto se guarda automáticamente a medida que escribes. Para gráficos incrustados, asegúrate de guardar tus cambios en el editor de gráficos para aplicarlos dentro del notebook.

### Tipos de contenido {#content-types}

Los notebooks soportan varios tipos de contenido enriquecido e incrustado, incluyendo, pero no limitado a:

- [Gráficos](#graphs-in-notebooks)
- Imágenes
- Encabezados (H1 - H3)
- Listas (listas con viñetas, listas numeradas y listas de verificación)
- Bloques de código
- Citas en bloque
- Celdas de Markdown

Para la lista completa, escribe <kbd>/</kbd> en un Notebook.

### Gráficas en Notebooks {#graphs-in-notebooks}

Notebooks soportan todos los tipos de widgets. Para la lista completa, consulta [Widgets][3].

Pasa el cursor sobre el widget para mostrar opciones de edición y configuración de gráficos.

Para editar la consulta o configurar la visualización de la gráfica, utiliza la función **Quick Edit** para realizar la mayoría de los cambios en línea. Para una configuración más avanzada, haz clic en el ícono de lápiz o mantén presionada la tecla <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> y haz clic en el gráfico para abrir el editor de gráficos completo. Puedes ajustar el marco de tiempo local o vincular el gráfico al tiempo global del Notebook haciendo clic en el ícono de reloj.

Opciones adicionales de configuración de gráficos son accesibles bajo el menú de elipsis de tres puntos, dependiendo del tipo de gráfico:
- **Tamaño del gráfico**: Ajusta la altura del gráfico seleccionando XS, S, M (predeterminado), L o XL.
- **Leyenda del gráfico**: Desmarca la casilla para ocultar la leyenda. Las leyendas están automáticamente deshabilitadas para gráficos XS y S.

### Características de texto enriquecido {#rich-text-features}

Notebooks soportan características de texto enriquecido comúnmente utilizadas como negritas, cursivas, código en línea y encabezados. Notebooks también soportan una variedad de tipos de listas como listas con viñetas, numeradas o de verificación.

| Característica       | Descripción                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Negrita**      | Para poner texto en negrita, selecciónalo y presiona <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Cursivas*     | Para poner texto en cursiva, selecciónalo y presiona <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | Para código en línea, escribe <code>`</code> al principio y al final del texto.                                          |
| Bloques de código    | Inserta un bloque de código escribiendo <code>```</code> y presionando <kbd>Enter</kbd>, o utilizando el menú de comandos con barra.           |
| Citas        | Inserta un bloque de cita escribiendo `>`, o utilizando el menú de comandos con barra.                                                    |
| Tablas de texto   | Inserta una tabla escribiendo `/table` o usando el menú **Add Cell**.                                                          |
| Llamadas      | Inserta una llamada escribiendo `/table` o escribiendo `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT`, o `!CAUTION` y luego presionando <kbd>Espacio</kbd>.   |

### Smart chips {#smart-chips}

| Característica    | Descripción                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | Para mencionar a otro usuario, escribe `@` seguido de su nombre o dirección de correo electrónico. |
| `$TemplateVariable` | Escribe `$` seguido del nombre de tu variable de plantilla existente. |
| `/date` | Agrega un chip de fecha escribiendo `/date`. Puedes editar la fecha o la hora en el popover cada vez que haces clic en el chip. ¡También prueba `/today` y `/now`! |

### Slash commands {#slash-commands}

Los Slash commands son una interfaz para crear gráficos o insertar otro contenido. En una nueva línea, escribe `/` para abrir el slash command menu. Continúa escribiendo el nombre del tipo de contenido deseado y selecciona la opción apropiada.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Slash command menu que aparece cuando escribes / en un Notebook." style="width:70%;" >}}

Cuando seleccionas un tipo de gráfico, se abre el [editor de gráficos][3]. Después de hacer clic en **Save**, el gráfico aparece en tu Notebook.

### Atajos de teclado {#keyboard-shortcuts}

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menú de atajos de teclado para Notebooks de Datadog." style="width:70%;" >}}

En la esquina inferior izquierda de un Notebook, haz clic en el ícono de teclado para ver una lista de atajos de teclado para editar.

Además, puedes usar los siguientes atajos para cortar y pegar widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Tabla de contenidos {#table-of-contents}

Los Notebooks generan automáticamente una tabla de contenidos a partir de cualquier encabezado o gráfico que insertes en tu documento. Puedes crear un encabezado usando el atajo de markdown `#` o seleccionando texto y haciendo clic en **Header** en la barra de herramientas.

### Notebook tags {#notebook-tags}

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Opciones de Notebook tags para marcar un Notebook como favorito, agregar un equipo o agregar un tipo." style="width:80%;" >}}

| Tag action                | Description                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Marcar un Notebook como favorito**   | Marcar un Notebook como favorito para fijarlo en la parte superior de tus resultados en la página de la lista de Notebooks. Para alternar un Notebook como favorito, haz clic en el ícono de estrella en el encabezado del Notebook.                                                                     |
| **Etiquetar por equipo**           | Etiquetar un Notebook con un equipo te permite usarlo como un filtro al buscar un Notebook. Puedes etiquetar un Notebook con hasta 5 equipos. Para etiquetar un Notebook, haz clic en la opción **Team** en el encabezado del Notebook y selecciona los equipos deseados. |
| **Tag by Type**           | Puedes etiquetar tus Notebooks con etiquetas de tipo para facilitar la búsqueda, tales como: Postmortem, Runbook, Investigation, Documentation, Report. Para etiquetar un Notebook, haz clic en **Type** y selecciona un tipo.                                                     |

### Agregar imágenes a los notebooks {#add-images-to-notebooks}

<div class="alert alert-info">Solo se admiten tipos de archivo PNG, JPG, JPEG y GIF. Las cargas tienen un tamaño máximo de archivo de 4MB.</a></div>

Puedes agregar imágenes a tu notebook usando `/image` o el menú **Agregar celda**. Esto proporciona opciones para cambiar el tamaño, alinear y subtitular la imagen. Las imágenes cargadas se alojan en Datadog.

<!-- TODO Add updated image from new notebooks -->

Puedes usar cualquiera de las siguientes opciones para cargar una imagen que será alojada por Datadog:
- Suelta un archivo de imagen en el área de carga
- Haz clic en **Elegir archivo** y localiza la imagen en tu directorio de archivos
- Pega una URL accesible públicamente para la imagen

Haz clic en los íconos en la bandeja de acciones de la imagen para ajustar el tamaño, la alineación, agregar un pie de foto o ver la imagen en pantalla completa.


## Agregar comentarios a un notebook {#adding-comments-to-a-notebook}

Puedes agregar comentarios sobre el contenido en el cuerpo del notebook. Para comentar sobre un texto, resalta el texto y haz clic en el ícono de comentario en la barra de herramientas.

<!-- TODO Add updated image from new notebooks -->

Para comentar sobre un gráfico o una imagen, haga clic en el ícono de comentario a la derecha del gráfico.

| Característica                  | Descripción                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Navegando a Comentarios** | Los comentarios guardados aparecen en el margen derecho del notebook. Haz clic en un comentario resaltado en el texto para abrirlo en el margen, o haz clic en un comentario en el margen para desplazarte a su ubicación. |
| **Responde a los comentarios haciendo clic en ellos en el margen derecho, lo que abre un cuadro de comentario.** |  Puedes escribir texto, `@mention` un usuario de Datadog, o resolver un comentario haciendo clic en **Resolver**. |
| **Enlazando a Comentarios**    | Enlace a un comentario específico haciendo clic en el ícono de enlace en la esquina superior derecha del comentario para copiar su enlace.      |
| **Editando o Eliminando Comentarios** | Edita o elimina tus comentarios haciendo clic en el menú de elipsis de tres puntos en la esquina superior derecha del comentario.                 |
| **Por defecto, se envían notificaciones por correo electrónico al autor del notebook por nuevos comentarios de otros.** |  Los usuarios en un hilo de comentarios reciben notificaciones por cada respuesta. Para ajustar las notificaciones, en el menú de engranaje, selecciona **Notificaciones**. |

## Experiencia multijugador en Notebooks {#multiplayer-experience-in-notebooks}

Notebooks soportan colaboración completa, permitiendo que múltiples usuarios editen simultáneamente. Cuando un colaborador abre tu notebook, su cursor aparece en tiempo real. Pasa el cursor sobre el indicador para ver el nombre del colaborador.

<!-- TODO Add updated image from new notebooks -->

### Widgets {#widgets}

Cuando otro usuario está editando un widget, aparece un contorno alrededor del widget. Dado que los widgets se guardan como el último en escribir, evita editar un widget en el que alguien más esté trabajando.

<!-- TODO Add updated image from new notebooks -->

#### Presencia {#presence}

En la parte superior del notebook, puedes ver los avatares de todos los usuarios que están viendo el notebook. Pasa el cursor sobre un avatar para ver el nombre del colaborador asociado.

<!-- TODO Add updated image from new notebooks -->

## Configurando un notebook {#configuring-a-notebook}

### Variables de plantilla {#template-variables}

Los Notebooks soportan variables de plantilla. Establece de manera dinámica el alcance de las visualizaciones al agregar y seleccionar valores para las variables de plantilla. Para más información, consulta [Variables de Plantilla][5].

<div class="alert alert-danger">Algunas características de Análisis tienen soporte limitado o nulo para variables de plantilla. Para más información, consulta <a href="/notebooks/guide/template_variables_analysis_notebooks">Soporte de Variables de Plantilla en Cuadernos de Análisis</a>.</div>

### Controles de tiempo {#time-controls}

Por defecto, todos los gráficos están vinculados al marco de tiempo global establecido en el encabezado del notebook.

Para ver un marco de tiempo diferente, selecciona una opción en el selector de tiempo global, o desliza sobre un gráfico directamente. La URL del notebook se actualiza para reflejar este nuevo marco de tiempo sin guardarlo en el notebook.

**Nota**: Hacer clic y arrastrar para acercar un gráfico no desvincula el gráfico del tiempo global. En su lugar, cambia el tiempo global del cuaderno.

<!-- TODO Add updated image from new notebooks -->

Para guardar este tiempo como el predeterminado del notebook, haz clic en **Establecer Tiempo Predeterminado**. Para restablecer tu tiempo global a la configuración predeterminada guardada anteriormente, haz clic en el botón de restablecer.

Los gráficos individuales pueden desvincularse del tiempo global y establecerse en un marco de tiempo independiente.

<!-- TODO Add updated image from new notebooks -->

Para ver un marco de tiempo diferente en un solo gráfico, edita el gráfico y usa el interruptor para desvincularlo del tiempo global. Cambia el marco de tiempo usando el selector de tiempo o desliza sobre el gráfico. Los cambios realizados en modo de edición se guardan automáticamente cuando haces clic en **Listo**. Para descartar sus cambios, haga clic en **Cancelar** en lugar de **Listo**.

### Modos {#modes}

Puede cambiar entre modos desde dentro del notebook seleccionando el menú desplegable en la parte superior derecha de tu notebook.

- **Editando**: Haga cambios en el cuaderno.
- **Viendo**: Los contenidos son Solo Lectura, lo que impide que los usuarios realicen ediciones no deseadas en configuraciones e información existentes.

### Historial de versiones {#version-history}

Desde un notebook, haz clic en el ícono de engranaje y haz clic en **Historial de versiones** para abrir el panel lateral del Historial de Versiones. Puedes previsualizar, restaurar o clonar una versión anterior de tu notebook. Para más información, consulte la [guía del Historial de Versiones][6].

### Instantáneas de gráficos {#graph-snapshots}

Los Notebooks toman instantáneas automáticamente de los gráficos con rangos de tiempo fijos para preservar la visualización antes de que se apliquen los límites de retención de datos. No se requiere configuración. Utiliza el menú kebab junto a un gráfico para ver o descargar una instantánea.

{{< img src="notebooks/kebab_snapshots.png" alt="Opción del menú kebab para ver o descargar una instantánea." style="width:100%;">}}

Las instantáneas son imágenes estáticas de gráficos con un rango de tiempo fijo (por ejemplo, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Una instantánea se actualiza cuando el gráfico se actualiza, siempre que el gráfico continúe utilizando un rango de tiempo fijo. Cambiar el gráfico a un rango de tiempo global (por ejemplo, `Past 1 hour`) elimina la instantánea.

Puedes previsualizar el estado de la instantánea de un Notebook al pasar el cursor sobre el indicador de instantánea del gráfico debajo del título del Notebook. La previsualización muestra la hora de la instantánea más reciente y el número de instantáneas creadas.

{{< img src="notebooks/hover_graph_snapshots.png" alt="Indicador de instantánea que muestra cuántas instantáneas se han generado." style="width:100%;">}}

Cuando un Notebook contiene un gráfico con datos que han superado sus límites de retención de datos, el Notebook muestra una instantánea en línea del gráfico. La instantánea es una imagen estática, pero se reemplaza si editas el gráfico subyacente.

### Permisos {#permissions}

Por defecto, todos los usuarios tienen acceso completo a los Notebooks.

Utiliza nuestros controles de acceso para restringir la visualización y edición solo a ti mismo:
1. Mientras visualizas un Notebook, haz clic en el botón **Compartir** en la parte superior derecha.
1. Selecciona **Privado para mí**.
1. Haz clic en **Guardar**.

Utiliza controles de acceso granulares para limitar los [roles][7] que pueden editar un Notebook en particular:
1. Mientras visualizas un Notebook, haz clic en el botón **Compartir** en la parte superior derecha.
1. Selecciona **Personalizado**.
1. Actualiza el acceso de la Organización a **Visualizador** para revocar el acceso de edición al resto de la organización.
1. Utiliza el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el Notebook.
1. Haz clic en **Agregar**.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionaste tiene el permiso de **Editor**.
1. Haz clic en **Guardar**.

**Nota:** Para mantener tu acceso de edición al notebook, el sistema requiere que incluyas al menos un rol del cual seas miembro antes de guardar.

Debes tener acceso de edición para restaurar el acceso general a un notebook restringido. Completa los siguientes pasos:
1. Mientras visualizas un Notebook, haz clic en el botón **Compartir** en la parte superior derecha.
1. Selecciona **Mi Organización**.
1. Haz clic en **Guardar**.

## Encontrando notebooks {#finding-notebooks}

La página [Notebooks List][1] es el lugar para encontrar todos tus notebooks.

<!-- TODO Add updated image from new notebooks -->

### Buscar {#search}

El campo de búsqueda admite búsqueda de texto completo. Escribe tu consulta para mostrar los notebooks relevantes como resultados.

### Filtrando {#filtering}

Puedes filtrar notebooks con los siguientes métodos:
| Tipo de Filtro      | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Autor**       | Para filtrar por autor, selecciona el menú desplegable de autores e ingresa nombres para filtrar. |
| **Equipo**         | Para filtrar por equipo, selecciona el menú desplegable de equipos e ingresa los nombres de los equipos para filtrar. |
| **Tipo de notebook**| Filtra por investigación, postmortem, runbook, informe o documentación.     |
| **Fecha de modificación**| Filtra según cuán recientemente se editó un notebook utilizando el menú desplegable de fecha de modificación. |

También hay filtros rápidos para acceder a tus notebooks y notebooks etiquetados con tus equipos.

### Regresar a {#jump-back-in}

Si no hay filtros habilitados, la sección Regresar a aparece, mostrando los notebooks más recientes que has visto o editado.

<!-- TODO Add updated image from new notebooks -->

### Ordenando notebooks {#sorting-notebooks}

Puedes ordenar los notebooks seleccionando los encabezados ⭐, detalles o modificados para ordenarlos por esos valores.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/list?location=templates
[3]: /es/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /es/dashboards/template_variables/
[6]: /es/notebooks/guide/version_history
[7]: /es/account_management/rbac/
[8]: /es/incident_response/incident_management/post_incident/postmortems