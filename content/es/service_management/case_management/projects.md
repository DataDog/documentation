---
disable_toc: false
further_reading:
- link: service_management/case_management/create_case
  tag: Documentación
  text: Crear un caso
title: Proyectos
---

## Información general

Un proyecto es un objeto de contenedor que contiene un conjunto de casos. Organiza tu trabajo en torno a los grupos que tengan sentido para tu organización, ya sean equipos, servicios o iniciativas. Los casos de cada proyecto son independientes unos de otros, lo que te ayuda a centrarte en lo que es relevante. 

## Crear un proyecto

{{< img src="service_management/case_management/projects/projects_create_a_project_cropped.png" alt="Crear una página de proyecto nueva en la configuración de Case Management" style="width:100%;" >}}

Para crear un proyecto:
1. Selecciona **New Project** (Proyecto nuevo) en la vista de proyectos o haz clic en el icono **+** junto a *Your Projects* (Tus proyectos) en la barra de navegación izquierda.  
1. Ingresa un nombre de proyecto y una clave. Las claves de proyecto deben tener entre 1 y 10 caracteres. Los números de ID de caso van precedidos de una combinación de letras, por ejemplo, `NOC-123`. Las claves de proyecto son inmutables. 
1. Haz clic en **Create Project** (Crear proyecto).

Después de crear tu proyecto, añade uno o más usuarios o equipos de Datadog como miembros. Los proyectos de los que eres miembro aparecen en la sección **Your Projects** (Tus proyectos) de la barra de navegación izquierda. 

## Unirse a un proyecto

{{< img src="/service_management/case_management/projects/join_a_project_cropped.png" alt="Página de proyectos que muestra las opciones del botón para unirse a un proyecto" style="width:100%;" >}}

Encuentra proyectos dentro de tu organización en la vista **Projects** (Proyectos) de la barra de navegación izquierda. Cualquiera puede ver y unirse a cualquier proyecto. Asimismo, cualquiera puede crear y asignar casos en cualquier proyecto, independientemente de si es miembro del proyecto o no. 

## Eliminar un proyecto

<div class="alert alert-warning">Los casos eliminados no se pueden recuperar.</div>

Puedes eliminar un proyecto desde la página de Configuración de un proyecto.

Al eliminar un proyecto también se eliminan todos los casos que contiene. Si deseas conservar los casos, Datadog recomienda moverlos a otro proyecto antes de eliminarlos.

La eliminación de un proyecto deshabilita de manera automática cualquier patrón de correlación de eventos vinculado al proyecto. Otras automatizaciones, como la creación de casos a través de los flujos de trabajo de Datadog o monitorizar menciones `@case`, también se interrumpen al eliminar el proyecto vinculado. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}