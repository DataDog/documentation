---
disable_toc: false
title: Destino Amazon Security Lake
---

Utiliza el destino Amazon Security Lake de Observability Pipelines para enviar logs a Amazon Security Lake.

## Requisitos previos

Antes de configurar el destino Amazon Security Lake, debes hacer lo siguiente:

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

## Configuración

Configura el destino Amazon Security Lake y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

### Configurar el destino

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

### Configurar las variables de entorno 

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_security_lake %}}

## Autenticación AWS

{{% observability_pipelines/aws_authentication/amazon_security_lake/intro %}}

{{% observability_pipelines/aws_authentication/instructions %}}

### Permisos

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

## Cómo funciona el destino

### Colocación de eventos en lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. para obtener más información, consulta [lotes de eventos][2].

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| Ninguno           | 256,000,000     | 300                 |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching