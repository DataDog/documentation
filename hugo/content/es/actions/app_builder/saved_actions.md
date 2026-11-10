---
algolia:
  tags:
  - app builder
  - actions
description: Guarde y reutilice una acción y sus parámetros
disable_sidebar: false
disable_toc: false
further_reading:
- link: /actions/workflows/actions/
  tag: Documentación
  text: Obtenga información sobre las acciones en los flujos de trabajo
- link: /integrations/
  tag: Documentación
  text: Obtenga información sobre integraciones
title: Guarde y reutilice acciones
type: documentation
---
Utilice la función _Saved Actions_ para guardar una copia de una acción para su reutilización. Puede insertar una acción guardada en su aplicación como un nuevo paso, o utilizar una acción guardada para completar los parámetros de un paso existente.

<div class="alert alert-info">Solo puede guardar acciones si tiene acceso de <a href="https://docs.datadoghq.com/actions/app_builder/access_and_auth/#app-permissions"><b>Editor</b>.</a> para esa aplicación.</div>

## Guarde una acción {#save-an-action}

1. En Datadog, navegue a [**Actions** > **App Builder**][1] y coloque el cursor sobre una aplicación. Los iconos de acción para esa aplicación aparecerán bajo la columna {{< ui >}}Last Saved{{< /ui >}}. Haga clic en el {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono.
1. Haga clic en el {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menú, luego en {{< ui >}}Save Action{{< /ui >}}.
1. Ingrese un nombre y una descripción para la acción.
1. Si desea que otros miembros de su organización tengan acceso a la acción, active el interruptor {{< ui >}}Usable by others in the organization{{< /ui >}}.
1. Verifique los detalles de configuración de la acción y haga clic en {{< ui >}}Save Action Configuration{{< /ui >}}.

## Utilice una acción guardada en su aplicación {#use-a-saved-action-in-your-app}

1. En Datadog, navegue a [**Actions** > **App Builder**][1], coloque el cursor sobre una aplicación y haga clic en el {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono.
1. Haga clic en el {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menú y seleccione {{< ui >}}Use Saved Actions{{< /ui >}}.
1. Explore la lista para encontrar la acción guardada que busca.
1. Seleccione la acción guardada para agregarla como un paso configurado en su aplicación.

## Administre una acción guardada {#manage-a-saved-action}

Puede editar, clonar o eliminar sus acciones guardadas desde el Action Catalog.

<div class="alert alert-info">Si usted no creó una acción, no puede eliminarla ni editarla directamente. En su lugar, seleccione el <b>Clonar</b> {{< img src="icons/clone-alert-blue.png" inline="true" style="width:14px;">}} icono para copiar la acción y realizar los cambios de configuración.</div>

Para encontrar una acción guardada:
1. En Datadog, navegue al [**Action Catalog**][2].
1. Haga clic en {{< ui >}}Saved Actions{{< /ui >}}.
1. Explore la lista de acciones guardadas o utilice la barra de búsqueda para buscar acciones por nombre. Pase el cursor sobre la acción guardada que desea editar, clonar o eliminar.
1. Haga clic en {{< ui >}}Manage Saved Actions{{< /ui >}}.
1. Seleccione el icono para editar {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}, clonar {{< img src="icons/clone.png" inline="true" style="width:14px;">}}, o eliminar {{< img src="icons/delete.png" inline="true" style="width:14px;">}} la acción guardada.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://chat.datadoghq.com/