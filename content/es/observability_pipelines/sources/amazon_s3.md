---
disable_toc: false
title: Fuente de Amazon S3
---

Utiliza la fuente de Amazon S3 de Observability Pipelines para recibir logs de Amazon S3. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/amazon_s3 %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/amazon_s3 %}}

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

## Autenticación de AWS

{{% observability_pipelines/aws_authentication/instructions %}}

### Permisos

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}


[1]: /es/observability_pipelines/configuration/set_up_pipelines/