---
description: Aprende a consultar y analizar tus logs de CloudPrem en Datadog
further_reading:
- link: /cloudprem/ingest/
  tag: Documentación
  text: Ingesta de logs en CloudPrem
- link: /cloudprem/operate/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CloudPrem
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de logs
title: Buscar logs de CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Explorar los logs de CloudPrem en el Logs Explorer

1. Ve al [Datadog Log Explorer][1].
2. En el panel de facetas de la izquierda, en **CLOUDPREM INDEXES** (ÍNDICES DE CLOUDPREM), selecciona uno o varios índices en los que buscar.

Puedes seleccionar un índice concreto para restringir la búsqueda, o seleccionar todos los índices de un clúster para buscar en todos ellos.

Los nombres de índice de CloudPrem siguen este formato:

```
cloudprem--<CLUSTER_NAME>--<INDEX_NAME>
```

## Limitaciones de búsqueda

No puedes consultar índices de CloudPrem junto con otros índices de log de Datadog. Además, los Flex Logs no son compatibles con CloudPrem.

[1]: https://app.datadoghq.com/logs

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}