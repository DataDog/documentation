---
disable_toc: false
title: Transformación de datos
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Las acciones de **Expression** (Expresión) y de **Function** (Función) realizan transformaciones de datos personalizadas dentro de tus flujos de trabajo utilizando JavaScript. Utiliza los valores de cualquier variable de contexto disponible dentro de tu flujo de trabajo como entradas para tus expresiones y funciones JavaScript, con la sintaxis `$.Steps.<step_name>.<variable>`. También puedes utilizar `_` para hacer uso de [Lodash][1] en tus acciones de transformación de datos, con la misma sintaxis. Por ejemplo, para hacer referencia a la variable de estado (`status`) de la solicitud HTTP desde el paso de solicitud HTTP (`Make_request`), deberías utilizar la siguiente variable de contexto: 

```
$.Steps.Make_request.status
```

Y para determinar si una matriz devuelta por `Array_function` incluye el nombre `Bits`, aplica la función `_.includes` de Lodash con la siguiente sintaxis:

```
_.includes($.Steps.Array_function.data, "Bits")
```

Los datos devueltos por estas acciones se pueden consultar en los siguientes pasos del flujo de trabajo.

## Expresión

Utiliza acciones de expresión para transformaciones de datos que puedan realizarse en una sola línea de código y que no requieran asignaciones de variables, ni múltiples operaciones independientes. Por ejemplo:

`[1, 2, 3].filter(x => x < 3)`

Para añadir una acción de expresión:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.

En un paso de expresión, la ejecución utiliza _copias_ de todas las variables disponibles. La mutación de una variable dentro de un paso no tiene ningún efecto sobre el valor de la variable fuera del paso. Para asignar el resultado de una expresión a una variable, consulta [Definir variables][4].

## Función

La acción de función te permite realizar asignaciones de variables y transformaciones de datos que requieren varias expresiones.

Para añadir una acción de función:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `function`. Selecciona la acción de **Function** (Función), para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `function`. Selecciona la acción de **Function** (Función), para añadirla a tu flujo de trabajo.

### Escribir funciones con IA

Puedes utilizar Bits AI para ayudarte a escribir el JavaScript para una paso de **función**. Para utilizar esta característica, sigue los siguientes pasos:

1. Añade un paso de **función** a tu flujo de trabajo.
1. En **General**, en el campo **Script**, haz clic en **<i class="icon-bits-ai"></i> Write with Bits AI** (Escribir con Bits AI).
1. En el campo **Describir tu script de transformación**, introduce una descripción de lo que quieres que haga tu script. Haz clic en la flecha hacia arriba (**↑**) para enviar tu descripción.
1. Elige una opción para **Reemplazar script**, **Insertar en script** o **Copiar al portapapeles**.
1. Comprueba el script y cámbialo según sea necesario para adaptarlo a tus necesidades.

## Expresiones y funciones de test

Consulta la página de test y depuración para saber cómo [probar un paso del flujo de trabajo][3].

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][2].

[1]: https://lodash.com/
[2]: https://datadoghq.slack.com/
[3]: /es/service_management/workflows/test_and_debug/#test-a-step
[4]: /es/service_management/workflows/actions/set_variables