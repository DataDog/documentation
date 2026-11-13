---
aliases:
- /es/service_management/case_management/projects/
- /es/incident_response/case_management/projects/
disable_toc: false
further_reading:
- link: incident_response/work_management/create_work_item
  tag: Documentación
  text: Crear un elemento de trabajo
title: Proyectos
---
## Descripción general {#overview}

Un proyecto es un objeto contenedor que alberga un conjunto de elementos de trabajo. Organice su trabajo en torno a los grupos que tengan sentido para su organización, ya sean equipos, servicios o iniciativas. Los elementos de trabajo en cada proyecto están aislados entre sí, lo que le ayuda a concentrarse en lo que es relevante.

## Crear un proyecto {#create-a-project}

Para crear un proyecto:
1. Seleccione **New Project** en el Projects view o haga clic en el icono **+** junto a *Your Projects* en la barra de navegación izquierda.
1. Ingrese un nombre y una clave para el proyecto. Las claves de proyecto deben tener entre uno y 10 caracteres de longitud. Los números de identificación de los elementos de trabajo tienen como prefijo una combinación de letras, por ejemplo, `NOC-123`. Las claves de proyecto son inmutables.
1. Haga clic en **Create Project**.

## Eliminar un proyecto {#delete-a-project}

<div class="alert alert-danger">Los elementos de trabajo eliminados no se pueden recuperar.</div>

Puede eliminar un proyecto desde la página de Settings del proyecto.

Eliminar un proyecto también elimina todos los elementos de trabajo que contiene. Si desea conservar los elementos de trabajo, Datadog recomienda moverlos a otro proyecto antes de eliminarlos.

Eliminar un proyecto deshabilita automáticamente cualquier patrón de correlación de eventos vinculado al proyecto. Otras automatizaciones, como la creación de elementos de trabajo a través de flujos de trabajo de Datadog o menciones de Monitor `@case`, también se interrumpen cuando elimina el proyecto vinculado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}