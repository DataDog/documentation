---
aliases:
- /es/observability_pipelines/processors/tag_control/logs/
description: Aprenda a usar el procesador de etiquetas para excluir o incluir etiquetas
  específicas en la matriz de etiquetas de Datadog para los registros del Datadog
  Agent.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador de etiquetas
---
{{< product-availability >}}

## Descripción general {#overview}

Para los registros provenientes del Datadog Agent, use este procesador para excluir o incluir etiquetas específicas en la matriz de etiquetas (`ddtags`) de Datadog. Las etiquetas que se excluyen o no se incluyen se descartan y pueden reducir el volumen de registros salientes.

## Configuración {#setup}

Para configurar el procesador:

1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][2] para obtener más información.
   - Solo se procesan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Opcionalmente, ingrese una matriz de etiquetas de Datadog para la sección {{< ui >}}Configure tags{{< /ui >}}. Los formatos admitidos son `["key:value", "key"]`. Consulte [Definir etiquetas][1] para obtener más información sobre el formato `key:value`.
1. En la sección {{< ui >}}Configure tags{{< /ui >}}, elija si desea {{< ui >}}Exclude tags{{< /ui >}} o {{< ui >}}Include tags{{< /ui >}}. Si proporcionó una matriz de etiquetas en el paso anterior, seleccione las claves de etiqueta que desea configurar. También puede agregar claves de etiqueta manualmente. **Nota**: Puede seleccionar hasta 100 etiquetas.

[1]: /es/getting_started/tagging/#define-tags
[2]: /es/observability_pipelines/search_syntax/logs/