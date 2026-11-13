---
aliases:
- /es/app_builder/variables
- /es/service_management/app_builder/variables
description: Encapsule la lógica dentro de las aplicaciones usando variables de estado
  para almacenar y manipular datos a través de diferentes componentes de la aplicación.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /actions/app_builder/expressions/
  tag: Documentación
  text: Expresiones de JavaScript
title: Variables de estado
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder está en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

Si desea encapsular la lógica dentro de su aplicación, puede usar variables de estado.

## Cree una variable de estado {#create-a-state-variable}

Para agregar una variable de estado con Bits AI:
   1. Haga clic en el icono {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Ingrese un aviso personalizado para una variable, o pruebe el aviso `How can you help me with variables?`.

Para agregar una variable de estado manualmente:

1. En su aplicación, haga clic en el icono {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) para abrir la pestaña Data.
1. Haga clic en el signo más ({{< ui >}}\+{{< /ui >}}), luego seleccione {{< ui >}}Variable{{< /ui >}}.
1. Opcionalmente, haga clic en el nombre de la variable y cámbiele el nombre.
1. Defina el valor inicial para su variable de estado.

## Aplicación de ejemplo {#example-app}

{{< img src="actions/app_builder/state-variables-example-app.mp4" alt="Al hacer clic en el botón, el valor del elemento de valor destacado cambia entre un Pass verde y un Fail rojo." video="true" width="360px">}}

Para crear una aplicación que use un botón para cambiar el estilo y el valor de un componente de valor destacado, siga estas instrucciones.

### Cree las variables {#create-the-variables}

1. En su aplicación, haga clic en el icono {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) para abrir la pestaña Data.
1. Haga clic en el signo más ({{< ui >}}\+{{< /ui >}}), luego seleccione {{< ui >}}Variable{{< /ui >}}.
1. Nombre la variable `callout_value` y establezca su {{< ui >}}Initial Value{{< /ui >}} en `Pass`.
1. Haga clic en el signo más ({{< ui >}}\+{{< /ui >}}) para crear otra variable.
1. Asigne un nombre a esta variable `callout_color` y establezca su {{< ui >}}Initial Value{{< /ui >}} en `green`.

### Cree los componentes {#create-the-components}

1. Agregue un componente de valor destacado a su aplicación. Asígnele los siguientes valores:
    * {{< ui >}}Value{{< /ui >}}: `${callout_value.value}`
    * {{< ui >}}Style{{< /ui >}}: `${callout_color.value}`
1. Agregue un componente de botón a su aplicación y establezca su etiqueta en `Change status`.
1. En {{< ui >}}Events{{< /ui >}}, agregue un evento. Asígnele los siguientes valores:
    * {{< ui >}}Event{{< /ui >}}: `click`
    * {{< ui >}}Reaction{{< /ui >}}: `custom`
    * {{< ui >}}Callback{{< /ui >}}:
        ```
        ${ () => {
            if(callout_color.value !== "green"){
                callout_color.setValue("green")
                callout_value.setValue("Pass")
            } else {
            callout_color.setValue("red")
            callout_value.setValue("Fail")
            }
        } }
        ```
1. Haga clic en {{< ui >}}Preview{{< /ui >}} para obtener una vista previa de su aplicación.<br>
    Cuando hace clic en el botón {{< ui >}}Change status{{< /ui >}} de su aplicación, el color y el texto del elemento de valor destacado alternan entre un Pass verde y un Fail rojo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][1].

[1]: https://chat.datadoghq.com/