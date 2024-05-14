---
aliases:
- /es/app_builder/build
disable_toc: false
further_reading:
- link: /service_management/workflows/actions_catalog/
  tag: Documentación
  text: Catálogo de acciones
kind: Documentación
title: Crear aplicaciones
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
App Builder de Datadog está en fase beta privada. Rellena el formulario para solicitar acceso.
{{< /callout >}}

Puedes crear una aplicación o editar aplicaciones existentes desde la página de [App Builder][1]. La página muestra información sobre las aplicaciones existentes e incluye lo siguiente:
- Autor
- Estado
- Fecha de la última modificación de cada aplicación
- Si la aplicación está publicada

En la página de App Builder, puedes acceder a tus aplicaciones y filtrarlas. Pasa el cursor sobre una aplicación para ver las opciones de editar, eliminar, ver o clonar la aplicación. También puedes activar la opción **My apps** (Mis aplicaciones) para ver sólo las aplicaciones que has creado:

{{< img src="service_management/app_builder/app_builder_page.png" alt="Página de App Builder" style="width:100%;" >}}

## Crear una aplicación

### Crear una aplicación a partir de un proyecto

Los proyectos son útiles aplicaciones de inicio. Cubren casos de uso comunes y vienen cargados con datos de demostración que puedes utilizar para familiarizarte con la aplicación.

1. En [App Builder][1], haz clic en la pestaña [Blueprints (Proyectos)][2].
1. Busca el proyecto que quieres utilizar y haz clic en **Preview** (Vista previa).
1. Haz clic en **Use Blueprint** (Utilizar proyecto) para abrir el proyecto de la aplicación.
1. Para cambiar el nombre y la descripción de la aplicación, haz clic en el nombre de la aplicación.
1. Cada proyecto viene cargado con datos de demostración. Para personalizar la aplicación, edita la **Connection** (Conexión) de cada consulta.
1. Para guardar la aplicación, haz clic en **Save as New App** (Guardar como nueva aplicación).
1. Para obtener una vista previa de la aplicación, haz clic en **Preview** (Vista previa). Haz clic en **Edit** (Editar), en la pantalla de vista previa, para volver a la vista de configuración.
1. Cuando termines de modificar la aplicación, haz clic en **Run** (Ejecutar) para realizar un test.
1. Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

### Crear una aplicación personalizada

1. En [App Builder][1], haz clic en **New App** (Nueva aplicación).
1. Para cambiar el nombre y la descripción de la aplicación, haz clic en el nombre de la aplicación.
1. Para añadir un [componente de interfaz de usuario](#app-canvas-and-components) al lienzo de la aplicación, haz clic en el componente en la barra superior o arrástralo al lienzo.
1. Utiliza [consultas](#queries) para rellenar o interactuar con tu lienzo.
1. Para guardar la aplicación, haz clic en **Save as New App** (Guardar como nueva aplicación).
1. Para obtener una vista previa de la aplicación, haz clic en **Preview** (Vista previa). Haz clic en **Edit** (Editar), en la pantalla de vista previa, para volver a la vista de configuración.
1. Cuando termines de modificar la aplicación, haz clic en **Run** (Ejecutar) para realizar un test.
1. Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

## Personalizar tu aplicación

Las aplicaciones están conformadas por componentes de interfaz de usuario y consultas que interactúan entre sí para crear la experiencia de usuario y la lógica de cada aplicación. La lista de consultas y el editor aparecen en la parte izquierda de la página, mientras que el lienzo de la aplicación y los componentes de la interfaz de usuario ocupan la parte derecha de la página.

Personalización básica:
- Para editar **Name**, **Description**, or **Canvas Color** (Nombre, Descripción o Color del lienzo) en tu aplicación, haz clic en el nombre de la aplicación en la parte superior izquierda.
- Haz clic en el botón **Preview** (Vista previa) para obtener una vista previa de tu aplicación. El modo de vista previa te permite ver la aplicación desde la perspectiva del usuario. Utiliza el modo de vista previa para interactuar con la interfaz de usuario de la aplicación y realizar un test de tus consultas. Cuando hayas terminado, haz clic en **Edit** (Editar) para volver al generador de aplicaciones.
- Para guardar tu aplicación, haz clic en **Save** (Guardar).
- Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

### Lienzo y componentes de una aplicación

El lienzo de la aplicación representa la interfaz gráfica con la que interactúan tus usuarios. Puedes hacer clic en un componente de la barra superior para añadirlo al lienzo o puedes arrastrar y soltar componentes para añadirlos o moverlos por el lienzo. Para ver todos los componentes disponibles, haz clic en **All Components** (Todos los componentes).

Cada componente cuenta con una lista de opciones de configuración correspondientes que controlan la forma en que los usuarios interactúan con tu aplicación. Por ejemplo, el componente **Text Input** (Entrada de texto) te permite establecer un valor predeterminado, texto de un parámetro y una etiqueta. El componente **Button** (Botón) incluye una etiqueta (tag) y un evento que se activa cuando se pulsa el botón. Los componentes también cuentan con la sección **Appearance** (Aspecto) que cambia el aspecto y el funcionamiento de los componentes. Por ejemplo, puedes desactivar un botón o controlar su visibilidad.

Para borrar o duplicar un componente, selecciónalo y haz clic en la elipsis de tres puntos (*...*) para mostrar las opciones **Delete** (Borrar) o **Duplicate** (Duplicar).

Componentes de interfaz de usuario disponibles:
- Botón
- Valor de llamada
- Casilla de verificación
- Contenedor
- Selector de intervalos de fechas
- Entrada JSON
- Modal
- Número de entrada
- Radio
- Buscar
- Seleccionar
- Tabla
- Texto
- Introducción de texto

#### Eventos

Los componentes de interfaz de usuario pueden desencadenar reacciones en un **evento**. Los desencadenantes de evento difieren según el componente. Por ejemplo, un componente de botón puede desencadenar una reacción en un evento de clic y un evento de componente de tabla puede desencadenar una reacción en un evento de cambio de página o un evento de clic en la fila de una tabla.

Un evento puede establecer el estado de un componente de la interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar un JavaScript personalizado.

Por ejemplo, el proyecto del [resumidor PR de GitHub][4] utiliza un botón **Summarize** (Resumir) con un evento que se activa al hacer clic. El evento utiliza la reacción **Trigger Query** (Desencadenar consulta) que ejecuta la consulta `summarizePulls`.

#### Valores dinámicos de la tabla

De forma similar a la [transformación posterior a la consulta](#post-query-transformation), el componente de interfaz de usuario de la tabla permite personalizar el origen de los datos de la tabla. Puedes utilizar el campo **Data Source** (Origen de datos) para rellenar dinámicamente los valores de la tabla y restringir los objetos que se introducen en la tabla como columnas.

Por ejemplo, el proyecto del [resumidor PR de GitHub][4] utiliza una serie de consultas de GitHub para resumir una lista de solicitudes pull en un repositorio. La consulta utiliza la siguiente entrada de orígenes de datos para restringir la tabla a 6 columnas: `title`,`Summary`,`updated_at`,`user`,`html_url` y `state`. El código resaltado rellena dinámicamente la columna del usuario de cada solicitud pull con el avatar del autor y el nombre de usuario de GitHub.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

En la tabla, la columna **User** (Usuario) se rellena con un avatar y un nombre de usuario de GitHub para cada autor de una solicitud pull.

### Consultas

Las consultas rellenan tu aplicación con datos procedentes de las API de Datadog o con integraciones compatibles. Toman datos de entrada de otras consultas u otros componentes de la interfaz de usuario y devuelven datos de salida para su uso en otras consultas o en otros componentes de la interfaz de usuario.

Para añadir una consulta, haz clic en el icono más (**+**) de la sección **Queries** (Consultas) y busca una consulta para añadirla a tu aplicación. Una vez añadida, la consulta aparecerá en la lista de consultas, arriba del editor de consultas. Haz clic y arrastra las consultas para reordenarlas. Selecciona una consulta para configurarla.

Para la autenticación, las consultas se basan en [conexiones][5]. App Builder comparte conexiones con la [automatización de flujos de trabajo][6].

#### Parámetros de ejecución

La función **Run Settings** (Parámetros de ejecución) determina cuándo se ejecuta una consulta. Existen dos opciones:

- **Automático**: La consulta se ejecuta cuando se carga la aplicación y cada vez que cambia algún argumento de la consulta.
- **Manual**: La consulta se ejecuta cuando otra parte de la aplicación la activa. Por ejemplo, utiliza un activador manual si quieres que una consulta se ejecute sólo cuando un usuario hace clic en un componente del botón de interfaz de usuario. Para obtener más información sobre los activadores de eventos, consulta [Eventos](#events).

#### Debounce

La configuración de debounce garantiza que tu consulta sólo se activará una vez con cada entrada de un usuario. Por defecto, el debounce está configurado en `0` milisegundos (ms). Para evitar que una consulta se ejecute con demasiada frecuencia, aumenta el debounce. Configura el debounce en la sección **Advanced** (Avanzado) de la consulta.

#### Consultas condicionales

Puedes establecer una condición que debe cumplirse antes de que pueda ejecutarse una consulta. Para establecer la condición de una consulta, introduce una expresión en el campo **Condition** (Condición) de la sección **Advanced** (Avanzado) de la consulta. Esta condición debe evaluarse como verdadera antes de que la consulta pueda ejecutarse. Por ejemplo, si quieres que una consulta determinada se ejecute sólo si existe un componente de interfaz de usuario denominado `select0` y no está vacío, utiliza la siguiente expresión:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

#### Transformación posterior a la consulta

Realiza una transformación posterior a la consulta para simplificar o transformar la salida de una consulta. Añade una transformación posterior a la consulta en la sección **Advanced** (Avanzado) de la consulta.

Por ejemplo, la acción de Slack _List Channels_ devuelve una matriz de diccionarios que contiene el ID y el nombre de cada canal. Para descartar los ID y devolver sólo una matriz de nombres, añade la siguiente transformación de consulta:

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Aplicar transformaciones a la salida de la consulta sin formato
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

#### Ganchos posteriores a la consulta

De forma similar a los eventos del componente de interfaz de usuario, puedes configurar una reacción que se active después de que se ejecuta una consulta. Un **post-query hook** (Gancho posterior a la consulta) puede establecer el estado de un componente de interfaz de usuario, abrir o cerrar un modal, activar otra consulta o incluso ejecutar un JavaScript personalizado. Por ejemplo, la consulta `scaleService` del proyecto del [gestor de tareas ECS][7] utiliza un gancho posterior a la consulta para volver a ejecutar la consulta `describeService` después de su ejecución.

#### Notificaciones de error

Para mostrar un toast (breve mensaje de notificación) al usuario cuando el sistema devuelve un error, activa la opción **Show Toast on Errors** (Mostrar toast en caso de error) en la sección **Advanced* (Avanzado) de la consulta.

#### Mensajes de confirmación

Para pedir una confirmación al usuario antes de que se ejecute la consulta, activa la opción **Requires Confirmation** (Requiere confirmación) en la sección **Advanced** (Avanzado) de la consulta.

### Variables

Utiliza variables de aplicación para pasar datos de una parte de tu aplicación a otra. Además, puedes utilizar variables de aplicación para pasar datos desde tu dashboard utilizando [variables de plantilla de dashboard][3].

Las variables se encierran entre llaves y van precedidas del signo del dólar (`${}`). Para utilizar una variable, introduce el nombre de la consulta o del componente de interfaz de usuario. Accede a los campos secundarios utilizando la notación de puntos. Por ejemplo, si tienes un componente de selección llamado `select0` y quieres acceder a su campo de valor predeterminado, utiliza la sintaxis `${select0.defaultValue}`. Si no sabes qué introducir como variable, escribe `${` para abrir un menú de sugerencias con todas las variables disponibles.

{{< img src="service_management/app_builder/app-builder-variable.mp4" alt="Si no sabes qué introducir como variable, escribe $ para abrir un menú de sugerencias con todas las variables disponibles" video=true >}}

### Personalizar una aplicación con JSON

Para editar una aplicación con JSON, haz clic en el icono del engranaje **Settings** (Configuración) y selecciona **Switch to JSON** (Cambiar a JSON). La opción **Switch to GUI** (Cambiar a GUI) del menú de configuración te devuelve al editor GUI.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /es/service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /es/service_management/workflows/connections
[6]: /es/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager