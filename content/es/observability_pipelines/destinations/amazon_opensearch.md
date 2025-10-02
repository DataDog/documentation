---
disable_toc: false
title: Destino de Amazon OpenSearch
---

Utiliza el destino de Amazon OpenSearch de Observability Pipelines para enviar logs a Amazon OpenSearch.

## Configuración

Configura el destino de Amazon OpenSearch y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario de pipelines.

### Configurar el destino

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

### Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta [procesamiento de eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| Ninguno           | 10.000.000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching