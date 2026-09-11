---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/workflows/build
- /es/service_management/workflows/build
description: Cree flujos de trabajo a partir de Blueprints o construya flujos de trabajo
  personalizados mediante asistencia de IA, configuración manual y acciones de arrastrar
  y soltar.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Introducción a Workflow Automation
- link: /actions/actions_catalog
  tag: Documentación
  text: Explore las acciones disponibles en el Action Catalog
- link: /security/cloud_security_management/workflows
  tag: Documentación
  text: Automatice Security Workflows con Workflow Automation
- link: /actions/workflows/variables
  tag: Documentación
  text: Variables y parámetros
title: Crear flujos de trabajo
---
Puede crear flujos de trabajo o editar flujos de trabajo existentes desde la página [Workflow Automation][1]. La página enumera información sobre los flujos de trabajo existentes, como el propietario del flujo de trabajo, el tipo de activador, las fechas en las que cada flujo de trabajo se modificó y ejecutó por última vez, y si el flujo de trabajo está publicado o no.
- Pase el cursor sobre un flujo de trabajo para ver las opciones para eliminar, clonar o editar los permisos del flujo de trabajo.
- Active {{< ui >}}My workflows{{< /ui >}} si desea ver solo los flujos de trabajo que usted creó.

## Cree un flujo de trabajo a partir de un Blueprint {#build-a-workflow-from-a-blueprint}

1. Haga clic en la pestaña [**Blueprints**][5].
1. Si lo desea, utilice la barra de búsqueda para limitar la lista de Blueprints por nombre, categoría o integración.
1. Busque el Blueprint que desea utilizar y haga clic en él. Aparece el lienzo del flujo de trabajo.
1. Haga clic en {{< ui >}}Create From Blueprint{{< /ui >}}. El lienzo del flujo de trabajo se actualiza para mostrar el flujo de trabajo recién creado.
1. Ingrese un nombre y una descripción nuevos para el flujo de trabajo.
1. Opcionalmente, seleccione o ingrese las etiquetas que desea aplicar al flujo de trabajo. Para obtener más información sobre las etiquetas de Datadog, consulte [Getting Started with Tags][7].
1. Opcionalmente, seleccione los [servicios][8] relacionados que desea aplicar al flujo de trabajo.
1. Opcionalmente, seleccione los [equipos][9] que desea asociar con el flujo de trabajo. Si un equipo no existe, puede ingresar un nombre para crearlo.
1. Haga clic en {{< ui >}}Save{{< /ui >}} para aplicar sus cambios.
1. Los pasos del flujo de trabajo que requieren actualizaciones están marcados con signos de exclamación. Haga clic en cada paso del flujo de trabajo que desee modificar y complete los campos vacíos en la pestaña {{< ui >}}Configure{{< /ui >}}.
1. Cuando termine de modificar el flujo de trabajo, haga clic en {{< ui >}}Run{{< /ui >}} para probarlo.
1. Cuando esté listo para publicar su flujo de trabajo, haga clic en {{< ui >}}Publish{{< /ui >}}. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][4].

## Cree o edite un flujo de trabajo con IA {#create-a-workflow-with-ai}

Si no está seguro de por dónde empezar, puede generar automáticamente un flujo de trabajo o iterar sobre uno existente con IA.

Para generar un flujo de trabajo:
1. Desde la página [Workflow Automation][1], haga clic en {{< ui >}}New Workflow{{< /ui >}}.
1. Haga clic en {{< ui >}}Create a workflow with AI{{< /ui >}}.
1. Ingrese una instrucción detallada para su flujo de trabajo. Especifique las integraciones y acciones que desea utilizar.
1. Haga clic en la flecha hacia arriba ({{< ui >}}↑{{< /ui >}}) para crear su flujo de trabajo.

Para iterar sobre un flujo de trabajo existente:
1. Desde un flujo de trabajo existente, haga clic en {{< ui >}}Edit with AI{{< /ui >}}.
1. Ingrese una instrucción detallada para el comportamiento que desea agregar a su flujo de trabajo. Incluya las integraciones y acciones que desea utilizar.
1. Haga clic en la flecha hacia arriba ({{< ui >}}↑{{< /ui >}}) para añadir la funcionalidad a su flujo de trabajo.

<div class="alert alert-info">La IA de Workflow Automation no responde preguntas sobre el producto. Si tiene preguntas o comentarios, considere unirse al canal <strong>#workflows</strong> en el <a href="https://chat.datadoghq.com/">Slack de la comunidad de Datadog</a></div>

## Cree un flujo de trabajo personalizado {#create-a-custom-workflow}

Para crear un flujo de trabajo, haga clic en {{< ui >}}New workflow{{< /ui >}} en la página [Workflow Automation][1].

Para configurar su flujo de trabajo:
1. En el panel de configuración del flujo de trabajo, ingrese un {{< ui >}}Name{{< /ui >}} para su flujo de trabajo.
1. Opcionalmente, seleccione o ingrese las etiquetas que desea aplicar al flujo de trabajo. Para obtener más información sobre las etiquetas de Datadog, consulte [Getting Started with Tags][7].
1. Opcionalmente, seleccione los [servicios][8] relacionados que desea aplicar al flujo de trabajo.
1. Opcionalmente, seleccione los [equipos][9] que desea asociar con el flujo de trabajo. Si un equipo no existe, puede ingresar un nombre para crearlo.
1. Ingrese los parámetros de entrada o salida si su flujo de trabajo los utiliza.
1. Haga clic en {{< ui >}}Save{{< /ui >}} para aplicar sus cambios.

Si no está seguro de la configuración de su flujo de trabajo, puede volver al panel más tarde haciendo clic en cualquier parte del lienzo del flujo de trabajo.

### Cree un flujo de trabajo con el generador de flujos de trabajo {#build-a-workflow-with-the-workflow-builder}

1. Si su flujo de trabajo requiere un activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}}. Para obtener más información, consulte [Activar un flujo de trabajo][3].
1. Haga clic en {{< ui >}}Add Step{{< /ui >}} para comenzar a añadir pasos a su flujo de trabajo.
1. Busque una acción utilizando la barra de búsqueda o explore las integraciones y sus acciones relacionadas para encontrar la acción que busca. Haga clic en una acción para añadirla como un paso en el lienzo de su flujo de trabajo.
1. Haga clic en el paso en el lienzo del flujo de trabajo para configurarlo o ver sus salidas o variables de contexto. Para obtener más información sobre las salidas y las variables de contexto, consulte [Variables de contexto][14].
1. Después de configurar el paso, haga clic en el icono de IA <i class="icon-bits-ai"></i> o en el icono de más ({{< ui >}}\+{{< /ui >}}) para agregar otro paso, o guarde el flujo de trabajo si ha terminado.
1. Cuando esté listo para publicar su flujo de trabajo, haga clic en {{< ui >}}Publish{{< /ui >}}. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][4].

Puede editar un paso en el flujo de trabajo en cualquier momento haciendo clic en él. Haga clic y arrastre los pasos en su flujo de trabajo para reorganizarlos.

#### Atajos y herramientas del lienzo {#shortcuts-and-canvas-tools}

Para ver los atajos de teclado y mouse para el lienzo del generador de flujos de trabajo, escriba `?` (shift+`/`) o haga clic en el {{< ui >}}Keyboard{{< /ui >}} {{< img src="actions/workflows/build/keyboard-icon.png" inline="true" style="width:40px;">}} Botón. Aparece una lista de atajos.

El {{< ui >}}Zoom out{{< /ui >}} {{< img src="actions/workflows/build/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, {{< ui >}}Zoom in{{< /ui >}} {{< img src="actions/workflows/build/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}, y {{< ui >}}Reset viewport{{< /ui >}} {{< img src="actions/workflows/build/reset-viewport-icon.png" inline="true" style="width:34px;">}} Los botones controlan cómo se muestra el visor.

El {{< ui >}}Auto layout{{< /ui >}} {{< img src="actions/workflows/build/auto-layout-icon.png" inline="true" style="width:80px;">}} botón alinea y distribuye los pasos de su flujo de trabajo.

El {{< ui >}}Add annotation{{< /ui >}} {{< img src="actions/workflows/build/add-annotation-icon.png" inline="true" style="width:30px;">}} botón le permite agregar notas de anotación a su flujo de trabajo. Estas notas ofrecen una barra de formato para agregar varios formatos de texto, como negrita y cursiva, enlaces y listas. También puede ingresar sus anotaciones en Markdown.

{{< img src="actions/workflows/build/workflow-annotation-with-bar.png" alt="Una anotación vacía, con la barra de formato mostrada encima" style="width:70%;" >}}

## Probar un paso {#test-a-step}

Consulte la página de prueba y depuración para obtener información sobre [cómo probar un paso][11].

## Publicar un flujo de trabajo {#publish-a-workflow}

Los flujos de trabajo programados y activados no se activan automáticamente hasta que los haya publicado. Para publicar el flujo de trabajo, haga clic en {{< ui >}}Publish{{< /ui >}} desde la página del flujo de trabajo.

Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][4].

### Actualización de un flujo de trabajo publicado {#updating-a-published-workflow}

Puede actualizar flujos de trabajo publicados sin afectar la versión activa hasta que esté listo.

La edición de un flujo de trabajo publicado crea un borrador. Todos los cambios realizados en el borrador no alteran el flujo de trabajo publicado. Cada flujo de trabajo puede tener un borrador activo, que todos los editores pueden modificar. Cuando esté listo, haga clic en {{< ui >}}Publish Changes{{< /ui >}} para reemplazar la versión publicada.

Los borradores ejecutan todos los pasos configurados como cualquier flujo de trabajo normal. Solo puede ejecutar borradores desde el editor de flujos de trabajo.

Para descartar el borrador, haga clic en {{< ui >}}cog icon{{< /ui >}} en la esquina superior derecha del editor y seleccione {{< ui >}}Discard draft{{< /ui >}}.

**Notas**:
- La ejecución de un borrador para flujos de trabajo publicados no genera costos.
- Cualquier actualización a las propiedades del flujo de trabajo (nombre, etiquetas o notificaciones) omite el flujo de trabajo de borrador y se aplica inmediatamente a la versión publicada.

## Variables y parámetros {#variables-and-parameters}

Para obtener información sobre el uso de variables y parámetros en sus flujos de trabajo, consulte [Variables and parameters][12].

## Notificaciones del flujo de trabajo {#workflow-notifications}

Puede configurar su flujo de trabajo para que le envíe una notificación en caso de éxito o error. Se admiten las siguientes integraciones:
- Slack
- Microsoft Teams
- PagerDuty
- Correo electrónico

Para agregar una notificación:
1. En el panel de configuración del flujo de trabajo, desplácese hacia abajo hasta la sección {{< ui >}}Notifications{{< /ui >}}.
1. Para agregar una notificación si el flujo de trabajo tiene éxito:
   1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) junto a {{< ui >}}Notify on success{{< /ui >}}.
   1. Seleccione la integración que desea usar para las notificaciones.
   1. Complete los campos obligatorios para la integración especificada.
   1. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar su flujo de trabajo.
1. Para agregar una notificación si el flujo de trabajo falla:
   1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) junto a {{< ui >}}Notify on failure{{< /ui >}}.
   1. Seleccione la integración que desea usar para las notificaciones.
   1. Complete los campos obligatorios para la integración especificada.
   1. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar su flujo de trabajo.

## Manejo de errores {#error-handling}

Puede especificar la cantidad de veces que desea que su flujo de trabajo reintente un paso fallido, y en qué intervalo, antes de pasar a una ruta de error opcional. Si no hay una ruta de error presente, el flujo de trabajo termina después de que se agoten todos los reintentos.

### Reintentos {#retries}

Para configurar los reintentos de un paso:
1. Haga clic en el paso en el lienzo del flujo de trabajo.
1. En la sección {{< ui >}}Retries{{< /ui >}}, ajuste los valores de {{< ui >}}Interval{{< /ui >}} y {{< ui >}}Max retries{{< /ui >}}.
1. Guarde su flujo de trabajo para aplicar los cambios.

### Agregar una ruta de error {#add-an-error-path}

Puede agregar una ruta de error para que el flujo de trabajo la siga si encuentra un error.

Para agregar una ruta de error:
1. Pase el cursor sobre el paso donde desea agregar una ruta de error.
1. Haga clic y arrastre el icono {{< ui >}}Error path{{< /ui >}} {{< img src="actions/workflows/build/error-path-icon.png" inline="true" style="width:24px;">}} para colocar una nueva ruta de error en el lienzo.
1. Seleccione un paso del flujo de trabajo para agregarlo a la ruta de error.
1. Después de configurar su paso, puede agregar más pasos a una ruta de error e incluso combinar su ruta de error nuevamente con la ruta principal del flujo de trabajo.
1. Cuando termine de configurar los pasos de su ruta de error, haga clic en {{< ui >}}Save{{< /ui >}} para aplicar sus cambios.

## Espere hasta la condición {#wait-until-condition}

Algunas acciones le permiten agregar una condición que debe cumplirse antes de que un flujo de trabajo pueda marcar un paso como completado y continuar.

Para agregar una condición:
1. Haga clic en el paso en el lienzo del flujo de trabajo.
1. En la sección {{< ui >}}Wait until condition{{< /ui >}}, use el menú desplegable para seleccionar una condición preconfigurada, o seleccione {{< ui >}}Configure custom wait condition{{< /ui >}} y cree su propia condición.
   - La lista de condiciones preconfiguradas disponibles depende de la acción.
   - Las variables de la declaración condicional pueden ser una cadena, un número, un booleano o una variable de salida de paso.
   - Solo se pueden usar las variables de salida del paso actual en una declaración condicional personalizada.
1. Ingrese un tiempo de espera máximo para el flujo de trabajo. Si la condición no se cumple a tiempo, el paso falla.

{{< img src="actions/workflows/build/wait-until-condition2.png" alt="Ejemplo de condición de espera" style="width:100%;" >}}

## Edite un flujo de trabajo con JSON {#edit-a-workflow-with-json}

Edite un flujo de trabajo en JSON haciendo clic en {{< ui >}}Edit JSON Spec{{< /ui >}} en su página de flujo de trabajo. El editor de JSON también le permite:
- {{< ui >}}Format JSON{{< /ui >}}: Embellezca su JSON.
- {{< ui >}}Export JSON{{< /ui >}}: Descargue el flujo de trabajo.

## Interactúe con flujos de trabajo usando la API {#interact-with-workflows-using-the-api}

Para realizar tareas usando la API, consulte la [documentación de la Workflow Automation API][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /es/actions/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /es/actions/workflows/actions/#testing-expressions-and-functions
[7]: /es/getting_started/tagging/
[8]: /es/glossary/#service
[9]: /es/account_management/teams/
[10]: https://chat.datadoghq.com/
[11]: /es/actions/workflows/test_and_debug/#test-a-step
[12]: /es/actions/workflows/variables/
[13]: /es/api/latest/workflow-automation/
[14]: /es/actions/workflows/variables/#context-variables