---
description: Los parámetros de entrada le permiten incrustar la misma aplicación en
  varios tableros o notebooks utilizando diferentes configuraciones para cada instancia.
disable_toc: false
title: Parámetros de entrada
---
Los parámetros de entrada le permiten incrustar la misma aplicación en varios tableros o notebooks utilizando diferentes configuraciones para cada instancia. 

## Aplicación de ejemplo {#example-app}

Un caso de uso común para los parámetros de entrada es reutilizar y personalizar una aplicación para diferentes entornos, como desarrollo, pruebas y producción. En la captura de pantalla a continuación, una aplicación está incrustada dos veces en un tablero. La aplicación de la izquierda muestra monitores en el entorno de demostración, mientras que la aplicación de la derecha muestra la misma información para los monitores en el entorno de pruebas. Puede experimentar con esta aplicación clonando el plano [Cómo: Parámetros de entrada][3].

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="Dos aplicaciones incrustadas con diferentes parámetros de entrada seleccionados" style="width:100%;" >}}

## Crear un parámetro de entrada {#create-an-input-parameter}

1. En [App Builder][1], seleccione una aplicación y haga clic en {{< ui >}}Edit{{< /ui >}}. 
1. Haga clic en el icono {{< ui >}}App Properties{{< /ui >}} ("{{< img src="actions/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}}).
1. Haga clic en el icono de más (<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) para agregar un parámetro de entrada. 
1. Haga clic en el nuevo parámetro de entrada para configurar sus elementos: 
    - {{< ui >}}Parameter Name{{< /ui >}}
    - {{< ui >}}Display Name{{< /ui >}} (opcional) 
    - {{< ui >}}Data Type{{< /ui >}}
    - {{< ui >}}Allowed Values{{< /ui >}}
    - {{< ui >}}Default Value{{< /ui >}}
    - {{< ui >}}Description{{< /ui >}} (opcional) 
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Ejemplo de parámetro de entrada {#example-input-parameter}

Este ejemplo de parámetro de entrada muestra la misma aplicación en varios entornos de pruebas:

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="Un ejemplo de parámetros de entrada configurados dentro de una aplicación" style="width:35%;" >}}

## Utilice parámetros de entrada {#use-input-parameters}

<div class="alert alert-info">Las aplicaciones con parámetros de entrada funcionan mejor en tableros y notebooks. Aunque puede agregar una aplicación a Self-Service Actions, no puede seleccionar los parámetros de entrada que ha configurado. 
</div>

Para incrustar una aplicación con parámetros de entrada:

1. En [App Builder][1], seleccione una aplicación con un parámetro de entrada configurado.
1. Haga clic en {{< ui >}}Add to a dashboard{{< /ui >}}. 
1. Seleccione un tablero, luego haga clic en {{< ui >}}Save and Open{{< /ui >}}.
1. En su tablero, pase el cursor sobre la aplicación y haga clic en el icono {{< ui >}}Edit{{< /ui >}} ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
1. En la sección {{< ui >}}Input Parameters{{< /ui >}}, seleccione un parámetro de entrada:
{{< img src="/actions/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="Un ejemplo de una aplicación en modo de edición con los Parámetros de entrada rodeados por un círculo" style="width:80%;" >}}
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Reutilizar una aplicación {#reuse-an-app}

Después de incrustar una aplicación en un tablero o notebook, puede crear una copia para reutilizarla con diferentes contextos:
1. Seleccione la aplicación incrustada. 
1. Haga clic en el icono {{< ui >}}Options{{< /ui >}} (<i class="icon-kebab-wui" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>), luego haga clic en {{< ui >}}Clone{{< /ui >}}.
    - Alternativamente, puede seleccionar la aplicación y usar los atajos de teclado de copiar y pegar.
1. Siga los pasos [anteriores][2] para seleccionar un parámetro de entrada diferente.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /es/actions/app_builder/embedded_apps/input_parameters/#use-input-parameters
[3]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to_input_parameters&viewMode=templatePreview