---
description: Aprenda a usar el procesador Deduplicate para eliminar copias de registros
  y reducir el volumen y el ruido.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Deduplicate
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Deduplicate elimina copias de registros para reducir el volumen y el ruido. Almacena mensajes en caché y compara el tráfico de registros entrantes con los mensajes almacenados en caché. Por ejemplo, este procesador se puede usar para conservar solo registros de advertencia únicos en la incidencia en que se envíen múltiples registros de advertencia idénticos de forma sucesiva.

## Configuración {#setup}

Para configurar el procesador Deduplicate:

1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
   - Solo se procesan los registros que coinciden con la consulta de filtro especificada.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. En el menú desplegable {{< ui >}}Type of deduplication{{< /ui >}}, seleccione si desea `Match` o `Ignore` los campos especificados a continuación.
    - Si se selecciona `Match`, después de que un registro pase, los registros futuros que tengan los mismos valores para todos los campos que especifique a continuación serán eliminados.
    - Si se selecciona `Ignore`, después de que un registro pase, los registros futuros que tengan los mismos valores para todos sus campos, *excepto* los que especifique a continuación, serán eliminados.
1. Ingrese los campos que desea hacer coincidir o ignorar. Se requiere al menos un campo y puede especificar un máximo de tres campos.
    - Use la notación de ruta `<OUTER_FIELD>.<INNER_FIELD>` para hacer coincidir subcampos. Consulte el [ejemplo de notación de ruta](#path-notation-example) a continuación.
1. Haga clic en {{< ui >}}Add field{{< /ui >}} para agregar campos adicionales sobre los cuales desea filtrar.

### Configuración opcional {#optional-settings}

#### Tamaño de caché {#cache-size}

El tamaño de caché predeterminado es de 5,000 mensajes (recomendado). Los mensajes almacenados en caché se mantienen en la memoria para determinar si los mensajes entrantes son duplicados. Puede aumentar el tamaño de la caché para adaptarlo a sus necesidades.

**Notas**:
- Aumentar el tamaño de la caché aumenta el uso de memoria.
- La caché está respaldada por una caché LRU, donde el tamaño de la caché LRU es el mismo que el tamaño de caché configurado.
- Dado que la caché no se comparte entre los Workers, solo se descartan los eventos duplicados procesados por el mismo Worker.

### Ejemplo de notación de ruta {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /es/observability_pipelines/search_syntax/logs/