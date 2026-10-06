---
aliases:
- /es/cloudprem/operate/search_logs/
description: Aprenda a consultar y analizar sus datos de BYOC Logs en Datadog
further_reading:
- link: /byoc-logs/ingest/
  tag: Documentación
  text: Ingrese registros a BYOC Logs
- link: /byoc-logs/operate/troubleshooting/
  tag: Documentación
  text: Solución de problemas de BYOC Logs
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de registros
title: Buscar en BYOC Logs
---
## Explore BYOC Logs en el Log Explorer {#explore-byoc-logs-in-the-logs-explorer}

1. Vaya al [Datadog Log Explorer][1].
2. En el panel de facetas de la izquierda, bajo {{< ui >}}BYOC INDEXES{{< /ui >}}, seleccione uno o más índices para buscar.

Puede seleccionar un índice específico para limitar su búsqueda, o seleccionar todos los índices en un clúster para buscar en ellos.

Los nombres de los índices de BYOC (Bring Your Own Cloud) Logs siguen este formato:

```
byoc--<CLUSTER_NAME>--<INDEX_NAME>
```

## Buscar en clústeres de BYOC Logs {#search-across-byoc-logs-clusters}

Utilice Log Explorer o la API pública de Logs para buscar en múltiples clústeres de BYOC Logs con una sola consulta. Los resultados de los clústeres seleccionados se combinan.

### Utilice Log Explorer {#use-log-explorer}

En la barra de búsqueda de [Log Explorer][1], anteponga `byoc--` a cada nombre de clúster. Agrupe los nombres entre paréntesis después de `index:`, separados por `OR`. Por ejemplo:

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

Reemplace `cluster-1` y `cluster-2` con los nombres de sus clústeres de BYOC Logs.

### Utilice Logs API {#use-the-logs-api}

Envíe una solicitud al [punto de conexión de búsqueda de registros][2] (`POST /api/v2/logs/events/search`). Establezca `filter.query` en una consulta que especifique múltiples clústeres de BYOC Logs. Por ejemplo:

```json
{
  "filter": {
    "from": "now-15m",
    "to": "now",
    "query": "index:(byoc--cluster-1 OR byoc--cluster-2)"
  }
}
```

## Limitaciones de búsqueda {#search-limitations}

No puede consultar los índices de BYOC Logs junto con otros índices de registros de Datadog. Además, Flex Logs no es compatible con BYOC Logs.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /es/api/latest/logs/#search-logs