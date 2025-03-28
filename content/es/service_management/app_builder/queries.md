---
aliases:
- /es/app_builder/queries
disable_toc: false
further_reading:
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
title: Consultas
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

Las consultas rellenan tu aplicación con datos procedentes de las API de Datadog o con integraciones compatibles. Toman entradas de otras consultas u otros componentes de interfaz de usuario y devuelven resultados para su uso en otras consultas o en otros componentes de interfaz de usuario.

El [Catálogo de acciones][10] de la aplicación Datadog proporciona acciones que se pueden realizar como consultas a la infraestructura y las integraciones mediante App Builder. Puedes orquestar y automatizar tus procesos de extremo a extremo mediante la vinculación de acciones que realizan tareas en tus proveedores de nube, herramientas SaaS y cuentas Datadog.

Para añadir una consulta, haz clic en el icono más (**+**) de la sección **Consultas** y busca una acción para añadir a tu aplicación. Una vez añadida la acción de consulta, aparecerá en la lista de consultas arriba del editor de consultas. Haz clic y arrastra las consultas para reordenarlas. Selecciona una consulta para configurarla.

Para la autenticación, las consultas se basan en [conexiones][5]. App Builder comparte conexiones con la [automatización de flujos de trabajo][6].

## Parámetros de ejecución

La función **Run Settings** (Parámetros de ejecución) determina cuándo se ejecuta una consulta. Existen dos opciones:

- **Auto**: La consulta se ejecuta cuando se carga la aplicación y cada vez que cambia algún argumento de la consulta.
- **Manual**: La consulta se ejecuta cuando otra parte de la aplicación la activa. Por ejemplo, utiliza un activador manual si quieres que una consulta se ejecute sólo cuando un usuario hace clic en un componente del botón de la interfaz de usuario. Para obtener más información sobre los activadores de eventos, consulta [Eventos][11].

## Opciones avanzadas de consulta

### Debounce

La configuración del debounce garantiza que tu consulta sólo se activará una vez con cada entrada de un usuario. Por defecto, el debounce está configurado en `0` milisegundos (ms). Para evitar que una consulta se ejecute con demasiada frecuencia, aumenta el debounce. Configura el debounce en la sección **Advanced** (Avanzado) de la consulta.

### Consultas condicionales

Puedes establecer una condición que debe cumplirse antes de que pueda ejecutarse una consulta. Para establecer la condición de una consulta, introduce una expresión en el campo **Condition** (Condición) de la sección **Advanced** (Avanzado) de la consulta. Esta condición debe evaluarse como verdadera antes de que la consulta pueda ejecutarse. Por ejemplo, si quieres que una consulta determinada se ejecute sólo si existe un componente de interfaz de usuario denominado `select0` y no está vacío, utiliza la siguiente expresión:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### Transformación posterior a la consulta

Realiza una transformación posterior a la consulta para simplificar o transformar el resultado de una consulta. Añade una transformación posterior a la consulta en la sección **Advanced** (Avanzado) de la consulta.

Por ejemplo, la acción de Slack _List Channels_ devuelve una matriz de diccionarios que contiene el ID y el nombre de cada canal. Para descartar los ID y devolver sólo una matriz de nombres, añade la siguiente transformación de consulta:

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Aplicar transformaciones al resultado de la consulta sin formato
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

### Ganchos posteriores a la consulta

De forma similar a los eventos del componente de interfaz de usuario, puedes configurar una reacción que se active después de que se ejecuta una consulta. Un **post-query hook** (Gancho posterior a la consulta) puede establecer el estado de un componente de interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar un JavaScript personalizado. Por ejemplo, la consulta `scaleService` del modelo del [gestor de tareas ECS][7] utiliza un gancho posterior a la consulta para volver a ejecutar la consulta `describeService` después de su ejecución inicial.

Puedes utilizar [funciones de estado][12] en hooks posteriores a la consulta.

### Notificaciones de error

Para mostrar un toast (breve mensaje de notificación) al usuario cuando el sistema devuelve un error, activa la opción **Show Toast on Errors** (Mostrar toast en caso de error) en la sección **Advanced* (Avanzado) de la consulta.

### Mensajes de confirmación

Para pedir una confirmación al usuario antes de que se ejecute la consulta, activa la opción **Requires Confirmation** (Requiere confirmación) en la sección **Advanced** (Avanzado) de la consulta.

### Intervalos de sondeo

Para ejecutar una consulta repetidamente a un intervalo determinado mientras la aplicación está abierta en una pantalla, introduce el intervalo en milisegundos (ms) como **Intervalo de sondeo** en la sección **Avanzado** de una consulta.

**Nota**: La consulta no se ejecuta en segundo plano; sólo se ejecuta cuando alguien tiene la aplicación abierta.

## Resultados simulados

A veces, cuando estás creando o probando una aplicación en el editor, es posible que quieras evitar la ejecución de una consulta real o la ejecución de la misma consulta repetidamente. Cuando habilitas **Resultados simulados** y ejecutas tu consulta, App Builder rellena los resultados con datos simulados en lugar de ejecutar la acción de consulta.

Puedes generar resultados simulados a partir de una consulta anterior o proporcionarlos manualmente.

### Generar resultados de la ejecución anterior

Para generar datos de resultados simulados de una ejecución de consulta anterior, sigue los siguientes pasos:

1. Añade una consulta y rellena el resto de los parámetros de la consulta.
1. Haz clic en **Run** (Ejecutar) para ejecutar tu consulta una vez.
1. En la sección **Resultados simulados** de la consulta, haz clic en la pestaña **Generar**.
1. Haz clic en **Generate from outputs** (Generar a partir de resultados). Esto activa automáticamente **Utilizar resultados simulados**.<br>
   El botón **Run** (Ejecutar) cambia a **Run (Mocked)** (Ejecutar (simulado)) y la próxima vez que ejecutes tu consulta, el resultado se rellenará con los datos simulados.

### Proporcionar resultados manualmente

Para proporcionar resultados simuladas manualmente, sigue los siguientes pasos:

{{% collapse-content title="Uso de la GUI" level="p" %}}
1. Añade una consulta y rellena el resto de los parámetros de la consulta.
1. En la sección **Resultados simulados** de la consulta, haz clic en la pestaña **GUI**.
1. Rellena todos los campos obligatorios, que la vista de la GUI muestra automáticamente.
1. Opcionalmente, para añadir campos adicionales, haz clic en **+ (más)**. Elige una clave del menú desplegable e introduce un valor. Si quieres introducir un valor que sea un objeto o una matriz, haz clic en **{}** o **[]**, respectivamente, después del campo **Introducir valor**.
{{% /collapse-content %}}

{{% collapse-content title="Uso de JSON" level="p" %}}
1. Añade una consulta y rellena el resto de los parámetros de la consulta.
1. En la sección **Resultados simulados** de la consulta, haz clic en la pestaña **JSON**.
1. Pega en un JSON que coincida con el formato de resultado esperado de la consulta.<br>
   Si no conoces el formato de resultado esperado, puedes ejecutar la consulta una vez y luego hacer referencia a `outputs` en la sección **Inspeccionar datos** de la consulta.
{{% /collapse-content %}} 


## Orden de las operaciones

Al ejecutar una consulta, App Builder realiza los siguientes pasos en el orden indicado:

1. Comprueba si existe una expresión de **Condición** para la consulta y, en caso afirmativo, comprueba si esta se cumple. Si no es así, la ejecución se detiene.
2. Evalúa cualquier expresión en **Entradas** para determinar los datos de entrada de la consulta.
3. Si se define la propiedad **Rebote**, se retrasa la ejecución durante el intervalo definido por el valor de rebote. Si las entradas de la consulta o sus dependencias se actualizan durante este tiempo, se detiene la ejecución de la consulta actual y se inicia una nueva desde el principio utilizando las entradas actualizadas.<br>
   **Nota**: Si se produce más de una solicitud de consulta dentro del intervalo de rebote, se cancelan todas las solicitudes excepto la última solicitud de ejecución.
4. Ejecuta la consulta.
5. Almacena la respuesta sin procesar de la consulta en `query.rawOutputs`.
6. Ejecuta cualquier transformación posterior a la consulta y configura `query.outputs` igual al resultado. Este proceso toma un snapshot de los datos de la aplicación y lo pasa a la transformación posterior a la consulta.<br>
   **Nota**: Las transformaciones posteriores a la consulta deben ser puramente funciones sin efectos secundarios. Por ejemplo, no actualices una variable de estado en tu transformación posterior a la consulta.
7. Calcula las expresiones de la aplicación que dependen de los datos del resultado de la consulta.
8. Ejecuta todas las **reacciones** de los **eventos** de la aplicación en el orden en que están definidas en la interfaz de usuario. Esto implica tomar un snapshot de la aplicación que se utiliza durante la ejecución de la reacción. Se toma un nuevo snapshot antes de que se ejecute cada reacción y los cambios realizados por una reacción anterior son visibles para una reacción posterior.
9. Si hay un **intervalo de sondeo** definido, programa la consulta para que se vuelva a ejecutar el número de milisegundos definido en el futuro.


## Ejemplos de aplicaciones

### Devolver los resultados del flujo de trabajo a una aplicación
Las consultas de App Builder pueden activar flujos de trabajo de Workflow Automation. Las aplicaciones pueden utilizar los resultados de esos flujos de trabajo.

Esta aplicación proporciona un botón para activar un flujo de trabajo. El flujo de trabajo envía una encuesta a un canal de Slack pidiendo al usuario que elija una de dos opciones. En función de la opción elegida por el usuario, el flujo de trabajo emite una de las dos solicitudes HTTP GET, que devuelve los datos que se muestran en la aplicación.

{{< img src="service_management/app_builder/workflow-trigger-from-app.mp4" alt="Al hacer clic en Activar sondeos de flujos de trabajo, Slack devuelve un dato del perro o del gato" video="true" width="70%">}}

{{% collapse-content title="Crear la aplicación" level="h4" %}}

##### Crear flujo de trabajo

1. En un nuevo lienzo de flujo de trabajo, en **Activadores Datadog**, haz clic en **App** (Aplicación).
1. En el paso de activación de la **Aplicación**, haz clic en el icono más (**+**). Busca "Tomar una decisión" y selecciona la acción **Tomar una decisión** de Slack.
1. Selecciona tu espacio de trabajo y elige un canal para sondear.
1. Rellena el texto "¿Gato o perro?" y cambia las opciones de los botones a "Dato del gato" y "Dato del perro".
1. En el paso **Tomar una decisión** del lienzo, haz clic en el icono más (**+**) situado arriba de **Dato del gato** y añade la acción HTTP **Realizar solicitud**.
1. Nombra el paso "Obtener dato del gato". En **Entradas**, para **URL**, mantén seleccionado **GET** e introduce la URL `https://catfact.ninja/fact`.
1. En el paso **Tomar una decisión** en el lienzo, haz clic en el icono más (**+**) arriba de **Dato del perro**. Sigue los mismos pasos para añadir la acción HTTP **Realizar solicitud**, pero esta vez nombra el paso "Obtener dato del perro" y utiliza los siguientes parámetros:
    * **URL**: `https://dogapi.dog/api/v2/facts`.
    * **Cabeceras de solicitud**: `Content-Type` de `application/json`
1. Haz clic en el icono más (**+**) en el paso del dato del gato. Buscar "Función" y elige el paso de transformación de datos **Función**.
1. Conecta el icono del signo más (**+**) en el paso del dato del perro a este paso **Función JS** haciendo clic y arrastrando desde el signo más hasta el punto que aparece arriba del paso Función JS.
1. En la Función JS, en **Configurar**, para **Script**, utiliza el siguiente fragmento de código:
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
1. En la vista general del flujo de trabajo, en **Parámetros de resultados**, añade un parámetro llamado `output` con el valor `{{ Steps.Function.data }}` y el tipo de datos `string`.
1. Nombra tu flujo de trabajo "Mi flujo de trabajo AB", luego guarda y publica el flujo de trabajo.

##### Crear aplicación

Para conectar App Builder al flujo de trabajo, sigue los siguientes pasos:

1. En tu aplicación, en **Consultas**, haz clic en **+ New Query** (+ Nueva consulta).
1. Busca "Activar flujo de trabajo" y selecciona el elemento de Datadog Workflow Automation **Activar flujo de trabajo**.
1. Configura **Parámetros de ejecución** en manual y nombra la consulta `triggerWorkflow0`.
1. En **Entradas**, para **Flujo de trabajo de la aplicación**, selecciona **Mi flujo de trabajo AB**.
1. Haz clic en **Run** (Ejecutar) para ejecutar el flujo de trabajo y, a continuación, ve a tu canal de Slack y responde a la pregunta de la encuesta. Esta acción proporciona a App Builder datos de ejemplo para mostrar.
1. Añade un componente de texto. En **Contenido**, introduce la expresión `${triggerWorkflow0?.outputs?.workflowOutputs?.output}`.
1. Añade un componente de botón. Utiliza los siguientes valores:
    * **Etiqueta** (Label): "Activar flujo de trabajo"
    * **Se está cargando**: `${triggerWorkflow0.isLoading}` (haz clic en **</>** para introducir una expresión)
1. En **Eventos** del botón, , haz clic en el signo más (**+**) para añadir un evento. Utiliza los siguientes valores:
    * **Evento**: haz clic
    * **Reacción**: Consulta de activación
    * **Consulta**: `triggerWorkflow0`
1. Guarda tu aplicación.

##### Probar la aplicación

1. En tu aplicación, haz clic en **Preview** (Vista previa).
1. Haz clic en el botón **Trigger Workflow** (Activar flujo de trabajo).
1. En el canal de Slack que hayas seleccionado, responde a la pregunta de la encuesta.<br>
   La aplicación muestra un resultado relacionado con la opción elegida.
{{% /collapse-content %}} 

### Combinar y transformar los datos del resultado de la consulta
Después de obtener datos de una consulta en App Builder, puedes utilizar transformadores de datos para combinar y transformar esos datos.

Esta aplicación proporciona botones para obtener datos sobre dos números desde una API. A continuación, utiliza un transformador de datos para calcular y mostrar la suma de los dos números.

{{< img src="service_management/app_builder/data-transformer.mp4" alt="Al hacer clic en cada botón se obtiene un nuevo dato numérico y la suma de los dos números se actualiza junto con los datos" vídeo="true" width="70%">}}

{{% collapse-content title="Crear la aplicación" level="h4" %}}

##### Crear consultas

1. En una nueva aplicación, haz clic en **+ New Query** (+ Nueva consulta). Busca "Realizar solicitud" y elige la acción **Realizar solicitud HTTP**.
1. Utiliza los siguientes valores:
    * **Nombre**: `mathFact1`
    * En **Entradas**, para **URL**: GET `http://numbersapi.com/random/trivia`
1. Haz clic en el **+ (más)** para añadir otra consulta **Realizar solicitud HTTP**. Utiliza los siguientes valores:
    * **Nombre**: `mathFact2`
    * En **Entradas**, para **URL**: GET `http://numbersapi.com/random/trivia`

##### Añadir transformador de datos

1. Haz clic en el **Σ (sigma)** para abrir el panel **Transformadores**.
1. Haz clic en **+ Create Transformer** (+ Crear Transformador).
1. Nombra el transformador `numberTransformer`. En **Entradas**, en **función () {**, introduce lo siguiente:
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

##### Crear componentes del lienzo de la aplicación

1. En el lienzo de la aplicación, añade un botón y rellena la etiqueta "Generar dato 1".
1. En **Eventos** del botón, utiliza los siguientes valores:
    * **Evento**: haz clic
    * **Reacción**: Consulta de activación
    * **Consulta**: mathFact1
1. Añade otro botón y rellena la etiqueta "Generar dato 2".
1. En **Eventos** del botón, utiliza los siguientes valores:
    * **Evento**: haz clic
    * **Reacción**: Consulta de activación
    * **Consulta**: mathFact2
1. Añade un elemento de texto debajo del primer botón. Para su propiedad **Contenido**, haz clic en **</>** e introduce la expresión `${mathFact1.outputs.body}`.
1. Añade un elemento de texto debajo del segundo botón. Para su propiedad **Contenido**, haz clic en **</>** e introduce la expresión `${mathFact2.outputs.body}`.
1. Añadir un elemento de texto con el valor **Contenido** "Suma de números".
1. Añade un elemento de texto a su lado. Para su propiedad **Contenido**, haz clic en **</>** y utiliza la expresión `${numberTransformer.outputs}`.


##### Probar la aplicación

1. En tu aplicación, haz clic en **Preview** (Vista previa).
1. Haz clic en **Generate fact 1** (Generar hecho 1) y, a continuación, en **Generate fact 2** (Generar hecho 2).<br>
   La aplicación actualiza los datos numéricos y la suma de los números al hacer clic en cada botón.

{{% /collapse-content %}} 


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][8].

[5]: /es/service_management/workflows/connections
[6]: /es/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /es/service_management/app_builder/events
[12]: /es/service_management/app_builder/events/#state-functions