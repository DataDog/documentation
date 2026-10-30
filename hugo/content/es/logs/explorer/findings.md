---
description: Capture, organice y reutilice contexto importante durante las investigaciones
  de registro en Log Explorer.
further_reading:
- link: logs/explorer/
  tag: Documentación
  text: Busque y analice sus registros en Log Explorer.
- link: logs/explorer/saved_views/
  tag: Documentación
  text: Configure automáticamente su Log Explorer.
- link: bits_ai/bits_chat/
  tag: Documentación
  text: Haga preguntas sobre sus datos con el chat de Bits AI
- link: notebooks/
  tag: Documentación
  text: Cree y comparta investigaciones con Notebooks.
private: false
title: Hallazgos de registro
---
## Descripción general {#overview}

Findings le ayuda a capturar, organizar y reutilizar contexto importante durante las investigaciones en [Log Explorer][1].

Use los hallazgos para recopilar evidencia, comparar resultados y construir contexto a medida que evoluciona su investigación. Guarde los hallazgos como puntos de control para que pueda retroceder o volver a consultas y registros útiles. Organice los hallazgos para visualizar y recordar su ruta de investigación, y agregue notas a los hallazgos para registrar lo que observó. También puede usar los hallazgos como contexto para [Ask Bits][2], o agregarlos a un [Notebook][3] para un informe que compartir con otros.

Guarde líneas de registro, visualizaciones y consultas como hallazgos con el botón **Add Finding** o el atajo de teclado **Cmd**/**Ctrl** + **S**. **Haga doble clic** o use **Open in Explorer** para volver a los hallazgos en Log Explorer. Ramifíquese en nuevas preguntas sin perder el rastro de observaciones anteriores o rutas de investigación.

{{< img src="logs/explorer/findings_demo-2.mp4" alt="Demostración de hallazgos en Log Explorer" video=true style="width:100%;" >}}

## Panel de hallazgos {#findings-panel}

Los hallazgos aparecen en el panel lateral a la izquierda de Log Explorer. Para abrirlo:

1. Navegue a [Log Explorer][1].
2. Haga clic en la pestaña **Findings** en la parte superior izquierda.

El panel de hallazgos es donde usted trabaja con los hallazgos: organícelos, vuelva a abrirlos en Log Explorer y selecciónelos para enviarlos a otro lugar. El panel mantiene los hallazgos y su diseño a través de recargas de página y sesiones de navegador hasta que usted los elimine.

## Capturar un hallazgo {#capture-a-finding}

Agregue un hallazgo desde cualquier lugar en Log Explorer presionando **Cmd**/**Ctrl** + **S**. Esto captura la consulta, la página a la que regresar y el rango de tiempo absoluto que estaba viendo. Para cambiar el nombre del título predeterminado, haga clic en {{< ui >}}Edit{{< /ui >}} en la esquina superior derecha de la tarjeta de hallazgo en el panel de hallazgos. También puede agregar notas a cada hallazgo en la parte inferior de la tarjeta de hallazgo.

### Consultas y visualizaciones {#queries-and-visualizations}

En la barra de herramientas sobre sus resultados, haga clic en el botón {{< ui >}}Add Finding{{< /ui >}}, o presione **Cmd**/**Ctrl** + **S**. También puede hacer clic en {{< ui >}}Add current page as a finding{{< /ui >}} en el panel de hallazgos.

El botón **Add Finding** aparece en el mismo lugar para cada visualización.

El hallazgo almacena su consulta de búsqueda, rango de tiempo y [visualización][4], incluyendo cualquier agrupación y agregación que haya configurado.

{{< img src="logs/explorer/findings/add_finding_timeseries_viz.png" alt="El botón Add Finding en la barra de herramientas de resultados, con información sobre la herramienta que muestra el atajo de teclado." style="width:80%;" >}}

### Eventos de registro individuales {#individual-log-events}

Haga clic en un evento de registro en sus resultados para abrir el [panel lateral de registros][5]. Pase el cursor sobre la sección **Mensaje de registro** y haga clic en el botón {{< ui >}}Add a finding{{< /ui >}}, o presione **Cmd**/**Ctrl** + **S**. Esto captura todo el panel lateral del evento de registro para volver a él más tarde.

Capturar el evento de registro también captura la consulta que produjo el panel lateral de registros. Volver al hallazgo vuelve a abrir el panel lateral de registros con la consulta correspondiente en segundo plano.

{{< img src="logs/explorer/findings/add_finding_log_message.png" alt="El botón Add a Finding en la sección Mensaje de registro del panel lateral de registros." style="width:80%;" >}}

### Texto específico en un mensaje de registro o atributos {#specific-text-in-a-log-message-or-attributes}

Para capturar parte de un mensaje de registro, seleccione el texto en la sección **Mensaje de registro** y presione **Cmd**/**Ctrl** + **S**. También puede seleccionar {{< ui >}}Add Finding{{< /ui >}} en el menú contextual que aparece con el texto seleccionado.

Para capturar valores de atributos, seleccione el texto y presione **Cmd**/**Ctrl** + **S**.

En ambos casos, el hallazgo almacena el texto que seleccionó. Puede usar el hallazgo para volver al panel lateral del evento de registro.

## Volver a un hallazgo {#return-to-a-finding}

**Haga doble clic** en un hallazgo para volver a él en Log Explorer, o coloque el cursor sobre el hallazgo y haga clic en {{< ui >}}Open in Explorer{{< /ui >}}. Log Explorer vuelve a cargar la consulta, el intervalo de tiempo y la visualización con los que se capturó el hallazgo.

Cada hallazgo conserva la consulta y el intervalo de tiempo absoluto. En Log Explorer, puede cambiar su búsqueda tantas veces como necesite. Regrese a cualquier hallazgo anterior sin tener que volver a crear la consulta.

## Enviar hallazgos a Bits AI y Notebooks {#send-findings-to-bits-ai-and-notebooks}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Bits AI no está disponible en el <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}}). Aún puede agregar hallazgos a un Notebook.
</div>
{{% /site-region %}}

Seleccione uno o más hallazgos para actuar sobre ellos en conjunto:

- Para preguntar a [Bits Chat][2] sobre ellos, escriba su pregunta en la barra de selección y haga clic en {{< ui >}}Ask Bits{{< /ui >}}. También puede hacer clic en {{< ui >}}Ask Bits{{< /ui >}} en el menú en la parte inferior del panel de Hallazgos después de seleccionar los hallazgos. Bits Chat se abre con los hallazgos seleccionados adjuntos como contexto.
- Para agregar hallazgos a un [Notebook][3], haga clic en {{< ui >}}Open in Notebooks{{< /ui >}}. Elija un notebook nuevo o existente. 

Envíe solo los hallazgos que se relacionen con su pregunta. Por ejemplo, si tres de los ocho hallazgos en su panel cubren el error sobre el que está preguntando, seleccione esos tres. También se envían las notas sobre los hallazgos.

## Organice sus hallazgos {#organize-your-findings}

Arrastre un hallazgo para moverlo o cambiar su tamaño. Datadog guarda el diseño que usted crea, por lo que la organización se ve igual la próxima vez que abra el panel.

Para restablecer su organización, utilice la opción de organización automática, la cual agrupa los hallazgos según la consulta de la que provienen. Si creó diferentes visualizaciones a partir de la misma consulta o guardó líneas de registro específicas de esa consulta, esos hallazgos se agrupan. Mover, cambiar el tamaño o eliminar un hallazgo elimina la indicación de agrupación visual en el fondo.

## Eliminar hallazgos {#delete-findings}

Para eliminar un hallazgo, coloque el cursor sobre él y haga clic en el botón de eliminar en la esquina superior derecha de la tarjeta. También puede seleccionar el hallazgo y presionar la tecla **Delete**. Para eliminar varios a la vez, selecciónelos y presione **Delete**. Para seleccionar todos los hallazgos, presione **Cmd**/**Ctrl** + **A**.

El botón Clear All en el panel de hallazgos elimina todos los hallazgos.

Para restaurar un hallazgo después de eliminarlo, haga clic en {{< ui >}}Undo{{< /ui >}} en el mensaje que aparece, o presione **Cmd**/**Ctrl** + **Z**.

## Atajos de teclado {#keyboard-shortcuts}

| Acción | Atajo |
| ------ | -------- |
| Add Finding | **Cmd**/**Ctrl** + **S** |
| Select All Findings | **Cmd**/**Ctrl** + **A** |
| Delete Selected Findings | **Delete** |
| Undo | **Cmd**/**Ctrl** + **Z** |
| Redo | **Cmd**/**Ctrl** + **Shift** + **Z** |
| Pan | **Space** + **drag** |
| Auto-organize (by query) | **Cmd**/**Ctrl** + **O** |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/
[2]: /es/bits_ai/bits_chat/
[3]: /es/notebooks/
[4]: /es/logs/explorer/visualize/
[5]: /es/logs/explorer/side_panel/