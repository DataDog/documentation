---
aliases:
- /es/app_builder/variables
disable_toc: false
further_reading:
- link: /service_management/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /service_management/app_builder/expressions/
  tag: Documentación
  text: Expresiones de JavaScript
title: Variables de estado
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

Si deseas encapsular la lógica en tu aplicación, puedes utilizar variables de estado.

## Crear una variable de estado

Para añadir una variable de estado a tu aplicación, sigue estos pasos:

1. En tu aplicación, haz clic en el icono Datos (**{&nbsp;}**) para abrir la pestaña Datos.
1. Haz clic en el signo más (**+**) y selecciona **Variable**.
1. O haz clic en el nombre de la variable y cámbiale el nombre.
1. Define el valor inicial de tu variable de estado.

## Ejemplo de aplicación

{{< img src="service_management/app_builder/state-variables-example-app.mp4" alt="Al hacer clic en el botón, el valor de la llamada cambia de verde correcto a rojo incorrecto" vídeo="true" width="360px">}}

Para crear una aplicación que utilice un botón para cambiar el estilo y el valor de un componente del valor de la llamada, sigue estas instrucciones.

### Crear las variables

1. En tu aplicación, haz clic en el icono Datos (**{&nbps;}**) para abrir la pestaña Datos.
1. Haz clic en el signo más (**+**) y selecciona **Variable**.
1. Nombra la variable `callout_value` y configura su **Valor inicial** en `Pass`.
1. Haz clic en el signo más (**+**) para crear otra variable.
1. Nombra esta variable `callout_color` y configura su **Valor inicial** en `green`.

### Crear los componentes

1. Añade un componente del valor de la llamada a tu aplicación. Dale los siguientes valores:
    * **Valor**: `${callout_value.value}`
    * **Estilo**: `${callout_color.value}`
1. Añade un componente de botón a tu aplicación y configura su etiqueta en `Change status`.
1. En **Eventos**, añade un evento. Dale los siguientes valores:
    * **Evento**: `click`
    * **Reacción: `custom`
    * **Devolución de llamada**:
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
1. Haz clic en **Vista previa** para obtener una vista previa de tu aplicación.<br>
   Al hacer clic en el botón **Cambiar estado** de tu aplicación, el color y el texto del elemento del valor de la llamada alternan entre verde Correcto y rojo Incorrecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][1].

[1]: https://datadoghq.slack.com/