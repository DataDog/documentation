---
disable_toc: false
title: Destino CrowdStrike Next-Gen SIEM
---

Utiliza el destino CrowdStrike Next-Gen SIEM de Observability Pipelines para enviar logs a CrowdStrike Next-Gen SIEM.

## Configuración

Define el destino CrowdStrike NG-SIEM y sus variables de entorno cuando [configures un pipeline][1]. La información a continuación se configura en la interfaz de usuario de los pipelines.

### Configurar el destino

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

### Configurar las variables de entorno 

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

## Cómo funciona el destino

### Colocación de eventos en lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta los [eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| Ninguno           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching