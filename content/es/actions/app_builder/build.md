---
aliases:
- /es/app_builder/build
- /es/service_management/app_builder/build
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: Documentación
  text: Catálogo de acciones
title: Crear aplicaciones
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

Puedes crear una aplicación o editar aplicaciones existentes desde la página de [App Builder][1]. La página muestra información sobre las aplicaciones existentes e incluye lo siguiente:
- Autor
- Estado
- Fecha de la última modificación de cada aplicación
- Si la aplicación está publicada

En la página de App Builder, puedes acceder a tus aplicaciones y filtrarlas. Pasa el cursor sobre una aplicación para ver las opciones de editar, eliminar, ver o clonar la aplicación. También puedes activar la opción **My apps** (Mis aplicaciones) para ver únicamente las aplicaciones que has creado:

{{< img src="service_management/app_builder/app-builder-my-apps.png" alt="La página de App Builder, filtrada para mostrar solo 'My apps' (Mis aplicaciones)." style="width:100%;" >}}

## Crear una aplicación

### Crear una aplicación a partir de un modelo

Los modelos son aplicaciones de inicio útiles que cubren casos de uso comunes. Vienen cargados con datos de demostración que puedes utilizar para conocer la aplicación. Los modelos también incluyen las prácticas recomendadas para configurar las funciones y la presentación visual de la aplicación.

1. En [App Builder][1], haz clic en la pestaña [Blueprints (Modelos)][2].
1. Busca el modelo que quieres utilizar y haz clic en **Preview** (Vista previa).
1. Haz clic en **Use Blueprint** (Utilizar modelo) para abrir el proyecto de la aplicación.
1. Para cambiar el nombre y la descripción de la aplicación, haz clic en su nombre.
1. Cada modelo viene cargado con datos de demostración. Para personalizar la aplicación, edita la **Connection** (Conexión) de cada consulta.
1. Para guardar la aplicación, haz clic en **Save as New App** (Guardar como nueva aplicación).
1. Para obtener una vista previa de la aplicación, haz clic en **Preview** (Vista previa). Haz clic en **Edit** (Editar), en la pantalla de vista previa, para volver a la vista de configuración.
1. Cuando termines de modificar la aplicación, haz clic en **Run** (Ejecutar) para realizar un test.
1. Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

### Crear una aplicación personalizada

1. En [App Builder][1], haz clic en **New App** (Nueva aplicación).
1. Para cambiar el nombre y la descripción de la aplicación, haz clic en su nombre.
1. Para añadir un [componente de interfaz de usuario](#app-canvas-and-components) al lienzo de la aplicación, haz clic en el signo más ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) para abrir la pestaña **Components** (Componentes) y, luego, haz clic en el componente o arrástralo hasta el lienzo.
1. Utiliza [consultas](#queries) para rellenar o interactuar con tu lienzo.
1. Para guardar la aplicación, haz clic en **Save as New App** (Guardar como nueva aplicación).
1. Para obtener una vista previa de la aplicación, haz clic en **Preview** (Vista previa). Haz clic en **Edit** (Editar), en la pantalla de vista previa, para volver a la vista de configuración.
1. Cuando termines de modificar la aplicación, haz clic en **Run** (Ejecutar) para realizar un test.
1. Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

## Personalizar tu aplicación

Las aplicaciones están conformadas por componentes de interfaz de usuario y consultas que interactúan entre sí para crear la experiencia de usuario y la lógica de cada aplicación. La lista de consultas y el editor aparecen en la parte izquierda de la página, mientras que el lienzo de la aplicación y los componentes de interfaz de usuario ocupan la parte derecha de la página.

Personalización básica:
- Para editar **Name**, **Description**, or **Canvas Color** (Nombre, Descripción o Color del lienzo) en tu aplicación, haz clic en el nombre de la aplicación en la parte superior izquierda.
- Haz clic en el botón **Preview** (Vista previa) para obtener una vista previa de tu aplicación. El modo de vista previa te permite ver la aplicación desde la perspectiva del usuario. Utiliza el modo de vista previa para interactuar con la interfaz de usuario de la aplicación y realizar un test de tus consultas. Cuando hayas terminado, haz clic en **Edit** (Editar) para volver al generador de aplicaciones.
- Para guardar tu aplicación, haz clic en **Save** (Guardar).
- Cuando tu aplicación esté lista para ser publicada, haz clic en **Publish** (Publicar). La publicación de una aplicación la pone a disposición de tus dashboards.

### Lienzo y componentes de una aplicación

El lienzo de la aplicación representa la interfaz gráfica con la que interactúan los usuarios. Puedes arrastrar y soltar componentes para moverlos por el lienzo. Para ver todos los componentes disponibles, haz clic en el signo más ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) para abrir la pestaña **Components** (Componentes).

Cada componente cuenta con una lista de opciones de configuración correspondientes que controlan la forma en que los usuarios interactúan con tu aplicación. Por ejemplo, el componente **Text Input** (Entrada de texto) te permite establecer un valor predeterminado, el texto de un parámetro y una etiqueta (label). El componente **Button** (Botón) incluye una etiqueta y un evento que se activa cuando se pulsa el botón. Los componentes también cuentan con la sección **Appearance** (Aspecto) que cambia el aspecto y el funcionamiento de los componentes. Por ejemplo, puedes desactivar un botón o controlar su visibilidad.

Para borrar o duplicar un componente, selecciónalo y haz clic en los tres puntos (*...*) para mostrar las opciones **Delete** (Borrar) o **Duplicate** (Duplicar).

Para ver una lista de los componentes de interfaz de usuario disponibles y sus propiedades, consulta [Componentes][9].

Los componentes de la interfaz de usuario pueden desencadenar reacciones en un [evento][11]. 

Las [consultas][12] rellenan tu aplicación con datos procedentes de las API de Datadog o con integraciones compatibles. Toman entradas de otras consultas u otros componentes de interfaz de usuario y devuelven resultados para su uso en otras consultas o en otros componentes de interfaz de usuario.

Puedes utilizar [expresiones de JavaScript][13] en cualquier parte de App Builder para crear interacciones personalizadas entre las diferentes partes de tu aplicación.

## Etiquetar una aplicación

Las etiquetas (tags) se muestran en una columna de la [lista de aplicaciones][14].

Para añadir una etiqueta a una aplicación:

1. Abre la pestaña **App Properties** (Propiedades de la aplicación) en tu aplicación.
1. En **Tags** (Etiquetas), utiliza el menú desplegable para seleccionar una etiqueta existente, o ingresa un valor nuevo y haz clic en **Add option: [your text]** (Añadir opción: [tu texto]).
1. Guarda tu aplicación.

La etiqueta aparece en la línea correspondiente a esta aplicación en la lista de aplicaciones. Puedes hacer clic en la etiqueta de esta lista para copiarla en el portapapeles.

## Marcar una aplicación como favorita

Para marcar una aplicación como favorita y anclarla a la parte superior de tu lista de aplicaciones, haz clic en el icono de estrella que aparece junto al nombre de la aplicación en [lista de aplicaciones][14]:

{{< img src="service_management/app_builder/app-list-star.png" alt="Una lista de aplicaciones con cuatro aplicaciones, ninguna de las cuales está marcada con una estrella." style="width:40%;" >}}

Cuando actualices la página, la aplicación marcada con una estrella aparecerá en una sección en la parte superior de tu lista de aplicaciones:

{{< img src="service_management/app_builder/app-list-with-favorited-app.png" alt="Una lista de aplicaciones con cuatro aplicaciones, una de las cuales está marcada con una estrella y anclada en la parte superior de la lista." style="width:40%;" >}}

## Ver el historial de versiones de la aplicación

App Builder mantiene un registro de cada versión guardada de tu aplicación.

Para ver el historial de versiones, en el menú de la parte izquierda de tu aplicación, haz clic en el icono del historial de versiones {{< img src="service_management/app_builder/version-history-icon.png" inline="true">}}.

La interfaz de usuario muestra hasta 50 versiones guardadas o publicadas de tu aplicación, junto con el icono del usuario que guardó o publicó la versión:

{{< img src="service_management/app_builder/version-history-example.png" alt="Un ejemplo de lista del historial de versiones de App Builder con dos elementos, la versión actual y una versión anterior." style="width:70%;" >}}

Puedes realizar las siguientes operaciones:

* Para ver la versión de una aplicación, haz clic en ella en la lista.
* Para sobrescribir una aplicación existente con una versión anterior, selecciona la versión y haz clic en **Restore Version** (Restaurar versión) en la parte superior derecha.
* Para crear una nueva aplicación que sea una copia de una versión, selecciona la versión y haz clic en **Clone Version** (Clonar versión) en la parte superior derecha.


## Interactuar con una aplicación en JSON

### Editar una aplicación

Para editar una aplicación con JSON, haz clic en el icono del engranaje **Settings** (Configuración) y selecciona **Switch to JSON** (Cambiar a JSON). La opción **Switch to GUI** (Cambiar a GUI) del menú de configuración te devuelve al editor GUI.

### Exportar una aplicación

Para copiar el diseño de una aplicación de una organización a otra o hacer una copia de seguridad, haz clic en el icono de engranaje (**Settings** [Configuración]) y selecciona **Switch to JSON** (Cambiar a JSON). Aparecerá el código JSON de toda la aplicación. Copia este código JSON y guárdalo en un editor de texto. Puedes guardar estados intermedios de tu aplicación durante el proceso de desarrollo y volver a ellos si es necesario.

Para copiar la aplicación en otra organización:
1. Crea una aplicación. 
1. Haz clic en el icono de engranaje (**Settings** [Configuración]) y selecciona **Switch to JSON** (Cambiar a JSON). 
1. Remplaza el código JSON existente por el que copiaste antes. 

La opción **Switch to GUI** (Cambiar a la interfaz gráfica de usuario) del menú de configuración te lleva devuelta al editor de la interfaz gráfica de usuario.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][8].

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /es/service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /es/service_management/workflows/connections
[6]: /es/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[9]: /es/service_management/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /es/service_management/app_builder/events
[12]: /es/service_management/app_builder/queries
[13]: /es/service_management/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list