---
aliases:
- /es/service_management/workflows/actions/data_transformation/
- /es/service_management/workflows/expressions
disable_toc: false
further_reading:
- link: /service_management/workflows/variables/
  tag: Documentación
  text: Variables y parámetros
title: Expresiones de JavaScript
---

JavaScript está disponible en Workflows mediante expresiones en línea o a través de las acciones de **Función** y **Expresión** específicas de JS.

## Expresiones JavaScript en línea

Puedes utilizar expresiones JavaScript (JS) directamente en los pasos del flujo de trabajo para realizar una amplia gama de transformaciones de datos sin necesidad de incluir pasos específicos de JS.

Para utilizar una expresión en línea en tu flujo de trabajo, encierra la expresión en `${}`. Por ejemplo, para convertir un ID de cadena (`Trigger.stringId`) en un número entero, utiliza `${ parseInt(Trigger.stringId) }`.

La librería de utilidades [Lodash][1] está disponible en expresiones en línea. El prefijo de guión bajo de Lodash (`_`) es opcional. Por ejemplo, tanto `${ _.toNumber("1") }` como `${ toNumber("1") }` son expresiones en línea válidas.

### Ejemplos

#### Recuperar una marca de tiempo

El siguiente ejemplo utiliza la función `now()` de Lodash dentro de un paso **Obtener total de hosts** para obtener el recuento de hosts durante el último minuto.

La acción utiliza la siguiente expresión en línea en el campo **Desde**:
```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/service_management/workflows/timestamp.png" alt="Expresión en línea que utiliza la función now() de Lodash" style="width:90%;" >}}

#### Incrementar un valor

El siguiente ejemplo incrementa en 1 la capacidad deseada dentro de un paso **Definir la capacidad deseada**.

La acción utiliza la siguiente expresión en línea en el campo **Capacidad deseada**:
```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/service_management/workflows/increment.png" alt="Expresión en línea que incrementa la capacidad deseada en 1" style="width:90%;" >}}

## Acciones de expresiones JavaScript

Las acciones de [Expresión](#expression-step) y [Función](#function-step) realizan transformaciones de datos personalizadas dentro de tus flujos de trabajo utilizando JavaScript. Utiliza los valores de cualquier variable de contexto disponible dentro de tu flujo de trabajo como entradas para tus expresiones y funciones JavaScript con la sintaxis `$.Steps.<step_name>.<variable>`.

Los datos devueltos por estas acciones se pueden consultar en los siguientes pasos del flujo de trabajo.

Puedes utilizar un guión bajo (`_`) para utilizar [Lodash][1] en tus pasos de expresión y función. Por ejemplo, para hacer referencia a la variable de estado de la solicitud HTTP (`status`) desde el paso de la solicitud HTTP (`Make_request`), utilizarías la siguiente variable de contexto:

```
$.Steps.Make_request.status
```

Y para determinar si una matriz devuelta por `Array_function` incluye el nombre `Bits`, aplica la función `_.includes` de Lodash con la siguiente sintaxis:

```
_.includes($.Steps.Array_function.data, "Bits")
```

### Paso de función

La acción de función permite realizar asignaciones de variables y transformaciones de datos complejas que requieren varias expresiones.

Para añadir una acción de función:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `function`. Selecciona la acción de **Función**, para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `function`. Selecciona la acción de **Función**, para añadirla a tu flujo de trabajo.

#### Escribir pasos de función con IA

Puedes utilizar Bits AI para ayudarte a escribir JavaScript para un paso de **Función**. Para utilizar esta característica, sigue los siguientes pasos:

1. Añade un paso de **Función** a tu flujo de trabajo.
1. En **General**, en el campo **Script**, haz clic en **<i class="icon-bits-ai"></i> Write with Bits AI** (Escribir con Bits AI).
1. En el campo **Describir tu script de transformación**, introduce una descripción de lo que quieres que haga tu script. Haz clic en la flecha hacia arriba (**↑**) para enviar tu descripción.
1. Elige una opción para **Reemplazar script**, **Insertar en script** o **Copiar al portapapeles**.
1. Comprueba el script y cámbialo según sea necesario para adaptarlo a tus necesidades.

### Paso de expresión

En la mayoría de los casos, utiliza una expresión en línea en lugar de un paso de expresión dedicado. Las acciones de expresión aceptan una única línea de código. Por ejemplo, `[1, 2, 3].filter(x => x < 3)`. Las asignaciones de variables no están disponibles en las expresiones.

Para añadir una acción de expresión:
- En un nuevo flujo de trabajo, haz clic en **Add step** (Añadir paso) y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.
- En un flujo de trabajo existente, haz clic en **+** y busca `expression`. Selecciona la acción de **Expression** (Expresión) para añadirla a tu flujo de trabajo.

En un paso de expresión, la ejecución utiliza _copias_ de todas las variables disponibles. La mutación de una variable dentro de un paso no tiene ningún efecto sobre el valor de la variable fuera del paso. Para asignar el resultado de una expresión a una variable, consulta [Definir variables][4].

## Expresiones y funciones de test

Consulta la página de test y depuración para saber cómo [probar un paso del flujo de trabajo][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][2].

[1]: https://lodash.com/
[2]: https://datadoghq.slack.com/
[3]: /es/service_management/workflows/test_and_debug/#test-a-step
[4]: /es/service_management/workflows/actions/set_variables
