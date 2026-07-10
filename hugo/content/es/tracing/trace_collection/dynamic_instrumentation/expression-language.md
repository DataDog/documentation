---
aliases:
- /es/dynamic_instrumentation/expression-language
- /es/tracing/dynamic_instrumentation/expression-language
private: false
title: Lenguaje de expresión de Dynamic Instrumentation
---

## Información general

El Lenguaje de expresión de la instrumentación dinámica te ayuda a formular plantillas de mensajes para sondas de logs, expresiones para sondas de métricas, valores de etiquetas (tags) de tramos (span) y condiciones para sondas. Toma prestados elementos sintácticos de lenguajes de programación comunes, pero también tiene sus propias reglas exclusivas. El lenguaje permite acceder a variables locales, a parámetros de métodos y a campos anidados dentro de objetos, y admite el uso de operadores lógicos y de comparación.

Ejemplos:
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

{{< img src="tracing/dynamic_instrumentation/expressions.png" alt="Ejemplo de sonda de logs con expresiones" style="width:100%;" >}}

En general, el Lenguaje de expresión admite:
* Acceso a variables locales, parámetros de métodos y campos y atributos profundamente anidados en los objetos.
* Utiliza operadores de comparación (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) para comparar variables, campos y constantes en tus condiciones, por ejemplo: `localVar1.field1.field2 != 15`.
* Uso de operadores lógicos (`&&`, `||`, y `!` o `not(...)`) para crear condiciones booleanas complejas, por ejemplo: `!isEmpty(user.email) && not(contains(user.name, "abc"))`.
* Uso del literal `null` (que se traduce automáticamente a `None` en Python y `nil` en Ruby).

**No** admite:
* Llamadas a métodos. La instrumentación dinámica no permite ejecutar un código que pueda tener efectos secundarios. Sin embargo, puedes acceder directamente a los campos `private`.
* Otra sintaxis nativa del lenguaje de programación más allá de lo descrito en esta página.

Prueba [autocompletar y buscar (en Vista previa)][6] para mejorar la experiencia del usuario que utiliza el Lenguaje de expresión.

## Aplicaciones

Las expresiones pueden utilizarse para producir métricas o logs, y como condiciones para emitir datos filtrados.

Por ejemplo, puedes crear un histograma a partir de la longitud de una cadena utilizando `len(data)` como expresión métrica. Las expresiones métricas deben evaluarse a un número.

Los logs pueden emitirse utilizando plantillas. En las plantillas de logs y en los valores de etiquetas, las expresiones se delimitan de las partes estáticas de la plantilla mediante corchetes, por ejemplo: `User name is {user.name}`. Las expresiones de la plantilla de logs pueden evaluarse a cualquier valor.

Las condiciones de la sonda deben evaluarse a un valor booleano, por ejemplo:
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`

## Variables contextuales

El Lenguaje de expresión proporciona variables contextuales para diferentes escenarios de instrumentación: las variables de instrumentación de métodos (`@return`, `@duration`, `@exception`) solo están disponibles cuando se instrumentan métodos completos, mientras que las variables de colecciones y diccionarios (`@it`, `@key`, `@value`) solo están disponibles dentro de expresiones de predicado para filtrar y transformar colecciones.

| Palabra clave     | Descripción                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Proporciona acceso al valor de retorno del método. |
| `@duration` | Proporciona acceso a la duración de la ejecución de la llamada al método, como un valor de punto flotante en milisegundos. |
| `@exception`| Proporciona acceso a la excepción lanzada dentro del método (solo disponible si existe una excepción no capturada). |
| `@it`       | Proporciona acceso al elemento actual durante la iteración de la colección. Se utiliza en predicados para operaciones de lista. |
| `@key`      | Proporciona acceso a la clave actual durante la iteración del diccionario. Se utiliza en predicados para operaciones de diccionario. |
| `@value`    | Proporciona acceso al valor actual durante la iteración del diccionario. Se utiliza en predicados para operaciones de diccionario. |

## Operaciones generales

Los siguientes ejemplos suponen una variable llamada `myString` con un valor `Hello, world!`:

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `isDefined(var)` | Comprueba si una variable está definida. Devuelve `true` si la variable existe en el contexto actual o `false` en caso contrario. Útil para la lógica condicional en el caso de que una variable pueda no estar presente. | {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | Obtiene la longitud de la cadena. | {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | Comprueba si la cadena está vacía. Equivale a `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | Obtiene una subcadena. | {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | Comprueba si una cadena comienza con el literal de cadena dado. | {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | Comprueba si la cadena termina con el literal de cadena dado. | {{< expression-language-evaluator expression="endsWith(myString, \"rdl!\")" >}} |
| `contains(value_src, string_literal)` | Comprueba si la cadena contiene la cadena literal o si una colección contiene un elemento. | {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | Comprueba si la cadena coincide con la expresión regular proporcionada como literal de cadena. | {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

## Operaciones de recopilación

Al trabajar con colecciones (listas, mapas, etc.), puedes utilizar variables contextuales en predicados para acceder a los elementos durante la iteración. Para más información, consulta la sección [Variables contextuales](#contextual-variables).

Los siguientes ejemplos suponen una variable llamada `mySequence`, con un valor `[1,2,3,4]`, y `myMap`, con un valor `{"a": 1, "b": 2, "c": 3}`:

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `len(value_src)` | Obtiene el tamaño de la colección. | {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | Comprueba si la colección está vacía. Equivalente a `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | Para los contenedores secuenciales, devuelve el `i`-ésimo elemento de la colección (donde `i` debe ser un número entero). Para diccionarios, devuelve el valor que corresponde a `key` (donde `key` debe coincidir con el tipo de clave del diccionario). Si el elemento no existe, la expresión produce un error o devuelve null, dependiendo del idioma. | {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | Comprueba si hay al menos un elemento en la colección que satisfaga el predicado dado. Se accede al elemento actual con la referencia `@it`, para contenedores secuenciales, y con `@key`, `@value` para diccionarios. | {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} {{< expression-language-evaluator expression="any(myMap, {@value > 2})" >}} |
| `all(value_src, {predicate})` | Comprueba si cada elemento de una colección satisface el predicado especificado. Se accede al elemento actual con la referencia `@it`. | {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} {{< expression-language-evaluator expression="all(myMap, {@key == \"b\"})" >}} |
| `filter(value_src, {predicate})` | Filtra los elementos de la colección utilizando el predicado. Se accede al elemento actual con la referencia `@it`. | {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} {{< expression-language-evaluator expression="filter(myMap, {@value > 1})" >}} |

## Probar tus propias condiciones

Este simulador interactivo te ayuda a experimentar con la sintaxis del Lenguaje de expresión en un entorno realista. Muestra cómo las condiciones determinan si se generará una línea de logs al instrumentar un método.

Selecciona uno de los ejemplos o introduce una expresión en el campo "cuando" y haz clic en "SIMULATE" (Simular) para ver si se generaría el log en función de su condición.

Variables disponibles en este ejemplo:

- `loops`: El parámetro de ruta codificado como `5`
- `myString`: Una cadena `"Hello, world!"`
- `mySequence`: Una matriz de enteros `[1, 2, 3]`
- `myMap`: Un diccionario `{"a": 1, "b": 2, "c": 3}`
- `i`: El índice de iteración del bucle actual

{{< expression-language-simulator >}}