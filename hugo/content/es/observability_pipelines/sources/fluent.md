---
disable_toc: false
title: Fuentes Fluentd y Fluent Bit
---

Utiliza la fuente Fluentd o Fluent Bit de Observability Pipelines para recibir logs de tu Agent Fluentd o Fluent Bit. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/fluent %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/fluent %}}

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

## Enviar logs al worker de Observability Pipelines a través de Fluent

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/