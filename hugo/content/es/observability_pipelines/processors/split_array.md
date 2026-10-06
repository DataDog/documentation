---
description: Aprenda a utilizar el procesador Split Array para dividir matrices anidadas
  en eventos distintos, de modo que pueda consultar, filtrar, alertar y visualizar
  los datos.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Split Array
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador divide matrices anidadas en eventos distintos para que pueda consultar, filtrar, alertar y visualizar datos dentro de una matriz. Las matrices deben estar ya analizadas. Por ejemplo, el procesador puede procesar `[item_1, item_2]`, pero no puede procesar `"[item_1, item2]"`. Los elementos de la matriz pueden ser objetos JSON, cadenas, números enteros, números de punto flotante o valores booleanos. Todos los campos no modificados se agregan a los eventos secundarios. Por ejemplo, si está enviando los siguientes elementos al Observability Pipelines Worker:

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": [item_1, item_2]
}
```

Utilice el procesador Split Array para enviar cada elemento en `batched_items` como un evento independiente:

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_1
}
```

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_2
}
```

Consulte el [ejemplo de matriz dividida](#split-array-example) para obtener un ejemplo más detallado.

## Configuración {#setup}

Para configurar este procesador:

Haga clic en {{< ui >}}Manage arrays to split{{< /ui >}} para agregar una matriz a dividir o editar una matriz existente a dividir. Esto abre un panel lateral.

- Si aún no ha creado ninguna matriz, introduzca los parámetros de la matriz como se describe en la sección [Agregar una nueva matriz](#add-a-new-array) a continuación.
- Si ya ha creado matrices, haga clic en la fila de la matriz en la tabla para editarla o eliminarla. Utilice la barra de búsqueda para encontrar una matriz específica y, a continuación, seleccione la matriz para editarla o eliminarla. Haga clic en {{< ui >}}Add Array to Split{{< /ui >}} para agregar una nueva matriz.

### Agregar una nueva matriz {#add-a-new-array}

1. Defina una {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
   - Solo se procesan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Introduzca la ruta al campo de la matriz. Utilice la notación de ruta `<OUTER_FIELD>.<INNER_FIELD>` para hacer coincidir subcampos. Consulte el [ejemplo de notación de ruta](#path-notation-example-split-array) a continuación.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Ejemplo de división de matriz {#split-array-example}

Este es un ejemplo de evento:

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {
            "timestamp":14500000,
            "firstarray":["one", 2]
        },
    },
    "secondarray": [
    {
        "some":"json",
        "Object":"works"
    }, 44]
}
```

Si el procesador está dividiendo las matrices `"message.myfield.firstarray"` y `"secondarray"`, genera eventos secundarios que son idénticos al evento principal, excepto por los valores de `"message.myfield.firstarray"` y `"secondarray",`, que se convierten en un solo elemento de su respectiva matriz original. Cada evento secundario es una combinación única de elementos de las dos matrices, por lo que en este ejemplo se crean cuatro eventos secundarios (2 elementos * 2 elementos = 4 combinaciones).

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
    },
    "secondarray": {
        "some":"json",
        "Object":"works"
    }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
        },
    "secondarray": 44
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": {
            "some":"json",
            "object":"works"
        }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": 44
}
```

### Ejemplo de notación de ruta {#path-notation-example-split-array}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /es/observability_pipelines/search_syntax/logs/