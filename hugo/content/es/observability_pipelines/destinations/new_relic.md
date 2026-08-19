---
disable_toc: false
title: Destino New Relic
---

Utiliza el destino New Relic de Observability Pipelines para enviar logs a New Relic.

## Configuración

Configura el destino New Relic y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

### Configurar el destino

{{% observability_pipelines/destination_settings/new_relic %}}

### Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta [procesamiento de eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 100            | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching