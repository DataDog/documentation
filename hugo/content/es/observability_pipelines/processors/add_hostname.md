---
description: Aprenda a usar el procesador Add Hostname para agregar un campo con el
  nombre del servidor que envió el registro.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Hostname Processor
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador agrega un campo con el nombre del servidor que envió el registro. Por ejemplo, `hostname: 613e197f3526`. **Nota**: Si el `hostname` ya existe, el Worker genera un error y no sobrescribe el `hostname` existente.

## Configuración {#setup}

Para configurar este procesador:
- Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
  - Solo se procesan los registros que coinciden con la consulta de filtro especificada.
  - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.

[1]: /es/observability_pipelines/search_syntax/logs/