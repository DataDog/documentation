---
description: Más información sobre cómo definir una regla personalizada en Datadog.
title: Tutorial de reglas personalizadas del Análisis estático de código
---


Este tutorial muestra cómo escribir una regla personalizada para probar el código. El tutorial utiliza una regla muy simple que comprueba si tenemos una llamada de función Python a una función `foo` con un argumento llamado `bar`.

Este es el código de ejemplo que queremos detectar:

```python
foo(bar)
```


## Paso 1: Crear un conjunto de reglas

Ve a los [conjuntos de reglas personalizados][1] y crea un nuevo conjunto de reglas llamado `tutorial`.

{{< img src="/security/code_security/custom_rule_tutorial_ruleset.png" alt="Conjunto de reglas creado" style="width:100%;" >}}

## Paso 2: Crear una regla

Crea una regla llamada `tutorial-rule`. Asegúrate de seleccionar el lenguaje `Python`.

### Paso 2.1: Probar la regla con un ejemplo

Añade un ejemplo de código para probar la regla. En cada modificación o actualización de la regla (captura tree-sitter
o código de test), Datadog ejecutará la regla contra el código y proporcionará retroalimentación.

Introduce el nombre de archivo `test.py` y añade el código siguiente.

```python
foo(bar)
foo(baz)
```

### Paso 2.2: Escribir una consulta tree-sitter

Escribe una [consulta tree-sitter][2] que defina los nodos a capturar en el código. En el ejemplo actual
el objetivo es capturar una llamada de función donde el nombre de la función es `foo` y cualquier argumento es `bar`.

A continuación se muestra la consulta tree-sitter. Tiene tres capturas:
 - `funcName` captura el nombre de la función y ejecuta un predicado para comprobar su nombre.
 - `arg` captura el nombre de los argumentos.
 - `func` captura la llamada de función con todos los argumentos. Esto se utiliza para informar de la infracción en el código.

```
(call
    function: (identifier) @funcName
    arguments: (argument_list
        (identifier) @arg
    )
    (#eq? @funcName "foo")
    (#eq? @arg "bar")
)@func
```

### Paso 2.3: Escribir el código de la regla JavaScript 

Escribe el código JavaScript para informar de la infracción. El código primero obtiene las capturas (`func` y `funcName`) y luego comprueba si el nombre de la función es diferente de `foo` y realiza una devolución, si es verdadero. Por último, informa de una infracción.

Ten en cuenta que los argumentos 6 y 7 de la función `buildError` son la gravedad y la categoría.
Admitimos las siguientes gravedades: `ERROR`, `WARNING`, `NOTICE` y `INFO`.
Admitimos las siguientes categorías: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE` y `SECURITY`.

```javascript
function visit(query, filename, code) {
  // Get the func captures so that we can know the line/col where to put a violation
  const func = query.captures["func"];

  // Get the funcname to later get the name of the function
  const funcNameNode = query.captures["funcName"];

  // Check if the name of the function is not foo. This is already done in the tree-sitter query
  // and here only to show how to use getCodeForNode
  const funcNameFromCode = getCodeForNode(funcNameNode, code);
  if (funcNameFromCode !== "foo") {
    return;
  }

  // Report a violation
  addError(
    buildError(
      func.start.line, func.start.col,
      func.end.line, func.end.col,
      "do not use bar as argument",
      "WARNING",
      "BEST_PRACTICES"
    )
  )
}
```


{{< img src="/security/code_security/custom_rule_tutorial_rule_created.png" alt="Regla creada" style="width:100%;" >}}


## Paso 3: Utilizar la regla

Para utilizar la regla, realiza una de las siguientes acciones:
 - Crea un archivo `static-analysis.datadog.yaml` en la raíz de tu repositorio con el conjunto de reglas.
 - Añade la regla en [tus parámetros][3] para una configuración en toda la organización o a nivel de repositorio.

Una configuración válida para utilizar este conjunto de reglas (y ningún otro conjunto de reglas) se ve así:

```yaml
rulesets:
  - tutorial
```

{{< img src="/security/code_security/custom_rule_tutorial_configuration.png" alt="Configuración con reglas personalizadas" style="width:100%;" >}}

[1]: https://app.datadoghq.com/ci/code-analysis/static-analysis/custom-rulesets
[2]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html
[3]: https://app.datadoghq.com/security/configuration/code-security/settings