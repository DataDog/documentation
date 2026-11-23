---
aliases:
- /es/app_builder/build
- /es/service_management/app_builder/build
description: Cree aplicaciones personalizadas a partir de Blueprints o desde cero
  utilizando componentes de interfaz de usuario de arrastrar y soltar, consultas y
  expresiones de JavaScript.
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: Documentación
  text: Action Catalog
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: Centro de aprendizaje
  text: Introducción a App Builder
title: Crear aplicaciones
---
Puede crear una aplicación o editar aplicaciones existentes desde la página [App Builder][1]. La página enumera información sobre las aplicaciones existentes, incluida la siguiente:
- Autor
- Etiquetas
- Fecha en la que se modificó por última vez cada aplicación
- Si cada aplicación está publicada

En la página App Builder, puede acceder y filtrar sus aplicaciones. Pase el cursor sobre una aplicación para ver las opciones de editar, eliminar, visualizar o clonar la aplicación. También puede activar el interruptor {{< ui >}}My apps{{< /ui >}} para ver solo las aplicaciones que usted creó:

{{< img src="actions/app_builder/app-builder-my-apps-2025-11-19.png" alt="La página App Builder, filtrada para mostrar solo 'Mis aplicaciones'" style="width:100%;" >}}

## Crear una aplicación {#create-an-app}

Al crear una nueva aplicación, puede usar [IA][22], [un Blueprint][18], [un diseño][19] o [una acción][20] para comenzar. Alternativamente, puede [comenzar desde cero][21] o usar el [App Playground][23] para obtener más información sobre App Builder.

### Crear una aplicación con IA {#build-an-app-with-ai}

Con Bits AI, puede generar una aplicación completa a partir de una sola instrucción. Describa la aplicación que desea crear y el agente de interfaz de usuario generará automáticamente la interfaz, las acciones y la lógica asignadas a sus datos y permisos existentes. Luego puede iterar mediante chat (refinando componentes, flujos o estilos) sin escribir código.

Para crear una aplicación con Bits AI:
1. Desde [App Builder][1], haga clic en {{< ui >}}New App{{< /ui >}}.
1. Haga clic en una instrucción sugerida o ingrese una instrucción que describa la aplicación que desea crear. Ingrese la mayor cantidad de detalles posible para mejorar los resultados. Aquí hay algunos ejemplos de instrucciones:
   - `Display a list of AWS Lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. Presione <kbd>Enter</kbd> para enviar su instrucción. Bits AI genera automáticamente la interfaz de usuario, las acciones y la lógica para su aplicación, asignadas a sus datos y permisos existentes.
    - Mientras Bits AI genera su aplicación, puede darle la oportunidad de configurar una conexión para crear la aplicación con datos reales. Puede completar este paso, u omitirlo para crear el diseño de la aplicación más rápido, sin datos.
    - Bits AI a veces hace preguntas de aclaración mientras responde a su instrucción. Si esto sucede, ingrese una respuesta y luego presione <kbd>Enter</kbd>. 
    - Después de que Bits AI agrega una acción a la aplicación, le da la oportunidad de usar datos simulados en su acción o de omitir ese paso. Con datos simulados, Bits AI puede inferir el resultado de la acción y conectar automáticamente esos datos a los componentes (como establecer la fuente de datos de una tabla). Si omite este paso, puede conectar las salidas manualmente más tarde.
1. Después de que Bits AI haya generado su aplicación, puede hacer clic en {{< ui >}}Edit with AI{{< /ui >}} o [personalizar su aplicación][15] manualmente.

Para iterar sobre una aplicación existente:
1. Desde [su lista de aplicaciones][14], coloque el cursor sobre una aplicación y haga clic en editar {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono.
1. Haga clic en el icono de IA **<i class="icon-bits-ai"></i>**.
1. Ingrese una instrucción detallada para el comportamiento que desea agregar a su aplicación. Incluya las integraciones y acciones que desea utilizar.
1. Presione <kbd>Enter</kbd> para agregar la funcionalidad a su aplicación.

### Cree una aplicación a partir de Blueprints {#build-an-app-from-a-blueprint}

Blueprints son plantillas de aplicaciones útiles que cubren casos de uso comunes y muestran las mejores prácticas para configurar aplicaciones. Vienen cargados con datos de demostración que puede usar para familiarizarse con las funciones de la aplicación. Algunos Blueprints crean una aplicación inicial que puede personalizar, como [Manage Datastore][24] y [Export Synthetics][25]. Los Blueprints con "how to" en su título, como [How to: Custom Code][26], son plantillas con tutoriales integrados para las funciones de App Builder.

1. Desde [App Builder][1], haga clic en la pestaña [**Blueprints**][2].
1. Haga clic en el Blueprints que desea usar. 
1. Haga clic en {{< ui >}}Open in Editor{{< /ui >}}.
1. [Personalice su aplicación][15].

<div class="alert alert-tip">También puede acceder a los Blueprints desde la <a href="https://app.datadoghq.com/integrations">página de integraciones</a>. Haga clic en una integración y, a continuación, haga clic en <b>Recursos de monitoreo</b> para ver los Blueprints disponibles.</div>

### Cree una aplicación a partir de un diseño {#build-an-app-from-a-layout}

Elegir un diseño es la forma más rápida de crear una aplicación mínima y lista para editar. 

Para crear una aplicación a partir de un diseño:
1. Desde [App Builder][1], haga clic en {{< ui >}}New App{{< /ui >}}.
1. Haga clic en {{< ui >}}Layouts{{< /ui >}} en el modal de incorporación.
1. Seleccione un diseño. Hay tres opciones: 
    - {{< ui >}}Table Manager{{< /ui >}}: Liste, filtre y ordene datos de una consulta.
    - {{< ui >}}Form{{< /ui >}}: Recopile entradas y active acciones (crear, actualizar, solicitar, etc.). Para obtener plantillas de formulario más detalladas, consulte [**Formularios**][27].
    - {{< ui >}}Custom Chart{{< /ui >}}: Visualice una consulta intercambiando sus datos en un gráfico de barras preconfigurado.
1. Haga clic en {{< ui >}}Use Layout{{< /ui >}}.
1. [Personalice su aplicación][15].

### Crear una aplicación a partir de una acción {#build-an-app-from-an-action}

Puede crear una aplicación eligiendo una integración y una acción específica del [Action Catalog][17]. App Builder preconfigura la acción y sus consultas, llevando datos en tiempo real al lienzo de la aplicación. Luego puede conectar componentes y probar la aplicación de inmediato. Este método es mejor si ya tiene en mente una integración y una acción (como interactuar con [Datastore de Datadog][28]).

1. Desde [App Builder][1], haga clic en {{< ui >}}New App{{< /ui >}}. 
1. Haga clic en **Action** en el modal de incorporación. 
1. Elija una integración y, a continuación, haga clic en **Continuar**.
1. Elija una o más acciones. Cada conjunto de acciones es una plantilla específica para la integración que ha seleccionado. No hay límite en la cantidad de acciones que puede elegir.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. [Personalice su aplicación][15].

### Crear una aplicación personalizada {#create-a-custom-app}

Si no desea utilizar ninguno de los métodos anteriores, puede crear una nueva aplicación desde el lienzo en blanco de App Builder.

1. Desde [App Builder][1], haga clic en {{< ui >}}New App{{< /ui >}}. 
1. Haga clic en {{< ui >}}Start From Scratch{{< /ui >}}, o haga clic en {{< ui >}}X{{< /ui >}} para cerrar el modal de incorporación.
1. [Personalice su aplicación][15].

### Vea lo que es posible con App Playground {#see-whats-possible-with-app-playground}

App Playground es una demostración interactiva que guía a los usuarios a través de la creación y el uso de una aplicación. Si es nuevo en App Builder, puede usar App Playground para aprender sobre sus conceptos principales, que incluyen: 
- Obtención de datos
- Visualización de datos de consulta en una tabla
- Configuración de un botón para ejecutar una consulta
- Configuración de los estados de carga de un componente para reflejar el estado de carga de una consulta
- Visualización de datos en un gráfico

Para acceder a App Playground:
1. Desde [App Builder][1], haga clic en {{< ui >}}New App{{< /ui >}}. 
1. Haga clic en {{< ui >}}App Playground{{< /ui >}}.
1. En la siguiente pantalla, el lienzo de la aplicación (el panel derecho) muestra información para guiarlo a través de App Builder. Haga clic en elementos como {{< ui >}}Fetching Data{{< /ui >}} para ver información e instrucciones sobre el uso de esa función. 

## Personalice su aplicación {#customize-your-app}

Las aplicaciones están compuestas por componentes de interfaz de usuario y consultas que interactúan entre sí para formar la experiencia del usuario y la lógica detrás de cada aplicación. La lista de consultas y el editor aparecen en el lado izquierdo de la página, mientras que el lienzo de la aplicación y los componentes de la interfaz de usuario conforman el lado derecho de la página.

Para cambiar elementos básicos de su aplicación:
1. Desde [App Builder][1], coloque el cursor sobre una aplicación y haga clic en editar {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono.
1. Realice ediciones en su aplicación según sea necesario. 
    1. Haga clic en el nombre de la aplicación para editar estos elementos:
        - Nombre
        - Descripción
        - Etiquetas
        - Apariencia
    1. Edite los [parámetros de entrada][29].
    1. Para agregar un [componente de IU](#app-canvas-and-components) al lienzo de la aplicación, haga clic en el icono {{< ui >}}Add Component{{< /ui >}} <i class="icon-component-wui" style="position:relative; top:4px;"></i> para abrir la pestaña {{< ui >}}Components{{< /ui >}}. Haga clic en el componente o arrástrelo al lienzo.
1. Haga clic en el botón {{< ui >}}View{{< /ui >}} para ver su aplicación desde la perspectiva del usuario. Utilice el modo de visualizar para interactuar con la IU de la aplicación y probar sus consultas. Cuando haya terminado, haga clic en {{< ui >}}Edit{{< /ui >}} para volver a App Builder.
1. Para guardar su aplicación, haga clic en {{< ui >}}Save{{< /ui >}}.
1. Cuando esté listo para publicar su aplicación, haga clic en {{< ui >}}Publish{{< /ui >}}. Publicar una aplicación la hace disponible para sus tableros.

### Lienzo de la aplicación y componentes {#app-canvas-and-components}

El lienzo de la aplicación representa la interfaz gráfica con la que interactúan sus usuarios. Puede arrastrar y soltar componentes para moverlos por el lienzo. Para ver todos los componentes disponibles, haga clic en el signo más {{< img src="actions/app_builder/components-icon.png" inline="true" width="30px">}} icono para abrir la pestaña {{< ui >}}Components{{< /ui >}}.

Cada componente cuenta con una lista de opciones de configuración correspondientes que controlan cómo interactúan los usuarios con su aplicación. Por ejemplo, el componente {{< ui >}}Text Input{{< /ui >}} le permite establecer un valor predeterminado, texto de marcador de posición y una etiqueta. El componente {{< ui >}}Button{{< /ui >}} incluye una etiqueta y un evento que se activa cuando se presiona el botón. Los componentes también cuentan con una sección {{< ui >}}Appearance{{< /ui >}} que cambia la forma en que los componentes se ven y actúan. Por ejemplo, puede deshabilitar un botón o controlar su visibilidad.

Para eliminar o duplicar un componente, seleccione el componente y haga clic en los tres puntos (*...*) para mostrar las opciones {{< ui >}}Delete{{< /ui >}} o {{< ui >}}Duplicate{{< /ui >}}.

Para obtener una lista de los componentes de interfaz de usuario disponibles y sus propiedades, consulte [Componentes][9].

Los componentes de interfaz de usuario pueden activar reacciones en un [Evento][11].

Las [Consultas][12] pueblan su aplicación con datos de las API de Datadog o integraciones compatibles. Toman entradas de otras consultas o de componentes de la interfaz de usuario y devuelven salidas para su uso en otras consultas o en componentes de la interfaz de usuario.

Puede usar [Expresiones de JavaScript][13] en cualquier parte de App Builder para crear interacciones personalizadas entre las diferentes partes de su aplicación.

## Etiquetar una aplicación {#tag-an-app}

Las etiquetas se muestran en una columna en la [lista][14].

Para agregar una etiqueta a una aplicación:

1. Abra la pestaña {{< ui >}}App Properties{{< /ui >}} en su aplicación.
1. En {{< ui >}}Tags{{< /ui >}}, use el menú desplegable para seleccionar una etiqueta existente, o ingrese un valor nuevo y haga clic en {{< ui >}}Add option: [your text]{{< /ui >}}.
1. Guarde su aplicación.

La etiqueta se muestra en la línea de esta aplicación en la lista. Puede hacer clic en la etiqueta en esta lista para copiarla en su portapapeles.

## Marcar una aplicación como favorita {#favorite-an-app}

Marcar una aplicación como favorita la fija en la parte superior de su [lista][14]. 

Para marcar una aplicación como favorita, haga clic en el icono de estrella <i class="icon-star-empty-wui" style="position:relative; top:4px;"></i> junto al nombre de la aplicación. Cuando actualiza la página, la aplicación marcada aparece en la parte superior de su lista.

## Visualizar el historial de versiones de la aplicación {#view-app-version-history}

App Builder mantiene un registro de cada versión guardada de su aplicación.

Para ver el historial de versiones de su aplicación, en el menú de la izquierda de su aplicación, haga clic en el historial de versiones {{< img src="icons/version-history.png" inline="true" style="width:14px;">}} icono.

La interfaz de usuario muestra las versiones guardadas o publicadas anteriormente de su aplicación, junto con el icono del usuario que guardó o publicó la versión:

{{< img src="actions/app_builder/version-history-example.png" alt="Un ejemplo de lista de historial de versiones de App Builder con dos elementos, la versión actual y una versión anterior" style="width:70%;" >}}

Puede realizar las siguientes operaciones:

* Para ver una versión de la aplicación, haga clic en la versión en la lista.
* Para sobrescribir una aplicación existente con una versión anterior, seleccione la versión y, luego, haga clic en {{< ui >}}Restore Version{{< /ui >}} en la parte superior derecha.
* Para crear una nueva aplicación que sea una copia de una versión, seleccione la versión y, luego, haga clic en {{< ui >}}Clone Version{{< /ui >}} en la parte superior derecha.


## Interactuar con una aplicación en JSON {#interact-with-an-app-in-json}

### Editar una aplicación {#edit-an-app}

Para editar una aplicación con JSON, haga clic en la configuración {{< img src="icons/settings.png" inline="true" style="width:14px;">}} icono y seleccione {{< ui >}}Switch to JSON{{< /ui >}}. La opción {{< ui >}}Switch to GUI{{< /ui >}} en el menú de configuración lo lleva de regreso al editor de la GUI.

### Copiar una aplicación {#copy-an-app}

Para copiar el diseño de una aplicación entre organizaciones o realizar una copia de seguridad de una aplicación, haga clic en la configuración {{< img src="icons/settings.png" inline="true" style="width:14px;">}} icono y seleccione {{< ui >}}Switch to JSON{{< /ui >}}. Esto muestra el código JSON de toda la aplicación. Copie este código JSON y guárdelo en un editor de texto. Puede guardar estados intermedios de su aplicación durante el desarrollo y volver a ellos si es necesario.

Para copiar la aplicación a otra organización:
1. Crear una aplicación. 
1. Haga clic en {{< ui >}}Settings{{< /ui >}} {{< img src="icons/settings.png" inline="true" style="width:14px;">}} y seleccione {{< ui >}}Switch to JSON{{< /ui >}}. 
1. Reemplace el JSON existente con el JSON que copió anteriormente. 

La opción {{< ui >}}Switch to GUI{{< /ui >}} en el menú de configuración lo lleva de regreso al editor de la GUI.

## Depurar una aplicación {#debug-an-app}

La consola de depuración de App Builder proporciona un lugar central para ver registros en tiempo real, ejecuciones de acciones y errores. 

Para acceder a la consola de depuración, pase el cursor sobre una aplicación en [su lista][14] y haga clic en editar {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono. Haga clic en expandir {{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}} icono en la parte inferior derecha para ver toda la consola de depuración. La información dentro de la consola incluye:
- {{< ui >}}Action Executions{{< /ui >}}: Realice un seguimiento del éxito y el fracaso de las ejecuciones de acciones con sus entradas y salidas asociadas.
- {{< ui >}}Errors{{< /ui >}}: Vea los registros de errores, advertencias y mensajes informativos.
- {{< ui >}}Logs{{< /ui >}}: Vea los errores de configuración de sus acciones, transformadores, variables y componentes.
- {{< ui >}}App State{{< /ui >}}: Acceda a los cambios de estado de la aplicación en tiempo real.

{{< img src="actions/app_builder/app-builder-debug-console.png" alt="El panel expandido de la consola de depuración dentro de la vista del editor de una aplicación" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][8].

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /es/actions/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /es/actions/connections
[6]: /es/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[9]: /es/actions/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /es/actions/app_builder/events
[12]: /es/actions/app_builder/queries
[13]: /es/actions/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /es/actions/app_builder/build/#customize-your-app
[16]: /es/getting_started/integrations/
[17]: /es/actions/actions_catalog/
[18]: /es/actions/app_builder/build/#build-an-app-from-a-blueprint
[19]: /es/actions/app_builder/build/#build-an-app-from-a-layout
[20]: /es/actions/app_builder/build/#build-an-app-from-an-action
[21]: /es/actions/app_builder/build/#create-a-custom-app
[22]: /es/actions/app_builder/build/#build-an-app-with-ai
[23]: /es/actions/app_builder/build/#see-whats-possible-with-app-playground
[24]: https://app.datadoghq.com/app-builder/apps/edit?template=manage-datastore&viewMode=templatePreview
[25]: https://app.datadoghq.com/app-builder/apps/edit?template=export-synthetics&viewMode=templatePreview
[26]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to__write_custom_code&viewMode=templatePreview
[27]: /es/actions/forms/
[28]: /es/actions/datastores/
[29]: /es/actions/app_builder/embedded_apps/input_parameters/