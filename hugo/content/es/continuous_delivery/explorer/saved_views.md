---
descriptions: Learn how to create and share saved views in the CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: Documentación
  text: Aprenda a crear una consulta de búsqueda
title: Saved Views
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

Las Saved Views le permiten guardar el estado de la [página de Deployment Executions][1] y facilitan la resolución de problemas al brindarle acceso a consultas con alcance definido, facetas relevantes, opciones de visualización y el rango de tiempo.

Las Saved Views pueden realizar un seguimiento de sus:

- Resultados de despliegue y datos del entorno
- Consultas de búsqueda (como ejecuciones de despliegue fallidas con un proveedor de CD específico, ejecuciones de despliegue fallidas en un entorno determinado por su estado de despliegue, ejecuciones de despliegue que requirieron reversiones, e identificadores o URL de despliegue)
- Rango de tiempo en vivo (como la última hora o la última semana)
- Visualizaciones (como series temporales, lista principal, tabla o lista)

También puede usar Saved Views para compartir consultas y configuraciones comunes con sus compañeros de equipo.

## Vistas guardadas {#saved-views}

Para acceder a sus Saved Views, expanda **> Views** a la izquierda en la [página de Deployment Executions][1].

Todas las Saved Views, excepto la [vista predeterminada](#default-views), se comparten en toda la organización, incluidas las Saved Views personalizadas creadas por los usuarios. Estas pueden ser editadas por cualquier persona de su organización y muestran el avatar del usuario que creó la vista. Haga clic en **Save** para crear una Saved View personalizada a partir del contenido actual en su explorador.

<div class="alert alert-info">Las acciones de actualizar, renombrar y eliminar están deshabilitadas para los usuarios de solo lectura.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Vista predeterminada en el explorador de CD Visibility" width="100%" >}}

Usted puede:

- Cargar o recargar una Saved View
- Actualizar una Saved View con la configuración de la vista actual
- Renombrar o eliminar una Saved View
- Compartir una Saved View a través de un enlace corto
- Marque una Saved View como favorita para agregarla a su lista de Saved Views, accesible en el menú de navegación

<div class="alert alert-info">Las acciones de actualizar, renombrar y eliminar están deshabilitadas para los usuarios de solo lectura.</div>

## Vistas predeterminadas {#default-views}

Puede configurar una Saved View para que sea su página de inicio predeterminada en la [página de Deployment Executions][1]. Las vistas predeterminadas se establecen por usuario y no tienen impacto en su organización.

{{< img src="continuous_delivery/explorer/default_view.png" alt="Vista predeterminada en el explorador de CD Visibility" width="100%" >}}

Anule temporalmente su Saved View predeterminada al realizar una acción en la UI o abrir enlaces en el explorador que incorporen una configuración diferente.

En la entrada de la vista predeterminada del panel **Views**, puede:

- Haga clic en la entrada para recargar su vista predeterminada
- Actualice su vista predeterminada con los parámetros actuales
- Restablezca su vista predeterminada a la configuración predeterminada para un reinicio desde cero

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions