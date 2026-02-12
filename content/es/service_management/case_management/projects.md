---
disable_toc: false
further_reading:
- link: service_management/case_management/create_case
  tag: Documentación
  text: Crear un caso
title: Proyectos
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
La gestión de casos no está disponible en el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

## Resumen

Un proyecto es un objeto Contenedor que contiene un conjunto de casos. Organice su trabajo en torno a los grupos que tengan sentido para su organización, ya sean equipos, servicios o iniciativas. Los casos de cada proyecto están aislados unos de otros, lo que le ayuda a centrarse en lo que es relevante.

## Crear un proyecto

{{< img src="service_management/case_management/projects/projects_create_a_project_cropped.png" alt="Create a new project page under Case management Settings" style="width:100%;" >}}

Para crear un proyecto
1. Seleccione **Nuevo proyecto** en la vista de proyectos o haga clic en el icono **+** situado junto a *Sus proyectos* en la barra de navegación izquierda.
1. Introduzca un nombre y una clave de proyecto. Las claves de proyecto deben tener entre uno y 10 caracteres. Los números de identificación de mayúsculas y minúsculas van precedidos de una combinación de letras, por ejemplo, `NOC-123`. Las claves de proyecto son inmutables.
1. Haga clic en **Crear proyecto**.

## Borrar un proyecto

<div class="alert alert-danger">Los casos borrados no se pueden recuperar.</div>

Puedes eliminar un proyecto desde la página de Configuración de un proyecto.

Al eliminar un proyecto también se eliminan todos los casos que contiene. Si deseas conservar los casos, Datadog recomienda moverlos a otro proyecto antes de eliminarlos.

La eliminación de un proyecto desactiva automáticamente cualquier patrón de correlación de eventos vinculados al proyecto. Otras automatizaciones, como la creación de casos a través de Datadog Workflows o menciones `@case` del monitor, también se interrumpen al eliminar el proyecto vinculado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
