---
aliases:
- /es/tracing/services/renaming_rules/
description: Crea nombres personalizados para entidades inferidas como bases de datos
  y colas utilizando etiquetas (tags) y expresiones regulares.
further_reading:
- link: tracing/services/inferred_services
  tag: Documentación
  text: Servicios inferidos
site_support_id: reglas_reasignación_entidades_inferidas
title: Reglas de reasignación para entidades inferidas
---

## Información general

En Datadog, puedes reasignar entidades inferidas, que incluyen los almacenes de datos y las colas, para que sean más fáciles de identificar y gestionar. Las reglas de reasignación permiten sustituir la etiqueta `peer.service` en tramos (spans) con nombres personalizados o generar nombres dinámicamente utilizando etiquetas y expresiones regulares. Esta funcionalidad se aplica en todo APM, no solo en el [Software Catalog][3]. Una vez creada una regla, los nombres actualizados aparecen de forma coherente en mapas de servicio, Trace Explorer, monitores, dashboards y cualquier otra vista de APM.

La reasignación es útil cuando:
- El nombre por defecto no coincide con tus preferencias o convenciones.
- Los servicios que esperas que aparezcan como uno solo se dividen en varias entidades inferidas.
- Varios componentes están agrupados bajo un mismo nombre, pero quieres representarlos por separado.

**Nota**: Esta página describe solo la reasignación de entidades inferidas. Para reasignar tus servicios instrumentados (rastreados), está disponible la versión preliminar de [Service Remapping Rules][4].

## Requisitos previos

Debes tener el permiso `apm_service_renaming_write` para crear reglas de reasignación. Consulta [Permisos][2] para obtener más información sobre el control de acceso basado en roles de Datadog.

## Crear una regla de reasignación 

### Paso 1: Seleccionar la acción y las entidades de reasignación objetivo

1. En Datadog, ve a **APM > Software Catalog > Manage > Manage Remapping Rules** (APM > Software Catalog > Gestionar > Gestionar reglas de reasignación) y haz clic en **+ Add Rule** (+ Añadir regla).

   Alternativamente, ve a **APM > Software Catalog** y haz clic en un servicio para abrir el panel lateral de servicios. Desde allí, haz clic en **Service Page > Service Remapping** (Página de servicio > Reasignación de servicios).

   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="Panel lateral de un servicio concreto que muestra el menú desplegable de la página de servicio con una opción de reasignación de servicios" style="width:100%;" >}}

1. Elige una acción de reasignación que quieras realizar para tu nueva regla de reasignación.

   Puedes optar por dividir una única entidad, renombrar una entidad, fusionar varias entidades o reasignar varias entidades.

1. Utiliza la barra de búsqueda para seleccionar las entidades que quieres reasignar.
   - Puedes seleccionar una o varias entidades, pero todas deben ser del mismo tipo (servicio, almacén de datos o cola).
   - A medida que seleccionas entidades, se crea una consulta de tramo en segundo plano. Para editar la consulta, selecciona **Build Advanced Query** (Crear consulta avanzada).


### Paso 2: Especificar el nombre de la nueva entidad

1. En el cuadro de texto, introduce un nombre único para la entidad (o entidades) seleccionada. Alternativamente, utiliza valores de etiqueta con la sintaxis `{{tagName}}` para reasignar en función de las etiquetas de una entidad.
1. Si los valores de las etiquetas siguen un patrón, aplica una expresión regular para extraer solo la parte que quieras del nombre.


### Paso 3: Colocarle un nombre a tu regla y revisarla

1. Puedes introducir un nombre descriptivo para la regla de reasignación a fin de poder identificarla posteriormente.
1. Revisa y guarda tu regla de reasignación.

<div class="alert alert-info"><ul><li>Las reglas se procesan en la ingesta y se aplican a los datos a medida que se reciben.</li><li>Los cambios solo afectan a los tramos en los que la regla está activa y los datos anteriores no se actualizan de forma retroactiva.</li><li>La eliminación o modificación de una regla impide que se aplique a los nuevos datos, pero no revierte los nombres de los datos ingeridos anteriormente.</li></ul></div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/inferred_services
[2]: /es/account_management/rbac/permissions
[3]: /es/internal_developer_portal/software_catalog/
[4]: /es/tracing/services/service_remapping_rules/