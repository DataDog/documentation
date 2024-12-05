---
disable_toc: false
title: Transformación de datos
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización del flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Las acciones de **Expression** (Expresión) y de **Function** (Función) realizan transformaciones de datos personalizadas dentro de tus flujos de trabajo utilizando JavaScript. Utiliza los valores de cualquier variable de contexto disponible dentro de tu flujo de trabajo como entradas para tus expresiones y funciones JavaScript con la sintaxis `$.Steps.<step_name>.<variable>`. También puedes utilizar `_` para hacer uso de [Lodash][1] en tus acciones de transformación de datos con la misma sintaxis. Por ejemplo, para hacer referencia a la variable de estado (`status`) de la solicitud HTTP desde el paso de solicitud HTTP (`Make_request`), deberías utilizar la siguiente variable de contexto: 

```
$.Steps.Make_request.status
```

Y para determinar si una matriz devuelta por `Array_function` incluye el nombre `Bits`, aplica la función `_.includes` de Lodash con la siguiente sintaxis:

```
_.includes($.Steps.Array_function.data, "Bits")
```

Los datos devueltos por estas acciones se pueden consultar en los siguientes pasos del flujo de trabajo.

## Expresión

Utiliza acciones de expresión para transformaciones de datos que puedan realizarse en una sola línea de código y que no requieran asignaciones de variables ni múltiples operaciones independientes. Por ejemplo:

`[1, 2, 3].filter(x => x < 3)`

Para añadir una acción de expresión:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.

## Función

La acción de función permite realizar asignaciones de variables y transformaciones de datos que requieren varias expresiones.

Para añadir una acción de función:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `function`. Selecciona la acción de **Function** (Función) para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `function`. Selecciona la acción de **Function** (Función) para añadirla a tu flujo de trabajo.

## Pruebas de expresiones y funciones

Para probar una una acción de expresión o de función, haz clic en **Test** (Prueba), en la sección **Inputs** (Entradas). Si la acción utiliza una variable de salida de un paso anterior, comenta la variable en tu código y sustitúyela por datos de la prueba. Por ejemplo, considera la siguiente acción que asigna variables al nombre del flujo de trabajo y a la salida `Steps.List_monitors` de un paso anterior:

```js
let name = $.WorkflowName;
let object = $.Steps.List_monitors;

...
```

Para probar la acción, comenta las asignaciones de variables existentes y sustitúyelas por datos de prueba codificados:

```js
\\ let name = $.WorkflowName;
let name = 'Test workflow'
\\ let object = $.Steps.List_monitors;
let object = {0:{
  'name': 'Test monitor'
}}
...
```

[1]: https://lodash.com/