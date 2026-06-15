---
disable_toc: false
title: Fuente de Amazon Data Firehose
---

Utiliza la fuente Amazon Data Firehose de Observability Pipelines para recibir logs de Amazon Data Firehose. Selecciona y configure esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/amazon_data_firehose %}}

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

## Enviar logs al worker de Observability Pipelines a través de Amazon Data Firehose

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## Autenticación de AWS

{{% observability_pipelines/aws_authentication/instructions %}}

### Permisos

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/