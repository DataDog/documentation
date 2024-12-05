---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización del flujo de trabajo
aliases:
- /es/workflows/actions_catalog/action_blueprints/
- /es/service_management/workflows/actions_catalog/saved_actions/
- /es/service_management/workflows/actions/saved_actions/
description: Guardar y reutilizar una acción y sus parámetros
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
title: Python
type: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation no es compatible con tu sitio <a href="/getting_started/site">Datadog seleccionado</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utiliza la función _Saved Actions_ (Acciones guardadas) para almacenar y reutilizar una acción y sus parámetros. Puedes insertar una acción guardada en tu flujo de trabajo como un nuevo paso, o utilizarla para rellenar los parámetros de un paso existente.

## Guardar una acción

1. En el lienzo de flujo de trabajo, haz clic en una acción que desees guardar.
1. Haz clic en el icono **Saved Actions** (Acciones guardadas) y selecciona **Save action configurations** (Guardar configuraciones de acciones).
1. Introduce un nombre y una descripción para la acción.
1. Si deseas que cualquier persona de tu organización tenga acceso a la acción, activa la casilla **Usable by others in the organization** (Accesible para otras personas de la organización).
1. Verifica los detalles de configuración para la acción y haz clic en **Save Action Configuration** (Guardar configuración de acción).

{{< img src="service_management/workflows/save_action.mp4" alt="Haz clic en el icono Acción guardada para guardar una acción para utilizarla después." video="true" width=80% >}}

## Utiliza una acción guardada en tu flujo de trabajo

Para añadir una acción guardada como un nuevo paso en tu flujo de trabajo:
1. Haz clic en el icono más (`+`) del lienzo de flujo de trabajo y selecciona Acciones guardadas.
1. Utiliza la barra Buscar o navega por la lista para encontrar la Acción guardada que buscas.
1. Selecciona la Acción guardada para añadirla como paso configurado en el lienzo de tu flujo de trabajo.

Para configurar un paso existente utilizando una acción guardada:
1. Selecciona un paso de tu flujo de trabajo que desees rellenar con una acción preconfigurada.
1. Haz clic en el icono **Saved Actions** (Acciones guardadas) y selecciona **Configure using a saved action** (Configurar utilizando una acción guardada).
1. Selecciona la Acción guardada que deseas utilizar para configurar tu paso y haz clic en **Use Saved Action** (Utilizar acción guardada).

## Gestionar una acción guardada

Puedes previsualizar, 9editar o eliminar tus Acciones guardadas desde la pestaña [Action Catalog (catálogo de acciones][1].

Para buscar una acción guardada:
1. En la página [Workflow Automation][2], haz clic en [**Action Catalog** (Catálogo de acciones)][1].
1. Haz clic en **Saved Actions** (Acciones guardadas) y busca en la lista la Acción guardada que deseas previsualizar, editar o eliminar.
1. Pasa el cursor por encima de la acción y haz clic en **Preview/Edit saved configurations** (Ver/editar configuraciones guardadas) para obtener una vista previa de la acción.
1. En la pantalla de vista previa, selecciona la acción para editarla o eliminarla.

Si no has creado la acción, no puedes editarla directamente. En su lugar, selecciona el icono **Clone** (Clonar) para copiarla y realizar los cambios en configuración. No puedes eliminar una acción que no hayas creado.

{{< img src="service_management/workflows/edit_saved_action.png" alt="Previsualizar, editar o eliminar una acción guardada del Catálogo de acciones." style="width:80%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow/action-catalog
[2]: https://app.datadoghq.com/workflow/