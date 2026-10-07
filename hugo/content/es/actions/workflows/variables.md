---
algolia:
  tags:
  - workflow variables
  - variables
  - mutable
aliases:
- /es/service_management/workflows/actions/set_variables/
- /es/service_management/workflows/variables
description: Utilice variables de contexto, parámetros de entrada, parámetros de salida
  y variables personalizadas para pasar datos entre los pasos del flujo de trabajo.
disable_toc: false
further_reading:
- link: /actions/workflows/actions/flow_control#for-loop
  tag: Documentación
  text: Utilice un bucle for para realizar una acción de forma iterativa
title: Variables y parámetros
---
Las siguientes variables y parámetros están disponibles en los flujos de trabajo:
- [Variables de contexto](#context-variables): Las variables de contexto son una categoría amplia de variables inmutables que almacenan información contextual sobre un flujo de trabajo, o contienen datos que se pasan al flujo de trabajo mediante un evento de activación o mediante un paso en el flujo de trabajo.
- [Parámetros de entrada](#input-parameters): Los parámetros de entrada son pares clave-valor inmutables que puede utilizar para pasar datos a un flujo de trabajo en tiempo de ejecución.
- [Parámetros de salida](#output-parameters): Los parámetros de salida le permiten pasar el resultado de un flujo de trabajo a otro flujo de trabajo.
- [Variables personalizadas](#custom-variables): Las variables personalizadas son mutables. Le permiten declarar, actualizar y acceder a variables a lo largo de su flujo de trabajo.

## Variables de contexto {#context-variables}

La creación de flujos de trabajo útiles a veces requiere pasar datos de un paso a otro, o configurar pasos que actúen sobre los datos de la fuente de activación del flujo de trabajo. Puede realizar este tipo de interpolación de datos con variables de contexto.

- **Las variables de flujo de trabajo** le brindan información sobre el flujo de trabajo actual:
    - `WorkflowName`: El nombre del flujo de trabajo.
    - `WorkflowId`: El ID del flujo de trabajo.
    - `InstanceId`: El ID de la instancia de ejecución del flujo de trabajo.
- Algunos pasos vienen con **variables de salida de paso** integradas que le permiten pasar datos de ese paso a un paso posterior en su flujo de trabajo.
- **Las variables de activación** son pasadas al flujo de trabajo por el evento de activación.
- **Las variables de objeto de fuente** son pasadas al flujo de trabajo por el evento de activación.

La pestaña {{< ui >}}Context Variables{{< /ui >}} para cada paso proporciona un mapa de todas las variables de contexto disponibles para ese paso.

{{< img src="actions/workflows/variables/context-variables5.png" alt="La pestaña Variables de contexto" >}}

Acceda a una variable de contexto en un paso encerrándola entre llaves dobles (`{{`). Para acceder a campos dentro de variables de contexto, utilice la [sintaxis de expresión Handlebars][4].

### Variables de salida de paso {#step-output-variables}

Algunos pasos crean salidas que están disponibles para los pasos posteriores en un flujo de trabajo. Acceda a una variable de paso con la sintaxis: `Steps.<step_name>.<variable>`. Por ejemplo, para recuperar la variable de estado de solicitud de extracción (`state`) del paso de estado de solicitud de extracción de GitHub (`Get_pull_request_status`), usaría la siguiente variable de contexto:

```
{{ Steps.Get_pull_request_status.state }}
```

Si no está seguro de qué variable está buscando, Datadog sugiere salidas de paso existentes a medida que escribe. Alternativamente, puede consultar la pestaña {{< ui >}}Context Variables{{< /ui >}} para obtener una lista de las variables disponibles.

{{< img src="actions/workflows/variables/step-outputs2.png" alt="Datadog sugiere salidas de paso existentes a medida que escribe." style="width:100%;" >}}

### Variables de objeto de fuente {#source-object-variables}

Las variables de objeto de fuente son propiedades del evento desencadenante que se resuelven en la ejecución. Las variables disponibles en el flujo de trabajo dependen del tipo de activador que inició la instancia del flujo de trabajo. Por ejemplo, si la instancia del flujo de trabajo es activada por un monitor, la variable de ID del monitor está disponible usando `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

Todas las variables del objeto fuente son visibles en la pestaña {{< ui >}}Context Variables{{< /ui >}}.

{{< img src="actions/workflows/variables/context-variables-tab-source-object-variables2.png" alt="Las variables de objeto de origen en la pestaña Variables de contexto" style="width:60%;">}}

## Parámetros de entrada {#input-parameters}

Los parámetros de entrada son pares clave-valor inmutables que puede usar para pasar datos a un flujo de trabajo. Puede usar parámetros de entrada en flujos de trabajo que:
- se activan manualmente, como desde un Dashboard.
- usan activadores de mención, como Monitors y Security Signal Notification Rules.

Para agregar un parámetro de entrada:
1. Haga clic en el lienzo del flujo de trabajo.
1. Haga clic en el icono {{< ui >}}\+{{< /ui >}} junto a {{< ui >}}Input Parameters{{< /ui >}}.
1. Agregue un nombre de parámetro, tipo de datos y descripción para el parámetro. El nombre para mostrar se genera automáticamente a partir del nombre del parámetro. Marque la casilla {{< ui >}}Use custom display name{{< /ui >}} para personalizarlo. El nombre para mostrar es un nombre legible por humanos para el parámetro, mientras que el nombre del parámetro se utiliza para hacer referencia al parámetro en los pasos de su flujo de trabajo.
1. Opcionalmente, agregue un valor predeterminado para el parámetro. Si agrega un valor predeterminado, el parámetro es opcional en tiempo de ejecución.

Para hacer referencia al parámetro de entrada en un paso, utilice la sintaxis `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `usuario`, use `{{Trigger.user}}` .

La sección {{< ui >}}Input Parameters{{< /ui >}} muestra los nombres de todos los parámetros de entrada existentes junto con un contador. Pase el cursor sobre un contador para ver qué pasos están utilizando el parámetro.

{{< img src="actions/workflows/variables/input-parameter3.png" alt="Pase el cursor sobre un contador para ver qué pasos están utilizando el parámetro." style="width:60%;">}}

Puede agregar un parámetro de entrada implícito (un parámetro que aún no existe en el flujo de trabajo) escribiéndolo en un paso del flujo de trabajo usando la sintaxis `{{ Trigger.<parameter name> }}`. La próxima vez que guarde el flujo de trabajo, aparecerá un cuadro de diálogo que le permitirá convertir el parámetro en un parámetro explícito. Para obtener más información sobre cómo activar flujos de trabajo, consulte [Activar un flujo de trabajo][5].

Si está buscando un parámetro de entrada existente, comience a escribir `{{ Trigger.` para ver si aparece como sugerencia. Alternativamente, consulte la pestaña {{< ui >}}Context Variables{{< /ui >}} para obtener una lista de los parámetros disponibles.

## Parámetros de salida{#output-parameters}

Los parámetros de salida le permiten acceder al resultado de un flujo de trabajo. Esto es útil cuando desea pasar el resultado de un flujo de trabajo a otro flujo de trabajo o a una aplicación de App Builder.

Para agregar un parámetro de salida:
1. Haga clic en el lienzo del flujo de trabajo.
1. Haga clic en el icono {{< ui >}}\+{{< /ui >}} junto a {{< ui >}}Output Parameters{{< /ui >}}.
1. Agregue un nombre, valor y tipo de datos para el parámetro.
1. Opcionalmente, agregue un valor predeterminado para el parámetro. Si agrega un valor predeterminado, el parámetro es opcional en tiempo de ejecución.

La sección {{< ui >}}Output Parameters{{< /ui >}} muestra los nombres de todos los parámetros de salida existentes junto con un contador.

Para obtener información sobre cómo pasar datos entre flujos de trabajo, consulte [Acceder al resultado de un flujo de trabajo secundario][7].

Para ver un ejemplo de cómo usar parámetros de salida para pasar información entre flujos de trabajo y App Builder, consulte [devolver resultados de flujo de trabajo a una aplicación][6].

## Variables personalizadas{#custom-variables}

Para establecer una variable de flujo de trabajo mutable, utilice la acción [Establecer variable][1]. Puede utilizar esta acción para declarar, actualizar y acceder a variables personalizadas a lo largo de su flujo de trabajo, lo que le permite realizar operaciones de flujo de trabajo más complejas. Por ejemplo:
- _Manejo de la paginación de API_: las solicitudes de API a veces requieren que realice un seguimiento de un token de página o un desplazamiento.
- _Manejo de listas_: Puede usar una variable para inicializar una matriz y realizar acciones como map y reduce.
- _Iteración_: Las variables le permiten manipular y almacenar datos dentro de un [bucle for][2]. Luego puede usar esos datos en el resto del flujo de trabajo.

### Establezca una variable personalizada {#set-a-custom-variable}

Para establecer una variable personalizada:
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) en el lienzo de su flujo de trabajo para abrir el catálogo de acciones.
1. Busque y seleccione el paso {{< ui >}}Set variable{{< /ui >}}.
1. Haga clic en el paso {{< ui >}}Set variable{{< /ui >}} e ingrese un {{< ui >}}Step name{{< /ui >}}.
1. Ingrese un {{< ui >}}variable name{{< /ui >}}. Los nombres de las variables deben comenzar con una letra y solo pueden contener caracteres alfanuméricos y guiones bajos.
1. Ingrese un valor para la variable.
   - Escriba ``{{`` si desea usar una variable de contexto de flujo de trabajo.
   - Para crear un objeto, haga clic en el botón {{< ui >}}Create object{{< /ui >}} <i class="icon-api"></i>.
   - Para crear una matriz, haga clic en el botón {{< ui >}}Create array{{< /ui >}} <span id="icon-array">[ ]</span>.

Si necesita cambiar el valor de una variable personalizada después de establecerla, debe agregar un {{< ui >}}Set variable{{< /ui >}} paso adicional y volver a asignar la variable o crear una nueva variable.

Aquí hay un ejemplo de un flujo de trabajo que demuestra el {{< ui >}}Set variable{{< /ui >}} paso:

1. En su flujo de trabajo, comience con un {{< ui >}}Set variable{{< /ui >}} paso para declarar una variable llamada `intList` y asígnele el valor `[1,2,3,4]`.
1. Agregue un segundo paso {{< ui >}}Set variable{{< /ui >}} y declare una variable llamada `evenList` con el valor `${Variables.intList.filter(number => number % 2 === 0)}`. Esta es una [expresión de JavaScript en línea][8] que filtra los números impares.
1. Agregue un paso {{< ui >}}Echo{{< /ui >}} para mostrar el valor de `evenList` (`2,4`).

{{< img src="actions/workflows/variables/set-variable-updated.png" alt="Este flujo de trabajo establece una variable para contener una lista de números, declara una segunda variable que filtra los números impares de la lista mediante una expresión en línea y muestra el valor de la segunda variable." style="width:100%;" >}}

### Acceda a una variable personalizada {#access-a-custom-variable}

Puede acceder a una variable personalizada en su flujo de trabajo usando `{{ Variables.variableName }}`. For example, to access a custom variable named `DashboardList`, use `{{ Variables.DashboardList }}`.

### Iteración {#iteration}

Establecer una variable personalizada dentro de un {{< ui >}}For loop{{< /ui >}} o un {{< ui >}}While loop{{< /ui >}} le permite almacenar datos para su uso fuera del bucle. Por ejemplo, si está realizando múltiples solicitudes de API dentro de un {{< ui >}}For loop{{< /ui >}}, puede establecer una variable personalizada y agregar los datos que necesita en cada iteración. Fuera del bucle, puede acceder a la variable personalizada y manejar los datos que recopiló.

Para evitar un error de tipo resultante de una variable no definida, asigne una variable personalizada antes de usarla en un bucle. En el ejemplo siguiente, la variable personalizada `evenList` se establece en un array vacío antes de usarse en el bucle.

{{< img src="actions/workflows/variables/loop.png" alt="Este flujo de trabajo establece una variable antes de usarla en un bucle." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /es/actions/workflows/actions/flow_control#for-loop
[3]: https://chat.datadoghq.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /es/actions/workflows/trigger
[6]: /es/actions/app_builder/queries/#return-workflow-results-to-an-app
[7]: /es/actions/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /es/actions/workflows/expressions/#inline-javascript-expressions