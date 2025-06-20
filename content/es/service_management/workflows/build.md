---
algolia:
  tags:
  - flujo de trabajo
  - flujos de trabajo
  - automatización del flujo de trabajo
aliases:
- /es/workflows/build
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con Workflow Automation
- link: /actions/actions_catalog
  tag: Documentación
  text: Examinar las acciones disponibles en el Catálogo de acciones
- link: /security/cloud_security_management/workflows
  tag: Documentación
  text: Automatizar los flujos de trabajo de seguridad con Workflow Automation
- link: /service_management/workflows/variables
  tag: Documentación
  text: Variables y parámetros
title: Crear flujos de trabajo
---

Puedes crear flujos de trabajo o editar los existentes desde la página [Workflow Automation][1]. La página muestra información sobre los flujos de trabajo existentes, como el propietario del flujo de trabajo, el tipo de activador, las fechas de la última modificación y ejecución de cada flujo de trabajo, y si el flujo de trabajo está publicado o no.
- Pasa el cursor por encima de un flujo de trabajo para ver las opciones de eliminar, clonar o editar los permisos del flujo de trabajo.
- Selecciona **My workflows** (Mis flujos de trabajo) si deseas ver solo los flujos de trabajo que creaste.

## Construir un flujo de trabajo a partir de un plano

1. Haz clic en la pestaña [**Blueprints** (planos)][5].
1. Si lo deseas, utiliza la barra Buscar para acotar la lista de planos por nombre, categoría o integración.
1. Busca el plano que deseas utilizar y haz clic en él. Aparecerá el lienzo de flujo de trabajo.
1. Haz clic en **Create From Blueprint** (Crear a partir de Blueprint). El lienzo de flujo de trabajo se actualiza para mostrar el flujo de trabajo recién creado.
1. Introduce un nuevo nombre y descripción para el flujo de trabajo.
1. Opcionalmente, selecciona o introduce etiquetas (tags) que te gustaría aplicar al flujo de trabajo. Para más información sobre etiquetas Datadog, ve [Getting Started with Tags (Empezando con etiquetas)][7].
1. Opcionalmente, selecciona cualquier [service (servicio)][8] relacionado para aplicarlo al flujo de trabajo.
1. Opcionalmente, selecciona [teams (equipos)][9] para asociarlos al flujo de trabajo. Si un equipo no existe, puedes introducir un nombre para crearlo.
1. Haz clic en **Save** (Guardar) para aplicar los cambios.
1. Los pasos del flujo de trabajo que requieren actualizaciones están marcados con signos de exclamación. Haz clic en cada paso del flujo de trabajo que desees modificar y rellena los campos vacíos en **Configure** (Configurar) pestaña.
1. Cuando hayas terminado de modificar el flujo de trabajo, haz clic en **Run** (Ejecutar) para probar tu flujo de trabajo.
1. Cuando estés listo para publicar tu flujo de trabajo, haz clic en **Publish** (Publicar). Los flujos de trabajo publicados acumulan costes en función de las ejecuciones del flujo de trabajo. Para obtener más información, consulta la [Datadog Pricing page (página de precios Datadog)][4].

## Crear un flujo de trabajo con IA

Si no estás seguro de por dónde empezar, puedes generar automáticamente un flujo de trabajo con IA. Para generar un flujo de trabajo:

1. En la página [Workflow Automation][1], haz clic en **New Workflow** (Nuevo flujo de trabajo).
1. Haz clic en **<i class="icon-bits-ai"></i> Build with Bits AI** (Crear con Bits AI).
1. Introduce una descripción detallada de tu flujo de trabajo. Especifica las integraciones y las acciones que deseas utilizar.
1. Haz clic en la flecha hacia arriba (**↑**) para crear tu aplicación.

## Crear un flujo de trabajo personalizado

Para crear un flujo de trabajo, haz clic en **New workflow** (Nuevo flujo de trabajo) en la página [Workflow Automation][1].

Para configurar tu flujo de trabajo:
1. En el panel de configuración de flujo de trabajo, introduce un **Name** (Nombre) para tu flujo de trabajo.
1. Opcionalmente, selecciona o introduce etiquetas (tags) que te gustaría aplicar al flujo de trabajo. Para más información sobre etiquetas Datadog, ve [Getting Started with Tags (Empezando con etiquetas)][7].
1. Opcionalmente, selecciona cualquier [service (servicio)][8] relacionado para aplicarlo al flujo de trabajo.
1. Opcionalmente, selecciona [teams (equipos)][9] para asociarlos al flujo de trabajo. Si un equipo no existe, puedes introducir un nombre para crearlo.
1. Introduce los parámetros de entrada o salida si tu flujo de trabajo los utiliza.
1. Haz clic en **Save** (Guardar) para aplicar los cambios.

Si no estás seguro de tu configuración de flujo de trabajo, puedes volver al panel más tarde haciendo clic en cualquier parte del lienzo del flujo de trabajo.

### Crear un flujo de trabajo con el generador de flujos de trabajo

1. Si tu flujo de trabajo requiere un desencadenante, haz clic en **Add Trigger** (Añadir desencadenante). Para obtener más información, consulta [Trigger a Workflow (Activar un flujo de trabajo)][3].
1. Haz clic en **Add Step** (Añadir paso) para empezar a añadir pasos a tu flujo de trabajo.
1. Buscar una acción utilizando la barra Buscar o navega por integraciones y sus acciones relacionadas para encontrar la acción que buscas. Haz clic en una acción para añadirla como paso en el lienzo de tu flujo de trabajo.
1. Haz clic en el paso en el lienzo de flujo de trabajo para configurar o ver sus salidas o variables de contexto. Para obtener más información sobre salidas y variables de contexto, consulta [Variables de contexto][14].
1. Una vez configurado el paso, haz clic en el icono de AI <i class="icon-bits-ai"></i> o en el icono más (**+**) para añadir otro paso, o guarda el flujo de trabajo si ya terminaste.
1. Cuando estés listo para publicar tu flujo de trabajo, haz clic en **Publish** (Publicar). Los flujos de trabajo publicados acumulan costes en función de las ejecuciones del flujo de trabajo. Para obtener más información, consulta la [Datadog Pricing page (página de precios Datadog)][4].

Puedes editar un paso del flujo de trabajo en cualquier momento haciendo clic sobre él. Haz clic y arrastra los pasos de tu flujo de trabajo para reorganizarlos.

#### Atajos y herramientas del lienzo

Para ver los atajos del teclado y el ratón para el lienzo del generador de flujos de trabajo, escribe `?` (tecla Shift+`/`) o haz clic en el botón **Keyboard** (Teclado) {{< img src="service_management/workflows/keyboard-icon.png" inline="true" style="width:40px;">}}. Aparecerá un lista de atajos.

Los botones **Zoom out** (Alejar) {{< img src="service_management/workflows/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, **Zoom in** (Acercar) {{< img src="service_management/workflows/zoom-in-mag-icon.png" inline="true" style="width:30px;">}} y **Reset viewport** (Restablecer ventana gráfica) {{< img src="service_management/workflows/reset-viewport-icon.png" inline="true" style="width:34px;">}} controlan cómo se muestra la ventana gráfica.

El botón **Auto layout** (Disposición automática) {{< img src="service_management/workflows/auto-layout-icon.png" inline="true" style="width:80px;">}} alinea y distribuye los pasos del flujo de trabajo.

El botón **Add annotation** (Añadir anotación) {{< img src="service_management/workflows/add-annotation-icon.png" inline="true" style="width:30px;">}} te permite añadir notas de anotación al flujo de trabajo. Estas notas ofrecen una barra de formato para añadir diversos formatos de texto, como negrita y cursiva, enlaces y listas. También puedes ingresar tus anotaciones en Markdown.

{{< img src="service_management/workflows/workflow-annotation-with-bar.png" alt="Una anotación vacía, con la barra de formato sobre ella." style="width:70%;" >}}

## Probar un paso

Consulta la página de test y depuración para obtener información sobre [cómo hacer un test de un paso][11].

## Publicar un flujo de trabajo

Los flujos de trabajo programados y activados no se activan automáticamente hasta que los hayas publicado. Para publicar el flujo de trabajo, haz clic en **Publish** (Publicar) en la página del flujo de trabajo.

Los flujos de trabajo publicados acumulan costes en función de las ejecuciones del flujo de trabajo. Para obtener más información, consulta la [Datadog Pricing page (página de precios Datadog)][4].

## Variables y parámetros

Para obtener información sobre el uso de variables y parámetros en los flujos de trabajo, consulta [Variables y parámetros][12].

## Notificaciones de flujos de trabajo

Puedes configurar un flujo de trabajo para que envíe una notificación en caso de éxito o error. Se admiten las siguientes integraciones:
- Slack
- Microsoft Teams
- PagerDuty
- Correo electrónico

Para añadir una notificación:
1. En el panel de configuración del flujo de trabajo, desplázate hasta la sección **Notifications** (Notificaciones).
1. Para añadir una notificación si el flujo de trabajo tiene éxito:
   1. Haz clic en el icono más (`+`) junto a **Notify on success** (Notificar en caso de éxito).
   1. Selecciona la dirección de la integración con la que deseas utilizar las notificaciones.
   1. Rellena los campos obligatorios de la integración especificada.
   1. Haz clic en **Guardar** para guardar el flujo de trabajo.
1. Para añadir una notificación si el flujo de trabajo tiene un error:
   1. Haz clic en el icono más (`+`) junto a **Notify on failure** (Notificar en caso de error).
   1. Selecciona la dirección de la integración con la que deseas utilizar las notificaciones.
   1. Rellena los campos obligatorios de la integración especificada.
   1. Haz clic en **Guardar** para guardar el flujo de trabajo.

## Tratamiento de errores

Puedes especificar el número de veces que deseas que tu flujo de trabajo reintente un paso fallido, y en qué intervalo, antes de pasar a una ruta de error opcional. Si no hay ninguna ruta de error, el flujo de trabajo finaliza una vez agotados todos los reintentos.

### Reintentos

Para configurar reintentos para un paso:
1. Haz clic en el paso en el lienzo de flujo de trabajo.
1. En la sección **Retries** (Reintentos), ajusta los valores **Interval** (Intervalo) y **Max retries** (Reintentos máximos).
1. Guarda tu flujo de trabajo para aplicar los cambios.

### Añadir una ruta de error

Puedes añadir una ruta de error para que el flujo de trabajo la siga si encuentra un error.

Para añadir una ruta de error:
1. Pasa el cursor por encima del paso en el que deseas añadir una ruta de error.
1. Haz clic y arrastra el icono **Error path** (Ruta de error) {{< img src="service_management/workflows/error-path-icon.png" inline="true" style="width:24px;">}} para colocar una nueva ruta de error en el lienzo.
1. Selecciona un paso del flujo de trabajo para añadirlo a la ruta de error.
1. Después de configurar tu paso, puedes añadir más pasos a una ruta de error e incluso fusionar tu ruta de error de nuevo en la ruta principal del flujo de trabajo.
1. Cuando hayas terminado de configurar los pasos de la ruta de error, haz clic en **Save** (Guardar) para aplicar los cambios.

## Esperar hasta la condición

Algunas acciones permiten añadir una condición que debe cumplirse antes de que un flujo de trabajo pueda marcar un paso como completo y continuar.

Para añadir una condición:
1. Haz clic en el paso en el lienzo de flujo de trabajo.
1. En la sección **Wait until condition** (Condición de espera), utiliza el menú desplegable para seleccionar una condición preconfigurada, o elige **Configure custom wait condition** (Configurar condición de espera personalizada) y crea tu propia condición.
   - La lista de condiciones preconfiguradas disponibles depende de la acción.
   - Las variables de sentencias condicionales pueden ser una cadena, un número, un booleano o una variable de salida de un paso.
   - En una sentencia condicional personalizada, solo se pueden utilizar las variables de salida del paso actual.
1. Ingresa un tiempo máximo de espera para el flujo de trabajo. Si la condición no se cumple a tiempo, el paso genera un error.

{{< img src="service_management/workflows/wait-until-condition2.png" alt="Un ejemplo de condición de espera." style="width:100%;" >}}

## Editar un flujo de trabajo con JSON

Para editar un flujo de trabajo en JSON, haz clic en **Edit JSON Spec** (Editar especificación en JSON) en la página del flujo de trabajo. El editor JSON también te permite hacer lo siguiente:
- **Aplicar formato a JSON**: embellece tu código JSON.
- **Exportar en JSON**: descarga el flujo de trabajo.

## Interactuar con los flujos de trabajo mediante la API

Para realizar tareas con la API, consulta la [documentación de la API de automatización de flujos de trabajo][13].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /es/service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /es/service_management/workflows/actions/#testing-expressions-and-functions
[7]: /es/getting_started/tagging/
[8]: /es/glossary/#service
[9]: /es/account_management/teams/
[10]: https://datadoghq.slack.com/
[11]: /es/service_management/workflows/test_and_debug/#test-a-step
[12]: /es/service_management/workflows/variables/
[13]: /es/api/latest/workflow-automation/
[14]: /es/service_management/workflows/variables/#context-variables