---
aliases:
- /es/app_builder/queries
- /es/service_management/app_builder/queries
description: Pueble las aplicaciones con datos de las API e integraciones de Datadog
  mediante consultas que conectan los componentes de la interfaz de usuario con las
  acciones del backend.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
title: Consultas
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder está en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Las consultas son acciones que pueblan su aplicación con datos de las API de Datadog o integraciones compatibles. Toman entradas de otras consultas o de componentes de la interfaz de usuario y devuelven salidas para su uso en otras consultas o en componentes de la interfaz de usuario.

El [Action Catalog][10] dentro de la aplicación Datadog proporciona acciones que se pueden realizar como consultas contra su infraestructura e integraciones mediante App Builder. Puede organizar y automatizar sus procesos de extremo a extremo vinculando acciones que realizan tareas en sus proveedores de nube, herramientas SaaS y cuentas de Datadog.

Para agregar una consulta, haga clic en el icono de Data ({{< ui >}}{&nbsp;}{{< /ui >}}) para abrir la pestaña Data. Haga clic en el signo más ({{< ui >}}\+{{< /ui >}}), seleccione {{< ui >}}Actions{{< /ui >}} y busque "query" para agregar una acción a su aplicación. Después de haber agregado la acción de consulta, aparece en la lista {{< ui >}}Actions{{< /ui >}}. Seleccione una consulta para configurarla.

También puede usar Bits AI para agregar, configurar y activar consultas. Haga clic en el icono {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**) para comenzar. 

Las consultas dependen de [Connections][5] para la autenticación. App Builder comparte conexiones con [Workflow Automation][6].

## Ejecutar configuraciones {#run-settings}

{{< ui >}}Run Settings{{< /ui >}} determinan cuándo se ejecuta una consulta. Hay dos opciones:

- {{< ui >}}Auto{{< /ui >}}: La consulta se ejecuta cuando la aplicación se carga y siempre que cambie cualquier argumento de la consulta.
- {{< ui >}}Manual{{< /ui >}}: La consulta se ejecuta cuando otra parte de la aplicación la activa. Por ejemplo, use un activador manual si desea que una consulta se ejecute solo cuando un usuario hace clic en un componente de botón de la interfaz de usuario. Para obtener más información sobre los activadores de eventos, consulte [Eventos][11].

## Opciones de preguntas avanzadas {#advanced-query-options}

### Debounce {#debounce}

Configurar el debounce garantiza que su consulta solo se active una vez por cada entrada del usuario. De forma predeterminada, el debounce se establece en `0` milisegundos (ms). Para evitar que una consulta se llame con demasiada frecuencia, aumente el debounce. Configure el debounce en la sección {{< ui >}}Advanced{{< /ui >}} de una consulta.

### Conditional queries {#conditional-queries}

Puede establecer una condición que debe cumplirse antes de que una consulta pueda ejecutarse. Para establecer la condición de una consulta, ingrese una expresión en el campo {{< ui >}}Condition{{< /ui >}} en la sección {{< ui >}}Advanced{{< /ui >}} de la consulta. Esta condición debe evaluarse como verdadera antes de que la consulta pueda ejecutarse. Por ejemplo, si desea que una consulta determinada se ejecute solo si un componente de la interfaz de usuario llamado `select0` existe y no está vacío, utilice la siguiente expresión:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### Transformación posterior a la consulta {#post-query-transformation}

Realice una transformación posterior a la consulta para simplificar o transformar la salida de una consulta. Agregue una transformación posterior a la consulta en la sección {{< ui >}}Advanced{{< /ui >}} de una consulta.

Por ejemplo, la acción _List Channels_ de Slack devuelve una matriz de diccionarios que contiene el ID y el nombre de cada canal. Para descartar los ID y devolver solo una matriz de nombres, agregue la siguiente transformación de consulta:

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

### Hooks posteriores a la consulta {#post-query-hooks}

De manera similar a los eventos de los componentes de la interfaz de usuario, puede configurar una reacción para que se active después de que se ejecute una consulta. Un hook posterior a la consulta puede establecer el estado de un componente de la interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar JavaScript personalizado. Por ejemplo, la consulta `scaleService` del blueprint [ECS Task Balancer][7] utiliza un hook posterior a la consulta para volver a ejecutar la consulta `describeService` después de que se ejecute.

Puede utilizar [funciones de estado][12] en los hooks posteriores a la consulta.

### Notificaciones de error {#error-notifications}

Para mostrar un aviso (un mensaje de notificación breve) al usuario cuando el sistema devuelve un error, active {{< ui >}}Show Toast on Errors{{< /ui >}} en la sección {{< ui >}}Advanced{{< /ui >}} de una consulta.

### Prompts de confirmación {#confirmation-prompts}

Para solicitar la confirmación de un usuario antes de que se ejecute la consulta, active la opción {{< ui >}}Requires Confirmation{{< /ui >}} en la sección {{< ui >}}Advanced{{< /ui >}} de una consulta.

### Intervalos de sondeo {#polling-intervals}

Para ejecutar una consulta repetidamente en un intervalo establecido mientras la aplicación está abierta en la pantalla de alguien, ingrese el intervalo en milisegundos (ms) como {{< ui >}}Polling interval{{< /ui >}} en la sección {{< ui >}}Advanced{{< /ui >}} de una consulta.

**Nota**: La consulta no se ejecuta en segundo plano; solo se ejecuta cuando alguien tiene la aplicación abierta.

## Salidas simuladas {#mocked-outputs}

A veces, cuando está creando o probando una aplicación en el editor, es posible que desee evitar ejecutar una consulta real o evitar ejecutar la misma consulta repetidamente. Cuando habilita {{< ui >}}Mocked outputs{{< /ui >}} y ejecuta su consulta, App Builder completa las salidas con datos simulados en lugar de ejecutar la acción de la consulta.

Puede generar salidas simuladas a partir de una ejecución de consulta anterior o proporcionarlas manualmente.

### Generar resultados de ejecutación previa {#generate-outputs-from-previous-run}

Para generar datos de salida simulados a partir de una ejecución de consulta anterior, realice los siguientes pasos:

1. Agregue una consulta y complete el resto de los parámetros de su consulta.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para ejecutar su consulta una vez.
1. En la sección {{< ui >}}Mocked outputs{{< /ui >}} de la consulta, haga clic en la pestaña {{< ui >}}Generate{{< /ui >}}.
1. Haga clic en {{< ui >}}Generate from outputs{{< /ui >}}. Esto activa automáticamente {{< ui >}}Use Mocked Outputs{{< /ui >}}.<br>
    El botón {{< ui >}}Run{{< /ui >}} cambia para decir {{< ui >}}Run (Mocked){{< /ui >}}, y la próxima vez que ejecute su consulta, la salida se completará con los datos simulados.

### Brindar resultados de forma manual {#provide-outputs-manually}

Para proporcionar salidas simuladas manualmente, realice los siguientes pasos:

{{% collapse-content title="Uso de la GUI" level="p" %}}
1. Agregue una consulta y complete el resto de los parámetros de su consulta.
1. En la sección {{< ui >}}Mocked outputs{{< /ui >}} de la consulta, haga clic en la pestaña {{< ui >}}GUI{{< /ui >}}.
1. Complete todos los campos obligatorios, que la vista de la GUI muestra automáticamente.
1. Opcionalmente, para agregar campos adicionales, haga clic en ({{< ui >}}\+{{< /ui >}}). Elija una clave del menú desplegable y complete un valor. Si desea ingresar un valor que sea un objeto o una matriz, haga clic en {{< ui >}}{}{{< /ui >}} o {{< ui >}}[]{{< /ui >}}, respectivamente, después del campo {{< ui >}}Enter value{{< /ui >}}.
{{% /collapse-content %}}

{{% collapse-content title="Uso de JSON" level="p" %}}
1. Agregue una consulta y complete el resto de los parámetros de su consulta.
1. En la sección {{< ui >}}Mocked outputs{{< /ui >}} de la consulta, haga clic en la pestaña {{< ui >}}JSON{{< /ui >}}.
1. Pegue el JSON que coincida con el formato de salida esperado de la consulta.<br>
    Si no conoce el formato de salida esperado, puede ejecutar la consulta una vez y luego hacer referencia a `outputs` en la sección {{< ui >}}Inspect Data{{< /ui >}} de la consulta.
{{% /collapse-content %}}


## Orden de operaciones {#order-of-operations}

Al ejecutar una consulta, App Builder realiza los siguientes pasos en el orden indicado:

1. Verifica si hay una expresión {{< ui >}}Condition{{< /ui >}} para la consulta y, de ser así, comprueba que se cumpla la condición. Si no es así, la ejecución se detiene.
2. Evalúa cualquier expresión en {{< ui >}}Inputs{{< /ui >}} para determinar los datos de entrada para la consulta.
3. Si la propiedad {{< ui >}}Debounce{{< /ui >}} está configurada, retrasa la ejecución durante el intervalo definido por el valor de debounce. Si las entradas de la consulta o sus dependencias se actualizan durante este tiempo, la ejecución de la consulta actual se detiene y comienza una nueva desde el principio utilizando las entradas actualizadas.<br>
   **Nota**: Si ocurre más de una solicitud de consulta dentro del intervalo de debounce, todas las solicitudes excepto la última solicitud de ejecución se cancelan.
4. Ejecuta la consulta.
5. Almacena la respuesta de consulta sin procesar en `query.rawOutputs`.
6. Ejecuta cualquier transformación posterior a la consulta y establece `query.outputs` igual a la salida. Este proceso toma una instantánea de los datos de la aplicación y la pasa a la transformación posterior a la consulta.<br>
   **Nota**: Las transformaciones posteriores a la consulta deben ser funciones puras sin efectos secundarios. Por ejemplo, no actualice una variable de estado en su transformación posterior a la consulta.
7. Calcula cualquier expresión en la aplicación que dependa de los datos de la salida de la consulta.
8. Ejecuta todos los {{< ui >}}Reactions{{< /ui >}} del {{< ui >}}Events{{< /ui >}} de la aplicación, en el orden en que están definidos en la interfaz de usuario. Esto implica tomar una instantánea de la aplicación que se utiliza durante toda la ejecución de la reacción. Se toma una nueva instantánea antes de que se ejecute cada reacción, y los cambios realizados por una reacción anterior son visibles para una reacción posterior.
9. Si hay un {{< ui >}}Polling interval{{< /ui >}} establecido, programa la consulta para que se vuelva a ejecutar en el número definido de milisegundos en el futuro.


## Aplicaciones de ejemplo {#example-apps}

### Devolver los resultados del flujo de trabajo a una aplicación {#return-workflow-results-to-an-app}
Las consultas de App Builder pueden activar flujos de trabajo de Workflow Automation. Las aplicaciones pueden entonces utilizar los resultados de esos flujos de trabajo.

Esta aplicación proporciona un botón para activar un flujo de trabajo. El flujo de trabajo envía una encuesta a un canal de Slack pidiendo al usuario que elija entre una de dos opciones. Según la opción que elija el usuario, el flujo de trabajo emite una de dos solicitudes HTTP GET diferentes, que luego devuelven datos que se muestran en la aplicación.

{{< img src="actions/app_builder/workflow-trigger-from-app.mp4" alt="Al hacer clic en Activar flujo de trabajo, se encuesta a Slack y luego se devuelve un dato aleatorio sobre gatos o perros" video="true" width="70%">}}

{{% collapse-content title="Cree la aplicación" level="h4" %}}

##### Cree un flujo de trabajo {#create-workflow}

1. En un nuevo lienzo de flujo de trabajo, debajo de {{< ui >}}Datadog Triggers{{< /ui >}}, haga clic en {{< ui >}}App{{< /ui >}}.
1. Debajo del paso de activación {{< ui >}}App{{< /ui >}}, haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}), luego busque "Make a decision" y seleccione la acción Slack {{< ui >}}Make a decision{{< /ui >}}.
1. Seleccione su espacio de trabajo y elija un canal para encuestar.
1. Complete el texto de solicitud "Cat fact or dog fact?" y cambie las opciones de los botones a "Cat fact" y "Dog fact".
1. Debajo del paso {{< ui >}}Make a decision{{< /ui >}} en el lienzo, haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) sobre {{< ui >}}Cat fact{{< /ui >}} y agregue la acción HTTP {{< ui >}}Make request{{< /ui >}}.
1. Asigne al paso el nombre "Get cat fact". En {{< ui >}}Inputs{{< /ui >}}, para {{< ui >}}URL{{< /ui >}}, mantenga seleccionado {{< ui >}}GET{{< /ui >}} e ingrese la URL `https://catfact.ninja/fact`.
1. Debajo del paso {{< ui >}}Make a decision{{< /ui >}} en el lienzo, haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) sobre {{< ui >}}Dog fact{{< /ui >}}. Siga los mismos pasos para agregar la acción HTTP {{< ui >}}Make request{{< /ui >}}, pero esta vez asigne al paso el nombre "Get dog fact" y utilice los siguientes parámetros:
    * {{< ui >}}URL{{< /ui >}}: `https://dogapi.dog/api/v2/facts`.
    * {{< ui >}}Request Headers{{< /ui >}}: `Content-Type` de `application/json`
1. Haga clic en el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del paso del dato sobre gatos. Busque "Function" y elija el paso de transformación de datos {{< ui >}}Function{{< /ui >}}.
1. Conecte el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del paso del dato sobre perros a este paso {{< ui >}}JS Function{{< /ui >}} haciendo clic y arrastrando desde el signo más hasta el punto que aparece sobre el paso JS Function.
1. En JS Function, debajo de {{< ui >}}Configure{{< /ui >}}, para {{< ui >}}Script{{< /ui >}}, utilice el siguiente fragmento de código:
    ```javascript
    const catFact = $.Steps.Get_cat_fact?.body?.fact;
    const dogFactRaw = $.Steps.Get_dog_fact?.body;

    let dogFact;

    try {
        const parsedDogFact = JSON.parse(dogFactRaw);
        dogFact = parsedDogFact.data?.[0]?.attributes?.body;
    } catch {
        // Do nothing
    }

    return catFact != null ? catFact : dogFact;
    ```
1. En la descripción general del flujo de trabajo, debajo de {{< ui >}}Output Parameters{{< /ui >}}, agregue un parámetro llamado `output` con el valor `{{ Steps.Function.data }}` and the Data Type `string`.
1. Asigne a su flujo de trabajo el nombre "My AB Workflow", luego guarde y publique el flujo de trabajo.

##### Cree una aplicación {#create-app}

Para conectar App Builder al flujo de trabajo, realice los siguientes pasos:

1. En su aplicación, haga clic en el icono de Datos ({{< ui >}}{&nbsp;}{{< /ui >}}), haga clic en el signo más ({{< ui >}}\+{{< /ui >}}) y seleccione {{< ui >}}Query{{< /ui >}}.
1. Busque "Trigger Workflow" y seleccione el elemento {{< ui >}}Trigger Workflow{{< /ui >}} Datadog Workflow Automation.
1. Establezca {{< ui >}}Run Settings{{< /ui >}} en Manual y asigne a la consulta el nombre `triggerWorkflow0`.
1. En {{< ui >}}Inputs{{< /ui >}}, para {{< ui >}}App Workflow{{< /ui >}}, seleccione {{< ui >}}My AB Workflow{{< /ui >}}.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para ejecutar el flujo de trabajo, luego vaya a su canal de Slack y responda a la pregunta de la encuesta. Esto proporciona datos de ejemplo a App Builder para mostrar.
1. Agregue un componente de texto. En {{< ui >}}Content{{< /ui >}}, ingrese la expresión `${triggerWorkflow0?.outputs?.workflowOutputs?.output}`.
1. Agregue un componente de botón. Utilice los siguientes valores:
    * {{< ui >}}Label{{< /ui >}}: "Flujo de trabajo de activador"
    * {{< ui >}}Is Loading{{< /ui >}}: `${triggerWorkflow0.isLoading}` (haga clic en {{< ui >}}</>{{< /ui >}} para ingresar una expresión)
1. En {{< ui >}}Events{{< /ui >}} del botón, haga clic en el signo más ({{< ui >}}\+{{< /ui >}}) para agregar un evento. Utilice los siguientes valores:
    * {{< ui >}}Event{{< /ui >}}: haga clic
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: `triggerWorkflow0`
1. Guarde su aplicación.

##### Pruebe la aplicación {#test-app}

1. En su aplicación, haga clic en {{< ui >}}Preview{{< /ui >}}.
1. Haga clic en el botón {{< ui >}}Trigger Workflow{{< /ui >}}.
1. En el canal de Slack que seleccionó, responda la pregunta de la encuesta.<br>
    Su aplicación muestra un resultado relacionado con la opción que eligió.
{{% /collapse-content %}}

### Combinar y transformar datos de salida de consulta {#combine-and-transform-query-output-data}
Después de obtener datos de una consulta en App Builder, puede usar transformadores de datos para combinar y transformar esos datos.

Esta aplicación proporciona botones para obtener hechos sobre dos números desde una API. Luego utiliza un transformador de datos para calcular y mostrar la suma de los dos números.

{{< img src="actions/app_builder/data-transformer.mp4" alt="Al hacer clic en cada botón se obtiene un nuevo hecho numérico, y la suma de los dos números se actualiza junto con los hechos." video="true" width="70%">}}

{{% collapse-content title="Cree la aplicación" level="h4" %}}

##### Cree consultas {#create-queries}

1. En una aplicación nueva, haga clic en el icono de Datos ({{< ui >}}{&nbsp;}{{< /ui >}}) para abrir la pestaña Datos.
1. Haga clic en el signo más ({{< ui >}}\+{{< /ui >}}), luego seleccione {{< ui >}}Query{{< /ui >}}. Busque "Make request" y elija la acción {{< ui >}}HTTP Make request{{< /ui >}}.
1. Utilice los siguientes valores:
    * {{< ui >}}Name{{< /ui >}}: `mathFact1`
    * En {{< ui >}}Inputs{{< /ui >}}, para {{< ui >}}URL{{< /ui >}}: GET `http://numbersapi.com/random/trivia`
1. Haga clic en ({{< ui >}}\+{{< /ui >}}) para agregar otra consulta {{< ui >}}HTTP Make request{{< /ui >}}. Utilice los siguientes valores:
    * {{< ui >}}Name{{< /ui >}}: `mathFact2`
    * En {{< ui >}}Inputs{{< /ui >}}, para {{< ui >}}URL{{< /ui >}}: GET `http://numbersapi.com/random/trivia`

##### Agregue un transformador de datos {#add-data-transformer}

1. Haga clic en {{< ui >}}Σ{{< /ui >}} (sigma) para abrir el panel {{< ui >}}Transformers{{< /ui >}}.
1. Haga clic en {{< ui >}}\+ Create Transformer{{< /ui >}}.
1. Asigne al transformador el nombre `numberTransformer` En {{< ui >}}Inputs{{< /ui >}}, en {{< ui >}}function () {{{< /ui >}}, ingrese lo siguiente:
    ```javascript
    // get both random facts
    const fact1 = mathFact1.outputs.body;
    const fact2 = mathFact2.outputs.body;

    // parse the facts to get the first number that appears in them
    const num1 = fact1.match(/\d+/)[0];
    const num2 = fact2.match(/\d+/)[0];

    // complete arithmetic on the numbers to find the sum
    const numSum = Number(num1) + Number(num2)

    return numSum
    ```

##### Cree componentes de lienzo de aplicación {#create-app-canvas-components}

1. En el lienzo de la aplicación, agregue un botón y complete la etiqueta "Generate fact 1".
1. En {{< ui >}}Events{{< /ui >}} del botón, utilice los siguientes valores:
    * {{< ui >}}Event{{< /ui >}}: haga clic
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: mathFact1
1. Agregue otro botón y complete la etiqueta "Generate fact 2".
1. En {{< ui >}}Events{{< /ui >}} del botón, utilice los siguientes valores:
    * {{< ui >}}Event{{< /ui >}}: haga clic
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: mathFact2
1. Agregue un elemento de texto debajo del primer botón. Para su propiedad {{< ui >}}Content{{< /ui >}}, haga clic en {{< ui >}}</>{{< /ui >}} e ingrese la expresión `${mathFact1.outputs.body}`.
1. Agregue un elemento de texto debajo del segundo botón. Para su propiedad {{< ui >}}Content{{< /ui >}}, haga clic en {{< ui >}}</>{{< /ui >}} e ingrese la expresión `${mathFact2.outputs.body}`.
1. Agregue un elemento de texto con el valor {{< ui >}}Content{{< /ui >}} "Sum of numbers".
1. Agregue un elemento de texto junto a él. Para su propiedad {{< ui >}}Content{{< /ui >}}, haga clic en {{< ui >}}</>{{< /ui >}} y utilice la expresión `${numberTransformer.outputs}`.


##### Pruebe la aplicación {#test-app-1}

1. En su aplicación, haga clic en {{< ui >}}Preview{{< /ui >}}.
1. Haga clic en {{< ui >}}Generate fact 1{{< /ui >}}, luego haga clic en {{< ui >}}Generate fact 2{{< /ui >}}.<br>
    Su aplicación actualiza los hechos numéricos y la suma de los números a medida que hace clic en cada botón.

{{% /collapse-content %}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal {{< ui >}}#app-builder{{< /ui >}} en el [Datadog Community Slack][8].

[5]: /es/actions/connections
[6]: /es/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[10]: https://app.datadoghq.com/actions/action-catalog/
[11]: /es/actions/app_builder/events
[12]: /es/actions/app_builder/events/#state-functions