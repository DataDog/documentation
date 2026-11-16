---
code_lang: javascript
code_lang_weight: 10
description: Capacidades y límites de las Expresiones de JavaScript en App Builder
title: Expresiones de JavaScript
type: multi-code-lang
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation está en versión preliminar en su sitio de Datadog seleccionado ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

JavaScript (JS) está disponible en los flujos de trabajo mediante expresiones en línea o a través de las acciones dedicadas de JS {{< ui >}}Function{{< /ui >}} y {{< ui >}}Expression{{< /ui >}}.

## Expresiones de JavaScript en línea {#inline-javascript-expressions}

Puede utilizar expresiones de JS directamente en pasos del flujo de trabajo para realizar una amplia gama de transformaciones de datos sin necesidad de incluir pasos de JS dedicados.

Para utilizar una expresión en línea en su flujo de trabajo, encierre la expresión entre `${}`. Por ejemplo, para convertir un ID de cadena (`Trigger.stringId`) a un número entero, utilice `${ parseInt(Trigger.stringId) }`.

La biblioteca de utilidades [Lodash][1] está disponible en las expresiones en línea. El prefijo de guion bajo de Lodash (`_`) es opcional. Por ejemplo, tanto `${ _.toNumber("1") }` como `${ toNumber("1") }` son expresiones en línea válidas.

### Ejemplos {#examples}

#### Obtener una marca de tiempo {#retrieve-a-timestamp}

El siguiente ejemplo utiliza la función `now()` de Lodash dentro de un paso {{< ui >}}Get hosts total{{< /ui >}} para obtener el recuento de hosts en el último minuto.

La acción utiliza la siguiente expresión en línea en el campo {{< ui >}}From{{< /ui >}}:

```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/actions/workflows/expressions/javascript/timestamp.png" alt="Una expresión en línea que utiliza la función now() de Lodash" style="width:90%;" >}}

#### Incrementar un valor {#increment-a-value}

El siguiente ejemplo incrementa la capacidad deseada dentro de un paso {{< ui >}}Set desired capacity{{< /ui >}} en 1.

La acción utiliza la siguiente expresión en línea en el campo {{< ui >}}Desired capacity{{< /ui >}}:

```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/actions/workflows/expressions/javascript/increment.png" alt="Una expresión en línea que incrementa la capacidad deseada en uno" style="width:90%;" >}}

## Acciones de expresiones de JavaScript {#javascript-expression-actions}

Las acciones [Expresión](#expression-step) y [Función](#function-step) realizan transformaciones de datos personalizadas dentro de sus flujos de trabajo utilizando JavaScript. Utilice los valores de cualquier variable de contexto disponible dentro de su flujo de trabajo como entradas para sus expresiones y funciones de JavaScript con la sintaxis `$.Steps.<step_name>.<variable>`.

Los datos devueltos por estas acciones pueden ser referenciados posteriormente en pasos subsiguientes del flujo de trabajo.

Puede usar un guion bajo (`_`) para hacer uso de [Lodash][1] en sus pasos de expresión y función. Por ejemplo, para hacer referencia a la variable de estado de solicitud HTTP (`status`) del paso de solicitud HTTP (`Make_request`), usaría la siguiente variable de contexto:

```
$.Steps.Make_request.status
```

Y para determinar si una matriz devuelta por `Array_function` incluye el nombre `Bits`, aplique la función `_.includes` de Lodash con la siguiente sintaxis:

```
_.includes($.Steps.Array_function.data, "Bits")
```
### Paso de función {#function-step}

La acción de función permite asignaciones de variables y transformaciones de datos complejas que requieren múltiples expresiones.

Para agregar una acción de función:
- En un nuevo flujo de trabajo, haga clic en {{< ui >}}Add step{{< /ui >}} y busque `function`. Seleccione la acción {{< ui >}}Function{{< /ui >}} para agregarla a su flujo de trabajo.
- En un flujo de trabajo existente, haga clic en {{< ui >}}\+{{< /ui >}} y busque `function`. Seleccione la acción {{< ui >}}Function{{< /ui >}} para agregarla a su flujo de trabajo.

#### Escriba pasos de función con IA {#write-function-steps-with-ai}

Puede usar Bits AI para ayudarle a escribir el JavaScript para un paso de {{< ui >}}Function{{< /ui >}}. Para usar esta función, realice los siguientes pasos:

1. Agregue un paso de {{< ui >}}Function{{< /ui >}} a su flujo de trabajo.
1. En {{< ui >}}General{{< /ui >}}, en el campo {{< ui >}}Script{{< /ui >}}, haga clic en {{< ui >}}<i class="icon-bits-ai"></i> Write with Bits AI{{< /ui >}}.
1. En el campo {{< ui >}}Describe your transformation script{{< /ui >}}, ingrese una descripción de lo que desea que haga su script. Haga clic en la flecha hacia arriba ({{< ui >}}↑{{< /ui >}}) para enviar su descripción.
1. Elija una opción para {{< ui >}}Replace script{{< /ui >}}, {{< ui >}}Insert in script{{< /ui >}} o {{< ui >}}Copy to clipboard{{< /ui >}}.
1. Verifique el script y cámbielo según sea necesario para ajustarlo a sus necesidades.

### Paso de expresión {#expression-step}

En la mayoría de los casos, utilice una expresión en línea en lugar de un paso de expresión dedicado. Las acciones de expresión aceptan una sola línea de código. Por ejemplo, `[1, 2, 3].filter(x => x < 3)`. Las asignaciones de variables no están disponibles en las expresiones.

Para agregar una acción de expresión:
- En un nuevo flujo de trabajo, haga clic en {{< ui >}}Add step{{< /ui >}} y busque `expression`. Seleccione la acción {{< ui >}}Expression{{< /ui >}} para agregarla a su flujo de trabajo.
- En un flujo de trabajo existente, haga clic en {{< ui >}}\+{{< /ui >}} y busque `expression`. Seleccione la acción {{< ui >}}Expression{{< /ui >}} para agregarla a su flujo de trabajo.

En un paso de expresión, la ejecución utiliza _copias_ de todas las variables disponibles. La modificación de una variable dentro de un paso no tiene efecto en el valor de la variable fuera del paso. Para asignar el resultado de una expresión a una variable, consulte [Variables y parámetros][2].

## Probar expresiones y funciones {#test-expressions-and-functions}

Consulte la página de prueba y depuración para aprender a [probar un paso de un flujo de trabajo][3].

[1]: https://lodash.com/
[2]: /es/actions/workflows/variables/
[3]: /es/actions/workflows/test_and_debug/#test-a-step