---
aliases:
- /es/dynamic_instrumentation/expression-language
- /es/tracing/dynamic_instrumentation/expression-language
private: false
title: Lenguaje de expresiones para Live Debugger y Dynamic Instrumentation
---
## Descripción general {#overview}

[Live Debugger][1] y [Dynamic Instrumentation][2] utilizan este lenguaje de expresiones para leer valores del código en ejecución y definir condiciones, métricas y etiquetas de tramo. El lenguaje de expresiones admite el acceso a variables locales, parámetros de métodos y campos de objetos anidados, junto con operadores lógicos y de comparación. Toma prestada la sintaxis de lenguajes de programación comunes, pero tiene sus propias reglas.

Ejemplos:
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

La compatibilidad con expresiones depende de la versión del entorno de ejecución y de la ubicación de la instrumentación. Por lo general, el lenguaje de expresiones admite:
* Acceso a variables locales, parámetros de métodos y campos y atributos profundamente anidados dentro de objetos.
* Uso de operadores de comparación (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) para comparar variables, campos y constantes en sus condiciones, por ejemplo: `localVar1.field1.field2 != 15`.
* Uso de operadores lógicos (`&&`, `||` y `!` o `not(...)`) para crear condiciones booleanas complejas, por ejemplo: `!isEmpty(user.email) && not(contains(user.name, "abc"))`.
* Uso del literal `null` (que se traduce automáticamente a `None` en Python y `nil` en Ruby).

**No** admite:
* Llamada a métodos. Dynamic Instrumentation no permite ejecutar código que pueda tener efectos secundarios. Sin embargo, puede acceder a los campos `private` directamente.
* Operaciones aritméticas como `i + 1`.
* Otra sintaxis de lenguaje de programación nativo más allá de lo que se describe en esta página.

Pruebe [la función de autocompletado y la búsqueda (en Preview)](/dynamic_instrumentation/symdb/) para mejorar su experiencia de usuario al utilizar el lenguaje de expresiones.

## Aplicaciones {#applications}

Las expresiones se pueden usar para generar métricas y como condiciones para emitir datos filtrados.

Por ejemplo, puede crear un histograma a partir de la longitud de una cadena usando `len(data)` como la expresión de métrica. Las expresiones de métrica deben evaluarse como un número.

En los mensajes de registro de Live Debugger y en los valores de las etiquetas de tramo de Dynamic Instrumentation, encierre las expresiones entre llaves, por ejemplo: `User name is {user.name}`. Estas expresiones pueden evaluarse como cualquier valor.

Las condiciones de instrumentación deben evaluarse como un valor booleano, por ejemplo:
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`
 - `user.isActive == true`

## Variables contextuales {#contextual-variables}

Las variables contextuales disponibles dependen de la ubicación de la instrumentación. `@return` y `@duration` están disponibles al salir del método. `@it` se usa dentro de predicados de colección.

| Palabra clave     | Descripción                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Proporciona acceso al valor de retorno del método. |
| `@duration` | Proporciona acceso a la duración de la ejecución de la llamada al método, como un valor de punto flotante en milisegundos. |
| `@exception`| Proporciona acceso a la excepción lanzada dentro del método (solo disponible si existe una excepción no capturada). |
| `@it`       | Proporciona acceso al elemento actual durante la iteración de la colección. Se utiliza en predicados para operaciones de lista. |

## Operaciones generales {#general-operations}

Los siguientes ejemplos asumen una variable llamada `myString` con valor `Hello, world!`:

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `isDefined(var)` | Comprueba si una variable está definida. Devuelve `true` si la variable existe en el contexto actual, `false` de lo contrario. Útil para lógica condicional cuando una variable puede no estar presente. | {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | Obtiene la longitud de la cadena. | {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | Comprueba si la cadena está vacía. Equivalente a `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | Obtiene una subcadena. | {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | Comprueba si la cadena comienza con el literal de cadena dado. | {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | Comprueba si la cadena termina con el literal de cadena dado. | {{< expression-language-evaluator expression="endsWith(myString, \"rdl!\")" >}} |
| `contains(value_src, string_literal)` | Comprueba si la cadena contiene el literal de cadena, o si una colección contiene un elemento. | {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | Comprueba si la cadena coincide con la expresión regular proporcionada como un literal de cadena. | {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

## Operaciones de colección {#collection-operations}

Use `@it` en predicados sobre colecciones secuenciales. Consulte la sección [Variables contextuales](#contextual-variables) para obtener más detalles.

Los siguientes ejemplos asumen una variable llamada `mySequence` con valor `[1,2,3,4]` y `myMap` con valor `{"a": 1, "b": 2, "c": 3}`:

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `len(value_src)` | Obtiene el tamaño de la colección. | {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | Comprueba si la colección está vacía. Equivalente a `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | Para contenedores secuenciales, devuelve el elemento `i` en la colección (donde `i` debe ser un número entero). Para diccionarios, devuelve el valor que corresponde a `key` (donde `key` debe coincidir con el tipo de clave del diccionario). Si el elemento no existe, la expresión genera un error o devuelve nulo, dependiendo del lenguaje. | {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | Comprueba si hay al menos un elemento en la colección que satisfaga el predicado dado. Se accede al elemento actual mediante la referencia `@it` para contenedores secuenciales. | {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} |
| `all(value_src, {predicate})` | Comprueba si cada elemento de una colección satisface el predicado especificado. Se accede al elemento actual mediante la referencia `@it`. | {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} |
| `filter(value_src, {predicate})` | Filtra los elementos de la colección usando el predicado. Se accede al elemento actual mediante la referencia `@it`. | {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} |

## Pruebe sus propias condiciones {#try-your-own-conditions}

Este simulador interactivo le ayuda a experimentar con la sintaxis del lenguaje de expresiones en un entorno realista. Muestra cómo las condiciones determinan si se capturan datos al instrumentar un método.

La compatibilidad con expresiones y el comportamiento ante valores faltantes pueden diferir en su aplicación.

Seleccione uno de los ejemplos o ingrese una expresión en el campo "when" y haga clic en "SIMULATE" para ver si los datos se capturan según su condición.

Variables disponibles en este ejemplo:

- `loops`: El parámetro de ruta con el valor `5` definido directamente en el código
- `myString`: Una cadena `"Hello, world!"`
- `mySequence`: Un array de enteros `[1, 2, 3, 4]`
- `myMap`: Un diccionario `{"a": 1, "b": 2, "c": 3}`
- `i`: El índice de iteración del bucle actual

{{< expression-language-simulator >}}

[1]: /es/tracing/live_debugger/
[2]: /es/dynamic_instrumentation/