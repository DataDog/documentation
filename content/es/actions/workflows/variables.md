---
algolia:
  tags:
  - variables de flujo de trabajo
  - variables
  - mutable
aliases:
- /es/service_management/workflows/actions/set_variables/
- /es/service_management/workflows/variables
disable_toc: false
further_reading:
- link: /service_management/workflows/actions/flow_control#for-loop
  tag: Documentación
  text: Utilizar un bucle for para realizar una acción de forma iterativa
title: Variables y parámetros
---

Las siguientes variables y parámetros están disponibles en los flujos de trabajo:
- [Variables de contexto](#context-variables): las variables de contexto son una amplia categoría de variables inmutables que almacenan información contextual sobre un flujo de trabajo, o contienen datos que se pasan al flujo de trabajo por un evento desencadenante o por un paso en el flujo de trabajo.
- [Parámetros de entrada](#input-parameters): los parámetros de entrada son pares clave-valor inmutables que puedes utilizar para pasar datos a un flujo de trabajo en tiempo de ejecución.
- [Parámetros de salida](#output-parameters): los parámetros de salida permiten pasar el resultado de un flujo de trabajo a otro flujo de trabajo.
- [Variables personalizadas](#custom-variables): las variables personalizadas son mutables. Te permiten declarar, actualizar y acceder a variables a lo largo de tu flujo de trabajo.

## Variables de contexto

La creación de flujos de trabajo útiles a veces requiere pasar datos de un paso a otro, o configurar pasos que actúen sobre datos de la fuente desencadenante del flujo de trabajo. Puede realizar este tipo de interpolación de datos con variables de contexto.

- **Workflow variables** (las variables de flujo de trabajo) te proporcionan información sobre el flujo de trabajo actual:
    - `WorkflowName`: el nombre del flujo de trabajo.
    - `WorkflowId`: el ID del flujo de trabajo.
    - `InstanceId`: el ID de la instancia de ejecución del flujo de trabajo.
- Algunos pasos vienen con **step output variables** (variables de salida de paso) incorporadas que te permiten pasar datos de ese paso a un paso posterior en tu flujo de trabajo.
- **Trigger variables** (Las variables de activación) se introducen en el flujo de trabajo a través del evento desencadenante.
- **Source object variables** (Las variables de objeto fuente) son introducidas en el flujo de trabajo por el evento desencadenante.

La pestaña de **Context Variables** (variables de contexto) para cada paso proporciona un mapa de todas las variables de contexto disponibles para ese paso.

{{< img src="service_management/workflows/context-variables5.png" alt="La pestaña Variables de contexto" >}}

Accede a una variable de contexto en un paso encerrándola entre llaves dobles (`{{`). Para acceder a campos dentro de variables de contexto, utiliza la [Sintaxis de expresión Handlebars][4].

### Variables de salida por pasos

Algunos pasos crean salidas que están disponibles para pasos posteriores en un flujo de trabajo. Accede a una variable de paso con la sintaxis `Steps.<step_name>.<variable>`. Por ejemplo, para recuperar la variable de estado de la solicitud de extracción (`state`) del paso de estado de la solicitud de extracción de GitHub (`Get_pull_request_status`), utilizarías la siguiente variable de contexto:

```
{{ Steps.Get_pull_request_status.state }}
```

Si no estás seguro de qué variable buscas, Datadog te sugiere salidas de pasos existentes a medida que escribes. También puedes consultar la pestaña [Context Variables (variables de contexto)](#context-variables) para consultar lista de las variables disponibles.

{{< img src="service_management/workflows/step-outputs2.png" alt="Datadog sugiere las salidas del paso existente mientras escribes." style="width:100%;" >}}

### Variables del objeto fuente

Las variables del objeto fuente son propiedades del evento desencadenante que se resuelven en la ejecución. Las variables disponibles en el flujo de trabajo dependen del tipo de disparador que inició la instancia del flujo de trabajo. Por ejemplo, si la instancia de flujo de trabajo es desencadenada por un monitor, la variable ID del monitor está disponible utilizando `{{Source.monitor.id}}`. Si el flujo de trabajo se desencadena por una detección de señal de seguridad o una regla de notificación, el ID de la señal está disponible utilizando `{{Source.securitySignal.id}}`.

Todas las variables del objeto fuente son visibles en la pestaña de Variables de contexto.

{{< img src="service_management/workflows/context-variables-tab-source-object-variables2.png" alt="Las variables objeto de origen en la pestaña de Variables de contexto" style="width:60%;">}}

## Parámetros de entrada

Los parámetros de entrada son pares clave-valor inmutables que puedes utilizar para pasar datos a un flujo de trabajo. Puedes utilizar parámetros de entrada en flujos de trabajo que:
- Se activan manualmente, por ejemplo, desde dashboard.
- Utilizar disparadores de mención, como monitores y Reglas de notificaciones de señal de seguridad.

Para añadir un parámetro de entrada:
1. Haz clic en el lienzo del flujo de trabajo.
1. Haz clic en el icono **+** situado junto a **Input Parameters** (Parámetros de entrada).
1. Añade un nombre de parámetro, un tipo de datos y una descripción para el parámetro. El nombre para mostrar se genera automáticamente a partir del nombre del parámetro. Verifica la casilla **Use custom display name** (Usar nombre para mostrar personalizado) para personalizarlo. El nombre para mostrar es un nombre legible para el parámetro, mientras que el nombre del parámetro se utiliza para hacer referencia al parámetro en tus pasos del flujo de trabajo.
1. Opcionalmente, añade un valor por defecto para el parámetro. Si añades un valor por defecto, el parámetro es opcional en tiempo de ejecución.

Para hacer referencia al parámetro de entrada en un paso, utiliza la sintaxis `{{ Trigger.<parameter name>}}`. Por ejemplo, para hacer referencia a un parámetro de entrada denominado `user`, utiliza `{{Trigger.user}}`.

La sección **Input Parameters** (Parámetros de entrada) muestra los nombres de todos los parámetros de entrada existentes junto con un contador. Pasa el cursor por encima de un contador para ver qué pasos utilizan el parámetro.

{{< img src="service_management/workflows/input-parameter3.png" alt="Pasa sobre un contador para ver qué pasos están usando el parámetro." style="width:60%;">}}

Puedes añadir un parámetro de entrada implícito (un parámetro que aún no existe en el flujo de trabajo) escribiéndolo en un paso del flujo de trabajo utilizando la sintaxis `{{ Trigger.<parameter name> }}`. La próxima vez que guardes el flujo de trabajo, aparecerá un cuadro de diálogo que te permitirá convertir el parámetro en uno explícito. Para obtener más información sobre la activación de flujos de trabajo, consulta [Trigger a workflow (Activar un flujo de trabajo)][5].

Si estás buscando un parámetro de entrada existente, empieza a escribir `{{ Trigger.` para ver si aparece como sugerencia. También puedes consultar la pestaña [Context Variables (variables de contexto)](#context-variables) para ver una lista de los parámetros disponibles.

## Parámetros de salida

Los parámetros de salida te permiten acceder al resultado de un flujo de trabajo. Esto es útil cuando deseas pasar el resultado de un flujo de trabajo a otro flujo de trabajo o a una aplicación de App Builder.

Para añadir un parámetro de salida:
1. Haz clic en el lienzo del flujo de trabajo.
1. Haz clic en el icono **+** situado junto a **Output Parameters** (Parámetros de salida).
1. Añade un nombre de parámetro, un valor y un tipo de datos para el parámetro.
1. Opcionalmente, añade un valor por defecto para el parámetro. Si añades un valor por defecto, el parámetro es opcional en tiempo de ejecución.

La sección **Output Parameters** (Parámetros de salida) muestra los nombres de todos los parámetros de salida existentes junto con un contador.

Para obtener información sobre el paso de datos entre flujos de trabajo, consulta [Acceder al resultado de un flujo de trabajo secundario][7].

Para ver un ejemplo de cómo utilizar parámetros de salida para pasar información entre flujos de trabajo y App Builder, consulta [devolver resultados de flujo de trabajo a una aplicación][6].

## Variables personalizadas

Para establecer una variable mutable de flujo de trabajo, utiliza la acción [Establecer variable][1]. Puedes utilizar esta acción para declarar, actualizar y acceder a variables personalizadas en todo el flujo de trabajo, lo que te permite realizar operaciones de flujo de trabajo más complejas. Por ejemplo:
- _Gestión de la paginación de la API_: las solicitudes de la API a veces requieren que hagas un seguimiento de un token o desplazamiento de página.
- _Gestión de listas_: puedes usar una variable para inicializar un array y realizar acciones como map (asignar) y reduce (reducir).
- _Iteración_: las variables te permiten manipular y almacenar datos dentro de un [bucle for][2]. A continuación, puedes utilizar esos datos en el resto del flujo de trabajo.

### Establecer una variable personalizada

Para establecer una variable personalizada:
1. Haz clic en el icono más (**+**) del lienzo del flujo de trabajo para abrir el catálogo de acciones.
1. Busca y selecciona el paso **Set variable** (Fijar variable).
1. Haz clic en el paso **Set variable** (Establecer variable) e ingresa un **Step name** (Nombre de paso).
1. Introduce un **variable name** (nombre de variable). Los nombres de las variables deben empezar por una letra y sólo pueden contener caracteres alfanuméricos y guiones bajos.
1. Introduce un valor para la variable.
   - Escribe ``{{`` si deseas utilizar una variable contextual del flujo de trabajo.
   - Para crear un objeto, haz clic en el botón **Create object** (Crear objeto)<i class="icon-api"></i>.
   - Para crear una matriz, haz clic en el botón **Create array** (Crear matriz) <span id="icon-array">[ ]</span>.

Si necesitas cambiar el valor de una variable personalizada después de establecerla, debes añadir un paso adicional **Set variable** (Establecer variable) y reasignar la variable o crear una nueva variable.

Aquí hay un ejemplo de un flujo de trabajo que demuestra el paso **Set variable** (Establecer variable):

1. En tu flujo de trabajo, comienza con un paso **Set variable** (Establecer variable) para declarar una variable llamada `intList` y darle el valor `[1,2,3,4]`.
1. Añade un segundo paso **Set variable** (Establecer variable) y declara una variable llamada `evenList` con el valor `${Variables.intList.filter(number => number % 2 === 0)}`. Esta es una [expresión en línea de JavaScript][8] que filtra los números impares.
1. Añade un paso **Echo** (Eco) para hacer eco del valor de `evenList` (`2,4`).

{{< img src="service_management/workflows/set-variable-updated.png" alt="Este flujo de trabajo establece una variable para tener una lista de números, declara una segunda variable que filtra los números impares en la lista usando una expresión en línea y hace eco del valor de la segunda variable." style="width:100%;" >}}

### Acceder a una variable personalizada

Puedes acceder a una variable personalizada en tu flujo de trabajo utilizando `{{ Variables.variableName }}`. Por ejemplo, para acceder a una variable personalizada denominada `DashboardList`, utiliza `{{ Variables.DashboardList }}`.

### Iteración

Establecer una variable personalizada dentro de un bucle **For** te permite almacenar datos para su uso fuera del bucle. Por ejemplo, si estás haciendo múltiples solicitudes a la API dentro de un bucle **For**, puedes establecer una variable personalizada y añadirle los datos que necesites en cada iteración. Fuera del bucle, puedes acceder a la variable personalizada y manejar los datos recopilados.

Para evitar un error de tipo resultante de una variable indefinida, asigna una variable personalizada antes de utilizarla en un bucle. En el ejemplo siguiente, la variable personalizada `evenList` se establece en una matriz vacía antes de utilizarla en el bucle.

{{< img src="service_management/workflows/loop.png" alt="Este flujo de trabajo establece una variable antes de que se utilice en un bucle." style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /es/service_management/workflows/actions/flow_control#for-loop
[3]: https://datadoghq.slack.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /es/service_management/workflows/trigger
[6]: /es/service_management/app_builder/queries/#return-workflow-results-to-an-app
[7]: /es/service_management/workflows/trigger/#access-the-result-of-a-child-workflow