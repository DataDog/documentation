---
description: Los parámetros de entrada te permiten insertar la misma aplicación en
  varios dashboards o blocs de notas utilizando configuraciones diferentes para cada
  instancia.
disable_toc: false
title: Parámetros de entrada
---

Los parámetros de entrada te permiten insertar la misma aplicación en varios dashboards o blocs de notas utilizando configuraciones diferentes para cada instancia.

## Ejemplo de aplicación

Un case (incidencia) de uso común para los parámetros de entrada es reutilizar y personalizar una aplicación para diferentes entornos, como desarrollo, almacenamiento provisional y producción. En la siguiente captura de pantalla, una aplicación está insertada dos veces en un dashboard. La aplicación de la izquierda muestra los monitores en el entorno de demostración, mientras que la aplicación de la derecha muestra la misma información para los monitores en el entorno de almacenamiento provisional. Puedes jugar con esta aplicación clonando blueprint (esquema) [Cómo: Parámetros de entrada][3].

{{< img src="/service_management/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="Dos aplicaciones insertadas con parámetros de entrada diferentes seleccionados" style="width:100%;" >}}

## Crear un parámetro de entrada 

1. En [Generador de aplicaciones][1], selecciona una aplicación y haz clic en **Edit** (Editar). 
1. Haz clic en el icono **App Properties** (Propiedades de la aplicación) ({{< img src="service_management/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}}).
1. Haz clic en el icono más (<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) para añadir un parámetro de entrada. 
1. Haz clic en el nuevo parámetro de entrada para configurar sus elementos: 
    - Nombre del parámetro
    - Mostrar nombre (opcional) 
    - Tipo de datos
    - Valores permitidos
    - Valor predeterminado
    - Descripción (opcional) 
1. Haz clic en **Save** (Guardar).

### Ejemplo de parámetro de entrada 

Este parámetro de entrada de ejemplo muestra la misma aplicación en varios entornos de almacenamiento provisional:

{{< img src="/service_management/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="Un ejemplo de los parámetros de entrada configurados en una aplicación" style="width:35%;" >}}

## Utilizar parámetros de entrada 

<div class="alert alert-info">Las aplicaciones con parámetros de entrada funcionan mejor en dashboards y blocs de notas. Aunque puedes añadir una aplicación a Acciones de Self-Service, no puedes seleccionar los parámetros de entrada que has configurado. 
</div>

Para insertar una aplicación con parámetros de entrada:

1. En [Generador de aplicaciones][1], selecciona una aplicación con un parámetro de entrada configurado.
1. Haz clic en **Add to a dashboard** (Añadir a un dashboard).
1. Selecciona un dashboard y haga clic en **Save and Open** (Guardar y abrir).
1. En el dashboard, sitúa el cursor sobre la aplicación y haz clic en el icono **Edit** (Editar) ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
1. En la sección **Input Parameters** (Parámetros de entrada), selecciona un parámetro de entrada:
{{< img src="/service_management/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="Un ejemplo de una aplicación en el modo de edición con los parámetros de entrada encerrados en un círculo" style="width:80%;" >}}
1. Haz clic en **Save** (Guardar).

## Reutilizar una aplicación

Después de insertar una aplicación en un dashboard o en un bloc de notas, puedes crear una copia para reutilizarla con diferentes contextos:
1. Selecciona la aplicación insertada. 
1. Haz clic en el icono **Options** (Opciones) (<i class="icon-kebab-wui" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) y, a continuación, en **Clone** (Clonar).
    - También puedes seleccionar la aplicación y utilizar los atajos de teclado para copiar y pegar.
1. Sigue los steps (UI) / pasos (generic) [anteriores][2] para seleccionar un parámetro de entrada diferente.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /es/actions/app_builder/embedded_apps/input_parameters/#use-input-parameters
[3]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to_input_parameters&viewMode=templatePreview