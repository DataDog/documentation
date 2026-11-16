---
description: Aprenda a usar el procesador Edit Tags para agregar o cambiar el nombre
  de etiquetas en sus métricas.
disable_toc: false
products:
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Edit Tags Processor
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Edit Tags puede agregar o cambiar el nombre de etiquetas en sus métricas. Use este procesador para enriquecer sus métricas con contexto adicional y estandarizar los nombres en atributos importantes.

Las siguientes etiquetas y prefijos de etiqueta no se pueden cambiar de nombre porque proporcionan una funcionalidad específica de la plataforma:

- `host`
- `service`
- `ddsource`
- `function_arn`
- `datadog_*`
- `_dd.*`

## Configuración {#setup}

### Agregar etiqueta {#add-tag}

Use **Add tag** para añadir una nueva etiqueta de clave-valor a su métrica.

Para configurar la acción **Add tag**:

1. Seleccione **Add tag** en el menú desplegable **Action**.
1. Defina una consulta de filtro. Consulte la [Sintaxis de búsqueda de métricas][1] para obtener información sobre cómo crear consultas.
    - Solo se procesan las métricas que coinciden con el filtro.
    - Todas las métricas, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Ingrese la clave de etiqueta y el valor que desea agregar a las métricas. **Nota**: Si la etiqueta que desea agregar ya existe, el Worker registra un error y la etiqueta existente permanece sin cambios.

### Rename tag {#rename-tag}

Use **Rename tag** para cambiar el nombre de una etiqueta en su métrica.

Para configurar la acción **Rename tag**:

1. Seleccione **Rename tag** en el menú desplegable **Action**.
1. Defina una consulta de filtro. Consulte la [Sintaxis de búsqueda de métricas][1] para obtener información sobre cómo crear consultas.
    - Solo se procesan las métricas que coinciden con el filtro.



    - Todas las métricas, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Ingrese el nombre de la clave de etiqueta que desea cambiar en el campo **From**.
1. En el campo **To**, ingrese la clave de etiqueta con la que desea reemplazar la etiqueta original. **Nota**: Si el nombre de la etiqueta en el campo **To** ya existe, el Worker registra un error y no cambia el nombre de la clave de etiqueta en el campo **From**.

[1]: /es/observability_pipelines/search_syntax/metrics/