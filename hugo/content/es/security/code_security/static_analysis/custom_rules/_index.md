---
algolia:
  tags:
  - análisis estático
  - análisis estático de datadog
  - calidad del código
  - SAST
  - norma personalizada
description: Escriba reglas personalizadas de Static Analysis para comprobar la seguridad
  y la calidad de tu código.
is_beta: false
title: Reglas personalizadas de Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security no está disponible en el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}




[Datadog Static Code Analysis][1] te permite definir reglas de análisis estático como reglas personalizadas. Puedes compartir estas reglas personalizadas dentro de tu organización.

## Organización de reglas

Las reglas SAST se organizan en conjuntos de reglas. Un conjunto de reglas es una colección de reglas. No hay restricciones
sobre cómo se organizan las reglas dentro de un conjunto de reglas. Por ejemplo, algunos usuarios pueden querer tener conjuntos de reglas para un lenguaje específico y otros para una categoría.

Un conjunto de reglas debe tener un nombre único con sólo letras, números y guiones (`-`). Ejemplos de nombres
válidos son `python-security`, `cobra-team-checks`, o `my-company-security-checks`.

## Anatomía de una regla personalizada

Una regla personalizada consta de tres componentes principales:
 - Una consulta **tree-sitter** que captura qué elementos AST comprobar.
 - **Código JavaScript** que procesa los elementos AST informa de infracciones.
 - **Código de test** para probar la regla.

### Consulta tree-sitter

Las reglas personalizadas utilizan [consultas tree-sitter][3] para consultar el árbol de sintaxis abstracta (AST) del código y recuperar elementos para analizar. Los elementos del AST son capturados por la consulta utilizando el operador `@`.

Todos los nodos capturados de la consulta tree-sitter se inyectan en el código JavaScript y se procesan para
producir infracciones.

### Código JavaScript

El código JavaScript se define en una función `visit`. Esta función se activa en cada coincidencia de la consulta tree-sitter.
Si una consulta tree-sitter captura una llamada a función y el código analizado contiene 10 llamadas a función, la función `visit` es llamada 10 veces y cada invocación tiene la captura de cada ocurrencia.

La función `visit` tiene la firma `visit(node, path, code)`:
 - `node` es el contexto del árbol que se está comparando.
 - `path` es la ruta bajo análisis (conveniente para filtrar la infracción en la ruta o el nombre de archivo).
 - `code` es el código analizado.

Para obtener un nodo capturado, utiliza el atributo `captures` del primer argumento de la función `visit`. Por ejemplo, el código siguiente recupera el `functionName` a partir de una consulta de tree-sitter. Cada elemento contiene los atributos siguientes

 - `cstType`: tipo de tree-sitter del nodo.
 - `start`: posición inicial del nodo. La posición contiene los atributos `line` y `col`.
 - `end`: posición final del nodo. La posición contiene los atributos `line` y `col`.
 - `text`: contenido del nodo.

<div class="alert alert-danger">Los atributos<code>line</code> y <code>col</code> empiezan en 1. Cualquier resultado con <code>line</code> o <code>col</code> en 0 se ignora.</div>

```javascript
function visit(node, filename, code) {
  const functionNameNode = node.captures["functionName"];
  console.log("cst type");
  console.log(functionNameNode.cstType);
  console.log("start line");
  console.log(functionNameNode.start.line);
}
```

El analizador incluye algunas funciones para ayudarte a escribir reglas:
 - `buildError(startLine, startCol, endLine, endCol, message, severity, category)` genera un error.
   - La `severity` es una de los siguientes: `ERROR`, `WARNING`, `NOTICE` y `INFO`.
   - La `category` es una de los siguientes: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE` y `SECURITY`.
 - `addError(error)` informa de un error.
 - `ddsa.getParent(node)` devuelve el elemento principal del nodo dado, o `undefined` si el nodo es el nodo raíz.
 - `ddsa.getChildren(node)` devuelve una matriz de elementos secundarios del nodo dado, o una matriz vacía si el nodo es un nodo hoja.

### Ejemplos de reglas

Todas las reglas predeterminadas de Datadog están disponibles en [Code Security][4]. Puedes analizarlas y copiarlas fácilmente para crear tus propias reglas personalizadas.


[1]: https://app.datadoghq.com/ci/code-analysis
[2]: https://tree-sitter.github.io/
[3]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html
[4]: https://app.datadoghq.com/ci/code-analysis/static-analysis/default-rulesets