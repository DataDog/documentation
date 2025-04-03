---
private: false
title: Lenguaje de expresión de la instrumentación dinámica
---

## Información general

El lenguaje de expresión de la instrumentación dinámica te ayuda a formular plantillas de mensajes para sondas de logs, expresiones para sondas de métricas, valores de etiquetas (tags) de tramos (span) y condiciones para sondas. Toma prestados elementos sintácticos de lenguajes de programación comunes, pero también tiene sus propias reglas exclusivas. El lenguaje permite acceder a variables locales, a parámetros de métodos y a campos anidados dentro de objetos, y admite el uso de operadores lógicos y de comparación.

Por ejemplo, puedes crear un histograma a partir del tamaño de una colección utilizando `count(myCollection)` como expresión de métrica. Las expresiones de métricas deben evaluarse a un número.

En las plantillas de logs y los valores de etiqueta, las expresiones se delimitan de las partes estáticas de la plantilla mediante corchetes, por ejemplo: `User name is {user.name}`. Las expresiones de las plantillas de logs pueden evaluarse a cualquier valor. Si la evaluación de la expresión falla, se sustituye por `UNDEFINED`.

Las condiciones de la sonda deben evaluarse con un valor booleano, por ejemplo: `startsWith(user.name, "abc")` `len(str) > 20` o `a == b`.

En general, el lenguaje de Expresión admite:
* Acceso a variables locales, parámetros de métodos y campos y atributos profundamente anidados en los objetos.
* Utiliza operadores de comparación (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) para comparar variables, campos y constantes en tus condiciones, por ejemplo: `localVar1.field1.field2 != 15`.
* Uso de operadores lógicos (`&&`, `||`, y `not` o `!`) para crear condiciones booleanas complejas.
* Uso del `null` literal (equivalente a `nil` en Python).

**No** admite:
* Llamadas a métodos. La instrumentación dinámica no permite ejecutar un código que pueda tener efectos secundarios. Sin embargo, puedes acceder directamente a los campos `private`.
* Otra sintaxis nativa del lenguaje de programación más allá de lo descrito en esta página.

Prueba [autocompletar y buscar (en Vista previa)][6] para mejorar la experiencia del usuario que utiliza el lenguaje de expresión.

En las siguientes secciones se resumen las variables y las operaciones que admite el lenguaje de expresión de la instrumentación dinámica.

## Variables contextuales

| Palabra clave     | Descripción                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Proporciona acceso al valor de retorno                                        |
| `@duration` | Proporciona acceso a la duración de la ejecución de la llamada                             |
| `@exception`| Proporciona acceso a la excepción no detectada actual                          |

**Nota**: Estas variables **sólo están disponibles** cuando se instrumenta un **método completo** y **no** para líneas individuales de código.

## Operaciones con cadenas

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `isEmpty(value_src)` | Comprueba la presencia de datos. En las cadenas, equivale a `len(str) == 0`. En las colecciones, equivale a `count(myCollection) == 0`. | `isEmpty("Hello")` -> `False` |
| `len(value_src)` | Obtiene la longitud de la cadena. | `len("Hello")` -> `5` |
| `substring(value_src, startIndex, endIndex)` | Obtiene una subcadena. | `substring("Hello", 0, 2)` -> `"He"` |
| `startsWith(value_src, string_literal)` | Comprueba si una cadena comienza con el literal de cadena dado. | `startsWith("Hello", "He")` -> `True` |
| `endsWith(value_src, string_literal)` | Comprueba si la cadena termina con el literal de cadena dado. | `endsWith("Hello", "lo")` -> `True` |
| `contains(value_src, string_literal)` | Comprueba si la cadena contiene el literal de cadena. | `contains("Hello", "ll")` -> `True` |
| `matches(value_src, string_literal)` | Comprueba si la cadena coincide con la expresión regular proporcionada como literal de cadena. | `matches("Hello", "^H.*o$")` -> `True` |

## Operaciones de recopilación

Cuando se trabaja con colecciones (listas, mapas, etc.), se dispone de una variable `@it` que proporciona acceso al valor actual de una colección durante la iteración.

Los siguientes ejemplos utilizan una variable denominada `myCollection` definida como `[1,2,3]`:

| Operación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `any(value_src, {predicate})` | Comprueba si hay al menos un elemento en la colección que satisface el predicado dado. Se accede al elemento actual con la referencia `@it`. | `any(myCollection, {@it > 2})` -> `True` |
| `all(value_src, {predicate})` | Comprueba si cada elemento de una colección satisface el predicado especificado. Se accede al elemento actual con la referencia `@it`. | `all(myCollection, {@it < 4})` -> `True` |
| `filter(value_src, {predicate})` | Filtra los elementos de la colección utilizando el predicado. Se accede al elemento actual con la referencia `@it`. | `filter(myCollection, {@it > 1})` -> `[2,3]` |
| `len(value_src)` | Obtiene el tamaño de la colección. | `len(myCollection)` -> `3` |
| `[ n ]` | En las colecciones, devuelve el enésimo elemento de la colección. Para mapas y diccionarios, devuelve el valor correspondiente a la clave `n`. Si el elemento no existe, la expresión produce un error. | `myCollection[1]` -> `2` |

[1]: /es/metrics/types/?tab=count#metric-types
[2]: /es/metrics/types/?tab=gauge#metric-types
[3]: /es/metrics/types/?tab=histogram#metric-types
[4]: /es/tracing/trace_collection/custom_instrumentation/java/#adding-spans
[5]: /es/tracing/trace_collection/custom_instrumentation/java/#adding-tags
[6]: /es/dynamic_instrumentation/symdb/