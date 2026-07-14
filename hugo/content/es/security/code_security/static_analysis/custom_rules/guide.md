---
description: Una guía completa para escribir reglas personalizadas para Datadog.
title: Guía de reglas personalizadas para el análisis de código estático
---

Esta guía se basa en el [tutorial de reglas personalizadas para el análisis de código estático][1], proporcionando una descripción completa de cómo escribir reglas personalizadas, junto con consejos, trucos y errores comunes a evitar.

## Información general

Una regla de analizador estático consta de tres partes: una consulta Tree-sitter para encontrar construcciones de código relevantes, una función JavaScript para analizar el código y generar conclusiones, y tests que comprueban si la regla funciona correctamente.

Cuando ejecutas un análisis estático, el analizador toma cada archivo de tu repositorio de código, comprueba su extensión de nombre de archivo para determinar su lenguaje, analiza el archivo con Tree-sitter y, a continuación, ejecuta las reglas de ese lenguaje.

Para ejecutar una regla, el analizador consulta el árbol de análisis generado utilizando la [consulta Tree-sitter][3] proporcionada por la regla. De este modo se obtienen cero o más nodos del Tree-sitter. A continuación, para cada nodo, el analizador ejecuta la función `visit()` del código JavaScript de la regla. Esta función puede llamar a `addError()` para generar conclusiones para esa regla.

## Consulta Tree-sitter

Una consulta contiene uno o más patrones, donde cada uno de ellos es una expresión que declara la forma de los nodos con los que coincide. El motor de consulta recorre el árbol de análisis en busca de nodos que coincidan con el patrón y devuelve cada ocurrencia.

### Patrones de nodos

El patrón básico consiste en un tipo de nodo entre paréntesis. Este patrón coincide con todos los nodos que pertenecen a ese tipo.

El siguiente ejemplo muestra una consulta que busca nodos de tipo `func-decl`:

```scheme
(func-decl)
```

Puedes añadir patrones después del tipo de nodo y antes del paréntesis de cierre. El patrón resultante coincidirá con los nodos cuyos nodos secundarios coincidan con esos patrones.

```scheme
(func-decl (arg-list) (body))
```

Este ejemplo coincide con nodos de tipo `func-decl` que contienen un nodo de tipo `arg-list`, seguido de un nodo de tipo `body`, posiblemente con otros nodos intermedios. En el siguiente árbol de análisis, esta consulta coincidiría con los subárboles marcados en azul, pero no con el subárbol marcado en naranja.

{{< img src="/security/code_security/custom_rule_guide_parse_trees.png" alt="Ejemplo de árbol de análisis con dos ejemplos resaltados." style="height:20em;" >}}

Puedes anidar patrones secundarios tan profundamente como necesites.

```scheme
(func-decl
  (arg-list
    (argument)
  )
  (body
    (statement
      (function-call)
    )
  )
)
```

Como puedes ver, puedes añadir espacios en blanco y saltos de línea a tu consulta Tree-sitter. Puedes adaptarlos para que tu consulta sea más legible. También puedes añadir comentarios, que empiezan con punto y coma, y van hasta el final de la línea.

```scheme
; Another way to format the previous example
(func-decl
  (arg-list (argument)) ; The arg-list contains at least one argument
  (body
    (statement (function-call)) ; The body contains a function call
  )
)
```

Puedes utilizar puntos (`.`) para especificar que dos nodos hermanos deben aparecer juntos; de lo contrario, coincidirán aunque haya otros nodos entre ellos. También puedes utilizar puntos para especificar que un nodo debe ser el primer o el último nodo secundario.

```scheme
(func-decl (arg-list) . (body))
; The `func-decl` contains an `arg-list` followed immediately by a `body`.

(func-decl . (body))
; The first child of the `func-decl` is a `body`.

(func-decl (return-type) . )
; The last child of the `func-decl` is a `return-type`.
```

Algunos nodos tienen campos, que puedes hacer coincidir especificando el nombre del campo, dos puntos y, a continuación, un patrón para el contenido del campo.

```scheme
(unary-operator
  operand: (identifier))
; Matches `unary-operator` nodes with a field `operand`
; that contains an `identifier`
```

También puedes buscar nodos que carezcan de un campo especificando un signo de exclamación (`!`) seguido del nombre del campo.

```scheme
(if-statement
  !else)
; Matches an `if-statement` that doesn't have an `else` field.
```

Hasta ahora hemos visto "nodos con nombre", que son nodos que tienen un tipo. Tree-sitter también añade "nodos anónimos" a los árboles de análisis. Estos nodos no tienen un tipo y a menudo contienen elementos sintácticos; por ejemplo, los operadores "`+`" o "`/`", paréntesis, dos puntos, etc.

Puedes hacer coincidir nodos anónimos especificando su texto entre comillas dobles.

```scheme
(binary-operation
  (identifier)
  "+"
  (binary-operation)
)
; Matches a `binary-operation` that contains an `identifier`,
; a "+" token, and another `binary-operation`.
```

### Comodines

Puedes utilizar un guión bajo (`_`) como comodín. Un guión bajo por sí solo coincide con cualquier nodo, ya sea con nombre o anónimo. Un guión bajo como nombre de un nodo coincide con cualquier nodo con nombre, pero no con nodos anónimos.

```scheme
(binary-operation . (_) "+" (identifier) . )
; Matches a `binary-operation` node where the first child node
; is a named node of any type.

(binary-operation . (identifier) _ (identifier) . )
; Matches a `binary-operation` node where the middle child node
; can be any node, anonymous or not.

(_ . (identifier) "+" (identifier) . )
; Matches a named node of any type that contains an `identifier`,
; a "+" anonymous node, and another `identifier`.
```

### Alternativas

Si especificas más de un patrón en el nivel superior de tu consulta Tree-sitter, la consulta encontrará nodos que coincidan con cualquiera de los patrones.

```scheme
(program)
(module)
; Matches nodes of type `program` or `module`
```

Si quieres especificar coincidencias alternativas para nodos secundarios, escribe tus alternativas entre corchetes (`[]`). Ten en cuenta que las alternativas se enumeran una tras otra, sin comas entre ellas.

```scheme
(func-decl
  [
    (func-prototype)
    (func-definition)
  ]
)
; Matches nodes of type `func-decl` that contain a child
; of type `func-prototype` or `func-definition`.
```

Si un nodo contiene nodos secundarios que podrían cumplir varias alternativas, el motor de consulta devolverá un resultado por cada alternativa coincidente. Si tienes varias alternativas en una sola consulta, puede producirse una explosión combinatoria, ya que el motor de consulta devuelve coincidencias por cada combinación de alternativas. Como resultado, el análisis estático tardará más tiempo en ejecutarse y la regla puede agotarse.

### Capturas

Puedes "capturar" nodos coincidentes para que estén disponibles en el código JavaScript de la regla o para utilizarlos en predicados (descritos más adelante). Para capturar un nodo, añade un signo arroba (`@`) seguido de un nombre de captura después del patrón que quieres capturar.

```scheme
(binary-operation
  (identifier) @id
  "+" @op
  _ @operand
) @operation
; Matches `binary-operation` nodes (captured under the name `operation`)
; that contain an `identifier` (captured as `id`), an anonymous node
; containing "+" (captured as `op`), and any other child node
; (captured as `operand`.)
```

### Coincidencias opcionales y repetidas

Puedes indicar que un nodo puede aparecer opcionalmente, especificando el modificador de interrogación (`?`) después de su patrón.

```scheme
(exit-statement
  (integer)?
)
; Matches an `exit-statement` node containing an optional `integer` node.
```

Puedes capturar un nodo opcional. La captura estará vacía si el nodo no está presente.

```scheme
(exit-statement
  (integer)? @retCode
)
; If the `integer` exists, `retCode` will contain the node;
; otherwise it will be empty.
```

Puedes indicar que un nodo puede aparecer cero o más veces, especificando el modificador asterisco (`*`) después de su patrón.

```scheme
(list
  _* @items
)
; Matches a `list` node with zero or more children, capturing them as `items`.
```

Como puedes ver, estos modificadores son muy útiles con las capturas. Si no te interesara capturar los nodos secundarios, podrías simplemente reescribir la consulta anterior como "`(list)`".

Puedes indicar que un nodo debe aparecer una o más veces, especificando el modificador de signo más (`+`) después de su patrón.

```scheme
(array-index
  (integer)+ @indices
)
; Matches an `array-index` node that contains one or more `integer` nodes,
; capturing them as `indices`.
```

También puedes aplicar estos modificadores a grupos de patrones. Para ello, encierra el grupo entre paréntesis y, a continuación, aplica el modificador después del paréntesis de cierre.

```scheme
(array-dimensions
  (integer)
  ("," integer)*
)
; Matches an `array-dimensions` node that contains an `integer` node
; followed by zero or more `integer` nodes preceded by commas.
```

Las diferencias entre los tres modificadores pueden ser sutiles, así que revisémoslos nuevamente desde otro punto de vista.

* La diferencia entre "`?`" y "`*`" es que, cuando hay nodos repetidos que coinciden con un patrón, "`*`" producirá un único resultado que contiene todas las repeticiones, pero "`?`" producirá un resultado por cada repetición.

Por ejemplo, si el árbol de análisis tuviera un nodo `list` con cinco nodos secundarios, un patrón "`(list _?)`" produciría cinco resultados diferentes, uno para cada nodo secundario, mientras que un patrón "`(list _*)`" produciría un único resultado para toda la lista de nodos secundarios.

* La diferencia entre "`*`" y "`+`" es que, cuando no hay nodos coincidentes, el patrón "`*`" devuelve un resultado, mientras que el patrón "`+`" no devuelve ningún resultado.

Por ejemplo, si el árbol de análisis tuviera un nodo `list` sin nodos secundarios, un patrón "`(list _*)`" produciría un resultado, mientras que un patrón "`(list _+)`" produciría cero resultados.

### Predicados

Puedes especificar condiciones adicionales que deben cumplir los nodos para coincidir. Estas condiciones se expresan en forma de predicados que se añaden dentro de los paréntesis de un patrón.

```scheme
(binary-operator
  (identifier) @id
  (#match? @id "[a-z]+([A-Z][a-z]*)*")
)
; Matches a `binary-operator` node that contains an `identifier` node
; whose content matches the provided regular expression.
```

Los predicados tienen la forma `(#pred? arg1 arg2)`, donde `#pred?` es el nombre de un predicado, `arg1` es una captura y `arg2` puede ser otra captura o una cadena.

```scheme
(assign-statement
  left: _ @target
  right: _ @source
  (#eq? @target @source)
)
; Matches `assign-statement` nodes whose `left` and `right` fields are equal.
```

Algunos predicados comunes son:

* `#eq?`, `#not-eq?`: la captura es igual/no es igual al segundo argumento.
* `#match?`, `#not-match?`: la captura coincide/no coincide con la expresión regular proporcionada como segundo argumento.

Si tu captura contiene varios nodos (por ejemplo, si utilizaste los modificadores `*` o `?` ), puedes utilizar los siguientes predicados:

* `#any-eq?`, `#any-not-eq?`: cualquiera de los nodos capturados es igual/no es igual al segundo argumento.
* `#any-match?`, `#any-not-match?`: cualquiera de los nodos capturados coincide/no coincide con la expresión regular proporcionada como segundo argumento.

```scheme
(array-index
  (identifier)* @ids
  (#any-eq? @ids "exit")
)
; Matches `array-index` nodes with an `identifier` child node
; that contains "exit".
```

Si necesitas comprobar si un argumento es igual a uno de varios valores, también existe un predicado para ello:

* `#any-of?`, `#not-any-of?`: la captura es igual/no es igual a cualquiera del segundo, tercero, cuarto, etc., argumento.

```scheme
(function-call
  name: _ @fn
  (#any-of? @fn "system" "exit" "quit")
)
; Matches `function-call` nodes whose name field is equal
; to "system", "exit", or "quit".
```

## Código JavaScript

El código JavaScript de tu regla tendrá normalmente este aspecto:

```javascript
function visit(query, filename, code) {
  const { cap1, cap2, cap3 } = query.captures;
  const { cap4, cap5, cap6 } = query.capturesList;
  /* check the captured nodes */
  const err = /* generate a message for a finding */;
  addError(err);
}
```

### Función `visit()` 

Tras ejecutar la consulta, el analizador estático ejecuta la función `visit()` para cada coincidencia. Esta función recibe tres argumentos:

* `query`: información sobre la coincidencia actual.
* `filename`: nombre del archivo analizado.
* `code`: contenido del archivo analizado.

Los argumentos `filename` y `code` son cadenas. Sin embargo, el argumento `query` es un objeto que contiene las siguientes propiedades:

* `captures`: un objeto que contiene los nodos capturados por la consulta, codificados por el nombre de la captura. Si una captura contiene más de un nodo, aquí solo aparece el primero.
* `capturesList`: similar a `captures`, pero contiene listas de todos los nodos capturados con un nombre. Es adecuado para la captura de nodos repetidos mediante los modificadores `+` y `*`.

Por ejemplo, con una consulta como esta:

```scheme
(var-assignment
  left: (identifier)+ @ids
  right: _ @expr
) @assignment
```

El argumento `query` contendría algo similar a lo siguiente:

```javascript
query = {
  captures: {
    ids: /* the first `identifier` node in field `left` */,
    expr: /* the node in field `right` */
  },
  capturesList: {
    ids: [
      /* first `identifier` node from `left` */,
      /* second `identifier` node from `left` */,
      /* etc */
    ],
    expr: [
      /* the node in field `right` */
    ]
  }
}
```

### Trabajar con capturas

Los nombres de las capturas se utilizan como claves en los objetos `query.captures` y `query.capturesList`. Si asignas a esas capturas nombres compatibles con nombres de variables JavaScript, podrás encontrarlas fácilmente:

```javascript
const { id, expr, node } = query.captures;
```

El código anterior extrae las propiedades `id`, `expr` y `node` de `query.captures` y las asigna a constantes con los mismos nombres.

Si los nombres de las capturas no son compatibles con nombres de variables JavaScript, aún podrás extraerlas, pero de forma un poco menos conveniente.

```javascript
const id = query.captures["id-node"];
const expr = query.captures["20394];
```

Un nodo capturado está representado mediante un objeto que contiene las siguientes propiedades:

* `cstType`: el tipo de nodo.
* `start`: un objeto que contiene la posición inicial del nodo en el código fuente.
* `end`: un objeto que contiene la posición del carácter que sigue al final del nodo.
* `text`: el contenido del nodo.

Las propiedades `start` y `end` son objetos que contienen propiedades `line` y `col`. Estas propiedades están basadas en 1: la primera línea de un archivo y la primera columna de una línea tienen el número 1. La posición en la propiedad `start` es inclusiva: apunta al primer carácter del nodo. La posición en la propiedad `end` es exclusiva: apunta al primer carácter después del nodo.

Puedes utilizar las propiedades `start` y `end` para comprobar la longitud de un nodo o las posiciones relativas de dos nodos. Por ejemplo, si las propiedades `start` y `end` de un nodo tienen los mismos valores, el nodo está vacío. Si la propiedad `end` de un nodo tiene los mismos valores que la propiedad `start` de otro nodo, los nodos se suceden inmediatamente.

(Nota sobre el código antiguo: puede que veas algunas reglas que utilizan la propiedad `astType` en lugar de `cstType`. Esas reglas son antiguas, y deberías utilizar `cstType`. También es posible que veas algunas reglas que utilizan `getCodeForNode(node, code)` o `getCodeForNode(node)` en lugar de `node.text`. Deberías utilizar `node.text`).

### Navegación por el árbol de análisis

Puedes utilizar las funciones `ddsa.getParent(node)` y `ddsa.getChildren(node)` para obtener los nodos primario y secundarios de un nodo, respectivamente.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  const parent = ddsa.getParent(funcDecl);
  // Do something with the `funcDecl` node's parent
  const children = ddsa.getChildren(funcDecl);
  for (let child of children) {
    // Do something with the `funcDecl` node's children
  }
}
```

Puedes seguir llamando a `ddsa.getParent(node)` y `ddsa.getChildren(node)` en los nodos devueltos por estas funciones para navegar por el árbol de análisis. Si se llama a `ddsa.getParent()` en el nodo raíz, se obtiene `undefined`, mientras que si se llama a `ddsa.getChildren()` en un árbol de hojas, se obtiene una lista vacía.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  let root = getRoot(funcDecl);
  // Now `root` contains the parse tree's root
  displayLeaves(root);
}

function getRoot(node) {
  let parent = ddsa.getParent(node);
  while (parent) {
    node = parent;
    parent = ddsa.getParent(node);
  }
  return node;
}

function displayLeaves(node) {
  let children = ddsa.getChildren(root);
  if (children.length == 0) console.log(node);
  for (let child of children) {
    displayLeaves(child);
  }
}
```

Si se llama a `ddsa.getChildren(node)` en un nodo con campos, los nodos contenidos en esos campos serán devueltos entre los secundarios y contendrán una propiedad adicional `fieldName`.

```javascript
// Get the content of the `then` and `else` fields of an `if_statement` node.
let children = ddsa.getChildren(ifStatementNode);
let thenField = children.find(n => n.fieldName === 'then');
let elseField = children.find(n => n.fieldName === 'else');
```

Puedes comparar dos objetos de nodo con `==` para saber si apuntan al mismo nodo.

```javascript
function visit(query, filename, code) {
  const { funcDecl } = query.captures;
  displaySiblings(funcDecl);
}

// Prints out all siblings of this node, not counting itself
function displaySiblings(node) {
  let parent = ddsa.getParent(node);
  if (!parent) return;
  let allSiblings = ddsa.getChildren(parent);
  for (let sibling of allSiblings) {
    if (sibling != node) console.log(sibling);
  }
}
```

### Comunicación de resultados y sugerencias

Utiliza la función `addError()` para informar de un hallazgo al usuario. Esta función toma un objeto `Violation` que puedes crear con la función `buildError()`. Esta función toma cinco argumentos: `startLine`, `startCol`, `endLine`, `endCol` y `message`. Generalmente, se utilizan las propiedades `start` y `end` de un nodo para obtener los valores de los cuatro primeros argumentos.

```javascript
function visit(query, filename, code) {
  const { funcCall } = query.captures;
  addError(
    buildError(
      funcCall.start.line, funcCall.start.col,
      funcCall.end.line, funcCall.end.col,
      "Function calls are not allowed"
    )
  );
}
```

Sin embargo, puedes utilizar las posiciones `start` y `end` de varios nodos, o incluso calcular las tuyas propias, si es necesario.

El `message` que proporciones se mostrará al usuario.

También puedes adjuntar propuestas de corrección al mensaje de error. Para ello, llama al método `addFix()` del objeto `Violation`. Este método toma un objeto `Fix` que puedes crear con la función `buildFix()`. Esta función toma dos argumentos: una `description` y `edits`, una matriz de ediciones propuestas.

Puede crear las ediciones propuestas con las funciones `buildEditAdd()`, `buildEditRemove()` y `buildEditUpdate()`.

* `buildEditAdd()` genera una sugerencia para insertar texto. Toma tres argumentos: `startLine`, `startCol` y `newContent`.
* `buildEditRemove()` genera una sugerencia para borrar texto. Toma cuatro argumentos: `startLine`, `startCol`, `endLine` y `endCol`.
* `buildEditUpdate()` genera una sugerencia para modificar el texto. Toma cinco argumentos: `startLine`, `startCol`, `endLine`, `endCol` y `newContent`.

```javascript
function visit(query, filename, code) {
  const { fname } = query.captures;
  if (fname.text != "oldFunction") return;
  addError(
    buildError(
      fname.start.line, fname.start.col,
      fname.end.line, fname.end.col,
      "This function is deprecated"
    ).addFix(
      buildFix(
        "Use the new function instead",
        [
          buildEditUpdate(
            fname.start.line, fname.start.col,
            fname.end.line, fname.end.col,
            "newFunction")
        ]
      )
    )
  );
}
```

## Trucos y consejos

### Coincidencia con un nodo que no tiene un secundario determinado

Aunque puedes utilizar un signo de exclamación (`!`) para buscar un nodo que no tiene un campo concreto, no hay forma de escribir una consulta para un nodo que no tiene un nodo secundario concreto. Por ejemplo, no puedes escribir una consulta para "un nodo `function_declaration` que no contenga un nodo secundario `return_statement`".

Sin embargo, puedes combinar una consulta y código JavaScript para lograr ese resultado.

Para ello, utiliza el modificador de interrogación (`?`) y una captura en el nodo secundario que quieras excluir. Luego, tu código JavaScript puede comprobar si el nodo fue capturado. Si no lo fue, significa que el nodo no está presente.

```scheme
; Query:
(function_declaration
  name: (identifier) @id
  result: _
  body:
    (block
      (return_statement)? @ret ; This is the node we want to exclude
    )
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { id, ret } = query.captures;
  if (ret) return; // The return statement is present, so exit
  addError(
    buildError(
      id.start.line, id.start.col,
      id.end.line, id.end.col,
      "Missing return statement"
    )
  );
}
```

### Navegar por el árbol de análisis para buscar nodos

Es tentador intentar escribir una consulta que seleccione y capture todos los nodos que necesitas, pero a veces es más fácil encontrar un nodo y luego utilizar `ddsa.getParent()` y `ddsa.getChildren()` para encontrar el resto.

Por ejemplo, si quieres encontrar una definición de función que contenga una llamada a función, no puedes hacerlo en una consulta Tree-sitter sin especificar patrones para la llamada a función en diferentes niveles de anidamiento. Sin embargo, puedes hacerlo muy fácilmente si buscas la llamada a función en la consulta Tree-sitter y luego, en el código JavaScript, asciendes por el árbol de análisis utilizando `ddsa.getParent()` para encontrar la definición de la función.

```scheme
; Query:
(call_expression
  function:
    (_ field: _ @methodName
       (@eq? @methodName "DoSomething")
    )
) @fn
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration')
    decl = ddsa.getParent(decl);
  // `decl` is now the `function_declaration` or undefined
}
```

Puedes hacer muchas cosas con `ddsa.getParent()` y `ddsa.getChildren()`. Por ejemplo, puedes examinar los hermanos de un nodo:

```javascript
function getSiblings(node) {
  return ddsa.getChildren(ddsa.getParent(node)).filter(n => n != node);
}

function getSiblingsAfter(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduce((a, n) => n == node ? [] : a && a.concat([n]), undefined);
}

function getSiblingsBefore(node) {
  return ddsa.getChildren(ddsa.getParent(node)).
      reduceRight((a, n) => n == node ? [] : a && [n].concat(a), undefined);
}
```

A continuación, puedes inspeccionar y seleccionar los nodos que te interesen, comprobando sus propiedades `cstType` y `text`.

## Errores

### Añadir predicados no acelera la consulta

Si tu consulta Tree-sitter es lenta, puedes intentar acelerarla añadiendo predicados para podar el árbol de búsqueda. Sin embargo, este método no funciona con el motor de consulta Tree-sitter. El motor ignora todos los predicados cuando recorre el árbol en busca de nodos que coincidan con el patrón y solo aplica los predicados al final para filtrar la lista de resultados.

Por lo tanto, aunque añadir predicados puede reducir el número de veces que se llama a tu función `visit()`, no se reducirá la cantidad de trabajo que realizará el analizador estático en el momento de la consulta.

Ten en cuenta también que los predicados de consulta no son necesariamente más rápidos que el filtrado de nodos en la función `visit()`. A veces es más fácil hacer el filtrado en el código que escribir un predicado complicado en la consulta. En este caso, no obtendrás una penalización de rendimiento, siempre que te asegures de hacer este filtrado lo antes posible en tu código.

### Posible explosión combinatoria

El motor de consulta Tree-sitter intenta devolver todas las combinaciones de nodos posibles que satisfagan la consulta. Esto significa que las consultas complicadas con dos o más alternativas podrían provocar una explosión combinatoria, ya que el motor de consulta explora todas las posibilidades de cada alternativa.

Ten en cuenta que añadir predicados no ayudará, ya que solo se comprueban después de seleccionar los nodos.

A continuación se analizan algunas causas.

#### Dos patrones similares de nodos secundarios

Algunos autores de reglas intentan hacer coincidir dos nodos a la vez utilizando patrones iguales o muy similares. Esto podría causar problemas si el archivo tiene muchos nodos que coinciden con todos esos patrones.

Por ejemplo, puedes escribir una consulta como esta para capturar pares de métodos en una declaración de clase:

```scheme
(class_declaration
  (method_declaration) @method1
  (method_declaration) @method2
)
```

Para una clase con solo dos métodos, esta consulta solo devolverá un nodo. Sin embargo, para una clase con 10 métodos, devolverá 45. Para una clase con 100 métodos, devolverá 4950 nodos. Para una clase con 100 métodos, devolverá 4950 nodos.

Para evitar este problema, utiliza modificadores como `+` o `*` para capturar toda la lista de métodos en un único resultado de consulta. Alternativamente, utiliza `.` para indicar que los nodos secundarios deben aparecer uno al lado del otro.

```scheme
(class_declaration
  (method_declaration)+ @methods
)

; or

(class_declaration
  (method_declaration) @method1
  .
  (method_declaration) @method2
)
```

#### Intentar hacer coincidir dos nodos en la consulta

Un tipo común de regla trata de encontrar variables de un tipo particular que se utilizan de una manera particular. La gente tiende a escribir la consulta como "encontrar todas las definiciones de variables y capturar el nombre, encontrar todos los usos de variables, capturar el nombre y comprobar que los nombres coinciden".

```scheme
(_
  (var_declaration
    (var_spec
      name: _ @varName
      type: _ @typeName
    )
  )

  (_
    (call_expression
      function:
        (_
          operand: _ @opName
          field: _ @methodName
        )
    )
  )

  (#eq? @typeName "myType")
  (#eq? @methodName "DoSomething")
  (#eq? @varName @opName)
)
```

El problema es que el motor de consulta Tree-sitter obtendrá cada nodo de `var_declaration` y cada nodo de `call_expression`, los hará coincidir en pares y luego comprobará los predicados de cada par. Esto resulta en una operación O(nm).

Una solución es escribir una consulta que encuentre uno de los nodos y luego utilizar `ddsa.getParent()` y `ddsa.getChildren()` para encontrar el otro nodo.

Otra posible solución consiste en reunir todos los nodos candidatos sin intentar hacerlos coincidir y, a continuación, procesarlos en el código JavaScript.

#### Intentar hacer coincidir un patrón en varios niveles de anidamiento

Puedes escribir un patrón para encontrar un nodo que contenga un nodo secundario que coincida con un patrón. Sin embargo, no puedes escribir un patrón para encontrar un nodo que contenga un descendiente en un nivel de anidamiento arbitrario.

Algunos redactores de reglas intentaron resolver esto especificando varias alternativas, cada una con el patrón de interés en un nivel de anidamiento diferente.

```scheme
; Query:
(function_declaration
  [
    ; Find the same pattern at nesting levels 1 through 4
    (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )

    (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))

    (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    )))

    (_ (_ (_ (_
      (call_expression
        function: (_ field: _ @methodName)
      ) @fn
    ))))
  ]

  (#eq? @methodName "DoSomething")
) @decl
```

```javascript
// Code:
function visit(query, filename, code) {
  const { decl, fn } = query.captures;
  // ... do something with decl and fn
}
```

Ya mencionamos los problemas de esta estrategia. En primer lugar, el motor de consulta recorre cada rama del árbol de análisis para intentar encontrar una coincidencia, lo que puede llevar mucho tiempo. Además, si hay dos o más alternativas, el motor de consulta devolverá una coincidencia por cada conjunto de nodos que coincida con una combinación de opciones.

Una solución para este problema es escribir una consulta para el nodo secundario y luego utilizar `ddsa.getParent()` para encontrar el nodo antepasado. Esta acción también tiene la ventaja de que nos proporciona niveles de anidamiento ilimitados.

```scheme
; Query:
(call_expression
  function: (_field: _ @methodName (#eq? @methodName "doSomething))
)
```

```javascript
// Code:
function visit(query, filename, code) {
  const { fn } = query.captures;
  let decl = ddsa.getParent(fn);
  while (decl && decl.cstType != 'function_declaration') {
    decl = ddsa.getParent(decl);
  }
  // ... do something with decl and fn
}
```



[1]: /es/security/code_security/static_analysis/custom_rules/tutorial/
[2]: https://tree-sitter.github.io/
[3]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html